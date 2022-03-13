---
layout: default
title: 엔티티 매핑
parent: JPA
nav_order: 3
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

# `Mapping Annotation`

- 다양한 매핑 어노테이션을 지원하는데 크게 4가지로 분류할 수 있다.
- **객체와 테이블 매핑** : `@Entity` , `@Table`
- **기본 키 매핑** : `@Id`
- **필드와 컬럼 매핑** : `@Column`
- **연관관계 매핑** : `@ManyToOne` , `@JoinColumn`

## `@Entity`

- 해당 어노테이션이 붙은 클래스는 JPA가 관리한다.
- **주의 사항**
    1. **기본 생성자 필수** (파라미터가 없는 `public`또는 `protected`생성자)
    2. `final` 클래스 (상속 방지 클래스), `enum` , `interface` , `inner` 클래스에는 사용할 수 없다.
    3. 저장할 필드에 `final`을 사용하면 안된다.

- `@Entity(name = {엔티티 이름})`
  - JPA에서 사용할 엔티티 이름 지정


## `@Table`

- 해당 엔티티와 매핑할 테이블 이름을 지정한다.
- 생략하면 엔티티 이름을 테이블 이름으로 사용한다.

### 속성

- `name`
- `catalog`
- `indexes`
- `schema`
- `uniqueConstraints` 📌
    - `DDL`생성시에 유니크 제약조건을 만든다.
    - 2개 이상의 복합 유니크 제약조건도 만들 수 있다.
    - **이 기능은 스키마 자동 생성 기능을 사용해서 DDL을 만들 때만 사용된다.**


***

