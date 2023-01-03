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

/***/ "./src/bada.js":
/*!*********************!*\
  !*** ./src/bada.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const app = window.bada = _=> {};\r\nconst seal = (name, get)=> Object.defineProperty(app, name, (typeof get == 'function') ? {get} : get);\r\n\r\n// 유틸리티\r\nconst utils = __webpack_require__(/*! ./properties/utils */ \"./src/properties/utils.js\")(app);\r\nseal('utils', _=> utils);\r\n\r\n// 스토리지\r\nconst storage = __webpack_require__(/*! ./properties/storage */ \"./src/properties/storage.js\")(app);\r\nseal('storage', _=> storage);\r\n\r\n// 로깅\r\nconst logger = __webpack_require__(/*! ./properties/logger */ \"./src/properties/logger.js\")(app);\r\nseal('logger', _=> logger);\r\n\r\n// 바인더\r\nconst binder = __webpack_require__(/*! ./properties/binder */ \"./src/properties/binder.js\")(app);\r\nseal('binder', {get:_=>binder});\r\n\r\n// 네이티브 브릿지\r\nconst bridge = __webpack_require__(/*! ./properties/bridge */ \"./src/properties/bridge.js\")(app);\r\nseal('bridge', {get:_=>bridge});\r\n\n\n//# sourceURL=webpack://front-end/./src/bada.js?");

/***/ }),

/***/ "./src/properties/binder.js":
/*!**********************************!*\
  !*** ./src/properties/binder.js ***!
  \**********************************/
/***/ ((module) => {

eval("/**\r\n * 엘리먼트 바인더\r\n * @param {App} app\r\n */\r\nmodule.exports = app=> {\r\n    const DATA_VO = 'data-vo';\r\n    const DATA_TEMPLATE = 'data-template';\r\n\r\n    const {utils} = app;\r\n    const logger = app.logger('sys|binder');\r\n\r\n    /**\r\n     * 엘리먼트 바인더\r\n     * ====================\r\n     * @param {string} id \r\n     * @param {(binder: Binder)=> void} onBind \r\n     * @returns \r\n     */\r\n    const binder = (id, onBind)=> {\r\n        if(!id) return logger.error('can not bind element: invalidate param(id)');\r\n\r\n        const el = document.getElementById(id);\r\n        if(!el) return logger.error(`can not find element(${id})`);\r\n\r\n        const name = utils.camelCase(id);\r\n        if(binder[name]) return logger.warn(`contained binder(${name})`);\r\n\r\n        const handle = bindElement(el, name);\r\n        utils.seal(binder, name, _=> handle);\r\n\r\n        logger.debug(`element binder(${name})`, handle);\r\n        onBind && onBind(handle);\r\n    };\r\n\r\n    /**\r\n     * 엘리먼트에 기능 추가된 바인더 반환\r\n     * @param {HTMLElement} el \r\n     * @param {string} name \r\n     * @returns {Binder}\r\n     */\r\n    const bindElement = (el, name)=> {\r\n        // template 텍스트 수집\r\n        const template = [...el.querySelectorAll(`[${DATA_TEMPLATE}]`)].reduce((template, el)=> {\r\n            const {outerHTML, dataset:{template:name}} = el;\r\n            template[name] = outerHTML.replace(RegExp(`[ ]?${DATA_TEMPLATE}=\\\"[^\"]+\"`), '');\r\n            el.remove();\r\n            return template;\r\n        }, {});\r\n\r\n        // vo 엘리먼트 수집\r\n        const vo = [...el.querySelectorAll(`[${DATA_VO}]`)].reduce((vo, el)=> {\r\n            const {dataset:{vo:name}} = el;\r\n            const handle = getVoHandle(el);\r\n            return Object.assign(vo, {[utils.camelCase(name)]: handle});\r\n        }, {});\r\n\r\n        utils.seal(el, 'name', _=> name);\r\n        utils.seal(el, 'vo', _=> vo);\r\n        utils.seal(el, 'setText', _=> {\r\n            return v=> Object.entries(v).forEach(([k, text])=> (vo[k] && Object.assign(vo[k], {text})));\r\n        });\r\n        utils.seal(el, 'getText', _=> {\r\n            return _=> Object.entries(vo).reduce((rs, [k, {text}])=> Object.assign(rs, {[k]:text}), {});\r\n        });\r\n        utils.seal(el, 'setHtml', _=> {\r\n            return v=> Object.entries(v).forEach(([k, html])=> (vo[k] && Object.assign(vo[k], {html})));\r\n        });\r\n        utils.seal(el, 'getHtml', _=> {\r\n            return _=> Object.entries(vo).reduce((rs, [k, {html}])=> Object.assign(rs, {[k]:html}), {});\r\n        });\r\n        utils.seal(el, 'setValue', _=> {\r\n            return v=> Object.entries(v).forEach(([k, value])=> (vo[k] && Object.assign(vo[k], {value})));\r\n        });\r\n        utils.seal(el, 'getValue', _=> {\r\n            return _=> Object.entries(vo).reduce((rs, [k, {value}])=> Object.assign(rs, {[k]:value}), {});\r\n        });\r\n        utils.seal(el, 'addClass', _=> {\r\n            return (...v)=> v.forEach(v=> el.classList.add(v));\r\n        });\r\n        utils.seal(el, 'removeClass', _=> {\r\n            return (...v)=> v.forEach(v=> el.classList.remove(v));\r\n        });\r\n        utils.seal(el, 'hasClass', _=> {\r\n            return v=> el.classList.contains(v);\r\n        });\r\n \r\n        // --- none template ---\r\n        utils.seal(el, 'getTemplate', _=> {\r\n            return (name, onCreate)=> {\r\n                if(!template[name]) return logger.error(`can not find template(${name})`);\r\n\r\n                const el = document.createElement('div');\r\n                el.innerHTML = template[name];\r\n\r\n                const handle = bindElement(el.firstChild, utils.camelCase(name));\r\n\r\n                logger.debug(`create template(${name})`, handle);\r\n                onCreate && onCreate(handle);\r\n\r\n                return handle;\r\n            };\r\n        });\r\n\r\n        const opner = {resolve: undefined, reject: undefined};\r\n        utils.seal(el, 'open', _=> {\r\n            return _=> new Promise((resolve, reject)=> {\r\n                Object.assign(opner, {resolve, reject});\r\n                el._open();\r\n            });\r\n        });\r\n        utils.seal(el, 'close', _=> {\r\n            return _=> {\r\n                el._close(opner);\r\n            };\r\n        });\r\n        // --- none template ---\r\n\r\n        // 쉐도잉 메소드\r\n        el.show = _=> {el.style.display = 'block'};\r\n        el.hide = _=> {el.style.display = 'none'};\r\n        el._open = _=> {};\r\n        el._close = _=> {};\r\n        return el;\r\n    };\r\n\r\n    /**\r\n     * vo 래핑 객체 반환\r\n     * @param {HTMLElement} el \r\n     * @returns {VoHandle}\r\n     */\r\n    const getVoHandle = el=> {\r\n        utils.seal(el, 'text', {get() {return this.textContent}, set(v) {this.textContent = v}});\r\n        utils.seal(el, 'html', {get() {return this.innerHTML}, set(v) {this.innerHTML = v}});\r\n        utils.seal(el, 'empty', _=> {\r\n            return _=> {el.innerHTML = ''};\r\n        });\r\n        utils.seal(el, 'event', _=> {\r\n            return (type, listener)=> (el.addEventListener(type, listener), el);\r\n        });\r\n        utils.seal(el, 'addClass', _=> {\r\n            return (...v)=> v.forEach(v=> el.classList.add(v));\r\n        });\r\n        utils.seal(el, 'removeClass', _=> {\r\n            return (...v)=> v.forEach(v=> el.classList.remove(v));\r\n        });\r\n        utils.seal(el, 'hasClass', _=> {\r\n            return v=> el.classList.contains(v);\r\n        });\r\n        return el;\r\n    };\r\n\r\n    document.head.appendChild(document.createElement('style'))\r\n        .sheet.insertRule(`[${DATA_TEMPLATE}] {display:none;}`, 0);\r\n    return binder;\r\n};\n\n//# sourceURL=webpack://front-end/./src/properties/binder.js?");

/***/ }),

/***/ "./src/properties/bridge.js":
/*!**********************************!*\
  !*** ./src/properties/bridge.js ***!
  \**********************************/
/***/ ((module) => {

eval("/**\r\n * 네이티브 브릿지\r\n * @param {App} app\r\n */\r\nmodule.exports = app=> {\r\n    const {utils} = app;\r\n    const logger = app.logger('sys|bridge');\r\n\r\n    app.storage.local.setGroup('bridgeMessage', 'bridgeEvent');\r\n    const {storage:{local, session}} = app;\r\n    const stubBridge = {\r\n        /**\r\n         * 메시지 더미값 저장\r\n         * @param {string} command\r\n         * @param {BridgeMessageBody} body\r\n         */\r\n        writeMessage(command, body={}) {\r\n            if(!session.logLevel.str) return;\r\n            local.bridgeMessage[command] = body;\r\n        },\r\n\r\n        /**\r\n         * 메시지 더미값 반환\r\n         * @param {string} command \r\n         * @returns {BridgeMessageBody=}\r\n         */\r\n        readMessage(command) {\r\n            return local.bridgeMessage[utils.camelCase(command)].json;\r\n        },\r\n\r\n        /**\r\n         * 등록 메시지 아이디 반환\r\n         * @returns {Array<string>}\r\n         */\r\n        getMessages() {\r\n            return [...commands.keys()];\r\n        }\r\n    };\r\n\r\n    /**\r\n     * 브릿지 수행 함수\r\n     * ====================\r\n     */\r\n    const bridge = _=>_;\r\n\r\n    /**@type {Map<string, BridgeMessageBody>} */\r\n    const commands = new Map;\r\n\r\n    /** 브릿지 메시지 등록 */\r\n    utils.seal(bridge, 'setMessage', _=> {\r\n        return (command, payload, result)=> {\r\n            const name = utils.camelCase(command);\r\n            if(commands.has(name)) {\r\n                return logger.warn(`containd bridge command(${command} -> ${name})`), bridge;\r\n            }\r\n\r\n            if(!local.bridgeMessage(name)) {\r\n                stubBridge.writeMessage(name, {result});\r\n            }\r\n            commands.set(name, {payload, result});\r\n            logger.debug(`add bridge(${name})`, payload, result);\r\n            return bridge;\r\n        };\r\n    });\r\n\r\n    /** 브릿지 스터빙 객체 반환 */\r\n    utils.seal(bridge, 'getStub', _=> {\r\n        return _=> Object.assign({}, stubBridge);\r\n    });\r\n    return bridge;\r\n};\r\n\n\n//# sourceURL=webpack://front-end/./src/properties/bridge.js?");

/***/ }),

/***/ "./src/properties/logger.js":
/*!**********************************!*\
  !*** ./src/properties/logger.js ***!
  \**********************************/
/***/ ((module) => {

eval("/**\r\n * 로깅 처리\r\n * @param {App} app\r\n */\r\nmodule.exports = app=> {\r\n    const {utils, storage:{session}} = app;\r\n\r\n    const empty = _=>_;\r\n    const levels = new Set;\r\n    const contains = vl=> {return levels.add(vl), levels.has(session.logLevel.str)};\r\n\r\n    const result = (label, style='font-weight:bold;color:grey;')=> {\r\n        const debug = contains('debug') ? console.log.bind(window, '%cdebug[%s]', style, label) : empty;\r\n        const trace = contains('info') ? _=> {debugger} : empty;\r\n        const info = contains('info') ? console.info.bind(window, '%cinfo[%s]', style, label) : empty;\r\n        const warn = contains('warn') ? console.warn.bind(window, '%cwarn[%s]', style, label) : empty;\r\n        const error = console.error.bind(window, '%cerror[%s]', style, label);\r\n\r\n        return utils.seal({debug, info, warn, error}, 'trace', trace);\r\n    };\r\n\r\n    session('logLevel');\r\n    utils.seal(result, 'level', {\r\n        get() {return session.logLevel.str},\r\n        set(v) {session.logLevel = v}\r\n    });\r\n    return result;\r\n};\r\n\n\n//# sourceURL=webpack://front-end/./src/properties/logger.js?");

/***/ }),

/***/ "./src/properties/storage.js":
/*!***********************************!*\
  !*** ./src/properties/storage.js ***!
  \***********************************/
/***/ ((module) => {

eval("/**\r\n * 웹 스토리지\r\n * @param {App} app\r\n * @returns {{local: WebStorage, session: WebStorage, cookie: CookieStorage}}\r\n */\r\nmodule.exports = app=> {\r\n    const {utils} = app;\r\n\r\n    /**\r\n     * 스토리지 바인딩 객체 반환\r\n     * @param {Storage} storage \r\n     * @returns {WebStorage}\r\n     */\r\n    const getStorage = storage=> {\r\n        const main = (...keys)=> keys.forEach(v=> {\r\n            const {name, key} = keyName(v);\r\n            if(main.hasOwnProperty(name)) return;\r\n\r\n            /** 속성값 등록 */\r\n            utils.seal(main, name, getStorageItem(storage, `[${key}]`));\r\n        });\r\n\r\n        /** 그룹 설정 */\r\n        utils.seal(main, 'setGroup', _=> {\r\n            return (...keys)=> keys.forEach(dir=> {\r\n                const name = utils.camelCase(dir);\r\n                if(main.hasOwnProperty(name)) return;\r\n\r\n                const group = getStorageGroup(storage, name);\r\n                utils.seal(main, name, _=> group);\r\n            });\r\n        });\r\n\r\n        /** 스토리지 공간 삭제 */\r\n        utils.seal(main, 'clear', _=> {\r\n            return _=> Object.keys(storage).forEach(v=> removeItem(storage, v));\r\n        });\r\n        return main;\r\n    };\r\n\r\n    /**\r\n     * 값에 대한 스토리지 키(케밥)값, 속성 이름(카멜) 반환\r\n     * @param {string} v \r\n     * @returns {{key: string, name: string}}\r\n     */\r\n    const keyName = v=> {\r\n        const name = utils.camelCase(v), key = utils.kebabCase(name);\r\n        return {name, key};\r\n    };\r\n\r\n    /**\r\n     * 속성값 세팅을 위한 어트리뷰트 반환\r\n     * @param {Storage} storage \r\n     * @param {string} key \r\n     * @returns {{get: ()=> StorageItem, set: (v: any)=> void}}\r\n     */\r\n    const getStorageItem = (storage, key)=> {\r\n        const get = _=> {\r\n            const str = storage.getItem(key);\r\n            const json = /^(?:\\{.*\\}|\\[.*\\])$/.test(str) ? JSON.parse(str) : null;\r\n            const remove = _=> storage.removeItem(key);\r\n            return {str, json, remove};\r\n        };\r\n        const set = v=> {\r\n            const value = (typeof v == 'string') ? v : JSON.stringify(v);\r\n            storage.setItem(key, value);\r\n        };\r\n        return {get, set};\r\n    };\r\n\r\n    /**\r\n     * 그룹 관리 함수 반환\r\n     * @param {Storage} storage \r\n     * @param {string} groupName \r\n     * @returns {(...keys: string): void}\r\n     */\r\n    const getStorageGroup = (storage, groupName)=> {\r\n        const directive = utils.kebabCase(groupName);\r\n        const group = (...keys)=> keys.forEach(v=> {\r\n            const {name, key} = keyName(v);\r\n            if(group.hasOwnProperty(name)) return;\r\n\r\n            /** 그룹에 속성값 등록 */\r\n            utils.seal(group, name, getStorageItem(storage, `[${directive}=${key}]`));\r\n        });\r\n\r\n        /** 그룹 공간 삭제 */\r\n        utils.seal(group, 'clear', _=> {\r\n            return _=> Object.keys(storage).forEach(v=> removeItem(storage, v, `${directive}=`));\r\n        });\r\n        return group;\r\n    };\r\n\r\n    /**\r\n     * 패턴에 일치하는 스토리지 삭제\r\n     * @param {Storage} storage \r\n     * @param {string} keyword 삭제 대상 단어\r\n     * @param {string=} group 삭제 대상 그룹명\r\n     */\r\n    const removeItem = (storage, keyword, group='')=> {\r\n        if(RegExp(`^\\\\[${group}(?:.*[^\\\\]])\\\\]$`).test(keyword)) {\r\n            storage.removeItem(keyword);\r\n        }\r\n    };\r\n\r\n    /**\r\n     * 스토리지 관리 함수\r\n     * ====================\r\n     */\r\n    const result = _=>_;\r\n\r\n    /** 로컬 스토리지 */\r\n    const local = getStorage(localStorage);\r\n    utils.seal(result, 'local', _=> local);\r\n\r\n    /** 세션 스토리지 */\r\n    const session = getStorage(sessionStorage);\r\n    utils.seal(result, 'session', _=> session);\r\n\r\n    // TODO: 쿠키\r\n    return result;\r\n};\r\n\n\n//# sourceURL=webpack://front-end/./src/properties/storage.js?");

/***/ }),

/***/ "./src/properties/utils.js":
/*!*********************************!*\
  !*** ./src/properties/utils.js ***!
  \*********************************/
/***/ ((module) => {

eval("/**\r\n * 유틸리티\r\n * @param {App} app\r\n */\r\nmodule.exports = app=> {\r\n    const result = _=>_;\r\n    const seal = (target, name, get)=> Object.defineProperty(target, name, (typeof get == 'function') ? {get} : get);\r\n\r\n    const snakeCase = v=> upperToDash(v, '_$1');\r\n    const kebabCase = v=> upperToDash(v, '-$1');\r\n    const camelCase = v=> dashToUpper(v).replace(/^\\w/, $0=> $0.toLowerCase());\r\n    const pascalCase = v=> dashToUpper(v).replace(/^\\w/, $0=> $0.toUpperCase());\r\n    const dashToUpper = v=> v.replace(/[_-](\\w)/g, (_, $1)=> $1.toUpperCase());\r\n    const upperToDash = (v, dash)=> v.replace(/([A-Z])/g, dash).toLowerCase().replace(/^[_-]/, '');\r\n\r\n    const YYYY='yyyy', MM='mm', DD='dd', HH='hh', MI='mi', SS='ss', MS='ms';\r\n    const formatDate = (format=`${YYYY}-${MM}-${DD} ${HH}:${MI}:${SS}.${MS}`, date=new Date)=>\r\n        format.replace(RegExp(`${YYYY}|${MM}|${DD}|${HH}|${MI}|${SS}|${MS}`, 'g'), v=> {\r\n            switch(v) {\r\n                case YYYY: return date.getFullYear();\r\n                case MM: return (date.getMonth()+1+'').padStart(2, '0');\r\n                case DD: return (date.getDate()+'').padStart(2, '0');\r\n                case HH: return (date.getHours()+'').padStart(2, '0');\r\n                case MI: return (date.getMinutes()+'').padStart(2, '0');\r\n                case SS: return (date.getSeconds()+'').padStart(2, '0');\r\n                case MS: return (date.getMilliseconds()+'').padStart(3, '0');\r\n                default: return '';\r\n            }\r\n        });\r\n\r\n    return Object.assign(result, {\r\n        seal,\r\n        camelCase, pascalCase, snakeCase, kebabCase,\r\n        formatDate,\r\n    });\r\n};\r\n\n\n//# sourceURL=webpack://front-end/./src/properties/utils.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/bada.js");
/******/ 	
/******/ })()
;