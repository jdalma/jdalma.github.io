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


# **[Oracle] sqlrecoverableexception: 소켓에서 읽을 데이터가 없습니다**

- **CLOB타입 컬럼 MERGE 쿼리문 탈 떄 발생**
- Varchar, CLOB Type을 사용하는 컬럼이
- 1,000 여자일 경우에는 Merge도 무난하다.
- 하지만, 그 이상의 경우에는
- Check the statement (update failed).  ← merge를 통한 insert의 경우에도 update로 인식
- Cause: java.sql.SQLException: 소켓에서 읽을 데이터가 없습니다
- Insert / Update로 분리하면 해결
- [출처 - 행이네](https://lilymate.tistory.com/481)