import { defaultSeo } from '@/config/seo'
import { socials } from '@/config/socials'
import type { Post } from '@/lib/types'

import { ROUTES } from './routes'

const IDS = {
  website: 'website',
  me: 'me',
} as const

type EntityId = (typeof IDS)[keyof typeof IDS]

const SITE_TITLE = defaultSeo.baseTitle
const SITE_DESCRIPTION = defaultSeo.metaDescription
const SAME_AS = socials.flatMap((s) => (s.id !== 'mail' ? [s.url] : []))
const CONTEXT = { '@context': 'https://schema.org' } as const

const createId = (id: EntityId, siteUrl: URL) => `${siteUrl.origin}#${id}` as const

export const createWebsiteSchema = (siteUrl: URL) =>
  ({
    ...CONTEXT,
    '@type': 'WebSite',
    '@id': createId(IDS.website, siteUrl),
    name: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: siteUrl,
    inLanguage: 'en',
    publisher: { '@id': createId(IDS.me, siteUrl) },
  }) as const

export const createPersonSchema = (siteUrl: URL) =>
  ({
    ...CONTEXT,
    '@type': 'Person',
    '@id': createId(IDS.me, siteUrl),
    name: 'Marek Honzal',
    url: siteUrl,
    sameAs: SAME_AS,
  }) as const

export const createBlogPostSchema = (siteUrl: URL, post: Post, wordCount: number) =>
  ({
    ...CONTEXT,
    '@type': 'BlogPosting',
    '@id': new URL(`${ROUTES.blog.post(post.id)}#article`, siteUrl),
    url: new URL(ROUTES.blog.post(post.id), siteUrl),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': new URL(ROUTES.blog.post(post.id), siteUrl),
    },

    headline: post.data.title,
    description: post.data.description,
    image: [new URL(`/og/${post.id}.png`, siteUrl)],

    author: { '@id': createId(IDS.me, siteUrl) },
    publisher: { '@id': createId(IDS.me, siteUrl) },

    datePublished: post.data.createdAt.toISOString(),
    ...(post.data.updatedAt && { dateModified: post.data.updatedAt.toISOString() }),

    inLanguage: 'en',
    keywords: post.data.tags,
    wordCount,
  }) as const
