import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import rss from '@astrojs/rss'

import { ROUTES } from '@/config/routes'
import { defaultSeo } from '@/config/seo'
import { raise } from '@/lib/utils/common'
import { getSortedContentByDateDesc, shouldIncludeItem } from '@/lib/utils/content'

export const GET: APIRoute = async (context) => {
  const posts = await getCollection('blog', shouldIncludeItem)
  const sortedPosts = getSortedContentByDateDesc(posts)

  return rss({
    trailingSlash: false,
    title: defaultSeo.baseTitle,
    description: defaultSeo.metaDescription,
    site: context.site ?? raise('Expected "site" to be defined in astro.config.*'),
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: ROUTES.blog.post(post.id),
    })),
  })
}
