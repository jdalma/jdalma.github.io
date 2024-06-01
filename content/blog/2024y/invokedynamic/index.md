---
title: invokedynamic 이란? (작성 중)
date: "2024-06-02"
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
  
```ruby
def addtwo(a, b)
    a + b;
end
```

위의 코드를 컴파일할 때는 a와 b의 형식을 알 수 없듯이 동적 타입 언어 컴파일의 난제는 프로그램이 컴파일된 후 메서드나 함수의 가장 적절한 구현을 선택할 수 있는 런타임 시스템을 구현하는 방법이다.  
**Java SE 7은 런타임 시스템이 `call site`와 `메서드 구현` 간의 연결을 커스터마이징할 수 있도록 `invokedynamic` 명령어를 도입한 것이다.**  
위의 예제에서 호출된 invokedynamic call site는 `+`이며, 이 call site는 `bootstrap method`를 통해 메서드에 연결되며, **이는 동적 유형 언어에 대해 컴파일러가 지정한 메서드로서 JVM에서 site를 연결하기 위해 한 번 호출된다.**  
런타임 시스템이 `adder(Integer, Integer)` 메서드를 알고 있다고 가정하면 런타임은 invokedynamic call site를 adder 메서드에 연결할 수 있다.  

```java
public class Ops {
    public static Integer adder(Integer x, Integer y) {
        return x + y;
    }
    public static String adder(String x, String y) {
        return x + y;
    }
}

class MethodHandleTest {

    // 이 메서드는 호출된 invokedynamic call site를  adder 메서드에 연결하는 부트스트랩 메서드이다.
    public static CallSite mybsm(MethodHandles.Lookup callerClass, String dynamicMethodName, MethodType dynamicMethodType) throws Throwable {
        // adder 메서드에 대한 정적 메서드 핸들을 생성한다.
        MethodHandle methodHandle = callerClass.findStatic(
            Ops.class,
            dynamicMethodName,
            dynamicMethodType
        );
        return new ConstantCallSite(methodHandle);
    }

    @Test
    void intAdder() throws Throwable {
        CallSite adder = mybsm(lookup(), "adder", MethodType.methodType(Integer.class, Integer.class, Integer.class));
        MethodHandle methodHandle = adder.dynamicInvoker();

        assertThat(methodHandle.invoke(1, 7)).isEqualTo(8);
    }

    @Test
    void stringAdder() throws Throwable {
        CallSite adder = mybsm(lookup(), "adder", MethodType.methodType(String.class, String.class, String.class));
        MethodHandle methodHandle = adder.dynamicInvoker();

        assertThat(methodHandle.invoke("1", "7")).isEqualTo("17");
    }

    @Test
    void wrongAdder() {
        assertThatThrownBy(() ->
            mybsm(lookup(), "adder", MethodType.methodType(Integer.class, String.class, String.class))
        ).isExactlyInstanceOf(NoSuchMethodException.class);
    }
}
```

> `java.lang.invoke.MethodHandles` 및 `java.lang.invoke.MethodHandle` 클래스에는 기존 메서드 핸들을 기반으로 메서드 핸들을 생성하는 다양한 메서드가 포함되어 있다.  
> 런타임 시스템에서 사용할 수 있는 메서드가 여러 개 있고 각각 다른 인수 유형을 처리하는 경우 부트스트랩 메서드 mybsm은 **dynamicMethodType 인수에 따라 메서드를 동적으로 선택할 수 있다.**  
> invokedynamic 명령어는 컴파일러와 런타임 시스템의 동적 언어 구현을 단순화하며, 이는 Java 클래스 및 인터페이스에 특정한 연결 동작이 JVM에 의해 하드와이어링 되는 invokevirtual과 같은 다른 JVM 명령어와 대조된다.  

위의 예제처럼 `MethodHandle`을 사용하는 것은 Reflection API에 비해 너무 복잡하다고 느낄 수 있다.  
하지만 `MethodHandle`의 주된 목적은 메서드를 직접 호출하는 것이 아니라 **invokedynamic call site와 함께 사용하는 것이 주된 목적이다.**  


invokedynamic 명령의 각 인스턴스를 `dynamic call site`라고 하며, 최초에는 호출할 메서드가 지정되어 있지 않아 위와 같은 부트스트랩 메서드를 통해 메서드에 연결된다.  

부트스트랩 메서드가 반환하는 `ConstantCallSite` 인스턴스는 호출된 **invokedynamic 명령어**와 연결할 호출 사이트를 의미하며 고유하다. ConstantCallSite 인스턴스의 대상(target)은 영구적이며 절대 변경할 수 없다.  
  
invokedynamic 명령으로 동적으로 연결된 메서드를 호출하려면 아래의 단계가 필요하다.  

1. **Defining the Bootstrap Method** (부트스트랩 메서드 정의하기)
2. **Specifying Constant Pool Entries** (상수 풀 항목 지정하기)
3. **Using the invokedynamic Instruction** (호출된 동적 인스트럭션 사용)

## 부트스트랩 메서드 정의하기

JVM이 런타임에 invokedynamic 명령을 '처음'만나면 부트스트랩 메서드를 호출한다.  
이 부트스트랩 메서드는 동적으로 입력된 언어에 대해 컴파일러가 지정한 메서드로, JVM에서 site를 연결하기 위해 한 번 호출된다.  
그리고 호출된 invokedynamic 명령어에 지정된 이름을 실행해야 하는 코드(대상 메서드)와 MethodHandle에 의해 참조되는 메서드를 연결한다.  
부트스트랩 메서드의 반환 유형은 `java.lang.invoke.CallSite`여야 한다.  
  
즉, CallSite 객체는 호출된 invokedynamic 명령의 연결된 상태와 연결된 메서드 핸들을 나타낸다.  
**JVM이 동일한 호출된 동적 명령어를 다시 실행하면 부트스트랩 메서드를 호출하지 않고 연결된 메서드 핸들을 자동으로 호출한다.**  
  
```java
abstract public class CallSite {
    static { MethodHandleImpl.initStatics(); }

    // The actual payload of this call site:
    /*package-private*/
    MethodHandle target;    // Note: This field is known to the JVM.  Do not change.

    public abstract MethodHandle dynamicInvoker();
    ...
}
```

컴파일러는 람다 식을 캡처하기 위해 생성하는 코드는 람다 식 자체와 해당 식이 할당되는 함수형 인터페이스 유형에 따라 달라진다.  
람다 식을 구현하는 객체를 생성하기 위해 바이트코드를 생성하는 대신(예: 내부 클래스의 생성자 호출), 람다를 구성하는 레시피를 설명하고 실제 구성은 언어 런타임에 위임합니다. 이 레시피는 호출된 동적 명령어의 정적 및 동적 인수 목록에 인코딩됩니다.  
  
호출된 다이나믹을 사용하면 번역 전략 선택을 런타임까지 연기할 수 있습니다. 런타임 구현은 람다 식을 평가하기 위해 동적으로 전략을 자유롭게 선택할 수 있습니다. 런타임 구현 선택은 람다 구성을 위한 표준화된(즉, 플랫폼 사양의 일부인) API 뒤에 숨겨져 있으므로 정적 컴파일러는 이 API에 대한 호출을 내보낼 수 있으며, JRE 구현은 선호하는 구현 전략을 선택할 수 있습니다. 호출된 동적 메커니즘을 사용하면 이러한 후기 바인딩 접근 방식이 부과할 수 있는 성능 비용 없이 이 작업을 수행할 수 있습니다.
  
컴파일러는 람다 표현식을 만나면 먼저 람다 본문을 람다 표현식의 인자 목록과 반환 유형이 일치하는 메서드로 낮추고(설탕 제거), 추가 인자(있는 경우 어휘 범위에서 캡처한 값)를 추가합니다. 람다 표현식이 캡처되는 지점에서 호출된 invokedynamic call site를 생성하고, 호출되면 람다가 변환되는 함수형 인터페이스의 인스턴스를 반환합니다. 이 호출 사이트를 주어진 람다에 대한 람다 팩토리라고 합니다. 람다 팩토리에 대한 동적 인수는 어휘 범위에서 캡처된 값입니다. 람다 팩토리의 부트스트랩 메서드는 Java 언어 런타임 라이브러리에서 람다 메타팩토리라고 하는 표준화된 메서드입니다. 정적 부트스트랩 인수는 컴파일 시점에 람다에 대해 알려진 정보(변환될 함수 인터페이스, 파생된 람다 본문에 대한 메서드 핸들, SAM 유형이 직렬화 가능한지 여부에 대한 정보 등)를 캡처합니다.

람다 팩토리의 부트스트랩 메서드는 람다 메타팩토리라고 하는 Java 언어 런타임 라이브러리의 표준화된 메서드입니다. 정적 부트스트랩 인수는 컴파일 시점에 람다에 대해 알려진 정보(변환될 함수 인터페이스, 디서깅된 람다 본문에 대한 메서드 핸들, SAM 유형이 직렬화 가능한지 여부에 대한 정보 등)를 캡처합니다.
  
메서드 참조는 람다 표현식과 동일한 방식으로 처리되지만, 대부분의 메서드 참조를 새 메서드로 디서깅할 필요가 없으며 참조된 메서드의 상수 메서드 핸들을 로드하여 메타팩토리로 전달하면 됩니다.
  
`invokedynamic`은 메서드를 호출할 때 **더 깊은 수준의 재전송과 동적 언어에 의존하는 로직이 대상 호출을 결정할 수 있는 기능을 제공한다.**  

 실제 호출할 메서드를 결정하는 언어 종속적 로직을 구현하는 부트스트랩 메서드의 형태로 구성된다.  
부트스트랩 메서드는 연결된 CallSite를 반환한다.  
두 개의 int로 add 메서드를 호출하면 이후로 이어지는 호출에도 두 개의 int가 전달된다.  
결과적으로 매 호출마다 호출할 메서드를 다시 찾을 필요가 없다.  
호출 사이트는 언제 호출 연결을 다시 계산해야 하는지 정의하는 로직을 포함할 수 있다.  
  
`invokedynamic`으로 람다 표현식을 바이트코드로 변환하는 작업을 런타임까지 고의로 지연했다.  
즉, 이 같은 방식으로 람다 표현식을 구현하는 코드의 생성을 런타임으로 미룰 수 있다.  
이러한 설계 덕분에 다음과 같은 장점을 얻게 된다.  

1. 람다 표현식의 바디를 바이트코드로 변환하는 작업이 독립적으로 유지된다.
   - 따라서 변환 작업이 동적으로 바뀌거나 나중에 JVM 구현에서 이를 더 최적화하거나 변환 작업을 고칠 수 있다.
   - 변환 작업은 독립적이므로 바이트코드의 과거버전 호환성을 염려할 필요가 없다.
2. 람다 덕분에 추가적인 필드나 정적 초기자 등의 오버헤드가 사라진다.
3. 상태 없는(캡처하지 않는) 람다에서 람다 객체 인스턴스를 만들고, 캐시하고, 같은 결과를 반환할 수 있다.
   - 자바 8 이전에도 사람들은 이런 방식을 사용했다.
   - 예를 들어, 정적 final 변수에 특정 Comparator 인스턴스를 선언할 수 있다.
4. 람다를 처음 실행할 때만 반환과 결과 연결 작업이 실행되므로 추가적인 성능 비용이 들지 않는다.
   - 즉, 두 번째 호출부터는 이전 호출에서 연결된 구현을 바로 이용할 수 있다.

상태를 포함하지 않는 람다는 컴파일러가 람다 표현식과 같은 시그니처를 갖는 메서드를 생성한다.  
만약 상태를 포함한다면 그 상태를 람다 표현식의 인수에 캡처한 각 변수를 추가하는 것이다.  

# 참고

- **[Java Virtual Machine Support for Non-Java Languages](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/multiple-language-support.html)**
- **[Dismantling invokedynamic](https://dzone.com/articles/dismantling-invokedynamic)**
- **[Translation of Lambda Expressions](https://cr.openjdk.org/~briangoetz/lambda/lambda-translation.html)**
- [Behind the scenes: How do lambda expressions really work in Java?](https://blogs.oracle.com/javamagazine/post/behind-the-scenes-how-do-lambda-expressions-really-work-in-java)
- [Understanding Java method invocation with invokedynamic](https://blogs.oracle.com/javamagazine/post/understanding-java-method-invocation-with-invokedynamic)
- [Mastering the mechanics of Java method invocation](https://blogs.oracle.com/javamagazine/post/mastering-the-mechanics-of-java-method-invocation)
- [Inline Functions in Kotlin](https://www.baeldung.com/kotlin/inline-functions)
- [JVM Internal](https://d2.naver.com/helloworld/1230)
- [모던 자바 인 액션](https://m.yes24.com/Goods/Detail/77125987) : 부록 D
- [JSR 292: Supporting Dynamically Typed Languages on the JavaTM Platform](https://jcp.org/en/jsr/detail?id=292)
- [Why Kotlin decompiler generates null.INSTANCE](https://discuss.kotlinlang.org/t/why-kotlin-decompiler-generates-null-instance/10426)