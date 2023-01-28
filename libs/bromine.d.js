// ========== App ==========
/**
 * @typedef {object} BrApp 어플리케이션 코어
 * @property {BrLogger} logger 로거
 * @property {BrBindHtml} bindHtml HTML 바인더
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
 * @typedef {{(id: string, onBind: (vo: BrBindVoHandleMap, view: BrBindView)=> void): BrBindView, [k: string]: BrBindView}} BrBindHtml HTML 바인더
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

/**@type {BrApp & {(): void}} */
const br = _=>_;