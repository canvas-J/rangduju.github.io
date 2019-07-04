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
const ora = require("ora");
const child_process_1 = require("child_process");
const resolvePath = require("resolve");
const util_1 = require("../util");
const manifest_default_json_1 = require("../config/manifest.default.json");
const helper_1 = require("./helper");
const entry_1 = require("./entry");
const page_1 = require("./page");
const watch_1 = require("./watch");
const dowload_1 = require("../util/dowload");
function buildProjectConfig() {
    const { buildAdapter, sourceDir, outputDir, outputDirName, appPath } = helper_1.getBuildData();
    let projectConfigFileName = `project.${buildAdapter}.json`;
    if (buildAdapter === "weapp" /* WEAPP */ || buildAdapter === "qq" /* QQ */) {
        projectConfigFileName = 'project.config.json';
    }
    let projectConfigPath = path.join(appPath, projectConfigFileName);
    if (!fs.existsSync(projectConfigPath)) {
        projectConfigPath = path.join(sourceDir, projectConfigFileName);
        if (!fs.existsSync(projectConfigPath))
            return;
    }
    const origProjectConfig = fs.readJSONSync(projectConfigPath);
    if (buildAdapter === "tt" /* TT */) {
        projectConfigFileName = 'project.config.json';
    }
    fs.ensureDirSync(outputDir);
    fs.writeFileSync(path.join(outputDir, projectConfigFileName), JSON.stringify(Object.assign({}, origProjectConfig, { miniprogramRoot: './' }), null, 2));
    util_1.printLog("generate" /* GENERATE */, '工具配置', `${outputDirName}/${projectConfigFileName}`);
}
function buildFrameworkInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        // 百度小程序编译出 .frameworkinfo 文件
        const { buildAdapter, outputDir, outputDirName, nodeModulesPath, projectConfig } = helper_1.getBuildData();
        if (buildAdapter === "swan" /* SWAN */) {
            const frameworkInfoFileName = '.frameworkinfo';
            const frameworkName = `@tarojs/taro-${buildAdapter}`;
            const frameworkVersion = util_1.getInstalledNpmPkgVersion(frameworkName, nodeModulesPath);
            if (frameworkVersion) {
                const frameworkinfo = {
                    toolName: 'Taro',
                    toolCliVersion: util_1.getPkgVersion(),
                    toolFrameworkVersion: frameworkVersion,
                    createTime: projectConfig.date ? new Date(projectConfig.date).getTime() : Date.now()
                };
                fs.writeFileSync(path.join(outputDir, frameworkInfoFileName), JSON.stringify(frameworkinfo, null, 2));
                util_1.printLog("generate" /* GENERATE */, '框架信息', `${outputDirName}/${frameworkInfoFileName}`);
            }
            else {
                util_1.printLog("warning" /* WARNING */, '依赖安装', chalk_1.default.red(`项目依赖 ${frameworkName} 未安装，或安装有误！`));
            }
        }
    });
}
function generateQuickAppManifest() {
    const { appConfig, pageConfigs, appPath, outputDir, projectConfig } = helper_1.getBuildData();
    // 生成 router
    const pages = appConfig.pages.concat();
    const routerPages = {};
    pages.forEach(element => {
        routerPages[path.dirname(element)] = {
            component: path.basename(element),
            filter: {
                view: {
                    uri: 'https?://.*'
                }
            }
        };
    });
    const routerEntry = pages.shift();
    const router = {
        entry: path.dirname(routerEntry),
        pages: routerPages
    };
    // 生成 display
    const display = JSON.parse(JSON.stringify(appConfig.window || {}));
    display.pages = {};
    pageConfigs.forEach((item, page) => {
        if (item) {
            display.pages[path.dirname(page)] = item;
        }
    });
    // 读取 project.quickapp.json
    const quickappJSONPath = path.join(appPath, 'project.quickapp.json');
    let quickappJSON;
    if (fs.existsSync(quickappJSONPath)) {
        quickappJSON = fs.readJSONSync(quickappJSONPath);
    }
    else {
        quickappJSON = manifest_default_json_1.default;
    }
    quickappJSON.router = router;
    quickappJSON.display = display;
    quickappJSON.config = Object.assign({}, quickappJSON.config, {
        designWidth: projectConfig.designWidth || 750
    });
    fs.writeFileSync(path.join(outputDir, 'manifest.json'), JSON.stringify(quickappJSON, null, 2));
}
function prepareQuickAppEnvironment(buildData) {
    return __awaiter(this, void 0, void 0, function* () {
        let isReady = false;
        let needDownload = false;
        let needInstall = false;
        const originalOutputDir = buildData.originalOutputDir;
        console.log();
        if (fs.existsSync(path.join(buildData.originalOutputDir, 'sign'))) {
            needDownload = false;
        }
        else {
            needDownload = true;
        }
        if (needDownload) {
            const getSpinner = ora('开始下载快应用运行容器...').start();
            yield dowload_1.downloadGithubRepoLatestRelease('NervJS/quickapp-container', buildData.appPath, originalOutputDir);
            yield util_1.unzip(path.join(originalOutputDir, 'download_temp.zip'));
            getSpinner.succeed('快应用运行容器下载完成');
        }
        else {
            console.log(`${chalk_1.default.green('✔ ')} 快应用容器已经准备好`);
        }
        console.log();
        process.chdir(originalOutputDir);
        if (fs.existsSync(path.join(originalOutputDir, 'node_modules'))) {
            needInstall = false;
        }
        else {
            needInstall = true;
        }
        if (needInstall) {
            let command;
            if (util_1.shouldUseYarn()) {
                command = 'NODE_ENV=development yarn install';
            }
            else if (util_1.shouldUseCnpm()) {
                command = 'NODE_ENV=development cnpm install';
            }
            else {
                command = 'NODE_ENV=development npm install';
            }
            const installSpinner = ora(`安装快应用依赖环境, 需要一会儿...`).start();
            const install = child_process_1.exec(command);
            install.on('close', code => {
                if (code === 0) {
                    installSpinner.color = 'green';
                    installSpinner.succeed('安装成功');
                    console.log(`${install.stderr.read()}${install.stdout.read()}`);
                    isReady = true;
                }
                else {
                    installSpinner.color = 'red';
                    installSpinner.fail(chalk_1.default.red(`快应用依赖环境安装失败，请进入 ${path.basename(originalOutputDir)} 重新安装！`));
                    console.log(`${install.stderr.read()}${install.stdout.read()}`);
                    isReady = false;
                }
            });
        }
        else {
            console.log(`${chalk_1.default.green('✔ ')} 快应用依赖已经安装好`);
            isReady = true;
        }
        return isReady;
    });
}
function runQuickApp(isWatch, buildData, port, release) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalOutputDir = buildData.originalOutputDir;
        const hapToolkitPath = resolvePath.sync('hap-toolkit/package.json', { basedir: originalOutputDir });
        const hapToolkitLib = path.join(path.dirname(hapToolkitPath), 'lib');
        const compile = require(path.join(hapToolkitLib, 'commands/compile'));
        if (isWatch) {
            const launchServer = require(path.join(hapToolkitLib, 'server'));
            launchServer({
                port: port || 12306,
                watch: isWatch,
                clearRecords: false,
                disableADB: false
            });
            compile('native', 'dev', true);
        }
        else {
            if (!release) {
                compile('native', 'dev', false);
            }
            else {
                compile('native', 'prod', false);
            }
        }
    });
}
function build(appPath, { watch, adapter = "weapp" /* WEAPP */, envHasBeenSet = false, port, release }) {
    return __awaiter(this, void 0, void 0, function* () {
        const buildData = helper_1.setBuildData(appPath, adapter);
        const isQuickApp = adapter === "quickapp" /* QUICKAPP */;
        process.env.TARO_ENV = adapter;
        if (!envHasBeenSet) {
            helper_1.setIsProduction(process.env.NODE_ENV === 'production' || !watch);
        }
        fs.ensureDirSync(buildData.outputDir);
        if (!isQuickApp) {
            buildProjectConfig();
            yield buildFrameworkInfo();
        }
        util_1.copyFiles(appPath, buildData.projectConfig.copy);
        const appConfig = yield entry_1.buildEntry();
        helper_1.setAppConfig(appConfig);
        yield page_1.buildPages();
        if (watch) {
            watch_1.watchFiles();
        }
        if (isQuickApp) {
            generateQuickAppManifest();
            const isReady = yield prepareQuickAppEnvironment(buildData);
            if (!isReady) {
                console.log();
                console.log(chalk_1.default.red('快应用环境准备失败，请重试！'));
                process.exit(0);
                return;
            }
            yield runQuickApp(watch, buildData, port, release);
        }
    });
}
exports.build = build;
