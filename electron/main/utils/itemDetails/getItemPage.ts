import axios from 'axios'
import parse from 'node-html-parser'

/**
 * @param page
 * @returns HTMLElement of the Item page
 */
export default async function getItemPage(itemId: string) {
  const page = await axios.get(
    `https://steamcommunity.com/sharedfiles/filedetails/?id=${itemId}`
  )
  var parsedPage = parse(page.data)
  return parsedPage
}
