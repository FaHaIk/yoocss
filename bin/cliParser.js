import meow from 'meow'

const DEFAULT_INCLUDE = './**/*.html'
const DEFAULT_EXCLUDE = ''

export default () => {
  const flags = meow(`
  Usage
    yoocss [flags]

  Options
    --rainbow, -r  Include a rainbow
    --unicorn, -u  Include a unicorn
    --no-sparkles  Exclude sparkles
  
  Examples
    $ foo
    🌈 unicorns✨🌈
`, {

    importMeta: import.meta,
    booleanDefault: undefined,
    flags: {
      outFile: {
        type: 'string',
        alias: 'o'
      },
      include: {
        type: 'string',
        default: DEFAULT_INCLUDE,
        alias: 'i'
      },
      exclude: {
        type: 'string',
        default: DEFAULT_EXCLUDE,
        alias: 'e'
      }
    }
  })
  return flags.flags
}
