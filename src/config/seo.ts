export const defaultSeo = {
  baseTitle: 'Marek Honzal',
  pageTitle: (title: string) => `${title} | ${defaultSeo.baseTitle}` as const,
  metaDescription:
    "I'm Marek Honzal, a frontend developer writing about architecture, state management, and developer experience - plus lessons from side projects",
} as const

export const OG_FALLBACK_SLUG = 'base'

export const staticPageOgFallback = {
  id: OG_FALLBACK_SLUG,
  data: {
    title: 'Marek Honzal',
    description:
      'Frontend developer sharing insights on architecture, state management, and building scalable apps.',
  },
} as const
