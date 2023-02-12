br.bindHtml('br-popup', view=> {
    const logger = br.logger(view.id);

    // alert
    const {vo: {btnAlert}} = view;
    btnAlert.event('click', _=> {
        br.popup.alert
            .target(btnAlert)
            .open('<strong>Alert</strong> 팝업 오픈')
            .then(_=> {
                logger.out('alert 팝업 종료');
            });
    });

    // Confirm
    const {vo: {btnConfirm}} = view;
    btnConfirm.event('click', _=> {
        br.popup.confirm
            .target(btnConfirm)
            .open('확인 후 <strong>Alert</strong> 팝업이 오픈 됩니다.')
            .then(yes=> {
                logger.out('confirm 팝업 종료', yes);

                if(!yes) return yes;
                else {
                    return br.popup.alert
                    .target(btnConfirm)
                    .open({
                        ok: '확인 하였음',
                        message: 'confirm 팝업이 종료 되었습니다.'
                    });
                }
            })
            .then(stat=> {
                logger.out('종료 팝업 대상', stat === undefined ? 'alert' : 'confirm');
            });
    });

    // Custom Confirm
    const {vo: {btnCustom}} = view;
    btnCustom.event('click', _=> {
        br.popup.confirm
            .target(btnCustom)
            .open({
                ok: '예',
                cancel: '아니오',
                message: 'confirm 팝업의 버튼 문구를 수정합니다.',
            });
    });

    // zipcode
    const {vo: {btnZipcode}} = view;
    br.loadScripts('popup/zipcode.js');
    btnZipcode.event('click', _=> {
        br.popup.zipcode
            .target(btnZipcode)
            .open()
            .then(result=> view.setValue(result));
    });
});
