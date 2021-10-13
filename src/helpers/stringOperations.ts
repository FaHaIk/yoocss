const getEscapedCSSClass = (className: string): string => {
  return className
    .replace('(', '\\(')
    .replace(/_/g, '\\_')
    .replace(')', '\\)')
    .replace(/#/g, '\\#')
    .replace(/%/g, '\\%')
}
const getCSSValue = (className: string): string => {
  return className
    .substring(className.indexOf('(') + 1, className.indexOf(')'))
    .replace(/_/g, ' ')
}
const getCSSProperty = (className: string): string => {
  return className.substring(0, className.indexOf('('))
}
const formatCSSRule = (
  cssClass: string,
  property: string,
  value: string
): string => {
  return `.${cssClass}{\n\t${property}: ${value}\n}\n`
}

const checkCorrectFormat = (className: string): boolean => {
  // const hasOneOpenBracket: boolean = (className.match(/\(/g) || []).length === 1
  // const classNameRestAfterFirstBracket: string = hasOneOpenBracket ? className.substring(className.indexOf('(') + 1) : ""
  // const hasOneClosedBracket: boolean = (classNameRestAfterFirstBracket.match(/\)/g) || []).length === 1
  // const hasCSSProperty: boolean = getCSSProperty(className) !== ""
  // const hasCSSValue: boolean = getCSSValue(className) !== ""
  // return hasOneOpenBracket && hasOneClosedBracket && hasCSSProperty && hasCSSValue
  return /(\S+)\((\S+)\)/gi.test(className)
}

export { getEscapedCSSClass, getCSSValue, getCSSProperty, formatCSSRule, checkCorrectFormat }
