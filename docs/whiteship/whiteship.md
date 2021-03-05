---
layout: default
title: Whiteship 라이브 스터디
nav_order: 70
permalink: /docs/whiteship
---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---
## **Whiteship 10주차(멀티쓰레드) 보기**

### Keyword
-   Actor model
-   [**동시성 과 병렬성**](https://vallista.kr/2019/12/28/%EB%8F%99%EC%8B%9C%EC%84%B1%EA%B3%BC-%EB%B3%91%EB%A0%AC%EC%84%B1-Concurrency-Parallelism/)
-   <span style="color:red; font-weight:bold">Critical Path</span>
    -   **전체 실행시간에 영향을 미치는 작업**
    -   **동시 작업이 진행되었을 때 가장 긴 시간이 걸리는 것**
-   **경쟁 상태 (race condition)**
    -   **Lock과 Condition을 이용하면 설변적인 통지가 가능**
    -   parkadd.tistory.com/48
-   **VisualVM**
    -   [visualvm.github.io/](https://visualvm.github.io/)
    -   heap dump
    -   thread dump

### 참고 링크
[10주차 과제: 멀티쓰레드 프로그래밍](https://github.com/whiteship/live-study/issues/10)
- [yadon079.github.io](https://yadon079.github.io/)
- [Thread - www.notion.so](https://www.notion.so/Thread-5fdb5d603a6a473186bf2738f482cedc)

***

## **Whiteship 11주차(Enum) 보기**

### Keyword
-  <span style="color:red; font-weight:bold">ordinal()</span>
    -   **정의된 순서를 반환한다**
    -   **순서가 바뀔 수 있기 때문에 순서를 사용해서는 안된다**
    -   **JPA에서 사용시에도 enum타입은 ordinal을 쓰기보다는 타입을 String으로 지정해 문자가 들어가게 해야한다.**
-   **타입 세이프티 (type safety)**
-   **EnumSet**
-   **EnumMap**

### 참고 링크
[11주차 과제: Enum](https://github.com/whiteship/live-study/issues/11)
- [parkadd.tistory.com](https://parkadd.tistory.com/50)
- [wisdom-and-record.tistory.com](https://wisdom-and-record.tistory.com/52)
- [blog.naver.com/hsm622](https://blog.naver.com/hsm622/222218251749)

[Querydsl - Unified Queries for Java](http://www.querydsl.com/)

***

## **Whiteship 12주차(Annotation) 보기**

### Keyword

-   **런타임중에 알아내야할 값(동적)은 Annotation에 들어가지 못한다.**
    -   컴파일 수준(정적)에서 해석되어야 한다.
-   **@Retention**
    -   SOURCE
    -   CLASS
    -   RUNTIME
-   **@Inherited**
    -   자식 클래스에게도 상속이 가능하게
-   **AnnotationProcessor**
-   **Javadoc**
    -   [mockito 의 document](https://javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/Mockito.html)
-   Reflection
    -   **TmpClass.class.getDeclaredFields()**
        -   부모클래스 제외 , 자신의 private한 필드 까지
    -   **TmpClass.class.getFields()**
        -   부모클래스에 있는 것 과 자신의 public한 필드 까지
-   [JAVA의 ServiceLoader](https://docs.oracle.com/javase/8/docs/api/java/util/ServiceLoader.html)

### 참고 링크

[12주차 과제: 애노테이션](https://github.com/whiteship/live-study/issues/12)
- [Lombok @Getter, @Setter 직접 만들어 보자 - catch-me-java.tistory.com](https://catch-me-java.tistory.com/49)
- [www.notion.so](https://www.notion.so/12-386f4cd47d37448fa0252d3ed22b45b7#daf688bdb061428d80fde6fc17215e1c)
- [자바의 어노테이션과 리플랙션, 어노테이션 프로세서 - gowoonsori.site](https://gowoonsori.site/java/annotation/)
- [b-programmer.tistory.com](https://b-programmer.tistory.com/264)


***

## **Whiteship 13주차(I/O) 보기**

### Keyword
- try-with-resource 방법
- **보조 스트림**
  - `new BufferedInputStream(fileInputStream , {size(default:8192)});`
- **스트림과 채널 (Stream vs Channel)**
- **넌버퍼와 버퍼 (non-buffer vs buffer)** (성능 차이)
- **다이렉트/논 다이렉트 버퍼**
  - in memory data grid
  - [bytebuffer oracle article](https://blogs.oracle.com/javamagazine/creating-a-java-off-heap-in-memory-database)
- **블로킹과 넌블로킹 (Blocking vs non-blocking)**


### 참고 링크

[13주차 과제: I/O](https://github.com/whiteship/live-study/issues/13)
- [www.notion.so](https://www.notion.so/I-O-af9b3036338c43a8bf9fa6a521cda242)
- 📌[자바의 입출력](https://blog.naver.com/swoh1227/222237603565)
- 📌[NIO의 버퍼, 채널, 셀렉터, 파일 입출력 예제](https://blog.naver.com/swoh1227/222244309304)
- 📌[성능비교](https://velog.io/@jaden_94/13%EC%A3%BC%EC%B0%A8-%ED%95%AD%ED%95%B4%EC%9D%BC%EC%A7%80-IO)
- 📌[직렬화](https://watrv41.gitbook.io/devbook/java/java-live-study/13_week)

***

## **Whiteship 14주차(Generic) 보기**

### Keyword
- 제네릭 사용법
- 제네릭 주요 개념 (바운디드 타입, 와일드 카드)
- 제네릭 메소드 만들기
- **Erasure 특성**
- **upper , lower bounded**
- **bridge method**

```java
// 런타임중에 타입을 알아낼 수 있다. (reflection)
this.getClass().getGenericSuperClass().getActualTypeArguments()[0]
```

### 참고 링크

[14주차 과제: Generic](https://github.com/whiteship/live-study/issues/14)
- [sujl95.tistory.com](https://sujl95.tistory.com/73)
- [Erasure](https://blog.naver.com/hsm622/222251602836)
- [BridgeMethod , 제네릭타입 주의사항](https://rockintuna.tistory.com/102)
- [effectiveJava](https://github.com/cmg1411/effectiveJava)
