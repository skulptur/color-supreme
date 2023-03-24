import { nearestNeighbor, scaleImage } from '../../dist'
import path from 'path'
import { listFilesInDir } from './listFilesInDir'
import { saveImageAsPng, loadImage } from './io'
import { updateMarkdown } from './updateMarkdown'

const root = path.join(__dirname, '..', '..')
export const imagesDir = path.resolve(root, './images/')
export const generatedSwatchesDir = path.resolve(imagesDir, './swatches/')
const scaledImagesDir = path.resolve(imagesDir, './scaling/')
export const readme = path.resolve(root, './README.md')
export const startComment = '<!-- START GENERATED CONTENT -->'
export const endComment = '<!-- END GENERATED CONTENT -->'

// scaling
const scaleImages = async () => {
  const imagePaths = await listFilesInDir(imagesDir)
  await Promise.all(
    imagePaths.map(async (imagePath) => {
      const image = await loadImage(imagePath)
      const imageFilenameName = path.basename(imagePath)
      // const factor = 0.5
      const scaledImage = scaleImage(
        image,
        3,
        image.width / 3.3,
        image.height / 3.3,
        nearestNeighbor
      )

      const outPath = scaledImagesDir + '/' + imageFilenameName
      await saveImageAsPng(scaledImage, 3, outPath)

      // console.log('saved scaled image:', outPath)
    })
  )
}

scaleImages().then(() => updateMarkdown().then(() => console.log('done!')))
