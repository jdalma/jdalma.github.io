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
- 채번 또는 순번이 재사용 된다.
- 📌 **`mergeUpdate`가 여러 번 호출될 때는 채번 또는 순번이 재사용 되는 것을 고려해야한다.**
