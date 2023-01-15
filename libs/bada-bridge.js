// 네이티브 객체 초기화
bada.bridge('badaNative');

// 브릿지 메시지 등록
bada.bridge
    .addMessage('empty')
    .addMessage('sendSample', {
        text: 'abcd',
        option: null,
        obj: {
            a: 1,
            b: {bb:1}
        }
    })
    .addMessage('receive-sample', {
        text: 'abcd',
        option: null,
        obj: {
            a: 1,
            b: {bb:1}
        }
    })
    .addMessage('error-sample', {
        text: 'abcd',
    });

// 네이티브 이벤트 등록
bada.bridge
    .addEventListener('keyback', v=> {
    })
    .addEventListener('keyup', v=> {
        console.log('-----keyup-----', v);
    });
