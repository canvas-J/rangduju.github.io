"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eslint_1 = require("./eslint");
const functional_1 = require("./functional");
const env_1 = require("./env");
exports.transformOptions = {};
exports.setTransformOptions = (options) => {
    for (const key in options) {
        if (options.hasOwnProperty(key)) {
            exports.transformOptions[key] = options[key];
        }
    }
};
exports.buildBabelTransformOptions = () => {
    functional_1.Status.isSFC = false;
    return {
        parserOpts: {
            sourceType: 'module',
            plugins: [
                'classProperties',
                'jsx',
                'flow',
                'flowComment',
                'trailingFunctionCommas',
                'asyncFunctions',
                'exponentiationOperator',
                'asyncGenerators',
                'objectRestSpread',
                'decorators',
                'dynamicImport',
                'doExpressions',
                'exportExtensions'
            ]
        },
        plugins: [
            require('babel-plugin-transform-do-expressions'),
            require('babel-plugin-transform-export-extensions'),
            require('babel-plugin-transform-flow-strip-types'),
            functional_1.functionalComponent,
            [require('babel-plugin-transform-define').default, exports.transformOptions.env]
        ].concat(process.env.ESLINT === 'false' || exports.transformOptions.isNormal || exports.transformOptions.isTyped ? [] : eslint_1.eslintValidation)
            .concat((env_1.isTestEnv) ? [] : require('babel-plugin-remove-dead-code').default)
    };
};
//# sourceMappingURL=options.js.map