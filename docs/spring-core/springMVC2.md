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

## [Version 2. **BindingResult**](https://github.com/jdalma/spring-validation/pull/1/commits/6fe09180d3f3c0ec9b450abddc2f74c450659b60) , [사용자 입력 값 유지](https://github.com/jdalma/spring-validation/pull/1/commits/1362e6094d9672de4531be2c22c1a7d776d19d53)

```java
  public interface BindingResult extends Errors
```

**스프링이 제공하는 검증 오류를 보관하는 객체이며 , `Model`에 자동 포함 된다**<br>
검증 오류가 발생하면 여기에 보관하면 된다<br>
`BindingResult` 가 있으면 **@ModelAttribute 에 데이터 바인딩 시 오류가 발생해도 컨트롤러가 호출된다!**<br>
- `BindingResult` 는 검증할 대상 바로 다음에 와야한다 
- `@ModelAttribute Item item` , 바로 다음에 `BindingResult` 가 와야 한다
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

- **타임리프의 사용자 입력 값 유지**
  - `th:field="*{price}"`
  - 정상 상황에는 모델 객체의 값을 사용하지만, 오류가 발생하면 `FieldError` 에서 보관한 값을 사용해서 값을 출력한다
- **스프링의 바인딩 오류 처리**
  - 타입 오류로 바인딩에 실패하면 스프링은 `FieldError` 를 생성하면서 사용자가 입력한 값을 넣어둔다 
  - 그리고 **해당 오류를 BindingResult 에 담아서 컨트롤러를 호출한다** 
  - 따라서 타입 오류 같은 바인딩 실패시에도 사용자의 오류 메시지를 정상 출력할 수 있다

- `new FieldError( {objectName} , {field} , {defaultMessage} )`
  - **FieldError** 는 오류 발생시 사용자 입력 값을 저장하는 기능을 제공한다
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

## [Version 3. `FieldError()` , `ObjectError()`, error.properties 추가](https://github.com/jdalma/spring-validation/pull/1/commits/95f74ed200ae2a0b313f980f780980cc59d1d5ef)

```java
public FieldError(String objectName, String field, String defaultMessage);
public FieldError(String objectName, String field, @Nullable Object rejectedValue, boolean bindingFailure, @Nullable String[] codes, @Nullable Object[] arguments, @Nullable String defaultMessage)
```

- **objectName** : 오류가 발생한 객체 이름
- **field** : 오류 필드
- **rejectedValue** : 사용자가 입력한 값(거절된 값)
- **bindingFailure** : 타입 오류 같은 바인딩 실패인지, 검증 실패인지 구분 값 
- **codes** : 메시지 코드
  -  `required.item.itemName` 를 사용해서 메시지 코드를 지정한다 
  -  메시지 코드는 하나가 아니라 배열로 여러 값을 전달할 수 있는데, 순서대로 매칭해서 처음 매칭되는 메시지가 사용된다.
- **arguments** : 메시지에서 사용하는 인자
  - `Object[]{1000, 1000000}` 를 사용해서 코드의 {0} , {1} 로 치환할 값을 전달한다.
- **defaultMessage** : 기본 오류 메시지

<br>

**FieldError** , **ObjectError** 의 생성자는 `errorCode` , `arguments` 를 제공한다<br>
이것은 오류 발생시 오류 코드로 메시지를 찾기 위해 사용된다.

## [Version 4. `rejectValue()` , `reject()`](https://github.com/jdalma/spring-validation/pull/1/commits/b143213a6b571be979425bd3335b47b4d58f00a9)
- `FieldError` , `ObjectError`는 작성하기 너무 번거롭다
- 컨트롤러에서 **BindingResult 는 검증해야 할 객체인 target 바로 다음에 온다.**
  - 따라서 BindingResult 는 이미 본인이 검증해야 할 객체인 target 을 알고 있다.

```java
  log.info("object name = {}" , bindingResult.getObjectName());
  log.info("target name = {}" , bindingResult.getTarget());
  
  // object name = item
  // target name = Item(id=null, itemName=1, price=10000, quantity=2)
```

- `rejectValue()` , `reject()`

```java
void rejectValue(@Nullable String field, String errorCode, @Nullable Object[] errorArgs, @Nullable String defaultMessage);

void reject(String errorCode, @Nullable Object[] errorArgs, @Nullable String defaultMessage);
```

- **field** : 오류 필드명
- **errorCode** : 오류 코드(이 오류 코드는 메시지에 등록된 코드가 아니다. 뒤에서 설명할 messageResolver를 위한 오류 코드이다.)
- **errorArgs** : 오류 메시지에서 {0} 을 치환하기 위한 값 
- **defaultMessage** : 오류 메시지를 찾을 수 없을 때 사용하는 기본 메시지

```java
// 간단한 검증은 rejectIfEmptyOrWhitespace도 가능하다
ValidationUtils.rejectIfEmptyOrWhitespace(bindingResult , "itemName" , "required");

bindingResult.rejectValue("price", "range", new Object[]{1000, 1000000}, null)

bindingResult.reject("totalPriceMin" , new Object[]{10000 , resultPrice} , null);
```

## [Version 4-1. `rejectValue()` , `reject()` → **MessageCodesResolver**](https://github.com/jdalma/spring-validation/pull/1/commits/a5ae6baf55dba90aaebe1b7fd37f3126d3ae07a8)
- 메세지를 범용적으로 사용하다가, 세밀하게 작성해야 하는 경우에는 세밀한 내용이 적용되도록 메시지에 단계를 두는 방법이 좋다

```
#Level1
required.item.itemName: 상품 이름은 필수 입니다. 

#Level2
required: 필수 값 입니다.
```

- **세밀한 메세지가 우선순위가 높으며 이런 우선순위에 따라 메세지를 반환하는 기능을 지원한다**
- **MessageCodesResolver** 인터페이스이고 `DefaultMessageCodesResolver` 는 기본 구현체이다

<br>

- `DefaultMessageCodesResolver`의 기본 메세지 생성 규칙
- **객체 오류**

```
객체 오류의 경우 다음 순서로 2가지 생성 
1.: code + "." + object name 
2.: code

예) 오류 코드: required, object name: item 

1.: required.item
2.: required
```

```
필드 오류의 경우 다음 순서로4가지 메시지 코드 생성
1.: code + "." + object name + "." + field
2.: code + "." + field
3.: code + "." + field type
4.: code

예) 오류 코드: typeMismatch, object name "user", field "age", field type: int 

1. "typeMismatch.user.age"
2. "typeMismatch.age"
3. "typeMismatch.int"
4. "typeMismatch"
```

- `rejectValue()` , `reject()` 는 내부에서 **MessageCodesResolver** 를 사용한다
- 여기에서 메시지 코드들을 생성한다
- `FieldError` , `ObjectError` 의 생성자를 보면, **오류 코드를 하나가 아니라 여러 오류 코드를 가질 수 있다**
- **MessageCodesResolver** 를 통해서 생성된 순서대로 오류 코드를 보관한다
- 이 부분을 BindingResult 의 로그를 통해서 확인해보자.
  - `codes [range.item.price, range.price, range.java.lang.Integer, range]`

<br>

✋ **오류 메시지 출력**<br>
타임리프 화면을 렌더링 할 때 `th:errors` 가 실행된다<br>
만약 이때 오류가 있다면 생성된 오류 메시지 코드를 순서대로 돌아가면서 메시지를 찾는다<br>
그리고 없으면 디폴트 메시지를 출력한다

<br>

<div class="code-example" markdown="1">
## errors.properties
</div>

```
#==ObjectError==
#Level1
totalPriceMin.item=상품의 가격 * 수량의 합은 {0}원 이상이어야 합니다. 현재 값 = {1}

#Level2 - 생략
totalPriceMin=전체 가격은 {0}원 이상이어야 합니다. 현재 값 = {1}
range.price=가격은 {0} ~ {1} 까지 허용됩니다. (레벨2)

#==FieldError==
#Level1
required.item.itemName=상품 이름은 필수입니다.
range.item.price=가격은 {0} ~ {1} 까지 허용합니다.
max.item.quantity=수량은 최대 {0} 까지 허용합니다.

#Level2 - 생략

#Level3
required.java.lang.String = 필수 문자입니다.
required.java.lang.Integer = 필수 숫자입니다.
min.java.lang.String = {0} 이상의 문자를 입력해주세요.
min.java.lang.Integer = {0} 이상의 숫자를 입력해주세요.
range.java.lang.String = {0} ~ {1} 까지의 문자를 입력해주세요.
range.java.lang.Integer = {0} ~ {1} 까지의 숫자를 입력해주세요.
max.java.lang.String = {0} 까지의 문자를 허용합니다.
max.java.lang.Integer = {0} 까지의 숫자를 허용합니다.

#Level4
required = 필수 값 입니다.
min= {0} 이상이어야 합니다.
range= {0} ~ {1} 범위를 허용합니다. max= {0} 까지 허용합니다.
```

## [Version 5. 스프링이 직접 만든 오류 메세지 처리](https://github.com/jdalma/spring-validation/pull/1/commits/e8379c43ef39db024243eb1e6809e7ef3eed932c)
- 스프링은 타입 오류가 발생하면 `typeMismatch` 라는 오류 코드를 사용한다. 
- 이 오류 코드가 **MessageCodesResolver** 를 통하면서 **4가지 메시지 코드**가 생성된 것이다.

1. typeMismatch.item.price 
2. typeMismatch.price 
3. typeMismatch.java.lang.Integer 
4. typeMismatch

<br>

- 숫자 자료 필드에 문자열을 넣을 경우
- `errors.properties`에 메세지를 추가할 경우 코드 수정없이 메세지 적용이 가능하다

```
Field error in object 'item' on field 'price': rejected value [ㅁ]; codes [typeMismatch.item.price,typeMismatch.price,typeMismatch.java.lang.Integer,typeMismatch]; 
```

## [Version 6. **implements Validator**](https://github.com/jdalma/spring-validation/pull/1/commits/290b016aeba8be25fab82cdb9ca911951d4d6cd0)
- **복잡한 검증 로직을 별도로 분리**