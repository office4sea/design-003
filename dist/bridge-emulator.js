bada.binder('navigator', binder=> {
    const logger = bada.getLogger(binder.name);

    const {debugMode} = binder.vo;
    debugMode.text = bada.useLogger ? '로깅 비활성화' : '로깅 활성화';
    debugMode.event('click', _=> {
        bada.useLogger = bada.useLogger ? 0 : 1;
        location.reload();
    });

    const {bridgeNative} = binder.vo;
    bridgeNative.event('click', _=> {
        const {bridgeNative} = bada.binder;
        bridgeNative.show();
    });

    const {bridgeWeb} = binder.vo;
    bridgeWeb.event('click', _=> {
        const {bridgeNative} = bada.binder;
        bridgeNative.hide();
    });
});

bada.binder('bridge-native', binder=> {
    const logger = bada.getLogger(binder.name);

    /**@override */
    binder.show = _=> {
        logger.info('-show-');
        binder.el.style.display = 'block';
    };
    /**@override */
    binder.hide = _=> {
        binder.el.style.display = 'none';
    };
});
