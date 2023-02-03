br.bindHtml('br-bridge', view=> {
    const logger = br.logger(view.id);

    // message 샘플
    const {vo: {btnMsg}} = view;
    btnMsg.event('click', _=> {
        br.bridge.getVersion({a:11})
            .then(result=>
                logger.out('bridge.getVersion', result))
            .catch(reason=>
                br.popup.alert.target(btnMsg).open(reason));
    });

    // event 샘플
    const {vo: {btnEvt}} = view;
    btnEvt.event('click', _=> {
        br.popup.alert.target(btnEvt)
            .open([
                '콘솔창에 입력하여 이벤트를 발생 시킵니다.',
                '이벤트가 발생 되면 Alert 창이 닫힙니다.<br/>',
                `<i>brNative.postEventStub('keyback')</i>`,
            ].join('<br/>'));
    });

    // 기능 확인
    const {vo: {btnMove}} = view;
    btnMove.event('click', _=> {
        location.href = '../bridge/launcher.html';
    });
});