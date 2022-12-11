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

# [학습 테스트 코드](https://github.com/jdalma/java-to-kotlin/blob/main/src/test/kotlin/LearningTest.kt)

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