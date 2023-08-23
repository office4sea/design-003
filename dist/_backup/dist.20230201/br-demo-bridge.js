br.bindHtml('br-bridge', view=> {
    const logger = br.logger(view.id);

    // 메시지
    const {vo: {btnMsg}} = view;
    btnMsg.event('click', _=> {
        br.bridge.getVersion()
            .then(result=> {
                logger.out('결과', result);
            });
    });

    // 이벤트
    const {vo: {btnEvt}} = view;
    btnEvt.event('click', _=> {
        br.popup.alert
            .target(btnEvt)
            .open([
                '콘솔창에 입력하여 이벤트를 발생 시킵니다.',
                '이벤트가 발생 되면 Alert 창이 닫힙니다.<br/>',
                `<i>brNative.postEventStub('keyback')</i>`,
            ].join('<br/>'))
    });

    // 테스트 페이지
    const {vo: {btnTst}} = view;
    btnTst.event('click', _=> window.open('./bridge/test.html'));
});
