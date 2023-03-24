import { getDominantColors } from '../../dist'
import path from 'path'
import { listFilesInDir } from './listFilesInDir'
import { createSwatch } from './createSwatch'
import { loadImage } from './io'
const fs = require('fs')
import { readme, startComment, endComment, imagesDir, generatedSwatchesDir } from './index'

// color swatches and markdown udpate
const getColors = async (imagePath: string, colors = 5) => {
  const imageDataWithInfo = await loadImage(imagePath)
  return getDominantColors(imageDataWithInfo, colors)
}
const imageWithSwatch = (imagePath: string, swatchPath: string) => {
  return `
  <img src="images/${path.basename(imagePath)}" alt="Example Image" width="200" height="200">
  <img src="images/swatches/${path.basename(swatchPath)}" alt="Example Image swatch" >
  `
}
export const updateMarkdown = async () => {
  const fileContents = fs.readFileSync(readme, 'utf8')
  // Find the start and end comment in the file using a regular expression:
  const regex = new RegExp(`${startComment}[\\s\\S]*${endComment}`)

  // Generate the dynamic content that will replace the section between the comments.
  const imagePaths = await listFilesInDir(imagesDir)
  const contents = await Promise.all(
    imagePaths.map(async (imagePath) => {
      const colors = await getColors(imagePath)
      const imageFilenameName = path.basename(imagePath)
      const generatedSwatch = await createSwatch(
        colors,
        generatedSwatchesDir + '/' + imageFilenameName
      )

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
