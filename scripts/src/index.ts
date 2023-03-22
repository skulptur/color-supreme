import * as fs from 'fs'
import * as path from 'path'
import * as ts from 'typescript'

const rootPath = path.join(__dirname, '..', '..')

const indexFilePath = rootPath + '/src/index.ts'
const outputFile = './output.ts'

function findExports(filePath: string): string[] {
  const sourceFile = ts.createSourceFile(
    filePath,
    fs.readFileSync(filePath, 'utf8'),
    ts.ScriptTarget.ES2015
  )

  const exports: string[] = []

  sourceFile.forEachChild((node) => {
    if (ts.isExportDeclaration(node)) {
      const { moduleSpecifier } = node
      if (moduleSpecifier && ts.isStringLiteral(moduleSpecifier)) {
        const importedFilePath = path.resolve(path.dirname(filePath), moduleSpecifier.text + '.ts')
        exports.push(importedFilePath)
      }
    }
  })

  return exports
}

function processFile(filePath: string): string {
  const sourceFile = ts.createSourceFile(
    filePath,
    fs.readFileSync(filePath, 'utf8'),
    ts.ScriptTarget.ES2015
  )

  let output = ''

  sourceFile.forEachChild((node) => {
    if (!ts.isImportDeclaration(node)) {
      output += node.getFullText(sourceFile) + '\n'
    }
  })

  return output
}

function concatFilesInTopologicalOrder(
  filePaths: string[],
  visited: Set<string> = new Set(),
  output: string[] = []
): string[] {
  for (const filePath of filePaths) {
    if (!visited.has(filePath)) {
      visited.add(filePath)
      const exports = findExports(filePath)
      concatFilesInTopologicalOrder(exports, visited, output)
      output.push(processFile(filePath))
    }
  }

  return output
}

const exportedFiles = findExports(indexFilePath)
const concatenatedContent = concatFilesInTopologicalOrder(exportedFiles).join('\n')
fs.writeFileSync(outputFile, concatenatedContent)
console.log(`Generated file: ${outputFile}`)
