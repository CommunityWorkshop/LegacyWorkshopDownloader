import { HTMLPage } from '../../types'

/**
 * @param page
 * @returns The item or collection tag
 */
export default function getTags(page: HTMLPage) {
  const tagsElements = page.querySelectorAll('.workshopTags a')
  const tags: string[] = []
  tagsElements.forEach((tagElement) => {
    // This will get the text from <a> tag
    const tag = tagElement.text
    tags.push(tag)
  })
  if (tags.length === 0) {
    const tag = page.querySelector('.rightDetailsBlock a')?.text
    if (tag) {
      tags.push(tag)
    }
  }
  return tags
}
