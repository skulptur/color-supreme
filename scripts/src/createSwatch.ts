import * as fs from 'fs'
import { PNG } from 'pngjs'

export function createSwatch(rgbValues: number[][], path: string): string {
  const swatchWidth = 50
  const swatchHeight = 50
  const numSwatches = rgbValues.length

  const pngWidth = swatchWidth * numSwatches
  const pngHeight = swatchHeight

  const png = new PNG({
    width: pngWidth,
    height: pngHeight,
  })

  for (let i = 0; i < numSwatches; i++) {
    const [r, g, b] = rgbValues[i]

    for (let y = 0; y < swatchHeight; y++) {
      for (let x = 0; x < swatchWidth; x++) {
        const idx = (y * swatchWidth + x) << 2
        png.data[((i * swatchWidth + x + pngWidth * y) << 2) + 0] = r
        png.data[((i * swatchWidth + x + pngWidth * y) << 2) + 1] = g
        png.data[((i * swatchWidth + x + pngWidth * y) << 2) + 2] = b
        png.data[((i * swatchWidth + x + pngWidth * y) << 2) + 3] = 255
      }
    }
  }

  const writeStream = fs.createWriteStream(path)
  png.pack().pipe(writeStream)

  return path
}
