# 브로민 라이브러리

## Br.logger
[데모](https://office4sea.github.io/design-003/dist/demo/bromin.html)

브라우저 디버깅 로그를 출력 합니다.

> level

디버깅 레벨을 세팅 합니다.

0: 미사용, 1: 콘솔로그 출력, 2: 경고 출력

> break

브레이크 포인트를 설정 합니다.

### 로거 인스턴스

`Br.logger` 메소드로 부터 로거 객체를 제공 받아 사용합니다.

```js
/**
 * 콘솔 로그 출력을 위한 객체를 생성합니다.
 * @param {string} label 로그 구분을 위한 라벨
 * @param {string=} style 로그 출력 스타일값
 */
const logger = Br.logger('debug', 'color:red');

logger.out('콘솔로그 출력');
logger.warn('경고 출력');
logger.error('오류 출력');
```

> out

콘솔로그를 출력합니다. 로그레벨 1이상에서 동작 합니다.

> warn

경고 로그를 출력합니다. 로그레벨 2이상에서 동작 합니다.

> error

오류 로그를 출력합니다.
