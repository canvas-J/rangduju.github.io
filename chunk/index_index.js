(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"273":function(e,t,n){e.exports=n.p+"static/images/rangduju-bg.jpg"},"274":function(e,t,n){e.exports=n.p+"static/images/qr2.jpg"},"275":function(e,t,n){},"77":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{"value":!0}),t.default=void 0;var o=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),a=function get(e,t,n){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,t);if(void 0===o){var a=Object.getPrototypeOf(e);return null===a?void 0:get(a,t,n)}if("value"in o)return o.value;var r=o.get;return void 0!==r?r.call(n):void 0},r=_interopRequireDefault(n(1)),l=_interopRequireDefault(n(4)),i=n(86),u=_interopRequireDefault(n(273)),c=_interopRequireDefault(n(274));function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}n(275);var p=function(e){function Index(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Index);var e=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(Index.__proto__||Object.getPrototypeOf(Index)).apply(this,arguments));return e.config={"navigationBarTitleText":"让渡居"},e.gotoPanel=function(e){var t=e.currentTarget.dataset.id;console.log(t),"Predict"==t?window.open("http://rangduju.mikecrm.com/SlDriig"):"HouseManagement"==t?window.open("https://mp.weixin.qq.com/s/nooOEuayOiJHdYGsxQU04Q"):l.default.navigateTo({"url":"/pages/"+t.toLowerCase()+"/index"})},e.state={"list":[{"id":"About","title":"关于我们","content":""},{"id":"Predict","title":"短租潜力预测","content":""},{"id":"HouseManagement","title":"房源委托管理","content":""},{"id":"Feedback","title":"用户评价","content":""}]},e}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Index,l.default.Component),o(Index,[{"key":"onShareAppMessage","value":function onShareAppMessage(){return{"title":"Rangduju","path":"/pages/index/index"}}},{"key":"render","value":function render(){var e=this,t=this.state.list;return r.default.createElement("div",null,r.default.createElement(i.View,{"className":"page page-index"},r.default.createElement(i.View,{"className":"logo"},r.default.createElement(i.Image,{"src":u.default,"className":"img","mode":"aspectFill"})),r.default.createElement(i.View,{"className":"page-title"},"让渡居"),r.default.createElement(i.View,{"className":"module-list"},t.map(function(t,n){return r.default.createElement(i.View,{"className":"module-list__item","key":n,"data-id":t.id,"data-name":t.title,"data-list":t.subpages,"onClick":e.gotoPanel},r.default.createElement(i.View,{"className":"module-list__item-title"},t.title),r.default.createElement(i.View,{"className":"module-list__item-content"},t.content))}))),r.default.createElement("footer",null,r.default.createElement(i.View,{"className":"at-row"},r.default.createElement(i.View,{"className":"at-col"},"微信公众号",r.default.createElement("br",null),r.default.createElement("br",null),r.default.createElement(i.Image,{"src":c.default,"className":"qr","mode":"aspectFit"})),r.default.createElement(i.View,{"className":"at-col"},"联系我们",r.default.createElement("br",null),r.default.createElement("br",null),"北京市朝阳区建国路88号, ",r.default.createElement("br",null),"SOHO现代城B座, 100025",r.default.createElement("br",null),"13488895246,",r.default.createElement("br",null),"pr@rangduju.com",r.default.createElement("br",null)),r.default.createElement(i.View,{"className":"at-col"},"加入我们",r.default.createElement("br",null),r.default.createElement("br",null),r.default.createElement("a",{"href":"https://hr.lagou.com/company/gongsi/580231.html"},"拉勾"),r.default.createElement("br",null),r.default.createElement("a",{"href":"https://www.zhipin.com/gongsi/7129188de810def203N_3d65EQ~~.html?ka=search_list_company_1_custompage"},"BOSS直聘")))))}},{"key":"componentDidMount","value":function componentDidMount(){a(Index.prototype.__proto__||Object.getPrototypeOf(Index.prototype),"componentDidMount",this)&&a(Index.prototype.__proto__||Object.getPrototypeOf(Index.prototype),"componentDidMount",this).call(this)}},{"key":"componentDidShow","value":function componentDidShow(){a(Index.prototype.__proto__||Object.getPrototypeOf(Index.prototype),"componentDidShow",this)&&a(Index.prototype.__proto__||Object.getPrototypeOf(Index.prototype),"componentDidShow",this).call(this)}},{"key":"componentDidHide","value":function componentDidHide(){a(Index.prototype.__proto__||Object.getPrototypeOf(Index.prototype),"componentDidHide",this)&&a(Index.prototype.__proto__||Object.getPrototypeOf(Index.prototype),"componentDidHide",this).call(this)}}]),Index}();t.default=p}}]);