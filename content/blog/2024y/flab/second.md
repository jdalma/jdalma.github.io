---
title: 에프랩(F-Lab) Java Backend 2개월 후기
date: "2024-12-01"
update: "2024-12-01"
tags:
   - F-Lab
   - 에프랩
   - 후기
   - F-Lab 2개월 후기
   - 에프랩 2개월 후기
   - Java Backend
---

# 한 달의 과정

이론 학습 기간이 끝나고 토이 프로젝트를 시작하는 단계가 진행되면서 실무에서는 생각하지 못 했던 부분들을 고민하게 되었다.  
gradle로 멀티 모듈을 구성하는 방법부터 모듈간 의존성은 어떻게 관리할지, 소프트웨어 아키텍처의 여러 가지 방법에 대한 장,단점을 이해하고 최선의 선택은 무엇일지 처음으로 고민해보게 된 것 같다.  

1. **gradle 멀티 모듈 구성 방법과 기준**
    - common 모듈 구성
    - [구현 레이어의 역할](https://github.com/geminiKim/dev-practice/issues/16)
    - [왜 프로젝트를 멀티 모듈로 구성할까](https://www.youtube.com/watch?v=VPzg61njKxw&list=WL&ab_channel=%EC%BD%94%EB%94%A9%ED%95%98%EB%8A%94%EC%98%A4%ED%9B%84)
    - [멀티 모듈 구성](https://www.youtube.com/playlist?list=PL8RgHPKtjlBh-LU_yUxFfIq_flizPm_vZ)
    - [멀티모듈이란? 도입기, 모듈 분리 기준 aka.스프링부트, 코틀린](https://cofls6581.tistory.com/274)
2. **레이어드 아키텍처와 헥사고날 아키텍처의 장,단점**
    - [만들면서 배우는 클린 아키텍처 후기](https://jdalma.github.io/2024y/bookReview/bookReview/#%EB%A7%8C%EB%93%A4%EB%A9%B4%EC%84%9C-%EB%B0%B0%EC%9A%B0%EB%8A%94-%ED%81%B4%EB%A6%B0-%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98)
    - [지속 성장 가능한 소프트웨어를 만들어가는 방법](https://www.inflearn.com/course/%EC%A7%80%EC%86%8D-%EC%84%B1%EC%9E%A5-%EA%B0%80%EB%8A%A5%ED%95%9C-%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4/dashboard)
    - 도메인과 인프라간 경계를 명확히하여 순수한 도메인 영역을 만드는 것이 핵심이지 않을까? 자연스럽게 영속성 프레임워크의 기능에 의존하는 것도 떨어지게 된다는 점도 특징이다.
    - 이 두 아키텍처 중 정답은 없다. 현상황에 대해 이해하고 두 아키텍처를 적절히 혼용하여 단점을 희석시키고 장점을 부각시킬 수 있는 방법을 찾는 것이 정답이다.
    - [좋은 설계를 만족시키기 위해선 ORM과 작별 인사를 해야 한다](https://www.inflearn.com/community/questions/945855/db-%EC%97%94%ED%8B%B0%ED%8B%B0%EC%99%80-%EB%8F%84%EB%A9%94%EC%9D%B8-%EB%B6%84%EB%A6%AC?srsltid=AfmBOopalFese7Hi3bUdVAWZxFzgUFZvfgTfbXLS4PSC-IbWBsosGuDg), [도메인 모듈 분리 시 Transaction + JPA 활용 방안](https://www.youtube.com/watch?v=18C2A56ialY&ab_channel=%EC%A0%9C%EB%AF%B8%EB%8B%88%EC%9D%98%EA%B0%9C%EB%B0%9C%EC%8B%A4%EB%AC%B4)
3. **파사드나 애그리게이트가 서로 다른 문제를 해결하는 것인가?**
    - 누군가는 비즈니스의 복잡도를 안고 중개하는 역할을 해야 한다. 그런 관점에서 보면 파사드와 애그리게이트는 서로 같은 문제를 해결하는 것이다.
    - 복잡도를 누구에게 전가하여 중개를 어느 계층에서 어떤 방법으로 복잡도를 관리할지 스스로 어떤 규칙을 정하고 지키는 것이 핵심 아닐까
4. **rest docs 적용**

# 느낀점

실무에서 레이어간 의존성에 대한 고민만 해왔지 멀티 모듈을 사용한 의존성에 대한 고려는 엄청 새로웠다. MSA를 대비한 도메인간 멀티모듈을 적용하는 것과 모놀리식 환경에서 레이어간 멀티모듈을 적용하여 각 모듈이 의존하는 의존성을 완전히 분리하여 서로 침범할 수 없도록 강제하는 것들을 배울 수 있었다.  
  
소프트웨어 아키텍처와 비즈니스 로직 복잡도에 대한 내용들은 `구조(또는 방법)을 선택하였을 때 얻는 것과 잃는 것은 무엇인가? 당위성을 설명할 수 있는가?`를 생각하게 되는 주제들이였다.  
내가 해결해야 할 문제가 무엇인지 이해하지 못하고 특정 기술적인 단어에 집착하여 단편적인 문제 해결 방법들만 고려했던 것은 아닐까?
  
문제를 해결하기 위한 정형화된 방법을 찾는것이 아니라 현재 환경에서 맞닥뜨린 문제를 이해하고 발전시킬 부분과 포기할 부분을 신중히 선택해야한다.  
이번 학습을 통해 토이 프로젝트에 대해 어떤 아키텍처를 사용하게 되었는지 [소프트웨어 아키텍처에 대한 고민](/2024y/architecture/architecture)도 작성하게 되었다.  
- [조영호님의 설계 트레이드오프](https://eternity-object.tistory.com/43?fbclid=IwY2xjawGQfTlleHRuA2FlbQIxMQABHSPsDzykKq2BxRJ-WM1EIwKqEhF1G-CRBmz-rQxNdo9IexP1xGKW-mFv0g_aem_cGdvU2_P4v_qNGpZVA3QjQ) 참고