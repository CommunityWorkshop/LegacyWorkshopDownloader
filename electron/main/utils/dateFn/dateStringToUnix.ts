import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
var customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.extend(utc)
dayjs.extend(customParseFormat)

/**
 * @param {string} dateString :- example :- 9 Jun @ 6:48pm
 * @returns {number} unix timestamp
 */

export default function dateStringToUnix(dateString: string) {
  return dayjs.utc(dateString, 'D MMM @ h:ma').unix()
}
