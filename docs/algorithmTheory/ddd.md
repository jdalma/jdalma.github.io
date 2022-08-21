---
layout: default
title: DDD (+ Factory)
parent: 📕 정리
nav_order: 10
---
{: .no_toc }

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

![](../../assets/images/algorithmTheory/factory/factoryReview.png)
- [리뷰](https://github.com/CodeSoom/spring-week1-assignment-1/pull/115#discussion_r938836197)

<br>

- 이 글은 [도메인 주도 개발 시작하기](http://www.yes24.com/Product/Goods/108431347)의 내용을 참고하여 작성하였습니다
- 추가 참고
  - [`johngrib.github.io` Factory](https://johngrib.github.io/wiki/pattern/factory/)
  - [`johngrib.github.io` Static Factory Method](https://johngrib.github.io/wiki/pattern/static-factory-method/)
  - [`sumini.dev` Factory Pattern 개념부터 적용까지](https://sumini.dev/til/014-factory/)
  - [`culttt.com` What are `Factories` in Domain Driven Design?](https://www.culttt.com/2014/12/24/factories-domain-driven-design/)
  - [`culttt.com` What are `Aggregates` in Domain Driven Design?](https://www.culttt.com/2014/12/17/aggregates-domain-driven-design)
  - [`martinfowler` DDD_Aggregate](https://martinfowler.com/bliki/DDD_Aggregate.html)
  - [`refactoring.guru` Factory Method](https://refactoring.guru/design-patterns/factory-method)
  
- 💡 추가 정리
  1. [추상 팩토리 패턴 (Abstract Factory Pattern)](https://jdalma.github.io/docs/designPattern/objectCreationRelated/#abstract-factory-pattern)
  2. [빌더 패턴(Builder Pattern)](https://jdalma.github.io/docs/designPattern/objectCreationRelated/#builder-pattern)
  3. [팩토리 메소드 패턴 (Factory Method Pattern)](https://jdalma.github.io/docs/designPattern/objectCreationRelated/#factory-method-pattern) 
- **팩토리 메서드 패턴** `vs` **추상 팩토리 패턴**
  - 두 패턴은 객체를 만들 때 추상화를 한건 맞지만
  - `Concrete Class`(객체)를 만드는 과정의 차이
  
***

# **Domain**
- 소프트웨어로 해결하고자 하는 **문제 영역**
- 한 도메인은 다시 하위 도메인으로 나눌 수 있다
  - 한 하위 도메인은 다른 하위 도메인과 연동하여 완전한 기능을 제공

<br>



- **도메인 모델 패턴**
  1. `Presentation`**표현** *또는 사용자 인터페이스*
     - 클라이언트의 요청을 처리 또는 응답
  2. `Application` **응용**
     - 요청한 기능을 실행
     - `업무로직을 직접 구현하지 않고` **도메인 계층을 조합해서 기능을 실행**
  3. `Domain` **도메인**
     - 도메인 모델의 핵심 로직을 구현
  4. `Infrastructure` **인프라스트럭처**
     - DB나 메시징 시스템과 같은 외부 시스템과의 연동
     - *[Drools](http://www.opennaru.com/jboss/dynamically-create-rules-using-drools/)*

- 도메인의 복잡도에 따라 **응용**계층이 **인프라스트럭처**계층에 의존하기도 한다
  - 이런 의존은 `테스트 어려움` , `기능 확장의 어려움` 두 가지 문제가 발생한다
  - DIP 🚩

<br>

- **도메인 모델**이란?
  - 도메인 자체를 표현하는 개념적인 모델을 의미하지만,
  - 도메인 계층을 구현할 때 사용하는 객체 모델을 언급할 때에도 사용한다

<br>

- **도메인 모델에서 `Getter` , `Setter`는 도메인의 핵심 개념이나 의도를 코드에서 사라지게 한다**
  - 도메인 객체가 불완전한 상태로 사용되는 것을 막으려면 `생성 시점에 필요한 것을 전달해 주어야 한다`
- 도출한 모델은 크게 **엔티티**와 **밸류**로 구분할 수 있다
1. **엔티티**
   - 엔티티의 가장 큰 특징은 **식별자를 가진다는 것**이다
   - 엔티티를 생성하고 속성을 바꾸고 삭제할 때 까지 식별자는 유지된다
   - 두 엔티티 객체의 식별자가 같으면 **같은 엔티티라고 판단할 수 있다** `equals & hashCode` 
2. **밸류**
   - **개념적으로 완전한 하나를 표현할 때 사용**
   - 밸류 객체는 데이터 변경 기능을 제공하지 않게 *([불변](https://ko.wikipedia.org/wiki/%EB%B6%88%EB%B3%80%EA%B0%9D%EC%B2%B4))* 하고 새로운 객체를 생성하는 방식을 선호한다 
   - 아래의 코드와 같이 `주문 상품`이라는 그 자체의 정보이다
   - `price`와 `amounts`는 **돈**을 의하는 **int타입**이지만 새로운 **밸류** `Money` 타입을 만들 수 있다
     - *돈 계산을 위한 기능을 추가할 수도 있다*

```java
public class OrderLine {
    private Product product;
    private int price;
    private int quantity;
    private int amounts;
    ...
}
```

<br>

- **유비쿼터스 언어**
  - 언어의 중요함을 강조한다
  - 전문가 , 관계자 , 개발자가 도메인과 관련된 공통의 언어를 사용
- **도메인 용어에 맞지 않는 단어를 사용하면 코드는 도메인과 점점 멀어지게 된다**

```java
public enum OrderState{
  STEP1,STEP2,STEP3,STEP4,STEP5,STEP6;
}

public enum OrderState{
  PAYMENT_WAITING,PREPARING,SHIPPED,DELIVERING,DELIVERY_COMPLETED;
}
```

***

# **Aggregates**
- Factory에 대해 알기 전에 **Aggregates**에 대해 알아보자
- **단일 단위로 처리될 수 있는 도메인 객체의 클러스터**
- 예로, 분리된 **Order(주문)**과 **Line-items(주문 아이템)** 객체는 하나의 주문이라는 단일 **aggregate**으로 다루기 유용하다
- `도메인을 나누는 기준 같아 보인다`

<br>

... *아직 개념이 어렵다*

***

# **Factory**
- **Factory**는 `다른 객체를 생성하는` **유일한 단일 책임이 있는 객체**
  - *도메인 주도 설계 프로젝트 내에서 중요한 역할*


```java
class PhoneFactory{
    public static Phone build(String type){
        if(type.equals("iPhone")) {
            return new iPhone();
        }
        else if(type.equals("Nexus")) {
            return new Nexus();
        }
        return null;
    }
}
```

**PhoneFactory.build()** 메서드는 type을 확인하여 `다른 새로운 객체를 반환하는 책임이 있다`

- *다른 책임은 더 없어야 한다*

<br>

그럼 왜 이 Factory를 사용하냐? → **애플리케이션이 복잡해 질 수록 Factory는 보편화 된다**
- *보편화 된다고 나와있지만 (수정이나 확장에)유연하다는 뉘앙스 같다.*

