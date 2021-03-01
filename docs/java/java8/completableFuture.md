---
layout: default
title: CompletableFuture
parent: JAVA8
grand_parent: JAVA
nav_order: 6
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

# **자바에서 비동기(Asynchronous) 프로그래밍을 가능케하는 인터페이스**

-   Future를 사용해서 어느정도 가능했지만 하기 힘든일 들이 많았다.
    -   Future를 외부에서 완료 시킬 수 없다. 취소하거나 , get()에 타임아웃을 설정할 수는 있다.
    -   블록킹 코드 get()을 사용하지 않고서는 작업이 끝났을 때 콜백을 실행할 수 없다.
    -   여러 Future를 조합할 수 없다.
    -   예) Event 정보 가져온 다음 Event에 참석하는 회원 목록 가져오기
    -   예외 처리용 API를 제공하지 않는다.

# **CompletableFuture**

- [CompletableFuture (Java Platform SE 8 ) (oracle.com)](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CompletableFuture.html)
-   **Implements Future**
-   **Implements CompletionStage - [CompletionStage (Java Platform SE 8 ) (oracle.com)](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CompletionStage.html)**

## **비동기로 작업 실행하기**

-   **runAsync()** - 리턴 값이 없는 경우
-   **supplyAsync()** - 리턴 값이 있는 경우
-   원하는 Executor(Thread Pool)를 사용해서 실행할 수도 있다.
-   기본은 ForkJoinPool.commonPool()
    -   ForkJoinPool - JAVA7

```java
public static void main(String[] args) throws ExecutionException, InterruptedException {
    CompletableFuture<String> completableFuture = new CompletableFuture<>();
    completableFuture.complete("test");
    // 위와 동일한 코드이다.
    CompletableFuture<String> completableFuture1 = CompletableFuture.completedFuture("test");

    // runAsync - 리턴 값이 없는 경우
    CompletableFuture<Void> completableFuture2 = CompletableFuture.runAsync(() -> {
        System.out.println("Hello " + Thread.currentThread().getName());
    });
    completableFuture2.get();
    // 출력
    // Hello ForkJoinPool.commonPool-worker-3

    // supplyAsync() - 리턴 값이 있는 경우
    CompletableFuture<String> completableFuture3 = CompletableFuture.supplyAsync(() -> {
        return "return Value!!!";
    });
    System.out.println(completableFuture3.get());
    // 출력
    // return Value!!!
}
```

## **콜백 제공하기**

###  thenApply(Function)
✅**리턴 값을 받아서 다른 값으로 바꾸는 콜백**
{: .fh-default .fs-4 }

```java
public static void main(String[] args) throws ExecutionException, InterruptedException {

    CompletableFuture<String> completableFuture = CompletableFuture.supplyAsync(() -> {
        System.out.println("Return : " + Thread.currentThread().getName());
        return "return Value!!!";
    }).thenApply((s) -> {
        System.out.println("Then Apply : " + Thread.currentThread().getName());
        return s.toUpperCase();
    });

    // get을 호출하지 않으면 아무일도 일어나지 않는다.
    String s = completableFuture.get();
    System.out.println(s);
    // 출력
    // Return : ForkJoinPool.commonPool-worker-3
    // Then Apply : ForkJoinPool.commonPool-worker-3
    // RETURN VALUE!!!
}
```

### thenAccept(Consumer)
✅**리턴 값으로 또 다른 작업을 처리하는 콜백 ( 리턴없이 )**
{: .fh-default .fs-4 }

```java
    public static void main(String[] args) throws ExecutionException, InterruptedException {

        CompletableFuture<Void> completableFuture = CompletableFuture.supplyAsync(() -> {
            System.out.println("Return : " + Thread.currentThread().getName());
            return "return Value!!!";
        }).thenAccept((s) -> {
            System.out.println("Then Accept : " + Thread.currentThread().getName());
            System.out.println("Then Accept To UpperCase : " + s.toUpperCase());
        });

        completableFuture.get();
        // 출력
        // Return : ForkJoinPool.commonPool-worker-3
        // Then Accept : ForkJoinPool.commonPool-worker-3
        // Then Accept To UpperCase : RETURN VALUE!!!
    }
```

### thenRun(Runnable)
✅**다른 작업을 처리하는 콜백**
{: .fh-default .fs-4 }

```java
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        CompletableFuture<Void> completableFuture = CompletableFuture.supplyAsync(() -> {
            System.out.println("Return : " + Thread.currentThread().getName());
            return "return Value!!!";
        }).thenRun(() -> {
            // Runnable
            System.out.println("Then Run : " + Thread.currentThread().getName());
        });

        completableFuture.get();
        // 출력
        // Return : ForkJoinPool.commonPReturn : ForkJoinPool.commonPool-worker-3
        // Then Run : ForkJoinPool.commonPool-worker-3
    }
```

### 콜백 자체를 또 다른 Thread에서 실행할 수 있다.
-   ForkJoinPool을 사용하지 않고 개발자가 직접 만든 Thread를 제공할 수도 있다.
-   ExecutorService를 새로 생성하여 매개변수로 전달하면 된다.

```java
public static void main(String[] args) throws ExecutionException, InterruptedException {
    ExecutorService executorService = Executors.newFixedThreadPool(4);
    CompletableFuture<Void> completableFuture = CompletableFuture.supplyAsync(() -> {
        System.out.println("Return : " + Thread.currentThread().getName());
        return "return Value!!!";
    } , executorService).thenRun(() -> {
        // Runnable
        System.out.println("Then Run : " + Thread.currentThread().getName());
    });

    completableFuture.get();
    executorService.shutdown();
//        출력
//        Return : pool-1-thread-1
//        Then Run : pool-1-thread-1
}
```
***

## **조합하기**

###  thenCompose()
✅**두 작업이 서로 이어서 실행하도록 조합**
{: .fh-default .fs-4 }

```java
public static void main(String[] args) throws ExecutionException, InterruptedException {

    CompletableFuture<String> hello = CompletableFuture.supplyAsync(() -> {
        System.out.println("Hello : " + Thread.currentThread().getName());
        return "Hello ";
    });

    // hello.thenCompose(s -> getWorld(s));
    CompletableFuture<String> helloWorld =
            hello.thenCompose(AppForCompletableFuture::getWorld);
    System.out.println(helloWorld.get());

    // 출력
    // Hello : ForkJoinPool.commonPool-worker-3
    // World : ForkJoinPool.commonPool-worker-5
    // Hello  World
}
private static CompletableFuture<String> getWorld(String message) {
    return CompletableFuture.supplyAsync(() -> {
        System.out.println("World : " + Thread.currentThread().getName());
        return message + " World";
    });
}
```

### thenCombine()
✅**두 작업을 독립적으로 실행하고 둘 다 종료 했을 때 콜백 실행**
{: .fh-default .fs-4 }

```java
public static void main(String[] args) throws ExecutionException, InterruptedException {

    CompletableFuture<String> hello = CompletableFuture.supplyAsync(() -> {
        System.out.println("Hello : " + Thread.currentThread().getName());
        return "Hello ";
    });

    CompletableFuture<String> world = CompletableFuture.supplyAsync(() -> {
        System.out.println("World : " + Thread.currentThread().getName());
        return "World";
    });

    CompletableFuture<String> result = hello.thenCombine(world, (h , w) -> h + " " + w);
    System.out.println(result.get());
    // 출력
    // Hello : ForkJoinPool.commonPool-worker-3
    // World : ForkJoinPool.commonPool-worker-5
    // Hello  World
}
```

### allOf()
✅**여러 작업을 모두 실행하고 모든 작업 결과에 콜백 실행**
{: .fh-default .fs-4 }
**allOf를 사용하여 작업의 결과를 List로 반환받기**

```java
public static void main(String[] args) throws ExecutionException, InterruptedException {

    CompletableFuture<String> hello = CompletableFuture.supplyAsync(() -> {
        System.out.println("Hello : " + Thread.currentThread().getName());
        return "Hello ";
    });

    CompletableFuture<String> world = CompletableFuture.supplyAsync(() -> {
        System.out.println("World : " + Thread.currentThread().getName());
        return "World";
    });

    List<CompletableFuture> futures = Arrays.asList(hello , world);

    CompletableFuture[] futuresArray
            = futures.toArray(new CompletableFuture[futures.size()]);

    // 결과 타입들이 모두 동일해야한다.
    CompletableFuture<List<Object>> listCompletableFuture =
            CompletableFuture.allOf(futuresArray).thenApply(v -> {
                return futures.stream()
                        .map(CompletableFuture::join)
                        .collect(Collectors.toList());
            });

    listCompletableFuture.get().forEach(System.out::println);

    // 출력
    // Hello : ForkJoinPool.commonPool-worker-3
    // World : ForkJoinPool.commonPool-worker-5
    // Hello
    // World
}
```

### anyOf()
✅**여러 작업 중에 가장 빨리 끝난 하나의 결과에 콜백 실행**
{: .fh-default .fs-4 }

```java
public static void main(String[] args) throws ExecutionException, InterruptedException {

    CompletableFuture<String> hello = CompletableFuture.supplyAsync(() -> {
        System.out.println("Hello : " + Thread.currentThread().getName());
        return "Hello ";
    });

    CompletableFuture<String> world = CompletableFuture.supplyAsync(() -> {
        System.out.println("World : " + Thread.currentThread().getName());
        return "World";
    });

    CompletableFuture<Void> future =
            CompletableFuture.anyOf(hello, world).thenAccept(System.out::println);
    future.get();

    // 출력
    // Hello : ForkJoinPool.commonPool-worker-3
    // World : ForkJoinPool.commonPool-worker-5
    // Hello
}
```

***

## **예외처리**

### exceptionally(Function)

```java
public static void main(String[] args) throws ExecutionException, InterruptedException {
    boolean throwError = true;

    CompletableFuture<String> hello = CompletableFuture.supplyAsync(() -> {
        if(throwError){
            throw new IllegalArgumentException();
        }
        System.out.println("Hello : " + Thread.currentThread().getName());
        return "Hello ";
    }).exceptionally(exceptionType -> {
        System.out.println("Exception Type : " + exceptionType);
        return "Error!";
    });

    System.out.println(hello.get());

    // 출력
    // Exception Type : java.util.concurrent.CompletionException: java.lang.IllegalArgumentException
    // Error!
}
```

### handle(BiFunction)

```java
public static void main(String[] args) throws ExecutionException, InterruptedException {
    boolean throwError = true;

    CompletableFuture<String> hello = CompletableFuture.supplyAsync(() -> {
        if(throwError){
            throw new IllegalArgumentException();
        }
        System.out.println("Hello : " + Thread.currentThread().getName());
        return "Hello ";
    }).handle((result , exceptionType) -> {
        // 첫번째 파라미터 - 정상적인 경우 반환되는 결과 값
        // 두번째 파라미터 - 예외 발생시 예외
        if(exceptionType != null){
            System.out.println("Exception Type : " + exceptionType);
            return "ERROR !!!";
        }
        return result;
    });

    System.out.println(hello.get());
    // 예외 발생 시 "ERROR !!!" 를 반환
    // 에외가 발생하지 않았을 시 "Hello" 반환
}
```

# **참고**
[ForkJoinPool (Java Platform SE 8 ) (oracle.com)](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ForkJoinPool.html)
{: .fh-default .fs-4 }
[CompletableFuture (Java Platform SE 8 ) (oracle.com)](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CompletableFuture.html)
{: .fh-default .fs-4 }
