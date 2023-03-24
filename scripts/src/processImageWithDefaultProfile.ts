import sharp, { Sharp } from 'sharp'
import fs from 'fs'

type ProcessImageCallback = (image: Sharp) => Promise<void>

export async function processImageWithDefaultProfile(
  inputPath: string,
  callback: ProcessImageCallback
): Promise<void> {
  const defaultProfilePath = 'path/to/default-color-profile.icc'

  try {
    const defaultProfile = await fs.promises.readFile(defaultProfilePath)

    const image = sharp(inputPath)
    const metadata = await image.metadata()

    if (!metadata.hasProfile) {
      await image.withMetadata({ icc: defaultProfile })
    }

    await callback(image)
  } catch (error) {
    console.error('Error processing the image:', error)
  }
}
