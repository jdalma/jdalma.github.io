---
layout: default
title: Synchronization Tools
parent: 운영체제
nav_order: 5
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

# **배경**

- **협력적 프로세스**란 시스템 내에서 실행 중인 다른 프로세스의 실행에 영향을 주거나 영향을 받는 프로세스이다.
- 협력적 프로세스는 **논리 주소 공간(코드 및 데이터)을 직접 공유하거나, 공유 메모리 또는 메시지 전달을 통해서만 데이터를 공유할 수 있다.**
- **데이터 일관성을 유지하기 위해 논리적 주소 공간을 공유하는 협력 프로세스의 질서있는 실행이 보장 되어야 한다.**

##  `Producer-Consumer Problem` 생산자-소비자 문제



- `Data inconsistency` 데이터 불일치
  - 병렬성을 띠게 되면 제대로 작동하지 않는다.
  - 