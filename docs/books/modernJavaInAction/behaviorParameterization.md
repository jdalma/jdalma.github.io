---
layout: default
title: 동작 파라미터화 코드 전달하기
parent: 모던 자바 인 액션
grand_parent: Books
nav_order: 2
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

# **동작 파라미터화**

- 농부의 요구사항
1. 무게가 150그램 이상인 사과
2. 녹색 사과

```java
public static List<Apple> filterApples(List<Apple> inventory , Color color , int weight , boolean flag){
    List<Apple> result = new ArrayList<>();
    for(Apple apple : inventory){
        if((flag && apple.getColor().equals(color)) ||
            (!flag && apple.getWeight() > weight)){
                result.add(apple);
            }
    }
    return result;
}
```

- **형편없는 코드다.**
- 대체 `true` 와 `false`는 뭘 의미하는걸까?
- 요구사항이 바뀌었을 때 유연하게 대응할 수도 없다.
  - 예를들어 , 사과의 크기 , 모양 , 출하지 등으로 사과를 필터링 하고 싶다면?

## 선택 조건을 결정하는 인터페이스

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


![](../../../assets/images/books/modernJavaInAction/behaviorParameterization/applePredicate.png)

> ✋ **전략 디자인 패턴**
> - 각 알고리즘 (전략이라 불리는)을 캡슐화하는 알고리즘 패밀리를 정의해둔 다음, 
> - 런타임에 알고리즘을 선택하는 기법이다.
> - `ApplePredicate`가 **알고리즘 패밀리**이고 ,
> - `AppleHeavyWeightPredicate` , `AppleGreenColorPredicate`가 **전략**이다.

- 이렇게 **동작 파라미터화** , 즉 메서드가 다양한 동작(전략)을 **받아서** 내부적으로 다양한 동작을 **수행**할 수 있다.
- 이제 `ApplePredicate`객체를 인수로 받도록 고칠 수 있다.

```java
public static List<Apple> filterApples(List<Apple> inventory , ApplePredicate p){
    List<Apple> result = new ArrayList<>();
    for(Apple apple : inventory){
        if(p.test(apple)){ // Predicate 객체로 사과 검사조건을 캡슐화 했다.
            result.add(apple);
        }
    }
    return result;
}
```

![](../../../assets/images/books/modernJavaInAction/behaviorParameterization/applePredicate2.png)

- **우리는 `filterApples` 메서드의 동작을 파라미터화한 것이다.**
- 이는 `코드를 전달`할 수 있는 것이나 다름없다.
