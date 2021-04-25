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
        for(int i = 1 ; i < arr1.length  ; i++){
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

### 해답

```java
import java.util.*;
class Main {
    public int[] solution(int n, int[] arr){
        for(int i = 1 ; i < n ; i++){
            int tmp = arr[i];
            int j;
            for(j = i - 1 ; j >= 0 ; j--){
                if(arr[j] > tmp) arr[j + 1] = arr[j];
                else break;
            }
            arr[j + 1] = tmp;
        }
        return arr;
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

***

# **`[삽입 정렬 , Shift]` Least Recently Used (통과)**
- **설명**
  - 캐시메모리는 CPU와 주기억장치(DRAM) 사이의 고속의 임시 메모리로서 CPU가 처리할 작업을 저장해 놓았다가 필요시 바로 사용해서 처리속도를 높이는 장치이다.
  - **LRU 알고리즘**은 **Least Recently Used** 의 약자로 직역하자면 가장 최근에 사용되지 않은 것 정도의 의미를 가지고 있다.
  - 캐시에서 작업을 제거할 때 가장 오랫동안 사용하지 않은 것을 제거하겠다는 알고리즘입니다.

![](../../../assets/images/algorithm/section6/1.png)

  - 캐시의 크기가 주어지고, 캐시가 비어있는 상태에서 N개의 작업을 CPU가 차례로 처리한다면 N개의 작업을 처리한 후
  - 캐시메모리의 상태를 가장 최근 사용된 작업부터 차례대로 출력하는 프로그램을 작성하세요.

- **입력**
  - 첫 번째 줄에 캐시의 크기인 S(3<=S<=10)와 작업의 개수 N(5<=N<=1,000)이 입력된다.
  - 두 번째 줄에 N개의 작업번호가 처리순으로 주어진다. 작업번호는 1 ~100 이다.
- **출력**
  - 마지막 작업 후 캐시메모리의 상태를 가장 최근 사용된 작업부터 차례로 출력합니다.
- **예시 입력 1**
  - 5 9
  - 1 2 3 2 6 2 3 5 7
- **예시 출력 1**
  - 7 5 3 2 6

## 풀어보기

```java
import java.util.*;
class Main{
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int input1 = sc.nextInt();
        int input2 = sc.nextInt();
        int[] arr1 = new int[input2];
        for(int i = 0 ; i < arr1.length ; i++){
            arr1[i] = sc.nextInt();
        }
        solution(input1 , input2 , arr1);
    }

    public static void solution(int input1 , int input2 , int[] arr1){
        int[] workArr = new int[input1];
        for(int i = 0 ; i < arr1.length ; i++){
            for(int j = 0 ; j < workArr.length ; j++){
                if(arr1[i] == workArr[j]){
                    if(j != 0) cacheHit(workArr , j);
                    arr1[i] = 0;
                    break;
                }
            }
            if(arr1[i] != 0) cacheMiss(workArr , arr1[i]);
        }
        for(int num : workArr){
            System.out.print(num + " ");
        }
    }

    public static void cacheMiss(int[] workArr , int work){
        for(int i = workArr.length - 1 ; i > 0 ; i--){
            workArr[i] = workArr[i - 1];
        }
        workArr[0] = work;
    }

    public static void cacheHit(int[] workArr , int hitIndex){
        int hitValue = workArr[hitIndex];
        for(int i = hitIndex ; i > 0 ; i--){
            workArr[i] = workArr[i - 1];
        }
        workArr[0] = hitValue;
    }
}
```

## 해답

```java
import java.util.*;
class Main {
    public int[] solution(int size, int n, int[] arr){
        int[] cache = new int[size];
        for(int x : arr){
            int pos = -1;
            for(int i = 0 ; i < size ; i++) if(x == cache[i]) pos = i;
            if(pos == -1){
                for(int i = size - 1 ; i >= 1 ; i--){
                    cache[i] = cache[i - 1];
                }
            }
            else{
                for(int i = pos ; i >= 1 ; i--){
                    cache[i] = cache[i - 1];
                }
            }
            cache[0] = x;
        }
        return cache;
    }
    public static void main(String[] args){
        Main T = new Main();
        Scanner kb = new Scanner(System.in);
        int s = kb.nextInt();
        int n = kb.nextInt();
        int[] arr = new int[n];
        for(int i = 0 ; i < n ; i++) arr[i] = kb.nextInt();
        for(int x : T.solution(s, n, arr)) System.out.print(x + " ");
    }
}
```

***

# **장난꾸러기 (실패)**

- **설명**
  - 선생님은 반 학생들에게 반 번호를 정해 주기 위해 운동장에 반 학생들을 키가 가장 작은 학생부터 일렬로 키순으로 세웠습니다.
  - 제일 앞에 가장 작은 학생부터 반 번호를 1번부터 N번까지 부여합니다.
  - 철수는 짝꿍보다 키가 큽니다.
  - 그런데 철수가 앞 번호를 받고 싶어 짝꿍과 자리를 바꿨습니다.
  - 선생님은 이 사실을 모르고 학생들에게 서있는 순서대로 번호를 부여했습니다.
  - 철수와 짝꿍이 자리를 바꾼 반 학생들의 일렬로 서있는 키 정보가 주어질 때 철수가 받은 번호와 철수 짝꿍이 받은 번호를 차례로 출력하는 프로그램을 작성하세요.
- **입력**
  - 첫 번째 줄에 자연수 N(5<=N<=100)이 주어진다.
  - 두 번째 줄에 제일 앞에부터 일렬로 서있는 학생들의 키가 주어진다.
  - 키(높이) 값 H는 (120<=H<=180)의 자연수 입니다.
- **출력**
  - 첫 번째 줄에 철수의 반 번호와 짝꿍의 반 번호를 차례로 출력합니다.
- **예시 입력 1**
  - 9
  - 120 125 152 130 135 135 143 127 160
- **예시 출력 1**
  - 3 8

## 해답

### 📌 정렬을 사용하면 쉽게 풀 수 있는 문제

```java
import java.util.*;
class Main {
    public ArrayList<Integer> solution(int n, int[] arr){
        ArrayList<Integer> answer = new ArrayList<>();
        int[] tmp = arr.clone();
        Arrays.sort(tmp);
        for(int i = 0 ; i < n ; i++){
            if(arr[i] != tmp[i]) answer.add(i + 1);
        }
        return answer;
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

***

# **좌표 정렬**
- **설명**
  - N개의 평면상의 좌표(x, y)가 주어지면 모든 좌표를 오름차순으로 정렬하는 프로그램을 작성하세요.
  - 정렬기준은 먼저 x값의 의해서 정렬하고, x값이 같을 경우 y값에 의해 정렬합니다.
- **입력**
  - 첫째 줄에 좌표의 개수인 N(3<=N<=100,000)이 주어집니다.
  - 두 번째 줄부터 N개의 좌표가 x, y 순으로 주어집니다.
  - x, y값은 양수만 입력됩니다.
- **출력**
  - N개의 좌표를 정렬하여 출력하세요.
- **예시 입력 1**
  - 5
  - 2 7
  - 1 3
  - 1 2
  - 2 5
  - 3 6
- **예시 출력 1**
  - 1 2
  - 1 3
  - 2 5
  - 2 7
  - 3 6

## 풀어보기
