import { PUBLIC_UMAMI_SHARE_URL, PUBLIC_UMAMI_SITE_ID } from 'astro:env/client'
import { ENV_NAME, SITE_URL } from 'astro:env/server'

const IS_PRODUCTION = ENV_NAME === 'production'
const IS_LOCAL = import.meta.env.DEV

export const ENV = {
  IS_LOCAL,
  IS_PRODUCTION,
  SITE_URL,
  ENV_NAME,
  PUBLIC_UMAMI_SITE_ID,
  PUBLIC_UMAMI_SHARE_URL,
} as const
