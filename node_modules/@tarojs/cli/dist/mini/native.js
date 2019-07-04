"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path = require("path");
const chalk_1 = require("chalk");
const constants_1 = require("../util/constants");
const util_1 = require("../util");
const component_1 = require("./component");
const compileScript_1 = require("./compileScript");
const compileStyle_1 = require("./compileStyle");
const helper_1 = require("./helper");
function processNativeWxml(componentWXMLPath, componentWXMLContent, outputComponentWXMLPath) {
    let wxmlContent;
    let needCopy = true;
    const { sourceDir, outputDir } = helper_1.getBuildData();
    if (componentWXMLPath && fs.existsSync(componentWXMLPath)) {
        wxmlContent = fs.readFileSync(componentWXMLPath).toString();
    }
    else {
        needCopy = false;
        wxmlContent = componentWXMLContent;
    }
    const importWxmlPathList = [];
    let regResult;
    while ((regResult = constants_1.REG_WXML_IMPORT.exec(wxmlContent)) != null) {
        importWxmlPathList.push(regResult[2] || regResult[3]);
    }
    if (importWxmlPathList.length) {
        importWxmlPathList.forEach(item => {
            const itemPath = path.resolve(componentWXMLPath, '..', item);
            if (fs.existsSync(itemPath)) {
                const outputItemPath = itemPath.replace(sourceDir, outputDir);
                processNativeWxml(itemPath, null, outputItemPath);
            }
        });
    }
    if (componentWXMLPath === outputComponentWXMLPath || !needCopy) {
        return;
    }
    util_1.copyFileSync(componentWXMLPath, outputComponentWXMLPath);
}
exports.processNativeWxml = processNativeWxml;
function transfromNativeComponents(configFile, componentConfig) {
    const { sourceDir, outputDir, outputFilesTypes } = helper_1.getBuildData();
    const usingComponents = componentConfig.usingComponents;
    if (usingComponents && !util_1.isEmptyObject(usingComponents)) {
        Object.keys(usingComponents).map((item) => __awaiter(this, void 0, void 0, function* () {
            const componentPath = usingComponents[item];
            if (/^plugin:\/\//.test(componentPath)) {
                // 小程序 plugin
                util_1.printLog("reference" /* REFERENCE */, '插件引用', `使用了插件 ${chalk_1.default.bold(componentPath)}`);
                return;
            }
            let componentJSPath = util_1.resolveScriptPath(path.resolve(path.dirname(configFile), componentPath));
            if (!fs.existsSync(componentJSPath)) {
                componentJSPath = util_1.resolveScriptPath(path.join(sourceDir, componentPath));
            }
            const componentJSONPath = componentJSPath.replace(path.extname(componentJSPath), outputFilesTypes.CONFIG);
            const componentWXMLPath = componentJSPath.replace(path.extname(componentJSPath), outputFilesTypes.TEMPL);
            const componentWXSSPath = componentJSPath.replace(path.extname(componentJSPath), outputFilesTypes.STYLE);
            const outputComponentJSPath = componentJSPath.replace(sourceDir, outputDir).replace(path.extname(componentJSPath), outputFilesTypes.SCRIPT);
            if (fs.existsSync(componentJSPath)) {
                const componentJSContent = fs.readFileSync(componentJSPath).toString();
                if (componentJSContent.indexOf(constants_1.taroJsFramework) >= 0 && !fs.existsSync(componentWXMLPath)) {
                    const buildDepComponentsRes = yield component_1.buildDepComponents([{ path: componentJSPath, name: item, type: 'default' }]);
                    return buildDepComponentsRes;
                }
                yield compileScript_1.compileDepScripts([componentJSPath], true);
            }
            else {
                return util_1.printLog("error" /* ERROR */, '编译错误', `原生组件文件 ${componentJSPath} 不存在！`);
            }
            if (fs.existsSync(componentWXMLPath)) {
                const outputComponentWXMLPath = outputComponentJSPath.replace(path.extname(outputComponentJSPath), outputFilesTypes.TEMPL);
                processNativeWxml(componentWXMLPath, null, outputComponentWXMLPath);
            }
            if (fs.existsSync(componentWXSSPath)) {
                const outputComponentWXSSPath = outputComponentJSPath.replace(path.extname(outputComponentJSPath), outputFilesTypes.STYLE);
                yield compileStyle_1.compileDepStyles(outputComponentWXSSPath, [componentWXSSPath]);
            }
            if (fs.existsSync(componentJSONPath)) {
                const componentJSON = require(componentJSONPath);
                const outputComponentJSONPath = outputComponentJSPath.replace(path.extname(outputComponentJSPath), outputFilesTypes.CONFIG);
                util_1.copyFileSync(componentJSONPath, outputComponentJSONPath);
                // 解决组件循环依赖不断编译爆栈的问题
                if (componentJSON && componentJSON.usingComponents) {
                    Object.keys(componentJSON.usingComponents).forEach(key => {
                        if (key === item) {
                            delete componentJSON.usingComponents[key];
                        }
                    });
                }
                transfromNativeComponents(componentJSONPath, componentJSON);
            }
        }));
    }
}
exports.transfromNativeComponents = transfromNativeComponents;
