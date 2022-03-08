---
layout: default
title: HashSet
nav_order: 19
parent: 👨‍🔬 Lab
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## `HashSet`클래스의 `add(E e)`메서드의 **return**타입 `boolean`은 무엇을 의미할까?

- 먼저 `HashSet`은 `map`이라는 `HashMap`의 필드를 가지고 있다.

```java
    private transient HashMap<E,Object> map;
```

- 추가로 `HashSet`의 `map`필드는 아래처럼 `boolean dummy`가 포함된 생성자를 제외하곤 모두 `HashMap`으로 생성한다.


```java
    HashSet(int initialCapacity, float loadFactor, boolean dummy) {
        map = new LinkedHashMap<>(initialCapacity, loadFactor);
    }
```

### `HashSet`의 `add(E e)` 메서드

```java
    // Dummy value to associate with an Object in the backing Map
    private static final Object PRESENT = new Object();

    /**
     * Adds the specified element to this set if it is not already present.
     * More formally, adds the specified element {@code e} to this set if
     * this set contains no element {@code e2} such that
     * {@code Objects.equals(e, e2)}.
     * If this set already contains the element, the call leaves the set
     * unchanged and returns {@code false}.
     *
     * @param e element to be added to this set
     * @return {@code true} if this set did not already contain the specified
     * element
     */
    public boolean add(E e) {
        return map.put(e, PRESENT)==null;
    }
```
- 주석 내용을 보면 `if this set did not already contain the specified`
  - `HashSet`에 추가하려는 값이 존재한다면 `true` , 아니면 `false`이다.
  - `HashMap`의 `put(K key, V value)`메서드를 살펴보자

### `HashMap`의 `put(K key, V value)`

```java
    /*
     * 지정된 값을 이 맵의 지정된 키와 연결합니다.
     * 맵에 이전에 키에 대한 매핑이 포함된 경우 이전
     * 값이 대체됩니다.
     */
    public V put(K key, V value) {
        return putVal(hash(key), key, value, false, true);
    }
```

- 위의 주석내용을 보면 새로운 키와 값이라면 `null`을 반환하고 , 이미 해당 키의 값이 있다면 `value`가 반환된다.

```java
    Map<String , Integer> map = new HashMap<>();

    map.put("test1" , 1);
    map.put("test1" , 2);
    map.put("test1" , 3);

    // null
    // 1
    // 2
```

### 결론은?

- `HashSet`은 `HashMap`의 `key`값만 사용하여 **집합**을 구현한다. 
- `HashMap`의 `put`메서드가 실행될 때 마다 해당 키가 이미 존재한다면 해당 키의 `value`를 반환하며,
- 반환받은 `value`가 **null**이라면 `true` , 아니면 `false`인 것이다.
