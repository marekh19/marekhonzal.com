import type {
  APIRoute,
  GetStaticPaths,
  InferGetStaticParamsType,
  InferGetStaticPropsType,
} from 'astro'

import { getThumbnailFiles } from '@/lib/utils/thumbnails'

type ThumbnailAPIRoute = APIRoute<
  InferGetStaticPropsType<typeof getStaticPaths>,
  InferGetStaticParamsType<typeof getStaticPaths>
>

export const GET: ThumbnailAPIRoute = ({ props }) =>
  new Response(props.svg, {
    headers: { 'Content-Type': 'image/svg+xml' },
  })

export const getStaticPaths = (() =>
  getThumbnailFiles().map(({ collection, file, svg }) => ({
    params: { collection, file },
    props: { svg },
  }))) satisfies GetStaticPaths
