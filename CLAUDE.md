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
document before first paint, so compressed HTML size and render-blocking CSS decide the
score. Keep these rules when you change pages or content:

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

After `pnpm run build`, check the brotli-compressed HTML sizes:

```bash
node -e 'for (const f of process.argv.slice(1)) console.log((require("zlib").brotliCompressSync(require("fs").readFileSync(f)).length / 1024).toFixed(1), "KB", f)' dist/index.html dist/*/index.html dist/*/*/index.html
```

Keep the homepage under 14 KB, the amount that fits in the first TCP round trip. Detail
pages were 13-29 KB in October 2026. Prose adds little, so a jump of several KB from one
change usually means inline markup grew.

### Measuring

PageSpeed Insights on the deployed site is the reference. To measure before deploying:

- Serve the build with `pnpm preview`. It sends gzip instead of production's brotli, so
  results are slightly pessimistic.
- Run Lighthouse with a 12x CPU slowdown. PSI runs on slower hardware than a dev machine,
  so the default 4x scores too high. Set `CHROME_PATH` if no system Chrome is installed.

  ```bash
  pnpm dlx lighthouse@13 <url> --only-categories=performance --form-factor=mobile \
    --throttling.cpuSlowdownMultiplier=12 --chrome-flags="--headless=new"
  ```

- Run each page 5 times and compare medians. Single runs at 95-99 with normal FCP but a
  Speed Index near 2.4 s come from headless Chrome rendering at 1 fps, not from the page.
