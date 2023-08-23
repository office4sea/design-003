gf.exec(_=> {
    gf.popup= {};

    gf.popup.open= (ctrl, payload)=> {
        const trace= new Error;
        if(gf.suspend.has(ctrl)) {
            console.warn('중복 호출...', trace);
            return Promise.reject('중복 호출...');
        }
        if(!ctrl.onOpen) {
            console.error(`'onOpen' 메소드가 구현되어 있지 않습니다.`, trace);
            return Promise.reject(`'onOpen' 메소드가 구현되어 있지 않습니다.`);
        }

        displayPopup(gf.html.insert(ctrl.getView()))
            .then(_=> ctrl.onOpen(gf.utils.clone(payload)));

        return gf.suspend.run(ctrl);
    };
    gf.popup.resolve= (ctrl, receive)=> {
        removePopup(ctrl.getView());
        ctrl.onResolve(receive);
        gf.suspend.resolve(ctrl, gf.utils.clone(receive));
    };
    gf.popup.reject= (ctrl, reason)=> {
        removePopup(ctrl.getView());
        ctrl.onReject(reason);
        gf.suspend.reject(ctrl, gf.utils.clone(reason));
    };
    gf.popup.mixinController= (ctrl, imp)=> Object.assign(ctrl, imp);


    function removePopup(view) {
        view.lot.css.remove('show');
        return new Promise((resolve)=> {
            view.ontransitionend= e=> {
                if(e.propertyName != 'transform') return;
                view.remove(), resolve();
            };
        });
    }
    function displayPopup(view) {
        requestAnimationFrame(_=> view.lot.css.add('show'));
        return new Promise((resolve)=> {
            view.ontransitionend= e=> {
                if(e.propertyName != 'transform') return;
                resolve();
            };
        });
    }
});
