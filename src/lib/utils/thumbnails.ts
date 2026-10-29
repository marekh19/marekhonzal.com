import { createHash } from 'node:crypto'

/**
 * Every thumbnail is an SVG themed by CSS variables (follows the color-scheme toggle).
 * Convention: <collection>/<slug>/thumbnail.svg. Resolved at build, no runtime JS.
 */
export const getThumbnails = () => {
  return import.meta.glob<string>('/src/content/**/thumbnail.svg', {
    query: '?raw',
    import: 'default',
    eager: true,
  })
}

const FRAGMENT_ID = 'thumbnail'
const PATH_PATTERN = /^\/src\/content\/(blog|projects)\/([^/]+)\/thumbnail\.svg$/

/**
 * Thumbnails as standalone files, so list pages reference them with `<use>`
 * instead of shipping the markup in their HTML. The content hash in the file
 * name allows immutable caching.
 */
export const getThumbnailFiles = () =>
  Object.entries(getThumbnails()).flatMap(([path, svg]) => {
    const match = PATH_PATTERN.exec(path)
    if (!match) return []

    const [, collection, slug] = match
    const hash = createHash('sha256').update(svg).digest('hex').slice(0, 8)
    const file = `${slug}.${hash}`

    return [
      {
        collection,
        slug,
        file,
        url: `/thumbnails/${collection}/${file}.svg`,
        viewBox: /viewBox="([^"]+)"/.exec(svg)?.[1],
        svg: svg.replace('<svg ', `<svg id="${FRAGMENT_ID}" `),
      },
    ]
  })

/**
 * Custom properties inherit into the `<use>` shadow tree and the page's
 * @font-face applies there, so theming and Excalifont keep working.
 */
export const getThumbnailReference = (collection: string, slug: string) => {
  const thumbnail = getThumbnailFiles().find(
    (item) => item.collection === collection && item.slug === slug,
  )
  if (!thumbnail) return undefined

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${thumbnail.viewBox}"><use href="${thumbnail.url}#${FRAGMENT_ID}"/></svg>`
}
