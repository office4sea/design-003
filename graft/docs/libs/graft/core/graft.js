(()=>{var e={566:e=>{const t={self:new Map,getTrid(e){const t="w"+((new Date).getTime()+this.self.size);return this.self.set(t,e),t},getTrigger(e){const t=this.self.get(e);return this.self.delete(e),t||{}}},r={self:void 0,useNative(){return!!this.self},postNative(e){this.self.postMessage(Object.assign({payload:{}},e))}},s=new Map;e.exports=e=>({mock:{set(e,t){if(s.has(e))return console.warn("이미 세팅된 기능 입니다.",new Error);s.set(e,t)},postMessage(e){if(!e)return console.error("메시지를 확인 하세요.",new Error);if(!e.command)return console.error('메시지를 확인 하세요. "command"는 필수 입력입니다.',new Error);const t=s.get(e.command);t&&t(e)}},setNative:e=>Object.assign(r,{self:e?e():void 0}),postMessage:e=>r.useNative()?new Promise(((s,o)=>{const n=t.getTrid({resolve:s,reject:o});r.postNative(Object.assign(e,{trid:n}))})):Promise.reject("네이트브 객체가 연결되어 있지 않습니다."),receiveMessage:e=>{if(!e||!e.trid)return console.error('메시지를 확인 하세요. "trid"는 필수 입니다.',new Error);t.getTrigger(e.trid).resolve(e.receive)}})},518:e=>{const t=(e,t,r)=>t?r.insertBefore(e,t):r.appendChild(e),r=e=>{const{classList:t}=e;return{has:e=>t.contains(e),remove(e){return s(e).forEach((e=>t.remove(e))),this},add(e){return s(e).forEach((e=>t.add(e))),this}}},s=e=>Array.isArray(e)?e:[e],o=(e,t)=>{const{name:r}=e;return r?[...document.querySelectorAll(`input[name=${r}]${t?":checked":""}`)]:e.checked?[e]:[]};e.exports=e=>({grafting:n=>{if(n.lot)return n;const i=((e,n)=>{const i={_eventMap:new Map};return Object.defineProperty(i,"text",(e=>({get:()=>e.textContent,set(t){e.textContent=t}}))(n)),Object.defineProperty(i,"html",(e=>({get:()=>e.innerHTML,set(t){e.innerHTML=t}}))(n)),Object.defineProperty(i,"value",(e=>({get(){const{value:t,type:r}=e;if(null==t)return"";if(/checkbox|radio/i.test(r)){const t=o(e,!0).map((e=>e.value));return/checkbox/i.test(r)?t:t.join("")}return t},set(t){const{value:r,type:n}=e;if(null!=r)if(/checkbox|radio/i.test(n)){const r=s(t);o(e).forEach((e=>e.checked=r.includes(e.value)))}else e.innerHTML=t}}))(n)),i.data=void 0,i.css=r(n),i.insert=(e,r)=>t(e,r,n),i.truncate=e=>((e,t)=>(e.innerHTML="",t))(n,i),i.event=(t,r)=>((e,t,r,{_eventMap:s},{log:o})=>{if(s.has(e))return o.debug(`중복 등록된 이벤트(${e}) 입니다.`,new Error);const[n]=e.split(".");n&&(r.addEventListener(n,t),s.set(e,t))})(t,r,n,i,e),i.removeEvent=e=>((e,t,{_eventMap:r})=>{if(!r.has(e))return;const[s]=e.split(".");s&&(t.removeEventListener(s,r.get(e)),r.delete(e))})(e,n,i),i.dataBind=t=>((e,{log:t})=>{const r=[...e.querySelectorAll("[data-bind]")].reduce(((e,t)=>{const{dataset:{bind:r}}=t;return e[r]?e:Object.assign(e,{[r]:t})}),{}),s=Object.create(r);return s.setText=e=>{if("object"!=typeof e)return t.debug("입력값을 객체로 전달 해주세요.",new Error);Object.entries(e).forEach((([e,t])=>{r[e]&&Object.assign(r[e].lot,{text:t})}))},s.getText=e=>Object.entries(r).reduce(((e,[t,r])=>Object.assign(e,{[t]:r.lot.text})),{}),s.setHtml=e=>{if("object"!=typeof e)return t.debug("입력값을 객체로 전달 해주세요.",new Error);Object.entries(e).forEach((([e,t])=>{r[e]&&Object.assign(r[e].lot,{html:t})}))},s.getHtml=e=>Object.entries(r).reduce(((e,[t,r])=>Object.assign(e,{[t]:r.lot.html})),{}),s.setValue=e=>{if("object"!=typeof e)return t.debug("입력값을 객체로 전달 해주세요.",new Error);Object.entries(e).forEach((([e,t])=>{r[e]&&Object.assign(r[e].lot,{value:t})}))},s.getValue=e=>Object.entries(r).reduce(((e,[t,r])=>Object.assign(e,{[t]:r.lot.value})),{}),s})(n,e),i})(e,n);return Object.assign(n,{lot:i})},insert:(e,r)=>t(e,r,document.body),query:(e,t=document)=>t.querySelector(e),queryAll:(e,t=document)=>[...t.querySelectorAll(e)]})},763:e=>{const t=["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hr","i","iframe","img","input","ins","kbd","label","legend","li","link","main","map","mark","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","small","source","span","strong","sub","summary","sup","svg","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr"];e.exports=e=>{const r={};return t.forEach((t=>((e,t,r)=>{const{html:s,utils:o}=e;t[r]=(...e)=>{const t=s.grafting(document.createElement(r));let n;return e.forEach((e=>{switch(!0){case"string"==typeof e:case"number"==typeof e:return Object.assign(t,{innerHTML:e});case"function"==typeof e:return setTimeout((r=>{Object.assign(e,{getView:()=>t}),e(t)}),100);case"object"==typeof e:return void(Array.isArray(e)?n=e:Object.entries(e).forEach((([e,r])=>t.setAttribute(o.kebabCase(e),r))))}})),n&&n.forEach((e=>t.appendChild(e))),t}})(e,r,t))),r}},523:e=>{e.exports=e=>{const t=e=>e,r="[graft-log]",s=sessionStorage.getItem(r),o="padding:0 4px 0 4px; border-radius:2px; font-weight:bold; color:#fff;",n=e=>"debug"==s?console.log.bind(window,"%cdebug",`${o} background:#adb5bd;`):t,i=e=>s?console.log.bind(window,"%cout",`${o} background:#6c757d;`):t,a={active:e=>sessionStorage.setItem(r,e),getLogger:(e,r="info")=>{const n={info:"#198754;",primary:"#0d6efd",danger:"#dc3545"}[r]||r;return s?console.log.bind(window,`%c${e}`,`background:${n}; ${o}`):t},addDebugger:e=>{Graft.import(e).then((e=>{eruda.init(),Object.assign(a,{debug:n(),out:i()})}))},debug:n(),out:i()};return a}},839:e=>{const t=new Map;e.exports=e=>({has:e=>t.has(e),run:(e,r)=>t.has(e)?(console.warn("제어자가 중복 됩니다.",new Error),Promise.reject("제어자가 중복 됩니다.")):new Promise(((s,o)=>{t.set(e,{resolve:s,reject:o}),r&&r()})),resolve:(e,r)=>{const s=t.get(e);s&&(t.delete(e),s.resolve(r))},reject:(e,r)=>{const s=t.get(e);s&&(t.delete(e),s.reject(r))}})},997:e=>{const t=(e,t)=>e.replace(/([a-z0-9])([A-Z])/g,t),r=e=>/[-_]/g.test(e)?e.toLowerCase().replace(/([_-]\w)/g,(e=>e[1].toUpperCase())).replace(/_/g,""):e;e.exports=e=>({clone:e=>Array.isArray(e)?e.slice(0):"object"==typeof e?Object.assign({},e):e,kebabCase:(e,r=!1)=>{const s=t(e,"$1-$2");return r?s.toUpperCase():s.toLowerCase()},snakeCase:(e,r=!1)=>{const s=t(e,"$1_$2");return r?s.toUpperCase():s.toLowerCase()},camelCase:e=>r(e).replace(/^[\w]/,(e=>e.toLowerCase())),pascalCase:e=>r(e).replace(/^[\w]/,(e=>e.toUpperCase()))})}},t={};function r(s){var o=t[s];if(void 0!==o)return o.exports;var n=t[s]={exports:{}};return e[s](n,n.exports,r),n.exports}(()=>{const e=r(523),t=r(997),s=r(518),o=r(763),n=r(839),i=r(566),a={self:void 0,log:void 0,utils:void 0,tag:void 0,html:void 0,suspend:void 0,bridge:void 0,ctrl:{},view:{}};class c{constructor(r){if(a.self)return console.warn("이미 생성된 인스턴스 입니다.",new Error),a.self;a.self=this,a.log=e(this),a.utils=t(this),a.suspend=n(this),a.bridge=i(this),a.html=s(this),a.tag=o(this),r&&r(this)}static get version(){return"1.0.0"}static getInstance(e){return new c(e)}static import(e){const t=new Date,r=Array.isArray(e)?e:[e];return Promise.all(r.map((e=>function(e){const r=document.createElement("script");return new Promise((s=>{if(!e)return s();r.src=`${e}${/\?/.test(e)?"":`?${t.getTime()}`}`,r.onload=e=>s(),r.onerror=t=>s(e),document.head.appendChild(r)}))}(e)))).then((e=>new Promise((e=>{requestAnimationFrame((t=>e()))}))))}static postMessage(e){a.bridge.receiveMessage(e)}get log(){return a.log}get utils(){return a.utils}get suspend(){return a.suspend}get bridge(){return a.bridge}get tag(){return a.tag}get html(){return a.html}get ctrl(){return a.ctrl}get view(){return a.view}exec(e){if("function"!=typeof e)throw"전달값을 확인 하세요.| 실행 프로시저가 존재하지 않거나 함수가 아닙니다.";e(this)}build(e=50){return new Promise((t=>{setTimeout((e=>t(this)),e)}))}}window.Graft=c})()})();
//# sourceMappingURL=graft.js.map