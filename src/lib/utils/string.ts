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
