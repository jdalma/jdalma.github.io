---
title: BlockingIO와 NonBlockingIO (작성중)
date: "2023-02-05"
tags:
   - Blocking
   - NonBlocking
---

회사에서 [1차 트레이닝 프로젝트](https://jdalma.github.io/2022y/trainingProject/)를 진행하며 `NIO`를 처음 접하게 되었다.  
- Armeria가 빌드될 때 `Netty`와 `TomcatService`를 같이 등록하게 된다.[참고](https://github.com/jdalma/armeria-grpc-kotlin/blob/master/src/main/kotlin/com/example/armeriaserver/grpc/sample/ArmeriaConfig.kt#L42)  
- 기존 REST를 유지시키면서 `gRPC`를 통한 비동기 통신을 추가하기 위해서이다.  
  
`NIO`와 `BIO`의 요청 흐름에 대해 알아보자  
먼저 읽으면 좋은 글  
[비동기 서버에서 이벤트 루프를 블록하면 안 되는 이유 3부 - Reactor 패턴과 이벤트 루프](https://engineering.linecorp.com/ko/blog/do-not-block-the-event-loop-part3#mcetoc_1gegucrd69)
  
**`Reactor` Class**  
`Selector`는 `SelectableChannel` 객체의 **[멀티플렉서](https://ko.wikipedia.org/wiki/%EB%A9%80%ED%8B%B0%ED%94%8C%EB%A0%89%EC%84%9C)**이다.  
- 여러 신호 중 하나를 선택하여 선택된 입력을 하나의 라인에 전달하는 장치  

`Selector`는 `SelectorProvider.provider().openSelector()`를 통해 생성할 수 있다. 시스템의 기본 `SelectorProvider`를 제공  


  
1. [Jboss netty와 netty의 차이점은 무엇입니까?](https://stackoverflow.com/questions/42781445/difference-between-jboss-netty-and-netty)
2. [비동기에서 이벤트 루프를 블록하면 안 되는 이유 시리즈](https://engineering.linecorp.com/ko/blog/author/%EA%B9%80%EC%A2%85%EB%AF%BC)
3. [`IBM` Servlet 4](https://developer.ibm.com/tutorials/j-javaee8-servlet4/)
4. [Java™ Servlet Specification 4.0 PDF](https://javaee.github.io/servlet-spec/downloads/servlet-4.0/servlet-4_0_FINAL.pdf)
5. [Apache Tomcat 9 docs](https://tomcat.apache.org/tomcat-9.0-doc/index.html)
6. [Netty User guide for 4.x](https://github.com/netty/netty/wiki/User-guide-for-4.x)
7. 사용중인 버전
   - [스프링 부트 `2.7.6`](https://github.com/spring-projects/spring-boot/releases/tag/v2.7.6)
   - Netty `4.1.82`
   - Armeria-bom `1.20.3`
