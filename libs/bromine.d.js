/**
 * @typedef {object} BrApp 어플리케이션 코어
 * @property {BrLogger} logger 디버깅 로그
 * @property {BrBindHtml} bindHtml HTML 바인더
 * @property {*} popup 팝업
 * @property {*} ajax 데이터 요청
 * @property {*} bridge 브릿지
 * 
 * @property {(v: ()=> void)=> void} ready 페이지 로드 완료
 * @property {(url: string)=> Promise<string>} fetchText text 데이터 요청
 * @property {(url: string)=> Promise<object>} fetchJson json 데이터 요청
 * @property {(url: string)=> Promise<Array<HTMLElement>>} loadHtml html 로더
 * @property {(urls: Array<string>)=> Promise<void>} loadScripts ~script 로더~
 */

// ========== BrLogger ==========
/**
 * @typedef {BrLoggerProperty & {(label: string, style?: string): BrLoggerItem}} BrLogger 디버깅 로그
 * @typedef {object} BrLoggerProperty
 * @property {0|1|2} level 로그 레벨
 * @property {void} break 브레이크 포인트
 * @typedef {object} BrLoggerItem
 * @property {(...v: any)=> void} out 로그 출력(레벨 1)
 * @property {(...v: any)=> void} warn 경고 출력(레벨 2)
 * @property {(...v: any)=> void} error 오류 출력
 */

// ========== BrBindHtml ==========
/**
 * @typedef {{(id: string, onBind: BrBindLoadEvent): BrBindView, [k: string]: BrBindView}} BrBindHtml HTML 바인더
 * @typedef {(view: BrBindView, vo: BrBindVoHandles)=> void} BrBindLoadEvent
 * @typedef {BrBindViewProerty & HTMLElement} BrBindView
 * @typedef {Object<string, BrBindVoHandle>} BrBindVoHandles
 * @typedef {BrBindVoHandleProperty & HTMLElement & HTMLInputElement} BrBindVoHandle vo 핸들 객체
 * 
 * @typedef {object} BrBindViewProerty
 * @property {BrBindVoHandles} vo vo 핸들 객체
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
 * @typedef {object} BrBindVoHandleProperty
 * @property {string} text 텍스트 인/아웃
 * @property {string} html HTML 인/아웃
 * @property {(name: string)=> boolean} hasClass 클래스 확인
 * @property {(...names: string)=> BrBindVoHandle} addClass 클래스 추가
 * @property {(...names: string)=> BrBindVoHandle} removeClass 클래스 삭제
 * @property {(type: keyof HTMLElementEventMap, listener: (event: Event)=> void)=> BrBindVoHandle} event 이벤트
 */

/**@type {BrApp & {(): void}} */
const br = _=>_;