---
layout: default
title: 의존성 주입 Annotation
nav_order: 6
grand_parent: 🌱 스프링
parent: 스프링 핵심 원리 이해
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

# **`@Autowired`**

-   스프링 프레임워크에서 제공하는 애노테이션이다.
-   `@Autowired`는 **타입 매칭을 시도** 하고 , **여러 빈이 있으면 필드 이름(파라미터 이름)으로 빈 이름**을 추가 매칭한다.
-   `ac.getBean(클래스.class)` 이 코드와 유사하게 동작한다. **(실제로는 더 많은 기능을 제공한다)**
-   필드 , 생성자 , Setter에 붙일 수 있다.
    -   단, 필드 또는 Setter에 붙여서 사용할 경우 반드시 기본 생성자가 정의 되어 있어야 한다.

# **`@Resource`**

-   자바에서 제공하는 애노테이션이다.
-   `@Resource`는 주입하려고 하는 **객체의 이름(인스턴스 명)이 일치하는 객체**를 자동으로 주입한다.
-   필드 , Setter에 붙일 수 있다.
    -   **반드시 기본 생성자가 정의 되어 있어야 한다.**

# **`@Inject`**

-   `@Inject`는 `@Autowired`와 유사하게 주입하려고 하는 **객체의 타입과 일치하는 객체를 자동으로 주입**한다.
-   자바에서 제공하는 애노테이션이다.
-   필드 , 생성자 ,  Seeter에 붙일 수 있다.
    -   **단, 필드 또는 Setter에 붙여서 사용할 경우 반드시 기본 생성자가 정의 되어 있어야 한다.**
-   `@Named` 사용
    -   **`@Autowired`의 `@Qualifier`와 같이 사용할 수 있는 것이 `@Inject`에서는 `@Named`이다.**

# **조회 대상 빈이 2개 이상일 때 해결 방법**

## **`@Autowired` 필드 명 매칭**

```java
// 생성자 주입
@Autowired
public OrderServiceImpl(MemberRepository memberRepository, DiscountPolicy discountPolicy) {
	this.memberRepository = memberRepository;
	this.discountPolicy = discountPolicy;
}
```

-   DiscountPolicy - 인터페이스
-   FixDiscountPolicy , RateDiscountPolicy - 구현체
-   현재 구현체 2개 다 `@Component` 애노테이션으로 인해 스프링 빈으로 등록 되어 있는 상태다.
-   이대로 테스트를 실행하면 **NoUniqueBeanDefinitionException** 예외가 발생한다.
    -   (DiscountPolicy의 하위 타입으로 참조할 수 있지만 DIP를 위배하고 유연성이 떨어진다.)

```java
// 생성자 주입
@Autowired
public OrderServiceImpl(MemberRepository memberRepository, DiscountPolicy rateDiscountPolicy) {
	this.memberRepository = memberRepository;
	this.discountPolicy = rateDiscountPolicy;
}
```

-   필드 명을 빈 이름으로 변경한 후 테스트를 실행하면 성공적이다.
-   ✅ **필드 명 매칭은 먼저 타입 매칭을 시도 하고 , 그 결과에 여러 빈이 있을 때 추가로 동작하는 기능이다.**

## **`@Qualifier` 사용**

✅ **`@Qualifier`** **→ `@Qualifier` 끼리 매칭** **→ 빈 이름 매칭**

-   수정자(Setter) , 생성자 , 필드 주입에서 사용 가능하다

```java
@Component
@Qualifier("mainPolicy")
public class RateDiscountPolicy implements DiscountPolicy{
	...
}
```

```java
@Component
@Qualifier("subPolicy")
public class FixDiscountPolicy implements DiscountPolicy{
	...
}
```

```java
//생성자 주입
@Autowired
public OrderServiceImpl(MemberRepository memberRepository,
                        @Qualifier("mainPolicy") DiscountPolicy discountPolicy) {
    this.memberRepository = memberRepository;
    this.discountPolicy = discountPolicy;
}
```

-   `@Qualifier`로 주입할 때 mainPolicy를 못찾으면 mainPolicy라는 이름의 스프링 빈을 추가로 찾는다.
-   하지만 `@Qualifier`는 `@Qualifier`를 찾는 용도로만 사용하는게 명확하고 좋다.

### Annotation을 직접 만들어 `@Qualifier` 적용
```java
@Target({ElementType.FIELD,
        ElementType.METHOD,
        ElementType.PARAMETER,
        ElementType.TYPE,
        ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
@Qualifier("mainDiscountPolicy")
// @MainDiscountPolicy을 사용하면 위에 해당하는 어노테이션이 다 실행된다.
public @interface MainDiscountPolicy {
}
```

- 인터페이스 - DiscountPolicy
- 구현체 - RateDiscountPolicy , FixDiscountPolicy
- 이 중 RateDiscountPolicy를 MainDiscountPolicy라고 지정할려고 한다.

> **OrderServiceImpl**

```java
public class OrderServiceImpl implements OrderService{

    private final MemberRepository memberRepository;
    private final DiscountPolicy discountPolicy;

    public OrderServiceImpl(MemberRepository memberRepository,
                            @MainDiscountPolicy DiscountPolicy discountPolicy) {
        this.memberRepository = memberRepository;
        this.discountPolicy = discountPolicy;
    }
}
```

> **RateDiscountPolicy**

```java
@Component
@MainDiscountPolicy
public class RateDiscountPolicy implements DiscountPolicy{
	...
}
```
- `@MainDiscountPolicy`가 실행 되면. `@Qualifier`가 실행 되므로 `@MainDiscountPolicy`가 작성된 것 끼리 서로 연결된다.
- **이렇게 여러 애노테이션을 모아서 사용하는 기능은 스프링이 지원해주는 기능이다.**
- 물론 스프링이 제공하는 기능을 **뚜렷한 목적 없이 무분별 하게 재정의 하는 것은 유지보수에 더 혼란만 가중할 수 있다.**

> ✋
> - **`@Target`**
>   - 해당 애노테이션이 어디에 사용 될 수 있는가를 명시한다.
> - **`@Retention(RetentionPolicy.RUNTIME)`**
>   - 어느 시점까지 애노테이션의 메모리를 가져갈지 설정
>   - 애노테이션을 런타임시에까지 사용할 수 있습니다.
>   - JVM이 자바 바이트코드가 담긴 `class 파일`에서 런타임환경을 구성하고 런타임을 종료할 때까지 메모리는 살아있습니다.


## **`@Primary` 사용**

✅ **우선순위를 정하는 방법이다. `@Autowired`시에 빈이 여러개 매칭 되면 `@Primary`가 우선권을 가진다.**

```java
@Component
@Primary
public class RateDiscountPolicy implements DiscountPolicy{
	...
}
```

```java
@Component
public class FixDiscountPolicy implements DiscountPolicy{
	...
}
```

-   `@Primary`가 중복 되면 `NoUniqueBeanDefinitionException` 예외가 발생한다.

## **우선순위**

✅ `@Primary`는 기본값 처럼 동작하는 것이고 , `@Qualifer`는 매우 상세하게 동작한다.
{: .fh-default .fs-4 }
✅ 스프링은 자동보다는 수동이 , 넓은 범위의 선택권 보다는 좁은 범위의 선택권이 우선 순위가 높다.
{: .fh-default .fs-4 }
✅ 따라서 여기서도 `@Qualifier`가 우선권이 높다.
{: .fh-default .fs-4 }
