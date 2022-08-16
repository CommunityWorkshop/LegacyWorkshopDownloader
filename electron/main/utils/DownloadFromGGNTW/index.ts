import axios from 'axios'
import { handleResponseStatus } from './handleResponseStatus'

export const downloadFromGGNTW = async (itemId: string, appId: string) => {
  console.log('downloading from gg network🗼')
  try {
    // Sending post request to steamSearch.php to initiate download
    const res = await axios.post('https://api.ggntw.com/steam.request', {
      url: `https://steamcommunity.com/sharedfiles/filedetails/?id=${itemId}`,
    })
    try {
      const { data } = res
      // if status is 1, then file is available to download
      // other wise keep waiting for status to be 1
      let downloadFilePath = await handleResponseStatus(
        res.data.status,
        data.url
      )
      if (downloadFilePath) {
        return downloadFilePath
      } else {
        const waitForDownload = new Promise<string>((resolve) => {
          const interval = setInterval(async () => {
            const res = await axios.post('https://api.ggntw.com/steam.update', {
              id: itemId,
            })
            try {
              downloadFilePath = await handleResponseStatus(
                res.data.status,
                data.url,
                interval
              )
            } catch (error) {
              clearInterval(interval)
              console.log(error)
            }
            if (downloadFilePath) {
              clearTimeout(interval)
              resolve(downloadFilePath)
            }
          }, 1000)
        })

        downloadFilePath = await waitForDownload
        if (downloadFilePath) {
          return downloadFilePath
        } else {
          throw new Error('File not downloaded')
        }
      }
    } catch (error) {
      throw error
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}
