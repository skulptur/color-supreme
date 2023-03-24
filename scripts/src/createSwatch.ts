import { createColorSwatches, RGBColor } from '../../dist'
import { saveImageAsPng } from './io'

export const createSwatch = async (rgbValues: Array<RGBColor>, path: string): Promise<string> => {
  const swatch = createColorSwatches(rgbValues, 50)
  await saveImageAsPng(swatch, 4, path)
  return path
}
