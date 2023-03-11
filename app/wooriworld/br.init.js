/**@type {VoncApp} */
const app= br;

// 초기화 및 설정
app(_=> {
    app.bridge('voncNative');
    app.logger.level= br.bridge.isApp ? 0 : 1;
});

// 페이지 설정
app(_=> {
    app.page= {};
    app.page.root= /localhost|127.0.0.1/.test(location.hostname)?
        '/app/wooriworld':
        '/design-003/app/wooriworld';
    app.page.move= path=> {
        location.href= app.page.root+ /^\//.test(path) ? path : `/${path}`;
    };
});

// 브릿지 설정
app(_=> {
    // 앱내 데이터 저장
    app.bridge.setData= (key, value)=> {
        if(br.bridge.isApp) return br.bridge.postMessage('setData', {key, value});
        else {
            return Promise.resolve().then(_=> localStorage.setItem(`[bridge-web-data=${key}]`, value));
        }
    };

    // 앱내 데이터 취득
    app.bridge.getData= key=> {
        if(br.bridge.isApp) return br.bridge.postMessage('getData', {key});
        else {
            return Promise.resolve().then(_=> localStorage.getItem(`[bridge-web-data=${key}]`));
        }
    };

    // 회원승인여부
    app.bridge.isMember= _=> br.bridge.postMessage('isMember');
    // 회원여부 확인
    app.bridge.memberVerify= vl=> br.bridge.postMessage('memberVerify', vl);
});
