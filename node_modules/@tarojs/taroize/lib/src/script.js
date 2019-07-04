"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const t = require("babel-types");
const babel_traverse_1 = require("babel-traverse");
const template = require("babel-template");
const utils_1 = require("./utils");
const lifecycle_1 = require("./lifecycle");
const global_1 = require("./global");
const defaultClassName = '_C';
const buildDecorator = (type, id) => id ? t.decorator(t.callExpression(t.identifier('withWeapp'), [t.stringLiteral(type), t.identifier(id)])) : t.decorator(t.callExpression(t.identifier('withWeapp'), [t.stringLiteral(type)]));
function parseScript(script, returned, json, wxses = [], refId) {
    script = script || 'Page({})';
    if (t.isJSXText(returned)) {
        const block = utils_1.buildBlockElement();
        block.children = [returned];
        returned = block;
    }
    let ast = utils_1.parseCode(script);
    let classDecl;
    let foundWXInstance = false;
    const vistor = {
        BlockStatement(path) {
            path.scope.rename('wx', 'Taro');
        },
        CallExpression(path) {
            const callee = path.get('callee');
            if (callee.isIdentifier()) {
                const name = callee.node.name;
                if (name === 'getApp' || name === 'getCurrentPages') {
                    callee.replaceWith(t.memberExpression(t.identifier('Taro'), callee.node));
                }
            }
            if (callee.isMemberExpression()) {
                const object = callee.get('object');
                if (object.isIdentifier({ name: 'wx' })) {
                    object.replaceWith(t.identifier('Taro'));
                }
            }
            if (callee.isIdentifier({ name: 'Page' }) ||
                callee.isIdentifier({ name: 'Component' }) ||
                callee.isIdentifier({ name: 'App' })) {
                foundWXInstance = true;
                const componentType = callee.node.name;
                classDecl = parsePage(path, returned || t.nullLiteral(), json, componentType, refId, wxses);
                if (componentType !== 'App' && classDecl.decorators.length === 0) {
                    classDecl.decorators = [buildDecorator(componentType)];
                }
                ast.program.body.push(classDecl, t.exportDefaultDeclaration(t.identifier(componentType !== 'App' ? defaultClassName : 'App')));
                // path.insertAfter(t.exportDefaultDeclaration(t.identifier(defaultClassName)))
                path.remove();
            }
        }
    };
    babel_traverse_1.default(ast, vistor);
    if (!foundWXInstance) {
        ast = utils_1.parseCode(script + ';Component({})');
        babel_traverse_1.default(ast, vistor);
    }
    const taroComponentsImport = utils_1.buildImportStatement('@tarojs/components', [
        ...global_1.usedComponents
    ]);
    const taroImport = utils_1.buildImportStatement('@tarojs/taro', [], 'Taro');
    const withWeappImport = utils_1.buildImportStatement('@tarojs/with-weapp', [], 'withWeapp');
    ast.program.body.unshift(taroComponentsImport, taroImport, withWeappImport, ...wxses.filter(wxs => !wxs.src.startsWith('./wxs__')).map(wxs => utils_1.buildImportStatement(wxs.src, [], wxs.module)));
    return ast;
}
exports.parseScript = parseScript;
const staticProps = ['externalClasses', 'relations', 'options'];
function parsePage(pagePath, returned, json, componentType, refId, wxses) {
    const stateKeys = [];
    let weappConf = null;
    let methods = [];
    pagePath.traverse({
        CallExpression(path) {
            const callee = path.get('callee');
            if (callee.isIdentifier()) {
                const name = callee.node.name;
                if (name === 'getApp' || name === 'getCurrentPages') {
                    callee.replaceWith(t.memberExpression(t.identifier('Taro'), callee.node));
                }
            }
            if (callee.isMemberExpression()) {
                const object = callee.get('object');
                const property = callee.get('property');
                if (object.isIdentifier()) {
                    const objectName = object.node.name;
                    if (objectName === 'wx') {
                        object.replaceWith(t.identifier('Taro'));
                    }
                }
                let isThis = property.isThisExpression();
                if (property.isIdentifier() && object.isIdentifier()) {
                    const propertyName = property.node.name;
                    const objectName = object.node.name;
                    if (lifecycle_1.PageLifecycle.has(propertyName) && utils_1.isAliasThis(property, objectName)) {
                        isThis = true;
                    }
                    if (isThis && lifecycle_1.PageLifecycle.has(propertyName)) {
                        property.replaceWith(t.identifier(lifecycle_1.PageLifecycle.get(propertyName)));
                    }
                }
            }
        },
        ObjectProperty(path) {
            const { key, value } = path.node;
            if (!t.isIdentifier(key, { name: 'methods' }) || path.parentPath !== pagePath.get('arguments')[0] || !t.isObjectExpression(value)) {
                return;
            }
            methods = path.get('value.properties');
            path.remove();
        }
    });
    if (refId) {
        refId.forEach(id => {
            if (!stateKeys.includes(id)) {
                stateKeys.push(id);
            }
        });
    }
    const propsKeys = [];
    const arg = pagePath.get('arguments')[0];
    let classBody = [];
    if (arg.isObjectExpression()) {
        const defaultProps = [];
        const props = arg.get('properties');
        const properties = props.filter(p => !p.isSpreadProperty()).concat(methods);
        classBody = properties.map(prop => {
            const key = prop.get('key');
            const value = prop.get('value');
            let params = prop.isObjectMethod()
                ? prop.node.params
                : value.isFunctionExpression() || value.isArrowFunctionExpression()
                    ? value.node.params
                    : [];
            const isAsync = prop.isObjectMethod()
                ? prop.node.async
                : value.isFunctionExpression() || value.isArrowFunctionExpression()
                    ? value.node.async
                    : false;
            if (!key.isIdentifier()) {
                throw utils_1.codeFrameError(key.node, 'Page 对象的键值只能是字符串');
            }
            const name = key.node.name;
            const currentStateKeys = [];
            if (name === 'data') {
                if (value.isObjectExpression()) {
                    value
                        .get('properties')
                        .map(p => p.node)
                        .forEach(prop => {
                        if (t.isObjectProperty(prop)) {
                            let propKey = '';
                            if (t.isStringLiteral(prop.key)) {
                                propKey = prop.key.value;
                            }
                            if (t.isIdentifier(prop.key)) {
                                propKey = prop.key.name;
                            }
                            if (!utils_1.isValidVarName(propKey)) {
                                throw utils_1.codeFrameError(prop, `${propKey} 不是一个合法的 JavaScript 变量名`);
                            }
                            if (propKey) {
                                currentStateKeys.push(propKey);
                            }
                        }
                    });
                }
                return t.classProperty(t.identifier('state'), value.node);
            }
            if (name === 'properties') {
                const observeProps = [];
                if (value.isObjectExpression()) {
                    value
                        .get('properties')
                        .map(p => p.node)
                        .forEach(prop => {
                        if (t.isObjectProperty(prop)) {
                            let propKey = null;
                            if (t.isStringLiteral(prop.key)) {
                                propKey = prop.key.value;
                            }
                            if (t.isIdentifier(prop.key)) {
                                propKey = prop.key.name;
                                // propsKeys.push(prop.key.name)
                            }
                            if (t.isObjectExpression(prop.value) && propKey) {
                                for (const p of prop.value.properties) {
                                    if (t.isObjectProperty(p)) {
                                        let key = null;
                                        if (t.isStringLiteral(p.key)) {
                                            key = p.key.value;
                                        }
                                        if (t.isIdentifier(p.key)) {
                                            key = p.key.name;
                                        }
                                        if (key === 'value') {
                                            defaultProps.push({
                                                name: propKey,
                                                value: p.value
                                            });
                                        }
                                        else if (key === 'observer') {
                                            observeProps.push({
                                                name: propKey,
                                                observer: p.value
                                            });
                                        }
                                        if (!utils_1.isValidVarName(propKey)) {
                                            throw utils_1.codeFrameError(prop, `${propKey} 不是一个合法的 JavaScript 变量名`);
                                        }
                                    }
                                    if (t.isObjectMethod(p) && t.isIdentifier(p.key, { name: 'observer' })) {
                                        observeProps.push({
                                            name: propKey,
                                            observer: t.arrowFunctionExpression(p.params, p.body, p.async)
                                        });
                                    }
                                }
                            }
                            if (propKey) {
                                propsKeys.push(propKey);
                            }
                        }
                    });
                }
                currentStateKeys.forEach(s => {
                    if (propsKeys.includes(s)) {
                        throw new Error(`当前 Component 定义了重复的 data 和 properites: ${s}`);
                    }
                });
                stateKeys.push(...currentStateKeys);
                return t.classProperty(t.identifier('_observeProps'), t.arrayExpression(observeProps.map(p => t.objectExpression([
                    t.objectProperty(t.identifier('name'), t.stringLiteral(p.name)),
                    t.objectProperty(t.identifier('observer'), p.observer)
                ]))));
            }
            if (lifecycle_1.PageLifecycle.has(name)) {
                const lifecycle = lifecycle_1.PageLifecycle.get(name);
                if (name === 'onLoad' && t.isIdentifier(params[0])) {
                    params = [t.assignmentPattern(params[0], t.logicalExpression('||', t.memberExpression(t.memberExpression(t.thisExpression(), t.identifier('$router')), t.identifier('params')), t.objectExpression([])))];
                }
                if (prop.isObjectMethod()) {
                    const body = prop.get('body');
                    return t.classMethod('method', t.identifier(lifecycle), params, body.node);
                }
                const node = value.node;
                const method = t.isFunctionExpression(node) || t.isArrowFunctionExpression(node)
                    ? t.classProperty(t.identifier(lifecycle), t.arrowFunctionExpression(params, node.body, isAsync))
                    : t.classProperty(t.identifier(lifecycle), node);
                return method;
            }
            let hasArguments = false;
            prop.traverse({
                Identifier(path) {
                    if (path.node.name === 'arguments') {
                        hasArguments = true;
                        path.stop();
                    }
                }
            });
            if (prop.isObjectMethod()) {
                const body = prop.get('body');
                if (hasArguments) {
                    return t.classMethod('method', t.identifier(name), params, body.node);
                }
                return t.classProperty(t.identifier(name), t.arrowFunctionExpression(params, body.node, isAsync));
            }
            if (hasArguments && (value.isFunctionExpression() || value.isArrowFunctionExpression())) {
                const method = t.classMethod('method', t.identifier(name), params, value.node.body);
                method.async = isAsync;
                return method;
            }
            const classProp = t.classProperty(t.identifier(name), value.isFunctionExpression() || value.isArrowFunctionExpression()
                ? t.arrowFunctionExpression(value.node.params, value.node.body, isAsync)
                : value.node);
            if (staticProps.includes(name)) {
                classProp.static = true;
            }
            return classProp;
        });
        if (global_1.globals.hasCatchTrue) {
            classBody.push(t.classMethod('method', t.identifier('privateStopNoop'), [t.identifier('e')], t.blockStatement([
                t.expressionStatement(t.callExpression(t.memberExpression(t.identifier('e'), t.identifier('stopPropagation')), []))
            ])));
        }
        if (defaultProps.length) {
            let classProp = t.classProperty(t.identifier('defaultProps'), t.objectExpression(defaultProps.map(p => t.objectProperty(t.identifier(p.name), p.value))));
            classProp.static = true;
            classBody.unshift(classProp);
        }
    }
    else if (arg.isIdentifier()) {
        weappConf = arg.node.name;
    }
    else {
        throw utils_1.codeFrameError(arg.node, `${componentType || '组件'} 的第一个参数必须是一个对象或变量才能转换。`);
    }
    if (json && t.isObjectExpression(json)) {
        classBody.push(t.classProperty(t.identifier('config'), json));
    }
    if (componentType === 'App') {
        let hasWillMount = false;
        const globalData = template(`this.$app.globalData = this.globalData`)();
        for (const method of classBody) {
            if (!method) {
                continue;
            }
            if (!t.isClassMethod(method)) {
                continue;
            }
            if (t.isIdentifier(method.key, { name: "componentWillMount" /* componentWillMount */ })) {
                hasWillMount = true;
                method.body.body.unshift(globalData);
            }
        }
        if (!hasWillMount) {
            classBody.push(t.classMethod('method', t.identifier("componentWillMount" /* componentWillMount */), [], t.blockStatement([globalData])));
        }
    }
    const wxsNames = new Set(wxses ? wxses.map(w => w.module) : []);
    const renderFunc = utils_1.buildRender(returned, stateKeys.filter(s => !wxsNames.has(s)), propsKeys);
    const classDecl = t.classDeclaration(t.identifier(componentType === 'App' ? 'App' : defaultClassName), t.memberExpression(t.identifier('Taro'), t.identifier('Component')), t.classBody(classBody.concat(renderFunc)), []);
    if (weappConf) {
        classDecl.decorators = [buildDecorator(componentType || 'Page', weappConf)];
    }
    return classDecl;
}
//# sourceMappingURL=script.js.map