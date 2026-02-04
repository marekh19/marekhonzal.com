type TrackOnceOnScrollOptions = {
  threshold?: number
  oncePer?: 'session' | 'visit'
  eventProperties?: Record<string, unknown>
}

class UmamiEventTracker {
  public selectorIds = {
    homepage: {
      projectsLink: 'see-all-projects-btn',
    },
  } as const

  public trackOnceOnScroll(
    selector: string,
    eventName: string,
    options: TrackOnceOnScrollOptions = {},
  ) {
    const { threshold = 0.5, oncePer = 'session', eventProperties } = options
    const storageKey = `tracked-${eventName}`

    if (oncePer === 'session' && sessionStorage.getItem(storageKey)) return

    const target = document.querySelector(selector)
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          umami.track(eventName, eventProperties)
          if (oncePer === 'session') {
            sessionStorage.setItem(storageKey, 'true')
          }
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(target)

    return () => observer.disconnect()
  }
}

export const umamiEventTracker = new UmamiEventTracker()
