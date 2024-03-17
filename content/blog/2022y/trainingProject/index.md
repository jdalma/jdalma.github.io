---
title: Armeria + gRPC 사용해보기
date: "2022-12-15"
tags:
   - Armeria
   - gRPC
   - HTTP/2
---

기존에 존재하던 REST API를 그대로 유지하면서 gRPC 통신을 같이 사용할 수 있을지 확인하고, Stream 통신을 테스트해보는 것이다.  

- REST API와 RPC 통신을 한 포트로 처리할 수 있는 Armeria를 사용한다.
- protocol buffer를 통해 기존 JSON보다 데이터 사이즈를 줄일 수 있을 것이다.
  
# Armeria와 Tomcat을 한 개의 포트로?

Armeria에서는 [`javadoc` HttpService](https://javadoc.io/doc/com.linecorp.armeria/armeria-javadoc/latest/com/linecorp/armeria/server/HttpService.html)로 Tomcat, gRPC 들을 추상화 해놓았다.  
Armeria 서버가 실행될 때 원하는 Service들을 ServerBuilder에 추가시키기만 하면 된다.  

```kotlin
@Configuration
class ArmeriaConfig{

    @Bean
    fun armeriaServerConfigurator(
      context: ServletWebServerApplicationContext, 
      services: List<BindableService>
    ): ArmeriaServerConfigurator {
        val grpcService: GrpcService =
            GrpcService.builder().apply {
                this.addServices(services)
            }.build()

        val container = context.webServer as TomcatWebServer
        container.start()

        return ArmeriaServerConfigurator { builder ->

            // tomcatService 바인딩
            builder.serviceUnder("/",  TomcatService.of(container.tomcat))

            // stub 구현체 등록
            builder.service(grpcService)

            // Armeria Service 문서 활성화
            builder.serviceUnder("/docs", DocService())
        }
    }
}
```

> ✋  
> Tomcat 포트를 직접 지정해주고 해당 포트로 REST 요청을 보내게되면 Armeria를 거치지 않고 바로 TomcatWebServer가 처리한다.  
> Tomcat 포트를 `-1`로 지정하고 Armeria 포트만 지정해주면 Armeria가 REST 요청과 gRPC 요청 둘 다 처리하게 된다.  

![](flow.png)

Netty의 `EventLoop`가 client로부터 오는 모든 요청을 다 받는다.  
1. **gRPC는 NonBlocking으로 처리**
2. **REST는 Tomcat이 Blocking으로 처리**
   - 서블릿 스레드는 Armeria의 `BlockingTaskExecutor`이다
   - `EventLoop`가 해당 request를 처리하라는 작업을 `BlockingTaskExecutor`에게 위임
   - `BlockingTaskExecutor`에서 어댑터를 이용해 서블릿 컨테이너를 호출

![](blockNonBlockThread.png)
  
> EventLoop는 변경되지 않는 하나의 Thread로 움직이며,  
> 작업 (Runnable 또는 Callable)을 EventLoop 구현으로 직접 제출해 즉시 또는 예약 실행할 수 있다.  
> 구성과 사용 가능한 코어에 따라서는 리소스 활용을 최적화하기 위해 여러 EventLoop가 생성되고,  
> 여러 Channel에 서비스를 제공하기 위해 단일 EventLoop가 할당되는 경우도 있다.  
> - **네티인액션**

# gRPC 통신 종류

[테스트 코드](https://github.com/jdalma/armeria-grpc-kotlin/blob/master/src/test/java/com/example/armeriaserver/grpc/SampleServiceTest.java#L58)에서 확인할 수 있다.  
또는 [공식 문서 Basics Tutorial](https://grpc.io/docs/languages/java/basics/)에서도 확인 가능하다.  
  
protocol buffer는 이진 부호화 라이브러리이며 부호화할 데이터를 위한 스키마를 `proto`언어를 통해 아래와 같이 메세지를 정의하고 protocol buffer compiler를 통해 원하는 언어로 [generate](https://protobuf.dev/programming-guides/proto3/#generated) 할 수 있다.  
생성된 코드를 호출해 부호화하고 복호화할 수 있다.  

```
syntax = "proto3";

package grpc.hello;

option java_multiple_files = true;
option java_package = "stub.hello";

message HelloRequest {
  string message = 1;
}

message HelloResponse {
  string message = 1;
}

service HelloService {
  rpc SimpleRPC (HelloRequest) returns (HelloResponse) {}
  rpc ClientSideStreaming (stream HelloRequest) returns (HelloResponse) {}
  rpc ServerSideStreaming (HelloRequest) returns (stream HelloResponse) {}
  rpc BidirectionalStreaming (stream HelloRequest) returns (stream HelloResponse) {}
}
```

`HelloService`의 내용과 같이 이 메시지를 통하여 어떤 통신을 사용할 것인지 정의할 수 있다.  
각 통신 방법마다 지원하는 요청-응답 방식이 다르다.  

> Async는 비동기-논블로킹 통신, Future는 동기-논블로킹 통신

- **Simple** : 단일 요청, 단일 응답 
  - Future Stub
  - Blocking Stub
  - 기본(Async) Stub

- **ServerSideStreaming** : 서버 → 클라이언트 스트림 통신
  - `not support` Future Stub 
  - Blocking Stub
  - 기본(Async) Stub

- **ClientSideStreaming** : 클라이언트 → 서버 스트림 통신
  - `not support` Future Stub
  - `not support` Blocking Stub
  - 기본(Async) Stub

- **BidirectionalStreaming** : 양방향 스트림 통신
  - `not support` Future Stub
  - `not support` Blocking Stub
  - 기본(Async) Stub

# Armeria의 Server Thread는 어떻게 처리될까?

![](expect.png)
![](real.png)

1. 클라이언트의 메인 스레드에서 다른 서비스로 요청해도 모든 요청을 처리하는 스레드는 서버 스레드 한 개이다
   - Sample, Hello 서로 다른 서비스로 요청을 보내도 요청을 처리하는 스레드는 한 개이다
2. 위와 같은 테스트를 두 개의 클라이언트에서 각각 한 번씩 보내도 똑같은 결과다
   - **결국 서버에서 받는 모든 요청들은 각 클라이언트의 소켓에 맞는 서버의 스레드들이 처리한다**
3. 한 개의 클라이언트의 메인 스레드에서 자식 스레드 여러 개를 서버에 요청 전송하여도 한 개의 서버 스레드가 처리한다.

> 위와 같은 결과가 나오는 이유를 이해하려면 이벤트 루프, 멀티플렉싱에 대한 이해가 필요하다.  
> [EventLoop와 멀티플렉싱에 대해 정리한 글](https://github.com/jdalma/footprints/blob/main/%EC%A0%95%EB%A6%AC/%EB%A9%80%ED%8B%B0%ED%94%8C%EB%A0%89%EC%8B%B1.md)을 참고하자

EventLoop는 단일 스레드로 요청과 응답을 처리하므로 해당 스레드를 블록하면 EventLoop 자체를 블록하는 것과 같다.  

![](blockingTaskExecutor.png)

![](armeriaThread.png)

**Event Loop가 처리하는 기준**
- 한 호스트의 동일한 Port에서 10초 간격으로 요청을 보내면 한 개의 Armeria Server Thread로 처리하지만
- 11초 간격으로 보내면 클라이언트의 Port가 바뀌면서 각기 다른 Armeria Server Thread가 처리한다
- [`GOAWAY` 프레임](https://datatracker.ietf.org/doc/html/rfc7540#section-6.8)을 통해 서로 데이터를 다 보냈다는 확인을 한다.
- 마지막 **RST flag**를 보내면서 서버에서 Socket이 닫히고 TCP 커넥션을 끊는다.

![](packet.png)

1. **SETTINGS 프레임** 을 통해 초기 흐름 제어 창 크기와 최대 동시 스트림 수를 전송한다.
2. **WINDOW_UPDATE 프레임** 을 통해 수신자를 압도하지 않도록 전송하는 데이터의 양을 조절하기 위해 창 크기를 업데이트한다.
3. **HEADERS 프레임** 으로 HTTP/2 요청을 전송하고 **DATA 프레임** 으로 응답을 받는다.
4. 응답이 처리되고 클라이언트가 더 이상의 데이터를 기다리지 않으면 클라이언트는 **GOAWAY 프레임** 을 보내 연결을 종료한다.
  
# 소감과 무지 목록
  
proto를 작성해서 generate된 stub들을 이용하여 client ↔︎ server 스트림 통신을 테스트해보는 간단한 테스트 코드를 작성해보았다.  
그리고 새로운 서비스를 개발할 때 다른 팀원들이 템플릿처럼 사용할 수 있도록 회사 레포에 등록해두었다.  
이벤트 루프를 블로킹하지 않는 주변 인프라가 더 많이 필요하며, 클라이언트와 서버 둘 다 수정이 필요하여 기존 서비스들에 적용하기에는 큰 도전일 것으로 예상된다.  
이 기술들을 한 번에 적용하기 보다는 [JSON을 proto로 바꿔보는 단계](https://spring.io/blog/2015/03/22/using-google-protocol-buffers-with-spring-mvc-based-rest-services)를 밟는것도 좋을 것 같다.    
  
해당 프로젝트에는 처음 접하는 기술적인 키워드들이 많이 포함되어 있었고, 네트워크 지식이 부족하다고 느꼈다.  
**무지 목록**  
1. Netty에 대한 이해
2. TCP 소켓 프로그래밍에 대한 이해
3. HTTP/2에 대한 이해
4. Armeria 아키텍처
