bada({
    require: [
        '../../libs/bada-common.js',
        '../../libs/bada-bridge.js',
        '../../libs/bada-rtc-camera.js',
    ],
    scripts: [
        'call/call-info.js',
        'call/call-add.js',
    ],
    onLoad() {
        // bada.bridge.postJson('/v1/call/add', {});
        const {callInfo, callAdd} = bada.getBinder();
        
        bada.bridge.getJson('/v1/call/info/01012341234')
        .then(data=> {
            const {number} = data;
            if(number) callInfo.setValue(data).show();
            else {
                callAdd.setValue(data).show();
            }
        });
    },
});
