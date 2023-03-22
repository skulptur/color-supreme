/**
 * Convert image data to an array of pixels where each pixel is represented as an array of three RGB values.
 * @param {Buffer | Uint8ClampedArray} imageData - The image data to convert.
 * @param {number} width - The width of the image.
 * @param {number} height - The height of the image.
 * @returns {number[][]} An array of pixels where each pixel is represented as an array of three RGB values.
 */
export const imageToPixels = (
  imageData: Buffer | Uint8ClampedArray,
  width: number,
  height: number
) => {
  const pixels: number[][] = []
  for (let i = 0; i < width * height; i += 4) {
    pixels.push([
      imageData[i],
      imageData[i + 1],
      imageData[i + 2], // B
    ])
  }
  return pixels
}
