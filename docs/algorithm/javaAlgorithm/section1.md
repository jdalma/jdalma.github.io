---
layout: default
title: Section 1. String (문자열)
nav_order: 2
parent: 자바 코딩테스트 대비
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## **문자 찾기 (완료)**

### 풀어보기
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

### 해답

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
