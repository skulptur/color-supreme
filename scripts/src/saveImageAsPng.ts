import sharp from 'sharp'
import { BufferWithInfo } from '../../dist'

export async function saveImageAsPng(
  { buffer, width, height }: BufferWithInfo,
  channels: 1 | 2 | 3 | 4,
  outputPath: string
) {
  try {
    // Create a sharp instance with the raw image data and provided metadata
    const image = sharp(Buffer.from(buffer), {
      raw: {
        width,
        height,
        channels: channels,
      },
    })

    // Save the image as a PNG
    return await image.png().toFile(outputPath)
  } catch (err) {
    return err
  }
}
