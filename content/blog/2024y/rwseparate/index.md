---
title: Spring RW분리를 이해하기 위한 여정 (+ JDBC, 서비스 추상화)
date: "2024-07-10"
tags:
   - Lab
   - Spring
   - Transaction
---

IDC 환경의 MySQL 서버를 AWS로 마이그레이션하면서 [스프링에서 읽기/쓰기 분리](https://jdalma.github.io/2024y/mysqlMigration/#%EC%8A%A4%ED%94%84%EB%A7%81%EC%97%90%EC%84%9C-%EC%9D%BD%EA%B8%B0%EC%93%B0%EA%B8%B0-%EB%B6%84%EB%A6%AC)를 스프링에서 제공하는 [LazyConnectionDataSourceProxy](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/jdbc/datasource/LazyConnectionDataSourceProxy.html) 클래스를 활용해서 해결하였다.  
  
이번 글을 통해 JDBC와 스프링이 제공하는 PSA에 대해 정리해보고 어떤 원리로 읽기/쓰기가 분리된 것인지 이해해보려한다.  

# JDBC

![](./jdbcApi.png)

우리가 쉽게 접하고 사용하는 MyBatis와 하이버네이트에서도 기저에는 JDBC API를 사용하여 데이터베이스와 통신하기에 먼저 JDBC가 무엇인지 이해할 필요가 있다.  
  
![](./jdbcArchitecture.png)

**JDBC(Java Database Connectivity)** 는 클라이언트가 모든 종류의 표 형식 데이터, 특히 관계형 데이터베이스에 액세스할 수 있는 방법을 정의하는 Java용 응용 프로그래밍 인터페이스이다.  
Java 애플리케이션과 데이터베이스 간의 **중간 계층 인터페이스 역할** 을 하며, 데이터 소스에 연결하거나 쿼리를 실행하고 데이터베이스 질의 결과를 처리하기 위한 가이드이다.  
  
**JDBC 드라이버** 는 Java 애플리케이션의 요청을 DBMS가 이해할 수 있는 프로토콜로 변환하는 `클라이언트 측 어댑터`이다.  
즉, JDBC 드라이버는 Java 애플리케이션과 데이터베이스가 상호 작용할 수 있도록 JDBC API의 인터페이스를 구현하는 소프트웨어 구성 요소이다.  
이 드라이버의 유형에는 Sun Microsystem에서 정의한 4개의 유형이 있다.  
(자세한 설명은 [JDBC 드라이버](https://www.geeksforgeeks.org/jdbc-drivers/)를 참고하자.)  

1. Type-1 드라이버 또는 JDBC-ODBC 브리지 드라이버
2. Type-2 드라이버 또는 Native-API 드라이버
3. Type-3 드라이버 또는 네트워크 프로토콜 드라이버
4. **Type-4 드라이버 또는 Thin 드라이버(완전 Java 드라이버)** : 데이터베이스에 직접 연결하여 JDBC 호출을 데이터베이스별 호출로 변환한다.

데이터베이스마다 고유한 프로토콜이 필요하다는 단점이 있긴 하지만, 데이터베이스 서버에 직접 연결하면 다른 Type에 비해 더 나은 성능을 제공하는 장점이 있는 Type-4가 가장 일반적으로 사용된다.  

## JDBC API 사용하기

![](./jdbc.png)

```java
    // 1. JDBC 드라이버 로드는 JDBC4.0부터 클래스 경로에 있는 모든 드라이버가 자동으로 로드되기 때문에 직접 Class.forName을 호출할 필요가 없다.
    public Member findById(String memberId) throws SQLException {
		String sql = "select * from member where member_id = ?";

        Connection con = null;
        PreparedStatement pstmt = null;
        ResultSet rs =  null;

        try {
            // 2. 데이터베이스 연결 (커넥션 생성)
            con = getConnection();

            // 3. SQL 명령을 전송하기 위한 Statement 준비 (PreparedStatement 또는 CallableStatment)
            pstmt = con.prepareStatement(sql);
            pstmt.setString(1, memberId);

            // 4. SQL문 전송
            // 5. 질의문 결과(ResultSet) 생성
            rs = pstmt.executeQuery();
            if (rs.next()) {
                Member member = new Member();
                member.setMemberId(rs.getString("member_id"));
                member.setMoney(rs.getInt("money"));
                return member;
            } else {
                throw new NoSuchElementException("member not found memberId = {}" + memberId);
            }
        } catch (SQLException e) {
            log.error("db error", e);
            throw e;
        } finally {
            // 6. 연결 해제 (사용된 리소스 해제)
            close(con, pstmt, rs);
        }
    }

    public Connection getConnection() {
        try {
            Connection connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
            log.info("get connection = {}, class = {}", connection, connection.getClass());
            return connection;
        } catch (SQLException e) {
            throw new IllegalStateException(e);
        }
    }
```

![](./sequence.png)

- **DriverManager와 Driver**
  - DriverManager가 모든 Driver를 로드한 다음, 연결 요청이 있을 때마다 각 드라이버에 차례대로 대상 URL에 연결을 시도하도록 요청한다. ([Service Provider Interface](https://www.baeldung.com/java-spi))
  - Driver는 모든 드라이버 클래스가 구현해야 하는 인터페이스이며, 실질적으로 데이터베이스에 연결을 시도하고 Connection을 반환하는 `connect()` 메서드가 있다.
- **Connection**
  - 특정 데이터베이스와의 연결(세션)을 유지하며, SQL문이 실행되고 결과가 반환되는 컨텍스트이다.
  - 데이터베이스의 메타정보를 조회하거나 트랜잭션의 격리 수준과 커밋 모드 등을 수정하는 책임을 가지고 있다.
- **PreparedStatement**
  - SQL문을 나타내는 객체이며, 파라미터를 바인딩할 수 있다.
  - SQL문을 실행하고 결과를 반환하는 책임이 있다.
- **ResultSet**
  - 데이터베이스 결과 집합을 나타내며, 결과 집합의 데이터 행을 가리키는 커서를 유지한다.
  - 레코드의 데이터를 특정 데이터 타입으로 가져오는 방법을 제공한다.

아래와 같이 사용하는 데이터베이스 드라이버에 따라 다른 구현체가 선택되어 실행된다.  

|JDBC API|H2|MySQL|
|------|---|---|
|java.sql.Driver|org.h2.Driver|com.mysql.cj.jdbc.NonRegisteringDriver|
|java.sql.Connection|org.h2.jdbc.JdbcConnection|com.mysql.cj.jdbc.ConnectionImpl|
|java.sql.PreparedStatement|org.h2.jdbc.JdbcPreparedStatement|com.mysql.cj.jdbc.ClientPreparedStatement|
|java.sql.ResultSet|org.h2.jdbc.ResultSet|com.mysql.cj.jdbc.result.ResultSetInternalMethods|

# 커넥션 생성 추상화

![](./individualConnection.png)

이전에 알아보았던 `DriverManager.getConnection(...)`을 통한 커넥션 생성은 항상 새로운 커넥션을 생성한다.  
이런 비효율적인 작업을 **Connection Pool을 통해 개선할 수 있다.**  
하지만 Connection Pool을 사용해서 Connection을 얻어오는 방법과 DriverManager를 사용해서 Connection을 얻어오는 방법이 서로 다를 수 있기에 자바는 **Connection을 획득하는 방법을 추상화 시킬 수 있는 `javax.sql.DataSource` 인터페이스를 제공한다.**  
JDBC API처럼 드라이버 공급업체에서 해당 DataSource 인터페이스를 구현해놓았다.  
  
![](./dataSource.png)

```java
    @Test
    void dataSourceDriverManager() throws SQLException {
        DataSource dataSource = new DriverManagerDataSource(URL, USERNAME, PASSWORD);
		
        useDataSource(dataSource);
    }

    @Test
    void dataSourceConnectionPool() throws SQLException {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl(URL);
        dataSource.setUsername(USERNAME);
        dataSource.setPassword(PASSWORD);
        dataSource.setMaximumPoolSize(10);
        dataSource.setPoolName("My Pool!!!");

        useDataSource(dataSource);
    }

    private void useDataSource(DataSource dataSource) throws SQLException {
        Connection con1 = dataSource.getConnection();
        Connection con2 = dataSource.getConnection();
		...
    }
```

```
// DrivetManager를 통한 요청할 때마다 Connection 새로 생성
[main] DEBUG o.s.j.d.DriverManagerDataSource -- Creating new JDBC DriverManager Connection to [..]
[main] DEBUG o.s.j.d.DriverManagerDataSource -- Creating new JDBC DriverManager Connection to [..]

// HikariCP 초기화를 위한 Connection 생성
[main] INFO  com.zaxxer.hikari.pool.HikariPool -- My Pool!!! - Added connection conn0: ...
[connection adder] DEBUG ...HikariPool -- My Pool!!! - Added connection conn1: ...
[connection adder] DEBUG ...HikariPool -- My Pool!!! - Added connection conn2: ...
[connection adder] DEBUG ...HikariPool -- My Pool!!! - Added connection conn3: ...
[connection adder] DEBUG ...HikariPool -- My Pool!!! - Added connection conn4: ...
[connection adder] DEBUG ...HikariPool -- My Pool!!! - Added connection conn5: ...
[connection adder] DEBUG ...HikariPool -- My Pool!!! - Added connection conn6: ...
[connection adder] DEBUG ...HikariPool -- My Pool!!! - Added connection conn7: ...
[connection adder] DEBUG ...HikariPool -- My Pool!!! - Added connection conn8: ...
[connection adder] DEBUG ...HikariPool -- My Pool!!! - Added connection conn9: ...
```

이 추상화 덕분에 클라이언트 입장에서는 인터페이스에만 의존하기 때문에 Connection을 반환하는 DataSource의 구현체가 변경되어도 상관없다.  

# 트랜잭션 서비스 추상화

Connection에 대한 추상화를 통해 데이터베이스 의존성에 대한 결합도가 약해졌지만 아직 문제가 있다.  

3. 데이터 접근 기술(JDBC, JPA...)마다 다른 트랜잭션 사용 방법은 어떻게 통일할 수 있을까? → **트랜잭션 추상화**
1. 애플리케이션의 서비스 로직에 DB 트랜잭션 경계 설정을 사용하기 위해서는 어떻게 해야 할까? → **리소스 동기화**
2. 반복되는 JDBC API 코드는 어떻게 해결할 수 있을까? → **트랜잭션 AOP**

스프링은 이미 모두 해결해놓았다.

## 트랙잭션 추상화

Spring 프레임워크는 트랜잭션 관리를 위한 일관된 추상화를 제공한다. 대표적인 인터페이스들을 알아보자.  
트랜잭션 상태를 질의할 수 있고 트랜잭션 Commit,Rollback에 사용되는 `TransactionStatus` 인터페이스를 제공한다.  

![](./transactionStatus.png)

그리고 DataSource와 TransactionStatus를 사용하는 `PlatformTransactionManager` 인터페이스를 제공한다.  
`org.springframework.transaction.PlatformTransactionManager` 인터페이스는 명령형 트랜잭션 관리를 위한   트랜잭션 추상화의 핵심이다.  
(반응형을 위한 ReactiveTransactionManager 인터페이스도 존재한다.)  
  
```java
public interface PlatformTransactionManager extends TransactionManager {

    TransactionStatus getTransaction(TransactionDefinition definition) 
		throws TransactionException;
    void commit(TransactionStatus status) throws TransactionException;
    void rollback(TransactionStatus status) throws TransactionException;
}
```

![](./platformTransactionManager.png)
  
## 리소스 동기화

스프링은 Connection 동기화를 위해 `ThreadLocal`을 사용하는 **TransactionSynchronizationManager** 를 제공한다.  
AbstractPlatformTransactionManager와 이 추상 클래스를 상속하고 있는 하위 클래스는 템플릿 메서드 패턴으로 협력하며, TransactionSynchronizationManager를 이용한다.  
  
```java
public class MemberService {

    private final PlatformTransactionManager transactionManager;

    public void accountTransfer(String fromId, String toId, int money) {
		// TransactionStatus를 생성하면서 트랜잭션을 시작한다.
        TransactionStatus status = transactionManager.getTransaction(
			new DefaultTransactionDefinition()
		);

        try {
            bizLogic(fromId, toId, money);
            transactionManager.commit(status);
        } catch (Exception e) {
            transactionManager.rollback(status);
            throw new IllegalStateException(e);
        }
    }
	...
}
```

![](./transactionSynchronization.png)

> `DataSourceUtils.getConnection()` : TransactionSynchronizationManager가 관리하는 Connection이 있으면 해당 Connection을 반환한다. 없으면 생성해서 반환한다.  
> `DataSourceUtils.releaseConnection()` : 동기화된 Connection은 닫지 않고, 동기화되지 않은 Connection은 닫아버린다.

## 트랜잭션 AOP

서비스 추상화를 통해 유연해졌고, 트랜잭션 동기화 매니저를 통해 Connection도 동기화하였다.  
하지만 아직 서비스 계층에서 트랜잭션 관련 코드가 남아있는데, 이 문제를 `@Transacitonal`을 통해 해결할 수 있다.  
일반적으로 데이터베이스, 트랜잭션 관련 API를 직접 사용하는 것보다 Spring 추상화를 통한 작업이 훨씬 더 유연하기 때문에 DataSourceUtils나 다른 헬퍼 클래스 사용을 자제하는 것이 좋다.  

```java
// [4]
public interface Service {
    // [3]
    void method1();
    // [3]
    void method2();
}

// [2]
public class ServiceImpl implements Service {
    // [1]
    public void method1(){ ... }
    // [1]
    public void method2() { ... }
}
```

`@Transactional`을 적용할 때 **4단계의 대체정책** 을 이용한다.  
타깃 오브젝트의 메소드 → 타깃 클래스 → 선언 메소드 → 선언 클래스(또는 인터페이스)의 순서에 따라서 적용됐는지 차례대로 확인하고,
가장 먼저 발견되는 속성정보를 사용하게된다.  
그리고 `public`으로 정의된 메서드만 트랜잭션이 걸리게 스프링이 제한해놓았다.  
  
이 AOP를 적용하기 위해 아래의 클래스가 제공된다.  
1. **어드바이저** : `BeanFactoryTransactionAttributeSourceAdvisor`
2. **포인트컷** : `TransactionAttributeSourcePointcut`
3. **어드바이스** : `TransactionInterceptor`

![](./transactionalAOP.png)

![](./transactional.png)

Spring AOP 덕분에 비즈니스 로직까지 모두 해결하였다. 프록시 생성에 대한 자세한 내용은 [빈 후처리기를 이용한 프록시 생성에 대해](https://jdalma.github.io/2024y/postprocessor/#%EB%B9%88-%ED%9B%84%EC%B2%98%EB%A6%AC%EA%B8%B0%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%9E%90%EB%8F%99-%ED%94%84%EB%A1%9D%EC%8B%9C-%EC%83%9D%EC%84%B1%EA%B8%B0)를 참고하자.

***

# 읽기/쓰기 분리하기



## 두 개의 DataSource 등록

```kotlin
@Configuration
class ReplicationDataSourceConfig {

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.primary")
    fun primaryDataSource(): DataSource {
        return DataSourceBuilder.create().build()
    }

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.secondary")
    fun secondaryDataSource(): DataSource {
        return DataSourceBuilder.create().build()
    }

    ...
}
```

읽기/쓰기를 모두 사용할 DataSource와 읽기 전용으로 사용할 DataSource를 등록해야 한다.  
DataSource가 생성되는 

```java
/**
 * DataSource 를 구축하기 위한 편의 클래스입니다.  
 * 일반적인 DataSource 에서 지원하는 속성의 제한된 하위 집합과 가장 적합한 풀링 DataSource 구현을 선택하기 위한 감지 논리를 제공합니다.
 */
public final class DataSourceBuilder<T extends DataSource> {

    private static <T extends DataSource> MappedDataSourceProperties<T> lookupPooled(ClassLoader classLoader,
            Class<T> type) {
        MappedDataSourceProperties<T> result = null;
        result = lookup(classLoader, type, result, "com.zaxxer.hikari.HikariDataSource",
                HikariDataSourceProperties::new);
        result = lookup(classLoader, type, result, "org.apache.tomcat.jdbc.pool.DataSource",
                TomcatPoolDataSourceProperties::new);
        result = lookup(classLoader, type, result, "org.apache.commons.dbcp2.BasicDataSource",
                MappedDbcp2DataSource::new);
        result = lookup(classLoader, type, result, "oracle.ucp.jdbc.PoolDataSourceImpl",
                OraclePoolDataSourceProperties::new, "oracle.jdbc.OracleConnection");
        result = lookup(classLoader, type, result, "com.mchange.v2.c3p0.ComboPooledDataSource",
                ComboPooledDataSourceProperties::new);
        return result;
    }
    ...
}
```

5개의 DataSourceClassName 중 제공되는 DataSource를 생성한다.  
순서대로 진행되면서 DataSource가 생성되면 그 후에 진행되는 `lookup`은 무시된다.  


# 궁금한 내용들 정리

1. [x] DataSource의 Connection을 얻어오는 과정부터 실제로 쿼리가 실행되고 커밋되는 구조 (트랜잭션 서비스 추상화에 대한 이해)
2. [ ] LazyConnectionDataSourceProxy의 역할
3. [ ] 여러 데이터소스 사용 시 락 예외 [참고](https://github.com/jdalma/footprints/tree/main/%EC%B4%88%EC%95%88)

# 읽어보기

1. [ ] [JDBC Internal - 타임아웃의 이해](https://d2.naver.com/helloworld/1321)

# 참고

1. [JDBC Architecture Overview](https://etutorials.org/SQL/Postgresql/Part+II+Programming+with+PostgreSQL/Chapter+13.+Using+PostgreSQL+from+a+Java+Client+Application/JDBC+Architecture+Overview/)
1. [Introduction to JDBC](https://www.baeldung.com/java-jdbc)
2. [Loading JDBC Drivers](https://www.baeldung.com/java-jdbc-loading-drivers)
3. [[10분 테코톡] 코코닥의 JDBC](https://www.youtube.com/watch?v=ONYVhJGl48U&ab_channel=%EC%9A%B0%EC%95%84%ED%95%9C%ED%85%8C%ED%81%AC)
4. [JDBC Connection 에 대한 이해, HikariCP 설정 팁](https://jiwondev.tistory.com/291)
5. [스프링 DB 1편 - 데이터 접근 핵심 원리](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-db-1)
6. [Synchronizing Resources with Transactions](https://docs.spring.io/spring-framework/reference/data-access/transaction/tx-resource-synchronization.html)
7. [Understanding the Spring Framework Transaction Abstraction](https://docs.spring.io/spring-framework/reference/data-access/transaction/strategies.html#page-title)