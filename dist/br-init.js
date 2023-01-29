// 초기화 및 설정
br(_=> {
    const logger = br.logger('global');
    logger.out('init bromine');

    // HTML 로더 재정의
    br.loadHtml = url=> {
        logger.out('HTML 로더 재정의', url);
        return fetch(url).then(rs=> rs.text());
    };
    // br.loadScript

    // ========== 팝업 설정 ==========
    const popupHtml = {
        alert: `<div id="popup-alert" class="modal">
            <div class="modal-container">
                <div class="modal-header">Alert</div>
                <div data-vo="message" class="modal-body">팝업 내용</div>
                <div class="modal-footer">
                    <button data-vo="ok">확인</button>
                </div>
            </div>
        </div>`,
        confirm: `<div id="popup-confirm" class="modal">
            <div class="modal-container">
                <div class="modal-header">Confirm</div>
                <div data-vo="message" class="modal-body">팝업 내용</div>
                <div class="modal-footer">
                    <button data-vo="cancel">취소</button>
                    <button data-vo="ok">확인</button>
                </div>
                <div class="modal-close">
                    <button data-vo="close">닫기</button>
                </div>
            </div>
        </div>`,
    };
    // 팝업 오픈/종료 이벤트 감지
    br.popup.observable = event=> {
        const last = event.popups.pop();
        const down = event.popups.pop();

        logger.out('popup:observable >>>>>', event);
        const {isOpen} = event;
        if(!isOpen) down && down.view.removeClass('none');
        else {
            down && down.view.addClass('none');
            last && requestAnimationFrame(_=> {
                const {view: {firstElementChild: target}} = last;
                target.tabIndex = 0;
                target.focus();
            });
        }
    };

    // Alert 팝업
    br.loadHtml({selector: '#layer-popup', html: popupHtml.alert})
        .then(_=> br.popup('alert', pi=> {
            pi.view =  br.bindHtml('popup-alert', view=> {
                view.vo.ok.event('click', _=> pi.close());
            });

            // 팝업 오픈 이벤트
            pi.onOpen = param=> {
                const custom = (typeof param == 'string') ? {message: param} : param;
                pi.view.setHtml(Object.assign({ok: '확인'}, custom));
                pi.view.addClass('active');
            };
            // 팝업 종료 이벤트
            pi.onClose = _=> pi.view.removeClass('active');

            // 이벤트 브로드케스팅 수신자
            pi.onReceiver = prm=> {
                logger.out('alert::onReceiver', prm);
                if((prm||{}).type == 'keyback') pi.close();
            };
        }));

    // Confirm 팝업
    br.loadHtml({selector: '#layer-popup', html: popupHtml.confirm})
        .then(_=> br.popup('confirm', pi=> {
            pi.view =  br.bindHtml('popup-confirm', view=> {
                view.vo.ok.event('click', _=> pi.close(true));
                view.vo.cancel.event('click', _=> pi.close(false));
                view.vo.close.event('click', _=> pi.close());
            });

            // 팝업 오픈 이벤트
            pi.onOpen = param=> {
                const custom = (typeof param == 'string') ? {message: param} : param;
                pi.view.setHtml(Object.assign({ok: '확인', cancel: '취소', close: '닫기'}, custom));
                pi.view.addClass('active');
            };
            // 팝업 종료 이벤트
            pi.onClose = _=> pi.view.removeClass('active');
        }));

    // ========== AJAX 설정 ==========
    // 로딩바 설정
    // br.ajax.progress = {on(){}, off(){}};

    // 거래 중계 설정
    // br.ajax.fetch

    // ========== 브릿지 설정 ==========
    // 브릿지 초기화
    br.bridge('brNative');

    // 브릿지 이벤트 수신 리스너 등록
    br.bridge.addEventListener('keyback', event=> {
        logger.out(`'keyback' 이벤트 수신`, event);
        // 팝업 객체에 이벤트 브로드캐스팅
        br.popup.brodcast({type: 'keyback'});
    });

    // 브릿지 메시지 전송
    br.bridge.getVersion = param=> {
        logger.out('bridge.getVersion');
        return br.bridge.postMessage('getVersion', param);
    };
});
