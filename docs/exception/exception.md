---
layout: default
title: 예외 정리
nav_order: 69
has_children: true
permalink: /docs/exception
---


# **java.lang.IllegalArgumentException:**
- 요청 타겟에서 유효하지 않은 문자가 발견되었습니다.
- 유효한 문자들은 RFC 7230과 RFC 3986에 정의되어 있습니다. 
- **Server.xml**

```xml
<Connector connectionTimeout="20000" port="8080" protocol="HTTP/1.1" redirectPort="8443" relaxedQueryChars="[]()^|&quot;"/>
```
- `relaxedQueryChars="[]()^|&quot;"` 추가
