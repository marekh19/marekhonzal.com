// Strip the embedded Excalifont @font-face from Excalidraw-exported SVGs so
// they use the single global @font-face in src/styles/fonts.css instead of
// re-embedding a ~3 KB base64 copy in every file.
//
// Safe only for SVGs rendered INLINE (Astro SVG-component imports / set:html) —
// an SVG shown via <img>/<Image> can't reach the page's @font-face, so leave its
// embed in place until it's inlined.
//
// Idempotent: files without the embed are skipped. Re-run after adding new
// Excalidraw exports. Runs on Node's native TypeScript stripping (Node >= 23.6).
//
//   pnpm strip-fonts                 # every .svg under src/
//   pnpm strip-fonts a.svg b.svg     # only the given files

import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const SRC = 'src'
const EMBED_MARKER = 'font/woff2;base64'

const args: string[] = process.argv.slice(2)
const files: string[] = args.length
  ? args
  : readdirSync(SRC, { recursive: true })
      .filter((f): f is string => typeof f === 'string' && f.endsWith('.svg'))
      .map((f) => join(SRC, f))

let changed = 0
let saved = 0

for (const file of files) {
  const before = readFileSync(file, 'utf8')
  if (!before.includes(EMBED_MARKER)) continue

  const after = before
    // remove only @font-face rules that embed a base64 woff2 (keep any others)
    .replace(/@font-face\s*\{[^{}]*\}/g, (rule: string) =>
      rule.includes(EMBED_MARKER) ? '' : rule,
    )
    // drop <style> / <defs> wrappers left empty by the removal — eat the
    // leading whitespace/newline too, else the indent that preceded the tag
    // is left dangling as a blank line
    .replace(/\s*<style[^>]*>\s*<\/style>/g, '')
    .replace(/\s*<defs>\s*<\/defs>/g, '')

  if (after === before) continue

  writeFileSync(file, after)
  const delta = Buffer.byteLength(before) - Buffer.byteLength(after)
  changed += 1
  saved += delta
  console.log(`  stripped  ${file}  −${(delta / 1024).toFixed(1)} KB`)
}

console.log(
  changed
    ? `\n${changed} file(s) updated, ${(saved / 1024).toFixed(1)} KB removed from source.`
    : 'nothing to strip — all SVGs already use the global font.',
)
