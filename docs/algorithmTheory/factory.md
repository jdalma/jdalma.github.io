---
layout: default
title: Factory (+ Pattern)
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

- **Factory 패턴**과 **DDD의 Factory**에 대해 정리하자
- 이 글은 아래의 내용을 참고하여 작성하였습니다
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

# **Aggregates** in DDD
- Factory에 대해 알기 전에 **Aggregates**에 대해 알아보자
- **단일 단위로 처리될 수 있는 도메인 객체의 클러스터**
- 예로, 분리된 **Order(주문)**과 **Line-items(주문 아이템)** 객체는 하나의 주문이라는 단일 **aggregate**으로 다루기 유용하다
- `도메인을 나누는 기준 같아 보인다`

<br>

... *아직 개념이 어렵다*

***

# **Factory** in DDD
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

