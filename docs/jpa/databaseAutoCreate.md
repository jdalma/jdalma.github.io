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
