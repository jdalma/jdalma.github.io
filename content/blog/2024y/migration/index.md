---
title: AWS DMS를 이용한 MySQL 마이그레이션 (작성중)
date: "2024-03-28"
tags:
   - mysql
   - aws dms
   - migration
---

단일 데이터베이스를 

1. [ProxySQL](https://proxysql.com/)을 사용하여 RW를 분리하고 [Orchestrator](https://github.com/openark/orchestrator)를 통하여 페일백/페일오버를 직접 구성
2. 스프링에서 RW 커넥션을 분리
3. Aurora 클러스터 페일오버, 페일백
   1. AWS 인스턴스 장애 발생 시 진행되는 페일오버, 페일백이 진행되면 대략 30초 정도 read only connection 예외가 발생, 30초 정도의 시간은 감내 가능하다고 판단 [참고](https://docs.aws.amazon.com/ko_kr/AmazonRDS/latest/AuroraUserGuide/Concepts.AuroraHighAvailability.html#Aurora.Managing.FaultTolerance)
4. Aurora 클러스터 가용성 [참고](https://docs.aws.amazon.com/ko_kr/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Replication.html)
   1. Aurora 복제본은 클러스터 볼륨의 읽기 작업 전용이므로 읽기 확장에 적합합니다. 쓰기 작업은 기본 인스턴스에서 관리합니다.
   2. 클러스터 볼륨은 Aurora MySQL DB 클러스터의 모든 인스턴스 간에 공유되므로 각 Aurora 복제본에 대한 데이터 사본을 복제하는 데 추가 작업이 필요하지 않습니다.
   3. 반면, MySQL 읽기 복제본은 소스 DB 인스턴스에서 로컬 데이터 저장소에 대한 모든 쓰기 작업을 단일 스레드에서 재생해야 합니다. 이러한 제한은 MySQL 읽기 복제본이 대량의 읽기 트래픽을 지원하는 기능에 영향을 미칠 수 있습니다.
   4. MySQL read replicas must replay, on a single thread, all write operations from the source DB instance to their local data store.
5. Aurora 클러스터 스토리지 조사
   1. [Aurora 클러스터 스토리지 구성](https://docs.aws.amazon.com/ko_kr/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.StorageReliability.html)
   2. [Aurora 클러스터 스토리지 요금](https://aws.amazon.com/ko/rds/aurora/pricing/)
6. Aurora 인스턴스 스펙 선정을 위한 부하 테스트
   1. mysqlslap
   2. sysbench
7. MySQL 8 버전으로 업그레이드하면서 확인한 것들
   1. [예약어](https://dev.mysql.com/doc/refman/8.0/en/keywords.html#keywords-8-0-detailed-C)
   2. 기존에 사용중이던 DB의 환경변수 (max-allow-packet, max-connections)
   3. utf8mb3을 utf8mb4로 변경하면서 컬럼 사이즈(VARCHAR는 최대 65535자를 저장)와 인덱스 사이즈(The DYNAMIC row format supports index key prefixes up to 3072 bytes.) 확인
      1. [DYNAMIC Row Format](https://dev.mysql.com/doc/refman/8.0/en/innodb-row-format.html#innodb-row-format-dynamic)
   4. MySQL 8.0.17부터 숫자 데이터 유형에 대한 ZEROFILL 속성과 정수 데이터 유형에 대한 표시 너비 속성은 더 이상 사용되지 않습니다. 향후 MySQL 버전에서는 정수 데이터 유형에 대한 ZEROFILL 및 표시 너비 지원이 제거될 것으로 예상해야 합니다. [참고](https://dev.mysql.com/doc/refman/8.0/en/numeric-type-attributes.html)
8. AWS DMS를 사용하면서 주의해야 할점
   1. 엔드포인트, 복제 인스턴스, 마이그레이션 태스크
   2. 적재 모드 선택
   3. 지속적인 복제를 사용하려면 binary logging이 활성화되어 있어야함
   4. 마이그레이션 대상 DB에 파티션된 테이블이 있다면 해당 테이블은 대상 DB에 미리 생성 해놓아야하며, 대상 테이블 준비 모드는 "아무 작업 안함" 또는 "자르기"를 선택해야 한다.
   5. 동기화가 끝나면 대상 테이블의 AUTO_INCREMENT 값을 수동으로 동기화 시켜줘야 한다.
   6. 테이블에 LOB 형식의 컬럼이 Not null 제약 조건이 있다면 해당 제약 조건을 제거하고 마이그레이션이 끝난 후 제약 조건을 추가해야 한다.
9. AWS DMS
   1. 동시에 8개의 테이블을 10000 레코드를 복제함. 변경 감지 트랜잭션 활성화 시간은 기본값인 10분이지만 변경도 가능하긴 함