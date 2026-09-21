import type { KnipConfig } from 'knip'

export default {
  astro: {
    config: ['astro.config.{js,cjs,mjs,ts,mts}'],
    entry: [
      'src/content/config.ts',
      'src/pages/**/*.{astro,mdx,ts}',
      '!src/pages/**/_*',
      '!src/pages/**/_*/**',
      'src/content/**/*.mdx',
    ],
    project: ['src/**/*'],
  },
  ignore: [
    // Scripts below are false positives. Not recognized by knip for some reason
    'src/lib/copy-code.ts',
    'src/lib/thumbnail-transitions.ts',
  ],
  ignoreDependencies: [
    '@iconify-json/logos',
    '@iconify-json/lucide',
    '@iconify-json/ph',
    '@iconify-json/devicon',
    'wrangler',
  ],
} satisfies KnipConfig
