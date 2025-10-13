import { ensure } from 'narrowland'

export const ensureAstroSite = (site: URL | undefined) =>
  ensure(site, 'Expected "site" to be defined in astro.config.*')
