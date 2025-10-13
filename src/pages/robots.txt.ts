import type { APIRoute } from 'astro'

import { ENV } from '@/config/env'
import PRODUCTION_ROBOTS_TXT from '@/config/robots/production.robots.txt?raw'
import STAGING_ROBOTS_TXT from '@/config/robots/staging.robots.txt?raw'
import { ensureAstroSite } from '@/lib/utils/guards'

const SITEMAP_URL_PLACEHOLDER = '{{SITEMAP_URL}}'

const getSitemapUrl = (site: URL) => new URL('sitemap-index.xml', site).href

const injectSitemapUrl = (content: string, url: string) =>
  content.replace(SITEMAP_URL_PLACEHOLDER, url)

export const GET: APIRoute = ({ site }) => {
  const body = ENV.IS_PRODUCTION
    ? injectSitemapUrl(PRODUCTION_ROBOTS_TXT, getSitemapUrl(ensureAstroSite(site)))
    : STAGING_ROBOTS_TXT

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
    },
  })
}
