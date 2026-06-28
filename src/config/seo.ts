export const defaultSeo = {
  baseTitle: 'Marek Honzal',
  jobTitle: 'Software engineer specializing in frontend architecture',
  pageTitle: (title: string) => `${title} | ${defaultSeo.baseTitle}` as const,
  metaDescription:
    "I'm Marek Honzal, a software engineer specializing in frontend architecture, writing about state management, developer experience, and side projects",
} as const

export const OG_FALLBACK_SLUG = 'base'

export const staticPageOgFallback = {
  id: OG_FALLBACK_SLUG,
  data: {
    title: 'Marek Honzal',
    description:
      'Software engineer specializing in frontend architecture - insights on state management, developer experience, and building scalable apps.',
  },
} as const
