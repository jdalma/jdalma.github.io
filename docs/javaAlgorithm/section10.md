---
layout: default
title: Dynamic Programming(동적계획법)
nav_order: 11
parent: 자바 코딩테스트 대비
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# **[계단오르기](https://cote.inflearn.com/contest/10/problem/10-01)**

## 풀어보기 - `피보나치`

```java
import java.util.*;

class Main {
    static int[] memoization;
    static int count;

    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        count = sc.nextInt();
        memoization = new int[count + 1];
        System.out.println(recursive(count));
    }

    public static int recursive(int n){
        if(memoization[n] > 0) return memoization[n];
        else if(n == 1) return memoization[n] = 1;
        else if(n == 2) return memoization[n] = 2;
        else return memoization[n] = recursive(n-2) + recursive(n-1);
    }
}
```

## 풀이

```java
import java.util.*;
class Main{
    static int[] dy;
    public int solution(int n){
        dy[1]=1;
        dy[2]=2;
        for(int i=3; i<=n; i++) dy[i]=dy[i-2]+dy[i-1];
        return dy[n];
    }

    public static void main(String[] args){
        Main T = new Main();
        Scanner kb = new Scanner(System.in);
        int n=kb.nextInt();
        dy=new int[n+1];
        System.out.print(T.solution(n));
    }
}
```
