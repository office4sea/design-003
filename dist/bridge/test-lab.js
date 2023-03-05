const initSelect = (ctrl, datas)=> Object.keys(datas).reduce((ctrl, type)=> _appendOption(ctrl, type), ctrl);
const _appendOption = (ctrl, value, innerHTML=value)=>
    (Object.assign(ctrl.appendChild(document.createElement('option')), {innerHTML}), ctrl);

const msgStr = `
// 메시지 프로토콜 구조
`;
br.bindHtml('testLab', view=> {
    const {vo}= view;
    const logger= br.logger(view.id);
    initialize();

    // ==== contents ====
    nativeContents();
    webContents();
    ioContents();

    // ==== 내부기능 ====
    function nativeContents() {}
    function webContents() {
        // 브릿지 타입 선택
        vo.tab2BridgeType.onClickRadio= _e=> _showContent(vo.tab2BridgeType.getCheckedData());
        vo.tab2BridgeMsgType.event('focus', _=> vo.tab2BridgeMsgList.removeClass('d-none'));
        vo.tab2BridgeMsgType.event('keyup', _=> findWordFor(vo.tab2BridgeMsgType.value, vo.tab2BridgeMsgList));
        // 메시지 저장
        vo.tab2BridgeMsgWrite.event('click', _=> {
            const type= vo.tab2BridgeMsgType.value.trim();
            const res= vo.tab2BridgeMsgRes.value.trim();

            if(!type) return alert('타입을 입력하세요.'), vo.tab2BridgeMsgType.focus();
            if(!res) return alert('결과 데이터를 입력하세요.'), vo.tab2BridgeMsgRes.focus();
            voncNative.stubMessageWrite(type, res);
        });

        function _showContent(type) {
            Object.entries({msg: vo.tab2BridgeMsg, evt: vo.tab2BridgeEvt})
                .forEach(([ky, handle])=> {
                    if(ky == type) handle.removeClass('d-none');
                    else {
                        handle.addClass('d-none');
                    }
                });
        }
    }
    function findWordFor(word, list) {
        const reg= new RegExp(word, 'i');
        [...list.children].forEach(el=> {
            logger.out(el.text, reg.test(el.text));
            reg.test(el.text) ? el.removeClass('d-none') : el.addClass('d-none')
        });
    }
    function ioContents() {}
    function initialize() {
        logger.out('브릿지 데이터', data);
        // 탭: 테스트 구분
        br.form.tab(vo.tabNav, vo.tabContent);
        vo.tabNav.setActive(voncNative.isMock ? 'tab2' : 'tab1');

        // 라디오 그룹: 브릿지 타입
        br.form.radioGroup(vo.tab2BridgeType);

        data.message.forEach(data=> {
            _addTab2MsgList(data);
        });

        function _addTab2MsgList(data) {
            const item= view.getTemplate('tab2MsgListItem');
            item.setText(data);
            item.addEventListener('click', evt=> {
                evt.preventDefault();
                vo.tab2BridgeMsgType.value= data.type;
                vo.tab2BridgeMsgRes.value= encJSON(data.response);
                vo.tab2BridgeMsgList.addClass('d-none');
            });
            vo.tab2BridgeMsgList.appendChild(item);
        }
    }
    function encJSON(v) {
        return JSON.stringify(v, '', '\t');
    }
    function decJSON(v) {
        return JSON.stringify(v);
    }

    // if(!brNative.isMock) view.removeClass('d-none');

    // const {vo: {msgType}} = view;
    // initSelect(msgType, data.message).event('change', _=> {
    //     if(!msgType.value) {
    //         txtMsgStr.value = ``;
    //         return;
    //     }
    // });

    // const {vo: {btnSend}} = view;
    // btnSend.event('click', _=>alert());

    // const {vo: {tabMsgIn, tabMsgOut, tabMsgStr, tabEvt}} = view;
    // const {vo: {txtMsgIn, txtMsgOut, txtMsgStr, txtEvt}} = view;
    // [
    //     [tabMsgIn, txtMsgIn],
    //     [tabMsgOut, txtMsgOut],
    //     [tabMsgStr, txtMsgStr],
    //     [tabEvt, txtEvt],
    // ].forEach(([tab, txt])=> tab.event('click', _=> _visibleText(txt)));
    // const _visibleText= v=> [txtMsgIn, txtMsgOut, txtMsgStr, txtEvt]
    //     .forEach(txt=> (txt==v) ? txt.removeClass('d-none') : txt.addClass('d-none'));
});

// ==== form ====
br(_=> {
    const logger= br.logger('br.form', 'color:blue;');
    const tab= (nav, content)=> {
        const navForm= getForm(nav);
        const conForm= getForm(content);
        nav.setActive= name=> _activeTab(name);

        Object.entries(navForm).forEach(([ky, vl])=> {
            vl.addEventListener('click', e=> {
                e.preventDefault();
                _activeTab(ky);
            });
        });

        function _activeTab(name) {
            Object.entries(navForm).forEach(([ky, el])=> {
                const {classList}= el;
                if(ky == name) classList.add('active');
                else {
                    classList.remove('active');
                }
            });
            Object.entries(conForm).forEach(([ky, el])=> {
                const {classList}= el;
                const cls= ['active','show'];
                if(ky == name) cls.forEach(v=> classList.add(v));
                else {
                    cls.forEach(v=> classList.remove(v));
                }
            });
        }
    };
    const radioGroup= group=> {
        const form= getForm(group);
        group.onClickRadio= _=>_;
        group.getCheckedData= _=> form.entries.map(([,el])=> (el.checked ? el.value : undefined)).join('');

        form.entries.forEach(([ky, el])=> {
            const {parentElement, name}= el;
            const label= parentElement.querySelector('label');
            if(!label) return logger.error(`radioGroup: label is undefined`, parentElement);
            if(!name) return logger.error(`radioGroup: 'name' property is undefined`, el);

            el.id= [name, ky].join('_');
            el.addEventListener('click', e=> group.onClickRadio(e));
            label.setAttribute('for', el.id);
        });
    };

    br.form= {tab, radioGroup};
    function getForm(target) {
        const result= [...target.querySelectorAll('[data-form]')]
            .reduce((rs, el)=> {
                const {dataset:{form}}= el;
                return form ? Object.assign(rs, {[form]: el}) : rs;
            }, {});

        return Object.defineProperty(result, 'entries', {get() {
            const skip= ['entries'];
            return Object.entries(this).reduce((rs, [ky, vl])=> {
                if(skip.indexOf(ky) == -1) rs.push([ky, vl]);
                return rs;
            }, []);
        }});
    }
});