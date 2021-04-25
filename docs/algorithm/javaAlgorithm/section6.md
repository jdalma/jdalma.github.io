---
layout: default
title: Sorting and Searching (정렬, 이분검색과 결정알고리즘)
nav_order: 7
parent: 자바 코딩테스트 대비
grand_parent: 알고리즘
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# **정렬**

- **설명**
  - N개 숫자가 입력되면 오름차순으로 정렬하여 출력하는 프로그램을 작성하세요.
  - 정렬하는 방법은 선택정렬입니다.
- **입력**
  - 첫 번째 줄에 자연수 N(1<=N<=100)이 주어집니다.
  - 두 번째 줄에 N개의 자연수가 공백을 사이에 두고 입력됩니다. 각 자연수는 정수형 범위 안에 있습니다.
- **출력**
  - 오름차순으로 정렬된 수열을 출력합니다.
- **예시 입력 1**
  - 6
  - 13 5 11 7 23 15
- **예시 출력 1**
  - 5 7 11 13 15 23

## **선택정렬**

### 풀어보기

```java
import java.util.*;
class Main {

    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int input1 = sc.nextInt();
        int[] arr1 = new int[input1];
        for(int i = 0 ; i < input1 ; i++){
            arr1[i] = sc.nextInt();
        }
        solution(input1 , arr1);
    }

    public static void solution(int input1 , int[] arr1){
        int min = 0;
        for(int i = 0 ; i < arr1.length ; i++){
            for(int j = i + 1 ; j < arr1.length ; j++){
                if(arr1[i] > arr1[j]){
                    int tmp = arr1[j];
                    arr1[j] = arr1[i];
                    arr1[i] = tmp;
                }
            }
        }
        for(int i : arr1){
            System.out.print(i + " ");
        }
    }
}

```

### 해답

```java
import java.util.*;
class Main {
    public int[] solution(int n, int[] arr){
        for(int i = 0 ; i < n - 1 ; i++){
            int idx = i;
            for(int j = i + 1 ; j < n ; j++){
                if(arr[j] < arr[idx]) idx = j;
            }
            int tmp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = tmp;
        return arr;
      }
    }
    public static void main(String[] args){
        Main T = new Main();
        Scanner kb = new Scanner(System.in);
        int n = kb.nextInt();
        int[] arr = new int[n];
        for(int i = 0 ; i < n ; i++) arr[i] = kb.nextInt();
        for(int x : T.solution(n, arr)) System.out.print(x+" ");
    }
}
```

## **버블 정렬**

### 풀어보기

```java
import java.util.*;
class Main{
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int input1 = sc.nextInt();
        int[] arr1 = new int[input1];
        for(int i = 0 ; i < arr1.length ; i++){
            arr1[i] = sc.nextInt();
        }
        solution(arr1);
    }

    public static void solution(int[] arr1){
        for(int i = 1 ; i <= arr1.length  ; i++){
            for(int j = 0; j < arr1.length - i; j++){
                if(arr1[j] > arr1[j + 1]) {
                    int tmp = arr1[j + 1];
                    arr1[j + 1] = arr1[j];
                    arr1[j] = tmp;
                }
            }
        }
        for(int num : arr1){
            System.out.print(num + " ");
        }
    }
}
```

### 해답

```java
import java.util.*;
class Main {
    public int[] solution(int n, int[] arr){
        for(int i = 0 ; i < n - 1 ; i++){
            for(int j = 0 ; j < n - i - 1 ; j++){
                if(arr[j] > arr[j + 1]){
                    int tmp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = tmp;
                }
            }
        }
        return arr;
    }
    public static void main(String[] args){
        Main T = new Main();
        Scanner kb = new Scanner(System.in);
        int n = kb.nextInt();
        int[] arr = new int[n];
        for(int i = 0 ; i < n ; i++) arr[i] = kb.nextInt();
        for(int x : T.solution(n, arr)) System.out.print(x + " ");
    }
}
```

## **삽입 정렬**

### 풀어보기
