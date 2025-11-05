import type { MarkdownHeading } from 'astro'
import type { CollectionEntry } from 'astro:content'
import type { AstroComponentFactory } from 'astro/runtime/server/index.js'

export type Project = CollectionEntry<'projects'>
export type ProjectData = Project['data']

export type Post = CollectionEntry<'blog'>
export type PostData = Post['data']

export type Technology = {
  title: string
} & (
  | {
      iconName: `logos:${string}`
    }
  | {
      Icon: AstroComponentFactory
    }
)

export type Content = {
  data: {
    isFeatured: boolean
    isDraft: boolean
    date: Date
  }
}

export type TagMetadata = {
  label: string
  count: number
  slug: string
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
