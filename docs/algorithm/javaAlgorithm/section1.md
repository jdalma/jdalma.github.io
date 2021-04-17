---
layout: default
title: String (문자열)
nav_order: 2
parent: 자바 코딩테스트 대비
grand_parent: 알고리즘
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# **문자 찾기 (통과)**

- **설명**
  - 한 개의 문자열을 입력받고, 특정 문자를 입력받아 해당 특정문자가 입력받은 문자열에 몇 개 존재하는지 알아내는 프로그램을 작성하세요.
  - 대소문자를 구분하지 않습니다.문자열의 길이는 100을 넘지 않습니다.
- **입력**
  - 첫 줄에 문자열이 주어지고, 두 번째 줄에 문자가 주어진다.
  - 문자열은 영어 알파벳으로만 구성되어 있습니다.
- **출력**
  - 첫 줄에 해당 문자의 개수를 출력한다.
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

## 해답

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

# **대소문자 변환 (통과)**

- **설명**
  - 대문자와 소문자가 같이 존재하는 문자열을 입력받아 대문자는 소문자로 소문자는 대문자로 변환하여 출력하는 프로그램을 작성하세요.
- **입력**
  - 첫 줄에 문자열이 입력된다. 문자열의 길이는 100을 넘지 않습니다.
  - 문자열은 영어 알파벳으로만 구성되어 있습니다.
- **출력**
  - 첫 줄에 대문자는 소문자로, 소문자는 대문자로 변환된 문자열을 출력합니다.
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


## 해답
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

# **문장 속 단어 (통과)**

- **설명**
  - 한 개의 문장이 주어지면 그 문장 속에서 가장 긴 단어를 출력하는 프로그램을 작성하세요.
  - 문장속의 각 단어는 공백으로 구분됩니다.
- **입력**
  - 첫 줄에 길이가 100을 넘지 않는 한 개의 문장이 주어집니다. 문장은 영어 알파벳으로만 구성되어 있습니다.
- **출력**
  - 첫 줄에 가장 긴 단어를 출력한다. 가장 길이가 긴 단어가 여러개일 경우 문장속에서 가장 앞쪽에 위치한
  - 단어를 답으로 합니다.

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

## 해답

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

# **단어 뒤집기 (통과)**
- **설명**
  - N개의 단어가 주어지면 각 단어를 뒤집어 출력하는 프로그램을 작성하세요.
- **입력**
  - 첫 줄에 자연수 N(3<=N<=20)이 주어집니다.
  - 두 번째 줄부터 N개의 단어가 각 줄에 하나씩 주어집니다. 단어는 영어 알파벳으로만 구성되어 있습니다.
- **출력**
  - N개의 단어를 입력된 순서대로 한 줄에 하나씩 뒤집어서 출력합니다.
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

## 해답

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

# **특정 문자 뒤집기 (통과)**

- **설명**
  - 영어 알파벳과 특수문자로 구성된 문자열이 주어지면 영어 알파벳만 뒤집고,
  - 특수문자는 자기 자리에 그대로 있는 문자열을 만들어 출력하는 프로그램을 작성하세요.
- **입력**
  - 첫 줄에 길이가 100을 넘지 않는 문자열이 주어집니다.
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

## 해답

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

# **중복 문자 제거**

- **설명**
  - 소문자로 된 한개의 문자열이 입력되면 중복된 문자를 제거하고 출력하는 프로그램을 작성하세요.
  - 중복이 제거된 문자열의 각 문자는 원래 문자열의 순서를 유지합니다.
- **입력**
  - 첫 줄에 문자열이 입력됩니다. 문자열의 길이는 100을 넘지 않는다.
- **출력**
  - 첫 줄에 중복문자가 제거된 문자열을 출력합니다.
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

## 해답

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
