---
layout: default
title: Dynamic Programming(동적계획법)
nav_order: 11
parent: 자바 코딩테스트 대비
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# **[계단오르기](https://cote.inflearn.com/contest/10/problem/10-01)**

## 풀어보기 - `피보나치`

```java
import java.util.*;

class Main {
    static int[] memoization;
    static int count;

    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        count = sc.nextInt();
        memoization = new int[count + 1];
        System.out.println(recursive(count));
    }

    public static int recursive(int n){
        if(memoization[n] > 0) return memoization[n];
        else if(n == 1) return memoization[n] = 1;
        else if(n == 2) return memoization[n] = 2;
        else return memoization[n] = recursive(n-2) + recursive(n-1);
    }
}
```

## 풀이

```java
import java.util.*;
class Main{
    static int[] dy;
    public int solution(int n){
        dy[1]=1;
        dy[2]=2;
        for(int i=3; i<=n; i++) dy[i]=dy[i-2]+dy[i-1];
        return dy[n];
    }

    public static void main(String[] args){
        Main T = new Main();
        Scanner kb = new Scanner(System.in);
        int n=kb.nextInt();
        dy=new int[n+1];
        System.out.print(T.solution(n));
    }
}
```

***

# **[돌다리 건너기](https://cote.inflearn.com/contest/10/problem/10-02)**

## 풀어보기

```java
import java.util.*;

class Main {
    static int[] memoization;

    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int count = sc.nextInt();
        memoization = new int[count + 1];
        memoization[1] = 1;
        memoization[2] = 2;
        for(int i = 3 ; i <= count ; i++){
            memoization[i] = memoization[i-2] + memoization[i-1];
        }
        System.out.println(memoization[memoization.length-2] + memoization[memoization.length - 1]);
    }
}
```

## 풀이

```java
import java.util.*;
class Main{
    static int[] dy;
    public int solution(int n){
        dy[1]=1;
        dy[2]=2;
        for(int i=3; i<=n+1; i++) dy[i]=dy[i-2]+dy[i-1];
        return dy[n+1];
    }

    public static void main(String[] args){
        Main T = new Main();
        Scanner kb = new Scanner(System.in);
        int n=kb.nextInt();
        dy=new int[n+2];
        System.out.print(T.solution(n));
    }
}
```

***

# **`LIS` [최대 부분 증가수열](https://cote.inflearn.com/contest/10/problem/10-03)**

## 풀어보기

```java
import java.util.*;

class Main {
    static int[] arr;
    static int[] dynamic;
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int count = sc.nextInt();
        arr = new int[count];
        dynamic = new int[count];
        for(int i = 0 ; i < count ; i++){
            arr[i] = sc.nextInt();
        }
        dynamic[0] = 1;
//        Arrays.fill(dynamic , 1);
        for(int i = 1 ; i < count ; i++){
            int max = 1;
            for(int j = 0 ; j < i ; j++){
                if(arr[i] > arr[j] && dynamic[j] >= max){
                    max = dynamic[j] + 1;
                }
            }
            dynamic[i] = max;
        }
//        for(int i = 0 ; i < dynamic.length ; i++) System.out.print(dynamic[i] + " ");
        System.out.println(Arrays.stream(dynamic).max().getAsInt());
    }
}
```

## 풀이

```java
import java.util.*;
class Main{
    static int[] dy;
    public int solution(int[] arr){
        int answer=0;
        dy=new int[arr.length];
        dy[0]=1;
        for(int i=1; i<arr.length; i++){
            int max=0;
            for(int j=i-1; j>=0; j--){
                if(arr[j]<arr[i] && dy[j]>max) max=dy[j];
            }
            dy[i]=max+1;
            answer=Math.max(answer, dy[i]);
        }
        return answer;
    }

    public static void main(String[] args){
        Main T = new Main();
        Scanner kb = new Scanner(System.in);
        int n=kb.nextInt();
        int[] arr=new int[n];
        for(int i=0; i<n; i++){
            arr[i]=kb.nextInt();
        }
        System.out.print(T.solution(arr));
    }
}
```

***

# **🔥 `LIS 응용` [가장 높은 탑 쌓기](https://cote.inflearn.com/contest/10/problem/10-04)**

## 풀어보기

```java
import java.util.*;

class Brick implements Comparable<Brick>{
    int width;
    int height;
    int weight;

    public Brick(int width, int height, int weight) {
        this.width = width;
        this.height = height;
        this.weight = weight;
    }

    @Override
    public int compareTo(Brick o) {
        return o.width - this.width;
    }

    @Override
    public String toString() {
        return "Brick{" +
                "width=" + width +
                ", height=" + height +
                ", weight=" + weight +
                '}';
    }
}

class Main {
    static List<Brick> bricks = new ArrayList<Brick>();
    static int[] dynamic;
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int count = sc.nextInt();
        dynamic = new int[count];
        for(int i = 0 ; i < count ; i++){
            int width = sc.nextInt();
            int height = sc.nextInt();
            int weight = sc.nextInt();
            bricks.add(new Brick(width , height , weight));
        }
        Collections.sort(bricks);
//        bricks.forEach(System.out::println);

        dynamic[0] = bricks.get(0).height;
        for(int i = 1 ; i < count ; i++){
            Brick stan = bricks.get(i);
            for(int j = i - 1 ; j >= 0 ; j--){
                Brick before = bricks.get(j);
                int sumHeight = stan.height + dynamic[j];
                if(before.weight > stan.weight && dynamic[i] < sumHeight){
                    dynamic[i] = sumHeight;
                }
            }
            if(dynamic[i] == 0) dynamic[i] = stan.height;
        }
//        Arrays.stream(dynamic).forEach(System.out::print);
//        System.out.println();
        System.out.println(Arrays.stream(dynamic).max().getAsInt());
    }
}
```

## 풀이

```java
import java.util.*;
class Brick implements Comparable<Brick>{
    public int s, h, w;
    Brick(int s, int h, int w) {
        this.s = s;
        this.h = h;
        this.w = w;
    }
    @Override
    public int compareTo(Brick o){
        return o.s-this.s;
    }
}
class Main{
    static int[] dy;
    public int solution(ArrayList<Brick> arr){
        int answer=0;
        Collections.sort(arr);
        dy[0]=arr.get(0).h;
        answer=dy[0];
        for(int i=1; i<arr.size(); i++){
            int max_h=0;
            for(int j=i-1; j>=0; j--){
                if(arr.get(j).w > arr.get(i).w && dy[j]>max_h){
                    max_h=dy[j];
                }
            }
            dy[i]=max_h+arr.get(i).h;
            answer=Math.max(answer, dy[i]);
        }
        return answer;
    }

    public static void main(String[] args){
        Main T = new Main();
        Scanner kb = new Scanner(System.in);
        int n=kb.nextInt();
        ArrayList<Brick> arr=new ArrayList<>();
        dy=new int[n];
        for(int i=0; i<n; i++){
            int a=kb.nextInt();
            int b=kb.nextInt();
            int c=kb.nextInt();
            arr.add(new Brick(a, b, c));
        }
        System.out.print(T.solution(arr));
    }
}
```

***

# 🔥 **`Napsack` 동전교환 ✔~~❌~~**

## 풀어보기

```java
import java.util.*;

class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int count = sc.nextInt();
        int[] coin = new int[count];
        for(int i = 0 ; i < count ; i++) coin[i] = sc.nextInt();
        int cost = sc.nextInt();

        int[] dynamic = new int[cost + 1];
//        Arrays.fill(dynamic , Integer.MAX_VALUE);
        for(int i = 0 ; i < dynamic.length ; i++) dynamic[i] = i / coin[0];

        for(int i = 1 ; i < coin.length ; i++){
            for(int j = i + 1 ; j < dynamic.length ; j++){
                if(j >= coin[i]){
                    int calc = dynamic[j - coin[i]] + 1;
                    if(dynamic[j] > calc){
                        dynamic[j] = calc;
                    }
                }
            }
        }
//        for (int value : dynamic){
//            System.out.print(value + " ");
//        }
        System.out.println(dynamic[cost]);
    }
}
```

## 풀이

```java
import java.util.*;
class Main{
    static int n, m;
    static int[] dy;
    public int solution(int[] coin){
        Arrays.fill(dy, Integer.MAX_VALUE);
        dy[0]=0;
        for(int i=0; i<n; i++){
            for(int j=coin[i]; j<=m; j++){
                dy[j]=Math.min(dy[j], dy[j-coin[i]]+1);
            }
        }
        return dy[m];
    }

    public static void main(String[] args){
        Main T = new Main();
        Scanner kb = new Scanner(System.in);
        n=kb.nextInt();
        int[] arr=new int[n];
        for(int i=0; i<n; i++){
            arr[i]=kb.nextInt();
        }
        m=kb.nextInt();
        dy=new int[m+1];
        System.out.print(T.solution(arr));
    }
}
```

***

#  **`Napsack` [최대점수 구하기](https://cote.inflearn.com/contest/10/problem/10-06)**

## 📌 문제의 전제는 **동전교환**과 달리 입력 정보를 1번만 사용할 수 있다.
## 냅색 알고리즘은 입력 정보의 개수가 정해져있거나 유한하면 뒤에서 부터 다이나믹 테이블을 적용한다.

## 풀어보기

```java
import java.util.*;

class Question{
    int score;
    int time;
    public Question(int score, int time) {
        this.score = score;
        this.time = time;
    }
    @Override
    public String toString() {
        return "Question{" +
                "score=" + score +
                ", time=" + time +
                '}';
    }
}

class Main {
    static int[] dynamic;
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int count = sc.nextInt();
        int limitTime = sc.nextInt();

        List<Question> qs = new ArrayList<>();
        for(int i = 0 ; i < count ; i++){
            qs.add(new Question(sc.nextInt() , sc.nextInt()));
        }
        dynamic = new int[limitTime + 1];

//        qs.forEach(System.out::println);

        for(int i = 0 ; i < qs.size() ; i++){
            Question q = qs.get(i);
            for(int j = dynamic.length - 1 ; j >= q.time ; j--){
                int dynamicIndex = j - q.time;
                if(dynamicIndex >= 0){
                    int sumScore = dynamic[j - q.time] + q.score;
                    if(dynamic[j] < sumScore) dynamic[j] = sumScore;
                }
                if(dynamic[j] == 0) dynamic[j] = q.score;
            }
        }
//        for(int i : dynamic){
//            System.out.print(i + " ");
//        }

        System.out.println(Arrays.stream(dynamic).max().getAsInt());
    }
}
```

## 풀이

```java
import java.util.*;
class Main{
    public static void main(String[] args){
        Scanner kb = new Scanner(System.in);
        int n=kb.nextInt();
        int m=kb.nextInt();
        int[] dy=new int[m+1];
        for(int i=0; i<n; i++){
            int ps=kb.nextInt();
            int pt=kb.nextInt();
            for(int j=m; j>=pt; j--){
                dy[j]=Math.max(dy[j], dy[j-pt]+ps);
            }
        }
        System.out.print(dy[m]);
    }
}
```
