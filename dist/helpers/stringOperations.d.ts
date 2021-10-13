declare const getEscapedCSSClass: (className: string) => string;
declare const getCSSValue: (className: string) => string;
declare const getCSSProperty: (className: string) => string;
declare const formatCSSRule: (cssClass: string, property: string, value: string) => string;
declare const checkCorrectFormat: (className: string) => boolean;
export { getEscapedCSSClass, getCSSValue, getCSSProperty, formatCSSRule, checkCorrectFormat };
