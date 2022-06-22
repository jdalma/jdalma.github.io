---
layout: default
title: Spring MVC - 2
parent: 🌱 스프링
nav_order: 40
---

## Spring MVC - 1
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

# **메세지 → 국제화**
- **HTTP `accept-language`**헤더 값을 사용하거나 , **사용자가 직접 언어를 선택하도록 하고 쿠키를 사용**해서 처리할 수 있다 
- **상품명**이라는 이름을 **상품이름**으로 바꿔야한다면??
- 하드코딩된 이름들을 직접 다 수정해줘야한다
- 이런 **다양한 메세지를 한 곳에서 관리하도록 하는 기능을 메세지 기능이라 한다**
- `국제화`는 메세지에서 한 발 더 나아가 각 나라별로 메세지를 관리하는 것이다
- **스프링은 기본적으로 메세지와 국제화 기능을 제공한다**


## [스프링 메세지 소스 설정](https://github.com/jdalma/spring-message/pull/1/commits/1632e0b96d67d4970fdf638713cd312a0d0cea51)

```java
@Bean
public MessageSource messageSource() {
    ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
    messageSource.setBasenames("messages", "errors");
    messageSource.setDefaultEncoding("utf-8");
    return messageSource;
}
```

- **basenames** : 설정 파일의 이름을 지정한다
  - `messages` 로 지정하면 **messages.properties** 파일을 읽어서 사용한다
    - 추가로 국제화 기능을 적용하려면 **messages_en.properties** , **messages_ko.properties** 와 같이 파일명 마지막에 언어 정보를 주면된다
  - 만약 찾을 수 있는 국제화 파일이 없으면 **messages.properties (언어정보가 없는 파일명)**를 기본으로 사용한다
  - **파일의 위치**는 `/resources/messages.properties` 에 두면 된다
  - 여러 파일을 한번에 지정할 수 있다
  - 여기서는 messages , errors 둘을 지정했다. 
- **defaultEncoding** : 인코딩 정보를 지정한다 (`utf-8` 을 사용하면 된다)

<br>

- 스프링이 제공하는 *(interface)* `MessageSource`의 구현체인 `ResourceBundleMessageService`를 스프링 빈으로 등록하면 된다
  - *스프링 부트를 사용하면 자동으로 `MessageSource`를 빈으로 등록한다*
  - *스프링 부트의 기본 값 **application.properties** `spring.messages.basename=messages`*
- `MessageSource` 를 스프링 빈으로 등록하지 않고, 스프링 부트와 관련된 별도의 설정을 하지 않으면 **messages 라는 이름으로 기본 등록된다**
- 따라서 `messages_en.properties` , `messages_ko.properties` , `messages.properties` **파일만 등록하면 자동으로 인식된다**

```java
public interface MessageSource {
	@Nullable
	String getMessage(String code, @Nullable Object[] args, @Nullable String defaultMessage, Locale locale);

	String getMessage(String code, @Nullable Object[] args, Locale locale) throws NoSuchMessageException;

	String getMessage(MessageSourceResolvable resolvable, Locale locale) throws NoSuchMessageException;
}
```

```java
@SpringBootTest
public class MessageSourceTest {

    @Autowired
    MessageSource ms;

    @Test
    void 메세지(){
        // locale 정보가 없으니 `message.properties`를 참조한다
        String result = ms.getMessage("hello", null, null);
        Assertions.assertThat(result).isEqualTo("안녕");
    }

    @Test
    void 없는_메세지_예외(){
        // `message.properties`에 없는 메세지를 불러올 때 예외 테스트
        Assertions.assertThatThrownBy(() -> ms.getMessage("Exception Test" , null , null))
                    .isInstanceOf(NoSuchMessageException.class);
    }

    @Test
    void 기본_메세지(){
        String result = ms.getMessage("Exception Test" , null , "기본 메세지" , null);
        Assertions.assertThat(result).isEqualTo("기본 메세지");
    }

    @Test
    void 인자_메세지(){
        String message = ms.getMessage("hello.name", new Object[]{"Spring"}, null);
        Assertions.assertThat(message).isEqualTo("안녕 Spring");
    }

    @Test
    void 국제화_기본언어(){
        Assertions.assertThat(ms.getMessage("hello" , null , null)).isEqualTo("안녕");
        Assertions.assertThat(ms.getMessage("hello" , null , Locale.KOREA)).isEqualTo("안녕");
    }

    @Test
    void 국제화_영어(){
        Assertions.assertThat(ms.getMessage("hello" , null , Locale.ENGLISH)).isEqualTo("hello");
    }
}

```

## [타임리프로 스프링 메세지 적용](https://github.com/jdalma/spring-message/pull/1/commits/243710e69a462e73c556c557324c9e7a9acd5177)

- `#{label.item}`

```html
<h2 th:text="#{page.addItem}">상품 등록 폼</h2>
```

- 파라미터는 다음과 같이 사용할 수 있다

```html
hello.name=안녕 {0}
<p th:text="#{hello.name(${item.itemName})}"></p>
```

## [국제화 적용](https://github.com/jdalma/spring-message/pull/1/commits/c8052b4ff77a0c95fb933fecb13b6fb6346df242)
- `message_en.properties` 파일 추가
- 크롬 브라우저 ➔ 설정 ➔ 언어를 검색하고, 우선 순위를 변경하면 된다.
- **locale**정보를 알아야 선택할 수 있다 

### `LocaleResolver`

```java
public interface LocaleResolver {
    Locale resolveLocale(HttpServletRequest request);
    void setLocale(HttpServletRequest request, @Nullable HttpServletResponse response, @Nullable Locale locale);
}
```

- **LocaleResolver** `interface`
  - 스프링은 Locale 선택 방식을 변경할 수 있도록 LocaleResolver 라는 인터페이스를 제공하는데, 스프링 부트는 기본으로 `Accept-Language` 를 활용하는 **AcceptHeaderLocaleResolver** 를 사용한다
  - 만약 Locale 선택 방식을 변경하려면 LocaleResolver 의 구현체를 변경해서 **쿠키나 세션 기반의 Locale 선택 기능을 사용할 수 있다**
    - *예를 들어서 고객이 직접 Locale 을 선택하도록*
    - *관련해서 LocaleResolver 를 검색하면 수 많은 예제가 나오니 필요한 분들은 참고하자*

***

# **검증**

- **컨트롤러의 중요한 역할중 하나는 HTTP 요청이 정상인지 검증하는 것이다**

## [Version 1. 직접 검증을 구현](https://github.com/jdalma/spring-validation/pull/1/commits/b0bccd9a16fe7dfa280d9f99adf0105c4fa25791)

```java
// 검증 오류 결과를 보관
Map<String , String> errors = new HashMap<>();

// 검증 로직
if(!StringUtils.hasText(item.getItemName())){
    errors.put("itemName" , "상품 이름은 필수입니다.");
}
...

// 검증에 실패하면 다시 입력 폼으로
if(!errors.isEmpty()){
    log.info("errors = {}" , errors);
    model.addAttribute("errors" , errors);
    return "validation/v1/addForm";
}

// 성공 로직
...
```

- `${errors?.containsKey('key')}` , `${errors['key']}` , `th:class` 

```html
<form action="item.html" th:action th:object="${item}" method="post">
  <div th:if="${errors?.containsKey('globalError')}">
      <p class="field-error" th:text="${errors['globalError']}">전체 오류 메세지</p>
  </div>

  <div>
      <label for="itemName" th:text="#{label.item.itemName}">상품명</label>
      <input type="text"
              id="itemName"
              th:field="*{itemName}"
              class="form-control"
              th:class="${errors?.containsKey('itemName')} ? 'form-control field-error' : 'form-control'"
              placeholder="이름을 입력하세요">
      <div class="field-error" th:if="${errors?.containsKey('itemName')}" th:text="${errors['itemName']}">
          아이템 검증
      </div>
  </div>
  ...
```

- 직접 개발하면 아래와 같은 단점이 있다
  - **뷰 템플릿에서 중복 처리가 많다**
  - **타입 오류 처리가 안된다** 
    - `Item` 의 `price` , `quantity` 같은 숫자 필드는 **숫자 타입에 문자가 들어오면 오류가 발생한다** 
    - *그런데 이러한 오류는 스프링MVC에서 컨트롤러에 진입하기도 전에 예외가 발생하기 때문에, 컨트롤러가 호출되지도 않고,* 
    - *400 예외가 발생하면서 오류 페이지를 띄워준다*
  - 결국 문자는 바인딩이 불가능하므로 고객이 입력한 문자가 사라지게 되고, 고객은 본인이 어떤 내용을 입력해서 오류가 발생했는지 이해하기 어렵다

## [Version 2. **BindingResult**](https://github.com/jdalma/spring-validation/pull/1/commits/6fe09180d3f3c0ec9b450abddc2f74c450659b60)

```java
  public interface BindingResult extends Errors
```

**스프링이 제공하는 검증 오류를 보관하는 객체이며 , `Model`에 자동 포함 된다**<br>
검증 오류가 발생하면 여기에 보관하면 된다<br>
`BindingResult` 가 있으면 **@ModelAttribute 에 데이터 바인딩 시 오류가 발생해도 컨트롤러가 호출된다!**<br>
- `BindingResult` 는 검증할 대상 바로 다음에 와야한다 
- @ModelAttribute Item item , 바로 다음에 BindingResult 가 와야 한다
<br>

**@ModelAttribute에 바인딩 시 타입 오류가 발생하면?**<br>
  - BindingResult 가 없으면 400 오류가 발생하면서 컨트롤러가 호출되지 않고, 오류 페이지로 이동한다
  - BindingResult 가 있으면 오류 정보( FieldError )를 BindingResult 에 담아서 컨트롤러를 정상 호출한다

<br>

`BindingResult`에 검증 오류를 적용하는 **3가지 방법**<br>
  1. `@ModelAttribute` 의 객체에 타입 오류 등으로 **바인딩이 실패하는 경우 스프링이 FieldError 생성해서 BindingResult 에 넣어준다**
  2. 개발자가 직접 넣어준다
  3. `Validator`사용 🚩

<br>

- `new FieldError( {objectName} , {field} , {defaultMessage} )`
  - **objectName** : `@ModelAttribute` 이름
  - **field** : 오류가 발생한 필드 이름
  - **defaultMessage** : 오류 기본 메시지
- `new ObjectError( {objectName} , {defaultMessage} )`
  - 특정 필드를 넘어서는 오류
  - **objectName** : `@ModelAttribute` 의 이름
  - **defaultMessage** : 오류 기본 메시지

```java
@PostMapping("/add")
    public String addItemV1(@ModelAttribute Item item, BindingResult bindingResult , RedirectAttributes redirectAttributes , Model model) {

        // 검증 로직
        if(!StringUtils.hasText(item.getItemName())){
            bindingResult.addError(new FieldError("item" , "itemName" , "상품 이름은 필수입니다."));
        }

        // 특정 필드가 아닌 복합 룰 검증
        if(item.getPrice() != null && item.getQuantity() != null){
            int resultPrice = item.getPrice() * item.getQuantity();
            if(resultPrice < 10000){
                bindingResult.addError(new ObjectError("item" , "가격 * 수량의 합 에러 : " + resultPrice));
            }
        }

        // 검증에 실패하면 다시 입력 폼으로
        if(bindingResult.hasErrors()){
            log.info("bindingResult = {}" , bindingResult);
            return "validation/v2/addForm";
        }

        // 성공 로직
        ...
    }
```

```html
<div th:if="${#fields.hasGlobalErrors()}">
  <p class="field-error" th:each="err : ${#fields.globalErrors()}" th:text="${err}">글로벌 오류 메세지</p>
</div>
<input type="text"
      id="itemName"
      th:field="*{itemName}" 
      class="form-control"
      th:errorClass="field-error"
      placeholder="이름을 입력하세요">
<div class="field-error" th:errors="*{itemName}"> <!-- new FieldError로 추가한 필드 이름 -->
  아이템 검증
</div>
```

- `th:field`에 **필드 이름이 이미 지정되어 있다** 
  - **BindingResult에 자신의 필드가 있다면 `field-error`를 클래스에 추가한다**

- 타임리프는 스프링의 **BindingResult** 를 활용해서 편리하게 검증 오류를 표현하는 기능을 제공한다
  1. `#fields`로 **BindingResult 가 제공하는 검증 오류에 접근할 수 있다**
  2. `th:errors` 해당 필드에 오류가 있는 경우에 태그를 출력한다 (*th:if 편의 버전*)
  3. `th:errorclass`는 `th:field` 에서 **지정한 필드에 오류가 있으면 class 정보를 추가한다**

