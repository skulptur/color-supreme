import skmeans from 'skmeans'
import type { Color } from './types'

export type SkMeansResult<TPoint extends number[]> = {
  it: number;
  k: number;
  centroids: TPoint[];
  idxs: number[];
  test: (x: TPoint, distance?: (x: TPoint, y: TPoint) => number) => void;
}

export const sortByCounts = (numberOfColors: number, {idxs, centroids}: SkMeansResult<number[]>) => {
    const counts = new Array(numberOfColors).fill(0)

    // Count the number of pixels assigned to each cluster
    for (let i = 0; i < idxs.length; i++) {
      const clusterIndex = idxs[i]
      counts[clusterIndex]++
    }
  
    // Sort the centroids based on the counts
    return centroids
      .map((centroid, index) => ({ centroid, count: counts[index] }))
      .sort((a, b) => b.count - a.count)
      .map((item) => item.centroid)
    
}

export const noSort = (_numberOfColors: number, {centroids}: SkMeansResult<number[]>) => {
  return centroids
}

// TODO: add more according to the skmeans possible values
export type CentroidValues =  'kmrand' | 'kmpp'

export type getDominantColorsOptions = {
  centroidValues: CentroidValues
  iterations: number
  sortFn: (numberOfColors: number, skMeansResult: SkMeansResult<number[]>) => Array<number[]>
}

const defaultOptions: getDominantColorsOptions = {
  centroidValues: 'kmrand',
  iterations: 10000,
  sortFn: noSort
}

/**
 * Retrieves the dominant colors from a given set of pixels.
 *
 * @param {number[][]} pixels - A 2D array representing the pixel colors as [R, G, B] tuples.
 * @param {number} numberOfColors - The number of dominant colors to extract.
 * @returns {Color[]} An array of dominant colors represented as Color tuples.
 * Returns an empty array if the input pixels array is empty.
 */
export function getDominantColors(pixels: number[][], numberOfColors: number, options = defaultOptions): Color[] {
  // Return an empty array if the pixels array is empty
  if (pixels.length === 0) return []

  const _numberOfColors = Math.min(pixels.length, numberOfColors)
  const result = skmeans(pixels, _numberOfColors, options.centroidValues, options.iterations)

  const sorted = options.sortFn(numberOfColors, result)

  return sorted.map((centroid) => {
    return [Math.round(centroid[0]), Math.round(centroid[1]), Math.round(centroid[2])] as Color
  })
}
