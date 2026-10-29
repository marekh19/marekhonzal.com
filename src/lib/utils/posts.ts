import { getTagHueClass, type Tag } from '@/lib/tags'
import type { Post, TagMetadata } from '@/lib/types'

import { createSlugifiedString } from './string'

export const getAllTags = (posts: readonly Post[]): readonly Tag[] => [
  ...new Set(posts.flatMap((post) => post.data.tags ?? [])),
]

export const getPostTagMetadata = (
  posts: readonly Post[],
  uniqueTags: readonly Tag[],
): readonly TagMetadata[] =>
  uniqueTags.map((tag) => ({
    label: tag,
    count: posts.reduce(
      (count, post) => count + (post.data.tags?.includes(tag) ? 1 : 0),
      0,
    ),
    slug: createSlugifiedString(tag),
    hueClass: getTagHueClass(tag),
  }))

export const getSortedTagMetadataByCount = (
  tagMetadata: readonly TagMetadata[],
): readonly TagMetadata[] => tagMetadata.toSorted((a, b) => b.count - a.count)

export const getPostsByTag = (posts: readonly Post[], tag: Tag): readonly Post[] =>
  posts.filter((post) => post.data.tags?.includes(tag))

export const getTagsWithSlugs = (
  tags?: readonly Tag[],
): readonly { label: Tag; slug: string }[] | null =>
  tags
    ? tags.map((tag) => ({
        label: tag,
        slug: createSlugifiedString(tag),
      }))
    : null
