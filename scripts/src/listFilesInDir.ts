import * as fs from 'fs'
import * as path from 'path'

export async function listFilesInDir(dirPath: string): Promise<string[]> {
  const files = await fs.promises.readdir(dirPath)
  const promises = files.map(async (file) => {
    const filePath = path.join(dirPath, file)
    const stats = await fs.promises.stat(filePath)
    if (stats.isFile()) {
      return filePath
    }
  })
  const filePaths = await Promise.all(promises)
  return filePaths.filter((filePath) => {
    return filePath !== undefined && !path.basename(filePath).startsWith('.')
  }) as string[]
}
