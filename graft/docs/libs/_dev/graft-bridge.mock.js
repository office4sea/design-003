gf.exec(_=> {
    const logger= gf.log.getLogger('bridge.mock', '#fd7e14');
    const storage= getStorage();

    gf.bridge.mock.set('set_data', msg=> {
        const {payload: {key, value}= {}}= msg;

        storage.set(`data[${key}]`, value);
        const message= getReceiveMessage(msg);

        logger('set_data', [msg, message]);
        Graft.postMessage(message);
    });

    gf.bridge.mock.set('get_data', msg=> {
        const {payload: {key}= {}}= msg;

        const value= storage.get(`data[${key}]`);
        const message= getReceiveMessage(msg, {value});

        logger('get_data', [msg, message]);
        Graft.postMessage(message);
    });

    logger('-- 브릿지 Mock load --');
    // ========== 내부기능 ==========
    function getReceiveMessage({trid}, receive={}) {
        return {trid, receive};
    }
    function getStorage() {
        const set= (ky, vl)=> localStorage.setItem(`bridge=${ky}`, vl);
        const get= ky=> localStorage.getItem(`bridge=${ky}`);
        return {set, get};
    }
});
