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
- 📌 함수형 인터페이스로 뭘 할 수 있을까?
  - 람다 표현식으로 함수형 인터페이스의 추상 메서드 구현을 직접 전달할 수 있으므로 **전체 표현식을 함수형 인터페이스의 인스턴스로 취급**할 수 있다.
  - *기술적으로 따지면 함수형 인터페이스를 **구현한** 클래스의 인스턴스*

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

- `Runnable`이 오직 하나의 추상 메서드 `run`을 정의하는 함수형 인터페이스 이므로 아래 예제는 올바른 구현 코드이다.

```java
class Main {
    public static void main(String[] args) throws IOException {
        // 람다 사용
        Runnable r1 = () -> System.out.println("Hello World");

        // 익명 클래스 사용
        Runnable r2 = new Runnable(){
            public void run(){
                System.out.println("Hello World 2");
            }
        };

        process(r1);
        process(r2);
        // 직접 전달된 람다 표현식
        process(() -> System.out.println("Hello World 3"));

        // Hello World
        // Hello World 2
        // Hello World 3        
    }

    public static void process(Runnable r){
        r.run();
    }
}
```

### 함수 디스크립터
- 함수형 인터페이스의 추상 메서드 시그니처는 람다 표현식의 시그니처를 가리킨다.
- 람다 표현식의 [시그니처](https://wanna-b.tistory.com/75)를 서술하는 메서드를 **함수 디스크립터**라고 부른다.

### 왜 함수형 인터페이스를 인수로 받는 메서드에만 람다 표현식을 사용할 수 있을까?
- 언어 설계자들은 함수 형식(*람다 표현식을 표현하는데 사용한 시그니처와 같은 특별한 표기법*)을 추가하는 방법도 대안으로 고려했다.
- 하지만 언어 설계자들은 언어를 더 복잡하게 만들이 않는 현재 방법을 선택했다.
- **어디에 람다를 사용할 수 있을까?**

```java
1. 
    execute(() -> {});
    public void execute(Runnable r){
        r.run();
    }

2. 
    public Callable<String> fetch(){
        return () -> "Tricky Example";
    }
    System.out.println(fetch().call());

3. 
    Predicate<Apple> p = (Apple a) -> a.getWeight();
```

- 1번과 2번은 유효한 람다 표현식이다.
- `() -> {}`의 시그니처는 `() -> void`며 `Runnable`의 추상 메서드 `run`의 시그니처와 일치하므로 유효한 람다 표현식이다.
- `Callable<String>`의 시그니처는 `() -> String`이 된다.
- `(Apple a) -> a.getWeight()` 는 `(Apple) -> Integer`이므로 `Predicate`의 시그니처와 일치하지 않기 때문에 유효하지 않다.
- ✋ `Callable`

```java
@FunctionalInterface
public interface Callable<V> {
    /**
     * Computes a result, or throws an exception if unable to do so.
     *
     * @return computed result
     * @throws Exception if unable to compute a result
     */
    V call() throws Exception;
}
```

> - ✋ **`@FunctionalInterface`는 무엇인가?**
> - 함수형 인터페이스임을 가리키는 어노테이션이다.
> - `@FunctionalInterface`로 인터페이스를 선언했지만 실제로 함수형 인터페이스가 아니면 컴파일러가 에러를 발생시킨다.
> - 예를들어 , 추상 메서드가 한 개 이상이라면 **"Multiple nonoverriding abstract methods found int interface Foo"**(인터페이스 Foo에 오버라이드 하지 않은 여러 추상 메서드가 있다) 같은 에러가 발생할 수 있다.

## **람다 활용 : 실행 어라운드 패턴**
- 람다와 동작 파라미터화로 유연하고 간결한 코드를 구현하는 데 도움을 주느 실용적인 예제를 살펴보자
- **자원 처리** (예를 들면 , 데이터 베이스의 파일처리)에 사용하는 **순환 패턴**은 자원을 열고 , 처리한 다음에 , 자원을 닫는 순서로 이루어진다.
- 즉 , **실제 자원을 처리하는 코드**를 **설정**과 **정리** 두 과정이 둘러싸는 형태를 **실행 어라운드 패턴**이라고 부른다.

```java
    public String processFile() throws IOException{
        try(BufferedReader br = new BufferedReader(new FileReader("data.txt"));){
            return br.readLine();
        }
    }
```

- ✋ 해당 예제는 자바 7에 새로 추가된 [try-with-resources](https://ryan-han.com/post/java/try_with_resources/)를 사용했다.

### 1단계 : **동작 파라미터화를 기억하라**
- 현재 코드는 파일에서 한 번에 한 줄만 읽을 수 있다.
- 한 번에 두 줄을 읽거나 가장 자주 사용되는 단어를 반환하려면 어떻게 해야할까?
- 기존의 설정 , 정리 과정은 재사용하고 `processFile`메서드의 동작을 파라미터화 해야한다.