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
- [공식 메뉴얼 - 기본 기능](https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.html)
- [공식 메뉴얼 - 스프링 통합](https://www.thymeleaf.org/doc/tutorials/3.0/thymeleafspring.html)

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

### `th:width' 지역변수 선언

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