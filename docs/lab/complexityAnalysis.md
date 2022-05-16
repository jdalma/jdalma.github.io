---
layout: default
title: 복잡도 뽀개기
nav_order: 2
parent: 👨‍🔬 Lab
---

- 해당 글은 [알고리즘 복잡도 뽀개기](https://www.youtube.com/watch?v=alHBRp704l8&list=PLHqxB9kMLLaO2Zxb5exYYcN-Tin5pE-sK&index=2)를 참고하여 정리한 내용이다


# **복잡도 분석** `Complexity Analysis`
- 알고리즘의 시간 복잡도
  - *입력 크기에 따른 `단위 연산의 수행 횟수 변화`를 함수로 나타낸 것*
  - `T(n)` : 3n<sup>2</sup> + 2n + 8
- 점근적 표기법 `Asymptotic Notation`
  - 시간 복잡도 함수를 **대표적인 복잡도 함수 집합의 원소로 표현하는 법**
  - `T(n)` : 3n<sup>2</sup> + 2n + 8 → `T(n)` ∈ Θ(n<sup>2</sup>)
- **점근적 표기법의 종류**
  1. 📌 **빅오(O)** : 상한 `upper bound - worst case`
  2. **오메가(Ω)** : 하한 `lower bound`
  3. **쎄타(Θ)** : 차수 `order` → `Θ(f(n)) = O(f(n)) ⋂ Ω(f(n))`

***

# 반복문의 경우

```c
void func1(int n){
    for(int i = 1 ; i <= n ; i++){
        printf("Hello , Complexity\n");
    }
}
```

- 입력 크기 : `n`
- `T(n)` : n ∈ Θ(n)

***

# 반복문이 여러 개인 경우

```c
void func2(int n){
    for(int i = 1 ; i <= n ; i++){
        printf("Hello , Complexity\n");
    }
    for(int i = 1 ; i <= 2 * n ; i++){
        printf("Hello , Complexity\n");
    }
    for(int i = 1 ; i <= 3 * n ; i++){
        printf("Hello , Complexity\n");
    }
}
```

- 입력 크기 : `n`
- `T(n)` : n + 2n + 3n
  - 6n ∈ Θ(n)

***

# 반복문이 중첩 되는 경우

```c
void func3(int n){
    for(int i = 1 ; i <= n ; i++){
        for(int j = 1 ; j <= n ; j++){
            printf("Hello , Complexity\n");
        }
    }
}
```

- 입력 크기 : `n`
- `T(n)` : n<sup>2</sup> ∈ Θ(n<sup>2</sup>)

***

# 중첩 반복문이 여러 개인 경우

```c
void func4(int n){
    for(int i = 1 ; i <= 1000000 * n ; i++){
        printf("Hello , Complexity\n");
    }

    for(int i = 1 ; i <= n ; i++){
        for(int j = 1 ; j <= n ; j++){
            printf("Hello , Complexity\n");
        }
    }
}
```

- 입력 크기 : `n`
- `T(n)` : 1000000n + n * (2n)
  - 2n<sup>2</sup> + 1000000 * n ∈ Θ(n<sup>2</sup>)

***

# 입력 크기에 따른 실행 횟수의 변화가 다양한 경우

```c
void func4(int n){
    // 두 배씩 증가 
    for(int i = 1 ; i <= n ; i *= 2){
        printf("Hello , Complexity\n");
    }
    // 두 배씩 감소
    for(int i = 1 ; i <= n ; i /= 2){
        printf("Hello , Complexity\n");
    }
}
```
- log 2 베이스 n
- **두 배씩 증가** : log<sub>2</sub><sup>n</sup>
- **두 배씩 감소** : log<sub>2</sub><sup>n</sup>
- `T(n)` : log<sub>2</sub><sup>n</sup> + log<sub>2</sub><sup>n</sup>
  - log<sub>2</sub><sup>n * n</sup>
  - log<sub>2</sub><sup>n<sup>2</sup></sup> ∈ Θ(log<sup>2</sup>)

- 예를 들어 2개의 자식 노드를 가지는 이진트리를 이용해서 `M`개의 노드 중 원하는 값의 노드를 찾는다고 해보자. 
- 처음에는 `M`개의 노드 모두 탐색 대상이지만, 루트 노드에서 첫번째 자식 노드 층으로 이동하게 되면 절반으로 줄게 된다.
  - *M/2 개 => M/4 개 => M/8 개 => ...*
- 만약 탐색을 해야하는 자료의 수가 2<sup>n</sup> 개라면, 이진 트리를 사용할 경우 `n`번의 탐색을 통해서 원하는 값을 찾을 수 있게 된다. 
- 이를 수식으로 나타내면 아래와 같다.
  - log<sub>2</sub>(2<sup>n</sup>) = n
- 이를 일반화하면, 각 노드의 자식노드가 `M`개인 트리에서 `N`개의 자료 중 원하는 자료를 탐색하는 알고리즘의 시간 복잡도는 아래와 같다.
  - log<sub>m</sub>n
