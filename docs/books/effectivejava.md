---
layout: default
title: Effective Java
parent: 📖 Books
nav_order: 5
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

## 08.26 (금)

- **브릿지 패턴**
  - 구체적인 것과 추상적인 것을 분리
  - 서로 독립적으로 발전할 수 있게
- 서비스 제공자 프레임워크
    1. 서비스 제공자 인터페이스 (`SPI`) 와 서비스 제공자 (`서비스 구현체`)
    2. 서비스 제공자 등록 API (`서비스 인터페이스와 구현체를 등록하는 방법`) 
       - ex) @Configuration
    3. 서비스 접근 API (`서비스의 클라이언트가 서비스 인터페이스의 인스턴스를 가져올 때 사용하는 API`)
       - ex) ApplcationContext에서 Bean을 가져오는 것
- 스프링의 **PSA**
- [`Java 9 Docs` 서비스 로더](https://docs.oracle.com/javase/9/docs/api/java/util/ServiceLoader.html)
- **빌더 패턴**
  - 플루언트 API 혹은 메서드 체이닝
  - 불변식
  - 재귀적 타입 한정을 이용하는 제네릭 타입
    - `<T extends Builder<T>>` 🚩
  - **공변반환 타이핑**
  - **생성자나 정적 팩토리가 처리해야 할 매개변수가 많다면 빌더 패턴을 선택하는게 더 낫다**

## 08.29 (월)

- 브릿지 패턴
- 서비스 로더
- 서비스 제공자 프레임워크
- 빌더 패턴


## 08.30 (화)

- `static <E>` 
- 백기선님 패턴 강의 : 싱글톤 패턴
- 재귀적 타입 한정

## 08.31 (수)

- Item 6. **불필요한 객체 생성을 피하라**
  - 의도치 않은 오토박싱이 숨어들지 않도록 주의하자
  - **방어적 복사**
- Item 7. **다 쓴 객체 참조를 해제하라**
  - 객체 참조를 null 처리하는 일은 예외적인 경우여야 한다. **유효 범위 밖으로 밀어내는 것이 이상적이다**
  - 자기 메모리를 직접 관리하는 클래스라면 프로그래머는 항시 메모리 누수에 주의해야 한다
  - 캐시 역시 메모리 누수를 일으키는 주범이다
  - `java.lang.ref`

## 09.02(금)
- Item 8. **finalizer와 cleaner 사용을 피하라**
  - 두 가지 객체 소멸자를 제공한다
  - **finalizer** : `System.runFinalization()`
  - **cleaner** : `System.gc()`
- Item 15. **클래스와 멤버의 접근 권한을 최소화하라**