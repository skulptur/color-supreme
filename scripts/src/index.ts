import sharp from 'sharp'
import { getDominantColors, nearestNeighbor, scaleImage } from '../../dist'
import path from 'path'
import { listFilesInDir } from './listFilesInDir'
import { createSwatch } from './createSwatch'
import { saveImageAsPng } from './saveImageAsPng'
const fs = require('fs')

const root = path.join(__dirname, '..', '..')
const imagesDir = path.resolve(root, './images/')
const generatedSwatchesDir = path.resolve(imagesDir, './swatches/')
const scaledImagesDir = path.resolve(imagesDir, './scaling/')
const readme = path.resolve(root, './README.md')
const startComment = '<!-- START GENERATED CONTENT -->'
const endComment = '<!-- END GENERATED CONTENT -->'

const loadImage = async (imagePath: string) => {
  const { data, info } = await sharp(imagePath)
    .raw()
    .toBuffer({ resolveWithObject: true })
  return { buffer: data, width: info.width, height: info.height }
}

// scaling
const scaleImages = async () => {
  const imagePaths = await listFilesInDir(imagesDir)
  await Promise.all(
    imagePaths.map(async (imagePath) => {
      const image = await loadImage(imagePath)
      const imageFilenameName = path.basename(imagePath)
      // const factor = 0.5
      const scaledImage = await scaleImage(
        image,
        3,
        image.width / 4,
        image.height / 4,
        nearestNeighbor
      )

      await saveImageAsPng(scaledImage, 3, scaledImagesDir + '/' + imageFilenameName)

      console.log('saved scaled image:')
    })
  )
}

scaleImages()

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

updateMarkdown().then(() => console.log('done!'))
