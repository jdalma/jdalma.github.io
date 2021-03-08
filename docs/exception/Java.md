---
layout: default
title: Java
nav_order: 1
parent: 예외 정리
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# **JSON 파싱**

```java
JSONArray slaveGridList = (JSONArray) parser.parse(entity.getSlaveGrid());

for(int i = 0 ; i < slaveGridList.size() ; i++) {
    JSONObject row = (JSONObject) slaveGridList.get(i);
    Mbsreq002Basis basisEntity = new Mbsreq002Basis(row);
    basisEntity.setRegId(entity.getRegId());
    
    // 저장 로직
}
```
- 그리드 2개의 정보를 한 번의 Request로 처리한다.
    - SlaveGrid정보 저장 중 예외 발생 시 Rallback 위함
- VIEW에서 JSON형태의 데이터를 받는다.
    -  MasterForm
        - ...
        - SlaveGridList


1. MasterForm의 데이터를 `entity` 생성
2. `entity`안에 든 `slaveGridList`(JSON문자열) 데이터를 꺼낸다.
3. JSONArray ➜ JSONObject 캐스팅 예외

**java.lang.ClassCastException: org.json.simple.JSONObject cannot be cast to net.sf.json.JSONObject**

## **해결**
- JSON import문제
- import org.json.simple.JSON ➜ import net.sf.json.JSON
