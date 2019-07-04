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
const autoprefixer = require("autoprefixer");
const postcss = require("postcss");
const pxtransform = require("postcss-pxtransform");
const browser_list_1 = require("../config/browser_list");
const resolve_npm_files_1 = require("../util/resolve_npm_files");
const npm_1 = require("../util/npm");
const util_1 = require("../util");
const constants_1 = require("../util/constants");
const helper_1 = require("./helper");
const cssUrlParse = require('postcss-url');
const genericNames = require('generic-names');
const Scope = require('postcss-modules-scope');
const Values = require('postcss-modules-values');
const LocalByDefault = require('postcss-modules-local-by-default');
const ExtractImports = require('postcss-modules-extract-imports');
const ResolveImports = require('postcss-modules-resolve-imports');
const isBuildingStyles = new Map();
function initCompileStyles() {
    isBuildingStyles.clear();
}
exports.initCompileStyles = initCompileStyles;
/**
 * css module processor
 * @param styleObj { css: string, filePath: '' }
 * @returns postcss.process()
 */
function processStyleUseCssModule(styleObj) {
    const { projectConfig, appPath } = helper_1.getBuildData();
    const weappConf = Object.assign({}, projectConfig.weapp);
    const useModuleConf = weappConf.module || {};
    const customPostcssConf = useModuleConf.postcss || {};
    const customCssModulesConf = Object.assign({
        enable: false,
        config: {
            generateScopedName: '[name]__[local]___[hash:base64:5]',
            namingPattern: 'global'
        }
    }, customPostcssConf.cssModules || {});
    if (!customCssModulesConf.enable) {
        return styleObj;
    }
    const namingPattern = customCssModulesConf.config.namingPattern;
    if (namingPattern === 'module') {
        // 只对 xxx.module.[css|scss|less|styl] 等样式文件做处理
        const DO_USE_CSS_MODULE_REGEX = /^(.*\.module).*\.(css|scss|less|styl)$/;
        if (!DO_USE_CSS_MODULE_REGEX.test(styleObj.filePath))
            return styleObj;
    }
    else {
        // 对 xxx.global.[css|scss|less|styl] 等样式文件不做处理
        const DO_NOT_USE_CSS_MODULE_REGEX = /^(.*\.global).*\.(css|scss|less|styl)$/;
        if (DO_NOT_USE_CSS_MODULE_REGEX.test(styleObj.filePath))
            return styleObj;
    }
    const generateScopedName = customCssModulesConf.config.generateScopedName;
    const context = appPath;
    let scopedName;
    if (generateScopedName) {
        scopedName = typeof generateScopedName === 'function'
            ? (local, filename) => generateScopedName(local, filename)
            : genericNames(generateScopedName, { context });
    }
    else {
        scopedName = (local, filename) => Scope.generateScopedName(local, path.relative(context, filename));
    }
    const postcssPlugins = [
        Values,
        LocalByDefault,
        ExtractImports,
        new Scope({ generateScopedName: scopedName }),
        new ResolveImports({ resolve: Object.assign({}, { extensions: constants_1.CSS_EXT }) })
    ];
    const runner = postcss(postcssPlugins);
    const result = runner.process(styleObj.css, Object.assign({}, { from: styleObj.filePath }));
    return result;
}
exports.processStyleUseCssModule = processStyleUseCssModule;
function processStyleWithPostCSS(styleObj) {
    return __awaiter(this, void 0, void 0, function* () {
        const { appPath, projectConfig, npmConfig, isProduction, buildAdapter } = helper_1.getBuildData();
        const weappConf = Object.assign({}, projectConfig.weapp);
        const useModuleConf = weappConf.module || {};
        const customPostcssConf = useModuleConf.postcss || {};
        const customCssModulesConf = Object.assign({
            enable: false,
            config: {
                generateScopedName: '[name]__[local]___[hash:base64:5]'
            }
        }, customPostcssConf.cssModules || {});
        const customPxtransformConf = Object.assign({
            enable: true,
            config: {}
        }, customPostcssConf.pxtransform || {});
        const customUrlConf = Object.assign({
            enable: true,
            config: {
                limit: 10240
            }
        }, customPostcssConf.url || {});
        const customAutoprefixerConf = Object.assign({
            enable: true,
            config: {
                browsers: browser_list_1.default
            }
        }, customPostcssConf.autoprefixer || {});
        const postcssPxtransformOption = {
            designWidth: projectConfig.designWidth || 750,
            platform: 'weapp'
        };
        if (projectConfig.hasOwnProperty(constants_1.DEVICE_RATIO_NAME)) {
            postcssPxtransformOption[constants_1.DEVICE_RATIO_NAME] = projectConfig.deviceRatio;
        }
        const cssUrlConf = Object.assign({ limit: 10240 }, customUrlConf);
        const maxSize = Math.round((customUrlConf.config.limit || cssUrlConf.limit) / 1024);
        const postcssPxtransformConf = Object.assign({}, postcssPxtransformOption, customPxtransformConf, customPxtransformConf.config);
        const processors = [];
        if (customAutoprefixerConf.enable) {
            processors.push(autoprefixer(customAutoprefixerConf.config));
        }
        if (customPxtransformConf.enable && buildAdapter !== "quickapp" /* QUICKAPP */) {
            processors.push(pxtransform(postcssPxtransformConf));
        }
        if (cssUrlConf.enable) {
            const cssUrlParseConf = {
                url: 'inline',
                maxSize,
                encodeType: 'base64'
            };
            processors.push(cssUrlParse(cssUrlConf.config.basePath ? Object.assign(cssUrlParseConf, {
                basePath: cssUrlConf.config.basePath
            }) : cssUrlParseConf));
        }
        const defaultPostCSSPluginNames = ['autoprefixer', 'pxtransform', 'url', 'cssModules'];
        Object.keys(customPostcssConf).forEach(pluginName => {
            if (defaultPostCSSPluginNames.indexOf(pluginName) < 0) {
                const pluginConf = customPostcssConf[pluginName];
                if (pluginConf && pluginConf.enable) {
                    if (!util_1.isNpmPkg(pluginName)) { // local plugin
                        pluginName = path.join(appPath, pluginName);
                    }
                    processors.push(require(resolve_npm_files_1.resolveNpmPkgMainPath(pluginName, isProduction, npmConfig, buildAdapter, appPath))(pluginConf.config || {}));
                }
            }
        });
        let css = styleObj.css;
        if (customCssModulesConf.enable) {
            css = processStyleUseCssModule(styleObj).css;
        }
        const postcssResult = yield postcss(processors).process(css, {
            from: styleObj.filePath
        });
        return postcssResult.css;
    });
}
function compileImportStyles(filePath, importStyles) {
    const { sourceDir, outputDir } = helper_1.getBuildData();
    if (importStyles.length) {
        importStyles.forEach((importItem) => __awaiter(this, void 0, void 0, function* () {
            const importFilePath = path.resolve(filePath, '..', importItem);
            if (fs.existsSync(importFilePath)) {
                yield compileDepStyles(importFilePath.replace(sourceDir, outputDir), [importFilePath]);
            }
        }));
    }
}
function compileDepStyles(outputFilePath, styleFiles) {
    if (isBuildingStyles.get(outputFilePath)) {
        return Promise.resolve({});
    }
    const { appPath, npmOutputDir, nodeModulesPath, projectConfig, npmConfig, isProduction, buildAdapter } = helper_1.getBuildData();
    const pluginsConfig = projectConfig.plugins || {};
    const weappConf = projectConfig.weapp || {};
    const useCompileConf = Object.assign({}, weappConf.compile);
    const compileInclude = useCompileConf.include || [];
    isBuildingStyles.set(outputFilePath, true);
    return Promise.all(styleFiles.map((p) => __awaiter(this, void 0, void 0, function* () {
        const filePath = path.join(p);
        const fileExt = path.extname(filePath);
        const pluginName = constants_1.FILE_PROCESSOR_MAP[fileExt];
        const fileContent = fs.readFileSync(filePath).toString();
        const cssImportsRes = util_1.processStyleImports(fileContent, buildAdapter, (str, stylePath) => {
            if (stylePath.indexOf('~') === 0) {
                let newStylePath = stylePath;
                newStylePath = stylePath.replace('~', '');
                const npmInfo = resolve_npm_files_1.resolveNpmFilesPath({
                    pkgName: newStylePath,
                    isProduction,
                    npmConfig,
                    buildAdapter,
                    root: appPath,
                    rootNpm: nodeModulesPath,
                    npmOutputDir,
                    compileInclude,
                    env: projectConfig.env || {},
                    uglify: projectConfig.plugins.uglify || { enable: true },
                    babelConfig: util_1.getBabelConfig(projectConfig.plugins.babel) || {}
                });
                const importRelativePath = util_1.promoteRelativePath(path.relative(filePath, npmInfo.main));
                return str.replace(stylePath, importRelativePath);
            }
            return str;
        });
        compileImportStyles(filePath, cssImportsRes.imports);
        if (pluginName) {
            return npm_1.callPlugin(pluginName, cssImportsRes.content, filePath, pluginsConfig[pluginName] || {}, appPath)
                .then(res => ({
                css: cssImportsRes.style.join('\n') + '\n' + res.css,
                filePath
            })).catch(err => {
                if (err) {
                    console.log(err);
                    if (isProduction) {
                        process.exit(0);
                    }
                }
            });
        }
        return new Promise(resolve => {
            resolve({
                css: cssImportsRes.style.join('\n') + '\n' + cssImportsRes.content,
                filePath
            });
        });
    }))).then((resList) => __awaiter(this, void 0, void 0, function* () {
        yield Promise.all(resList.map(res => processStyleWithPostCSS(res)))
            .then(cssList => {
            let resContent = cssList.map(res => res).join('\n');
            if (isProduction) {
                const cssoPuginConfig = pluginsConfig.csso || { enable: true };
                if (cssoPuginConfig.enable) {
                    const cssoConfig = cssoPuginConfig.config || {};
                    const cssoResult = npm_1.callPluginSync('csso', resContent, outputFilePath, cssoConfig, appPath);
                    resContent = cssoResult.css;
                }
            }
            fs.ensureDirSync(path.dirname(outputFilePath));
            fs.writeFileSync(outputFilePath, resContent);
        });
    }));
}
exports.compileDepStyles = compileDepStyles;
