Br.bindHtml('br-bind-html', (vo, view)=> {
    const logger = Br.logger(view.id);

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
});
