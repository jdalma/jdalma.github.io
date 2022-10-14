---
layout: default
title: Iterator
nav_order: 19
parent: 👨‍🔬 Lab
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---


해당 글은 [백준 - 키로거](https://github.com/PowerAlgorithm/Algorithm-Study/blob/main/%5BWeek5%20-%20Data%20Structure%5D/%EC%A0%95%ED%98%84%EC%A4%80/C_5397.java)문제를 풀며 `LinkedList`로 풀면 시간초과가 났었는데 `ListIterator`를 사용하여 해결하였었다. (`Stack`으로도 풀 수 있다)<br>
이 문제를 계기로 `Iterator`와 `Enumerator`를 정리해보려 한다.<br>


***

- 참고 링크
  - [`java 8 docs` Iterator](https://docs.oracle.com/javase/8/docs/api/java/util/Iterator.html)
  - [`java 8 docs` Enumeration](https://docs.oracle.com/javase/8/docs/api/java/util/Enumeration.html)
  - [`stackoverflow` difference-between-java-enumeration-and-iterator](https://stackoverflow.com/questions/948194/difference-between-java-enumeration-and-iterator)

***

# **`Iterator`, `Enumerator`, `Iterable`** ?

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

# **ConcurrentModificationException?**

글을 보다보면 **동시성**에 관한 얘기가 나온다.<br>

```java
public static void enhancedForLoop() {
    List<String> test = new ArrayList<>(Arrays.asList("A", "B", "C", "D", "E"));
    for (String e : test) {
        if (e.equals("B")) {
            test.remove(e);
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
        if (e.equals("B")) {
            test.remove(e);
        } else {
            System.out.println(e);
        }
    }

}
```

위와 같이 작성하면 `Exception in thread "main" java.util.ConcurrentModificationException`예외를 던진다.<br>
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
    ...

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
2. `Itr`의 내부 필드인 `int expectedModCount = modCount;`를 확인할 수 있다.
3. `remove()`에서 `checkForComodification`를 통해 **`Itr`을 생성했을 때의 `expectedModCount`**와 **`ArrayList`의 `modCount`**는 다르게 되므로 해당 예외를 던지게 된다. 

<br>

중요한 점은
1. 위와 같은 방식을 **Fail Fast**라고 한다.
2. 하지만 `iterator`의 구현체마다 다르다는 것



