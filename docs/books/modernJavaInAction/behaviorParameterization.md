---
layout: default
title: 3. 동작 파라미터화 코드 전달하기
parent: 모던 자바 인 액션
grand_parent: Books
nav_order: 3
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

# **동작 파라미터화**

```java
// 인터페이스
public interface ApplePredicate{
    boolean test (Apple apple);
}

public class AppleHeavyWeightPredicate implements ApplePredicate{
    public boolean test(Apple apple){
        return apple.getWeight() > 150;
    }
}

public class AppleGreenColorPredicate implements ApplePredicate{
    public boolean test(Apple apple){
        return GREEN.equals(apple.getColor());
    }
}

```

