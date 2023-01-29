br.loadHtml({selector: '#layer-popup', url: 'br-demo-popup-zipcode.html'})
.then(_=> br.popup('zipcode', pi=> {
    const logger = br.logger(`popup-${pi.id}`);
    const zipList = [
        {zipCode: 11111, zipAddr: '서울 특별시 서초구 반포대로23길 11111'},
        {zipCode: 22222, zipAddr: '서울 특별시 서초구 반포대로23길 22222'},
        {zipCode: 33333, zipAddr: '서울 특별시 서초구 반포대로23길 33333'},
        {zipCode: 44444, zipAddr: '서울 특별시 서초구 반포대로23길 44444'},
        {zipCode: 55555, zipAddr: '서울 특별시 서초구 반포대로23길 55555'},
    ];

    pi.view = br.bindHtml('popup-zipcode', (view, vo)=> {
        // 닫기
        vo.close.event('click', _=> pi.close());
        // 검색
        vo.search.event('click', _=> {
            const {word} = vo;
            if(!word.value) return br.popup.alert
                .target(vo.search)
                .open('검색어를 입력 하세요.')
                .then(_=> word.focus());

            zipList.forEach(data=> {
                const item = view.getTemplate('addr-item');
                item.setText(data);

                item.vo.action.event('click', event=> {
                    event.preventDefault();

                    logger.out('선택된 주소', data);
                    pi.close(data);
                });

                vo.addr.appendChild(item);
            });
        });
    });

    // 팝업 오픈 이벤트
    pi.onOpen = _=> {
        const {view: {vo: {addr, word}}} = pi;
        word.value = addr.html = '';

        pi.view.addClass('active');
    };
    // 팝업 종료 이벤트
    pi.onClose = _=> pi.view.removeClass('active');
}));
