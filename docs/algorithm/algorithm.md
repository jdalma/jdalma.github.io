---
layout: default
title: 알고리즘
nav_order: 68
has_children: true
permalink: /docs/algorithm
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# **정렬**

![](../../assets/images/algorithm/sort.png)

## ✋ 안정 정렬 (Stable Sort) , 불안정 정렬 (Unstable Sort)
- 정렬의 안정적 특성이란 **"정렬되지 않은 상태에서 같은 키값을 가진 원소의 순서가 정렬 후에도 유지되느냐"** 이다.
- 정렬 방법 마다 **중복된 원소**가 본래 순서대로 정렬될 수도 있고 , 섞일 수도 있다.
- **안정 정렬**
  - 중복된 값을 입력 순서와 동일하게 정렬되는 것
  - **삽입 정렬 , 병합 정렬 , 버블 정렬**
- **불안정 정렬**
  - 중복된 값이 입력 순서와 동일하지 않게 정렬되는 것
  - **퀵 정렬 , 선택정렬 , 계수정렬**

## ✋[TimSort에 대해 - NaverD2](https://d2.naver.com/helloworld/0315536)

## 버블정렬

- **서로 인접한 두 원소의 대소를 비교하고, 조건에 맞지 않다면 자리를 교환하며 정렬하는 알고리즘**

1. 1회전에 첫 번째 원소와 두 번째 원소를, 두 번째 원소와 세 번째 원소를, 세 번째 원소와 네 번째 원소를, … 이런 식으로 (마지막-1)번째 원소와 마지막 원소를 비교하여 조건에 맞지 않는다면 서로 교환합니다.
1. **1회전을 수행하고 나면 가장 큰 원소가 맨 뒤로 이동하므로 2회전에서는 맨 끝에 있는 원소는 정렬에서 제외되고, 2회전을 수행하고 나면 끝에서 두 번째 원소까지는 정렬에서 제외됩니다.** 이렇게 정렬을 1회전 수행할 때마다 정렬에서 제외되는 데이터가 하나씩 늘어납니다.

![](../../assets/images/algorithm/bubble-sort-001.gif)

- **장점**
  - 정렬하고자 하는 배열 안에서 교환하는 방식이므로, 다른 메모리 공간을 필요로 하지 않는다.. ➜ 제자리 정렬(in-place sorting)
  - **안정 정렬(Stable Sort)**
- **단점**
  - **시간복잡도가 최악, 최선, 평균 모두 O(n^2)으로, 굉장히 비효율적입니다.**
  - 정렬 돼있지 않은 원소가 정렬 됐을때의 자리로 가기 위해서, 교환 연산(swap)이 많이 일어나게 됩니다.

## 선택정렬

- **해당 순서에 원소를 넣을 위치는 이미 정해져 있고, 어떤 원소를 넣을지 선택하는 알고리즘**
- **해당 자리를 선택하고 그 자리에 오는 값을 찾는 것**

1. 주어진 배열 중에 최소값을 찾는다.
1. 그 값을 맨 앞에 위치한 값과 교체한다. (pass)
1. 맨 처음 위치를 뺀 나머지 배열을 같은 방법으로 교체한다.

![](../../assets/images/algorithm/selection-sort-001.gif)

- **장점**
  - 정렬을 위한 비교 횟수는 많지만, Bubble Sort에 비해 실제로 교환하는 횟수는 적기 때문에 많은 교환이 일어나야 하는 자료상태에서 비교적 효율적이다.
  - 정렬하고자 하는 배열 안에서 교환하는 방식이므로, 다른 메모리 공간을 필요로 하지 않는다. ➜ 제자리 정렬(in-place sorting)

- **단점**
  - 시간복잡도가 O(n<sup>2</sup>)으로, 비효율적이다.
  - **불안정 정렬(Unstable Sort)**

***

# **TreeSet**
- 객체를 중복해서 저장할 수 없고 저장 순서가 유지되지 않는다는 **Set**의 성질을 그대로 가지고 있다.
- **이진 탐색 트리** 구조로 되어 있다.
- 추가와 삭제에는 시간이 조금 더 걸리지만 **정렬,검색**에 높은 성능을 보이는 자료구조 이다.
- 생성자의 매개변수로 Comparator객체를 입력하여 정렬 방법을 임의로 지정해 줄 수도 있다.
- **레드-블랙트리**로 구현되어 있다.
  - 부모노드보다 작은 값을 가지는 노드는 왼쪽 자식으로 ,
  - 큰 값을 가지는 노드는 오른쪽 자식으로 배치하여 균형을 맞춘다.

![](../../assets/images/algorithm/section4/1.png)

## [문제 - K번째 큰 수](https://jeongcode.github.io/docs/algorithm/javaAlgorithm/section4/#treeset-k%EB%B2%88%EC%A7%B8-%ED%81%B0-%EC%88%98-%EC%8B%A4%ED%8C%A8)

## TreeSet 선언

```java
TreeSet<Integer> set1 = new TreeSet<Integer>();//TreeSet생성
TreeSet<Integer> set2 = new TreeSet<>();//new에서 타입 파라미터 생략가능
TreeSet<Integer> set3 = new TreeSet<Integer>(set1);//set1의 모든 값을 가진 TreeSet생성
TreeSet<Integer> set4 = new TreeSet<Integer>(Arrays.asList(1,2,3));//초기값 지정
```

## TreeSet 값 추가
  - 입력되는 값이 TreeSet 내부에 존재하지 않는다면 그 값을 추가한 뒤 true를 반환하고
  - 내부에 값이 존재한다면 false를 반환한다.
  - 7,4,9,2,5를 차례대로 TreeSet에 저장한다면 아래와같은 과정을 거치게 된다.

```java
  TreeSet<Integer> set = new TreeSet<Integer>();//TreeSet생성
  set.add(7); //값추가
  set.add(4);
  set.add(9);
  set.add(2);
  set.add(5);
```

![](../../assets/images/algorithm/section4/2.png)


## TreeSet 값 삭제
  -  매개변수 value의 값이 존재한다면 그 값을 삭제한 후 true를 반환하고 없으면 false를 반환한다.

```java
TreeSet<Integer> set = new TreeSet<Integer>();//TreeSet생성
set.remove(1);//값 1 제거
set.clear();//모든 값 제거
```

## TreeSet 값 출력

```java
TreeSet<Integer> set = new TreeSet<Integer>(Arrays.asList(4,2,3));//초기값 지정
System.out.println(set); //전체출력 [2,3,4]
System.out.println(set.first());//최소값 출력
System.out.println(set.last());//최대값 출력
System.out.println(set.higher(3));//입력값보다 큰 데이터중 최소값 출력 없으면 null
System.out.println(set.lower(3));//입력값보다 작은 데이터중 최대값 출력 없으면 null

Iterator iter = set.iterator();	// Iterator 사용
while(iter.hasNext()) {//값이 있으면 true 없으면 false
    System.out.println(iter.next());
}
```


***

# **참고 및 출처**
- [https://coding-factory.tistory.com](https://coding-factory.tistory.com/555)
- [https://github.com/GimunLee](https://github.com/GimunLee/tech-refrigerator/tree/master/Algorithm)
- [https://hongl.tistory.com](https://hongl.tistory.com/9)
