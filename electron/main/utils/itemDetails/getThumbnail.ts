import { HTMLPage } from '../../types'

export default function getThumbnail(page: HTMLPage) {
  const imageElement = page.querySelector(
    '.workshopItemPreviewImageMain #previewImageMain'
  )
  if (imageElement) {
    const rawURL = imageElement.attrs['src']
    if (rawURL) {
      return rawURL
    }
  }
}
