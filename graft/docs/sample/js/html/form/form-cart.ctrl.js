gf.exec(({view, ctrl})=> {
    ctrl.formCart= it=> {
        initView(it), bindEvent(it);
    };
    /**
     * 결제 상품 목록 반환
     */
    ctrl.formCart.getCartList= _=> {
        const vo= view.formCart.lot.dataBind();
        return [...vo.cartList.children].map(el=> el.lot.data);
    };

    // ========== 내부기능 ==========
    /**
     * 이벤트 바인딩
     * @param {GraftElement} it 
     */
    function bindEvent(it) {
        const vo= it.lot.dataBind();
        const {btnRedeem, removePromo, promo}= vo;

        // 프로모션 삭제
        removePromo.lot.event('click', e=> {
            e.preventDefault();
            promo.lot.css.add('d-none'), _calcTotal();
        });
        // Redeem
        btnRedeem.lot.event('click', e=> {
            const {promoCode}= vo.getValue();
            if(!promoCode) {
                alert('프로모션 코드 미입력');
                return;
            }

            promo.lot.dataBind().setText({description: promoCode});
            promo.lot.css.remove('d-none'), _calcTotal();
        });

        // ====================
        function _calcTotal() {
            const total= [...vo.cartList.children].reduce((total, el)=> {
                const {description, price}= el.lot.dataBind().getText();

                if(el.lot.css.has('d-none')) return total;
                if(!description) return total;
                else {
                    return total + (price.replace(/\$/g, '')| 0);
                }
            }, 0);
            vo.total.lot.dataBind().setText({price: '$'+total});
        }
    }
    /**
     * 뷰초기화
     * @param {GraftElement} it 
     */
    function initView(it) {
        const vo= it.lot.dataBind();
        _setDataForCartList();

        // ====================
        function _setDataForCartList() {
            [...vo.cartList.children].forEach(el=> {
                el.lot.data= el.lot.dataBind().getText();
            });
        }
    }
});
