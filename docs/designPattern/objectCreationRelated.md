---
layout: default
title: 객체 생성 관련 디자인 패턴
parent: 디자인 패턴
nav_order: 1
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

# **`Builder Pattern`**

## 패턴 소개
- **동일한 프로세스를 거쳐 다양한 구성의 인스턴스를 만드는 방법**
- (복잡한) 객체를 만드는 프로세스를 독립적으로 분리할 수 있다.

![](../../assets/images/books/designPattern/../../design-patterns/objectCreationRelated/builderDiagram.png)

- 인스턴스를 만드는 방법들을 단계별로 인터페이스에 정의를 한다.
- `Client`가 직접 `ConcreteBuilder`를 직접 사용하지 않고 `Director`클래스를 통하여 `Builder`를 사용하는 방법이 있다.

## 패턴 적용하기

## 장점과 단점