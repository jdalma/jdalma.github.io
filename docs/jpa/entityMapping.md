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
- **기본 키 매핑** : `@Id` , `@GeneratedValue`
- **필드와 컬럼 매핑** : `@Column` , `@Enumerated` , `@Temporal` , `@Lob` , `@Transient`
- **연관관계 매핑** : `@ManyToOne` , `@JoinColumn`
- **기타** : `@Access`

***

# **JPA가 제공하는 데이터베이스 기본 키 생성 전략**
- 기본 키를 직접 할당할 수도 있지만 , `SEQUENCE` 또는 `AUTO_INCREMENT` 같은 기능은 어떻게 사용할까?
- 키 생성 전략을 사용하려면 아래의 속성을 반드시 추가해야한다.

```xml
    <property name="hibernate.id.new_generator_mappings" value="true"/>
```

- 과거 버전과의 호환성을 유지하려고 기본값은 `false`이다
- 아래에서 설명하는 내용은 이 옵션을 `true`로 설정했다고 가정한다.
- 이 옵션을 `true`로 설정하면 **키 생성 성능을 최적화 하는 `allocationSize` 속성을 사용하는 방식이 달라진다.**

## `allocationSize` 🚩

## **직접 할당 `@Id`**
- 기본 키를 애플리케이션에서 직접 할당한다.
- 자바 `Wrapper` 형
  - `String`
  - `java.util.Date`
  - `java.sql.Date`
  - `java.math.BigDecimal`
  - `java.math.BigInteger`


## **자동 생성 `@GeneratedValue`**

- **IDENTITY**
  - 기본 키 생성을 **데이터베이스에 위임하는 전략**이다.
  - **데이터베이스에 값을 저장하고 나서야 기본 키 값을 구할 수 있을 때 사용한다.** 📌
  - 주로 `MySQL` , `PostgreSQL` , `SQL Server` , `DB2`에서 사용

> ✋ 최적화 [Statement.getGeneratedKey()](http://m.1day1.org/cubrid/manual/api/api_jdbc_programming_autoincr.htm)
> 
> 데이터베이스에 `INSERT`한 후에 기본 키 값을 조회할 수 있다.
> 
> 따라서 엔티티에 식별자 값을 할당하려면 추가로 데이터베이스를 조회해야 한다.
> 
> `JDBC3`에 추가된 `Statement.getGeneratedKey()`를 사용하면 데이터를 저장하면서 
> 
> 동시에 생성된 기본 키 값도 얻어 올 수 있다.
> 
> **엔티티가 영속 상태가 되려면 식별자가 반드시 필요하다.**
> 
> 그런데 `IDENTITY`식별자 생성 전략은 엔티티를 데이터베이스에 저장해야 식별자를 구할 수 있으므로 
> 
> `SQL`이 바로 실행 되기 때문에 **지연 로딩이 불가하다.**

- **SEQUENCE**
    - **데이터베이스 시퀀스는 유일한 값을 순서대로 생성하는 특별한 데이터베이스 오브젝트**다.
    - 이 전략은 시퀀스를 지원하는 데이터베이스에서 사용할 수 있다.

```java
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
```

```
Hibernate: create sequence HIBERNATE_SEQUENCE start with 1 increment by 1

...

Hibernate: 
    call next value for HIBERNATE_SEQUENCE
```

#### `@SequenceGenerator` 🚩

- **TABLE**
- **AUTO**

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

- 자바 8 이상 이고 하이버네이트  5.2 이상이라면
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

- **생성과 수정을 동시에하면 생성 시간와 수정 시간은 어떻게 입력될까?**
  
```java
    transaction.begin();

    Member test1 = new Member(1L , "test1" , new BigDecimal(10) , Member.RoleType.USER);

    entityManager.persist(test1);

    Thread.sleep(1000);

    Member cacheTest1 = entityManager.find(Member.class , 1L);
    cacheTest1.setName("1초 후 수정");

    transaction.commit();
```

```
ID  CREATED_FULL_DATE  	NAME        UPDATED_FULL_DATE  
1	null	            1초 후 수정   2022-03-15 22:06:34.969
```

- 안타깝게도 위와 같이하면 **생성시간은 `null`이다.**
- 아래와 같이 생성하고 `commit`을 하여 DB에 insert 후 다시 find하여 수정하니 제대로 들어갔다.

```java
    // 첫 번째 트랜잭션 시작
    transaction.begin();

    Member test1 = new Member(1L , "test1" , new BigDecimal(10) , Member.RoleType.USER);

    entityManager.persist(test1);

    // 첫 번째 트랜잭션 커밋
    transaction.commit();

    // 1초 후
    Thread.sleep(1000);

    // 두 번째 트랜잭션 get
    transaction = entityManager.getTransaction();

    // 두 번째 트랜잭션 시작
    transaction.begin();

    Member cacheTest1 = entityManager.find(Member.class , 1L);
    cacheTest1.setName("1초 후 수정");

    // 두 번째 트랜잭션 시작
    transaction.commit();
```

```
ID  CREATED_FULL_DATE  	    NAME  	    ROLE_TYPE  	UPDATED_FULL_DATE  
1	2022-03-15 22:03:10.618	1초 후 수정	  USER	      2022-03-15 22:03:11.646
```

***

# **@Lob**
- 데이터베이스 `BLOB` , `CLOB` 타입과 매핑한다.
- 매핑하는 필드타입이 문자면 `CLOB` , 나머지는 `BLOB`으로 매핑한다.

***

# **@Transient**
- **이 필드는 매핑하지 않는다.**
- 객체에 임시로 어떤 값을 보관하고 싶을 때 사용한다.

***

# **@Access**
- JPA가 엔티티 데이터 접근하는 방식을 지정한다.
- **필드 접근**
  - `AccessType.FIELD`로 지정한다.
  - 필드에 직접 접근한다.
  - 필드 접근 권한이 `private`이어도 접근할 수 있다.
- **프로퍼티 접근**
  - `AccessType.PROPERTY`로 지정한다.
  - 접근자 `Getter`를 사용한다.
- `@Access`를 설정하지 않으면 `@Id`의 위치를 기준으로 접근 방식이 선정된다.
- 아래는 `@Id`가 필드에 있으므로 `@Access(AccessType.FIELD)`로 설정한 것과 같다.

```java
    @Id
    private Long id;
```

- 아래는 `@Id`가 프로퍼티에 있으므로 `@Access(AccessType.PROPERTY)`로 설정한 것과 같다.

```java
    @Id
    public Long getId() {
        return id;
    } 
```

- ✋ `Getter`가 없는 필드는 접근하지 못한다.

```
Hibernate: 
    /* insert hellojpa.Member
        */ insert 
        into
            MEMBER
            (ID) 
        values
            (?)
```

## **직접 접근과 프로퍼티 접근을 동시에 사용할 수 있다.**

```java
    @Id
    private Long id;

    @Access(AccessType.PROPERTY)
    private String fullDescription;

    // 또는 

    @Access(AccessType.PROPERTY)
    public String getFullDescription() {
        return this.firstDescription + this.secondDescription;
    }

    // main
    Member test1 = new Member(1L , "test1" , new BigDecimal(10) , Member.RoleType.USER);
    test1.setFirstDescription("첫 번째");
    test1.setSecondDescription(" 두 번째");    
```

```
FIRST_DESCRIPTION  SECOND_DESCRIPTION    FULL_DESCRIPTION
첫 번째              두 번째                 첫 번째 두 번째	    
```