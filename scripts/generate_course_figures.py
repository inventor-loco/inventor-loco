#!/usr/bin/env python3
"""Batch-generate course figures with the Google Gen AI SDK.

Usage:
  python scripts/generate_course_figures.py courses/figs/osmosis/prompts.json

Requires:
  GEMINI_API_KEY environment variable
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import time
from pathlib import Path

# Import the official SDK
try:
    from google import genai
    from google.genai import types
    from google.genai.errors import APIError
except ImportError:
    print("ERROR: google-genai SDK not found. Please run: pip install google-genai", file=sys.stderr)
    sys.exit(1)

# Using the correct developer endpoint for the Flash Image model
DEFAULT_MODEL = "gemini-3.1-flash-image-preview"

# Global context tailored for the Osmosis course
BASE_STYLE = (
    "A clean, modern educational illustration for an engineering and science course on Reverse Osmosis. "
    "The style should be high-quality flat vector art with a white background, "
    "utilizing a crisp color palette of aquatic blues, clean white, slate gray, and contrasting safety orange for emphasis. "
    "Use clean, sans-serif typography for any explicitly requested labels. "
    "The layout must be highly structured, technically accurate, and easy for students to understand. "
)

def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate course figure images from a JSON manifest using Gemini API."
    )
    parser.add_argument("manifest", help="Path to a JSON array with path/prompt entries.")
    parser.add_argument(
        "--model", default=DEFAULT_MODEL, help=f"Image model to use. Default: {DEFAULT_MODEL}"
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
    return parser.parse_args()


def load_manifest(path: Path) -> list[dict[str, str]]:
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        raise ValueError("Manifest must be a JSON array.")
    for index, item in enumerate(data, start=1):
        if not isinstance(item, dict) or "path" not in item or "prompt" not in item:
            raise ValueError(f"Manifest entry {index} must contain 'path' and 'prompt'.")
    return data


def main() -> int:
    args = parse_args()
    
    if not os.getenv("GEMINI_API_KEY") and not args.dry_run:
        print("ERROR: GEMINI_API_KEY environment variable is not set.", file=sys.stderr)
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
        client = genai.Client()

    root = Path.cwd()
    failures = 0
    total = len(items)

    for index, item in enumerate(items, start=1):
        output_path = root / item["path"]
        tag = f"[{index}/{total}]"
        
        if output_path.exists() and not args.overwrite:
            print(f"{tag} Skip existing {output_path}")
            continue

        full_prompt = BASE_STYLE + item["prompt"]

        if args.dry_run:
            print(f"{tag} DRY-RUN {output_path}")
            print(f"        prompt: {full_prompt[:90]}...")
            continue

        print(f"{tag} Generating {output_path} ...")

        try:
            response = client.models.generate_content(
                model=args.model,
                contents=full_prompt,
                config=types.GenerateContentConfig(
                    response_modalities=["IMAGE"],
                )
            )
            
            saved = False
            for part in response.candidates[0].content.parts:
                if part.inline_data is not None:
                    output_path.parent.mkdir(parents=True, exist_ok=True)
                    output_path.write_bytes(part.inline_data.data)
                    saved = True
                    print(f"{tag} Saved {output_path}")
                    break
            
            if not saved:
                print(f"{tag} Failed {output_path.name}: No image data returned.", file=sys.stderr)
                failures += 1

        except APIError as exc:
            failures += 1
            print(f"{tag} API Error for {output_path.name}", file=sys.stderr)
            print(f"        {exc}", file=sys.stderr)
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