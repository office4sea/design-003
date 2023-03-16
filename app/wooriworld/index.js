app.bindHtml('login-form', (view, vo)=> {
    initBind();

    // ==== 컨텐츠 ====
    // 인증하기
    vo.btnLogin.event('click', e=> {
        e.preventDefault();
        const {id, pwd}= getFormData();
        if(!id || !pwd) return;

        app.bridge.memberVerify({id, pwd})
            .then(isOkey=> {
                if(isOkey) app.page.move('/view/main.html');
                else {
                    app.alert(app.bridge, '접근 권한 정보가 존재 하지 않습니다.');
                }
            });
    });


    // ==== 내부기능 ====
    function getFormData() {
        return {
            id: vo.loginId.value,
            pwd: vo.loginPwd.value,
        };
    }
    function initBind() {
        app.bridge.isMember()
            .then(hasCert=> {
                if(hasCert) app.page.move('/view/main.html');
                else {
                    view.removeClass('d-none');
                }
            });
    }
});