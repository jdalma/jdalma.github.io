---
layout: default
title: 👨‍🔬 Lab
nav_order: 4
has_children: true
permalink: /docs/lab
---


# `정리 해야할 것들`


## `ArrayDeque`
- `Queue<int[]> queue = new LinkedList<>();`를 애용하지만
- 리트코트에 제시된 방법에서는 `Queue<Pair<Integer, Integer>> queue = new ArrayDeque();`를 사용한다
- 또는 `Deque<Integer> stack = new ArrayDeque<>();`를 사용하던데...
- 사실 **PS**하면서 `Queue`를 사용한다는 자체가 중간 인덱스에 삽입하거나 수정하지 않는 상황이 많으니 `LinkedList`를 꼭 사용할 필요는 없을 것 같다
- **배열을 사용하면 시프트 연산이 추가될 것 같은데**... `ArrayDeque`를 확인해보자


## [자바 공부를 어떻게 하길래, "언체크드 예외 발생시 트랜잭션 롤백?"](https://www.youtube.com/watch?v=_WkMhytqoCc)
- 스프링 예외 테스트 해보자

## `Enumeration` , `Iterator` **Fail-Fast**

## 다중 `DataSource`
- [Spring Docs - Transaction](https://docs.spring.io/spring-framework/docs/4.2.x/spring-framework-reference/html/transaction.html) 
- [Java 에서 DataBase Replication Master/Slave (write/read) 분기 처리하기](http://kwon37xi.egloos.com/m/5364167)
- [(Spring)다중 DataSource 처리](https://supawer0728.github.io/2018/03/22/spring-multi-transaction/)
- [Spring Transaction에 대한 노트](https://narusas.github.io/2019/07/17/Spring-Transaction-Note.html#transaction_script_example)
- [선언적 트랜잭션 @Transactional](https://bamdule.tistory.com/51)