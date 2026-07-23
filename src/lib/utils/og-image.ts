import fs from 'fs'
import path from 'path'
import { Resvg } from '@resvg/resvg-js'

import { OG_IMAGE } from '@/config/seo'

// Build-time OG rendering. Thumbnails are Excalidraw SVGs baked with CSS
// variables + oklch() (incl. relative color) that resvg doesn't understand, so
// we flatten every color to sRGB against the dark theme (the brand default)
// before handing the SVG to resvg. Excalifont is the whole type system, so the
// images read as one sketchbook with the hand-drawn thumbnails.

const { width: W, height: H } = OG_IMAGE
const PAD = 90

const read = (p: string) => fs.readFileSync(path.resolve(process.cwd(), p), 'utf8')

// --- color: resolve theme tokens + oklch() to sRGB -------------------------

// Dark theme token values, parsed from source so they can't drift.
type Lch = { l: number; c: number; h: number }
const tokens: Record<string, Lch> = {}
for (const m of read('src/styles/themes/theme-dark.css').matchAll(
  /--(color-[a-z0-9-]+):\s*oklch\(([\d.]+) ([\d.]+) ([\d.]+)\)/g,
)) {
  tokens[m[1]] = { l: Number(m[2]), c: Number(m[3]), h: Number(m[4]) }
}

// oklch -> sRGB (Björn Ottosson). In-gamut clamp is fine: theme colors are
// chosen to be displayable.
const gamma = (x: number) =>
  x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055
const to255 = (x: number) => Math.min(255, Math.max(0, Math.round(x * 255)))

const oklch = (l: number, c: number, h: number, a = 1) => {
  const hr = (h * Math.PI) / 180
  const oa = c * Math.cos(hr)
  const ob = c * Math.sin(hr)
  const ll = (l + 0.3963377774 * oa + 0.2158037573 * ob) ** 3
  const mm = (l - 0.1055613458 * oa - 0.0638541728 * ob) ** 3
  const ss = (l - 0.0894841775 * oa - 1.291485548 * ob) ** 3
  const r = gamma(4.0767416621 * ll - 3.3077115913 * mm + 0.2309699292 * ss)
  const g = gamma(-1.2684380046 * ll + 2.6097574011 * mm - 0.3413193965 * ss)
  const b = gamma(-0.0041960863 * ll - 0.7034186147 * mm + 1.707614701 * ss)
  return `rgba(${to255(r)},${to255(g)},${to255(b)},${a})`
}

const color = (name: string, a = 1) => {
  const t = tokens[name]
  return t ? oklch(t.l, t.c, t.h, a) : 'transparent'
}

// L slot of a relative color: `l` (keep), a number, or `calc(l ± n)`.
const lValue = (spec: string, baseL: number) => {
  if (spec === 'l') return baseL
  const calc = spec.match(/calc\(l ([+-]) ([\d.]+)\)/)
  if (calc) return baseL + (calc[1] === '+' ? 1 : -1) * Number(calc[2])
  return Number(spec)
}

const hexRgba = (hex: string, a: number) => {
  const raw = hex.slice(1)
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map((x) => x + x)
          .join('')
      : raw
  const int = parseInt(full, 16)
  return `rgba(${(int >> 16) & 255},${(int >> 8) & 255},${int & 255},${a})`
}

// Resolve every var()/oklch() form the thumbnails actually use. C/H are always
// kept in the source, so only L and alpha ever vary.
const flatten = (svg: string) =>
  svg
    .replace(
      /oklch\(from var\(--(color-[a-z0-9-]+)\) (l|[\d.]+|calc\(l [+-] [\d.]+\)) c h(?: \/ ([\d.]+))?\)/g,
      (whole, name: string, l: string, a?: string) => {
        const t = tokens[name]
        return t ? oklch(lValue(l, t.l), t.c, t.h, a ? Number(a) : 1) : whole
      },
    )
    // Same, tolerating a missing closing paren — browsers auto-close unclosed
    // CSS functions at value end, resvg doesn't, so an authoring typo would
    // otherwise render as black.
    .replace(
      /oklch\(from var\(--(color-[a-z0-9-]+)\) (l|[\d.]+|calc\(l [+-] [\d.]+\)) c h(?= *")/g,
      (whole, name: string, l: string) => {
        const t = tokens[name]
        return t ? oklch(lValue(l, t.l), t.c, t.h) : whole
      },
    )
    .replace(
      /oklch\(from (#[0-9a-fA-F]+) l c h(?: \/ ([\d.]+))?\)/g,
      (_whole, hex: string, a?: string) => hexRgba(hex, a ? Number(a) : 1),
    )
    .replace(
      /oklch\(([\d.]+) ([\d.]+) ([\d.]+)(?: \/ ([\d.]+))?\)/g,
      (_whole, l: string, c: string, h: string, a?: string) =>
        oklch(Number(l), Number(c), Number(h), a ? Number(a) : 1),
    )
    .replace(/var\(--(color-[a-z0-9-]+)\)/g, (whole, name: string) =>
      tokens[name] ? color(name) : whole,
    )

// --- SVG building blocks ---------------------------------------------------

// Drafting-paper background: base fill + primary-tinted dot grid + top glow.
// Mirrors .thumb-surface, scaled up: the thumbnail's 15px grid lives on a
// ~360px card (max-w-90), so on the 1200px OG the equivalent spacing is
// 15 * 1200/360 ≈ 50px (dot radius kept at the same 1.1/15 ratio).
const DOT_GAP = 50
const DOT_R = 3.6
const paper = `
  <defs>
    <pattern id="dots" width="${DOT_GAP}" height="${DOT_GAP}" patternUnits="userSpaceOnUse">
      <circle cx="${DOT_GAP / 2}" cy="${DOT_GAP / 2}" r="${DOT_R}" fill="${color('color-primary', 0.16)}"/>
    </pattern>
    <radialGradient id="glow" cx="50%" cy="0%" r="90%">
      <stop offset="0%" stop-color="${color('color-primary', 0.12)}"/>
      <stop offset="55%" stop-color="rgba(0,0,0,0)"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${color('color-base-100')}"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>`

// The shared hand-drawn wordmark, bottom-left.
const wordmark = `<text x="${PAD}" y="${H - 44}" font-family="Excalifont" font-size="32" fill="${color('color-base-content')}">Marek Honzal <tspan fill="${color('color-primary')}">· marekhonzal.com</tspan></text>`

type Box = { x: number; y: number; w: number; h: number }

// Contain-fit a colocated sketch SVG into a box, preserving its aspect ratio.
const place = (svg: string, box: Box) => {
  const [, , vw = 1, vh = 1] = (svg.match(/viewBox="([\d.\s]+)"/)?.[1] ?? '')
    .split(/\s+/)
    .map(Number)
  const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')
  return `<svg x="${box.x}" y="${box.y}" width="${box.w}" height="${box.h}" viewBox="0 0 ${vw} ${vh}" preserveAspectRatio="xMidYMid meet">${inner}</svg>`
}

const FONT = {
  loadSystemFonts: false,
  fontFiles: [path.resolve(process.cwd(), 'src/assets/og-fonts/Excalifont.ttf')],
  defaultFontFamily: 'Excalifont',
}

// Wrap content over the paper + wordmark and rasterize to PNG.
const render = (content: string) =>
  new Resvg(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${paper}${content}${wordmark}</svg>`,
    { fitTo: { mode: 'width', value: W }, font: FONT },
  )
    .render()
    .asPng()

// --- public API ------------------------------------------------------------

// Detail-page OG: the thumbnail, contain-fit on the paper.
export const renderThumbnailOg = (thumbnailSvg: string) =>
  render(
    place(flatten(thumbnailSvg), {
      x: PAD,
      y: PAD - 20,
      w: W - PAD * 2,
      h: H - PAD * 2 - 40,
    }),
  )

// Site-wide fallback OG (home, listing pages, tags): a tagline on the left and
// the avatar as art on the right — same layout language as the detail images.
// The name lives only in the wordmark, never doubled.
const GENERIC_TAGLINE = [
  'Frontend architecture,',
  'state management,',
  'and side projects.',
]

export const renderGenericOg = () => {
  const avatar = read('src/assets/avatar.svg').replace(
    /currentColor/g,
    color('color-base-content'),
  )
  const tagline = GENERIC_TAGLINE.map(
    (line, i) => `<tspan x="${PAD}" dy="${i === 0 ? 0 : 62}">${line}</tspan>`,
  ).join('')
  const artX = 660

  return render(
    `<text y="240" font-family="Excalifont" font-size="52" fill="${color('color-base-content')}">${tagline}</text>
    ${place(avatar, { x: artX, y: 110, w: W - artX - PAD, h: H - 230 })}`,
  )
}
