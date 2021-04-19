---
layout: default
title: Tow pointers, Sliding Window (효율성 : O(n^2) ➜ O(n) )
nav_order: 4
parent: 자바 코딩테스트 대비
grand_parent: 알고리즘
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# **두 배열 합치기 (통과)**

- **설명**
  - 오름차순으로 정렬이 된 두 배열이 주어지면 두 배열을 오름차순으로 합쳐 출력하는 프로그램을 작성하세요.
- **입력**
  - 첫 번째 줄에 첫 번째 배열의 크기 N(1<=N<=100)이 주어집니다.
  - 두 번째 줄에 N개의 배열 원소가 오름차순으로 주어집니다.
  - 세 번째 줄에 두 번째 배열의 크기 M(1<=M<=100)이 주어집니다.
  - 네 번째 줄에 M개의 배열 원소가 오름차순으로 주어집니다.
  - 각 리스트의 원소는 int형 변수의 크기를 넘지 않습니다.
- **출력**
  - 오름차순으로 정렬된 배열을 출력합니다.
- **예시 입력 1**
  - 3
  - 1 3 5
  - 5
  - 2 3 6 7 9
- **예시 출력 1**
  - 1 2 3 3 5 6 7 9


## 풀어보기

```java
import java.util.*;
public class Main {
    public static void main(String[] args){
        Scanner kb = new Scanner(System.in);
        int n = kb.nextInt();
        int[] arr1 = new int[n];
        for(int i = 0 ; i < n ; i++){
            arr1[i] = kb.nextInt();
        }
        int m = kb.nextInt();
        int[] arr2 = new int[m];
        for(int i = 0 ; i < m ; i++){
            arr2[i] = kb.nextInt();
        }
        solution(arr1 , arr2);
    }

    public static void solution(int[] arr1 , int[] arr2){
        int totalLength = arr1.length + arr2.length;
        int[] resultArr = new int[totalLength];
        int index1 = 0 , index2 = 0;
        int val = 0;
        for(int i = 0 ; i < totalLength ; i++){
            if(index1 >= arr1.length || arr1[index1] > arr2[index2]){
                val = arr2[index2];
                index2++;
            }
            else{
                val = arr1[index1];
                index1++;
            }
            resultArr[i] = val;
        }
        Arrays.stream(resultArr).forEach(num -> {
            System.out.print(num + " ");
        });
    }
}

```

## 해답

```java
import java.util.*;
class Main {
	public ArrayList<Integer> solution(int n, int m, int[] a, int[] b){
		ArrayList<Integer> answer = new ArrayList<>();
		int p1 = 0, p2 = 0;
		while(p1 < n && p2 < m){
			if(a[p1] < b[p2]) answer.add(a[p1++]);
			else answer.add(b[p2++]);
		}
		while(p1<n) answer.add(a[p1++]);
		while(p2<m) answer.add(b[p2++]);
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner kb = new Scanner(System.in);
		int n = kb.nextInt();
		int[] a = new int[n];
		for(int i = 0 ; i < n ; i++){
			a[i] = kb.nextInt();
		}
		int m = kb.nextInt();
		int[] b = new int[m];
		for(int i = 0 ; i < m ; i++){
			b[i] = kb.nextInt();
		}
		for(int x : T.solution(n, m, a, b)) System.out.print(x+" ");
	}
}
```

***

# **공통 원소 구하기 (통과)**

- **설명**
  - A, B 두 개의 집합이 주어지면 두 집합의 공통 원소를 추출하여 오름차순으로 출력하는 프로그램을 작성하세요.
- **입력**
  - 첫 번째 줄에 집합 A의 크기 N(1<=N<=30,000)이 주어집니다.
  - 두 번째 줄에 N개의 원소가 주어집니다. 원소가 중복되어 주어지지 않습니다.
  - 세 번째 줄에 집합 B의 크기 M(1<=M<=30,000)이 주어집니다.
  - 네 번째 줄에 M개의 원소가 주어집니다. 원소가 중복되어 주어지지 않습니다.
  - 각 집합의 원소는 1,000,000,000이하의 자연수입니다.
- **출력**
  - 두 집합의 공통원소를 오름차순 정렬하여 출력합니다.
- **예시 입력 1**
  - 5
  - 1 3 9 5 2
  - 5
  - 3 2 5 7 8
- **예시 출력 1**
  - 2 3 5

## 풀어보기

```java
import java.util.*;
public class Main {
    public static void main(String[] args){
        Scanner kb = new Scanner(System.in);
        int n = kb.nextInt();
        int[] arr1 = new int[n];
        for(int i = 0 ; i < n ; i++){
            arr1[i] = kb.nextInt();
        }
        int m = kb.nextInt();
        int[] arr2 = new int[m];
        for(int i = 0 ; i < m ; i++){
            arr2[i] = kb.nextInt();
        }
        solution(arr1 , arr2);
    }

    public static void solution(int[] arr1 , int[] arr2){
        List<Integer> resultList = new ArrayList<>();
        Arrays.sort(arr1);
        Arrays.sort(arr2);
        int index1 = 0 , index2 = 0;
        for(int i = 0 ; i < arr1.length + arr2.length ; i++){
            if(index1 >= arr1.length || index2 >= arr2.length) break;
            else if(arr1[index1] == arr2[index2]){
                resultList.add(arr1[index1++]);
                index2++;
            }
            else if(arr1[index1] > arr2[index2]){
                index2++;
            }
            else{
                index1++;
            }
        }
        for (Integer integer : resultList) {
            System.out.print(integer + " ");
        }
    }
}
```

## 해답

```java
import java.util.*;
class Main {
	public ArrayList<Integer> solution(int n, int m, int[] a, int[] b){
		ArrayList<Integer> answer = new ArrayList<>();
		Arrays.sort(a);
		Arrays.sort(b);
		int p1 = 0, p2 = 0;
		while(p1 < n && p2 < m){
			if(a[p1] == b[p2]){
				answer.add(a[p1++]);
				p2++;
			}
			else if(a[p1] < b[p2]) p1++;
			else p2++;
		}
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner kb = new Scanner(System.in);
		int n = kb.nextInt();
		int[] a = new int[n];
		for(int i = 0 ; i < n ; i++){
			a[i] = kb.nextInt();
		}
		int m = kb.nextInt();
		int[] b = new int[m];
		for(int i = 0 ; i < m ; i++){
			b[i] = kb.nextInt();
		}
		for(int x : T.solution(n, m, a, b)) System.out.print(x+" ");
	}
}
```

***

# **[SlidingWindow] 최대 매출 (실패 - <span style="color:red;">시간초과</span>)**
- **설명**
  - N일 동안의 매출기록을 주고 연속된 K일 동안의 최대 매출액이 얼마인지 구하라고 했습니다.
  - 만약 N=10이고 10일 간의 매출기록이 아래와 같습니다. 이때 K=3이면
  - 12 15 <span style="color:red; font-weight:bold">11 20 25</span> 10 20 19 13 15
  - 연속된 3일간의 최대 매출액은 11+20+25=56만원입니다.
- **입력**
  - 첫 줄에 N(5<=N<=100,000)과 K(2<=K<=N)가 주어집니다.
  - 두 번째 줄에 N개의 숫자열이 주어집니다. 각 숫자는 500이하의 음이 아닌 정수입니다.
- **출력**
  - 첫 줄에 최대 매출액을 출력합니다.
- **예시 입력 1**
  - 10 3
  - 12 15 11 20 25 10 20 19 13 15
- **예시 출력 1**
  - 56

## 풀어보기

```java
import java.util.*;
public class Main {
    public static void main(String[] args){
        Scanner kb = new Scanner(System.in);
        int length = kb.nextInt();
        int days = kb.nextInt();
        int[] arr1 = new int[length];
        for(int i = 0 ; i < length ; i++){
            arr1[i] = kb.nextInt();
        }
        solution(arr1 , days);
    }

    public static void solution(int[] arr1 , int days){
        int total = 0;
        for(int i = 0 ; i < arr1.length - days ; i++){
            int tmp = 0;
            for(int k = i ; k < i + days ; k++){
                tmp += arr1[k];
            }
            if(total < tmp){
                total = tmp;
            }
        }
        System.out.println(total);
    }
}
```

## 해답

```java
import java.util.*;
class Main {
	public int solution(int n, int k, int[] arr){
		int answer, sum=0;
		for(int i = 0 ; i < k ; i++) sum += arr[i];
		answer = sum;
		for(int i = k ; i < n ; i++){
			sum += (arr[i] - arr[i - k]);
			answer = Math.max(answer, sum);
		}
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner kb = new Scanner(System.in);
		int n = kb.nextInt();
		int k = kb.nextInt();
		int[] arr = new int[n];
		for(int i = 0 ; i < n ; i++){
			arr[i] = kb.nextInt();
		}
		System.out.print(T.solution(n, k, arr));
	}
}
```
