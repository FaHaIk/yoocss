import { Options, YooCSSClass } from './helpers/types.js';
export default class YooCSS implements YooCSSClass {
    outFile: string;
    include: string;
    exclude: string;
    constructor(options: Options);
    parseFromFiles(): void;
    private createUniqueArray;
    private getRawClass;
    private getIndividualClassNames;
    private getCSSRuleElement;
    private writeCSSRuleElementToStream;
}
