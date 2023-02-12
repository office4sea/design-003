br.bindHtml('br-bridge', view=> {
    const logger = br.logger(view.id);

    // message 샘플
    const {vo: {btnMsg}} = view;
    btnMsg.event('click', _=> {
        br.bridge.getDeviceInfo({a:11})
            .then(result=>
                logger.out('bridge.getDeviceInfo', result))
            .catch(reason=>
                br.popup.alert.target(btnMsg).open(reason));
    });

    // event 샘플
    const {vo: {btnEvt}} = view;
    btnEvt.event('click', _=> {
        br.popup.alert.target(btnEvt)
            .open([
                '왼쪽 화살표키 입력 또는',
                '콘솔창에 입력하여 이벤트를 발생 시킵니다.',
                '이벤트가 발생 되면 Alert 창이 닫힙니다.<br/>',
                `<i>brNative.postEventStub('ArrowLeft')</i>`,
            ].join('<br/>'));
    });
});
