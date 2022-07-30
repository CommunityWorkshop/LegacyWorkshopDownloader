import { spawn } from "child_process";
import fs from "fs-extra";
import os from "os";
import store from "../store";
import archiveItem from "./postDownload/archiveItem";
import removeUnnecessary from "./postDownload/removeUnnecessary";

const platform = process.platform;

const downloadLocation = store.get("downloadLocation");

export default function downloadFile(appId: string, itemId: string) {
  const savePath = `${os.tmpdir()}/${itemId}`;
  const zipPath = `${downloadLocation}/${itemId}.zip`;

  const child =
    platform === "win32"
      ? spawn("./extra/DepotDownloader.exe", [
          "-app",
          appId,
          "-pubfile",
          itemId,
          "-dir",
          savePath,
        ])
      : spawn("dotnet", [
          "./extra/DepotDownloader.dll",
          "-app",
          appId,
          "-pubfile",
          itemId,
          "-dir",
          savePath,
        ]);

  const stopDownload = () => {
    child.kill("SIGINT");
    fs.removeSync(savePath);
    fs.removeSync(zipPath);
  };

  const startDownload = () => {
    console.log("starting download...");
    return new Promise<string>((resolve, reject) => {
      child.on("error", (err: any) => {
        reject(err);
      });

      child.on("close", async () => {
        console.log("Download complete");
        try {
          removeUnnecessary(savePath);
          const isAutoExtractEnabled = store.get("autoExtractEnabled");
          if (!isAutoExtractEnabled) {
            const archivePath: string = await archiveItem(
              savePath,
              itemId,
              appId,
              zipPath
            );
            console.log(`Archive path: ${archivePath}`);
            resolve(archivePath);
          } else {
            const downloadLocation = await store.get("downloadLocation");
            if (downloadLocation) {
              await fs.move(savePath, `${downloadLocation}/${itemId}`);
              resolve(downloadLocation as string);
            }
          }
        } catch (err) {
          reject(err);
        }
      });
    });
  };

  return { startDownload, stopDownload };
}
