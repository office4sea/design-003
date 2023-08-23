gf.exec(_=> {
    const logInfo= gf.log.getLogger('gf.ajax');
    const logPrimary= gf.log.getLogger('gf.ajax', 'primary');
    const logDanger= gf.log.getLogger('gf.ajax', 'danger');
    
    gf.ajax= {};

    const spinner= getFetchJsonLoading();
    gf.ajax.fetchJson= prm=> {
        const {url, payload}= prm;
        const stackTrace= new Error;

        if(!url) {
            const msg= `'url'은 필수 입력 입니다.`;
            return logDanger(msg, stackTrace), Promise.reject(msg);
        }

        return new Promise((resolve, reject)=> {
            spinner.on(), logInfo(url, '\n', payload);

            setTimeout(_=> {
                fetch(url).then(rs=> {
                    return (rs.status == 200)? rs.json(): Promise.reject(rs);
                })
                .then(json=> {
                    spinner.off(), logPrimary(url, '\n', json);
                    resolve(json);
                })
                .catch(reason=> {
                    spinner.off(), logDanger(url, '\n', reason, stackTrace);
                    reject(reason);
                });
            }, 1000);
        });
    };


    function getFetchJsonLoading() {
        const counter= [];
        const spinner= gf.tag.div({class:'fixed-top w-100 h-100 bg-black bg-opacity-50'}, [
            gf.tag.div({class:'h-100 flex-column d-flex justify-content-center'}, [
                gf.tag.div({class:'d-flex justify-content-center'}, [
                    gf.tag.div({
                        role:'status',
                        class:'spinner-border text-warning',
                        style:'width:3rem; height:3rem;'
                    }, [
                        gf.tag.span('Loading...', {class:'visually-hidden'})
                    ])
                ])
            ])
        ]);
        const on= _=> {
            !counter.length&& gf.html.insert(spinner);
            counter.push(1);
        };
        const off= _=> {
            counter.pop();
            !counter.length&& spinner.remove();
        }
        return {on, off};
    }
});
