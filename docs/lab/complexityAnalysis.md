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
  - `T(n)` : $3n^2 + 2n + 8$
- 점근적 표기법 `Asymptotic Notation`
  - 시간 복잡도 함수를 **대표적인 복잡도 함수 집합의 원소로 표현하는 법**
  - `T(n)` : $3n^2 + 2n + 8 → T(n) ∈ Θ(n^2)$
- **점근적 표기법의 종류**
  1. 📌 **빅오(O)** : 상한 `upper bound - worst case`
  2. **오메가(Ω)** : 하한 `lower bound`
  3. **쎄타(Θ)** : 차수 `order` → $Θ(f(n)) = O(f(n))\;⋂\;Ω(f(n))$

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
void func5(int n){
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
  - log<sub>2</sub><sup>n<sup>2</sup></sup> ∈ Θ(log<sup>n</sup>)


***

# 입력 크기의 변수가 여러 개인 경우

```c
void func6(int n , int m){
    for(int i = 1 ; i <= n ; i++)
      for(int j = 1 ; j <= m ; j *= 2)
        printf("Hello , Complexity\n");
}
```

- `바깥 for loop`는 `n`번
- '안쪽 for loop'는 log<sub>2</sub><sup>m</sup>
- `T(n , m)` : n * log<sub>2</sub><sup>m</sup> ∈ Θ(n * log<sub>2</sub><sup>m</sup>)


***

# 혼합 응용 문제

```c
void func7(int n , int m){
    // 1
    for(int i = 1 ; i <= n ; i++)
      printf("Hello , Complexity\n");

    // 2
    for(int i = 1 ; i <= n ; i *= 2)
      for(int j = n ; j >= 1 ; j /= 2)
        printf("Hello , Complexity\n");

    // 3
    for(int i = 1 ; i <= m ; i *= 2)
      for(int j = m ; j >= 1 ; j /= 2)
        printf("Hello , Complexity\n");

    // 4
    for(int i = 1 ; i <= 1000000 ; i++)
      printf("Hello , Complexity\n");
}
```

- `1번 루프` : n
- `2번 루프` : log<sub>2</sub><sup>n<sup>2</sup></sup>
- `3번 루프` : log<sub>2</sub><sup>m<sup>2</sup></sup>
- `4번 루프` : 1000000
- 상수인 4번 루프는 제거
- `m`에 대한 가장 높은 차수인 3번 루프는 제거 하지 않는다
- 1번 루프와 2번 루프 중 `n`에 대한 **가장 높은 차수**인 **1번 루프를 살리고 2번 루프는 제거**한다
- `T(n , m)` : ∈ Θ(n + log<sub>2</sub><sup>m</sup>)

***

# 재귀 함수의 시간 복잡도는? → `Master Theorem`
- **마스터 정리** : Master Theorem
  - 한 번만 딱 외우면 재귀 함수는 대부분 풀 수 있다!!!
  - **쉬운 경우**
    - `팩토리얼` : $T(n) = T(n - 1) + 1 ∈ Θ(n)$
    - `합병 정렬 (Merge Sort)` : $T(n) = 2 \times T()$


