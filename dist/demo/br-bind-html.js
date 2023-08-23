br.bindHtml('br-bind-html', view=> {
    const logger = br.logger(view.id);

    // setText
    const {vo: {btnSetText}} = view;
    btnSetText.event('click', _=> view.setText({
        outText: '텍스트를 출력 합니다.',
        outHtml: '<strong>HTML을</strong> 출력 합니다.'
    }));

    // getText
    const {vo: {btnGetText}} = view;
    btnGetText.event('click', _=> logger.out(view.getText()));

    // setHtml
    const {vo: {btnSetHtml}} = view;
    btnSetHtml.event('click', _=> view.setHtml({
        outText: '텍스트를 출력 합니다.',
        outHtml: '<strong>HTML을</strong> 출력 합니다.'
    }));

    // getHtml
    const {vo: {btnGetHtml}} = view;
    btnGetHtml.event('click', _=> logger.out(view.getHtml()));

    // setValue
    const {vo: {btnSetValue}} = view;
    btnSetValue.event('click', _=> view.setValue({
        outValue1: 'value 1',
        outValue2: 'value 2'
    }));

    // getValue
    const {vo: {btnGetValue}} = view;
    btnGetValue.event('click', _=> logger.out(view.getValue()));

    // ===== ViewItem =====
    const {vo:{ioInput}} = view;
    ioInput.event('keyup', _=> {
        const {value} = ioInput;
        const {vo:{ioOutput, ioText, ioHtml}} = view;

        ioText.text = value;
        ioHtml.html = value;
        ioOutput.value = value;
    });

    // ===== ViewTemplate =====
    const {vo: {btnAddColor, colorDataList, colorItemList}} = view;
    btnAddColor.event('click', _=> {
        const data = _getColorData(colorDataList);
        if(!data) return;

        logger.out('-color data-', data);
        colorItemList.appendChild(_getColorItem(data));
    });
    const _getColorItem= data=> {
        const item = view.getTemplate('color-item');
        // 테마 클래스 적용
        item.addClass(`alert-${data.theme}`);

        // 이벤트 처리
        item.vo.btnToggle.event('click', _=> {
            if(item.hasClass(`alert-secondary`)) {
                item.removeClass(`alert-secondary`);
                item.addClass(`alert-${data.theme}`);
            } else {
                item.addClass(`alert-secondary`);
                item.removeClass(`alert-${data.theme}`);
            }
        });
        item.vo.btnDataLog.event('click', _=> {
            logger.out('데이터', data);
            item.setValue(data);
        });
        item.vo.btnRemove.event('click', _=> item.remove());
        return item;
    };
    const _getColorData= colorDataList=> {
        const {firstElementChild, children} = colorDataList;
        if(!firstElementChild) return;

        firstElementChild.remove();
        if(children.length == 0) colorDataList.addClass('d-none');

        return JSON.parse(firstElementChild.textContent);
    };
});
