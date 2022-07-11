import { HTMLPage } from '../../types'

/**
 * @param page
 * @returns The collection Items of the Collection
 */
export function getCollectionItems(page: HTMLPage) {
  const items: string[] = []
  const test = page.querySelectorAll('.collectionItem')
  test.forEach((HTMLElement) => {
    // This will get the text from <a> tag
    let idk = HTMLElement.attrs['id']
    items.push(idk.replace('sharedfile_', ''))
  })
  return items
}

/**
 * @param page
 * @returns Check if collection or not
 */
export function CheckCollection(page: HTMLPage) {
  const test = page.querySelectorAll('.collectionItem')
  return test.length != 0
}
