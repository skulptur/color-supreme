import { imageDataToPixels, pixelsToImageData } from './bufferPixels'
import { BufferWithInfo, PixelDataWithInfo, RGBColor } from './types'

describe('imageUtils', () => {
  const pixelData: PixelDataWithInfo = {
    pixels: [
      [255, 0, 0],
      [0, 255, 0],
      [0, 0, 255],
    ],
    width: 3,
    height: 1,
  }

  const imageData: BufferWithInfo = {
    buffer: new Uint8ClampedArray([255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 255, 255]),
    width: 3,
    height: 1,
  }

  describe('pixelsToImageData', () => {
    it('should convert an array of pixels to image data', () => {
      expect(pixelsToImageData(pixelData)).toEqual(imageData)
    })
  })

  // describe('imageDataToPixels', () => {
  //   it('should convert image data to an array of pixels', () => {
  //     expect(imageDataToPixels(imageData)).toEqual(pixels)
  //   })
  // })

  // describe('pixelsToImageData', () => {
  //   it('should convert an array of pixels to image data', () => {
  //     expect(pixelsToImageData(pixels, 3, 1)).toEqual(imageData)
  //   })
  // })

  // it('should convert pixels to image data and back', () => {
  //   const convertedImageData = pixelsToImageData(pixels, 3, 1)
  //   expect(imageDataToPixels(convertedImageData)).toEqual(pixels)
  // })
})
