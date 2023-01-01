
// const AppBridge = {
//     postMessage(param) {
//         const {trid, command, payload} = param;
//         const result = {trid};

//         setTimeout(_=> this.receiveMessage(result), 500);
//     },
//     receiveMessage() {},
// };
// bada.bridge.addMessage('getJson', (url, payload)=> {
//     // return bada.bridge.postMessage();
//     return {url, payload};
// });

bada.bridge('AppBridge')
    .addCommand('getJson', {
        payload: {
            url: '/v1/sample', // 접속 url
            payload: null && {}, // 전달 파라미터
        },
        receive: {
            result: null
        }
    })
    .addCommand('deviceInfo', {
        payload: null,
        receive: {
            result: {
                deviceId: '1234abcd',
                version: '0.0.1',
                os: {
                    type: 'aos',
                    version: '1.1.1',
                },
            },
        }
    });

bada.bridge.addEventListener('reverceCallback', (result)=> {
    console.log('reverceCallback', result);
});


bada.binder('sample-form1', binder=> {
    const {bridge, storage:{session}} = bada;
    const {vo, name} = binder;
    const logger = bada.getLogger(`binder.${name}`);

    logger.info('-', {binder, name});
    session.setKeys(['formSample', 'AbcAbcAbc']);

    vo.frm2.el.addEventListener('click', _=> {

        bridge.postMessage('deviceInfo')
        .then(result=> {
            logger.info('deviceInfo', {result});
            return bridge.postMessage('getJson', {});
        })
        .then(result=> {
            logger.info('getJson', {result})
        })
        .catch(reason=> logger.error('postMessage', {reason}));

    });
});

bada.binder('sample-form2', binder=> {
    const logger = bada.getLogger('sample-form2', 'color:red;');
    logger.info('-');
});
