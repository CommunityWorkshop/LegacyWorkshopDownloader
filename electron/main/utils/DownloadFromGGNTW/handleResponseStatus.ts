import { isDownloading } from '../../server'
import { downloadFromURL } from './downloadFromURL'

export let GGNTWdownloadStatus = 'Downloading...'

export const handleResponseStatus = async (
  status: string,
  downloadUrl: string,
  interval?: any
) => {
  console.log('isDownloading', isDownloading)
  if (!isDownloading) {
    throw new Error('Downloading stopped..')
  }
  console.log('ggnetwork status 😀', status)
  switch (status) {
    case '0':
      GGNTWdownloadStatus = 'Starting...'
      break
    case '1':
      GGNTWdownloadStatus = 'Downloading file...'
      try {
        interval && clearInterval(interval)
        const filePath = await downloadFromURL(downloadUrl)
        return filePath
      } catch (error) {
        throw new Error(error.message)
      }
    case '2':
      GGNTWdownloadStatus = 'Fetching file from steam server'
      break
    default:
      break
  }
}
