br(_=> {
    br.bridge('voncNative');
    br.logger.level= voncNative.isMock ? 1 : 0;
});