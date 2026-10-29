// Hue steps of the .tag-hue-* classes in global.css.
type TagHueStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

export type Tag = keyof typeof TAGS

// Tags that share a post or sit next to each other in the /blog filter are at
// least 2 steps (60°) apart. Recheck when a new post adds tags or reorders the filter.
const TAGS = {
  AI: 8,
  Astro: 0,
  'Case Study': 7,
  DX: 1,
  'Micro Frontends': 3,
  'Next.js': 4,
  Patterns: 5,
  Performance: 2,
  SEO: 9,
  Tooling: 6,
  TypeScript: 10,
} as const satisfies Record<string, TagHueStep>

// z.enum needs a non-empty tuple, but Object.keys returns string[].
export const TAG_LABELS = Object.keys(TAGS) as [Tag, ...Tag[]]

export const getTagHueClass = (tag: Tag) => `tag-hue-${TAGS[tag]}` as const

export type TagHueClass = ReturnType<typeof getTagHueClass>
