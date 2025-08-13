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
