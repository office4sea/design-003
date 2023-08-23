gf.exec(_=> {
    const logger= gf.log.getLogger('bridge.mock', '#fd7e14');
    const storage= getStorage('bridge');

    logger('-- 브릿지 Mock load --');
    gf.bridge.mock.set('set_data', msg=> {
        logger('set_data', msg);
        msg.receive= {};
        Graft.postMessage(msg);
    });

    gf.bridge.mock.set('get_data', msg=> {
        logger('get_data', msg);
        msg.receive= {xxbb:1};
        Graft.postMessage(msg);
    });

    function getStorage(fix) {
        const saveData= ()=> {};
        const readData= ()=> {};
        return {saveData, readData};
    }
});
