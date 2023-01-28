br.bindHtml('br-bind-html', (vo, view)=> {
    const logger = br.logger(view.id);

    // setText
    const {btnSetText} = vo;
    btnSetText.event('click', _=> view.setText({
        outText: '텍스트를 출력 합니다.',
        outHtml: '<strong>HTML을</strong> 출력 합니다.'
    }));

    // getText
    const {btnGetText} = vo;
    btnGetText.event('click', _=> logger.out(view.getText()));

    // setHtml
    const {btnSetHtml} = vo;
    btnSetHtml.event('click', _=> view.setHtml({
        outText: '텍스트를 출력 합니다.',
        outHtml: '<strong>HTML을</strong> 출력 합니다.'
    }));

    // getHtml
    const {btnGetHtml} = vo;
    btnGetHtml.event('click', _=> logger.out(view.getHtml()));

    // setValue
    const {btnSetValue} = vo;
    btnSetValue.event('click', _=> view.setValue({
        inValue: 'input value',
        outValue: 'output value'
    }));

    // getValue
    const {btnGetValue} = vo;
    btnGetValue.event('click', _=> logger.out(view.getValue()));

    // ===== 템플릿 추가 =====
    const colorDatas = [
        {color: 'red', code: '#f00'},
        {color: 'green', code: '#0f0'},
        {color: 'blue', code: '#00f'},
    ];

    const {btnAddColor, colorList} = vo;
    btnAddColor.event('click', _=> {
        const data = colorDatas.pop();
        if(!data) return;

        logger.out('컬러 데이터', data);
        colorList.appendChild(_getColorItem(data));
    });

    const _getColorItem = data=> {
        // 템플릿 객체 생성
        const item = view.getTemplate('color-item');
        item.setValue(data);
        item.addClass(data.color);

        // 배경색
        const {vo: {toggle}} = item;
        toggle.event('click', _=> {
            logger.out('배경색 변경', data);
            if(item.hasClass(data.color)) item.removeClass(data.color);
            else {
                item.addClass(data.color);
            }
        });

        // 로그출력
        const {vo: {logOut}} = item;
        logOut.event('click', _=> {
            logger.out('원본 데이터 출력', data);

            const {color, code} = item.getValue();
            logger.out('입력 데이터 출력', {color, code});
        });

        // 삭제
        const {vo: {remove}} = item;
        remove.event('click', _=> {
            logger.out('아이템 삭제', data);
            item.remove();
        });

        return item;
    };

    // ===== vo 핸들 객체 =====
    const {vo:{ioInput}} = view;
    ioInput.event('keyup', _=> {
        const {value} = ioInput;
        const {vo:{ioOutput, ioText, ioHtml}} = view;

        ioText.text = value;
        ioHtml.html = value;
        ioOutput.value = value;
    });
});
