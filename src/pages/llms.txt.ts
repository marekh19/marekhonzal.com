import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

import { ENV } from '@/config/env'
import { ROUTES } from '@/config/routes'
import { defaultSeo } from '@/config/seo'
import type { Post, Project } from '@/lib/types'
import { getSortedContentByDateDesc, shouldIncludeItem } from '@/lib/utils/content'
import { ensureAstroSite } from '@/lib/utils/guards'

const toLink = (item: Readonly<Project | Post>, path: string, site: URL) =>
  `- [${item.data.title}](${new URL(path, site).href}): ${item.data.description}`

const toSection = (heading: string, lines: readonly string[]) =>
  `## ${heading}\n${lines.join('\n')}`

export const GET: APIRoute = async ({ site }) => {
  if (!ENV.IS_PRODUCTION) {
    return new Response(null, { status: 404, statusText: 'Not found' })
  }

  const astroSite = ensureAstroSite(site)

  const posts = getSortedContentByDateDesc(await getCollection('blog', shouldIncludeItem))
  const projects = getSortedContentByDateDesc(
    await getCollection('projects', shouldIncludeItem),
  )

  const body = [
    `# ${defaultSeo.baseTitle}`,
    `> ${defaultSeo.metaDescription}`,
    toSection(
      'Blog',
      posts.map((post) => toLink(post, ROUTES.blog.post(post.id), astroSite)),
    ),
    toSection(
      'Projects',
      projects.map((project) =>
        toLink(project, ROUTES.projects.detail(project.id), astroSite),
      ),
    ),
    toSection('Optional', [`- [RSS feed](${new URL('rss.xml', astroSite).href})`]),
  ].join('\n\n')

  return new Response(`${body}\n`, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
    },
  })
}
