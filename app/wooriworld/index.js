app.bindHtml('login-form', (view, vo)=> {
    initBind();

    // ==== 컨텐츠 ====
    // 인증하기
    vo.btnLogin.event('click', e=> {
        e.preventDefault();
        const {id, pwd}= getFormData();
        if(!id || !pwd) return;

        app.bridge.memberVerify({id, pwd})
            .then(_=> app.page.move('/view/main.html'))
            .catch(e=> {
                alert(e.message);
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