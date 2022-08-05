---
layout: default
title: URI의 경로를 클래스화 시켜보자 (+ 코드숨)
nav_order: 60
parent: 👨‍🔬 Lab
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

코드숨 1주차 과제 [리뷰](https://github.com/CodeSoom/spring-week1-assignment-1/pull/115#discussion_r935493771)<br>

# URI의 경로를 **클래스화** 시켜보자

<div class="code-example" markdown="1">
**TaskHandler**
</div>

```java
final String[] path = exchange.getRequestURI().getPath().split("/");

...

// 자원
if("tasks".equals(path[1])){

}

// 경로 변수
final int taskId = path.length >= 3 ? Integer.parseInt(path[2]) - 1 : 0;

// GET방식으로 Task의 자원을 접근할 때 taskId (경로 변수)에 따른 분기
if("GET".equals(method)){
    content = taskId == 0 ? allTaskToJson() : taskToJson(tasks.get(taskId - 1));
}
```

- `자원의 정보`와 `경로 변수`를 위와 같이 사용하였었다
- `path[]`배열의 인덱스로 접근하는 방법은 **의도가 불분명하다**


> 1. 1번 인덱스에 뭐가 들어있는지?
> 2. 왜 0번 인덱스는 사용되지 않는지?
> 3. `taskId`가 0일 때는 모든 Task를 가져오는데 , `taskId`가 0부터 시작하게 된다면?
>   - *-1로 구분할 수 있겠지만 결국 문제는 해결되지 않는다*
> 4. `path[]` 배열에 다른 인덱스로 접근한다면?

- **위와 같이 예외를 불러올 상황이 다분하고 다른 사람이 보기에 의문투성이다**

<br>

<div class="code-example" markdown="1">
**Path**<br>
`path[]` 인덱스로 접근하지 않고 의도가 분명한 `Task`의 필드로 접근할 수 있다
</div>

```java
public class Path {
    private final String fullPath;
    private final String resource;
    private final String pathVariable;

    public Path(String path){
        this.fullPath = path;
        String[] pathArr = path.split("/");
        this.resource = pathArr[1];
        this.pathVariable = pathArr.length >= 3 ? pathArr[2] : null;
    }

    // Getter ...

    public String getPathVariable() throws ParameterNotFoundException {
        if(pathVariable == null){
            throw new ParameterNotFoundException("not existing pathVariable");
        }
        return pathVariable;
    }

    public boolean resourceEquals(String resource){
        return this.resource.equals(resource);
    }
}
```

1. 요청이 들어올 때 `Path`가 생성되기 때문에 Setter는 따로 필요 없었다
2. 생성자로 경로 문자열의 길이를 체크해서 `pathVariable`을 구분했다
   - *변화에 유연하지 않다*
3. `pathVariable`이 없을 때 접근을 대비하기 위해 예외를 강제로 잡게만들었다
   - **Exception**을 상속하는 커스텀 예외 `ParameterNotFoundException`을 추가하였다

<br>

- 하지만 아직 문제점은 존재한다

> 1. 지금의 `Path`클래스는 모든 상황을 만족하지 못 한다
> 2. `path[]`배열의 길이를 체크해서 `taskId`를 가져오는데 , 경로가 더 추가된다면?
>   - 예: `tasks/{자원}/{경로 변수}`

<br>

- 💡 리뷰를 통한 추가 개선사항 
  1. `String fullPath` [리뷰](https://github.com/CodeSoom/spring-week1-assignment-1/pull/115#discussion_r936597479)
  2. `resourceEquals()` [리뷰](https://github.com/CodeSoom/spring-week1-assignment-1/pull/115#discussion_r936595747)


