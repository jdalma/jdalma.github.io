---
layout: default
title: RestTemplate
nav_order: 20
parent: 👨‍🔬 Lab
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## `RestTemplate` POST 방식 - 파라미터가 담기지 않는 문제
- `request`를 확인하면 파라미터가 담겨 있지만 , 수신 측에서는 비어있음

```java
public static JSONObject sendPOST(String url , EgovMapForNull paramMap) throws Exception {

    ObjectMapper objectMapper = new ObjectMapper();

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    String queryString = objectMapper.writeValueAsString(paramMap);
    HttpEntity<String> request = new HttpEntity<String>(queryString , headers);
    return JSONObject.fromObject(restTemplate.postForObject(url, request, String.class));
}

public static EgovMapForNull sendPOST(String url , EgovMapForNull paramMap) throws Exception {
    LinkedMultiValueMap<String, String> request = egovMapConvertToMultiValueMap(paramMap);
    EgovMapForNull response = restTemplate.postForObject(url , request , EgovMapForNull.class);
    return response;
}
```

> - ✋
> - **HTTP Request로 넘어온 값들 중 일부는**
> - `getParameter()`나 `getParameterValues()`로 읽을 수 없는 경우가 있다. 
> - 이를 `RequestBody Post Data`라고 하며 이러한 값은 
> - `Request.getInputStream()` 혹은 `Request.getReader()`를 통해 직접 읽어와야 한다고 한다.


```java

    StringBuilder stringBuilder = new StringBuilder();
    BufferedReader bufferedReader = null;
    InputStream inputStream = request.getInputStream();
    if (inputStream != null) {
        bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
        char[] charBuffer = new char[128];
        int bytesRead = -1;
        while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
            stringBuilder.append(charBuffer, 0, bytesRead);
        }
    }

```

- 위의 방법은 제대로 나오지만 , 아래의 방법으로는 데이터를 가져올 수 없다.

```java
    Enumeration enums = request.getParameterNames();
    
    System.out.println("\n\n--------parameter info---------");
    System.out.println(String.format("%s:::[%s]", "url", request.getContextPath()+""+request.getServletPath()));
    
    while (enums.hasMoreElements()) {
    
        String paramName = (String) enums.nextElement();
        String[] parameters = request.getParameterValues(paramName);
        
        if (!paramName.equals("regId") && !paramName.equals("uptId")) {
            if (parameters.length > 1) {
                params.put(paramName, parameters);
                System.out.println(String.format("%s:::[%s]", paramName, parameters));
            } else {
                params.put(paramName, parameters[0]);
                System.out.println(String.format("%s:::[%s]", paramName, parameters[0]));
            }
        }
    }
```


- **Receive 측 응답 코드**

```
 Could not extract response: no suitable HttpMessageConverter found for response type [EgovMapForNull] and content type [application/octet-stream]
```

- [no-suitable-httpmessageconverter-found-for-response-type](https://stackoverflow.com/questions/21854369/no-suitable-httpmessageconverter-found-for-response-type)
- [MIME 타입](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types)

> - ✋ application/octet-stream이 뭔데?
> - MIME의 개별 타입 중 application에 속하는 타입 , 8비트 단위의 binary data라는 뜻
> - 이 타입은 이진 파일을 위한 기본값입니다. 
> - 이 타입은 실제로 잘 알려지지 않은 이진 파일을 의미하므로, 브라우저는 보통 자동으로 실행하지 않거나 실행해야 할지 묻기도 합니다. 
> - Content-Disposition 헤더가 값 attachment 와 함께 설정되었고 'Save As' 파일을 제안하는지 여부에 따라 브라우저가 그것을 다루게 됩니다.

- 수정 코드

```java
public static EgovMapForNull sendPOST(String url , EgovMapForNull paramMap) {
    try {
        EgovMapForNull result = new EgovMapForNull();
        LinkedMultiValueMap<String, String> request = egovMapConvertToMultiValueMap(paramMap);
        ResponseEntity<String> response = restTemplate.postForEntity(url , request, String.class);
        // header
        // {
        // 	Access-Control-Allow-Origin=[http://localhost:8080],
        // 	Access-Control-Allow-Methods=[POST, PUT, GET, OPTIONS, DELETE],
        // 	Access-Control-Max-Age=[3600],
        // 	Access-Control-Request-Headers=[authorization, content-type],
        // 	Access-Control-Allow-Headers=[X-Requested-With, Origin, Content-Type, Accept, x-device-user-agent, Content-Type],
        // 	Content-Length=[4],
        // 	Date=[Tue, 22 Feb 2022 04:32:45 GMT],
        // 	Keep-Alive=[timeout=20],
        // 	Connection=[keep-alive]}
        // }
        //  body - test
        //  statusCode - 200
        return result;
    }
    catch(Exception e) {
        throw e;
    }
}
```

- **response**를 원하는 `Map` 객체 자체로 받을려고 해서 그런지... `ResponseEntity`로 감싸주니 정상으로 받았다.

## **그래서 이런 현상이 왜 발생했을까?** ❓
1. `Could not extract response: no suitable HttpMessageConverter found for response type [EgovMapForNull] and content type [application/octet-stream]`
    - 송신 측과 수신 측에 `Content-Type`을 따로 지정해주지 않았기 때문에 일단 기본 타입은 `application/octet-stream`이 맞다.
    - **수신 측에서 `Response`에 특정 상황에만 문자열을 담아주는 상황이였기 때문에 해당 문자열이 담기면 수신 측에 나는 에러였다.**
    - 해당 문제는 `ResponseEntity<String>`으로 받으니 해결되었다.
    - `EgovMapForNull`로는 `Response`를 매핑할 수 없어서 나는 문제인 것 같다..

## **왜 `getParameter()`나 `getParameterValues()`로 읽을 수 없는 경우가 생겼을까** ❓ 
- 해당 문제는 파라미터를 `String`으로 보냈었지만 `LinkedMultiValueMap`으로 변환하여 보내니 `getParameter()`나 `getParameterValues()`로 읽을 수 있었다.

## **그럼 어떨 때 `getParameter()`나 `getParameterValues()`로 읽을 수 없을까** ❓
- `RequestBody Post Data`
- [Request Body로 보내지는 JSON의 행방 불명](https://github.com/HomoEfficio/dev-tips/blob/master/Request%20Body로%20보내지는%20JSON의%20행방%20불명.md)

## `Payload`란 ❓
- **전송되는 데이터**를 말한다.
  - **데이터 자체를 의미**

> - [출처](https://hanamon.kr/네트워크-http-페이로드-payload란/)
> - 메시지 프로토콜(message protocols) 중에 프로토콜 오버헤드(protocol overhead)와 원하는 데이터(data)를 구별할 때 사용된다.
> - 예를 들어 웹 서비스 응답(Web Service Response)이 아래의 JSON 데이터 이라면 페이로드는 아래의 JSON에서 “data”이다.
> - 그 이외의 데이터들은 전부 통신을 하는데 있어 용이하게 해주는 부차적인 정보인 프로토콜 오버헤드(Protocol Overhead)이다.
> - 코드로 표현을 한다면 아래와 같다. (여기에서 “data”에 해당하는 부분이 페이로드이다. 그 외는 모두 프로토콜 오버헤드이다.)

```
{
  "status" : "OK"
  "from": "localhost",
  "to": "https://hanamon.kr/users/1",
  "method": "GET",
  "data":{ "username" : "하나몬" }
}
```

## `Response`를 꼭 `ResponseEntity`로 감싸서 받아야하나 ❓ 


## ➕ `Handle Error`

```java
@Component
public class RestTemplateResponseErrorHandler implements ResponseErrorHandler{

    @Override
    public boolean hasError(ClientHttpResponse response) throws IOException {
        return (response.getStatusCode().series() == Series.CLIENT_ERROR ||
                response.getStatusCode().series() == Series.SERVER_ERROR);
    }

    @Override
    public void handleError(ClientHttpResponse response) throws IOException {
        if(response.getStatusCode().series() == HttpStatus.Series.SERVER_ERROR) {
            // handle SERVER_ERROR
        }
        else if(response.getStatusCode().series() == HttpStatus.Series.CLIENT_ERROR) {
            // handle CLIENT_ERROR
            if(response.getStatusCode() == HttpStatus.NOT_FOUND)
                throw new NotFoundException();
        }
    }
}
```