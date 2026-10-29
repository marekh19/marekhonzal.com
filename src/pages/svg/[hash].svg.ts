import type {
  APIRoute,
  GetStaticPaths,
  InferGetStaticParamsType,
  InferGetStaticPropsType,
} from 'astro'

import { getExternalSvgFiles } from '@/lib/utils/externalSvg'

type ExternalSvgAPIRoute = APIRoute<
  InferGetStaticPropsType<typeof getStaticPaths>,
  InferGetStaticParamsType<typeof getStaticPaths>
>

export const GET: ExternalSvgAPIRoute = ({ props }) =>
  new Response(props.svg, {
    headers: { 'Content-Type': 'image/svg+xml' },
  })

export const getStaticPaths = (() =>
  getExternalSvgFiles().map(({ hash, svg }) => ({
    params: { hash },
    props: { svg },
  }))) satisfies GetStaticPaths
