#!/usr/bin/env node

import YooCSS from '../dist/index.js'
import { logWarning } from '../dist/helpers/logger.js'
import cliParams from './cliParser.js'

const outFilePath = cliParams().outFile

if (outFilePath !== undefined) {
  const yoocss = new YooCSS({
    outFile: cliParams().outFile,
    include: cliParams().include,
    exclude: cliParams().exclude
  })
  yoocss.parseFromFiles()
} else {
  logWarning(
    "The 'outputFile' flag must be set. For Example 'yoocss -o pathToFile.css'."
  )
}
