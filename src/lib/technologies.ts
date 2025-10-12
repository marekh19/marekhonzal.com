import ModuleFederation from '@/assets/logos/module-federation.svg'
import Rsbuild from '@/assets/logos/rsbuild.svg'
import Rslib from '@/assets/logos/rslib.svg'
import Zustand from '@/assets/logos/zustand.svg'

import type { Technology } from './types'

type TechnologySlug = keyof typeof TECHNOLOGIES

export const TECHNOLOGIES = {
  react: { title: 'React', iconName: 'logos:react' },
  typescript: { title: 'TypeScript', iconName: 'logos:typescript-icon' },
  vite: { title: 'Vite', iconName: 'logos:vitejs' },
  nextjs: { title: 'Next.js', iconName: 'logos:nextjs-icon' },
  moduleFederation: { title: 'Module federation', Icon: ModuleFederation },
  turboRepo: { title: 'Turborepo', iconName: 'logos:turborepo-icon' },
  prisma: { title: 'Prisma', iconName: 'logos:prisma' },
  trpc: { title: 'tRPC', iconName: 'logos:trpc' },
  python: { title: 'Python', iconName: 'logos:python' },
  zustand: { title: 'Zustand', Icon: Zustand },
  mantine: { title: 'Mantine', iconName: 'logos:mantine-icon' },
  pwa: { title: 'Progressive Web App', iconName: 'logos:pwa' },
  rsbuild: { title: 'Rsbuild', Icon: Rsbuild },
  vitest: { title: 'Vitest', iconName: 'logos:vitest' },
  rslib: { title: 'Rslib', Icon: Rslib },
} as const satisfies Record<string, Technology>

export const TECHNOLOGY_SLUGS = Object.keys(TECHNOLOGIES) as [
  TechnologySlug,
  ...TechnologySlug[],
]
