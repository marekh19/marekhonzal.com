import mdx from '@astrojs/mdx'
import preact from '@astrojs/preact'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'
import rehypeMermaid from 'rehype-mermaid'
import sectionize from 'remark-sectionize'

// https://astro.build/config
export default defineConfig({
  site: 'https://marekhonzal.com',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [preact(), mdx(), icon(), sitemap({ lastmod: new Date() })],
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
