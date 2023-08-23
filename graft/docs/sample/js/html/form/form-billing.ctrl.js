gf.exec(({view, ctrl, tag, log})=> {
    ctrl.formBilling= it=> {
        ctrl.formBilling._init(it);
        ctrl.formBilling._bindEvent(it);
    };
    /**
     * 이벤트 바인딩
     * @param {GraftElement} it 
     */
    ctrl.formBilling._bindEvent= it=> {
        const vo= it.lot.dataBind();

        // billing checkout
        vo.btnCheckout.lot.event('click', _=> {
            const vl= vo.getValue();
            gf.log.out('==>', vl);
            _drawCartListForResult();
        });

        // country change
        vo.country.lot.event('change', _=> {
            const {country}= vo.getValue();

            vo.state.lot.truncate();
            getStatesForCountry(country)
            .forEach(each=> {
                vo.state.lot.insert(tag.option(each.name, {value: each.code}));
            });
        });

        // all checked
        vo.allOption.lot.event('change', _=> {
            vo.option.lot.value= vo.allOption.checked? ['o01', 'o02']: [];
        });

        // ====================
        function _drawCartListForResult() {
            vo.resultCart.lot.truncate();
            ctrl.formCart.getCartList().forEach(each=> {
                vo.resultCart.lot.insert(_getCartListItem(each));
            });
        }
        /**
         * @param {{
         *      title: string;
         *      price: string;
         * }} data 
         */
        function _getCartListItem(data) {
            return gf.tag.li({class:'list-group-item d-flex justify-content-between'}, [
                gf.tag.strong(data.title),
                gf.tag.small(data.price)
            ]);
        }
    };
    /**
     * 초기화
     * @param {GraftElement} it 
     */
    ctrl.formBilling._init= it=> {
        const vo= it.lot.dataBind();
    };

    
    function getStatesForCountry(code) {
        const status= {
            // United States
            c01: [
                {name: 'California', code:'s01'},
                {name: 'New York', code:'s02'},
            ],
            // 대한민국
            c02: [
                {name: '서울', code:'s01'},
                {name: '경기도', code:'s02'},
            ]
        };

        return [{name:'Choose...', code:''}].concat(status[code] || []);
    }
});
