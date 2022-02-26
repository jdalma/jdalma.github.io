---
layout: default
title: 👨‍🔬 Lab
nav_order: 4
has_children: true
permalink: /docs/lab
---


# `정리 해야할 것들`


## `Queue 생성 시`
- `Queue<int[]> queue = new LinkedList<>();`를 애용하지만
- 리트코트에 제시된 방법에서는 `Queue<Pair<Integer, Integer>> queue = new ArrayDeque();`를 사용한다
- 사실 **PS**하면서 `Queue`를 사용한다는 자체가 중간 인덱스에 삽입하거나 수정하지 않는 상황이 많으니 `LinkedList`를 꼭 사용할 필요는 없을 것 같다
- `ArrayDeque`를 확인해보자
- 배열을 `Deque` 방식으로 사용하는 것 같다. 시작점과 끝점의 인덱스를 기억해놓으면서 배열을 사용하는건지 확인해보자
- ➕ `Pair`클래스도 처음 보았다. 사용해보자

## [자바 공부를 어떻게 하길래, "언체크드 예외 발생시 트랜잭션 롤백?"](https://www.youtube.com/watch?v=_WkMhytqoCc)
- 스프링 예외 테스트 해보자

## `Enumeration` , `Iterator` **Fail-Fast**

## `RestTemplate` POST 방식 - 파라미터가 담기지 않는 문제
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
>   - CONTENT-TYPE을 지정해주지 않았다
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