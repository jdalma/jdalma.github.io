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

# **Mapping Annotation**

- 다양한 매핑 어노테이션을 지원하는데 크게 4가지로 분류할 수 있다.
- **객체와 테이블 매핑** : `@Entity` , `@Table`
- **기본 키 매핑** : `@Id`
- **필드와 컬럼 매핑** : `@Column` , `@Enumerated` , `@Temporal` , `@Lob` , `@Transient`
- **연관관계 매핑** : `@ManyToOne` , `@JoinColumn`
- **기타** : `@Access`

***

# **@Id**
- 기본 키를 직접 할당할 수도 있지만 , `SEQUENCE` 또는 `AUTO_INCREMENT` 같은 기능은 어떻게 사용할까?

## **JPA가 제공하는 데이터베이스 기본 키 생성 전략**

###  **직접 할당**
- 기본 키를 애플리케이션에서 직접 할당한다.

### **자동 생성** 🚩 (131p)

- **IDENTITY**
- **SEQUENCE**
- **TABLE**

***

# **@Entity**

- 해당 어노테이션이 붙은 클래스는 JPA가 관리한다.
- **주의 사항**
    1. **기본 생성자 필수** (파라미터가 없는 `public`또는 `protected`생성자)
    2. `final` 클래스 (상속 방지 클래스), `enum` , `interface` , `inner` 클래스에는 사용할 수 없다.
    3. 저장할 필드에 `final`을 사용하면 안된다.

- `@Entity(name = {엔티티 이름})`
  - JPA에서 사용할 엔티티 이름 지정

***

# **@Table** (DDL 생성 기능)

- 해당 엔티티와 매핑할 테이블 이름을 지정한다.
- 생략하면 엔티티 이름을 테이블 이름으로 사용한다.

![](../../assets/images/jpa/entityMapping/tableProperties.png)

## 속성

- `name`
- `catalog`
- `indexes`
- `schema`
- `uniqueConstraints` 📌
    - `DDL`생성시에 유니크 제약조건을 만든다.
    - 2개 이상의 복합 유니크 제약조건도 만들 수 있다.
    - **이 기능은 스키마 자동 생성 기능을 사용해서 DDL을 만들 때만 사용된다.**

```java
@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(
                name = "NAME_UNIQUE",
                columnNames = {"NAME"}
        )
})
public class Member {

    @Id
    private Long id;
    
    private String name;

    private int age;

    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date lastModifiedDate;

    @Lob
    private String description;

    ...
```

```
alter table MEMBER 
       add constraint NAME_UNIQUE unique (NAME)
```

***

# **@Column** (DDL 생성 기능)

- 스키마 자동 생성하기를 통해 **DDL**을 생성할 수 있다.
- 속성은 아래와 같다.

![](../../assets/images/jpa/entityMapping/columnProperties.png)

- `name`
  - 기본값 : 객체의 필드이름
  - 필드와 매핑할 테이블의 컬럼 이름 
- `insertable` , `updatable`
  - 기본값 : true
  - 엔티티 저장 시 이 필드도 같이 저장 또는 수정한다.
  - false로 설정하면 이 필드는 데이터베이스에 저장 또는 수정하지 않는다.
  - false옵션은 읽기 전용일 때 사용한다.
- `table`
  - 기본값 : 현재 클래스가 매핑된 테이블
  - 하나의 엔티티를 두 개 이상의 테이블에 매핑할 때 사용한다.
  - 지정한 필드를 다른 테이블에 매핑할 수 있다.
- `nullable` (DDL)
  - 기본값 : true
  - `null`값의 허용여부를 설정한다.
  - false로 설정하면 DDL생성 시에 `not null`제약 조건이 붙는다.
- `unique` (DDL)
  - `@Table`의 `uniqueConstraints`와 같지만 한 컬럼에 간단히 유니크 제약조건을 걸 때 사용한다.
  - 아래와 같이 제약 조건의 이름이 랜덤으로 만들어지고 , 제약조건의 이름을 따로 줄 수 없기에 ...
  - **두 컬럼 이상을 사용하거나 유니크 제약조건을 사용할 때는 `@Table.uniqueConstraints`를 사용하자**

```
    alter table MEMBER 
       add constraint UK_4xlfe0ttvhcmw65om759cknme unique (NAME)
```

- `columnDefinition` (DDL)
  - 데이터베이스 컬럼 정보를 직접 줄 수 있다.

```java
    @Column(columnDefinition = "varchar (100) not null")
    private String name;
```

```
   create table MEMBER (
       ...
       NAME varchar (100) not null,
       ...
    )
```

- `length`
  - 기본값 : 255
  - 문자 길이 제약조건 , String 타입에만 사용한다.

- `precision` , `scale` (DDL)
  - **BigDecimal**타입에서 사용한다. (BigInteger도 가능하다.)
  - **`precision`은 소수점을 포함한 전체 자릿수**
  - **`scale`은 소수의 자릿수**

```java
    @Column(precision = 10 , scale = 5)
    private BigDecimal age;
```

## `@Column`을 생략한다면?
- `@Column`속성의 기본값이 적용되는데 , 자바 기본 타입일 때는 `nullable`속성에 예외가 있다.

```java
    int data1;
    Integer data2;

    @Column
    int data3;
    @Column
    Integer data4;
```

```
    DATA1 integer not null,
    DATA2 integer,
    DATA3 integer,
    DATA4 integer,
```

- 자바 기본 타입에는 `null`값을 입력할 수 없으며 , **객체 타입일 때만 null값이 허용된다.**
- **따라서 자바 기본 타입에는 `not null`제약조건을 추가하는 것이 안전하다.**

***

# **@Enumerated**
- 자바의 `enum`타입을 매핑할 때 사용
- 기본 값 : `EnumType.ORDINAL`
- `@Enumerated(EnumType.ORDINAL)`
  - **`enum`순서**를 데이터베이스에 저장
  - 저장되는 데이터의 크기는 작지만 **`enum`의 순서를 변경할 수 없다.**
- `@Enumerated(EnumType.STRING)`
  - **`enum`이름**을 데이터베이스에 저장
  - `enum`의 순서가 바뀌거나 추가되어도 안전하다.

```java
    public enum RoleType{
        ADMIN , USER
    }

    @Enumerated(EnumType.STRING)
    private RoleType roleType;
```

***

# **@Temporal**
- 자바 8 이전 날짜 타입을 매핑할 때 사용한다.
- `@Temporal(TemporalType.DATE)`
  - 날짜 , 데이터베이스 `date`타입과 매핑 (YYYY-MM-DD)
- `@Temporal(TemporalType.TIME)`
  - 시간 , 데이터베이스 `time`타입과 매핑 (HH:MM:SS)
- `@Temporal(TemporalType.TIMESTAMP)`
  - 날짜와 시간 , 데이터베이스 `timestamp`타입과 매핑 (YYYY-MM-DD HH:MM:SS)

```java
    @Temporal(TemporalType.DATE)
    private Date createdDate;

    @Temporal(TemporalType.DATE)
    private Date createdTime;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdFullDate;
```

```
    CREATED_DATE date,
    CREATED_TIME date,
    CREATED_FULL_DATE timestamp,
```

- 자바 8 이후는 🚩

- 하이버네이트  5.2 이상이라면
  - `@CreationTimestamp` , `@UpdateTimestamp`

```java
    @CreationTimestamp
    private LocalDateTime createdFullDate;

    @UpdateTimestamp
    private LocalDateTime updatedFullDate;
```

```
    CREATED_FULL_DATE timestamp,
    UPDATED_FULL_DATE timestamp,
```

***

# **@Lob** 🚩 

***

# **@Transient** 🚩 

***

# **@Access** 🚩 


***

