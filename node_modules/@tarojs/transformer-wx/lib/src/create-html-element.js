"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adapter_1 = require("./adapter");
const constant_1 = require("./constant");
const options_1 = require("./options");
const lodash_1 = require("lodash");
const env_1 = require("./env");
const voidHtmlTags = new Set([
    // 'image',
    'img',
    'input',
    'import'
]);
if (env_1.isTestEnv) {
    voidHtmlTags.add('image');
}
function stringifyAttributes(input) {
    const attributes = [];
    for (const key of Object.keys(input)) {
        let value = input[key];
        if (value === false) {
            continue;
        }
        if (Array.isArray(value)) {
            value = value.join(' ');
        }
        let attribute = key;
        if (value !== true) {
            attribute += `="${String(value)}"`;
        }
        attributes.push(attribute);
    }
    return attributes.length > 0 ? ' ' + attributes.join(' ') : '';
}
exports.createHTMLElement = (options, isFirstEmit = false) => {
    options = Object.assign({
        name: 'div',
        attributes: {},
        value: ''
    }, options);
    if ("quickapp" /* quickapp */ === adapter_1.Adapter.type) {
        const name = options.name;
        const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
        if (constant_1.quickappComponentName.has(nameCapitalized)) {
            options.name = `taro-${name}`;
        }
        if (isFirstEmit && name === 'div' && options_1.transformOptions.isRoot) {
            options.name = 'taro-page';
            for (const key in options.attributes) {
                if (options.attributes.hasOwnProperty(key)) {
                    const attr = options.attributes[key];
                    options.attributes[lodash_1.camelCase(key)] = attr;
                    delete options.attributes[key];
                }
            }
        }
    }
    const isVoidTag = voidHtmlTags.has(options.name);
    let ret = `<${options.name}${stringifyAttributes(options.attributes)}${isVoidTag ? `/` : ''}>`;
    if (!isVoidTag) {
        ret += `${options.value}</${options.name}>`;
    }
    return ret;
};
//# sourceMappingURL=create-html-element.js.map