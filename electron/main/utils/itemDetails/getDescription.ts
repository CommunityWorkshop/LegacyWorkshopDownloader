import { HTMLPage } from '../../types'

export default function getDescription(page: HTMLPage) {
  const description = page.querySelector('.workshopItemDescription')?.text
  return description
}
