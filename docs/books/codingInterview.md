---
layout: default
title: 코딩 인터뷰 대비
parent: Books
nav_order: 2
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## **[코딩 인터뷰 완전 분석](https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=115116545)**
## 📌 **[그래프 , 트리 예제](https://jeongcode.github.io/docs/algorithm/2021y11m/)**


# **그래프**
- **노드와 그 노드를 연결하는 간선(edge)를 하나로 모아 놓은 것이다.**
- 방향성이 있을 수도 있고 없을 수도 있다.
- **여러 개의 고립된 부분 그래프 (isolated subgraphs)로 구성될 수 있다.**
- 모든 정점간에 경로가 존재하는 그래프는 **연걸 그래프**라고 부른다.
- 그래프에는 사이클이 존재할 수도 있고 존재하지 않을 수도 있다.

## **인접 리스트**
- 그래프를 표현할 때 사용되는 가장 일반적인 방법이다.

![](../../assets/images/books/codingInterview/TreeAndGraphAdjacencyList.png)


## **인접 행렬**
- `N*N` 행렬 로써 `행렬[i][j]`에 정보가 존재한다면 **i에서 j로의 간선**이 있다는 뜻이다.
- 무방향 그래프를 인접 행렬로 표현한다면 이 행렬은 **대칭 행렬(symmetric matrix)**이 된다.

![](../../assets/images/books/codingInterview/TreeAndGraphAdjacencyMatrix.png)

## **그래프 탐색**

### **깊이 우선 탐색 (DFS)**
- **루트 노드 (혹은 다른 임의의 노드)에서 시작해서 다음 분기로 넘어가기 전에 해당 분기를 완벽하게 탐색하는 방법**
- 모든 노드를 방문하고자 할 때 더 선호되는 편이다.
- [백준(DFS , 백트래킹) - N과 M](https://www.acmicpc.net/workbook/view/9372)


- **[Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)**

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> list = new ArrayList<>();
        dfs(list , root , 0);
        return list;
    }

    public void dfs(List<List<Integer>> list , TreeNode node , int level){
        if(node != null){
            // 노드의 개수를 바로 알 수 있는 방법이 있다면 리스트에 레벨 만큼 미리 넣어줄 수 있는데??
            if(list.size() <= level) list.add(new ArrayList<Integer>());
            list.get(level).add(node.val);
            // System.out.println(node.val + " " + level);
            dfs(list , node.left , level + 1);
            dfs(list , node.right , level + 1);
        }
    }
}
```

### **넓이 우선 탐색 (BFS)**
- 노드 사이의 최단 경로 혹은 임의의 경로를 찾고 싶을 때 사용한다.
- 큐(Queue)를 사용하여 구현한다.

- **[Find if Path Exists in Graph](https://leetcode.com/problems/find-if-path-exists-in-graph/)**

```java
class Solution {
    public boolean validPath(int n, int[][] edges, int start, int end) {
        List<ArrayList<Integer>> list = new ArrayList<>();
        Queue<Integer> queue = new LinkedList<Integer>();
        boolean[] visited = new boolean[n];
        if(start == end) return true;
        for(int i = 0 ; i <= n ; i++) list.add(new ArrayList<Integer>());
        for(int i = 0 ; i < edges.length ; i++){
            int x = edges[i][0];
            int y = edges[i][1];
            list.get(x).add(y);
            list.get(y).add(x);
        }

        queue.offer(start);

        while(!queue.isEmpty()){
            int now = queue.poll();
            visited[now] = true;
            for(int next : list.get(now)){
                if(next == end){
                    return true;
                }
                else if(!visited[next]){
                    queue.offer(next);
                }
            }
        }
        return false;
    }
}
```

### **양방향 탐색**
- **출발지와 도착지 사이에 최단 경로를 찾을 때 사용된다.**
- 기본적으로 , 출발지와 도착지 두 노드에서 동시에 너비 우선 탐색을 사용한 뒤 , 두 탐색 지점이 충돌하는 경우에 경로를 찾는 방식이다.

![](../../assets/images/books/codingInterview/TreeAndGraph8.png)

> 추가로 읽을 거리 - 위상정렬 , 다익스트라 , AVL , 레드블랙트리

# **트리**
- 노드로 이루어져있고 그래프의 한 종류인 자료구조이다.
- 트리는 하나의 루트 노드를 갖는다.
  - *꼭 가질 필요는 없지만 프로그래밍 면접에서 사용하는 트리에선 맞는 말이다.*
- 루트노드는 0개 이상의 자식 노드를 갖고 있다.
- 그 자식 노드 또한 0개 이상의 자식 노드를 갖고 있고 , 이는 반복적으로 정의된다.
- **사이클이 존재할 수 없다.**
- 노드들은 특정 순서로 나열될 수도 있고 그렇지 않을 수도 있다.
- 각 노드는 부모 노드로의 연결이 있을 수도 있고 없을 수도 있다.

## **이진 트리 (Binary Tree)**
- **이진 트리는 각 노드가 최대 두 개의 자식을 갖는 트리**를 말한다.

## **이진 탐색 트리 (Binary Search Tree)**
- **`모든 왼쪽 자식들 <= n < 모든 오른쪽 자식들` 속성은 모든 노드 n에 대해서 반드시 참이어야 한다.**
- 부등식의 경우에 대해서는 바로 아래 자식뿐만 아니라 **내 밑에 있는 모든 자식 노드들에 대해서 참이어야 한다.**

> - 같은 값을 처리하는 방식에 따라 이진 탐색 트리는 약간씩 정의가 달라질 수 있다.
> - 어떤 곳에서는 중복된 값을 가지면 안 된다고 나오고 , 또 다른 곳에서는 중복된 값은 오른 쪽 혹은 양쪽 어느 곳이든 존재할 수 있다고 나온다.

![](../../assets/images/books/codingInterview/TreeAndGraph1.png)

- 모든 노드에 대해서 그 **왼쪽 자식들의 값이 현재 노드 값보다 작거나 같도록 하고** , **오른쪽 자식들의 값은 현재 노드의 값보다 반드시 커야 한다**.

## **완전 이진 트리 (Complete Binary Search)**
- **트리의 모든 높이에서 노드가 꽉 차 있는 이진트리를 말한다.**
- 마지막 레벨은 꽉 차 있지 않아도 되지만 **왼쪽에서 오른쪽으로 채워져야 한다.**

![](../../assets/images/books/codingInterview/TreeAndGraph2.png)

## **전 이진 트리 (Full Binary Tree)**
- **모든 노드의 자식이 없거나 정확히 두 개 있는 경우를 말한다.**
- 즉, *자식이 하나만 있는 노드가 존재해서는 안된다.*

![](../../assets/images/books/codingInterview/TreeAndGraph3.png)

## **포화 이진 트리 (Perfect Binary Tree)**
- **전 이진 트리**이면서 **완전 이진 트리**인 경우를 말한다.
- **모든 말단 노드는 같은 높이에 있어야 하며 , 마지막 단계에서 노드의 개수가 최대가 되어야 한다.**
- 노드의 개수는 정확히 **2<sup>k-1</sup>(k는 트리의 높이)** 이다.

## **이진 트리 순회**

### **중위 순회 (in-order traversal)**
- **왼쪽 가지 , 현재 노드 , 오른쪽 가지** 순서로 노드를 방문하는 것이다.
- **이진 탐색 트리를 이 방식으로 순회한다면 오름차순으로 방문하게 된다.**
- *가장 빈번하게 사용된다.*

### **전위 순회 (pre-order traversal)**
- **자식 노드보다 현재 노드를 먼저 방문하는 방법을 말한다.**
- 가장 먼저 방문하게 될 노드는 언제나 루트이다.

### **후위 순회 (post-order traversal)**
- **모든 자식 노드들을 먼저 방문한 뒤 마지막에 현재 노드를 방문하는 방법을 말한다.**
- 후위 순회에서 가장 마지막에 방문하게 될 노드는 언제나 루트이다.

![](../../assets/images/books/codingInterview/TreeAndGraphTraversal.png)


## **이진 힙 (최소 힙)**
- **최대 힙은 원소가 내림차순으로 정렬되어 있다는 점만 다를 뿐 , 최소 힙과 완전히 같다.**
- 최소 힙은 트리의 마지막 단계에서 오른쪽 부분을 뺀 나머지 부분이 가득 채워져 있다는 점에서 완전 이진 트리이다.
- **각 노드의 원소가 자식들의 원소보다 작다는 특성이 있다.**

![](../../assets/images/books/codingInterview/TreeAndGraph4.png)

- **삽입 (Insert)**
  - **원소를 삽입할 때는 언제나 트리의 밑바닥에서부터 삽입을 시작한다.**
  - *완전 트리의 속성에 위배되지 않게 새로운 원소는 밑바닥 가장 오른쪽 위치로 삽입된다.*
  - 새로 삽입된 원소가 제대로 된 자리를 찾을 때 까지 부모 노드와 교환해 나간다.

![](../../assets/images/books/codingInterview/TreeAndGraph5.png)

- **최소 원소 뽑아내기 (Extract_Min)**
  - 최소 원소는 가장 위에 놓이기 때문에 최소 원소를 찾기란 쉬운 일이다.
  - **이 최소 값을 어떻게 힙에서 제거하느냐가 까다로운 일이다.**
  1. 최소 원소를 제거한 후에 힙에 있는 가장 마지막 원소(밑바닥 가장 왼쪽에 위치한 원소)와 교환한다.
  2. 최소 힙의 성질을 만족하도록 , 해당 노드를 자식 노드와 교환해 나감으로 써 밑으로 내보낸다. (*자식들 중 최소 값을 선택한다.*)

![](../../assets/images/books/codingInterview/TreeAndGraph7.png)

> ![](../../assets/images/books/codingInterview/TreeAndGraph6.png)
> - [출처 및 최대 힙](https://gmlwjd9405.github.io/2018/05/10/data-structure-heap.html)

## **균형 vs 비균형** (레드-블랙 트리 , AVL트리 ->고급 주제에서 다룰 예정)

## **트라이 Trie (접두사 트리)**
- **각 노드에 문자를 저장하는 자료구조 이다.**
- 따라서 트리를 아래쪽으로 순회하면 단어가 하나 나온다.
- **접두사를 빠르게 찾아보기 위한 아주 흔한 방식이다.**
- NULL 노드라고도 불리우는 **`*`노드** 는 종종 단어의 끝을 나타낸다.
  - **`*`노드** 의 실제 구현은 특별한 종류의 자식 노드로 표현될 수도 있다.
  - 아니면 **`*`노드** 의 **부모 노드 안에 boolean flag 새로 정의함으로써 단어의 끝을 표현할 수도 있다.**

![](../../assets/images/books/codingInterview/TreeAndGraphTrie.png)

- **유효한 단어 집합을 이용하는 많은 문제들은 트라이를 통해 최적화 할 수 있다.**

***

# **해시 테이블**
- 간단한 해시 테이블을 구현하기 위해선 , **연결리스트**와 **해시 코드 함수**만 있으면 된다.

## 📌 **키와 값을 해시테이블에 넣을 때**는 다음의 과정을 거친다.
1. **처음엔 키의 해시 코드를 계산한다.**
    - 키의 자료형은 보통 `int` 혹은 `long`이 된다.
    - **서로 다른 두 개의 키가 같은 해시 코드를 가리킬 수 있다는 사실을 명심하자**
2. 그 다음엔 `hash(key) % array_length`와 같은 방식으로 해시 코드를 이용해 배열의 인덱스를 구한다.
