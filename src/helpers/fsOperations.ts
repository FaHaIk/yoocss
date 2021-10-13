import * as fs from 'fs'
import { WriteStream } from 'fs'
import { logError, logWarning } from './logger.js'

const NO_CONFIG_FILE_WARNING =
  'The default YooCSS configuration will be used instead!'

const fileExists = (path: string): boolean => {
  try {
    fs.accessSync(path)
    return true
  } catch (err: any) {
    logError(err.message)
    logWarning(NO_CONFIG_FILE_WARNING)
    return false
  }
}

const readFileSync = (path: string): string => {
  let data = ''
  try {
    data = fs.readFileSync(path, 'utf8')
  } catch (err: any) {
    logError(err.message)
    // process.exit(1);
    throw new Error(err.message)
  }
  return data
}

const writeStream = (path: string, flag: string): WriteStream => {
  const ws = fs.createWriteStream(path, { flags: flag })
  ws.on('error', err => {
    logError(err.message)
    // process.exit(1);
    throw new Error(err.message)
  })
  return ws
}

export { fileExists, readFileSync, writeStream, WriteStream }
