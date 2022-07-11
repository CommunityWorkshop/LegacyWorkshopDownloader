import { HTMLPage } from '../../types'

export default function getRatingURL(page: HTMLPage) {
  const urlAttrs = page.querySelector(
    '#mainContents > div.workshopItemDetailsHeader > div#detailsHeaderRight > div.ratingSection > div.fileRatingDetails > img'
  )?.rawAttrs
  const url = urlAttrs?.replace('src="', '').replace('" ', '')
  if (url) {
    const regax = /[^\/]+png/
    const match = regax.exec(url)
    if (match) {
      switch (match[0]) {
        case 'not-yet_large.png':
          return NaN
        case '1-star_large.png':
          return 1
        case '2-star_large.png':
          return 2
        case '3-star_large.png':
          return 3
        case '4-star_large.png':
          return 4
        case '5-star_large.png':
          return 5
        default:
          break
      }
    }
  }
}
