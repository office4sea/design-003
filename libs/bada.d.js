// ===== App =====
/**
 * @typedef {object} App App
 * @property {AppUtils} utils
 * @property {AppStorage} storage
 * @property {AppLogger} logger
 * @property {AppBindHtml} bindHtml
 * @property {AppBridge} bridge
 */

// ===== AppUtils =====
/**
 * @typedef {object} AppUtils
 * @property {(target: object, attr: {[k: string]: PropertyDescriptor & ThisType<any>})=> object} mixin 불변 속성 추가
 * @property {(v: string)=> string} camelCase camelCase
 * @property {(v: string)=> string} pascalCase PascalCase
 * @property {(v: string)=> string} snakeCase snake_case
 * @property {(v: string)=> string} kebabCase kebab-case
 * @property {(format?: string, date?: Date)=> string} formatDate 날짜 포멧
 * @property {(v: number|string)=> string} formatNumber 숫자 콤마
 * @property {(v: any)=> boolean} isFunction 함수 여부
 * @property {(v: any)=> boolean} isString 스트링 여부
 * @property {(v: any)=> boolean} isArray 배열 여부
 * @property {(v: any)=> boolean} isObject 객체 여부
 */

// ===== AppStorage =====
/**
 * @typedef {object} AppStorage
 * @property {AppStorageWeb} local
 * @property {AppStorageWeb} session
 * @property {AppStorageCookie} cookie
 * 
 * @typedef {AppStorageGroup & {[k: string]: AppStorageGroup, setGroups(...v: string): void}} AppStorageWeb
 * @typedef {object} AppStorageGroup
 * @property {()=> void} remove
 * @property {(v: Object<string, any>)=> void} addItems
 * 
 * @typedef {object} AppStorageCookie
 * @property {(k: string, v: string)=> void} setItem
 * @property {(k: string)=> string} getItem
 * @property {(k: string)=> void} removeItem
 */

// ===== AppLogger =====
/**
 * @typedef {{(label: string, style?: string)=> IAppLogger, level: AppLogLevels, break: void}} AppLogger
 * @typedef {object} IAppLogger
 * @property {void} break 스택 브레이크
 * @property {(...v: any)=> void} debug
 * @property {(...v: any)=> void} out
 * @property {(...v: any)=> void} warn
 * @property {(...v: any)=> void} error
 * 
 * @typedef {0|1|2|3} AppLogLevels 로그레벨: 0-미사용 > 1-debug > 2-out > 3-warn > error
 */

// ===== AppBindHtml =====
/**
 * @typedef {{(id: string, onBind: (binder: AppHtmlBinder)=> void)=> void, [k: string]: AppHtmlBinder}} AppBindHtml
 * @typedef {HTMLElement & IAppHtmlBinder} AppHtmlBinder
 * @typedef {object} IAppHtmlBinder
 * @property {(name: string, onCreate:(binder: AppHtmlBinder)=> void)=> AppHtmlBinder} getTemplate 템플릿(data-template) 객체 반환
 * @property {Object<string, AppBindHtmlVo>} vo html vo 객체
 * @property {(v: Object<string, string>)=> AppHtmlBinder} setText vo객체에 TEXT 출력
 * @property {()=> Object<string, string>} getText vo객체로 부터 TEXT 값 취득
 * @property {(v: Object<string, string>)=> AppHtmlBinder} setHtml vo객체에 HTML 마크업 적용
 * @property {()=> Object<string, string>} getHtml vo객체로 부터 HTML 값 취득
 * @property {(v: Object<string, string>)=> AppHtmlBinder} setValue vo객체에 value 값 세팅
 * @property {()=> Object<string, string>} getValue vo객체로 부터 value 값 취득
 * @property {(name: string)=> boolean} hasClass 클래스 확인
 * @property {(...name: string)=> AppHtmlBinder} addClass 클래스 추가
 * @property {(...name: string)=> AppHtmlBinder} removeClass 클래스 삭제
 * 
 * @typedef {HTMLElement & HTMLInputElement & IAppBindHtmlVo} AppBindHtmlVo
 * @typedef {object} IAppBindHtmlVo
 * @property {string} text TEXT 입/출력
 * @property {string} html HTML 마크업 입/출력
 * @property {()=> AppBindHtmlVo} empty 노드 비우기
 * @property {(type: keyof HTMLElementEventMap, listener: (event: Event)=> void)=> AppBindHtmlVo} event 이벤트 등록
 * @property {(name: string)=> boolean} hasClass 클래스 확인
 * @property {(...name: string)=> AppBindHtmlVo} addClass 클래스 추가
 * @property {(...name: string)=> AppBindHtmlVo} removeClass 클래스 삭제
 */

// ===== AppBridge =====
/**
 * @typedef {IAppBridge & {(native: string)=> void, [bridge: string]: (param: any)=> Promise<any>}} AppBridge
 * @typedef {object} IAppBridge
 * @property {'hpg'|'mob'|'aos'|'ios'} osType hpt-데스크탑, mob-모바일, aos-안드로이드, ios-아이폰
 * @property {(type: string, body: AppBridgeMessageBody)=> AppBridge} addMessage 메시지 설정 등록
 * @property {()=> Array<[message: string, body:AppBridgeMessageBody]>} getMessages 등록된 메시지 목록
 * @property {(type: string, param?: any)=> Promise} postMessage 메시지 요청
 * @property {(type: string, listener: (param?: any)=> void)=> AppBridge} addEventListener 이벤트 리스너 등록
 * @property {()=> Array<string>} getEvents 등록된 이벤트 목록
 * @property {(type: string)=> void} eventMocking 이벤트 모깅
 * @property {AppBridgeMock} mock 브릿지 mock 객체
 * 
 * 
 * @typedef {object} AppBridgeMock
 * @property {()=> void} clearMessages 메시지 정리
 * @property {(message: string, body?: AppBridgeMessageBody)=> void} addMessage 모깅을 위한 메시지 등록
 * @property {(message: string)=> AppBridgeMessageBody} readMessageBody 메시지 바디 조회
 * @property {(message: string, body?: AppBridgeMessageBody)=> void} writeMessageBody 메시지 바디 저장
 * @property {(type: string)=> void} addEvent 모깅을 위한 이벤트 등록
 * @property {(type: string)=> AppBridgeMessageBody} readEventBody 이벤트 바디 조회
 * @property {(type: string, body?: AppBridgeMessageBody)=> void} writeEventBody 이벤트 바디 저장
 * 
 * @typedef {object} AppBridgeMessage 브릿지 메시지
 * @property {AppBridgeMessageHead} head 헤드
 * @property {AppBridgeMessageBody} body 바디
 * 
 * @typedef {object} AppBridgeMessageHead 메시지 헤드
 * @property {string} type 메시지 종류
 * @property {string=} trid 트렌젝션 아이디
 * 
 * @typedef {object} AppBridgeMessageBody 메시지 바디
 * @property {object=} error 오류
 * @property {object=} payload 요청 데이터
 * @property {object=} result 응답 데이터
 */

/**
 * 웹 어플리케이션
 * @type {App & {(name: string, attr: any)=> App}}
 */
const bada = (name, attr)=> {};
