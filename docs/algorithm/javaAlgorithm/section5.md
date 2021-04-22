---
layout: default
title: Stack , Queue (자료구조)
nav_order: 6
parent: 자바 코딩테스트 대비
grand_parent: 알고리즘
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# **`[Stack]` 올바른 괄호 (통과)**
- **설명**
  - 괄호가 입력되면 올바른 괄호이면 “YES", 올바르지 않으면 ”NO"를 출력합니다.
  - (())() 이것은 괄호의 쌍이 올바르게 위치하는 거지만, (()()))은 올바른 괄호가 아니다.
- **입력**
  - 첫 번째 줄에 괄호 문자열이 입력됩니다. 문자열의 최대 길이는 30이다.
- **출력**
  - 첫 번째 줄에 YES, NO를 출력한다.
- **예시 입력 1**
  - (()(()))(()
- **예시 출력 1**
  - NO

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
        Queue<Character> que = new LinkedList<>();
        boolean result = true;
        for(int i = 0 ; i < str1.length() ; i++){
            if(que.size() == 0 && str1.charAt(i) == 41) {
                result = false;
                break;
            }
            else if(str1.charAt(i) == 40) que.add(str1.charAt(i));
            else que.poll();
        }
        if(que.size() != 0 || !result){
            System.out.println("NO");
        }
        else{
            System.out.println("YES");
        }
    }
}
```

## 해답

### ✋ Stack의 대표 문제

```java
import java.util.*;
class Main {
    public String solution(String str){
        String answer = "YES";
        Stack<Character> stack = new Stack<>();
        for(char x : str.toCharArray()){
            if(x == '(') stack.push(x);
            else{
                if(stack.isEmpty()) return "NO";
                stack.pop();
            }
        }
        if(!stack.isEmpty()) return "NO";
        return answer;
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

# **`[Stack]` 괄호 문자 제거 (통과)**
- **설명**
  - 입력된 문자열에서 소괄호 ( ) 사이에 존재하는 모든 문자를 제거하고 남은 문자만 출력하는 프로그램을 작성하세요.
- **입력**
  - 첫 줄에 문자열이 주어진다. 문자열의 길이는 100을 넘지 않는다.
- **출력**
  - 남은 문자만 출력한다.
- **예시 입력 1**
  - (A(BC)D)EF(G(H)(IJ)K)LM(N)
- **예시 출력 1**
  - EFLM

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
        for(char ch : str1.toCharArray()){
            if(ch != ')'){
                stack.add(ch);
            }
            else{
                while(stack.pop() != '(');
            }
        }
        for (Character character : stack) {
            System.out.print(character);
        }

    }
}

```


## 해답

```java
import java.util.*;
class Main {
    public String solution(String str){
        String answer = "";
        Stack<Character> stack = new Stack<>();
        for(char x : str.toCharArray()){
            if(x == ')'){
                while(stack.pop() != '(');
            }
            else stack.push(x);
        }
        for(int i = 0 ; i < stack.size() ; i++) answer += stack.get(i);
        return answer;
    }

    public static void main(String[] args){
        Main T = new Main();
        Scanner kb = new Scanner(System.in);
        String str=kb.next();
        System.out.println(T.solution(str));
    }
}
```

***

# **`[Stack]` 크레인 인형뽑기 - 카카오 (통과)**

- **설명**
  - 게임 화면은 1 x 1 크기의 칸들로 이루어진 N x N 크기의 정사각 격자이며 위쪽에는 크레인이 있고 오른쪽에는 바구니가 있습니다.
  - 각 격자 칸에는 다양한 인형이 들어 있으며 인형이 없는 칸은 빈칸입니다.
  - 모든 인형은 1 x 1 크기의 격자 한 칸을 차지하며 격자의 가장 아래 칸부터 차곡차곡 쌓여 있습니다.
  - 게임 사용자는 크레인을 좌우로 움직여서 멈춘 위치에서 가장 위에 있는 인형을 집어 올릴 수 있습니다.
  - 집어 올린 인형은 바구니에 쌓이게 되는 데, 이때 바구니의 가장 아래 칸부터 인형이 순서대로 쌓이게 됩니다.
  - 만약 같은 모양의 인형 두 개가 바구니에 연속해서 쌓이게 되면 두 인형은 터뜨려지면서 바구니에서 사라지게 됩니다.
  - 위 상태에서 이어서 [5번] 위치에서 인형을 집어 바구니에 쌓으면 같은 모양 인형 두 개가 없어집니다.
  - 크레인 작동 시 인형이 집어지지 않는 경우는 없으나 만약 인형이 없는 곳에서 크레인을 작동시키는 경우에는 아무런 일도 일어나지 않습니다.
  - 또한 바구니는 모든 인형이 들어갈 수 있을 만큼 충분히 크다고 가정합니다.
  - 게임 화면의 격자의 상태가 담긴 2차원 배열 board와 인형을 집기 위해 크레인을 작동시킨 위치가 담긴 배열 moves가 매개변수로 주어질 때,
  - 크레인을 모두 작동시킨 후 터트려져 사라진 인형의 개수를 구하는 프로그램을 작성하세요.
- **입력**
  - 첫 줄에 자연수 N(5<=N<=30)이 주어집니다.
  - 두 번째 줄부터 N*N board 배열이 주어집니다.
  - board의 각 칸에는 0 이상 100 이하인 정수가 담겨있습니다.
  - 0은 빈 칸을 나타냅니다.
  - 1 ~ 100의 각 숫자는 각기 다른 인형의 모양을 의미하며 같은 숫자는 같은 모양의 인형을 나타냅니다.
  - board배열이 끝난 다음줄에 moves 배열의 길이 M이 주어집니다.
  - 마지막 줄에는 moves 배열이 주어집니다.
  - moves 배열의 크기는 1 이상 1,000 이하입니다.
  - moves 배열 각 원소들의 값은 1 이상이며 board 배열의 가로 크기 이하인 자연수입니다.
- **출력**
  - 첫 줄에 터트려져 사라진 인형의 개수를 출력합니다.
- **예시 입력 1**
  - 5
  - 0 0 0 0 0
  - 0 0 1 0 3
  - 0 2 5 0 1
  - 4 2 4 4 2
  - 3 5 1 3 1
  - 8
  - 1 5 3 5 1 2 1 4
- **예시 출력 1**
  - 4


## 풀어보기

```java
import java.util.*;
class Main {

    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int size = sc.nextInt();
        int[][] board = new int[size][size];
        for(int i = 0 ; i < size ; i++){
            for(int j = 0 ; j < size ; j++){
                board[i][j] = sc.nextInt();
            }
        }
        int count = sc.nextInt();
        int[] peekArr = new int[count];
        for(int i = 0 ; i < count ; i++){
            peekArr[i] = sc.nextInt();
        }
        solution(board , peekArr);
    }

    public static void solution(int[][] board , int[] peekArr){
        Stack<Integer> bucket = new Stack<>();
        // 4 3 1 1 3 2 0 4
        int result = 0;
        for(int i = 0 ; i < peekArr.length ; i++){
            int cell = peekArr[i];
            for(int j = 0 ; j < board[0].length ; j++){
                if(board[j][cell - 1] != 0){
                    int peekValue = board[j][cell - 1];
                    if(!bucket.isEmpty() && bucket.peek() == peekValue){
//                        System.out.println( bucket.peek() + " - " + peekValue);
                        result += 2;
                        bucket.pop();
                    }
                    else{
                        bucket.add(peekValue);
                    }
                    board[j][cell - 1] = 0;
                    break;
                }
            }
        }
        System.out.println(result);
    }
}

```

## 해답

```java
import java.util.*;
class Main {
    public int solution(int[][] board, int[] moves){
        int answer=0;
        Stack<Integer> stack = new Stack<>();
        for(int pos : moves){
            for(int i=0; i<board.length; i++){
                if(board[i][pos-1]!=0){
                    int tmp=board[i][pos-1];
                    board[i][pos-1]=0;
                    if(!stack.isEmpty() && tmp==stack.peek()){
                        answer+=2;
                        stack.pop();
                    }
                    else stack.push(tmp);
                    break;
                }
            }
        }
        return answer;
    }
    public static void main(String[] args){
        Main T = new Main();
        Scanner kb = new Scanner(System.in);
        int n=kb.nextInt();
        int[][] board=new int[n][n];
        for(int i=0; i<n; i++){
            for(int j=0; j<n; j++){
                board[i][j]=kb.nextInt();
            }
        }
        int m=kb.nextInt();
        int[] moves=new int[m];
        for(int i=0; i<m; i++) moves[i]=kb.nextInt();
        System.out.println(T.solution(board, moves));
    }
}
```

***

# **`[Stack]` 후위식 연산 (통과)**
- **설명**
  - 후위연산식이 주어지면 연산한 결과를 출력하는 프로그램을 작성하세요.
  - 만약 3*(5+2)-9 을 후위연산식으로 표현하면 352+*9- 로 표현되며 그 결과는 12입니다.
- **입력**
  - 첫 줄에 후위연산식이 주어집니다. 연산식의 길이는 50을 넘지 않습니다.
  - 식은 1~9의 숫자와 +, -, *, / 연산자로만 이루어진다.
- **출력**
  - 연산한 결과를 출력합니다.
- **예시 입력 1**
  - 352+*9-
- **예시 출력 1**
  - 12

## 후위 표기식 읽는 법
- 왼쪽에서 부터 순차적으로 읽기 시작한다.
- 피연산자(숫자)는 일단 지나치고, 연산자(+-*/)가 나오게 되면, 연산자 앞쪽 두 개의 숫자로 연산을 진행한다.

- 예제) 4 7 2 + *
  1.  왼쪽부터 순차적으로 읽으면서 연산자를 찾는다.
  2.  +연산자를 찾았다. +연산자를 기준으로 앞쪽 두개의 피연산자 7, 2 를 더한다.
  3.  연산을 진행하고 나면 연산된 값을 적어둔다. 4 9 *
  4.  다시 순차적으로 연산자를 찾는다.
  5.  *연산자를 찾았다. 앞쪽 두개의 피연산자를 이용하여 연산을 진행한다.
  6.  연산결과는 36


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
        Stack<Integer> stack = new Stack<>();
        int result = 0;
        for(char ch : str1.toCharArray()){
            if(Character.isDigit(ch)) stack.push(Character.getNumericValue(ch));
            else{
                int tmp = stack.pop();
                if(ch == 43) result = stack.pop() + tmp;
                else if(ch == 45) result = stack.pop() - tmp;
                else if(ch == 42) result = stack.pop() * tmp;
                else result = stack.pop() / tmp;
                stack.push(result);
            }
        }
        System.out.println(result);
    }
}
```

## 해답

```java
import java.util.*;
class Main {
    public int solution(String str){
        int answer = 0;
        Stack<Integer> stack = new Stack<>();
        for(char x : str.toCharArray()){
            if(Character.isDigit(x)){
                stack.push(x - 48);
            }
            else{
                int rt = stack.pop();
                int lt = stack.pop();
                if(x == '+') stack.push(lt + rt);
                else if(x == '-') stack.push(lt - rt);
                else if(x == '*') stack.push(lt * rt);
                else if(x == '/') stack.push(lt / rt);
            }
        }
        answer = stack.get(0);
        return answer;
    }
    public static void main(String[] args){
        Main T = new Main();
        Scanner kb = new Scanner(System.in);
        String str = kb.next();
        System.out.println(T.solution(str));
    }
}
```
