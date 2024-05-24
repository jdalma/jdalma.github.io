---
title: invokedynamic 이란?
date: "2024-05-24"
tags:
   - java
---

# 발단

자바와 코틀린에서 람다를 처리하는 방식이 다르다는 것을 알게됐다.  
코틀린을 먼저 확인해보자.  

```kotlin
fun main(args: Array<String>) {
    val numbers = listOf(1,2,4,5,6,7,8,9)
    val number = 7

    val result = numbers.filter { it == number }
}
private fun <T> Iterable<T>.filter(predicate: (T) -> Boolean): Iterable<T> {
    val destination = arrayListOf<T>()
    for (element in this) if (predicate(element)) destination.add(element)
    return destination
}
```

위의 확장함수에 람다를 전달하는 코틀린 코드는 아래와 같이 컴파일된다.  

```java
public final class MainKt {
   public static final void main(@NotNull String[] args) {
      ...
      Iterable result = filter((Iterable)numbers, (Function1)(new Function1() {
         // $FF: synthetic method
         // $FF: bridge method
         public Object invoke(Object var1) {
            return this.invoke(((Number)var1).intValue());
         }

         public final boolean invoke(int it) {
            return it == number;
         }
      }));
   }

   private static final Iterable filter(Iterable $this$filter, Function1 predicate) {
      ...
      while(var4.hasNext()) {
         Object element = var4.next();
         if ((Boolean)predicate.invoke(element)) {
            destination.add(element);
         }
      }
      ...
   }
}
```
  
`filter()`에 전달된 람다가 `Function1` 타입의 인스턴스로 생성되어 `invoke()`되는 것을 확인할 수 있다.  
이렇게 람다를 함수 유형의 인스턴스로 생성하여 (익명 클래스) 사용하는 것은 단점이 존재한다.  

1. **컴파일러는 익명 클래스에 대응하는 새로운 클래스 파일을 생성화며, 이 클래스를 사용하려면 각각의 클래스를 로드하고 검증하는 과정이 필요하므로 애플리케이션 스타트업의 성능에 악영향을 미친다.**
2. **새로운 익명 클래스는 클래스나 인터페이스의 새로운 서브형식을 만든다.** Comparator를 표현하는 수백 개의 람다가 있다면 결국 수백 가지의 Comparator 서브형식이 생긴다는 의미다.

코틀린은 자바6 와의 호환성을 위해 기본적으로 람다를 항상 함수 유형의 인스턴스를 생성하여(익명 클래스) 사용하기 때문에 `inline` 키워드를 사용하여 성능상 이점을 누릴 수 있다.    
`filter()` 확장함수에 `inline` 키워드를 추가하면 컴파일러가 람다의 바이트 코드를 삽입하여 주기 때문에 아래와 같이 오버헤드를 줄일 수 있다.  

```java
public final class MainKt {
   public static final void main(@NotNull String[] args) {
      Intrinsics.checkNotNullParameter(args, "args");
      List numbers = CollectionsKt.listOf(new Integer[]{1, 2, 4, 5, 6, 7, 8, 9});
      int number = 7;
      Iterable $this$filter$iv = (Iterable)numbers;
      int $i$f$filter = false;
      ArrayList destination$iv = new ArrayList();
      Iterator var7 = $this$filter$iv.iterator();

      while(var7.hasNext()) {
         Object element$iv = var7.next();
         int it = ((Number)element$iv).intValue();
         int var10 = false;
         if (it == number) {
            destination$iv.add(element$iv);
         }
      }

      Iterable result = (Iterable)destination$iv;
   }
}
```

# 자바 바이트코드 확인하기

코틀린에서는 람다를 사용할 때 생기는 문제를 해결하기 위해 `inline` 키워드를 제공하는 것을 알아보았다.  
그럼 자바는 여전히 함수 인스턴스를 매번 생성해서 사용할까?  
익명 클래스와 람다를 바이트코드로 확인해보자.  

```java
public class InnerClass {

    Function<Object, String> toString1 = new Function<Object, String>() {
        @Override
        public String apply(Object o) {
            return o.toString();
        }
    };

    Function<Object, String> toString2 = Object::toString;

    public static void main(String[] args) {
        InnerClass innerClass = new InnerClass();
        innerClass.toString1.apply("test");
        innerClass.toString2.apply("test");
    }
}
```

```
public class org.example.InnerClass {
  java.util.function.Function<java.lang.Object, java.lang.String> toString1;

  java.util.function.Function<java.lang.Object, java.lang.String> toString2;

  public org.example.InnerClass();
    Code:
       0: aload_0
       1: invokespecial #1      // Method java/lang/Object."<init>":()V
       4: aload_0
       5: new           #2      // class org/example/InnerClass$1
       8: dup
       9: aload_0
      10: invokespecial #3      // Method org/example/InnerClass$1."<init>":(Lorg/example/InnerClass;)V
      13: putfield      #4      // Field toString1:Ljava/util/function/Function;
      16: aload_0
      17: invokedynamic #5,  0  // InvokeDynamic #0:apply:()Ljava/util/function/Function;
      22: putfield      #6      // Field toString2:Ljava/util/function/Function;
      25: return

  public static void main(java.lang.String[]);
    Code:
       0: new           #7      // class org/example/InnerClass
       3: dup
       4: invokespecial #8      // Method "<init>":()V
       7: astore_1
       8: aload_1
       9: getfield      #4      // Field toString1:Ljava/util/function/Function;
      12: ldc           #9      // String test
      14: invokeinterface #10,2 // InterfaceMethod java/util/function/Function.apply:(Ljava/lang/Object;)Ljava/lang/Object;
      19: pop
      20: aload_1
      21: getfield      #6      // Field toString2:Ljava/util/function/Function;
      24: ldc           #9      // String test
      26: invokeinterface #10,2 // InterfaceMethod java/util/function/Function.apply:(Ljava/lang/Object;)Ljava/lang/Object;
      31: pop
      32: return
}
```

> invokevirtual은 자바 바이트코드에서 메서드를 호출하는 가장 기본적인 명령어의 OpCode(operation code)이다.  
> 참고로, 자바 바이트코드에서 메서드를 호출하는 명령어 OpCode는 invokeinterface, invokespecial, invokestatic, invokevirtual의 4가지가 있으며 각각의 의미는 다음과 같다.  
> 1. `invokeinterface`: 인터페이스 메서드 호출
> 2. `invokespecial`: 생성자, private 메서드, 슈퍼 클래스의 메서드 호출
> 3. `invokestatic`: static 메서드 호출
> 4. `invokevirtual`: 인스턴스 메서드 호출

`InnerClass$1`이라는 이름은 컴파일러가 익명 클래스에 붙인 이름이며, `new` 연산을 통해 메모리를 힙 안에 할당하고, 할당된 위치를 가리키는 참조를 오퍼랜드 스택에 쌓는다.  
그리고 `invokespecial`을 통해 생성자를 호출한다.  
**하지만 람다는 `invokedynamic` 연산만 호출된다.**  

# invokedynamic 이란?

자바 SE 7부터 JVM 자체에서 자바 언어뿐만 아니라 다른 언어, 특히 스크립트 언어들과 같이 타입이 고정되어 있지 않은 동적 타입 언어를 지원하기 위해 추가된 명령어이다.  
이 명령어는 Java 8에서 람다 표현식을 구현하기 위한 기반을 마련했을 뿐만 아니라 동적 언어를 Java 바이트 코드 형식으로 변환하는 데 있어서도 큰 전환점이 되었다.  


# 참고

- [Inline Functions in Kotlin](https://www.baeldung.com/kotlin/inline-functions)
- [JVM Internal](https://d2.naver.com/helloworld/1230)
- [모던 자바 인 액션](https://m.yes24.com/Goods/Detail/77125987) : 부록 D
- [Back to the Essence - Java 컴파일에서 실행까지 - (1)](https://homoefficio.github.io/2019/01/31/Back-to-the-Essence-Java-%EC%BB%B4%ED%8C%8C%EC%9D%BC%EC%97%90%EC%84%9C-%EC%8B%A4%ED%96%89%EA%B9%8C%EC%A7%80-1/)
- [Back to the Essence - Java 컴파일에서 실행까지 - (2)](https://homoefficio.github.io/2019/01/31/Back-to-the-Essence-Java-%EC%BB%B4%ED%8C%8C%EC%9D%BC%EC%97%90%EC%84%9C-%EC%8B%A4%ED%96%89%EA%B9%8C%EC%A7%80-2/)
- [Java Virtual Machine Support for Non-Java Languages](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/multiple-language-support.html)
- [Dismantling invokedynamic](https://dzone.com/articles/dismantling-invokedynamic)
- [Why Kotlin decompiler generates null.INSTANCE](https://discuss.kotlinlang.org/t/why-kotlin-decompiler-generates-null-instance/10426)