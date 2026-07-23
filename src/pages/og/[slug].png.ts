import type {
  APIRoute,
  GetStaticPaths,
  InferGetStaticParamsType,
  InferGetStaticPropsType,
} from 'astro'
import { getCollection } from 'astro:content'

import { staticPageOgFallback } from '@/config/seo'
import { shouldIncludeItem } from '@/lib/utils/content'
import { renderGenericOg, renderThumbnailOg } from '@/lib/utils/og-image'
import { getThumbnails } from '@/lib/utils/thumbnails'

type OGAPIRoute = APIRoute<
  InferGetStaticPropsType<typeof getStaticPaths>,
  InferGetStaticParamsType<typeof getStaticPaths>
>

export const GET: OGAPIRoute = async ({ props }) => {
  const { item } = props

  const thumbnail =
    'collection' in item
      ? getThumbnails()[`/src/content/${item.collection}/${item.id}/thumbnail.svg`]
      : undefined

  const png = thumbnail ? renderThumbnailOg(thumbnail) : renderGenericOg()

  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  })
}

export const getStaticPaths = (async () => {
  const posts = await getCollection('blog', shouldIncludeItem)
  const projects = await getCollection('projects', shouldIncludeItem)

  return [...posts, ...projects, staticPageOgFallback].map((item) => ({
    params: {
      slug: item.id,
    },
    props: { item },
  }))
}) satisfies GetStaticPaths
