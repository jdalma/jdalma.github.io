---
layout: default
title: RESTful API
parent: 네트워크
nav_order: 6
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

- 이 글은 아래의 글들을 참고하여 작성되었습니다
  - **[restfulapi.net](https://restfulapi.net/)**
  - **[RESTful API Designing guidelines — The best practices 번역글](https://wayhome25.github.io/etc/2017/11/26/restful-api-designing-guidelines/)**
  - **[rest-api](https://hudi.blog/rest-api/)**
  - **[RestAPI 제대로 알고 사용하기](https://meetup.toast.com/posts/92)**
  - [URI 와 URL](https://github.com/CodingInterviewStudy/CrackingTheCodingInterview/wiki/7%EC%A3%BC%EC%B0%A8-2)

# API `Application Programming Interface` 란?
- ~~API라고 하면 WEB API로만 알고 있었어서 정리한다~~
- 소프트웨어간의 응답과 요청을 통한 **데이터 통신을 위한 방법과 규칙**을 의미한다
  - OS(`windows API`)에서도 제공할 수 있고 , 프로그래밍 언어(`JAVA API`) 에서도 제공할 수 있고 , 웹 어플리케이션(`Facebook API`)에서 제공할 수 있다
- 이후에 나오는 **API**는 **WEB API**를 칭한다
- **API**는 주로 **서버와 클라이언트 관점**에서 설명된다
  - *클라이언트는 `요청`을 보내고 , 서버는 `응답`한다*

# REST API `Representational State Transfer API` 란?
- 표준 혹은 프로토콜 같은 것이 아니라 , **일반적으로 통용되는 규약**이다
  - *정답이 아니라 일반적으로 권고되는 규칙*
- 이 REST 제약 조건을 잘 준수함을 **RESTful**하다고 표현한다

## 구성요소

1. **자원 `Resources`**
   - **HTTP**의 **URI**를 사용해 자원을 명시한다
   - 어떤 것의 대표 혹은 객체이다
     - *Animals* , *Schools* , *Employess*는 **Resource**이고 , *ADD* , *DELETE* , *UPDATE*는 이 `Resources`들에서 수행되는 **Operation**이다
