"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Lifecycle;
(function (Lifecycle) {
    Lifecycle["constructor"] = "constructor";
    Lifecycle["componentWillMount"] = "componentWillMount";
    Lifecycle["componentDidMount"] = "componentDidMount";
    Lifecycle["componentWillUpdate"] = "componentWillUpdate";
    Lifecycle["componentDidUpdate"] = "componentDidUpdate";
    Lifecycle["componentWillUnmount"] = "componentWillUnmount";
    Lifecycle["componentDidCatch"] = "componentDidCatch";
    Lifecycle["componentDidShow"] = "componentDidShow";
    Lifecycle["componentDidHide"] = "componentDidHide";
    Lifecycle["componentDidAttached"] = "componentDidAttached";
    Lifecycle["componentDidMoved"] = "componentDidMoved";
    Lifecycle["shouldComponentUpdate"] = "shouldComponentUpdate";
    Lifecycle["componentWillReceiveProps"] = "componentWillReceiveProps";
    Lifecycle["componentDidCatchError"] = "componentDidCatchError";
})(Lifecycle = exports.Lifecycle || (exports.Lifecycle = {}));
exports.PageLifecycle = new Map();
exports.PageLifecycle.set('onLoad', "componentWillMount" /* componentWillMount */);
exports.PageLifecycle.set('onShow', "componentDidShow" /* componentDidShow */);
exports.PageLifecycle.set('onReady', "componentDidMount" /* componentDidMount */);
exports.PageLifecycle.set('onHide', "componentDidHide" /* componentDidHide */);
exports.PageLifecycle.set('onUnload', "componentWillUnmount" /* componentWillUnmount */);
exports.PageLifecycle.set('onError', "componentDidCatchError" /* componentDidCatchError */);
exports.PageLifecycle.set('onLaunch', "componentWillMount" /* componentWillMount */);
//# sourceMappingURL=lifecycle.js.map