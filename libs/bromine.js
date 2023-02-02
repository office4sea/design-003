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

eval("const { assign } = __webpack_require__(/*! ./snippet */ \"./src/snippet.js\");\r\n\r\n/**\r\n * @typedef {object} BrApp 어플리케이션 코어\r\n * @property {import('./modules/logger').BrLogger} logger 디버깅 로그\r\n * @property {import('./modules/bind-html').BrBindHtml} bindHtml HTML 바인더\r\n * @property {import('./modules/popup').BrPopup} popup 팝업\r\n * @property {import('./modules/ajax').BrAjax} ajax 데이터 요청\r\n * @property {*} bridge 브릿지\r\n * \r\n * @property {(v: ()=> void)=> void} ready 페이지 로드 완료\r\n * @property {(url: string | Array<string>)=> Promise<void>} loadScripts script 로더\r\n */\r\n\r\n/**@type {BrApp} */\r\nconst app = window.br = fn=> fn&&fn();\r\n// 속성 및 메소드\r\nassign(app, {\r\n    ready(fn) {\r\n        document.addEventListener('DOMContentLoaded', fn);\r\n    },\r\n    loadScripts(url) {\r\n        const urls = (typeof url == 'string') ? [url] : url;\r\n        const _addScript = src=> {\r\n            const script = assign(document.createElement('script'), {src});\r\n            document.head.appendChild(script);\r\n\r\n            return new Promise(resolve=> {\r\n                script.onload= _=> resolve({url: src});\r\n                script.onerror= _=> resolve({url: src, error: true});\r\n            });\r\n        };\r\n\r\n        if(Array.isArray(url)) return Promise.reject(`loadScripts: 'url' is type error`);\r\n        else {\r\n            return Promise.all(urls.map(url=> _addScript(url)))\r\n                .then((...urls)=> urls);\r\n        }\r\n    },\r\n});\r\n\r\n// 디버깅 로그\r\nconst logger = __webpack_require__(/*! ./modules/logger */ \"./src/modules/logger.js\")(app);\r\nassign(app, {logger});\r\n\r\n// HTML 바인더\r\nconst bindHtml = __webpack_require__(/*! ./modules/bind-html */ \"./src/modules/bind-html.js\")(app);\r\nassign(app, {bindHtml});\r\n\r\n// 팝업\r\nconst popup = __webpack_require__(/*! ./modules/popup */ \"./src/modules/popup.js\")(app);\r\nassign(app, {popup});\r\n\r\n// 데이터 요청\r\nconst ajax = __webpack_require__(/*! ./modules/ajax */ \"./src/modules/ajax.js\")(app);\r\nassign(app, {ajax});\r\n\r\n// 브릿지\r\nconst bridge = __webpack_require__(/*! ./modules/bridge */ \"./src/modules/bridge.js\")(app);\r\nassign(app, {bridge});\r\n\n\n//# sourceURL=webpack://front-end/./src/bromine.js?");

/***/ }),

/***/ "./src/modules/ajax.js":
/*!*****************************!*\
  !*** ./src/modules/ajax.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/**\r\n * @typedef {BrAjaxConstructor & BrAjaxProperty & BrAjaxDelegator} BrAjax\r\n * @typedef {(v: BrAjaxDelegator)=> void} BrAjaxConstructor\r\n * @typedef {object} BrAjaxProperty\r\n * @property {BrAjaxProgress & {(loading: boolean): BrAjax}} progress 프로그래스바\r\n * @property {(v: Array<Promise>)=> Promise<any>} all 다건 비동기 요청\r\n * @property {(v: any)=> Promise<string>} getText 텍스트 요청\r\n * @property {(v: any, p?: any)=> Promise<string>} getJson JSON 데이터 요청\r\n * @property {(v: any, p?: any)=> Promise<string>} postJson JSON 데이터 요청(POST)\r\n * \r\n * @typedef {object} BrAjaxDelegator\r\n * @property {(v: any)=> Promise<string>} getText 텍스트 요청\r\n * @property {(v: any, p?: any)=> Promise<string>} getJson JSON 데이터 요청\r\n * @property {(v: any, p?: any)=> Promise<string>} postJson JSON 데이터 요청(POST)\r\n * \r\n * @typedef {object} BrAjaxProgress\r\n * @property {(stat: any)=> void} on 로딩바 노출\r\n * @property {(stat: any)=> void} off 로딩바 숨김\r\n */\r\n\r\nconst { assign, def } = __webpack_require__(/*! ../snippet */ \"./src/snippet.js\");\r\n\r\n/**\r\n * 데이터 요청\r\n * @param {import(\"../bromine\").BrApp} app \r\n */\r\nmodule.exports= _=> {\r\n    const _delegator = {\r\n        getText(url) { return fetch(url).then(r=> r.text()) },\r\n        getJson(url) { return fetch(url).then(r=> r.json()) },\r\n        postJson(url, payload) {\r\n            const body = JSON.stringify(payload || {});\r\n            return fetch(url, {\r\n                body, method:'POST'\r\n            }).then(r=> r.json());\r\n        },\r\n    };\r\n    const _progress = {\r\n        isLoading: false,\r\n        on() {}, off() {},\r\n    };\r\n\r\n    const ajax= fetch=> assign(_delegator, fetch);\r\n    assign(ajax, {\r\n        getText(url) {\r\n            return _delegator.getText(url);\r\n        },\r\n        getJson(url, payload) {\r\n            _progress.on(_progress.isLoading);\r\n            return _delegator.getJson(url, payload)\r\n                .then(v=> (_progress.off(_progress.isLoading), v))\r\n                .catch(e=> (_progress.off(_progress.isLoading), Promise.reject(e)));\r\n        },\r\n        postJson(url, payload) {\r\n            _progress.on(_progress.isLoading);\r\n            return _delegator.postJson(url, payload)\r\n                .then(v=> (_progress.off(_progress.isLoading), v))\r\n                .catch(e=> (_progress.off(_progress.isLoading), Promise.reject(e)));\r\n        },\r\n        all(args) {\r\n            ajax.progress(true);\r\n            return Promise.all(args.map(({url, payload})=> ajax.getJson(url, payload)))\r\n                .then((...v)=> (ajax.progress(false), v))\r\n                .catch(e=> (ajax.progress(false), Promise.reject(e)));\r\n        }\r\n    });\r\n\r\n    return def(ajax, {\r\n        progress: {\r\n            set(delegator={}) { assign(_progress, delegator) },\r\n            get() {\r\n                return isLoading=> {\r\n                    assign(_progress, {isLoading});\r\n                    isLoading ? _progress.on() : _progress.off();\r\n                    return ajax;\r\n                };\r\n            },\r\n        },\r\n    });\r\n};\r\n\n\n//# sourceURL=webpack://front-end/./src/modules/ajax.js?");

/***/ }),

/***/ "./src/modules/bind-html.js":
/*!**********************************!*\
  !*** ./src/modules/bind-html.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/**\r\n * @typedef {{(id: string, onBind: BrBindLoadEvent): BrBindView, [k: string]: BrBindView}} BrBindHtml HTML 바인더\r\n * @typedef {(view: BrBindView, vo: BrBindVoHandles)=> void} BrBindLoadEvent\r\n * @typedef {BrBindViewProerty & HTMLElement} BrBindView\r\n * @typedef {Object<string, BrBindVoHandle>} BrBindVoHandles\r\n * @typedef {BrBindVoHandleProperty & HTMLElement & HTMLInputElement} BrBindVoHandle vo 핸들 객체\r\n * \r\n * @typedef {object} BrBindViewProerty\r\n * @property {BrBindVoHandles} vo vo 핸들 객체\r\n * @property {(data: any)=> void} setText 텍스트 세팅\r\n * @property {()=> any} getText 텍스트 반환\r\n * @property {(data: any)=> void} setHtml HTML 세팅\r\n * @property {()=> any} getHtml HTML 반환\r\n * @property {(data: any)=> void} setValue Value값 세팅\r\n * @property {()=> any} getValue Value값 반환\r\n * @property {(name: string)=> boolean} hasClass 클래스 확인\r\n * @property {(...names: string)=> BrBindView} addClass 클래스 추가\r\n * @property {(...names: string)=> BrBindView} removeClass 클래스 삭제\r\n * @property {(name: string)=> BrBindView} getTemplate 템플릿 객체 반환\r\n * \r\n * @typedef {object} BrBindVoHandleProperty\r\n * @property {string} text 텍스트 인/아웃\r\n * @property {string} html HTML 인/아웃\r\n * @property {(name: string)=> boolean} hasClass 클래스 확인\r\n * @property {(...names: string)=> BrBindVoHandle} addClass 클래스 추가\r\n * @property {(...names: string)=> BrBindVoHandle} removeClass 클래스 삭제\r\n * @property {(type: keyof HTMLElementEventMap, listener: (event: Event)=> void)=> BrBindVoHandle} event 이벤트\r\n */\r\n\r\nconst { camelCase, def, assign, isObject, entries } = __webpack_require__(/*! ../snippet */ \"./src/snippet.js\");\r\n\r\nconst bindElement = el=> {\r\n    const template = getHtmlTemplate(el);\r\n    const vo = getHtmlVo(el);\r\n    const {hasClass, addClass, removeClass} = getExtendMethods(el);\r\n\r\n    const setText= v=> isObject(v) && entries(v).forEach(([k, text])=> vo[k] && assign(vo[k], {text}));\r\n    const getText= _=> entries(vo).reduce((rs, [k, {text}])=> assign(rs, {[k]: text}), {});\r\n    const setHtml= v=> isObject(v) && entries(v).forEach(([k, html])=> vo[k] && assign(vo[k], {html}));\r\n    const getHtml= _=> entries(vo).reduce((rs, [k, {html}])=> assign(rs, {[k]: html}), {});\r\n    const setValue= v=> isObject(v) && entries(v).forEach(([k, value])=> vo[k] && assign(vo[k], {value}));\r\n    const getValue= _=> entries(vo).reduce((rs, [k, {value}])=> assign(rs, {[k]: value}), {});\r\n    const getTemplate = name=> bindElement(getHtmlElement(template[name]));\r\n\r\n    def(el, { vo: { get() {return vo} } });\r\n    return assign(el, {\r\n        hasClass, addClass, removeClass,\r\n        setText, getText,\r\n        setHtml, getHtml,\r\n        setValue, getValue,\r\n        getTemplate,\r\n    });\r\n};\r\nconst getHtmlElement = (innerHTML, el=document.createElement('div'))=>\r\n    assign(el, {innerHTML}).firstChild;\r\n\r\n// 템플릿 HTML 수집\r\nconst getHtmlTemplate = el=>\r\n    [...el.querySelectorAll('[data-template]')]\r\n    .reduce((tpl, el)=> assign(tpl, _dataTemplateHtml(el)), {});\r\nconst _dataTemplateHtml = el=> {\r\n    const {dataset:{template}, outerHTML} = el;\r\n    el.remove();\r\n    return {[template]: outerHTML.replace(/[ ]?data-template=\"[^\"]+\"/, '')};\r\n};\r\n\r\n// vo 핸들 수집\r\nconst getHtmlVo = el=>\r\n    [...el.querySelectorAll('[data-vo]')]\r\n    .reduce((vo, el)=> assign(vo, dataVoHandle(el)), {});\r\nconst dataVoHandle = el=> {\r\n    def(assign(el, getExtendMethods(el)), {\r\n        text: {\r\n            get(){ return el.textContent },\r\n            set(textContent){ assign(el, {textContent}) },\r\n        },\r\n        html: {\r\n            get(){ return el.innerHTML },\r\n            set(innerHTML){ assign(el, {innerHTML}) },\r\n        },\r\n    });\r\n\r\n    const {dataset:{vo}} = el;\r\n    return {[camelCase(vo)]: el};\r\n};\r\n\r\n// DOM 클래스 메소드\r\nconst getExtendMethods = (el, {classList}=el)=> {\r\n    const hasClass= v=> classList.contains(v);\r\n    const addClass= (...v)=> v.forEach(v=> classList.add(v));\r\n    const removeClass= (...v)=> v.forEach(v=> classList.remove(v));\r\n    const event= (type, listener)=> el.addEventListener(type, listener);\r\n    return {hasClass, addClass, removeClass, event};\r\n};\r\n\r\n\r\n/**\r\n * HTML 바인더\r\n * @param {import(\"../bromine\").BrApp} app \r\n */\r\nmodule.exports = app=> {\r\n    const logger = app.logger('br.bind-html');\r\n    const bindHtml = (id, onBind)=> {\r\n        if(!id) return logger.error('invalid param: id is required');\r\n\r\n        const el = document.getElementById(id);\r\n        if(!el) return logger.error(`can not element '${id}'`);\r\n\r\n        const name = camelCase(id);\r\n        if(bindHtml[name]) return logger.warn(`bindHtml '${name}' has already been declared`);\r\n\r\n        const view = bindElement(el);\r\n        assign(bindHtml, {[name]: view});\r\n        requestAnimationFrame(_=> onBind && onBind(view, view.vo));\r\n        return view;\r\n    };\r\n\r\n    document.head.appendChild(document.createElement('style'))\r\n        .sheet.insertRule('[data-template] {display:none;}', 0);\r\n    return bindHtml;\r\n};\r\n\n\n//# sourceURL=webpack://front-end/./src/modules/bind-html.js?");

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
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/**\r\n * @typedef {BrPopupProperty & BrPopupConstructor} BrPopup 팝업\r\n * @typedef {{(id: string, onInit: (v: BrPopupItem)=> void): BrPopupItem, [k: string]: BrPopupItem}} BrPopupConstructor\r\n * @typedef {object} BrPopupProperty\r\n * @property {(v: BrPopupEvent)=> void} observable 팝업 오픈/종료 감지 리스너\r\n * @property {(popups: Array<BrPopupItem>)=> void} brodcast 이벤트 브로드 캐스팅\r\n * \r\n * @typedef {BrPopupItemProperty & BrPopupItemInterface} BrPopupItem\r\n * @typedef {object} BrPopupItemProperty\r\n * @property {string} id 팝업 아이디\r\n * @property {BrBindView} view 팝업 뷰 객체\r\n * @property {(v: HTMLElement | Event)=> BrPopupItem} target 포커스 타겟\r\n * @property {(v: any)=> Promise<any>} open 팝업 오픈\r\n * @property {(v: any, isResolve=true)=> void} close 팝업 종료 (isResolve: `false`일경우 오픈 리젝 처리 한다 기본값 `true`)\r\n * \r\n * @typedef {object} BrPopupItemInterface\r\n * @property {(v: any)=> void=} onOpen 팝업 오픈시 호출되는 이벤트\r\n * @property {(v: any)=> void=} onClose 팝업 종료시 호출되는 이벤트\r\n * @property {(v: any)=> void=} onReceiver 브로드 캐스팅 수신 이벤트\r\n * \r\n * @typedef {object} BrPopupEvent\r\n * @property {Array<BrPopupItem>} popups 활성화된 팝업 리스트\r\n * @property {boolean=} isOpen 오픈 상태\r\n * @property {boolean=} isClose 종료 상태\r\n */\r\n\r\nconst { assign, camelCase, clone } = __webpack_require__(/*! ../snippet */ \"./src/snippet.js\");\r\n\r\n\r\n/**\r\n * 팝업\r\n * @param {import(\"../bromine\").BrApp} app \r\n */\r\nmodule.exports = app=> {\r\n    const _openPopups = [];\r\n    const popup = (id, onInit)=> {\r\n        const popupItem = {\r\n            id, view: undefined,\r\n            /**@abstract */onOpen: undefined,\r\n            /**@abstract */onClose: undefined,\r\n            /**@abstract */onReceiver: undefined,\r\n            target(_target) {\r\n                assign(trigger, {_target});\r\n                return this;\r\n            },\r\n            open(data) {\r\n                if(trigger.isOpen()) return Promise.reject(`popup '${id}' is opened`);\r\n\r\n                return new Promise((resolve, reject)=> {\r\n                    trigger.set({resolve, reject});\r\n\r\n                    // 팝업 오픈 상태 전파\r\n                    _openPopups.push(this);\r\n                    popup.observable && popup.observable({\r\n                        isOpen: true,\r\n                        popups: clone(_openPopups),\r\n                    });\r\n\r\n                    this.onOpen && this.onOpen(clone(data));\r\n                });\r\n            },\r\n            close(data, isResolve=true) {\r\n                if(!trigger.isOpen()) return;\r\n\r\n                // 팝업 종료 상태 전파\r\n                popup.observable && popup.observable({\r\n                    isClose: true,\r\n                    popups: clone(_openPopups),\r\n                });\r\n                _openPopups.pop();\r\n\r\n                this.onClose && this.onClose(clone(data));\r\n\r\n                // 비동기 귀결처리\r\n                if(isResolve) trigger.resolve(clone(data));\r\n                else {\r\n                    trigger.reject(clone(data));\r\n                }\r\n\r\n                trigger.returnTarget();\r\n            }\r\n        };\r\n        const trigger = {\r\n            /**@type {{resolve(v: any): void, reject(v: any): void}} 오픈/종료 트리거 */\r\n            _self: undefined,\r\n            _remove() { this._self = undefined },\r\n            set(_self) { assign(this, {_self}) },\r\n            isOpen() { return !!this._self },\r\n            resolve(data) {\r\n                this._self.resolve(clone(data));\r\n                this._remove();\r\n            },\r\n            reject(data) {\r\n                this._self.reject(clone(data));\r\n                this._remove();\r\n            },\r\n\r\n            /**@type {HTMLElement | Event} 포커스 대상 타겟 */\r\n            _target: undefined,\r\n            _focusTarget(el) {\r\n                if(el instanceof HTMLElement) {\r\n                    return el.focus(), true;\r\n                }\r\n            },\r\n            returnTarget() {\r\n                const {_target} = this;\r\n                if(!_target) return;\r\n\r\n                if(this._focusTarget(_target)) return;\r\n\r\n                const {currentTarget, target} = _target\r\n                this._focusTarget(currentTarget || target);\r\n            },\r\n        };\r\n\r\n        const name = camelCase(id);\r\n        assign(popup, {[name]: popupItem});\r\n        onInit && onInit(popupItem);\r\n    };\r\n\r\n    return assign(popup, {\r\n        /**@abstract */\r\n        observable: undefined,\r\n        brodcast(data) {\r\n            entries(this).forEach(([, {onReceiver}={}])=> onReceiver && onReceiver(clone(data)));\r\n        },\r\n    });\r\n};\r\n\n\n//# sourceURL=webpack://front-end/./src/modules/popup.js?");

/***/ }),

/***/ "./src/snippet.js":
/*!************************!*\
  !*** ./src/snippet.js ***!
  \************************/
/***/ ((module) => {

eval("const assign = (t, ...vl)=> Object.assign(t, ...vl);\r\nconst entries = v=> Object.entries(v);\r\nconst isObject = v=> (Array.isArray(v) ? false : (typeof v == 'object'));\r\nconst clone = v=> {\r\n    if(Array.isArray(v)) return v.slice(0);\r\n    else if(typeof v == 'object') return assign({}, v);\r\n    else return v;\r\n};\r\n\r\nconst def = (a, b)=> entries(b).reduce((a, [k, v])=> Object.defineProperty(a, k, v), a);\r\nconst camelCase = v=> v.replace(/[_-](\\w)/g, (_, v)=> v.toUpperCase()).replace(/^\\w/, v=> v.toLowerCase());\r\n\r\nmodule.exports = {assign, entries, isObject, clone, def, camelCase};\r\n\n\n//# sourceURL=webpack://front-end/./src/snippet.js?");

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