export const imageToPixels = (
  imageData: Buffer | Uint8ClampedArray,
  width: number,
  height: number
) => {
  const pixels: number[][] = []
  for (let i = 0; i < width * height; i += 4) {
    pixels.push([
      imageData[i],
      imageData[i + 1],
      imageData[i + 2], // B
    ])
  }
  return pixels
}
