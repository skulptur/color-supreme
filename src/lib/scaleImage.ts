const cubicInterpolate = (p0: number, p1: number, p2: number, p3: number, t: number) => {
  const a = -0.5 * p0 + 1.5 * p1 - 1.5 * p2 + 0.5 * p3
  const b = p0 - 2.5 * p1 + 2 * p2 - 0.5 * p3
  const c = -0.5 * p0 + 0.5 * p2
  const d = p1

  return a * Math.pow(t, 3) + b * Math.pow(t, 2) + c * t + d
}

export const bicubicInterpolation: SamplingFunction = (
  srcX: number,
  srcY: number,
  imageData: Uint8ClampedArray,
  width: number,
  height: number,
  channels: number
) => {
  const x1 = Math.floor(srcX)
  const y1 = Math.floor(srcY)

  const sampledPixel = new Uint8Array(channels)

  for (let c = 0; c < channels; c++) {
    const values = new Array(4)
    for (let j = -1; j <= 2; j++) {
      const y = Math.max(0, Math.min(height - 1, y1 + j))
      const rowValues = new Array(4)
      for (let i = -1; i <= 2; i++) {
        const x = Math.max(0, Math.min(width - 1, x1 + i))
        const index = (y * width + x) * channels + c
        rowValues[i + 1] = imageData[index]
      }
      values[j + 1] = cubicInterpolate(
        rowValues[0],
        rowValues[1],
        rowValues[2],
        rowValues[3],
        srcX - x1
      )
    }
    sampledPixel[c] = Math.round(
      cubicInterpolate(values[0], values[1], values[2], values[3], srcY - y1)
    )
  }

  return sampledPixel
}

export const bilinearInterpolation: SamplingFunction = (
  srcX: number,
  srcY: number,
  imageData: Uint8ClampedArray,
  width: number,
  height: number,
  channels: number
) => {
  const x1 = Math.floor(srcX)
  const x2 = Math.min(Math.ceil(srcX), width - 1)
  const y1 = Math.floor(srcY)
  const y2 = Math.min(Math.ceil(srcY), height - 1)

  const px11 = (y1 * width + x1) * channels
  const px12 = (y1 * width + x2) * channels
  const px21 = (y2 * width + x1) * channels
  const px22 = (y2 * width + x2) * channels

  const dx = srcX - x1
  const dy = srcY - y1

  const sampledPixel = new Uint8Array(channels)

  for (let c = 0; c < channels; c++) {
    const value =
      imageData[px11 + c] * (1 - dx) * (1 - dy) +
      imageData[px12 + c] * dx * (1 - dy) +
      imageData[px21 + c] * (1 - dx) * dy +
      imageData[px22 + c] * dx * dy
    sampledPixel[c] = Math.round(value)
  }

  return sampledPixel
}

export const nearestNeighbor: SamplingFunction = (
  srcX: number,
  srcY: number,
  imageData: Uint8ClampedArray,
  width: number,
  _height: number,
  channels: number
) => {
  const roundedSrcX = Math.round(srcX)
  const roundedSrcY = Math.round(srcY)
  const srcIndex = (roundedSrcY * width + roundedSrcX) * channels
  return new Uint8Array(imageData.slice(srcIndex, srcIndex + channels))
}

type SamplingFunction = (
  srcX: number,
  srcY: number,
  imageData: Uint8ClampedArray,
  width: number,
  height: number,
  channels: number
) => Uint8Array

export function scaleImage(
  imageData: Uint8ClampedArray,
  width: number,
  height: number,
  channels: number,
  newWidth: number,
  newHeight: number,
  samplingMethod: SamplingFunction = nearestNeighbor
): Uint8ClampedArray {
  const scaleFactorX = newWidth / width
  const scaleFactorY = newHeight / height
  const scaledImageData = new Uint8ClampedArray(newWidth * newHeight * channels)

  for (let y = 0; y < newHeight; y++) {
    for (let x = 0; x < newWidth; x++) {
      const srcX = x / scaleFactorX
      const srcY = y / scaleFactorY
      const sampledPixel = samplingMethod(srcX, srcY, imageData, width, height, channels)

      for (let c = 0; c < channels; c++) {
        const dstIndex = (y * newWidth + x) * channels + c
        scaledImageData[dstIndex] = sampledPixel[c]
      }
    }
  }

  return scaledImageData
}
