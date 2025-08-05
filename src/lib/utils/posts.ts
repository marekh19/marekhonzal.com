import { type CollectionEntry } from 'astro:content'

import { createSlugifiedString } from './string'

export type Post = CollectionEntry<'blog'>

export type TagMetadata = {
  label: string
  count: number
  slug: string
}

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

export const getTagsWithSlugs = (tags?: string[]) =>
  tags
    ? tags.map((tag) => ({
        label: tag,
        slug: createSlugifiedString(tag),
      }))
    : null
