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
    function nativeContents() {
        vo.tab1BridgeMsgType.event('focus', _=> vo.tab1BridgeMsgList.removeClass('d-none'));
        vo.tab1BridgeMsgType.event('keyup', _=> findWordFor(vo.tab1BridgeMsgType.value, vo.tab1BridgeMsgList));
        // 메시지 전송
        vo.tab1BridgeMsgSend.event('click', _=> {
            const type= vo.tab1BridgeMsgType.value.trim();
            const payload= vo.tab1BridgeMsgPayload.value.trim();

            if(!type) return alert('타입을 입력하세요.'), vo.tab1BridgeMsgType.focus();
            if(!payload) return alert('전송 데이터를 입력하세요.'), vo.tab1BridgeMsgPayload.focus();

            br.bridge.postMessage(type, JSON.parse(payload).data)
                .then(result=> {
                    vo.tab1BridgeMsgRes.value= encJSON(result);
                })
                .catch(error=> {
                    vo.tab1BridgeMsgRes.value= 'error\n\n' + encJSON(error);
                })
        });
    }
    function webContents() {
        // 브릿지 타입 선택
        vo.tab2BridgeType.onClickRadio= _e=> _showContent(vo.tab2BridgeType.getCheckedData());
        // 메시지 타입 입력
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

        // 이벤트 타입 입력
        vo.tab2BridgeEvtType.event('focus', _=> vo.tab2BridgeEvtList.removeClass('d-none'));
        vo.tab2BridgeEvtType.event('keyup', _=> findWordFor(vo.tab2BridgeEvtType.value, vo.tab2BridgeEvtList));
        // 메시지 저장
        vo.tab2BridgeEvtWrite.event('click', _=> {
            const type= vo.tab2BridgeEvtType.value.trim();
            const res= vo.tab2BridgeEvtRes.value.trim();

            if(!type) return alert('타입을 입력하세요.'), vo.tab2BridgeEvtType.focus();
            if(!res) return alert('결과 데이터를 입력하세요.'), vo.tab2BridgeEvtRes.focus();
            voncNative.stubEventWrite(type, res);
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

        // 메시지 리스트 작성
        data.message.forEach(data=> (_addTab1MsgList(data), _addTab2MsgList(data)));
        // 이벤트 리스트 작성
        data.event.forEach(data=> _addTab2EvtList(data));
        vo.tab3Protocol.html= `{
  <b class="text-success">// 헤더</b>
  head: {
    <b class="text-success">// 메시지 타입</b>
    type: 'version',
    <b class="text-success">// 브릿지 거래 아이디</b>
    trid: 1234567890
  },
  <b class="text-success">// 바디</b>
  body: {
    <b class="text-success">// [필수] 전달 파라미터</b>
    data: null,
    <b class="text-success">// [옵션] 오류</b>
    error?: {
      message: '',
      reason: {}
    }
  }
}`;

        function _addTab2EvtList(data) {
            const item= view.getTemplate('tab2EvtListItem');
            const readData= voncNative.stubEventRead && voncNative.stubEventRead(data.type);

            item.setText(data);
            item.addEventListener('click', evt=> {
                evt.preventDefault();
                vo.tab2BridgeEvtType.value= data.type;
                vo.tab2BridgeEvtRes.value= encJSON(readData || data.response);
                vo.tab2BridgeEvtList.addClass('d-none');
            });
            readData && item.vo.save.removeClass('d-none');
            vo.tab2BridgeEvtList.appendChild(item);

            // 이벤트 리스너 등록
            br.bridge.addEventListener(data.type, e=> {
                vo.tabNav.setActive('tab1');
                vo.tab1BridgeMsgRes.value= 'event\n\n' + encJSON(e.data);
            });
        }
        function _addTab1MsgList(data) {
            const item= view.getTemplate('tab1MsgListItem');
            const readData= voncNative.stubMessageRead && voncNative.stubMessageRead(data.type);

            item.setText(data);
            item.addEventListener('click', evt=> {
                evt.preventDefault();
                vo.tab1BridgeMsgType.value= data.type;
                vo.tab1BridgeMsgPayload.value= encJSON(data.payload);
                vo.tab1BridgeMsgList.addClass('d-none');
            });
            readData && item.vo.save.removeClass('d-none');
            vo.tab1BridgeMsgList.appendChild(item);
        }
        function _addTab2MsgList(data) {
            const item= view.getTemplate('tab2MsgListItem');
            const readData= voncNative.stubMessageRead && voncNative.stubMessageRead(data.type);

            item.setText(data);
            item.addEventListener('click', evt=> {
                evt.preventDefault();
                vo.tab2BridgeMsgType.value= data.type;
                vo.tab2BridgeMsgRes.value= encJSON(readData || data.response);
                vo.tab2BridgeMsgList.addClass('d-none');
            });
            readData && item.vo.save.removeClass('d-none');
            vo.tab2BridgeMsgList.appendChild(item);
        }
    }
    function encJSON(v) {
        return typeof v == 'object' ? JSON.stringify(v, '', '  ') : v;
    }
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