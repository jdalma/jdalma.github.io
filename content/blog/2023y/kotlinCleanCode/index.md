---
title: NEXTSTEP 클린코드 with Kotlin 회고(작성 중)
date: "2023-12-10"
tags:
   - oop
   - kotlin
   - cleancode
---


# TDD, 클린 코드 with Kotlin

> "객체지향 프로그래밍 언어를 사용하여 모든 코드를 Service 클래스에 몰아 넣고 객체지향 프로그래밍이라고 생각하지만 절차지향 프로그래밍 스타일로 작성한 경우가 대부분일 것이다."  
> 디자인 패턴의 아름다움에서


OOP에 대한 감을 잡기가 힘들다.. 이 책임은 누구한테 주고 협력은 어떻게 하고 어떤 역할을 부여할지 결정하는 것이 어렵다.  

> "추상화를 통해 의미있는 의존성이 분리되었는지, 테스트가 가능해졌는지, 코드나 가독성이 좋아졌는지 등의 고민을 하면서 현준님만의 기준을 찾아보셔도 좋을거 같습니다!"

위의 조언처럼 스스로 고민을 많이 해봐야겠다.

## 자동차 경주
  
자동차 경주 미션은 5단계로 이루어져 있다.  
  
**1단계**: 환경 세팅  
**2단계**: 문자열 계산기 [리뷰](https://github.com/next-step/kotlin-racingcar/pull/1315)  
**3단계**: 자동차 경주 구현 [리뷰](https://github.com/next-step/kotlin-racingcar/pull/1381)  
**4단계**: 자동차 경주 우승자 기능 추가 [리뷰](https://github.com/next-step/kotlin-racingcar/pull/1440)  
**5단계**: 자동차 경주 리팩토링 [리뷰](https://github.com/next-step/kotlin-racingcar/pull/1473)  
  
자동차 경주는 우테캠 프리코스에서 한 번 해본 경험도 있었고 기능 자체는 간단하여 쉬울 줄 알았지만.. 여전히 책임을 나누는 것이 쉽지 않았다.  
  
> 자동차 경주 첫 구현

![](./racingCarInit.png)

> 자동차 경주 마지막 구현

![](./racingCar.png)

처음 작성한 것에 비해 미션이 끝날 때의 (기능이 추가되긴 했지만) 다이어그램을 보면 책임이 더 분리된 것을 확인할 수 있다.  
이번 미션의 핵심은 **랜덤 기능** 을 최대한 밖으로 끌어내어 주입할 지점을 찾고 **I/O 기능과 비즈니스를 분리하며 개발하는 것** 
이다.  
  
1. 코틀린 클래스는 프로퍼티, 초기화 블록, 부 생성자, 함수, 동반 객체 순으로 작성하는 것이 컨벤션이다.
2. 계층간 "결과 객체"인 DTO를 추가하여 결합도를 낮출 수 있었다.
3. 비즈니스 로직과 IO 로직이 혼재해 있었는데, 중간 DTO를 추가하니 책임과 역할이 더 잘 보였다.
4. DIP를 잘 지켜내면서 개발하면 테스트가 쉽다.
5. 랜덤 기능과 같이 테스트가 불가능한 기능은 최대한 외부로 밀어내라. 또한 추상화를 통해 가짜 객체를 주입하여 테스트 할 수 있도록 작성해라.
6. 예측하지 못하거나, 비정상적인 오류인 경우에는 예외로 처리하지만 그 외는 null 또는 예외 타입으로 표현할 수 있도록 해라.
7. `"You Aren't Gonna Need It"` 지금 당장 필요하지 않은 설계나 기능은 작성하지 마라.
8. data class는 equals와 hashCode, copy가 필요하다면 사용하는 것이다. 기능이 있다고 이상하게 생각하지마라.
9.  스마트 캐스트를 의식하라.
10. 클래스 이름이 Order라면 orderShip()보다는 짧게 ship()이라고 하면 클라이언트에서는 order.ship()라고 호출하며, 간결한 호출의 표현이 된다.
11. [효과적인 이름짓기](https://remotty.github.io/blog/2014/03/01/hyogwajeogin-ireumjisgi/)
12. 코틀린은 기본적으로 프로퍼티 기반인 것을 명심해라.
  
어떤 경우에는 과하게 분리하여 불필요한 주입을 받도록 작성하기도 하고, 분리하여 주입이 필요한 부분을 알아차리지 못하고 많은 책임을 가지도록 작성하기도 했다.  
특히 검증하는 부분을 외부에서 주입받도록 계속 작성한 것 같다.. 책임이 적절히 잘 나눠진 클래스는 테스트하기가 굉장히 쉬웠다.  
대표적으로 `RandomRacingRule`이 잘 나눠졌다고 생각한다.  
  
1. 추상화된 게임 규칙 구현 클래스
2. 추상화된 랜덤 번호 생성기 주입받아 위임
3. 게임 규칙의 조건에 필요한 정보를 주입받아 활용

이와 같이 적절하게 분리되어 있어 **랜덤 기능** 과 **게임 규칙 조건** 에 대한 테스트 작성이 수월했다.  
  
> "응집도가 높고 견고한 클래스에는 적은 수의 메서드와 상대적으로 더 많은 수의 생성자가 존재한다."  
> "생성자의 주된 임무는 제공된 인자를 사용해서 캡슐화된 프로퍼티를 초기화하는 것이고, 메서드의 수가 많을수록 SRP을 위반할 확률이 높지만 생성자는 많을수록 클라이언트가 유연하게 사용할 수 있다."  

## 로또

2주차는 4단계로 이루어져 있다.  

**1단계**: 문자열 덧셈 계산기  
**2단계**: 로또(자동) [리뷰](https://github.com/next-step/kotlin-lotto/pull/845)  
**3단계**: 로또(2등) [리뷰](https://github.com/next-step/kotlin-lotto/pull/900)  
**4단계**: 로또(수동) [리뷰](https://github.com/next-step/kotlin-racingcar/pull/1440)  
  
<h3>문자열 덧셈 계산기</h3>
  
![](./stringAddCalculator.png)

1. `<TYPE> -> List<TYPE>`을 반환하는 Spliterator 인터페이스
2. 기본 구분자와 커스텀 구분자 기준으로 분리하는 (Spliterator를 구현하는) `유틸리티 StringSpliterator`
3. `피연산자` 를 값 클래스로 래핑
4. `피연산자` 검증 인터페이스
5. 검증 인터페이스를 구현한 `음수 검증기`
6. 검증기를 주입받는 `문자열 계산기`

StringSpliterator를 유틸리티로 사용하였는데 유틸리티 클래스는 유익하지 않으니 문자열 계산기에 검증기와 같이 주입하는 것도 괜찮을 것 같다.  
  
<h3>로또</h3>

![](./lotto.png)
  
일련의 과정은 위와 같다.  
중요한 점은 각 과정 사이에서 결합도를 낮추고 있는 **1번** 과 **3번** 이다.  
  
**1번** 은 구매자와 로또 가게에 대한 결합도를 낮추고 있다. `LottoShop`은 `LottoPurchase`에 대해서만 의존한다.  
**3번** 은 로또 구매와 로또 당첨금 확인 및 통계에 대한 결합도를 낮추고 있다. `LottoMachine`은 `LottoWinningNumber`와 `LottoWinningResult`에 대해서만 의존한다.  
이렇게 중간 DTO를 잘 활용하면 책임과 역할을 잘 구분할 수 있다.  
  
로또를 구현하면서 놓쳤던 부분들이 있다.  

<h4>로또 당첨 등수를 결정하는 함수에 대한 책임</h4>

2등은 보너스 볼이 맞았는지 확인해야 하는 것처럼 다른 등수를 확인하는 방법과 다르다.  
`LottoRank` 내부에서 직접 확인하는 것으로 구현했지만 아래와 같은 피드백이 왔다.  
  
> "어떤 랭크인지에 대한 판단을 지금 상위객체(LottoRank)에서 직접 평가하고 있어요."  
> "이렇게되면 상위 객체에서 하위 인스턴스를 모두 파악해야하고 하나의 함수에서 여러 인스턴스 타입에 대해 알고 종속되버리기에 유 연하지 못한 코드가 됩니다."  
> "실제로 지금 이 로직에서 또 여러 조건들의 로또들이 추가되거나 랭크가 기획이 추가되면 로직 변경이 까다로워지겠죠?"  

`LottoRank`는 enum이니 유틸리티 클래스처럼 생각하여 직접 확인하여도 무방하다고 생각했다.  

> "열거타입은 결국 하나의 최상위 불변 인터페이스이고, 하위 속성들이 이 인터페이스를 구현한 구현체 인스턴스라고 할 수 있습니다"

`LottoRank`의 하위 속성들이 직접 당첨이 되었는지 각자 확인하도록 책임을 전가해야 했다. 이 생각을 하지 못한 이유가 열거타입과 하위 속성을 분리해서 생각해본적이 없었기 때문이다.  

```kotlin
typealias MatchedPredicate = (LottoWinningResult) -> Boolean
enum class LottoRank(val prize: Int, val matchedPredicate: MatchedPredicate ) {
   FIRST(2_000_000_000) { it.matchCount == 6 },
   SECOND(30_000_000) { it.matchCount == 5 && it.isBonus == true }, 
   ...

    companion object {
        fun valueOf(lottoWinningResult: LottoWinningResult): LottoRank =
            entries.find { it.matchPredicate(lottoWinningResult) } ?: MISS
    }
}
```


<h3>Lotto를 이루는 일급 컬렉션의 네이밍과 역할에 대한 결정</h3>

||AS-IS|TO-BE|
|------|---|---|
|로또 번호|LottoNumber|LottoNumber|
|로또 (한 줄)|LottoLine|Lotto|
|여러 개의 로또|Lotto|Lottos|

```java
// AS-IS
Lotto(
   lines: List<LottoLine>
)
LottoLine(
   numbers: List<LottoNumber>
)

// TO-BE
Lottos(
   auto: List<Lotto>,
   manual: List<Lotto>
)
Lotto(
   numbers: List<LottoNumber>
)
```

리뷰어님과 서로 생각하는 단위가 달라서 아마 리뷰어님이 이해하기 힘드셨지 않을까 싶다..  
나는 `"한 개의 로또 라인이 여러 개로 이루어져 한 개의 로또를 구성한다"`라는 것이고, 리뷰어님은 `"한 개의 로또가 여러 로또를 구성한다."` 라는 것이다.  
나름 이유를 대자면 실제로 한 개의 로또에 5개까지 구매할 수 있으니 여기서는 5개라는 제한이 없고 그냥 `"복수의 LottoLine은 5개를 초과하여도 Lotto를 구성한다"`라는 생각이였다.  
  
하지만 이렇게보니 리뷰어님의 제안이 더 이해하기 쉬운 것 같다.  

<h3>로또 번호 일급 객체 캐싱</h3>

로또를 구매할 때 마다 항상 새로운 `LottoNumber`를 생성하였다.  
하지만 피드백을 통해 모든 로또는 똑같은 `LottoNumber`를 보유하도록 미리 초기화를 해놓았다.  

```kotlin
@JvmInline
value class LottoNumber private constructor(
    private val number: Int
) {
    companion object {
        private val LOTTO_NUMBER_RANGE = IntRange(1, 45)
        private val LOTTO_NUMBERS: Map<Int, LottoNumber> = LOTTO_NUMBER_RANGE.associateWith(::LottoNumber)

        fun from(value: Int): LottoNumber = LOTTO_NUMBERS[value] ?: throw IllegalArgumentException("[입력:$value] 1에서 45사이의 정수만 허용됩니다.")
        
        fun random() : LottoNumber = from(LOTTO_NUMBER_RANGE.random())
    }
    ...
}
```

<h3>그 외</h3>

1. [일급 객체](https://inpa.tistory.com/entry/CS-%F0%9F%91%A8%E2%80%8D%F0%9F%92%BB-%EC%9D%BC%EA%B8%89-%EA%B0%9D%EC%B2%B4first-class-object)와 추상화 사이에서의 고민
2. JvmInline과 value class를 활용한 최적화
3. 리스코프 치환 원칙을 위반한 예제
4. 상속이 문제가 아니라 **상속을 잘 활용하는 것이 문제** 다.
5. 코틀린에서 Int와 Integer를 처리하는 방법과 Int의 캐싱 범위
6. 백킹 프로퍼티를 활용한 방어적 복사
7. [우아한객체지향 by 조영호](https://www.youtube.com/watch?v=dJ5C4qRqAgA&ab_channel=%EC%9A%B0%EC%95%84%ED%95%9C%ED%85%8C%ED%81%AC)
8. [Spring Batch를 더 우아하게 사용하기 - Spring Batch Plus](https://d2.naver.com/helloworld/9879422)
9. [type safe builders](https://kotlinlang.org/docs/type-safe-builders.html)


### 좋은 객체의 7가지 덕목

> 이따금 클래스를 “객체 템플릿”으로 부르는 것(예를 들면 위키피디아에서 그렇게 하고 있다)을 듣곤 한다.  
> 이 같은 정의는 정확하지 않은데, 이 정의에 따르면 클래스는 수동적인 위치에 있기 때문이다.  
> 이 정의는 누군가가 템플릿을 가지고 그것을 사용해 객체를 만들어낸다고 가정한다. 그럴 수도 있지만 엄밀히 말하자면 개념적으로 틀린 말이다.
> 한번 생성된 객체는 스스로 동작한다. 자신을 누가 만들었고 클래스에 형제 자매가 얼마나 더 있는지 알아서는 안 된다.

클래스와 객체를 이야기할 때 "붕어빵"과 "붕어빵을 찍어낼 수 있는 틀" 정도로 설명하는데, 객체지향 프로그래밍에서 클래스와 객체는 더 많은 의미가 담겨있는 것 같다.  
[이 글](https://codingnuri.com/seven-virtues-of-good-object/)에서 설명하는 객체는 현실 세계의 객체를 대표해야 한다고 한다.  
개인적으로 소프트웨어의 객체가 현실 세계의 객체를 모두 대표할 수 없다라고 생각한다. 그렇다고 해서 이 연관지으려는 노력이 쓸모 없다는 것은 아니고 노력은 해야하지만 유연하게 생각해야 하지 않을까 생각한다.  

1. 객체는 **주체적** 이어야 한다.
2. 객체 내에 존재하는 기능들은 모두 **계약** 에 따라 동작해야 한다.
   - 여기서 말하는 계약은 인터페이스나 추상 클래스에 선언된 기능들을 구현하는 것이다.
   - 계약되지 않은 기능을 구현한다면 단위 테스트에서 모킹하는 것이 불가능하고, 데코레이션을 통해 확장하는 것이 불가능하기 때문이다.
   - 하지만 모든 기능을 명시하기에는 더 번잡해질 수 있다. 이런 계약을 명시하는 것의 이점은 기능 목록을 통해 객체의 행위를 유추할 수 있다는 점이다.
   - 이 이점을 명심하고 팀 내의 기준이 필요하다. 기능 목록을 모두 선언해놓아도 구현체가 괴물이 된다면 아무 의미 없다.
3. 좋은 객체는 언제나 고유하기 위해 무언가를 **캡슐화** 해야 한다.
   - 하지만 정적 메서드만 담긴 유틸리티 클래스는 클래스의 이점을 아무것도 갖고 있지 않으며 클래스라고 부를 수 조차 없다.
   - 유틸리티 클래스는 단순히 객체 패러다임을 엉터리로 남용하는 것에 불과하다.
4. 객체는 **객체의 전 생명주기에 걸쳐 상태가 변하지 않은 채** 로 머물러야 한다.
   - 불변성이 모든 메서드가 언제나 동일한 값을 반환한다는 것을 의미하지는 않는다.
   - 하지만 자신의 내부 상태는 절대 변경하지 않는다.
   - [Temporal Coupling Between Method Calls](https://www.yegor256.com/2015/12/08/temporal-coupling-between-method-calls.html)
   - [Why NULL is Bad?](https://www.yegor256.com/2014/05/13/why-null-is-bad.html)
   - [How Immutability Helps](https://www.yegor256.com/2014/11/07/how-immutability-helps.html)
   - [Objects Should Be Immutable](https://www.yegor256.com/2014/06/09/objects-should-be-immutable.html)
5. 클래스에 정적 멤버가 존재하는 경우에는 객체지향 패러다임에 완전히 반한다.
   - OOP의 위력은 복잡한 문제를 여러 부분으로 분해하여 각 책임을 객체에 할당하여 특정 과업을 수행하도록 하는 것인데, 정적 멤버는 다른 클래스와의 상호작용을 고립시킬 수 없기 때문이다.
6. 이름은 그것이 무엇인지를 말해야 하고, 무슨 일을 하는지 말해서는 안된다. 일반적으로 `-er`로 끝나는 이름은 피하라
   - [Don't Create Objects That End With -ER](https://www.yegor256.com/2015/03/09/objects-end-with-er.html)
7. 좋은 객체는 `final` 이나 `abstract` 클래스에서 온다.
   - 누군가가 내가 작성한 클래스를 상속받아 리스코프 치환 원칙을 위반하는 경우를 막기위해 `final`을 적절히 사용하라
   - 상속받아 기능을 추가하려 하지말고 데코레이터 패턴을 통해 해당 객체를 주입받아 위임할 생각을 해라
   - 다른 작업자에게 템플릿처럼 확장하기 쉬운 포인트를 제공하고 싶거나 내가 개발한 부분을 오염시키지 않길 원한다면 `abstract`를 적절히 사용하라
   - 추상 클래스로 템플릿 메서드 패턴을 적용하여 구현할 수 있는 지점을 제한해라

## 블랙잭

1. 수신 객체 지정 람다를 이용한 Kotlin DSL
11. Builder들의 책임과 비즈니스 로직에서 사용할 값 객체의 책임
   1. 마지막 주차 1단계 예제에서 PersonBuilder 내부 필드를 한 번에 초기화 하는 것이였는데 Skill과 Language 빌더들이 너무 더럽다고 느꼈지만 제이슨님은 PersonBuilder 자체가 더러움을 책임지는 객체라고 생각하셨다.
   2. 비즈니스 로직에서 관심가지는 것은 값 객체에 대한 정보이기 때문에 각 data class들이 불변 필드들을 가지고 있는것에 만족하셨다.