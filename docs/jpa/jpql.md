---
layout: default
title: JPQL
parent: JPA
nav_order: 25
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

# **Fetch Join**

- SQL 조인 종류가 아니다
- `JPQL`에서 **성능 최적화**를 위해 제공하는 기능
- 연관된 엔티티나 컬렉션을 **SQL 한 번에 함께 조회하는 기능**
- `join fetch` 명령어 사용
- 즉시 로딩과 비슷하지만 **"특정 객체 그래프를 한 번에 조회할거야" 명시할 수 있다**
- [`cobbybb` 일반 Join과 Fetch Join 차이](https://cobbybb.tistory.com/18)
- [`jojoldu` N+1 문제와 해결 방법](https://gmoon92.github.io/spring/jpa/hibernate/n+1/2021/01/12/jpa-n-plus-one.html)