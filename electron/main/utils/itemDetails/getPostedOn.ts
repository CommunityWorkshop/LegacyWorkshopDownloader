import { HTMLPage } from '../../types'
import dateStringToUnix from '../dateFn/dateStringToUnix'

/**
 * @param page
 * @returns The item time when was Published
 */
export default function getPostedOn(page: HTMLPage, isCollection: boolean) {
  if (isCollection) {
    const PostedOn = page.querySelectorAll('.detailsStatRight')[3]?.text
    return dateStringToUnix(PostedOn)
  } else {
    const PostedOn = page.querySelectorAll('.detailsStatRight')[1]?.text
    return dateStringToUnix(PostedOn)
  }
}
