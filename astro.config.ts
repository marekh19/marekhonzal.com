import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import preact from '@astrojs/preact'
import mdx from '@astrojs/mdx'
import icon from 'astro-icon'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://marekhonzal.com',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [preact(), mdx(), icon(), sitemap({ lastmod: new Date() })],
  trailingSlash: 'never',
  markdown: {
    shikiConfig: {
      themes: {
        light: 'catppuccin-latte',
        dark: 'catppuccin-mocha',
      },
    },
  },
})
