import { imageToPixels } from './imageToPixels'
import type { Color } from './types'

/**
* Convert an image to a 2D array of pixel values using the browser's Canvas API.
* @param imageUrl - The URL of the image to be converted.
* @returns A Promise that resolves to a an array of Color which represents the pixels of the image
* @throws Error if the canvas context is not available.
*/
export const getPixelsCanvas = async (imageUrl: string): Promise<Array<Color>> => {
  const image = new Image()
  image.src = imageUrl
  await new Promise((resolve) => (image.onload = resolve))

  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  canvas.style.display = 'none'

  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas context not available')

  ctx.drawImage(image, 0, 0)

  const imageData = ctx.getImageData(0, 0, image.width, image.height)
  const pixels = imageToPixels(imageData.data, image.width, image.height)

  // Clean up
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  canvas.width = 0
  canvas.height = 0
  image.src = ''
  canvas.remove()

  return pixels as Array<Color>
}
