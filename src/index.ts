import fg from 'fast-glob'
import NodeHTMLParser, { HTMLElement } from 'node-html-parser'
import { readFileSync, writeStream, WriteStream } from './helpers/fsOperations.js'
import { formatCSSRule, getCSSProperty, getCSSValue, getEscapedCSSClass, checkCorrectFormat } from './helpers/stringOperations.js'
import { CSSRuleElement, Options, YooCSSClass } from './helpers/types.js'

// @ts-expect-error
const { parse } = NodeHTMLParser

export default class YooCSS implements YooCSSClass {
  outFile: string
  include: string
  exclude: string

  constructor (options: Options) {
    this.outFile = options.outFile
    this.include = options.include
    this.exclude = options.exclude
  }

  parseFromFiles (): void {
    const excludedGlob: string[] =
      this.exclude === '' ? ['node_modules'] : ['node_modules', this.exclude]
    const files: string[] = fg.sync(this.include, {
      onlyFiles: true,
      ignore: excludedGlob
    })
    const rawClasses: string[] = files.map(this.getRawClass, this).flat()
    const uniqueRawClasses: string[] = this.createUniqueArray(rawClasses)
    const cssRuleElements: CSSRuleElement[] = uniqueRawClasses.filter((uniqueClass) => {
      return checkCorrectFormat(uniqueClass)
    }).map(
      this.getCSSRuleElement
    )
    const stream: WriteStream = writeStream(this.outFile, 'w')
    cssRuleElements.forEach(uniqueClass => {
      this.writeCSSRuleElementToStream(uniqueClass, stream)
    })
    stream.end()
  }

  private createUniqueArray (classes: string[]): string[] {
    const uniqueRawClasses: Set<string> = new Set<string>(classes)
    return [...uniqueRawClasses]
  }

  private getRawClass (item: string): string[] {
    const data: string = readFileSync(item)
    const root: HTMLElement = parse(data)
    const allClasses: string[] = this.getIndividualClassNames(root)
    return allClasses
  }

  private getIndividualClassNames (elem: HTMLElement): string[] {
    return Array.from(elem.querySelectorAll('[class]'))
      .flatMap(e => e.classNames.toString().split(/\s+/))
      .flat()
  }

  private getCSSRuleElement (rawClass: string): CSSRuleElement {
    const cssRuleElement: CSSRuleElement = {
      className: getEscapedCSSClass(rawClass),
      property: getCSSProperty(rawClass),
      value: getCSSValue(rawClass)
    }
    return cssRuleElement
  }

  private writeCSSRuleElementToStream (
    formatedClass: CSSRuleElement,
    stream: WriteStream
  ): void {
    stream.write(
      formatCSSRule(
        formatedClass.className,
        formatedClass.property,
        formatedClass.value
      )
    )
  }
}
