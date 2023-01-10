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

eval("const app = window.bada = (name, get)=> Object.defineProperty(app, name, (typeof get == 'function') ? {get} : get);\r\n\r\n// 유틸리티\r\nconst utils = __webpack_require__(/*! ./ex/utils */ \"./src/ex/utils.js\")(app);\r\napp('utils', _=> utils);\r\n\r\n// 스토리지\r\nconst storage = __webpack_require__(/*! ./ex/storage */ \"./src/ex/storage.js\")(app);\r\napp('storage', _=> storage);\r\n\r\n// 로깅\r\nconst logger = __webpack_require__(/*! ./ex/logger */ \"./src/ex/logger.js\")(app);\r\napp('logger', _=> logger);\r\n\r\n// 바인더\r\nconst bindHtml = __webpack_require__(/*! ./ex/bind-html */ \"./src/ex/bind-html.js\")(app);\r\napp('bindHtml', _=> bindHtml);\r\n\r\n// 네이티브 브릿지\r\nconst bridge = __webpack_require__(/*! ./ex/bridge */ \"./src/ex/bridge.js\")(app);\r\napp('bridge', _=> bridge);\r\n\n\n//# sourceURL=webpack://front-end/./src/bada.js?");

/***/ }),

/***/ "./src/ex/bind-html.js":
/*!*****************************!*\
  !*** ./src/ex/bind-html.js ***!
  \*****************************/
/***/ (function(module) {

eval("/**\r\n * 엘리먼트 바인더\r\n * @param {App} app\r\n */\r\nmodule.exports = (app, {utils}=app)=> {\r\n    const VO = 'vo';\r\n    const TEMPLATE = 'template';\r\n    const logger = app.logger('sys|bindHtml', 'background:darkgrey;color:white;');\r\n    const bindElement = el=> {\r\n        const entries = v=> Object.entries(v), assign = (t, s)=> Object.assign(t, s);\r\n        // template 텍스트 수집\r\n        const template = getTemplateText(el);\r\n        // vo 엘리먼트 수집\r\n        const vo = getVoHtml(el);\r\n\r\n        const setText = v=> entries(v).forEach(([k, text])=> (vo[k] && assign(vo[k], {text})));\r\n        const getText = _=> entries(vo).reduce((rs, [k, {text}])=> assign(rs, {[k]:text}), {});\r\n        const setHtml = v=> entries(v).forEach(([k, html])=> (vo[k] && assign(vo[k], {html})));\r\n        const getHtml = _=> entries(vo).reduce((rs, [k, {html}])=> assign(rs, {[k]:html}), {});\r\n        const setValue = v=> entries(v).forEach(([k, value])=> (vo[k] && assign(vo[k], {value})));\r\n        const getValue = _=> entries(vo).reduce((rs, [k, {value}])=> assign(rs, {[k]:value}), {});\r\n        const addClass = (...v)=> v.forEach(v=> this.classList.add(v));\r\n        const removeClass = (...v)=> v.forEach(v=> this.classList.remove(v));\r\n        const hasClass = v=> this.classList.contains(v);\r\n        const getTemplate = (name, onCreate)=> {\r\n            if(!template[name]) return logger.error(`can not find template(${name})`);\r\n\r\n            const el = document.createElement('div');\r\n            el.innerHTML = template[name];\r\n\r\n            const handle = bindElement(el.firstChild, utils.camelCase(name));\r\n            logger.debug(`make template ->> ${name}`, handle);\r\n\r\n            onCreate && onCreate(handle);\r\n            return handle;\r\n        };\r\n\r\n        return utils.mixin(el, {\r\n            vo: {get:_=> vo},\r\n            getTemplate,\r\n            setText, getText,\r\n            setHtml, getHtml,\r\n            setValue, getValue,\r\n            addClass, removeClass, hasClass,\r\n        });\r\n    };\r\n    const getTemplateText = el=> [...el.querySelectorAll(`[data-${TEMPLATE}]`)].reduce((template, el)=> {\r\n        const {outerHTML, dataset} = el;\r\n        const name = dataset[TEMPLATE];\r\n        el.remove();\r\n        return Object.assign(template, {\r\n            [name]: outerHTML.replace(RegExp(`[ ]?data-${TEMPLATE}=\\\"[^\"]+\"`), '')\r\n        });\r\n    }, {});\r\n    const getVoHtml = el=> [...el.querySelectorAll(`[data-${VO}]`)].reduce((vo, el)=> {\r\n        const name = el.dataset[VO];\r\n        const handle = getVoHandle(el);\r\n        return Object.assign(vo, {[utils.camelCase(name)]: handle});\r\n    }, {});\r\n    const getVoHandle = el=> utils.mixin(el, {\r\n        text: {\r\n            get() {return this.textContent},\r\n            set(v) {this.textContent = v}\r\n        },\r\n        html: {\r\n            get() {return this.innerHTML},\r\n            set(v) {this.innerHTML = v}\r\n        },\r\n        empty() {el.innerHTML = ''},\r\n        event(type, listener) {return el.addEventListener(type, listener), this},\r\n        addClass(...v) {v.forEach(v=> el.classList.add(v))},\r\n        removeClass(...v) {v.forEach(v=> el.classList.remove(v))},\r\n        hasClass(v) {return el.classList.contains(v)}\r\n    });\r\n\r\n    document.head.appendChild(document.createElement('style')).sheet.insertRule(`[data-${TEMPLATE}] {display:none;}`, 0);\r\n    /**\r\n     * 엘리먼트 바인더\r\n     * ====================\r\n     * @param {string} id \r\n     * @param {(binder: AppHtmlBinder)=> void} onBind \r\n     * @returns \r\n     */\r\n    const binder = (id, onBind)=> {\r\n        if(!id) return logger.error('can not bind element: invalidate param(id)');\r\n\r\n        const el = document.getElementById(id);\r\n        if(!el) return logger.error(`can not find element(${id})`);\r\n\r\n        const name = utils.camelCase(id);\r\n        if(binder[name]) return logger.warn(`contained binder(${name})`);\r\n\r\n        const handle = bindElement(el);\r\n        logger.debug(`bind element ->> ${name}`, handle);\r\n\r\n        utils.mixin(binder, {[name]:{ get:_=>handle }})\r\n        onBind && onBind(handle);\r\n    };\r\n    return binder;\r\n};\n\n//# sourceURL=webpack://front-end/./src/ex/bind-html.js?");

/***/ }),

/***/ "./src/ex/bridge.js":
/*!**************************!*\
  !*** ./src/ex/bridge.js ***!
  \**************************/
/***/ ((module) => {

eval("const os = 'aos,ios,mob,hpg'.split(',').reduce((os, v)=> Object.assign(os, {[v]:v}), {});\r\nconst errorMessage = (message, reason=message)=> Object.assign({message, reason});\r\n\r\n/**\r\n * 안드로이드 네이티브 기능\r\n * @param {BridgeAdapter} adapter \r\n */\r\nconst getNativeAos = ({global})=> {\r\n    return {\r\n        /**@param {AppBridgeMessage} message */\r\n        postMessage(message) {\r\n            global.postMessage(message);\r\n        },\r\n        /**@param {AppBridgeMessage} message */\r\n        receiveEvent(message) {\r\n            global.postMessage(message);\r\n        }\r\n    };\r\n};\r\n/**\r\n * IOS 네이티브 기능\r\n * @param {BridgeAdapter} adapter \r\n */\r\nconst getNativeIos = _=> {\r\n    const {webkit:{messageHandlers:handle}} = window;\r\n    return {\r\n        /**@param {AppBridgeMessage} message */\r\n        postMessage(message) {\r\n            handle.postMessage && handle.postMessage.postMessage(message);\r\n        },\r\n        /**@param {AppBridgeMessage} message */\r\n        receiveEvent(message) {\r\n            handle.receiveEvent && handle.receiveEvent.postMessage(message);\r\n        },\r\n    };\r\n};\r\n/**\r\n * mock 네이티브 기능 모깅\r\n * @param {BridgeAdapter} adapter \r\n */\r\nconst getNativeMock = ({native, mock})=> {\r\n    const _parseMessage = v=> {\r\n        try { return JSON.parse(v) }\r\n        catch(e) { return {} }\r\n    };\r\n\r\n    /**@param {AppBridgeMessage} message */\r\n    const postMessage = message=> {\r\n        /**@type {AppBridgeMessage} */\r\n        const {head} = _parseMessage(message);\r\n        if(!head) return native.receiveMessage({\r\n                head, body: {error: errorMessage('message data SyntaxError')}\r\n            });\r\n\r\n        // 결과 전송\r\n        setTimeout(_=> native.receiveMessage({\r\n            head, body: mock.readMessageBody(head.type)\r\n        }), 500);\r\n    };\r\n    /**@param {AppBridgeMessage} message */\r\n    const receiveEvent = message=> {};\r\n    return Object.assign(native, {postMessage, receiveEvent});\r\n};\r\n/**\r\n * web 네이티브 기능\r\n * @param {BridgeAdapter} adapter \r\n */\r\nconst getNativeWeb = ({msgTran, global, events, logger})=> {\r\n    /**\r\n     * 네이티브에서 받은 메시지 응답 처리\r\n     * @param {AppBridgeMessage} message \r\n     * @returns \r\n     */\r\n    const receiveMessage = message=> {\r\n        if(!message) return logger.error(`message receive error: invalid param`, message);\r\n\r\n        const {head, body} = message;\r\n        if(!head || !body) return logger.error(`message receive error: invalid param`, message);\r\n\r\n        const tran = msgTran.getTran(head.trid);\r\n        if(!tran) return logger.error(`message receive error: transaction not found`, message);\r\n\r\n        msgTran.removeTran(head.trid);\r\n        logger.debug(`postMessage <<- ${head.type}`, message);\r\n\r\n        if(!body) return tran.reject(errorMessage('invalid body data', message));\r\n        if(body.error) tran.reject(body.error);\r\n        else {\r\n            tran.resolve(body.result);\r\n        }\r\n    };\r\n    /**\r\n     * 네이티브에서 바든 이벤트 수행\r\n     * @param {AppBridgeMessage} message \r\n     */\r\n    const postEvent = message=> {\r\n        const {head, body} = message;\r\n        if(!head || !body) return logger.error(`event error: invalid param`, message);\r\n\r\n        const triggers = events.get(head.type);\r\n        if(!triggers || !triggers.length) return;\r\n\r\n        logger.debug(`call event <<- ${head.type}`, message);\r\n        Promise.all(triggers.map(listener=> new Promise((resolve, reject)=> listener({resolve, reject, result:body.result}))))\r\n            .then(rs=> {\r\n                console.log('---------------', rs);\r\n            });\r\n        // triggers.map(listener=> new Promise((resolve, reject)=> listener({result, resolve, reject})));\r\n    };\r\n\r\n    return Object.assign(global, {receiveMessage, postEvent});\r\n};\r\n/**\r\n * 메시지 트랜젝션을 관리할 객체\r\n * @param {Map<string, BridgeMessageTrigger>} transactions \r\n * @param {number} seq \r\n */\r\nconst getMessageTransaction = (transactions, seq=0)=> {\r\n    const addTran = trigger=> {\r\n        const trid = (new Date().getTime() + '') + (seq++);\r\n        transactions.set(trid, trigger);\r\n        return trid;\r\n    };\r\n    const getTran = trid=> transactions.get(trid);\r\n    const removeTran = trid=> transactions.delete(trid);\r\n    return {addTran, getTran, removeTran};\r\n};\r\nconst getMocObject = ({local})=> {\r\n    local.setGroups('bridge-message', 'bridge-event');\r\n\r\n    /**\r\n     * 메시지 더미값 세팅\r\n     * @param {string} type 메시지 타입\r\n     * @param {AppBridgeMessageBody} body 메시지 바디\r\n     */\r\n    const addMessage = (type, body)=> {\r\n        const {result=null, error} = body || {};\r\n        local.bridgeMessage.addItems({[type]: {result, error}});\r\n    };\r\n    /**\r\n     * 메시지 바디 더미값 반환\r\n     * @param {string} type 메시지 타입\r\n     * @returns {AppBridgeMessageBody}\r\n     */\r\n    const readMessageBody = type=> {\r\n        const data = local.bridgeMessage[type];\r\n        return /^(?:\\{.*\\}|\\[.*\\])$/.test(data) ? JSON.parse(data) : data;\r\n    };\r\n\r\n    const addEvent = type=> local.bridgeEvent.addItems({[type]: {result:null}});\r\n    return {addMessage, readMessageBody, addEvent};\r\n};\r\n\r\n\r\n/**\r\n * @typedef {{resolve(v: any)=>void, reject(v: any)=>void}} BridgeMessageTrigger\r\n * \r\n * @typedef {object} NativeBridge\r\n * @property {(v: string)=> void} postMessage {@link getNativeAos} {@link getNativeIos} {@link getNativeMock} 웹=> 네이티브 메시지 전송\r\n * @property {(v: string)=> void} receiveEvent {@link getNativeAos} {@link getNativeIos} {@link getNativeMock} 웹=> 네이티브 이벤트 처리 응답\r\n * @property {(v: AppBridgeMessage)=> void} receiveMessage {@link getNativeWeb} 네이티브=> 웹 메시지 처리 응답\r\n * @property {(v: AppBridgeMessage)=> void} postEvent {@link getNativeWeb} 네이티브=> 웹 이벤트 전송\r\n * \r\n * @typedef {object} BridgeMock\r\n * @property {(type: string, body: AppBridgeMessageBody)=> void} addMessage {@link getMocObject} 메시지 더미값 세팅\r\n * @property {(type: string)=> AppBridgeMessageBody} readMessageBody {@link getMocObject} 메시지 바디 더미값\r\n * @property {(type: string)=> void} addEvent {@link getMocObject} 메시지 바디 더미값\r\n * \r\n * @typedef {object} BridgeMessageTran\r\n * @property {(trigger: BridgeMessageTrigger)=> string} addTran {@link getMessageTransaction} 트랜젝션 추가 후 트랜잭션 아이디 반환\r\n * @property {(trid: string)=> BridgeMessageTrigger} getTran {@link getMessageTransaction} 트랜잭션 조회\r\n * @property {(trid: string)=> void} removeTran {@link getMessageTransaction} 트랜잭션 삭제\r\n * \r\n * @typedef {object} BridgeAdapter\r\n * @property {IAppLogger} logger\r\n * @property {'aos'|'ios'|'mob'|'hpg'} osType os 타입\r\n * @property {*} global 글로벌 네이티브 객체\r\n * @property {NativeBridge} native 네이티브 브릿지 객체\r\n * @property {Map<string, AppBridgeMessageBody>} messages 등록된 메시지 목록\r\n * @property {Map<string, Array<(v: any)=> void>>} events 등록된 이벤트 목록\r\n * @property {BridgeMock} mock 네이티브 모깅 처리\r\n * @property {BridgeMessageTran} msgTran 메시지 거래 관리\r\n * \r\n * 네이티브 브릿지\r\n * @param {App} app\r\n */\r\nmodule.exports = (app, {utils}=app)=> {\r\n    const logger = app.logger('sys|bridge', 'background:darkgrey;color:white;');\r\n    /**@type {BridgeAdapter} */\r\n    const adapter = {\r\n        logger,\r\n        osType: undefined,\r\n        global: undefined,\r\n        messages: new Map,\r\n        events: new Map,\r\n        mock: getMocObject(app.storage),\r\n        msgTran: getMessageTransaction(new Map),\r\n        native: {\r\n            postMessage: undefined, receiveEvent: undefined,\r\n            receiveMessage: undefined, postEvent: undefined\r\n        },\r\n    };\r\n    const bridge = name=> {\r\n        const {native} = adapter;\r\n\r\n        if(window[name]) { // aos\r\n            adapter.type = os.aos;\r\n            adapter.global = window[name];\r\n            Object.assign(native, getNativeAos(adapter));\r\n        } else {\r\n            adapter.global = window[name] = {};\r\n\r\n            if(window.webkit) { // ios\r\n                adapter.type = os.ios;\r\n                Object.assign(native, getNativeIos(adapter));\r\n            } else { // web\r\n                adapter.type = /android|ios|ipad/i.test(navigator.userAgent) ? os.mob : os.hpg;\r\n                Object.assign(native, getNativeMock(adapter));\r\n            }\r\n        }\r\n        Object.assign(native, getNativeWeb(adapter));\r\n    };\r\n\r\n    return utils.mixin(bridge, {\r\n        osType: { get: _=> adapter.type },\r\n        addMessage(type, body={payload:undefined, result:undefined}) {\r\n            const {messages, mock} = adapter;\r\n\r\n            const name = utils.camelCase(type);\r\n            if(messages.has(name)) {\r\n                return logger.warn(`containd bridge(${type} ->> ${name})`), this;\r\n            }\r\n\r\n            // 프로퍼티 추가\r\n            utils.mixin(this, {[name](payload) {\r\n                return this.postMessage(name, payload);\r\n            }});\r\n            logger.debug(`add message ->> ${name}`, body);\r\n\r\n            // 메시지 등록\r\n            messages.set(name, body);\r\n            // 모깅을 위한 등록\r\n            mock.addMessage(name, body);\r\n            return this;\r\n        },\r\n        postMessage(type, payload=null) {\r\n            const {messages, msgTran, native} = adapter;\r\n\r\n            if(!native) return Promise.reject(errorMessage('undefined native object'));\r\n            if(!type) return Promise.reject(errorMessage('invalid param: required message type'));\r\n\r\n            /** 메시지 발리데이션 */\r\n            const _validation = (compare, target, source, path=[])=> {\r\n                if(!target) return;\r\n                if(!utils.isObject(target)) {\r\n                    path.pop(); return;\r\n                }\r\n\r\n                return Object.entries(target).reduce((invalid, [ky, vl])=> {\r\n                    if(invalid) return invalid;\r\n                    if(!vl) return;\r\n\r\n                    path.push(ky)\r\n                    if(undefined === source[ky] || null === source[ky]) {\r\n                        return errorMessage(`required [${path.join('.')}]`, compare);\r\n                    }\r\n\r\n                    return _validation(compare, vl, source[ky], path);\r\n                }, undefined);\r\n            };\r\n\r\n            return new Promise((resolve, reject)=> {\r\n                // 메시지 발리데이션\r\n                const {payload:compare} = messages.get(type);\r\n                const invalidate = _validation({compare, payload}, compare, payload);\r\n                if(invalidate) return reject(invalidate);\r\n\r\n                // 트렌젝션 기록\r\n                const trid = msgTran.addTran({resolve, reject});\r\n                const message = {head: {trid, type}, body:{payload}};\r\n\r\n                // 메시지 전송\r\n                logger.debug(`postMessage ->> ${type}`, message);\r\n                native.postMessage(JSON.stringify(message));\r\n            });\r\n        },\r\n        getMessages() {\r\n            return [...adapter.messages.entries()];\r\n        },\r\n\r\n\r\n        addEventListener(type, listener) {\r\n            if(!type) return logger.error('invalid param: type');\r\n            if(!listener) return logger.warn('invalid param: listener');\r\n\r\n            const {events, mock} = adapter;\r\n            const listeners = events.get(type) || [];\r\n\r\n            listeners.push(listener);\r\n            if(listeners.length == 1) {\r\n                // 이벤트 등록\r\n                events.set(type, listeners);\r\n                // 모깅을 위한 등록\r\n                mock.addEvent(type);\r\n            }\r\n            return this;\r\n        },\r\n    });\r\n};\r\n\n\n//# sourceURL=webpack://front-end/./src/ex/bridge.js?");

/***/ }),

/***/ "./src/ex/logger.js":
/*!**************************!*\
  !*** ./src/ex/logger.js ***!
  \**************************/
/***/ ((module) => {

eval("/**\r\n * 로깅 처리\r\n * @param {App} app\r\n */\r\nmodule.exports = ({utils, storage:{session}})=> {\r\n    session.addItems({logLevel:''});\r\n\r\n    const empty = _=>_;\r\n    const words = ['', 'debug', 'out', 'warn', 'error'];\r\n    const aBreak = /^debug|out$/.test(session.logLevel) ? _=> {debugger} : empty;\r\n\r\n    return utils.mixin((label, style='font-weight:bold;')=> {\r\n        const levels = new Set;\r\n        const contains = vl=> {return levels.add(vl), levels.has(session.logLevel)};\r\n\r\n        const debug = contains(words[1]) ? console.log.bind(window, '%cdebug[%s]', style, label) : empty;\r\n        const out = contains(words[2]) ? console.info.bind(window, '%cout[%s]', style, label) : empty;\r\n        const warn = contains(words[3]) ? console.warn.bind(window, '%cwarn[%s]', style, label) : empty;\r\n        const error = console.error.bind(window, '%cerror[%s]', style, label);\r\n        return {debug, out, warn, error};\r\n    }, {\r\n        break: {get: aBreak},\r\n        level: {\r\n            get() {return session.logLevel},\r\n            set(v) {session.logLevel = words[v]}\r\n        }\r\n    });\r\n};\r\n\n\n//# sourceURL=webpack://front-end/./src/ex/logger.js?");

/***/ }),

/***/ "./src/ex/storage.js":
/*!***************************!*\
  !*** ./src/ex/storage.js ***!
  \***************************/
/***/ ((module) => {

eval("/**\r\n * 웹 스토리지\r\n * @param {App} app\r\n * @returns {AppStorage}\r\n */\r\nmodule.exports = ({utils})=> {\r\n    /**\r\n     * 웹 스토리지\r\n     * @param {Storage} storage \r\n     * @returns {AppStorageWeb}\r\n     */\r\n    const getStorage = storage=> utils.mixin(_=>_, {\r\n        addItems(attr) {\r\n            utils.isObject(attr) && Object.entries(attr)\r\n                .forEach(([k, v])=> addStorageItem(this, storage, '', k, v));\r\n        },\r\n        setGroups(...keys) {\r\n            keys.forEach(v=> {\r\n                const name = utils.camelCase(v);\r\n                // 그룹 속성 추가\r\n                if(!this.hasOwnProperty(name)) {\r\n                    utils.mixin(this, getStorageGroup(storage, name));\r\n                }\r\n            });\r\n        },\r\n        remove() {\r\n            return Object.keys(storage).forEach(v=> removeItem(storage, v));\r\n        }\r\n    });\r\n    /** 스토리지 아이템 속성 추가 */\r\n    const addStorageItem = (target, storage, dir, ky, vl)=> {\r\n        const name = utils.camelCase(ky);\r\n        const key = `[${dir}${dir ? '=' : ''}${utils.kebabCase(name)}]`;\r\n\r\n        // 아이템 속성 추가\r\n        if(!target.hasOwnProperty(name)) {\r\n            const get = _=> storage.getItem(key);\r\n            const set = v=> storage.setItem(key, /object/.test(typeof (v||'')) ? JSON.stringify(v) : v);\r\n            utils.mixin(target, {[name]: {get, set}});\r\n        }\r\n        // 스토리지에 값 저장\r\n        !target[name] && Object.assign(target, {[name]:vl});\r\n    };\r\n    /** 스토리지 그룹*/\r\n    const getStorageGroup = (storage, prop)=> {\r\n        const dir = utils.kebabCase(prop);\r\n        const group = utils.mixin(_=>_, {\r\n            addItems(attr) {\r\n                utils.isObject(attr) && Object.entries(attr)\r\n                    .forEach(([k, v])=> addStorageItem(this, storage, dir, k, v));\r\n            },\r\n            remove() {\r\n                return Object.keys(storage).forEach(v=> removeItem(storage, v, `${dir}=`));\r\n            }\r\n        });\r\n        return {[prop]: {get:_=>group}};\r\n    };\r\n    const removeItem = (storage, keyword, group='')=> {\r\n        if(RegExp(`^\\\\[${group}(?:.*[^\\\\]])\\\\]$`).test(keyword)) {\r\n            storage.removeItem(keyword);\r\n        }\r\n    };\r\n\r\n\r\n    const local = getStorage(localStorage);\r\n    const session = getStorage(sessionStorage);\r\n    const cookie = utils.mixin({}, {\r\n        setItem(ky, vl) {\r\n            document.cookie = `${ky}=${vl}; path=/; expries=${new Date()}`;\r\n        },\r\n        removeItem(ky) {\r\n            document.cookie = `${ky}=; path=/; expries=0`;\r\n        },\r\n        getItem(ky) {\r\n            let result;\r\n            const elements = document.cookie.split('; ');\r\n            while(result = elements.pop()) {\r\n                if(result.indexOf(ky) == 0) {\r\n                    return result.substring(ky.length + 1, result.length);\r\n                }\r\n            }\r\n        },\r\n    });\r\n    return Object.assign(_=>_, {local, session, cookie});\r\n};\r\n\n\n//# sourceURL=webpack://front-end/./src/ex/storage.js?");

/***/ }),

/***/ "./src/ex/utils.js":
/*!*************************!*\
  !*** ./src/ex/utils.js ***!
  \*************************/
/***/ ((module) => {

eval("/**\r\n * 유틸리티\r\n * @param {App} app\r\n */\r\nmodule.exports = app=> {\r\n    const isFunction = v=> (typeof v == 'function');\r\n    const isString = v=> (typeof v == 'string');\r\n    const isArray = v=> Array.isArray(v);\r\n    const isObject = v=> !isArray(v) && (typeof (v||'') == 'object');\r\n    const mixin = (target, src)=> Object.entries(src).reduce((target, [k, attr])=> {\r\n        return target[k] ? target : Object.defineProperty(target, k, isFunction(attr) ? {get:_=>attr} : attr);\r\n    }, target);\r\n\r\n    const snakeCase = v=> upperToDash(v, '_$1');\r\n    const kebabCase = v=> upperToDash(v, '-$1');\r\n    const camelCase = v=> dashToUpper(v).replace(/^\\w/, $0=> $0.toLowerCase());\r\n    const pascalCase = v=> dashToUpper(v).replace(/^\\w/, $0=> $0.toUpperCase());\r\n    const dashToUpper = v=> v.replace(/[_-](\\w)/g, (_, $1)=> $1.toUpperCase());\r\n    const upperToDash = (v, dash)=> v.replace(/([A-Z])/g, dash).toLowerCase().replace(/^[_-]/, '');\r\n\r\n    const YYYY='yyyy', MM='mm', DD='dd', HH='hh', MI='mi', SS='ss', MS='ms';\r\n    const formatDate = (format=`${YYYY}-${MM}-${DD} ${HH}:${MI}:${SS}.${MS}`, date=new Date)=>\r\n        format.replace(RegExp(`${YYYY}|${MM}|${DD}|${HH}|${MI}|${SS}|${MS}`, 'g'), v=> {\r\n            switch(v) {\r\n                case YYYY: return date.getFullYear();\r\n                case MM: return (date.getMonth()+1+'').padStart(2, '0');\r\n                case DD: return (date.getDate()+'').padStart(2, '0');\r\n                case HH: return (date.getHours()+'').padStart(2, '0');\r\n                case MI: return (date.getMinutes()+'').padStart(2, '0');\r\n                case SS: return (date.getSeconds()+'').padStart(2, '0');\r\n                case MS: return (date.getMilliseconds()+'').padStart(3, '0');\r\n                default: return '';\r\n            }\r\n        });\r\n    const formatNumber = (number=0)=> (number+'').replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');\r\n\r\n    return Object.assign(_=>_, {\r\n        mixin, isFunction, isString, isArray, isObject,\r\n        camelCase, pascalCase, snakeCase, kebabCase,\r\n        formatDate, formatNumber,\r\n    });\r\n};\r\n\n\n//# sourceURL=webpack://front-end/./src/ex/utils.js?");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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