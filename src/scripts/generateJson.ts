import { getImageMetadata, writeJson } from "../scripts/getImageData.ts";
import fs from 'fs'

function getDirs(dir: string): string[] {
  const dirents = fs.readdirSync(dir, { withFileTypes: true })
  const dirs = dirents
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.path + '/' + dirent.name + '/')
  return dirs
}

const directories = getDirs("src/assets/images")

directories.map(dir => {
  const imageData = getImageMetadata(dir)
  writeJson(imageData, dir)
})

