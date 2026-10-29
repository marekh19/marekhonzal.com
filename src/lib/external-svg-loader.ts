// Set the `<use>` href of external SVGs (see getExternalSvgReference) only when they come
// within one screen height of the viewport. `<use>` files are not images, so PSI's
// Lighthouse counts them toward LCP when they load with the page (see "Requests before
// LCP" in CLAUDE.md). The thumbnail morph needs no exception: the incoming image starts
// at opacity 0, and its file arrives one frame later.

const loadSvg = (use: SVGUseElement) => {
  const { href } = use.dataset
  if (href) use.setAttribute('href', href)
}

const observer = new IntersectionObserver(
  (entries) => {
    entries
      .filter((entry) => entry.isIntersecting)
      .forEach((entry) => {
        observer.unobserve(entry.target)
        entry.target.querySelectorAll<SVGUseElement>('use[data-href]').forEach(loadSvg)
      })
  },
  { rootMargin: '100% 0px' },
)

document.querySelectorAll<SVGUseElement>('use[data-href]').forEach((use) => {
  if (use.ownerSVGElement) observer.observe(use.ownerSVGElement)
})
