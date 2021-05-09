---
layout: default
title: DFS, BFS 활용
nav_order: 9
parent: 자바 코딩테스트 대비
grand_parent: 알고리즘
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# **`[DFS : 아마존 인터뷰]` [합이 같은 부분집합](https://cote.inflearn.com/contest/10/problem/08-01) (✅ ~~실패~~)**

## 풀어보기

```java

import java.util.*;

class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int input1 = sc.nextInt();
        arr1 = new int[input1];
        for(int i = 0 ; i < arr1.length ; i++){
            arr1[i] = sc.nextInt();
        }
        solution(input1 , arr1);
        if(isFind) System.out.println("YES");
        else System.out.println("NO");
    }

    public static void solution(int input1 , int[] arr1){
        total = Arrays.stream(arr1).sum();
        recursive( 0 , 0);
    }
    static int total;
    static int[] arr1;
    static boolean isFind = false;
    public static void recursive(int level , int sum){
        if(isFind) return;
        if(total / 2 < sum){
            return;
        }
        else if(level == arr1.length){
            if(total - sum == sum){
                isFind = true;
                return;
            }
        }
        else{
            recursive(level + 1 , sum + arr1[level]);
            recursive(level + 1 , sum);
        }
    }
}
```

## 해답

```java
import java.util.*;
class Main{
    static String answer="NO";
    static int n, total=0;
    boolean flag=false;
    public void DFS(int L, int sum, int[] arr){
        if(flag) return;
        if(sum > total / 2) return;
        if(L==n){
            if((total-sum)==sum){
                answer="YES";
                flag=true;
            }
        }
        else{
            DFS(L+1, sum+arr[L], arr);
            DFS(L+1, sum, arr);
        }
    }
    public static void main(String[] args){
        Main T = new Main();
        Scanner kb = new Scanner(System.in);
        n = kb.nextInt();
        int[] arr = new int[n];
        for(int i = 0 ; i < n ; i++){
            arr[i] = kb.nextInt();
            total += arr[i];
        }
        T.DFS(0, 0, arr);
        System.out.println(answer);
    }
}
```

***

# **`[DFS]` [바둑이 승차](https://cote.inflearn.com/contest/10/problem/08-02) (통과)**

## 풀어보기

```java

import java.util.*;

class Main {
    static int[] arr1;
    static int input1 , result;
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        input1 = sc.nextInt();
        int input2 = sc.nextInt();
        arr1 = new int[input2];
        for(int i = 0 ; i < arr1.length ; i++){
            arr1[i] = sc.nextInt();
        }
        recursive( 0 , 0);
        System.out.println(result);
    }

    public static void recursive(int level , int sum){
        if(input1 < sum){}
        else{
            if(result < sum) result = sum;
            if(level == arr1.length){}
            else{
                recursive(level + 1 , sum + arr1[level]);
                recursive(level + 1, sum);
            }
        }
    }
}
```

## 해답

```java
import java.util.*;
class Main{
    static int answer=Integer.MIN_VALUE, c, n;
    public void DFS(int L, int sum, int[] arr){
        if(sum>c) return;
        if(L==n){
            answer=Math.max(answer, sum);
        }
        else{
            DFS(L+1, sum+arr[L], arr);
            DFS(L+1, sum, arr);
        }
    }

    public static void main(String[] args){
        Main T = new Main();
        Scanner kb = new Scanner(System.in);
        c=kb.nextInt();
        n=kb.nextInt();
        int[] arr=new int[n];
        for(int i=0; i<n; i++){
            arr[i]=kb.nextInt();
        }
        T.DFS(0, 0, arr);
        System.out.println(answer);
    }
}
```

***

# **`[DFS]` [최대점수 구하기](https://cote.inflearn.com/contest/10/problem/08-03) (진행중)**

## 풀어보기
```java

import java.util.*;

class Main {
    static int[] scoreArr , timeArr;
    static int problemCount , timeLimit , result = -1;
    static String tmp = "";
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        problemCount = sc.nextInt();
        timeLimit = sc.nextInt();
        scoreArr = new int[problemCount];
        timeArr = new int[problemCount];
        for(int i = 0 ; i < problemCount ; i++){
            scoreArr[i] = sc.nextInt();
            timeArr[i] = sc.nextInt();
//            System.out.println(problemArr[i] + " " + scoreArr[i]);
        }
        recursive(0 ,0 , 0);
        System.out.println(result);
    }

    public static void recursive(int cnt , int totalScore , int totalTime){
        if(cnt > problemCount - 1 || totalTime > timeLimit){}
        else{
//            result = Math.max(result , totalScore);
            tmp += scoreArr[cnt] + " + ";
            System.out.println(tmp + " - " + totalTime);
            recursive(cnt + 1 , totalScore + scoreArr[cnt] , totalTime + timeArr[cnt]);
//            recursive(cnt + 1 , totalScore, totalTime);
        }
    }
}

```


## 해답
