import { HTMLPage } from '../../types'
import dateStringToUnix from '../dateFn/dateStringToUnix'

/**
 * @param page
 * @returns The item time when was Updated
 */
export default function getUpdatedOn(page: HTMLPage, isCollection: boolean) {
  if (isCollection) {
    const UpdatedOn = page.querySelectorAll('.detailsStatRight')[4]?.text
    if (UpdatedOn) {
      return dateStringToUnix(UpdatedOn)
    }
  } else {
    const UpdatedOn = page.querySelectorAll('.detailsStatRight')[2]?.text
    if (UpdatedOn) {
      return dateStringToUnix(UpdatedOn)
    }
  }
}
