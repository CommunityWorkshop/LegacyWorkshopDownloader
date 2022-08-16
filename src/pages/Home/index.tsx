import Button from '@/components/Button'
import DownloadBar from '@/components/DownloadBar'
import Loading from '@/components/Loading'
import Preview from '@/components/Preview'
import useDownloadStatus from '@/hooks/useDownloadStatus'
import useGgntwGameslist from '@/hooks/useGgntwGameslist'
import getItemIdFromURL from '@/utils/getItemIdFromUrl'
import { handleOpenGGNTW } from '@/utils/handleOpenGGNTW'
import { Games20Regular, Money20Regular } from '@fluentui/react-icons'
import axios from 'axios/dist/axios'
import { ipcRenderer } from 'electron'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

const Home = () => {
  // * States
  const [itemURL, setItemURL] = useState('')
  const [loading, setLoading] = useState(false)
  const [isCancellingDownload, setIsCancellingDownload] = useState(false)

  // * Hooks
  const navigate = useNavigate()
  const { status, method } = useDownloadStatus(loading)
  const ggntwGamesList = useGgntwGameslist()

  const handleDownload = async () => {
    setLoading(true)
    if (itemURL) {
      const id = getItemIdFromURL(itemURL)
      if (id) {
        try {
          const res = await axios.get(`http://localhost:2550/download/${id}`)
          console.log(res.status)
          // Only handle this stuff if is cancelling is false
          // if is cancelling is true, it means
          // no need to show them what happened with download
          if (!isCancellingDownload) {
            if (res.status === 200) {
              console.log(res)
              toast.success('File downloaded successfully')
            } else {
              toast.error('Something went wrong!')
            }
          }
        } catch (error: any) {
          // Only handle this stuff if is cancelling is false
          // if is cancelling is true, it means
          // no need to show them what happened with download
          if (!isCancellingDownload) {
            if (typeof error.response.data === 'string') {
              toast.error(error.response.data)
            } else {
              toast.error('Error.')
            }
          }
        }
        setIsCancellingDownload(false)
      }
    } else {
      toast.error('Please enter a valid URL!')
    }
    setLoading(false)
  }

  const handleOpenKofi = () => {
    ipcRenderer.invoke(
      'openLink',
      'https://ko-fi.com/communityworkshopdownloader'
    )
  }

  const handleCancelDownload = async () => {
    setIsCancellingDownload(true)
    const res = await axios.post('http://localhost:2550/cancel-download', {
      itemId: getItemIdFromURL(itemURL),
    })
    if (res.status === 200) {
      toast.success('Download cancelled')
      setLoading(false)
    } else {
      toast.error('Unable to stop download')
    }
  }

  const handleOpenDiscord = () => {
    ipcRenderer.invoke('openLink', 'https://www.discord.gg/MAj9FdSZmp')
  }

  return (
    <div className="flex-1 flex items-center flex-col justify-center">
      {loading && (
        <div className="absolute drag flex-col w-screen top-0 z-50 text-white h-screen shadow-lg backdrop-blur-3xl items-center justify-center flex">
          <div className="flex  flex-row items-center justify-center">
            <Loading />
            <h3 className="ml-4">{status}</h3>
          </div>
          {method === 'GGNTW' && (
            <div className="bg-black flex flex-row nodrag text-xs py-1 px-3 mt-4 bg-opacity-30 rounded-md">
              Downloading from{' '}
              <h3
                className="ml-1 cursor-pointer text-blue-400 underline"
                onClick={handleOpenGGNTW}
              >
                ggntw.com
              </h3>
            </div>
          )}
          <Button
            className="mt-4 nodrag"
            text={'Cancel'}
            onClick={handleCancelDownload}
          />
        </div>
      )}
      <div className="flex flex-col flex-1 w-full">
        <div className="w-full mt-4 pr-4 gap-2 flex items-end justify-end">
          <Button
            onClick={handleOpenDiscord}
            text="Discord"
            icon={<Games20Regular className="mr-2" />}
          />
          <Button
            onClick={handleOpenKofi}
            text="Donate"
            icon={<Money20Regular className="mr-1" />}
          />
        </div>
        <div className="flex-1 pb-10 flex flex-col items-center justify-center">
          <DownloadBar
            handleDownload={handleDownload}
            itemURL={itemURL}
            onChange={setItemURL}
          />
          <Preview ggntwGamesList={ggntwGamesList} itemURL={itemURL} />
        </div>
      </div>
    </div>
  )
}

export default Home
