bada.bindHtml('bridge-emulator', binder=> {
    const {bridge, utils} = bada;
    const logger = bada.logger(binder.id);
    const toJson = v=> utils.isString(v) ? v : JSON.stringify(v, '', '  ');

    const {vo:{saveData}} = binder;

    // 등록 된 이벤트 세팅
    const {vo:{eventList}} = binder;
    bridge.getEvents().forEach(type=> {
        const item = eventList.appendChild(binder.getTemplate('event-item'));
        item.setText({type});
        item.vo.type.event('click', _=> {
            eventType.text = type;
            eventType.addClass('on')
            messageType.text = '=== 브릿지 메시지 ===';
            messageType.removeClass('on');
            eventList.removeClass('on');

            if(bridge.mock) {
                saveData.value = toJson(bridge.mock.readEventBody(type));
            }
        });
    });

    // 이벤트 선택
    const {vo:{eventType}} = binder;
    eventType.event('click', _=> {
        if(eventList.hasClass('on')) eventList.removeClass('on');
        else {
            eventList.addClass('on');
        }
    });

    // 이벤트 저장
    const {vo:{eventSave}} = binder;
    eventSave.event('click', _=> {
        const type = eventType.text;
        if(/^===(?:.*)===$/.test(type)) return alert('이벤트 미선택');

        const param = saveData.value ? JSON.parse(saveData.value) : undefined;
        logger.out('param', param);

        if(bridge.mock) {
            bridge.mock.writeEventBody(type, param);
        }
    });

    // ===== 메시지 ====

    // 등록 된 메시지 세팅
    const {vo:{messageList}} = binder;
    bridge.getMessages().forEach(([type])=> {
        const item = messageList.appendChild(binder.getTemplate('event-item'));
        item.setText({type});
        item.vo.type.event('click', _=> {
            messageType.text = type;
            messageType.addClass('on')
            eventType.text = '=== 브릿지 이벤트 ===';
            eventType.removeClass('on')
            messageList.removeClass('on');

            if(bridge.mock) {
                saveData.value = toJson(bridge.mock.readMessageBody(type));
            }
        });
    });

    // 메시지 선택
    const {vo:{messageType}} = binder;
    messageType.event('click', _=> {
        if(messageList.hasClass('on')) messageList.removeClass('on');
        else {
            messageList.addClass('on');
        }
    });

    // 메시지 저장
    const {vo:{messageSave}} = binder;
    messageSave.event('click', _=> {
        const type = messageType.text;
        if(/^===(?:.*)===$/.test(type)) return alert('메시지 미선택');

        const param = saveData.value ? JSON.parse(saveData.value) : undefined;
        logger.out('param', param);

        if(bridge.mock) {
            bridge.mock.writeMessageBody(type, param);
        }
    });
});
