bada.bridge('badaNative');
bada.bridge
    .addMessage('empty')
    .addMessage('sendSample', {
        payload: {
            require: 'abcd',
            option: null,
            obj: {
                a: 1,
                b: {bb:1}
            }
        },
    })
    .addMessage('send-sample', {
        payload: {
            require: 'abcd',
            option: null
        },
        result: {},
    })
    .addMessage('receive-sample', {
        payload: {},
        result: {
            text: '1122',
            value: {a:1}
        },
    })
    .addMessage('error-sample', {
        payload: {},
        result: {},
        error: {
            message: 'error message'
        }
    });

bada.bridge
    .addEventListener('keyback', v=> {
    })
    .addEventListener('keyup', v=> {
        console.log('-----keyup-----', v);
    })

// bada.bridge.mockEvent('keyup')

// bada.bridge('badaNative')
//     .setMessage('cmdSample1')
//     .setMessage('cmd-sample1', {})
//     .setMessage('cmdSample2', {
//         url: '/v1/abcd/abcd',
//         param: null,
//     })
//     .setMessage('cmdSample3', {}, {
//         version: '3.0.1',
//         os: {
//             version: '3.1.1',
//             type: 'ios'
//         },
//     })
//     .setMessage('cmd-sample4', null, {
//         version: '4.0.1',
//         os: {
//             version: '4.1.1',
//             type: 'aos'
//         },
//     });

// bada.bridge
//     .addEventListener('eventCall', param=> {
//         console.log('-----eventCall1-------', param);
//     })
//     .addEventListener('eventCall', param=> {
//         console.log('-----eventCall2-------', param);
//     });

// window.addEventListener('keyup', event=> {
//     const {target, key} = event;
//     if(!(target == document || target == document.body)) return;
//     if(key != '`') return;

//     console.log({event}, target == document, target == document.body);
// });
