import { ipcMain } from 'electron'
import store from '../store'

export const autoExtractValueIPC = () => {
  // ipc listen
  ipcMain.handle('getIsAutoExtractEnabled', (event, arg) => {
    return store.get('autoExtractEnabled')
  })

  ipcMain.handle('changeAutoExtract', async (event, value) => {
    store.set('autoExtractEnabled', value)
  })
}
