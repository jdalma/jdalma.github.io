---
title: Iterator?Enumerator?Iterable?
date: "2022-11-15"
tags:
   - Java
   - Lab
---


해당 글은 [백준 - 키로거](https://github.com/PowerAlgorithm/Algorithm-Study/blob/main/%5BWeek5%20-%20Data%20Structure%5D/%EC%A0%95%ED%98%84%EC%A4%80/C_5397.java)문제를 풀며 `LinkedList`로 풀면 시간초과가 났었는데 `ListIterator`를 사용하여 해결하였었다. (`Stack`으로도 풀 수 있다)<br>
이 문제를 계기로 `Iterator`와 `Enumerator`를 정리해보려 한다.<br>


***

- 참고 링크
  - [`java 8 docs` Iterator](https://docs.oracle.com/javase/8/docs/api/java/util/Iterator.html)
  - [`java 8 docs` Enumeration](https://docs.oracle.com/javase/8/docs/api/java/util/Enumeration.html)
  - [`stackoverflow` difference-between-java-enumeration-and-iterator](https://stackoverflow.com/questions/948194/difference-between-java-enumeration-and-iterator)

***

# **Iterator, Enumerator, Iterable** ?

`Iterator`의 공식 문서에 따르면 Collection Framework에서 `Enumeration`을 대체하며 두 가지의 차이점이 있다고 한다.<br>
1. `Iterator`를 사용하면 반복하는 동안 기본 컬렉션에서 요소를 제거할 수 있다.
2. `Enumeration`의 이름을 개선하였다.

<br>

`Enumeration`의 공식 문서에는 해당 인터페이스는 `Iterator`와 중복되며, 선택적 제거를 할 수 있고 메서드 이름이 더 짧다<br>
"`Enumeration`보다 `Iterator`를 사용하는 것을 고려해라" 라고 적혀있다.<br>

<br>

`Iterator`는 원소를 삭제하는 메소드도 지원되고 메소드 이름도 짧게 변경되었으니 `Iterator`를 사용해라 라고 이해할 수 있다.<br>
- 이 글을 작성하게 된 이유인 `ListIterator`인터페이스도 예상하듯이 `Iterator`를 확장하고 있다.

<br>

추가로 [`java 8 docs` Iterable For-Each Loop](https://docs.oracle.com/javase/8/docs/technotes/guides/language/foreach.html)를 확인해보자

```java
public interface Collection<E> extends Iterable<E>

...

// 이 인터페이스를 구현하면 개체가 "for-each 루프" 문의 대상이 될 수 있습니다
public interface Iterable<T> {
    Iterator<T> iterator();
    ...
}
```

- Collection 인터페이스는 `Iterable`을 확장하고 있으며,
- `Iterable`은 `Iterator`를 제공한다.
- 아래는 `List`의 구현체인 `ArrayList`를 **For-Each**로 작성한 것이다.


```java
public static void enhancedForLoop() {
    List<String> test = new ArrayList<>(Arrays.asList("A", "B", "C", "D", "E"));
    for (String e : test) {
        if (e.equals("B")) {
            continue;
        }
        System.out.println(e);
    }
}

...

// 디컴파일
public static void enhancedForLoop() {
    List<String> test = new ArrayList(Arrays.asList("A", "B", "C", "D", "E"));
    Iterator var1 = test.iterator();

    while(var1.hasNext()) {
        String e = (String)var1.next();
        if (!e.equals("B")) {
            System.out.println(e);
        }
    }

}
```

디컴파일된 부분을 보면 `ArrayList`의 `Iterator`를 생성하여 작성하지도 않은 `while`문으로 반복된다.<br>
**For-Each Loop**는 각 자료구조에 구현된 `iterator()`를 호출하여 `Iterator`를 사용한다라고 볼 수 있다.<br>

***

# **ConcurrentModificationException** ?

```java
public static void main(String[] args) {
    List<String> chars = new ArrayList<>();
    chars.add("A");
    chars.add("B");
    chars.add("C");
    Iterator<String> iterator = chars.iterator();
    iterator.next();
    chars.remove("A");
    iterator.next(); // ConcurrentModificationException !!!
}
```

위와 같이 작성하면 **java.util.ConcurrentModificationException**예외를 던진다.<br>
- `ArrayList`의 `iterator()`,`remove(Object o)`를 확인해보자
  - `remove()`에서 `fastRemove()`를 호출한다.

```java
private void fastRemove(int index) {
    modCount++;
    int numMoved = size - index - 1;
    if (numMoved > 0)
        System.arraycopy(elementData, index+1, elementData, index,
                            numMoved);
    elementData[--size] = null; // clear to let GC do its work
}
```

1. `modCount`를 증가시킨다.
2. `System.arraycopy`를 통해 삭제 인덱스 기준으로 복사한다.

<br>


```java
public Iterator<E> iterator() {
        return new Itr();
}
private class Itr implements Iterator<E> {
    int cursor;       // index of next element to return
    int lastRet = -1; // index of last element returned; -1 if no such
    int expectedModCount = modCount;
    
    public E next() {
        checkForComodification();
        int i = cursor;
        if (i >= size)
            throw new NoSuchElementException();
        Object[] elementData = ArrayList.this.elementData;
        if (i >= elementData.length)
            throw new ConcurrentModificationException();
        cursor = i + 1;
        return (E) elementData[lastRet = i];
    }

    public void remove() {
        if (lastRet < 0)
            throw new IllegalStateException();
        checkForComodification();

        try {
            ArrayList.this.remove(lastRet);
            cursor = lastRet;
            lastRet = -1;
            expectedModCount = modCount;
        } catch (IndexOutOfBoundsException ex) {
            throw new ConcurrentModificationException();
        }
    }

    final void checkForComodification() {
        if (modCount != expectedModCount)
            throw new ConcurrentModificationException();
    }
}
```

1. `ArrayList`의 inner class인 `Itr`을 생성한다.
2. 컬렉션이 요소를 추가하는 함수나 삭제하는 함수를 호출할 때마다 조작 횟수를 기억하는 `modCount`를 보유하고 있다.
3. `Iterator`가 생성될 때 `expectedModCount`에 `modCount`를 대입한다.
4. `remove()`에서 `checkForComodification`를 통해 **`Iterator`의 `expectedModCount`** 와 **`ArrayList`의 `modCount`** 는 다르게 되므로 해당 예외를 던지게 된다. 
  
```java
public static void main(String[] args) {
    List<String> chars = new ArrayList<>();
    chars.add("A");
    chars.add("B");
    chars.add("C");
    Iterator<String> iterator = chars.iterator();
    iterator.next();
    iterator.remove();
    iterator.remove(); // IllegalStateException !!!
}
```

`Iterator`의 `remove()`를 사용할 때도 지켜야할 규칙이 있다.  
위의 `Itr` 구현 클래스를 보면 `next()`가 호출될 때 마다 `lastRet`을 `cursor`로 업데이트하고, `remove()`가 호출될 때 마다 `lastRet`을 `-1`로 업데이트 하기 때문에 **한 번의 next() 호출당 remove() 호출이 두 번 이상 존재하면 오류가 발생한다.**  
  
**반복자 클래스는 요소를 추가하는 메서드는 제공하지 않는다. 결국 반복자의 주요 기능은 `순회`이며, 요소를 추가하는 작업은 반복자에 적절하지 않다는 것을 유의하자.**  

<h3>Iterator 두 개를 만든 아래의 실행 결과는?</h3>

```java
public static void main(String[] args) {
    List<String> chars = new ArrayList<>();
    chars.add("A");
    chars.add("B");
    chars.add("C");
    Iterator<String> iterator1 = chars.iterator();
    Iterator<String> iterator2 = chars.iterator();
    iterator1.next();
    iterator1.remove();
    iterator2.next(); // 실행 결과는???
}
```

**ConcurrentModificationException** 예외가 발생한다.  
그 이유는 최초 `modCount`는 4이지만, `iterator1.remove()`에서 `ArraysList.this.remove(lastRet)`을 통해, ArraysList 내부 속성의 `modCount`는 4로 증가되기 때문에 `iterator2`의 `expectedModCount`와 틀리게된다.  

<h3>이 경우에는 removeIf와 replaceAll로 대체할 수 있다.</h3>  

꼭 내부 컬렉션을 직접 조작하고 싶다면 아래의 방법을 사용할 수 있다.
  
```java
private List<Dish> menu;

@BeforeEach
void setUp() {
    menu = new ArrayList<>(){{
        this.add(new Dish("pork", false, 800, Dish.Type.MEAT));
        this.add(new Dish("beef", false, 700, Dish.Type.MEAT));
        this.add(new Dish("chicken", false, 400, Dish.Type.MEAT));
        this.add(new Dish("french fries", true, 530, Dish.Type.OTHER));
        this.add(new Dish("rice", true, 350, Dish.Type.OTHER));
        this.add(new Dish("season fruit", true, 120, Dish.Type.OTHER));
        this.add(new Dish("pizza", true, 550, Dish.Type.OTHER));
        this.add(new Dish("prawns", false, 300, Dish.Type.FISH));
        this.add(new Dish("salmon", false, 450, Dish.Type.FISH));
    }};
}

@Test
void removeIf() {
    Assertions.assertThat(menu.size()).isEqualTo(9);

    menu.removeIf(Dish::vegetarian);
    Assertions.assertThat(menu.size()).isEqualTo(5);
}

@Test
void replaceAll() {
    List<Dish> before = menu.stream().filter(dish -> dish.calories() <= 490).toList();
    Assertions.assertThat(before.size()).isEqualTo(5);

    menu.replaceAll(dish -> {
        if (dish.calories() > 500) {
            return new Dish(dish.name(), dish.vegetarian(), 490, dish.type());
        }
        return dish;
    });

    List<Dish> after = menu.stream().filter(dish -> dish.calories() <= 490).toList();
    Assertions.assertThat(after.size()).isEqualTo(9);
}
```

<h3>코틀린에서 Iterable과 Iterator를 구현해보기</h3>

1. `Iterable`과 `Iterator`를 구현했을 때
2. `Iterable`과 `Iterator`를 구현하지 않고 `operator`만 작성했을 때

이 두 가지를 테스트해보았다.  

```kotlin
class IterableTest: BehaviorSpec ({

    val size = 5
    val sum = 15

    given("Iterable과 Iterator를 implement한 클래스는") {
        class ImplementIterable(private val size: Int): Iterable<Int> {
            override fun iterator(): Iterator<Int> = ImplementIterator(size)

            inner class ImplementIterator(private val size: Int) : Iterator<Int> {
                var number: Int = 0
                override fun hasNext(): Boolean = number++ < size
                override fun next(): Int = number
            }
        }


        `when`("Iterable,Iterator 둘 다 for 문을 사용할 수 있다.") {

            then("for .. in") {
                val iterable = ImplementIterable(size)
                val iterator = iterable.iterator()

                var test = 0
                for (i in iterable) { test += i }

                test shouldBeEqual sum
                iterable.iterator().next() shouldBeEqual 0

                var test2 = 0
                for (i in iterator) { test2 += i }
                test2 shouldBeEqual sum

                test shouldBeEqual test2
            }

            then("forEach 블록") {
                val iterable = ImplementIterable(size)
                val iterator = iterable.iterator()

                var test = 0
                iterable.forEach { test += it }
                test shouldBeEqual sum

                var test2 = 0
                iterator.forEach { test2 += it }
                test2 shouldBeEqual sum
            }

            then("Iterable에만 sum()이 존재한다.") {
                val iterable = ImplementIterable(size)

                iterable.sum() shouldBeEqual sum
            }
        }
    }

    given("Iterable과 Iterator를 implement하지않고 operator만 작성한 클래스는") {
        class JustIterable(private val size: Int) {
            operator fun iterator(): JustIterator = JustIterator(size)

            inner class JustIterator(private val size: Int) {
                private var number: Int = 0
                operator fun hasNext(): Boolean = number++ < size
                operator fun next(): Int = number
            }
        }

        `when`("Iterable만 for 문을 사용할 수 있다.") {
            val iterable = JustIterable(size)
            val iterator = iterable.iterator()

            then("for .. in") {
                var test = 0
                for (i in iterable) { test += i }
                test shouldBeEqual sum
            }

            then("컴파일 에러") {
//                for (i in iterator) { }
//                iterable.forEach { test += it }
//                iterator.forEach { test += it }
//                iterable.sum()
//                iterator.sum()
            }
        }
    }
})
```