bada.bridge
.setMessage('cmdSample1')
.setMessage('cmd-sample1', {})
.setMessage('cmdSample2', {
    url: '/v1/abcd/abcd',
    payload: null,
})
.setMessage('cmdSample3', {}, {
    version: '3.0.1',
    os: {
        version: '3.1.1',
        type: 'aos'
    },
})
.setMessage('cmd-sample4', null, {
    version: '4.0.1',
    os: {
        version: '4.1.1',
        type: 'aos'
    },
});

// bada.bridge
// .addEventListener('reCall', v=> {
//     console.log('-v-', v);
// });

// setTimeout(_=> {
//     bada.bridge.getJson({})
//         .then(_=> {})

//     bada.bridge
//     .postMessage('getJson', {
//         url:'/v1/abc',
//         payload: {
//             a:1, b:2
//         }
//     })
//     .then(data=> {
//         console.log('data', data);
//     })
//     .catch(reason=> {
//         console.error('reason', reason);
//     });
// }, 1000);