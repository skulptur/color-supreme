## `color-supreme`

A powerful library for extracting dominant colors from images. It uses the k-means clustering algorithm to analyze the colors and identify the most dominant ones, making it ideal for a range of applications such as image processing, data visualization, and search algorithms.

## Get started

### Install

```bash
yarn add color-supreme
# or
npm install --save color-supreme
```

### Use

Browser

```typescript
import { getDominantColors, getPixelsCanvas, rgbToHex } from 'color-supreme'

const getColors = async (url: string, colors = 5) => {
  const pixels = await getPixelsCanvas(url)
  return getDominantColors(pixels, colors).map(rgbToHex)
}

getColors('your image url').then(console.log)
```

Node (example with sharp)

```typescript
import sharp from 'sharp'
import { getDominantColors, imageToPixels, rgbToHex } from 'color-supreme'

const getColors = async (path: string, colors = 5) => {
  const { data, info } = await sharp(path)
    .raw()
    .toBuffer({ resolveWithObject: true })
  const pixels = imageToPixels(data, info.width!, info.height!)

  return getDominantColors(pixels, colors).map(rgbToHex)
}

getColors('your image path').then(console.log)
```

<!-- START GENERATED CONTENT -->

  <img src="images/0.png" alt="Example Image" width="200" height="200">
  <img src="images/generated/0.png" alt="Example Image swatch" >
  

  <img src="images/1.png" alt="Example Image" width="200" height="200">
  <img src="images/generated/1.png" alt="Example Image swatch" >
  

  <img src="images/2.png" alt="Example Image" width="200" height="200">
  <img src="images/generated/2.png" alt="Example Image swatch" >
  

  <img src="images/3.png" alt="Example Image" width="200" height="200">
  <img src="images/generated/3.png" alt="Example Image swatch" >
  
<!-- END GENERATED CONTENT -->

---

## License

This library is open source software released under the MIT license. See the LICENSE file for more information.

I hope you enjoy using it and find it useful in your projects. If you have any questions or feedback, please don't hesitate to reach out.
