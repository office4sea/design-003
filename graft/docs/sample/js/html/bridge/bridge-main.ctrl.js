gf.exec(_=> {
    gf.ctrl.bridgeMain= it=> bindEvent(it);

    // ========== 내부기능 ==========
    /**
     * 이벤트 바인딩
     * @param {GraftElement} it
     */
    function bindEvent(it) {
        const {setData, getData}= it.lot.dataBind();

        setData.lot.event('click', e=> {
            gf.log.out('setData');
            gf.bridge.postMessage({
                command: 'set_data',
                payload: {
                    key: 'aabb',
                    value: '1122'
                }
            })
            .then(receive=> {
                gf.log.out('set_data', receive);
            });
        });
        getData.lot.event('click', e=> {
            gf.log.out('getData');
            gf.bridge.postMessage({command: 'get_data'})
            .then(receive=> {
                gf.log.out('get_data', receive);
            });
        });
    }
});
