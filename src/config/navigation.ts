import { ENV } from './env'
import { ROUTES } from './routes'

type Navigation = {
  href: string
  label: string
}

export const headerNavigation = [
  { href: ROUTES.blog._, label: 'Blog' },
  { href: ROUTES.projects._, label: 'Projects' },
] as const satisfies readonly Navigation[]

export const createfooterNavigation = (siteUrl: URL) =>
  ({
    explore: headerNavigation,
    elsewhere: [
      {
        label: 'Analytics',
        href: ENV.PUBLIC_UMAMI_SHARE_URL,
      },
      {
        label: 'RSS',
        href: new URL('rss.xml', siteUrl).href,
      },
      {
        label: 'Source code',
        href: 'https://github.com/marekh19/marekhonzal.com',
      },
    ],
  }) as const satisfies Record<string, readonly Navigation[]>
