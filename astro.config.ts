import mdx from '@astrojs/mdx'
import preact from '@astrojs/preact'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'
import { defineConfig, envField } from 'astro/config'
import rehypeMermaid from 'rehype-mermaid'
import sectionize from 'remark-sectionize'
import { loadEnv } from 'vite'

const { SITE_URL } = loadEnv(process.env.SITE_URL!, process.cwd(), '')
const { ENV_NAME } = loadEnv(process.env.ENV_NAME!, process.cwd(), '')

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      SITE_URL: envField.string({
        context: 'server',
        access: 'public',
        default: 'http://localhost:4321',
      }),
      ENV_NAME: envField.string({
        context: 'server',
        access: 'public',
        default: 'staging',
      }),
      PUBLIC_UMAMI_SITE_ID: envField.string({
        context: 'client',
        access: 'public',
        default: crypto.randomUUID(),
      }),
      PUBLIC_UMAMI_SHARE_URL: envField.string({
        context: 'client',
        access: 'public',
        default: 'https://cloud.umami.is',
      }),
    },
  },
  site: SITE_URL ?? 'http://localhost:4321',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
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
      excludeLangs: ['mermaid'],
    },
    shikiConfig: {
      themes: {
        light: 'catppuccin-latte',
        dark: 'catppuccin-mocha',
      },
    },
    rehypePlugins: [[rehypeMermaid, { strategy: 'img-svg', dark: true }]],
    remarkPlugins: [sectionize],
  },
})
