---
layout: default
title: JSONObject에서 Reflection?
nav_order: 13
parent: 👨‍🔬 Lab
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

# **발단**

- `JavaSE-1.8` , `MySQL` , `MyBatis` 환경

```java
    TestEntity entity = new TestEntity(paramMap);
    List<EgovMapForNull> list = mapper.selectList(paramMap);
    entity.setRecords(list);
    return new JsonMsgMng().makeJsonObject(entity);
```

- `entity`를 `net.sf.json.JSONObject`에 담는 중에 에러가 났다
- 해당 `list`를 `net.sf.json.JSONObject`에 담으면 예외가 나지 않는다..

```
java.lang.reflect.InvocationTargetException
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:498)
	at org.apache.commons.beanutils.PropertyUtilsBean.invokeMethod(PropertyUtilsBean.java:2116)
	at org.apache.commons.beanutils.PropertyUtilsBean.getSimpleProperty(PropertyUtilsBean.java:1267)
	at org.apache.commons.beanutils.PropertyUtilsBean.getNestedProperty(PropertyUtilsBean.java:808)
	at org.apache.commons.beanutils.PropertyUtilsBean.getProperty(PropertyUtilsBean.java:884)
	at org.apache.commons.beanutils.PropertyUtils.getProperty(PropertyUtils.java:464)
	at net.sf.json.JSONObject._fromBean(JSONObject.java:928)
    at net.sf.json.JSONObject.fromObject(JSONObject.java:192)
	at net.sf.json.JSONObject._processValue(JSONObject.java:2774)
    ...

Caused by: java.lang.IllegalArgumentException
	at java.sql.Date.getHours(Date.java:187)
	... 105 more
```

# **조치**
- **SELECT**되는 정보중 컬럼의 타입을 `date` ➜ `datetime`으로 변경하니 해결

# **왜 이런 현상이??**
- [java.sql.Date.getHours](https://developpaper.com/java-lang-illegal-argumentexception-at-java-sql-date-gethours/)
- 아래의 *`deprecated`*된 `java.sql.Date.getHours(Date.java:187)` 메서드가 호출되었기 때문에 예외가 났다.

```
Caused by: java.lang.IllegalArgumentException
	at java.sql.Date.getHours(Date.java:187)
```

```java
   /**
    * This method is deprecated and should not be used because SQL Date
    * values do not have a time component.
    *
    * @deprecated
    * @exception java.lang.IllegalArgumentException if this method is invoked
    * @see #setHours
    */
    @Deprecated
    public int getHours() {
        throw new java.lang.IllegalArgumentException();
    }
```

## 왜 `getHours()`메서드가 호출될까?

- 일단 예외 `Stack`을 따라 가보았다.
- `SE1.8`의 `rt.jar`
- `json-lib-2.2.2-jdk15` 버전의 `net.sf.json.JSONObject`
- 일단 `net.sf.json.JSONObject._fromBean(JSONObject.java:928)`해당 라인 부터 보자


```java
private static JSONObject _fromBean(Object bean, JsonConfig jsonConfig){
    fireObjectStartEvent(jsonConfig);
    if (!addInstance(bean)) {
        try {
            return jsonConfig.getCycleDetectionStrategy().handleRepeatedReferenceAsObject(bean);
        }
        catch (JSONException jsone) {
            removeInstance(bean);
            fireErrorEvent(jsone, jsonConfig);
            throw jsone;
        } 
        catch (RuntimeException e) {
            removeInstance(bean);
            JSONException jsone = new JSONException(e);
            fireErrorEvent(jsone, jsonConfig);
            throw jsone;
        }
    }

    JsonBeanProcessor processor = jsonConfig.findJsonBeanProcessor(bean.getClass());
    if (processor != null) {
        JSONObject json = null;
        try {
            json = processor.processBean(bean, jsonConfig);
            if (json == null) {
                json = (JSONObject)jsonConfig.findDefaultValueProcessor(bean.getClass()).getDefaultValue(bean.getClass());

                if (json == null) {
                    json = new JSONObject(true);
                }
            }
            removeInstance(bean);
            fireObjectEndEvent(jsonConfig);
        } 
        catch (JSONException jsone) {
            removeInstance(bean);
            fireErrorEvent(jsone, jsonConfig);
            throw jsone;
        } catch (RuntimeException e) {
            removeInstance(bean);
            JSONException jsone = new JSONException(e);
            fireErrorEvent(jsone, jsonConfig);
            throw jsone;
        }
        return json;
    }

    Collection exclusions = jsonConfig.getMergedExcludes();
    JSONObject jsonObject = new JSONObject();
    try {
        PropertyDescriptor[] pds = PropertyUtils.getPropertyDescriptors(bean);
        PropertyFilter jsonPropertyFilter = jsonConfig.getJsonPropertyFilter();
        Class beanClass = bean.getClass();
        for (int i = 0; i < pds.length; i++) {
            String key = pds[i].getName();
            if (!exclusions.contains(key)){
                if ((!jsonConfig.isIgnoreTransientFields()) || (!isTransientField(key, beanClass))){
                    Class type = pds[i].getPropertyType();
                    if (pds[i].getReadMethod() != null) {
                        if (jsonConfig.isIgnoreJPATransient()) {
                            try {
                                Class transientClass = Class.forName("javax.persistence.Transient");
                                if (pds[i].getReadMethod().getAnnotation(transientClass) != null){
                                    continue;
                                }
                            }
                            catch (ClassNotFoundException cnfe) {
                            }
                        }
                        else {
                            Object value = PropertyUtils.getProperty(bean, key);
                            if ((jsonPropertyFilter == null) || (!jsonPropertyFilter.apply(bean, key, value))){
                                JsonValueProcessor jsonValueProcessor = jsonConfig.findJsonValueProcessor(beanClass, type, key);

                                if (jsonValueProcessor != null) {
                                    value = jsonValueProcessor.processObjectValue(key, value, jsonConfig);
                                    if (!JsonVerifier.isValidJsonValue(value)) {
                                        throw new JSONException("Value is not a valid JSON value. " + value);
                                    }
                                }
                                setValue(jsonObject, key, value, type, jsonConfig);
                            }
                        } 
                    } 
                    else { 
                        String warning = "Property '" + key + "' has no read method. SKIPPED";
                        fireWarnEvent(warning, jsonConfig);
                        log.warn(warning); 
                    }
                }
            }
        }
    } 
    catch (JSONException jsone) { 
        removeInstance(bean);
        fireErrorEvent(jsone, jsonConfig);
        throw jsone;
    } 
    catch (Exception e) {
        removeInstance(bean);
        JSONException jsone = new JSONException(e);
        fireErrorEvent(jsone, jsonConfig);
        throw jsone;
    }

    removeInstance(bean);
    fireObjectEndEvent(jsonConfig);
    return jsonObject;
}
```


```java
    public static void main(String[] args) throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
    	EgovMapForNull test = new EgovMapForNull();
    	Date date = new java.sql.Date(1234);
    	System.out.println(date);
    	test.put("a", 1);
    	test.put("b", date);
    	test.put("c", null);
    	test.put("d", "");
        PropertyDescriptor[] pds = PropertyUtils.getPropertyDescriptors(test);
        for(PropertyDescriptor pd : pds) {
            System.out.println(pd.getName());
            System.out.println(PropertyUtils.getProperty(test, pd.getName()));
        }
        System.out.println("------------------------------");
        for(PropertyDescriptor pd : pds) {
            System.out.println(pd.getReadMethod());
        }     	
        JSONObject obj = new JSONObject();
        obj.put("data", test);
    } 
```

## `List`를 담으면 왜 `getHours()`메서드가 호출되지 않을까?