type Content = {
  data: {
    isFeatured: boolean
    isDraft: boolean
    date: Date
  }
}

const NUM_FEATURED_ITEMS = 3

const getFeaturedItems = <T extends Content>(items: T[]): T[] =>
  items.filter((item) => item.data.isFeatured)

const getNonFeaturedItems = <T extends Content>(items: T[]): T[] =>
  items.filter((item) => !item.data.isFeatured)

const getTopN = <T extends Content>(items: T[], n: number): T[] => items.slice(0, n)

export const getSortedContentByDateDesc = <T extends Content>(items: T[]): T[] =>
  items.toSorted((a, b) => b.data.date.getTime() - a.data.date.getTime())

export const getFeaturedSectionContent = <T extends Content>(
  items: T[],
  numOfItems = NUM_FEATURED_ITEMS,
): T[] => {
  const sortedFeatured = getSortedContentByDateDesc(getFeaturedItems(items))
  const featured = getTopN(sortedFeatured, numOfItems)

  const remainingCount = numOfItems - featured.length
  if (remainingCount === 0) return featured

  const sortedNonFeatured = getSortedContentByDateDesc(getNonFeaturedItems(items))
  const fallback = getTopN(sortedNonFeatured, remainingCount)

  return [...featured, ...fallback]
}

export const shouldIncludeItem = <T extends Content>(item: T): boolean =>
  import.meta.env.DEV ? true : !item.data.isDraft
