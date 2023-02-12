const data = {};

data.message = {
    getVersion: {
        payload: null,
        result: {
            data: '0.0.11'
        },
    },
    getDeviceInfo: {
        payload: {a: 1},
        result: {
            data: {
                os: 'ios',
                bender: 'apple',
            }
        },
    },
};

data.event = {};

br.bridge('brNative');