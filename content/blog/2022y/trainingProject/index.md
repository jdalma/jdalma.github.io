---
title: 1차 트레이닝 프로젝트
date: "2022-12-15"
tags:
   - Armeria
   - gRPC
   - HTTP/2
---

`kotlin`으로 마이그레이션,테스트 코드 작성후에 

![](testcode.png)

분석 내용 최종 리뷰와 데모 개발, 시연을 마쳤다.

1. Armeria가 요청을 어떻게 처리하는지
2. Armeria Thread가 어떤 기준으로 생성되고 소멸되는지
3. Armeria가 논블로킹, 블로킹 처리를 어떻게 하는지
4. Java NIO의 Selector와 Netty의 EventLoop
5. gRPC(+ HTTP/2) 통신과 ProtocolBuffers를 어떻게 사용하는지
6. Wireshark와 Visual VM을 사용하여 패킷이나 스레드가 어떻게 처리되는지 분석

등등의 내용들을 배우게 되었다.  
팀장님이 생각하셨던 것보다 흥미를 느끼신다고 하셨고 "산출물이 기대했던 것 보다 잘 나왔다"고 하셨지만  
스스로 생각하기에는 완벽한 이해나 분석을 했다고 볼 수 없다고 느꼇다.  
**진행하면서 `OS와 네트워크의 중요성`을 많이 느꼈다**

![](flow.png)

개인적으로 위 이미지의 빨간 영역 관련해서 더 학습해야할 내용들은

1. **Java NIO의 Selector가 SelectionKeys를 반환하는 과정**
   - TCP Buffer에 패킷들이 다 적재되어 사용할 수 있는 상황이 되면 User영역에 옮기는 처리를 한다고 하는데 명확한 이해가 되지 않는다
2. **Socket File Discriptor에 대한 이해**
   - 어떤 과정으로 Socket과 Channel이 생겨나는지
3. **Armeria Server Thread가 생성되는 기준에 대한 이해**
   - 한 호스트의 동일한 Port에서 10초 간격으로 요청을 보내면 한 개의 Armeria Server Thread로 처리하지만
   - 11초 간격으로 보내면 클라이언트의 Port가 바뀌면서 각기 다른 Armeria Server Thread가 처리한다
   - 마지막 **RST flag**를 보내면서 서버에서 Socket이 닫히고 EventLoop와 Channel이 소멸된다고 생각하고 있다

![](packet.png)

**Expect**
```mermaid
sequenceDiagram
    participant C as Client Main Thread
    participant S1 as Server Request1
    participant S2 as Server Request2
    participant S3 as Server Request3
    Note over S1,S3: One Thread

    C->>+S1: 1. Sample Future Client : sampleUnaryCall (10s sleep)
    C->>+S2: 2. Sample Future Client : sampleUnaryCall
    C->>+S3: 3. Hello Async Client : helloUnaryCall
    S2-->>-C: 2. Response
    S3-->>-C: 3. Response
    S1-->>-C: 1. Response
```

**Real**
```mermaid
sequenceDiagram
    participant C as Client Main Thread
    participant S1 as Server Request1
    participant S2 as Server Request2
    participant S3 as Server Request3
    Note over S1,S3: One Thread

    C->>+S1: 1. Sample Future Client : sampleUnaryCall (10s sleep)
    C->>+S2: 2. Sample Future Client : sampleUnaryCall
    C->>+S3: 3. Hello Async Client : helloUnaryCall
    S1-->>-C: 1. Response
    S2-->>-C: 2. Response
    S3-->>-C: 3. Response
```

1. 클라이언트의 메인 스레드에서 다른 서비스로 요청해도 모든 요청을 처리하는 스레드는 서버 스레드 한 개이다
   - Sample, Hello 서로 다른 서비스로 요청을 보내도 요청을 처리하는 스레드는 한 개이다
2. 위와 같은 테스트를 클라이언트 2개에서 각각 한 번씩 보내도 똑같은 결과다
   - **결국 서버에서 받는 모든 요청들은 각각의 클라이언트에 맞는 서버의 스레드들이 처리한다**
3. 클라이언트의 메인 스레드에서 ExecutorService를 통해 자식 스레드를 여러 개를 서버에 요청 전송하여도 한 개의 서버 스레드가 처리한다.

![](armeriaThread.png)

궁극적으로는 Socket Programming에 대한 이해가 떨어지는 것 같다.  
네티 인 액션을 정독할 생각이다.