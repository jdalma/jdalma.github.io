---
layout: default
title: Sorting and Searching (정렬, 이분검색과 결정알고리즘)
nav_order: 7
parent: 자바 코딩테스트 대비
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

# **`[삽입 정렬 , Shift]` Least Recently Used ✔**

![](../../../assets/images/algorithm/section6/1.png)

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

# **[장난꾸러기](https://cote.inflearn.com/contest/10/problem/06-06) ❌**

## ✋ 정렬을 사용하면 쉽게 풀 수 있는 문제
## 해답


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

# **`[삽입 정렬]` 좌표 정렬 ✔**

- 정렬기준은 먼저 x값의 의해서 정렬하고, x값이 같을 경우 y값에 의해 정렬합니다.
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

```java
import java.util.*;
class Main{
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int input1 = sc.nextInt();
        int[][] arr1 = new int[input1][2];
        for(int i = 0 ; i < arr1.length ; i++){
            for(int j = 0 ; j < 2 ; j++){
                arr1[i][j] = sc.nextInt();
            }
        }
        solution(input1 , arr1);
    }

    public static void solution(int input1 , int[][] arr1){
        for(int q = 0 ; q < input1 ; q++){
            for(int i = 1 ; i < input1 ; i++){
                int x = arr1[i][0];
                int y = arr1[i][1];
                int j;
                for(j = i - 1 ; j >= 0 ; j--){
                    int tmpX = arr1[j][0];
                    int tmpY = arr1[j][1];
                    if(arr1[j][0] == arr1[i][0] && arr1[j][1] > arr1[i][1]){
                        arr1[i][0] = tmpX;
                        arr1[i][1] = tmpY;
                    }
                    else if(arr1[j][0] > arr1[i][0]){
                        arr1[i][0] = tmpX;
                        arr1[i][1] = tmpY;
                    }
                    else break;
                }
                arr1[j + 1][0] = x;
                arr1[j + 1][1] = y;
            }
        }
        for(int tmp = 0 ; tmp < input1 ; tmp++){
            System.out.println(arr1[tmp][0] + " " + arr1[tmp][1]);
        }
    }
}
```

## 해답 `[implements Comparable<T> - compareTo()]`
```java
import java.util.*;
class Point implements Comparable<Point>{
    public int x, y;
    Point(int x, int y){
        this.x=x;
        this.y=y;
    }
    @Override
    public int compareTo(Point o){
        if(this.x == o.x) return this.y - o.y;
        else return this.x - o.x;
    }
}

class Main {
    public static void main(String[] args){
        Scanner kb = new Scanner(System.in);
        int n = kb.nextInt();
        ArrayList<Point> arr = new ArrayList<>();
        for(int i = 0 ; i < n ; i++){
            int x = kb.nextInt();
            int y = kb.nextInt();
            arr.add(new Point(x, y));
        }
        Collections.sort(arr);
        for(Point o : arr) System.out.println(o.x + " " + o.y);
    }
}
```


***
# **[이분 검색](https://cote.inflearn.com/contest/10/problem/06-08) ❌**

## 해답

```java
import java.util.*;
class Main {
    public int solution(int n, int m, int[] arr){
        int answer = 0;
        Arrays.sort(arr);
        int lt = 0 , rt = n - 1 ;
        while(lt <= rt){
            int mid =(lt + rt) / 2;
            if(arr[mid] == m){
                answer = mid + 1;
                break;
            }
            if(arr[mid] > m) rt = mid - 1;
            else lt = mid + 1;
        }
        return answer;
    }
    public static void main(String[] args){
        Main T = new Main();
        Scanner kb = new Scanner(System.in);
        int n = kb.nextInt();
        int m = kb.nextInt();
        int[] arr = new int[n];
        for(int i = 0 ; i < n ; i++) arr[i] = kb.nextInt();
        System.out.println(T.solution(n, m, arr));
    }
}
```

***


# **`[결정 알고리즘]` [뮤직비디오](https://cote.inflearn.com/contest/10/problem/06-09) ❌**
- **입력**
  - 첫째 줄에 자연수 N(1≤N≤1,000), M(1≤M≤N)이 주어진다.
  - 부른 곡의 길이가 분 단위로(자연수) 주어진다.
  - 부른 곡의 길이는 10,000분을 넘지 않는다고 가정하자.
- **출력**
  - 첫 번째 줄부터 DVD의 **최소 용량** 크기를 출력하세요.
- **예시 입력 1**
  - 9 3
  - 1 2 3 4 5 6 7 8 9
- **예시 출력 1**
  - 17

## 해답
- **이분 검색을 사용**

```java
import java.util.*;
class Main {
    public int count(int[] arr, int capacity){
        int cnt = 1, sum = 0 ;
        for(int x : arr){
            if(sum + x > capacity){
                cnt++;
                sum = x;
            }
            else sum += x;
        }
        return cnt;
    }

    public int solution(int n, int m, int[] arr){
        int answer = 0;
        int lt = Arrays.stream(arr).max().getAsInt();
        int rt = Arrays.stream(arr).sum();
        while(lt <= rt){
            int mid=(lt + rt) / 2;
            if(count(arr, mid) <= m){
                answer = mid;
                rt = mid - 1 ;
            }
            else lt = mid + 1 ;
        }
        return answer;
    }
    public static void main(String[] args){
        Main T = new Main();
        Scanner kb = new Scanner(System.in);
        int n = kb.nextInt();
        int m = kb.nextInt();
        int[] arr = new int[n];
        for(int i = 0 ; i < n ; i++) arr[i] = kb.nextInt();
        System.out.println(T.solution(n, m, arr));
    }
}
```

***

# **`[결정 알고리즘]` [마구간 정하기](https://cote.inflearn.com/contest/10/problem/06-10) ❌**
- **입력**
  - 첫 줄에 자연수 N(3<=N<=200,000)과 C(2<=C<=N)이 공백을 사이에 두고 주어집니다.
  - 둘째 줄에 마구간의 좌표 xi(0<=xi<=1,000,000,000)가 차례로 주어집니다.
- **출력**
  - 첫 줄에 가장 가까운 두 말의 최대 거리를 출력하세요.
- **예시 입력 1**
  - 5 3
  - 1 2 8 4 9
- **예시 출력 1**
  - 3

## 해답

```java
import java.util.*;
class Main {
    public int count(int[] arr, int dist){
        int cnt = 1;
        int ep = arr[0];
        for(int i = 1 ; i < arr.length; i++){
            if(arr[i] - ep >= dist){
                cnt++;
                ep = arr[i];
            }
        }
        return cnt;
    }

    public int solution(int n, int c, int[] arr){
        int answer = 0;
        Arrays.sort(arr);
        int lt = 1;
        int rt = arr[n - 1];
        while(lt <= rt){
            int mid=(lt + rt) / 2;
            if(count(arr, mid) >= c){
                answer = mid;
                lt = mid + 1;
            }
            else rt = mid - 1;
        }
        return answer;
    }

    public static void main(String[] args){
        Main T = new Main();
        Scanner kb = new Scanner(System.in);
        int n = kb.nextInt();
        int c = kb.nextInt();
        int[] arr = new int[n];
        for(int i = 0 ; i < n ; i++) arr[i] = kb.nextInt();
        System.out.println(T.solution(n, c, arr));
    }
}
```
