import sharp from 'sharp'
import { getDominantColors } from './getDominantColors'
import { imageToPixels } from './imageToPixels'
import path from 'path'

const test_image = path.resolve(path.join(__dirname, '..', '..'), './images/test_image.png')
describe('getDominantColors with sharp', () => {
  let image: sharp.Sharp
  let data: Buffer
  let info: sharp.OutputInfo
  let pixels: number[][]

  beforeAll(async () => {
    image = await sharp(test_image)
    const result = await image.raw().toBuffer({ resolveWithObject: true })
    data = result.data
    info = result.info

    pixels = imageToPixels(data, info.width!, info.height!)
  })

  test('should return the correct number of dominant colors', () => {
    expect(getDominantColors(pixels, 3)).toHaveLength(3)
  })

  test('should handle an empty pixel array', () => {
    const pixels: number[][] = []
    const numberOfColors = 3

    const result = getDominantColors(pixels, numberOfColors)
    expect(result).toHaveLength(0)
  })

  test('should handle when numberOfColors is greater than the pixel array length', () => {
    const pixels = [
      [255, 0, 0],
      [0, 255, 0],
      [0, 0, 255],
    ]
    const numberOfColors = 5

    const result = getDominantColors(pixels, numberOfColors)
    expect(result).toHaveLength(3)
  })
})
