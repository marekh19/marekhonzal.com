import { ROUTES } from '@/config/routes'
import { defaultSeo } from '@/config/seo'
import { shouldIncludePost, getSortedPostsByDateDesc } from '@/lib/utils/posts'
import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

export const GET: APIRoute = async (context) => {
  const posts = await getCollection('blog', shouldIncludePost)
  const sortedPosts = getSortedPostsByDateDesc(posts)

  return rss({
    trailingSlash: false,
    title: defaultSeo.baseTitle,
    description: defaultSeo.metaDescription,
    site: context.site!,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      link: ROUTES.blog.post(post.id),
    })),
  })
}
