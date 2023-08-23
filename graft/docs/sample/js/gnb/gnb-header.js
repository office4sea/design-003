gf.exec(({view, tag})=> {
    view.gnbHeader= tag.nav({class:'navbar navbar-expand-md bg-dark sticky-top border-bottom'}, [
        tag.div({class:'container'}, [
            tag.div({class:'offcanvas offcanvas-end'}, [
                tag.div({class:'offcanvas-body'}, [
                    tag.ul({class:'navbar-nav justify-content-between gap-2 fw-bold'}, [
                        tag.li({class:'nav-item'}, [
                            tag.a('폼 컨트롤', getMenuProperty('form.html'))
                        ]),
                        tag.li({class:'nav-item'}, [
                            tag.a('레이어 팝업', getMenuProperty('popup.html'))
                        ]),
                        tag.li({class:'nav-item'}, [
                            tag.a('데이터 요청', getMenuProperty('ajax.html'))
                        ]),
                        tag.li({class:'nav-item'}, [
                            tag.a('네이티브 브릿지', getMenuProperty('bridge.html'))
                        ]),
                    ])
                ])
            ])
        ])
    ]);

    function getMenuProperty(href) {
        const color= RegExp(`${href}$`).test(location.pathname)? 'text-warning': 'text-light';
        return {href, class:`nav-link ${color}`};
    }
});
