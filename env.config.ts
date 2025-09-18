import type { AstroUserConfig } from 'astro'
import { envField } from 'astro/config'

export const envConfig = {
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
} as const satisfies AstroUserConfig['env']
