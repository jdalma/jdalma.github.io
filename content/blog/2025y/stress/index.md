---
title: DBCP maximum-pool-size 튜닝하기
date: "2025-12-20"
update: "2025-12-20"
tags:
   - tuned
   - dbcp
---

## 들어가며

DBCP 튜닝을 해본적이 없다. 기본값을 그대로 사용하거나, 막연히 큰 값을 설정하는 것을 기존 프로젝트에서 봐왔다.    
하지만 최적의 설정은 애플리케이션의 특성, 쿼리 실행 시간, 동시 사용자 수에 따라 달라지기 때문에 튜닝을 연습해보려 한다.  
  
그래서 **의도적으로 병목 상황을 만들고**, k6 부하 테스트와 Grafana 모니터링을 통해 **임계점을 직접 확인**하면서 최적의 pool size를 찾아보려 한다.

> **참고**
> - [HikariCP GitHub - About Pool Sizing](https://github.com/brettwooldridge/HikariCP/wiki/About-Pool-Sizing)
> - [HikariCP Configuration](https://github.com/brettwooldridge/HikariCP#gear-configuration-knobs-baby)

## 부하 테스트 기준

![](api.png)

```javascript
// k6/scripts/phase1-read-test.js
export const options = {
  scenarios: {
    ramping_load: {
      executor: 'ramping-vus',
      startVUs: 1,
      stages: [
        { duration: '20s', target: 10 },   // Warm-up
        { duration: '30s', target: 50 },   // Tomcat 스레드 포화 (max: 100)
        { duration: '30s', target: 100 },  // Tomcat 초과
        { duration: '30s', target: 125 },  // 고부하
        { duration: '30s', target: 150 },  // 최대 부하
        { duration: '20s', target: 0 },    // Cool-down
      ],
    },
  },
};
```

- **Tomcat 최대 스레드를 100개로 제한**
- **DBCP 최대 커넥션 수를 5개로 제한**

이 상황에서 점진적으로 부하를 줘보자

## 정상적인 상황

![](baseline.png)

1. Tomcat 스레드보다 많이 요청됐지만 정상 처리됨
2. 초당 700개의 요청을 처리
3. 99%의 요청이 200ms 이내 처리

## 각 조회 API 300ms 지연 상황

처리를 300ms 지연시켜서 DB Connection 반환을 지연시켜보자

> 📌 **부하 테스트를 하면 메트릭 집계 안되는 경우**  
> ![](disappear.png)
> 부하 테스트를 진행하면서 메트릭이 안보이는 경우가 있었는데 `/actuator/prometheus` API도 8080 포트로 조회하고 있어서 이 API 요청을 처리할 스레드가 없어서 메트릭이 조회가 안되었다.  
> 다른 포트로 할당해주면 된다. `management.server.port` 설정을 8080 포트와 분리해주면 된다.  

![](300ms-delay.png)

1. Tomcat 스레드보다 많이 요청됐지만 정상 처리됨. 
2. DB Connection 대기 시간도 30초 직전까지 보임
3. 그렇기에 응답 시간도 최악 30초 직전

일단 이것을 보고 떠오른 속성은 `db connection timeout`이다.  
일반적인 상황에서 DB Connection을 얻기 위해 30초 동안 대기한다는 것은 부하가 몰리는 경우 심각한 장애를 일으킬 확률이 높다.  
  
- **Tomcat Thread Pool 고갈**
- **사용자가 너무 많은 재시도를 할 확률이 높음**
- **재시도를 많이하면 죽은 요청이 많이 발생함**

빠르게 실패하도록 (Fail Fast) 타임아웃을 지정하고 테스트해보자.

## connection-timeout 지정

```diff
hikari:
   pool-name: StockHikariPool
   maximum-pool-size: 5             # 병목 시뮬레이션용 (기본값: 10)
+  connection-timeout: 3000         # 3초로 지정 (기본값: 30,000)
```

![](300ms-stress-test.png)


정상 처리량은 이전과 비슷하지만 DB Connection을 얻기 위해 3초까지만 대기하기 때문에 (예외 응답이긴 하지만) 3초로 유지되고 있는 것을 확인할 수 있다.  
그럼에도 빠르게 응답을 반환하여 서버 자원을 빠르게 반환하고 예외를 통한 모니터링이나 서킷브레이커에 빠르게 전파하는게 좋다고 생각된다.  

```java
java.sql.SQLTransientConnectionException: StockHikariPool - Connection is not available, request timed out after 3001ms (total=5, active=5, idle=0, waiting=94)
	at com.zaxxer.hikari.pool.HikariPool.createTimeoutException(HikariPool.java:714)
	at com.zaxxer.hikari.pool.HikariPool.getConnection(HikariPool.java:184)
   ...
```
  
## maximum-pool-size 튜닝

이 글의 핵심인 pool size를 튜닝해보자. 각 API는 300ms 지연은 불가피한 상황에서 pool size를 튜닝해서 처리량을 증가시키고 에러율을 낮출 수 있을지, 그리고 pool size가 크면 클수록 이득인건지 확인해보자.

### pool size 5개인 현재 상황 분석

| 지표 | 관찰 결과 |
|------|----------|
| Request Rate | 정상 응답률은 피크 시 `8~9 req/s`로 제한됨 |
| Response Time (avg) | **3초로 고정** (db connection-timeout에 의해 제한됨) |
| Connection Acquire p99 | **3초에서 평탄화** (커넥션 획득 대기가 db connection-timeout에 의해 제한됨) |
| Pending Connections | 최대 **90개 이상** 대기 중 |
| Error Count | VU 25명 이상부터 **에러** 발생 (최대 2K) |

5개의 커넥션이 모두 active 상태이고, 대기 큐가 계속 쌓이고 있는 상황이다.  
현재 환경 기준으로 단계별 테스트를 진행해보자.  

### 테스트 결과

| Pool Size | 그라파나 | 초당 처리량 | 평균 응답 시간 | 응답 시간 (99% 기준) | 커넥션 대기 요청 수 | 에러 수 | MySQL 초당 쿼리 |
|:-----------|:--------:|:------------:|:---------------:|:---------------------:|:-------------------:|:--------:|:----------------:|
| **10개** (기본값, 현재 대비 2배) | <a href="/stress/pool-size-10.png" target="_blank">보기</a> | 16 req/s | 2.3s | 3.22s | 90 | 1K | 211 |
| **20개** | <a href="/stress/pool-size-20.png" target="_blank">보기</a> | 32 req/s | 1.4s | 3.17s | 80 | 560 | 418 |
| **30개** | <a href="/stress/pool-size-30.png" target="_blank">보기</a> | 48 req/s | 1.0s | 3.15s | 70 | 228 | 623 |
| **50개** (Tomcat 스레드의 50%) | <a href="/stress/pool-size-50.png" target="_blank">보기</a> | 80 req/s | 0.5s | 2.40s | 50 | 62 | 1.04K |
| **70개** | <a href="/stress/pool-size-70.png" target="_blank">보기</a> | 112 req/s | 0.45s | 1.07s | 30 | **0** | 1.45K |
| **100개** (Tomcat 스레드와 동일) | <a href="/stress/pool-size-100.png" target="_blank">보기</a> | 159 req/s | 0.36s | 0.62s | **0** | **0** | 2.06K |
  
```diff
+ 선형적 처리량 증가 (이 테스트에서는 Pool Size가 병목의 유일한 원인이었기 때문에 선형 증가가 나타난 것 같음)
Pool 10 → 20 → 30 → 50 → 70 → 100
TPS  16 → 32 → 48 → 80 → 112 → 159 (거의 비례 증가)

+ 응답 시간 급격한 개선
Pool 10: p99 = 3.22초
Pool 50: p99 = 2.40초
Pool 70: p99 = 1.07초
Pool 100: p99 = 0.62초

+ Pool 70부터 에러 0 달성
Pool 100에서 Pending 0

+ MySQL 부하 비례 증가
Pool 10: Connected 10, QPS 211
Pool 100: Connected 100, QPS 2.06K (10배 증가)
```

## Pool Size를 최대로 잡는 게 최선일까?

병목 상황을 만들기 위해 조회 API에서 300ms 지연된다고 가정했는데, 이 상황에서는 에러율이 0인 70개가 적절할 수 있다.  
만약 실제 운영 환경이라면 어떤 의사결정을 해야할까?
  
1. DB Connection 반환 지연을 줄일 수 있나?
2. 목표로하는 TPS가 몇인가?
3. 에러를 일부 허용할 수 있는 상황인가?
4. DB 서버 리소스 부담은 괜찮은가?
   - `(서버 수 × pool size) < db max_connections` 충분한가?
   - pool size만큼 한 번에 connection을 맺기에 커넥션 생성 시간은 괜찮은가?

> 300ms에서 100ms로 개선에 성공했다고 가정하고, 목표 TPS는 150이라고 가정한 상황에서 최적의 pool size를 찾아보자

### 목표 TPS 150으로 다시 테스트

TODO

### HikariCP 기본값

| 설정 | 기본값 | 설명 |
|------|--------|------|
| `maximum-pool-size` | 10 | 최대 커넥션 수 |
| `minimum-idle` | 10 | 최소 유휴 커넥션 (= maximum-pool-size) |
| `connection-timeout` | 30,000ms | 커넥션 획득 대기 시간 |
| `idle-timeout` | 600,000ms | 유휴 커넥션 제거 시간 (10분) |
| `max-lifetime` | 1,800,000ms | 커넥션 최대 수명 (30분) |


모니터링 필수 지표
- `connections_active`
- `connections_pending`
- `connections_acquire_seconds`
