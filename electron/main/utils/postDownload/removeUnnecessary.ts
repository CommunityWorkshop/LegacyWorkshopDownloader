import fs from 'fs'

export default function removeUnnecessary(path: string) {
  fs.rmSync(path + '/' + '.DepotDownloader', { recursive: true, force: true })
}
