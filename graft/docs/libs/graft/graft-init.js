const gf= Graft.getInstance(gf=> {
    // 에이전트 정보 세팅
    gf.agent= {
        device: 'web',
        isDev: /localhost|127.0.0.1|192.168.0.2/i.test(location.hostname),
        isMobile: /android|iphone/i.test(navigator.userAgent),
    };

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

    gf.log.active('debug');
    // 웹 콘솔 디버거 추가
    setDebugger('/web/libs/_dev/eruda.js')
    .then(({isDev})=> {
        isDev&& Graft.import('/web/libs/_dev/graft-bridge.mock.js');

        gf.log.out('어플리케이션 환경 설정');
        gf.log.out('에이전트 정보', gf.agent);
        gf.log.out('웹 콘솔 디버거 추가', gf.agent.isDev && gf.agent.isMobile);
    });


    // ========== 내부기능 ==========
    function setDebugger(url) {
        const {agent}= gf;
        if(!(agent.isDev && agent.isMobile)) return Promise.resolve(agent); 
        else {
            return Graft.import(url).then(_=> {
                eruda.init(), gf.log.refresh();
                return agent;
            });
        }
    }
});

// Graft.getInstance(_=> console.log('----싱글톤...------'));
