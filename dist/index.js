import fg from 'fast-glob';
import NodeHTMLParser from 'node-html-parser';
import { readFileSync, writeStream } from './helpers/fsOperations.js';
import { formatCSSRule, getCSSProperty, getCSSValue, getEscapedCSSClass, checkCorrectFormat } from './helpers/stringOperations.js';
// @ts-expect-error
const { parse } = NodeHTMLParser;
export default class YooCSS {
    constructor(options) {
        this.outFile = options.outFile;
        this.include = options.include;
        this.exclude = options.exclude;
    }
    parseFromFiles() {
        const excludedGlob = this.exclude === '' ? ['node_modules'] : ['node_modules', this.exclude];
        const files = fg.sync(this.include, {
            onlyFiles: true,
            ignore: excludedGlob
        });
        const rawClasses = files.map(this.getRawClass, this).flat();
        const uniqueRawClasses = this.createUniqueArray(rawClasses);
        const cssRuleElements = uniqueRawClasses.filter((uniqueClass) => {
            return checkCorrectFormat(uniqueClass);
        }).map(this.getCSSRuleElement);
        const stream = writeStream(this.outFile, 'w');
        cssRuleElements.forEach(uniqueClass => {
            this.writeCSSRuleElementToStream(uniqueClass, stream);
        });
        stream.end();
    }
    createUniqueArray(classes) {
        const uniqueRawClasses = new Set(classes);
        return [...uniqueRawClasses];
    }
    getRawClass(item) {
        const data = readFileSync(item);
        const root = parse(data);
        const allClasses = this.getIndividualClassNames(root);
        return allClasses;
    }
    getIndividualClassNames(elem) {
        return Array.from(elem.querySelectorAll('[class]'))
            .flatMap(e => e.classNames.toString().split(/\s+/))
            .flat();
    }
    getCSSRuleElement(rawClass) {
        const cssRuleElement = {
            className: getEscapedCSSClass(rawClass),
            property: getCSSProperty(rawClass),
            value: getCSSValue(rawClass)
        };
        return cssRuleElement;
    }
    writeCSSRuleElementToStream(formatedClass, stream) {
        stream.write(formatCSSRule(formatedClass.className, formatedClass.property, formatedClass.value));
    }
}
//# sourceMappingURL=index.js.map