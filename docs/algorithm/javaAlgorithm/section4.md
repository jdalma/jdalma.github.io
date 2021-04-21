---
layout: default
title: HashMap , TreeSet (해쉬 , 정렬지원 Set)
nav_order: 5
parent: 자바 코딩테스트 대비
grand_parent: 알고리즘
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# **`[HashMap]` 학급 회장 (통과)**
- **설명**
  - 학급 회장을 뽑는데 후보로 기호 A, B, C, D, E 후보가 등록을 했습니다.
  - 투표용지에는 반 학생들이 자기가 선택한 후보의 기호(알파벳)가 쓰여져 있으며 선생님은 그 기호를 발표하고 있습니다.
  - 선생님의 발표가 끝난 후 어떤 기호의 후보가 학급 회장이 되었는지 출력하는 프로그램을 작성하세요.
  - 반드시 한 명의 학급회장이 선출되도록 투표결과가 나왔다고 가정합니다.
- **입력**
  - 첫 줄에는 반 학생수 N(5<=N<=50)이 주어집니다.
  - 두 번째 줄에 N개의 투표용지에 쓰여져 있던 각 후보의 기호가 선생님이 발표한 순서대로 문자열로 입력됩니다.
- **출력**
  - 학급 회장으로 선택된 기호를 출력합니다.
- **예시 입력 1**
  - 15
  - BACBACCACCBDEDE
- **예시 출력 1**
  - C

## 풀어보기

```java
import java.util.*;
public class Main {

    public static void main(String[] args){
        Scanner in=new Scanner(System.in);
        int length = in.nextInt();
        String str = in.next();
        solution(length , str);
    }

    public static void solution(int length , String str) {
        Map<String , Integer> resultMap = new HashMap<String , Integer>();
        for(int i = 0 ; i < str.length() ; i++){
            String key = String.valueOf(str.charAt(i));
            int value = 0;
            if(resultMap.containsKey(key)) value = resultMap.get(key);
            resultMap.put( key , value + 1);
        }
        String result = resultMap.keySet().stream().max((o1, o2) -> {
                                        if(resultMap.get(o1) > resultMap.get(o2)) return 1;
                                        else return -1;}).get();
        System.out.println(result);
    }
}
```

## 해답

### 📌 `map.getOrDefault(x, 0)`

```java
import java.util.*;
class Main {
	public char solution(int n, String s){
		char answer=' ';
		HashMap<Character, Integer> map=new HashMap<>();
		for(char x : s.toCharArray()){
			map.put(x, map.getOrDefault(x, 0)+1);
		}
		//System.out.println(map.containsKey('F'));
		//System.out.println(map.size());
		//System.out.println(map.remove('C'));

		int max=Integer.MIN_VALUE;
		for(char key : map.keySet()){
			//System.out.println(key+" "+map.get(key));
			if(map.get(key)>max){
				max=map.get(key);
				answer=key;
			}
		}
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner kb = new Scanner(System.in);
		int n=kb.nextInt();
		String str=kb.next();
		System.out.println(T.solution(n, str));
	}
}
```

***

# **`[HashMap]` 아나그램 (통과)**

- **설명**
  - **Anagram**이란 두 문자열이 알파벳의 나열 순서를 다르지만 그 구성이 일치하면 두 단어는 아나그램이라고 합니다.
  - 예를 들면 AbaAeCe 와 baeeACA 는 알파벳을 나열 순서는 다르지만 그 구성을 살펴보면 A(2), a(1), b(1), C(1), e(2)로 알파벳과 그 개수가 모두 일치합니다.
  - 즉 어느 한 단어를 재 배열하면 상대편 단어가 될 수 있는 것을 아나그램이라 합니다.
  - 길이가 같은 두 개의 단어가 주어지면 두 단어가 아나그램인지 판별하는 프로그램을 작성하세요. 아나그램 판별시 대소문자가 구분됩니다.
- **입력**
  - 첫 줄에 첫 번째 단어가 입력되고, 두 번째 줄에 두 번째 단어가 입력됩니다.
  - 단어의 길이는 100을 넘지 않습니다.
- **출력**
  - 두 단어가 아나그램이면 “YES"를 출력하고, 아니면 ”NO"를 출력합니다.
- **예시 입력 1**
  - AbaAeCe
  - baeeACA
- **예시 출력 1**
  - YES
- **예시 입력 2**
  - abaCC
  - Caaab
- **예시 출력 2**
  - NO

## 풀어보기

```java
import java.util.*;
public class Main {

    public static void main(String[] args){
        Scanner in=new Scanner(System.in);
        String str1 = in.next();
        String str2 = in.next();
        solution(str1 , str2);
    }

    public static void solution(String str1 , String str2) {
        Map<Character , Integer> str1Map = new HashMap<>();
        Map<Character , Integer> str2Map = new HashMap<>();

        for(int i = 0 ; i < str1.length() ; i++){
            str1Map.put(str1.charAt(i) , str1Map.getOrDefault(str1.charAt(i) , 0) + 1);
            str2Map.put(str2.charAt(i) , str2Map.getOrDefault(str2.charAt(i) , 0) + 1);
        }
        boolean resultFlag = true;
        Iterator mapIter = str1Map.keySet().iterator();
        while (mapIter.hasNext()){
            char ch = (char) mapIter.next();
            if(!str1Map.get(ch).equals(str2Map.get(ch))){
                resultFlag = false;
                break;
            }
        }
        if(resultFlag){
            System.out.println("YES");
        }
        else System.out.println("NO");
    }
}
```

## 해답

```java
import java.util.*;
class Main {
	public String solution(String s1, String s2){
		String answer="YES";
		HashMap<Character, Integer> map = new HashMap<>();
		for(char x : s1.toCharArray()){
			map.put(x, map.getOrDefault(x, 0)+1);
		}
		for(char x : s2.toCharArray()){
			if(!map.containsKey(x) || map.get(x) == 0) return "NO";
			map.put(x, map.get(x) - 1);
		}
		return answer;
	}

	public static void main(String[] args){
		Main T = new Main();
		Scanner kb = new Scanner(System.in);
		String a = kb.next();
		String b = kb.next();
		System.out.print(T.solution(a, b));
	}
}
```

***

# **`[Hash , Sliding Window]` 매출액의 종류 (실패 - <span style="color:red;">시간초과</span>)**

- **설명**
  - N일 동안의 매출기록을 주고 연속된 K일 동안의 매출액의 종류를 각 구간별로 구합니다.
  - 만약 N=7이고 7일 간의 매출기록이 아래와 같고, 이때 K=4이면
    - 20 12 20 10 23 17 10
  - 각 연속 4일간의 구간의 매출종류는
  - 첫 번째 구간은 [20, 12, 20, 10]는 매출액의 종류가 20, 12, 10으로 3이다.
  - 두 번째 구간은 [12, 20, 10, 23]는 매출액의 종류가 4이다.
  - 세 번째 구간은 [20, 10, 23, 17]는 매출액의 종류가 4이다.
  - 네 번째 구간은 [10, 23, 17, 10]는 매출액의 종류가 3이다.
  - N일간의 매출기록과 연속구간의 길이 K가 주어지면 첫 번째 구간부터 각 구간별
  - 매출액의 종류를 출력하는 프로그램을 작성하세요.
- **입력**
  - 첫 줄에 N(5<=N<=100,000)과 K(2<=K<=N)가 주어집니다.
  - 두 번째 줄에 N개의 숫자열이 주어집니다. 각 숫자는 500이하의 음이 아닌 정수입니다.
- **출력**
  - 첫 줄에 각 구간의 매출액 종류를 순서대로 출력합니다.
- **예시 입력 1**
  - 7 4
  - 20 12 20 10 23 17 10
- **예시 출력 1**
  - 3 4 4 3


## 풀어보기

```java
import java.util.*;
public class Main {

    public static void main(String[] args){
        Scanner in=new Scanner(System.in);
        int input1 = in.nextInt();
        int input2 = in.nextInt();
        int[] arr1 = new int[input1];
        for(int i = 0 ; i < arr1.length ; i++){
            arr1[i] = in.nextInt();
        }
        solution(input1 , input2 , arr1);
    }

    public static void solution(int input1 , int input2 , int[] arr1) {
        Map<Integer , Integer> map = new HashMap<>();
        int leftIndex = 0;

        for(int i = 0 ; i < arr1.length ; i++){
           map.put(arr1[i] , map.getOrDefault(arr1[i], 0) + 1);
           if( i >= input2 - 1){
               System.out.print(map.keySet().stream().filter(key -> map.get(key) > 0).count() + " ");
               map.put(arr1[leftIndex] , map.get(arr1[leftIndex]) - 1);
               leftIndex++;
           }
        }
    }
}
```

## 해답

```java
import java.util.*;
class Main {
    public ArrayList<Integer> solution(int n, int k, int[] arr){
        ArrayList<Integer> answer = new ArrayList<>();
        HashMap<Integer, Integer> HM = new HashMap<>();
        for(int i = 0 ; i < k - 1 ; i++){
            HM.put(arr[i], HM.getOrDefault(arr[i], 0)+1);
        }
        int lt = 0;
        for(int rt = k - 1 ; rt < n ; rt++){
            HM.put(arr[rt], HM.getOrDefault(arr[rt], 0)+1);
            answer.add(HM.size());
            HM.put(arr[lt], HM.get(arr[lt]) - 1);
            if(HM.get(arr[lt]) == 0) HM.remove(arr[lt]);
            lt++;
        }
        return answer;
    }

    public static void main(String[] args){
        Main T = new Main();
        Scanner kb = new Scanner(System.in);
        int n=kb.nextInt();
        int k=kb.nextInt();
        int[] arr=new int[n];
        for(int i=0; i<n; i++){
            arr[i]=kb.nextInt();
        }
        for(int x : T.solution(n, k, arr)) System.out.print(x+" ");
    }
}
```

***

# **`[Hash , Sliding Window - O(n)]` 모든 아나그램 찾기**

- **설명**
  - S문자열에서 T문자열과 아나그램이 되는 S의 부분문자열의 개수를 구하는 프로그램을 작성하세요.
  - 아나그램 판별시 대소문자가 구분됩니다.
  - 부분문자열은 연속된 문자열이어야 합니다.
- **입력**
  - 첫 줄에 첫 번째 S문자열이 입력되고, 두 번째 줄에 T문자열이 입력됩니다.
  - S문자열의 길이는 10,000을 넘지 않으며, T문자열은 S문자열보다 길이가 작거나 같습니다.
- **출력**
  - S단어에 T문자열과 아나그램이 되는 부분문자열의 개수를 출력합니다.
- **예시 입력 1**
  - bacaAacba
  - abc
- **예시 출력 1**
  - 3
