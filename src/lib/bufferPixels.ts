import { BufferWithInfo, PixelDataWithInfo, RGBColor } from './types'

/**
 * Convert image data to an array of pixels where each pixel is represented as an array of three RGB values.
 * @param {Buffer | Uint8ClampedArray} imageDataWithInfo - The image data to convert along with its width and height.
 * @returns {number[][]} An array of pixels where each pixel is represented as an array of three RGB values.
 */
export const imageDataToPixels = ({
  buffer: imageData,
  width,
  height,
}: BufferWithInfo): Array<RGBColor> => {
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

/**
 * Convert an array of pixels to image data where each pixel is represented as an array of three RGB values.
 * @param {number[][]} pixels - An array of pixels where each pixel is represented as an array of three RGB values.
 * @param {number} width - The width of the image.
 * @param {number} height - The height of the image.
 * @returns {Uint8ClampedArray} The image data as a Uint8ClampedArray.
 */
export const pixelsToImageData = ({ pixels, width, height }: PixelDataWithInfo): BufferWithInfo => {
  const imageData = new Uint8ClampedArray(width * height * 4)
  // In this implementation, we use two index variables:
  // i for iterating over the pixels array and j for iterating over the imageData array.
  for (let i = 0, j = 0; i < pixels.length; i++, j += 4) {
    imageData[j] = pixels[i][0] // R
    imageData[j + 1] = pixels[i][1] // G
    imageData[j + 2] = pixels[i][2] // B
    imageData[j + 3] = 255 // A
  }

  return {
    buffer: imageData,
    width,
    height,
  }
}
