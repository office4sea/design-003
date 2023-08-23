gf.exec(({ctrl})=> {
    const jsonList= getJsonList();
    ctrl.ajaxMain= it=> (initView(it), bindEvent(it));

    function getJsonList() {
        const capture= {};
        const fetchData = url=> gf.ajax.fetchJson({url}).then(data=> Object.assign(capture, data));
        const drawList = (data, listData)=> listData.lot.insert(gf.tag.div({class:'col'}, [
            gf.tag.div(data.image, {class:'card shadow-sm'}, [
                gf.tag.div({class:'card-body'}, [
                    gf.tag.p(data.text, {class:'card-text'}),
                ])
            ])
        ]));
        const getNext = _=> capture.next;
        return {fetchData, drawList, getNext};
    }
    /**
     * 컨드롤러 이벤트 바인딩
     * @param {GraftElement} it 
     */
    function bindEvent(it) {
        const vo= it.lot.dataBind();
        const {btnData, btnError, btnList, btnListMore}= vo;

        // btnListMore
        btnListMore.lot.event('click', async e=> {
            const {list}= await jsonList.fetchData(`js/html/ajax/${jsonList.getNext()}`);

            list.forEach(each=> jsonList.drawList(each, vo.listData));
            // more 버튼 활성화처리
            btnListMore.disabled= !jsonList.getNext();
        });

        // btnList
        btnList.lot.event('click', async e=> {
            const {list}= await jsonList.fetchData('js/html/ajax/list1.json');

            vo.listData.lot.truncate();
            list.forEach(each=> jsonList.drawList(each, vo.listData));
            // more 버튼 활성화처리
            btnListMore.disabled= !jsonList.getNext();
        });

        // btnError
        btnError.lot.event('click', e=> {
            gf.ajax.fetchJson({
                url: 'js/html/ajax/error.json'
            });
        });

        // btnData
        btnData.lot.event('click', async e=> {
            const result= await gf.ajax.fetchJson({
                url: 'js/html/ajax/data.json'
            });

            vo.listData.lot.truncate();
            result.forEach(each=> drawListDataForDataJson(each, vo.listData));

            btnListMore.disabled= true;
        });
    }
    /**
     * data.json 레코드 데이터 그리기
     * @param {{
     *     image: string;
     *     title: string;
     *     detail: string;
     * }} data
     * @param {GraftElement} listData 
     */
    function drawListDataForDataJson(data, listData) {
        const item= listData.lot.insert(gf.tag.div({class:'col'}, [
            gf.tag.div(data.image, {class:'card shadow-sm'}, [
                gf.tag.div({class:'card-body'}, [
                    gf.tag.h5(data.title),
                    gf.tag.p(data.detail, {dataBind:'detail', class:'card-text'}),
                    gf.tag.div({class:'d-flex justify-content-between align-items-center'}, [
                        gf.tag.div({class:'btn-group'}, [
                            gf.tag.button('modify', _buttonModify, {class:'btn btn-sm btn-outline-secondary'}),
                            gf.tag.button('remove', _buttonRemove, {class:'btn btn-sm btn-outline-danger'})
                        ]),
                        gf.tag.small({class:'text-body-secondary'})
                    ])
                ])
            ])
        ]));

        /**
         * 수정 버튼
         * @param {GraftElement} _it 
         */
        function _buttonModify(_it) {
            const _vo= item.lot.dataBind();

            _it.lot.event('click', async _=> {
                const result= await gf.ajax.fetchJson({
                    url: 'js/html/ajax/dataDetail.json'
                });
                _vo.detail.lot.html= result.detail;
            });
        }
        /**
         * 삭제하기 버튼
         * @param {GraftElement} _it 
         */
        function _buttonRemove(_it) {
            _it.lot.event('click', _=> item.remove());
        }
    };
    /**
     * 뷰 초기화
     * @param {GraftElement} it 
     */
    function initView(it) {}
});
