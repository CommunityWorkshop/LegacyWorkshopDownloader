import { HTMLPage } from '../../types'

/**
 * @param page
 * @returns The item or collection name
 */
export default function getName(page: HTMLPage) {
  const name = page.querySelector(
    '#mainContents > div.workshopItemDetailsHeader > div.workshopItemTitle'
  )?.text
  if (name == undefined) {
    const name2 = page.querySelector(
      '#mainContentsCollectionTop > div.collectionTop > div.collectionHeader > div.collectionHeaderContent > div.workshopItemDetailsHeader > div.workshopItemTitle'
    )?.text
    return name2
  }
  return name
}
