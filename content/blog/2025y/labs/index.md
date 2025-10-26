---
title: MySQL 실험실
date: "2025-10-26"
update: "2025-10-26"
tags:
   - mysql
   - transaction
   - lock
---

# 넥스트 키 락이 레코드 락 또는 갭 락으로 강등

> 출처: [InnoDB 행 잠금의 2원 2규칙](https://devocean.sk.com/blog/techBoardDetail.do?ID=167948&boardType=techBlog)

```sql
-- 테스트 테이블 및 데이터 준비
CREATE TABLE t (
  id int NOT NULL,
  a int NULL,
  b int NULL,
  PRIMARY KEY (id),
  KEY ix_a (a)
) ENGINE=InnoDB;

INSERT INTO t (id, a, b) VALUES
  (0, 0, 0), (5, 5, 5), (10, 10, 10),
  (15, 15, 15), (20, 20, 20), (25, 25, 25);
```

<details>
<summary>잠금 상태 조회하기</summary>

```sql
-- 잠금 상태 조회하기
SELECT 
    dl.object_name AS `table`,
    dl.lock_type,
    dl.index_name,
    dl.lock_mode,
    CASE 
        WHEN dl.lock_mode LIKE '%REC_NOT_GAP%' THEN 'Record Lock'
        WHEN dl.lock_mode LIKE '%GAP%' AND dl.lock_mode NOT LIKE '%REC_NOT_GAP%' THEN 'Gap Lock'
        WHEN dl.lock_mode NOT LIKE '%GAP%' AND dl.lock_mode NOT LIKE '%REC_NOT_GAP%' THEN 'Next-Key Lock'
        ELSE dl.lock_mode
    END AS lock_type_detail,
    dl.lock_data AS locked_data
FROM performance_schema.data_locks dl
ORDER BY dl.object_name, dl.lock_data;
```

</details>


- **원칙 1**: InnoDB의 기본 잠금 단위는 넥스트 키 락이며, 넥스트 키 락의 잠금 범위는 좌측으로는 개구간, 우측으로는 폐구간이다. `ex) (R1, R10]`
  - InnoDB 잠금의 시작은 넥스트 키 락이다. 이후에 갭 락과 레코드 락을 따져보는 것이다.
- **원칙 2**: 잠금은 쿼리를 수행하는 과정에서 접근한 객체에만 걸린다.
- **규칙 1**: 인덱스(고유, 비고유)를 사용하는 동등 조건의 쿼리를 수행할 때 레코드 스캔 방향은 오른쪽이며, 마지막 레코드가 동등 조건을 만족하지 않으면 넥스트 키 락은 갭 락으로 강등된다.
- **규칙 2**: 고유 인덱스를 사용하는 동등 조건의 쿼리를 수행할 때, 레코드가 동등 조건을 만족하면 넥스트 키 락은 레코드 락으로 강등된다.

## 갭 락으로 인한 INSERT 실패

```sql
-- <A 세션> 존재하지 않는 id = 7를 업데이트 
BEGIN;
UPDATE t SET b=b+1 WHERE id=7;

+-------+-----------+------------+-----------+------------------+-------------+
| table | lock_type | index_name | lock_mode | lock_type_detail | locked_data |
+-------+-----------+------------+-----------+------------------+-------------+
| t     | TABLE     | NULL       | IX        | Next-Key Lock    | NULL        |
| t     | RECORD    | PRIMARY    | X,GAP     | Gap Lock         | 10          |
+-------+-----------+------------+-----------+------------------+-------------+

-- <B 세션>
INSERT INTO t VALUES (8, 8, 8);     -- BLOCKED
INSERT INTO t VALUES (9, 9, 9);     -- BLCOKED

INSERT INTO t VALUES (4, 4, 4);     -- 성공
INSERT INTO t VALUES (11, 11, 11);  -- 성공
UPDATE t SET b=b+1 WHERE id=5;      -- 성공
UPDATE t SET b=b+1 WHERE id=10;     -- 성공
```

먼저 넥스트 키 락에 의해 `(5, 10]`으로 잠금되고, 마지막 레코드 10이 id=7 조건에 만족하지 않기 때문에 넥스트 키 락은 갭 락으로 강등되어 `(5, 10)`의 잠금이 발생한다.  
그리하여 마지막 업데이트 쿼리는 둘 다 성공한다.  