---
layout: default
title: 의존관계 자동 주입
parent: 스프링 핵심
nav_order: 5
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---
## 📌 **다양한 의존관계 주입 방법**

### 의존관계 주입은 크게 4가지 방법이 있다.
- **생성자 주입**
- **수정자 주입(setter 주입)**
- **필드 주입**
- **일반 메서드 주입**

### 생성자 주입
- 이름 그대로 생성자를 통해서 의존 관계를 주입 받는 방법이다.
- 지금까지 우리가 진행했던 방식이 바로 생성자 주입이다.
- 특징
  - 생성자 호출 시점에 딱 1번만 호출 되는것이 보장 된다.
  - **"불변 , 필수"** 의존관계에 사용

```java
@Component
public class OrderServiceImpl implements OrderService{

    private final MemberRepository memberRepository;
    private final DiscountPolicy discountPolicy;

    @Autowired
    public OrderServiceImpl(MemberRepository memberRepository, DiscountPolicy discountPolicy) {
        this.memberRepository = memberRepository;
        this.discountPolicy = discountPolicy;
    }
    ...
```

> ✋ **생성자가 딱 1개만 있으면 `@Autowired`를 생략해도 자동 주입 된다.**
(스프링 빈에만 해당한다)

### 수정자 주입
```java
@Component
public class OrderServiceImpl implements OrderService{

    private MemberRepository memberRepository;
    private DiscountPolicy discountPolicy;

    @Autowired
    public void setMemberRepository(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }
    @Autowired
    public void setDiscountPolicy(DiscountPolicy discountPolicy) {
        this.discountPolicy = discountPolicy;
    }
    ...
```
> ✋ **`@Autowired`를 찾아 주입 하여 준다.**
(`@Autowired`가 없으면 들어오지 않는다.)
`@Autowired`의 기본 동작은 주입할 대상이 없으면 오류가 발생한다.
주입할 대상이 없어도 동작하게 하려면 `@Autowired(required = false)`로 지정하면 된다

### 필드 주입
- 이름 그대로 필드에 바로 주입하는 방법이다.
- 특징
  - 코드가 간결해서 많은 개발자들을 유혹하지만 외부에서 변경이 불가능해서 테스트하기 힘들다는 치명적인 단점이 있다.
  - DI프레임워크가 없으면 아무것도 할 수 없다.
    - 테스트 하기 위해서는 스프링 컨테이너를 같이 올려야 한다 또는 `@SpringBootTest`에서 테스트한다.
  - 애플리케이션의 실제 코드와 관계없는 테스트 코드
- 스프링 설정을 목적으로 하는 `@Configuration` 같은 곳에서만 특별한 용도로 사용

```java
@Component
public class OrderServiceImpl implements OrderService{

    @Autowired private MemberRepository memberRepository;
    @Autowired private DiscountPolicy discountPolicy;


    ...
    @Component
    public class OrderServiceImpl implements OrderService{

        @Autowired private MemberRepository memberRepository;
        @Autowired private DiscountPolicy discountPolicy;


        ...
```
> ✋ **권장되지 않는다.**
![](../../assets/images/spring-core/dependency-auto-injection/1.png)


### 일반 메서드 주입
- 일반 메서드를 통해서 주입 받을 수 있다.
- 특징
  - 한번에 여러 필드를 주입 받을 수 있다.
  - 일반적으로 잘 사용하지 않는다.
    - (생성자 주입 또는 setter 메서드 주입으로 해결이 다 가능하기 때문에)

```java
@Component
public class OrderServiceImpl implements OrderService{

    private MemberRepository memberRepository;
    private DiscountPolicy discountPolicy;

    @Autowired
    public void init(MemberRepository memberRepository , DiscountPolicy discountPolicy){
        this.memberRepository = memberRepository;
        this.discountPolicy = discountPolicy;
    }

    ...
```
> ✋ 의존관계 자동 주입은 스프링 컨테이너가 관리하는 스프링 빈이어야 동작한다.
스프링 빈이 아닌 Member같은 클래스에서 `@Autowired` 코드를 적용해도 아무 기능도 하지 않는다.

- `MemberRepository`와 `DiscountPolicy`를 잘 보면 `final`이 있는것도 있고 , 없는것도 있다
- 그 이유는 **의존관계가 주입 되는 시점 차이** 때문이다.
- **생성자 주입은 구현체가 스프링 빈에 등록 되기전에 호출 되기 때문에 `final`이 가능 하지만 나머지 의존관계 주입은 구현체가 스프링 빈에 등록 되고 난 후 이기 때문에 `final`을 적용할 수 없다.**

***

## **자동 주입 대상을 옵션으로 처리하는 방법**

주입할 스프링 빈이 없어도 동작해야 할 때가 있다.
**그런데 `@Autowired`만 사용하면 `required` 옵션의 기본값이 `true`로 되어 있어서 자동 주입 대상이 없으면 오류가 발생한다.**

- `@Autowired(required=false)` : 자동 주입할 대상이 없으면 수정자 메서드 자체가 호출 안됨
- `org.springframework.lang.@Nullable` : 자동 주입할 대상이 없으면 null이 입력된다.
  - 스프링 전반적으로 지원된다
- `Optinal<>` : 자동 주입할 대상이 없으면 `Optinal.empty`가 입력된다.

### AutowiredTest.class
```java
public class AutowiredTest {

    @Test
    void AutowiredOption(){
        AnnotationConfigApplicationContext ac =
                          new AnnotationConfigApplicationContext(TestBean.class);
    }

    static class TestBean{

        @Autowired(required=false)
        public void setNoBean1(Member noBean1){
            // 예) 스프링 컨테이너에 관리되는 것이 없을 때
            // Member객체는 스프링 컨테이너에 관리되지 않는것이다.
            System.out.println("noBean1 = " + noBean1);
        }

        @Autowired
        public void setNoBean2(@Nullable Member noBean2){
            System.out.println("noBean2 = " + noBean2);
        }

        @Autowired
        public void setNoBean3(Optional<Member> noBean3){
            System.out.println("noBean3 = " + noBean3);
        }
    }
}
```
![](../../assets/images/spring-core/dependency-auto-injection/2.png)

***

## 📌 **생성자 주입을 선택해야 하는 이유**
**과거에는 수정자 주입과 필드 주입을 많이 사용했지만 최근에는 스프링을 포함한 DI 프레임워크 대부분이 생성자 주입을 권장한다.**

### "불변"
- 대부분의 의존관계 주입은 한 번 일어나면 애플리케이션 종료 시점까지 의존관계를 변경할 일이 없다.
- 오히려 대부분의 의존관계는 애플리케이션 종료 전 까지 변하면 안된다. (불변 해야한다.)
- 수정자 주입을 사용하면 setXxx 메서드를 public으로 열어두어야한다.
- 누군가 실수로 변경할 수 도 있고 , 변경하면 안되는 메서드를 열어두는 것은 좋은 설계 방법이 아니다.
- 생성자 주입은 객체를 생성할 때 딱 1번만 호출되므로 이후에 호출되는 일이 없다. 따라서 불변하게 설계할 수 있다.

### "누락"
- 프레임 워크 없이 순수한 자바코드를 단위 테스트 하는 경우에
- 다음 과 같이 수정자 의존 관계인 경우

```java
@Component
public class OrderServiceImpl implements OrderService{
    private MemberRepository memberRepository;
    private DiscountPolicy discountPolicy;

    @Autowired
    public void setMemberRepository(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Autowired
    public void setDiscountPolicy(DiscountPolicy discountPolicy) {
        this.discountPolicy = discountPolicy;
    }
}
```
`@Autowired`가 프레임워크 안에서 동작할 때는 의존관계가 없으면 오류가 발생한다.(**스프링 컨테이너를 실행시켜야 의존관계 주입이 가능하다**)

### "final 키워드"
- 생성자 주입을 사용하면 필드 `final`키워드를 사용할 수 있다.
- 그래서 생성자에서 혹시라도 값이 설정되지 않았을 경우 오류를 컴파일 시점에서 막아준다.

<center> <strong>수정자 주입</strong></center>

![](../../assets/images/spring-core/dependency-auto-injection/3.png)

<center> <strong>생성자 주입</strong></center>

![](../../assets/images/spring-core/dependency-auto-injection/4.png)

### 📌 정리
- 생성자 주입 방식을 선택하는 이유는 여러가지가 있지만 , 프레임워크에 의존하지 않고 , 순수한 자바 언어의 특징을 잘 살리는 방법 이기도 하다.
- 기본으로 생성자 주입을 사용하고 , 필수 값이 아닌 경우에는 수정자 주입 방식을 옵션으로 부여하면 된다.
  - 생성자 주입과 수정자 주입을 동시에 사용할 수 있다.
- **항상 생성자 주입을 선택해라!** 그리고 가끔 옵션이 필요하면 수정자 주입을 선택해라. 필드 주입은 사용하지 않는게 좋다.
