import sharp from 'sharp'
import { getDominantColors } from './getDominantColors'
import path from 'path'
import { BufferWithInfo } from './types'

const test_image = path.resolve(path.join(__dirname, '..', '..'), './images/0.png')
describe('getDominantColors with sharp', () => {
  const imageData: BufferWithInfo = {
    buffer: new Uint8ClampedArray([255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 255, 255]),
    width: 3,
    height: 1,
  }

  let image: sharp.Sharp
  let data: Buffer
  let info: sharp.OutputInfo
  let imageDataWithInfo: BufferWithInfo

  beforeAll(async () => {
    image = await sharp(test_image)
    const result = await image.raw().toBuffer({ resolveWithObject: true })
    data = result.data
    info = result.info
    imageDataWithInfo = {
      buffer: data,
      width: info.width!,
      height: info.height!,
    }
  })

  test('should return the correct number of dominant colors', () => {
    expect(getDominantColors(imageDataWithInfo, 3)).toHaveLength(3)
  })

  test('should handle an empty pixel array', () => {
    const emptyImage: BufferWithInfo = {
      buffer: new Uint8ClampedArray([]),
      width: 0,
      height: 0,
    }
    const numberOfColors = 3

    const result = getDominantColors(emptyImage, numberOfColors)
    expect(result).toHaveLength(0)
  })

  test('should handle when numberOfColors is greater than the pixel array length', () => {
    const numberOfColors = 5

    const result = getDominantColors(imageData, numberOfColors)
    expect(result).toHaveLength(3)
  })
})
