import { HTMLPage } from '../../types'

/**
 * @param page
 * @returns The item size in bytes
 */
export default function getSizeInBytes(page: HTMLPage) {
  const sizeString = page.querySelectorAll('.detailsStatRight')[0]?.text
  const regax = /\d.+\d/gm
  let sizeInMBString = sizeString?.match(regax)?.[0].replace(/,/g, '')
  if (sizeInMBString) {
    const sizeInMB = parseFloat(sizeInMBString)
    const sizeInBytes = sizeInMB * 1000 * 1000
    return parseFloat(sizeInBytes.toFixed(3))
  }
}
