/**
 * Represents an RGB color as a tuple of three numbers, where each number corresponds to
 * a color channel (Red, Green, Blue) and ranges from 0 to 255.
 * @typedef { [number, number, number] } RGBColor
 */
export type RGBColor = [number, number, number]

export type ImageDataWithInfo = {
  imageData: Buffer | Uint8ClampedArray
  width: number
  height: number
}
