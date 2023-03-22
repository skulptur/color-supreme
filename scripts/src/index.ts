import sharp from 'sharp'
import { getDominantColors, imageToPixels, rgbToHex } from '../../dist'
import path from 'path'

const test_image = path.resolve(path.join(__dirname, '..', '..'), './images/test_image.png')

const getColors = async (imagePath: string, colors = 5) => {
  const { data, info } = await sharp(imagePath)
    .raw()
    .toBuffer({ resolveWithObject: true })
  const pixels = imageToPixels(data, info.width!, info.height!)

  return getDominantColors(pixels, colors).map(rgbToHex)
}

getColors(test_image).then(console.log)
