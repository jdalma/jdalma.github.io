---
layout: default
title: 기초 정리
parent: Kotlin
nav_order: 1
---

{: .no_toc }

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

# **var** vs **val**

**var**     
가변 프로퍼티  
코틀린 컴파일러가 비공개 필드, 게터,세터를 생성한다

**val**     
불변 프로퍼티   
코틀린 컴파일러가 비공개 필드, 게터를 생성한다

# [**varargs** (+ Spread Operator)](https://www.baeldung.com/kotlin/varargs-spread-operator)

```kotlin
val strings = arrayOf("first" , "second", "third")
val firstList: List<String> = mutableListOf(*strings)
```

# 코틀린의 확장 함수를 사용할 때

```kotlin
fun <T> Iterable<T>.removeItemAt(index: Int): List<T> =
    take(index) + drop(index + 1)
```

**자바에서 사용할 때**  

```java
var reordered = removeItemAt(items, 3);
```

**코틀린에서 사용할 때**  

```kotlin
val items = mutableListOf(a, b, c, d)
items.removeItemAt(3)
```

확장함수라서 자바에서 사용할 때도 `{iterable}.{확장함수}`일 줄 알았지만 되지 않는다.  
자바로 디컴파일된 코드를 보면

```java
@NotNull
public static final List removeItemAt(@NotNull Iterable $this$removeItemAt, int index) {
  Intrinsics.checkNotNullParameter($this$removeItemAt, "$this$removeItemAt");
  return CollectionsKt.plus((Collection)CollectionsKt.take($this$removeItemAt, index), (Iterable)CollectionsKt.drop($this$removeItemAt, index + 1));
}
```

해당 확장 함수를 사용하는 코틀린 코드도 디컴파일해보면 아래와 같다.

```java
List items = CollectionsKt.mutableListOf(new ExampleItem[]{a, b, c, d});
ShortlistsKt.removeItemAt((Iterable)items, 3);
```