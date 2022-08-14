import axios from 'axios'
import { handleResponseStatus } from './handleResponseStatus'

export const downloadFromGGNTW = async (itemId: string, appId: string) => {
  console.log('downloading from gg network🗼')
  try {
    // Sending post request to steamSearch.php to initiate download
    const res = await axios.post(
      'https://api.ggntw.com/webapi/SteamSearch.php',
      {
        url: `https://steamcommunity.com/sharedfiles/filedetails/?id=${itemId}`,
      }
    )
    try {
      const ggntwCdnUrl = `https://${res.data.server}-cdn.ggntw.com`
      // if status is 1, then file is available to download
      // other wise keep waiting for status to be 1
      let downloadFilePath = await handleResponseStatus(
        res.data.status,
        `${ggntwCdnUrl}/${appId}/${itemId}.zip`
      )
      if (downloadFilePath) {
        return downloadFilePath
      } else {
        const waitForDownload = new Promise<string>((resolve) => {
          const interval = setInterval(async () => {
            const res = await axios.post(
              'https://api.ggntw.com/webapi/SteamUpdate.php',
              { id: itemId }
            )
            try {
              downloadFilePath = await handleResponseStatus(
                res.data.status,
                `${ggntwCdnUrl}/${appId}/${itemId}.zip`,
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
