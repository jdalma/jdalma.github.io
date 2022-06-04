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
    - - **[HTTP 메소드 와 메소드에 따른 응답 상태](https://restfulapi.net/http-methods/)**
  - **[RESTful API Designing guidelines — The best practices 번역글](https://wayhome25.github.io/etc/2017/11/26/restful-api-designing-guidelines/)**
  - **[rest-api](https://hudi.blog/rest-api/)**
  - **[RestAPI 제대로 알고 사용하기](https://meetup.toast.com/posts/92)**
  - **[Differences between Search vs. Filter in softwares](https://uxpickle.com/search-vs-filter-in-softwares/)**
  - [URI 와 URL](https://velog.io/@torang/URL%EA%B3%BC-URI%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90)

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

# REST API 구성요소

1. **자원 `Resources`**
   - `URI`를 사용해 자원을 명시한다
   - 어떤 것의 대표 혹은 객체이
   - **집합체 `Collections`**는 자원들의 모임
2. **행위 `Verb`**
   - **HTTP의 Method** (`POST`, `GET`, `PUT`, `PATCH`, `DELETE` 등) 사용하여 명시된 자원에 대한 CRUD(Create, Read, Update, Delete) 명령을 실행한다
3. **표현 `Representaion`**
   - REST API에서 리소스는 다양한 형태로 표현될 수 있다
   - **가장 많이 사용되는 형태는 JSON**이고, XML, TEXT, RSS 등의 표현이 존재한다



# API Endpoint
- 메소드는 같은 **URI**들에 대해서도 다른 요청을 하게끔 구별하게 해주는 항목이 바로 `Endpoint`이다

1. **URI**는 정보의 자원을 표현해야 한다
2. 자원에 대한 행위는 **HTTP Method**로 표현해야 한다

- `Employees`(resource)를 가진 `Companies`(collections)에 대한 API를 작성해보자
- **적용 전 예시 API**
  - `/addNewEmployee`
  - `/updateEmployee`
  - `/deleteEmployee`
  - `/deleteAllEmployees`
  - `/promoteEmployee`
  - `/promoteAllEmployees`
- **무엇이 문제일까?**
  - **URI**는 오직 `resource`(명사)만 포함해야 하며 `동사`나 `actions`를 포함해서는 안된다
    - *`/addNewEmployee`는 `addNew`(action)가 포함되어 있다*
- **그럼 무엇이 올바른 방법일까?**
  - 동사인 **HTTP 메소드 (GET , POST , DELETE , PUT)**를 사용하여 `action`을 전달 할 수 있다
  - `resource`는 언제나 API Endpoint에서 **복수형**이어야 한다
  - `resource`의 특정 인스턴스에 접근하고 싶다면 URL에 **id**를 전달하여 접근할 수 있다

- **GET** `/companies` : companies의 모든 목록을 가져온다
- **GET** `/companies/{id}` : `id`의 상세 내용을 가져온다
- **DELETE** `/companies/{id}` : `id`의 정보를 삭제한다
- **GET** `/companies/{id}/employees/` : `companies`의 `id`에 속하는 모든 `employee`를 가져온다
- **GET** `/companies/{id1}/employees/{id2}` : `companies`의 `id1`에 속하는 `employees`중 `id2`에 속하는 `employee`를 가져온다
- **DELETE** `/companies/{id1}/employees/{id2}` : `companies`의 `id1`에 속하는 `employees`중 `id2`에 속하는 `employee`를 삭제한다
- **POST** `/companies` : 새로운 `company`를 생성하고 , 생성된 `company`의 상세 내용을 리턴한다
- 📌 **PATH**는 `resource`의 복수형을 포함해야하고 , **HTTP 메소드**는 항상 해당 `resource`를 대상으로 수행되는 `action`의 종류를 정의해야 한다

# URI 설계 시 주의할 점
1. 슬래시 구분자(`/`)는 계층 관계를 나타내는 데 사용
2. **URI** 마지막 문자로 슬래시(`/`)를 포함하지 않는다
3. 하이픈(`-`)은 **URI 가독성을 높이는데 사용**
4. 밑줄(`_`)은 **URI**에 사용하지 않는다
5. **URI 경로에는 소문자가 적합하다**
   - 대소문자에 따라 다른 리소스로 인식된다
6. 파일 확장자는 **URI**에 포함시키지 않는다
   - **Accept-Header**를 사용하자
   - ` GET / members/soccer/345/photo HTTP/1.1 Host: restapi.example.com Accept: image/jpg`

# HTTP Methods

> **`URL`은 문장이고 , `resources`는 명사이며 , `HTTP Methods`는 동사이다**

1. **GET**
   - `resource`로 부터 데이터를 요청하며 , 어떤 **Side Effect**도 발생시켜서는 안된다
2. **POST**
   - DB에 `resource`를 생성하도록 요청하며 , 대부분 `WEB-Form`형식으로 제출된다
   - **멱등성을 갖지 않으며 , 여러 번의 `request`는 각각 다른 영향을 미친다**
3. **PUT**
   - `resource`를 업데이트
   - **멱등성을 가지며 , 여러 번의 `reqeust`는 같은 영향을 미친다**
4. **DELETE**
   - 해당 `resource` 또는 특정 인스턴스를 삭제한다

# HTTP 응답 상태 코드

# 필드 네이밍 컨벤션
- 원하는 네이밍 컨벤션을 사용할 수 있지만 , 일관성을 갖는 것이 중요하다
- 만약 `request body`혹은 `response type`이 **JSON**이라면 일관성을 위해 **카멜케이스 규칙**을 따르는 것이 좋다

# 검색 , 정렬 , 필터링 , 페이지네이션
- 위의 작업은 **하나의 데이터 집합에 대한 쿼리일 뿐이다**
- 이 같은 `action`을 처리하기 위한 **별도의 API set은 존재하지 않는다**
  - *쿼리 파라미터를 추가하자*

- **Sorting**
  - 정렬의 기준이 되는 정보를 쿼리 파라미터로 전달
  - **GET** `/companies/{id}/employees?sort=empno_asc`
    - `companies`의 `id`에 속하는 사원들을 사원번호 오름차순으로 달라
- **Filtering**
  - 필터링의 기준이 되는 정보를 쿼리 파라미터로 전달
  - **GET** `/companies/{id}/employees?location=seoul`
    - `companies`의 `id`에 속하는 사원들 중 서울에 사는 사원들만 달라
- **Searching**
  - **GET** `/companies?search=Digital Mckinsey`
    - `companies`의 모든 사원들 중 이름이 Digital Mckinsey인 사원들을 달라
- **Pagination**
  - **GET** `/companies?page=3`


# Versioning
- API가 여러 곳에서 사용되고 있을 때 일부 변경 사항으로 API를 업그레이드하면, 기존의 API를 사용하는 제품이나 서비스에 문제가 발생할 수 있다
- `http://api.yourservice.com/v1/companies/34/employees` 처럼 경로에 API의 버전을 포함하는 것은 좋은 예시이다
- 만약 주요 업데이트가 있는 경우에는 v2, v1.x.x 와 같은 새로운 API set을 위한 이름을 사용할 수 있다