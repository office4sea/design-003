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

/***/ "./src/bada.binder.js":
/*!****************************!*\
  !*** ./src/bada.binder.js ***!
  \****************************/
/***/ ((module) => {

eval("/**\r\n * 엘리먼트 바인더\r\n * @param {App} app \r\n * @returns \r\n */\r\nmodule.exports = app=> {\r\n    const logger = app.getLogger('binder');\r\n    const {utils} = app;\r\n\r\n    const listeners = new Set;\r\n    const directive = {\r\n        vo: 'data-vo', voItem: 'data-vo-item',\r\n    };\r\n\r\n    const result = (id, callback = _=>_)=> {\r\n        if(!id) return logger.error('can not bind element: invalidate param(id)');\r\n\r\n        const name = utils.camelCase(id);\r\n        if(hasBinder(name)) return logger.warn(`contained bind element(${id})`);\r\n\r\n        const el = document.getElementById(id);\r\n        if(!el) return logger.error(`can not find element(${id})`);\r\n\r\n        const handle = getBinder(el, name);\r\n        addBinder(name, handle);\r\n\r\n        logger.global(`bind element(${id})`, el);\r\n        if(app.hasDepend) listeners.add(callback);\r\n        else {\r\n            callback(handle);\r\n        }\r\n    };\r\n    const hasBinder = name=> !!result[name];\r\n    const addBinder = (name, handle)=> utils.prop(result, name, {get:_=>handle});\r\n\r\n    /**\r\n     * 엘리먼트 바인딩 객체를 반환 합니다.\r\n     * @param {HTMLElement} el 바인딩 대상 엘리먼트\r\n     * @returns \r\n     */\r\n    const getBinder = (el, name)=> {\r\n        const handle = Object.create({el, name});\r\n        // 템플릿 엘리먼트 수집\r\n        // vo 엘리먼트 수집\r\n        const vo = [...el.querySelectorAll(`[${directive.vo}]`)].reduce((vo, el)=> {\r\n            const {dataset:{vo:voName}} = el;\r\n            const handle = getBindVoHandle(el);\r\n            return utils.prop(vo, utils.camelCase(voName), {get:_=>handle});\r\n        }, {});\r\n\r\n        utils.prop(handle, 'vo', {get:_=>vo});\r\n        return handle;\r\n    };\r\n    /**\r\n     * \r\n     * @param {HTMLElement} el \r\n     * @returns {BindVoHandle}\r\n     */\r\n    const getBindVoHandle = el=> {\r\n        const result = {el};\r\n        utils.prop(result, 'text', {get() {return el.textContent}, set(v) {el.textContent = v}});\r\n        utils.prop(result, 'event', {get() {\r\n            return (type, listener)=> (el.addEventListener(type, listener), result);\r\n        }});\r\n\r\n        return result;\r\n    };\r\n\r\n    addBinder('listeners', [...listeners]);\r\n    return result;\r\n};\n\n//# sourceURL=webpack://front-end/./src/bada.binder.js?");

/***/ }),

/***/ "./src/bada.bridge.js":
/*!****************************!*\
  !*** ./src/bada.bridge.js ***!
  \****************************/
/***/ ((module) => {

eval("/**\r\n * 네이티브 브릿지\r\n * @param {App} app \r\n * @returns \r\n */\r\nmodule.exports = app=> {\r\n    const {utils, storage:{local, session}} = app;\r\n    const logger = app.getLogger('bridge');\r\n\r\n    const stub = {\r\n        getKey(command) {\r\n            return utils.camelCase(`bridge_${command}`);\r\n        },\r\n        write(command, result) {\r\n            if(!this.isLogging()) return;\r\n\r\n            const key = this.getKey(command);\r\n            local.setKeys(key);\r\n\r\n            if(!local[key].json) {\r\n                local[key] = result;\r\n            }\r\n        },\r\n        read(command) {\r\n            if(!this.isLogging()) return;\r\n\r\n            const key = this.getKey(command);\r\n            if(local[key].str) {\r\n                return local[key].json;\r\n            } else {\r\n                return {error: '구성된 데이터가 존재 하지 않습니다.'};\r\n            }\r\n        },\r\n        isLogging({sysLogLevel} = session) {\r\n            return !!(sysLogLevel||{}).str;\r\n        },\r\n    };\r\n    const bridge = {\r\n        stub,\r\n        name: undefined, native: undefined,\r\n\r\n        /**\r\n         * 브릿지 수행 요청(모깅)\r\n         * @param {BridgePostMessage} message\r\n         */\r\n        postMessage(message) {\r\n            if(!stub.isLogging()) return;\r\n\r\n            const {header} = message;\r\n            const body = stub.read(header.command);\r\n            setTimeout(_=> this.receiveMessage({header, body}), 500);\r\n        },\r\n\r\n        /**\r\n         * 브릿지 요청에 대한 응답 콜백\r\n         * @param {BridgeReceiveMessage} message\r\n         */\r\n        receiveMessage(message) {\r\n            const {header, body} = message;\r\n            const tran = messages.get(header.trid);\r\n            const _reject = message=> tran.reject({message, error: body?.er});\r\n\r\n            if(!body) return _reject('전문 body가 존재 하지 않습니다.');\r\n            if(body.error) return _reject('수행 결과 오류');\r\n\r\n            logger.global(`브릿지(${header.command}) 요청 결과`, message);\r\n            messages.delete(header.trid);\r\n            tran.resolve(body.result);\r\n        },\r\n\r\n        /**\r\n         * 네이티브에서 웹으로 이벤트 호출\r\n         * @param {eventName} string\r\n         * @param {*} param\r\n         */\r\n        sendEvent(eventName, param) {},\r\n\r\n        mixinBridge(target) {\r\n            if(!target) return this;\r\n\r\n            return Object.entries(this).reduce((target, [k, v])=> {\r\n                return target[k] ? target : Object.assign(target, {[k]: v});\r\n            }, target);\r\n        },\r\n    };\r\n\r\n    const result = name=> {\r\n        let native;\r\n        if(window[name]) { // aos\r\n            native = bridge.mixinBridge(window[name])\r\n        } else {\r\n            window[name] = bridge.mixinBridge();\r\n            if(window.webkit) { // ios\r\n                native = window.webkit.messageHandlers[name];\r\n            } else { // web\r\n                native = window[name];\r\n            }\r\n        }\r\n\r\n        Object.assign(bridge, {name, native});\r\n        return result;\r\n    };\r\n\r\n    /**@type {Map<string, {payload: any, receive: any}>} */\r\n    const commands = new Map;\r\n    utils.prop(result, 'addCommand', {get() {\r\n        /**\r\n         * @param {string} command\r\n         * @param {{payload: any, receive: any}} data\r\n         */\r\n        return (command, data)=> {\r\n            if(commands.has(command)) {\r\n                return logger.warn(`이미 등록된 브릿지(${command}) 입니다.`), result;\r\n            }\r\n\r\n            commands.set(command, data);\r\n            stub.write(command, data.receive);\r\n            logger.global(`브릿지(${command}) 등록`, data);\r\n            return result;\r\n        };\r\n    }});\r\n\r\n    const listeners = new Map;\r\n    utils.prop(result, 'addEventListener', {get() {\r\n        return (command, listener)=> {\r\n            const list = listeners.get(command) || [];\r\n            list.push(listener);\r\n            listeners.set(command, list);\r\n            return result;\r\n        };\r\n    }});\r\n\r\n    let seq = 0;\r\n    const validateCommand = (command, body)=> {\r\n        const vl = commands.get(command) || {};\r\n        if(!vl) return `등록되지 않은 브릿지(${command}) 명령입니다.`;\r\n\r\n        return Object.entries(vl.payload||{}).reduce((reason, [k, v])=> {\r\n            if(reason || v===null) return reason;\r\n            if(!body[k]) {\r\n                return `전달 데이터(${k})가 존재 하지 않습니다.`;\r\n            }\r\n        }, undefined);\r\n    };\r\n\r\n    /**@type {Map<string, {resolve(v: any):void, reject(v: any):void}} */\r\n    const messages = new Map;\r\n    // 네이티브 브릿지 요청\r\n    utils.prop(result, 'postMessage', {get() {\r\n        const trid = (new Date().getTime() + '') + (seq++);\r\n        return (command, body={})=> new Promise((resolve, reject)=> {\r\n            const invalidate = validateCommand(command, body);\r\n            if(invalidate) return reject(invalidate);\r\n\r\n            const message = {body, header: {trid, command}};\r\n            logger.global(`브릿지(${command}) 요청`, message);\r\n\r\n            messages.set(trid, {resolve, reject});\r\n            bridge.native.postMessage(message);\r\n        });\r\n    }});\r\n\r\n    return result;\r\n};\r\n\n\n//# sourceURL=webpack://front-end/./src/bada.bridge.js?");

/***/ }),

/***/ "./src/bada.js":
/*!*********************!*\
  !*** ./src/bada.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("let config;\r\nconst app = window.bada = (_config={})=> {\r\n    config = _config;\r\n};\r\nconst prop = (name, attribute)=> Object.defineProperty(app, name, attribute);\r\nprop('hasDepend', {get:_=>!!config});\r\nprop('property', {get:_=> prop});\r\n\r\n// 유틸리티\r\nconst utils = __webpack_require__(/*! ./bada.utils */ \"./src/bada.utils.js\");\r\nprop('utils', {get:_=>utils});\r\n\r\n// 스토리지\r\nconst storage = __webpack_require__(/*! ./bada.storage */ \"./src/bada.storage.js\")(app);\r\nprop('storage', {get:_=>storage});\r\n\r\n// 로거 사용유무\r\nconst {session} = storage;\r\nsession.setKeys('sysLogLevel');\r\nprop('useLogger', {\r\n    get() {return session.sysLogLevel.str},\r\n    set(level) {\r\n        ['', 'global', 'info', 'warn']\r\n        .forEach((sysLogLevel, i)=> {\r\n            (i == level) && Object.assign(session, {sysLogLevel});\r\n        });\r\n    },\r\n});\r\n// 로거 생성\r\nprop('getLogger', {get() {\r\n    const empty = _=>_;\r\n    const levels = new Set;\r\n    const level = app.useLogger;\r\n    const contains = vl=> {return levels.add(vl), levels.has(level)};\r\n\r\n    return (label, style='font-weight:bold;')=> {\r\n        const global = contains('global') ? console.info.bind(window, '%cglobal[%s]', 'color:#888', label) : empty;\r\n        const stackBreak = contains('info') ? _=> {debugger} : empty;\r\n        const info = contains('info') ? console.info.bind(window, '%cinfo[%s]', style, label) : empty;\r\n        const warn = contains('warn') ? console.warn.bind(window, '%cwarn[%s]', style, label) : empty;\r\n        const error = console.error.bind(window, '%cerror[%s]', style, label);\r\n\r\n        return utils.prop({error, warn, info, global}, 'break', {get:stackBreak});\r\n    };\r\n}});\r\n\r\n// 엘리먼트 바인더\r\nconst binder = __webpack_require__(/*! ./bada.binder */ \"./src/bada.binder.js\")(app);\r\nprop('binder', {get:_=>binder});\r\n\r\n// 네이티브 브릿지\r\nconst bridge = __webpack_require__(/*! ./bada.bridge */ \"./src/bada.bridge.js\")(app);\r\nprop('bridge', {get:_=>bridge});\r\n\n\n//# sourceURL=webpack://front-end/./src/bada.js?");

/***/ }),

/***/ "./src/bada.storage.js":
/*!*****************************!*\
  !*** ./src/bada.storage.js ***!
  \*****************************/
/***/ ((module) => {

eval("/**\r\n * 브라우저 스토리지 관리\r\n * @param {App} app\r\n * @returns {WebStorage}\r\n */\r\nmodule.exports = app=> {\r\n\r\n    // const storage = {local: {}, session: {}, cookie: {}};\r\n    // return storage;\r\n    const {utils} = app;\r\n    /**\r\n     * 스토리지 객체 반환\r\n     * @param {'localStorage'|'sessionStorage'} name \r\n     * @returns {WebStorageCollection}\r\n     */\r\n    const getStorage = name=> {\r\n        const prefix = 'webapp';\r\n        const storage = window[name];\r\n        const result = {};\r\n        \r\n        utils.prop(result, 'clear', {get() {\r\n            const remove = k=> RegExp(`^${prefix}\\\\.`).test(k) && storage.removeItem(k);\r\n            return _=> Object.entries(storage).forEach(([k])=> remove(k));\r\n        }});\r\n        utils.prop(result, 'setKeys', {get() {\r\n            return keys=> (Array.isArray(keys) ? keys : [keys])\r\n            .forEach(ky=> {\r\n                if(result.hasOwnProperty(ky)) return;\r\n\r\n                const name = utils.camelCase(ky);\r\n                const storageKey = [prefix, utils.snakeCase(ky)].join('.');\r\n                utils.prop(result, name, {\r\n                    get: _=> getStorageProperty(storage, storageKey),\r\n                    set(vl) {\r\n                        const value = (typeof vl == 'string') ? vl : JSON.stringify(vl);\r\n                        storage.setItem(storageKey, value);\r\n                    },\r\n                });\r\n            });\r\n        }});\r\n        return result;\r\n    };\r\n    const getStorageProperty = (storage, ky)=> {\r\n        const str = storage.getItem(ky);\r\n        const json = /^(?:\\{.*\\}|\\[.*\\])$/.test(str) ? JSON.parse(str) : null;\r\n        const remove = _=> storage.removeItem(ky);\r\n\r\n        return {str, json, remove};\r\n    };\r\n    const getCookie = _=> {};\r\n\r\n    const local = getStorage('localStorage');\r\n    const session = getStorage('sessionStorage');\r\n    const cookie = getCookie();\r\n\r\n    return {local, session, cookie};\r\n};\r\n\n\n//# sourceURL=webpack://front-end/./src/bada.storage.js?");

/***/ }),

/***/ "./src/bada.utils.js":
/*!***************************!*\
  !*** ./src/bada.utils.js ***!
  \***************************/
/***/ ((module) => {

eval("const prop = (target, name, attribute)=> Object.defineProperty(target, name, attribute);\r\n\r\nconst dashToUpper = v=> v.replace(/[_-](\\w)/g, (_, $1)=> $1.toUpperCase());\r\nconst camelCase = v=> dashToUpper(v).replace(/^\\w/, $0=> $0.toLowerCase());\r\nconst pascalCase = v=> dashToUpper(v).replace(/^\\w/, $0=> $0.toUpperCase());\r\nconst snakeCase = v=> v.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^[_-]/, '');\r\nconst kebabCase = v=> v.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^[_-]/, '');\r\n\r\nconst YYYY='yyyy', MM='mm', DD='dd', HH='hh', MI='mi', SS='ss', MS='ms';\r\nconst formatDate = (format=`${YYYY}/${MM}/${DD} ${HH}:${MI}:${SS}.${MS}`, date=new Date)=>\r\n    format.replace(RegExp(`${YYYY}|${MM}|${DD}|${HH}|${MI}|${SS}|${MS}`, 'g'), v=> {\r\n        switch(v) {\r\n            case YYYY: return date.getFullYear();\r\n            case MM: return (date.getMonth()+1+'').padStart(2, '0');\r\n            case DD: return (date.getDate()+'').padStart(2, '0');\r\n            case HH: return (date.getHours()+'').padStart(2, '0');\r\n            case MI: return (date.getMinutes()+'').padStart(2, '0');\r\n            case SS: return (date.getSeconds()+'').padStart(2, '0');\r\n            case MS: return (date.getMilliseconds()+'').padStart(3, '0');\r\n            default: return '';\r\n        }\r\n    });\r\n\r\nmodule.exports = {\r\n    prop,\r\n    camelCase, pascalCase, snakeCase, kebabCase,\r\n    formatDate,\r\n};\n\n//# sourceURL=webpack://front-end/./src/bada.utils.js?");

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