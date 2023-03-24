import { rgbToHex } from './rgbToHex'
import { RGBColor } from './types'

describe('rgbToHex', () => {
  test('converts RGB color to hex string', () => {
    const input: RGBColor = [255, 0, 0]
    const expectedOutput = '#ff0000'

    expect(rgbToHex(input)).toBe(expectedOutput)
  })

  test('converts RGB color with single-digit components to hex string', () => {
    const input: RGBColor = [0, 15, 16]
    const expectedOutput = '#000f10'

    expect(rgbToHex(input)).toBe(expectedOutput)
  })

  test('converts black RGB color to hex string', () => {
    const input: RGBColor = [0, 0, 0]
    const expectedOutput = '#000000'

    expect(rgbToHex(input)).toBe(expectedOutput)
  })

  test('converts white RGB color to hex string', () => {
    const input: RGBColor = [255, 255, 255]
    const expectedOutput = '#ffffff'

    expect(rgbToHex(input)).toBe(expectedOutput)
  })
})
