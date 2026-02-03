---
title: 에이전틱 프로그래밍에 가까워지기
date: "2025-12-17"
update: "2026-02-03"
tags:
   - ai
   - agentic
---

내가 사용하는 방법을 기록하고 개선하기 위해 작성한다.

> 1. AI로 인해 파생되는 콘텐츠, 아티클보다 
> 2. 에이전틱 프롬프트를 위한 에센스에 관심가지자.
> 3. 에센스를 자산화하자.

## 2026-02-03

요즘 애플리케이션 아키텍처에 대한 고민을 하다가 문득, 이런 아키텍처 작업은 사람을 위한 행위인데 AI를 위한 고민이 중심이 되어야 하지 않나?  
사람이 코드를 언제까지 읽을 수 있을까? 아직 검수는 필수이지만 대부분 코드에 대한 이해를 AI에게 의존하고 있는데 애플리케이션 아키텍처가 중요할까?  
AI친화 아키텍처를 고민해야하지 않을까? 라는 생각을 했다.  
결국 아키텍처도 책임과 목적을 분리하고 인지부하를 낮추는 행위이기 때문에 AI의 토큰 절약이나 컨텍스트를 너무 많이 차지하지 않게 하여 해결이 필요한 부분의 적절한 크기만큼 메모리에 로딩하게 하는것도 전략이기 때문에 결국 아키텍처 고민도 적절하다고 생각하긴 한다.  
하지만 에이전틱 프로그래밍을 이루기 위해 어떤 문서를 어디에 위치시키고 어떤 전략을 가져야할까를 고민하게 됐다.

- [프롬프트 엔지니어링 개요](https://platform.claude.com/docs/ko/build-with-claude/prompt-engineering/overview)
- [의도를 드러내는 이름](https://wiki.c2.com/?IntentionRevealingNames)
- [OMS에서 Claude AI를 활용하여 변화된 업무 방식](https://helloworld.kurly.com/blog/oms-claude-ai-workflow/)
- ["배민은 이제 노가다 안 합니다" 1시간 업무를 1분만에 끝내는 AI 자산화의 비밀(우아한형제들 임동준님)](https://www.youtube.com/watch?v=3HzELVptsb4)

1. ADR.md : 의사결정 문서
2. TODO.md : 큰 작업을 한 번에 끝내기 힘든 경우 
3. CLAUDE.md : 모든 프롬프팅에서 공통적으로 주입하기 위한 내용
    - 추가로 주입하고 싶은 정보가 있으면 다른 파일들 링크 추가해도 됨
4. SKILLS : 한 번에 너무 많은 정보를 전달하기 보다는 필요한 작업에 필요한 내용을 주입하기
5. 커스텀 커맨드 : 예를 들어, 세션에서 나눈 기술적 의사결정을 ADR.md에 정리하도록 `/adr` 커맨드 추가 

## superpowers

[superpowers](https://github.com/obra/superpowers)

## compound-engineering-plugin

[compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin)

## plugins-for-claude-natives

[team-attention의 plugin](https://github.com/team-attention/plugins-for-claude-natives/)

- `/history-insight`
   - 여러 번에 걸쳐 같은 주제(예: 결제 시스템 설계)를 이야기했는데, 그 전체 히스토리에서 패턴/인사이트를 뽑고 싶을 때
   - "우리가 대화 중에 뭘 자주 막혔는지, 어떤 선택 기준을 썼는지" 같은 메타 레벨의 피드백이 필요할 때
   - 지난 세션들 기준으로 나에게 맞는 학습/개발 습관, 다음에 개선할 점 등을 리포트처럼 받고 싶을 때

## vibe-kanban

claude-sqaud를 쓰다가 [vibe-kanban](https://github.com/BloopAI/vibe-kanban)을 사용 중인데, 에러가 없고 터미널로 관리하는 것 보다 프로젝트별 태스크를 칸반으로 관리할 수 있어서 잘 활용 중이다.  

## Super Claude

매번 프롬프팅을 손으로 쓰다보면 귀찮고, 어떻게 지시하는게 좋을지 고민될 때가 있다.  
이럴 때 Super Claude를 용도에 맞게 쓰면 프롬프팅의 힘을 알 수 있다.  

| 명령어              | 상황          | 핵심 용도               |
|------------------|:-------------:|:---------------------:|
| /sc:brainstorm   | 아이디어가 모호할 때 | 소크라테스식 질문으로 요구사항 발굴 |
| /sc:analyze      | 코드 품질 점검    | 보안/성능/아키텍처 종합 분석    |
| /sc:explain      | 이해가 필요할 때   | 코드/개념을 명확하게 설명      |
| /sc:implement    | 기능 구현       | 코드 작성 + 베스트 프랙티스    |
| /sc:improve      | 리팩토링        | 코드 품질/성능 개선         |
| /sc:troubleshoot | 버그/에러       | 문제 진단 및 해결          |
| /sc:document     | 문서화         | API/함수/컴포넌트 문서 생성   |
| /sc:test         | 테스트         | 테스트 실행 + 커버리지 분석    |
| /sc:build        | 빌드/배포       | 컴파일 + 에러 핸들링        |
| /sc:git          | 버전 관리       | 커밋 메시지 + git 작업     |
| /sc:research     | 조사 필요       | 웹 검색 기반 심층 리서치      |
| /sc:design       | 설계 단계       | 아키텍처/API 설계         |
| /sc:workflow     | PRD → 구현    | 요구사항을 작업 단계로 변환     |
| /sc:estimate     | 일정 산정       | 작업량/복잡도 예측          |
| /sc:spawn        | 복잡한 작업      | 태스크 분해 + 병렬 처리      |
| /sc:reflect      | 검증          | 작업 결과 되돌아보기         |


### 10가지 핵심 기법

**YAML Frontmatter (메타데이터) + Markdown Body (행동 지침)**


| #   | 기법                   | 핵심                     |
|-----|:----------------------:|------------------------|
| 1   | Role Injection       | 역할 + 사고방식 + 우선순위까지 명시  |
| 2   | Triggers             | 언제 활성화할지 키워드로 정의       |
| 3   | Focus Areas          | 전문 영역을 세부 항목까지 나열      |
| 4   | Key Actions          | 번호 + 동사 + 우선순위로 행동 강제  |
| 5   | Boundaries           | Will/Will Not으로 범위 명확화 |
| 6   | Socratic Dialogue    | 답 대신 질문으로 요구사항 발굴      |
| 7   | Progressive Workflow | 단계별 흐름 (1→2→3→4→5)     |
| 8   | MCP Integration      | 외부 도구 연동 패턴            |
| 9   | Examples             | 맥락 있는 좋은/나쁜 예시         |
| 10  | Output Spec          | 결과물 형식 명확히 정의          |

전문가 수준 출력을 위한 각 커맨드의 md를 확인하면 아래와 같이 정의되어 있다.  
[/sc:brainstorm](https://github.com/SuperClaude-Org/SuperClaude_Framework/blob/master/src/superclaude/commands/brainstorm.md) 참고  

1. **명확한 역할 (사고방식 포함)**
2. **트리거 (언제)**
3. **워크플로우 (어떻게)**
4. **행동 패턴 (무엇을)**
5. **경계 (Will/Will Not)**
6. **예시 (좋은/나쁜)**
  
> 핵심 차이: 역할 선언 → 사고방식/의사결정 기준까지 확장

## ~~Claude Squad~~

터미널로 사용하다보면 실수로 세션을 끄는 경우가 있다. /resume으로 세션을 재개 할 수 있지만 마지막 출력이 동일하다면 어떤 세션이였는지 가물가물하다.  
Claude Squad를 사용하면 내가 명시적으로 세션을 삭제하지 않는 이상 worktree 기반으로 관리되기 때문에 계속 존재한다.  
세션별로 작업이 혼합되지 않고 PR도 각각 날릴 수 있어서 편하다.  

