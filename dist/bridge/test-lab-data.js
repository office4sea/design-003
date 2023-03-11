const data = {};

data.message= [{
    type: 'memberVerify',
    desc: '회원 검증',
    payload: {data: {id:'a', pwd:'b'}},
    response: {
        data: null,
        error: {
            message: '접근 권한이 존재 하지 않습니다.'
        }
    },
}, {
    type: 'isMember',
    desc: '회원승인여부(로그인 여부)',
    payload: {data: null},
    response: {
        data: true,
    },
}, {
    type: 'getData',
    desc: '앱내 데이터 취득',
    payload: {data: {
        key: 'key'
    }},
    response: {
        data: 'value',
    },
}, {
    type: 'setData',
    desc: '앱내 데이터 저장',
    payload: {data: {
        key: 'key',
        value: 'value'
    }},
    response: {
        data: null,
    },
}, {
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
