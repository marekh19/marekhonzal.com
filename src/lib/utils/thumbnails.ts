/**
 * Every thumbnail is an inline SVG (themeable, follows the color-scheme toggle).
 * Convention: <collection>/<slug>/thumbnail.svg. Resolved at build, no runtime JS.
 */
export const getThumbnails = () => {
  return import.meta.glob<string>('/src/content/**/thumbnail.svg', {
    query: '?raw',
    import: 'default',
    eager: true,
  })
}
