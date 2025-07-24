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
        href: 'https://cloud.umami.is/share/QCsE3MY95M1aH0wE/marekhonzal.com',
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
