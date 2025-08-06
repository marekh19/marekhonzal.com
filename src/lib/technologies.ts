import type { Technology } from './types'

type TechnologySlug = keyof typeof TECHNOLOGIES

export const TECHNOLOGIES = {
  react: { title: 'React', iconName: 'logos:react' },
  typescript: { title: 'TypeScript', iconName: 'logos:typescript-icon' },
  vite: { title: 'Vite', iconName: 'logos:vitejs' },
  nextjs: { title: 'Next.js', iconName: 'logos:nextjs-icon' },
} as const satisfies Record<string, Technology>

export const TECHNOLOGY_SLUGS = Object.keys(TECHNOLOGIES) as [
  TechnologySlug,
  ...TechnologySlug[],
]
