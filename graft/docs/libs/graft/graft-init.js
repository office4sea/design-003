const gf= Graft.getInstance(gf=> {
    // 에이전트 정보 세팅
    gf.agent= {
        device: 'web',
        isLocal: /localhost|127.0.0.1/i.test(location.hostname),
        isDev: /office4sea.github.io/i.test(location.hostname),
        isMobile: /android|iphone/i.test(navigator.userAgent),
    };

    const root = gf.agent.isDev? '/design-003': '';
    const useDebugger= gf.agent.isLocal|| gf.agent.isDev;

    // 웹 콘솔 디버거 추가
    (useDebugger && gf.agent.isMobile)&& gf.log.addDebugger(root+ '/graft/docs/libs/_dev/eruda.js');

    useDebugger && Graft.import(root+ '/graft/docs/libs/_dev/graft-bridge.mock.js');

    // 네이티브 세팅
    gf.bridge.setNative(_=> {
        const nativeName= 'graftNative';

        if(window.webkit) {
            gf.agent.device= 'ios';
            return window.webkit.messageHandlers[nativeName];
        }
        if(window[nativeName]) {
            gf.agent.device= 'aos';
            return window[nativeName]
        }

        return gf.bridge.mock;
    });

    gf.log.out('어플리케이션 환경 설정');
    gf.log.out('에이전트 정보', gf.agent);
    gf.log.out('웹 콘솔 디버거 추가', gf.agent.isDev && gf.agent.isMobile);
});

// Graft.getInstance(_=> console.log('----싱글톤...------'));
