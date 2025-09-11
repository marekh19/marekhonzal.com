import type { APIRoute } from 'astro'

import PRODUCTION_ROBOTS_TXT from '@/config/robots/production.robots.txt?raw'
import STAGING_ROBOTS_TXT from '@/config/robots/staging.robots.txt?raw'
import { raise } from '@/lib/utils/common'

const SITEMAP_URL_PLACEHOLDER = '{{SITEMAP_URL}}'
const IS_PRODUCTION = import.meta.env.ENV_NAME === 'production'

const getSitemapUrl = (site: URL) => new URL('sitemap-index.xml', site).href

const injectSitemapUrl = (content: string, url: string) =>
  content.replace(SITEMAP_URL_PLACEHOLDER, url)

export const GET: APIRoute = ({ site }) => {
  const body = IS_PRODUCTION
    ? injectSitemapUrl(
        PRODUCTION_ROBOTS_TXT,
        getSitemapUrl(site ?? raise('Expected "site" to be defined in astro.config.*')),
      )
    : STAGING_ROBOTS_TXT

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
    },
  })
}
