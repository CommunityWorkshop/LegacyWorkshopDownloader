import getItemIdFromURL from './getItemIdFromUrl'

export const validateAndGetId = (itemURL: string) => {
  if (itemURL.length > 0) {
    const url = new URL(itemURL)
    const hostname = url.hostname === 'steamcommunity.com'
    const itemId = getItemIdFromURL(itemURL)
    if (hostname && itemId) {
      return itemId
    }
  }
  throw new Error('Invalid URL')
}
