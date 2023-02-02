br(_=> {
    const logger = br.logger('br-init');
    logger.out('br 초기화 및 설정');

    // 팝업 설정
    // ====================
    // 팝업 엘리먼트 동적 추가
    br.popup.addPopupElement = loader=> {
        const _getHtmlNodes= innerHTML=>
            [...Object.assign(document.createElement('div'), {innerHTML}).children];

        return ((typeof loader == 'string') ? br.fetchText(loader) : loader)
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

    const waitHtml = br.fetchText('/dist/demo/popup/system-popup.html');
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
