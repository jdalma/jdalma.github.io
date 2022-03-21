---
layout: default
title: 연관관계 매핑
parent: JPA
nav_order: 15
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

# 들어가기

![](../../assets/images/jpa/relationMapping/mappingExampleTable.png)

![](../../assets/images/jpa/relationMapping/mappingExampleEntity.png)

- 객체 설계를 테이블 설계에 맞춘 방식
- 특히 **테이블의 외래키를 객체에 그대로 가져온 부분이 문제**다.
- 객체에서 참조 대신에 외래 키를 그대로 가지고 있으므로 `order.getMember()`처럼 객체 그래프 탐색이 불가능하다.
- 객체는 외래 키 대신에 참조를 사용해야한다.
- 외래 키만 가지고 있으면 연관된 엔티티를 찾을 때 외래 키로 다시 조회해야 한다.

```java
  Order order = em.find(Order.class , orderId);
  Member member = em.find(Meber.class , order.getMemberId());
```

- **객체는 참조를 사용해서 연관관계를 조회할 수 있다.**

```java
  Order order = em.find(Order.class , orderId);
  Member member = order.getMember();
```

- 객체는 참조를 사용해서 연관된 객체를 찾고 ,
- 테이블은 외래 키를 사용해서 연관된 테이블을 찾으므로 둘 사이에는 큰 차이가 있다.
- **참조와 외래 키를 어떻게 매핑하는지 알아보자**

***

# **단방향 연관관계**
- `다대일 (N:1)`단방향 관계를 가장 먼저 이해해야 한다.
- 회원과 팀의 관계를 통해 알아보자.
  - 회원과 팀이 있다.
  - 회원은 하나의 팀에만 소속될 수 있다.
  - 회원과 팀은 다대일 관계다.

![](../../assets/images/jpa/relationMapping/onewayRelation.png)

- **객체 연관관계**
  - 회원 객체는 `Member.team`필드로 팀 객체와 연관관계를 맺는다.
  - 회원 객체와 팀 객체는 **단방향 관계**다.
  - 회원은 `Member.team`으로 팀을 알 수 있지만 , 팀은 회원을 알 수 없다.
- **테이블 연관관계**
  - 회원 테이블은 `TEAM_ID`외래 키로 팀 테이블과 연관관계를 맺는다.
  - 회원 테이블과 팀 테이블은 **양방향 관계**다.
  - 양쪽으로 조인이 가능하다.
- **객체 연관관계와 테이블 연관관계의 가장 큰 차이** 📌
  - **참조를 통한 연관관계는 언제나 단방향이다.**
  - 객체간에 연관관계를 양방향으로 만들고 싶다면 반대쪽애도 필드를 추가해서 참조를 보관해야 한다.
  - 정확히 이야기하면 **양방향 관계가 아니라 서로 다른 단방향 관계가 2개다.**
  - **객체는 `참조(주소)`로 연관관계를 맺는다.**
  - **테이블은 `외래 키`로 연관관계를 맺는다.**

- 양방향 (서로 다른 단방향 관계 2개) 테스트

```java
@Entity
public class Member {

    @Id @GeneratedValue
    @Column(name = "MEMBER_ID")
    private Long id;

//    @Column(name = "TEAM_ID")
//    private Long teamId;

    // Member입장에서 Many , Team입장에서 One
    @ManyToOne
    @JoinColumn(name = "TEAM_ID")
    private Team team;

    private String username;
    ...
}

@Entity
public class Team {

    @Id @GeneratedValue
    @Column(name = "TEAM_ID")
    private Long id;

    private String name;

    @OneToMany
    @JoinColumn(name = "TEAM_ID")
    private List<Member> members;
    ...
}

/////////// main

    Team teamA = new Team();
    teamA.setName("teamA");

    entityManager.persist(teamA);

    Team teamB = new Team();
    teamB.setName("teamB");

    entityManager.persist(teamB);

    Member a = new Member(teamA , "a");
    Member b = new Member(teamA , "b");
    Member c = new Member(teamA , "c");
    Member d = new Member(teamB , "d");
    Member e = new Member(teamB , "e");

    entityManager.persist(a);
    entityManager.persist(b);
    entityManager.persist(c);
    entityManager.persist(d);
    entityManager.persist(e);

    entityManager.flush();
    entityManager.clear();

    Member readA = entityManager.find(Member.class , 3L);
    System.out.println(readA.getTeam());
    System.out.println(readA.getTeam().getMembers());
```

```
// 영속성 컨텍스트 flush , clear 후
// 3L의 멤버 찾는 쿼리
Hibernate: 
    select
        member0_.MEMBER_ID as MEMBER_I1_0_0_,
        member0_.TEAM_ID as TEAM_ID3_0_0_,
        member0_.USERNAME as USERNAME2_0_0_,
        team1_.TEAM_ID as TEAM_ID1_1_1_,
        team1_.NAME as NAME2_1_1_ 
    from
        MEMBER member0_ 
    left outer join
        TEAM team1_ 
            on member0_.TEAM_ID=team1_.TEAM_ID 
    where
        member0_.MEMBER_ID=?

// 해당 Member의 Team은 바로 가져올 수 있지만,
Team{id=1, name='teamA'}

// 해당 Member의 Team의 Members는 조회 필요
Hibernate: 
    select
        members0_.TEAM_ID as TEAM_ID3_0_0_,
        members0_.MEMBER_ID as MEMBER_I1_0_0_,
        members0_.MEMBER_ID as MEMBER_I1_0_1_,
        members0_.TEAM_ID as TEAM_ID3_0_1_,
        members0_.USERNAME as USERNAME2_0_1_ 
    from
        MEMBER members0_ 
    where
        members0_.TEAM_ID=?
        
[
    Member{id=3, team=Team{id=1, name='teamA'}, username='a'}, 
    Member{id=4, team=Team{id=1, name='teamA'}, username='b'}, 
    Member{id=5, team=Team{id=1, name='teamA'}, username='c'}
]
```
