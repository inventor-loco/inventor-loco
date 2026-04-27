#!/usr/bin/env python3
"""Batch-generate course figures with Gemini or OpenAI image models.

Usage:
  python scripts/generate_course_figures.py courses/figs/osmosis/prompts.json
  python scripts/generate_course_figures.py courses/figs/osmosis/prompts.json --provider openai

Requires:
  GEMINI_API_KEY or OPENAI_API_KEY environment variable
"""

from __future__ import annotations

import argparse
import base64
import json
import os
import sys
import time
from pathlib import Path

GEMINI_DEFAULT_MODEL = "gemini-3.1-flash-image-preview"
OPENAI_DEFAULT_MODEL = "gpt-image-1.5"

BASE_STYLE_GEMINI = (
    "A clean, modern educational illustration for an engineering and science course on reverse osmosis. "
    "The style should be high-quality flat vector art with a white background, "
    "utilizing a crisp color palette of aquatic blues, clean white, slate gray, and contrasting safety orange for emphasis. "
    "Use clean, sans-serif typography for any explicitly requested labels. "
    "The layout must be highly structured, technically accurate, and easy for students to understand. "
)

BASE_STYLE_OPENAI = (
    "Create a single polished educational infographic for a reverse osmosis engineering course. "
    "Use a clean flat vector-style diagram on a pure white background with crisp edges and simple geometric forms. "
    "Favor textbook clarity over decoration: structured layout, generous spacing, strong visual hierarchy, and technically accurate components. "
    "Use an aquatic blue, white, slate gray, and safety orange palette. "
    "Include only labels explicitly requested in the prompt, make them large and legible, and do not add extra text, logos, borders, watermarks, or photorealistic textures. "
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate course figure images from a JSON manifest using Gemini or OpenAI."
    )
    parser.add_argument("manifest", help="Path to a JSON array with path/prompt entries.")
    parser.add_argument(
        "--provider",
        choices=("gemini", "openai"),
        default="gemini",
        help="Image provider to use. Default: gemini",
    )
    parser.add_argument(
        "--model",
        help="Image model to use. Defaults to the recommended model for the selected provider.",
    )
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Overwrite files that already exist.",
    )
    parser.add_argument(
        "--delay",
        type=float,
        default=2.0,
        help="Seconds to wait between requests. Default: 2.0",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print what would be generated without calling the API.",
    )
    parser.add_argument(
        "--size",
        default="1536x1024",
        help="OpenAI image size. Default: 1536x1024",
    )
    parser.add_argument(
        "--quality",
        default="medium",
        choices=("low", "medium", "high"),
        help="OpenAI image quality. Default: medium",
    )
    return parser.parse_args()


def load_manifest(path: Path) -> list[dict[str, str]]:
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise ValueError("Manifest must be a JSON array.")
    for index, item in enumerate(data, start=1):
        if not isinstance(item, dict) or "path" not in item or "prompt" not in item:
            raise ValueError(f"Manifest entry {index} must contain 'path' and 'prompt'.")
    return data


def get_default_model(provider: str) -> str:
    if provider == "openai":
        return OPENAI_DEFAULT_MODEL
    return GEMINI_DEFAULT_MODEL


def get_required_api_key(provider: str) -> str:
    if provider == "openai":
        return "OPENAI_API_KEY"
    return "GEMINI_API_KEY"


def build_prompt(provider: str, prompt: str) -> str:
    if provider == "openai":
        return BASE_STYLE_OPENAI + prompt
    return BASE_STYLE_GEMINI + prompt


def build_client(provider: str):
    if provider == "gemini":
        try:
            from google import genai
        except ImportError:
            print("ERROR: google-genai SDK not found. Please run: pip install google-genai", file=sys.stderr)
            sys.exit(1)
        return genai.Client()

    try:
        from openai import OpenAI
    except ImportError:
        print("ERROR: openai SDK not found. Please run: pip install openai", file=sys.stderr)
        sys.exit(1)
    return OpenAI()


def generate_with_gemini(client, model: str, prompt: str) -> bytes:
    from google.genai import types

    response = client.models.generate_content(
        model=model,
        contents=prompt,
        config=types.GenerateContentConfig(
            response_modalities=["IMAGE"],
        ),
    )

    for part in response.candidates[0].content.parts:
        if part.inline_data is not None:
            return part.inline_data.data

    raise RuntimeError("No image data returned.")


def generate_with_openai(client, model: str, prompt: str, size: str, quality: str) -> bytes:
    response = client.images.generate(
        model=model,
        prompt=prompt,
        size=size,
        quality=quality,
    )

    if not response.data:
        raise RuntimeError("No image data returned.")

    image_base64 = getattr(response.data[0], "b64_json", None)
    if not image_base64:
        raise RuntimeError("OpenAI response did not include b64_json image data.")

    return base64.b64decode(image_base64)


def main() -> int:
    args = parse_args()
    args.model = args.model or get_default_model(args.provider)

    required_api_key = get_required_api_key(args.provider)
    if not os.getenv(required_api_key) and not args.dry_run:
        print(f"ERROR: {required_api_key} environment variable is not set.", file=sys.stderr)
        return 1

    manifest_path = Path(args.manifest)
    if not manifest_path.exists():
        print(f"Manifest not found: {manifest_path}", file=sys.stderr)
        return 1

    try:
        items = load_manifest(manifest_path)
    except Exception as exc:
        print(f"Failed to read manifest: {exc}", file=sys.stderr)
        return 1

    if not args.dry_run:
        client = build_client(args.provider)

    root = Path.cwd()
    failures = 0
    total = len(items)

    for index, item in enumerate(items, start=1):
        output_path = root / item["path"]
        tag = f"[{index}/{total}]"

        if output_path.exists() and not args.overwrite:
            print(f"{tag} Skip existing {output_path}")
            continue

        full_prompt = build_prompt(args.provider, item["prompt"])

        if args.dry_run:
            print(f"{tag} DRY-RUN {output_path}")
            print(f"        prompt: {full_prompt[:120]}...")
            continue

        print(f"{tag} Generating {output_path} ...")

        try:
            if args.provider == "openai":
                image_bytes = generate_with_openai(
                    client=client,
                    model=args.model,
                    prompt=full_prompt,
                    size=args.size,
                    quality=args.quality,
                )
            else:
                image_bytes = generate_with_gemini(
                    client=client,
                    model=args.model,
                    prompt=full_prompt,
                )

            output_path.parent.mkdir(parents=True, exist_ok=True)
            output_path.write_bytes(image_bytes)
            print(f"{tag} Saved {output_path}")
        except Exception as exc:
            failures += 1
            print(f"{tag} Failed {output_path.name}: {exc}", file=sys.stderr)

        if index < total:
            time.sleep(max(args.delay, 0.0))

    if failures:
        print(f"Completed with {failures} failure(s).", file=sys.stderr)
        return 1

    print("All requested figures generated successfully.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
