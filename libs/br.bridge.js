br(_=> {
    br.bridge('voncNative');
    br.logger.level= voncNative.isMock ? 1 : 0;

    br.bridge.getVersion= _=> br.bridge.postMessage('getVersion');
});