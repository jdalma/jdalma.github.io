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
