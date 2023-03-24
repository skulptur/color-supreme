import { createColorSwatches, RGBColor } from '../../dist'
import sharp from 'sharp'

async function saveImageAsPng(
  imageData: Uint8ClampedArray | Buffer,
  channels: 1 | 2 | 3 | 4,
  width: number,
  height: number,
  outputPath: string
): Promise<void> {
  try {
    // Create a sharp instance with the raw image data and provided metadata
    const image = sharp(Buffer.from(imageData), {
      raw: {
        width: width,
        height: height,
        channels: channels,
      },
    })

    // Save the image as a PNG
    await image.png().toFile(outputPath)

    console.log(`Image saved as ${outputPath}`)
  } catch (err) {
    console.error('Failed to save image:', err)
  }
}

export const createSwatch = async (rgbValues: Array<RGBColor>, path: string): Promise<string> => {
  const swatch = createColorSwatches(rgbValues, 50)
  await saveImageAsPng(swatch.buffer, 4, swatch.width, swatch.height, path)
  return path
}
