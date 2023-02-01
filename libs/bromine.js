/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/bromine.js":
/*!************************!*\
  !*** ./src/bromine.js ***!
  \************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const { assign } = __webpack_require__(/*! ./snippet */ \"./src/snippet.js\");\r\n\r\n/**\r\n * @typedef {object} BrApp 어플리케이션 코어\r\n * @property {import('./modules/logger').BrLogger} logger 디버깅 로그\r\n * @property {import('./modules/bind-html').BrBindHtml} bindHtml HTML 바인더\r\n * @property {*} popup 팝업\r\n * @property {*} ajax 데이터 요청\r\n * @property {*} bridge 브릿지\r\n * \r\n * @property {(v: ()=> void)=> void} ready 페이지 로드 완료\r\n * @property {(url: string)=> Promise<string>} fetchText text 데이터 요청\r\n * @property {(url: string, option?: any)=> Promise<object>} fetchJson json 데이터 요청\r\n * @property {(url: string)=> Promise<Array<HTMLElement>>} loadHtml html 로더\r\n * @property {(urls: Array<string>)=> Promise<void>} loadScripts ~script 로더~\r\n */\r\n\r\n/**@type {BrApp} */\r\nconst app = window.br = fn=> fn&&fn();\r\n// 속성 및 메소드\r\nassign(app, {\r\n    ready(fn) {\r\n        document.addEventListener('DOMContentLoaded', fn);\r\n    },\r\n    fetchText(url) {\r\n        return fetch(url).then(r=> r.text());\r\n    },\r\n    fetchJson(url, option) {\r\n        return fetch(url).then(r=> r.json());\r\n    },\r\n    loadHtml(url) {\r\n        return app.fetchText(url)\r\n            .then(innerHTML=> [\r\n                ...assign(document.createElement('div'), {innerHTML}).children\r\n            ]);\r\n    },\r\n    loadScripts() {},\r\n});\r\n\r\n// 디버깅 로그\r\nconst logger = __webpack_require__(/*! ./modules/logger */ \"./src/modules/logger.js\")(app);\r\nassign(app, {logger});\r\n\r\n// HTML 바인더\r\nconst bindHtml = __webpack_require__(/*! ./modules/bind-html */ \"./src/modules/bind-html.js\")(app);\r\nassign(app, {bindHtml});\r\n\r\n// 팝업\r\nconst popup = __webpack_require__(/*! ./modules/popup */ \"./src/modules/popup.js\")(app);\r\nassign(app, {popup});\r\n\r\n// 데이터 요청\r\nconst ajax = __webpack_require__(/*! ./modules/ajax */ \"./src/modules/ajax.js\")(app);\r\nassign(app, {ajax});\r\n\r\n// 브릿지\r\nconst bridge = __webpack_require__(/*! ./modules/bridge */ \"./src/modules/bridge.js\")(app);\r\nassign(app, {bridge});\r\n\n\n//# sourceURL=webpack://front-end/./src/bromine.js?");

/***/ }),

/***/ "./src/modules/ajax.js":
/*!*****************************!*\
  !*** ./src/modules/ajax.js ***!
  \*****************************/
/***/ ((module) => {

eval("module.exports = app=> {\r\n};\r\n\n\n//# sourceURL=webpack://front-end/./src/modules/ajax.js?");

/***/ }),

/***/ "./src/modules/bind-html.js":
/*!**********************************!*\
  !*** ./src/modules/bind-html.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/**\r\n * @typedef {{(id: string, onBind: BrBindLoadEvent): BrBindView, [k: string]: BrBindView}} BrBindHtml HTML 바인더\r\n * @typedef {(view: BrBindView, vo: BrBindVoHandles)=> void} BrBindLoadEvent\r\n * @typedef {BrBindViewProerty & HTMLElement} BrBindView\r\n * @typedef {Object<string, BrBindVoHandle>} BrBindVoHandles\r\n * @typedef {BrBindVoHandleProperty & HTMLElement & HTMLInputElement} BrBindVoHandle vo 핸들 객체\r\n * \r\n * @typedef {object} BrBindViewProerty\r\n * @property {BrBindVoHandles} vo vo 핸들 객체\r\n * @property {(data: any)=> void} setText 텍스트 세팅\r\n * @property {()=> any} getText 텍스트 반환\r\n * @property {(data: any)=> void} setHtml HTML 세팅\r\n * @property {()=> any} getHtml HTML 반환\r\n * @property {(data: any)=> void} setValue Value값 세팅\r\n * @property {()=> any} getValue Value값 반환\r\n * @property {(name: string)=> boolean} hasClass 클래스 확인\r\n * @property {(...names: string)=> BrBindView} addClass 클래스 추가\r\n * @property {(...names: string)=> BrBindView} removeClass 클래스 삭제\r\n * @property {(name: string)=> BrBindView} getTemplate 템플릿 객체 반환\r\n * \r\n * @typedef {object} BrBindVoHandleProperty\r\n * @property {string} text 텍스트 인/아웃\r\n * @property {string} html HTML 인/아웃\r\n * @property {(name: string)=> boolean} hasClass 클래스 확인\r\n * @property {(...names: string)=> BrBindVoHandle} addClass 클래스 추가\r\n * @property {(...names: string)=> BrBindVoHandle} removeClass 클래스 삭제\r\n * @property {(type: keyof HTMLElementEventMap, listener: (event: Event)=> void)=> BrBindVoHandle} event 이벤트\r\n */\r\n\r\nconst { camelCase, def, assign } = __webpack_require__(/*! ../snippet */ \"./src/snippet.js\");\r\n\r\nconst bindElement = el=> {\r\n    const template = getHtmlTemplate(el);\r\n    const vo = getHtmlVo(el);\r\n    const {hasClass, addClass, removeClass} = getExtendMethods(el);\r\n\r\n    const setText= v=> isObject(v) && entries(v).forEach(([k, text])=> vo[k] && assign(vo[k], {text}));\r\n    const getText= _=> entries(vo).reduce((rs, [k, {text}])=> assign(rs, {[k]: text}), {});\r\n    const setHtml= v=> isObject(v) && entries(v).forEach(([k, html])=> vo[k] && assign(vo[k], {html}));\r\n    const getHtml= _=> entries(vo).reduce((rs, [k, {html}])=> assign(rs, {[k]: html}), {});\r\n    const setValue= v=> isObject(v) && entries(v).forEach(([k, value])=> vo[k] && assign(vo[k], {value}));\r\n    const getValue= _=> entries(vo).reduce((rs, [k, {value}])=> assign(rs, {[k]: value}), {});\r\n\r\n    const getTemplate = name=> bindElement(_getElement(template[name]));\r\n    const _getElement = (innerHTML, el=document.createElement('div'))=> assign(el, {innerHTML}).firstChild;\r\n\r\n    def(el, { vo: { get() {return vo} } });\r\n    return assign(el, {\r\n        hasClass, addClass, removeClass,\r\n        setText, getText,\r\n        setHtml, getHtml,\r\n        setValue, getValue,\r\n        getTemplate,\r\n    });\r\n};\r\n\r\n// 템플릿 HTML 수집\r\nconst getHtmlTemplate = el=> [...el.querySelectorAll('[data-template]')]\r\n    .reduce((tpl, el)=> assign(tpl, dataTemplateHtml(el)), {});\r\nconst dataTemplateHtml = el=> {\r\n    const {dataset:{template}, outerHTML} = el;\r\n    el.remove();\r\n    return {[template]: outerHTML.replace(/[ ]?data-template=\"[^\"]+\"/, '')};\r\n};\r\n\r\n// vo 핸들 수집\r\nconst getHtmlVo = el=> [...el.querySelectorAll('[data-vo]')]\r\n    .reduce((vo, el)=> assign(vo, dataVoHandle(el)), {});\r\nconst dataVoHandle = el=> {\r\n    const {dataset:{vo}} = el;\r\n    def(assign(el, getExtendMethods(el)), {\r\n        text: {\r\n            get(){ return el.textContent },\r\n            set(textContent){ assign(el, {textContent}) },\r\n        },\r\n        html: {\r\n            get(){ return el.innerHTML },\r\n            set(innerHTML){ assign(el, {innerHTML}) },\r\n        },\r\n    });\r\n\r\n    return {[camelCase(vo)]: el};\r\n};\r\n\r\n// DOM 클래스 메소드\r\nconst getExtendMethods = (el, {classList}=el)=> {\r\n    const hasClass= v=> classList.contains(v);\r\n    const addClass= (...v)=> v.forEach(v=> classList.add(v));\r\n    const removeClass= (...v)=> v.forEach(v=> classList.remove(v));\r\n    const event= (type, listener)=> el.addEventListener(type, listener);\r\n    return {hasClass, addClass, removeClass, event};\r\n};\r\n\r\n\r\n\r\n/**\r\n * HTML 바인더\r\n * @param {import(\"../bromine\").BrApp} app \r\n */\r\nmodule.exports = app=> {\r\n    const logger = app.logger('br.bind-html');\r\n    const bindHtml = (id, onBind)=> {\r\n        if(!id) return logger.error('invalid param: id is required');\r\n\r\n        const el = document.getElementById(id);\r\n        if(!el) return logger.error(`can not element '${id}'`);\r\n\r\n        const name = camelCase(id);\r\n        if(bindHtml[name]) return logger.warn(`bindHtml '${name}' has already been declared`);\r\n\r\n        const view = bindElement(el);\r\n        assign(bindHtml, {[name]: view});\r\n        requestAnimationFrame(_=> onBind && onBind(view, view.vo));\r\n        return view;\r\n    };\r\n\r\n    document.head.appendChild(document.createElement('style'))\r\n        .sheet.insertRule('[data-template] {display:none;}', 0);\r\n    return bindHtml;\r\n};\r\n\n\n//# sourceURL=webpack://front-end/./src/modules/bind-html.js?");

/***/ }),

/***/ "./src/modules/bridge.js":
/*!*******************************!*\
  !*** ./src/modules/bridge.js ***!
  \*******************************/
/***/ ((module) => {

eval("module.exports = app=> {\r\n};\r\n\n\n//# sourceURL=webpack://front-end/./src/modules/bridge.js?");

/***/ }),

/***/ "./src/modules/logger.js":
/*!*******************************!*\
  !*** ./src/modules/logger.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/**\r\n * @typedef {BrLoggerProperty & {(label: string, style?: string): BrLoggerItem}} BrLogger 디버깅 로그\r\n * @typedef {object} BrLoggerProperty\r\n * @property {0|1|2} level 로그 레벨\r\n * @property {void} break 브레이크 포인트\r\n * @typedef {object} BrLoggerItem\r\n * @property {(...v: any)=> void} out 로그 출력(레벨 1)\r\n * @property {(...v: any)=> void} warn 경고 출력(레벨 2)\r\n * @property {(...v: any)=> void} error 오류 출력\r\n */\r\n\r\nconst { def } = __webpack_require__(/*! ../snippet */ \"./src/snippet.js\");\r\n\r\n/**\r\n * 디버깅 로그\r\n * @param {import(\"../bromine\").BrApp} app \r\n */\r\nmodule.exports = app=> {\r\n    const STORAGE_KEY = '[logger-level]';\r\n    const logLevel = sessionStorage.getItem(STORAGE_KEY);\r\n\r\n    const logger = (lbl, stl='font-weight:bold')=> {\r\n        const levels = new Set;\r\n        const config = [window, '%c[%s]', stl, lbl];\r\n\r\n        levels.add('1');\r\n        const out = levels.has(logLevel) ? console.log.bind(...config) : _=>_;\r\n        levels.add('2');\r\n        const warn = levels.has(logLevel) ? console.warn.bind(...config) : _=>_;\r\n        const error = console.error.bind(...config);\r\n\r\n        return {out, warn, error};\r\n    };\r\n    return def(logger, {\r\n        break: {\r\n            get() { if(logLevel == '1') debugger }\r\n        },\r\n        level: {\r\n            get() { return logLevel },\r\n            set(v) { sessionStorage.setItem(STORAGE_KEY, (v=='0' ? '' : v)) }\r\n        }\r\n    });\r\n};\r\n\n\n//# sourceURL=webpack://front-end/./src/modules/logger.js?");

/***/ }),

/***/ "./src/modules/popup.js":
/*!******************************!*\
  !*** ./src/modules/popup.js ***!
  \******************************/
/***/ ((module) => {

eval("module.exports = app=> {\r\n};\r\n\n\n//# sourceURL=webpack://front-end/./src/modules/popup.js?");

/***/ }),

/***/ "./src/snippet.js":
/*!************************!*\
  !*** ./src/snippet.js ***!
  \************************/
/***/ ((module) => {

eval("const assign = (t, ...vl)=> Object.assign(t, ...vl);\r\nconst entries = v=> Object.entries(v);\r\nconst clone = v=> {\r\n    if(Array.isArray(v)) return v.slice(0);\r\n    else if(typeof v == 'object') return assign({}, v);\r\n    else return v;\r\n};\r\nconst def = (a, b)=> entries(b).reduce((a, [k, v])=> Object.defineProperty(a, k, v), a);\r\nconst camelCase = v=> v.replace(/[_-](\\w)/g, (_, v)=> v.toUpperCase()).replace(/^\\w/, v=> v.toLowerCase());\r\n\r\nmodule.exports = {assign, entries, clone, def, camelCase};\r\n\n\n//# sourceURL=webpack://front-end/./src/snippet.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/bromine.js");
/******/ 	
/******/ })()
;