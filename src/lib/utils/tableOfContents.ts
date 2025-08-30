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

export const linkStarts = new WeakMap()
export const linkEnds = new WeakMap()

export const drawPath = () => {
  const path = document.querySelector<SVGPathElement>('path.toc-marker')
  if (!path) return

  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('nav.toc a'))
  if (!links.length) return

  // Start with an empty array of path data values (joined with
  // spaces later)
  const pathData: (string | number)[] = []
  let left = 0 // The last x position / indentation

  // Iterate over each link to build up the pathData
  links.forEach((link, i) => {
    const x = link.offsetLeft
    const y = link.offsetTop
    const height = link.offsetHeight
    if (i === 0) {
      // The top of the first link starts at 0px along the path.
      linkStarts.set(link, 0)
      // Like drawing with a pen...
      // 'M'ove to the top left of the first link,
      // and then draw a 'L'ine to the bottom left
      pathData.push('M', x, y, 'L', x, y + height)
    } else {
      // If the current link is indented differently than the last,
      // then come down to the current link's top before moving
      // left or right. This ensures we get 90-degrees angle at the
      // corners.
      if (left !== x) {
        pathData.push('L', left, y)
      }

      // Draw a line to the top left of the current link
      pathData.push('L', x, y)

      // Apply the current path data to the path element
      path.setAttribute('d', pathData.join(' '))

      // Get the total length of the path now that it extends
      // to the top of this link, and store it in our linkStarts
      // WeakMap.
      linkStarts.set(link, path.getTotalLength())
      // Draw a line to the bottom left of the current link
      pathData.push('L', x, y + height)
    }

    // Save the current link's x position to compare with the next
    // link
    left = x

    // Apply the current path data to the path element again
    path.setAttribute('d', pathData.join(' '))

    // Get the length of the path that now extends to the
    // bottom of this link, and store it in our linkEnds WeakMap.
    linkEnds.set(link, path.getTotalLength())
  })
}

export const addIntersectionObserver = () => {
  const observer = new IntersectionObserver((sections) => {
    sections.forEach((section) => {
      const heading = section.target.querySelector('h2, h3, h4, h5')
      if (!heading) return
      const id = heading.getAttribute('id')

      // Get the link to this section's heading
      const link = document.querySelector(`nav.toc li a[href="#${id}"]`)
      if (!link) return

      // Add/remove the .active class based on whether the
      // section is visible
      const addRemove = section.intersectionRatio > 0 ? 'add' : 'remove'
      link.classList[addRemove]('active')
    })
    updatePath()
  })

  // Observe all the sections of the article
  document.querySelectorAll('main section').forEach((section) => {
    observer.observe(section)
  })
}

const updatePath = () => {
  const path = document.querySelector<SVGPathElement>('path.toc-marker')
  if (!path) return

  const pathLength = path.getTotalLength()
  const activeLinks = document.querySelectorAll('nav.toc a.active')
  let linkStart = pathLength
  let linkEnd = 0
  activeLinks.forEach((link) => {
    // Set linkStart to the top of the earliest active link
    linkStart = Math.min(linkStart, linkStarts.get(link))
    // Set linkEnd to the bottom of the furthest active link
    linkEnd = Math.max(linkEnd, linkEnds.get(link))
  })
  // If there are no active links, hide the path
  path.style.display = activeLinks.length ? 'inline' : 'none'
  // FINALLY, do the thing!
  path.setAttribute(
    'stroke-dasharray',
    `1 ${linkStart} ${linkEnd - linkStart} ${pathLength}`,
  )
}
