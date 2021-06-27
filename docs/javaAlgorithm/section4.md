---
layout: default
title: HashMap , TreeSet (해쉬 , 정렬지원 Set)
nav_order: 5
parent: 자바 코딩테스트 대비
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# **`[HashMap]` 학급 회장 ✔**
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

## 풀이

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

# **`[HashMap]` 아나그램 ✔**

- **Anagram**이란 두 문자열이 알파벳의 나열 순서를 다르지만 그 구성이 일치하면 두 단어는 아나그램이라고 합니다.

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

## 풀이

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

# **`[Hash , Sliding Window]` [매출액의 종류](https://cote.inflearn.com/contest/10/problem/04-03) ✔**

## 풀어보기

```java
import java.util.*;

class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int input1 = sc.nextInt();
        int input2 = sc.nextInt();
        int[] arr = new int[input1];

        for(int i = 0 ; i < input1 ; i++){
            arr[i] = sc.nextInt();
        }
        HashMap<Integer , Integer> record = new HashMap<>();

        for(int i = 0 ; i < input2 - 1; i++){
            record.put(arr[i] , record.getOrDefault(arr[i] , 0) + 1);
        }

        int leftIndex = 0;
        for(int i = input2 - 1 ; i < arr.length ; i++){
            record.put(arr[i] , record.getOrDefault(arr[i] , 0) + 1);
            System.out.print(record.size() + " ");
            int count = record.get(arr[leftIndex]) - 1;
            if(count == 0){
                record.remove(arr[leftIndex]);
            }
            else record.put(arr[leftIndex] , count);
            leftIndex++;
        }
    }
}
```

## 풀이

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

# **`[Hash , Sliding Window - O(n)]` 모든 아나그램 찾기 ✔**

- S문자열에서 T문자열과 아나그램이 되는 S의 부분문자열의 개수를 구하는 프로그램을 작성하세요.
- 아나그램 판별시 대소문자가 구분됩니다.
- 부분문자열은 연속된 문자열이어야 합니다.
- **예시 입력 1**
  - bacaAacba
  - abc
- **예시 출력 1**
  - 3

## 풀어보기

```java
import java.util.*;
class Main {

    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        String str1 = sc.nextLine();
        String str2 = sc.nextLine();
        byte[] byArr = str2.getBytes();
        int sum = 0;
        for(byte by : byArr) sum += by;
        solution(str1 , str2 , sum);
    }

    public static void solution(String str1 , String str2 , int str2Sum){
        int leftIndex = 0;
        int result = 0;
        int str1Sum = 0;
        for(int i = 0 ; i < str2.length() ; i++) str1Sum += str1.charAt(i);
        for(int i = str2.length() ; i <= str1.length() ; i++){
//            System.out.print(str1.substring(leftIndex , i) + " " + i + " - " + str1Sum + " / ");
            if(str1Sum == str2Sum){
                result++;
            }
            str1Sum -= str1.charAt(leftIndex);
            leftIndex++;
            if(i < str1.length()) str1Sum += str1.charAt(i);
        }
        System.out.println(result);
    }
}
```


## 풀이

### 📌 `aHashMap.equals(bHashMap)`

```java
import java.util.*;
class Main {
    public int solution(String a, String b){
        int answer=0;
        HashMap<Character, Integer> am = new HashMap<>();
        HashMap<Character, Integer> bm = new HashMap<>();
        for(char x : b.toCharArray()) bm.put(x, bm.getOrDefault(x, 0) + 1);
        int L = b.length() - 1;
        for(int i = 0 ; i < L ; i++) am.put(a.charAt(i), am.getOrDefault(a.charAt(i), 0) + 1);
        int lt = 0;
        for(int rt = L ; rt < a.length() ; rt++){
            am.put(a.charAt(rt), am.getOrDefault(a.charAt(rt), 0) + 1);
            if(am.equals(bm)) answer++;
            am.put(a.charAt(lt), am.get(a.charAt(lt)) - 1);
            if(am.get(a.charAt(lt)) == 0) am.remove(a.charAt(lt));
            lt++;
        }
        return answer;
    }


    public static void main(String[] args){
        Main T = new Main();
        Scanner kb = new Scanner(System.in);
        String a=kb.next();
        String b=kb.next();
        System.out.print(T.solution(a, b));
    }
}
```

***

# **`[TreeSet]` [K번째 큰 수](https://cote.inflearn.com/contest/10/problem/04-05) ✔ ~~❌~~**

## 풀어보기

```java
import java.util.*;

class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int input1 = sc.nextInt();
        int input2 = sc.nextInt();
        int[] arr = new int[input1];
        TreeSet<Integer> ts = new TreeSet<>(Collections.reverseOrder());

        for(int i = 0 ; i < input1 ; i++){
            arr[i] = sc.nextInt();
        }

        for(int i = 0 ; i < input1 ; i++){
            for(int j = i + 1 ; j < input1 ; j++){
                for(int k = j + 1 ; k < input1 ; k++){
                    ts.add(arr[i] + arr[j] + arr[k]);
                }
            }
        }
//        System.out.println(ts);
        int cnt = 0;
        boolean isPrint = false;
        for(int value : ts){
            cnt++;
            if(cnt == input2) {
                isPrint = true;
                System.out.print(value);
            }
        }
        if(!isPrint) System.out.println("-1");
    }
}
```

## 풀이

### 📌 `TreeSet<Integer> Tset = new TreeSet<>(Collections.reverseOrder())` 내림차순 자동정렬

```java
import java.util.*;
class Main {
    public int solution(int[] arr, int n, int k){
        int answer=-1;
        TreeSet<Integer> Tset = new TreeSet<>(Collections.reverseOrder());
        for(int i = 0 ; i < n ; i++){
            for(int j=i + 1 ; j < n ; j++){
                for(int l=j + 1 ; l < n ; l++){
                    Tset.add(arr[i] + arr[j] + arr[l]);
                }
            }
        }
        int cnt=0;
        //Tset.remove(143);
        //System.out.println(Tset.size());
        //System.out.println("first : "+ Tset.first());
        //System.out.println("last : "+ Tset.last());

        for(int x : Tset){
            //System.out.println(x);
            cnt++;
            if(cnt == k) return x;
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
        System.out.println(T.solution(arr, n, k));
    }
}

```
