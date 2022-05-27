---
layout: default
title: Thread
parent: Linux Training
grand_parent: 👨‍🔬 Lab
nav_order: 3
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}
---

# `pthread_create` , `pthread_join`

```c
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <pthread.h>

#define _GNU_SOURCE         /* See feature_test_macros(7) */
#include <unistd.h>
#include <sys/syscall.h>

void *thread_function(void *arg);

int main() {
	int status;
	pthread_t tid;
	pthread_attr_t attr;
	void *thread_result;
	int i;
	

#if 0
	pthread_attr_init(&attr);
	status = pthread_create(&tid, &attr, thread_function, "hello thread");
#else
	//쓰레드 생성
	// status = pthread_create(&tid, NULL, thread_function, (void *)NULL);
	status = pthread_create(&tid, NULL, thread_function, "hello thread");
	if(status !=0){
		perror("pthread_create");
		exit(1);
	}
#endif
	printf("Created Thread ID = %u\n", (unsigned int)tid);
	
	for(i=1; i<=5; i++){
		printf("Parent thread %d!!\n", i);
		sleep(1);
	}
    // pthread_join(tid , NULL);
	// printf("Parent thread End\n");
	return 0;
}

void *thread_function(void *arg){
	int i;
	pid_t tpid, pid;
	
#if 0
	pthread_t thread_id;
	thread_id = pthread_self();
	printf("\e[32mThread ID: %u\e[0m\n", (unsigned int)thread_id);
#endif

	for(i=1; i<=10; i++){
		printf("\t\e[31mChild thread[%d] - %s\e[0m\n", i, (char *)arg);
		sleep(1);
	}
	return NULL;
}
```

```
Created Thread ID = 1440630336
Parent thread 1!!
        Child thread[1] - hello thread
Parent thread 2!!
        Child thread[2] - hello thread
Parent thread 3!!
        Child thread[3] - hello thread
Parent thread 4!!
        Child thread[4] - hello thread
Parent thread 5!!
        Child thread[5] - hello thread
```

- **자식 thread는 10번 찍어야 하는데 왜 5번만 찍을까??**
  - 현재 가상 메모리는 현재 프로세스(메인 스레드)가 가지고 있기 때문에 , 메인 스레드가 끝나면 자식 스레드도 끝나버린다
  - 메인이 다 끝났을 때 `return`을 하지 않고 `pthread_join`을 걸어주면 자식 스레드를 기다려준다
  - **자식 스레드도 `pthread_exit`을 해줄 필요가 있다**

```
Created Thread ID = 2656032320
Parent thread 1!!
        Child thread[1] - hello thread
Parent thread 2!!
        Child thread[2] - hello thread
Parent thread 3!!
        Child thread[3] - hello thread
Parent thread 4!!
        Child thread[4] - hello thread
Parent thread 5!!
        Child thread[5] - hello thread
        Child thread[6] - hello thread
        Child thread[7] - hello thread
        Child thread[8] - hello thread
        Child thread[9] - hello thread
        Child thread[10] - hello thread
Parent thread End
```

***

# Thread 병렬 처리


```c
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <pthread.h>
#include <sys/syscall.h>

#define NUM_THREAD	3
void *hello_thread(void *arg){
	int tnum = (long) arg;
	pid_t tid = syscall(SYS_gettid);
	for(int i=11; i<=13; i++) {
		printf("Thread #%d[%d]: Hello, World(%d)!\n", tnum ,tid, i);
		for(int j=0; j<10000000; j++){}
	}
	return arg;
}

int main(void){
	pthread_t tid;;
	int status;
	long i;
	for(i=0; i<NUM_THREAD; i++) {
		status = pthread_create(&tid, NULL, hello_thread, (void *)i);
		printf("Thread id = [%u]\n", (unsigned int) tid);
		if(status != 0) {
			perror("thread create");
			exit(1);
		}
		// for(int j=0; j<100000000; j++){}
	}
	printf("\e[31mMain Thread End!!\e[0m\n");
	pthread_exit(NULL);
}
```

```
Thread id = [2369631808]
Thread id = [2361239104]
Thread id = [2352846400]
Main Thread End!!
Thread #2[18851]: Hello, World(11)!
Thread #1[18850]: Hello, World(11)!
Thread #0[18849]: Hello, World(11)!
Thread #1[18850]: Hello, World(12)!
Thread #2[18851]: Hello, World(12)!
Thread #0[18849]: Hello, World(12)!
Thread #1[18850]: Hello, World(13)!
Thread #2[18851]: Hello, World(13)!
Thread #0[18849]: Hello, World(13)!
```

***

# `multi thread` - no sync

```c
pid_t tid;

pthread_t	tid1, tid2;	/* thread ID */
void *thread1(void *arg) {
	printf("THREAD1 TID=%ld\n", syscall(SYS_gettid));
	for(int i=0; i<300; i++) {
		tid=syscall(SYS_gettid);
		for(int j=0; j<100000; j++){}
		if(syscall(SYS_gettid) == tid)
			putchar('0');
		else
			putchar('X');
		fflush(stdout);
	}
	return NULL;
}

void *thread2(void *arg) {
	printf("THREAD2 TID=%ld\n", syscall(SYS_gettid));
	for(int i=0; i<200; i++) {
		tid=syscall(SYS_gettid);
		for(int j=0; j<100000; j++){}
		if(syscall(SYS_gettid) == tid)
			putchar('0');
		else
			putchar('X');
		fflush(stdout);
	}
	return NULL;
}


int main() {
	pthread_t tid1, tid2;
	
	if (pthread_create(&tid1, NULL, thread1, NULL) != 0) {
		exit(1);
	}
	if (pthread_create(&tid2, NULL, thread2, NULL) != 0) {
		exit(1);
	}
	if(pthread_join(tid1, NULL) != 0) {
		perror("pthread_join");
		exit(1);
	}
	
	if(pthread_join(tid2, NULL) != 0) {
		perror("pthread_join");
		exit(1);
	}

	return 0;
}
```

```
THREAD2 TID=19040
0000000THREAD1 TID=19039
000000000X00000000000000X000000000000000000X00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000X00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000X000000000000000000000X0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
```

- **tid 전역변수**에 2개의 쓰레드가 접근하여 자기의 `tid`로 덮어쓰며 , **tid 전역변수**와 자신의 `tid`와 비교하여 다르면 `X`가 찍힌다

***

# `multi thread` - mutex 사용

```c
pid_t tid;
pthread_mutex_t mutex_id;
void *thread1(void *arg) {
	printf("THREAD1 TID=%ld\n", syscall(SYS_gettid));
	for(int i=0; i<300; i++) {
		pthread_mutex_lock(&mutex_id);
		tid=syscall(SYS_gettid);
		for(int j=0; j<5000000; j++){}
		if(syscall(SYS_gettid) == tid)
			write(1, "0", 1);
		else
			write(1, "X", 1);
		pthread_mutex_unlock(&mutex_id);
	}
	return NULL;
}
void *thread2(void *arg) {
	printf("THREAD2 TID=%ld\n", syscall(SYS_gettid));
	for(int i=0; i<200; i++) {
		pthread_mutex_lock(&mutex_id);
		tid=syscall(SYS_gettid);
		for(int j=0; j<10000000; j++){}
		if(syscall(SYS_gettid) == tid)
			write(1, "0", 1);
		else
			write(1, "X", 1);
		pthread_mutex_unlock(&mutex_id);
	}
	return NULL;
}


int main() {
	pthread_t tid1, tid2;
	
	if(pthread_mutex_init(&mutex_id, NULL) != 0){
		perror("pthread_mutex_init");
		exit(errno);
	}
	
	if (pthread_create(&tid1, NULL, thread1, NULL) != 0) {
		exit(1);
	}
	if (pthread_create(&tid2, NULL, thread2, NULL) != 0) {
		exit(1);
	}
	if(pthread_join(tid1, NULL) != 0) {
		perror("pthread_join");
		exit(1);
	}
	
	if(pthread_join(tid2, NULL) != 0) {
		perror("pthread_join");
		exit(1);
	}

	pthread_mutex_destroy(&mutex_id);
	return 0;
}
```

```
THREAD2 TID=19054
THREAD1 TID=19053
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
```

***

# `multi thread` - named sema

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>
#include <sys/types.h>
#include <errno.h>
#include <semaphore.h>

#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>


#define _GNU_SOURCE         /* See feature_test_macros(7) */
#include <unistd.h>
#include <sys/syscall.h> 


void * thread_function(void *);

pid_t tid;
sem_t *semp, semid;

int main(void){
	pthread_t tid1, tid2;
	int flags;
	mode_t perms;

#ifndef NOSEM
	flags = O_CREAT | O_EXCL;
	perms = S_IRUSR | S_IWUSR | S_IRGRP | S_IWGRP | S_IROTH | S_IWOTH;	//rw-rw-rw-
	semp = sem_open("mysem", flags, perms, 1);
	if (semp == SEM_FAILED){
		perror("sem_open");
		exit(2);
	}
	semid = *semp;
#endif

	if(pthread_create(&tid1, NULL, thread_function, "thread1")!=0) {
		perror("pthread_create");
		exit(1);
	}
	
	if(pthread_create(&tid2, NULL, thread_function, "thread2")!=0) {
		perror("pthread_create");
		exit(1);
	}
	
	if(pthread_join(tid1, NULL)!=0) {
		perror("pthread_join");
		exit(1);
	}
	if(pthread_join(tid2, NULL)!=0) {
		perror("pthread_join");
		exit(1);
	}
	
#ifndef NOSEM
	sem_close(semp);
	sem_unlink("mysem");
	// sem_unlink((const char *)semp);
	exit(EXIT_SUCCESS);
#endif
	return 0;
}

void * thread_function(void * arg){
	printf("THREAD1 TID=%ld\n", syscall(SYS_gettid));
	for(int i=0; i<200; i++) {
#ifndef NOSEM
		sem_wait(&semid);
#endif
		tid=syscall(SYS_gettid);
		for(int j=0; j<5000000; j++){}
		if(syscall(SYS_gettid) == tid)
			putchar('0');
		else
			putchar('X');
		fflush(stdout);
#ifndef NOSEM
		sem_post(&semid);
#endif

	}
	pthread_exit(NULL);
}
```