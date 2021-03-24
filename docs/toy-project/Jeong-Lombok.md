---
layout: default
title: Jeong-Lombok
parent: Toy-Projects
nav_order: 1
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# ✋**Java11 com.sun import 문제**
- [JDK 9 이상 내부 API의 javac를 사용하지 못하는 이유](https://jeongcode.github.io/docs/exception/Java/#jdk-comsun-import-%EB%AC%B8%EC%A0%9C)
- `com.sun.*` JDK 9 이상 부터 모듈 기능이 추가 되면서 내부 라이브러리를 보호하게 되었다고한다. 메이븐 추가 설정 시 내부 라이브러리를 사용할 수 있지만 권장하지는 않는다고 한다.
- 이러한 이유로 외부 라이브러리 [javac.jar](https://jar-download.com/artifacts/org.kohsuke.sorcerer/sorcerer-javac/0.11/source-code)를 추가하여 아래의 방법을 사용해보았지만
- `package com.sun.tools.javac.util is declared in module jdk.compiler, which does not export it to the unnamed module` 예외는 계속 발생하였다.

## 외부 라이브러리 등록
1. Project Structure - (Shift + Ctrl + Alt + S)
- ![](../../assets/images/toy-project/1.png)
1. 원하는 .jar 선택
- ![](../../assets/images/toy-project/2.png)
1. 프로젝트 선택
- ![](../../assets/images/toy-project/3.png)

> 🚨 **Global Libraries설정**
> - ![](../../assets/images/toy-project/4.png)

## maven 의존성 추가
```html
<dependency>
  <groupId>org.kohsuke.sorcerer</groupId>
  <artifactId>sorcerer-javac</artifactId>
  <version>0.11</version>
</dependency>
```

## 정리
- **확실한 원인은 모르지만 당장은** <span style="color:red; font-weight:bold">JDK 8 버전으로 진행</span>
> Java 9에서 소개 된 Jigsaw 이전에 maven은 javac클래스를 참조하는 프로젝트를 빌드하기 위해 컴파일 타임 에 클래스 경로에 jar를 전달해야합니다
> **Maven jdk.tools 래퍼 의존성 추가 [출처](https://github.com/olivergondza/maven-jdk-tools-wrapper)**
> ```html
> <dependency>
> <groupId>com.github.olivergondza</groupId>
>  <artifactId>maven-jdk-tools-wrapper</artifactId>
> <version>0.1</version>
> </dependency>
> ```

# **Jeong-Lombok** [Github](https://github.com/jeongcode/jeong-lombok)
- JDK 8 , IntelliJ 2020.2.4
- 참고
  - [juejin.cn](https://juejin.cn/post/6844904082084233223#heading-1)


📌 **[Lombok은 어떻게 동작하는걸까? (AnnotationProcessor에 대해)](https://jeongcode.github.io/docs/java/Annotation%20Processor/)**
{: .fh-default .fs-4 }

📌 **[Java 컴파일러](https://jeongcode.github.io/docs/java/javac-principle/)**
{: .fh-default .fs-4 }


- **Treemaker** : Abstact Syntax Tree 를 생성하는데 사용하게 된다. JCTree는 AST를 만들어내는 최상위 클래스 이다. 하지만 JCTree를 이용하여 new 를 사용하여 직접 생성할 수 없기에 Context를 이용해 AST 를 인식하고 Treemaker 라는 객체를 사용해야 한다는 것이다.
- **Trees** : 어노테이션 프로스세의 process의 RoundEnvironment 가 코드의 element를 순회 하면서 받는 element의 정보들을 trees 에 넣기위해 선언
- **TreePathScanner** : 모든 하위 트리노드를 방문하고, 상위 노드에 대한 경로를 유지하는 tree visitor
- CompillationUnitTree 는 소스파일에서 패키지 선언에서 부터 abstract syntax tree 를 정의함
- ClassTree -> 클래스 , 인터페이스, enum 어노테이션을 트리노드로 선언
- class 정의 위에 어노테이션 작성시 내부적으로 메소드 실행
- CompilationUnitTree AST(Abstract Syntax Tree 의 최상단)
## **`@JeongGetter`**
- Class에만 허용한다.


## **`@JeongSetter`**
- Class에만 허용한다.


## **`@JeongToString`**
- Class에만 허용한다.
