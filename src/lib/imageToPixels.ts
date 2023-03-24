import { ImageDataWithInfo, RGBColor } from './types'

/**
 * Convert image data to an array of pixels where each pixel is represented as an array of three RGB values.
 * @param {Buffer | Uint8ClampedArray} imageDataWithInfo - The image data to convert along with its width and height.
 * @returns {number[][]} An array of pixels where each pixel is represented as an array of three RGB values.
 */
export const imageToPixels = ({ imageData, width, height }: ImageDataWithInfo): Array<RGBColor> => {
  const pixels = []
  for (let i = 0; i < width * height; i += 4) {
    pixels.push([
      imageData[i],
      imageData[i + 1],
      imageData[i + 2], // B
    ] as RGBColor)
  }
  return pixels
}
