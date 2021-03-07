---
layout: default
title: Dynamic Proxy
parent: JAVA
nav_order: 5
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

# **스프링 데이터 JPA는 어떻게 동작할까?**

✅**Spring AOP를 기반으로 동작하며 RepositoryFactorySupport에서 프록시를 생성한다.**
{: .fh-default .fs-5 }
+ 리플렉션의 일부

```java
@Service
public class MemberService(){

  @Autowired
  MemberRepository memberRepository;

}
```
```java
public interface MemberRepository extends JpaRepository<Member, Long> , MemberRepository{
    @Override
    Optional<Member> findByName(String name);

    @Override
    Optional<Member> findById(Long aLong);
}
```

> ✋
> **interface인 MemberRepository가 어떻게 Service에 참조가 되는걸까??**
>
> 📌 **RepositoryFactorySupport.class (abstract)**
> -  **ProxyFactory.class**
>    - JAVA에서 제공하는 Dynamic Proxy를 추상화 해놓은 Spring AOP의 핵심 클래스

-  `@DataJpaTest`
