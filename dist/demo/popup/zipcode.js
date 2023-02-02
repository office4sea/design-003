br.popup.addPopupElement('/dist/demo/popup/zipcode.html')
.then(_=> br.popup('zipcode', pi=> {
    const searchResults = [
        {zipCode: 11111, zipAddr: '서울 특별시 서초구 반포대로23길 11111'},
        {zipCode: 22222, zipAddr: '서울 특별시 서초구 반포대로23길 22222'},
        {zipCode: 33333, zipAddr: '서울 특별시 서초구 반포대로23길 33333'},
        {zipCode: 44444, zipAddr: '서울 특별시 서초구 반포대로23길 44444'},
        {zipCode: 55555, zipAddr: '서울 특별시 서초구 반포대로23길 55555'},
    ];

    pi.view= br.bindHtml('popup-zipcode', view=> {
        // close
        const {vo: {btnClose}} = view;
        btnClose.event('click', _=> pi.close());

        // search
        const {vo: {btnSearch, keyword, addrList}} = view;
        btnSearch.event('click', _=> {
            if(!keyword.value) return br.popup.alert
                .target(keyword)
                .open('검색어를 입력하세요.');

            searchResults.forEach(each=> addrList.appendChild(_addAddrItem(each)));
        });
        const _addAddrItem= data=> {
            const item = view.getTemplate('addr-item');
            item.setText(data);

            // 주소 선택 이벤트
            item.vo.action.event('click', event=> {
                event.preventDefault();
                pi.close(data);
            });
            return item;
        };
    });

    pi.onOpen= data=> {
        const {view: {vo: {addrList, keyword}}} = pi;
        keyword.value = addrList.html = '';
    };
}));
