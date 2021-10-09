---
layout: default
title: CPU Scheduling
parent: 운영체제
nav_order: 4
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

# **CPU 스케줄링**
- **다중 프로그래밍된 운영 체제의 기초**
- 다중 프로그래밍의 목적은 일부 프로세스가 항상 실행되도록 하려면 CPU 사용률을 최대화 해야한다.

![](../../assets/images/operating-system/CPUScheduling/1.png)

> ✋ **[CPU Burst VS I/O Burst](https://jhnyang.tistory.com/25)**

# **CPU 스케줄러**
- 메모리의 프로세스에서 프로세스 선택
- 실행할 준비가 되어 있고 해당 프로세스에 CPU를 할당한다
- **그러면 다음 프로세스를 어떻게 선택할 수 있을까?**
  - 연결 리스트? 이진 트리?
  - FIFO 대기열: 선입선출
  - 우선 순위 큐: 프로세스의 우선 순위를 어떻게 결정할 수 있을까?

  ## **Preemptive 선점 vs Non-preemptive 비선점**
  - **Non-preemptive 비선점 스케줄링**
    - 프로세스가 CPU를 해제할 때까지 CPU를 유지한다
    - 이미 할당된 자원을 다른 프로세스가 가져갈 수 없다.
    - **덜 중요한 작업이 자원을 할당 받으면 중요한 작업이 와도 먼저 처리 될 수 없다.**
  - **Preemptive 선점 스케줄링**
    - 우선순위가 높은 프로세스를 빠르게 처리할 수 있다.
    - 어떤 프로세스가 자원을 사용하고 있을 때 우선순위가 더 높은 프로세스가 올 경우 자원을 가져갈 수 있다.
    - **빠른 응답 시간을 요구하는 시스템에서 사용**
    - 오버헤드가 크다

> ✋ **[선점 , 비선점 스케줄링](https://colomy.tistory.com/120)**

## **CPU 스케줄링 선점 , 비선점 결정**
1. 프로세스가 실행 중에서 대기 상태로 전환될 때
1. 프로세스가 실행 중에서 준비 상태로 전환될 때
1. 프로세스가 대기 상태에서 준비 상태로 전환될 때
1. 프로세스가 종료되는 경우.
- **1번 과 4번 - 선택할 수 없다 -> 비선점**
- **2번 과 3번 - 선택할 수 있다 -> 선점형 또는 비선점형**

## **Dispatcher 디스패처**
- **CPU의 코어를 제어하는 모듈**
- **디스패처의 기능**
  - **한 프로세스에서 다른 프로세스로 컨텍스트 전환**
  - 사용자 모드로 전환
  - 사용자 프로그램을 재개하기 위해 적절한 위치로 점프
- **모든 컨텍스트 전환 중에 호출되기 때문에 디스패처는 가능한 빨라야 한다**
- **디스패처 지연시간(Dispatcher Latency)은 한 프로세스를 중지하고 다른 실행을 시작하는 시간**
  - **[PCB (Process Control Block)](https://jwprogramming.tistory.com/16)** 를 저장하고 새로운 블록을 실행한다.

![](../../assets/images/operating-system/CPUScheduling/2.png)

![](../../assets/images/operating-system/CPUScheduling/3.png)

## **Scheduling Criteria 스케줄링 기준**
- **CPU Utilization - CPU 사용률** : CPU를 최대로 사용하자.
- **Throughput - 처리량** : 단위 시간 내에 프로세스를 최대한 빠르게 처리하자.
- **Turnaround Time - 처리 시간** : 실행에서 종료까지의 시간을 최소화하자.
- **📌 Waiting Time - 대기 시간** : 프로세스가 준비 대기열 Ready Queue 에서 대기하는 데 소비하는 시간을 최소화 하자
- **Response Time - 응답 시간** : 응답을 시작하는 데 걸리는 시간


## **준비 대기열 Ready Queue에 있는 어느 프로세스에게 CPU의 코어를 할당하나?**

### **FCFS(First-Come, First-Served)** - 선착순
### **SJF(Shortest Job First)** - 가장 짧은 작업 우선 (SRTF : 가장 짧은 남은 시간 우선)
### **RR(Round Robin)** - 시분할 시스템을 위해 설계된 선점형 스케줄링
- 프로세스들 사이에 우선순위를 두지 않고 , 순서대로 시간단위(Time Quantum/Slice)로 CPU를 할당하는 방식의 CPU 스케줄링 알고리즘
- 컴퓨터 자원을 사용할 수 있는 기회를 프로세스들에게 공정하게 부여하기 위한 한 방법
- 할당된 시간이 지나면 그 프로세스는 잠시 보류한 뒤 다른 프로세스에게 기회를 준다.
  - 보통 시간 단위는 10ms ~ 100ms 정도 , 시간 단위동안 수행한 프로세스는 준비 큐의 끝으로 밀려나게 되고, 문맥 전환의 오버헤드가 큰 반면에 응답시간이 짧아지는 장점이 있어 실시간 시스템에 유리
• 우선순위 기반
• MLQ: 다단계 대기열
• MLFQ: 다단계 피드백 대기열
