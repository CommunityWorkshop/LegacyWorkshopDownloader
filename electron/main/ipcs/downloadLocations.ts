import { dialog, ipcMain } from "electron";
import store from "../store";

export const downloadLocations = () => {
  // ipc listen
  ipcMain.handle("getDownloadLocation", (event, arg) => {
    return store.get("downloadLocation");
  });

  ipcMain.handle("selectNewPath", async (event, arg) => {
    var path = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });
    if (!path.canceled) {
      store.set("downloadLocation", path.filePaths[0]);
    }
    return path;
  });
};
