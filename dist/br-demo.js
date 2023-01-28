br.bindHtml('br-logger', (vo, view)=> {
    const logger = br.logger(view.id);

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
    btnDebug.checked = !!br.logger.level;
    btnDebug.event('click', _=> {
        br.logger.level = br.logger.level ? 0 : 1;
        br.logger.break;
        location.reload();
    });
});
