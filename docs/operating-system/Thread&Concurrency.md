---
layout: default
title: Thread & Concurrency
parent: 운영체제
nav_order: 3
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

- 지금까지 우리는 프로세스가 단일 제어 스레드로 실행중인 프로그램이라고 가정했다.
- 하지만 **프로세스는 여러 스레드를 포함 할 수 있다.**

# **Thread - 스레드**
- **Light Weight Process** - 경량 프로세스
- CPU 활용의 기본 단위
- **스레드 ID, 프로그램 카운터, 레지스터 세트 및 스택으로 구성된다.**

![](../../assets/images/operating-system/Thread/1.png)

![](../../assets/images/operating-system/Thread/2.png)

## **멀티 스레드 프로그래밍 장점**
- **반응성** - 지속적인 실행을 허용할 수 있음
- **자원 공유** - 스레드는 프로세스의 자원을 공유하고, 공유 메모리 또는 메시지 전달보다 쉽다
- **경제성** - 프로세스 생성보다 저렴
  - **스레드 스위칭은 컨텍스트 스위칭보다 오버헤드가 낮다.**
- **확장성** : 프로세스는 멀티 프로세서 아키텍처를 활용할 수 있다

## **Java에서 스레드를 명시적으로 생성하는 세 가지 기술**.

### **Thread 클래스에서 상속**
- Thread 클래스에서 파생된 새 클래스를 만든다.
- `public void run()` 메서드를 재정의한다.

```java
public class MyThread extends Thread{
    @Override
    public void run() {
        try{
            while(true){
                System.out.println("Hello , Thread");
                Thread.sleep(500);
            }
        }
        catch(InterruptedException ie){
            System.out.println("--------Interrupted");
        }
    }
}
```

```java
import java.io.IOException;

class Main {
    public static void main(String[] args) throws IOException {
        MyThread thread = new MyThread();
        thread.start();
        System.out.println("Hello , my child");
    }
}
```


### **Runnable 인터페이스 구현**
- Runnable 인터페이스를 구현하는 새 클래스를 정의한다.
- `public void run()` 메서드를 재정의한다.

```java
public class MyThread implements Runnable{
    @Override
    public void run() {
        try{
            while(true){
                System.out.println("Hello , Runnable");
                Thread.sleep(500);
            }
        }
        catch(InterruptedException ie){
            System.out.println("--------Interrupted");
        }
    }
}
```

```java
import java.io.IOException;

class Main {
    public static void main(String[] args) throws IOException {
        Thread thread = new Thread(new MyThread());
        thread.start();
        System.out.println("Hello , my child");
    }
}
```

### **Lambda 표현식 사용(Java 버전 1.8부터)**
- 새로운 클래스를 정의하지 않고 대신 **Runnable의 람다 식을 사용**한다.
- 참고 - **[JAVA8 Concurrent Programming](https://jeongcode.github.io/docs/java/concurrent/)**

```java
class Main {
    public static void main(String[] args){
        Runnable task = () -> {
            try{
                while(true){
                    System.out.println("Hello , Lambda Runnable");
                    Thread.sleep(500);
                }
            }
            catch(InterruptedException ie){
                System.out.println("--------Interrupted");
            }
        };
        Thread thread = new Thread(task);
        thread.start();
        System.out.println("Hello , my child");
    }
}
```

### **부모 쓰레드의 대기**

```java
class Main {
    public static void main(String[] args){
        Runnable task = () -> {
            for(int i = 0 ; i < 5 ; i++){
                System.out.println("Hello , Lambda Runnable");
            }
        };
        Thread thread = new Thread(task);
        thread.start();
        try{
            thread.join();
        }
        catch(InterruptedException ie){
            System.out.println("Parent thread is interrupted");
        }
        System.out.println("Hello , My Joined Child");
    }
}
```

### **쓰레드의 종료**

```java
class Main {
    public static void main(String[] args) throws InterruptedException {
        Runnable task = () -> {
            try{
                while(true){
                    System.out.println("Hello , Lambda Runnable!");
                    Thread.sleep(100);
                }
            }
            catch (InterruptedException ie){
                System.out.println("I'm Interrupted");
            }
        };
        Thread thread = new Thread(task);
        thread.start();
        Thread.sleep(500);
        thread.interrupt();
        System.out.println("Hello , My Interrupted Child!");
    }
}
```

> **✋[인터럽트(Interrupt)란?](https://whatisthenext.tistory.com/147)**

***

## **멀티코어 시스템의 멀티스레딩**
- **향상된 동시성을 위해 다중 코어를 보다 효율적으로 사용한다.**
- **단일 코어** - 스레드는 시간이 지남에 따라 **Interleave - 인터리브**된다.
- **다중 코어** - 일부 스레드는 병렬로 실행될 수 있다.

![](../../assets/images/operating-system/Thread/3.png)

> **✋ [인터리브(Interleave)란?](https://www.scienceall.com/%EC%9D%B8%ED%84%B0%EB%A6%AC%EB%B8%8Cinterleave/)**
> - 컴퓨터 하드디스크의 성능을 높이기 위해 **데이터를 서로 인접하지 않게 배열하는 방식을 말한다.**
> - 인터리브(interleave)라는 단어는 ‘교차로 배치하다’라는 뜻이며, 이를 통해 디스크 드라이브를 좀더 효율적으로 만들수 있다.
> - 인터리브는 기억장치를 몇 개의 부분으로 나누어서 메모리 액세스를 동시에 할 수 있게 함으로써 복수의 명령을 처리하여 메모리 액세스의 효율화를 도모하는 것이다.
> - 대부분의 하드디스크는 드라이브의 속도와 운영체제(OS), 응용 프로그램 등에 영향을 받기 때문에 인터리브 값을 미리 설정하지는 않는다.
> - 인터리브 값이 작을수록 하드디스크 드라이브의 속도가 빨라진다.

### **멀티코어 시스템 프로그래밍 시 고려할 점**
- **Identifying tasks (작업 식별)** - 각 스레드가 수행해야 할 작업을 확실히 구별 해야한다.
- **Balance (균형)** -  각 스레드의 작업 균형을 확인해야 한다.
- **Data splitting (데이터 분할)** - 별도의 코어에서 실행하려면 데이터도 분할해야 한다.
- **Data dependency (데이터 종속성)** - 작업 실행이 동기화되었는지 확인한다.
- **Testing and debugging (테스트 및 디버깅)**

![](../../assets/images/operating-system/Thread/4.png)

### **✋ 코어는 무조건 많을수록 좋은가? [Amdahl’s Law - 암달의 법칙](https://johngrib.github.io/wiki/amdahl-s-law/)**
