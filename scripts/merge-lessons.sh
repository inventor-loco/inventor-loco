#!/usr/bin/env bash
# merge-lessons.sh
# Combines individual lesson .md files (01.md–25.md) into a single
# {slug}.md file per course, using <!-- slug: NN --> delimiters.

set -euo pipefail

CONTENT_DIR="$(cd "$(dirname "$0")/../courses/content" && pwd)"

SLUGS=(3dprinting electricity occ osmosis publishing solar)

for slug in "${SLUGS[@]}"; do
  src="$CONTENT_DIR/$slug"
  out="$CONTENT_DIR/${slug}.md"

  if [ ! -d "$src" ]; then
    echo "SKIP  $slug — directory not found"
    continue
  fi

  echo -n "" > "$out"   # start empty

  for file in "$src"/[0-9][0-9].md; do
    num=$(basename "$file" .md)          # e.g. "01"
    echo "<!-- slug: $num -->" >> "$out"
    cat "$file" >> "$out"
    echo "" >> "$out"                    # blank line after each section
  done

  count=$(ls "$src"/[0-9][0-9].md 2>/dev/null | wc -l)
  echo "OK    $slug — merged $count lessons → ${slug}.md"
done

echo "Done."
