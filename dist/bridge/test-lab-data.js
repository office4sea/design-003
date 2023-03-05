const data = {};

data.message= [{
    type: 'version',
    desc: '버전 정보 요청',
    payload: {data: null},
    response: {
        data: '0.0.1',
    },
}, {
    type: 'deviceInfo',
    desc: '디바이스 정보 요청: (오류 처리 샘플)',
    payload: {data: null},
    response: {
        data: null,
        error: {
            message: '디바이스 정보 취득 실패',
        }
    },
}, {
    type: 'fetchJson',
    desc: '데이터 요청',
    payload: {
        data: {
            api: '/my/info',
            param: {a:1, b:2}
        }
    },
    response: {
        data: {
            name: '홍길동',
            phone: '01012341234',
        },
    },
}, {
    type: 'auth',
    desc: '접근 승인 처리',
    payload: {data: null},
    response: {
        data: null,
    },
}];

data.event = [{
    type: 'keyback',
    desc: '하드웨어 백버튼 이벤트',
    payload: {data: null},
    response: {
        data: null,
    },
}, {
    type: 'aabb2',
    desc: '하드웨어 백버튼 이벤트',
    payload: {data: null},
    response: {
        data: null,
    },
}];
