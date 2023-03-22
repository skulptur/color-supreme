import skmeans from 'skmeans'
import type { Color } from './types'


// TODO: add more according to the skmeans possible values
export type CentroidValues =  'kmrand' | 'kmpp'

export type getDominantColorsOptions = {
  centroidValues: CentroidValues
}

const defaultOptions: getDominantColorsOptions = {
  centroidValues: 'kmpp'
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
  const { centroids, idxs } = skmeans(pixels, _numberOfColors, options.centroidValues)
  // TODO: add ordering as an option
  // const counts = new Array(_numberOfColors).fill(0)

  // // Count the number of pixels assigned to each cluster
  // for (let i = 0; i < idxs.length; i++) {
  //   const clusterIndex = idxs[i]
  //   counts[clusterIndex]++
  // }

  // // // Sort the centroids based on the counts
  // const sortedCentroids = centroids
  //   .map((centroid, index) => ({ centroid, count: counts[index] }))
  //   .sort((a, b) => b.count - a.count)
  //   .map((item) => item.centroid)

  return centroids.map((centroid) => {
    return [Math.round(centroid[0]), Math.round(centroid[1]), Math.round(centroid[2])] as Color
  })
}
