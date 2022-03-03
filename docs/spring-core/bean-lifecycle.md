---
layout: default
title: 빈 생명주기
parent: 🌱 스프링
nav_order: 7
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

## **빈 생명주기**
- **데이터베이스 커넥션 풀이나 , 네트워크 소켓 처럼 애플리케이션 시작 시점에 필요한 연결을 미리 해두고 , 애플리케이션 종료시점에 연결을 모두 종료하는 작업을 진행 하려면** , <span style="color:red; font-weight:bold">객체의 초기화와 종료 작업이 필요하다.</span>
- 이러한 초기화 작업과 종료 작업을 어떻게 진행하는지 예제로 알아보자

스프링은 간단하게 다음과 같은 라이프 사이클을 거친다.
- **"객체 생성" → "의존관계 주입" (생성자 주입은 예외)**

스프링 빈은 객체를 생성하고 , 의존관계 주입이 다 끝난 다음에야 필요한 데이터를 사용할 수 있는 준비가 완료된다.

**스프링은 의존관계 주입이 완료되면**<span style="color:red; font-weight:bold"> 스프링 빈에게 콜백 메서드를 통해서 초기화 시점을 알려주는 다양한 기능</span>을 제공한다.

또한 **스프링은 스프링 컨테이너가 종료되기 직전에** <span style="color:red; font-weight:bold">소멸 콜백</span>을 해준다.



### 📌 **스프링 빈의 이벤트 라이프 사이클**
> 1. "스프링 컨테이너 생성"
> 1. "스프링 빈 생성"
> 1. "의존관계 주입"
> 1. "초기화 콜백"
> 1. "사용"
> 1. "소멸전 콜백"
> 1. "스프링 종료"

✋
> **"객체의 생성과 초기화를 분리하자"** 생성자는 필수 정보(파라미터)를 받고 , 메모리를 할당해서 객체를 생성하는 책임을 가진다. 반면에 초기화는 이렇게 생성된 값들을 활용해서 외부 커넥션을 연결하는 등 무거운 동작을 수행한다.따라서 생성단에서 무거운 초기화 작업을 함께하는 것 보다는 객체를 생성하는 부분과 초기화 하는 부분을 명확하게 나누는 것이 유지보수 관점에서 좋다. 물론 초기화 작업이 내부 값들만 약간 변경하는 정도로 단순한 경우에는 생성자에서 한번에 다 처리하는게 더 나을 수 있다.

***

## **스프링은 크게 3가지 방법으로 빈 생명주기 콜백을 지원한다.**
### **인터페이스 (InitializingBean , DisposableBean)**
인터페이스를 사용하는 초기화 , 종료 방법은 스프링 초창기에 나온 방법들이고 ,
지금은 더 나은 방법들이 있어 거의 사용하지 않는다.
{: .label .label-red}
#### Class
```java
public class NetworkClient implements InitializingBean , DisposableBean {
    private String url;

    public NetworkClient() {
        System.out.println("생성자 호출 , url = " + url);
    }

    public void setUrl(String url) {
        this.url = url;
    }

    // 서비스 시작시 호출
    public void connect(){
        System.out.println("Connect : " + url);
    }

    public void call(String message){
        System.out.println("Call : " + url + " message : "+ message);
    }

    // 서비스 종료시 호출
    public void disconnect(){
        System.out.println("close : " + url);
    }

    @Override
    // 의존관계 주입이 끝나면 호출
    public void afterPropertiesSet() throws Exception {
        connect();
        call("초기화 연결 메시지");
    }

    @Override
    // 서버가 종료 될 때
    public void destroy() throws Exception {
        System.out.println("destory");
        disconnect();
    }
}
```
#### Test
```java
public class BeanLifeCycleTest {

    @Test
    public void lifeCycleTest(){
        // 스프링 컨테이너 생성
        AnnotationConfigApplicationContext ac =
                new AnnotationConfigApplicationContext(LifeCycleConfig.class);

        NetworkClient bean = ac.getBean(NetworkClient.class);

        // 스프링 컨테이너 종료
        ac.close();
    }

    @Configuration
    static class LifeCycleConfig{
        @Bean
        public NetworkClient networkClient(){
            NetworkClient networkClient = new NetworkClient();
            networkClient.setUrl("http://hello-spring.dev");
            return networkClient;
        }
    }
}
```
#### 출력
```
생성자 호출 , url = null
Connect : http://hello-spring.dev
Call : http://hello-spring.dev message : 초기화 연결 메시지
destory
close : http://hello-spring.dev
```
#### 초기화 소멸 인터페이스 단점
- 이 인터페이스는 스프링 전용 인터페이스다. 해당 코드가 스프링 전용 인터페이스에 의존한다.
- 초기화 , 소멸 메소드의 이름을 변경할 수 없다.
- 내가 코드를 고칠 수 없는 외부라이브러리에 적용할 수 없다.

***

### **설정 정보에 초기화 메서드 , 종료 메서드 지정**
**설정 정보에 `@Bean(InitMethod="init" , destroyMethod="close")`처럼 초기화 , 소멸 메소드를 지정할 수 있다.**

#### Class
```java
public class NetworkClient{
    private String url;

    public NetworkClient() {
        System.out.println("생성자 호출 , url = " + url);
    }

    public void setUrl(String url) {
        this.url = url;
    }

    // 서비스 시작시 호출
    public void connect(){
        System.out.println("Connect : " + url);
    }

    public void call(String message){
        System.out.println("Call : " + url + " message : "+ message);
    }

    // 서비스 종료시 호출
    public void disconnect(){
        System.out.println("close : " + url);
    }

    // 의존관계 주입이 끝나면 호출
    public void init() throws Exception {
        connect();
        call("초기화 연결 메시지");
    }

    // 종료될 때
    public void close() throws Exception {
        System.out.println("destory");
        disconnect();
    }
}
```

#### Test
```java
public class BeanLifeCycleTest {

    @Test
    public void lifeCycleTest(){
        // 스프링 컨테이너 생성
        AnnotationConfigApplicationContext ac =
                new AnnotationConfigApplicationContext(LifeCycleConfig.class);
        NetworkClient bean = ac.getBean(NetworkClient.class);

        // 스프링 컨테이너 종료
        ac.close();
    }

    @Configuration
    static class LifeCycleConfig{
        @Bean(initMethod = "init" , destroyMethod = "close")
        public NetworkClient networkClient(){
            NetworkClient networkClient = new NetworkClient();
            networkClient.setUrl("http://hello-spring.dev");
            return networkClient;
        }
    }
}
```
#### 출력
```
생성자 호출 , url = null
Connect : http://hello-spring.dev
Call : http://hello-spring.dev message : 초기화 연결 메시지
destory
close : http://hello-spring.dev
```

#### 설정 정보 사용 특징
- **`@Bean`에서만 사용 가능하다.**
- 메소드 이름을 자유롭게 줄 수 있다.
- 스프링 빈이 스프링 코드에 의존하지 않는다.
- **코드가 아니라 설정 정보를 사용하기 때문에 코드를 고칠 수 없는 외부 라이브러리에도 초기화 , 종료 메소드를 적용할 수 있다.**

#### 종료 메소드 추론
- `@Bean`의 `destroyMethod`에는 아주 특별한 기능이 있다.
- 라이브러리는 대부분 `close` , `shutdown`이라는 이름의 종료 메소드를 사용한다.
- `@Bean`의 `destroyMethod`는 기본값이 **"inferred"**(추론)으로 등록 되어 있다.
- 이 추론 기능은 `close` , `shutdown`이라는 이름의 메서드를 자동으로 호출해준다.
- 이름 그대로 종료 메소드를 추론해서 호출 해준다.
- **따라서 스프링 빈`@Bean`으로 등록하면 종료 메소드는 따로 적어주지 않아도 잘 동작한다**
- 추론 기능을 사용하기 싫으면 빈 공백을 지정하면 된다.

***

### 📌 **`@PostConstruct` , `@PreDestory` 애노테이션 지정 (권장)**

#### Class
```java
package hello.core.lifeCycle;

// javax는 자바에서 공식적으로 지원하는 것들
import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

public class NetworkClient{
    private String url;

    public NetworkClient() {
        System.out.println("생성자 호출 , url = " + url);
    }

    public void setUrl(String url) {
        this.url = url;
    }

    // 서비스 시작시 호출
    public void connect(){
        System.out.println("Connect : " + url);
    }

    public void call(String message){
        System.out.println("Call : " + url + " message : "+ message);
    }

    // 서비스 종료시 호출
    public void disconnect(){
        System.out.println("close : " + url);
    }

    // 의존관계 주입이 끝나면 호출
    @PostConstruct
    public void init() throws Exception {
        connect();
        call("초기화 연결 메시지");
    }

    // 서버가 종료 될 때
    @PreDestroy
    public void close() throws Exception {
        System.out.println("destory");
        disconnect();
    }
}
```

#### Test
```java
public class BeanLifeCycleTest {

    @Test
    public void lifeCycleTest(){
        // 스프링 컨테이너 생성
        AnnotationConfigApplicationContext ac =
                new AnnotationConfigApplicationContext(LifeCycleConfig.class);
        NetworkClient bean = ac.getBean(NetworkClient.class);

        // 스프링 컨테이너 종료
        ac.close();
    }

    @Configuration
    static class LifeCycleConfig{
        @Bean
        public NetworkClient networkClient(){
            NetworkClient networkClient = new NetworkClient();
            networkClient.setUrl("http://hello-spring.dev");
            return networkClient;
        }
    }
}
```

#### 출력
```java
생성자 호출 , url = null
Connect : http://hello-spring.dev
Call : http://hello-spring.dev message : 초기화 연결 메시지
destory
close : http://hello-spring.dev
```

#### 특징
- **최신 스프링에서 가장 권장하는 방법이다.**
- 스프링에 종속적인 기술이 아니라 JSR-250이라는 자바 표준이다.따라서 스프링이 아닌 다른 컨테이너에서도 동작한다.
- 컴포넌트 스캔(자동 빈 등록)과 잘 어울린다.
- **유일한 단점은 외부 라이브러리에는 적용하지 못한다는 것이다. 외부 라이브러리를 초기화 , 종료 해야하면 `@Bean`의 기능을 사용하자**
