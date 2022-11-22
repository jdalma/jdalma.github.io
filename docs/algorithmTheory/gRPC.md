---
layout: default
title: gRPC
parent: 📕 정리
nav_order: 1
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---


- 아래의 게시글을 정리하였습니다.
  - [[네이버클라우드 기술&경험] 시대의 흐름, gRPC 깊게 파고들기 #1](https://medium.com/naver-cloud-platform/nbp-%EA%B8%B0%EC%88%A0-%EA%B2%BD%ED%97%98-%EC%8B%9C%EB%8C%80%EC%9D%98-%ED%9D%90%EB%A6%84-grpc-%EA%B9%8A%EA%B2%8C-%ED%8C%8C%EA%B3%A0%EB%93%A4%EA%B8%B0-1-39e97cb3460)
  - [[네이버클라우드 기술&경험] 시대의 흐름, gRPC 깊게 파고들기 #2](https://medium.com/naver-cloud-platform/nbp-%EA%B8%B0%EC%88%A0-%EA%B2%BD%ED%97%98-%EC%8B%9C%EB%8C%80%EC%9D%98-%ED%9D%90%EB%A6%84-grpc-%EA%B9%8A%EA%B2%8C-%ED%8C%8C%EA%B3%A0%EB%93%A4%EA%B8%B0-2-b01d390a7190)


# **RPC `Remote Procedure Call`**

소켓 통신의 한계를 극복하기 위해 등장<br>
이름 그대로 `네트워크로 연결된 서버 상의 프로시저(함수, 메서드 등)를 원격으로 호출`할 수 있는 기능<br>
**IDL (Interface Definication Language)**기반으로 다양한 언어를 가진 환경에서도 쉽게 확장이 가능하다.<br>

# **Stub**

RPC의 핵심 개념<br>
**서버와 클라이언트는 서로 다른 주소 공간을 사용 하므로, 함수 호출에 사용된 매개 변수를 꼭 변환해줘야 한다.** 
이 변환을 담당하는게 **Stub**이다.<br>
- `client stub`은 **함수 호출에 사용된 파라미터의 변환(Marshalling, 마샬링) 및 함수 실행 후 서버에서 전달 된 결과의 변환을 담당**
- `server stub`은 **클라이언트가 전달한 매개 변수의 역변환(Unmarshalling, 언마샬링) 및 함수 실행 결과 변환을 담당**

<br>

1. **IDL을 사용하여 `호출 규약` 정의**
   - 함수명, 인자, 반환값에 대한 데이터형이 정의된 IDL파일을 rpcgen으로 컴파일하면 `stub code`가 자동으로 생성된다
2. `stub code`에 명시된 함수는 원시코드의 형태로, **상세 기능은 server에서 구현**
   - **만들어진 stub 코드는 클라이언트/서버에 함께 빌드한다.**
3. client에서 `stub`에 정의된 함수를 사용할 때
4. **client stub은 RPC runtime을 통해 함수 호출**하고,
5. **server는 수신된 procedure 호출에 대한 처리 후 결과 값을 반환**한다.
6. 최종적으로 client는 server의 결과 값을 반환받고, 함수를 Local에 있는 것처럼 사용할 수 있다.

# **gRPC `google Remote Procedure Call`**

- 브라우저에서 gRPC를 직접 호출은 불가능하지만, **프록시 서버**를 통해서 해결 가능하다