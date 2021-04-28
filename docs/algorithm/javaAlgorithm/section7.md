---
layout: default
title: Recursive, Tree, Graph(DFS, BFS 기초)
nav_order: 8
parent: 자바 코딩테스트 대비
grand_parent: 알고리즘
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# **재귀함수를 이용한 이진수 출력**
- 10진수 N이 입력되면 2진수로 변환하여 출력하는 프로그램을 작성하세요.
- **단, 재귀함수를 이용해서 출력해야 합니다.**
- **입력설명**
  - 첫 번째 줄에 10진수 N(1<=N<=1,000)이 주어집니다.
- **출력설명**
  - 첫 번째 줄에 이진수를 출력하세요.
- **입력예제 1**
  - 11
- **출력예제 1**
  - 1011


## 풀어보기

```java
import java.util.*;
class Main{
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int input1 = sc.nextInt();
        recursive(input1);
    }

    public static void recursive(int input1){
        if(input1 <= 0){
        }
        else{
            recursive(input1 / 2);
            System.out.print(input1 % 2 + " ");
        }
    }
}
```

## 해답

```java
import java.util.*;
class Main {
    public void DFS(int n){
        if(n == 0) return;
        else{
            DFS(n / 2);
            System.out.print(n % 2);
        }
    }

    public void solution(int n){
        DFS(n);
    }
    public static void main(String[] args){
        Main T = new Main();
        T.solution(11);
        //System.out.println(T.solution(3));
    }
}
```

***

# **팩토리얼**

- 자연수 N이 입력되면 N!를 구하는 프로그램을 작성하세요.
- 예를 들어 `5! = 5*4*3*2*1 = 120` 입니다.
- **입력예제 1**
  - 5
- **출력예제 1**
  - 120

## 풀어보기

```java
import java.util.*;
class Main{
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int input1 = sc.nextInt();
        System.out.println(recursive(input1));
    }

    public static int recursive(int input1){
        if(input1 == 1){
            return 1;
        }
        else{
            return input1 * recursive(input1 - 1) ;
        }
    }
}
```

## 해답

```java
import java.util.*;
class Main {
    public int DFS(int n){
        if(n == 1) return 1;
        else return n * DFS(n - 1);
    }
    public static void main(String[] args){
        Main T = new Main();
        System.out.println(T.DFS(5));
    }
}
```

***
# **피보나치 수열**
- 피보나치 수열이란 앞의 2개의 수를 합하여 다음 숫자가 되는 수열이다.
- 입력은 피보나치 수열의 총 항의 수 이다.
- 만약 7이 입력되면 1 1 2 3 5 8 13을 출력하면 된다.
- **입력예제 1**
  - 10
- **출력예제 1**
  - 1 1 2 3 5 8 13 21 34 55


## 풀어보기



## 해답
