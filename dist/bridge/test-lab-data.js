const data = {};

// data.message = {
//     getVersion: {
//         payload: null,
//         result: {
//             data: '0.0.11'
//         },
//     },
//     getDeviceInfo: {
//         payload: {a: 1},
//         result: {
//             data: {
//                 os: 'ios',
//                 bender: 'apple',
//             }
//         },
//     },
// };
data.message= [{
    type: 'version',
    desc: '버전 정보 요청',
    payload: null,
    response: {
        data: '0.0.1',
    },
}, {
    type: 'deviceInfo',
    payload: null,
    response: {
        os: 'ios',
        bender: 'apple',
    },
}, {
    type: 'fetchJson',
    payload: {
        token: 'q1w2e3',
        api: '/my/info'
    },
    response: {
        name: '홍길동',
        phone: '01012341234',
    },
}, {
    type: 'auth',
    payload: null,
    response: {
        data: null,
    },
}];

data.event = {};
