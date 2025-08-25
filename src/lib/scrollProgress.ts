type ScrollProgressOptions = {
  barSelector?: string
  fillSelector?: string
}

export const initScrollProgressBar = ({
  barSelector = '#scroll-progress-bar',
  fillSelector = '#scroll-progress-fill',
}: ScrollProgressOptions = {}): (() => void) => {
  const barEl = document.querySelector<HTMLElement>(barSelector)
  const fillEl = document.querySelector<HTMLElement>(fillSelector)
  if (!barEl || !fillEl) return () => {}

  const ROOT = (document.scrollingElement ?? document.documentElement) as HTMLElement
  const SCROLL_OPTS: AddEventListenerOptions = { passive: true }
  const CAPTURE = false // only matters for removeEventListener

  let isFrameScheduled = false
  let scrollRangePx = 1
  let ro: ResizeObserver | undefined

  const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n)

  const measureScrollRange = () => {
    // Prevent divide-by-zero on short pages
    scrollRangePx = Math.max(1, ROOT.scrollHeight - ROOT.clientHeight)
  }

  const updateBar = () => {
    const progress = clamp01(ROOT.scrollTop / scrollRangePx)
    // compositor-only write (no layout)
    fillEl.style.transform = `scaleX(${progress})`
    isFrameScheduled = false
  }

  const scheduleUpdate = () => {
    if (!isFrameScheduled) {
      isFrameScheduled = true
      requestAnimationFrame(updateBar)
    }
  }

  const recalcAndUpdate = () => {
    measureScrollRange()
    scheduleUpdate()
  }

  // Observe content-size changes (images, fonts) so range stays correct
  if (typeof ResizeObserver !== 'undefined') {
    ro = new ResizeObserver(recalcAndUpdate)
    ro.observe(document.documentElement)
  } else {
    window.addEventListener('load', recalcAndUpdate, { once: true })
  }

  window.addEventListener('scroll', scheduleUpdate, SCROLL_OPTS)
  window.addEventListener('resize', recalcAndUpdate, { capture: CAPTURE })
  window.addEventListener('orientationchange', recalcAndUpdate, { capture: CAPTURE })

  recalcAndUpdate()

  // Cleanup
  return () => {
    ro?.disconnect()
    window.removeEventListener('scroll', scheduleUpdate, CAPTURE)
    window.removeEventListener('resize', recalcAndUpdate, CAPTURE)
    window.removeEventListener('orientationchange', recalcAndUpdate, CAPTURE)
    window.removeEventListener('load', recalcAndUpdate, CAPTURE)
  }
}
