---
layout: default
title: Greedy Algorithm
nav_order: 10
parent: 자바 코딩테스트 대비
grand_parent: 알고리즘
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---


# **[씨름 선수](https://cote.inflearn.com/contest/10/problem/09-01)**

## 풀어보기


```java
import java.util.*;

class Person implements Comparable<Person>{
    int height;
    int weight;
    public Person(int height , int weight){
        this.height = height;
        this.weight = weight;
    }
    @Override
    public int compareTo(Person o){
      // 음수 또는 0이면 객체의 자리가 그대로 유지되며, 양수인 경우에는 두 객체의 자리가 바뀐다.
        if(this.height > o.height) return -1;
        else return 1;
    }

    @Override
    public String toString() {
        return this.height + " - " + this.weight;
    }
}

class Main {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int input1 = sc.nextInt();
        List<Person> personList = new ArrayList<>();
        for(int i = 0 ; i < input1 ; i++){
            int height = sc.nextInt();
            int weight = sc.nextInt();
            personList.add(new Person(height , weight));
        }
        Collections.sort(personList);
//        for (Person person : personList) {
//            System.out.println(person);
//        }

        int result = 1;
        int maxWeight = personList.get(0).weight;
        for(int i = 1 ; i < personList.size() ; i++){
            Person now = personList.get(i);
            if(maxWeight < now.weight){
                result++;
                maxWeight = now.weight;
            }
        }
        System.out.println(result);
    }

}
```

## 해답

```java
import java.util.*;
class Body implements Comparable<Body>{
    public int h, w;
    Body(int h, int w) {
        this.h = h;
        this.w = w;
    }
    @Override
    public int compareTo(Body o){
        return o.h-this.h;
    }
}

class Main {
    public int solution(ArrayList<Body> arr, int n){
        int cnt=0;
        Collections.sort(arr);
        int max=Integer.MIN_VALUE;
        for(Body ob : arr){
            if(ob.w>max){
                max=ob.w;
                cnt++;
            }
        }
        return cnt;
    }

    public static void main(String[] args){
        Main T = new Main();
        Scanner kb = new Scanner(System.in);
        int n=kb.nextInt();
        ArrayList<Body> arr = new ArrayList<>();
        for(int i=0; i<n; i++){
            int h=kb.nextInt();
            int w=kb.nextInt();
            arr.add(new Body(h, w));
        }
        System.out.println(T.solution(arr, n));
    }
}
```
