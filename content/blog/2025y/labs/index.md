---
title: MySQL Lock 실험실
date: "2025-10-26"
update: "2025-11-05"
tags:
   - mysql
   - lock
---

> [InnoDB 행 잠금의 2원 2규칙](https://devocean.sk.com/blog/techBoardDetail.do?ID=167948&boardType=techBlog)
> - **원칙 1**: InnoDB의 기본 잠금 단위는 넥스트 키 락이며, 넥스트 키 락의 잠금 범위는 좌측으로는 개구간, 우측으로는 폐구간이다. `ex) (R1, R10]`
>    - InnoDB 잠금의 시작은 넥스트 키 락이다. 이후에 갭 락과 레코드 락을 따져보는 것이다.
> - **원칙 2**: 잠금은 쿼리를 수행하는 과정에서 접근한 객체에만 걸린다.
> - **규칙 1**: 인덱스(고유, 비고유)를 사용하는 동등 조건의 쿼리를 수행할 때 레코드 스캔 방향은 오른쪽이며, 마지막 레코드가 동등 조건을 만족하지 않으면 넥스트 키 락은 갭 락으로 강등된다.
> - **규칙 2**: 고유 인덱스를 사용하는 동등 조건의 쿼리를 수행할 때, 레코드가 동등 조건을 만족하면 넥스트 키 락은 레코드 락으로 강등된다.

<details>
<summary>🔐 잠금 상태 조회 쿼리</summary>

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

## 갭 락으로 인한 INSERT 실패

```sql
CREATE TABLE t (
  id int NOT NULL,
  a int NULL,
  b int NULL,
  PRIMARY KEY (id),
  KEY ix_a (a)
) ENGINE=InnoDB;

+----+------+------+
| id | a    | b    |
+----+------+------+
|  0 |    0 |    0 |
|  5 |    5 |    5 |
| 10 |   10 |   10 |
| 15 |   15 |   15 |
| 20 |   20 |   20 |
| 25 |   25 |   25 |
+----+------+------+

-- <A 세션> 존재하지 않는 id = 7를 업데이트 
BEGIN;
UPDATE t SET b=b+1 WHERE id=7;

+-----------+------------+-----------+------------------+-------------+
| lock_type | index_name | lock_mode | lock_type_detail | locked_data |
+-----------+------------+-----------+------------------+-------------+
| TABLE     | NULL       | IX        | Next-Key Lock    | NULL        |
| RECORD    | PRIMARY    | X,GAP     | Gap Lock         | 10          |
+-----------+------------+-----------+------------------+-------------+

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

## non-unique 세컨더리 인덱스 동등 잠금 (FOR SHARE)

```sql
CREATE TABLE t (
  id int NOT NULL,
  a int NULL,
  b int NULL,
  PRIMARY KEY (id),
  KEY ix_a (a)
) ENGINE=InnoDB;

+----+------+------+
| id | a    | b    |
+----+------+------+
|  0 |    0 |    0 |
|  5 |    5 |    5 |
| 10 |   10 |   10 |
| 15 |   15 |   15 |
| 20 |   20 |   20 |
| 25 |   25 |   25 |
+----+------+------+

-- <A 세션>
BEGIN;
select id from t where a = 5 for share;

+-----------+------------+-----------+------------------+-------------+
| lock_type | index_name | lock_mode | lock_type_detail | locked_data |
+-----------+------------+-----------+------------------+-------------+
| TABLE     | NULL       | IS        | Next-Key Lock    | NULL        |
| RECORD    | ix_a       | S,GAP     | Gap Lock         | 10, 10      | <- (5, 10)
| RECORD    | ix_a       | S         | Next-Key Lock    | 5, 5        | <- (0, 5]
+-----------+------------+-----------+------------------+-------------+

-- <B 세션>
INSERT INTO t VALUES (-1, -1, -1);  -- 성공
INSERT INTO t VALUES (0,0,0);   -- BLOCKED
INSERT INTO t VALUES (3,3,3);   -- BLOCKED
INSERT INTO t VALUES (7,7,7);   -- BLOCKED

UPDATE t SET b=b+1 WHERE id=5;  -- 성공
UPDATE t SET b=b+1 WHERE id=10; -- 성공

+----+------+------+
| id | a    | b    |
+----+------+------+
| -1 |   -1 |   -1 |
|  0 |    0 |    0 |
|  5 |    5 |    6 |
| 10 |   10 |   11 |
+----+------+------+

UPDATE t SET a=a+1 WHERE id=10; -- 성공
UPDATE t SET a=a+1 WHERE id=5;  -- BLOCKED

+----+------+------+
| id | a    | b    |
+----+------+------+
| -1 |   -1 |   -1 |
|  0 |    0 |    0 |
|  5 |    5 |    6 |
| 10 |   11 |   11 |
+----+------+------+
```

- **Q: 왜 5미만의 INSERT 쿼리는 실행하지 못할까?**  
  - 원칙 1에 따라 기본 잠금 단위는 넥스트 키 락이기 때문에 `(0,5]`에 넥스트 키 락이 설정된다.
- **Q: 왜 `id = (5 < N < 10)`의 INSERT 쿼리는 실행하지 못할까?**  
  - a 컬럼 인덱스는 유니크하지 않은 세컨더리 인덱스이기 때문에 `a = 5`에 해당하는 레코드만 찾아서 바로 종료하는 것이 아니라 오른쪽으로 계속 스캔하여 레코드 10을 찾을 때까지 이동하기에 `(5,10]`에 넥스트 키 락이 설정된다. **이 과정에서 접근한 모든 객체에 잠금을 걸게 되기 때문이다**
- **Q: 왜 `id=10`에 대한 a,b 컬럼 UPDATE는 성공할까?**  
  - 10은 `a = 5` 조건을 만족하지 않기 때문에 넥스트 키 락이 갭 락으로 강등되어 `(5,10)`으로 잠금 범위가 변경되기 때문이다.
- **Q: FOR SHARE로 `a = 5`에 대한 명시적 공유 잠금을 걸었는데 b 컬럼에 대한 업데이트는 왜 실행될까?**
  - A 세션의 FOR SHARE 쿼리는 커버링 인덱스를 활용하고 있고 조회 가능 잠금이기 때문에 프라이머리 키 인덱스에 어떠한 잠금도 설정되지 않는다.
  - 잠금에 대한 정보를 통해 `ix_a 인덱스의 (5,10) 구간에 걸린 Gap Lock`으로 인해 a 컬럼은 UPDATE가 실행되지 않았고, b 컬럼에 대한 UPDATE는 실행 가능한 것이다.
  - 만약 `a = 5`에 대한 조회 가능 잠금을 통해 레코드가 업데이트 되는 것을 원하지 않으면 FOR SHARE 쿼리를 수정하면 된다.
  
```sql
select * from t where a = 5 for share; -- 또는
select id, a, b from t where a = 5 for share;

+-----------+------------+---------------+------------------+-------------+
| lock_type | index_name | lock_mode     | lock_type_detail | locked_data |
+-----------+------------+---------------+------------------+-------------+
| TABLE     | NULL       | IS            | Next-Key Lock    | NULL        |
| RECORD    | ix_a       | S,GAP         | Gap Lock         | 10, 10      |
| RECORD    | PRIMARY    | S,REC_NOT_GAP | Record Lock      | 5           | -> 레코드 락을 확인할 수 있다!
| RECORD    | ix_a       | S             | Next-Key Lock    | 5, 5        |
+-----------+------------+---------------+------------------+-------------+
```


## non-unique 세컨더리 인덱스 동등 장금 (FOR UPDATE)

```sql
CREATE TABLE t (
  id int NOT NULL,
  a int NULL,
  b int NULL,
  PRIMARY KEY (id),
  KEY ix_a (a)
) ENGINE=InnoDB;

+----+------+------+
| id | a    | b    |
+----+------+------+
|  0 |    0 |    0 |
|  5 |    5 |    5 |
| 10 |   10 |   10 |
| 15 |   15 |   15 |
| 20 |   20 |   20 |
| 25 |   25 |   25 |
+----+------+------+

-- <A 세션>
BEGIN;
select id from t where a = 5 for update;

+-----------+------------+---------------+------------------+-------------+
| lock_type | index_name | lock_mode     | lock_type_detail | locked_data |
+-----------+------------+---------------+------------------+-------------+
| TABLE     | NULL       | IX            | Next-Key Lock    | NULL        |
| RECORD    | ix_a       | X,GAP         | Gap Lock         | 10, 10      |
| RECORD    | PRIMARY    | X,REC_NOT_GAP | Record Lock      | 5           |
| RECORD    | ix_a       | X             | Next-Key Lock    | 5, 5        |
+-----------+------------+---------------+------------------+-------------+

-- <B 세션>

INSERT INTO t VALUES (7,7,7);   -- BLOCKED
UPDATE t SET b=b+1 WHERE id=5;  -- BLOCKED
UPDATE t SET b=b+1 WHERE id=10; -- 성공

UPDATE t SET a=a+1 WHERE id=5;   -- BLOCKED
UPDATE t SET a=a+1 WHERE id=10;  -- 성공
```

## 프라이머리 키 인덱스 범위 잠금

조회 결과는 같지만 잠금 범위가 서로 다른 케이스를 확인해보자.  

```sql
CREATE TABLE t (
  id int NOT NULL,
  a int NULL,
  b int NULL,
  PRIMARY KEY (id),
  KEY ix_a (a)
) ENGINE=InnoDB;

+----+------+------+
| id | a    | b    |
+----+------+------+
|  0 |    0 |    0 |
|  5 |    5 |    5 |
| 10 |   10 |   10 |
| 15 |   15 |   15 |
+----+------+------+

-- <A 세션>
BEGIN;
SELECT * FROM t WHERE id=10 FOR UPDATE;

+-----------+------------+---------------+------------------+-------------+
| lock_type | index_name | lock_mode     | lock_type_detail | locked_data |
+-----------+------------+---------------+------------------+-------------+
| TABLE     | NULL       | IX            | Next-Key Lock    | NULL        |
| RECORD    | PRIMARY    | X,REC_NOT_GAP | Record Lock      | 10          |
+-----------+------------+---------------+------------------+-------------+

-- <B 세션>
UPDATE t SET b=b+1 WHERE id=5;  -- 성공
INSERT INTO t VALUES (7,7,7);   -- 성공
INSERT INTO t VALUES (11,11,11);    -- 성공
```

처음엔 `(5, 10]` 넥스트 키 락이 설정되고, id는 프라이머리 키 인덱스이고 `id = 10` 조건에 해당하는 레코드가 존재하므로 레코드 락으로 강등된다.  

```sql
-- <A 세션>
BEGIN;
SELECT * FROM t WHERE id >= 10 AND id < 11 FOR UPDATE;

+-----------+------------+---------------+------------------+-------------+
| lock_type | index_name | lock_mode     | lock_type_detail | locked_data |
+-----------+------------+---------------+------------------+-------------+
| TABLE     | NULL       | IX            | Next-Key Lock    | NULL        |
| RECORD    | PRIMARY    | X,REC_NOT_GAP | Record Lock      | 10          |
| RECORD    | PRIMARY    | X,GAP         | Gap Lock         | 15          |
+-----------+------------+---------------+------------------+-------------+

-- <B 세션>
INSERT INTO t VALUES (8, 8, 8);     -- 성공
INSERT INTO t VALUES (9, 9, 9);     -- 성공
INSERT INTO t VALUES (11, 11, 11);  -- BLOCKED

UPDATE t SET b=b+1 WHERE id = 15;   -- 성공
UPDATE t SET a=a+1 WHERE id = 15;   -- 성공
UPDATE t SET a=a+1 WHERE id = 10;   -- BLOCKED
```

`id >= 10 AND id < 11` 조건에 해당하는 레코드를 찾게 되는데, 먼저 `id >= 10`에 대한 `(5, 10]` 넥스트 키 락이 설정된다. 하지만 `id = 10`인 레코드가 존재하므로 레코드 락으로 강등된다.  
  
`id < 11` 같은 범위 검색은 조건을 만족하는지 안하는지 다음 첫 번째 레코드까지 접근해야만 알 수 있기 때문에 오른쪽으로 범위 검색을 계속해서 수행하며 `id=15` 레코드를 찾게된다.  
이미 `id=10`레코드를 찾았으므로 `(10, 15)`에 갭락이 설정된다.  
  
즉, 최종 잠금 범위는 `10, (10, 15)`가 된다.  

## non-unique 세컨더리 인덱스 범위 잠금

```sql
CREATE TABLE t (
  id int NOT NULL,
  a int NULL,
  b int NULL,
  PRIMARY KEY (id),
  KEY ix_a (a)
) ENGINE=InnoDB;

+----+------+------+
| id | a    | b    |
+----+------+------+
|  0 |    0 |    0 |
|  5 |    5 |    5 |
| 10 |   10 |   10 |
| 15 |   15 |   15 |
+----+------+------+

-- <A 세션>
BEGIN;
SELECT * FROM t WHERE a >= 10 AND a < 11 FOR UPDATE;

+-----------+------------+---------------+------------------+-------------+
| lock_type | index_name | lock_mode     | lock_type_detail | locked_data |
+-----------+------------+---------------+------------------+-------------+
| TABLE     | NULL       | IX            | Next-Key Lock    | NULL        |
| RECORD    | PRIMARY    | X,REC_NOT_GAP | Record Lock      | 10          |
| RECORD    | ix_a       | X             | Next-Key Lock    | 10, 10      |
| RECORD    | ix_a       | X             | Next-Key Lock    | 15, 15      |
+-----------+------------+---------------+------------------+-------------+

-- <B 세션>
INSERT INTO t VALUES (6, 6, 6);     -- BLOCKED
INSERT INTO t VALUES (8, 8, 8);     -- BLOCKED
INSERT INTO t VALUES (4, 4, 4);     -- 성공

UPDATE t SET b=b+1 WHERE a = 15;    -- BLOCKED
UPDATE t SET b=b+1 WHERE a = 10;    -- BLOCKED
UPDATE t SET b=b+1 WHERE a = 5;     -- 성공
UPDATE t SET b=b+1 WHERE a = 4;     -- 성공
```

먼저 `a=10`인 레코드를 찾아 `(5, 10]` 넥스트 키 락이 설정된다. `ix_a` 인덱스는 유니크 인덱스가 아니기 때문에 레코드 락으로 끝나지 않는다. (규칙 2를 적용할 수 없다.)  
그렇기에 동등 조건을 만족하지 않는 다음 레코드까지 범위 검색을 수행하며, `a=15`에 해당하는 레코드를 찾아 검색이 중단되고 `(10, 15]`에 넥스트 키 락이 설정된다.  
동등 조건이 아닌 범위 검색에 해당하기 때문에 갭 락으로 강등되지 않는다.  
  
즉, 최종 잠금 범위는 `(5, 10], (10, 15]`이다.

## unique 세컨더리 인덱스 업데이트 잠금

```sql
CREATE TABLE t2 (
  id int NOT NULL,
  a int NULL,
  b int NULL,
  PRIMARY KEY (id),
  UNIQUE ix_a (a)
) ENGINE=InnoDB;

+----+------+------+
| id | a    | b    |
+----+------+------+
|  0 |    0 |    0 |
|  5 |    5 |    5 |
| 10 |   10 |   10 |
| 15 |   15 |   15 |
| 20 |   20 |   20 |
| 25 |   25 |   25 |
+----+------+------+

-- <A 세션>
BEGIN;
UPDATE t2 set b = b + 1 where a = 10;

+-----------+------------+---------------+------------------+-------------+
| lock_type | index_name | lock_mode     | lock_type_detail | locked_data |
+-----------+------------+---------------+------------------+-------------+
| TABLE     | NULL       | IX            | Next-Key Lock    | NULL        |
| RECORD    | PRIMARY    | X,REC_NOT_GAP | Record Lock      | 10          |
| RECORD    | ix_a       | X,REC_NOT_GAP | Record Lock      | 10, 10      |
+-----------+------------+---------------+------------------+-------------+

-- <B 세션>

insert into t2 values (9, 9, 9);    -- 성공
insert into t2 values (11, 11, 11); -- 성공
update t2 set b = 15 where a = 10;  -- BLOCKED
```

`a` 컬럼의 인덱스는 유니크함을 보장하기 때문에 `a = 10`을 찾게되면 넥스트 키 락은 레코드 락으로 강등되기 때문에 왼쪽과 오른쪽에 대한 갭락 또는 넥스트 키 락이 발생하지 않는다.


## non-unique 세컨더리 인덱스 중복된 행 잠금

```sql
CREATE TABLE t (
  id int NOT NULL,
  a int NULL,
  b int NULL,
  PRIMARY KEY (id),
  KEY ix_a (a)
) ENGINE=InnoDB;

+----+------+------+
| id | a    | b    |
+----+------+------+
|  0 |    0 |    0 |
|  5 |    5 |    5 |
| 10 |   10 |   10 |
| 15 |   15 |   15 |
| 20 |   20 |   20 |
| 25 |   25 |   25 |
| 30 |   10 |   30 |
+----+------+------+

-- <A 세션>
BEGIN;
SELECT * FROM t WHERE a=10 FOR UPDATE;

+-----------+------------+---------------+------------------+-------------+
| lock_type | index_name | lock_mode     | lock_type_detail | locked_data |
+-----------+------------+---------------+------------------+-------------+
| TABLE     | NULL       | IX            | Next-Key Lock    | NULL        |
| RECORD    | PRIMARY    | X,REC_NOT_GAP | Record Lock      | 10          |
| RECORD    | PRIMARY    | X,REC_NOT_GAP | Record Lock      | 30          |
| RECORD    | ix_a       | X             | Next-Key Lock    | 10, 10      |
| RECORD    | ix_a       | X             | Next-Key Lock    | 10, 30      |
| RECORD    | ix_a       | X,GAP         | Gap Lock         | 15, 15      |
+-----------+------------+---------------+------------------+-------------+

-- <B 세션>
INSERT INTO t VALUES (4, 4, 4);      -- 성공
INSERT INTO t VALUES (6, 6, 6);      -- BLOCKED
INSERT INTO t VALUES (9, 9, 9);      -- BLOCKED
INSERT INTO t VALUES (12, 12, 12);   -- BLOCKED
INSERT INTO t VALUES (17, 17, 17);   -- 성공
INSERT INTO t VALUES (24, 24, 24);   -- 성공
INSERT INTO t VALUES (27, 27, 27);   -- 성공

UPDATE t SET b=b+1 WHERE a = 5;     -- 성공
UPDATE t SET b=b+1 WHERE a = 10;    -- BLOCKED
UPDATE t SET b=b+1 WHERE a = 15;    -- 성공
UPDATE t SET b=b+1 WHERE a = 20;    -- 성공
UPDATE t SET b=b+1 WHERE a = 25;    -- 성공

UPDATE t SET a=a+1 WHERE id = 0;
UPDATE t SET a=a+1 WHERE id = 5;     -- BLOCKED
UPDATE t SET a=a+1 WHERE id = 10;    -- BLOCKED
UPDATE t SET a=a+1 WHERE id = 15;
UPDATE t SET a=a+1 WHERE id = 20;
UPDATE t SET a=a+1 WHERE id = 25;
UPDATE t SET a=a+1 WHERE id = 30;    -- BLOCKED

UPDATE t SET b=b+1 WHERE id = 0;
UPDATE t SET b=b+1 WHERE id = 5;
UPDATE t SET b=b+1 WHERE id = 10;    -- BLOCKED
UPDATE t SET b=b+1 WHERE id = 15;
UPDATE t SET b=b+1 WHERE id = 20;
UPDATE t SET b=b+1 WHERE id = 25;
UPDATE t SET b=b+1 WHERE id = 30;    -- BLOCKED
```

먼저 `a=10` 조건에 해당하는 레코드를 찾아 `(5, 10]` 넥스트 키 락을 설정한다.  
정확히는 `(a=5, id=5)부터 (a=10, id=10)`까지 넥스트 키 락이 설정된다.  
  
그리고 넌유니크 세컨더리 인덱스이기 때문에 다음 레코드 `a=15`를 찾을 때 까지 오른쪽으로 검색을 수행하며, 이 과정에서 `a=10, id=30` 레코드를 거치기 때문에 `(a=10, id=10) ~ (a=10, id=30)`까지 넥스트 키 락이 설정된다.  
  
계속 오른쪽으로 검색하며 `a=15, id=15` 레코드를 만나면 검색 루프는 종료되고 `(a=10, id=30) ~ (a=15, id=15)` 까지 넥스트 키 락이 설정된다.  
하지만 검색 조건 `a=10` 조건에 해당되지 않으므로 최종적으로 갭 락으로 강등된다.  
  
즉 최종 잠금 범위는

```sql
-- ix_a, X (Next-Key Lock)
( (a=5, id=5), (a=10, id=10) ],

-- ix_a, X (Next-Key Lock)
( (a=10, id=10), (a=10, id=30) ], 

-- ix_a, X,GAP (Gap Lock)
( (a=10, id=30), (a=15, id=15) )
```

## non-unique 세컨더리 인덱스 중복된 행 잠금 (추가 케이스)

```sql
CREATE TABLE employees (
    id int NOT NULL AUTO_INCREMENT,
    first_name varchar(255) DEFAULT NULL,
    last_name varchar(255) DEFAULT NULL,
    PRIMARY KEY (id),
    KEY idx_first_name (first_name)
) ENGINE=InnoDB

+----+------------+-----------+
| id | first_name | last_name |
+----+------------+-----------+
| 34 | E          | E1        |
| 35 | E          | E2        |
| 36 | E          | E3        |
| 37 | B          | B1        |
| 38 | B          | B2        |
+----+------------+-----------+
```

```sql
-- <A 세션>
BEGIN;
update employees SET last_name = 'Updated E' where first_name = 'E' and last_name = 'E2';

+-----------+----------------+---------------+------------------+------------------------+
| lock_type | index_name     | lock_mode     | lock_type_detail | locked_data            |
+-----------+----------------+---------------+------------------+------------------------+
| TABLE     | NULL           | IX            | Next-Key Lock    | NULL                   |
| RECORD    | idx_first_name | X             | Next-Key Lock    | 'E', 34                |
| RECORD    | idx_first_name | X             | Next-Key Lock    | 'E', 35                |
| RECORD    | idx_first_name | X             | Next-Key Lock    | 'E', 36                |
| RECORD    | PRIMARY        | X,REC_NOT_GAP | Record Lock      | 34                     |
| RECORD    | PRIMARY        | X,REC_NOT_GAP | Record Lock      | 35                     |
| RECORD    | PRIMARY        | X,REC_NOT_GAP | Record Lock      | 36                     |
| RECORD    | idx_first_name | X             | Next-Key Lock    | supremum pseudo-record |
+-----------+----------------+---------------+------------------+------------------------+

-- <B 세션>
insert into employees (first_name, last_name) values ('A', 'A1');    -- 성공
insert into employees (first_name, last_name) values ('B', 'B1');    -- BLOCKED
insert into employees (first_name, last_name) values ('C', 'C1');    -- BLOCKED
insert into employees (first_name, last_name) values ('D', 'D1');    -- BLOCKED
insert into employees (first_name, last_name) values ('F', 'F1');    -- BLOCKED
insert into employees (first_name, last_name) values ('Z', 'Z1');    -- BLOCKED

update employees set last_name = 'updated B1' where id = 37;   -- 성공
update employees set last_name = 'updated B2' where id = 38;   -- 성공
update employees set last_name = 'updated B2' where first_name = 'B';    -- 성공
update employees set first_name = 'C' where id = 37;   -- BLOCKED
update employees set first_name = 'A' where id = 37;   -- 성공
```

먼저 `first_name = 'E'`를 찾기 위해 오른쪽으로 검색하지만 `E`보다 큰 데이터는 없기에 supremum 락이 걸린다.

```
('B', 37)
('B', 38) ← 마지막 B 레코드
    ↓
  [갭1] ← ('B', 38) ~ ('E', 34)
    ↓
('E', 34) ← Next-Key Lock = 레코드 + 갭1
('E', 35) ← Next-Key Lock = 레코드 + 갭2
('E', 36) ← Next-Key Lock = 레코드 + 갭3
    ↓
  [갭4] ← ('E', 36) ~ supremum
    ↓
supremum  ← Next-Key Lock = supremum + 갭4
```

**실제 락 범위**  
1. `('E', 34)` **Next-Key Lock**
   - 레코드: `('E', 34)`
   - 갭: `(('B', 38) ~ ('E', 34))`
2. `('E', 35)` **Next-Key Lock**
   - 레코드: `('E', 35)`
   - 갭: `(('E', 34) ~ ('E', 35))`
3. `('E', 36)` **Next-Key Lock**
   - 레코드: `('E', 36)`
   - 갭: `(('E', 35) ~ ('E', 36))`
4. **supremum Next-Key Lock**
   - supremum 자체
   - 갭: `(('E', 36) ~ supremum)`

## non-unique 세컨더리 인덱스 LIMIT 잠금

```sql
CREATE TABLE t (
  id int NOT NULL,
  a int NULL,
  b int NULL,
  PRIMARY KEY (id),
  KEY ix_a (a)
) ENGINE=InnoDB;

+----+------+------+
| id | a    | b    |
+----+------+------+
|  0 |    0 |    0 |
|  5 |    5 |    5 |
| 10 |   10 |   10 |
| 15 |   15 |   15 |
| 20 |   20 |   20 |
| 25 |   25 |   25 |
| 30 |   10 |   30 |
| 35 |   10 |   35 |
+----+------+------+

-- <A 세션>
BEGIN;
select * from t where a = 10 limit 2 FOR UPDATE;

+-----------+------------+---------------+------------------+-------------+
| lock_type | index_name | lock_mode     | lock_type_detail | locked_data |
+-----------+------------+---------------+------------------+-------------+
| TABLE     | NULL       | IX            | Next-Key Lock    | NULL        |
| RECORD    | PRIMARY    | X,REC_NOT_GAP | Record Lock      | 10          |
| RECORD    | ix_a       | X             | Next-Key Lock    | 10, 10      |
| RECORD    | ix_a       | X             | Next-Key Lock    | 10, 30      |
| RECORD    | PRIMARY    | X,REC_NOT_GAP | Record Lock      | 30          |
+-----------+------------+---------------+------------------+-------------+

-- <B 세션>
insert into t values (9, 9, 9);       -- BLOCKED
insert into t values (13, 13, 13);    -- 성공
insert into t values (14, 9, 14);     -- BLOCKED
insert into t values (16, 16, 16);    -- 성공

UPDATE t SET b=b+1 WHERE id = 15;     -- 성공
```

![](./not_gray_gaplock.webp)

1. 처음으로 좌측 개구간 `(a=5, id=5)부터 (a=10, id=10)` 까지 넥스트 키 락이 설정된다.
2. 우측으로 탐색하며 `(a=10, id=30)` 레코드에 접근학데 되므로 `(a=10, id=10)부터 (a=10, id=30)`까지 넥스트 키 락이 설정된다.
3. LIMIT 2에 대한 조건을 만족했기 때문에 더 이상 검색을 진행하지 않고 종료한다.

## 넥스트 키 락(갭 락 + 레코드 락)으로 인한 데드락 발생 케이스

```sql
CREATE TABLE t (
  id int NOT NULL,
  a int NULL,
  b int NULL,
  PRIMARY KEY (id),
  KEY ix_a (a)
) ENGINE=InnoDB;

+----+------+------+
| id | a    | b    |
+----+------+------+
|  0 |    0 |    0 |
|  5 |    5 |    5 |
| 10 |   10 |   10 |
| 15 |   15 |   15 |
| 20 |   20 |   20 |
| 25 |   25 |   25 |
+----+------+------+

-- <A 세션>
BEGIN;
select * from t where a = 10 for update;

+-----------+------------+---------------+------------------+-------------+
| lock_type | index_name | lock_mode     | lock_type_detail | locked_data |
+-----------+------------+---------------+------------------+-------------+
| TABLE     | NULL       | IX            | Next-Key Lock    | NULL        |
| RECORD    | PRIMARY    | X,REC_NOT_GAP | Record Lock      | 10          |
| RECORD    | ix_a       | X             | Next-Key Lock    | 10, 10      |
| RECORD    | ix_a       | X,GAP         | Gap Lock         | 15, 15      |
+-----------+------------+---------------+------------------+-------------+

-- <B 세션>
UPDATE t SET b=b+1 WHERE a=10;   -- BLOCKED

-- <A 세션>
insert into t values (8,8,8);    -- 데드락을 감지하여 B 세션의 트랜잭션을 재시작해버리면서 성공한다.

-- <B 세션>
ERROR 1213 (40001): Deadlock found when trying to get lock; try restarting transaction
```

1. A 세션이 `a=10 FOR UPDATE`를 실행하면, 인덱스 ix_a 기준 `(5,10], (10,15)`에 넥스트 키 락(갭 락+레코드 락)이 설정된다.
2. B 세션이 `UPDATE t SET b=b+1 WHERE a=10;`을 실행하면, 이미 A 세션이 소유한 레코드 락 때문에 세션 2는 대기한다.
3. 이후 A 세션이 커밋/롤백 없이 `INSERT INTO t VALUES (8,8,8);`을 실행하면, 해당 값은 ix_a 인덱스의 `(5,10) 갭`에 삽입되어야 하므로, B 세션이 이미 `(5,10) 구간의 갭 락`을 소유하고 있을 경우 세션 1의 INSERT도 대기(블로킹)하게 된다.

결과적으로, A 세션은 B 세션의 갭 락을 기다리고, B 세션은 A 세션의 레코드 락을 기다리는 데드락이 성립하여 MySQL이 둘 중 하나의 트랜잭션을 강제 롤백시키면서 B 세션에 에러가 발생한다.  
  
> 💡 **핵심**  
> InnoDB는 팬텀 리드 등 트랜잭션 고립성을 위해 넥스트 키 락(갭 락+레코드 락) 구조를 채택  
> 갭 락과 레코드 락이 분리되어 동작하기 때문에, 세션 간 대기가 서로 꼬이면 데드락이 자주 발생함  
> 데드락 발생 시 애플리케이션에서 트랜잭션 재시도 처리를 해주는 것이 필요함  

# 넥스트 키 락은 왜 양 쪽으로 락을 걸까?

**MVCC(멀티 버전 동시성 제어)만으로 팬텀 리드를 완벽히 방지할 수 있는 게 아니기 때문에, InnoDB는 넥스트 키 락(Next-Key Lock)을 추가로 도입했다.**  
  
MVCC(멀티 버전 동시성 제어)만으로는 **'조회' 팬텀 리드 방지** 만 가능하다.  
내 트랜잭션이 시작됐을 때의 스냅샷을 쿼리할 수 있기 때문에, 트랜잭션 도중 누가 새로 데이터를 넣든 "내가 바라보는 데이터셋"에는 영향이 없어서 "조회 팬텀 리드"는 막을 수 있다.  
  
하지만, **UPDATE/DELETE/SELECT ... FOR UPDATE 등 '쓰기/락 기반' 쿼리에서는 MVCC만으로는 한계가 있다**  
내가 트랜잭션 중 특정 조건으로 UPDATE를 수행하면 동시에 다른 트랜잭션에서 그 조건에 부합하는 새 데이터를 INSERT할 수 있다.  
이 경우 '조작(UPDATE/DELETE)'의 대상이 되는 레코드 집합이 트랜잭션 중에 변동 되기 때문에 **쓰기 팬텀 리드**가 발생할 수 있다.  
**단순 스냅샷(읽기 일관성)만으로는 "조작 대상의 집합"을 동적으로 제약할 수 없다.**  
  
```sql
CREATE TABLE employees (
    id int NOT NULL,
    first_name varchar(255) DEFAULT NULL,
    last_name varchar(255) DEFAULT NULL,
    PRIMARY KEY (id),
    KEY idx_first_name (first_name)
) ENGINE=InnoDB;

+----+------------+-----------+
| id | first_name | last_name |
+----+------------+-----------+
|  1 | John       | Doe1      |
|  2 | John       | Doe2      |
|  3 | John       | Doe3      |
|  4 | John       | Doe4      |
|  5 | Jane       | Ann1      |
|  6 | Jane       | Ann2      |
|  7 | Jane       | Ann3      |
|  8 | Jack       | Tim1      |
|  9 | Jack       | Tim2      |
| 10 | Jack       | Tim3      |
+----+------------+-----------+

-- <트랜잭션 A>
set transaction_isolation = 'READ-COMMITTED';

select * from employees where id >= 8 for update;
-- 3 rows in set (0.01 sec)

+-------------+------------+-----------+---------------+-------------+-----------+
| OBJECT_NAME | INDEX_NAME | LOCK_TYPE | LOCK_MODE     | LOCK_STATUS | LOCK_DATA |
+-------------+------------+-----------+---------------+-------------+-----------+
| employees   | NULL       | TABLE     | IX            | GRANTED     | NULL      |
| employees   | PRIMARY    | RECORD    | X,REC_NOT_GAP | GRANTED     | 8         |
| employees   | PRIMARY    | RECORD    | X,REC_NOT_GAP | GRANTED     | 9         |
| employees   | PRIMARY    | RECORD    | X,REC_NOT_GAP | GRANTED     | 10        |
+-------------+------------+-----------+---------------+-------------+-----------+

-- <트랜잭션 B>
set transaction_isolation = 'READ-COMMITTED';

insert into employees(id, first_name, last_name) values (11, 'Test', 'Test1' );
commit;
-- Query OK, 1 row affected (0.03 sec)
-- </트랜잭션 B>

-- <트랜잭션 A>
select * from employees where id >= 8 for update;
-- 4 rows in set (0.00 sec)
```

넥스트 키 락으로 인해 **"현재 읽은 쿼리 결과에 포함되지 않았던 행이 이후 트랜잭션에서 추가"** 되는 현상을 차단하는 것이다.  
자세한 테스트 내용은 [팬텀 리드 문제](https://jdalma.github.io/2024y/transaction/#phantom-read-%EB%AC%B8%EC%A0%9C)에서 확인할 수 있다.  

즉, 넥스트 키 락은 **MVCC의 한계를 보완** 한다.
- 트랜잭션이 조회,조작한 인덱스의 "사이 공간"에도 락을 걸어 **추가적인 INSERT(팬텀 레코드 삽입)** 을 막는다.
- 실행한 트랜잭션 동안 UPDATE/DELETE/SELECT ... FOR UPDATE 조건에서 조작한 레코드뿐 아니라, 조건 사이 갭에도 갭락을 걸어 **"어떤 트랜잭션도 이 구간에 새 레코드 못 넣게"** 강제하는 것이다.

## 결론

**MVCC만으로는 "조회 일관성"만 보장되고, 같은 조건 대상으로 UPDATE/DELETE/SELECT ... FOR UPDATE 등에서는 '팬텀 리드' 발생 가능(쓰기 팬텀).**
**InnoDB 넥스트 키 락은 이러한 상황까지 커버해서 "조작 대상 집합이 트랜잭션 내에서 변하지 않도록" 보장**
- 즉, MVCC + Next-Key Lock이 합쳐져서 완전한 팬텀 리드 차단 메커니즘이 되는 것

자세한 내용은 [MySQL docs: innodb-locking](https://dev.mysql.com/doc/refman/8.4/en/innodb-locking.html#innodb-next-key-locks)을 참고하자!

# 테스트 필요!

> 범위 조건 이후 컬럼은 스캔 범위를 좁히는데 사용되지 않고, 필터 조건으로만 동작한다 

 -- 인덱스를 바꾼다면
  (contract_id, valid_to, valid_from)

  -- 쿼리
  WHERE contract_id = ?
    AND valid_to > ?      -- 범위 조건 (여기서 스캔 멈춤)
    AND valid_from <= ?   -- 필터링만

  결론: 둘 다 범위 조건이면 어느 쪽을 앞에 두든 하나만 인덱스 스캔에 활용됩니다. 순서를 바꿔도 본질적으로 같습니다.

  ---
  그래서 현재 인덱스가 적절한가?

  (contract_id, valid_from, valid_to)

  - contract_id = ? → 효율적 (등호 조건)
  - valid_from <= ? → 범위 스캔
  - valid_to > ? → 필터링 (인덱스에 포함되어 있어서 커버링 인덱스로 동작 가능)

  세 번째 컬럼(valid_to)이 인덱스에 포함되어 있으면, 테이블을 다시 읽지 않고 인덱스만으로 필터링할 수 있어서 여전히 이점이 있습니다.

  ---
  요약

  | 상황          | 설명                             |
  |-------------|--------------------------------|
  | 범위 조건 이후 컬럼 | 인덱스 스캔에는 사용 안 됨                |
  | 인덱스에 포함되면   | 필터링은 인덱스 내에서 가능 (커버링)          |
  | 현재 인덱스      | 적절함, contract_id로 좁히고 나머지는 필터링 |

  ---
  인덱스: (contract_id, valid_from, valid_to)

  정렬 순서:
  contract_id | valid_from | valid_to
  ------------|------------|----------
      A       | 2025-01-01 | 2025-06-01
      A       | 2025-01-01 | 2025-12-31
      A       | 2025-01-15 | 2025-03-01
      A       | 2025-02-01 | 9999-12-31
      B       | 2025-01-01 | 2025-06-01
      ...

  첫 번째 컬럼으로 정렬 → 같은 값 내에서 두 번째로 정렬 → 같은 값 내에서 세 번째로 정렬

  ---
  범위 조건의 문제

  WHERE contract_id = 'A'
    AND valid_from <= '2025-01-15'
    AND valid_to > '2025-01-15'

  1. contract_id = 'A' → A 블록으로 바로 이동 (등호)
  2. valid_from <= '2025-01-15' → A 내에서 범위 스캔 시작

  이 시점에서 valid_to가 연속되어 있지 않음:

  contract_id | valid_from | valid_to      | valid_to > '2025-01-15'?
  ------------|------------|---------------|------------------------
      A       | 2025-01-01 | 2025-06-01    | ✓
      A       | 2025-01-01 | 2025-12-31    | ✓
      A       | 2025-01-15 | 2025-03-01    | ✓

  valid_from이 같아도 valid_to는 다 다름 → 범위를 더 좁힐 수 없음

  ---
  그래서 정확히 말하면

  | 용어               | 설명                                 |
  |------------------|------------------------------------|
  | Index Range Scan | 범위 조건 이후 컬럼은 스캔 범위를 좁히는 데 사용 안 됨 ✓ |
  | Index Filter     | 인덱스 내에서 필터링은 가능 (ICP, 커버링 인덱스)     |

  스캔 범위: contract_id = 'A' AND valid_from <= '2025-01-15'
  필터링:   valid_to > '2025-01-15' (스캔한 결과에서 걸러냄)