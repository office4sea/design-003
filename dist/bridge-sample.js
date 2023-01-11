bada.bindHtml('sample-bridge', binder=> {
    const {bridge, utils} = bada;
    const logger = bada.logger(binder.id);
    const {vo:{payload, receive}} = binder;

    const toJson = v=> utils.isString(v) ? v : JSON.stringify(v, '', '  ');

    // 등록 된 브릿지 세팅
    const {vo:{bridgeMessages}} = binder;
    bridge.getMessages()
        .forEach(([text, {payload:v}])=> {
            const value = JSON.stringify(v, '', '  ') || '';
            bridgeMessages.appendChild(binder.getTemplate('message-item', ({vo:{message}})=> {
                Object.assign(message, {text}).event('click', _=>{
                    Object.assign(payload, {value});
                    Object.assign(selectedBridge, {text});
                    bridgeMessages.removeClass('on');
                });
            }));
        });

    // 브릿지 선택
    const {vo:{selectedBridge}} = binder;
    selectedBridge.event('click', _=> {
        if(bridgeMessages.hasClass('on')) bridgeMessages.removeClass('on');
        else {
            bridgeMessages.addClass('on');
        }
    });

    // 전송
    const {vo:{send}} = binder;
    send.event('click', _=> {
        const {text} = selectedBridge
        if(/=== selected ===/.test(text)) return alert('브릿지 미선택');

        bada.logger.break;
        const param = payload.value ? JSON.parse(payload.value) : undefined;
        logger.out('param', param);

        receive.value = '';
        bridge.postMessage(text, param)
            .then(result=> {
                logger.out('전송 결과', result);
                receive.value = toJson(result);
            })
            .catch(reason=> {
                logger.error('오류', reason);
                receive.value = '====error====\n' + toJson(reason);
            });
    });

    // 네이티브 이벤트 등록
    bada.bridge
    .addEventListener('keyup', param=> {
        logger.out('keyup event', param);
        receive.value = toJson(param);
    });
});

