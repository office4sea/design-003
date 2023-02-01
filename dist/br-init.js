br(_=> {
    const log = br.logger('br-init');
    log.out('br 초기화 및 설정');

    const waitHtml = br.loadHtml('/dist/demo/popup/system-popup.html');
    // 페이지 로드 완료 후 처리
    // ====================
    br.ready(_=> {
        // 시스템 팝업 엘리먼트 로드
        waitHtml.then(htmls=> {
            const popups = document.getElementById('layer-popups');
            htmls.forEach(v=> popups.appendChild(v));
        });
    });
});
