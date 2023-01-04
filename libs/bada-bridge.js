bada.bridge('badaNative')
    .setMessage('cmdSample1')
    .setMessage('cmd-sample1', {})
    .setMessage('cmdSample2', {
        url: '/v1/abcd/abcd',
        param: null,
    })
    .setMessage('cmdSample3', {}, {
        version: '3.0.1',
        os: {
            version: '3.1.1',
            type: 'ios'
        },
    })
    .setMessage('cmd-sample4', null, {
        version: '4.0.1',
        os: {
            version: '4.1.1',
            type: 'aos'
        },
    });

bada.bridge
    .addEventListener('eventCall', param=> {
        console.log('-----eventCall1-------', param);
    })
    .addEventListener('eventCall', param=> {
        console.log('-----eventCall2-------', param);
    });

window.addEventListener('keyup', event=> {
    const {target, key} = event;
    if(!(target == document || target == document.body)) return;
    if(key != '`') return;

    console.log({event}, target == document, target == document.body);
});
