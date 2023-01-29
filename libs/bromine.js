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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);\n/**\r\n * @typedef {object} BrApp 어플리케이션 코어\r\n * @property {import('./prop/logger').BrLogger} logger 로거\r\n * @property {import('./prop/bind-html').BrBindHtml} bindHtml HTML 바인더\r\n * @property {import('./prop/popup').BrPopup} popup 팝업\r\n * @property {(v: loadHtmlParam)=> Promise<void>} loadHtml html 로드\r\n * \r\n * @typedef {object} loadHtmlParam\r\n * @property {string} selector 대상 엘리먼트 셀렉터\r\n * @property {string=} html 적용할 HTML 텍스트\r\n * @property {string=} url 적용할 HTML 경로\r\n */\r\n\r\n\r\n\r\nconst member = {\r\n    loadHtml(url) {\r\n        return fetch(url).then(rs=> rs.text());\r\n    },\r\n};\r\nconst app = window.br = fn=> fn&&fn();\r\n\r\n(0,_utils__WEBPACK_IMPORTED_MODULE_0__.def)(app, {\r\n    loadHtml: {\r\n        set(loadHtml) { (0,_utils__WEBPACK_IMPORTED_MODULE_0__.assign)(member, {loadHtml}) },\r\n        get() {\r\n            return ({selector, html, url})=> {\r\n                if(!selector) return Promise.reject('loadHtml failed: invalid selector');\r\n\r\n                return Promise.resolve(html)\r\n                    .then(html=> (html || member.loadHtml(url)))\r\n                    .then(innerHTML=> [...(0,_utils__WEBPACK_IMPORTED_MODULE_0__.assign)(document.createElement('div'), {innerHTML}).children])\r\n                    .then(nodes=> new Promise((resolve, reject)=> {\r\n                        requestAnimationFrame(_=> {\r\n                            const el = document.querySelector(selector);\r\n                            if(!el) return reject(`loadHtml failed: can not find '${selector}'`);\r\n                            else {\r\n                                nodes.forEach(v=> el.appendChild(v));\r\n                                resolve();\r\n                            }\r\n                        });\r\n                    }));\r\n            };\r\n        },\r\n    },\r\n});\r\n\r\n// 로깅\r\n__webpack_require__(/*! ./prop/logger */ \"./src/prop/logger.js\")(app);\r\n// 바인더\r\n(__webpack_require__(/*! ./prop/bind-html */ \"./src/prop/bind-html.js\")[\"default\"])(app);\r\n// 팝업\r\n(__webpack_require__(/*! ./prop/popup */ \"./src/prop/popup.js\")[\"default\"])(app);\r\n\r\n// // 네이티브 브릿지\r\n// const bridge = require('./ex/bridge')(app);\r\n// app('bridge', _=> bridge);\r\n// // 스토리지\r\n// const storage = require('./ex/storage')(app);\r\n// app('storage', _=> storage);\r\n\n\n//# sourceURL=webpack://front-end/./src/bromine.js?");

/***/ }),

/***/ "./src/prop/bind-html.js":
/*!*******************************!*\
  !*** ./src/prop/bind-html.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/utils.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);\n/**\r\n * @typedef {{(id: string, onBind: (view: BrBindView, vo: BrBindVoHandleMap)=> void): BrBindView, [k: string]: BrBindView}} BrBindHtml HTML 바인더\r\n * @typedef {BrBindViewProerty & HTMLElement} BrBindView\r\n * @typedef {object} BrBindViewProerty\r\n * @property {BrBindVoHandleMap} vo vo 핸들 객체\r\n * @property {(data: any)=> void} setText 텍스트 세팅\r\n * @property {()=> any} getText 텍스트 반환\r\n * @property {(data: any)=> void} setHtml HTML 세팅\r\n * @property {()=> any} getHtml HTML 반환\r\n * @property {(data: any)=> void} setValue Value값 세팅\r\n * @property {()=> any} getValue Value값 반환\r\n * @property {(name: string)=> boolean} hasClass 클래스 확인\r\n * @property {(...names: string)=> BrBindView} addClass 클래스 추가\r\n * @property {(...names: string)=> BrBindView} removeClass 클래스 삭제\r\n * @property {(name: string)=> BrBindView} getTemplate 템플릿 객체 반환\r\n * \r\n * @typedef {Object<string, BrBindVoHandle>} BrBindVoHandleMap\r\n * @typedef {BrBindVoHandleProperty & HTMLElement & HTMLInputElement} BrBindVoHandle vo 핸들 객체\r\n * @typedef {object} BrBindVoHandleProperty\r\n * @property {string} text 텍스트 인/아웃\r\n * @property {string} html HTML 인/아웃\r\n * @property {(name: string)=> boolean} hasClass 클래스 확인\r\n * @property {(...names: string)=> BrBindVoHandle} addClass 클래스 추가\r\n * @property {(...names: string)=> BrBindVoHandle} removeClass 클래스 삭제\r\n * @property {(type: keyof HTMLElementEventMap, listener: (event: Event)=> void)=> BrBindVoHandle} event 이벤트\r\n */\r\n\r\n\r\n\r\nconst bindElement = el=> {\r\n    const template = getHtmlTemplate(el);\r\n    const vo = getHtmlVo(el);\r\n    const {hasClass, addClass, removeClass} = getExtendMethods(el);\r\n\r\n    const setText= v=> (0,_utils__WEBPACK_IMPORTED_MODULE_0__.isObject)(v) && (0,_utils__WEBPACK_IMPORTED_MODULE_0__.entries)(v).forEach(([k, text])=> vo[k] && (0,_utils__WEBPACK_IMPORTED_MODULE_0__.assign)(vo[k], {text}));\r\n    const getText= _=> (0,_utils__WEBPACK_IMPORTED_MODULE_0__.entries)(vo).reduce((rs, [k, {text}])=> (0,_utils__WEBPACK_IMPORTED_MODULE_0__.assign)(rs, {[k]: text}), {});\r\n    const setHtml= v=> (0,_utils__WEBPACK_IMPORTED_MODULE_0__.isObject)(v) && (0,_utils__WEBPACK_IMPORTED_MODULE_0__.entries)(v).forEach(([k, html])=> vo[k] && (0,_utils__WEBPACK_IMPORTED_MODULE_0__.assign)(vo[k], {html}));\r\n    const getHtml= _=> (0,_utils__WEBPACK_IMPORTED_MODULE_0__.entries)(vo).reduce((rs, [k, {html}])=> (0,_utils__WEBPACK_IMPORTED_MODULE_0__.assign)(rs, {[k]: html}), {});\r\n    const setValue= v=> (0,_utils__WEBPACK_IMPORTED_MODULE_0__.isObject)(v) && (0,_utils__WEBPACK_IMPORTED_MODULE_0__.entries)(v).forEach(([k, value])=> vo[k] && (0,_utils__WEBPACK_IMPORTED_MODULE_0__.assign)(vo[k], {value}));\r\n    const getValue= _=> (0,_utils__WEBPACK_IMPORTED_MODULE_0__.entries)(vo).reduce((rs, [k, {value}])=> (0,_utils__WEBPACK_IMPORTED_MODULE_0__.assign)(rs, {[k]: value}), {});\r\n\r\n    const getTemplate = name=> bindElement(_getElement(template[name]));\r\n    const _getElement = (innerHTML, el=document.createElement('div'))=> (0,_utils__WEBPACK_IMPORTED_MODULE_0__.assign)(el, {innerHTML}).firstChild;\r\n\r\n    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.def)(el, { vo: { get() {return vo} } });\r\n    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.assign)(el, {\r\n        hasClass, addClass, removeClass,\r\n        setText, getText,\r\n        setHtml, getHtml,\r\n        setValue, getValue,\r\n        getTemplate,\r\n    });\r\n};\r\n\r\n// 템플릿 HTML 수집\r\nconst getHtmlTemplate = el=> [...el.querySelectorAll('[data-template]')]\r\n    .reduce((tpl, el)=> (0,_utils__WEBPACK_IMPORTED_MODULE_0__.assign)(tpl, dataTemplateHtml(el)), {});\r\nconst dataTemplateHtml = el=> {\r\n    const {dataset:{template}, outerHTML} = el;\r\n    el.remove();\r\n    return {[template]: outerHTML.replace(/[ ]?data-template=\"[^\"]+\"/, '')};\r\n};\r\n\r\n// vo 핸들 수집\r\nconst getHtmlVo = el=> [...el.querySelectorAll('[data-vo]')]\r\n    .reduce((vo, el)=> (0,_utils__WEBPACK_IMPORTED_MODULE_0__.assign)(vo, dataVoHandle(el)), {});\r\nconst dataVoHandle = el=> {\r\n    const {dataset:{vo}} = el;\r\n    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.def)((0,_utils__WEBPACK_IMPORTED_MODULE_0__.assign)(el, getExtendMethods(el)), {\r\n        text: {\r\n            get(){ return el.textContent },\r\n            set(textContent){ (0,_utils__WEBPACK_IMPORTED_MODULE_0__.assign)(el, {textContent}) },\r\n        },\r\n        html: {\r\n            get(){ return el.innerHTML },\r\n            set(innerHTML){ (0,_utils__WEBPACK_IMPORTED_MODULE_0__.assign)(el, {innerHTML}) },\r\n        },\r\n    });\r\n\r\n    return {[(0,_utils__WEBPACK_IMPORTED_MODULE_0__.camelCase)(vo)]: el};\r\n};\r\n\r\n// DOM 클래스 메소드\r\nconst getExtendMethods = (el, {classList}=el)=> {\r\n    const hasClass= v=> classList.contains(v);\r\n    const addClass= (...v)=> v.forEach(v=> classList.add(v));\r\n    const removeClass= (...v)=> v.forEach(v=> classList.remove(v));\r\n    const event= (type, listener)=> el.addEventListener(type, listener);\r\n    return {hasClass, addClass, removeClass, event};\r\n};\r\n\r\n/**\r\n * HTML 바인더\r\n * @param {import(\"../bromine\").BrApp} app \r\n */\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app=> {\r\n    const logger = app.logger('bind-html');\r\n\r\n    const bindHtml = (id, onBind)=> {\r\n        if(!id) return logger.error('invalid param: id is required');\r\n\r\n        const el = document.getElementById(id);\r\n        if(!el) return logger.error(`can not element '${id}'`);\r\n\r\n        const name = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.camelCase)(id);\r\n        if(bindHtml[name]) return logger.warn(`bindHtml '${name}' has already been declared`);\r\n\r\n        const view = bindElement(el);\r\n        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.assign)(bindHtml, {[name]: view});\r\n        requestAnimationFrame(_=> onBind && onBind(view, view.vo))\r\n        return view;\r\n    };\r\n\r\n    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.assign)(app, {bindHtml});\r\n    document.head.appendChild(document.createElement('style'))\r\n        .sheet.insertRule('[data-template] {display:none;}', 0);\r\n});\r\n\n\n//# sourceURL=webpack://front-end/./src/prop/bind-html.js?");

/***/ }),

/***/ "./src/prop/logger.js":
/*!****************************!*\
  !*** ./src/prop/logger.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/**\r\n * @typedef {BrLoggerProperty & {(label: string, style?: string): BrLoggerInstance}} BrLogger 어플리케이션 로거\r\n * @typedef {object} BrLoggerProperty\r\n * @property {0|1|2} level 로그 레벨\r\n * @property {void} break 브레이크 포인트\r\n * @typedef {object} BrLoggerInstance\r\n * @property {(...v: any)=> void} out 로그 출력(레벨 1)\r\n * @property {(...v: any)=> void} warn 경고 출력(레벨 2)\r\n * @property {(...v: any)=> void} error 오류 출력\r\n */\r\n\r\nconst {assign, def} = __webpack_require__(/*! ../utils */ \"./src/utils.js\");\r\n\r\n/**\r\n * @param {import(\"../bromine\").BrApp} app \r\n */\r\nmodule.exports = app=> {\r\n    const STORAGE_KEY = '[logger-level]';\r\n    const logLevel = sessionStorage.getItem(STORAGE_KEY);\r\n    \r\n    const logger = (lbl, stl='font-weight:bold')=> {\r\n        const levels = new Set;\r\n\r\n        const config = [window, '%c[%s]', stl, lbl];\r\n\r\n        levels.add('1');\r\n        const out = levels.has(logLevel) ? console.log.bind(...config) : _=>_;\r\n\r\n        levels.add('2');\r\n        const warn = levels.has(logLevel) ? console.warn.bind(...config) : _=>_;\r\n\r\n        const error = console.error.bind(...config);\r\n        return {out, warn, error};\r\n    };\r\n\r\n    def(logger, {\r\n        break: {\r\n            get() { if(logLevel == '1') debugger }\r\n        },\r\n        level: {\r\n            get() { return logLevel },\r\n            set(v) { sessionStorage.setItem(STORAGE_KEY, (v=='0' ? '' : v)) }\r\n        }\r\n    });\r\n    assign(app, {logger});\r\n};\r\n\n\n//# sourceURL=webpack://front-end/./src/prop/logger.js?");

/***/ }),

/***/ "./src/prop/popup.js":
/*!***************************!*\
  !*** ./src/prop/popup.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/utils.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);\n/**\r\n * @typedef {BrPopupProperty & BrPopupConstructor} BrPopup 팝업\r\n * @typedef {{(id: string, onInit: (v: BrPopupItem)=> void): BrPopupItem, [k: string]: BrPopupItem}} BrPopupConstructor\r\n * @typedef {object} BrPopupProperty\r\n * @property {(v: BrPopupEvent)=> void} observable 팝업 오픈/종료 감지 리스너\r\n * @property {(popups: Array<BrPopupItem>)=> void} brodcast 이벤트 브로드 캐스팅\r\n * \r\n * @typedef {BrPopupItemProperty & BrPopupItemInterface} BrPopupItem\r\n * @typedef {object} BrPopupItemProperty\r\n * @property {string} id 팝업 아이디\r\n * @property {BrBindView} view 팝업 뷰 객체\r\n * @property {(v: HTMLElement | Event)=> BrPopupItem} target 포커스 타겟\r\n * @property {(v: any)=> Promise<any>} open 팝업 오픈\r\n * @property {(v: any, isResolve=true)=> void} close 팝업 종료 (isResolve: `false`일경우 오픈 리젝 처리 한다 기본값 `true`)\r\n * @typedef {object} BrPopupItemInterface\r\n * @property {(v: any)=> void=} onOpen 팝업 오픈시 호출되는 이벤트\r\n * @property {(v: any)=> void=} onClose 팝업 종료시 호출되는 이벤트\r\n * @property {(v: any)=> void=} onReceiver 브로드 캐스팅 수신 이벤트\r\n * \r\n * @typedef {object} BrPopupEvent\r\n * @property {Array<BrPopupItem>} popups 활성화된 팝업 리스트\r\n * @property {boolean=} isOpen 오픈 상태\r\n * @property {boolean=} isClose 종료 상태\r\n */\r\n\r\n\r\n\r\n\r\n/**\r\n * 팝업\r\n * @param {import(\"../bromine\").BrApp} app \r\n */\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app=> {\r\n    const member = {\r\n        view: undefined,\r\n        popups: [],\r\n    };\r\n\r\n    const popup = (id, onInit)=> {\r\n        const name = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.camelCase)(id);\r\n        const trigger = {\r\n            /**@type {{resolve(v: any): void, reject(v: any): void}} 오픈/종료 트리거 */\r\n            _self: undefined,\r\n            set(_self) { (0,_utils__WEBPACK_IMPORTED_MODULE_0__.assign)(this, {_self}) },\r\n            isOpen() { return !!this._self },\r\n            resolve(data) {\r\n                this._self.resolve((0,_utils__WEBPACK_IMPORTED_MODULE_0__.clone)(data));\r\n                this._remove();\r\n            },\r\n            reject(data) {\r\n                this._self.reject((0,_utils__WEBPACK_IMPORTED_MODULE_0__.clone)(data));\r\n                this._remove();\r\n            },\r\n            _remove() { this._self = undefined },\r\n\r\n            /**@type {HTMLElement | Event} 포커싱 대상 타겟 */\r\n            _target: undefined,\r\n            returnTarget() {\r\n                const {_target} = this;\r\n                if(!_target) return;\r\n\r\n                if(this._focusTarget(_target)) return;\r\n\r\n                const {currentTarget, target} = _target\r\n                this._focusTarget(currentTarget || target);\r\n            },\r\n            _focusTarget(el) {\r\n                if(el instanceof HTMLElement) {\r\n                    el.focus();\r\n                    return true;\r\n                }\r\n            },\r\n        };\r\n        const popupItem = {\r\n            id, onOpen: undefined, onClose: undefined, onReceiver: undefined,\r\n            target(_target) {\r\n                (0,_utils__WEBPACK_IMPORTED_MODULE_0__.assign)(trigger, {_target});\r\n                return this;\r\n            },\r\n            open(data) {\r\n                if(trigger.isOpen()) return Promise.reject(`popup '${id}' is opened`);\r\n\r\n                return new Promise((resolve, reject)=> {\r\n                    trigger.set({resolve, reject});\r\n\r\n                    member.popups.push(this);\r\n                    popup.observable && popup.observable({\r\n                        isOpen: true,\r\n                        popups: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.clone)(member.popups),\r\n                    });\r\n\r\n                    this.onOpen && this.onOpen((0,_utils__WEBPACK_IMPORTED_MODULE_0__.clone)(data));\r\n                });\r\n            },\r\n            close(data, isResolve=true) {\r\n                if(!trigger.isOpen()) return;\r\n\r\n                popup.observable && popup.observable({\r\n                    isClose: true,\r\n                    popups: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.clone)(member.popups),\r\n                });\r\n                member.popups.pop();\r\n\r\n                this.onClose && this.onClose((0,_utils__WEBPACK_IMPORTED_MODULE_0__.clone)(data));\r\n                isResolve ? trigger.resolve(data) : trigger.reject(data);\r\n                trigger.returnTarget()\r\n            },\r\n        };\r\n\r\n        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.assign)(popup, {[name]: popupItem});\r\n        onInit && onInit(popupItem);\r\n    };\r\n\r\n    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.assign)(popup, {\r\n        brodcast(data) {\r\n            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.entries)(this).forEach(([, popup={}])=> popup.onReceiver && popup.onReceiver((0,_utils__WEBPACK_IMPORTED_MODULE_0__.clone)(data)));\r\n        },\r\n    });\r\n\r\n    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.def)(popup, {\r\n        view: {\r\n            get() { return member.view },\r\n            set(view) { (0,_utils__WEBPACK_IMPORTED_MODULE_0__.assign)(member, {view}) },\r\n        },\r\n    });\r\n\r\n    // app.popup\r\n    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.assign)(app, {popup});\r\n});\r\n\n\n//# sourceURL=webpack://front-end/./src/prop/popup.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((module) => {

eval("const assign = (t, ...vl)=> Object.assign(t, ...vl);\r\nconst entries = v=> Object.entries(v);\r\nconst clone = v=> {\r\n    if(Array.isArray(v)) return v.slice(0);\r\n    else if(typeof v == 'object') return assign({}, v);\r\n    else return v;\r\n};\r\nconst def = (a, b)=> entries(b).reduce((a, [k, v])=> Object.defineProperty(a, k, v), a);\r\nconst camelCase = v=> v.replace(/[_-](\\w)/g, (_, v)=> v.toUpperCase()).replace(/^\\w/, v=> v.toLowerCase());\r\nconst isObject = v=> {\r\n    if(Array.isArray(v)) return false;\r\n    return typeof v == 'object';\r\n};\r\n\r\nmodule.exports = {assign, entries, clone, def, camelCase, isObject};\n\n//# sourceURL=webpack://front-end/./src/utils.js?");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
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