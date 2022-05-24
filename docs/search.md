## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

[스프링 MVC 1편 - 백엔드 웹 개발 핵심 기술](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-mvc-1/dashboard)

# [Chapter1. Servlet](https://github.com/jdalma/SpringMVC-1/pull/1)

1. [HttpServletRequest HEADER , COOKIE 등 조회하기](https://github.com/jdalma/SpringMVC-1/pull/1/commits/1ecb280a27ba0d61f6f07099d0fde30892c3f1b0)
2. [HTTP 요청 데이터 GET 방식 쿼리 파라미터](https://github.com/jdalma/SpringMVC-1/pull/1/commits/f47791d1567e3f74b34176592ba3c2e13729b230)
3. [HTTP 요청 데이터 POST HTML Form 방식](https://github.com/jdalma/SpringMVC-1/pull/1/commits/588c17c608c5397e8c5cd1cb950f492a95772cdb)
4. [HTTP 요청 JSON 데이터를 Jackson을 사용하여 객체 매핑](https://github.com/jdalma/SpringMVC-1/pull/1/commits/5521a00ad93f980a7cd611760c5a6d69b95f53b4)
5. [HttpServletResponse Header , Cookie , Redirect , MessageBody 테스트](https://github.com/jdalma/SpringMVC-1/pull/1/commits/a0e20215ea0bab3c62bdfbbb2926538f5ef4b5b8)
6. [HTTP 응답 -> HTML , JSON형식](https://github.com/jdalma/SpringMVC-1/pull/1/commits/cf0200acae0889e41afc3fe296f457cddd7e47dd)

- **HTTP 요청 메세지** 로그로 확인하기
  - `logging.level.org.apache.coyote.http11=debug `
- `application/json` 은 스펙상 **utf-8** 형식을 사용하도록 정의되어 있다.
- 그래서 스펙에서 `charset=utf-8` 과 같은 추가 파라미터를 지원하지 않는다. 따라서 `application/json` 이라고만 사용해야지
- `application/json;charset=utf-8` 이라고 전달하는 것은 의미 없는 파라미터를 추가한 것이 된다. 
- **`response.getWriter()`를 사용하면 추가 파라미터를 자동으로 추가해버린다.**
- 이때는 **`response.getOutputStream()`으로 출력하면 그런 문제가 없다.**

***

# [Chapter2. Servlet , JSP , MVC Pattern](https://github.com/jdalma/SpringMVC-1/pull/2)

1. [Member (In Memory) 도메인 및 테스트 코드 추가](https://github.com/jdalma/SpringMVC-1/pull/2/commits/a0f659ca3b26e24fc6e4c9ec46ee91835d1e371c)
2. [gradle JSP 추가](https://github.com/jdalma/SpringMVC-1/pull/2/commits/6c9300c84fc5fdd0e113c530fa98d11d5a24c973)
3. [Servlet으로 회원 관리](https://github.com/jdalma/SpringMVC-1/pull/2/commits/c358fd1bf0825479d9d6248749029ddddb6b8efa)
4. [JSP로 회원 관리](https://github.com/jdalma/SpringMVC-1/pull/2/commits/313c5f90d2070fdde98ebe9d8763beebd2e2b531)
5. [MVC 패턴으로 회원관리](https://github.com/jdalma/SpringMVC-1/pull/2/commits/68b96b4bfad2257eac741055e538cc14ffb99ecd)

## **서블릿과JSP의 한계**
- 서블릿으로 개발할 때는 `뷰(View)`화면을 위한 HTML을 만드는 작업이 자바 코드에 섞여서 지저분하고 복잡했다.
- JSP를 사용한 덕분에 뷰를 생성하는 HTML 작업을 깔끔하게 가져가고 , 동적으로 변경이 가능하다
    - **하지만 비즈니스 로직과 HTML이 섞여 JSP가 너무 많은 역할을 한다.**

## **MVC 패턴의 등장**
1. `JSP`가 너무 많은 역할을 한다.
2. `UI`를 일부 수정하는 일과 `비즈니스 로직`을 수정하는 일은 각각 다르게 발생할 가능성이 매우 높고 대부분 서로에게 영향을 주지 않는다.
    - **이렇게 변경의 라이프 사이클이 다른 부분을 하나의 코드로 관리하는 것은 유지보수하기 좋지 않다.**
3. `JSP`같은 **뷰 템플릿**은 화면을 랜더링 하는데 최적화 되어 있기 때문에 해당 업무만 하는 것이 가장 효과적이다.

## **Controller**
- HTTP요청을 받아서 파라미터를 검증하고 , 비즈니스 로직을 실행
- `VIew`에 전달할 결과 데이터를 조회해서 `Model`에 담는다

![MVC](https://raw.githubusercontent.com/jdalma/jdalma.github.io/master/assets/images/spring-mvc/mvc.png)

## **Model**
- `View`에 출력할 데이터를 담아둔다
- *`View`가 필요한 데이터를 모두 `Model`에 담아서 전달해주는 덕분에 `View`는 비즈니스 로직이나 데이터 접근을 몰라도 되고 화면을 랜더링 하는 일에 집중할 수 있다*

## **View**
- `Model`에 담겨있는 데어티를 사용해서 화면을 그리는 일에 집중한다.

## **MVC 패턴의 한계**
1. **`forward(request , response)` 중복**
    - `View`로 이동하는 코드가 항상 중복 호출

```java
  RequestDispatcher dispatcher = request.getRequestDispatcher(viewPath);
  dispatcher.forward(request , response);
```

2. **`ViewPath`에 중복**
    - **prefix** : `/WEB-INF/views`
    - **suffix** : `.jsp`
      - 만약 `.jsp`를 타임리프로 바꿔야 한다면 모든 코드를 다 변경해야 한다.

```java
  String viewPath = "/WEB-INF/views/new-form.jsp";
```

3. **공통 처리가 어렵다**
    - 단순히 공통 기능을 메서드로 추출해내면 될 것 같지만 , 결과적으로 공통 메서드를 항상 호출해야 하고 , 실수로 호출하지 않으면 문제가 된다
      - **호출하는 것 자체도 중복이다**
    - 위의 문제를 해결하려면 `Controller`호출 전에 먼저 공통 기능을 처리해야 한다.
    - **Front Controller 패턴**을 도입하면 이런 문제를 깔끔하게 해결할 수 있다.
      - *Spring MVC의 핵심도 바로 이 `Front Controller`에 있다*

## **FrontController 패턴 등장**
- `Front Controller` **서블릿 하나**로 클라이언트의 요청을 받는다
- Front Controller가 **요청에 맞는 `Controller`를 찾아 호출**
- Front Controller를 제외한 **나머지 `Controller`는 서블릿을 사용하지 않아도 된다**
- 스프링 웹 MVC의 `DispatcherServlet`이 **FrontController** 패턴으로 구현되어 있다

![](https://raw.githubusercontent.com/jdalma/jdalma.github.io/master/assets/images/spring-mvc/frontController.png)

## Form Action **절대 경로**
- `현재 URL이 속한 계층 경로` + `/save`

```html
    <!-- 상대경로 사용 -->
    <form action="save" method="post">
        username: <input type="text" name="username" />
        age: <input type="text" name="age" />
        <button type="submit">전송</button>
    </form>
```

## **WEB-INF 폴더**
- 외부에서 직접적으로 호출하지 못하게 , `Controller`에서 접근할 때 **WEB-INF**안에 페이지를 넣는다면 외부에서 직접 찾지 못한다.

## **RequestDispatcher**

- `dispatcher.forward(request , response);`
  - 다른 서블릿이나 JSP로 이동할 수 있게 서버 내부에서 재호출 
- `forward`
  - **서버 내부에서 일어나는 호출**이기 때문에 클라이언트가 전혀 인지하지 못 한다.
- `redirect`
  - **실제 클라이언트(웹 브라우저)** 에 응답이 나갔다가 , **클라이언트가 `redirect`경로로 다시 요청**한다.
  - **URL**경로도 변경된다.

```java
    String viewPath = "/WEB-INF/views/new-form.jsp";
    RequestDispatcher dispatcher = request.getRequestDispatcher(viewPath);
    dispatcher.forward(request , response);
```

***

# Chapter3. MVC 프레임워크 만들기

## [Version 1. Front Controller 도입](https://github.com/jdalma/SpringMVC-1/pull/4/commits/c63752bb81e031386fd2835e12e4552e1f06f9c7)
![](https://raw.githubusercontent.com/jdalma/jdalma.github.io/master/assets/images/spring-mvc/mvc_v1.png)


## [Version 2. View 분리 ➔ `MyView` 추가](https://github.com/jdalma/SpringMVC-1/pull/4/commits/3be2a2184cd46fff812d45bf38b4aa5a60d9b7c6)
![](https://raw.githubusercontent.com/jdalma/jdalma.github.io/master/assets/images/spring-mvc/mvc-v2.png)

```java
  String viewPath = "/WEB-INF/views/new-form.jsp";
  RequestDispatcher dispatcher = request.getRequestDispatcher(viewPath);
  dispatcher.forward(request, response);
```

- 이 부분을 분리하기 위해 별도로 뷰를 처리하는 객체를 생성

## [Version 3. Model 추가 ➔ `ModelView` , `ViewResolver` 추가 (서블릿 종속성 , 뷰 이름 중복 제거)](https://github.com/jdalma/SpringMVC-1/pull/4/commits/684a2eae06ea9d3372a76eae8d3298a5b9fdd1f6)

![](https://raw.githubusercontent.com/jdalma/jdalma.github.io/master/assets/images/spring-mvc/mvc-v3.png)

- **서블릿 종속성 제거**
  - 우리가 구현하는 컨트롤러가 서블릿 기술을 전혀 사용하지 않도록 변경해보자
- **뷰 이름 중복 제거**
  - `/WEB-INF/views/new-form.jsp` → **new-form** 
  - `/WEB-INF/views/save-result.jsp` → **save-result** 
  - `/WEB-INF/views/members.jsp` → **members**
  - 컨트롤러에서 지정하는 뷰 이름에 중복이 있는 것을 확인할 수 있다
  - 컨트롤러는 **뷰의 논리 이름**을 반환하고 실제 물리 위치의 이름은 프론트 컨트롤러에서 처리하도록 단순화
- **`ModelView` 추가**
  - `request.setAttribute()`를 통해 데이터를 저장하고 뷰에 전달했다
  - **서블릿의 종속성을 제거하기 위해** `Model`을 직접 만들고 , 추가로 `View` 이름까지 전달하는 객체를 추가
- **`ViewResolver` 메서드 추가**
  - `MyView view = viewResolver(viewName)`
  - 컨트롤러가 반환한 논리 뷰 이름을 실제 물리 뷰 경로로 변경한다. 
  - 그리고 실제 물리 경로가 있는 MyView 객체를 반환한다.
  - **논리 뷰 이름** : `members`
  - **물리 뷰 경로** : `/WEB-INF/views/members.jsp`


## [Version 4. 단순하고 실용적인 컨트롤러 ➔ `ModelView` 제거 , 경로만 반환](https://github.com/jdalma/SpringMVC-1/pull/4/commits/ea38e5ac4f5c421af8469244d58b86bc512758ec)

![](https://raw.githubusercontent.com/jdalma/jdalma.github.io/master/assets/images/spring-mvc/mvc-v4.png)

- 앞서 만든 `Version 3`은 **서블릿 종속성을 제거**하고 , **View 경로 중복을 제거**하는 등 잘 설계된 컨트롤러 이다.
- *하지만 항상 `ModelView`객체를 생성하고 반환해야 하는 부분이 조금 번거롭다*
- 기본적인 구조는 V3와 같지만 매우 편리하게 수정해보자
- Controller가 ModelView를 반환하지 않고 , `ViewName`만 반환한다. 

## [Version 5. 유연한 컨트롤러 ➔ `Adapter Pattern` 적용](https://github.com/jdalma/SpringMVC-1/pull/4/commits/24da6233e11d245d57f26972606fa5ad39186410)

- 지금까지 우리가 개발한 `Front Controller`는 한 가지 방식의 `Controller Interface`만 사용할 수 있다.
  - *`ControllerV3` , `ControllerV4`는 완전히 다른 인터페이스 이다*

![](https://raw.githubusercontent.com/jdalma/jdalma.github.io/master/assets/images/spring-mvc/mvc-v5.png)

- `Adapter Pattern`을 사용해서 `Front Controller`가 다양한 방식의 `Controller`를 처리할 수 있도록 변경해보자
- **Handler Adapter**
  - 이 `Handler Adapter`덕분에 다양한 종류의 `Controller`를 호출할 수 있다.
  - `Adapter`는 실제 `Controller`를 호출하고 , 그 결과로 `ModelView`를 반환해야 한다
    - `ModelView`를 반환하지 못하면 , **해당 `Adapter`가 `ModelView`를 직접 생성해서라도 반환해야 한다**
  - 이전에는 `Front Controller`가 실제 `Controller`를 호출했지만 이제는 이 **`Adapter`를 통해서 호출한다**
- **Handler**
  - `Controller`의 이름을 더 넓은 범위인 **Handler**로 변경했다
- 이제 **`Adapter`가 있기 때문에 `Controller`의 개념 뿐만 아니라 어떠한 것이든 해당하는 종류의 `Adapter`만 있으면 다 처리할 수 있다**

## **Adapter Pattern** 🚩

***

# [Chapter4. MVC 구조 이해](https://github.com/jdalma/SpringMVC-1/pull/5)

![](https://raw.githubusercontent.com/jdalma/jdalma.github.io/master/assets/images/spring-mvc/spring-mvc-structure.png)

|직접 만든 프레임 워크|스프링 MVC|
|------|---|
|FrontController|DispatcherServlet|
|handlerMappingMap|HandlerMapping| 
|MyHandlerAdapter| HandlerAdapter| 
|ModelView |ModelAndView| 
|viewResolver| ViewResolver|
|MyView| View|


## **`DispatcherServlet` 구조 살펴보기 → 스프링 MVC의 핵심** ⭐️
- `org.springframework.web.servlet.DispatcherServlet`

![](https://raw.githubusercontent.com/jdalma/jdalma.github.io/master/assets/images/spring-mvc/dispatcherServletClassDiagram.png)

1. **핸들러 조회** : 핸들러 매핑을 통해 요청 URL에 `매핑된 핸들러(컨트롤러)를 조회`한다.
2. **핸들러 어댑터 조회** : 핸들러를 실행할 수 있는 `핸들러 어댑터를 조회`한다.
3. **핸들러 어댑터 실행** : `핸들러 어댑터를 실행`한다.
4. **핸들러 실행** : 핸들러 어댑터가 `실제 핸들러(컨트롤러)를 실행`한다.
5. **ModelAndView 반환** : 핸들러 어댑터는 핸들러(컨트롤러)가 반환하는 정보를 `ModelAndView로 변환해서 반환`한다.
6. **viewResolver 호출** : `뷰 리졸버를 찾고 실행`한다.
    - *JSP의 경우: `InternalResourceViewResolver` 가 자동 등록되고, 사용된다.*
7. **View반환** : `viewResolver`는 뷰의 논리 이름을 물리 이름으로 바꾸고 , 렌더링 역할을 담당하는 `뷰 객체를 반환`한다.
   - *JSP의 경우 `InternalResourceView(JstlView)` 를 반환하는데, 내부에 `forward()` 로직이 있다.*
8. **뷰 렌더링** : 뷰를 통해서 뷰를 렌더링한다.

- `DispatcherServlet`도 **부모 클래스 에서 `HttpServlet`을 상속 받아서 사용하고 , 서블릿으로 동작한다**
- 스프링 부트는 `DispatcherServlet`을 *서블릿으로 자동으로 등록*하면서 **모든 경로 `urlPatterns="/"`** 에 대해서 매핑한다
  - 서블릿으로 등록하는 방법은 여러 가지가 있다
  - *더 자세한 경로가 우선순위가 높다*

- **주요 인터페이스 목록**
  - 핸들러 매핑 : `org.springframework.web.servlet.HandlerMapping`
  - 핸들러 어댑터: `org.springframework.web.servlet.HandlerAdapter`
  - 뷰 리졸버: `org.springframework.web.servlet.ViewResolver`
  - 뷰: `org.springframework.web.servlet.View`
        
 

### 요청 흐름

1. 서블릿이 호출되면 `HttpServlet`이 제공하는 `service()`가 호출된다
2. 스프링 MVC는 `DispatcherServlet`의 부모인 `FrameworkServlet`에서 `service()`를 **오버라이드**해두었다.

```java
/**
  * Override the parent class implementation in order to intercept PATCH requests.
  */
@Override
protected void service(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {

  HttpMethod httpMethod = HttpMethod.resolve(request.getMethod());
  if (httpMethod == HttpMethod.PATCH || httpMethod == null) {
    processRequest(request, response);
  }
  else {
    super.service(request, response);
  }
}
```

3. `FrameworkServlet.service()`를 시작으로 여러 메서드가 호출되면서 **`DispatcherServlet.doDispatch()`가 호출된다**

```java
protected void doDispatch(HttpServletRequest request, HttpServletResponse response) throws Exception {
    HttpServletRequest processedRequest = request;
    HandlerExecutionChain mappedHandler = null;
    ModelAndView mv = null;
    // 1. 핸들러 조회
    mappedHandler = getHandler(processedRequest); if (mappedHandler == null) {
        noHandlerFound(processedRequest, response);
        return; 
    }

    //2.핸들러 어댑터 조회-핸들러를 처리할 수 있는 어댑터
    HandlerAdapter ha = getHandlerAdapter(mappedHandler.getHandler());

    // 3. 핸들러 어댑터 실행 
    // 4. 핸들러 어댑터를 통해 핸들러 실행 
    // 5. ModelAndView 반환 mv = ha.handle(processedRequest, response, mappedHandler.getHandler());
    processDispatchResult(processedRequest, response, mappedHandler, mv, dispatchException);
}

private void processDispatchResult(HttpServletRequest request, HttpServletResponse response, HandlerExecutionChain mappedHandler, ModelAndView mv, Exception exception) throws Exception {
    ...
    
    // 뷰 렌더링 호출
    render(mv, request, response);
    
    ...
}

protected void render(ModelAndView mv, HttpServletRequest request, HttpServletResponse response) throws Exception {
    ...

    View view;
    // 6. 뷰 리졸버를 통해서 뷰 찾기
    // 7.View 반환
    String viewName = mv.getViewName(); 
    view = resolveViewName(viewName, mv.getModelInternal(), locale, request);
    
    // 8. 뷰 렌더링
    view.render(mv.getModelInternal(), request, response);

    ...
}
```

- 핸들러가 없다면 !!!

```java
protected void noHandlerFound(HttpServletRequest request, HttpServletResponse response) throws Exception {
  if (pageNotFoundLogger.isWarnEnabled()) {
    pageNotFoundLogger.warn("No mapping for " + request.getMethod() + " " + getRequestUri(request));
  }
  if (this.throwExceptionIfNoHandlerFound) {
    throw new NoHandlerFoundException(request.getMethod(), getRequestUri(request),
        new ServletServerHttpRequest(request).getHeaders());
  }
  else {
    response.sendError(HttpServletResponse.SC_NOT_FOUND);
  }
}
```

- 핸들러가 있으면 `private List<HandlerAdapter> handlerAdapters`에서 **Adapter**를 찾는다

```java
protected HandlerAdapter getHandlerAdapter(Object handler) throws ServletException {
  if (this.handlerAdapters != null) {
    for (HandlerAdapter adapter : this.handlerAdapters) {
      if (adapter.supports(handler)) {
        return adapter;
      }
    }
  }
  throw new ServletException("No adapter for handler [" + handler + "]: The DispatcherServlet configuration needs to include a HandlerAdapter that supports this handler");
}
```

## **핸들러 매핑**과 **핸들러 어댑터**
- 핸들러 매핑과 핸들러 어댑터가 어떤 것들이 어떻게 사용되었는지 알아보자

- **HandlerMapping(핸들러 매핑)**
  - 핸들러 매핑에서 이 컨트롤러를 찾을 수 있어야 한다.
  - 예) **스프링 빈의 이름으로 핸들러를 찾을 수 있는 핸들러 매핑**이 필요하다.

```
...
우선 순위 (낮을수록 높다)
0 = RequestMappingHandlerMapping : 애노테이션 기반의 컨트롤러인 @RequestMapping에서 사용
1 = BeanNameUrlHandlerMapping : 스프링 빈의 이름으로 핸들러를 찾는다.
...
```


- **HandlerAdapter(핸들러 어댑터)**
  - 핸들러 매핑을 통해서 찾은 핸들러를 실행할 수 있는 핸들러 어댑터가 필요하다.
  - 예) `Controller 인터페이스`를 실행할 수 있는 **핸들러 어댑터를 찾고 실행**해야 한다.

```
...
우선 순위 (낮을수록 높다)
0 = RequestMappingHandlerAdapter : 애노테이션 기반의 컨트롤러인 @RequestMapping에서 사용
1 = HttpRequestHandlerAdapter : HttpRequestHandler 인터페이스 처리
2 = SimpleControllerHandlerAdapter : Controller 인터페이스(애노테이션X, 과거에 사용) 처리
...
```

- **핸들러 매핑도, 핸들러 어댑터도 모두 순서대로 찾고 만약 없으면 다음 순서로 넘어간다.**
- 지금은 전혀 사용하지 않지만 , 과거에 주로 사용했던 스프링이 제공하는 간단한 컨트롤러로 핸들러 매핑과 어댑터를 이해해보자

### `@Controller`대신 `Controller` 인터페이스

- `@Controller`어노테이션과 완전히 다르다
- `org.springframework.web.servlet.mvc.Controller`

```java
@Component("/springmvc/old-controller")
public class OldController implements Controller {

    @Override
    public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
        System.out.println("OldController.handleRequest");
        return null;
    }
}
```

- 위와 같이 `@Component("/springmvc/old-controller")` 라는 이름의 **스프링 빈으로 등록되었다.**
- 핸들러 매핑과 핸들러 어댑터가 **`http://localhost:8080/springmvc/old-controller`** 로 접근하면 (빈 이름으로 접근해도) 정상 호출이 된다.


1. **핸들러 매핑으로 핸들러 조회**
   - `HandlerMapping` 을 순서대로 실행해서, 핸들러를 찾는다.
   - 이 경우 빈 이름으로 핸들러를 찾아야하기 때문에 이름 그대로 빈 이름 으로 핸들러를 찾아주는 `BeanNameUrlHandlerMapping` 가 실행에 성공하고 핸들러인 `OldController` 를 반환한다.
2. **핸들러 어댑터 조회**
   - `HandlerAdapter` 의 `supports()` 를 순서대로 호출한다.
   - **`SimpleControllerHandlerAdapter` 가 `Controller` 인터페이스를 지원하므로 대상이 된다.**
3. **핸들러 어댑터 실행**
   - 디스패처 서블릿이 조회한 `SimpleControllerHandlerAdapter` 를 실행하면서 핸들러 정보도 함께 넘겨준다.
   - `SimpleControllerHandlerAdapter` 는 핸들러인 `OldController` 를 내부에서 실행하고, 그 결과를 반환한다.
- HandlerMapping = BeanNameUrlHandlerMapping
- HandlerAdapter = SimpleControllerHandlerAdapter


### `@Controller`대신 `HttpRequestHandler` 인터페이스
- **서블릿과 가장 유사한 핸들러**

```java
@Component("/springmvc/old-controller")
public class OldController implements HttpRequestHandler {

    @Override
    public void handleRequest(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("OldController.handleRequest");
    }
}
```

1. **핸들러 매핑으로 핸들러 조회**
   - `HandlerMapping` 을 순서대로 실행해서, 핸들러를 찾는다.
   - 이 경우 빈 이름으로 핸들러를 찾아야하기 때문에 이름 그대로 빈 이름으로 핸들러를 찾아주는 `BeanNameUrlHandlerMapping` 가 실행에 성공하고 핸들러인 `MyHttpRequestHandler` 를 반환한다.
2. **핸들러 어댑터 조회**
   - `HandlerAdapter` 의 `supports()` 를 순서대로 호출한다.
   - `HttpRequestHandlerAdapter` 가 `HttpRequestHandler` 인터페이스를 지원하므로 대상이 된다.
3. 핸들러 어댑터 실행
   - 디스패처 서블릿이 조회한 `HttpRequestHandlerAdapter` 를 실행하면서 핸들러 정보도 함께 넘겨준다.
   - `HttpRequestHandlerAdapter` 는 핸들러인 `MyHttpRequestHandler` 를 내부에서 실행하고, 그 결과를 반환한다.
- HandlerMapping = BeanNameUrlHandlerMapping
- HandlerAdapter = HttpRequestHandlerAdapter

## [**뷰 리졸버**](https://github.com/jdalma/SpringMVC-1/pull/5/commits/9055989bf941e8315cef8cc295dc675623db31a4) `InternalResourceViewResolver`

```
[application.properties]에 추가

spring.mvc.view.prefix=/WEB-INF/views/
spring.mvc.view.suffix=.jsp
```

- 스프링 부트는 위의 속성을 사용하여 `InternalResourceViewResolver`라는 뷰 리졸버를 자동으로 등록한다
  - *권장하지는 않지만 `/WEB-INF/views/new-form.jsp`라는 풀 경로를 주어도 동작은 한다*
- **스프링 부트가 자동으로 등록하는 뷰 리졸버**
  - *(실제로는 더 많지만, 중요한 부분 위주로 설명하기 위해 일부 생략)*

```
1 = BeanNameViewResolver : 빈 이름으로 뷰를 찾아서 반환한다. (예: 엑셀 파일 생성 기능에 사용)
2 = InternalResourceViewResolver : JSP를 처리할 수 있는 뷰를 반환한다.
```

1. 핸들러 어댑터 호출
   - 핸들러 어댑터를 통해 `new-form` 이라는 **논리 뷰 이름을 획득**한다.
2. `ViewResolver` 호출
   - `new-form` 이라는 뷰 이름으로 `viewResolver`를 순서대로 호출한다.
   - **`BeanNameViewResolver` 는 `new-form` 이라는 이름의 스프링 빈으로 등록된 뷰를 찾아야 하는데 없으니**
   - **`InternalResourceViewResolver` 가 호출된다.**
3. `InternalResourceViewResolver`
   - 이 뷰 리졸버는 `InternalResourceView` 를 반환한다.  
4. 뷰 - `InternalResourceView`
   - `InternalResourceView` 는 JSP처럼 포워드 `forward()` 를 호출해서 처리할 수 있는 경우에 사용한다. 
5. `view.render()`
   - `view.render()` 가 호출되고 `InternalResourceView` 는 `forward()` 를 사용해서 JSP를 실행한다.

> 참고 ✋
> - `InternalResourceViewResolver` 는 만약 **JSTL 라이브러리가 있으면 InternalResourceView 를 상속받은 JstlView 를 반환**한다. 
> - `JstlView` 는 JSTL 태그 사용시 약간의 부가 기능이 추가된다.
> - 다른 뷰는 실제 뷰를 렌더링하지만, *JSP의 경우 forward() 통해서 해당 JSP로 이동(실행)해야 렌더링이 된다.*
> - **JSP를 제외한 나머지 뷰 템플릿들은 forward() 과정 없이 바로 렌더링 된다.**
> - `Thymeleaf` 뷰 템플릿을 사용하면 `ThymeleafViewResolver` 를 등록해야 한다.
> - *최근에는 라이브러리만 추가하면 스프링 부트가 이런 작업도 모두 자동화해준다.*

## [스프링 MVC 시작하기 - `@Controller` , `@RequestMapping`](https://github.com/jdalma/SpringMVC-1/pull/5/commits/6e1bd06224f3c33080712b415ce54460e73b784b)

### `@Controller`
- 내부에 `@Component` Annotation이 있어서 컴포넌트의 스캔의 대상이 되어 빈으로 등록된다
- **스프링 MVC에서 Annotation기반 컨트롤러로 인식한다**
  - *`RequestMappingHandlerMapping`에서 찾아간다*
  - 📌 **스프링 빈 중에서 `@RequestMapping` 또는 `@Controller`가 클래스 레벨에 붙어 있는 경우에 매핑 정보로 인식한다**


```java
public class RequestMappingHandlerMapping extends RequestMappingInfoHandlerMapping 
                                          implements MatchableHandlerMapping, EmbeddedValueResolverAware {

  ...

	/**
	 * {@inheritDoc}
	 * <p>Expects a handler to have either a type-level @{@link Controller}
	 * annotation or a type-level @{@link RequestMapping} annotation.
	 */
	@Override
	protected boolean isHandler(Class<?> beanType) {
		return (AnnotatedElementUtils.hasAnnotation(beanType, Controller.class) ||
				AnnotatedElementUtils.hasAnnotation(beanType, RequestMapping.class));
	}

  ...

}
```