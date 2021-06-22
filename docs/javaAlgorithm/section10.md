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
        return o.weight - this.weight;
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
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int count = sc.nextInt();

        for(int i = 0 ; i < count ; i++){
            bricks.add(new Brick(sc.nextInt() , sc.nextInt() , sc.nextInt()));
        }

        Collections.sort(bricks);

        bricks.forEach(System.out::println);
    }
}
```

## 풀이
