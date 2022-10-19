---
layout: default
title: 프록시
parent: JPA
nav_order: 20
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

- `em.find()` vs `em.getReference()`
  - `em.find()` : 데이터베이스를 통해 실제 엔티티 객체 조회
  - `em.getReference()` : 데이터베이스 조회를 미루는 가짜(프록시) 엔티티 객체 조회, **실제로 사용될 때 조회한다.**

```java
Member findMember = em.getReference(Member.class, member.getId());
System.out.println("class : " + findMember.getClass());
System.out.println("username : " + findMember.getName());
System.out.println("team : " + findMember.getTeam().getName());
```

```
class : class Member$HibernateProxy$ps7y9Ybs
Hibernate: 
    select
        ...
    from
        MEMBER member0_ 
    left outer join
        TEAM team1_ 
            on member0_.TEAM_ID=team1_.TEAM_ID 
    where
        member0_.MEMBER_ID=?
username : Member
team : Team
```

- `Member$HibernateProxy$ps7y9Ybs` `class`를 찍으면 프록시라고 나온다.
- 그리고 실제로 `findMember`를 **사용할 때 조회쿼리를 실행하는 것을 볼 수 있다.**

<br>

# 프록시 객체

1. 실제 클래스를 상속 받아서 만들어진다
   - 클래스를 상속받아 프록시로 만드는 것은 `CGLIB` 라이브러리이지 않을까?
2. 실제 클래스와 겉 모양이 같다
3. 프록시 객체는 실제 객체의 참조(`target`)를 보관
4. 프록시 객체를 호출하면 `target`의 메소드를 호출한다
5. 처음 사용할 때 **한 번만 초기화**
6. 프록시 객체를 초기화 할 때, `프록시 객체가 실제 엔티티로 바뀌는 것은 아니다`.
   - 초기화되면 프록시 객체를 통해서 실제 엔티티에 접근한다.
7. 프록시 객체는 원본 엔티티스를 상속받는다
   - 따라서 타입 체크시 `instance of`를 사용해야 한다.
8. 영속성 컨텍스트에 찾는 엔티티가 이미 있으면 `em.getReference()`를 호출해도 실제 엔티티가 반환된다
9. 영속성 컨텍스트의 도움을 받을 수 었는 **준영속 상태일 때, 프록시를 초기화하면 `org.hibernate.LazyInitializationException`예외를 던진다**

```java
Member findMember = em.find(Member.class, member.getId());
Member refMember = em.getReference(Member.class, member.getId());
System.out.println(findMember + " " + findMember.getClass());
System.out.println(refMember + " " + refMember.getClass());
System.out.println("findMember == refMember : " + (findMember == refMember));
```
```
Member{id=[2], name=[Member]} class Member
Member{id=[2], name=[Member]} class Member
findMember == refMember : true
```

- 위와 같이 **한 개의 영속성 컨텍스트에서는 `findMember`와 `refMember`가 동일한 객체로 보장된다**
- 하지만 조회 순서를 바꾸면 어떻게 될까?

```java
Member refMember = em.getReference(Member.class, member.getId());
Member findMember = em.find(Member.class, member.getId());

System.out.println(findMember + " " + findMember.getClass());
System.out.println(refMember + " " + refMember.getClass());
System.out.println("findMember == refMember : " + (findMember == refMember));
```
```
Member{id=[2], name=[Member]} class Member$HibernateProxy$cbFwN2VU
Member{id=[2], name=[Member]} class Member$HibernateProxy$cbFwN2VU
findMember == refMember : true
```

- 여전히 **한 개의 영속성 컨텍스트에서는 `findMember`와 `refMember`가 동일한 객체로 보장된다**
- 하지만 **동일한 객체로 보장하기 위해 프록시로 반환된다.** (`em.find()`도 프록시로 반환된다)

***

```java
Member refMember = em.getReference(Member.class, member.getId());
System.out.println(refMember.getClass());
em.detach(refMember);
System.out.println(refMember.getName());
```

```
class Member$HibernateProxy$uDHReZhc
org.hibernate.LazyInitializationException: could not initialize proxy [Member#2] - no Session
	at org.hibernate.proxy.AbstractLazyInitializer.initialize(AbstractLazyInitializer.java:169)
	at org.hibernate.proxy.AbstractLazyInitializer.getImplementation(AbstractLazyInitializer.java:309)
	at org.hibernate.proxy.pojo.bytebuddy.ByteBuddyInterceptor.intercept(ByteBuddyInterceptor.java:45)
	at org.hibernate.proxy.ProxyConfiguration$InterceptorDispatcher.intercept(ProxyConfiguration.java:95)
	at Member$HibernateProxy$uDHReZhc.getName(Unknown Source)
	at Main.main(Main.java:32)
```

- 영속성 컨텍스트에서 관리되지 않는 상태, **준영속 상태인 프록시를 초기화 했기 때문이다.**
  - `em.find()`였다면 완전한 객체이기 때문에 예외를 던지지 않는다


# 프록시 확인 방법

- `emf.getPersistenceUnitUtil().isLoaded(refMember)`
  - 초기화 이전에는 `false`, 초기화 후에는 `true`

```java
Member refMember = em.getReference(Member.class, member.getId());
System.out.println(emf.getPersistenceUnitUtil().isLoaded(refMember));

// JPA 표준은 강제 초기화가 없다
Hibernate.initialize(refMember); // Hibernate 강제 초기화
```

```
false
Hibernate: 
    select
        ...
    from
        MEMBER member0_ 
    left outer join
        TEAM team1_ 
            on member0_.TEAM_ID=team1_.TEAM_ID 
    where
        member0_.MEMBER_ID=?
Hibernate: 
    select
        ...
    from
        MEMBER members0_ 
    where
        members0_.TEAM_ID=?
Team{id=1, name='Team', members=[Member{id=2, name='홍길동'}]}
```