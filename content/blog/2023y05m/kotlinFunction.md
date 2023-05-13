---
title: 코틀린의 함수는 어떻게 구현될까?
date: "2023-05-12"
tags:
   - kotlin
   - function
---

# 의문

<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fhika00%2Fposts%2Fpfbid036LeauGbWWn1uW14Qtpengk6tjQDCiYijFMJj2iSZ7tSG5Ls1PzofQ281gcU7BvDLl&show_text=true&width=500" width="500" height="130" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>

이 글을 쓰게된 계기는 위의 스터디를 진행하면서 `자바의 함수 개념과 코틀린의 함수 개념은 완전히 다르다.`라는 얘기가 나왔다.  
개인적인 생각으로는 코틀린 코드도 코틀린 컴파일러에 의해 `.class`로 컴파일되는데
- `자바에서 불가능한 것을 코틀린에서 가능하게 할 수 있는것일까?`
- `코틀린에서 가능하다면 자바에서도 가능한 것이 아닐까?` 
라는 의문에서 출발한다.  
  
코틀린에서 함수는 **일급 시민**으로 취급될 수 있고, **고차 함수**로 정의할 수 있다.  
한 마디로, **함수를 변수 취급할 수 있고, 함수 내에서 함수를 반환하는 것이 가능하다는 것이다.**  
코틀린의 함수는 어떻게 자바로 작성되는지 확인해보자.(`@Metadata`는 제외)  
  
# 코틀린의 람다 함수와 익명 함수
  
```
// 코틀린
class KotlinFunction {
    val twiceLambda : (Int) -> Int = { it * 2 }
    val twiceAnonymousFunction : (Int) -> Int = fun(param: Int) = param * 2
}

fun main() {
    val function = KotlinFunction()
    function.twiceLambda(10)
    function.twiceAnonymousFunction(10)
}
```

```java
// 자바
public final class KotlinFunction {
   @NotNull
   private final Function1 twiceLambda;
   @NotNull
   private final Function1 twiceAnonymousFunction;

   @NotNull
   public final Function1 getTwiceLambda() {
      return this.twiceLambda;
   }

   @NotNull
   public final Function1 getTwiceAnonymousFunction() {
      return this.twiceAnonymousFunction;
   }

   public KotlinFunction() {
      this.twiceLambda = (Function1)null.INSTANCE;
      this.twiceAnonymousFunction = (Function1)null.INSTANCE;
   }
}

public static final void main() {
    KotlinFunction function = new KotlinFunction();
    function.getTwiceLambda().invoke(10);
    function.getTwiceAnonymousFunction().invoke(10);
}
```
  
자바 코드를 확인해보면 `Function1` 타입 내부 필드로 정의되며, 클라이언트 측 코드는 `invoke()`를 통해 실행한다.  
`Function1`타입은 `Functions.kt`에 정의된 PECS규칙을 지키는 **SAM 인터페이스**다.  
  
```
public interface Function0<out R> : Function<R> {
    /** Invokes the function. */
    public operator fun invoke(): R
}
/** A function that takes 1 argument. */
public interface Function1<in P1, out R> : Function<R> {
    /** Invokes the function with the specified argument. */
    public operator fun invoke(p1: P1): R
}
/** A function that takes 2 arguments. */
public interface Function2<in P1, in P2, out R> : Function<R> {
    /** Invokes the function with the specified arguments. */
    public operator fun invoke(p1: P1, p2: P2): R
}

...

/** A function that takes 22 arguments. */
public interface Function22<in P1, in P2, in P3, in P4, in P5, in P6, in P7, in P8, in P9, in P10, in P11, in P12, in P13, in P14, in P15, in P16, in P17, in P18, in P19, in P20, in P21, in P22, out R> : Function<R> {
    /** Invokes the function with the specified arguments. */
    public operator fun invoke(p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9, p10: P10, p11: P11, p12: P12, p13: P13, p14: P14, p15: P15, p16: P16, p17: P17, p18: P18, p19: P19, p20: P20, p21: P21, p22: P22): R
}
```
  
각 `interface`들이 추가로 상속 받고 있는 `Function<out R>`은 코틀린 패키지에 정의된 인터페이스다.  
**반환 타입의 공변을 지정하기 위해 선언한 인터페이스 인 것 같다.**  
  
```
package kotlin

/**
 * Represents a value of a functional type, such as a lambda, an anonymous function or a function reference.
 *
 * @param R return type of the function.
 */
public interface Function<out R>
```
  
결국은 아래의 자바 예제와 같이 **코틀린도 자바의 SAM 인터페이스를 미리 정의해놓고 이 인터페이스를 구현하는 익명 함수인 것으로 보인다.**  
  
```java
@FunctionalInterface
public interface Twice {
    int invoke(int value);
}

public static void main(String[] args) {
    Twice twiceLambda = value -> value * 2;
    Twice twiceAnonymousFunction = new Twice() {
        @Override
        public int invoke(int value) {
            return value * 2;
        }
    };

    twiceLambda.invoke(10);
    twiceAnonymousFunction.invoke(10);
}
```
  
그렇다면 일급 시민과 고차 함수가 포함된 클로저를 작성해 확인해보자.

# (+) 인자가 22개를 초과하면 어떻게 될까?

코틀린의 `Functions.kt`에는 22개 인자까지만 명시되어 있었다.  
22개를 초과하면 어떻게 될까?  
  
```
val argumentOver : (
        Int, Int, Int, Int, Int, Int, Int, Int, Int, Int,
        Int, Int, Int, Int, Int, Int, Int, Int, Int, Int,
        Int, Int, Int
    ) -> Int =
        { i: Int, ... i22: Int -> 1 }
```

```java
public final class KotlinFunction {
   @NotNull
   private final FunctionN argumentOver;

   @NotNull
   public final FunctionN getArgumentOver() {
      return this.argumentOver;
   }

   public KotlinFunction() {
      this.argumentOver = (FunctionN)null.INSTANCE;
   }
}

@kotlin.SinceKotlin 
public interface FunctionN<out R> : kotlin.Function<R>, kotlin.jvm.internal.FunctionBase<R> {
    public abstract val arity: kotlin.Int

    public abstract operator fun invoke(vararg args: kotlin.Any?): R
}
```
  
그냥 인자를 가변 배열로 받는 `FunctionN`을 사용한다.

# 코틀린의 클로저

이전 입력을 저장하는 (반환 타입 람다 외부의 지역변수를 참조하는) 클로저를 예제로 만들어보자.  
- `0이면 기억된 값을 반환`
- `0이 아니면 기억된 값을 반환하고, 그 값을 저장`

```
// 코틀린
class KotlinFunction {
    fun memoryClosure(param: Int) : (Int) -> Int {
        var memory = param
        return { param2 ->
            when (param2) {
                0 -> memory
                else -> {
                    val tmp = memory
                    memory = param2
                    tmp
                }
            }
        }
    }
}

fun main() {
    val closure: (Int) -> Int = KotlinFunction().memoryClosure(10)
    println(closure(0))
}
```

```java
// 자바
public final class KotlinFunction {
   @NotNull
   public final Function1 memoryClosure(int param) {
      final Ref.IntRef memory = new Ref.IntRef();
      memory.element = param;
      return (Function1)(new Function1() {
         // $FF: synthetic method
         // $FF: bridge method
         public Object invoke(Object var1) {
            return this.invoke(((Number)var1).intValue());
         }

         public final int invoke(int param2) {
            int var10000;
            switch (param2) {
               case 0:
                  var10000 = memory.element;
                  break;
               default:
                  int tmp = memory.element;
                  memory.element = param2;
                  var10000 = tmp;
            }

            return var10000;
         }
      });
   }
}

public final class KotlinFunctionKt {
   public static final void main() {
      new KotlinFunction();
      Function1 closure = (new KotlinFunction()).memoryClosure(10);
      int var2 = ((Number)closure.invoke(0)).intValue();
      System.out.println(var2);
   }
}
```
  
자바 코드로 디컴파일한 `memoryClosure()` 메소드를 보면 람다 외부로 지정된 `memory` 변수 참조를 유지하기 위해 `Ref` 클래스로 선언한 것을 제외하곤 큰 차이점은 없다.  
위의 클로저 함수를 자바로 작성해보자.  
- `MemoryClousre` 함수형 인터페이스의 구현을 통해 `ClousreFunction`을 반환
  
```java
@FunctionalInterface
public interface MemoryClosure {
    ClosureFunction invoke(int value);
}

@FunctionalInterface
public interface ClosureFunction {
    Integer invoke(Integer value);
}

public class Program {
    public static void main(String[] args) {
        MemoryClosure closure = new MemoryClosure() {
            @Override
            public ClosureFunction invoke(int param) {
                final Integer[] memory = {param};
                return new ClosureFunction() {
                    @Override
                    public Integer invoke(Integer value2) {
                        Integer result;
                        if (value2 == 0) {
                            result = memory[0];
                        } else {
                            Integer tmp = memory[0];
                            memory[0] = value2;
                            result = tmp;
                        }
                        return result;
                    }
                };
            }
        };

        ClosureFunction function = closure.invoke(10);
        System.out.println(function.invoke(0));
        System.out.println(function.invoke(11));
        System.out.println(function.invoke(12));
        // 10
        // 10
        // 11
    }
}
```
  
위와 같이 자바에서도 코틀린에서 작성한 예제와 같이 똑같은 기능을 할 수 있다.  

# 결론

코틀린의 람다 함수, 익명 함수, 클로저 예제들을 디컴파일해보고, 똑같이 (불편하지만) 자바로 작성해보았다.  
**코틀린 컴파일러가 마법같은 일을 해주진 않는 것을 확인했고, 코틀린도 결국 자바의 함수형 인터페이스를 사용하는 것을 확인했다.**  
`자바의 함수 개념과 코틀린의 함수 개념은 완전히 다르다.`라는 말은 **고수준 언어 관점에서 나온 이야기 인 것 같다.**  