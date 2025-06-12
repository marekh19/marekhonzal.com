export const ROUTES = {
  home: '/',
  about: '/about',
  blog: '/blog',
  post: (slug: string) => `${ROUTES.blog}/${slug}` as const,
} as const
