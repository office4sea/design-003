app.bindHtml('main', (view, vo)=> {
    const logger= app.logger(view.id);
    initBind();
    // ==== 컨텐츠 ====
    // 검색
    vo.btnSearch.event('click', _=> {
        vo.btnMore.next= '';
        fetchNameCards(true);
    });
    // 더보기
    vo.btnMore.event('click', _=> fetchNameCards());
    // 추가
    vo.btnAdd.event('click', _=> app.page.move('/view/name-card/card-create.html'));

    // ==== 내부기능 ====
    function initBind() {
        fetchNameCards(true);
    }
    function fetchNameCards(isClear) {
        const word= vo.srchWord.value.trim();
        const {next=''}= vo.btnMore;
        const payload= {word, next};

        if(isClear) vo.cardList.html= '';

        logger.out('/api/v1/name-card/get-list >>>>>', payload);
        app.bridge.fetchJson({
            payload,
            url: '/api/v1/name-card/get-list',
        })
        .then(result=> {
            logger.out('/api/v1/name-card/get-list <<<<<', result);
            _setMore(result);
            _drawList(result.list || []);
        });

        function _drawList(datas) {
            datas.forEach(data=> {
                const item= view.getTemplate('cardItem');
                item.setText(data);
                if(data.bookmark) item.vo.star.addClass('active');
                else {
                    item.vo.star.removeClass('active');
                }

                // 즐겨찾기
                item.vo.star.event('click', _=> _fetchSetBookmark(item, data));
                // 이메일
                item.vo.btnEmail.event('click', _=> {
                    if(!data.email) return;
                    location.href= `mailto:${data.email}`;
                });
                // 문자
                item.vo.btnSms.event('click', _=> {
                    if(!data.phone) return;
                    location.href= `sms:${data.phone}`;
                });
                // 전화
                item.vo.btnTel.event('click', _=> {
                    if(!data.phone) return;
                    location.href= `tel:${data.phone}`;
                });
                vo.cardList.appendChild(item);
            });
        }

        function _fetchSetBookmark(item, data) {
            const payload= Object.assign(data, {bookmark: !data.bookmark});
            logger.out('/api/v1/name-card/set-info >>>>>', payload);
            app.bridge.fetchJson({
                payload,
                url: '/api/v1/name-card/set-info',
            })
            .then(result=> {
                logger.out('/api/v1/name-card/set-info <<<<<', result);
                if(payload.bookmark) item.vo.star.addClass('active');
                else {
                    item.vo.star.removeClass('active');
                }
            });
        }
        function _setMore(result) {
            vo.btnMore.next= result.next;
            if(!result.next) vo.btnMore.addClass('d-none');
            else {
                vo.btnMore.removeClass('d-none');
            }
        }
    }
});