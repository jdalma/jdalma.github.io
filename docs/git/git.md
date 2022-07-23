---
layout: default
title: 👨‍👩‍👧‍👦 Git
nav_order: 6
has_children: true
permalink: /docs/git
---

- [제대로 파는 Git & GitHub - by 얄코](https://www.inflearn.com/course/%EC%A0%9C%EB%8C%80%EB%A1%9C-%ED%8C%8C%EB%8A%94-%EA%B9%83/dashboard)

***

# 공식 문서
  1.  [gitignore](https://git-scm.com/docs/gitignore)

# 기본 세팅

<div class="code-example" markdown="1">
**협업시 윈도우와 맥에서 엔터 방식 차이로 인한 오류를 방지합니다.**
</div>

```
git config --global core.autocrlf input
```

<div class="code-example" markdown="1">
**기본 branch는 `master`이지만 `main`으로 기본 브랜치를 변경**
</div>

```
git config --global init.defaultBranch main
```

<div class="code-example" markdown="1">
**작업 폴더에서 해당 명령어를 치면 git이 관리하게 된다**
</div>

```
git init
```

<div class="code-example" markdown="1">
**gitignore 형식**
</div>

```yaml
# 이렇게 #를 사용해서 주석

# 모든 file.c
file.c

# 최상위 폴더의 file.c
/file.c

# 모든 .c 확장자 파일
*.c

# .c 확장자지만 무시하지 않을 파일
!not_ignore_this.c

# logs란 이름의 파일 또는 폴더와 그 내용들
logs

# logs란 이름의 폴더와 그 내용들
logs/

# logs 폴더 바로 안의 debug.log와 .c 파일들
logs/debug.log
logs/*.c

# logs 폴더 바로 안, 또는 그 안의 다른 폴더(들) 안의 debug.log
logs/**/debug.log
```

# `reset` vs `revert`

- `git reset --hard {돌아갈 커밋 해시}` : 원하는 시점으로 돌아간 뒤 이후 내역들을 지운다
- `git reset --hard` : 뒤에 커밋 해시가 없으면 마지막 커밋 상태로 이동
- *`git reset`을 사용해서 `revert` 커밋을 날리는 것도 가능하다*

<br>

- `git revert {되돌릴 커밋 해시}` : 되돌리기 원하는 시점의 커밋에 해당하는 수정 정보를 삭제한다
  1. 해당 revert작업을 위한 커밋이 새로 생긴다

![](../../assets/images/git/revert.png)

- `git revert --no-commit {되돌릴  커밋 해시}` : 커밋해버리지 않고 `revert`하기
  1. 원하는 다른 작업을 추가한 다음 함께 커밋
  2. 취소하려면 `git reset --hard`