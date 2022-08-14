import { ipcMain } from 'electron'
import { win } from '..'

export const listenWindowEvents = () => {
  // ipc listen
  ipcMain.handle('close', () => {
    win?.close()
  })

  ipcMain.handle('minimize', () => {
    win?.minimize()
  })
}
