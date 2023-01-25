Br.bindHtml('br-logger', (vo, view)=> {
    const logger = Br.logger(view.id);

    // 로그
    const {btnOut} = vo;
    btnOut.event('click', _=> logger.out('콘솔 로그를 출력 합니다.'));

    // 경고
    const {btnWarn} = vo;
    btnWarn.event('click', _=> logger.warn('콘솔 경고를 출력 합니다.'));

    // 오류
    const {btnError} = vo;
    btnError.event('click', _=> logger.error('콘솔 오류를 출력 합니다.'));

    // 디버그 활성화
    const {btnDebug} = vo;
    btnDebug.checked = !!Br.logger.level;
    btnDebug.event('click', _=> {
        Br.logger.level = Br.logger.level ? 0 : 1;
        Br.logger.break;
        location.reload();
    });
});
