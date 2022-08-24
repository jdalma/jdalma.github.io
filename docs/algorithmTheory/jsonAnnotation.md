---
layout: default
title: JSON Annotation
parent: 📕 정리
nav_order: 2
---
{: .no_toc }

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

- [`baeldung` Jackson Ignore Properties on Marshalling](https://www.baeldung.com/jackson-ignore-properties-on-serialization)
- [`baeldung` Jackson – Decide What Fields Get Serialized/Deserialized](https://www.baeldung.com/jackson-field-serializable-deserializable-or-not)

# **@JsonCreator** (+ @JsonProperty)

```java
@Getter
@ToString
public class ProductDTO {

    private final String name;
    private final String maker;
    private final int price;
    private final String fileName;

    @JsonCreator
    public ProductDTO(@JsonProperty("name") String name,
                      @JsonProperty("maker") String maker,
                      @JsonProperty("price")int price,
                      @JsonProperty("fileName") String fileName) {
        this.name = name;
        this.maker = maker;
        this.price = price;
        this.fileName = fileName;
    }
}
```

- 위와 같은 DTO를 **Immutable**하게 사용하고 싶어 `final`키워드를 붙여주었다
- 하지만 **Object Mapper**는 역직렬화 시 객체의 **기본 생성자**를 사용하기 때문에 **Immutable**하게 만들지 못 한다
  - [코드숨 과제 중 관련 리뷰](https://jdalma.github.io/docs/retrospective/2022y08m/#0810-%EC%88%98)
- 이 떄 **JSON Annotation**을 활용하여 생성자와 키 값에 맞는 필드를 지정해줄 수 있다

# **@JsonIgnore**

```java
@Getter
@ToString
public class ProductDTO {

    private String name;
    private String maker;
    private int price;
    private String fileName;

    @JsonCreator
    public ProductDTO(@JsonProperty("name") String name,
                      @JsonProperty("maker") String maker,
                      @JsonProperty("price")int price,
                      @JsonProperty("fileName") String fileName) {
        this.name = name;
        this.maker = maker;
        this.price = price;
        this.fileName = fileName;
    }

    @JsonIgnore
    public void setName(String name) {
        this.name = name;
    }
}
```

```
JsonToJava = ProductDTO(name=cat, maker=factory, price=1000, fileName=tmp)
JavaToJson = {"maker":"factory","price":1000,"fileName":"tmp"}
```

- 위의 결과와 같이 `@JsonIgnore`가 붙은 **Setter**의 필드는 직렬화가 되지 않는다
  - 롬복의 `@Setter`가 있어도 적용된다