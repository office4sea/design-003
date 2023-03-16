app.bindHtml('card-create', (view, vo)=> {
    const logger= app.logger(view.id);
    initBind();
    // ==== 컨텐츠 ====
    // 저장
    vo.btnSubmit.event('click', _=> {
        const form= getFormData();
        logger.out('폼 데이터', form);
        if(!form.name) return app.alert(vo.name, '이름을 입력 하세요.');
        if(!form.mobile) return app.alert(vo.mobile, '휴대폰을 입력 하세요.');
        if(!form.email) return app.alert(vo.email, '이메일 주소를 입력 하세요.');
        if(!form.position) return app.alert(vo.position, '팀/직급을 입력 하세요.');
        if(!form.company) return app.alert(vo.company, '회사를 입력 하세요.');
    });
    // 취소
    vo.btnCancel.event('click', _=> app.page.move('/view/main.html'));
    // 북마크선택
    vo.star.event('click', _=> {
        if(vo.star.checked) vo.star.addClass('check');
        else {
            vo.star.removeClass('check');
        }
    });
    // 고객검색
    vo.btnCustomerSearch.event('click', _=> {
        app.popup.popupCompanyFind
            .target(vo.btnCustomerSearch)
            .open()
            .then(result=> {
                vo.company.value= result.companyName;
            });
    });

    // ==== 내부기능 ====
    function getFormData() {
        const form= view.getValue();
        return {
            name: form.name,
            mobile: form.mobile,
            email: form.email,
            position: form.position,
            company: form.company,
            bookmark: vo.star.checked
        };
    }
    function initBind() {
        logger.out('--', vo);
    }
});