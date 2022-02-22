---
layout: default
title: 읽어보기
nav_order: 81
permalink: /docs/only-read
has_children: true
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

# `Test`
- `Enumeration` , `Iterator` **Fail-Fast**
- `RestTemplate` POST 방식 - 파라미터가 담기지 않는 문제
    - `request`를 확인하면 파라미터가 담겨 있지만 , 받는 측에서는 비어있음

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
		System.out.println("sendPOST-----------------------------------");
		HttpEntity<EgovMapForNull> request = new HttpEntity<>(paramMap);
		System.out.println(request);
		EgovMapForNull response = 
				restTemplate.postForObject(url , request , EgovMapForNull.class);
		System.out.println(url);
		System.out.println(response);
		return response;
	}    
```

- 위의 경우는 
> - ✋
> - **HTTP Request로 넘어온 값들 중 일부는**
> - `getParameter()`나 `getParameterValues()`로 읽을 수 없는 경우가 있다. 
> - **POST 메서드를 사용하면서 CONTENT-TYPE이 "application/json" 형식일 때 발생**하는데, 
> - 이를 `RequestBody post data`라고 하며 이러한 값은 
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


```java
	public static LinkedMultiValueMap<String, String> egovMapConvertToMultiValueMap(EgovMapForNull map){
		LinkedMultiValueMap<String, String> result = new LinkedMultiValueMap<String, String>();
		Set<String> keys = map.keySet();
		for (String key : keys) {
			result.add(key, (String) map.get(key));
		}
		return result;
	}	
	
	public static EgovMapForNull sendPOST(String url , EgovMapForNull paramMap) throws Exception {
		System.out.println("1. sendPOST-----------------------------------");
//		HttpEntity<EgovMapForNull> request = new HttpEntity<>(paramMap);
		LinkedMultiValueMap<String, String> request = egovMapConvertToMultiValueMap(paramMap);
		System.out.println(request);
		EgovMapForNull response = 
				restTemplate.postForObject(url , request , EgovMapForNull.class);
		System.out.println(url);
		System.out.println(response);
		return response;
	}
```

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

```java

    // 1.
    response.getWriter().print(callStr);

    Could not extract response: no suitable HttpMessageConverter found for response type [EgovMapForNull] and content type [application/octet-stream]


    // 2.
    response.setContentType("text/plain");
    response.setCharacterEncoding("utf-8");
    response.getWriter().print(callStr);

    Could not extract response: no suitable HttpMessageConverter found for response type [EgovMapForNull] and content type [text/plain;charset=utf-8]
```

- [no-suitable-httpmessageconverter-found-for-response-type](https://stackoverflow.com/questions/21854369/no-suitable-httpmessageconverter-found-for-response-type)
- [MIME 타입](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/MIME_types)

```
application/octet-stream이 뭔데?
결국 MIME의 개별 타입 중 application에 속하는 타입 , 8비트 단위의 binary data라는 뜻
이 타입은 이진 파일을 위한 기본값입니다. 
이 타입은 실제로 잘 알려지지 않은 이진 파일을 의미하므로, 브라우저는 보통 자동으로 실행하지 않거나 실행해야 할지 묻기도 합니다. 
Content-Disposition 헤더가 값 attachment 와 함게 설정되었고 'Save As' 파일을 제안하는지 여부에 따라 브라우저가 그것을 다루게 됩니다.
```

- `Handle Error`

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

# `2022-02-21`

## **[ResponseEntity란 무엇인가?](https://a1010100z.tistory.com/106)**
    - `@ControllerAdvice`
    - `ExceptionHandler`
## **[RestAPI 제대로 알고 사용하기](https://meetup.toast.com/posts/92)**

# `2022-02-19`

## **[Guide to hashCode() in Java](https://www.baeldung.com/java-hashcode)**


# `2022-02-17`

## **[[마틴 파울러] 리팩토링의 중요성 feat.테스트 코드를 짜는 이유](https://www.youtube.com/watch?v=mNPpfB8JSIU)**

# `2022-02-16`

## **[RequestContextHolder , Child Thread도 똑같은 RequestContextHolder 가져오기](https://gompangs.tistory.com/entry/Spring-RequestContextHolder)**

### [Spring RequestContextHolder - 어디서든 HttpServletReqeust 사용하기](http://dveamer.github.io/backend/SpringRequestContextHolder.html)

# `2022-02-11`

## **[@Transactional 사용 시 주의해야하는 8가지](https://flambeeyoga.tistory.com/entry/Transactional-%EC%82%AC%EC%9A%A9-%EC%8B%9C-%EC%A3%BC%EC%9D%98%EC%A0%90)**

# `2022-02-10`

## **[언제 static 함수 모음 Class를 만들어야 할까?](http://kwon37xi.egloos.com/4844149)**

# `2022-01-27`

## **[Curated List of Top 75 LeetCode Questions to Save Your Time](https://leetcode.com/list/xi4ci4ig/)**

# `2022-01-26`
## **[JWT (로그인 기능 구현 시)](https://white-board.tistory.com/199)**

## **[`Fail-Fast Iterator`](https://perfectacle.github.io/2021/08/14/fail-fast-iterator/)**

# `2022-01-25`

## **[알고리즘 시간복잡도 뽀개기](https://goodgid.github.io/Algorithm-Time-Complexity-Analysis/)**

## **[`Spring RequestContextHolder`](https://gompangs.tistory.com/entry/Spring-RequestContextHolder#%EA%B-%AC%EA%B-%--%EB%A-%--%EC%-D%--%--%EB%A-%B-%EC%-B%A-%ED%--%--%EC%A-%--%--%EB%A-%--%EC%-E%--)**

## **[`Immutable Object`(불변객체)](https://velog.io/@conatuseus/Java-Immutable-Object%EB%B6%88%EB%B3%80%EA%B0%9D%EC%B2%B4)**

## **[`OkHttp`로 `REST API` 호출하기](https://digitalbourgeois.tistory.com/59?category=678387)**

## **[스프링 `RestTemplate`](https://advenoh.tistory.com/46)**

## **[Spring WebSocket 소개](https://supawer0728.github.io/2018/03/30/spring-websocket/)**

## **트랜잭션 관련**
- [Java 에서 DataBase Replication Master/Slave (write/read) 분기 처리하기](http://kwon37xi.egloos.com/m/5364167)
- [(Spring)다중 DataSource 처리](https://supawer0728.github.io/2018/03/22/spring-multi-transaction/)
- [Spring Transaction에 대한 노트](https://narusas.github.io/2019/07/17/Spring-Transaction-Note.html#transaction_script_example)
- [선언적 트랜잭션 @Transactional](https://bamdule.tistory.com/51)

## **[뮤텍스(Mutex)와 세마포어(Semaphore)의 차이](https://worthpreading.tistory.com/90)**

## **[교차 출처 리소스 공유 (CORS)](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS)**

## **[LeetCode 문제 추천 블로그]((https://inner-game.tistory.com/11))**

## **[Java Code Conventions / 자바 코딩 규칙](http://kwangshin.pe.kr/blog/java-code-conventions-%EC%9E%90%EB%B0%94-%EC%BD%94%EB%94%A9-%EA%B7%9C%EC%B9%99/?ckattempt=1)**

## **[목적의식 있는 연습을 통한 효과적인 학습](https://techblog.woowahan.com/2626/)**

## 📢 **[The Top 433 Korean Open Source Projects on Github](https://awesomeopensource.com/projects/korean)**