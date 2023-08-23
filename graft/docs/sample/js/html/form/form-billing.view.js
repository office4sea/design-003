gf.exec(({ctrl, view, tag})=> {
    view.formBilling= tag.div(ctrl.formBilling, {class:'col-md-7 col-lg-8'}, [
        tag.h4('Billing address', {class:'mb-3'}),
        tag.div({class:'needs-validation'}, [
            tag.div({class:'row g-3'}, [
                tag.div({class:'col-sm-6'}, [
                    tag.label('First name', {for:'firstName', class:'form-label'}),
                    tag.input({id:'firstName', type:'text', class:'form-control'})
                ]),
                tag.div({class:'col-sm-6'}, [
                    tag.label('Last name', {for:'lastName', class:'form-label'}),
                    tag.input({id:'lastName', type:'text', class:'form-control'})
                ]),
                tag.div({class:'col-12'}, [
                    tag.label('Address', {for:'address', class:'form-label'}),
                    tag.input({id:'address', type:'text', class:'form-control', placeholder:'1234 Main St'})
                ]),
                tag.div({class:'col-12'}, [
                    tag.label('Address 2 ', {for:'address2', class:'form-label'}, [
                        tag.span('(Optional)', {class:'text-body-secondary'})
                    ]),
                    tag.input({id:'address2', type:'text', class:'form-control', placeholder:'Apartment or suite'})
                ]),
                // zip-code
                tag.div({class:'col-md-5'}, [
                    tag.label('Country', {for:'country', class:'form-label'}),
                    tag.select({dataBind:'country', id:'country', class:'form-select', required:true}, [
                        tag.option('Choose...', {value:''}),
                        tag.option('United States', {value:'c01'}),
                        tag.option('대한민국', {value:'c02'}),
                    ])
                ]),
                tag.div({class:'col-md-4'}, [
                    tag.label('State', {for:'state', class:'form-label'}),
                    tag.select({dataBind:'state', id:'state', class:'form-select', required:true}, [
                        tag.option('Choose...', {value:''}),
                    ])
                ]),
                tag.div({class:'col-md-3'}, [
                    tag.label('Zip', {for:'zip', class:'form-label'}),
                    tag.input({id:'zip', type:'text', class:'form-control'})
                ]),
            ]),

            tag.hr({class:'my-4'}),
            tag.div({class:'form-check'}, [
                tag.input({dataBind:'allOption', id:'all-option', type:'checkbox', class:'form-check-input'}),
                tag.label('checked all', {for:'all-option', class:'form-check-label fw-bold'})
            ]),
            tag.div({class:'form-check'}, [
                tag.input({dataBind:'option', id:'same-address', type:'checkbox', name:'option', value:'o01', class:'form-check-input'}),
                tag.label('Shipping address is the same as my billing address', {for:'same-address', class:'form-check-label'})
            ]),
            tag.div({class:'form-check'}, [
                tag.input({id:'save-info', type:'checkbox', name:'option', value:'o02', class:'form-check-input'}),
                tag.label('Save this information for next time', {for:'save-info', class:'form-check-label'})
            ]),

            tag.hr({class:'my-4'}),
            tag.h4('Payment', {class:'mb-3'}),
            tag.div({class:'my-3'}, [
                tag.div({class:'form-check'}, [
                    tag.input({dataBind:'payment', id:'credit', name:'payment', type:'radio', value:'p01', class:'form-check-input', checked:''}),
                    tag.label('Credit card', {for:'credit', class:'form-check-label'})
                ]),
                tag.div({class:'form-check'}, [
                    tag.input({id:'debit', name:'payment', type:'radio', value:'p02', class:'form-check-input'}),
                    tag.label('Debit card', {for:'debit', class:'form-check-label'})
                ]),
                tag.div({class:'form-check'}, [
                    tag.input({id:'paypal', name:'payment', type:'radio', value:'p03', class:'form-check-input'}),
                    tag.label('PayPal', {for:'paypal', class:'form-check-label'})
                ]),
            ]),

            tag.hr({class:'my-4'}),
            tag.button('Continue to checkout', {dataBind:'btnCheckout', class:'w-100 btn btn-primary btn-lg'}),

            tag.div({dataBind:'result', class:'mt-3'}, [
                tag.ul({dataBind:'resultCart', class:'list-group'}, [
                ])
            ]),
        ])
    ]);
});
