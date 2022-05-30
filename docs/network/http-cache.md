---
layout: default
title: HTTP 캐시와 조건부 요청
parent: 네트워크
nav_order: 5
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

# **캐시 기본 동작**

## **캐시 미적용**
-   **데이터가 변경되지 않아도 계속 네트워크를 통해서 데이터를 다운로드 받아야 한다.**
-   **인터넷 네트워크는 매우 느리고 비싸다.**
-   **브라우저 로딩 속도가 느리다.**

![](../../assets/images/network/http-cache/1.png)
![](../../assets/images/network/http-cache/2.png)
![](../../assets/images/network/http-cache/3.png)
![](../../assets/images/network/http-cache/4.png)

## **캐시 적용**
-   **캐시 덕분에 캐시 가능 시간동안 네트워크를 사용하지 않아도 된다.**
-   **비싼 네트워크 사용량을 줄일 수 있다.**
-   **브라우저 로딩 속도가 매우 빠르다.**

![](../../assets/images/network/http-cache/5.png)
![](../../assets/images/network/http-cache/6.png)
![](../../assets/images/network/http-cache/7.png)
![](../../assets/images/network/http-cache/8.png)

## **캐시 시간 초과**
-   **캐시 유효 시간이 초과하면 , 서버를 통해 데이터를 다시 조회하고 , 캐시를 갱신한다.**
-   **이때 다시 네트워크 다운로드가 발생한다.**

![](../../assets/images/network/http-cache/9.png)
![](../../assets/images/network/http-cache/10.png)
![](../../assets/images/network/http-cache/11.png)

***

# **검증 헤더와 조건부 요청**

## **캐시 시간 초과**
![](../../assets/images/network/http-cache/12.png)
![](../../assets/images/network/http-cache/13.png)
## **검증 헤더 추가**
![](../../assets/images/network/http-cache/14.png)
![](../../assets/images/network/http-cache/15.png)
![](../../assets/images/network/http-cache/16.png)
![](../../assets/images/network/http-cache/17.png)
![](../../assets/images/network/http-cache/18.png)
![](../../assets/images/network/http-cache/19.png)
![](../../assets/images/network/http-cache/20.png)
![](../../assets/images/network/http-cache/21.png)
![](../../assets/images/network/http-cache/22.png)

## 📌 **정리**

-   **캐시 유효 시간이 초과해도 , 서버의 데이터가 갱신되지 않으면 304 Not Modified + 헤더 메타 정보만 응답 ( 바디X )**
-   **클라이언트는 서버가 보낸 응답 헤더 정보로 캐시의 메타 정보를 갱신**
-   **클라이언트는 캐시에 저장되어 있는 데이터 재활용**
-   **결과적으로 네트워크 다운로드가 발생하지만 용량이 적은 헤더 정보만 다운로드**

![](../../assets/images/network/http-cache/23.png)

> ✋ **Stauts 코드 중 연한 색깔은 캐시로 데이터를 로딩한 것이다.**

## **검증 헤더**

-   **캐시 데이터와 서버 데이터가 같은지 검증하는 데이터**
-   **Last-Modified , ETag**

## **조건부 요청 헤더**

-   **검증 헤더로 조건에 따른 분기**
-   **If-Modified-Since : 헤더의 Last-Modified 사용**
-   **If-None-Match : ETag 사용**
-   **조건이 만족하면 200 OK**
-   **조건이 만족하지 않으면 304 Not Modified**

**예시**
{: .fh-default .fs-5 }

-   **If-Modified-Since : 이후에 데이터가 수정 되었으면 ?**
    -   **데이터 미변경 예시**
        -   캐시 : 2020년 11월 10일 10:00:00 vs 서버 : 2020년 11월 10일 10:00:00
        -   **304 Not Modified , 헤더 데이터만 전송 (BODY 미포함)**
    -   **데이터 변경 예시**
        -   캐시 : 2020년 11월 10일 00:00:00 vs 서버 : 2020년 11월 10일 11:00:00
        -   **200 OK , 모든 데이터 전송 (BODY 포함)**

## 🚨 **Last-Modified , If-Modified-Since 단점**

-   **날짜 기반의 로직 사용**
-   **데이터를 수정해서 날짜가 다르지만 , 데이터 결과가 똑같은 경우**
-   **서버에서 별도의 캐시 로직을 관리하고 싶은 경우**
    -   예) 스페이스나 주석 처럼 크게 영향이 없는 변경에서 캐시를 유지하고 싶은 경우

### 📌 위와 같은 단점을 보완한 ETag , If-None-Match

-   **ETag(Entity Tag)**
-   **캐시용 데이터에 임의의 고유한 버전 이름을 달아둠**
    -   예) ETag : "v1.0" , ETag : "test1"
-   **데이터가 변경되면 이 이름을 바꾸어서 변경함 (Hash를 다시 생성)**
    -   예) ETag : "test1" -> "test2"
-   **진짜 단순하게 ETag만 보내서 같으면 유지 , 다르면 다시 받기**

![](../../assets/images/network/http-cache/24.png)
![](../../assets/images/network/http-cache/25.png)
![](../../assets/images/network/http-cache/26.png)
![](../../assets/images/network/http-cache/27.png)
![](../../assets/images/network/http-cache/28.png)
![](../../assets/images/network/http-cache/29.png)
![](../../assets/images/network/http-cache/30.png)
![](../../assets/images/network/http-cache/31.png)
![](../../assets/images/network/http-cache/32.png)

📌 **정리**
{: .fh-default .fs-5 }

-   **진짜 단순하게 ETag만 서버에 보내서 같으면 유지 , 다르면 다시 받기**
-   **캐시 제어 로직을 서버에서 완전히 관리**
-   **클라이언트는 단순히 이 값을 서버에 제공(클라이언트는 캐시 메커니즘을 모름)**
-   <span style="color:red; font-weight:bold">검증 헤더 (Validator)</span>
    -   **ETag**
    -   **LastModified**
-   <span style="color:red; font-weight:bold">조건부 요청 헤더</span>
    -   **If-Match , If-None-Match : ETag 값  사용**
    -   **If-Modified-Since , if-Unmodified-Since : Last-Modified 값 사용**

***

# **캐시와 조건부 요청 헤더**

## **캐시 제어 헤더**

-   **Cache-Control : 캐시 제어**
-   **Pragma : 캐시 제어 (하위 호환)**
-   **Expires : 캐시 유효 기간 (하위 호환)**

### Cache-Control

**캐시 지시어(directives)**
{: .fh-default .fs-5 }
-   **Cache-Control : max-age**
    -   **캐시 유효 시간 , 초 단위**
-   **Cache-Control : no-cache**
    -   **데이터는 캐시 해도 되지만 , 항상 원(origin) 서버에 검증하고 사용**
        -   **캐시를 사용하기 전에 서버 조건부 요청을 한 후 사용**
-   **Cache-Control : no-store**
    -   **데이터에 민감한 정보가 있으므로 저장하면 안됨 **
        -   **메모리에서 사용하고 최대한 빨리 삭제**

### Pragma

**캐시 제어(하위 호환)**
{: .fh-default .fs-5 }
-   Pragma : no-cahce
-   HTTP 1.0 하위 호환
    -   **현재 거의 사용하지 않음**

### Expires

**캐시 만료일 지정(하위 호환)**
{: .fh-default .fs-5 }
-   캐시 만료일을 정확한 날짜로 지정
-   HTTP 1.0 부터 사용
-   **지금은 더 유연한 Cache-Control : max-age 권장**
-   **Cache-Control : max-age와 함께 사용하면 Expires는 무시**

***

## **프록시 캐시**

![](../../assets/images/network/http-cache/33.png)
![](../../assets/images/network/http-cache/34.png)
![](../../assets/images/network/http-cache/35.png)

### Cache-Control

**캐시 지시어(directives) - 기타**
{: .fh-default .fs-5 }
-   **Cache-Control : public**
    -   **응답이 public 캐시에 저장되어도 됨**
-   **Cache-Control : private**
    -   **응답이 해당 사용자만을 위한 것임, private 캐시에 저장해야함 (기본 값)**
-   Cache-Control : s-maxage
    -   프록시 캐시에만 적용되는 max-age
-   Age : 60 (HTTP 헤더)
    -   오리진 서버에서 응답 후 프록시 캐시 내에 머문 시간(초)

***

## **캐시 무효화**

### Cache-Control

**캐시 지시어(directives) - 확실한 캐시 무효화**
{: .fh-default .fs-5 }
-   **Cache-Control : no-cache**
-   **Cache-Control : no-store**
-   **Cache-Control : must-revalidate**
    -   **캐시 만료 후 최초 조회 시 원 서버에 검증 해야함**
    -   **원 서버 접근 실패 시 반드시 오류가 발생 해야함 - 504 (Gateway Timeout)**
    -   **must-revalidate는 캐시 유효 시간이라면 캐시를 사용함**
-   **Pragma : no-cache**
    -   **HTTP1.0 하위 호환**

**위 의 내용을 다 기입하여야 하위 버전 브라우저에서 접근의 캐시저장도 막을 수 있다.**
![](../../assets/images/network/http-cache/36.png)
![](../../assets/images/network/http-cache/37.png)
![](../../assets/images/network/http-cache/38.png)
![](../../assets/images/network/http-cache/39.png)
