---
layout: default
title: Thymeleaf
parent: 📕 정리
nav_order: 100
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

- [공식 사이트](https://www.thymeleaf.org/)
  - [기본 기능](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html)
  - [스프링 통합](https://www.thymeleaf.org/doc/tutorials/3.0/thymeleafspring.html)
  - [유틸리티 객체](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#expression-utility-objects)
  - [유틸리티 객체 예시](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#appendix-b-expression-utility-objects)
  - [URL](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html#link-urls)

```html
<html xmlns:th="http://www.thymeleaf.org">
```


# 기본 기능

```
- 간단한 표현
  - 변수 표현식: ${...}
  - 선택 변수 표현식: *{...}
  - 메시지 표현식: #{...}
  - 링크 URL 표현식: @{...}
  - 조각 표현식: ~{...}
- 리터럴
  - 텍스트: 'one text', 'Another one!' , ...
  - 숫자: 0, 34, 3.0, 12.3,...
  - 불린: true, false
  - 널: null
  - 리터럴 토큰: one, sometext, main,...
- 문자 연산:
  - 문자합치기:+
  - 리터럴 대체: |The name is ${name}|
- 산술 연산:
  - Binary operators: +, -, *, /, %
  - Minus sign (unary operator): - 
- 불린 연산:
  - Binary operators: and, or
  - Boolean negation (unary operator): !, not 
- 비교와 동등:
  - 비교:>,<,>=,<=(gt,lt,ge,le)
  - 동등 연산: ==, != (eq, ne)
- 조건 연산:
  - If-then: (if) ? (then)
  - If-then-else: (if) ? (then) : (else)
  - Default: (value) ?: (defaultvalue)
- 특별한 토큰:
    - No-Operation: _
```

## [text , utext](https://github.com/jdalma/thymeleaf-basic/pull/1/commits/a3190a395326674f67dbb5dc6ec1ab6d0e3bde22)
- 텍스트 출력
  
```html
  <li>th:text 사용 <span th:text="${data}"></span></li>
  <li>컨텐츠 안에서 직접 출력하기 = [[${data}]]</li>
```

### Escape
- HTML문서는 `<` , `>`같은 특수 문자를 기반으로 정의 되기 때문에 , **뷰 템플릿으로 HTML 화면을 생성할 때는 출력하는 데이터에 이러한 특수 문자가 있는 것을 주의해서 사용해야 한다**
- 타임리프가 제공하는 `th:text` , `[[...]]`는 **기본적으로 이스케이프를 제공한다**
- `<b>hello !!!!</b>` 의도와 다르게 `<b></b>`태그가 HTML에 뿌려졌다

```html
th:text 사용 <b>hello !!!!</b>
컨텐츠 안에서 직접 출력하기 = <b>hello !!!!</b>
```

- **HTML 엔티티**
  - 웹 브라우저는 `<`를 HTML의 시작으로 인식한다
  - 따라서 `<`를 태그의 시작이 아니라 **문자로 표현할 수 있는 방법을 HTML 엔티티**라고 한다
  - 이렇게 **HTML에서 사용하는 특수 문자를 HTML 엔티티로 변경하는 것을 `Escape`라 한다** 

### Unescape
- Escape기능을 사용하지 않으려면 `utext` 기능을 사용하자 
  - `th:text` → `th:utext`
  - `[[...]]` → `[(...)]`

![](../../assets/images/algorithmTheory/thymeleaf/textutext.png)

***

## [변수 SpringEL](https://github.com/jdalma/thymeleaf-basic/pull/1/commits/166449e9184fa4c12ddef51aa80168bf4e74ab6d)

```
Object
${user.username} = userB
${user['username']} = userB
${user.getUsername()} = userB

List
${users[0].username} = userA
${users[0]['username']} = userA
${users[0].getUsername()} = userA

Map
${userMap['userA'].username} = userA
${userMap['userA']['username']} = userA
${userMap['userA'].getUsername()} = userA
```

### `th:width` 지역변수 선언

- `th:width`가 선언된 **div**태그 내에서만 사용 가능하다

```html
<div th:with="first=${users[0]}">
    <p>처음 사람의 이름은 <span th:text="${first.username}"></span></p>
</div>
```

***

## [기본 객체들 `request` , `session`...](https://github.com/jdalma/thymeleaf-basic/pull/1/commits/b8e16a64ac31b3ab5210ef793011669f504b10b3)

```html
<h1>식 기본 객체 (Expression Basic Objects)</h1>
<ul>
    <li>request = <span th:text="${#request}"></span></li>
    <li>response = <span th:text="${#response}"></span></li>
    <li>session = <span th:text="${#session}"></span></li>
    <li>servletContext = <span th:text="${#servletContext}"></span></li>
    <li>locale = <span th:text="${#locale}"></span></li>
</ul>

<h1>편의 객체</h1>
<ul>
    <!-- 타임리프는 쿼리 파라미터도 직접 꺼낼 수 있다 -->
    <li>Request Parameter = <span th:text="${param.paramData}"></span></li>
    
    <li>session = <span th:text="${session.sessionData}"></span></li>

    <!-- Spring Bean에 직접 접근 가능하다 -->
    <li>spring bean = <span th:text="${@helloBean.hello('Spring!')}"></span></li>
</ul>
```

## [유틸리티 객체와 날짜](https://github.com/jdalma/thymeleaf-basic/pull/1/commits/1fea67fb3c19d4f8ab111211d47eb3dc5bae42a0)

- `#message` : 메시지, 국제화 처리
- `#uris` : URI 이스케이프 지원
- `#dates` : java.util.Date 서식 지원 
- `#calendars` : java.util.Calendar 서식 지원 
- `#temporals` : 자바8 날짜 서식 지원
- `#numbers` : 숫자 서식 지원
- `#strings` : 문자 관련 편의 기능
- `#objects` : 객체 관련 기능 제공
- `#bools` : boolean 관련 기능 제공
- `#arrays` : 배열 관련 기능 제공
- `#lists` , `#sets` , `#maps` : 컬렉션 관련 기능 제공 
- `#ids` : 아이디 처리 관련 기능 제공 🚩

### 자바 8 날짜
- 자바 8의 `LocalDate` , `LocalDateTime` , `Instant`를 사용하려면 추가 라이브러리가 필요하다
  - *스프링 부트 타임리프를 사용하면 해당 라이브러리가 자동으로 추가되고 통합된다*
  - *`thymeleaf-extras-java8time`*

```
LocalDateTime
  default = 2022-06-13T18:43:46.363332
  yyyy-MM-dd HH:mm:ss = 2022-06-13 18:43:46

LocalDateTime - Utils
  ${#temporals.day(localDateTime)} = 13
  ${#temporals.month(localDateTime)} = 6
  ${#temporals.monthName(localDateTime)} = 6월
  ${#temporals.monthNameShort(localDateTime)} = 6월
  ${#temporals.year(localDateTime)} = 2022
  ${#temporals.dayOfWeek(localDateTime)} = 1
  ${#temporals.dayOfWeekName(localDateTime)} = 월요일
  ${#temporals.dayOfWeekNameShort(localDateTime)} = 월
  ${#temporals.hour(localDateTime)} = 18
  ${#temporals.minute(localDateTime)} = 43
  ${#temporals.second(localDateTime)} = 46
  ${#temporals.nanosecond(localDateTime)} = 363332000
```

## [URL 링크](https://github.com/jdalma/thymeleaf-basic/pull/1/commits/f75387f90496c1933f63db1a73c43b32a71fe336)

```html
<li><a th:href="@{/hello}">basic url</a></li>
  → [http://localhost:8080/hello]

<li><a th:href="@{/hello(param1=${param1}, param2=${param2})}">hello query param</a></li>
  → [http://localhost:8080/hello?param1=data1&param2=data2]
  → ()에 있는 부분은 쿼리파라미터로 처리된다

<li><a th:href="@{/hello/{param1}/{param2}(param1=${param1}, param2=${param2})}">path variable</a></li>
  → [http://localhost:8080/hello/data1/data2]
  → 바인딩 될 곳이 있다면 ()부분은 경로 변수로 처리된다

<li><a th:href="@{/hello/{param1}(param1=${param1}, param2=${param2})}">path variable + query parameter</a></li>
  → [http://localhost:8080/hello/data1?param2=data2]
  → param2는 바인딩 될 곳이 없어서 쿼리파라미터로 붙는다
```

## [리터럴 Literal](https://github.com/jdalma/thymeleaf-basic/pull/1/commits/7ff090ecbd7b621e442eba14bef0e7809182aa9a)

- **텍스트** : 'one text', 'Another one!' , ...
- **숫자** : 0, 34, 3.0, 12.3,...
- **불린** : true, false
- **널** : null
- **리터럴 토큰** : one, sometext, main,...
- **문자 리터럴**은 항상 `'`(작은 따옴표)로 감싸야한다
  - *하지만 공백없이 쭉 이어진다면 하나의 토큰으로 인지한다*
  - **룰** : `A-Z` , `a-z` , `0-9` , `[]` , `.` , `-` , `_` 

```html
<!--주의! 다음 주석을 풀면 예외가 발생함-->
<!--    <li>"hello world!" = <span th:text="hello world!"></span></li>-->
<li>'hello' + ' world!' = <span th:text="'hello' + ' world!'"></span></li>
<li>'hello world!' = <span th:text="'hello world!'"></span></li>
<li>'hello ' + ${data} = <span th:text="'hello ' + ${data}"></span></li>
<li>리터럴 대체 |hello ${data}| = <span th:text="|hello ${data}|"></span></li>

'hello' + ' world!' = hello world!
'hello world!' = hello world!
'hello ' + ${data} = hello Spring
리터럴 대체 |hello ${data}| = hello Spring
```

## [연산](https://github.com/jdalma/thymeleaf-basic/pull/1/commits/bd7f8ddacafea9344272f776c67906553abffa2c)

- 타임리프 연산은 자바와 크게 다르지 않다
  - HTML에서 사용하기 때문에 **HTML 엔티티**만 주의하자
  - `>` (gt), `<` (lt), `>=` (ge), `<=` (le), `!` (not), `==` (eq), `!=` (neq, ne)

```html
<li>산술 연산
    <ul>
        <li>10 + 2 = <span th:text="10 + 2"></span></li>
        <li>10 % 2 == 0 = <span th:text="10 % 2 == 0"></span></li>
    </ul>
</li>
<li>비교 연산
    <ul>
        <li>1 > 10 = <span th:text="1 &gt; 10"></span></li>
        <li>1 gt 10 = <span th:text="1 gt 10"></span></li>
        <li>1 >= 10 = <span th:text="1 >= 10"></span></li>
        <li>1 ge 10 = <span th:text="1 ge 10"></span></li>
        <li>1 == 1 = <span th:text="1 == 10"></span></li>
        <li>1 != 1 = <span th:text="1 != 10"></span></li>
    </ul>
</li>
<li>조건식
    <ul>
        <li>(10 % 2 == 0)? '짝수':'홀수' = <span th:text="(10 % 2 == 0)? '짝수':'홀수'"></span></li>
    </ul>
</li>
<li>Elvis 연산자
    <ul>
        <li>${data}?: '데이터가 없습니다.' = <span th:text="${data}?: '데이터가 없습니다.'"></span></li>
        <li>${nullData}?: '데이터가 없습니다.' = <span th:text="${nullData}?: '데이터가 없습니다.'"></span></li>
    </ul>
</li>
<li>No-Operation : `_` 인 경우 마치 타임리프가 실행되지 않는 것 처럼 동작한다. 
    이것을 잘 사용하면 HTML 의 내용 그대로 활용할 수 있다. 마지막 예를 보면 `데이터가 없습니다`. 부분이 그대로 출력된다
    <ul>
        <li>${data}?: _ = <span th:text="${data}?: _">데이터가 없습니다.</span></li>
        <li>${nullData}?: _ = <span th:text="${nullData}?: _">데이터가 없습니다.</span></li>
    </ul>
</li>

산술 연산
  10 + 2 = 12
  10 % 2 == 0 = true
비교 연산
  1 > 10 = false
  1 gt 10 = false
  1 >= 10 = false
  1 ge 10 = false
  1 == 1 = false
  1 != 1 = true
조건식
  (10 % 2 == 0)? '짝수':'홀수' = 짝수
  Elvis 연산자
  ${data}?: '데이터가 없습니다.' = Spring!!!
  ${nullData}?: '데이터가 없습니다.' = 데이터가 없습니다.
No-Operation
  ${data}?: _ = Spring!!!
  ${nullData}?: _ = 데이터가 없습니다.
```

## [타임리프 태그 속성 Attribute](https://github.com/jdalma/thymeleaf-basic/pull/1/commits/8e05e82b6ca55762f100a35bb3264db235985ab5)

- `th:*` 속성을 지정하면 타임리프는 기존 속성을 `th:*` 로 **지정한 속성으로 대체한다**
  - 기존 속성이 없다면 새로 만든다
- 속성 추가
  - `th:attrappend` : 속성 값의 뒤에 값을 추가한다
  - `th:attrprepend` : 속성 값의 앞에 값을 추가한다
  - `th:classappend` : class 속성에 자연스럽게 추가한다


```html
랜더링 전

<h1>속성 설정</h1>
<input type="text" name="mock" th:name="userA" />

<h1>속성 추가</h1>
- th:attrappend = <input type="text" class="text" th:attrappend="class=' large'" /><br/>
- th:attrprepend = <input type="text" class="text" th:attrprepend="class='large '" /><br/>
- th:classappend = <input type="text" class="text" th:classappend="large" /><br/>

<h1>checked 처리</h1>
- checked o <input type="checkbox" name="active" th:checked="true" /><br/>
- checked x <input type="checkbox" name="active" th:checked="false" /><br/>
- checked=false <input type="checkbox" name="active" checked="false" /><br/>

**********************************************
랜더링 후

<h1>속성 설정</h1>
<input type="text" name="userA" />

<h1>속성 추가</h1>
- th:attrappend = <input type="text" class="text large" /><br/>
- th:attrprepend = <input type="text" class="large text" /><br/>
- th:classappend = <input type="text" class="text large" /><br/>

<h1>checked 처리</h1>
- checked o <input type="checkbox" name="active" checked="checked" /><br/>
- checked x <input type="checkbox" name="active" /><br/>
- checked=false <input type="checkbox" name="active" checked="false" /><br/>

```