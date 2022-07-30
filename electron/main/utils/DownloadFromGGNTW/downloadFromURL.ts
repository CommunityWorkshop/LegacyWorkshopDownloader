import fs from "fs-extra";
import Downloader from "nodejs-file-downloader";
import store from "../../store";
const extract = require("extract-zip");

const downloadLocation: any = store.get("downloadLocation");
const autoExtractEnabled: any = store.get("autoExtractEnabled");

export let cancelGGNTWDownload: any = () => {};

export const downloadFromURL = async (url: string) => {
  const downloader = new Downloader({
    url: url,
    directory: downloadLocation,
  });

  // * Cancel Download
  cancelGGNTWDownload = () => {
    downloader.cancel();
  };

  try {
    let finalFilePath: string = "";
    const { filePath, downloadStatus } = await downloader.download();
    finalFilePath = filePath ?? "";
    if (autoExtractEnabled && filePath) {
      try {
        finalFilePath = downloadLocation;
        await extract(filePath, { dir: downloadLocation });
        console.log("Extraction complete");
        filePath && fs.removeSync(filePath);
      } catch (err) {
        // handle any errors
      }
    }

    return finalFilePath;
  } catch (error) {
    throw new Error("Unable to download file");
  }
};
