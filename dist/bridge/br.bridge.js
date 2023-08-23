br(_=> {
    br.bridge('voncNative');
    br.logger.level= br.bridge.isApp ? 0 : 1;

    br.bridge.getVersion= _=> br.bridge.postMessage('getVersion');
});