// 버튼 그룹
bada.binder('nav-bar', binder=> {
    const logger = bada.logger(binder.name);

    // 디버깅 모드 전환
    const {debugMode} = binder.vo;
    debugMode.text = bada.logger.level ? '디버깅 비활성화' : '디버깅 활성화';
    debugMode.event('click', _=> {
        bada.logger.level = bada.logger.level ? '' : 'debug';
        location.reload();
    });

    // 브릿지 네이티브
    const {bridgeNative} = binder.vo;
    bridgeNative.event('click', _=> {
        bada.binder.bridgeNative.show();
    });

    // 역브릿지(네이티브 -> 웹)
    const {bridgeWeb} = binder.vo;
    bridgeWeb.event('click', _=> {
    });
});

// 브릿지 네이티브
bada.binder('bridge-native', binder=> {
    const logger = bada.logger(binder.name);

    // 닫기
    const {vo:{close}} = binder;
    close.event('click', _=> binder.hide());

    // 브릿지 목록
    const {vo:{commnads, receiveData}} = binder;
    const stubBridge = bada.bridge.getStub();
    commnads.event('change', _=> {
        if(!commnads.value) return;

        receiveData.value = JSON.stringify(stubBridge.readMessage(commnads.value), '', '  ');
    });

    /**@override */
    binder.show=_=> {
        // ui 노출
        binder.addClass('active');
        logger.debug('--브릿지 건수--', commnads.children.length - 1);
        if(commnads.children.length > 1) return;

        stubBridge.getMessages()
        .forEach(value=> commnads.appendChild(
            binder.getTemplate('option-item', item=> Object.assign(item, {value, text: value}))
        ));
    };
    /**@override */
    binder.hide=_=>binder.removeClass('active');
});
