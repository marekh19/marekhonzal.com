import type { MarkdownHeading } from 'astro'

import type { BuildTocOptions, TocHeading } from '@/lib/types'

export function buildToc(
  headings: readonly MarkdownHeading[],
  { rootDepth = 2 }: BuildTocOptions = {},
): TocHeading[] {
  const toc: TocHeading[] = []
  const parents = new Map<number, TocHeading>()

  headings.forEach((raw) => {
    const heading = { ...raw, subheadings: [] }
    parents.set(heading.depth, heading)

    if (heading.depth === rootDepth) {
      toc.push(heading)
      return
    }

    const parent = parents.get(heading.depth - 1)
    if (parent) {
      parent.subheadings.push(heading)
      return
    }

    // Fallback: no parent found → push to top-level
    toc.push(heading)
  })

  return toc
}
