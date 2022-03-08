---
layout: default
title: JPA
nav_order: 30
has_children: true
permalink: /docs/jpa
---

JPA의 성능 최적화 기능
- 1차 캐시와 동일성 보장
  - 같은 트랜잭션 안에서는 같은 엔티티를 반환
  - DB Isolation Level이 Read Commit 이어도 애플리케이션에서 Repeatable Read 보장
- 트랜잭션을 지원하는 쓰기 지연 (transactional write-behind)
  - 트랜잭션을 커밋할 때 까지 INSERT SQL을 모은다
    - JDBC BATCH SQL 기능을 사용해서 한번에 SQL 전송
  - UPDATE , DELETE로 인한 ROW 락 시간 최소화
    - 트랜잭션 커밋 시 UPDATE , DELETE SQL 실행하고 , 바로 커밋

```java
updateItem(item1);
deleteItem(item2);

    // 비지니스 로직 수행 - 위에서 수정한 로우는 락이 걸리지 않는다.

// 커밋하는 순간 데이터베이스에 UPDATE , DELETE SQL을 보낸다
transaction.commit();
```

- 지연 로딩 (lazy Loading) 과 즉시 로딩
  - 지연 로딩 : 객체가 실제 사용될 때 로딩 (스프링 AOP , Proxy 기능을 사용)
  - 즉시 로딩 : JOIN SQL로 한번에 연관된 객체까지 미리 조회

- `EntityManagerFactory`는 하나만 생성해서 애플리케이션 전체에서 공유
- `EntityManager`는 쓰레드간에 절대 공유하면 안된다
- **JPA의 모든 데이터 변경은 트랜잭션 안에서 실행**

```java
  EntityManagerFactory emf = Persistence.createEntityManagerFactory("hello");
  EntityManager em = emf.createEntityManager();
  EntityTransaction transaction = em.getTransaction();

  transaction.begin();
  try{
      Member member = em.find(Member.class , 1L);
      System.out.println(member);
//            member.setName("update name");

//            em.persist(member);
      transaction.commit();
  }
  catch (Exception e){
      transaction.rollback();
  }
  finally {
      em.close();
  }
  emf.close();
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
            <property name="hibernate.show_sql" value="true"/>
            <property name="hibernate.format_sql" value="true"/>
            <property name="hibernate.use_sql_comments" value="true"/>
            <!--<property name="hibernate.hbm2ddl.auto" value="create" />-->
        </properties>
    </persistence-unit>
</persistence>
```