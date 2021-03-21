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

# ✋**IntelliJ 외부 .jar 라이브러리 추가**
- AST 접근 및 자바 코드 수정,삽입을 위한 [javac.jar](https://jar-download.com/artifacts/org.kohsuke.sorcerer/sorcerer-javac/0.11/source-code)
- [JDK 내부 API의 javac를 사용하지 못하는 이유]()

1. Project Structure - (Shift + Ctrl + Alt + S)
![](../../assets/images/toy-project/1.png)
1. 원하는 .jar 선택
![](../../assets/images/toy-project/2.png)
1. 프로젝트 선택
![](../../assets/images/toy-project/3.png)

> 🚨 **`com.sun.*` import시 JDK 내부에있는 라이브러리가 import된다면**
> ![](../../assets/images/toy-project/4.png)


# **Jeong-Lombok** [Github](https://github.com/jeongcode/jeong-lombok)
- JAVA11 , IntelliJ 2020.2.4
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
