---
name: thumbnail-ideas
description: >-
  Generate simple, sketchable thumbnail illustration ideas for a blog article.
  Use when the user wants cover/thumbnail concepts for a post, asks "what should
  the thumbnail be", wants Excalidraw sketch ideas for an article, or points at a
  post in src/content/blog and asks for illustration ideas.
---

# Thumbnail illustration ideas

Turn a blog article into a few concrete, hand-sketchable thumbnail concepts — the
kind you can rough out in Excalidraw in a few minutes. Output is **ideas**, not a
finished asset (offer the asset at the end).

## Context for this blog

- Posts live at `src/content/blog/<slug>/index.mdx`. Thumbnail is set by the
  `thumbnail:` frontmatter field (relative path, `.png` or `.svg`).
- In-article diagrams are hand-drawn **Excalidraw** (`*.excalidraw` source +
  exported `*.svg`). The whole visual language is sketchy/hand-drawn — ideas must
  fit that.
- Some posts already have a `thumbnail.svg` / `thumbnail.png`. Don't overwrite;
  the goal is fresh concepts.

## Method

1. **Read the article — title first.** The title is usually the strongest hook
   (e.g. "25 Minutes to Change a Button Color" → a button + a big timer). Read the
   whole post, but weight the title, the opening, and any pull-quote.

2. **Extract candidate angles.** Pull several distinct directions, not variations
   of one:
   - **Title hook** — the literal image the headline conjures.
   - **Before/after contrast** — slow→fast, messy→clean, many→one. Standout
     numbers work great here (`3m 20s → 14s`).
   - **Core metaphor** — the central mechanism/tension, drawn as an object.
   - **The pain** — what the mechanism does to you (the ritual, the wait).
   - **The human/opinion angle** — if it's an opinion piece, a fork-in-the-road /
     decision framing signals that better than a tooling diagram.

3. **Check the visual language.** Glance at sibling posts' thumbnails and this
   post's in-article diagrams. Match the hand-drawn Excalidraw look. **Do not
   re-draw a diagram that already appears inside the article** — the cover should
   be distinct from the content.

4. **Filter for thumbnail size.** Thumbnails are viewed small (cards, OG images,
   ~landscape). Ruthlessly favor:
   - **One clear focal point.** Reject multi-part or "explains the whole system"
     ideas for the cover — those are diagrams, not covers.
   - **A handful of shapes** you can describe in one breath.
   - **Bold contrast, minimal text.** A number or one label, not a paragraph.

5. **Rank and present 3–4 ideas**, ordered by how well they read at small size.

## Output format

For each idea:

- **Short name** — one line.
- **Shapes to sketch** — concrete and buildable from basic Excalidraw primitives
  (rects, arrows, a clock, a lightning bolt, an emoji). Name the actual objects,
  not a vibe. "A greyed-out button with 🚫 next to a big `25:00` timer" — not
  "something about time."
- **Why it works** — one line.
- **Downside** — only if there is one (too busy, overlaps an in-article diagram,
  weak at small size).

End with:
- **A recommendation** — one pick for the cover, optionally a second graphic that
  pairs well.
- **An offer** — "Want me to rough this out as an actual `.excalidraw` file?"
  When taking that up, open an existing `*.excalidraw` in the post's folder first
  to reuse the style/dimensions.

## Principles (the reusable checklist)

- Prefer the **title hook** — it's what the reader already has in mind.
- **Concrete over abstract.** If you can't name the shapes, it's not an idea yet.
- **Simple = few elements.** One focal point beats a complete explanation.
- **Use the metaphor, not a screenshot.** Draw the idea, don't reproduce a UI.
- **Stay distinct from the article's own diagrams.**
- **Give a recommendation** — don't just list; say which one and why.
