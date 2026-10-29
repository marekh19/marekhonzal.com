// Hue steps of the .badge-tag-* classes in global.css.
type TagHueStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

export type Tag = keyof typeof TAGS

// Tags that share a post or sit next to each other in the /blog filter are at
// least 2 steps (60°) apart. Recheck when a new post adds tags or reorders the filter.
const TAGS = {
  AI: 1,
  Astro: 0,
  'Case Study': 3,
  DX: 8,
  'Micro Frontends': 2,
  'Next.js': 9,
  Patterns: 4,
  Performance: 5,
  SEO: 7,
  Tooling: 6,
  TypeScript: 10,
} as const satisfies Record<string, TagHueStep>

// z.enum needs a non-empty tuple, but Object.keys returns string[].
export const TAG_LABELS = Object.keys(TAGS) as [Tag, ...Tag[]]

export const getTagBadgeClass = (tag: Tag) => `badge-tag-${TAGS[tag]}` as const
