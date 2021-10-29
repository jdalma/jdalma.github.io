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

## **1. 인스턴스 = 객체**
- 객체는 속성과 행동을 가지고 있다.
- 속성 ➜ 변수 , 행동 ➜ 함수 , 메서드

## **2. 인스턴스 변수 정의하기**
- 인스턴스 이름.속성이름(인스턴스 변수) = "속성에 넣을 값"

## **3. 메소드의 종류**
### 인스턴스 메소드
- 인스턴스 변수를 사용하거나 , 인스턴스 변수에 값을 설정하는 메소드
- 인스턴스 메서드를 호출하면 호출하는 해당 인스턴스가 첫번째 파라미터에 자동으로 삽입된다.
- 인스턴스 메서드의 첫번째 파라미터는 꼭 `self`라고 네이밍한다.

```python
class User:
    # 인스턴스 메소드
    def say_hello(self):
        print("안녕하세요! 저는 {}입니다!".format(self.name))

    def login(self , my_email , my_password):
        if(self.email == my_email and self.password == my_password):
            print("로그인 성공 , 환영합니다.")
        else:
            print("로그인 실패 , 없는 아이디 이거나 잘못된 비밀번호입니다.")

    def check_name(self , name):
        return self.name == name

user1 = User()
user2 = User()
user3 = User()

user1.name = "김대위"
user1.email = "captain@codeit.kr"
user1.password = "12345"

user2.name = "강영훈"
user2.email = "younghoon@codeit.kr"
user2.password = "98765"

# 클래스에서 메서드를 호출
User.say_hello(user1)

# 인스턴스에서 메서드를 호출
# 파라미터를 넣게 되면  User.say_hello() takes 1 positional argument but 2 were given
user2.say_hello()

user1.login("captain@codeit.kr" , "12345")
user1.login("captain@codeit.kr" , "123456")

print(user1.check_name("김대위"))
print(user1.check_name("강영훈"))
```

### 특수 메서드 (Magic , Special Method)
- 특정 상황에서 자동으로 호출되는 메서드
- `__init__` ➜ **인스턴스가 생성될 때 자동으로 호출되는 메서드**

```python
class User:
    def __init__(self , name , email , password):
        self.name = name
        self.email = email
        self.password = password
    def Print(self):
        print(self.name , self.email , self.password)


user3 = User("테스트1" , "test@naver.com" , "test")
user3.Print()
```
