import fs from 'fs'
import path from 'path'
import imageSize from 'image-size'

const extensions = ['.jpeg', '.jpg', '.png']

// Function to recursively read files in a directory
export function readFiles(dir: string) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true })
  const files = dirents
    .filter(dirent => dirent.isFile() && extensions.some(
      extension => dirent.name.endsWith(extension)
    ))
    .map(dirent => dirent.path + dirent.name)
  return files
}

interface ImageData {
  src: string;
  filename: string;
  width: number;
  height: number;
  alt: string;
  desc: string;
  title: string;
}

// Function to get dimensions of an image file
function getImageDimensions(filePath: string) {
  const dimensions = imageSize(filePath)
  return dimensions
}

// Function to generate JSON data for all images in a folder
export function getImageMetadata(folderPath: string) : ImageData[] {
  const imageFiles = readFiles(folderPath);

  const imageData = imageFiles.map((filePath) => {
    const dimensions = getImageDimensions(filePath)
    return {
      src: filePath,
      filename: path.basename(filePath),
      width: dimensions.width,
      height: dimensions.height,
      alt: '',
      desc: '',
      title: ''
    } as ImageData
  })
  return imageData
}

export function readImageMetadata(folderPath: string) : ImageData[] {
  const JSONpath = path.join(folderPath, path.basename(folderPath) + '_imageData.json')
  const JSONdata = fs.readFileSync(JSONpath, 'utf8')

  const imageData: ImageData[] = JSON.parse(JSONdata);

  return imageData
}

export function writeJson(imageData: ImageData[], folderPath: string) {
  const jsonData = JSON.stringify(imageData)
  const jsonFilePath = path.join(folderPath, path.basename(folderPath) + '_imageData.json')
  fs.writeFileSync(jsonFilePath, jsonData);
}

