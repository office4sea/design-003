const gf= Graft.getInstance(gf=> {
    // 에이전트 정보 세팅
    gf.agent= {
        device: 'web',
        isDev: /localhost|127.0.0.1|192.168.0.2/i.test(location.hostname),
        isMobile: /android|iphone/i.test(navigator.userAgent),
    };

    // 웹 콘솔 디버거 추가
    // if(gf.agent.isDev && gf.agent.isMobile) {
    //     gf.log.addDebugger('/web/libs/_dev/eruda.js')
    //         .then(_=> {
    //             gf.agent.isDev && Graft.import('/web/libs/_dev/graft-bridge.mock.js');
    //         });
    // } else {
    //     gf.agent.isDev && Graft.import('/web/libs/_dev/graft-bridge.mock.js');
    // }
    gf.log.setDebugger({
        isAdd: gf.agent.isDev && gf.agent.isMobile,
        url: '/web/libs/_dev/eruda.js'
    })
    .then(_=> gf.agent.isDev && Graft.import('/web/libs/_dev/graft-bridge.mock.js'));


    gf.log.active('debug');
    // 네이티브 세팅
    gf.bridge.setNative(_=> {
        const nativeName= 'graftNative';

        if(window.webkit) {
            gf.agent.device= 'ios';
            return window.webkit.messageHandlers[nativeName];
        }
        if(window[nativeName]) {
            gf.agent.device= 'aos';
            return window[nativeName];
        }
        return gf.bridge.mock;
    });

    gf.log.out('어플리케이션 환경 설정');
    gf.log.out('에이전트 정보', gf.agent);
    gf.log.out('웹 콘솔 디버거 추가', gf.agent.isDev && gf.agent.isMobile);
});

// Graft.getInstance(_=> console.log('----싱글톤...------'));
