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
import { getDominantColors, rgbToRex } from 'color-supreme'
import { getPixels } from 'color-supreme/browser'

const colors = 5
const myImageUrl = '...'
const pixels = getPixels(myImageUrl)

console.log(getDominantColors(pixels, colors).map(rgbToRex))
```

Node (example with sharp)

```typescript
import sharp from 'sharp'
import { getDominantColors, imageToPixels, rgbToRex } from 'color-supreme'

const colors = 5
const myImagePath = '...'
const { data, info } = await sharp(myImagePath)
  .raw()
  .toBuffer({ resolveWithObject: true })
const pixels = imageToPixels(data, info.width!, info.height!)

console.log(getDominantColors(pixels, colors).map(rgbToRex))
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
