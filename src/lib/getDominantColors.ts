import skmeans from 'skmeans'
import { imageDataToPixels } from './bufferPixels';
import { noSort } from './sorting';
import type { BufferWithInfo, RGBColor } from './types'

export type SkMeansResult<TPoint extends number[]> = {
  it: number;
  k: number;
  centroids: TPoint[];
  idxs: number[];
  test: (x: TPoint, distance?: (x: TPoint, y: TPoint) => number) => void;
}

// TODO: add more according to the skmeans possible values
export type CentroidValues =  'kmrand' | 'kmpp'

export type getDominantColorsOptions = {
  centroidValues: CentroidValues
  iterations: number
  sortFn: (numberOfColors: number, skMeansResult: SkMeansResult<RGBColor>) => Array<RGBColor>
}

const defaultOptions: getDominantColorsOptions = {
  centroidValues: 'kmrand',
  iterations: 10000,
  sortFn: noSort,
}

/**
 * Retrieves the dominant colors from a given set of pixels.
 *
 * @param {BufferWithInfo} imageBufferWithInfo - A 2D array representing the pixel colors as [R, G, B] tuples.
 * @param {number} numberOfColors - The number of dominant colors to extract.
 * @returns {RGBColor[]} An array of dominant colors represented as Color tuples.
 * Returns an empty array if the input pixels array is empty.
 */
export function getDominantColors(imageBufferWithInfo: BufferWithInfo, numberOfColors: number, options = defaultOptions): RGBColor[] {
  const pixels = imageDataToPixels(imageBufferWithInfo).pixels
  
  // Return an empty array if the pixels array is empty
  if (pixels.length === 0) return []

  const _numberOfColors = Math.min(pixels.length, numberOfColors)
  const result = skmeans(pixels, _numberOfColors, options.centroidValues, options.iterations)

  const sorted = options.sortFn(numberOfColors, result)

  return sorted.map((centroid) => {
    return [Math.round(centroid[0]), Math.round(centroid[1]), Math.round(centroid[2])] as RGBColor
  })
}
