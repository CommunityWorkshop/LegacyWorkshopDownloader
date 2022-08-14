import { dialog, ipcMain, shell } from 'electron'
import store from '../store'

export const downloadLocations = () => {
  // ipc listen
  ipcMain.handle('getDownloadLocation', () => {
    return store.get('downloadLocation')
  })

  ipcMain.handle('openDownloadFolder', () => {
    const downloadFolder = store.get('downloadLocation') as string
    downloadFolder && shell.openPath(downloadFolder)
  })

  ipcMain.handle('selectNewPath', async () => {
    var path = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    })
    if (!path.canceled) {
      store.set('downloadLocation', path.filePaths[0])
    }
    return path
  })
}
