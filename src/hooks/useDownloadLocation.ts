import { ipcRenderer } from 'electron'
import { useEffect, useState } from 'react'

const useDownloadLocation = () => {
  // * States
  const [downloadLocation, setDownloadLocation] = useState(' ')

  // * Effects
  useEffect(() => {
    getDownloadLocation()
  }, [])

  // * Functions
  const getDownloadLocation = async () => {
    const downloadLocationLocal = await ipcRenderer.invoke(
      'getDownloadLocation'
    )
    setDownloadLocation(downloadLocationLocal)
  }

  const selectFolder = async () => {
    const path = await ipcRenderer.invoke('selectNewPath')
    if (!path.canceled) {
      setDownloadLocation(path.filePaths[0])
    }
  }

  return { downloadLocation, selectFolder }
}

export default useDownloadLocation
