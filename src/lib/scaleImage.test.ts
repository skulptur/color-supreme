import { scaleImage, nearestNeighbor } from './scaleImage'

describe('scaleImage', () => {
  const width = 3
  const height = 3
  const channels = 3
  const imageData = new Uint8ClampedArray([
    255,
    0,
    0,
    0,
    255,
    0,
    0,
    0,
    255,
    255,
    255,
    0,
    0,
    255,
    255,
    0,
    0,
    255,
    255,
    0,
    255,
    0,
    255,
    255,
    255,
    0,
    0,
  ])

  test('generic case', () => {
    const newWidth = 6
    const newHeight = 6
    const expectedScaledImageData = new Uint8ClampedArray([])

    const scaledImageData = scaleImage(
      imageData,
      width,
      height,
      channels,
      newWidth,
      newHeight,
      nearestNeighbor
    )

    expect(scaledImageData).toEqual(expectedScaledImageData)
  })

  test('empty input image', () => {
    const emptyImageData = new Uint8ClampedArray(0)
    const newWidth = 6
    const newHeight = 6
    const emptyScaledImageData = new Uint8ClampedArray(newWidth * newHeight * channels)

    const scaledImageData = scaleImage(
      emptyImageData,
      0,
      0,
      channels,
      newWidth,
      newHeight,
      nearestNeighbor
    )

    expect(scaledImageData).toEqual(emptyScaledImageData)
  })

  test('input and output image are of the same size', () => {
    const newWidth = width
    const newHeight = height

    const scaledImageData = scaleImage(
      imageData,
      width,
      height,
      channels,
      newWidth,
      newHeight,
      nearestNeighbor
    )

    expect(scaledImageData).toEqual(imageData)
  })

  test('scaling to an image with width or height equal to 0', () => {
    const newWidth = 0
    const newHeight = 0
    const expectedScaledImageData = new Uint8ClampedArray(0)

    const scaledImageData = scaleImage(
      imageData,
      width,
      height,
      channels,
      newWidth,
      newHeight,
      nearestNeighbor
    )

    expect(scaledImageData).toEqual(expectedScaledImageData)
  })

  test('scaling to a 1x1 image', () => {
    const newWidth = 1
    const newHeight = 1
    const expectedScaledImageData = new Uint8ClampedArray([255, 0, 0])

    const scaledImageData = scaleImage(
      imageData,
      width,
      height,
      channels,
      newWidth,
      newHeight,
      nearestNeighbor
    )

    expect(scaledImageData).toEqual(expectedScaledImageData)
  })

  test('scaling down the image', () => {
    const newWidth = 2
    const newHeight = 2
    const expectedScaledImageData = new Uint8ClampedArray([])

    const scaledImageData = scaleImage(
      imageData,
      width,
      height,
      channels,
      newWidth,
      newHeight,
      nearestNeighbor
    )

    expect(scaledImageData).toEqual(expectedScaledImageData)
  })
})
