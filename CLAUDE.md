# Project notes

## Verify after each iteration

Use the pnpm scripts (not raw `npx`/`astro`). Run after each change:

```bash
pnpm run format:write
pnpm run lint:check
pnpm run typecheck
pnpm run build
```

All four must pass before considering a change done.

## Package manager

pnpm only. Node >=24, pnpm >=10 (`engineStrict`).

## Performance

Every page scores 100 on mobile PageSpeed Insights. Lighthouse loads the whole HTML
document before first paint, so compressed HTML size and render-blocking CSS decide FCP.
Keep these rules when you change pages or content:

- **Requests before LCP**: before the first paint, start only the requests that the first
  screen needs. Start every other request after the first paint. PSI runs Lighthouse 13.5,
  which adds every request that finishes before LCP on its unthrottled load to the LCP
  estimate. It skips only low-priority images, and it counts a request even when the LCP
  element does not use it. `src/lib/external-svg-loader.ts` sets each `<use>` href when
  its SVG comes within one screen height of the viewport. This cut homepage LCP from 2.2 s
  to 1.5 s in October 2026 (Lighthouse 13.5.0, 12x CPU, median of 3 runs).
- **SVGs**: inline only SVGs visible on first load. Load the rest from a cached file:
  `<Thumbnail>` without `inline`, or `<ExternalSvg>` with a `?raw` import in MDX. Keep an
  SVG inline (`import X from './x.svg'`) when it uses `<mask>` or `url(#id)`, because
  browsers resolve those references inconsistently through `<use>`.
- **Excalidraw exports**: run `pnpm strip-fonts`, then SVGO 4 with `floatPrecision: 1` and
  the `preset-default` override `cleanupIds: false`. Shortened IDs collide between inline
  SVGs on the same page and break their masks.
- **daisyUI**: add a component to the `include` allowlist in `src/styles/global.css`
  before you use it. Components outside the list get no styles.
- **Client scripts**: read layout (`scrollHeight`, `getBoundingClientRect`) in a
  `ResizeObserver` or event callback. A read while the module evaluates forces a full
  layout before first paint.
- **Fonts and CSS**: keep the font preloads and the external stylesheet. Removing the
  preloads raised CLS to 0.107. Inlining the CSS made FCP slower.

After `pnpm run build`, check the HTML sizes at brotli quality 4, which matches what
Cloudflare sends:

```bash
node -e 'const z = require("zlib"); for (const f of process.argv.slice(1)) console.log((z.brotliCompressSync(require("fs").readFileSync(f), { params: { [z.constants.BROTLI_PARAM_QUALITY]: 4 } }).length / 1024).toFixed(1), "KB", f)' dist/index.html dist/*/index.html dist/*/*/index.html
```

Keep the homepage under 12.5 KB. The command prints KiB, and the response headers add
about 1.5 KB, so 12.5 KB of HTML fits in the first TCP round trip (14.6 KB). A larger
homepage needs one more round trip, about 150 ms in Lighthouse's mobile throttling. In
October 2026 the homepage was 14.9 KB and still scored 100, so treat 12.5 KB as a target
that adds LCP margin, not as a gate. Detail pages were 15-34 KB. Prose adds little, so a
jump of several KB from one change usually means inline markup grew.

### Measuring

PageSpeed Insights on the deployed site is the reference. To measure before deploying:

- Serve the build with `pnpm preview`. It sends gzip instead of production's brotli, so
  results are slightly pessimistic.
- Run the Lighthouse version that PSI names in its report footer (13.5.0 in October 2026).
  Lighthouse 13.6 sets LCP equal to FCP when the LCP element is text painted in the first
  frame, so it hides the LCP that PSI reports.
- Run Lighthouse with a 12x CPU slowdown. PSI runs on slower hardware than a dev machine,
  so the default 4x scores too high. Set `CHROME_PATH` if no system Chrome is installed,
  and add `--no-sandbox` to `--chrome-flags` if Chrome exits with "No usable sandbox".

  ```bash
  pnpm dlx lighthouse@13.5.0 <url> --only-categories=performance --form-factor=mobile \
    --throttling.cpuSlowdownMultiplier=12 --chrome-flags="--headless=new"
  ```

- Run each page 5 times and compare medians. Single runs at 95-99 with normal FCP but a
  Speed Index near 2.4 s come from headless Chrome rendering at 1 fps, not from the page.
