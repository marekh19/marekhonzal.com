import { toString } from 'mdast-util-to-string'
import getReadingTime from 'reading-time'

const AVG_READING_SPEED = 160 // WPM

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree)
    const { text, minutes } = getReadingTime(textOnPage, {
      wordsPerMinute: AVG_READING_SPEED,
    })
    data.astro.frontmatter.readingTime = { minutes, text }
  }
}
