List of questions about JavaScript


## 1. parseInt()
문자열을 숫자로 바꾸는 `parseInt()`를 `parseInt('aa123')`로 잘못 사용하면 NaN을 리턴하는데

`parseInt('123aa')`는 123을 리턴한다.

인자로 전달되는 문자열의 접두사를 정수로 구문 분석할 수 있으면 그 정수를,

없으면 NaN을 반환한다는 복잡한 설계를 굳이 왜 하였을까?

## 2. NaN
NaN값을 왜 만들었을까?

사실 parseInt()에 'aa123' 같은 잘못된 값을 인자로 넘기는 경우도 드물겠지만,

이런 경우 NaN을 리턴하기보다 아래같이 파이썬에서 `int('aa123')` 를 입력했을 때처럼

`ValueError: invalid literal for int() with base 10: 'aa123`

예외처리를 해주는 것이 명료하다.

그렇지 않으니(언어 자체에서 에러처리를 안해주니) NaN이 리턴될 상황을 개발자가 2차 고려해야 한다.
