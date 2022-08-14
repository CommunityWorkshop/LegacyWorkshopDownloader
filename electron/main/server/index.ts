import express from 'express'
import { ggntwGames } from '../constants'
import { DownloadMethod } from '../types'
import { checkIsFileDownloaded } from '../utils/checkIsFileDownloaded'
import downloadFile from '../utils/downloadFile'
import { downloadFromGGNTW } from '../utils/DownloadFromGGNTW'
import { cancelGGNTWDownload } from '../utils/DownloadFromGGNTW/downloadFromURL'
import { GGNTWdownloadStatus } from '../utils/DownloadFromGGNTW/handleResponseStatus'
import getItemDetails from '../utils/itemDetails'
var cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
const port = 2550
const HOST = '0.0.0.0'

let stopDownloadFn = () => {}
let downloadMethod: DownloadMethod = DownloadMethod.DD
export let isDownloading = false

export default function startServer() {
  console.log(`starting the server on port ${port}...`)

  // ? Handle initial user request
  app.get('/download/:itemId', async (req, res) => {
    isDownloading = true
    const itemId = req.params.itemId
    const itemDetails = await getItemDetails(itemId, ['appId'])

    // Check is the file already downloaded
    const { isAvailable, path } = checkIsFileDownloaded(itemId)
    console.log(`Is file downloaded? ${isAvailable}`)
    if (isAvailable) {
      return res.status(500).send('File already downloaded')
    }

    if (itemDetails.appId) {
      console.log('App Id is 🆔 : ', itemDetails.appId)

      // Is this game available on ggntw?
      const isAvailableOnGGN =
        (await ggntwGames.filter((game) => game.appId == itemDetails.appId)
          .length) > 0

      console.log('Is this game available on ggntw? ', isAvailableOnGGN)

      if (isAvailableOnGGN) {
        downloadMethod = DownloadMethod.GGNTW
        // Download from ggntw
        try {
          const fileLocation = await downloadFromGGNTW(
            itemId,
            itemDetails.appId
          )
          res.status(200).send(fileLocation)
        } catch (error) {
          res.status(400).send('Unable to download file')
        }
      } else {
        try {
          const { startDownload, stopDownload } = downloadFile(
            itemDetails.appId,
            itemId
          )
          stopDownloadFn = stopDownload
          const fileLocation = await startDownload()
          console.log(`File location: ${fileLocation}`)
          res.status(200).send(fileLocation)
        } catch (err) {
          res.status(400).send(err)
        }
      }
    } else {
      res.status(404).send('No game found for this workshop item')
    }
    isDownloading = false
  })

  app.post('/cancel-download', async (req, res) => {
    isDownloading = false
    console.log('Cancelling download..')
    switch (downloadMethod) {
      case DownloadMethod.DD:
        stopDownloadFn()
        break
      case DownloadMethod.GGNTW:
        cancelGGNTWDownload()
        break
      default:
        break
    }

    res.status(200).send('Cancelled download')
  })

  app.get('/status', async (_req, res) => {
    if (isDownloading) {
      if (downloadMethod == DownloadMethod.GGNTW) {
        res.status(200).send({ method: 'GGNTW', status: GGNTWdownloadStatus })
      } else {
        res.status(200).send({ method: 'DD', status: 'Downloading...' })
      }
    } else {
      res.status(200).send({ status: 'Downloading...' })
    }
  })

  app.get('/details/:itemId', async (req, res) => {
    const itemId = req.params.itemId
    const itemDetails = await getItemDetails(itemId)
    res.json(itemDetails)
  })

  app.listen(port, HOST)
}
