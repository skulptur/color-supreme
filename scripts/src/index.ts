import sharp from 'sharp'
import { getDominantColors } from '../../dist'
import path from 'path'
import { listFilesInDir } from './listFilesInDir'
import { createSwatch } from './createSwatch'
const fs = require('fs')

const root = path.join(__dirname, '..', '..')
const imagesDir = path.resolve(root, './images/')
const generatedImagesDir = path.resolve(imagesDir, './generated/')
const readme = path.resolve(root, './README.md')
const startComment = '<!-- START GENERATED CONTENT -->'
const endComment = '<!-- END GENERATED CONTENT -->'

const getColors = async (imagePath: string, colors = 5) => {
  const { data, info } = await sharp(imagePath)
    .raw()
    .toBuffer({ resolveWithObject: true })
  const imageDataWithInfo = { imageData: data, width: info.width, height: info.height }

  return getDominantColors(imageDataWithInfo, colors)
}
// console.log('quantization', quantization(pixels as any, 1))
// return quantization(pixels as any)
// return quantization(pixels as any, 3)

const imageWithSwatch = (imagePath: string, swatchPath: string) => {
  return `
  <img src="images/${path.basename(imagePath)}" alt="Example Image" width="200" height="200">
  <img src="images/generated/${path.basename(swatchPath)}" alt="Example Image swatch" >
  `
}

const updateMarkdown = async () => {
  const fileContents = fs.readFileSync(readme, 'utf8')
  // Find the start and end comment in the file using a regular expression:
  const regex = new RegExp(`${startComment}[\\s\\S]*${endComment}`)

  // Generate the dynamic content that will replace the section between the comments.
  const imagePaths = await listFilesInDir(imagesDir)
  const contents = await Promise.all(
    imagePaths.map(async (imagePath) => {
      const colors = await getColors(imagePath)
      const imageFilenameName = path.basename(imagePath)
      const generatedSwatch = createSwatch(colors, generatedImagesDir + '/' + imageFilenameName)

      return imageWithSwatch(imagePath, generatedSwatch)
    })
  )
  const finalContents = contents.join('\n')

  const newFileContents = fileContents.replace(
    regex,
    `${startComment}\n${finalContents}\n${endComment}`
  )
  // Replace the matched section with the dynamic content
  // Write the new contents back to the file:
  fs.writeFileSync(readme, newFileContents, 'utf8')
}

updateMarkdown().then(() => console.log('done!'))
