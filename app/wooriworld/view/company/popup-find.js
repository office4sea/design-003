app(_=> {
    if(app.popup.popupCompanyFind) return;

    app.page.loadPopupLayer({url: '/view/company/popup-find.html'})
        .then(_=> app.popup('popup-company-find', pi=> {
            pi.view = br.bindHtml(pi.id, ({vo})=> {
                vo.cancel.event('click', _=> pi.close());
                vo.submit.event('click', _=> pi.close({
                    companyCode: 'c001',
                    companyName: '샘플 회사',
                }));
            });
        }));
});