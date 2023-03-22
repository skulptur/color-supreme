import type { Color } from './types'

export function rgbToHex([r, g, b]: Color): string {
  const hexR = r.toString(16).padStart(2, '0')
  const hexG = g.toString(16).padStart(2, '0')
  const hexB = b.toString(16).padStart(2, '0')

  return `#${hexR}${hexG}${hexB}`
}
