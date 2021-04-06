---
layout: default
title: myBatis
nav_order: 2
parent: 예외 정리
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# **selectKey**

```xml
<selectKey resultType="String" keyProperty="basisSn" order="BEFORE">
    <if test="basisSn != null and basisSn != ''" >
        SELECT #{basisSn} AS basisSn
    </if>
    <if test="basisSn == null or basisSn == ''">
        SELECT ISNULL(MAX(BASIS_SN),0)+1 AS basisSn
            FROM MBS_BUGT_MAKEUP_REQST_BASIS
            WHERE
            MAKEUP_YY = #{makeupYy}
            AND ADD_MAKEUP_AT = #{addMakeupAt}
            AND BPLC_CODE = #{bplcCode}
            AND ODR = #{odr}
            AND DEPT_CODE = #{deptCode}
            AND SN = #{sn}
            AND BUGT_CODE = #{bugtCode}
            AND BUGT_BSNS_CODE = #{bugtBsnsCode}
    </if>
</selectKey>

<update id="mergeUpdate" parameterType="TestBean">
    ...
</update>
```

- `mergeUpdate` 실행 전 `<selectKey>` 쿼리가 실행 되어 `TestBean`의 `basisSn`파라미터를 채워준다.

***

# **PreparedStatement.setNull(1, 1111) - java.sql.SQLException: 부적합한 열 유형: 1111**

**에러 내역**
{: .fh-default .fs-5 }
```
2021-03-29 18:19:57,394 ERROR [jdbc.sqltiming] 30. PreparedStatement.setNull(1, 1111)
java.sql.SQLException: 부적합한 열 유형: 1111
	at oracle.jdbc.driver.OracleStatement.getInternalType(OracleStatement.java:3900) ~[ojdbc-6.jar:11.2.0.1.0]
	at oracle.jdbc.driver.OraclePreparedStatement.setNullCritical(OraclePreparedStatement.java:4406) ~[ojdbc-6.jar:11.2.0.1.0]
	at oracle.jdbc.driver.OraclePreparedStatement.setNull(OraclePreparedStatement.java:4388) ~[ojdbc-6.jar:11.2.0.1.0]

    ...

2021-03-29 18:19:57,396 ERROR [org.exmaple.ServiceImpl] nested exception is org.apache.ibatis.type.TypeException:
Could not set parameters for mapping:
ParameterMapping{property='key', mode=IN, javaType=class java.lang.String, jdbcType=null, numericScale=null, resultMapId='null', jdbcTypeName='null', expression='null'}.
Cause: org.apache.ibatis.type.TypeException: Error setting null for parameter #1 with JdbcType OTHER .
Try setting a different JdbcType for this parameter or a different jdbcTypeForNull configuration property.

    ...

```

## **원인**

**자바 서비스 로직**
{: .fh-default .fs-5 }
```java
@Override
public synchronized String execSpGetNewReturn(EgovMapForNull paramMap) {
    try {
        ...
        String returnData = mapper.execSpGetNewReturn(paramMap);

        return returnData;
    } catch (Exception e) {
        throw e;
    }
}
```

## **해결**

**자바 서비스 로직**
{: .fh-default .fs-5 }
```java
@Override
public synchronized String execSpGetNewReturn(EgovMapForNull paramMap) {
    try {

        ...
        mapper.execSpGetNewReturn(paramMap);
        String returnData = (String) paramMap.get("returnData");

        return strMaxNumberingSn;
    } catch (Exception e) {
        throw e;
    }
}
```

**프로시저 호출**
{: .fh-default .fs-5 }
```
<select id="execSpGetNewReturn" parameterType="egovMapForNull" resultType="String" statementType="CALLABLE">
    <![CDATA[
           {CALL SP_GET_NUMBERING_SN(
                    #{param1,mode=IN,jdbcType=VARCHAR}
                    , #{param2,mode=IN,jdbcType=VARCHAR}
                    , #{param3,mode=IN,jdbcType=VARCHAR}
                    , #{returnData,mode=OUT,jdbcType=VARCHAR})}
    ]]>
</select>
```

**결과**
{: .fh-default .fs-5 }
```
{param1=data1, param2=data2, param3=data3, returnData=}
2021-03-30 11:16:58,915  INFO [jdbc.sqltiming] {CALL SP_GET_NEW_RETURN(
                'data1',
                'data2',
                'data3',
                '<OUT>')}
 {executed in 11 msec}
{param1=data1, param2=data2, param3=data3, returnData=newReturnData}
```

**📌 정리**
{: .fh-default .fs-4 }
- 자바 서비스 로직에서 mapper호출 부분의 반환 값은 `resultType="String"`으로 반환되지 않으며 `mapper.execSpGetNewReturn(paramMap)`의 `paramMap` 객체의 `returnData`키에 반환 값이 삽입된다.
- <span style="color:red; font-weight:bold">이 예외는 프로시저 호출 매핑 문제가 아닌 프로시저 호출이 끝난 후 `returnData`를 사용하는 뒤 로직에서 `null`이 들어와 에러가 났다. (`String returnData = mapper.execSpGetNewReturn(paramMap);` 이처럼 `String`을 바로 반환 받으려고 하였기 때문이다.)</span>
- <span style="color:red; font-weight:bold">예외를 자세히 읽지 않아 시간을 많이 소모하였다. 예외를 자세히 읽자!!!!!!</span>

> ✋ SET 시스템 변수(SET System Variable)적용하기, **DBMSOUTPUTPUTLINE**
> - 최상단에 미리 선언
> - `SET SERVEROUTPUT ON`
> - [출처](https://withthisclue.tistory.com/entry/Oracle-오라클-PLSQL-로그-사용하기-DBMSOUTPUTPUTLINE)
