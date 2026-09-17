const root = document.documentElement

document.addEventListener('astro:before-swap', (event) => {
  const swap = event.swap
  event.swap = () => {
    swap()
    // swapRootAttributes() has just cleared <html>, and moveToLocation()
    // runs next, so set the flag here.
    root.dataset.navigating = ''
  }
})

const clear = () => requestAnimationFrame(() => delete root.dataset.navigating)

document.addEventListener('astro:after-swap', clear)
document.addEventListener('astro:page-load', clear)
