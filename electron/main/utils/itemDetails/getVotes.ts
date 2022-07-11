import { HTMLPage } from '../../types'

/**
 * @param page
 * @returns The votes on the Item
 */
export function GetVotes(page: HTMLPage) {
  let votesString = page.querySelector('.numRatings')?.text
  if (votesString) {
    const regax = /(\d+)/gm
    const match = regax.exec(votesString)
    if (match) {
      return Number(match[1])
    }
  }
}
