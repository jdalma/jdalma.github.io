---
title: 코틀린 `*` 어떻게 써야할까?
date: "2023-02-10"
tags:
   - Blocking
   - NonBlocking
---


업무를 진행하면서 스프링과 코틀린을 사용하면서 만난 문제를 정리하려고 한다. 실제 업무와 비슷하게 다이어그램을 작성해 보았다.  

![](classDiagram.png)
  
`convert(List<Data>)`는 고정된 타입을 받아 `T`를 반환하고, `execute(T)`는 `T`타입을 받아 응답으로 반환하는 것을 알 수 있다.  
이 설계의 의도는 확장에 유연하도록 각 `ValidationImpl`은 `convert()`를 통해 `List<Data>`라는 데이터를 받아 **검증할 때 사용할 데이터 타입을 정의할 수 있도록 했다.**  
  
# **문제점**

위의 다이어그램과 같이 `Service`는 `ValidationStrategy` 인터페이스를 구현한 구현체를 `List<ValidationStrategy>`으로 주입받아 사용하려 했다.  
하지만 `execute`를 호출할 때 파라미터를 넘겨보면 **컴파일 에러**가 발생한다.  
  
```kotlin
@Service
class Service(
    private val strategies: List<ValidationStrategy<*>>
) {
    fun validate(values: List<Data>) : List<ValidationResponse> {
        val responses = mutableListOf<ValidationResponse>()
        strategies.forEach {
            val convertData = it.convert(values)
            it.execute(convertData)
//            responses.add()
        }
        return responses
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
        return "임시 가공 데이터"
    }

}

data class ValidationResponse (
    val message: String
)

data class Data (
    val data : String
)
```
  
현재 꼭 지켜야할 사항은  
- `strategies`를 주입받을 떄 **`*` Star-projection**을 사용하여 모든 구현체를 주입받아야 한다.
  - `*`로 하지 않고 `Any`로 주입받으면 빈을 찾지 못한다.
- 제네릭을 `Any`로 작성하여 구현체마다 직접 다운 캐스팅을 하진 않을 것이다.
  


IDE의 여러가지 제안이 있지만 `responses.add(it.execute(convertData as Nothing))` 이렇게 `Nothing`으로 변경해라 라는 제안이 있다.  
  
