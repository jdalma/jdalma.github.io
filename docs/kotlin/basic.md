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

# TIP

1. **가변 데이터 클래스를 정의하지 마라**
   - `data class`는 **가변 데이터 클래스**를 허용하긴 하지만, `equals()`와 `hashCode()`를 구현해주기 때문에 다른 가변 일반 클래스보다 훨씬 더 조심해야 한다.

# **var** vs **val**

**var**     
가변 프로퍼티  
코틀린 컴파일러가 비공개 필드, 게터,세터를 생성한다

**val**     
불변 프로퍼티   
코틀린 컴파일러가 비공개 필드, 게터를 생성한다

