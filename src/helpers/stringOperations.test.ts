import { getEscapedCSSClass, getCSSValue, checkCorrectFormat, getCSSProperty, formatCSSRule } from './stringOperations'

describe("Check if the format of the class is correct.", () => {
    it("has no CSS property", () => {
        expect(checkCorrectFormat('(100%)')).toEqual(false);
    });
    it("has no CSS value", () => {
        expect(checkCorrectFormat('width()')).toEqual(false);
    });
    it("has no opening bracket", () => {
        expect(checkCorrectFormat('width100%)')).toEqual(false);
    });
    it("has no closing bracket", () => {
        expect(checkCorrectFormat('width(100%')).toEqual(false);
    });
    it("has the correct format", () => {
        expect(checkCorrectFormat('width(100%)')).toEqual(true);
    });
    it("has the correct format with '-'", () => {
        expect(checkCorrectFormat('background-color(red)')).toEqual(true);
    });
    it("has the correct format with '_'", () => {
        expect(checkCorrectFormat('border(1px_solid_#ff00ff)')).toEqual(true);
    });
});

describe("Escape class string properly", () => {
    it("escapes '('", () => {
        expect(getEscapedCSSClass('(')).toEqual('\\(');
    });
    it("escapes '_'", () => {
        expect(getEscapedCSSClass('_')).toEqual('\\_');
    });
    it("escapes ')'", () => {
        expect(getEscapedCSSClass(')')).toEqual('\\)');
    });
    it("escapes '#'", () => {
        expect(getEscapedCSSClass('#')).toEqual('\\#');
    });
    it("escapes '%'", () => {
        expect(getEscapedCSSClass('%')).toEqual('\\%');
    });
    it("escapes 'width(1060px)'", () => {
        expect(getEscapedCSSClass('width(1060px)')).toEqual('width\\(1060px\\)');
    });
    it("escapes 'border(1px_solid_#ff00ff)'", () => {
        expect(getEscapedCSSClass('border(1px_solid_#ff00ff)')).toEqual('border\\(1px\\_solid\\_\\#ff00ff\\)');
    });
    it("escapes 'height(100%)'", () => {
        expect(getEscapedCSSClass('height(100%)')).toEqual('height\\(100\\%\\)');
    });
});

describe("Get the CSS value.", () => {
    it("gets the value of 'height(100%)'", () => {
        expect(getCSSValue('height(100%)')).toEqual('100%');
    });
    it("gets the value of 'border(1px_solid_#ff00ff)'", () => {
        expect(getCSSValue('border(1px_solid_#ff00ff)')).toEqual('1px solid #ff00ff');
    });
});

describe("Get the CSS property.", () => {
    it("gets the property of 'height(100%)'", () => {
        expect(getCSSProperty('height(100%)')).toEqual('height');
    });
    it("gets the property of 'background-color(green)'", () => {
        expect(getCSSProperty('background-color(green)')).toEqual('background-color');
    });
});

describe("Get the properly formatted CSS rule.", () => {
    it("gets the property of 'height\(100\%\)'", () => {
        expect(formatCSSRule('height\(100\%\)', 'height', '100%')).toEqual('.height\(100\%\){\n\theight: 100%\n}\n');
    });
});
