import { ipcMain, shell } from "electron";

export const mainIPCs = () => {
  ipcMain.handle("openLink", (_, link) => {
    shell.openExternal(link);
  });
};
