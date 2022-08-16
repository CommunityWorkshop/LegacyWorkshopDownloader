import { ipcRenderer } from 'electron'

// * Functions
export const handleOpenGGNTW = () => {
  ipcRenderer.invoke('openLink', 'https://ggntw.com/')
}
