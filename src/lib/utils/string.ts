export const createSlugifiedString = (str: string) => {
  return str
    .normalize('NFD') // decompose accents
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .trim()
    .replace(/[^A-Za-z0-9 ]/g, '') // remove special chars
    .replace(/\s+/g, '-') // replace spaces with -
    .replace(/^-+|-+$/g, '') // remove leading/trailing hyphens
    .toLowerCase()
}

export const getGitHubRepoPart = (url: string): string | null => {
  try {
    const { hostname, pathname } = new URL(url)
    if (hostname !== 'github.com') return null

    const parts = pathname.split('/').filter(Boolean)
    if (parts.length < 2) return null

    return `${parts[0]}/${parts[1]}`
  } catch {
    return null
  }
}

export const getDisplayDomain = (url: string): string | null => {
  try {
    return new URL(url).hostname
  } catch {
    return null
  }
}
