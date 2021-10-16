---
layout: default
title: 객체 지향 프로그래밍
parent: Python
nav_order: 1
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

```python
class User:
    # 인스턴스 메소드
    def say_hello(same_user):
        print("안녕하세요! 저는 {}입니다!".format(same_user.name))


# 1. 인스턴스 = 객체
# 객체는 속성과 행동을 가지고 있다.
# 속성 -> 변수 , 행동 -> 함수

# 2. 인스턴스 변수 정의하기
# 인스턴스 이름.속성이름(인스턴스 변수) = "속성에 넣을 값"

# 3. 메소드의 종류
# 인스턴스 메소드 - 인스턴스 변수를 사용하거나 , 인스턴스 변수에 값을 설정하는 메소드

user1 = User()
user2 = User()
user3 = User()

user1.name = "김대위"
user1.email = "captain@codeit.kr"
user1.password = "12345"

user2.name = "강영훈"
user2.email = "younghoon@codeit.kr"
user2.password = "98765"

User.say_hello(user1)
User.say_hello(user2)

```
