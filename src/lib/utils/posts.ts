import { type CollectionEntry } from 'astro:content'
import { createSlugifiedString } from './string'

type Post = CollectionEntry<'blog'>

export type TagMetadata = {
  label: string
  count: number
  slug: string
}

const NUM_FEATURED_POSTS = 3

const getFeaturedPosts = (posts: Post[]): Post[] =>
  posts.filter((post) => post.data.isFeatured)

const getNonFeaturedPosts = (posts: Post[]): Post[] =>
  posts.filter((post) => !post.data.isFeatured)

const getTopN = (posts: Post[], n: number): Post[] => posts.slice(0, n)

export const getSortedPostsByDateDesc = (posts: Post[]): Post[] =>
  posts.toSorted((a, b) => b.data.date.getTime() - a.data.date.getTime())

export const getFeaturedSectionPosts = (
  posts: Post[],
  numOfPosts = NUM_FEATURED_POSTS,
): Post[] => {
  const sortedFeatured = getSortedPostsByDateDesc(getFeaturedPosts(posts))
  const featured = getTopN(sortedFeatured, numOfPosts)

  const remainingCount = numOfPosts - featured.length
  if (remainingCount === 0) return featured

  const sortedNonFeatured = getSortedPostsByDateDesc(getNonFeaturedPosts(posts))
  const fallback = getTopN(sortedNonFeatured, remainingCount)

  return [...featured, ...fallback]
}

export const shouldIncludePost = (post: Post): boolean =>
  import.meta.env.DEV ? true : !post.data.isDraft

export const getAllTags = (posts: Post[]): string[] => [
  ...new Set(posts.flatMap((post) => post.data.tags ?? [])),
]

export const getPostTagMetadata = (posts: Post[], uniqueTags: string[]): TagMetadata[] =>
  uniqueTags.map((tag) => ({
    label: tag,
    count: posts.reduce(
      (count, post) => count + (post.data.tags?.includes(tag) ? 1 : 0),
      0,
    ),
    slug: createSlugifiedString(tag),
  }))

export const getSortedTagMetadataByCount = (tagMetadata: TagMetadata[]): TagMetadata[] =>
  tagMetadata.toSorted((a, b) => b.count - a.count)

export const getPostsByTag = (posts: Post[], tag: string): Post[] =>
  posts.filter((post) => post.data.tags?.includes(tag))
