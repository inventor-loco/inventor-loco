#!/usr/bin/env python3
"""Batch-generate course figures with the OpenAI Images API.

Usage:
  python scripts/generate_course_figures.py courses/figs/osmosis/prompts.json

Requires:
  OPENAI_API_KEY environment variable
"""

from __future__ import annotations

import argparse
import base64
import json
import os
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path


DEFAULT_MODEL = "gpt-image-1.5"
DEFAULT_SIZE = "1536x1024"
DEFAULT_QUALITY = "high"
DEFAULT_FORMAT = "png"
DEFAULT_BACKGROUND = "opaque"
API_URL = "https://api.openai.com/v1/images/generations"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate course figure images from a JSON manifest."
    )
    parser.add_argument("manifest", help="Path to a JSON array with path/prompt entries.")
    parser.add_argument(
        "--model", default=DEFAULT_MODEL, help=f"Image model to use. Default: {DEFAULT_MODEL}"
    )
    parser.add_argument(
        "--size", default=DEFAULT_SIZE, help=f"Image size to request. Default: {DEFAULT_SIZE}"
    )
    parser.add_argument(
        "--quality",
        default=DEFAULT_QUALITY,
        choices=["low", "medium", "high", "auto"],
        help=f"Generation quality. Default: {DEFAULT_QUALITY}",
    )
    parser.add_argument(
        "--background",
        default=DEFAULT_BACKGROUND,
        choices=["opaque", "transparent", "auto"],
        help=f"Background mode. Default: {DEFAULT_BACKGROUND}",
    )
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Overwrite files that already exist.",
    )
    parser.add_argument(
        "--delay",
        type=float,
        default=1.0,
        help="Seconds to wait between requests. Default: 1.0",
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


def build_payload(prompt: str, model: str, size: str, quality: str, background: str) -> bytes:
    body = {
        "model": model,
        "prompt": prompt,
        "size": size,
        "quality": quality,
        "background": background,
        "output_format": DEFAULT_FORMAT,
        "n": 1,
    }
    return json.dumps(body).encode("utf-8")


def call_images_api(api_key: str, payload: bytes) -> dict:
    request = urllib.request.Request(
        API_URL,
        data=payload,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=300) as response:
        return json.loads(response.read().decode("utf-8"))


def save_image(output_path: Path, response_json: dict) -> None:
    data = response_json.get("data") or []
    if not data or "b64_json" not in data[0]:
        raise ValueError("API response did not include image data.")
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_bytes(base64.b64decode(data[0]["b64_json"]))


def main() -> int:
    args = parse_args()
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("OPENAI_API_KEY is not set.", file=sys.stderr)
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

    root = Path.cwd()
    failures = 0

    for index, item in enumerate(items, start=1):
        output_path = root / item["path"]
        if output_path.exists() and not args.overwrite:
            print(f"[{index}/{len(items)}] Skip existing {output_path}")
            continue

        print(f"[{index}/{len(items)}] Generating {output_path} ...")
        payload = build_payload(
            prompt=item["prompt"],
            model=args.model,
            size=args.size,
            quality=args.quality,
            background=args.background,
        )

        try:
            response_json = call_images_api(api_key, payload)
            save_image(output_path, response_json)
            print(f"[{index}/{len(items)}] Saved {output_path}")
        except urllib.error.HTTPError as exc:
            failures += 1
            details = exc.read().decode("utf-8", errors="replace")
            print(f"[{index}/{len(items)}] HTTP error for {output_path}: {exc.code}", file=sys.stderr)
            print(details, file=sys.stderr)
        except Exception as exc:
            failures += 1
            print(f"[{index}/{len(items)}] Failed {output_path}: {exc}", file=sys.stderr)

        if index < len(items):
            time.sleep(max(args.delay, 0.0))

    if failures:
        print(f"Completed with {failures} failure(s).", file=sys.stderr)
        return 1

    print("All requested figures generated successfully.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
