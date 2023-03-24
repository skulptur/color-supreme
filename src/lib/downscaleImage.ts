export function downscaleImageNearestNeighbor(
  imageData: Uint8ClampedArray,
  width: number,
  height: number,
  channels: number,
  maxSize: number = 256
): Uint8ClampedArray {
  // Calculate the scale factors for width and height
  const scaleFactor = maxSize / Math.max(width, height)

  // Calculate the dimensions of the downscaled image
  const newWidth = Math.floor(width * scaleFactor)
  const newHeight = Math.floor(height * scaleFactor)

  // Create a new Uint8ClampedArray for the downscaled image
  const downscaledImageData = new Uint8ClampedArray(newWidth * newHeight * channels)

  // Loop through the pixels of the downscaled image
  for (let y = 0; y < newHeight; y++) {
    for (let x = 0; x < newWidth; x++) {
      // Calculate the corresponding pixel in the original image
      const srcX = Math.floor(x / scaleFactor)
      const srcY = Math.floor(y / scaleFactor)

      // Loop through the channels
      for (let c = 0; c < channels; c++) {
        // Calculate the indices in the input and output arrays
        const srcIndex = (srcY * width + srcX) * channels + c
        const dstIndex = (y * newWidth + x) * channels + c

        // Copy the pixel value from the input to the output array
        downscaledImageData[dstIndex] = imageData[srcIndex]
      }
    }
  }

  return downscaledImageData
}

export function downscaleImageBilinear(
  imageData: Uint8ClampedArray,
  width: number,
  height: number,
  channels: number,
  maxSize: number = 256
): Uint8ClampedArray {
  // Calculate the scale factors for width and height
  const scaleFactor = maxSize / Math.max(width, height)

  // Calculate the dimensions of the downscaled image
  const newWidth = Math.floor(width * scaleFactor)
  const newHeight = Math.floor(height * scaleFactor)

  // Create a new Uint8ClampedArray for the downscaled image
  const downscaledImageData = new Uint8ClampedArray(newWidth * newHeight * channels)

  // Loop through the pixels of the downscaled image
  for (let y = 0; y < newHeight; y++) {
    for (let x = 0; x < newWidth; x++) {
      // Calculate the corresponding position in the original image
      const srcX = x / scaleFactor
      const srcY = y / scaleFactor

      // Calculate the integer coordinates of the surrounding pixels
      const x1 = Math.floor(srcX)
      const x2 = Math.min(Math.ceil(srcX), width - 1)
      const y1 = Math.floor(srcY)
      const y2 = Math.min(Math.ceil(srcY), height - 1)

      // Calculate the interpolation weights
      const dx = srcX - x1
      const dy = srcY - y1

      // Loop through the channels
      for (let c = 0; c < channels; c++) {
        // Calculate the indices of the surrounding pixels in the input array
        const i11 = (y1 * width + x1) * channels + c
        const i12 = (y2 * width + x1) * channels + c
        const i21 = (y1 * width + x2) * channels + c
        const i22 = (y2 * width + x2) * channels + c

        // Perform bilinear interpolation
        const value =
          imageData[i11] * (1 - dx) * (1 - dy) +
          imageData[i12] * (1 - dx) * dy +
          imageData[i21] * dx * (1 - dy) +
          imageData[i22] * dx * dy

        // Calculate the index in the output array
        const dstIndex = (y * newWidth + x) * channels + c

        // Set the pixel value in the output array
        downscaledImageData[dstIndex] = value
      }
    }
  }

  return downscaledImageData
}
