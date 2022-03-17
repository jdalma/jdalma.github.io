---
layout: default
title: ArrayDeque
nav_order: 5
parent: 👨‍🔬 Lab
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# **ArrayDeque가 Stack과 Queue보다 빠르다?**
 
 > This class is likely to be 
 >
 > **faster than `Stack` when used as a `stack`**, and 
 >
 > **faster than `LinkedList` when used as a `queue`**.

- [출처 자바 8 공식문서](https://docs.oracle.com/javase/8/docs/api/)

## **Stack의 문제점**

### `synchronized` 남발

**[synchronized](https://docs.oracle.com/javase/tutorial/essential/concurrency/syncmeth.html)**

**[synchronized 더 보기](http://tutorials.jenkov.com/java-concurrency/synchronized.html#java-concurrency-utilities)**

```java
package java.util;

public
class Stack<E> extends Vector<E> {
    public Stack() {
    }

    public E push(E item) {
        addElement(item);

        return item;
    }
    public synchronized E pop() {
        E       obj;
        int     len = size();

        obj = peek();
        removeElementAt(len - 1);

        return obj;
    }
    public synchronized E peek() {
        int     len = size();

        if (len == 0)
            throw new EmptyStackException();
        return elementAt(len - 1);
    }
    public synchronized int search(Object o) {
        int i = lastIndexOf(o);

        if (i >= 0) {
            return size() - i;
        }
        return -1;
    }
}
```

### `Vector`를 상속

 > A more complete and consistent set of LIFO stack operations is provided by the Deque interface and its implementations, 
 >
 > which should be used in preference to this class. 
 >
 > For example: `Deque<Integer> stack = new ArrayDeque<Integer>();`

- **보다 완전하고 일관된 `LIFO`의 특성을 사용할 때는 `Stack`보다는 `Deque`를 사용해라**
- `LIFO`의 특성을 지키지 않는 `Vector`를 상속하고 있다.
  - 아래는 `Vector`클래스의 `get` , `set` 메서드다.

```java
    public synchronized E get(int index) {
        if (index >= elementCount)
            throw new ArrayIndexOutOfBoundsException(index);

        return elementData(index);
    }

    public synchronized E set(int index, E element) {
        if (index >= elementCount)
            throw new ArrayIndexOutOfBoundsException(index);

        E oldValue = elementData(index);
        elementData[index] = element;
        return oldValue;
    }    
```

## **[LinkedList vs ArrayDeque](http://javaqueue2010.blogspot.com/)**

- [ArrayDeque가 LinkedList보다 나은 이유](http://daplus.net/java-arraydeque%EA%B0%80-linkedlist%EB%B3%B4%EB%8B%A4-%EB%82%98%EC%9D%80-%EC%9D%B4%EC%9C%A0/)
