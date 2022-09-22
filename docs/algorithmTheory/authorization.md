---
layout: default
title: Authorization
parent: 📕 정리
nav_order: 9
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---


- [`mozilla` Authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)
- [`RFC7235` (HTTP/1.1): Authentication](https://datatracker.ietf.org/doc/html/rfc7235#section-4.2)
- [`RFC7617` Authorization **Basic**](https://datatracker.ietf.org/doc/html/rfc7617)
- [`mozilla` Basic](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization#basic_authentication)
- [`RFC6750` Authorization **Bearer**](https://datatracker.ietf.org/doc/html/rfc6750)
  - [`RFC6749` The OAuth 2.0 Authorization Framework](https://www.rfc-editor.org/rfc/rfc6749)

## Authorization Header

```
Authorization: <auth-scheme> <authorization-parameters>
```

이 헤더는 리소스에 액세스할 때 사용할 수 있는 인증 체계(및 클라이언트가 이를 사용하는 데 필요한 추가 정보)를 나타낸다.<br>
요청이 인증되고 [`RFC7235 section 2.2` realm](https://datatracker.ietf.org/doc/html/rfc7235#section-2.2)이 지정되면 동일한 자격 증명이 이 영역 내의 다른 모든 요청에 대해 유효한 것으로 간주한다.

## Authorization **Basic**

```
Authorization: Basic <credentials>
```

```
which transmits credentials as user-id/password pairs, encoded using Base64.
```
- `Base64로 인코딩 된 사용자 식별자와 비밀번호`가 쌍으로 전달된다.
- 안전한 방법이 아니다.

<br>

```
WWW-Authenticate: Basic realm="foo", charset="UTF-8"
```

- [`RFC7235 section 4.1` WWW-Authenticate](https://datatracker.ietf.org/doc/html/rfc7235#section-4.1)
- 위의 헤더는 서버가 인증을 요청하는 것
- **realm**은 필수
- **charset**은 선택 (해당 파라미터는 순전히 조언용)
- 나머지 새로운 매개변수는 무시
- Basic 인증 , UTF-8문자로 인코딩 된 "foo"를 요청하는 것

<br>

- **realm**
  - 보호 범위를 나타내려는 인증 체계
  - 고유한 추가 의미를 가질 수 있는 원본 서버 인증 체계
  - 따옴표가 붙어있어야한다.

## Authorization **Bearer**

- `OAuth2.0 보호 리소스에 대한 엑세스 요청을 할 때 전달자 토큰을 사용하는 방법`을 의미하는 scheme이다
  - OAuth를 사용하면 리소스 소유자의 자격 증명을 직접 사용하는 대신 **OAuth 2.0 인증 프레임워크**에 `클라이언트에게 발급된 액세스 권한을 나타내는 문자열`로 정의된 액세스 토큰을 얻어 클라이언트가 보호된 리소스에 액세스할 수 있다

```
When sending the access token in the "Authorization" request header field defined by HTTP/1.1 [RFC2617], 
the client uses the "Bearer" authentication scheme to transmit the access token.
```

- **"Authorization" 요청 헤더에 액세스 토큰을 보낼 때** HTTP/1.1에 의해 정의된 필드에서 클라이언트는 **"Bearer"**를 사용합니다. 액세스 토큰을 전송하는 인증 체계.