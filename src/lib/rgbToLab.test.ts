import { rgbToLab } from './rgbToLab'

describe('rgbToLab', () => {
  test('converts RGB red color to Lab color', () => {
    const r = 255
    const g = 0
    const b = 0

    const output = rgbToLab([r, g, b])
    expect(output).toEqual({ L: 53.23288178584245, a: 80.10930952982204, b: 67.22006831026425 })
  })

  test('converts black RGB color to Lab color', () => {
    const r = 0
    const g = 0
    const b = 0

    const output = rgbToLab([r, g, b])
    expect(output).toEqual({ L: 0, a: 0, b: 0 })
  })

  test('converts white RGB color to Lab color', () => {
    const r = 255
    const g = 255
    const b = 255

    const output = rgbToLab([r, g, b])
    expect(output).toEqual({ L: 100, a: 0.00526049995830391, b: -0.010408184525267927 })
  })

  test('converts gray RGB color to Lab color', () => {
    const r = 128
    const g = 128
    const b = 128

    const output = rgbToLab([r, g, b])
    expect(output).toEqual({
      L: 53.58501345216902,
      a: 0.003155620347972121,
      b: -0.006243566036268078,
    })
  })
})
