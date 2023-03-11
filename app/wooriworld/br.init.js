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
        location.href= app.page.root + (/^\//.test(path) ? path : `/${path}`);
    };
    app.page.progress= {
        on() {
            this._progress= this._progress || document.getElementById('progress');
            if(!this._progress) {
                this._progress= document.body.appendChild(document.createElement('div'));
                this._progress.id= 'progress';
            }

            this._progress.classList.remove('d-none');
        },
        off() {
            this._progress.classList.add('d-none');
        },
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
    // 데이터 처리 요청
    app.bridge.fetchJson= ({url, payload={}}= {})=> {
        app.page.progress.on();
        return _fetchJson().then(v=> {
            return app.page.progress.off(), v;
        });
        
        function _fetchJson() {
            if(br.bridge.isApp) return br.bridge.postMessage('fetchJson', {url, payload});
            else {
                return fetch([app.page.root, url, '.json'].join('')).then(rs=> rs.json())
                .then(result=> {
                    if(/name-card\/get-list$/.test(url)) return result[payload.next || 'result0'];
                    return result;
                });
            }
        }
    };
});
