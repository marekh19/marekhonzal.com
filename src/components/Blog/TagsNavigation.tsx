import { useState } from 'preact/hooks'
import clsx from 'clsx'
import { EllipsisIcon } from 'lucide-preact'

import { ROUTES } from '@/config/routes'
import type { TagMetadata } from '@/lib/types'

// NOTE: Avoid tailwind-merge in client bundle
const cn = clsx

const NUM_INITIAL_VISIBLE_TAGS = 5

type Props = {
  tags: readonly TagMetadata[]
  className?: string
}

export const TagsNavigation = ({ tags, className }: Props) => {
  const [shouldShowAll, setShouldShowAll] = useState(false)

  const visibleTags = shouldShowAll ? tags : tags.slice(0, NUM_INITIAL_VISIBLE_TAGS)
  const shouldShowMoreButton = !shouldShowAll && tags.length > NUM_INITIAL_VISIBLE_TAGS

  return (
    <nav aria-label="Navigate posts by tag" className={className}>
      <ul className={cn('flex flex-wrap gap-3', 'md:gap-x-5')}>
        {visibleTags.map(({ label, slug, count, hueClass }) => (
          <li>
            <a
              className={cn('badge-link tag-dot', hueClass)}
              href={ROUTES.blog.tag(slug)}
            >
              <span>{label}</span>
              <span className="badge badge-xs badge-ghost font-bold">{count}</span>
            </a>
          </li>
        ))}
        {shouldShowMoreButton && (
          <li className="tooltip" data-tip="Show all tags">
            <button className="badge-link" onClick={() => setShouldShowAll(true)}>
              <EllipsisIcon />
              <span className="sr-only">Show all tags</span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}
