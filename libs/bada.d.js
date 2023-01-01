// ===== 기본 타입 =====
/**
 * @typedef {Object<string, string>} StringDataObject
 */

// ===== 웹 어플리 케이션 베이스 =====
/**
 * @typedef {object} App 어플리 케이션
 * @property {Utils} App.utils 유틸리티 객체
 * @property {WebStorage} App.storage 브라우저 스토리지 관리
 * @property {Binder} App.binder DOM 엘리먼트 바인더
 * @property {{(name: string)=> Bridge} & Bridge} App.bridge 네이티브 브릿지
 * @property {(label: string, style?: string)=> Logger} App.getLogger 로깅 객체 반환
 * @property {0|1|2|3} App.useLogger 로그 여부 설정
 * * 0: 비활성화
 * * 1: 시스템레벨
 * * 2: 사용자레벨
 * * 3: 경고
 * @property {()=> boolean} App.hasDepend 의존성 객체 폼함 여부
 * @property {(name:string, attribute: {get():any, set(v:any):void})=> App} App.property 프로퍼티 추가
 */

// ===== 유틸리티 =====
/**
 * @typedef {object} Utils 유틸리티
 * @property {(target: any, name: string, attribute: {get?(): any, set?(v: any): void})=> any} Utils.prop 객체 프로퍼티 추가
 * @property {(v: string='abcd')=> string} Utils.camelCase 카멜케이스
 * @property {(v: string)=> string} Utils.pascalCase 파스칼케이스
 * @property {(v: string)=> string} Utils.snakeCase 스네이크케이스
 * @property {(v: string)=> string} Utils.kebabCase 케밥케이스
 * @property {(format?: 'yyyy/mm/dd hh:mi:ss.ms', date=new Date)=> string} Utils.formatDate 날짜에 대한 포멧 형식 반환
 */

// ===== 웹스토리지 =====
/**
 * @typedef {{local: WebStorageCollection, session: WebStorageCollection, cookie: WebStorageCollection}} WebStorage 웹스토리지
 * 
 * @typedef {WebStorageInterface & Object<string, WebStorageItem>} WebStorageCollection 웹스토리지 콜렉션
 * 
 * @typedef {object} WebStorageInterface 웹스토리지 인터페이스
 * @property {(keys: string|Array<string>)=> void} WebStorageInterface.setKeys 키값 등록
 * @property {()=> void} WebStorageInterface.clear 스토리지 전체 공간 삭제
 * 
 * @typedef {object} WebStorageItem 웹스토리지 아이템 항목
 * @property {string} WebStorageItem.str 스트링값
 * @property {string} WebStorageItem.json JSON 객체
 * @property {()=> void} WebStorageItem.remove 스토리지 삭제
 */


// ===== 네이티브 브릿지 =====
/**
 * @typedef {object} Bridge 네이티브 브릿지
 * @property {(command: string, payload: any)=> Promise<any>} Bridge.postMessage 네이티브에 수행 명령에 대한 메시지 요청
 * @property {(command: string, struct: {payload: any, receive: any})=> Bridge} Bridge.addCommand 네이티브에서 수행 할 명령어 등록
 * @property {(command: string, listener: (receive: any)=> void)=> Bridge} Bridge.addEventListener 네이티브로 부터 호출 될 이벤트 리스너 등록
 * 
 * @typedef {{header: BridgeMessageHeader, body: any}} BridgePostMessage 브릿지 요청 메시지
 * 
 * @typedef {{header: BridgeMessageHeader, body: {result?: any, error?: any}}} BridgeReceiveMessage 브릿지 요청 결과 메시지
 * 
 * @typedef {object} BridgeMessageHeader 브릿지 요청 메시지 헤더
 * @property {string} BridgeMessageHeader.trid 트렌젝션 아이디
 * @property {string} BridgeMessageHeader.command 수행 명령
 */

// ===== 화면 엘리먼트 연결 =====
/**
 * @typedef {{(id:string, onBind?: (binder: BindHandle)=> void)=> void, [x: string]: BindHandle}} Binder 화면 엘리먼트 연결
 * 
 * @typedef {object} BindHandle 바인딩 핸들러
 * @property {string} BinderHandle.name 핸들러 이름
 * @property {HTMLElement} BinderHandle.el 바인딩된 엘리먼트
 * @property {Object<string, BindVoHandle>} BinderHandle.vo 연결(data-vo)된 컨트롤 엘리먼트 객체
 * @property {(v: StringDataObject)=> BindHandle} BinderHandle.setText 연결된 컨트롤 엘리먼트에 TEXT 출력
 * @property {()=> StringDataObject} BinderHandle.getText 연결된 컨트롤 엘리먼트에 입력된 TEXT 반환
 * 
 * @typedef {object} BindVoHandle 화면 컨트롤러
 * @property {HTMLElement} BindVoHandle.el 바인딩된 엘리먼트
 * @property {string} BindVoHandle.text TEXT 입/출력
 * @property {(type: keyof HTMLElementEventMap, listener: (event: Event)=> void)=> BindVoHandle} BindVoHandle.event 이벤트 등록
 */

// ===== 로깅객체 =====
/**
 * @typedef {object} Logger 로깅객체
 * @property {(level: 'global'|'info'|'warn')=> void} Logger.useLogger
 * @property {(...v: any)=> void} Logger.global 콘솔 로그(시스템) 출력
 * @property {(...v: any)=> void} Logger.info 콘솔 로그(사용자) 출력
 * @property {(...v: any)=> void} Logger.warn 콘솔 경고 출력(호출 스택 포함)
 * @property {(...v: any)=> void} Logger.error 콘솔 오류 출력(호출 스택 포함)
 * @property {()=> void} Logger.brake 디버그 모드(info 레벨)에서 중단점 설정
 */

/**
 * 웹 어플리케이션
 * @type {{(config?: any)=> App} & App}
 */
const bada = config=> {};
