import type { KnipConfig } from 'knip'

export default {
  astro: {
    config: ['astro.config.{js,cjs,mjs,ts,mts}'],
    entry: [
      'src/content/config.ts',
      'src/content.config.ts',
      'src/pages/**/*.{astro,mdx,js,ts}',
      '!src/pages/**/_*',
      '!src/pages/**/_*/**',
      'src/content/**/*.mdx',
    ],
    project: ['src/**/*'],
  },
  ignore: ['src/lib/copy-code.ts'],
  ignoreDependencies: [
    '@iconify-json/logos',
    '@iconify-json/lucide',
    '@iconify-json/ph',
    'sharp',
    '@tailwindcss/typography',
    'tailwindcss',
    'wrangler',
    'daisyui',
  ],
} satisfies KnipConfig
