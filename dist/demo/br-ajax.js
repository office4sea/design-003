br.bindHtml('br-ajax', view=> {
    const logger = br.logger(view.id);

    // 단건 요청
    const {vo: {btnOneData}} = view;
    btnOneData.event('click', _=> {
        br.ajax.getJson('/dist/ajax/data-ok.json')
            .then(result=> {
                logger.out('단건 요청 결과', result);
            })
            .catch(message=> br.popup.alert
                .target(btnOneData)
                .open({message}));
    });
    // 단건 오류
    const {vo: {btnOneError}} = view;
    btnOneError.event('click', _=> {
        br.ajax.getJson('/dist/ajax/data-ok1.json')
            .then(result=> {
                logger.out('단건 오류 결과', result);
            })
            .catch(message=> br.popup.alert
                .target(btnOneError)
                .open({message}));
    });

    // 다건 요청
    const {vo: {btnMultiData}} = view;
    btnMultiData.event('click', _=> {
        br.ajax.all([
            {url: '/dist/ajax/data-ok.json'},
            {url: '/dist/ajax/data-ok.json'},
            {url: '/dist/ajax/data-ok.json'},
        ])
        .then(result=> {
            logger.out('다건 요청 결과', result);
        })
        .catch(message=> br.popup.alert
            .target(btnMultiData)
            .open({message}));
    });
    // 다건 오류
    const {vo: {btnMultiError}} = view;
    btnMultiError.event('click', _=> {
        br.ajax.all([
            {url: '/dist/ajax/data-ok.json'},
            {url: '/dist/ajax/data-error.json'},
            {url: '/dist/ajax/data-ok.json'},
        ])
        .then(result=> {
            logger.out('다건 요청 결과', result);
        })
        .catch(message=> br.popup.alert
            .target(btnMultiError)
            .open({message}));
    });


    // 순차 요청
    const {vo: {btnChainData}} = view;
    btnChainData.event('click', _=> {
        br.ajax.getJson('/dist/ajax/data-ok.json')
        .then(result=> {
            logger.out('순차 요청1', result);
            return br.ajax.getJson('/dist/ajax/data-ok.json');
        })
        .then(result=> {
            logger.out('순차 요청2', result);
        })
        .catch(message=> br.popup.alert
            .target(btnChainData)
            .open({message}));
    });
    // 순차 오류
    const {vo: {btnChainError}} = view;
    btnChainError.event('click', _=> {
        br.ajax.getJson('/dist/ajax/data-ok.json')
        .then(result=> {
            logger.out('순차 요청1', result);
            return br.ajax.getJson('/dist/ajax/data-error.json');
        })
        .then(result=> {
            logger.out('순차 요청2', result);
        })
        .catch(message=> br.popup.alert
            .target(btnChainError)
            .open({message}));
    });
    // 순차 예외
    const {vo: {btnChainReject}} = view;
    btnChainReject.event('click', _=> {
        br.ajax.getJson('/dist/ajax/data-ok.json')
        .then(result=> {
            logger.out('순차 요청1', result);
            if(result.a == 1) return Promise.reject('요청 데이터 정합성 체크 실패');
            else {
                return br.ajax.getJson('/dist/ajax/data-ok.json');
            }
        })
        .then(result=> {
            logger.out('순차 요청2', result);
        })
        .catch(message=> br.popup.alert
            .target(btnChainReject)
            .open({message}));
    });
});
