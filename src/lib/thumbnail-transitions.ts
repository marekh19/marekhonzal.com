import { TransitionBeforePreparationEvent } from 'astro:transitions/client'

// Gate the thumbnail view-transition morph to card <-> detail navigations only.
//
// The same `transition:name` lives on list cards (home, /blog, /projects) and on
// the detail-page header. That pairing is the point for the card -> detail morph,
// but it also pairs the home cards with the /blog and /projects cards, so moving
// between list pages drags off-screen thumbnails across the viewport. Names match
// by string and are transitive, so static names can't separate the two cases.
//
// `astro:before-preparation` fires before the outgoing snapshot is captured, and an
// inline `view-transition-name` beats Astro's scoped rule. Dropping the name on the
// old element removes the pairing, so the new thumbnail just fades in place with the
// root crossfade instead of flying in. We keep it whenever either endpoint is a
// detail page, which preserves the card <-> detail morph in both directions.

const isDetailPage = (url: URL): boolean =>
  /^\/blog\/(?!tags\/)[^/]+\/?$/.test(url.pathname) ||
  /^\/projects\/[^/]+\/?$/.test(url.pathname)

document.addEventListener('astro:before-preparation', (event) => {
  if (!(event instanceof TransitionBeforePreparationEvent)) return
  if (isDetailPage(event.from) || isDetailPage(event.to)) return

  document.querySelectorAll<HTMLElement>('[data-thumbnail]').forEach((el) => {
    el.style.viewTransitionName = 'none'
  })
})
