app.bindHtml('card-create', (view, vo)=> {
    const logger= app.logger(view.id);
    initBind();
    // ==== 컨텐츠 ====
    vo.btnSubmit.event('click', _=> {
        // alert();
        app.alert(vo.btnSubmit, 'aabb');
    });
    // 취소
    vo.btnCancel.event('click', _=> app.page.move('/view/main.html'));
    // 고객검색
    vo.btnCustomerSearch.event('click', _=> {
        alert();
    });

    // ==== 내부기능 ====
    function initBind() {
        logger.out('--', vo);
    }
});