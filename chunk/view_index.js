(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"120":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{"value":!0}),t.default=void 0;var l=function(){function defineProperties(e,t){for(var a=0;a<t.length;a++){var l=t[a];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(e,t,a){return t&&defineProperties(e.prototype,t),a&&defineProperties(e,a),e}}(),i=_interopRequireDefault(a(1)),n=_interopRequireDefault(a(4)),r=_interopRequireDefault(a(88)),c=a(86);function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}a(121);var s=function(e){function DocsHeader(){return function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,DocsHeader),function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(DocsHeader.__proto__||Object.getPrototypeOf(DocsHeader)).apply(this,arguments))}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(DocsHeader,n.default.Component),l(DocsHeader,[{"key":"render","value":function render(){var e=this.props,t=e.title,a=e.desc;return i.default.createElement(c.View,{"className":"doc-header"},i.default.createElement(c.View,{"className":"doc-header__title"},t),i.default.createElement(c.View,{"className":"doc-header__desc"},a))}}]),DocsHeader}();t.default=s,s.defaultProps={"title":"标题","desc":""},s.propTypes={"title":r.default.string,"desc":r.default.string}},"121":function(e,t,a){},"390":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{"value":!0}),t.default=void 0;var l=function(){function defineProperties(e,t){for(var a=0;a<t.length;a++){var l=t[a];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(e,t,a){return t&&defineProperties(e.prototype,t),a&&defineProperties(e,a),e}}(),i=_interopRequireDefault(a(1)),n=_interopRequireDefault(a(4)),r=_interopRequireDefault(a(88)),c=a(86);function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}a(391);var s=function(e){function NavigatorBtn(){return function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,NavigatorBtn),function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(NavigatorBtn.__proto__||Object.getPrototypeOf(NavigatorBtn)).apply(this,arguments))}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(NavigatorBtn,n.default.Component),l(NavigatorBtn,[{"key":"handleGoto","value":function handleGoto(e,t){n.default.navigateTo({"url":"/pages/"+e.toLowerCase()+"/"+t.toLowerCase()+"/index"})}},{"key":"render","value":function render(){var e=this.props,t=e.parent,a=e.name;return i.default.createElement(c.View,{"className":"demo-goto-btn","onClick":this.handleGoto.bind(this,t,a)},"查看详情")}}]),NavigatorBtn}();t.default=s,s.defaultProps={"parent":"","name":""},s.propTypes={"parent":r.default.string,"name":r.default.string}},"391":function(e,t,a){},"393":function(e,t,a){},"395":function(e,t,a){e.exports=a.p+"static/images/curtain.png"},"78":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{"value":!0}),t.default=void 0;var l=function(){function defineProperties(e,t){for(var a=0;a<t.length;a++){var l=t[a];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(e,t,a){return t&&defineProperties(e.prototype,t),a&&defineProperties(e,a),e}}(),i=function get(e,t,a){null===e&&(e=Function.prototype);var l=Object.getOwnPropertyDescriptor(e,t);if(void 0===l){var i=Object.getPrototypeOf(e);return null===i?void 0:get(i,t,a)}if("value"in l)return l.value;var n=l.get;return void 0!==n?n.call(a):void 0},n=_interopRequireDefault(a(1)),r=_interopRequireDefault(a(4)),c=a(86),s=a(100),o=_interopRequireDefault(a(120)),m=_interopRequireDefault(a(390));a(393);var u=_interopRequireDefault(a(395));function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}var d=function(e){function ViewPage(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,ViewPage);var e=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(ViewPage.__proto__||Object.getPrototypeOf(ViewPage)).apply(this,arguments));return e.config={"navigationBarTitleText":"Taro UI"},e.state={"isCurtainOpened":!1,"loadMoreStatus":"more","stepsCurrent1":0,"stepsCurrent2":0,"stepsCurrent3":0,"stepsCurrent4":1,"imgUrls":["https://img10.360buyimg.com/babel/s700x360_jfs/t25855/203/725883724/96703/5a598a0f/5b7a22e1Nfd6ba344.jpg!q90!cc_350x180","https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180","https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180"],"hollowTagList":[{"name":"标签1","active":!1},{"name":"标签2","active":!1},{"name":"标签3","active":!0},{"name":"标签4","active":!0}],"solidTagList":[{"name":"标签1","active":!1},{"name":"标签2","active":!1},{"name":"标签3","active":!0},{"name":"标签4","active":!0}],"hollowTagList2":[{"name":"标签1","active":!1},{"name":"标签2","active":!1},{"name":"标签3","active":!0},{"name":"标签4","active":!0}],"solidTagList2":[{"name":"标签1","active":!1},{"name":"标签2","active":!1},{"name":"标签3","active":!0},{"name":"标签4","active":!0}]},e}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(ViewPage,r.default.Component),l(ViewPage,[{"key":"handleCurtainClick","value":function handleCurtainClick(e){this.setState({"isCurtainOpened":e})}},{"key":"handleLoadMoreClick","value":function handleLoadMoreClick(){var e=this;this.setState({"loadMoreStatus":"loading"}),setTimeout(function(){e.setState({"loadMoreStatus":"noMore"})},2e3)}},{"key":"handleStepsChange","value":function handleStepsChange(e,t){this.setState(function _defineProperty(e,t,a){return t in e?Object.defineProperty(e,t,{"value":a,"enumerable":!0,"configurable":!0,"writable":!0}):e[t]=a,e}({},e,t))}},{"key":"handleHollowClick","value":function handleHollowClick(e){var t=this.state.hollowTagList,a=t.findIndex(function(t){return t.name===e.name});t[a].active=!t[a].active,this.setState({"hollowTagList":t})}},{"key":"handleSolidClick","value":function handleSolidClick(e){var t=this.state.solidTagList,a=t.findIndex(function(t){return t.name===e.name});t[a].active=!t[a].active,this.setState({"solidTagList":t})}},{"key":"handleHollowSmallClick","value":function handleHollowSmallClick(e){var t=this.state.hollowTagList2,a=t.findIndex(function(t){return t.name===e.name});t[a].active=!t[a].active,this.setState({"hollowTagList2":t})}},{"key":"handleSolidSmallClick","value":function handleSolidSmallClick(e){var t=this.state.solidTagList2,a=t.findIndex(function(t){return t.name===e.name});t[a].active=!t[a].active,this.setState({"solidTagList2":t})}},{"key":"render","value":function render(){var e=this,t=this.state,a=t.isCurtainOpened,l=t.loadMoreStatus,i="http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg";return n.default.createElement(c.View,{"className":"page"},n.default.createElement(o.default,{"title":"视图","desc":"8 个组件"}),n.default.createElement(c.View,{"className":"doc-body"},n.default.createElement(c.View,{"className":"panel"},n.default.createElement(c.View,{"className":"panel__title"},"Article 文章"),n.default.createElement(c.View,{"className":"panel__content"},n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(m.default,{"parent":"view","name":"article"})))),n.default.createElement(c.View,{"className":"panel"},n.default.createElement(c.View,{"className":"panel__title"},"Avatar 头像"),n.default.createElement(c.View,{"className":"panel__content"},n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(c.View,{"className":"subitem"},n.default.createElement(s.AtAvatar,{"circle":!0,"size":"small","image":i})),n.default.createElement(c.View,{"className":"subitem"},n.default.createElement(s.AtAvatar,{"circle":!0,"image":i})),n.default.createElement(c.View,{"className":"subitem"},n.default.createElement(s.AtAvatar,{"circle":!0,"size":"large","image":i}))),n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(c.View,{"className":"subitem"},n.default.createElement(s.AtAvatar,{"size":"small","image":i})),n.default.createElement(c.View,{"className":"subitem"},n.default.createElement(s.AtAvatar,{"image":i})),n.default.createElement(c.View,{"className":"subitem"},n.default.createElement(s.AtAvatar,{"size":"large","image":i}))),n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(c.View,{"className":"subitem"},n.default.createElement(s.AtAvatar,{"circle":!0,"size":"small","text":"凹"})),n.default.createElement(c.View,{"className":"subitem"},n.default.createElement(s.AtAvatar,{"circle":!0,"text":"凹"})),n.default.createElement(c.View,{"className":"subitem"},n.default.createElement(s.AtAvatar,{"circle":!0,"size":"large","text":"凹"}))))),n.default.createElement(c.View,{"className":"panel"},n.default.createElement(c.View,{"className":"panel__title"},"Badge 徽标"),n.default.createElement(c.View,{"className":"panel__content"},n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(c.View,{"className":"subitem subitem--badge"},n.default.createElement(s.AtBadge,{"value":"10","maxValue":99},n.default.createElement(s.AtButton,{"size":"small","circle":!0},"按钮"))),n.default.createElement(c.View,{"className":"subitem subitem--badge"},n.default.createElement(s.AtBadge,{"value":"100","maxValue":99},n.default.createElement(s.AtButton,{"size":"small"},"按钮"))),n.default.createElement(c.View,{"className":"subitem subitem--badge"},n.default.createElement(s.AtBadge,{"dot":!0},n.default.createElement(s.AtButton,{"size":"small","circle":!0},"按钮"))),n.default.createElement(c.View,{"className":"subitem subitem--badge"},n.default.createElement(s.AtBadge,{"dot":!0},n.default.createElement(s.AtButton,{"size":"small"},"按钮")))),n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(c.View,{"className":"subitem subitem--badge"},n.default.createElement(s.AtBadge,{"value":"NEW"},n.default.createElement(s.AtButton,{"size":"small","circle":!0},"按钮"))),n.default.createElement(c.View,{"className":"subitem subitem--badge"},n.default.createElement(s.AtBadge,{"value":"NEW"},n.default.createElement(s.AtButton,{"size":"small"},"按钮"))),n.default.createElement(c.View,{"className":"subitem subitem--badge"},n.default.createElement(s.AtBadge,{"value":"···"},n.default.createElement(s.AtButton,{"size":"small","circle":!0},"按钮"))),n.default.createElement(c.View,{"className":"subitem subitem--badge"},n.default.createElement(s.AtBadge,{"value":"···"},n.default.createElement(s.AtButton,{"size":"small"},"按钮")))))),n.default.createElement(c.View,{"className":"panel"},n.default.createElement(c.View,{"className":"panel__title"},"Tag 标签"),n.default.createElement(c.View,{"className":"panel__content"},n.default.createElement(c.View,{"className":"example-item"},this.state.hollowTagList.map(function(t,a){return n.default.createElement(c.View,{"className":"subitem","key":a},n.default.createElement(s.AtTag,{"name":t.name,"active":t.active,"circle":a%2==0,"onClick":e.handleHollowClick.bind(e)},"标签"))})),n.default.createElement(c.View,{"className":"example-item"},this.state.solidTagList.map(function(t,a){return n.default.createElement(c.View,{"className":"subitem","key":a},n.default.createElement(s.AtTag,{"type":"primary","name":t.name,"active":t.active,"circle":a%2==0,"onClick":e.handleSolidClick.bind(e)},"标签"))})),n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(c.View,{"className":"subitem"},n.default.createElement(s.AtTag,{"type":"primary","circle":!0,"disabled":!0},"标签")),n.default.createElement(c.View,{"className":"subitem"},n.default.createElement(s.AtTag,{"type":"primary","disabled":!0},"标签"))),n.default.createElement(c.View,{"className":"example-item"},this.state.hollowTagList2.map(function(t,a){return n.default.createElement(c.View,{"className":"subitem","key":a},n.default.createElement(s.AtTag,{"size":"small","name":t.name,"active":t.active,"circle":a%2==0,"onClick":e.handleHollowSmallClick.bind(e)},"标签"))})),n.default.createElement(c.View,{"className":"example-item"},this.state.solidTagList2.map(function(t,a){return n.default.createElement(c.View,{"className":"subitem","key":a},n.default.createElement(s.AtTag,{"size":"small","type":"primary","name":t.name,"active":t.active,"circle":a%2==0,"onClick":e.handleSolidSmallClick.bind(e)},"标签"))})),n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(c.View,{"className":"subitem"},n.default.createElement(s.AtTag,{"size":"small","type":"primary","circle":!0,"disabled":!0},"标签")),n.default.createElement(c.View,{"className":"subitem"},n.default.createElement(s.AtTag,{"size":"small","type":"primary","disabled":!0},"标签"))))),n.default.createElement(c.View,{"className":"panel"},n.default.createElement(c.View,{"className":"panel__title"},"Countdown 倒计时"),n.default.createElement(c.View,{"className":"panel__content"},n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(s.AtCountdown,{"minutes":5,"seconds":10})),n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(s.AtCountdown,{"isShowDay":!0,"hours":1,"minutes":5,"seconds":10})),n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(s.AtCountdown,{"format":{"hours":":","minutes":":","seconds":""},"minutes":5,"seconds":10})),n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(s.AtCountdown,{"isCard":!0,"isShowDay":!0,"day":1,"minutes":5,"seconds":10,"format":{"day":"天","hours":":","minutes":":","seconds":""}})))),n.default.createElement(c.View,{"className":"panel"},n.default.createElement(c.View,{"className":"panel__title"},"Curtain 幕帘"),n.default.createElement(c.View,{"className":"panel__content"},n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(c.View,{"className":"demo-btn","onClick":this.handleCurtainClick.bind(this,!0)},"显示幕帘")))),n.default.createElement(c.View,{"className":"panel"},n.default.createElement(c.View,{"className":"panel__title"},"Noticebar 通告栏"),n.default.createElement(c.View,{"className":"panel__content"},n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(s.AtNoticebar,{"single":!0},"[单行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏")),n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(s.AtNoticebar,{"icon":"volume-plus","single":!0},"[单行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏")),n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(s.AtNoticebar,null,"[多行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏")),n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(s.AtNoticebar,{"marquee":!0},"[纯文字]这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏[结束]")),n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(s.AtNoticebar,{"marquee":!0,"icon":"volume-plus"},"[带icon]这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏[结束]")),n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(s.AtNoticebar,{"showMore":!0,"single":!0},"[单行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏")),n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(s.AtNoticebar,{"close":!0,"single":!0},"[单行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏")),n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(s.AtNoticebar,{"close":!0},"[多行] 这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏，这是NoticeBar通告栏")))),n.default.createElement(c.View,{"className":"panel"},n.default.createElement(c.View,{"className":"panel__title"},"Steps 步骤条"),n.default.createElement(c.View,{"className":"panel__content"},n.default.createElement(c.View,{"className":"example-item example-item--steps"},n.default.createElement(s.AtSteps,{"items":[{"title":"步骤一"},{"title":"步骤二"}],"current":this.state.stepsCurrent1,"onChange":this.handleStepsChange.bind(this,"stepsCurrent1")})),n.default.createElement(c.View,{"className":"example-item example-item--steps"},n.default.createElement(s.AtSteps,{"items":[{"title":"步骤一","desc":"这里是额外的信息，最多两行"},{"title":"步骤二","desc":"这里是额外的信息，最多两行"},{"title":"步骤三","desc":"这里是额外的信息，最多两行"}],"current":this.state.stepsCurrent2,"onChange":this.handleStepsChange.bind(this,"stepsCurrent2")})),n.default.createElement(c.View,{"className":"example-item example-item--steps"},n.default.createElement(s.AtSteps,{"items":[{"title":"步骤一","desc":"这里是额外的信息，最多两行","icon":{"value":"sound","activeColor":"#fff","inactiveColor":"#78A4FA","size":"14"}},{"title":"步骤二","desc":"这里是额外的信息，最多两行","icon":{"value":"shopping-cart","activeColor":"#fff","inactiveColor":"#78A4FA","size":"14"}},{"title":"步骤三","desc":"这里是额外的信息，最多两行","icon":{"value":"camera","activeColor":"#fff","inactiveColor":"#78A4FA","size":"14"}}],"current":this.state.stepsCurrent3,"onChange":this.handleStepsChange.bind(this,"stepsCurrent3")})),n.default.createElement(c.View,{"className":"example-item example-item--steps"},n.default.createElement(s.AtSteps,{"items":[{"title":"步骤一","desc":"这里是额外的信息，最多两行","status":"success"},{"title":"步骤二","desc":"这里是额外的信息，最多两行"},{"title":"步骤三","desc":"这里是额外的信息，最多两行","status":"error"}],"current":this.state.stepsCurrent4,"onChange":this.handleStepsChange.bind(this,"stepsCurrent4")})))),n.default.createElement(c.View,{"className":"panel"},n.default.createElement(c.View,{"className":"panel__title"},"Swiper 滑块视图容器"),n.default.createElement(c.View,{"className":"panel__content"},n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(c.Swiper,{"indicatorColor":"#999","indicatorActiveColor":"#333","current":1,"duration":500,"interval":5e3,"circular":!0,"autoplay":!0,"indicatorDots":!0,"preMargin":"20"},this.state.imgUrls.map(function(e,t){return n.default.createElement(c.SwiperItem,{"key":t},n.default.createElement(c.Image,{"mode":"widthFix","src":e,"className":"slide-image","width":"355","height":"150"}))}))))),n.default.createElement(c.View,{"className":"panel"},n.default.createElement(c.View,{"className":"panel__title"},"Timeline 时间轴"),n.default.createElement(c.View,{"className":"panel__content"},n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(c.View,{"className":"example-item__desc"},"一般用法"),n.default.createElement(s.AtTimeline,{"items":[{"title":"刷牙洗脸"},{"title":"吃早餐"},{"title":"上班"},{"title":"睡觉"}]})),n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(c.View,{"className":"example-item__desc"},"自定义图标"),n.default.createElement(s.AtTimeline,{"items":[{"title":"刷牙洗脸","icon":"check-circle"},{"title":"吃早餐","icon":"clock"},{"title":"上班","icon":"clock"},{"title":"睡觉","icon":"clock"}]})),n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(c.View,{"className":"example-item__desc"},"幽灵节点"),n.default.createElement(s.AtTimeline,{"pending":!0,"items":[{"title":"刷牙洗脸"},{"title":"吃早餐"},{"title":"上班"},{"title":"睡觉"}]})),n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(c.View,{"className":"example-item__desc"},"丰富内容"),n.default.createElement(s.AtTimeline,{"pending":!0,"items":[{"title":"刷牙洗脸","content":["大概8:00"],"icon":"check-circle"},{"title":"吃早餐","content":["牛奶+面包","餐后记得吃药"],"icon":"clock"},{"title":"上班","content":["查看邮件","写PPT","发送PPT给领导"],"icon":"clock"},{"title":"睡觉","content":["不超过23:00"],"icon":"clock"}]}))),n.default.createElement(c.View,{"className":"panel"},n.default.createElement(c.View,{"className":"panel__title"},"Divider 分隔线"),n.default.createElement(c.View,{"className":"panel__content"},n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(s.AtDivider,{"content":"没有更多了"})))),n.default.createElement(c.View,{"className":"panel"},n.default.createElement(c.View,{"className":"panel__title"},"Load More 页面提示"),n.default.createElement(c.View,{"className":"panel__content no-padding"},n.default.createElement(c.View,{"className":"example-item"},n.default.createElement(s.AtLoadMore,{"onClick":this.handleLoadMoreClick.bind(this),"status":l})))))),n.default.createElement(s.AtCurtain,{"isOpened":a,"closeBtnPosition":"bottom","onClose":this.handleCurtainClick.bind(this,!1)},n.default.createElement(c.Image,{"style":"width:100%","mode":"widthFix","src":u.default})))}},{"key":"componentDidMount","value":function componentDidMount(){i(ViewPage.prototype.__proto__||Object.getPrototypeOf(ViewPage.prototype),"componentDidMount",this)&&i(ViewPage.prototype.__proto__||Object.getPrototypeOf(ViewPage.prototype),"componentDidMount",this).call(this)}},{"key":"componentDidShow","value":function componentDidShow(){i(ViewPage.prototype.__proto__||Object.getPrototypeOf(ViewPage.prototype),"componentDidShow",this)&&i(ViewPage.prototype.__proto__||Object.getPrototypeOf(ViewPage.prototype),"componentDidShow",this).call(this)}},{"key":"componentDidHide","value":function componentDidHide(){i(ViewPage.prototype.__proto__||Object.getPrototypeOf(ViewPage.prototype),"componentDidHide",this)&&i(ViewPage.prototype.__proto__||Object.getPrototypeOf(ViewPage.prototype),"componentDidHide",this).call(this)}}]),ViewPage}();t.default=d}}]);