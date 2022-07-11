import { HTMLPage } from '../../types'
import getItemIdFromURL from './getItemIdFromURL'

/**
 * @param page
 * @returns List of itemIDs of required items
 */
export default function getRequiredItems(page: HTMLPage) {
  const items = []
  const requiredItemsElements = page.querySelectorAll(
    '.requiredItemsContainer a'
  )
  for (const element of requiredItemsElements) {
    const itemId = getItemIdFromURL(element.attrs['href'])
    if (itemId) {
      items.push(itemId)
    }
  }
  return items
}
