import { createHash } from 'node:crypto'

const FRAGMENT_ID = 'svg'

const hashSvg = (svg: string) =>
  createHash('sha256').update(svg).digest('hex').slice(0, 8)

/**
 * Every content SVG as a standalone file, named by content hash for immutable
 * caching. Pages reference them with `<use>` instead of shipping the markup.
 */
export const getExternalSvgFiles = () =>
  Object.values(
    import.meta.glob<string>('/src/content/**/*.svg', {
      query: '?raw',
      import: 'default',
      eager: true,
    }),
  ).map((svg) => ({
    hash: hashSvg(svg),
    svg: svg.replace('<svg ', `<svg id="${FRAGMENT_ID}" `),
  }))

/**
 * Markup that renders `svg` from its file. Custom properties inherit into the
 * `<use>` shadow tree and the page's @font-face applies there, so theming and
 * Excalifont keep working. Only for SVGs without `<mask>` or other `url(#id)`
 * references, which browsers resolve inconsistently across documents.
 */
export const getExternalSvgReference = (svg: string) => {
  const viewBox = /viewBox="([^"]+)"/.exec(svg)?.[1]

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"><use href="/svg/${hashSvg(svg)}.svg#${FRAGMENT_ID}"/></svg>`
}
