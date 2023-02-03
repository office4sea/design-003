br(_=> {
    const logger = br.logger('br-init');
    logger.out('br 초기화 및 설정');
    // 브릿지 설정
    // ====================
    // 브릿지 초기화
    br.bridge('brNative', [
        'getVersion'
    ], (stat, vl)=> {
        logger.warn('---브릿지 호출---', stat, vl);
    });

    // 브릿지 메시지에 대한 재정의
    br.bridge.getDeviceInfo = _=> {
        logger.out('bridge.getDeviceInfo');
        return br.bridge.postMessage('getDeviceInfo');
    };

    // 브릿지 이벤트 수신 리스너 등록
    br.bridge.addEventListener('keyback', event=> {
        logger.out(`'keyback' 이벤트 수신`, event);
        // 팝업 객체에 이벤트 브로드캐스팅
        br.popup.brodcast({type: 'keyback'});
    });

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
    br.popup.observable= isOpen=> {
        const popups = br.popup.getOpens();

        logger.out('popup:observable >>>>>', isOpen);
        _visibleLast(popups.pop(), isOpen);
        _visibleDown(popups.pop(), !isOpen);
    };
    const _visibleDown= (pi, isShow)=> {
        if(!pi) return;

        if(isShow) pi.view.removeClass('d-none');
        else {
            pi.view.addClass('d-none');
        }
    };
    const _visibleLast= (pi, isShow)=> {
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
            pi.onReceiver= data=> {
                logger.out('popup.alert 이벤트 수신', data);
                if(data.type == 'keyback') {
                    if(br.popup.getOpens().last == pi) pi.close();
                }
            };
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
