gf.exec(({view, ctrl, tag})=> {
    view.formCart= tag.div(ctrl.formCart, {class:'col-md-5 col-lg-4 order-md-last'}, [
        tag.h4({class:'d-flex justify-content-between align-items-center mb-3'}, [
            tag.span('Your cart', {class:'text-primary'}),
            tag.span(3, {class:'badge bg-primary rounded-pill'})
        ]),
        tag.ul({dataBind:'cartList', class:'list-group mb-3'}, [
            tag.li({class:'list-group-item d-flex justify-content-between lh-sm'}, [
                tag.div([
                    tag.h6('Product name', {dataBind:'title', class:'my-0'}),
                    tag.small('Brief description', {dataBind:'description', class:'text-body-secondary'}),
                ]),
                tag.span('$12', {dataBind:'price', class:'text-body-secondary'})
            ]),
            tag.li({class:'list-group-item d-flex justify-content-between lh-sm'}, [
                tag.div([
                    tag.h6('Second product', {dataBind:'title', class:'my-0'}),
                    tag.small('Brief description', {dataBind:'description', class:'text-body-secondary'}),
                ]),
                tag.span('$8', {dataBind:'price', class:'text-body-secondary'})
            ]),
            tag.li({class:'list-group-item d-flex justify-content-between lh-sm'}, [
                tag.div([
                    tag.h6('Third item', {dataBind:'title', class:'my-0'}),
                    tag.small('Brief description', {dataBind:'description', class:'text-body-secondary'}),
                ]),
                tag.span('$5', {dataBind:'price', class:'text-body-secondary'})
            ]),
            tag.li({dataBind:'promo', class:'list-group-item d-flex justify-content-between bg-body-tertiary'}, [
                tag.div({class:'text-success'}, [
                    tag.h6({class:'my-0'}, [
                        tag.a({dataBind:'removePromo', href:'#'}, [
                            tag.span('X', {class:'badge bg-danger'})
                        ]),
                        tag.span('Promo code', {dataBind:'title', class:'ms-2'}),
                    ]),
                    tag.small('EXAMPLECODE', {dataBind:'description'}),
                ]),
                tag.div('-$5', {dataBind:'price', class:'text-success'})
            ]),
            tag.li({dataBind:'total', class:'list-group-item d-flex justify-content-between'}, [
                tag.span('Total (USD)', {dataBind:'title'}),
                tag.strong('$20', {dataBind:'price'})
            ]),
        ]),
        tag.div({class:'card p-2'}, [
            tag.div({class:'input-group'}, [
                tag.input({dataBind:'promoCode', type:'text', class:'form-control', placeholder:'Promo code'}),
                tag.button('Redeem', {dataBind:'btnRedeem', class:'btn btn-secondary'})
            ])
        ])
    ]);
});
