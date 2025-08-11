import fs from 'fs'
import path from 'path'
import type {
  APIRoute,
  GetStaticPaths,
  InferGetStaticParamsType,
  InferGetStaticPropsType,
} from 'astro'
import { getCollection, type CollectionEntry } from 'astro:content'
import { h, type JSX } from 'preact'
import { ImageResponse } from '@vercel/og'

import { staticPageOgFallback } from '@/config/seo'
import { shouldIncludeItem } from '@/lib/utils/content'

type CollectionEntryItem = CollectionEntry<'blog' | 'projects'>

type OGAPIRoute = APIRoute<
  InferGetStaticPropsType<typeof getStaticPaths>,
  InferGetStaticParamsType<typeof getStaticPaths>
>

type OGHtmlData = Pick<CollectionEntryItem['data'], 'title' | 'description'>

const generateHtml = (data: OGHtmlData): JSX.Element => {
  return h(
    'div',
    { tw: 'h-full w-full bg-black flex items-center justify-center p-40' },
    h('div', { tw: 'absolute w-8 bg-[#9ca6f9] h-full left-0 top-0' }),
    h(
      'div',
      { tw: 'flex flex-col' },
      h(
        'div',
        {
          tw: 'flex items-center self-start rounded-full mb-10 py-3 px-5 border border-slate-600 text-white',
        },
        h('span', { tw: 'text-xl mr-5' }, 'Marek Honzal'),
        h('span', { tw: 'text-xl mr-5' }, '|'),
        h('span', { tw: 'text-xl' }, 'marekhonzal.com'),
      ),
      h(
        'div',
        { tw: 'text-7xl text-white mb-10', style: { fontFamily: 'Lora Regular' } },
        data.title,
      ),
      h(
        'div',
        {
          tw: 'text-xl text-white',
          style: { fontFamily: 'Open Sans Regular' },
        },
        data.description,
      ),
    ),
  )
}

export const GET: OGAPIRoute = async ({ props }) => {
  const {
    item: { data },
  } = props

  const loraRegular = fs.readFileSync(
    path.resolve(process.cwd(), 'public/fonts/lora-v36-latin-regular.woff'),
  )

  const openSansRegular = fs.readFileSync(
    path.resolve(process.cwd(), 'public/fonts/open-sans-v43-latin-regular.woff'),
  )

  const html = generateHtml(data)

  return new ImageResponse(html, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Open Sans Regular',
        data: openSansRegular.buffer,
        style: 'normal',
      },
      {
        name: 'Lora Regular',
        data: loraRegular.buffer,
        style: 'normal',
      },
    ],
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
