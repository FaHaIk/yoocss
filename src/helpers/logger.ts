const logError = (error: string): void => {
  console.error('\x1b[31m%s\x1b[0m', error)
}

const logWarning = (warning: string): void => {
  console.warn('\x1b[33m%s\x1b[0m', warning)
}

export { logError, logWarning }
