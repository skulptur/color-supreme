/**
 * Converts an RGB color value to a Lab color value.
 *
 * @param {number} r - The red color value (0-255).
 * @param {number} g - The green color value (0-255).
 * @param {number} b - The blue color value (0-255).
 * @returns {[number, number, number]} - An array containing the Lab color values [L, a, b].
 */
export function rgbToLab(r: number, g: number, b: number): [number, number, number] {
  // Convert RGB to linear RGB
  const rLinear = r / 255
  const gLinear = g / 255
  const bLinear = b / 255

  // Apply gamma correction to linear RGB values
  const rFinal = rLinear > 0.04045 ? Math.pow((rLinear + 0.055) / 1.055, 2.4) : rLinear / 12.92
  const gFinal = gLinear > 0.04045 ? Math.pow((gLinear + 0.055) / 1.055, 2.4) : gLinear / 12.92
  const bFinal = bLinear > 0.04045 ? Math.pow((bLinear + 0.055) / 1.055, 2.4) : bLinear / 12.92

  // Convert gamma-corrected RGB to XYZ
  const x = rFinal * 0.4124564 + gFinal * 0.3575761 + bFinal * 0.1804375
  const y = rFinal * 0.2126729 + gFinal * 0.7151522 + bFinal * 0.072175
  const z = rFinal * 0.0193339 + gFinal * 0.119192 + bFinal * 0.9503041

  // Convert XYZ to Lab using the reference white point (D65)
  const xRef = 95.047
  const yRef = 100.0
  const zRef = 108.883

  // Normalize XYZ values with reference white point
  const xNorm = x / xRef
  const yNorm = y / yRef
  const zNorm = z / zRef

  // Calculate f(x), f(y), and f(z) for Lab conversion
  const fx = xNorm > 0.008856 ? Math.pow(xNorm, 1 / 3) : 7.787 * xNorm + 16 / 116
  const fy = yNorm > 0.008856 ? Math.pow(yNorm, 1 / 3) : 7.787 * yNorm + 16 / 116
  const fz = zNorm > 0.008856 ? Math.pow(zNorm, 1 / 3) : 7.787 * zNorm + 16 / 116

  // Calculate Lab values
  const L = 116 * fy - 16
  const a = 500 * (fx - fy)
  const _b = 200 * (fy - fz)

  return [L, a, _b]
}
