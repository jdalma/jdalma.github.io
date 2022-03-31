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
- `List<EgovMapForNull> list = mapper.select(parameter);`
- 해당 `list`를 `net.sf.json.JSONObject`에 담는 과정에서 예외가 발생하였다.

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
```

# **조치**
- **SELECT**되는 정보중 컬럼의 타입을 `date` ➜ `datetime`으로 변경하니 해결

# **왜 이런 현상이??**
- 일단 예외 `Stack`을 따라 가보았다.
- `SE1.8`의 `rt.jar`
- `json-lib-2.2.2-jdk15` 버전의 `net.sf.json.JSONObject`
- 일단 `net.sf.json.JSONObject._fromBean(JSONObject.java:928)`해당 라인 부터 보자


```java
 private static JSONObject _fromBean(Object bean, JsonConfig jsonConfig)
  {
    fireObjectStartEvent(jsonConfig);
    if (!addInstance(bean)) {
      try {
        return jsonConfig.getCycleDetectionStrategy().handleRepeatedReferenceAsObject(bean);
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
      } catch (JSONException jsone) {
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
        if (!exclusions.contains(key))
        {
          if ((!jsonConfig.isIgnoreTransientFields()) || (!isTransientField(key, beanClass)))
          {
            Class type = pds[i].getPropertyType();
            if (pds[i].getReadMethod() != null) {
              if (jsonConfig.isIgnoreJPATransient()) {
                try {
                  Class transientClass = Class.forName("javax.persistence.Transient");
                  if (pds[i].getReadMethod().getAnnotation(transientClass) != null)
                  {
                    continue;
                  }
                }
                catch (ClassNotFoundException cnfe) {
                }
              }
              else {
                Object value = PropertyUtils.getProperty(bean, key);
                if ((jsonPropertyFilter == null) || (!jsonPropertyFilter.apply(bean, key, value)))
                {
                  JsonValueProcessor jsonValueProcessor = jsonConfig.findJsonValueProcessor(beanClass, type, key);

                  if (jsonValueProcessor != null) {
                    value = jsonValueProcessor.processObjectValue(key, value, jsonConfig);
                    if (!JsonVerifier.isValidJsonValue(value)) {
                      throw new JSONException("Value is not a valid JSON value. " + value);
                    }
                  }
                  setValue(jsonObject, key, value, type, jsonConfig);
                }
              } } else { String warning = "Property '" + key + "' has no read method. SKIPPED";
              fireWarnEvent(warning, jsonConfig);
              log.warn(warning); } 
          }
        }
      }
    } catch (JSONException jsone) { removeInstance(bean);
      fireErrorEvent(jsone, jsonConfig);
      throw jsone;
    } catch (Exception e) {
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
    PropertyDescriptor[] pds = PropertyUtils.getPropertyDescriptors(list);
    for(PropertyDescriptor pd : pds) {
        System.out.println(pd.getName());
        System.out.println(PropertyUtils.getProperty(list, pd.getName()));
    }
    System.out.println("------------------------------");
    for(PropertyDescriptor pd : pds) {
        System.out.println(pd.getReadMethod());
    }    	            
```