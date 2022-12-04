---
layout: default
title: 기타
parent: 📕 정리
nav_order: 1
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---


아래의 게시글을 정리하였습니다.  
**gRPC**    
- [[네이버클라우드 기술&경험] 시대의 흐름, gRPC 깊게 파고들기 #1](https://medium.com/naver-cloud-platform/nbp-%EA%B8%B0%EC%88%A0-%EA%B2%BD%ED%97%98-%EC%8B%9C%EB%8C%80%EC%9D%98-%ED%9D%90%EB%A6%84-grpc-%EA%B9%8A%EA%B2%8C-%ED%8C%8C%EA%B3%A0%EB%93%A4%EA%B8%B0-1-39e97cb3460)
- [[네이버클라우드 기술&경험] 시대의 흐름, gRPC 깊게 파고들기 #2](https://medium.com/naver-cloud-platform/nbp-%EA%B8%B0%EC%88%A0-%EA%B2%BD%ED%97%98-%EC%8B%9C%EB%8C%80%EC%9D%98-%ED%9D%90%EB%A6%84-grpc-%EA%B9%8A%EA%B2%8C-%ED%8C%8C%EA%B3%A0%EB%93%A4%EA%B8%B0-2-b01d390a7190)
- [`developer` gRPC를 사용하여 클라이언트-서버 애플리케이션 빌드](https://developer.android.com/guide/topics/connectivity/grpc?hl=ko)
- [gRPC over HTTP2](https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-HTTP2.md)
- [gRPC status code](https://grpc.github.io/grpc/core/md_doc_statuscodes.html)
  - gRPC client는 비동기로 통신하므로 gRPC 콜백 공통화가 필요하다 📌
- [강력한 고성능 프로토콜을 엔지니어링하는 HTTP/2의 gRPC](https://grpc.io/blog/grpc-on-http2/)

**HTTP/2**    
- [HTTP/2 더 스마트한 규모](https://www.cncf.io/blog/2018/07/03/http-2-smarter-at-scale/)
- [HTTP/2 소개](https://web.dev/performance-http2/)
- [`RFC7540` HTTP/2](https://httpwg.org/specs/rfc7540.html#top)
- [`RFC7540` HTTP/2 WINDOW_UPDATE](https://httpwg.org/specs/rfc7540.html#WINDOW_UPDATE)
    
**Armeria**
- [`line` Armeria로 Reactive Streams와 놀자! - 1](https://engineering.linecorp.com/ko/blog/reactive-streams-with-armeria-1/)
- [`line` Armeria로 Reactive Streams와 놀자! - 2](https://engineering.linecorp.com/ko/blog/reactive-streams-with-armeria-2/)
- [`Naver D2` Spring WebFlux와 Armeria를 이용하여 Microservice에 필요한 Reactive + RPC 동시에 잡기](https://d2.naver.com/helloworld/6080222)
- [`armeria doc` Armeria Server Core](https://javadoc.io/doc/com.linecorp.armeria/armeria-javadoc/latest/com/linecorp/armeria/server/package-summary.html)


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

기본적으로 gRPC는 `HTTP/2를 기반`으로 실행되며 `양방향 스트리밍`, `흐름 제어`, `헤더 압축 및 단일 TCP/IP 연결을 통한 요청 멀티플렉싱` 기능을 제공한다.  
  - *gRPC는 처음부터 HTTP/2의 전이중 양방향 스트리밍 지원을 염두에 두고 설계되었다*
gRPC는 **채널**, **RPC(원격 프로시저 호출)** 및 **메시지** 라는 세 가지 개념이 있다.
  - 각 채널에는 많은 RPC가 있을 수 있고 각 RPC에는 많은 메시지가 있을 수 있다
  - **채널**은 gRPC의 핵심 개념이다.
    - 여러 동시 연결을 통해 여러 스트림을 활성화하여 이 개념을 확장
    - `HTTP/2 엔드포인트`에 대한 **virtual connection**을 제공  
      - 가상 커넥션이라고 말하는 이유는 클라이언트에서 연결된 **채널**은 한 번 연결되면 계속 사용된다
      - 서버가 죽었다가 다시 살아나도 같은 채널을 사용한다
    - 클라이언트가 gRPC 채널을 만들면 내부적으로 서버와 `http2 conn`  
  - **RPCs are in practice plain HTTP/2 streams.**
  - **메시지는 RPC 와 HTTP/2 데이터 프레임으로 전송하는 것과 관련있다.**

**RPC**는 HTTP/2의 stream으로 처리됨  
**Message**는 HTTP/2의 frame으로 처리됨  
- gRPC Client는 `resolver`와 `LB`를 들고 있음
  - 리졸버는 주기적으로 `targetDNS`를 리졸브하면서 **엔드포인트**들을 갱신

**gRPC KeepAlive**
- HTTP/2 ping 프레임
- ping 프레임 전달시 응답이 제때 오지 않으면 연걸 실패로 간주하여 `connection`을 닫는다
- `MAX_CONNECTION_AGE` 옵션 (goaway frame)

gRPC Client는 비동기로 실행된다.  
- http `[http-nio-58080-exec-1,5,main]`
- armeria `[armeria-common-worker-nio-2-2,5,main]`      

**HTTP/2의 스트림**은 단일 연결에서 여러 동시 대화를 가능하게 한다
Armeria는 `cleartext`와 `TLS` 둘 다 지원한다
-  `StreamObserver`는 **스레드로부터 안전할 필요는 없다.**
   - 하지만 [스레드 호환 가능](https://web.archive.org/web/20210125044505/https://www.ibm.com/developerworks/java/library/j-jtp09263/index.html)해야한다.
   - 별도의 `StreamObserver`는 동기화 할 필요는 없다
   - 내부 상태를 가지고 있지 않게 만들면 스프링 빈으로 등록해서 사용해도 되지 않을까
   - 들어오는 방향과 나가는 방향은 독립적이다
   -  [`ClientCallStreamObserver`](https://grpc.github.io/grpc-java/javadoc/io/grpc/stub/ClientCallStreamObserver.html) 및 [`ServerCallStreamObserver`](https://grpc.github.io/grpc-java/javadoc/io/grpc/stub/ServerCallStreamObserver.html) 를 통한 **흐름 제어를 활용하여 과도한 버퍼링을 방지하는 것이 스트리밍 RPC에 권장됩니다**
- `stub client` 스레드에 안전한지
  - `io.grpc.Channel` 추상 클래스를 아르메리아가 확장한 `ArmeriaChannel`클래스가 존재
  -  `ArmeriaChannel.newCall()`은 **POST** 방식 , `content-type`은 **application/grpc+proto**, 매번 `ArmerianClientCall` 생성
    ```java
    return new ArmeriaClientCall<>(
            ctx,
            params.endpointGroup(),
            client,
            req,
            method,
            simpleMethodNames,
            maxOutboundMessageSizeBytes,
            maxInboundMessageSizeBytes,
            callOptions,
            compressor,
            CompressorRegistry.getDefaultInstance(),
            decompressorRegistry,
            serializationFormat,
            jsonMarshaller,
            unsafeWrapResponseBuffers);    
    ```


- `Clients`를 통해 Service Stub을 만들게 되면 해당 Stub 마다 채널이 고유하게 생성된다
  - 호스트, 포트 둘 다 같아도 채널은 Stub마다 고유하게 생성된다

- `Content-type`이 `application/grpc`가 아닐 경우 415 상태코드로 응답

**요청과 응답**
- 현재 `stream`옵션을 사용하지 않아서 **UNARY** 통신이다.
- Full request URI `http://127.0.0.1:8080/grpc.sample.HelloService/HelloCall`
  - `/grpc.sample.HelloService/` : proto파일에 선언된 `package` + `service`이름
  - `/HelloCall/` : proto파일에 선언된 `service`의 `rpc`
- 요청 헤더 `[:method=POST, :path=/grpc.sample.SampleService/SampleCall, content-type=application/grpc+proto, te=trailers]`
- 응답 메세지는 **응답헤더**, **length prefixed message**, **Trailer**
  - **Trailer**헤더는 http스펙으로 `grpc-status`와 `grpc-message`를 포함

***

# HTTP/2

**HTTP/2 용어 설명**
- **스트림**
  - 구성된 연결 내에서 전달되는 바이트의 양방향 흐름이며, 하나 이상의 메시지가 전달될 수 있습니다.
  - **스트림은 프레임** 이라고 하는 의미론적으로 **연결된 일련의 메시지**
- **메시지** : 논리적 요청 또는 응답 메시지에 매핑되는 프레임의 전체 시퀀스입니다.
- **프레임** : HTTP/2에서 통신의 최소 단위이며 각 최소 단위에는 하나의 프레임 헤더가 포함됩니다. 이 프레임 헤더는 최소한으로 프레임이 속하는 스트림을 식별합니다.


HTTP/1.1은 `keep alive`를 통해 어느정도 문제를 해결하였지만 **Head-Of-Line Block**문제는 해결하지 못 했다.  
- `A server MUST send its responses to those requests in the same order that the requests were received.`
  - 서버는 반드시 응답을 요청 순서에 맞추어 전달해야 한다.

**HTTP/2에서는**  
**스트리밍을 통해 동일한 연결에서 동시에 메시지를 보낼 수 있다.**  
- 모든 요청은 동시에 전송되지만 병렬성을 의미하는 것은 아니다.
- 한 번에 하나의 패킷만 보낼 수 있다. 
- **스트림 간에 라운드 로빈 전송 패킷을 보낼 수 있다.** (우선순위도 적용할 수 있다)

**흐름 제어**  
스트림 사양의 일부인 **흐름 제어 메커니즘**으로 `스트림간의 느린 처리에 대한 영향을 주는 문제`를 해결한다.  
흐름 제어는 스트림당(및 연결당) 기준으로 처리되지 않은 데이터의 양을 제한하는데 사용된다.  
**WINDOW_UPDATE frame**을 사용하여 수신자가 버퍼 크기를 할당하고 송신자는 그 크기만큼 버퍼를 채운다.  
- 수신자는 버퍼가 사용 가능해지면 송신자에게 알린다.
- 수신자가 중지하면 송신자는 버퍼가 소진되면 메시지 전송을 중지해야 한다.

**흐름 제어**를 사용하면 동시 스트림은 `독립적인 버퍼 할당을 보장`한다.


***

# **Armeria**

## 의존성

```gradle
mavenBom 'io.micrometer:micrometer-bom:1.9.4'
mavenBom 'io.netty:netty-bom:4.1.82.Final'
mavenBom 'com.linecorp.armeria:armeria-bom:1.20.3'
```

- `implementation 'com.linecorp.armeria:armeria-spring-boot2-starter'` 
  - micrometer
  - netty codec haproxy, netty codec http2, netty resolver dns, netty transport
  - reactive streams 1.0.4
- `implementation 'com.linecorp.armeria:armeria-tomcat9'`
- `implementation 'com.linecorp.armeria:armeria-grpc'`
  - grpc core, grpc protobuf, grpc services, grpc stub

## Tomcat이 담당하고 있던 네트워크 레이어까지 모두 Armeria로 대체하는 구성

Netty의 `EventLoop`가 client로부터 오는 요청을 다 받은 후

1. **커넥션 스레드는 Armeria의 Netty가 NonBlocking으로 처리**
2. **워커 스레드(서블릿 스레드)는 Tomcat이 Blocking으로 처리**
   - 서블릿 스레드는 Armeria의 `BlockingTaskExecutor`이다
   - `EventLoop`가 해당 request를 처리하라는 작업을 `BlockingTaskExecutor`에게 위임
   - `BlockingTaskExecutor`에서 어댑터를 이용해 서블릿 컨테이너를 호출

> EventLoops - EventLoop (+ EventQueue)  - 여러 개의 Channel


## **스트리밍 처리**
스트림 처리 방식을 적용하면, 크기가 작은 시스템 메모리로도 많은 양의 데이터를 처리할 수 있다.  
입력 데이터에 대한 파이프 라인을 만들어 데이터가 들어오는 대로 물 흐르듯이 `구독(subscribe)`하고, 처리한 뒤,  
`발행(publish)`까지 한 번에 연결하여 처리할 수 있다
이렇게 하면 서버는 많은 양의 데이터도 탄력적으로 처리할 수 있다.  

## **비동기 방식**
동기 방식에선 클라이언트가 서버에 요청을 보내면 응답을 받기 전까지 **블로킹**된다.  
- 현재 스레드가 다른 일을 하지 못하고 기다림

비동기 방식은 **더 빠른 응답 속도**를 보여주고, 현재 스레드가 다른 업무를 더 많이 처리할 수 있어서 **적은 수의 스레드로 더 많은 요청을 처리**할 수 있다.

## **백 프레셔**

**옵저버 패턴** ( + `publisher`, `subscriber`)  
발행자가 구독자에게 밀어 넣는 방식으로 데이터가 전달된다.  
발행자는 구독자의 상태를 고려하지 않고 데이터를 밀어넣는 데에만 집중  
큐를 이용해서 대기 중인 이벤트를 저장해야 한다.  

**고정 길이 버퍼**  
신규로 수신된 메시지를 거절한다.  
거절된 메시지는 재요청하게 되며, 재요청 과정에서 CPU와 네트워크 연산 비용이 추가로 발생한다.  

**가변 길이 버퍼**  
이벤트를 저장할 떄 `out of memory`에러가 발생하면서 **서버 크래시**가 발생한다.  


위와 같은 두 문제를 해결하려면 **발행자가 데이터를 전달할 때 구독자가 필요한 만큼만 전달하면 해결할 수 있지 않을까?**  
이게 **백 프레셔의 기본 원리**  

**풀 방식**  
구독자가 필요한 데이터의 수를 발행자에게 요청하는 방식  
풒 방식에서는 이렇게 전달되는 모든 데이터의 크기를 구독자가 결정한다.  
구독자가 수용할 수 있는 만큼만 데이터를 요청하는 방식이 **백 프레셔**  

## **[decorator](https://armeria.dev/docs/server-decorator/) 기능 제공**


## **HTTP/2 스트림**

스트림은 유기적으로 계속 연결되어있어야 한다.  
Armeria에서는 데이터의 흐름을 유기적으로 제어하기 위해서 서버 내에선 **Reactive Streams의 백 프레셔를 이용해 트래픽을 제어**  

## HealthCheck

`final AggregatedHttpResponse res = client.get("/internal/healthcheck").aggregate().join();`  

```
DefaultAggregatedHttpResponse{
    headers=[
            :status=200, 
            content-type=application/json; 
            charset=utf-8, 
            armeria-lphc=0, 
            0, 
            server=Armeria/1.20.3, 
            date=Tue, 
            29 Nov 2022 07:43:59 GMT, 
            content-length=16
        ], 
    content={
        16B, 
        text={
            "healthy":true
        }
    }
}
```

- healthcheck 존재

## StreamObserver

- `StreamObserver`의 주요 메서드
  - `onNext(V value)`
    - 에러 또는 완료된 후에 호출하진 못한다
    - 현재 단항 호출을 사용하기 떄문에 한 번 호출된다
    - 단항 호출일 때 서버에서 `onNext`를 여러 번 호출하면 `UNKNOWN`예외 발생
      - `stream`으로 변경해야 가능
  - `onError(Throwable t)`
    - `t`를 `Status`객체로 변경해야 상태코드 확인이 가능하다
    - Armeria나 gRPC에서 각각 `static`메소드를 제공한다
    - 에러 코드마다 어떻게 처리할지 컨벤션을 잡아야 하지 않을까? 📌
  - `onCompleted()`



## 아르메리아 클라이언트

```gradle
dependencies {
    /**
     * proto-interface
     */
    implementation 'com.wert:interface:2022.11.24.02'

    /**
     * armeria
     */
    implementation 'com.linecorp.armeria:armeria-grpc:1.20.3'
}

// <넥서스 모듈 참조 위함>
def config = new Properties()
file("${System.properties['user.home']}/.gradle.properties").withInputStream { config.load(it) }

repositories {
    maven {
        allowInsecureProtocol true
        credentials {
            username config['repository.id'] as String
            password config['repository.password'] as String
        }
        url config['repository.url.public']
    }
}
// </넥서스 모듈 참조 위함>
```

## 서버

```gradle
dependencies {

    runtimeOnly 'com.linecorp.armeria:armeria-spring-boot2-actuator-starter'

    /**
     * proto-interface
     */
    implementation 'com.wert:interface:2022.11.24.02'

    /**
     * armeria
     */
    implementation 'com.linecorp.armeria:armeria-spring-boot2-starter'
    implementation 'com.linecorp.armeria:armeria-tomcat9'
    implementation 'com.linecorp.armeria:armeria-grpc'
}

// <아르메리아 mavenBom>
dependencyManagement {
    imports {
        mavenBom 'com.linecorp.armeria:armeria-bom:1.20.3'
    }
}
// </아르메리아 mavenBom>

// <넥서스 모듈 참조 위함>
def config = new Properties()
file("${System.properties['user.home']}/.gradle.properties").withInputStream { config.load(it) }

repositories {
    maven {
        allowInsecureProtocol true
        credentials {
            username config['repository.id'] as String
            password config['repository.password'] as String
        }
        url config['repository.url.public']
    }
}
// </넥서스 모듈 참조 위함>
```