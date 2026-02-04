import 'preact'

declare module 'preact' {
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface HTMLAttributes {
      tw?: string // allow twind's `tw` prop
    }
  }
}

declare global {
  const umami: {
    track(eventName: string, data?: Record<string, unknown>): void
  }
}
