import sharp from 'sharp'
import { getDominantColors, imageToPixels, rgbToHex } from '../../dist'
import path from 'path'
import { listFilesInDir } from './listFilesInDir'
const fs = require('fs')

const root = path.join(__dirname, '..', '..')
const imagesDir = path.resolve(root, './images/')
const readme = path.resolve(root, './README.md')
const startComment = '<!-- START GENERATED CONTENT -->'
const endComment = '<!-- END GENERATED CONTENT -->'

const getColors = async (imagePath: string, colors = 5) => {
  const { data, info } = await sharp(imagePath)
    .raw()
    .toBuffer({ resolveWithObject: true })
  const pixels = imageToPixels(data, info.width!, info.height!)

  return getDominantColors(pixels, colors).map(rgbToHex)
}

const imageWithSwatch = (imagePath: string, colors: Array<string>) => {
  return `
  <img src="images/${path.basename(imagePath)}" alt="Example Image" width="200" height="200">
  <span style="color:${colors[0]}; font-size:40px">■</span>
  <span style="color:${colors[1]}; font-size:40px">■</span>
  <span style="color:${colors[2]}; font-size:40px">■</span>
  <span style="color:${colors[3]}; font-size:40px">■</span>
  <span style="color:${colors[4]}; font-size:40px">■</span>
  `
}

const updateMarkdown = async () => {
  const fileContents = fs.readFileSync(readme, 'utf8')
  // Find the start and end comment in the file using a regular expression:
  const regex = new RegExp(`${startComment}[\\s\\S]*${endComment}`)

  // Generate the dynamic content that will replace the section between the comments.
  const imagePaths = await listFilesInDir(imagesDir)
  const contents = await Promise.all(
    imagePaths.map(async (path) => {
      const colors = await getColors(path)

      return imageWithSwatch(path, colors)
    })
  )
  const finalContents = contents.join('\n')

  const newFileContents = fileContents.replace(
    regex,
    `${startComment}\n${finalContents}\n${endComment}`
  )
  // Replace the matched section with the dynamic content
  // Write the new contents back to the file:
  fs.writeFileSync(readme, newFileContents, 'utf8')
}

updateMarkdown().then(() => console.log('done!'))
