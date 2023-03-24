import { BufferWithInfo, RGBColor } from './types'

export function createColorSwatches(
  swatches: RGBColor[],
  swatchSize: number,
  swatchesPerRow?: number
): BufferWithInfo {
  const columns = swatchesPerRow ?? swatches.length
  const width = columns * swatchSize
  const height = Math.ceil(swatches.length / columns) * swatchSize

  const imageData = new Uint8ClampedArray(width * height * 4)

  for (let i = 0; i < swatches.length; i++) {
    const color = swatches[i]

    const row = Math.floor(i / columns)
    const col = i % columns

    const startX = col * swatchSize
    const startY = row * swatchSize

    for (let y = startY; y < startY + swatchSize; y++) {
      for (let x = startX; x < startX + swatchSize; x++) {
        const index = (y * width + x) * 4
        imageData[index] = color[0] // R
        imageData[index + 1] = color[1] // G
        imageData[index + 2] = color[2] // B
        imageData[index + 3] = 255 // A
      }
    }
  }

  return {
    buffer: imageData,
    width,
    height,
  }
}
