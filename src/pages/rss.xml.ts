import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import rss from '@astrojs/rss'

import { ENV } from '@/config/env'
import { ROUTES } from '@/config/routes'
import { defaultSeo } from '@/config/seo'
import { getSortedContentByDateDesc, shouldIncludeItem } from '@/lib/utils/content'
import { ensureAstroSite } from '@/lib/utils/guards'

export const GET: APIRoute = async ({ site }) => {
  if (!ENV.IS_PRODUCTION) {
    return new Response(null, { status: 404, statusText: 'Not found' })
  }

  const posts = await getCollection('blog', shouldIncludeItem)
  const sortedPosts = getSortedContentByDateDesc(posts)

  return rss({
    trailingSlash: false,
    title: defaultSeo.baseTitle,
    description: defaultSeo.metaDescription,
    site: ensureAstroSite(site),
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.createdAt,
      description: post.data.description,
      link: ROUTES.blog.post(post.id),
    })),
  })
}
