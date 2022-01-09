---
layout: default
title: CH 5. 스트림 활용
parent: 모던 자바 인 액션
grand_parent: Books
nav_order: 5
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---


# **필터링**

## `Predicate` 필터링

```java

    List<Dish> vegeterianMenu = menu.stream()
                                    .filter(Dish::isVegeterian)
                                    .collect(toList());

```

## 고유 요소 필터링

- 스트림은 고유 요소로 이루어진 스트림을 반환하는 `distinct`메서드도 지원한다.
  - *고유 여부는 스트림에서 만든 객체의 `hashCode` , `equals`로 결정된다*

```java
    // 리스트의 모든 짝수를 선택하고 중복을 필터링한다.
    List<Integer> numbers = Arrays.asList(1 , 2 , 1 , 3 , 3 , 2 , 4);
    numbers.stream()
           .filter(i -> i % 2 == 0)
           .distinct()
           .forEach(System.out::println);

```

![](../../../assets/images/books/modernJavaInAction/usesStream/distinct.png)

# **스트림 슬라이싱**
- 스트림의 요소를 선택하거나 스킵하는 다양한 방법을 설명한다.

## `Predicate`를 이용한 슬라이싱
- 자바 9는 스트림의 요소를 효과적으로 선택할 수 있도록 `takeWhile` , `dropWhile` 두 가지 새로운 메서드를 지원한다.

### **`takeWhile` 활용**

```java

    List<Dish> specialMenu = Arrays.asList(
        new Dish("seasonal fruit" , true , 120 , Disy.Type.OTHER),
        new Dish("prawns" , false , 300 , Disy.Type.FISH),
        new Dish("rice" , true , 350 , Disy.Type.OTHER),
        new Dish("chicken" , false , 400 , Disy.Type.MEAT),
        new Dish("french fires" , true , 530 , Disy.Type.OTHER)
    );

```

- 320칼로리 이하의 요리를 선택하라고 하면 본능적으로 아래와 같이 `filter`를 생각할 것이다.


```java

    List<Dish> filteredMenu = specialMenu.stream()
                                         .filter(dish -> dish.getCalories() < 320)
                                         .collec(toList());

```

- `filter`연산을 이용하면 각 요소에 `Predicate`를 적용하게 된다.
- 하지만 위 `specialMenu` 리스트는 칼로리가 오름차순으로 정렬되어 있다.
    - 따라서 **320칼로리보다 크거나 같은 요리가 나왔을 때 반복 작업을 중단하면 된다.**
- **무한 스트림을 포함한 모든 스트림에 프레디케이트를 적용해 스트림을 슬라이스 할 수 있다.**


```java

    List<Dish> sliceMenu1 = specialMenu.stream()
                                       .takeWhile(dish -> dish.getCalories() < 320)
                                       .collect(toList());

```

### **`dropWhile`** 활용

- 나머지 요소를 선택하려면 어떻게 해야 할까?

```java

    List<Dish> slicedMenu2 = specialMenu.stream()
                                        .dropWhile(dish -> dish.getCalories() < 320)
                                        .collect(toList());

```

- `dropWhile`은 `takeWhile`과 정반대의 작업을 수행한다.
- **`dropWhile`은 `Predicate`가 처음으로 거짓이 되는 지점까지 발견된 요소를 버린다.**
  - `Predicate`가 거짓이되면 그 지점에서 작업을 중단하고 남은 요소를 모두 반환한다.
  - 무한한 남은 요소를 가진 무한 스트림에서도 동작한다.

## **스트림 축소**

- **스트림은 주어진 값 이하의 크기를 갖는 새로운 스트림을 반환하는 `limit(n)` 메서드를 지원한다.**

```java

    List<Dish> dishes = specialMenu.stream()
                                   .filter(dish -> dish.getCalories() > 300)
                                   .limit(3)
                                   .collect(toList());

```

- **처음 등장하는 두 고기 요리를 필터링 하시오**

```java

    List<Dish> dishes = menu.stream()
                            .filter(d -> d.getType == Dish.Type.MEAT)
                            .limit(2)
                            .collect(toList());

```

## **요소 건너뛰기**

- 스트림은 처음 `n`개 요소를 제외한 스트림을 반환하는 `skip(n)`메서드를 지원한다.
- `n`개 이하의 요소를 포함하는 스트림에 `skip(n)`을 호출하면 빈 스트림이 반환된다.
- `limit(n)`과 `skip(n)`은 상호 보완적인 연산을 수행한다.

```java

    List<Dish> dishes = menu.stream()
                            .filter(d -> d.getCalories() > 300)
                            .skip(2)
                            .collect(toList());

```

![](../../../assets/images/books/modernJavaInAction/usesStream/skip.png)

# **매핑**

- 특정 객체에서 특정 데이터를 선택하는 작업은 데이터 처리 과정에서 자주 수행되는 연산이다.
- `map` 과 `flatMap`메서드는 특정 데이터를 선택하는 기능을 제공한다.

## 스트림의 각 요소에 함수 적용하기

- 스트림은 **함수를 인수로 받는 `map`메서드를 지원한다.**
- **인수로 제공된 함수는 각 요소에 적용되며 함수를 적용한 결과가 새로운 요소로 매핑된다.**
  - *(이 과정은 기존의 값은 `고친다` 라는 개념보다는 `새로운 버전을 만든다`라는 개념에 가까우므로 **변환**에 가까운 **매핑**이라는 단어를 사용한다.)*
- 스트림의 요리명을 추출하는 코드

```java

    List<String> dishNames = menu.stream()
                                 .map(Dish::getName)
                                 .collect(toList());
    
```