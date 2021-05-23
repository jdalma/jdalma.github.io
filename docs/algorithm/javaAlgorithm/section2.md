---
layout: default
title: Array (1,2차원 배열)
nav_order: 3
parent: 자바 코딩테스트 대비
grand_parent: 알고리즘
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# **큰 수 출력하기 ✔**
- **설명**
  - N개의 정수를 입력받아, 자신의 바로 앞 수보다 큰 수만 출력하는 프로그램을 작성하세요.
  - (첫 번째 수는 무조건 출력한다)
- **입력**
  - 첫 줄에 자연수 N(1<=N<=100)이 주어지고, 그 다음 줄에 N개의 정수가 입력된다.
- **출력**
  - 자신의 바로 앞 수보다 큰 수만 한 줄로 출력한다.
- **예시 입력 1**
  - 6
  - 7 3 9 5 6 12
- **예시 출력 1**
  - 7 9 6 12

## 풀어보기

```java
public static void main(String[] args){
    Scanner kb = new Scanner(System.in);
    int n=kb.nextInt();
    int[] arr = new int[n];
    for(int i = 0 ; i < n ; i++){
        arr[i] = kb.nextInt();
    }
    solution(n, arr);
}

public static void solution(int n , int[] arr){
    StringBuilder result = new StringBuilder();
    result.append(arr[0]);
    for(int i = 1 ; i < arr.length ; i++){
        if(arr[i - 1] < arr[i]) {
            result.append(" ");
            result.append(arr[i]);
        }
    }
    System.out.println(result.toString());
}
```

## 해답

```java
public ArrayList<Integer> solution(int n, int[] arr){
  ArrayList<Integer> answer = new ArrayList<>();
  answer.add(arr[0]);
  for(int i=1; i<n; i++){
    if(arr[i] > arr[i - 1]) answer.add(arr[i]);
  }
  return answer;
}

public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  int n = kb.nextInt();
  int[] arr = new int[n];
  for(int i = 0 ; i < n ; i++){
    arr[i] = kb.nextInt();
  }
  for(int x : T.solution(n, arr)){
    System.out.print(x+" ");
  }
}
```

***

# **보이는 학생 ✔**
- (앞에 서 있는 사람들보다 크면 보이고, 작거나 같으면 보이지 않습니다.)
- **입력**
  - 첫 줄에 정수 N(5<=N<=100,000)이 입력된다.
  - 그 다음줄에 N명의 학생의 키가 앞에서부터 순서대로 주어진다.
- **출력**
  - 선생님이 볼 수 있는 최대학생수를 출력한다.
- **예시 입력 1**
  - 8
  - 130 135 148 140 145 150 150 153
- **예시 출력 1**
  - 5

## 풀어보기

```java
public static void main(String[] args){
    Scanner kb = new Scanner(System.in);
    int n=kb.nextInt();
    int[] arr = new int[n];
    for(int i = 0 ; i < n ; i++){
        arr[i] = kb.nextInt();
    }
    System.out.println(solution(n, arr));
}

public static int solution(int n , int[] arr){
    int answer = 1;
    int prevMaxVal = 0;
    for(int i = 1 ; i < arr.length ; i++){
        if(arr[i - 1] < arr[i]) {
            if(prevMaxVal < arr[i]){
                answer++;
            }
        }
        else if(arr[i - 1] > prevMaxVal){
            prevMaxVal = arr[i - 1];
        }
    }
    return answer;
}
```

## 해답

```java
public int solution(int n, int[] arr){
  int answer = 1, max = arr[0];
  for(int i = 1 ; i < n ; i++){
    if(arr[i] > max){
      max = arr[i];
      answer++;
    }
  }
  return answer;
}
public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  int n = kb.nextInt();
  int[] arr = new int[n];
  for(int i = 0; i<n; i++){
    arr[i] = kb.nextInt();
  }
  System.out.print(T.solution(n, arr));
}
```

***

# **가위 바위 보 ✔**

![](../../../assets/images/algorithm/section2/1.png)

- **입력**
  - 첫 번째 줄에 게임 횟수인 자연수 N(1<=N<=100)이 주어집니다.
  - 두 번째 줄에는 A가 낸 가위, 바위, 보 정보가 N개 주어집니다.
  - 세 번째 줄에는 B가 낸 가위, 바위, 보 정보가 N개 주어집니다.
- **출력**
  - 각 줄에 각 회의 승자를 출력합니다. 비겼을 경우는 D를 출력합니다.

- **예시 입력 1**
  - 5
  - 2 3 3 1 3
  - 1 1 2 2 3
- **예시 출력 1**
  - A
  - B
  - A
  - B
  - D

## 풀어보기

```java
public static void main(String[] args){
    Scanner kb = new Scanner(System.in);
    int n=kb.nextInt();
    int[] arr1 = new int[n];
    int[] arr2 = new int[n];
    for(int i = 0 ; i < n ; i++){
        arr1[i] = kb.nextInt();
    }
    for(int i = 0 ; i < n ; i++){
        arr2[i] = kb.nextInt();
    }
    solution(n, arr1 , arr2);
}

public static int solution(int n , int[] arr1 , int[] arr2){
    int answer = 1;
    // 1 = 가위 , 2 = 바위 , 3 = 보
    for(int i = 0 ; i < n ; i++){
        if(arr1[i] == arr2[i]) System.out.println("D");
        else if(arr1[i] == 1){
            if(arr2[i] == 2) System.out.println("B");
            else System.out.println("A");
        }
        else if(arr1[i] == 2){
            if(arr2[i] == 3) System.out.println("B");
            else System.out.println("A");
        }
        else{
            if(arr2[i] == 1) System.out.println("B");
            else System.out.println("A");
        }
    }
    return answer;
}

```

## 해답

```java
public String solution(int n, int[] a, int[] b){
  String answer = "";
  for(int i = 0 ; i < n ; i++){
    if(a[i] == b[i]) answer += "D";
    else if(a[i] == 1 && b[i] == 3) answer += "A";
    else if(a[i] == 2 && b[i] == 1) answer += "A";
    else if(a[i] == 3 && b[i] == 2) answer += "A";
    else answer += "B";
  }
  return answer;
}
public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  int n = kb.nextInt();
  int[] a = new int[n];
  int[] b = new int[n];
  for(int i = 0 ; i < n ; i++){
    a[i] = kb.nextInt();
  }
  for(int i = 0 ; i < n ; i++){
    b[i] = kb.nextInt();
  }
  for(char x : T.solution(n, a, b).toCharArray()) System.out.println(x);
}
```

***

# **피보나치 수열 ✔**
- **예시 입력 1**
  - 10
- **예시 출력 1**
  - 1 1 2 3 5 8 13 21 34 55

## 풀어보기

```java
public static void main(String[] args){
    Scanner kb = new Scanner(System.in);
    int n=kb.nextInt();
    solution(n);
}

public static void solution(int n){
    int[] numArr = new int[n];
    numArr[0] = 1; numArr[1] = 1;
    System.out.print("1 1");
    for(int i = 2; i < n ; i++){
        numArr[i] = numArr[i - 1] + numArr[i - 2];
        System.out.print(" " + numArr[i]);
    }
}
```

## 해답

```java
public int[] solution(int n){
  int[] answer=new int[n];
  answer[0] = 1;
  answer[1] = 1;
  for(int i = 2 ; i < n ; i++){
    answer[i] = answer[i - 2] + answer[i - 1];
  }
  return answer;
}
public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  int n = kb.nextInt();
  for(int x :T.solution(n)) System.out.print(x+" ");
}
```

```java
public void solution(int n){
  int a = 1, b = 1, c;
  System.out.print(a + " " + b + " ");
  for(int i = 2 ; i < n ; i++){
    c = a + b;
    System.out.print(c + " ");
    a = b;
    b = c;
  }
}
public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  int n = kb.nextInt();
  T.solution(n);
}
```

***

# **소수(에라토스테네스 체) ❌**
- **예시 입력 1**
  - 20
- **예시 출력 1**
  - 8

  ## ✋ 에라토스테네스 체
  - 2부터 소수를 구하고자 하는 구간의 모든 수를 나열한다.
  - 2는 소수이다.
  - 자기 자신을 제외한 2의 배수를 모두 지운다.
  - 남아있는 수 가운데 3은 소수이다.
  - 자기 자신을 제외한 3의 배수를 모두 지운다.
  - 남아있는 수 가운데 5는 소수이다.
  - 자기 자신을 제외한 5의 배수를 모두 지운다.
  - 남아있는 수 가운데 7은 소수이다.
  - 자기 자신을 제외한 7의 배수를 모두 지운다.
  - 위의 과정을 반복하면 구하는 구간의 모든 소수가 남는다.


## 해답

### 📌 `for(int j = i ; j <= n ; j = j + i) ch[j] = 1`

```java
public int solution(int n){
  int cnt = 0;
  int[] ch = new int[n+1];
  for(int i = 2 ; i <= n ; i++){
    if(ch[i] == 0){
      cnt++;
      for(int j = i ; j <= n ; j = j + i) ch[j] = 1;
    }
  }
  return cnt;
}
public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  int n = kb.nextInt();
  System.out.println(T.solution(n));
}
```

***

# **[뒤집은 소수](https://cote.inflearn.com/contest/10/problem/02-06) ❌**
- **입력**
  - 첫 줄에 자연수의 개수 N(3<=N<=100)이 주어지고, 그 다음 줄에 N개의 자연수가 주어진다.
  - 각 자연수의 크기는 100,000를 넘지 않는다.
- **출력**
  - 첫 줄에 뒤집은 소수를 출력합니다.
  - 출력순서는 입력된 순서대로 출력합니다.
- **예시 입력 1**
  - 9
  - 32 55 62 20 250 370 200 30 100
- **예시 출력 1**
  - 23 2 73 2 3


## 풀어보기

```java
public static void main(String[] args){
    Scanner kb = new Scanner(System.in);
    int n=kb.nextInt();
    int[] intArr = new int[n];
    for(int i = 0 ; i < n ; i++){
        intArr[i] = kb.nextInt();
    }
    solution(n , intArr);
}

public static void solution(int n , int[] intArr){
    int result = 0;
    int[] reverseArr = new int[n];
    List<Integer> resultList = new ArrayList<Integer>();

    for(int i = 0 ; i < n ; i++){
        int num = intArr[i];
        String numStr = "";
        while(num > 0){
            numStr += Integer.toString(num % 10);
            num = num / 10;
        }
        reverseArr[i] = Integer.parseInt(numStr);
    }
    for(int i = 0 ; i < reverseArr.length ; i++){
        int reverseNum = reverseArr[i];
        int printNum = 0;
        if(reverseNum == 2 || reverseNum == 3 || reverseNum == 5 || reverseNum == 7) resultList.add(reverseNum);
        else if(reverseNum != 1 && reverseNum % 2 != 0 && reverseNum % 3 != 0 && reverseNum % 5 != 0 && reverseNum % 7 != 0) resultList.add(reverseNum);

    }

    resultList.forEach(num -> {
        System.out.print(num + " ");
    });
}
```

## 해답

### ✋ `public boolean isPrime(int num)` 확인

```java
public boolean isPrime(int num){
  if(num == 1) return false;
  for(int i = 2 ; i < num ; i++){
    if(num % i == 0) return false;
  }
  return true;
}

public ArrayList<Integer> solution(int n, int[] arr){
  ArrayList<Integer> answer = new ArrayList<>();
  for(int i = 0 ;  i < n ; i++){
    int tmp = arr[i];
    int res = 0;
    while(tmp > 0){
      int t = tmp % 10;
      res = res * 10 + t;
      tmp = tmp / 10;
    }
    if(isPrime(res)) answer.add(res);
  }
  return answer;
}
public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  int n = kb.nextInt();
  int[] arr = new int[n];
  for(int i = 0 ; i < n ; i++){
    arr[i] = kb.nextInt();
  }
  for(int x : T.solution(n, arr)){
    System.out.print(x+" ");
  }
}
```

***

# **점수계산 ✔**

- 점수 계산은 아래 표와 같이 계산되어, 총 점수는 1+1+2+3+1+2=10 점이다.
![](../../../assets/images/algorithm/section2/2.png)

  - 시험문제의 채점 결과가 주어졌을 때, 총 점수를 계산하는 프로그램을 작성하시오.
- **입력**
  - 첫째 줄에 문제의 개수 N (1 ≤ N ≤ 100)이 주어진다.
  - 둘째 줄에는 N개 문제의 채점 결과를 나타내는 0 혹은 1이 빈 칸을 사이에 두고 주어진다.
  - 0은 문제의 답이 틀린 경우이고, 1은 문제의 답이 맞는 경우이다.
- **출력**
  - 첫째 줄에 입력에서 주어진 채점 결과에 대하여 가산점을 고려한 총 점수를 출력한다.

- **예시 입력 1**
  - 10
  - 1 0 1 1 1 0 0 1 1 0
- **예시 출력 1**
  - 10

## 풀어보기

```java
public static void main(String[] args){
    Scanner kb = new Scanner(System.in);
    int n=kb.nextInt();
    int[] intArr = new int[n];
    for(int i = 0 ; i < n ; i++){
        intArr[i] = kb.nextInt();
    }
    System.out.println(solution(n , intArr));
}

public static int solution(int n , int[] intArr){
    int result = 0;
    int value = 1;
    for(int i = 0 ; i < intArr.length ; i++){
        if(intArr[i] == 1){
            result += value;
            value++;
        }
        else{
            value = 1;
        }
    }
    return result;
}
```

## 해답

```java
public int solution(int n, int[] arr){
  int answer = 0 , cnt = 0;
  for(int i = 0 ; i < n ; i++){
    if(arr[i] == 1){
      cnt++;
      answer += cnt;
    }
    else cnt = 0;
  }
  return answer;
}
public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  int n = kb.nextInt();
  int[] arr = new int[n];
  for(int i = 0 ; i < n ; i++){
    arr[i] = kb.nextInt();
  }
  System.out.print(T.solution(n, arr));
}
```

***

# **등수 구하기✔**
- **예시 입력 1**
  - 5
  - 87 89 92 100 76
- **예시 출력 1**
  - 4 3 2 1 5

## 풀어보기

```java
public static void main(String[] args){
    Scanner kb = new Scanner(System.in);
    int n=kb.nextInt();
    int[] intArr = new int[n];
    for(int i = 0 ; i < n ; i++){
        intArr[i] = kb.nextInt();
    }
    solution(n , intArr);
}

public static void solution(int n , int[] intArr){
    int result = 0;

    for(int i = 0 ; i < n ; i++){
        int rank = n;
        for(int j = 0 ; j < n ; j++){
            if(i != j){
                if(intArr[i] >= intArr[j]) rank--;
            }
        }
        System.out.print(rank + " ");
    }
}
```

## 해답

```java
public int[] solution(int n, int[] arr){
  int[] answer = new int[n];
  for(int i = 0 ; i < n ; i++){
    int cnt = 1;
    for(int j = 0 ; j < arr.length ; j++){
      if(arr[j] > arr[i]) cnt++;
    }
    answer[i] = cnt;
  }
  return answer;
}
public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  int n = kb.nextInt();
  int[] arr = new int[n];
  for(int i = 0 ; i < n ; i++){
    arr[i] = kb.nextInt();
  }
  for(int x :T.solution(n, arr)) System.out.print(x+" ");
}
```

***

# **격자판 최대합 ✔**
- **예시 입력 1**
  - 5
  - 10 13 10 12 15
  - 12 39 30 23 11
  - 11 25 50 53 15
  - 19 27 29 37 27
  - 19 13 30 13 19
- **예시 출력 1**
  - 155

## 풀어보기

```java
public static void main(String[] args){
    Scanner kb = new Scanner(System.in);
    int n=kb.nextInt();
    int[][] intArr = new int[n][n];
    for(int i = 0 ; i < n ; i++){
        for(int j = 0 ; j < n ; j++){
            intArr[i][j] = kb.nextInt();
        }
    }
    solution(n , intArr);
}

public static void solution(int n , int[][] intArr){
    int result = 0;
    int rowTotal = 0  , colTotal = 0 , lrDiagonal = 0 , rlDiagonal = 0;
    int maxRowTotal = 0  , maxColTotal = 0;

    for(int i = 0 ; i < n ; i++){
        rowTotal = 0;
        colTotal = 0;
        for(int j = 0 ; j < n ; j++){
            rowTotal += intArr[i][j];
            colTotal += intArr[j][i];
            if(i == j) lrDiagonal += intArr[i][j];
            if(i + j == n - 1) rlDiagonal += intArr[i][j];

        }
        if(maxRowTotal < rowTotal) maxRowTotal = rowTotal;
        if(maxColTotal < colTotal) maxColTotal = colTotal;
    }
    System.out.print(Math.max(Math.max(Math.max(maxRowTotal , maxColTotal) , lrDiagonal) , rlDiagonal));
}

```

## 해답

```java
public int solution(int n, int[][] arr){
  int answer = -2147000000;
  int sum1 = 0 , sum2 = 0;
  for(int i = 0 ; i < n ; i++){
    sum1 = sum2 = 0;
    for(int j = 0 ; j < n ; j++){
      sum1 += arr[i][j];
      sum2 += arr[j][i];
    }
    answer = Math.max(answer, sum1);
    answer = Math.max(answer, sum2);
  }
  sum1 = sum2 = 0;
  for(int i = 0 ; i < n ; i++){
    sum1 += arr[i][i];
    sum2 += arr[i][n - i - 1];
  }
  answer = Math.max(answer, sum1);
  answer = Math.max(answer, sum2);
  return answer;
}

public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  int n = kb.nextInt();
  int[][] arr = new int[n][n];
  for(int i = 0 ; i < n ; i++){
    for(int j = 0 ; j < n ; j++){
      arr[i][j] = kb.nextInt();
    }
  }
  System.out.print(T.solution(n, arr));
}
```

***

# **봉우리 ✔**

![](../../../assets/images/algorithm/section2/4.png)

- **예시 입력 1**
  - 5
  - 5 3 7 2 3
  - 3 7 1 6 1
  - 7 2 5 3 4
  - 4 3 6 4 1
  - 8 7 3 5 2
- **예시 출력 1**
  - 10

## 풀어보기

### `int[][] intArr = new int[n + 2][n + 2];`

```java
public static void main(String[] args){
    Scanner kb = new Scanner(System.in);
    int n=kb.nextInt();
    int[][] intArr = new int[n + 2][n + 2];
    for(int i = 1 ; i <= n ; i++){
        for(int j = 1 ; j <= n ; j++){
            intArr[i][j] = kb.nextInt();
        }
    }
    solution(n , intArr);
}

public static void solution(int n , int[][] intArr){
    int result = 0;
    for(int i = 1 ; i < n + 1; i++){
        for(int j = 1 ; j < n + 1; j++){
            int value = intArr[i][j];
            if(value > intArr[i][j - 1] && value > intArr[i][j + 1]
                && value > intArr[i - 1][j] && value > intArr[i + 1][j]){
                result++;
            }
        }
    }
    System.out.println(result);
}
```

## 해답

### 📌 상하좌우를 반복문으로 처리 (8방향 대비)
### `int[] dx = {-1, 0, 1, 0};`
### `int[] dy = {0, 1, 0, -1};`

```java
int[] dx = {-1, 0, 1, 0};
int[] dy = {0, 1, 0, -1};
public int solution(int n, int[][] arr){
  int answer = 0;
  for(int i = 0 ; i < n ; i++){
    for(int j = 0 ; j < n ; j++){
      boolean flag = true;
      for(int k = 0 ; k < 4 ; k++){
        int nx = i + dx[k];
        int ny = j + dy[k];
        if(nx >= 0 && nx < n && ny >= 0 && ny < n && arr[nx][ny] >= arr[i][j]){
          flag = false;
          break;
        }
      }
      if(flag) answer++;
    }
  }
  return answer;
}

public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  int n = kb.nextInt();
  int[][] arr = new int[n][n];
  for(int i = 0 ; i < n ; i++){
    for(int j = 0; j < n ; j++){
      arr[i][j] = kb.nextInt();
    }
  }
  System.out.print(T.solution(n, arr));
}
```

***

# **임시반장 정하기 ✔**
- **예시 입력 1**
  - 5
  - 2 3 1 7 3
  - 4 1 9 6 8
  - 5 5 2 4 4
  - 6 5 2 6 7
  - 8 4 2 2 2
- **예시 출력 1**
  - 4

## 풀어보기

### ✋통과는 하였지만 불필요한 배열 (`studentArr`) , if문 , for문 존재

```java
public static void main(String[] args){
    Scanner kb = new Scanner(System.in);
    int n=kb.nextInt();
    int[][] intArr = new int[n][5];
    for(int i = 0 ; i < n ; i++){
        for(int j = 0 ; j < 5 ; j++){
            intArr[i][j] = kb.nextInt();
        }
    }
    solution(n , intArr);
}

public static void solution(int n , int[][] intArr){
    int prevCount = 0 , nowCount;
    int nowStudent = 1;
    int[] studentArr;
    for(int i = 0 ; i < n ; i++){
        studentArr = new int[n];
        nowCount = 0;
        for(int j = 0 ; j < 5 ; j++){
            int val = intArr[i][j];
            for(int k = 0 ; k < n ; k++){
                if(k != i && intArr[k][j] == val) {
                    studentArr[k] = 1;
                }
            }
        }

        for(int j = 0 ; j < studentArr.length ; j++){
            nowCount += studentArr[j];
        }
        if(prevCount < nowCount){
            prevCount = nowCount;
            nowStudent = i + 1;
        }
    }
    System.out.println(nowStudent);
}
```

## 해답

```java
public int solution(int n, int[][] arr){
  int answer = 0, max = 0;
  for(int i = 1 ; i <= n ; i++){
    int cnt = 0;
    for(int j = 1 ; j <= n ; j++){
      for(int k = 1 ; k <= 5 ; k++){
        if(arr[i][k] == arr[j][k]){
          cnt++;
          break;
        }
      }
    }
    if(cnt > max){
      max = cnt;
      answer = i;
    }
  }
  return answer;
}

public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  int n = kb.nextInt();
  int[][] arr = new int[n+1][6];
  for(int i = 1 ; i <= n ; i++){
    for(int j = 1 ; j <= 5 ; j++){
      arr[i][j] = kb.nextInt();
    }
  }
  System.out.print(T.solution(n, arr));
}
```

***

# **[멘토링](https://cote.inflearn.com/contest/10/problem/02-12) ❌**
- **예시 입력 1**
  - 4 3
  - 3 4 1 2
  - 4 3 2 1
  - 3 1 4 2
- **예시 출력 1**
  - 3

## 풀어보기

**출력**
```
3 (0,0) > 4 (0,1) / 3 (0,0) > 1 (0,2) / 3 (0,0) > 2 (0,3) /
4 (1,0) > 3 (1,1) / 4 (1,0) > 2 (1,2) / 4 (1,0) > 1 (1,3) /
3 (2,0) > 1 (2,1) / 3 (2,0) > 4 (2,2) / 3 (2,0) > 2 (2,3) /

4 (0,1) > 3 (0,0) / 4 (0,1) > 1 (0,2) / 4 (0,1) > 2 (0,3) /
3 (1,1) > 4 (1,0) / 3 (1,1) > 2 (1,2) / 3 (1,1) > 1 (1,3) /
1 (2,1) > 3 (2,0) / 1 (2,1) > 4 (2,2) / 1 (2,1) > 2 (2,3) /

1 (0,2) > 3 (0,0) / 1 (0,2) > 4 (0,1) / 1 (0,2) > 2 (0,3) /
2 (1,2) > 4 (1,0) / 2 (1,2) > 3 (1,1) / 2 (1,2) > 1 (1,3) /
4 (2,2) > 3 (2,0) / 4 (2,2) > 1 (2,1) / 4 (2,2) > 2 (2,3) /

2 (0,3) > 3 (0,0) / 2 (0,3) > 4 (0,1) / 2 (0,3) > 1 (0,2) /
1 (1,3) > 4 (1,0) / 1 (1,3) > 3 (1,1) / 1 (1,3) > 2 (1,2) /
2 (2,3) > 3 (2,0) / 2 (2,3) > 1 (2,1) / 2 (2,3) > 4 (2,2) /

```

```java
public static void main(String[] args){
    Scanner kb = new Scanner(System.in);
    int n = kb.nextInt();
    int m = kb.nextInt();
    int[][] intArr = new int[m][n];
    for(int i = 0 ; i < m ; i++){
        for(int j = 0 ; j < n ; j++){
            intArr[i][j] = kb.nextInt();
        }
    }
    solution(m , n , intArr);
}

public static void solution(int m , int n , int[][] intArr){
    int answer = 0;

    for(int i = 0 ; i < n ; i++){
        boolean flag = true;
        for(int k = 0 ; k < n ; k++){
            for(int q = 0 ; q < m ; q++){
                if(i != k){
                    System.out.println(intArr[q][i] + " (" + q + "," + i + ") > " + intArr[q][k] + " (" + q + "," + k + ") / ");
                    if(intArr[q][i] > intArr[q][k]){
                        flag = false;
//                            break;
                    }
                }
            }
            System.out.println();
        }
        if(flag){
            answer++;
        }
    }
    System.out.println(answer);
}
```

```java
// 2021-04-30
package algo;

import java.util.Scanner;

public class Main {

  public static void main(String[] args){
    Scanner in=new Scanner(System.in);
    int input1 = in.nextInt();
    int input2 = in.nextInt();
    int[][] arr = new int[input2][input1];
    for(int i = 0 ; i < input2 ; i++) {
    	for(int j = 0 ; j < input1 ; j++) {
    		arr[i][j] = in.nextInt();
    	}
    }
    solution(arr);
  }

  public static void solution(int[][] arr) {
	  int[][] newArr = new int[arr[0].length][arr.length];

	  for(int i = 0 ; i < arr.length ; i++) {
    	for(int j = 0 ; j < arr.length ; j++) {
    		for(int k = 0 ; k < arr[0].length ; k++) {

    		}
    	}
	  }

	  for(int i = 0 ; i < newArr.length ; i++) {
	    	for(int j = 0 ; j < newArr[0].length ; j++) {
	    		System.out.print(newArr[i][j]);
	    	}
	    	System.out.println();
	  }
  }
}

```

## 해답

### 📌 4중 for문

```java
public int solution(int n, int m, int[][] arr){
  int answer = 0;
  for(int i = 1 ; i <= n ; i++){
    for(int j = 1 ; j <= n ; j++){
      int cnt = 0;
      for(int k = 0 ; k < m ; k++){
        int pi = 0, pj = 0;
        for(int s = 0 ; s < n ; s++){
          if(arr[k][s] == i) pi = s;
          if(arr[k][s] == j) pj = s;
        }
        if(pi < pj) cnt++;
      }
      if(cnt == m){
        answer++;
        //System.out.println(i+" "+j);
      }
    }
  }
  return answer;
}

public static void main(String[] args){
  Main T = new Main();
  Scanner kb = new Scanner(System.in);
  int n = kb.nextInt();
  int m = kb.nextInt();
  int[][] arr = new int[m][n];
  for(int i = 0 ; i < m ; i++){
    for(int j = 0 ; j < n ; j++){
      arr[i][j] = kb.nextInt();
    }
  }
  System.out.print(T.solution(n, m, arr));
}
```
