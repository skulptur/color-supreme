import { SkMeansResult } from './getDominantColors'
import { RGBColor } from './types'

export const sortByCounts = (
  numberOfColors: number,
  { idxs, centroids }: SkMeansResult<RGBColor>
) => {
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

export const noSort = (_numberOfColors: number, { centroids }: SkMeansResult<RGBColor>) => {
  return centroids
}
