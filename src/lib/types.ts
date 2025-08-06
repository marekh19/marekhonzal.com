import type { CollectionEntry } from 'astro:content'

export type Project = CollectionEntry<'projects'>
export type ProjectData = Project['data']

export type Post = CollectionEntry<'blog'>
export type PostData = Post['data']

export type Technology = {
  title: string
  iconName: `logos:${string}`
}
