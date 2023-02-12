br.bindHtml('br-popup', view=> {
    const logger = br.logger(view.id);

    // alert
    const {vo: {btnAlert}} = view;
    btnAlert.event('click', _=> {
        br.popup.alert
            .target(btnAlert)
            .open('<strong>얼럿</strong> 메시지')
            .then(_=> logger.out('alert 종료'));
    });

    // confirm
    const {vo: {btnConfirm}} = view;
    btnConfirm.event('click', _=> {
        br.popup.confirm
            .target(btnConfirm)
            .open('확인 후 <strong>alert</strong>이 호출 됩니다.')
            .then(yes=> {
                logger.out('confirm 종료');
                if(!yes) return Promise.reject(`confirm ${yes==false ? '취소' : '닫기'}로 종료`);

                return br.popup.alert
                    .target(btnConfirm)
                    .open({
                        message: 'confirm 확인 후 호출되는 <strong>alert</strong> 입니다.',
                        ok: '확인 하였음'
                    });
            })
            .then(_=> logger.out('alert이 종료 되었습니다.'))
            .catch(reason=> logger.error(reason));
    });

    // 주소검색
    const {vo: {btnZipcode}} = view;
    btnZipcode.event('click', _=> {
        br.popup.zipcode
            .target(btnZipcode)
            .open()
            .then(result=> {
                logger.out('팝업에서 전달 받은 값', result);
                result && view.setValue(result);
            })
            .catch(reason=> logger.error(reason));
    });
});
