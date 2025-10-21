import mdx from '@astrojs/mdx'
import preact from '@astrojs/preact'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'
import sectionize from 'remark-sectionize'
import { loadEnv } from 'vite'

import { envConfig } from './env.config.ts'
import { remarkReadingTime } from './plugins/remark-reading-time'

const { SITE_URL } = loadEnv(process.env.SITE_URL!, process.cwd(), '')
const { ENV_NAME } = loadEnv(process.env.ENV_NAME!, process.cwd(), '')

// https://astro.build/config
export default defineConfig({
  env: envConfig,
  site: SITE_URL ?? 'http://localhost:4321',
  vite: {
    // @ts-expect-error https://tailwindcss.com/docs/installation/framework-guides/astro
    plugins: [tailwindcss()],
  },
  integrations: [
    preact(),
    mdx(),
    icon(),
    (ENV_NAME ?? 'staging') === 'production' && sitemap({ lastmod: new Date() }),
  ],
  trailingSlash: 'never',
  markdown: {
    syntaxHighlight: {
      type: 'shiki',
    },
    shikiConfig: {
      themes: {
        light: 'catppuccin-latte',
        dark: 'catppuccin-mocha',
      },
    },
    remarkPlugins: [sectionize, remarkReadingTime],
  },
})
