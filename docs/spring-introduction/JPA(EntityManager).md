---
layout: default
title: JPA(EntityManager)
parent: 스프링 입문
nav_order: 5
---

# JPA(EntityManager)
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---
### **build.gradle 수정**
```java
dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
	implementation 'org.springframework.boot:spring-boot-starter-web'
	//implementation 'org.springframework.boot:spring-boot-starter-jdbc'
	implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
	runtimeOnly 'com.h2database:h2'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
```
✅`spring-boot-starter-data-jpa` 는 내부에 jdbc 관련 라이브러리를 포함한다. 따라서 jdbc는 제거해도 된다
{: .fs-3 }
### **application.properties**
```yaml
spring.datasource.url=jdbc:h2:tcp://localhost/~/test
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=none
```
✅JPA에서 날리는 쿼리를 볼 수 있다.
{: .fs-3 }
✅테이블 자동 생성 기능을 끈다.
{: .fs-3 }
### **JpaMemberRepository**
```java
public class JpaMemberRepository implements MemberRepository {

    private final EntityManager em;

    public JpaMemberRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public Member save(Member member) {
        em.persist(member);
        return member;
    }

    @Override
    public Optional<Member> findById(Long id) {
        Member member = em.find(Member.class , id); // 조회할 타입과 식별자 PK값
        return Optional.ofNullable(member);
    }

    @Override
    public Optional<Member> findByName(String name) {   // PK값이 아닐 때는 JPQL을 작성 하여야한다.
        List<Member> result =
              em.createQuery("select m from Member m where m.name= :name" , Member.class)
                  .setParameter("name" , name)
                  .getResultList();
        return result.stream().findAny();
    }

    @Override
    public List<Member> findAll() { // JPQL 쿼리 (Member Entity 객체 자제를 조회한다.)
        return em.createQuery("select m from Member m" , Member.class).getResultList();
    }
}
```

### **MemberService**
```java
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    /**
     * 회원 가입
     */
    public Long join(Member member){
        // 같은 이름이 있는 중복 회원은 안된다.
        validateDuplicateMember(member);

        memberRepository.save(member);
        return member.getId();
    }

    private void validateDuplicateMember(Member member) {
        memberRepository.findByName(member.getName())
                .ifPresent( m -> {
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });
    }

    /**
     * 전체 회원조회
     */
    public List<Member> findMembers(){
        return memberRepository.findAll();
    }

    /**
     * 회원조회
     */
    public Optional<Member> findOne(Long memberId){
        return memberRepository.findById(memberId);
    }
}
```
✅스프링은 해당 클래스의 메서드를 실행할 때 트랜잭션을 시작하고 , 메서드가 정상 졸료되면 트랜잭션을 커밋한다.
{: .fs-3 }
✅만약 런타임 예외가 발생하면 롤백한다.
{: .fs-3 }
✅JPA를 통한 모든 데이터 변경은 트랜잭션 안에서 실행해야 한다.
{: .fs-3 }

### **SpringConfig 수정**
```java
@Configuration
public class SpringConfig {

    private EntityManager em;

    @Autowired
    public SpringConfig(EntityManager em){
        this.em = em;
    }
//    private DataSource dataSource;
//
//    @Autowired
//    public SpringConfig(DataSource dataSource) {
//        this.dataSource = dataSource;
//    }
    @Bean
    public MemberService memberService(){
        return new MemberService(memberRepository());
    }

    @Bean
    public MemberRepository memberRepository(){

//        return new MemoryMemberRepository();
//        return new JdbcMemberRepository(dataSource);
//        return new JdbcTemplateMemberRepository(dataSource);
        return new JpaMemberRepository(em);
    }
}
```
✅SpringConfig 클래스가 등록될 때 생성자를 EntityManager로 변경한다.
{: .fs-3 }
✅MemberRepository가 등록될 때 JpaMemberRepository로 변경한다.
{: .fs-3 }
* * *

### **JPQL** [출처](https://ict-nroo.tistory.com/116)
- JPA를 사용하면 엔티티 객체를 중심으로 개발
- 문제는 검색 쿼리
- 검색을 할 때도 테이블이 아닌 엔티티 객체를 대상으로 검색을 해야한다.
- DB를 몰라야 한다. 자바 코드에서 멤버 테이블이 있구나 보다, 멤버 객체가 있구나라고 생각을 가지고 개발해야 한다.
- 근데, 모든 DB 데이터를 객체로 변환해서 검색하는 것은 불가능하다.
- 애플리케이션이 필요한 데이터만 DB에서 불러오려면 결국 검색 조건이 포함된 SQL이 필요하다.
- 그래서 JPA는 SQL을 추상화한 JPQL이라는 객체 지향 쿼리 언어를 제공한다.
- SQL과 문법이 유사하고, SELECT, FROM, WHERE, GROUP BY, HAVING, JOIN등을 지원한다.
- **JPQL은 엔티티 객체를 대상으로 쿼리를 질의하고**
- **SQL은 데이터베이스 테이블을 대상으로 쿼리를 질의한다.**
