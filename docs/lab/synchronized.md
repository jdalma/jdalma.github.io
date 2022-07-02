---
layout: default
title: synchronized 
nav_order: 10
parent: 👨‍🔬 Lab
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

- **참고**
  - [Java 로 동기화를 해보자!](https://tecoble.techcourse.co.kr/post/2021-10-23-java-synchronize/)
  - [oracle docs `synchronized`](https://docs.oracle.com/javase/tutorial/essential/concurrency/syncmeth.html)
  - [jenkov tutorial `synchronized`](http://tutorials.jenkov.com/java-concurrency/synchronized.html#java-concurrency-utilities)
  - [식사하는 철학자 문제(운영체제)](https://luv-n-interest.tistory.com/438)
  - [뮤텍스(Mutex)와 세마포어(Semaphore)의 차이](https://worthpreading.tistory.com/90)



```java
import java.io.*;
import java.util.*;

class Main {
    static class myThread extends Thread{
    	int millisec;
    	String number;
    	
    	public myThread(int millisec , String number) {
    		this.millisec = millisec;
    		this.number = number;
    	}
        @Override
        public void run(){
//        	try {
//				Thread.sleep(millisec);
//			} catch (InterruptedException e) {
//				System.out.println(number + "Thread Interrupted !!!");
//			}
            print(number);
        }
    }
    
	public static void main(String[] args) {
        final Thread threadA = new myThread(1000 , "1");
        final Thread threadB = new myThread(1000 , "2"); 
        final Thread threadC = new myThread(1000 , "3"); 

        threadA.start();
        threadB.start();
        threadC.start();
	}
	
    public synchronized static void print(String number) {
		System.out.println("Thread Number " + number + " : " + Thread.currentThread().getName());
    }
}
```