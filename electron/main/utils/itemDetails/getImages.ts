import { HTMLPage } from '../../types'

export default function getImages(page: HTMLPage) {
  const images: string[] = []
  const regax = /https:\/\/.+letterbox=false/gm
  const elements = page.querySelectorAll('.screenshot_holder a')
  elements.forEach((imageElement) => {
    // This will get the text from <a> tag
    const rawURL = imageElement.attrs['href']
    const url = rawURL.match(regax)?.[0]
    if (url) {
      images.push(url)
    }
  })
  return images
}
