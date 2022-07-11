import archiver from "archiver";
import fs from "fs";

export default async function archiveItem(
  sourcePath: string,
  itemId: string,
  appId: string,
  zipPath: string
) {
  const archivePath = zipPath;
  const output = fs.createWriteStream(archivePath);
  const archive = archiver("zip", { zlib: { level: 9 } });

  return new Promise<string>((resolve, reject) => {
    archive
      .directory(sourcePath, false)
      .on("error", (err) => reject(err))
      .pipe(output);

    output.on("close", () => resolve(archivePath));
    archive.finalize();
  });
}
