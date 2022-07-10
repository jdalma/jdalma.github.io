---
layout: default
title: Stream , Optional
parent: JAVA8
grand_parent: JAVA
nav_order: 4
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

# ✋[자바 8 Stream API 사용 시 주의사항](https://hamait.tistory.com/547)
# 📌 **Stream 소개**

-   <span style="color:red; font-weight:bold">데이터를 담고 있는 저장소(컬렉션)가 아니다.</span>
-   **Functional in nature ,** <span style="color:red; font-weight:bold">스트림이 처리하는 데이터 소스를 변경하지 않는다.</span>
-   <span style="color:red; font-weight:bold">스트림으로 처리하는 데이터는 오직 한 번만 처리한다.</span>
    -   **(실시간으로 들어오는 데이터)무제한일 수도 있다.**
        -   **(무제한 이지만 특정 조건으로)[Short Circuit 메서드](https://m.blog.naver.com/priince/221715332621)를 사용해서 제한할 수 있다.**
-   **중개 오퍼레이션은 근본적으로 lazy하다.**
-   **손쉽게 병렬 처리할 수 있다.**

> ✋ **병렬 처리를 쓴다고 꼭 빨라지는 것은 아니다.**

## **스트림 파이프라인**

-  **0 또는 다수의 중개 오퍼레이션 (intermediate operation)과 한 개의 종료 오퍼레이션 (terminal operation)으로 구성한다.**
-  <span style="color:red; font-weight:bold">스트림의 데이터 소스는 오직 종료 오퍼레이션을 실행할 때에만 처리한다.</span>

## **중개 오퍼레이션**

-   **Stream을 리턴한다.**
-   Stateless / Stateful 오퍼레이션으로 더 상세하게 구분할 수도 있다.
    -   대부분은 Stateless지만 `distinct`나 `sorted`처럼 이전 소스 데이터를 참조해야 하는 오퍼레이션은 Stateful 오퍼레이션이다.
-   `filter` , `map` , `limit` , `skip` , `sorted` , ...

## **종료 오퍼레이션**

-   **Stream을 리턴하지 않는다.**
-   `collect` , `allMatch` , `count` , `forEach` , `min` , `max` , ...

## 📌 **예제**

### 스트림이 처리하는 데이터 소스를 변경하지 않는다.

```java
        List<String> names = new ArrayList<>();
        names.add("jeong");
        names.add("park");
        names.add("baek");
        names.add("kim");
        names.add("lee");

//        Stream<String> strStream = names.stream().map(s -> s.toUpperCase());
        Stream<String> strStream = names.stream().map(String::toUpperCase);
        // 대문자로 변경된 데이터는 strStream에 담겨 있다.
        strStream.forEach(System.out::println);

        System.out.println("=============================");
        // names 의 데이터가 변경 되지 않은걸 볼 수 있다.
        names.forEach(System.out::println);

//        출력
//        JEONG
//        PARK
//        BAEK
//        KIM
//        LEE
//        =============================
//        jeong
//        park
//        baek
//        kim
//        lee
```

### 종료형 오퍼레이터 유무

```java
        List<String> names = new ArrayList<>();
        names.add("jeong");
        names.add("park");
        names.add("baek");
        names.add("kim");
        names.add("lee");

        // 출력 되지 않는다.
        // 종료형 오퍼레이터가 실행 되기 전에는 중개형 오퍼레이터는 실행 하지 않는다.
        // (단지 정의만 한것이다.)
        names.stream().map((s) ->{
            System.out.println("종료형 오퍼래이터가 붙지 않았을 때 : " + s);
            return s.toUpperCase();
        });

        // 종료형 오퍼레이터 (collect)가 붙었을 때
        List<String> collect = names.stream().map((s) ->{
                                System.out.println("종료형 오퍼래이터가 붙었을 때 : " + s);
                                return s.toUpperCase();
                            }).collect(Collectors.toList());

//        출력
//        종료형 오퍼래이터가 붙었을 때 : jeong
//        종료형 오퍼래이터가 붙었을 때 : park
//        종료형 오퍼래이터가 붙었을 때 : baek
//        종료형 오퍼래이터가 붙었을 때 : kim
//        종료형 오퍼래이터가 붙었을 때 : lee
```

### ✋ 종료형 오퍼레이터는 없지만 인스턴스가 사용될 때

```java
        List<String> names = new ArrayList<>();
        names.add("jeong");
        names.add("park");
        names.add("baek");
        names.add("kim");
        names.add("lee");


        Stream<Object> collect3 = names.stream().map((s) ->{
            System.out.println("종료형 오퍼래이터가 붙지 않고 , 인스턴스가 사용되지 않을 때: " + s);
            return s.toUpperCase();
        });

        Stream<Object> collect4 = names.stream().map((s) ->{
            System.out.println("종료형 오퍼래이터가 붙지 않고 , 인스턴스가 사용될 때 : " + s);
            return s.toUpperCase();
        });
        collect4.forEach(System.out::println);

//        출력
//        종료형 오퍼래이터가 붙지 않고 , 인스턴스가 사용될 때 : jeong
//        JEONG
//        종료형 오퍼래이터가 붙지 않고 , 인스턴스가 사용될 때 : park
//        PARK
//        종료형 오퍼래이터가 붙지 않고 , 인스턴스가 사용될 때 : baek
//        BAEK
//        종료형 오퍼래이터가 붙지 않고 , 인스턴스가 사용될 때 : kim
//        KIM
//        종료형 오퍼래이터가 붙지 않고 , 인스턴스가 사용될 때 : lee
//        LEE
```
-   인스턴스가 사용되지 않는 collect3은 중개형 오퍼레이터가 실행되지 않는다.
-   인스턴스가 사용되는 collect4는 중개형 오퍼레이터가 실행 되지만 출력 순서가 조금 이상하다. `lazy`

### stream , parallelStream

```java
        List<String> names = new ArrayList<>();
        names.add("jeong");
        names.add("park");
        names.add("baek");
        names.add("kim");
        names.add("lee");

        List<String> collectTest = names.stream().map((s) -> {
            System.out.println("stream 처리 : " + s + " " + Thread.currentThread().getName());
            return s.toUpperCase();
        }).collect(Collectors.toList());

        // 병렬 처리
        // (spliterator의 trySplit을 사용하여 쪼개서 처리한다.)
        List<String> collectTest2 = names.parallelStream().map((s) -> {
            System.out.println("parallelStream 처리 : " + s + " " + Thread.currentThread().getName());
            return s.toUpperCase();
        }).collect(Collectors.toList());

//        출력
//        stream 처리 : jeong main
//        stream 처리 : park main
//        stream 처리 : baek main
//        stream 처리 : kim main
//        stream 처리 : lee main
//        parallelStream 처리 : baek main
//        parallelStream 처리 : lee ForkJoinPool.commonPool-worker-3
//        parallelStream 처리 : park ForkJoinPool.commonPool-worker-5
//        parallelStream 처리 : kim ForkJoinPool.commonPool-worker-3
//        parallelStream 처리 : jeong ForkJoinPool.commonPool-worker-5
```

## **참고**
[https://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html](https://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html)
{: .fh-default .fs-4 }
[https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html)
{: .fh-default .fs-4 }

***

# **Stream API 사용 예제**

## **걸러내기**
-   **Filter(Predicate)**
-   예) 이름이 3글자 이상인 데이터만 새로운 스트림으로

## **변경하기**
-   **Map(Function) 또는 [FlatMap](https://madplay.github.io/post/difference-between-map-and-flatmap-methods-in-java)(Function)**
-   예) 각각의 Post 인스턴스에서 String title만 새로운 스트림으로

## **생성하기**
-   **generate(Supplier) 또는 Iterate(T seed , UnaryOperator)**

## **제한하기**
-   **limit(long) 또는 skip(long)**

## **에제**

```java
public class ClassForStreamAPIPractice {
    private Integer id;
    private String title;
    private boolean closed;

    public ClassForStreamAPIPractice(Integer id, String title, boolean closed) {
        this.id = id;
        this.title = title;
        this.closed = closed;
    }

    // getter , setter . toString 생략
}

    List<ClassForStreamAPIPractice> springClasses = new ArrayList<>();
    springClasses.add(new ClassForStreamAPIPractice(1 , "spring boot" , true));
    springClasses.add(new ClassForStreamAPIPractice(2 , "spring data jpa" , true));
    springClasses.add(new ClassForStreamAPIPractice(3 , "spring mvc" , false));
    springClasses.add(new ClassForStreamAPIPractice(4 , "spring core" , false));
    springClasses.add(new ClassForStreamAPIPractice(5 , "rest api development" , false));

    List<ClassForStreamAPIPractice> javaClasses = new ArrayList<>();
    javaClasses.add(new ClassForStreamAPIPractice(6 , "The Java , Test" , true));
    javaClasses.add(new ClassForStreamAPIPractice(7 , "The Java , Code manipulation" , true));
    javaClasses.add(new ClassForStreamAPIPractice(8 , "The Java , 8 to 11" , false));

    List<List<ClassForStreamAPIPractice>> keesunEvents = new ArrayList<>();
    keesunEvents.add(springClasses);
    keesunEvents.add(javaClasses);

```

- **spring으로 시작하는 수업 출력**
```java
springClasses.stream()
             .filter(sc -> sc.getTitle().startsWith("spring"))
             .forEach(sc -> System.out.println(sc.getId()));
```
- **spring으로 시작하는 수업 리스트로 반환**
```java
List<ClassForStreamAPIPractice> exam1List = 
            springClasses.stream()
                         .filter(oc -> oc.getTitle().startsWith("spring"))
                         .collect(Collectors.toList());
```
- **close 되지 않은 수업**
```java
springClasses.stream()
             .filter(oc -> !oc.isClosed())
             .forEach(oc -> System.out.println(oc.getId()));
```
- **close 되지 않은 수업** (스태틱 메서드와 메서드 레퍼런스 활용)
```java
springClasses.stream()
             .filter(Predicate.not(ClassForStreamAPIPractice::isClosed))
             .forEach(oc -> System.out.println(oc.getId()));
```
- ✋ **Predicate 인터페이스 static method**
```java
    static <T> Predicate<T> isEqual(Object targetRef) {
        return (null == targetRef)
                ? Objects::isNull
                : object -> targetRef.equals(object);
    }

    @SuppressWarnings("unchecked")
    static <T> Predicate<T> not(Predicate<? super T> target) {
        Objects.requireNonNull(target);
        return (Predicate<T>)target.negate();
    }
```
- **수업 이름만 모아서 스트림 만들기**
```java
springClasses.stream()
             .map(ClassForStreamAPIPractice::getTitle)
             .forEach(System.out::println);
```

- **두 수업 리스트가 담긴 리스트 기준으로 모든 수업 출력**
```java
keesunEvents.forEach(subList -> subList.forEach(System.out::println));
```

- **두 수업 리스트가 담긴 리스트 기준으로 모든 수업 출력** (flatMap 사용)
```java
keesunEvents.stream()
            .flatMap(Collection::stream)
            .forEach(System.out::println);
```

- **1부터 1씩 증가하는 무제한 스트림 중에서 앞에 10개 빼고 최대 10개 까지만**
```java
Stream.iterate(1 , i  -> i + 1)
      .skip(10)
      .limit(10)
      .forEach(System.out::println);
```

- **자바 수업 중에 Test가 붙어 있는 수업이 있는지 확인**
```java
boolean test = javaClasses.stream()
                          .anyMatch(oc -> oc.getTitle().contains("Test"));
```

- **스프링 수업 중에 제목에 spring이 들어간 제목만 모아서 List로 반환**
```java
List<String> titleList = 
            springClasses.stream()
                         .map(ClassForStreamAPIPractice::getTitle)
                         .filter(t -> t.contains("spring"))
                         .collect(Collectors.toList());
```

- **스프링 수업 중에 제목에 spring이 들어간 객체를 모아서 List로 반환**
```java
List<ClassForStreamAPIPractice> objList = 
            springClasses.stream()
                         .filter(oc -> oc.getTitle().contains("spring"))
                         .collect(Collectors.toList());
```

## **심화 예제** [출처](https://jeong-pro.tistory.com/212)
```java
    List<List<String>> persons = Arrays.asList(
        Arrays.asList("김프로,축구:농구:야구,구기종목 좋아요".split(",")),
        Arrays.asList("정프로,개발:당구:족구,개발하는데 뛰긴 싫어".split(",")),
        Arrays.asList("앙몬드,피아노, 죠르디가 좋아요 좋아좋아너무좋아".split(",")),
        Arrays.asList("죠르디,스포츠댄스:개발,개발하는 죠르디".split(","))
    );
```

- **취미별 인원 수**

```java
Map<String, Integer> result = new HashMap<>();

persons.stream()
        .flatMap(member -> Arrays.stream(member.get(1).split(":")))
        .forEach(hobby -> result.merge(hobby , 1 , (oldValue , newValue) -> ++oldValue));

result.entrySet().forEach(entry-> System.out.println(entry.getKey() + " " + entry.getValue()));

//		스포츠댄스 1
//		족구 1
//		당구 1
//		개발 2
//		야구 1
//		피아노 1
//		농구 1
//		축구 1
```

- ✋ **Map의 merge**

```java
    default V merge(K key, V value, BiFunction<? super V, ? super V, ? extends V> remappingFunction) {
        Objects.requireNonNull(remappingFunction);
        Objects.requireNonNull(value);
        V oldValue = get(key);
        V newValue = (oldValue == null) ? value :
                   remappingFunction.apply(oldValue, value);
        if (newValue == null) {
            remove(key);
        } else {
            put(key, newValue);
        }
        return newValue;
    }
```

- **취미별 정씨 성을 갖는 멤버 수**

```java
    Map<String, Integer> result = new HashMap<>(); 
    persons.stream()
            .filter(member-> member.get(0).startsWith("정"))
            .flatMap(member -> Arrays.stream(member.get(1).split(":")))
            .forEach(hobby -> result.merge(hobby, 1, (oldValue, newValue) -> ++oldValue));
    
    result.entrySet().forEach(entry-> System.out.println(entry.getKey() + " " + entry.getValue()));

//		족구 1
//		당구 1
//		개발 1
```

- **소개 내용에 '좋아'가 몇 번 등장하는지 구하라**

```java
    final String word = "좋아"; 
    int result = persons.stream()
                        .map(member -> countFindString(member.get(2), word))
                        .reduce(0, Integer::sum); 
    System.out.println(word + " " + result);


private static int countFindString(String source , String target) {
    int idx = source.indexOf(target);
    if(idx == -1) {
        return 0;
    }
    else {
        return 1 + countFindString(source.substring(idx + 1) , target);
    }
}

// 좋아 5
```

***

# **Optional**

**오직 값 한 개가 들어있을 수도 없을 수도 있는 컨테이너**
{: .label .label-blue }

✅ **자바 8부터 Optional을 리턴한다.**
{: .fh-default .fs-4 }

✅ **클라이언트 코드에게 명시적으로 빈 값일 수도 있다는 걸 알려주고 , 빈 값인 경우에 대한 처리를 강제한다.**
{: .fh-default .fs-4 }

### **Optional만들기**

-   Optional.of()
-   Optional.ofNullable()
-   Optional.empty()

### **Optional에 값이 있는지 없는지 확인하기**

-   isPresent()
-   isEmpty() - JAVA11부터 제공

### **Optional에 있는 값 가져오기**

-   get()

### **Optional에 값이 있는 경우에 그 값을 가지고 ~~~을 하라.**

-   ifPresent(Consumer)

### **Optional에 값이 있으면 가져오고 없는 경우에 ~~~을 리턴하라.**

-   [orElse](http://homoefficio.github.io/2019/10/03/Java-Optional-%EB%B0%94%EB%A5%B4%EA%B2%8C-%EC%93%B0%EA%B8%B0/)(T)

### **Optional에 값이 있으면 가져오고 없는 경우에 ~~~을 하라.**

-   orElseGet(Supplier)

### **Optional에 값이 있으면 가져오고 없는 경우에 에러를 던져라.**

-   orElseThrow()

### **Optional에 들어있는 값 걸러내기**

-   Optional filter(Predicate)

### **Optional에 들어있는 값 변환하기**

-   Optional map(Function)
-   Optional flatMap(Function) : Optional 안에 들어있는 인스턴스가 Optional인 경우에 사용하면 편리하다.

### **예제**
> **OnlineClass (Entity)**

```java
public class OnlineClass {
    private Integer id;
    private String title;
    private boolean closed;
    public Progress progress;

    public OnlineClass(Integer id, String title, boolean closed) {
        this.id = id;
        this.title = title;
        this.closed = closed;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isClosed() {
        return closed;
    }

    public void setClosed(boolean closed) {
        this.closed = closed;
    }

    public Optional<Progress> getProgress() {
//        return Optional.of(progress);     // null이 들어오면 예외가 난다.
        return Optional.ofNullable(progress);

    }

    public void setProgress(Progress progress) {
        this.progress = progress;
    }
    @Override
    public String toString() {
        return "OnlineClass{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", closed=" + closed +
                '}';
    }
}

```

> **Progress (Entity)**

```java
public class Progress {
    private Progress studyDuration;
    private boolean finished;

    public Progress getStudyDuration() {
        return studyDuration;
    }
    public void setStudyDuration(Progress studyDuration) {
        this.studyDuration = studyDuration;
    }
}

```

> **AppForOptionalTest**

```java
public class AppForOptionalTest {
    public static void main(String[] args) {
        List<OnlineClass> springClasses = new ArrayList<>();
        springClasses.add(new OnlineClass(1 , "spring boot" , true));
        springClasses.add(new OnlineClass(5 , "rest api development" , false));

        // Optional로 리턴되는 스트림의 종료 오퍼레이션이 존재한다.
        Optional<OnlineClass> spring = springClasses.stream()
                    .filter(oc -> oc.getTitle().startsWith("spring"))
                    .findFirst();

        // 존재하는지 ?
        boolean isPresent = spring.isPresent();
        System.out.println(isPresent);    // true

        // 비었는지 ?
        boolean isEmpty = spring.isEmpty();    // JAVA11부터
        System.out.println(isEmpty);   // false

        // 값 가져오기 (값이 있을 때)
        OnlineClass get = spring.get();
        System.out.println(get);

        // 값이 없을 때 get을 바로 하게 되면 예외 발생
        OnlineClass onlineClass2 = spring.get();
        System.out.println(onlineClass2);
        // java.util.NoSuchElementException
        // ifPresent를 사용하여 값이 있는지 없는지 체크하여야 한다.
        spring.ifPresent(oc -> System.out.println(oc.getTitle()));

        // orElse는 Optional 값이 있든 없든 orElse(...) 안의 ...은 무조건 실행된다.
        OnlineClass orElse1 = spring.orElse(createNewClass());
        OnlineClass orElse2 = spring.orElse(new OnlineClass(11 , "NewClass2" , false));

        // orElseGet은 Optional 값이 있으면 orElseGet(...) 안의 ...은 실행되지 않는다.
        // 람다 표현식
        OnlineClass orElseGet1 = spring.orElseGet(() -> createNewClass());
        // 메서드 레퍼런스
        OnlineClass orElseGet2 = spring.orElseGet(AppForOptionalTest::createNewClass);

        // orElseThrow
        // 값이 존재 하지 않으면 java.util.NoSuchElementException 예외를 발생한다.
        OnlineClass orElseThrow1 = spring.orElseThrow();
        // 메서드 레퍼런스 (예외를 지정할 수도 있다.)
        OnlineClass orElseThrow2 = spring.orElseThrow(IllegalArgumentException::new);

        // filter
        Optional<OnlineClass> filter = spring.filter(oc -> !oc.isClosed());

        // map
        // 메소드 레퍼런스
        Optional<String> strMap = spring.map(OnlineClass::getTitle);

        // flatMap
        // OnlineClass getProgress는 Optional<Progress>를 반환한다.
        // 그러면 Optional<Optional<Progress>>가 된다.
        // 이걸 유용하게 꺼낼 수 있게 해주는 메소드 flatMap이다.
        Optional<Progress> flatMap = spring.flatMap(OnlineClass::getProgress);

        // flatMap을 사용하지 않으면 이렇게 2번 체크해야 한다.
        Optional<Optional<Progress>> progress1 = spring.map(OnlineClass::getProgress);
        Optional<Progress> progress2 = progress1.orElse(Optional.empty());
    }
    private static OnlineClass createNewClass(){
        return new OnlineClass(10 , "New Class" , false);
    }
}
```

### ❗ **주의할 것**

-   <span style="color:red; font-weight:bold">리턴값으로만 쓰기를 권장한다.</span>**(메서드 매개변수 타입 , 맵의 키 타입 , 인스턴스 필드 타입으로 쓰지 말자.)**
-   **Optional을 리턴하는 메서드에서 null을 리턴하지 말자.**
-   **프리미티브 타입용 Optional이 따로 있다.**
    -   **OptionalInt , OptionalLong , ...**

-   **Collection , Map , Stream Array , Optional은 Optional로 감싸지 말 것**

