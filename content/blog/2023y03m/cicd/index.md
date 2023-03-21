---
title: Jenkins CI/CD 구축하기
date: "2023-03-21"
tags:
   - Lab
   - CI/CD
---

# AS-IS

![](ASIS.png)

현재 모두 수동으로 반영하고 있다.  
`Bitbucket`은 형상관리 역할만 하기에 커밋 내용과 `Nexus`의 도커 이미지가 동일하다는 것이 보장되지 않는다.  
`Nexus`에 이미지를 넣기 위해 쉘 스크립트를 직접 실행시켜줘야 한다.  
그리고 이미지에 태깅할 이름을 직접 작성하기에 잘 못 작성할 여지가 있다.  
  
위의 문제를 해결하기 위해 아래와 같은 CI/CD를 구축해보려 한다.  
  
# TO-BE

![](TOBE.png)

`Jenkins`가 Webhook을 받아 테스트를 실행하고 이미지를 빌드하여 푸시할 예정이다.  
테스트는 **통합 테스트를 실행할 서버와 서비스 서버를 분리**한 상태에서 진행되어야 한다.  
테스트 상황별(Hotfix Test, Integration Test 등)로 테스트 코드를 관리하기 위해 `Gradle Task`를 각각 선언하여 경로별로 관리하려 하였지만 서버에 테스트 코드가 같이 존재하면 커밋이 복잡해져 분리하자는 요구사항이 있었다.  
  
현재 Webhook을 `Jenkins`가 전달받아 `Gradle Test Task`를 실행하고 빌드하는 것 까지는 완료한 상태다.  
이제 서비스를 젠킨스 내부에서 띄우고 통합 테스트를 실행할 서버가 필요하다.  
[`npm` start-server-and-test](https://www.npmjs.com/package/start-server-and-test)를 사용하여 테스트해보자


