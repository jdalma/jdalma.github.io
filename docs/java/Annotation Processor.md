---
layout: default
title: Annotation Processor
parent: JAVA
nav_order: 6
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

# **Lombok은 어떻게 동작하는 걸까?**
✅ **`@Getter`, `@Setter`, `@Builder` 등의 애노테이션과 애노테이션 프로세서를 제공하여 표준적으로 작성해야 할 코드를 개발자 대신 생성해주는 라이브러리.**
{: .fh-default .fs-5 }

✅ **Annotation Processor의 대표적인 예**
{: .fh-default .fs-5 }

**[Lombok사용해보기](https://jeongcode.github.io/docs/spring/lombok-use/)**

**Maven**
```html
<dependency>
  <groupId>org.projectlombok</groupId>
  <artifactId>lombok</artifactId>
  <version>1.18.8</version>
  <scope>provided</scope>
</dependency>
```

> [Boilerplate code - 보일러플레이트 코드란?](https://charlezz.medium.com/%EB%B3%B4%EC%9D%BC%EB%9F%AC%ED%94%8C%EB%A0%88%EC%9D%B4%ED%8A%B8-%EC%BD%94%EB%93%9C%EB%9E%80-boilerplate-code-83009a8d3297)

## **동작 원리**
- 컴파일 시점에 **[애노테이션 프로세서](https://docs.oracle.com/javase/8/docs/api/javax/annotation/processing/Processor.html)** 를 사용하여 <span style="color:red; font-weight:bold">소스코드의 AST(abstract syntax tree)를 조작한다.</span> [AST??](https://javaparser.org/inspecting-an-ast/)
- **논란 거리**
  - 공개된 API가 아닌 컴파일러 내부 클래스를 사용하여 기존 소스 코드를 조작한다.
  -  특히 이클립스의 경우엔 java agent를 사용하여 컴파일러 클래스까지 조작하여 사용한다. 해당 클래스들 역시 공개된 API가 아니다보니 버전 호환성에 문제가 생길 수 있고 언제라도 그런 문제가 발생해도 이상하지 않다.
  -  그럼에도 불구하고 엄청난 편리함 때문에 널리 쓰이고 있으며 대안이 몇가지 있지만 롬복의 모든 기능과 편의성을 대체하진 못하는 현실이다.
    - [AutoValue](https://github.com/google/auto/blob/master/value/userguide/index.md)
    - [Immutables](https://immutables.github.io)


# **Annotation Processor 실습**
✅ **JAVA6 부터 제공하는 Annotation Processor API를 사용**
{: .fh-default .fs-5 }

✅ **[Processor 인터페이스](https://docs.oracle.com/en/java/javase/11/docs/api/java.compiler/javax/annotation/processing/Processor.html)** -  **여러 라운드(rounds)에 걸쳐 소스 및 컴파일 된 코드를 처리 할 수 있다.**

- **추후 Toy Project에 `JeongLombok`을 게시할 예정**
- 여기서는 핵심 로직만 확인하자.
- [Maven 설치](https://dev-youngjun.tistory.com/109)


> ✋ Resources 폴더 만들기
> - Resources폴더로 지정하여야 .jar안에 포함된다.
> - ![](../../assets/images/java/annotation-processor/1.png)


> ✋ **[AutoService](https://github.com/google/auto/tree/master/service) - 서비스 프로바이더 레지스트리 생성기 (이것도 Annotation Processor이다)**
> - 위에서 한 Resources 폴더를 따로 만들지 않아도 된다.
> - 컴파일 시점에 애노테이션 프로세서를 사용하여 `META-INF/services/javax.annotation.processor.Processor` 파일 자동으로 생성해 줌.
> ```html
> <dependency>
> <groupId>com.google.auto.service</groupId>
> <artifactId>auto-service</artifactId>
> <version>1.0-rc6</version>
> </dependency>
> ```
> ```java
> @AutoService(Processor.class)
> public class MagicMojaProcessor extends AbstractProcessor {
> ...
> }
> ```
