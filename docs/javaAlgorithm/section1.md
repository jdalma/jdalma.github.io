---
layout: default
title: String (문자열)
nav_order: 2
parent: 자바 코딩테스트 대비
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# **문자 찾기** ✔
- **입출력 예**
  - 입력
    - Computercooler
    - c
  - 출력
    - 2

## 풀어보기

```java
public static void main(String[] args) {
    Scanner in=new Scanner(System.in);
    String input1 = in.nextLine();
    String input2 = in.nextLine();
    char[] input1Arr = input1.toLowerCase().toCharArray();
    char input2Ch = input2.toLowerCase().toCharArray()[0];
    int result = 0;

    for(char ch : input1Arr){
        if(ch == input2Ch){
            result++;
        }
    }

    System.out.println(result);
    return;
}
```

## 풀이

```java
public int solution(String str, char t){
  int answer=0;
  str=str.toUpperCase();
  t=Character.toUpperCase(t);
  //System.out.println(str+" "+t);
  /*for(int i=0; i<str.length(); i++){
    if(str.charAt(i)==t) answer++;
  }*/
  for(char x : str.toCharArray()){
    if(x==t) answer++;
  }
  return answer;
}

public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  String str=kb.next();
  char c=kb.next().charAt(0);
  System.out.print(T.solution(str, c));
}
```

***

# **대소문자 변환** ✔
- **예시 입력 1**
  - StuDY
- **예시 출력 1**
  - sTUdy

## 풀어보기
```java
public static void main(String[] args) {
    Scanner in=new Scanner(System.in);
    String input1 = in.nextLine();
    System.out.println(solution(input1));
}
public static String solution(String input1){
    StringBuilder result = new StringBuilder();
    char[] inputArr = input1.toCharArray();

    for(char ch : inputArr){
        if(ch >= 97) result.append(Character.toUpperCase(ch));
        else result.append(Character.toLowerCase(ch));
    }

    return result.toString();
}
```


## 풀이
### 📌 `Character.isLowerCase()`

```java
public String solution(String str){
  String answer="";
  for(char x : str.toCharArray()){
    if(Character.isLowerCase(x)) answer+=Character.toUpperCase(x);
    else answer+=Character.toLowerCase(x);

  }
  return answer;
}

public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  String str=kb.next();
  System.out.print(T.solution(str));
}
```

```java
public String solution(String str){
  String answer="";
  for(char x : str.toCharArray()){
    if(x>=97 && x<=122) answer+=(char)(x-32);
    else answer+=(char)(x+32);
  }
  return answer;
}

public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  String str=kb.next();
  System.out.print(T.solution(str));
}
```

***

# **문장 속 단어** ✔
- **입력**
  - 첫 줄에 길이가 100을 넘지 않는 한 개의 문장이 주어집니다.
  - 문장은 영어 알파벳으로만 구성되어 있습니다.
- **출력**
  - 첫 줄에 가장 긴 단어를 출력한다.
  - 가장 길이가 긴 단어가 여러개일 경우 문장속에서 가장 앞쪽에 위치한 단어를 답으로 합니다.
- **예시 입력 1**
  - it is time to study
- **예시 출력 1**
  - study

## 풀어보기

```java
public static void main(String[] args) {
    Scanner in=new Scanner(System.in);
    String input1 = in.nextLine();
    System.out.println(solution(input1));
}
public static String solution(String input1){
    String[] inputArr = input1.split(" ");
    String result = "";
    int length = 0;
    for(String tmp : inputArr){
        if(tmp.length() > length) {
            length = tmp.length();
            result = tmp;
        }
    }
    return result;
}
```

## 풀이

```java
public String solution(String str){
  String answer="";
  int m=Integer.MIN_VALUE;
  String[] s = str.split(" ");
  for(String x : s){
    int len=x.length();
    if(len>m){
      m=len;
      answer=x;
    }
  }
  return answer;
}

public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  String str=kb.nextLine();
  System.out.print(T.solution(str));
}
```

### 📌 `while((pos = str.indexOf(' ')) != -1)`
### 📌 `str = str.substring(pos+1);`

```java
public static String solution(String str){
    String answer = "";
    int m = Integer.MIN_VALUE, pos;
    while((pos = str.indexOf(' ')) != -1){
        String tmp = str.substring(0, pos);
        int len = tmp.length();
        if(len > m){
            m = len;
            answer = tmp;
        }
        str = str.substring(pos+1);
    }
    if(str.length() > m) answer = str;
    return answer;
}

public static void main(String[] args){
    Scanner kb = new Scanner(System.in);
    String str = kb.nextLine();
    System.out.print(solution(str));
}
```

***

# **단어 뒤집기**  ✔
- **예시 입력 1**
  - 3
  - good
  - Time
  - Big
- **예시 출력 1**
  - doog
  - emiT
  - giB

## 풀어보기

```java
public static void main(String[] args) {
    Scanner in=new Scanner(System.in);
    int input1 = in.nextInt();
    for(int i = 0 ; i < input1 ; i++){
        System.out.println(solution(in.next()));
    }
}
public static String solution(String input2){
    StringBuilder result = new StringBuilder(input2);
    return result.reverse().toString();
}
```

## 풀이

```java
public ArrayList<String> solution(int n, String[] str){
  ArrayList<String> answer = new ArrayList<>();
  for(String x : str){
    String tmp = new StringBuilder(x).reverse().toString();
    answer.add(tmp);
  }
  return answer;
}

public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  int n = kb.nextInt();
  String[] str = new String[n];
  for(int i = 0 ; i < n ; i++){
    str[i] = kb.next();
  }
  for(String x : T.solution(n, str)){
    System.out.println(x);
  }
}
```

### 📌 `int lt = 0, rt = x.length() - 1` index 사용

```java
public ArrayList<String> solution(int n, String[] str){
  ArrayList<String> answer = new ArrayList<>();
  for(String x : str){
    char[] s = x.toCharArray();
    int lt = 0, rt = x.length() - 1;
    while(lt < rt){
      char tmp = s[lt];
      s[lt] = s[rt];
      s[rt] = tmp;
      lt++;
      rt--;
    }
    String tmp = String.valueOf(s);
    answer.add(tmp);
  }
  return answer;
}

public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  int n = kb.nextInt();
  String[] str = new String[n];
  for(int i = 0 ; i < n ; i++){
    str[i] = kb.next();
  }
  for(String x : T.solution(n, str)){
    System.out.println(x);
  }
}
```
***

# **특정 문자 뒤집기  ✔**
- **출력**
  - 첫 줄에 알파벳만 뒤집힌 문자열을 출력합니다.
- **예시 입력 1**
  - a#b!GE*T@S
- **예시 출력 1**
  - S#T!EG*b@a


## 풀어보기

### `Character.isAlphabetic(charArr[i])`

```java
public static void main(String[] args) {
    Scanner in=new Scanner(System.in);
    String input1 = in.next();
    System.out.println(solution(input1));
}
public static String solution(String input1){
    char[] charArr = input1.toCharArray();
    char[] resultArr = new char[input1.length()];

    for(int i = 0 ; i < charArr.length ; i++){
        if(!Character.isAlphabetic(charArr[i])) resultArr[i] = charArr[i];
        else resultArr[i] = 'q';
    }

    for(int i = 0 ; i < charArr.length ; i++){
        if(resultArr[i] == 'q'){
            for(int j = charArr.length - 1 ; j >= 0 ; j--){
                if(Character.isAlphabetic(charArr[j])) {
                    resultArr[i] = charArr[j];
                    charArr[j] = '!';
                    break;
                }
            }
        }
    }
    return String.valueOf(resultArr);
}
```

## 풀이

### 📌 `int lt = 0, rt = x.length() - 1` index 사용

```java
public String solution(String str){
  String answer;
  char[] s = str.toCharArray();
  int lt = 0, rt = str.length() - 1;
  while(lt < rt){
    if(!Character.isAlphabetic(s[lt])) lt++;
    else if(!Character.isAlphabetic(s[rt])) rt--;
    else{
      char tmp = s[lt];
      s[lt] = s[rt];
      s[rt] = tmp;
      lt++;
      rt--;
    }
  }
  answer = String.valueOf(s);
  return answer;
}

public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  String str = kb.next();
  System.out.println(T.solution(str));
}
```

***

# **중복 문자 제거  ✔**
- **예시 입력 1**
  - ksekkset
- **예시 출력 1**
  - kset

## 풀어보기

```java
public static void main(String[] args){
    Scanner kb = new Scanner(System.in);
    String str = kb.nextLine();
    System.out.print(solution(str));
}

public static String solution(String str){
    StringBuilder result = new StringBuilder();
    char[] charArr = str.toCharArray();

    for(int i = 0 ; i < charArr.length ; i++){
        if(charArr[i] != 0){
            for(int k = i + 1; k < charArr.length ; k++){
                if(charArr[i] == charArr[k]){
                    charArr[k] = 0;
                }
            }
            result.append(charArr[i]);
        }
    }
    return result.toString();
}
```

## 풀이

### 📌 `if(str.indexOf(str.charAt(i)) == i) answer += str.charAt(i);`

``` java
System.out.println(str.charAt(i) + " " + i + " " + str.indexOf(str.charAt(i)));

ksekkset
k 0 0
s 1 1
e 2 2
k 3 0
k 4 0
s 5 1
e 6 2
t 7 7
```

```java
public String solution(String str){
  String answer = "";
  for(int i = 0 ; i < str.length() ; i++){
    //System.out.println(str.charAt(i)+" "+i+" "+str.indexOf(str.charAt(i)));
    if(str.indexOf(str.charAt(i)) == i) answer += str.charAt(i);
  }
  return answer;
}

public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  String str = kb.next();
  System.out.print(T.solution(str));
}
```

***

# **회문 문자열  ✔**
- **예시 입력 1**
  - gooG
- **예시 출력 1**
  - YES

## 풀어보기

```java
public static void main(String[] args){
    Scanner kb = new Scanner(System.in);
    String str = kb.next();
    System.out.print(solution(str));
}


public static String solution(String str){
    String answer = "";
    char[] charArr = str.toLowerCase().toCharArray();
    int left = 0 , right = str.length() - 1;
    while (left < right){
        if(charArr[left] != charArr[right]){
            return "NO";
        }
        left++;
        right--;
    }
    return "YES";
}
```

## 풀이

### 📌 `for(int i = 0 ; i < len / 2 ; i++)` ➜ `if(str.charAt(i) != str.charAt(len - i - 1))`

```java
public String solution(String str){
  String answer = "YES";
  str = str.toUpperCase();
  int len = str.length();
  for(int i = 0 ; i < len / 2 ; i++){
    if(str.charAt(i) != str.charAt(len - i - 1)) answer = "NO";
  }
  return answer;
}

public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  String str = kb.next();
  System.out.print(T.solution(str));
}
```

### 📌 `if(string1.equalsIgnoreCase(String2)) answer = "YES"` - 대문자,소문자 무시

```java
public String solution(String str){
  String answer = "NO";
  String tmp = new StringBuilder(str).reverse().toString();
  if(str.equalsIgnoreCase(tmp)) answer = "YES";
  return answer;
}

public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  String str = kb.next();
  System.out.print(T.solution(str));
}
```

***

# **유효한 팰린드롬 ❌**
<!--
- **설명**
  - 앞에서 읽을 때나 뒤에서 읽을 때나 같은 문자열을 팰린드롬이라고 합니다.
  - 문자열이 입력되면 해당 문자열이 팰린드롬이면 "YES"
  - 아니면 “NO"를 출력하는 프로그램을 작성하세요.
  - 단 회문을 검사할 때 알파벳만 가지고 회문을 검사하며, 대소문자를 구분하지 않습니다.
  - 알파벳 이외의 문자들의 무시합니다.
- **입력**
  - 첫 줄에 길이 100을 넘지 않는 공백이 없는 문자열이 주어집니다.
- **출력**
  - 첫 번째 줄에 팰린드롬인지의 결과를 YES 또는 NO로 출력합니다.
-->
- **예시 입력 1**
  - found7, time: study; Yduts; emit, 7Dnuof
- **예시 출력 1**
  - YES

## 풀이

### 📌`s.toUpperCase().replaceAll("[^A-Z]", "")`

```java
public String solution(String s){
  String answer = "NO";
  s = s.toUpperCase().replaceAll("[^A-Z]", "");
  String tmp = new StringBuilder(s).reverse().toString();
  if(s.equals(tmp)) answer = "YES";
  return answer;
}

public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  String str = kb.nextLine();
  System.out.print(T.solution(str));
}
```

***

# **숫자만 추출 ✔**
- **예시 입력 1**
  - g0en2T0s8eSoft
- **예시 출력 1**
  - 208

## 풀어보기

### `return Integer.parseInt(s.replaceAll("[^0-9]" , ""))`

```java
public static void main(String[] args){
    Scanner kb = new Scanner(System.in);
    String str=kb.nextLine();
    System.out.print(solution(str));
}

public static int solution(String s){
    return Integer.parseInt(s.replaceAll("[^0-9]" , ""));
}
```

## 풀이

### 📌 1. `if(x >= 48 && x <= 57) answer = answer * 10 + (x - 48);`
### 📌 2. `answer=answer*10 + Character.getNumericValue(x)`
### 📌 3. `if(Character.isDigit(x)) answer+=x`

```java
public int solution(String s){
  //int answer=0;
  String answer="";
  for(char x : s.toCharArray()){
//    if(x>=48 && x<=57) answer=answer*10+(x-48);
//    if(Character.isDigit(x)){
//      answer=answer*10+ Character.getNumericValue(x);
//    }
    if(Character.isDigit(x)) answer+=x;
  }
  return Integer.parseInt(answer);
}

public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  String str=kb.next();
  System.out.print(T.solution(str));
}
```

***

# **가장 짧은 문자거리 ✔**
- **예시 입력 1**
  - teachermode e
- **예시 출력 1**
  - 1 0 1 2 1 0 1 2 2 1 0

## 풀어보기

```java
public static void main(String[] args){
    Scanner kb = new Scanner(System.in);
    String str=kb.next();
    char c=kb.next().charAt(0);
    for(int x : solution(str, c)){
        System.out.print(x+" ");
    }
}

public static int[] solution(String s , char c){
    int[] result = new int[s.length()];
    for(int i = 0 ; i < result.length ; i++) result[i] = 9;
    char[] charArr = s.toCharArray();

    for(int i = 0 ; i < charArr.length ; i++){
        if(charArr[i] == c){
            result[i] = 0;
            int left = i , right = i;
            for(int k = 0 ; k < charArr.length ; k++){
                int leftVal = Math.abs(Math.abs(--left) - i);
                int rightVal = ++right - i;

                if(left >= 0 && result[left] > leftVal) result[left] = leftVal;
                if(right < charArr.length && result[right] > rightVal) result[right] = rightVal;
            }
        }
    }
//        System.out.println(Arrays.toString(result));
    return result;
}
```

## 풀이

### 반복문을 돌며 target을 찾아 left, right index를 따로 계산하였지만,
### 풀이는 왼쪽에서 오른쪽으로 1번 , 오른쪽에서 왼쪽 1번으로 해결

|  | t  | e | a  | c | h  | e | r  | m | o  | d | e  |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| left ➜ right  | 1001  | 0 | 1  | 2 | 3  | 0 | 1  | 2 | 3 | 4 | 0 |
| right ➜ left  | 1  | 0 | 1 | 2 | 1 | 0 | 1 | 2 | 2  | 1 | 0  |


```java
public int[] solution(String s, char t){
  int[] answer = new int[s.length()];
  int p = 1000;
  for(int i = 0 ; i < s.length() ; i++){
    if(s.charAt(i) == t){
      p = 0;
      answer[i] = p;
    }
    else{
      p++;
      answer[i] = p;
    }
  }
  p = 1000;
  for(int i = s.length() - 1 ; i >= 0 ; i--){
    if(s.charAt(i) == t) p = 0;
    else{
      p++;
      answer[i] = Math.min(answer[i], p);
    }
  }
  return answer;
}

public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  String str = kb.next();
  char c = kb.next().charAt(0);
  for(int x : T.solution(str, c)){
    System.out.print(x + " ");
  }
}
```

***

# **문자열 압축 ✔**
- **예시 입력 1**
  - KKHSSSSSSSE
- **예시 출력 1**
  - K2HS7E

## 풀어보기

```java
public static void main(String[] args){
    Scanner kb = new Scanner(System.in);
    String str=kb.next();
    System.out.println(solution(str));
}

public static String solution(String s){
    char[] charArr = s.toCharArray();
    StringBuilder result = new StringBuilder();

    for(int i = 0 ; i < charArr.length ; i++){
        int count = 1;
        if(charArr[i] != 0){
            for(int k = i + 1; k < charArr.length ; k++){
                if(charArr[i] == charArr[k]){
                    count++;
                    charArr[k] = 0;
                }
                else break;
            }
            result.append(charArr[i]);
            if(count != 1) result.append(count);
        }
    }
    return result.toString();
}
```

## 풀이

### 📌 char[]로 바꾸기 보단 `s.charAt()` 과 `s.valueOf()` 활용

```java
public String solution(String s){
  String answer = "";
  s = s + " ";
  int cnt = 1;
  for(int i = 0 ; i < s.length() - 1 ; i++){
    if(s.charAt(i) == s.charAt(i + 1)) cnt++;
    else{
      answer += s.charAt(i);
      if(cnt > 1) answer += String.valueOf(cnt);
      cnt = 1;
    }
  }
  return answer;
}

public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  String str = kb.next();
  System.out.println(T.solution(str));
}
```

***

# **암호✔**
1. `“#*****#”`를 일곱자리의 이진수로 바꿉니다. #은 이진수의 1로, *이진수의 0으로 변환합니다. 결과는 “1000001”로 변환됩니다.
2. 바뀐 2진수를 10진수화 합니다. “1000001”을 10진수화 하면 65가 됩니다.
3. 아스키 번호가 65문자로 변환합니다. 즉 아스크번호 65는 대문자 'A'입니다.
    - 참고로 대문자들의 아스키 번호는 'A'는 65번, ‘B'는 66번, ’C'는 67번 등 차례대로 1씩 증가하여 ‘Z'는 90번입니다.

- 4개의 문자를 다음과 같이 신호로 보냈다면
  - `#****###**#####**#####**##**`
- 이 신호를 4개의 문자신호로 구분하면
  - `#****## ➜ 'C'`
  - `#**#### ➜ 'O'`
  - `#**#### ➜ 'O'`
  - `#**##** ➜ 'L'`
- 최종적으로 “COOL"로 해석됩니다.
- **입력**
  - 첫 줄에는 보낸 문자의 개수(10을 넘지 안습니다)가 입력된다.
  - 다음 줄에는 문자의 개수의 일곱 배 만큼의 #또는 * 신호가 입력됩니다.
  - 항상 대문자로 해석할 수 있는 신호를 보낸다고 가정합니다.
- **출력**
  - 해석한 문자열을 출력합니다.

- **예시 입력 1**
  - 4
  - `#****###**#####**#####**##**`
- **예시 출력 1**
  - COOL

## 풀어보기

```java
public static void main(String[] args){
    Scanner kb = new Scanner(System.in);
    int n=kb.nextInt();
    String str=kb.next();
    System.out.println(solution(n, str));
}

public static String solution(int n , String s){
    StringBuilder alphabet = new StringBuilder();
    StringBuilder result = new StringBuilder();

    for(int i = 0 ; i < s.length() ; i++){
        if('#' == s.charAt(i)) alphabet.append("1");
        else alphabet.append("0");
        if((i + 1) % 7 == 0){
            result.append((char) Integer.parseInt(alphabet.toString() , 2));
            alphabet.setLength(0);
        }
    }
    return result.toString();
}
```

## 풀이

### 📌 `String tmp = s.substring(0, 7).replace('#', '1').replace('*', '0')`
### 📌 `Integer.parseInt(tmp, 2)`

```java
public String solution(int n, String s){
  String answer = "";
  for(int i = 0 ; i < n ; i++){
    String tmp = s.substring(0, 7).replace('#', '1').replace('*', '0');
    int num = Integer.parseInt(tmp, 2);
    answer += (char)num;
    s = s.substring(7);
  }
  return answer;
}

public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  int n = kb.nextInt();
  String str = kb.next();
  System.out.println(T.solution(n, str));
}
```
