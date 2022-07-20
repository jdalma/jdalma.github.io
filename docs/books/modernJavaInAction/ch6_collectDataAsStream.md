---
layout: default
title: CH 6. 스트림으로 데이터 수집
parent: 모던 자바 인 액션
grand_parent: 📖 Books
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
class Main {
	public static class Transaction {
	    private final Currency currency;
	    private final double value;

	    public Transaction(Currency currency, double value) {
	        this.currency = currency;
	        this.value = value;
	    }

	    public Currency getCurrency() {
	        return currency;
	    }

	    public double getValue() {
	        return value;
	    }

	    @Override
	    public String toString() {
	        return currency + " " + value;
	    }
	}

	public enum Currency {
	    EUR, USD, JPY, GBP, CHF
	}
	
    public static void main(String[] args) throws IOException {
    	List<Transaction> transactions = Arrays.asList(
    			new Transaction(Currency.EUR, 1500.0),
                new Transaction(Currency.USD, 2300.0),
                new Transaction(Currency.GBP, 9900.0),
                new Transaction(Currency.EUR, 1100.0),
                new Transaction(Currency.JPY, 7800.0),
                new Transaction(Currency.CHF, 6700.0),
                new Transaction(Currency.EUR, 5600.0),
                new Transaction(Currency.USD, 4500.0),
                new Transaction(Currency.CHF, 3400.0),
                new Transaction(Currency.GBP, 3200.0),
                new Transaction(Currency.USD, 4600.0),
                new Transaction(Currency.JPY, 5700.0),
                new Transaction(Currency.EUR, 6800.0));
    	
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
    	
        for(Currency key : transactionsByCurrencies.keySet()) {
        	System.out.println(key + " " + transactionsByCurrencies.get(key));
        }        
        
        System.out.println("--------------------------");

        Map<Currency , List<Transaction>> transactionsByCurrencies2 = 
                transactions.stream().collect(Collectors.groupingBy(Transaction::getCurrency));
        
        for(Currency key : transactionsByCurrencies2.keySet()) {
        	System.out.println(key + " " + transactionsByCurrencies2.get(key));
        }
    }
}
```

```
USD [USD 2300.0, USD 4500.0, USD 4600.0]
JPY [JPY 7800.0, JPY 5700.0]
EUR [EUR 1500.0, EUR 1100.0, EUR 5600.0, EUR 6800.0]
GBP [GBP 9900.0, GBP 3200.0]
CHF [CHF 6700.0, CHF 3400.0]
--------------------------
USD [USD 2300.0, USD 4500.0, USD 4600.0]
JPY [JPY 7800.0, JPY 5700.0]
GBP [GBP 9900.0, GBP 3200.0]
EUR [EUR 1500.0, EUR 1100.0, EUR 5600.0, EUR 6800.0]
CHF [CHF 6700.0, CHF 3400.0]
```


***

# **`컬렉터(Collector)`란 무엇인가?**
- 위 예제는 명령형 프로그래밍에 비해 함수형 프로그래밍이 얼마나 편리한지 명확하게 보여준다.
- 