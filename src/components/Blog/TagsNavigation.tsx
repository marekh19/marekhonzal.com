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
        {visibleTags.map(({ label, slug, count }) => (
          <li>
            <a
              className={cn(
                'badge dark:badge-soft badge-accent badge-sm inline-flex cursor-pointer items-center rounded-full transition-colors duration-200 ease-out',
                'md:badge-md',
                'hover:bg-accent/20',
                'focus-visible:bg-accent/20',
                'link-outline-accent',
              )}
              href={ROUTES.blog.tag(slug)}
            >
              <span>{label}</span>
              <span className="badge badge-xs badge-accent text-accent-content font-bold">
                {count}
              </span>
            </a>
          </li>
        ))}
        {shouldShowMoreButton && (
          <li className="tooltip" data-tip="Show all tags">
            <button
              className={cn(
                'badge dark:badge-soft badge-accent badge-sm inline-flex cursor-pointer items-center rounded-full transition-colors duration-200 ease-out',
                'md:badge-md',
                'hover:bg-accent/20',
                'focus-visible:bg-accent/20',
                'link-outline-accent',
              )}
              onClick={() => {
                setShouldShowAll(true)
              }}
            >
              <EllipsisIcon />
              <span className="sr-only">Show all tags</span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}
