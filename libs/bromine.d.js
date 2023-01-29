// ========== App ==========
/**
 * @typedef {object} BrApp 어플리케이션 코어
 * @property {BrLogger} logger 로거
 * @property {BrBindHtml} bindHtml HTML 바인더
 * @property {BrPopup} popup 팝업
 * @property {BrBridge} bridge 브릿지
 * @property {BrAjax} ajax 데이터 통신
 * 
 * @property {(v: loadHtmlParam)=> Promise<void>} loadHtml html 로드
 * 
 * @typedef {object} loadHtmlParam
 * @property {string} selector 대상 엘리먼트 셀렉터
 * @property {string=} html 적용할 HTML 텍스트
 * @property {string=} url 적용할 HTML 경로
 */

// ========== BrLogger ==========
/**
 * @typedef {BrLoggerProperty & {(label: string, style?: string): BrLoggerInstance}} BrLogger 어플리케이션 로거
 * @typedef {object} BrLoggerProperty
 * @property {0|1|2} level 로그 레벨
 * @property {void} break 브레이크 포인트
 * @typedef {object} BrLoggerInstance
 * @property {(...v: any)=> void} out 로그 출력(레벨 1)
 * @property {(...v: any)=> void} warn 경고 출력(레벨 2)
 * @property {(...v: any)=> void} error 오류 출력
 */

// ========== BrBindHtml ==========
/**
 * @typedef {{(id: string, onBind: (view: BrBindView, vo: BrBindVoHandleMap)=> void): BrBindView, [k: string]: BrBindView}} BrBindHtml HTML 바인더
 * @typedef {BrBindViewProerty & HTMLElement} BrBindView
 * @typedef {object} BrBindViewProerty
 * @property {BrBindVoHandleMap} vo vo 핸들 객체
 * @property {(data: any)=> void} setText 텍스트 세팅
 * @property {()=> any} getText 텍스트 반환
 * @property {(data: any)=> void} setHtml HTML 세팅
 * @property {()=> any} getHtml HTML 반환
 * @property {(data: any)=> void} setValue Value값 세팅
 * @property {()=> any} getValue Value값 반환
 * @property {(name: string)=> boolean} hasClass 클래스 확인
 * @property {(...names: string)=> BrBindView} addClass 클래스 추가
 * @property {(...names: string)=> BrBindView} removeClass 클래스 삭제
 * @property {(name: string)=> BrBindView} getTemplate 템플릿 객체 반환
 * 
 * @typedef {Object<string, BrBindVoHandle>} BrBindVoHandleMap
 * @typedef {BrBindVoHandleProperty & HTMLElement & HTMLInputElement} BrBindVoHandle vo 핸들 객체
 * @typedef {object} BrBindVoHandleProperty
 * @property {string} text 텍스트 인/아웃
 * @property {string} html HTML 인/아웃
 * @property {(name: string)=> boolean} hasClass 클래스 확인
 * @property {(...names: string)=> BrBindVoHandle} addClass 클래스 추가
 * @property {(...names: string)=> BrBindVoHandle} removeClass 클래스 삭제
 * @property {(type: keyof HTMLElementEventMap, listener: (event: Event)=> void)=> BrBindVoHandle} event 이벤트
 */

// ========== BrPopup ==========
/**
 * @typedef {BrPopupProperty & BrPopupConstructor} BrPopup 팝업
 * @typedef {{(id: string, onInit: (v: BrPopupItem)=> void): BrPopupItem, [k: string]: BrPopupItem}} BrPopupConstructor
 * @typedef {object} BrPopupProperty
 * @property {(v: BrPopupEvent)=> void} observable 팝업 오픈/종료 감지 리스너
 * @property {(popups: Array<BrPopupItem>)=> void} brodcast 이벤트 브로드 캐스팅
 * 
 * @typedef {BrPopupItemProperty & BrPopupItemInterface} BrPopupItem
 * @typedef {object} BrPopupItemProperty
 * @property {string} id 팝업 아이디
 * @property {BrBindView} view 팝업 뷰 객체
 * @property {(v: HTMLElement | Event)=> BrPopupItem} target 포커스 타겟
 * @property {(v: any)=> Promise<any>} open 팝업 오픈
 * @property {(v: any, isResolve=true)=> void} close 팝업 종료 (isResolve: `false`일경우 오픈 리젝 처리 한다 기본값 `true`)
 * @typedef {object} BrPopupItemInterface
 * @property {(v: any)=> void=} onOpen 팝업 오픈시 호출되는 이벤트
 * @property {(v: any)=> void=} onClose 팝업 종료시 호출되는 이벤트
 * @property {(v: any)=> void=} onReceiver 브로드 캐스팅 수신 이벤트
 * 
 * @typedef {object} BrPopupEvent
 * @property {Array<BrPopupItem>} popups 활성화된 팝업 리스트
 * @property {boolean=} isOpen 오픈 상태
 * @property {boolean=} isClose 종료 상태
 */

// ========== BrBridge ==========
/**
 * @typedef {BrBridgeConstructor & BrBridgeProperty} BrBridge
 * @typedef {{(name: string): void, [k: string]: (param: any)=> Promise<any>}} BrBridgeConstructor
 * @typedef {object} BrBridgeProperty
 * @property {(type: string, param?: any)=> Promise<any>} postMessage 네이티브에 메시지 전달
 * @property {(type: string, listener: (evt: BrBridgeMessageBody))=> void} addEventListener 네이티브 이벤트 수신
 * 
 * @typedef {object} BrBridgeMessage
 * @property {BrBridgeMessageHeader} header 헤더
 * @property {BrBridgeMessageBody} body 헤더
 * @typedef {object} BrBridgeMessageHeader
 * @property {string} type 메시지 타입
 * @property {string=} trid 메시지 거래 아이디
 * @typedef {object} BrBridgeMessageBody
 * @property {any=} data 메시지 데이터
 * @property {BrBridgeMessageError=} error 메시지 오류
 * @typedef {object} BrBridgeMessageError
 * @property {string} message 오류 메시지
 * @property {any} reason 오류 세부 사유
 */

// ========== BrAjax ==========
/**
 * @typedef {object} BrAjax
 * @property {BrAjaxProgress & {(loading: boolean): BrAjax}} progress 프로그래스바
 * @property {(...v: any)=> Promise<any>} fetch 데이터 요청 중재자
 * @property {(v: Array<Promise>)=> Promise<any>} all 다건 비동기 요청
 * 
 * @typedef {object} BrAjaxProgress
 * @property {(stat: any)=> void} on 로딩바 노출
 * @property {(stat: any)=> void} off 로딩바 숨김
 */

/**@type {BrApp & {(): void}} */
const br = _=>_;