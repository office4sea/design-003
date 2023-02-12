const initSelect = (ctrl, datas)=> Object.keys(datas).reduce((ctrl, type)=> _appendOption(ctrl, type), ctrl);
const _appendOption = (ctrl, value, innerHTML=value)=>
    (Object.assign(ctrl.appendChild(document.createElement('option')), {innerHTML}), ctrl);

const msgStr = `
// 메시지 프로토콜 구조
`;
br.bindHtml('test', view=> {
    if(!brNative.isMock) view.removeClass('d-none');

    const {vo: {msgType}} = view;
    initSelect(msgType, data.message).event('change', _=> {
        if(!msgType.value) {
            txtMsgStr.value = ``;
            return;
        }
    });

    const {vo: {btnSend}} = view;
    btnSend.event('click', _=>alert());

    const {vo: {tabMsgIn, tabMsgOut, tabMsgStr, tabEvt}} = view;
    const {vo: {txtMsgIn, txtMsgOut, txtMsgStr, txtEvt}} = view;
    [
        [tabMsgIn, txtMsgIn],
        [tabMsgOut, txtMsgOut],
        [tabMsgStr, txtMsgStr],
        [tabEvt, txtEvt],
    ].forEach(([tab, txt])=> tab.event('click', _=> _visibleText(txt)));
    const _visibleText= v=> [txtMsgIn, txtMsgOut, txtMsgStr, txtEvt]
        .forEach(txt=> (txt==v) ? txt.removeClass('d-none') : txt.addClass('d-none'));
});