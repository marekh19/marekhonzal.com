import { ensureDefined } from 'narrowland'

export const ensureAstroSite = (site: URL | undefined) =>
  ensureDefined(site, 'Expected "site" to be defined in astro.config.*')
