/**
 * @typedef {object} VoncApp
 * @property {BrBridge & VoncBridge} bridge 브릿지
 * @property {BrLogger} logger 디버깅 로그
 * @property {BrBindHtml} bindHtml HTML 바인더
 * @property {BrPopup} popup 팝업
 * @property {BrAjax} ajax 데이터 요청
 * @property {VoncPage} page 페이지 유틸리티
 * @property {(focus: HTMLElement, v: string)=> Promise<undefined>} alert 얼럿 팝업
 * 
 * @typedef {object} VoncBridge
 * @property {VoncBridge_setData} setData 앱내 데이터 저장
 * @property {VoncBridge_getData} getData 앱내 데이터 취득
 * @property {()=> Promise<boolean>} isMember 회원승인여부(로그인 여부)
 * @property {(v: {id: string, pwd: string})=> Promise<null>} memberVerify 회원여부 확인(로그인 승인)
 * @property {(v: {url: string, payload?: object})=> Promise<any>} fetchJson 데이터 처리 요청
 * 
 * @typedef {VoncBridge_setDataC & VoncBridge_setDataP} VoncBridge_setData 앱내 데이터 저장
 * @typedef {(key: string, value:string)=> Promise<null>} VoncBridge_setDataC
 * @typedef {object} VoncBridge_setDataP
 * @property {(v:'Y'|'N')=> Promise<null>} hasMemberCert 접근권한(자동로그인)
 * 
 * @typedef {VoncBridge_getDataC & VoncBridge_getDataP} VoncBridge_getData 앱내 데이터 취득
 * @typedef {(key: string, value:string)=> Promise<null>} VoncBridge_getDataC
 * @typedef {object} VoncBridge_getDataP
 * @property {()=> Promise<'Y'|'N'|null>} hasMemberCert 접근권한(자동로그인)
 * 
 * @typedef {object} VoncPage
 * @property {string} root 페이지 루트
 * @property {(path: string)=> void} move 페이지 이동
 * @property {{on: ()=> void, off: ()=> void}} progress 프로그래스바 처리
 */
