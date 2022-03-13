---
layout: default
title: 스키마 자동 생성
parent: JPA
nav_order: 4
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

# **데이터베이스 스키마 자동 생성**

- JPA는 데이터베이스 스키마를 자동으로 생성하는 기능을 지원한다.
- 매핑정보와 데이터베이스 방언을 사용해서 데이터베이스 스키마를 생성한다.
- **애플리케이션 실행 시점에 자동 생성**
- 

```java
  EntityManagerFactory emf = Persistence.createEntityManagerFactory("hello");
  EntityManager em = emf.createEntityManager();
  EntityTransaction transaction = em.getTransaction();
  
  ...
```

- `EntityManagerFactory`는 아래의 `persistence.xml`을 참고하여 만들어진다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<persistence version="2.2"
             xmlns="http://xmlns.jcp.org/xml/ns/persistence" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/persistence http://xmlns.jcp.org/xml/ns/persistence/persistence_2_2.xsd">
    <persistence-unit name="hello">
        <properties>
            <!-- 필수 속성 -->
            <property name="javax.persistence.jdbc.driver" value="org.h2.Driver"/>
            <property name="javax.persistence.jdbc.user" value="sa"/>
            <property name="javax.persistence.jdbc.password" value=""/>
            <property name="javax.persistence.jdbc.url" value="jdbc:h2:tcp://localhost/~/test"/>
            <property name="hibernate.dialect" value="org.hibernate.dialect.H2Dialect"/>
            <!-- 옵션 -->
            <!-- 콘솔에 실행되는 SQL을 출력 -->
            <property name="hibernate.show_sql" value="true"/>
            <property name="hibernate.format_sql" value="true"/>
            <property name="hibernate.use_sql_comments" value="true"/>
            
            <!-- 애플리케이션 실행 시점에 데이터베이스 테이블을 자동으로 생성 -->
            <property name="hibernate.hbm2ddl.auto" value="create" />
        </properties>
    </persistence-unit>
</persistence>
```
## `hibernate.hbm2ddl.auto`

1. `value="create"`
   - 기존 테이블을 삭제하고 새로 생성한다. **DROP + CREATE**
2. `value="create-drop"`
   - `create`속성에 추가로 어플리케이션을 종료할 때 생성한 **DDL**을 제거한다. **DROP + CREATE + DROP** 
3. `value="update"`
   - 데이터베이스 테이블과 엔티티 매핑정보를 비교해서 변경사항만 수정한다.
4. `value="validate"`
   - 데이터베이스 테이블과 엔티티 매핑정보를 비교해서 차이가 있으면 경고를 남기고 애플리케이션을 실행하지 않는다.
   - 이 설정은 **DDL**을 수정하지 않는다.
5. `value="none"`
   - 자동 생성 기능을 사용하지 않는다.

> - 🚨 **주의사항**
> - **운영 서버에서 DDL을 수정하는 옵션은 절대!!! 사용하면 안된다.**
> - 오직 개발 단계에서만 사용해야 한다.
> - `이 옵션들은 운영중인 데이터베이스의 테이블이나 컬럼을 삭제할 수 있다.`
> - **추천 전략**
>   - 개발 초기 단계는 `create` 또는 `update`
>   - 초기화 상태로 자동화된 테스트를 진행하는 개발자 환경과 `CI` 서버는 `create` 또는 `create-drop`
>   - 테스트 서버는 `update`또는 `validate`
>   - 스테이징과 운영 서버는 `validate`또는 `none`
> - ✋ 
>   - JPA 2.1부터 스키마 자동 생성 기능을 표준으로 지원한다.
>   - `update`또는 `validate`옵션을 지원하지 않는다.
>   - ****

## **이름 매핑 전략 변경하기**
- 자바는 관례상 `roleType`과 같이 카멜 표기법을 주로 사용하고 ,
- 데이터베이는 관례상 `role_type`과 같이 언더스코어를 주로 사용한다.
- `@Column.name`속성을 명시적으로 사용해서 이름을 지어주어야 한다.

```java
    @Column(name = "role_type")
    String roleType
```

- ~~`hibernate.ejb.naming_strategy`속성을 사용하면 이름 매핑 전략을 변경할 수 있다.~~
- ~~`org.hibernate.cfg.ImprovedNamingStrategy`클래스를 제공한다.~~
- ~~**이 클래스는 테이블 명이나 컬럼 명이 생략되면 자바의 카멜 표기법을 테이블의 언더스코어 표기법으로 매핑한다.**~~
- **Hibernate5으로 넘어오면서 org.hibernate.cfg.NamingStrategy는 더이상 사용하지 않는다.(넣어도 적용 안됨)**
    - [출처](https://velog.io/@mumuni/Hibernate5-Naming-Strategy-간단-정리)

```xml
<property name="hibernate.physical_naming_strategy" value="hellojpa.UppercaseSnakePhysicalNamingStrategy"/>
```

```java
package hellojpa;

import org.hibernate.boot.model.naming.Identifier;
import org.hibernate.boot.model.naming.PhysicalNamingStrategy;
import org.hibernate.engine.jdbc.env.spi.JdbcEnvironment;

public class UppercaseSnakePhysicalNamingStrategy implements PhysicalNamingStrategy {
    @Override
    public Identifier toPhysicalCatalogName(Identifier identifier, JdbcEnvironment jdbcEnvironment) {
        if (identifier == null) {
            return null;
        }
        return convertToSnakeUpperCase(identifier);
    }

    @Override
    public Identifier toPhysicalSchemaName(Identifier identifier, JdbcEnvironment jdbcEnvironment) {
        if (identifier == null) {
            return null;
        }
        return convertToSnakeUpperCase(identifier);
    }

    @Override
    public Identifier toPhysicalTableName(Identifier identifier, JdbcEnvironment jdbcEnvironment) {
        return convertToSnakeUpperCase(identifier);
    }

    @Override
    public Identifier toPhysicalSequenceName(Identifier identifier, JdbcEnvironment jdbcEnvironment) {
        return convertToSnakeUpperCase(identifier);
    }

    @Override
    public Identifier toPhysicalColumnName(Identifier identifier, JdbcEnvironment jdbcEnvironment) {
        return convertToSnakeUpperCase(identifier);
    }

    private Identifier convertToSnakeUpperCase(final Identifier identifier) {
        final String regex = "([a-z])([A-Z])";
        final String replacement = "$1_$2";
        final String newName = identifier.getText()
                .replaceAll(regex, replacement)
                .toUpperCase();
        return Identifier.toIdentifier(newName);
    }
}

```

```java
@Entity
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

```sql
   create table MEMBER (
       ID bigint not null,
        AGE integer not null,
        CREATED_DATE timestamp,
        DESCRIPTION clob,
        LAST_MODIFIED_DATE timestamp,
        NAME varchar(255),
        ROLE_TYPE varchar(255),
        primary key (ID)
    )
```