---
layout: default
title: Concurrent Programming
parent: JAVA
nav_order: 4
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

# **자바에서 지원하는 Concurrent 프로그래밍**
- **멀티 프로세싱(Process Builder)**
- **멀티 쓰레드**

# **[프로세스와 스레드의 차이](https://gmlwjd9405.github.io/2018/09/14/process-vs-thread.html)**

## **프로세스**
-   컴퓨터에서 연속적으로 실행되고 있는 컴퓨터 프로그램
-   **메모리에 올라와 실행되고 있는 프로그램의 인스턴스 (독립적인 객체)**
-   운영체제로 부터 시스템 자원을 할당받는 작업의 단위
-   즉, 동적인 개념으로는 실행된 프로그램을 의미한다.
-   할당받는 시스템 자원의 예
    -   CPU 시간
    -   운영되기 위해 필요한 주소 공간
    -   Code , Data , Stack , Heap의 구조로 되어 있는 독립된 메모리 영역
-   기본적으로 프로세스당 최소 1개의 스레드 (메인 스레드)를 가지고 있다.
-   각 프로세스는 별도의 주소 공간에서 실행되며 , 한 프로세스는 다른 프로세스의 변수나 자료 구조에 접근할 수 없다.
-   한 프로세스가 다른 프로세스의 자원에 접근하려면 프로세스 간의 통신 (IPC , Inter-Process-Communication)을 사용해야 한다.
    -   파이프 , 파일 , 소켓 등을 이용한 통신 방법 이용

## **스레드**

-   프로세스 내에서 실행되는 여러 흐름의 단위
-   **프로세스의 특정한 수행 경로**
-   **프로세스가 할당받은 자원을 이용하는 실행의 단위**
-   프로세스 내에서 각각 Stack만 따로 할당받고 Code , Data , Heap 영역은 공유한다.
-   한 프로세스 내에서 동작되는 여러 실행의 흐름으로 , 프로세스 내의 주소 공간이나 자원들(힙 공간 등) 을 같은 프로세스 내에 스레드 끼리 공유하면서 실행된다.
-   같은 프로세스 안에 있는 여러 스레드들은 같은 힙 공간을 공유한다. 반면에 프로세스는 다른 프로세스의 메모리에 직접 접근할 수 없다.
-   각각의 스레드는 별도의 레지스터와 스택을 갖고 있지만 , 힙 메모리는 서로 읽고 쓸 수 있다.
-   한 스레드가 프로세스 자원을 변경하면 , 다른 이웃 스레드(sibling thread)도 그 변경 결과를 즉시 볼 수 있다.

## **자바 스레드(Java Thread)**

-   일반 스레드와 거의 차이가 없으며  , JVM이 운영체제의 역할을 한다.
-   **자바에는 프로세스가 존재하지 않고 스레드만 존재하며 , 자바 스레드는 JVM에 의해 스케줄되는 실행 단위 코드 블록이다.**
-   자바에서 스레드 스케줄링은 전적으로 JVM에 의해 이루어진다.
-   아래과 같은 스레드와 관련된 많은 정보들도 JVM이 관리한다.
    -   스레드가 몇 개 존재하는지
    -   스레드로 실행되는 프로그램 코드의 메모리 위치는 어디인지
    -   스레드의 상태는 무엇인지
    -   스레드의 우선순위는 얼마인지
-   즉 , **개발자는 자바 스레드로 작동할 스레드 코드를 작성하고 , 스레드 코드가 생명을 가지고 실행을 시작하도록 JVM에 요청하는 일 뿐이다.**

***

# **자바 멀티 쓰레드 프로그래밍**

## **Thread 주요 기능**
-   **현재 Thread 멈춰 두기 (sleep)**
    -   다른 쓰레드가 처리할 수 있도록 기회를 주지만 그렇다고 락을 놔주진 않는다.
-   **다른 쓰레드 깨우기 (interrupt)**
    -   다른 쓰레드를 깨워서 interruptedException을 발생 시킨다.
    -   그 에러가 발생했을 때 할 일은 코딩하기 나름 , 종료 시킬 수도 있고 계속 하던 일 할 수도 있음
-   **다른 쓰레드 기다리기 (join)**
    -   다른 쓰레드가 끝날 때 까지 기다린다.

### Thread 테스트
```java
public class AppForConcurrentTest {
    public static void main(String[] args) {
        myThread myThread = new myThread();
        myThread.start();

        System.out.println("Hello");

        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("Thread :" + Thread.currentThread().getName());
            }
        });
        thread.start();

        // Runnable이 함수형 인터페이스로 변경 되었기 때문에 가능
        Thread thread2 = new Thread(() -> {
            try {
                Thread.sleep(1000L);
            } catch (InterruptedException e) {
                // InterruptedException
                // 자는 동안 이 스레드를 꺠우면 catch
                e.printStackTrace();
            }
            System.out.println("Thread2 : " + Thread.currentThread().getName());
        });
        thread2.start();
//        출력
//        Hello
//        MyThread : Thread-0
//        Thread :Thread-1
//        Thread2 : Thread-2
    }

    static class myThread extends Thread{
        @Override
        public void run(){
            System.out.println("MyThread : " + Thread.currentThread().getName());
        }
    }
}
```

### InterruptedException 테스트
```java
public class AppForConcurrentTest {
    public static void main(String[] args) throws InterruptedException {
        // InterruptedException 테스트
        Thread thread = new Thread(() -> {
            while(true){
                System.out.println("Thread : " + Thread.currentThread().getName());
                try {
                    Thread.sleep(1000L);
                } catch (InterruptedException e) {
                    System.out.println("exit!");
                    return;
                }
            }
        });
        thread.start();

        System.out.println("Hello : " + Thread.currentThread().getName());
        Thread.sleep(3000L);
        thread.interrupt();

//        출력
//        Thread : Thread-0
//        Hello : main
//        Thread : Thread-0
//        Thread : Thread-0
//        exit!
    }
}
```

### Thread.join()
```java
public class AppForConcurrentTest {
    public static void main(String[] args) throws InterruptedException {
        // InterruptedException 테스트
        Thread testThread = new Thread(() -> {
            try {
                Thread.sleep(3000L);
                System.out.println("Thread : " + Thread.currentThread().getName());
            } catch (InterruptedException e) {
                throw new IllegalStateException(e);
            }
        });
        testThread.start();

        System.out.println("Hello : " + Thread.currentThread().getName());
        // main thread 가 testThread를 기다린다.
        testThread.join();

        System.out.println(Thread.currentThread().getName() + " is finished ");

//        출력
//        Hello : main
//        (3초 후)
//        Thread : Thread-0
//        main is finished

//        "main is finished"는 main thread에 의해 "Thread : Thread-0" 이전에 나와야한다.
//        하지만 join 메서드로 인해 main thread는 testThread를 기다리게 된다.

    }
}
```
***

# **Executors**




# **참고**
[Lesson: Concurrency (The Java™ Tutorials > Essential Classes) (oracle.com)](https://docs.oracle.com/javase/tutorial/essential/concurrency/)
{: .fh-default .fs-4 }
[Thread (Java Platform SE 8 ) (oracle.com)](https://docs.oracle.com/javase/8/docs/api/java/lang/Thread.html#interrupt--)
{: .fh-default .fs-4 }
