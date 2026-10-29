import type { ImageMetadata, MarkdownHeading } from 'astro'
import type { CollectionEntry } from 'astro:content'

import type { Tag, TagHueClass } from '@/lib/tags'

export type Project = CollectionEntry<'projects'>
export type ProjectData = Project['data']

export type Post = CollectionEntry<'blog'>
export type PostData = Post['data']

export type Technology = {
  title: string
} & (
  | {
      iconName: `${'logos' | 'devicon'}:${string}`
    }
  | {
      // Loaded as a file: these traced logos are 9-47 KB, too heavy to inline.
      logo: ImageMetadata
    }
)

export type Content = {
  data: {
    isFeatured: boolean
    isDraft: boolean
    createdAt: Date
  }
}

export type TagMetadata = {
  label: Tag
  count: number
  slug: string
  hueClass: TagHueClass
}

export type TocHeading = MarkdownHeading & {
  subheadings: TocHeading[]
}

export type BuildTocOptions = {
  rootDepth?: HeadingLevel
  maxDepth?: HeadingLevel
}

export type ReadingTime = {
  text: string
  minutes: number
  words: number
}

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
