---
layout: default
title: JAVA8
parent: JAVA
has_children: true
nav_order: 1
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---
# **더 자바, Java 8**

자바 8에 추가된 기능들은 자바가 제공하는 API는 물론이고 스프링 같은 제 3의 라이브러리 및 프레임워크에서도 널리 사용되고 있습니다. 이 시대의 자바 개발자라면 반드시 알아야 합니다.

[www.inflearn.com](https://www.inflearn.com/course/the-java-java8/dashboard)

# **MetaSpace**
✅**JVM의 여러 메모리 영역 중에 PermGen 메모리 영역이 없어지고 Metaspace영역이 생겼다.**
{: .fh-default .fs-4 }

## **PermGen**
-   permanent generation 클래스 메타데이터를 담는 곳
-   **Heap 영역에 속함**
-   **기본값으로 제한된 크기를 가지고 있음**
-   `-XX:PermSize=N` , PermGen 초기 사이즈 설정
-   `-XX:MaxPermSize=N` , PermGen 최대 사이즈 설정

## **Metaspace**

-   클래스 메타데이터를 담는 곳
-   **Heap영역이 아니라 , Native 메모리 영역이다. (OS가 제공하는 메모리)**
-   **기본값으로 제한된 크기를 가지고 있지 않다.** <span style="color:red; font-weight:bold">(필요한 만큼 계속 늘어난다.)</span>
-   **자바8 부터는 PermGen관련 java 옵션은 무시한다.**
-   `-XX:MetaspaceSize=N` , Metaspace 초기 사이즈 설정
-   `-XX:MaxMetaspaceSize=N`, Metaspace 최대 사이즈 설정


[Java Memory Profiling에 대하여 – ① JVM 메모리 이해와 케이스 스터디 : 네이버 포스트 (naver.com)](https://m.post.naver.com/viewer/postView.nhn?volumeNo=23726161&memberNo=36733075)
{: .fh-default .fs-4 }

[Java Memory Profiling에 대하여 – ② 메모리 모니터링과 원인분석 : 네이버 포스트 (naver.com)](https://m.post.naver.com/viewer/postView.nhn?volumeNo=24042502&memberNo=36733075)
{: .fh-default .fs-4 }

[Java 8: From PermGen to Metaspace - DZone Java](https://dzone.com/articles/java-8-permgen-metaspace)
{: .fh-default .fs-4 }

***

# **어노테이션의 변화**

**두가지 큰 변화**
{: .fh-default .fs-4 }

-   자바8 부터 어노테이션을 **타입 선언부**에도 사용할 수 있게 됨
-   자바8 부터 **어노테이션을 중복해서 사용할 수 있게 됨**

## **타입 선언 부**

-   제네릭 타입
-   변수 타입
-   매개변수 타입
-   예외 타입
-   ...

### 타입에 사용할 수 있으려면

✅**TYPE_PARAMETER - 타입 변수에만 사용할 수 있다.**
{: .fh-default .fs-4 }

> **@Chicken**
```java
@Retention(RetentionPolicy.RUNTIME)
// 이 애노테이션 정보를 언제까지 유지할 것인가
@Target(ElementType.TYPE_PARAMETER)
// 이 애노테이션을 사용할 곳
public @interface Chicken {
}
```
```java
    public static void main(String[] args) {

    }
    static class FeelsLikeChicken<@Chicken T> {
        // <C> 는 타입 파라미터
        // print 메소드의 C는 타입
        public static <@Chicken C> void print(C c){

        }
    }
```

✅**TYPE_USE - 타입 변수를 포함해서 모든 타입 선언부에 사용할 수 있다.**
{: .fh-default .fs-4 }

> **@Chicken**

```java
@Retention(RetentionPolicy.RUNTIME)
// 이 애노테이션 정보를 언제까지 유지할 것인가
@Target(ElementType.TYPE_USE)
// 이 애노테이션을 사용할 곳
public @interface Chicken {
}
```
```java
    public static void main(@Chicken String[] args) throws @Chicken RuntimeException {
        List<@Chicken String> names = Arrays.asList("hyunjun");
    }
    static class FeelsLikeChicken<@Chicken T> {
        // <C> 는 타입 파라미터
        // print 메소드의 C는 타입
        public static <@Chicken C> void print(@Chicken C c){

        }
    }
```

***

## **중복 사용할 수 있는 어노테이션 만들기**
-   중복 사용할 어노테이션 만들기
-   중복 어노테이션 컨테이너 만들기
    -   **컨테이너 어노테이션**은 중복 어노테이션과 `@Retention` 및 `@Target`이 같거나 더 넓어야 한다.

> **@Chicken**
    ​
```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE_USE)
@Repeatable(ChickenContainer.class)
public @interface Chicken {
    String value();
}
​
```
​
> **ChickenContainer**
​
```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE_USE)
public @interface ChickenContainer {
    Chicken[] value();
}
```
​
```java
@Chicken("양념")
@Chicken("마늘")
@Chicken("간장")
@Chicken("후라이드")
public class AppForJava8Annotation {
​
    public static void main(String[] args) {
        Chicken[] chickens = App.class.getAnnotationsByType(Chicken.class);
​
        Arrays.stream(chickens).forEach( c ->{
            System.out.println(c.value());
        });
​
        ChickenContainer chickenContainer = App.class.getAnnotation(ChickenContainer.class);
        Arrays.stream(chickenContainer.value()).forEach(c -> {
            System.out.println(c.value());
        });
    }
}
```

# **Arrays.parallelSort() - 배열 병렬 정렬**

✅**Fork/Join 프레임워크를 사용해서 배열을 병렬로 정렬하는 기능을 제공한다.**
{: .fh-default .fs-4 }

✅**병렬 정렬 알고리즘**
{: .fh-default .fs-4 }
-   **배열을 둘로 계속 쪼갠다.**
-   **합치면서 정렬한다.**

```java
    public static void main(String[] args) {
        int size = 1500;
        int[] numbers = new int[size];
        Random random = new Random();

        IntStream.range(0, size).forEach(i -> numbers[i] = random.nextInt());
        long start = System.nanoTime(); // 시작 시간
        Arrays.sort(numbers); // Thread를 하나만 쓴다. 퀵 정렬
        System.out.println("serial sorting took " + (System.nanoTime() - start));

        IntStream.range(0, size).forEach(i -> numbers[i] = random.nextInt());
        start = System.nanoTime();  // 시작 시간
        Arrays.parallelSort(numbers);
        System.out.println("parallel sorting took " + (System.nanoTime() - start));

        // 출력
        // serial sorting took 951400
        // parallel sorting took 716100

        // 배열의 사이즈나 여러 가지 조건에 따라 결과가 다를수는 있다.
    }
```
