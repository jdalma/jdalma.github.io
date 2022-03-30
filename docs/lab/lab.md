---
layout: default
title: 👨‍🔬 Lab
nav_order: 4
has_children: true
permalink: /docs/lab
---

## 다중 `DataSource`
- [Spring Docs - Transaction](https://docs.spring.io/spring-framework/docs/4.2.x/spring-framework-reference/html/transaction.html) 
- [Java 에서 DataBase Replication Master/Slave (write/read) 분기 처리하기](http://kwon37xi.egloos.com/m/5364167)
- [(Spring)다중 DataSource 처리](https://supawer0728.github.io/2018/03/22/spring-multi-transaction/)
- [Spring Transaction에 대한 노트](https://narusas.github.io/2019/07/17/Spring-Transaction-Note.html#transaction_script_example)
- [선언적 트랜잭션 @Transactional](https://bamdule.tistory.com/51)


```
java.lang.reflect.InvocationTargetException
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:498)
	at org.apache.commons.beanutils.PropertyUtilsBean.invokeMethod(PropertyUtilsBean.java:2116)
	at org.apache.commons.beanutils.PropertyUtilsBean.getSimpleProperty(PropertyUtilsBean.java:1267)
	at org.apache.commons.beanutils.PropertyUtilsBean.getNestedProperty(PropertyUtilsBean.java:808)
	at org.apache.commons.beanutils.PropertyUtilsBean.getProperty(PropertyUtilsBean.java:884)
	at org.apache.commons.beanutils.PropertyUtils.getProperty(PropertyUtils.java:464)
	at net.sf.json.JSONObject._fromBean(JSONObject.java:928)
```