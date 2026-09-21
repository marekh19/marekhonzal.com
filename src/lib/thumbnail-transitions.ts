// Gate the thumbnail view-transition morph to card <-> detail navigations only.
//
// The same transition name lives on list cards (home, /blog, /projects) and on
// the detail-page header. That pairing is the point for the card -> detail morph,
// but it also pairs the home cards with the /blog and /projects cards, so moving
// between list pages drags off-screen thumbnails across the viewport. Names match
// by string and are transitive, so static names can't separate the two cases.
//
// `pageswap` fires before the outgoing snapshot is captured. Dropping the name on
// the old element removes the pairing, so the new thumbnail fades in place with the
// root crossfade. Restore the name after the transition because the old document may
// later return from the back-forward cache.

const isDetailPage = (url: URL): boolean =>
  /^\/blog\/(?!tags\/)[^/]+\/?$/.test(url.pathname) ||
  /^\/projects\/[^/]+\/?$/.test(url.pathname)

window.addEventListener('pageswap', (event) => {
  if (!event.viewTransition || !event.activation) return

  const destination = event.activation.entry.url
  if (!destination) return

  const from = new URL(window.location.href)
  const to = new URL(destination)
  if (isDetailPage(from) || isDetailPage(to)) return

  const thumbnails = document.querySelectorAll<HTMLElement>('[data-thumbnail]')

  thumbnails.forEach((element) => {
    element.style.viewTransitionName = 'none'
  })

  const restoreTransitionNames = () => {
    thumbnails.forEach((element) => {
      element.style.removeProperty('view-transition-name')
    })
  }

  event.viewTransition.finished.then(restoreTransitionNames, restoreTransitionNames)
})
