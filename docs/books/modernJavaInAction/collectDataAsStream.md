---
layout: default
title: CH 6. 스트림으로 데이터 수집
parent: 모던 자바 인 액션
grand_parent: Books
nav_order: 6
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

> - 중간연산은 스트림 파이프라인을 구성하며 , 스트림의 요소를 소비하지 않는다.
> - 반면 **최종 연산은 스트림의 요소를 소비해서 최종 결과를 도출한다.**
>   - 스트림 파이프라인을 최적화 하면서 계산 과정을 짧게 생략하기도 한다.
> - 📌 `컬렉션(Collection)` , `컬렉터(Collector)` , `collect`를 헷갈리지 않도록 주의하자.

- ✋ `통화별로 트랜잭션을 그룹화 하시오`

```java
    List<Transaction> transactions = Arrays.asList(...);

    Map<Currency , List<Transaction>> transactionsByCurrencies = new HashMap<>();
    for(Transaction transaction : transactions){
        Currency currency = transaction.getCurrency();
        List<Transaction> transactionsForCurrency = transactionsByCurrencies.get(currency);
        if(transactionsForCurrency == null){
            transactionsForCurrency = new ArrayList<>();
            transactionsByCurrencies.put(currency , transactionsForCurrency);
        }
        transactionsForCurrency.add(transaction);
    }
```

```java
    Map<Currency , List<Transaction>> transactionsByCurrencies = 
        transactions.stream().collect(groupingBy(Transaction::getCurrency));
```

***

# **`컬렉터(Collector)`란 무엇인가?**
- 위 예제는 명령형 프로그래밍에 비해 함수형 프로그래밍이 얼마나 편리한지 명확하게 보여준다.