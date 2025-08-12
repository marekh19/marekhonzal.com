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

const tintSvg = (svg: string, color: string) => {
  const tinted = svg.replace(/fill="currentColor"/gi, `fill="${color}"`)

  return `data:image/svg+xml;base64,${Buffer.from(tinted).toString('base64')}`
}

const generateHtml = (data: OGHtmlData): JSX.Element => {
  const rawSvg = fs.readFileSync(
    path.resolve(process.cwd(), 'src/assets/portrait.svg'),
    'utf8',
  )
  const svgDataUrl = tintSvg(rawSvg, '#010204')

  return h(
    'div',
    { tw: 'h-full w-full bg-[#010204] flex items-center justify-start p-40' },
    h(
      'div',
      { tw: 'flex flex-col text-[#d5d7de]' },
      h(
        'div',
        {
          tw: 'flex items-center self-start rounded-full mb-16 py-1.5 px-5 border-2 border-slate-700',
        },
        h(
          'div',
          {
            tw: 'flex items-center justify-center bg-[#d5d7de] rounded-full mr-3',
          },
          h('img', { tw: 'fill-white', src: svgDataUrl, width: 56, height: 56, alt: '' }),
        ),
        h('span', { tw: 'text-2xl mr-3' }, 'Marek Honzal'),
        h('span', { tw: 'text-2xl mr-3' }, '|'),
        h('span', { tw: 'text-2xl' }, 'marekhonzal.com'),
      ),
      h(
        'div',
        { tw: 'text-7xl mb-16 tracking-wide', style: { fontFamily: 'Lora Regular' } },
        data.title,
      ),
      h(
        'div',
        {
          tw: 'text-3xl leading-[150%]',
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
