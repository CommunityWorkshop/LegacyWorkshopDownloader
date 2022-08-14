import fs from 'fs-extra'
import Downloader from 'nodejs-file-downloader'
import store from '../../store'
const extract = require('extract-zip')

// Store Data
const downloadLocation: any = store.get('downloadLocation')
const autoExtractEnabled: any = store.get('autoExtractEnabled')

// Function which be used by /cancel-download endpoint
export let cancelGGNTWDownload: any = () => {}

export const downloadFromURL = async (url: string) => {
  const downloader = new Downloader({
    url: url,
    directory: downloadLocation,
  })

  // Cancel Download Functions
  cancelGGNTWDownload = () => {
    downloader.cancel()
  }

  try {
    let finalFilePath: string = ''
    const { filePath, downloadStatus } = await downloader.download()
    finalFilePath = filePath ?? ''
    if (autoExtractEnabled && filePath) {
      try {
        finalFilePath = downloadLocation
        await extract(filePath, { dir: downloadLocation })
        console.log('Extraction complete')
        filePath && fs.removeSync(filePath)
      } catch (err) {
        // handle any errors
      }
    }

    return finalFilePath
  } catch (error) {
    console.log(error)
    throw new Error('Unable to download file')
  }
}
