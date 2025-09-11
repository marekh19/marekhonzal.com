import { ENV } from '@/config/env'
import type { Content } from '@/lib/types'

const NUM_FEATURED_ITEMS = 3

export const getFeaturedItems = <T extends Content>(items: readonly T[]): readonly T[] =>
  items.filter((item) => item.data.isFeatured)

export const getNonFeaturedItems = <T extends Content>(
  items: readonly T[],
): readonly T[] => items.filter((item) => !item.data.isFeatured)

const getTopN = <T extends Content>(items: readonly T[], n: number): readonly T[] =>
  items.slice(0, n)

export const getSortedContentByDateDesc = <T extends Content>(
  items: readonly T[],
): readonly T[] => items.toSorted((a, b) => b.data.date.getTime() - a.data.date.getTime())

export const getFeaturedSectionContent = <T extends Content>(
  items: readonly T[],
  numOfItems = NUM_FEATURED_ITEMS,
): readonly T[] => {
  const sortedFeatured = getSortedContentByDateDesc(getFeaturedItems(items))
  const featured = getTopN(sortedFeatured, numOfItems)

  const remainingCount = numOfItems - featured.length
  if (remainingCount === 0) return featured

  const sortedNonFeatured = getSortedContentByDateDesc(getNonFeaturedItems(items))
  const fallback = getTopN(sortedNonFeatured, remainingCount)

  return [...featured, ...fallback]
}

/** Include draft posts in local dev server only */
export const shouldIncludeItem = (item: Readonly<Content>): boolean =>
  ENV.IS_LOCAL ? true : !item.data.isDraft
