br(_=> {
    const logger = br.logger('br-init');
    logger.out('br 초기화 및 설정');

    // 데이터 요청
    // ====================
    // ajax 기능 재정의
    br.ajax({
        getJson(url) {
            if(!url) return Promise.reject('getJson: invalid url');
            const custMessage = '처리가 지연되어 죄송합니다.<br/>잠시 후 다시 시도해 주세요.';
            return new Promise((resolve, reject)=> {
                setTimeout(_=> {
                    fetch(url).then(rs=> rs.json())
                    .then(result=> {
                        const {body, header: {error}} = result;
                        if(!error) resolve(body);
                        else {
                            logger.error('ajax.getJson:', {url, result});
                            const {code, message} = error;
                            reject(message ? `${message}(${code})` : `${custMessage}${code?`(${code})`:''}`);
                        }
                    })
                    .catch(error=> {
                        logger.error('ajax.getJson:', {url, error})
                        reject(custMessage);
                    });
                }, 1000);
            });
        },
    });

    // ajax 프로그래스바 설정
    br.ajax.progress = {
        on(loading) {
            if(loading) return;
            logger.out('----- 프로그래스 on -----', loading);
            this._visible(true);
        },
        off(loading) {
            if(loading) return;
            logger.out('----- 프로그래스 off -----', loading);
            this._visible(false);
        },

        _visible(isShow) {
            const ui = document.getElementById('ajax-progress');
            if(isShow) ui.classList.remove('d-none');
            else {
                ui.classList.add('d-none');
            }
        },
    };

    // 팝업 설정
    // ====================
    // 팝업 엘리먼트 동적 추가
    br.popup.addPopupElement = loader=> {
        const _getHtmlNodes= innerHTML=>
            [...Object.assign(document.createElement('div'), {innerHTML}).children];

        return ((typeof loader == 'string') ? br.ajax.getText(loader) : loader)
            .then(innerHTML=> _getHtmlNodes(innerHTML))
            .then(htmlNodes=> {
                const popups = document.getElementById('layer-popups');
                htmlNodes.forEach(v=> popups.appendChild(v));
            })
    };
    // 팝업 오픈/종료 이벤트 감지
    br.popup.observable= event=> {
        const {isOpen} = event;

        const last = event.popups.pop();
        const _visibleLast= isShow=> {
            if(!last) return;

            if(isShow) {
                last.view.addClass('d-block');
                last.view.removeClass('fade');
                requestAnimationFrame(_=> {
                    const modal = last.view.querySelector('.modal-dialog');
                    modal.tabIndex = 0;
                    modal.focus();
                });
            } else {
                last.view.addClass('fade');
                setTimeout(_=> last.view.removeClass('d-block'), 100);
            }
        };

        const down = event.popups.pop();
        const _visibleDown= isShow=> {
            if(!down) return;

            if(isShow) down.view.removeClass('d-none');
            else {
                down.view.addClass('d-none');
            }
        };

        logger.out('popup:observable >>>>>', event);
        _visibleDown(!isOpen);
        _visibleLast(isOpen);
    };

    const waitHtml = br.ajax.getText('/dist/demo/popup/system-popup.html');
    // 페이지 로드 완료 후 처리
    // ====================
    br.ready(_=> {
        // 시스템 팝업 엘리먼트 로드 완료
        br.popup.addPopupElement(waitHtml)
        .then(_=> {
            br.popup('alert', _popupAlert);
            br.popup('confirm', _popupConfirm);
        });
        /**@param {BrPopupItem} pi */
        const _popupAlert= pi=> {
            pi.view = br.bindHtml('popup-alert', ({vo:{ok}})=> {
                ok.event('click', _=> pi.close());
            });
            // 팝업 오픈 이벤트
            pi.onOpen= message=> {
                const custom = (typeof message == 'string') ? {message} : message;
                pi.view.setHtml(Object.assign({ok: '확인'}, custom));
            };
            // 팝업 종료 이벤트
            // pi.onClose= data=> {};
            // 브로드캐스트 수신자
            pi.onReceiver= data=> {};
        };

        /**@param {BrPopupItem} pi */
        const _popupConfirm= pi=> {
            pi.view = br.bindHtml('popup-confirm', ({vo:{ok, cancel}})=> {
                ok.event('click', _=> pi.close(true));
                cancel.event('click', _=> pi.close(false));
            });
            // 팝업 오픈 이벤트
            pi.onOpen= message=> {
                const custom = (typeof message == 'string') ? {message} : message;
                pi.view.setHtml(Object.assign({ok: '확인', cancel: '취소'}, custom));
            };
            // 팝업 종료 이벤트
            // pi.onClose= data=> {};
            // 브로드캐스트 수신자
            pi.onReceiver= data=> {};
        };
    });
});
