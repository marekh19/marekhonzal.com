export const ROUTES = {
  home: '/',
  blog: {
    _: '/blog',
    post: (slug: string) => `${ROUTES.blog._}/${slug}` as const,
    tag: (tag: string) => `${ROUTES.blog._}/tags/${tag}` as const,
  },
  projects: {
    _: '/projects',
    detail: (slug: string) => `${ROUTES.projects._}/${slug}` as const,
  },
} as const
