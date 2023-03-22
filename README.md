## `color-supreme`

A powerful library for extracting dominant colors from images. Color-Supreme uses the k-means clustering algorithm to analyze the colors in an image and identify the most dominant ones, making it ideal for a range of applications such as image processing, data visualization, and search algorithms.

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

<img src="images/test_image.png" alt="Example Image" width="200" height="200">

<span style="color:#1b1b1b; font-size:40px">■</span>
<span style="color:#d2cdb0; font-size:40px">■</span>
<span style="color:#b0d1cd; font-size:40px">■</span>
<span style="color:#cdb2d3; font-size:40px">■</span>
<span style="color:#0f15d3; font-size:40px">■</span>

---

## License

`color-supreme` is open source software released under the MIT license. See the LICENSE file for more information.

I hope you enjoy using `color-supreme` and find it useful in your projects. If you have any questions or feedback, please don't hesitate to reach out.
