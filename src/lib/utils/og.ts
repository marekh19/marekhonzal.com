import { OG_FALLBACK_SLUG } from '@/config/seo'

export const resolveOgImageUrl = ({
  pathname,
  params,
  fallbackSlug = OG_FALLBACK_SLUG,
}: {
  pathname: string
  params: Record<string, string | undefined>
  fallbackSlug?: string
}) => {
  const isTagPage = pathname.startsWith('/blog/tags')
  if (isTagPage) {
    return `/og/${fallbackSlug}.png` as const
  }

  const [maybeSlug] = Object.values(params)
  return `/og/${maybeSlug ?? fallbackSlug}.png` as const
}
