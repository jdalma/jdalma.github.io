---
layout: default
title: Garbage Collector
parent: JAVA
nav_order: 2
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

- **출처**
  - [Java Garbage Collection](https://d2.naver.com/helloworld/1329)
  - [Java Reference와 GC](https://d2.naver.com/helloworld/329631)
  - [GC(Garbage Collector) 종류 및 내부 원리](https://dongwooklee96.github.io/post/2021/04/04/gcgarbage-collector-%EC%A2%85%EB%A5%98-%EB%B0%8F-%EB%82%B4%EB%B6%80-%EC%9B%90%EB%A6%AC.html)
  - [ORACLE Java 8 Virtual Machine Specifications](https://docs.oracle.com/javase/specs/jvms/se8/html/index.html)
  - [JVM과 HotSpot의 차이점은 무엇입니까?](http://daplus.net/java-jvm%EA%B3%BC-hotspot%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90%EC%9D%80-%EB%AC%B4%EC%97%87%EC%9E%85%EB%8B%88%EA%B9%8C/)
- 이 글은 위의 출처에서 각 내용을 발췌하여 개인 기록용으로 작성하였다.


# **General Garbage Collection 가비지 컬렉션 과정**

> 🖐 `stop-the-world`란?
> 
> **GC**를 실행하기 위해 **JVM**이 애플리케이션 실행을 멈추는 것이다.
> 
> `stop-the-world`가 발생하면 **GC를 실행하는 쓰레드를 제외한 나머지 쓰레드는 모두 작업을 멈춘다.**
> 
> **GC** 작업을 완료한 이후에야 중단했던 작업을 다시 시작한다.
> 
> **GC 튜닝**이란 이 `stop-the-world`시간을 줄이는 것이다.

