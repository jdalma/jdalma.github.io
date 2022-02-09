---
layout: default
title: Spring
nav_order: 3
parent: 예외 정리
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---


```java
@Component("RestTemplateMng")
public class RestTemplateMng {

	private static RestTemplate restTemplate;
	
	@Autowired
	public RestTemplateMng(RestTemplate restTemplate) {
		RestTemplateMng.restTemplate = restTemplate;
	}
	
	public static void sendPost() throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		
		EgovMapForNull query = new EgovMapForNull();
		query.put("empno", "000000");
		String queryString = objectMapper.writeValueAsString(query);
		HttpEntity<String> request = new HttpEntity<String>(queryString , headers);
		
		System.out.println(restTemplate.postForObject("http://localhost:8080/xerp/comelctsct/callXerp", request, String.class));

		query.put("empno", "123456");
		queryString = objectMapper.writeValueAsString(query);
		
		System.out.println(restTemplate.postForObject("http://localhost:8080/xerp/comelctsct/callXerp", request, String.class));
		
	}
	
}

```


```
Error creating bean with name 'Sgnfrm002Service': Injection of resource dependencies failed; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'RestTemplateMng' defined in file [C:\xerp_2022\eclipse-workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp1\wtpwebapps\xerp\WEB-INF\classes\kr\co\dbvision\lib\RestTemplateMng.class]: Unsatisfied dependency expressed through constructor parameter 0; nested exception is org.springframework.beans.factory.NoSuchBeanDefinitionException: No qualifying bean of type 'org.springframework.web.client.RestTemplate' available: expected at least 1 bean which qualifies as autowire candidate. Dependency annotations: {}
```