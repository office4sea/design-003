// ===== 기본 타입 =====
/**
 * @typedef {object} PropertyAttribute
 * @property {()=> any} PropertyAttribute.get
 * @property {(vl: any)=> void} PropertyAttribute.set
 */

// ===== App =====
/**
 * @typedef {object} App App
 * @property {Utils} App.utils 유틸리티
 * @property {Bridge} App.bridge 네이티브 브릿지
 * @property {{session: WebStorage, local: WebStorage}} App.storage 스토리지
 * @property {{(label: string, style?: string)=> Logger, level: LoggerLevels}} App.logger 로그 출력용 객체 반환
 * @property {{(id: string, onBind?: (binder: Binder)=> void) => Binder, [k: string]: Binder}} App.binder 엘리먼트 바인더
 */

// ===== Utils =====
/**
 * @typedef {'yyyy-mm-dd' | 'hh:mi:ss' | 'yyyy-mm-dd hh:mi:ss.ms'} DateFormat
 * 
 * @typedef {object} Utils
 * @property {(v: string)=> string} Utils.camelCase 카멜케이스
 * @property {(v: string)=> string} Utils.pascalCase 파스칼케이스
 * @property {(v: string)=> string} Utils.snakeCase 스네이크케이스
 * @property {(v: string)=> string} Utils.kebabCase 케밥케이스
 * @property {(target: any, name: string, attr: ()=> void | PropertyAttribute)=> any} Utils.seal 변경 불가 속성 추가
 * @property {(format?: DateFormat, date=new Date)=> string} Utils.formatDate 날짜에 대한 포멧 형식 반환
 */

// ===== 스토리지 =====
/**
 * @typedef {StorageMain & {(...keys: string): StorageMain, [k: string]: StorageGroup}} WebStorage
 * 
 * @typedef {object} StorageMain
 * @property {()=> void} StorageMain.clear 스토리지 공간 삭제
 * @property {(...keys: string)=> StorageMain} StorageMain.setGroup 그룹 설정
 * 
 * @typedef {StorageItem & {(...keys: string): StorageGroup, clear(): StorageGroup, [k: string]: StorageItem}} StorageGroup
 * @property {string} StorageGroup.clear 그룹 공간 삭제
 * 
 * @typedef {object} StorageItem 스토리지 아이템
 * @property {string} StorageItem.str 스트링
 * @property {string} StorageItem.json JSON 객체
 * @property {()=> void} StorageItem.remove 항목 삭제
 * @property {()=> boolean} StorageItem.isEmpty 값존재 여부 확인
 */

// ===== 로깅 =====
/**
 * @typedef {0|1|2|3} LoggerLevels 출력할 로그 레벨 0-미사용 > 1-debug > 2-info > 3-warn > error
 * 
 * @typedef {object} Logger
 * @property {void} Logger.break 스택 브레이크
 * @property {(...arg: any)=> void} Logger.debug 디버그 로그 출력
 * @property {(...arg: any)=> void} Logger.info 정보 로그 출력
 * @property {(...arg: any)=> void} Logger.warn 경고 로그 출력
 * @property {(...arg: any)=> void} Logger.error 오류 로그 출력
 */

// ===== 엘리먼트 바인더 =====
/**
 * @typedef {object} Binder
 * @property {string} Binder.name 바인더 이름
 * @property {HTMLElement} Binder.el 바인딩된 엘리먼트
 * @property {(name: string, onCreate:(binder: Binder)=> void)=> Binder} Binder.getTemplate 템플릿(data-template) 객체 반환
 * @property {Object<string, BindVoHandle>} Binder.vo 연결(data-vo)된 컨트롤 엘리먼트 객체
 * @property {(v: Object<string, string>)=> Binder} Binder.setText 수집된 컨트롤에 TEXT 출력
 * @property {()=> Object<string, string>} Binder.getText 수집된 컨트롤에 입력된 TEXT 반환
 * @property {(v: Object<string, string>)=> Binder} Binder.setHtml 수집된 컨트롤에 HTML 마커블 적용
 * @property {()=> Object<string, string>} Binder.getHtml 수집된 컨트롤에 입력된 HTML 반환
 * @property {(v: Object<string, string>)=> Binder} Binder.setValue 수집된 컨트롤에 Value 값 출력
 * @property {()=> Object<string, string>} Binder.getValue 수집된 컨트롤에 입력된 Value 반환
 * @property {(...name: string)=> Binder} Binder.addClass 클래스 추가
 * @property {(...name: string)=> Binder} Binder.removeClass 클래스 삭제
 * @property {(name: string)=> boolean} Binder.hasClass 클래스 존재 여부
 * @property {()=> void} Binder.show 엘리먼트 노출
 * @property {()=> void} Binder.hide 엘리먼트 숨김
 * 
 * @typedef {HTMLElement & VoHandle} BindVoHandle 화면 컨트롤러
 * 
 * @typedef {object} VoHandle 화면 컨트롤러
 * @property {string} VoHandle.text TEXT 입/출력
 * @property {string} VoHandle.html HTML 마커블 입/출력
 * @property {()=> VoHandle} VoHandle.empty 내부 노드 비우기
 * @property {(type: keyof HTMLElementEventMap, listener: (event: Event)=> void)=> BindVoHandle} VoHandle.event 이벤트 등록
 * @property {(...name: string)=> VoHandle} VoHandle.addClass 클래스 추가
 * @property {(...name: string)=> VoHandle} VoHandle.removeClass 클래스 삭제
 * @property {(name: string)=> boolean} VoHandle.hasClass 클래스 존재 여부
 */

// ===== 네이티브 브릿지 =====
/**
 * @typedef {BridgeInterface & {(nativeName: string): Bridge, [k: string]: (param: any)=> Promise<any>}} Bridge 네이티브 브릿지
 * 
 * @typedef {object} BridgeInterface 브릿지 인터페이스
 * @property {boolean=} BridgeInterface.isWeb 웹 브라우저
 * @property {boolean=} BridgeInterface.isAos 안드로이드
 * @property {boolean=} BridgeInterface.isIos IOS
 * @property {()=> BridgeStub} BridgeInterface.getStub 브릿지 스터빙 객체
 * @property {(command: string, param?: object)=> Promise<any>} BridgeInterface.postMessage 브릿지 메시지 전달
 * @property {(command: string, payload?: object, receive?: object)=> Bridge} BridgeInterface.setMessage 브릿지 메시지 등록
 * @property {(eventType: string, listener: (param: any)=> void)=> Bridge} BridgeInterface.addEventListener 브릿지 이벤트 리스너 등록
 * 
 * @typedef {object} BridgeStub 브릿지 스텁
 * @property {()=> void} BridgeStub.clearMessages 메시지 커맨드 비우기
 * @property {()=> Array<string>} BridgeStub.getMessages 등록된 메시지 커맨드
 * @property {(command: string)=> BridgeMessageBody} BridgeStub.readMessage 메시지 결과 더미값 반환
 * @property {(command: string, result?: object, error?:object)=> void} BridgeStub.writeMessage 메시지 결과 더미값 반환
 * 
 * @typedef {object} BridgeMessage 브릿지 메시지
 * @property {BridgeMessageHead} BridgeMessage.head 헤드
 * @property {BridgeMessageBody} BridgeMessage.body 바디
 * 
 * @typedef {object} BridgeMessageHead 브릿지 메시지 헤드
 * @property {string} BridgeMessageHead.trid 트렌젝션 아이디
 * @property {string} BridgeMessageHead.command 요청 명령어
 * 
 * @typedef {object} BridgeMessageBody 브릿지 메시지 바디
 * @property {object=} BridgeMessageBody.error 오류
 * @property {object=} BridgeMessageBody.payload 메시지 요청 데이터
 * @property {object=} BridgeMessageBody.result 메시지 응답 데이터
 */

/**
 * 웹 어플리케이션
 * @type {{(config?: any)=> App} & App}
 */
const bada = config=> {};
