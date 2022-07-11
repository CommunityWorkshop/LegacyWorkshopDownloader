import { spawn } from "child_process";
import fs from "fs-extra";
import os from "os";
import store from "../store";
import archiveItem from "./postDownload/archiveItem";
import removeUnnecessary from "./postDownload/removeUnnecessary";

const platform = process.platform;

const downloadLocation = store.get("downloadLocation");

export default async function downloadFile(appId: string, itemId: string) {
  const savePath = `${os.tmpdir()}/${itemId}`;
  const zipPath = `${downloadLocation}/${itemId}.zip`;

  if (fs.existsSync(zipPath)) {
    console.log("Zip file already exists, skipping download");
    return zipPath;
  }

  return new Promise<string>((resolve, reject) => {
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
}
