/**@type {VoncApp} */
const app= br;

app(_=> {
    const logger= app.logger('app.init');
    const _el= (tag, opt={})=> Object.assign(document.createElement(tag), opt);

    // ===== 초기화 및 설정 =====
    app.bridge('voncNative');
    app.logger.level= br.bridge.isApp ? 0 : 1;

    app.alert= (focus, message)=> {
        if(app.popup.popupAlert) return app.popup.popupAlert.target(focus).open(message);
        else {
            return _createAlert().then(_=> {
                return app.popup.popupAlert.target(focus).open(message);
            });
        }

        function _createAlert() {
            return app.page.loadPopupLayer({
                html:`<div id="popup-alert" class="modal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div data-vo="message" class="modal-body text-center">Alert 메시지</div>
                        <div class="modal-footer">
                            <button data-vo="ok" type="submit" class="button button-primary">확인</button>
                        </div>
                    </div>
                </div>
                <div class="modal-backdrop"></div>
                </div>`
            })
            .then(_=> {
                app.popup('popup-alert', pi=> {
                    pi.view = br.bindHtml(pi.id, ({vo:{ok}})=> {
                        ok.event('click', _=> pi.close());
                    });
                    // 팝업 오픈 이벤트
                    pi.onOpen= message=> {
                        const custom = (typeof message == 'string') ? {message} : message;
                        pi.view.setHtml(Object.assign({ok: '확인'}, custom));
                    };
                });
            });
        }
    };

    // ===== 페이지 설정 =====
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
                this._progress= document.body.appendChild(_el('div', {id: 'progress'}));
            }

            this._progress.classList.remove('d-none');
        },
        off() {
            this._progress.classList.add('d-none');
        },
    };
    app.page.getPopupWrap= _=> {
        return document.getElementById('_popup') || document.body.appendChild(_el('div', {id: '_popup'}));
    };
    app.page.loadPopupLayer= ({html, url})=> {
        const _popup= app.page.getPopupWrap();
        return _getHtml().then(innerHTML=> _popup.appendChild(_el('div', {innerHTML})));

        function _getHtml() {
            if(html) return Promise.resolve(html);
            else {
                return fetch(app.page.root + url).then(rs=> rs.text());
            }
        }
    };

    // ===== 팝업 설정 =====
    app.popup.observable= isOpen=> {
        const popups = br.popup.getOpens();
        logger.out('popup:observable >>>>>', isOpen);
        _visibleLast(popups.pop(), isOpen);
        _visibleDown(popups.pop(), !isOpen);

        function _visibleDown(pi, isShow) {
            if(!pi) return;
            if(isShow) pi.view.removeClass('d-none');
            else {
                pi.view.addClass('d-none');
            }
        }
        function _visibleLast(pi, isShow) {
            if(!pi) return;
            if(isShow) {
                pi.view.addClass('d-block');
                pi.view.removeClass('fade');
                requestAnimationFrame(_=> {
                    const modal = pi.view.querySelector('.modal-dialog');
                    modal.tabIndex = 0;
                    modal.focus();
                });
            } else {
                pi.view.addClass('fade');
                setTimeout(_=> pi.view.removeClass('d-block'), 100);
            }
        }
    };

    // ===== 브릿지 설정 =====
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
