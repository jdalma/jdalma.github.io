---
layout: default
title: ArgumentResolver 확장하기 🚩
nav_order: 2
parent: 👨‍🔬 Lab
---

## ArgumentResolver 확장하기
{: .no_toc }

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---


- [Spring MVC](https://jdalma.github.io/docs/spring-core/springMVC1/#argumentresolver)에서 **ArgumentResolver**의 역할을 알게 되었다
  - **[ArgumentResolver를 이용한 유연성있는 파라미터 처리](https://blog.neonkid.xyz/238)**
  - **[Custom Handler Method ArgumentResolver 만들어보기](https://blog.advenoh.pe.kr/spring/HandlerMethodArgumentResolver-%EC%9D%B4%EB%9E%80/)**
  - **[Spring ArgumentResolver와 Interceptor](https://tecoble.techcourse.co.kr/post/2021-05-24-spring-interceptor/)**
  - **[instanceof, Class.isAssignableFrom](https://velog.io/@gillog/Java-instanceof-Class.isAssignableFrom)**

<br>

1. 요청이 들어온다.
2. filter가 작동한다. 이와 관련한 부분은 spring-security에서 자세히 확인할 수 있다.
3. DispatcherServlet에 전달된다. DispatcherServlet이란, Spring의 핵심 객체로, Client의 요청을 받고 응답을 주기까지의 모든 역할을 담당한다.
4. DispatcherServlet은 HandlerMapping을 통해 요청을 처리할 Controller를 찾는다.
   - *이 때, Controller를 찾고 Interceptor가 확인할 url과 일치하면 Interceptor의 preHandle이 실행된다.*
5. DispatcherServlet은 Controller를 실행해줄 HandlerAdapter를 찾는다.
   - **이 때, Adapter를 찾고 handle을 실행하기 위해 필요한 파라미터를 생성하기 위해 Resolver는 실행된다.**
6. HandlerAdapter는 Controller를 실행한다.
   - *이 때, Interceptor의 postHandle이 실행된다.*
7. DispatcherServlet은 실행한 결과를 ViewResolver에게 전달한다.
8. ViewResolver는 View에 전달한다.
   - *이 때, Interceptor의 afterCompletion 실행된다.*
9. DispatcherServletdms View로부터 받은 정보를 Client에 전달한다.
10. 응답을 반환한다.

