// 초기화 및 설정
br(_=> {
    const logger = br.logger('global');
    logger.out('init bromine');

    // HTML 로더 설정
    // br.loadHtml
    // br.loadScript

    // ========== 팝업 설정 ==========
    // 팝업 오픈/종료 이벤트 감지
    // br.popup.observable

    // Alert 팝업
    // Confirm 팝업

    // ========== AJAX 설정 ==========
    // 로딩바 설정
    // br.ajax.progress = {on(){}, off(){}};

    // 거래 중계 설정
    // br.ajax.fetch

    // ========== 브릿지 설정 ==========
    // 브릿지 초기화
    // br.bridge('brNative');
});
