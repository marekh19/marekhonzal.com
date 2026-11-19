---
name: animate-thumbnail
description: >-
  Add or change the hover animation inside a card thumbnail SVG
  (src/content/**/thumbnail.svg). Use when the user wants a thumbnail to animate,
  or re-exports a thumbnail that was animated.
---

# Animate a thumbnail

A card thumbnail plays a short animation once each time the user hovers the card or
focuses its link. The animation lives inside `thumbnail.svg`. Worked example:
`src/content/blog/ai-agents-home-server/thumbnail.svg`.

## How it works

- `Thumbnail.astro` sets `--thumb-play: none` on the thumbnail and `--thumb-play: initial`
  while the card is hovered or its link has focus. It does this only when the user allows
  motion.
- An SVG element animates with an inline style:
  `style="animation:var(--thumb-play,<keyframes-name>) <duration> <delay> <easing>"`.
  `none` keeps the element still. `initial` makes the variable invalid, so the fallback
  keyframes name applies and the animation runs once.
- The keyframes sit in one `<style>` element, the first child of the `<svg>`.
- Cards load the SVG from a file through `<use>`. Chromium reads keyframes from that
  file, and Firefox reads them from the page, so `getExternalSvgReference` copies the
  `<style>` into the page.
- The detail page and the OG image show the rest state only.

## Steps

1. **Choose the motion with the user.** Animate the one or two elements that carry the
   idea of the drawing, plus at most one small accent. Agree on the elements before you
   edit.
2. **Find each element in the SVG.** Excalidraw draws a shape as a fill path
   (`stroke-width="0"`) followed by its outline paths. Identify a shape by its fill
   colour and its coordinates in the viewBox.
3. **Add the keyframes** to the `<style>` element. Create it as the first child of the
   `<svg>` if the file has none.
4. **Add the inline `animation` style** to each element, in the form shown above.
5. **Run the checks** from `AGENTS.md`.
6. **Verify in Chromium and Firefox** on the built site (`pnpm preview`): hover the card
   and capture a frame in the middle of the animation. The step is done when both
   browsers show every animated element away from its rest state, and the user has
   approved the feel in their own browser.

## Rules

- **Rest state is the last frame.** Write keyframes that end at the element's normal
  look, and leave out the `to` frame. A pointer that leaves early makes the element
  jump to the rest state, so the rest state must look correct by itself.
- **Total length is at most 1.2 s**, delays included. Every element finishes inside it.
- **One focal animation.** An accent that pulls attention from the focal element is too
  strong: animate fewer elements, lower the contrast, or use fewer repeats.
- **Match the motion to the object.** A light blinks with `step-end`. A floating or
  growing object uses an ease-out curve.
- **Animate `opacity`, `translate`, and `scale`.** Excalidraw puts a `transform`
  attribute on `<text>` and on some groups, and a CSS `transform` replaces it. Wrap such
  an element in a `<g>` and animate the `<g>`.
- **Scaling needs an origin.** Add `transform-box:fill-box;transform-origin:center` to
  the inline style of an element that scales.
- **Delayed entrances need `backwards`.** An element that starts hidden and has a delay
  uses the `backwards` fill mode, so it is hidden during the delay.
- **Lengths are viewBox units.** `70px` in a keyframe is 70 units of the SVG's viewBox.
- **Animate the fill path only** when a shape should dim or flicker. The outline stays
  still and keeps the shape readable.
- **One name, one definition.** Keyframe names are global on a page that shows several
  cards. Reuse a name from another thumbnail only with an identical body. Give a
  different body a new `thumb-` name.
- **Keep the SVG free of `<mask>` and `url(#id)`.** `AGENTS.md` explains why.
- **Re-exports erase the animation.** An Excalidraw export, `pnpm strip-fonts`, or SVGO
  can remove or rewrite the `<style>` and the inline styles. Add the animation after
  those steps, and add it again after every re-export.

## Verifying

- Preview URLs have no trailing slash: `/blog`, `/projects`.
- The dev server keeps old inline SVG markup after a CSS hot update. Reload the page
  before you judge a change.
- In Chromium, the DevTools protocol command `Animation.setPlaybackRate` slows the
  animation, which makes a middle frame easy to capture.
