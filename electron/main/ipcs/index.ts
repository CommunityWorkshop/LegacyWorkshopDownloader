import { ipcMain, shell } from 'electron'
import getItemDetails from '../utils/itemDetails'

export const mainIPCs = () => {
  ipcMain.handle('openLink', (_, link) => {
    shell.openExternal(link)
  })

  ipcMain.handle('getItemData', async (_, itemId) => {
    const data = await getItemDetails(itemId)
    return data
  })
}
