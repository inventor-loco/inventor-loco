# Course template — authoring notes

The shared runtime (`template.js`) renders every course from one markdown file,
`courses/content/<slug>.md`, split into lessons by `<!-- slug: NN -->` delimiters.

## Useful links & citations

Courses can cite a shared set of useful links. The mechanism is **plain standard
markdown**, so each `content/<slug>.md` file stays valid and readable on its own
(e.g. on GitHub).

### 1. Cite a link inside a lesson

Use a standard markdown **reference-style link** — `[visible text][id]`:

```markdown
TDS is verified with a meter ([total dissolved solids][tds-meter]) before install.
```

### 2. Define the links and the References section at the end of the file

After the last lesson, add a `## References` section and the link definitions
(`[id]: url "title"`). Put both at the very bottom of the file:

```markdown
## References

- [Total dissolved solids (TDS)][tds-meter]
- [Reverse osmosis — overview][ro-wiki]

[tds-meter]: https://en.wikipedia.org/wiki/Total_dissolved_solids "Total dissolved solids (TDS)"
[ro-wiki]:   https://en.wikipedia.org/wiki/Reverse_osmosis "Reverse osmosis — overview"
```

### How it renders

- Inline citations become clickable named links that open in a new tab.
- The `## References` section renders at the foot of the last lesson and at the end
  of the downloaded PDF.
- A course with no definitions is unaffected — nothing extra is rendered.

### Why it works

Lessons are parsed independently, but the link definitions live at the bottom of the
file. The runtime collects every `[id]: url "title"` definition once and appends them
to each lesson chunk before rendering, so a citation used in any lesson resolves. This
is the only special handling — everything else is ordinary markdown.

> Split-file workflow: courses authored as `01.md … NN.md` (merged by
> `scripts/merge-lessons.sh`) can keep the References section and definitions in a
> `references.md` file, which is appended last during the merge.
