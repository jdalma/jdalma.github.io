---
layout: default
title: 람다 표현식
parent: 모던 자바 인 액션
grand_parent: Books
nav_order: 3
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

# **람다 표현식**
- 익명 클래스처럼 이름이 없는 함수면서 메서드를 인수로 전달할 수 있으므로 일단은 람다 표현식이 익명 클래스와 비슷하다고 생각하자.
- 람다가 기술적으로 자바 8 이전의 바로 할 수 없었던 일을 제공하는 것은 아니다.
- **다만 동작 파라미터를 이용할 때 익명 클래스 등 판에 박힌 코드를 구현할 필요가 없다.**
- **람다 표현식은 광범위하게 사용되므로 이 장의 내용을 완벽하게 이해해야 한다.**

## 람다의 기본 문법
- 표현식 스타일
    - `(parameters) -> expression`
    - `return`을 명시하지 않는다.
- 블록 스타일
    - `(parameters) -> { statements; }`
    - 명시적으로 `return`문을 사용해야 한다.

## 람다란 무엇인가?

- **람다 표현식**은 메서드로 전달할 수 있는 익명 함수를 단순화한 것이라고 할 수 있다.
- 람다의 특징
  1. **익명** 
       - 보통의 메서드와 달리 이름이 없으므로 **익명**이라 표현한다.
  2. **함수**
       - 람다는 메서드처럼 특정 클래스에 종속되지 않으므로 함수라고 부른다.
       - 하지만 메서드 처럼 **파라미터 리스트** , **바디** , **반환 형식** , **발생할 수 있는 예외 리스트**는 가질 수 있다.
  3. **전달**
       - **람다 표현식을 메서드 인수로 전달하거나 변수로 저장할 수 있다.**
  4. **간결성**
       - 익명 클래스처럼 많은 자질구레한 코드를 구현할 필요가 없다.
- `Comparator`를 구현하는 기존 코드
```java
Comparator<Apple> byWeight = new Comparator<Apple>(){
    public int compare(Apple a1 , Apple a2){
        return a1.getWeight().compareTo(a2.getWeight());
    }
};
```
- `람다`를 사용한 코드
```java
Comparator<Apple> byWeight = (Apple a1 , Apple a2) -> a1.getWeight().compareTo(a2.getWeight());
```

![](../../../assets/images/books/modernJavaInAction/lambdaExpression/lambdaExpression.png)

- **파라미터 리스트**
  - `Comparator`의 `compare`메서드 파라미터
- **화살표**
  - **람다의 파라미터 리스트와 바디를 구분한다.**
- **람다 바디**
  - 두 사과 무게를 비교한다. **람다의 반환값에 해당하는 표현식이다.**

## 람다 표현식 예제

```java
(String s) -> s.length
```
- `String` 형식의 파라미터 하나를 가지며 `int`를 반환한다.
- **람다 표현식에는 return이 함축되어 있으므로 return 문을 명시적으로 사용하지 않아도 된다.**

```java
(Apple a) -> a.getWeight() > 150
```
- `Apple`형식의 파라미터 하나를 가지며 `boolean`을 반환한다.

```java
(int x , int y) -> {
    System.out.println("Result : " + x + y);
}
```
- `int`형식의 파라미터 두 개를 가지며 `void` 리턴이다.
- **람다 표현식은 여러 행의 문장을 포함할 수 있다.**

```java
() -> 42
```
- 파라미터가 없으며 `int` 42를 반환한다.

## **어디에 , 어떻게 람다를 사용할까?**
- **함수형 인터페이스**라는 문맥에서 람다 표현식을 사용할 수 있다.

### 함수형 인터페이스
- **정확히 하나의 추상 메서드를 지정하는 인터페이스**

- `java.util.Comparator`
```java
public interface Comparator<T>{
    int compare(T o1 , T o2);
}
```

- `java.lang.Runnable`
```java
public interface Runnable{
    void run();
}
```

- `java.awt.event.ActionListener`
```java
public interface ActionListener extends EventListener{
    void actionPerformed(ActionEvent e);
}
```

- `java.util.concurrent.Callable`
```java
public interface Callable<V>{
    V call() thorws Exception;
}
```

- `java.security.PrivilegedAction`
```java
public interface PrivilegedAction<T>{
    T run();
}
```

> - 인터페이스는 **디폴트 메서드 (인터페이스의 메서드를 구현하지 않은 클래스를 고려해서 기본 구현을 제공하는 바디를 포함하는 메서드)** 를 포함할 수 있다.
> - 📌 많은 디폴트 메서드가 있더라도 **추상 메서드가 오직 하나** 이면 함수형 인터페이스다.