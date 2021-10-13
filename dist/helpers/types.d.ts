interface Options {
    outFile: string;
    include: string;
    exclude: string;
}
interface CSSRuleElement {
    className: string;
    property: string;
    value: string;
}
interface YooCSSClass {
    outFile: string;
    include: string;
    exclude: string;
    parseFromFiles: () => void;
}
export { Options, CSSRuleElement, YooCSSClass };
