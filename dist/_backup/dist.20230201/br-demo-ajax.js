br.bindHtml('br-ajax', view=> {
    const logger = br.logger(view.id);

    // 데이터 요청
    const {vo: {btnFetch}} = view;
    btnFetch.event('click', _=> {
        const {vo: {urlOk}} = view;

        br.ajax.getJson(urlOk.value, {
            target: btnError
        })
            .then(result=> {
                logger.out(result);
            });
    });

    // 요청 오류
    const {vo: {btnError}} = view;
    btnError.event('click', _=> {
        const {vo: {urlError}} = view;

        br.ajax.getJson(urlError.value, {
            target: btnError
        })
            .then(result=> {
                logger.out(result);
            })
            .catch(reason=> logger.error(reason));
    });

    // 다건 요청
    const {vo: {btnMulti}} = view;
    btnMulti.event('click', _=> {
        const {vo: {urlOk}} = view;
        const {vo: {urlError}} = view;

        br.ajax.all([
            br.ajax.getJson(urlOk.value, {target: btnMulti}),
            br.ajax.getJson(urlError.value, {target: btnMulti})
        ])
            .then(result=> logger.out(result))
            .catch(reason=> logger.error(reason));
    });
});