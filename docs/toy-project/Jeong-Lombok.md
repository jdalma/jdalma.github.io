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
- 짐작으로는 외부 라이브러리를 등록하였지만 JDK 내부를 여전히 임포트하여 예외가 나는 것 같다.
- 이유를 찾지 못해 **외부 라이브러리를 제거하고 JDK 1.8로 내린 후 빌드 하니 성공하였다.**
- **확실한 원인은 모르지만 당장은** <span style="color:red; font-weight:bold">JDK 8 버전으로 진행한다.</span>

## 외부 라이브러리 등록
1. Project Structure - (Shift + Ctrl + Alt + S)
![](../../assets/images/toy-project/1.png)
1. 원하는 .jar 선택
![](../../assets/images/toy-project/2.png)
1. 프로젝트 선택
![](../../assets/images/toy-project/3.png)

> 🚨 **Global Libraries설정**
> ![](../../assets/images/toy-project/4.png)

## maven 의존성 추가
```html
<dependency>
  <groupId>org.kohsuke.sorcerer</groupId>
  <artifactId>sorcerer-javac</artifactId>
  <version>0.11</version>
</dependency>
```


# **Jeong-Lombok** [Github](https://github.com/jeongcode/jeong-lombok)
- JDK 8 , IntelliJ 2020.2.4
- 참고
  - [juejin.cn](https://juejin.cn/post/6844904082084233223#heading-1)


📌 **[Lombok은 어떻게 동작하는걸까? (AnnotationProcessor에 대해)](https://jeongcode.github.io/docs/java/Annotation%20Processor/)**
{: .fh-default .fs-4 }

📌 **[Java 컴파일러](https://jeongcode.github.io/docs/java/javac-principle/)**
{: .fh-default .fs-4 }


## **`@JeongGetter`**
- Class에만 허용한다.


## **`@JeongSetter`**
- Class에만 허용한다.


## **`@JeongToString`**
- Class에만 허용한다.
