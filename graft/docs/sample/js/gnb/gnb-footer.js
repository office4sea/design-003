gf.exec(({view, tag})=> {
    view.gnbFooter= tag.footer({class:'text-body-secondary py-5'}, [
        tag.div({class:'container'}, [
            tag.p({class:'float-end mb-1'}, [
                tag.a('Back to top', {href:'#'})
            ]),
            tag.p('Graft example is © Graft, but please download and customize it for yourself!', {class:'mb-1'}),
            tag.p('New to Graft Script? ', {class:'mb-0'}),
        ])
    ]);
});
