import fs from 'fs-extra'
import store from '../store'

const downloadLocation = store.get('downloadLocation')

export const checkIsFileDownloaded = (itemId: string) => {
  const zipPath = `${downloadLocation}/${itemId}.zip`
  const savePath = `${downloadLocation}/${itemId}`

  if (fs.existsSync(zipPath) || fs.existsSync(savePath)) {
    console.log('Zip file already exists, skipping download')
    return { isAvailable: true, path: zipPath }
  } else {
    return { isAvailable: false, path: '' }
  }
}
