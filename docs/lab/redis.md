---
layout: default
title: Redis를 사용해보자 🚩
nav_order: 3
parent: 👨‍🔬 Lab
---

{: .no_toc }

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

- `redis`
  - [[우아한테크세미나] 191121 우아한레디스 by 강대명님](https://www.youtube.com/watch?v=mPB2CZiAkKM)
  - [[NHN FORWARD 2021] Redis 야무지게 사용하기](https://www.youtube.com/watch?v=92NizoBL4uA&ab_channel=NHNCloud)
  - [Redis 기본 정리](https://brunch.co.kr/@jehovah/20)
  - [Redis & Spring Session 연동 + Spring Session Redis](https://velog.io/@jungh00ns/Spring-Boot-Redis-Spring-Session-%EC%97%B0%EB%8F%99-Redis-%EB%A3%AC%EB%AC%B8%EC%9E%90-%ED%95%B4%EC%84%9D)

- `memcached`
  - [공식 사이트 - Simple Spring XMemcached](https://www.memcachier.com/documentation/spring-boot)
  - [공식 문서 - Simple Spring Memcached](https://github.com/ragnor/simple-spring-memcached)
  - [Spring Boot SSM Sample](https://github.com/memcachier/examples-spring-boot)
  - [SSM 상세 설명](https://jang8584.tistory.com/266)
  - [티몬의 개발이야기 - Simple Spring Memcached(SSM)로 쾌적한 서비스 제공하기](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=tmondev&logNo=220725135383)
  - [SSM Wiki](https://github.com/ragnor/simple-spring-memcached/wiki/Getting-Started)
- `EHCache`
  - [jojoldu - SpringBoot + Ehcache 기본 예제 및 소개](https://jojoldu.tistory.com/57)
  - [Cache에 대하여.. (Spring+EHCache)](https://jaehun2841.github.io/2018/11/07/2018-10-03-spring-ehcache/#%EB%93%A4%EC%96%B4%EA%B0%80%EB%A9%B0)

- [AWS - 캐싱이란 무엇입니까?](https://aws.amazon.com/ko/caching/)
- [EHCache vs Memcached vs Redis](https://db-engines.com/en/system/Ehcache%3BMemcached%3BRedis)

# 캐시란? 
- 반복적으로 데이터를 불러올 때 지속적으로 DBMS 혹은 서버에 요청하는 것이 아닌 **메모리에 데이터를 저장하였다가 데이터를 불러다가 쓰는 것을 의미**한다 
- 따라서 서버나 DBMS에 부담을 덜어주고, 엄청 빠르기 때문에 많은 시스템에서 사용하고 있다
- 대표적으로 `Browser Cache`, `Apacha Cache`, `DNS Cache`등 여러가지 형태로 캐시가 사용되고 있다



