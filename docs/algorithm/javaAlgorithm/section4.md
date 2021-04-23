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
<!--
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
-->
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
<!--
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
-->
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

# **`[Hash , Sliding Window]` 매출액의 종류 (<span style="color:red;">실패 - 시간초과</span>)**
<!--
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
-->
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

# **`[Hash , Sliding Window - O(n)]` 모든 아나그램 찾기 (통과)**
<!--
- **설명**
  - S문자열에서 T문자열과 아나그램이 되는 S의 부분문자열의 개수를 구하는 프로그램을 작성하세요.
  - 아나그램 판별시 대소문자가 구분됩니다.
  - 부분문자열은 연속된 문자열이어야 합니다.
- **입력**
  - 첫 줄에 첫 번째 S문자열이 입력되고, 두 번째 줄에 T문자열이 입력됩니다.
  - S문자열의 길이는 10,000을 넘지 않으며, T문자열은 S문자열보다 길이가 작거나 같습니다.
- **출력**
  - S단어에 T문자열과 아나그램이 되는 부분문자열의 개수를 출력합니다.
-->
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


## 해답

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

# **`[TreeSet]` K번째 큰 수 (<span style="color:red;">실패</span>)**
<!--
- **설명**
  - 1부터 100사이의 자연수가 적힌 N장의 카드를 가지고 있습니다.
  - 같은 숫자의 카드가 여러장 있을 수 있습니다.
  - 이 중 3장을 뽑아 각 카드에 적힌 수를 합한 값을 기록하려고 합니다.
  - 3장을 뽑을 수 있는 모든 경우를 기록합니다.
  - 기록한 값 중 K번째로 큰 수를 출력하는 프로그램을 작성하세요.
  - 만약 큰 수부터 만들어진 수가 25 25 23 23 22 20 19......이고 K값이 3이라면 K번째 큰 값은 22입니다.
- **입력**
  - 첫 줄에 자연수 N(3<=N<=100)과 K(1<=K<=50) 입력되고, 그 다음 줄에 N개의 카드값이 입력된다.
- **출력**
  - 첫 줄에 K번째 수를 출력합니다. K번째 수가 존재하지 않으면 -1를 출력합니다.
-->
- **예시 입력 1**
  - 10 3
  - 13 15 34 23 45 65 33 11 26 42
- **예시 출력 1**
  - 143

## 해답

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

***

# **`[Stack]` 쇠 막대기 (통과)**
<!--
- **설명**
  - 여러 개의 쇠막대기를 레이저로 절단하려고 한다.
  - 효율적인 작업을 위해서 쇠막대기를 아래에서 위로 겹쳐 놓고, 레이저를 위에서 수직으로 발사하여 쇠막대기들을 자른다.
- **쇠막대기와 레이저의 배치는 다음 조건을 만족한다.**
  - 쇠막대기는 자신보다 긴 쇠막대기 위에만 놓일 수 있다.
  - 쇠막대기를 다른 쇠막대기 위에 놓는 경우 완전히 포함되도록 놓되, 끝점은 겹치지 않도록 놓는다.
  - 각 쇠막대기를 자르는 레이저는 적어도 하나 존재한다.
  - 레이저는 어떤 쇠막대기의 양 끝점과도 겹치지 않는다.
  - 아래 그림은 위 조건을 만족하는 예를 보여준다.
  - 수평으로 그려진 굵은 실선은 쇠막대기이고, 점은 레이저의 위치, 수직으로 그려진 점선 화살표는 레이저의 발사 방향이다.

![](../../../assets/images/algorithm/section4/3.png)

- 이러한 레이저와 쇠막대기의 배치는 다음과 같이 괄호를 이용하여 왼쪽부터 순서대로 표현할 수 있다.

1. 레이저는 여는 괄호와 닫는 괄호의 인접한 쌍 ‘( ) ’ 으로 표현된다. 또한, 모든 ‘( ) ’는 반 드시 레이저를 표현한다.
2. 쇠막대기의 왼쪽 끝은 여는 괄호 ‘ ( ’ 로, 오른쪽 끝은 닫힌 괄호 ‘) ’ 로 표현된다.
  - 위 예의 괄호 표현은 그림 위에 주어져 있다.
  - 쇠막대기는 레이저에 의해 몇 개의 조각으로 잘려지는데, 위 예에서 가장 위에 있는 두 개의 쇠막대기는 각각 3개와 2개의 조각으로 잘려지고, 이와 같은 방식으로 주어진 쇠막대기들은 총 17개의 조각으로 잘려진다.
  - 쇠막대기와 레이저의 배치를 나타내는 괄호 표현이 주어졌을 때, 잘려진 쇠막대기 조각의 총 개수를 구하는 프로그램을 작성하시오.
- **입력**
  - 한 줄에 쇠막대기와 레이저의 배치를 나타내는 괄호 표현이 공백없이 주어진다.
  - 괄호 문자의 개수는 최대 100,000이다.
- **출력**
  - 잘려진 조각의 총 개수를 나타내는 정수를 한 줄에 출력한다.
-->
![](../../../assets/images/algorithm/section4/3.png)

- **예시 입력 1**
  - ()(((()())(())()))(())
- **예시 출력 1**
  - 17
- **예시 입력 2**
  - (((()(()()))(())()))(()())
- **예시 출력 2**
  - 24

## 풀어보기

```java
import java.util.*;
class Main {

    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        String str1 = sc.nextLine();
        solution(str1);
    }

    public static void solution(String str1){
        Stack<Character> stack = new Stack<>();
        int result = 0;
        int leftIndex = -1;
        int open = 0;
        for(int i = 0 ; i < str1.length(); i++){
            if(!stack.isEmpty() && stack.peek() == '(' && str1.charAt(i) == ')') {
                stack.add(str1.charAt(i));
                open--;
                result += open;
            }
            else if(str1.charAt(i) == ')'){
                open--;
                result++;
            }
            else {
                stack.add(str1.charAt(i));
                open++;
            }
        }
        System.out.println(result);
    }
}
```
```
(((()(()()))(())()))(()())
[(, (, (, (, )] / 3
[(, (, (, (, ), (, (, )] / 7
[(, (, (, (, ), (, (, ), (, )] / 11
[(, (, (, (, ), (, (, ), (, ), (, (, )] / 16
[(, (, (, (, ), (, (, ), (, ), (, (, ), (, )] / 19
[(, (, (, (, ), (, (, ), (, ), (, (, ), (, ), (, (, )] / 22
[(, (, (, (, ), (, (, ), (, ), (, (, ), (, ), (, (, ), (, )] / 23
24
```
## 해답

```java
import java.util.*;
class Main {
    public int solution(String str){
        int cnt = 0;
        Stack<Character> stack = new Stack<>();
        for(int i = 0 ; i < str.length() ; i++){
            if(str.charAt(i) == '(') stack.push('(');
            else{
                stack.pop();
                if(str.charAt(i - 1) == '(') cnt += stack.size();
                else cnt++;
            }
        }
        return cnt;
    }
    public static void main(String[] args){
        Main T = new Main();
        Scanner kb = new Scanner(System.in);
        String str = kb.next();
        System.out.println(T.solution(str));
    }
}
```

***

# **`[Queue]` 공주 구하기 (<span style="color:red;">실패</span>)**
<!--
- **설명**
  - 정보 왕국에는 왕자가 N명이 있는데 서로 공주를 구하러 가겠다고 합니다.
  - 왕은 왕자들을 나이 순으로 1번부터 N번까지 차례로 번호를 매긴다.
  - 그리고 1번 왕자부터 N번 왕자까지 순서대로 시계 방향으로 돌아가며 동그랗게 앉게 한다.
  - 그리고 1번 왕자부터 시계방향으로 돌아가며 1부터 시작하여 번호를 외치게 한다.
  - 한 왕자가 K(특정숫자)를 외치면 그 왕자는 공주를 구하러 가는데서 제외되고 원 밖으로 나오게 된다.
  - 그리고 다음 왕자부터 다시 1부터 시작하여 번호를 외친다.
  - 이렇게 해서 마지막까지 남은 왕자가 공주를 구하러 갈 수 있다.

![](../../../assets/images/algorithm/section4/4.png)

  - 예를 들어 총 8명의 왕자가 있고, 3을 외친 왕자가 제외된다고 하자.
  - 처음에는 3번 왕자가 3을 외쳐 제외된다.
  - 이어 6, 1, 5, 2, 8, 4번 왕자가 차례대로 제외되고 마지막까지 남게 된 7번 왕자에게 공주를 구하러갑니다.
  - N과 K가 주어질 때 공주를 구하러 갈 왕자의 번호를 출력하는 프로그램을 작성하시오.
-->
- **입력**
  - 첫 줄에 자연수 N(5<=N<=1,000)과 K(2<=K<=9)가 주어진다.
- **출력**
  - 첫 줄에 마지막 남은 왕자의 번호를 출력합니다.


![](../../../assets/images/algorithm/section4/4.png)

- **예시 입력 1**
  - 8 3
- **예시 출력 1**
  - 7

## 해답

```java
import java.util.*;
class Main {
    public int solution(int n, int k){
        int answer=0;
        Queue<Integer> Q=new LinkedList<>();
        for(int i=1; i<=n; i++) Q.offer(i);
        while(!Q.isEmpty()){
            for(int i=1; i<k; i++) Q.offer(Q.poll());
            Q.poll();
            if(Q.size()==1) answer=Q.poll();
        }
        return answer;
    }
    public static void main(String[] args){
        Main T = new Main();
        Scanner kb = new Scanner(System.in);
        int n=kb.nextInt();
        int k=kb.nextInt();
        System.out.println(T.solution(n, k));
    }
}
```

***

# **`[Queue]` 교육과정 설계 (통과)**

<!--
- **설명**
  - 수업중에는 필수과목이 있습니다.
  - 이 필수과목은 반드시 이수해야 하며, 그 순서도 정해져 있습니다.
  - 만약 총 과목이 A, B, C, D, E, F, G가 있고, 여기서 필수과목이 CBA로 주어지면 필수과목은 C, B, A과목이며 이 순서대로 꼭 수업계획을 짜야 합니다.
  - 여기서 순서란 B과목은 C과목을 이수한 후에 들어야 하고, A과목은 C와 B를 이수한 후에 들어야 한다는 것입니다.
  - 현수가 C, B, D, A, G, E로 수업계획을 짜면 제대로 된 설계이지만
  - C, G, E, A, D, B 순서로 짰다면 잘 못 설계된 수업계획이 됩니다.
  - 수업계획은 그 순서대로 앞에 수업이 이수되면 다음 수업을 시작하다는 것으로 해석합니다.
  - 수업계획서상의 각 과목은 무조건 이수된다고 가정합니다.
  - 필수과목순서가 주어지면 짠 N개의 수업설계가 잘된 것이면 “YES", 잘못된 것이면 ”NO“를 출력하는 프로그램을 작성하세요.
-->
- **입력**
  - 첫 줄에 한 줄에 필수과목의 순서가 주어집니다. 모든 과목은 영문 대문자입니다.
  - 두 번 째 줄부터 현수가 짠 수업설계가 주어집니다.(수업설계의 길이는 30이하이다)
- **출력**
  - 첫 줄에 수업설계가 잘된 것이면 “YES", 잘못된 것이면 ”NO“를 출력합니다.
- **예시 입력 1**
  - CBA
  - CBDAGE
- **예시 출력 1**
  - YES


## 풀어보기 (프로그래머스 LV2 - 스킬찍기와 동일)

```java
import java.util.*;
class Main {

    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        String input1 = sc.nextLine();
        String input2 = sc.nextLine();
        solution(input1 , input2);
    }

    public static void solution(String input1 , String input2){
        if(input2.replaceAll("[^" + input1 + "]" , "").indexOf(input1) == 0){
            System.out.println("YES");
        }
        else{
            System.out.println("NO");
        }
    }
}

```

## 해답

```java
import java.util.*;
class Main {
    public String solution(String need, String plan){
        String answer = "YES";
        Queue<Character> Q = new LinkedList<>();
        for(char x : need.toCharArray()) Q.offer(x);
        for(char x : plan.toCharArray()){
            if(Q.contains(x)){
                if(x != Q.poll()) return "NO";
            }
        }
        if(!Q.isEmpty()) return "NO";
        return answer;
    }
    public static void main(String[] args){
        Main T = new Main();
        Scanner kb = new Scanner(System.in);
        String a = kb.next();
        String b = kb.next();
        System.out.println(T.solution(a, b));
    }
}
```

***

# **`[Queue - Person객체]` 응급실 (<span style="color:red;">실패</span>)**
<!--
- **설명**
  - 응급실은 환자가 도착한 순서대로 진료를 합니다.
  - 하지만 위험도가 높은 환자는 빨리 응급조치를 의사가 해야 합니다.
  - 이런 문제를 보완하기 위해 응급실은 다음과 같은 방법으로 환자의 진료순서를 정합니다.
  - 환자가 접수한 순서대로의 목록에서 제일 앞에 있는 환자목록을 꺼냅니다.
  - 나머지 대기 목록에서 꺼낸 환자 보다 위험도가 높은 환자가 존재하면 대기목록 제일 뒤로 다시 넣습니다. 그렇지 않으면 진료를 받습니다.
  - 즉 대기목록에 자기 보다 위험도가 높은 환자가 없을 때 자신이 진료를 받는 구조입니다.
  - 현재 N명의 환자가 대기목록에 있습니다.
  - N명의 대기목록 순서의 환자 위험도가 주어지면, 대기목록상의 M번째 환자는 몇 번째로 진료를 받는지 출력하는 프로그램을 작성하세요.
  - 대기목록상의 M번째는 대기목록의 제일 처음 환자를 0번째로 간주하여 표현한 것입니다.
-->
- **입력**
  - 첫 줄에 자연수 N`(5<=N<=100)`과 M`(0<=M<N)` 주어집니다.
  - 두 번째 줄에 접수한 순서대로 환자의 위험도(50<=위험도<=100)가 주어집니다.
  - 위험도는 값이 높을 수록 더 위험하다는 뜻입니다. 같은 값의 위험도가 존재할 수 있습니다.
- **출력**
  - M번째 환자의 몇 번째로 진료받는지 출력하세요.
- **예시 입력 1**
  - 5 2
  - 60 50 70 80 90
- **예시 출력 1**
  - 3
- **예시 입력 2**
  - 6 3
  - 70 60 90 60 60 60
- **예시 출력 2**
  - 4

## 해답

```java
import java.util.*;

class Person{
    int id;
    int priority;
    public Person(int id, int priority){
        this.id=id;
        this.priority=priority;
    }
}

class Main {
    public int solution(int n, int m, int[] arr){
        int answer = 0 ;
        Queue<Person> Q = new LinkedList<>();
        for(int i = 0 ; i < n ; i++){
            Q.offer(new Person(i, arr[i]));
        }
        while(!Q.isEmpty()){
            Person tmp = Q.poll();
            for(Person x : Q){
                if(x.priority > tmp.priority){
                    Q.offer(tmp);
                    tmp = null;
                    break;
                }
            }
            if(tmp != null){
                answer++;
                if(tmp.id == m) return answer;
            }
        }
        return answer;
    }

    public static void main(String[] args){
        Main T = new Main();
        Scanner kb = new Scanner(System.in);
        int n = kb.nextInt();
        int m = kb.nextInt();
        int[] arr = new int[n];
        for(int i = 0 ; i < n ; i++){
            arr[i] = kb.nextInt();
        }
        System.out.println(T.solution(n, m, arr));
    }
}
```
