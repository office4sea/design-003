// 샘플 폼1
bada.binder('sample-form1', binder=> {
    const logger = bada.logger(binder.name);
    logger.info('sample-form1 load');

    const {vo:{bridgeList, send, receive}} = binder;

    // 등록 브릿지 조회
    const stubBridge = bada.bridge.getStub();
    stubBridge.getMessages()
        .forEach(([command, v])=> bridgeList.appendChild(binder.getTemplate('bridge-item', item=> {
            const {vo:{toggle, structure}} = item;
            structure.text = v ? JSON.stringify(v, '', '  ') : '';

            toggle.text = command;
            toggle.event('click', _=> {
                if(structure.hasClass('on')) structure.removeClass('on');
                else {
                    structure.addClass('on');
                }
            });
        })));

    // 브릿지 단건
    const {vo:{bridgeOnce}} = binder;
    bridgeOnce.event('click', _=> {
        const payload = {url: '/v1/1234/1234', param: {a:1, b:1}};
        send.value = [
            'message: cmdSample2',
            `payload: ${JSON.stringify(payload)}`
        ].join('\n');

        bada.bridge.postMessage('cmdSample2', payload)
            .then(result=> {
                logger.info('bridgeOnce==>', result);
                receive.value = [
                    'message: cmdSample2',
                    `result: ${JSON.stringify(result)}`
                ].join('\n');
            })
            .catch(reason=> logger.error('bridgeOnce==>', reason));
    });

    // 브릿지 다건
    const {vo:{bridgeMulti}} = binder;
    bridgeMulti.event('click', _=> {
        // send bridge
        bada.bridge.postMessage('cmdSample1')
            .then(result=> logger.info('bridgeMulti1==>', result))
            .catch(reason=> logger.error('bridgeMulti1==>', reason));

        // send bridge2
        bada.bridge.postMessage('cmdSample2', {url: '/v1/1234/1234', param: {a:1, b:1}})
            .then(result=> logger.info('bridgeMulti2==>', result))
            .catch(reason=> logger.error('bridgeMulti2==>', reason));
    });

    // 브릿지 체인
    const {vo:{bridgeChain}} = binder;
    bridgeChain.event('click', _=> {
        bada.bridge.cmdSample1()
            .then(result=> {
                logger.info('bridgeChain1==>', result);
                return bada.bridge.cmdSample2({
                    url: '/v1/1234/1234', param: {a:1, b:1}
                });
            })
            .then(result=> logger.info('bridgeChain2==>', result))
            .catch(reason=> logger.error('bridgeChain==>', reason));
    });

    // 미등록 브릿지
    const {vo:{bridgeError}} = binder;
    bridgeError.event('click', _=> {
        bada.bridge.postMessage('cmdSample11')
            .then(result=> logger.info('bridgeError==>', result))
            .catch(reason=> logger.error('bridgeError==>', reason));

        bada.bridge.cmdSample11()
            .then(result=> logger.info('bridgeError==>', result))
            .catch(reason=> logger.error('bridgeError==>', reason));
    });
});
