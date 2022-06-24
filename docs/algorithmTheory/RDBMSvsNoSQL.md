---
layout: default
title: RDBMS 와 NoSQL
parent: 📕 정리
nav_order: 5
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

- [AWS - NoSQL이란?](https://aws.amazon.com/ko/nosql/)
- [NoSQL Data Modeling](https://phoenixnap.com/kb/nosql-data-modeling)
- [NoSQL에 대해 알아보자](https://shoark7.github.io/programming/knowledge/what-is-NoSQL)
- [What is NoSQL](https://github.com/alstjgg/cs-study/blob/main/%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4/NoSQL%20-%202.%20What%20is%20NoSQL.md)
- [Scale-up과 Scale-out에 대해 알아보자!](https://tecoble.techcourse.co.kr/post/2021-10-12-scale-up-scale-out/)

# 용어 정리

## **SQL(Structured Query Language)**<br>
- 관계형 데이터베이스 관리 시스템의 데이터를 관리하기 위해 설계된 **특수 목적의 프로그래밍 언어**이다 
- 관계형 데이터베이스 관리 시스템에서 **자료의 검색과 관리, 데이터베이스 스키마 생성과 수정, 데이터베이스 객체 접근 조정 관리**를 위해 고안되었다.
- 데이터베이스의 경우 표준 SQL을 지키기는 하지만 `각각의 제품에 특화시킨 SQL을 사용한다`
 - 오라클 → `PL/SQL`
 - SQL Server → `T-SQL`
 - MySQL → `SQL`

1. **DDL(Data Definition Language)**
   - 데이터베이스 구조를 정의, 수정, 삭제하는 언어이며 create, alter, drop 등이 있다.
2. **DML(Data Manipulation Language)**
   - 데이터베이스 내의 자료 검색, 삽입, 갱신, 삭제를 위한 언어로 select, delete, update, insert가 있다.
3. **DCL(Data Control Language)**
   - 데이터에 대해 무결성을 유지, 병행 수행 제어, 보호와 관리를 위한 언어로 commit, rollback, grant, revoke가 있다.


## **Scale Up**

## **Scale Out**

## **Sharding**

## **Partitioning**

***

# **관계형 데이터베이스**
- **사전에 엄격하게 정의돤 DB Schema를 요구하는 Table 기반 데이터 구조를 갖는다**
- 데이터는 스키마(Schema)로 정의된 2차원 테이블에 저장
- 각 열은 하나의 속성에 대한 정보를 저장
- 각 행은 각 열의 데이터 형식에 맞는 데이터가 저장
- 데이터 관리를 위해 테이블 간의 관계를 구조화하는 것이 중요
- 이러한 관계를 나타내기 위해 `외래 키(Foreign Key)` 라는 것을 사용한다
- 데이터의 일관성을 보장한다

<br>

**SQL의 모든 transaction은 `ACID`한 특성을 유지해야 한다**  <br>
  - *ACID Atomicity, Consistency, Isolation, Durability*
<br>

- **원자성** `Atomicity` : 각 Transaction은 여러 질의문으로 이루어질 수도 있는데 이런 각 transaction은 `단일 단위`여야 한다
- **일관성** `Consistency`: Transaction은 데이터베이스의 불변값은 그대로 둔 채 한 상태를 유효한 다른 상태로 전이해야 한다
- **독립성** `Isolation`: Transaction은 때로는 거의 동시에(Concurrently) 처리될 수 있는데 이때의 결과가 각 Transaction이 순차적으로 처리될 때의 결과와 같아야 한다
- **지속성** `Durability`: Transaction은 한 번 처리된 뒤로는 시스템 오류 등의 이상이 있어도 그 결과가 유지되어야 한다.(즉, 처리결과가 비휘발성의 메모리에 저장되어야 한다)
<br>

# **NoSQL 데이터베이스** Not only SQL
<br>

![](../../assets/images/algorithmTheory/rdbvsnosql/nosqlKeyValue.png)

1. **Key-value 방식(Riak, Redis, Voldmort)**
   - 키를 고유한 식별자로 사용하는 **키-값 쌍으로 데이터를 저장**한다
   - 키-값 데이터베이스는 `파티셔닝`이 가능하고, `수평 확장`이 가능하다

<br>

![](../../assets/images/algorithmTheory/rdbvsnosql/nosqlDocument.png)

2. **Document 방식(MongoDB, CouchDB)**
   - 문서 처럼 저장하는 데이터베이스를 의미한다
   - XML이나 JSON, YAML 같은 **데이터 타입(document)을 이용해서 레코드를 저장**한다
   - 각각의 문서는 하나의 속성에 대한 데이터를 가지고 있고 , 컬렉션이라고 하는 그룹으로 묶어서 관리한다

<br>

![](../../assets/images/algorithmTheory/rdbvsnosql/nosqlColumn.png)

3. **Column 방식(Hbase, Casandra)**
   - key-value와 데이터 저장 방식은 동일
   - 보통의 NoSQL은 order by 같은 정렬 기능을 제공하지 않지만, 이 모델은 내부적으로 key를 정렬
   - **RDBMS에서는 데이터를 row 단위로 저장한다면, column model 은 column 단위로 저장한다**
   - 각 column은 column family로 묶이고, 이 family들은 또 다른 column이 될 수 있다
   - 하나의 키에 여러 개의 컬럼 이름과 컬럼 값의 쌍으로 이루어진 데이터를 저장하고 조회
   - 데이터 저장의 기본 단위 (column name + column value + time stamp)

<br>

![](../../assets/images/algorithmTheory/rdbvsnosql/nosqlGraph.png)

4. **Graph 방식(Sones, Allegro Graph)**
   - 데이터를 노드로 표현하고, 노드 사이의 관계를 화살표로 표현한다.

***

![](../../assets/images/algorithmTheory/rdbvsnosql/rdbnosqlDiff.png)


> NoSQL은 언제 사용하면 좋을까요 ?
>   - 정확한 데이터 구조가 정해져 있지 않고 , Update가 자주 일어나지 않으며 **조회가 많은 경우**
>   - 또 `scale out`이 가능하므로 데이터 양이 매우 많은 경우에 사용하면 좋다
