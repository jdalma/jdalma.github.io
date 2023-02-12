---
title: 코틀린의 와일드카드?
date: "2023-02-10"
tags:
   - Kotlin
   - lab
---


스프링과 코틀린을 사용하면서 만난 문제를 정리하려고 한다. 실제 업무와 비슷하게 다이어그램을 작성해 보았다.  

![](classDiagram.png)
  
`convert(List<Data>)`는 고정된 타입을 받아 `T`를 반환하고, `execute(T)`는 `T`타입을 받아 응답으로 반환하는 것을 알 수 있다.  
이 설계의 의도는 확장에 유연하도록 각 `ValidationImpl`은 `convert()`를 통해 `List<Data>`라는 타입을 받아 **검증할 때 사용할 데이터 타입을 직접 정의할 수 있도록 했다.**  
  
- `strategies`를 주입받을 떄 **`*` Star-projection**을 사용하여 모든 구현체를 주입받아야 한다.
  - `*`로 하지 않고 `Any`로 주입받으면 빈을 찾지 못한다.
- 제네릭을 `Any`로 작성하여 구현체마다 직접 다운 캐스팅을 하진 않을 것이다.

  
# **문제점**

위의 다이어그램과 같이 `Service`는 `ValidationStrategy` 인터페이스를 구현한 구현체를 `List<ValidationStrategy>`으로 주입받아 사용하려 했다.  
   
```kotlin
@Service
class Service(
    private val strategies: List<ValidationStrategy<*>>
) {
    fun validate(values: List<Data>) : List<ValidationResponse> {
        return strategies.map {
            val convertData = it.convert(values)
            it.execute(convertData) // COMPILE ERROR!!!
        }.filter {
            it.message.isNotEmpty()
        }
    }
}

interface ValidationStrategy<T>{

    fun execute(param: T) : ValidationResponse

    fun convert(queries: List<Data>) : T
}

@Component
class ValidationImpl1 : ValidationStrategy<String> {

    override fun execute(param: String): ValidationResponse {
        return ValidationResponse(param)
    }

    override fun convert(queries: List<Data>): String {
        return "가공 데이터"
    }

}

data class ValidationResponse (
    val message: String
)

data class Data (
    val data : String
)
```

하지만 `it.execute(convertData)`를 호출할 때 파라미터를 넘겨보면 **컴파일 에러**가 발생한다.  

![](nothing.png)
  
이 에러를 보고 고민했을 때 아래와 같은 방법들이 떠올랐다.  

## **첫 번째 방법 : 리플렉션** 
리플렉션을 사용하여 주입받은 `ValidationStrategy.execute()`의 타입 파라미터와 메소드를 조회화여, 찾은 타입 파라미터로 캐스팅하거나 찾은 메소드로 `invoke`하는 방법
  - 코드 복잡성이 높아진다.
  - 가독성이 급격히 떨어진다.

## **두 번째 방법 : 파라미터 추상화** 

![](abstracParameter.png)

좋은 방법이긴 하지만 [자바에서 코틀린으로 15장. 캡슐화한 컬렉션에서 타입 별명으로](https://github.com/jdalma/java-to-kotlin#15%EC%9E%A5-%EC%BA%A1%EC%8A%90%ED%99%94%ED%95%9C-%EC%BB%AC%EB%A0%89%EC%85%98%EC%97%90%EC%84%9C-%ED%83%80%EC%9E%85-%EB%B3%84%EB%AA%85%EC%9C%BC%EB%A1%9C)을 보면 **코틀린 표준 라이브러리가 제공하는 기능을 사용할 수 없기 때문에 제외하였다.**

## **세 번째 방법 : 타입 추론** 

코틀린의 `*`와 자바의 `?`와 같다고 생각하였지만 다르다는 것을 알 수 있다.  
[`kotlinlang` Start-Projections](https://kotlinlang.org/docs/generics.html#star-projections)를 보면  
타입 인수에 대해 자바의 `?` 같은 방식으로 모든 타입을 수용하고 안전한 방식으로 사용하기 위해 Kotlin은 **스타 프로젝션**을 제공한다.  

