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
const chokidar = require("chokidar");
const chalk_1 = require("chalk");
const wxTransformer = require("@tarojs/transformer-wx");
const t = require("babel-types");
const babel_generator_1 = require("babel-generator");
const babel_traverse_1 = require("babel-traverse");
const _ = require("lodash");
const h5_1 = require("./h5");
const npmProcess = require("./util/npm");
const config_1 = require("./config");
const util_1 = require("./util");
const constants_1 = require("./util/constants");
const astProcess_1 = require("./mini/astProcess");
const compileStyle_1 = require("./mini/compileStyle");
const helper_1 = require("./mini/helper");
const weappOutputName = 'weapp';
const h5OutputName = 'h5';
const tempDir = '.temp';
let buildData;
function setBuildData(appPath) {
    const configDir = path.join(appPath, constants_1.PROJECT_CONFIG);
    const projectConfig = require(configDir)(_.merge);
    const sourceDirName = projectConfig.sourceRoot || config_1.default.SOURCE_DIR;
    const outputDirName = projectConfig.outputRoot || config_1.default.OUTPUT_DIR;
    const sourceDir = path.join(appPath, sourceDirName);
    const entryFilePath = util_1.resolveScriptPath(path.join(sourceDir, 'index'));
    const entryFileName = path.basename(entryFilePath);
    const tempPath = path.join(appPath, tempDir);
    buildData = {
        appPath,
        projectConfig,
        sourceDirName,
        outputDirName,
        sourceDir,
        entryFilePath,
        entryFileName,
        tempPath
    };
}
function buildH5Script() {
    return __awaiter(this, void 0, void 0, function* () {
        const { appPath, projectConfig, entryFileName, sourceDirName, tempPath } = buildData;
        let { outputDirName } = buildData;
        const h5Config = Object.assign({}, projectConfig.h5);
        const entryFile = path.basename(entryFileName, path.extname(entryFileName)) + '.js';
        outputDirName = `${outputDirName}/${h5OutputName}`;
        h5Config.env = projectConfig.env;
        h5Config.defineConstants = projectConfig.defineConstants;
        h5Config.plugins = projectConfig.plugins;
        h5Config.designWidth = projectConfig.designWidth;
        if (projectConfig.deviceRatio) {
            h5Config.deviceRatio = projectConfig.deviceRatio;
        }
        h5Config.sourceRoot = sourceDirName;
        h5Config.outputRoot = outputDirName;
        h5Config.entry = Object.assign({
            app: [path.join(tempPath, entryFile)]
        }, h5Config.entry);
        h5Config.isWatch = false;
        const webpackRunner = yield npmProcess.getNpmPkg('@tarojs/webpack-runner', appPath);
        webpackRunner(appPath, h5Config);
    });
}
function buildH5Lib() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { appPath, outputDirName, tempPath } = buildData;
            const outputDir = path.join(appPath, outputDirName, h5OutputName);
            const tempEntryFilePath = util_1.resolveScriptPath(path.join(tempPath, 'index'));
            const outputEntryFilePath = path.join(outputDir, path.basename(tempEntryFilePath));
            const code = fs.readFileSync(tempEntryFilePath).toString();
            const transformResult = wxTransformer({
                code,
                sourcePath: tempEntryFilePath,
                outputPath: outputEntryFilePath,
                isNormal: true,
                isTyped: constants_1.REG_TYPESCRIPT.test(tempEntryFilePath)
            });
            const { styleFiles, components, code: generateCode } = parseEntryAst(transformResult.ast, tempEntryFilePath);
            const relativePath = path.relative(appPath, tempEntryFilePath);
            util_1.printLog("copy" /* COPY */, '发现文件', relativePath);
            fs.ensureDirSync(path.dirname(outputEntryFilePath));
            fs.writeFileSync(outputEntryFilePath, generateCode);
            if (components.length) {
                components.forEach(item => {
                    copyFileToDist(item.path, tempPath, outputDir);
                });
                analyzeFiles(components.map(item => item.path), tempPath, outputDir);
            }
            if (styleFiles.length) {
                styleFiles.forEach(item => {
                    copyFileToDist(item, tempPath, path.join(appPath, outputDirName));
                });
                analyzeStyleFilesImport(styleFiles, tempPath, path.join(appPath, outputDirName));
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}
function copyFileToDist(filePath, sourceDir, outputDir) {
    if (!filePath && !path.isAbsolute(filePath)) {
        return;
    }
    const { appPath } = buildData;
    const dirname = path.dirname(filePath);
    const distDirname = dirname.replace(sourceDir, outputDir);
    const relativePath = path.relative(appPath, filePath);
    util_1.printLog("copy" /* COPY */, '发现文件', relativePath);
    fs.ensureDirSync(distDirname);
    fs.copyFileSync(filePath, path.format({
        dir: distDirname,
        base: path.basename(filePath)
    }));
}
function parseEntryAst(ast, relativeFile) {
    const styleFiles = [];
    const components = [];
    const importExportName = [];
    let exportDefaultName = null;
    babel_traverse_1.default(ast, {
        ExportNamedDeclaration(astPath) {
            const node = astPath.node;
            const specifiers = node.specifiers;
            const source = node.source;
            if (source && source.type === 'StringLiteral') {
                specifiers.forEach(specifier => {
                    const exported = specifier.exported;
                    components.push({
                        name: exported.name,
                        path: util_1.resolveScriptPath(path.resolve(path.dirname(relativeFile), source.value))
                    });
                });
            }
            else {
                specifiers.forEach(specifier => {
                    const exported = specifier.exported;
                    importExportName.push(exported.name);
                });
            }
        },
        ExportDefaultDeclaration(astPath) {
            const node = astPath.node;
            const declaration = node.declaration;
            if (t.isIdentifier(declaration)) {
                exportDefaultName = declaration.name;
            }
        },
        Program: {
            exit(astPath) {
                astPath.traverse({
                    ImportDeclaration(astPath) {
                        const node = astPath.node;
                        const specifiers = node.specifiers;
                        const source = node.source;
                        const value = source.value;
                        const valueExtname = path.extname(value);
                        if (constants_1.REG_STYLE.test(valueExtname)) {
                            const stylePath = path.resolve(path.dirname(relativeFile), value);
                            if (styleFiles.indexOf(stylePath) < 0) {
                                styleFiles.push(stylePath);
                            }
                            astPath.remove();
                        }
                        else {
                            if (importExportName.length) {
                                importExportName.forEach(nameItem => {
                                    specifiers.forEach(specifier => {
                                        const local = specifier.local;
                                        if (local.name === nameItem) {
                                            components.push({
                                                name: local.name,
                                                path: util_1.resolveScriptPath(path.resolve(path.dirname(relativeFile), source.value))
                                            });
                                        }
                                    });
                                });
                            }
                            if (exportDefaultName != null) {
                                specifiers.forEach(specifier => {
                                    const local = specifier.local;
                                    if (local.name === exportDefaultName) {
                                        components.push({
                                            name: local.name,
                                            path: util_1.resolveScriptPath(path.resolve(path.dirname(relativeFile), source.value))
                                        });
                                    }
                                });
                            }
                        }
                    }
                });
            }
        }
    });
    const code = babel_generator_1.default(ast).code;
    return {
        code,
        styleFiles,
        components
    };
}
function analyzeFiles(files, sourceDir, outputDir) {
    files.forEach(file => {
        if (fs.existsSync(file)) {
            const code = fs.readFileSync(file).toString();
            const transformResult = wxTransformer({
                code,
                sourcePath: file,
                outputPath: file,
                isNormal: true,
                isTyped: constants_1.REG_TYPESCRIPT.test(file)
            });
            const { styleFiles, scriptFiles, jsonFiles, mediaFiles } = astProcess_1.parseAst(constants_1.PARSE_AST_TYPE.NORMAL, transformResult.ast, [], file, file, true);
            const resFiles = styleFiles.concat(scriptFiles, jsonFiles, mediaFiles);
            if (resFiles.length) {
                resFiles.forEach(item => {
                    copyFileToDist(item, sourceDir, outputDir);
                });
            }
            if (scriptFiles.length) {
                analyzeFiles(scriptFiles, sourceDir, outputDir);
            }
            if (styleFiles.length) {
                analyzeStyleFilesImport(styleFiles, sourceDir, outputDir);
            }
        }
    });
}
function analyzeStyleFilesImport(styleFiles, sourceDir, outputDir) {
    styleFiles.forEach(item => {
        if (!fs.existsSync(item)) {
            return;
        }
        let content = fs.readFileSync(item).toString();
        content = content.replace(/(?:@import\s+)?\burl\s*\(\s*("(?:[^\\"\r\n\f]|\\[\s\S])*"|'(?:[^\\'\n\r\f]|\\[\s\S])*'|[^)}\s]+)\s*\)(\s*;?)/g, (m, $1) => {
            if ($1) {
                let filePath = $1.replace(/'?"?/g, '');
                if (filePath.indexOf('.') === 0) {
                    filePath = path.resolve(path.dirname(item), filePath);
                    copyFileToDist(filePath, sourceDir, outputDir);
                }
            }
            return m;
        });
        let imports = util_1.cssImports(content);
        if (imports.length > 0) {
            imports = imports.map(importItem => {
                const filePath = util_1.resolveStylePath(path.resolve(path.dirname(item), importItem));
                copyFileToDist(filePath, sourceDir, outputDir);
                return filePath;
            });
            analyzeStyleFilesImport(imports, sourceDir, outputDir);
        }
    });
}
function buildForWeapp() {
    return __awaiter(this, void 0, void 0, function* () {
        const { appPath, entryFilePath, outputDirName, entryFileName, sourceDir } = buildData;
        console.log();
        console.log(chalk_1.default.green('开始编译小程序端组件库！'));
        if (!fs.existsSync(entryFilePath)) {
            console.log(chalk_1.default.red('入口文件不存在，请检查！'));
            return;
        }
        try {
            const outputDir = path.join(appPath, outputDirName, weappOutputName);
            const outputEntryFilePath = path.join(outputDir, entryFileName);
            const code = fs.readFileSync(entryFilePath).toString();
            const transformResult = wxTransformer({
                code,
                sourcePath: entryFilePath,
                outputPath: outputEntryFilePath,
                isNormal: true,
                isTyped: constants_1.REG_TYPESCRIPT.test(entryFilePath)
            });
            const { styleFiles, components } = parseEntryAst(transformResult.ast, entryFilePath);
            if (styleFiles.length) {
                const outputStylePath = path.join(outputDir, 'css', 'index.css');
                yield compileStyle_1.compileDepStyles(outputStylePath, styleFiles);
            }
            const relativePath = path.relative(appPath, entryFilePath);
            util_1.printLog("copy" /* COPY */, '发现文件', relativePath);
            fs.ensureDirSync(path.dirname(outputEntryFilePath));
            fs.copyFileSync(entryFilePath, path.format({
                dir: path.dirname(outputEntryFilePath),
                base: path.basename(outputEntryFilePath)
            }));
            if (components.length) {
                components.forEach(item => {
                    copyFileToDist(item.path, sourceDir, outputDir);
                });
                analyzeFiles(components.map(item => item.path), sourceDir, outputDir);
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}
function buildForH5() {
    return __awaiter(this, void 0, void 0, function* () {
        const { appPath } = buildData;
        const compiler = new h5_1.Compiler(appPath);
        console.log();
        console.log(chalk_1.default.green('开始编译 H5 端组件库！'));
        yield compiler.buildTemp();
        if (process.env.TARO_BUILD_TYPE === 'script') {
            yield buildH5Script();
        }
        else {
            yield buildH5Lib();
        }
    });
}
function buildEntry() {
    const { appPath, outputDirName } = buildData;
    const content = `if (process.env.TARO_ENV === '${"h5" /* H5 */}') {
    module.exports = require('./${h5OutputName}/index')
    module.exports.default = module.exports
  } else {
    module.exports = require('./${weappOutputName}/index')
    module.exports.default = module.exports
  }`;
    const outputDir = path.join(appPath, outputDirName);
    fs.writeFileSync(path.join(outputDir, 'index.js'), content);
}
function watchFiles() {
    const { sourceDir, projectConfig, appPath, outputDirName, tempPath } = buildData;
    console.log('\n', chalk_1.default.gray('监听文件修改中...'), '\n');
    const watchList = [sourceDir];
    const uiConfig = projectConfig.ui;
    let extraWatchFiles;
    if (uiConfig) {
        extraWatchFiles = uiConfig.extraWatchFiles;
        extraWatchFiles.forEach(item => {
            watchList.push(path.join(appPath, item.path));
            if (typeof item.handler === 'function')
                item.callback = item.handler({ buildH5Script });
        });
    }
    const watcher = chokidar.watch(watchList, {
        ignored: /(^|[/\\])\../,
        ignoreInitial: true
    });
    function syncWeappFile(filePath) {
        const outputDir = path.join(appPath, outputDirName, weappOutputName);
        copyFileToDist(filePath, sourceDir, outputDir);
        // 依赖分析
        const extname = path.extname(filePath);
        if (constants_1.REG_STYLE.test(extname)) {
            analyzeStyleFilesImport([filePath], sourceDir, outputDir);
        }
        else {
            analyzeFiles([filePath], sourceDir, outputDir);
        }
    }
    function syncH5File(filePath, compiler) {
        const { sourceDir, appPath, outputDirName, tempPath } = buildData;
        const outputDir = path.join(appPath, outputDirName, h5OutputName);
        const fileTempPath = filePath.replace(sourceDir, tempPath);
        compiler.processFiles(filePath);
        if (process.env.TARO_BUILD_TYPE === 'script') {
            buildH5Script();
        }
        else {
            copyFileToDist(fileTempPath, tempPath, outputDir);
            // 依赖分析
            const extname = path.extname(filePath);
            if (constants_1.REG_STYLE.test(extname)) {
                analyzeStyleFilesImport([fileTempPath], tempPath, outputDir);
            }
            else {
                analyzeFiles([fileTempPath], tempPath, outputDir);
            }
        }
    }
    function handleChange(filePath, type, tips) {
        const relativePath = path.relative(appPath, filePath);
        const compiler = new h5_1.Compiler(appPath);
        util_1.printLog(type, tips, relativePath);
        let processed = false;
        extraWatchFiles && extraWatchFiles.forEach(item => {
            if (filePath.indexOf(item.path.substr(2)) < 0)
                return;
            if (typeof item.callback === 'function') {
                item.callback();
                processed = true;
            }
        });
        if (processed)
            return;
        try {
            syncWeappFile(filePath);
            syncH5File(filePath, compiler);
        }
        catch (err) {
            console.log(err);
        }
    }
    watcher
        .on('add', filePath => handleChange(filePath, "create" /* CREATE */, '添加文件'))
        .on('change', filePath => handleChange(filePath, "modify" /* MODIFY */, '文件变动'))
        .on('unlink', filePath => {
        for (const path in extraWatchFiles) {
            if (filePath.indexOf(path.substr(2)) > -1)
                return;
        }
        const relativePath = path.relative(appPath, filePath);
        util_1.printLog("unlink" /* UNLINK */, '删除文件', relativePath);
        const weappOutputPath = path.join(appPath, outputDirName, weappOutputName);
        const h5OutputPath = path.join(appPath, outputDirName, h5OutputName);
        const fileTempPath = filePath.replace(sourceDir, tempPath);
        const fileWeappPath = filePath.replace(sourceDir, weappOutputPath);
        const fileH5Path = filePath.replace(sourceDir, h5OutputPath);
        fs.existsSync(fileTempPath) && fs.unlinkSync(fileTempPath);
        fs.existsSync(fileWeappPath) && fs.unlinkSync(fileWeappPath);
        fs.existsSync(fileH5Path) && fs.unlinkSync(fileH5Path);
    });
}
function build(appPath, { watch }) {
    return __awaiter(this, void 0, void 0, function* () {
        setBuildData(appPath);
        helper_1.setBuildData(appPath, "weapp" /* WEAPP */);
        buildEntry();
        yield buildForWeapp();
        yield buildForH5();
        if (watch) {
            watchFiles();
        }
    });
}
exports.build = build;
