---
layout: default
title: ArrayList,LinkedList
nav_order: 1
parent: 👨‍🔬 Lab
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

- **Array** : 고정 길이 배열
- **ArrayList** : 가변 길이 배열
- **LinkedList** : 양방향 연결 배열 

> 리스트는 중간 인덱스의 값을 제거 또는 삽입 하거나 , 사이즈를 초과하였을 때 쉬프트 연산 또는 배열을 새로 생성하여 복사하는 추가 작업이 이루어진다.
> 
> 이 글의 연결리스트는 양방향 연결리스트를 의미하며 , 각 노드들은 **prev** , **next**의 참조변수를 가지고 있다.
> 
> 중간 인덱스를 제거 , 삽입 하여도 참조변수만 수정해주기 때문에 추가적인 연산이 필요없다 라고 알고있다.
> 
> 기본적으로 알고 있는 이론들을 **코드를 직접 보면서 확인해보기 위해 정리**한다.

## **ArrayList**

### `public boolean add(E e)`

```java
public class ArrayList<E> extends AbstractList<E> implements List<E>, RandomAccess, Cloneable, java.io.Serializable{

    private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};
    transient Object[] elementData; // non-private to simplify nested class access

    /**
     * Default initial capacity.
     */
    private static final int DEFAULT_CAPACITY = 10;

    private int size;

    public ArrayList() {
        this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
    }

    public boolean add(E e) {
        ensureCapacityInternal(size + 1);  // Increments modCount!!
        elementData[size++] = e;
        return true;
    }

    private void ensureCapacityInternal(int minCapacity) {
        ensureExplicitCapacity(calculateCapacity(elementData, minCapacity));
    }

    private static int calculateCapacity(Object[] elementData, int minCapacity) {
        if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
            return Math.max(DEFAULT_CAPACITY, minCapacity);
        }
        return minCapacity;
    }

    private void ensureExplicitCapacity(int minCapacity) {
        modCount++;

        // overflow-conscious code
        if (minCapacity - elementData.length > 0)
            grow(minCapacity);
    }

    private void grow(int minCapacity) {
        // overflow-conscious code
        int oldCapacity = elementData.length;
        int newCapacity = oldCapacity + (oldCapacity >> 1);
        if (newCapacity - minCapacity < 0)
            newCapacity = minCapacity;
        if (newCapacity - MAX_ARRAY_SIZE > 0)
            newCapacity = hugeCapacity(minCapacity);
        // minCapacity is usually close to size, so this is a win:
        elementData = Arrays.copyOf(elementData, newCapacity);
    }

    // [Arrays.copyOf]
    // public static int[] copyOf(int[] original, int newLength) {
    //     int[] copy = new int[newLength];
    //     System.arraycopy(original, 0, copy, 0,Math.min(original.length, newLength));
    //     return copy;
    // }

    private static int hugeCapacity(int minCapacity) {
        if (minCapacity < 0) // overflow
            throw new OutOfMemoryError();
        return (minCapacity > MAX_ARRAY_SIZE) ? Integer.MAX_VALUE : MAX_ARRAY_SIZE;
    }
}
```

- 위의 `ArrayList` 구현체를 보면
- 최초 `add`시에 `DEFAULT_CAPACITY` 만큼 배열을 늘린다.
- `add`할 때 마다 `capacity`를 체크한다.
  - `size + 1 - elemenData.length  > 0` 참이면 배열을 증가시킨다.  
  - `elementData.length + (elementData.length >> 1)` 만큼 배열을 새로 만든다.
  - int의  `>> 1` 만큼은 `int / 2`와 같다.
- 길이가 10인 배열을 증가시킨다고 가정하면 새로운 배열의 길이는 `10 + (10 / 2)`와 같다.
- `Arrays.copyOf(elementData, newCapacity);`

### `public void add(int index, E element)`

```java
    public void add(int index, E element) {
        rangeCheckForAdd(index);

        ensureCapacityInternal(size + 1);  // Increments modCount!!
        System.arraycopy(elementData, index, elementData, index + 1,size - index);
        
        elementData[index] = element;
        size++;
    }

    private void rangeCheckForAdd(int index) {
        if (index > size || index < 0)
            throw new IndexOutOfBoundsException(outOfBoundsMsg(index));
    }    
```

- 삽입할 `index`가 `size`보다 크면 `IndexOut Exception`이 발생한다.
- [arraycopy test](https://stackoverflow.com/questions/18638743/is-it-better-to-use-system-arraycopy-than-a-for-loop-for-copying-arrays)
- 중간 인덱스에 값을 삽입하면 배열 복사가 이뤄진다.

```java
    public static native void arraycopy(Object src,int srcPos,Object dest,int destPos,int length);
```

-  `src`에서 `srcPos`위치 부터 `length`만큼 `dest`의 `destPos`로 옮기겠다.

```java
    int[] source = {1,2,3,4,5};
    int[] target = {10,20,30,40,50};
    int index = 2;
    System.arraycopy(source, index, target, index + 1, source.length - index - 1);
    target[index] = 1000;
//    	1 2 3 4 5 
//    	10 20 1000 3 4 
```

### `public E remove(int index)`

```java
    public E remove(int index) {
        rangeCheck(index);

        modCount++;
        E oldValue = elementData(index);

        int numMoved = size - index - 1;
        if (numMoved > 0)
            System.arraycopy(elementData, index+1, elementData, index,
                             numMoved);
        elementData[--size] = null; // clear to let GC do its work

        return oldValue;
    }
```

- `remove`도 위와 같이 `System.arraycopy`를 사용하여 추가 연산이 실행된다.


### `public boolean remove(Object o)`

```java
    public boolean remove(Object o) {
        if (o == null) {
            for (int index = 0; index < size; index++)
                if (elementData[index] == null) {
                    fastRemove(index);
                    return true;
                }
        } else {
            for (int index = 0; index < size; index++)
                if (o.equals(elementData[index])) {
                    fastRemove(index);
                    return true;
                }
        }
        return false;
    }

    /*
     * Private remove method that skips bounds checking and does not
     * return the value removed.
     */
    private void fastRemove(int index) {
        modCount++;
        int numMoved = size - index - 1;
        if (numMoved > 0)
            System.arraycopy(elementData, index+1, elementData, index,
                             numMoved);
        elementData[--size] = null; // clear to let GC do its work
    }
```

***

## `LinkedList`

- 🖐 [내부(inner) class와 내부(inner) static class 차이](https://siyoon210.tistory.com/141)

### `public boolean add(E e)`

```java
public class LinkedList<E> extends AbstractSequentialList<E>
        implements List<E>, Deque<E>, Cloneable, java.io.Serializable
{
    transient int size = 0;
    transient Node<E> first;
    transient Node<E> last;    

    private static class Node<E> {
        E item;
        Node<E> next;
        Node<E> prev;

        Node(Node<E> prev, E element, Node<E> next) {
            this.item = element;
            this.next = next;
            this.prev = prev;
        }
    }

    public boolean add(E e) {
        linkLast(e);
        return true;
    }

    void linkLast(E e) {
        final Node<E> l = last;
        final Node<E> newNode = new Node<>(l, e, null);
        last = newNode;
        if (l == null)
            first = newNode;
        else
            l.next = newNode;
        size++;
        modCount++;
    }
}
```

- `add`호출 시 `last`에는 새로 생성한 노드의 끝자락을 계속 담아준다.
- `first`는 최초 `add`호출 시에 담기며 , **HEAD**를 기억한다.
- **리스트와 달리 추가적인 연산이 필요없다.**
  - 새로운 노드를 기존의 노드에 연결시켜 줄 뿐이다.

### `public void add(int index, E element)`

```java
    public void add(int index, E element) {
        checkPositionIndex(index);

        if (index == size)
            linkLast(element);
        else
            linkBefore(element, node(index));
    }

    Node<E> node(int index) {
        // assert isElementIndex(index);

        if (index < (size >> 1)) {
            Node<E> x = first;
            for (int i = 0; i < index; i++)
                x = x.next;
            return x;
        } else {
            Node<E> x = last;
            for (int i = size - 1; i > index; i--)
                x = x.prev;
            return x;
        }
    }

    Node<E> node(int index) {
        // assert isElementIndex(index);

        if (index < (size >> 1)) {
            Node<E> x = first;
            for (int i = 0; i < index; i++)
                x = x.next;
            return x;
        } else {
            Node<E> x = last;
            for (int i = size - 1; i > index; i--)
                x = x.prev;
            return x;
        }
    }

    void linkBefore(E e, Node<E> succ) {
        // assert succ != null;
        final Node<E> pred = succ.prev;
        // final Node<E> newNode = new Node<>(해당 위치에 있었던 노드의 prev , 넣을 값 , 해당 위치에 있었던 노드);
        final Node<E> newNode = new Node<>(pred, e, succ);
        succ.prev = newNode;
        if (pred == null)
            first = newNode;
        else
            pred.next = newNode;
        size++;
        modCount++;
    }    

    private void checkPositionIndex(int index) {
        if (!isPositionIndex(index))
            throw new IndexOutOfBoundsException(outOfBoundsMsg(index));
    }

    private boolean isPositionIndex(int index) {
        return index >= 0 && index <= size;
    }  
```

- `checkPositionIndex(int index)`는 삽입할 `index`가 사이즈를 넘었는지 확인한다.
- `index`가 `size`랑 똑같다면 가장 마지막 노드에 삽입하고 , `size`보다 작다면 `node(int index)`를 통해 반환받은 `node`의 뒤에 넣는다.
  - `Node<E> node(int index)`는 삽입할 `index`의 노드를 반환한다.
  - `index` 가 `size / 2` 보다 작다면 `first` 맨 앞의 노드부터 뒤로 찾는다.
  - `index` 가 `size / 2` 보다 크다면 `last` 맨 뒤의 노드부터 앞으로 찾는다.  
- `linkBefore`메서드에서 삽입이 이루어진다.

### `public E remove()` 

```java
    public E remove() {
        return removeFirst();
    }

    public E removeFirst() {
        final Node<E> f = first;
        if (f == null)
            throw new NoSuchElementException();
        return unlinkFirst(f);
    }    

    private E unlinkFirst(Node<E> f) {
        // assert f == first && f != null;
        final E element = f.item;
        final Node<E> next = f.next;
        f.item = null;
        f.next = null; // help GC
        first = next;
        if (next == null)
            last = null;
        else
            next.prev = null;
        size--;
        modCount++;
        return element;
    }
```