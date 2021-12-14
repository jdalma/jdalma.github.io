---
layout: default
title: 코딩 인터뷰 완전 분석
parent: Books
nav_order: 2
---
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## **[코딩 인터뷰 완전 분석](https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=115116545)**
### 📌 **[그래프 , 트리 , 문자열 예제](https://jeongcode.github.io/docs/algorithm/2021y11m/)**
### 📌 **[동적프로그래밍 예제](https://jeongcode.github.io/docs/algorithm/2021y12m/)**

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
- **Hashtable 클래스는 컬렉션 프레임웍이 만들어지기 이전부터 존재**하던 것이기 때문에 컬렉션 프레임워의 명명법을 따르지 않는다.

## 📌 **키와 값을 해시테이블에 넣을 때**는 다음의 과정을 거친다.
1. **처음엔 키의 해시 코드를 계산한다.**
    - 키의 자료형은 보통 `int` 혹은 `long`이 된다.
    - **hashCode는 객체의 주소값을 변환하여 생성한 객체의 고유한 정수값이다.**
    - **서로 다른 두 개의 키가 같은 해시 코드를 가리킬 수 있다는 사실을 명심하자**
2. 그 다음엔 `hash(key) % array_length`와 같은 방식으로 해시 코드를 이용해 배열의 인덱스를 구한다.
    - **물론 서로 다른 두개의 해시 코드가 같은 인덱스를 가리킬 수도 있다.**
3. 배열의 각 인덱스에는 키와 값으로 이루어진 연결 리스트가 존재한다.
    - **충돌에 대비해서 반드시 연결 리스트를 이용해야 한다.**

> - 충돌이 자주 발생한다면 , 최악의 경우의 수행시간 `worst case runtime`은 `O(N)`이 된다.

![](../../assets/images/books/codingInterview/HashTable.png)

- **균형 이진 탐색 트리로 구현**
  - 이 경우에 탐색 시간은 `O(log N)`이 된다.
  - 키의 집합을 특정 순서로 차례대로 접근할 수 있는데 , 어떤 경우에는 이런 기능이 유용하기도 하다.

> ✋ **[객체의 hashCode() 와 String의 hashCode()](https://brunch.co.kr/@mystoryg/133)**
> - `equals()`가 **false**이고 `hashCode()`가 **true**인 경우 ➜ HashMap에서 **다른 key**로 처리
> - `equals()`가 **true**이고 `hashCode()`가 **false**인 경우 ➜ HashMap에서 **다른 key**로 처리
> - `equals()`가 **true**이고 `hashCode()`가 **true**인 경우 ➜ HashMap에서 **같은 key**로 처리

> ✋ **[HashTable vs HashMap vs ConcurrentHashMap](https://devlog-wjdrbs96.tistory.com/269)**

# **해시 충돌 해결 방법**

## **개방 주소법(Open Addressing)**
- 추가적인 메모리를 사용하는 `Chaining` 방식과 다르게 비어있는 해시 테이블의 공간을 활용하는 방법
- 개방 주소법을 구현하기 위한 대표적인 3가지 방식이 존재한다.
    1. **Linear Probing** : 만약 충돌이 `h[k]` 에서 난다면 `h[k + 1]`이 비어있는지 확인하고 비어 있지 않다면 `h[k + 2] . . .` 식으로 계속 확인하는 방법
    2. **Quadratic Probing** : 해시의 저장순서 폭을 제곱으로 저장하는 방식, 예를 들어 처음 충돌이 발생한 경우에는 `1`만큼 이동하고 그 다음 계속 충돌이 발생하면 `2^2, 3^2` 칸씩 옮기는 방식
    3. **Double Hashing Probing** : 해시된 값을 한번 더 해싱하여 새로운 주소를 할당하기 때문에 다른 방법들보다 많은 연산을 하게 된다.
    - 1, 2번은 버킷 조사를 원형으로 회전하게 된다 테이블의 마지막에 도달하면 다시 처음으로 이동한다.

![](../../assets/images/books/codingInterview/Probing.png)


## **분리 연결법(Seperate Chaining)**
- **Java HashMap에서도 이용하고 있는 방식**
- 동일한 버킷의 데이터에 대해 **리스트 or 트리 자료구조를 이용해서 추가 메모리를 사용하여 다음 데이터의 주소를 저장하는 것**

> - 충돌이 많이 발생해서 리스트의 형태로 계속 데이터가 쌓이게 되면 검색하는데 **시간 복잡도가 `O(n)`** 으로 나빠지게 된다.
> - 그래서 Java8의 HashMap은 리스트의 개수가 8개 이상이 되면 **Self-Balancing Binary Search Tree 자료구조를 사용해 Chaining 방식을 구현** 하였다. **탐색할 때 `O(logN)`으로 성능이 좋아집니다.**

![](../../assets/images/books/codingInterview/Chaining.png)

## **JAVA8의 분리 연결법**
- Java 7까지는 분리 연결법에서 충돌이 발생하면 연결 리스트를 이용하였다.
- 그런데 이러면 데이터가 많이 쌓였을 때 탐색하는데 시간이 많이 걸린다는 단점이 있기에,
- **Java 8에서는 일정 개수 이상이 되면 트리구조를 이용하는 것으로 발전했다**.
  - 그러면 `O(n)`의 탐색시간이 `O(logN)`으로 빨라질 수 있다.
- **버킷에 8개의 키-값 쌍이 쌓이면 리스트 ➜ 트리로 변경한다.** 그리고 **다시 6개이하가 되면 트리 ➜ 리스트의 형태로 바꾼다.**

```java
static final int TREEIFY_THRESHOLD = 8;

static final int UNTREEIFY_THRESHOLD = 6;
```

> - Java 8 HashMap에서는 `Entry` 클래스 대신 `Node` 클래스를 사용한다.
> - **`Node` 클래스 자체는 사실상 Java 7의 `Entry` 클래스와 내용이 같지만, 링크드 리스트 대신 트리를 사용할 수 있도록 하위 클래스인 `TreeNode`가 있다는 것이 Java 7 HashMap과 다르다.**
> - 이때 사용하는 트리는 **Red-Black Tree**인데, Java Collections Framework의 TreeMap과 구현이 거의 같다.

> ✋ **정리**
> - 개방주소법은 연속된 공간에 데이터를 저장하기 때문에 `Seperate Chaining`에 비하여 캐시 효율이 높다.
> - 따라서 **데이터의 개수가 충분히 적다면 개방 주소법이 분리 연결법보다 성능이 더 좋다**.
> - **하지만 배열의 크기가 커질수록 캐시의 효율이라는 개방 주소법의 장점은 사라진다.**
> - **Java HashMap에서 사용하고 있는 것은 `Seperate Chaining`이다.**
> - **key-value 쌍이 일정 개수 이상 많아지면 개방 주소법이 분리 연결법보다 속도가 느리다는 단점이 있다.**


[d2.naver.com 자세히 읽어보기](https://d2.naver.com/helloworld/831311)

***

# **StringBuilder**

- **[문자열(String) 객체가 저장되는 String Pool에 대하여](https://dololak.tistory.com/718)**
- **[String은 항상 StringBuilder로 변환될까?](https://siyoon210.tistory.com/160)**

***

# **재귀 Recursive 와 동적 프로그래밍 Dynamic Programming**
- 재귀적 해법은 , **부분 문제(subproblem)**에 대한 해법을 통해 완성된다.
  1. 단순히 `f(n-1)`에 대한 해답에 무언가를 더하거나, 제거하거나,
  2. 그 해답을 변경하여 `f(n)`을 계산해내거나,
  3. 데이터를 반으로 나눠 각각에 대해서 문제를 푼 뒤 이 둘을 **병합 (merge)**하기도 한다.
- 주어진 문제를 부분문제로 나누는 3가지 방법
  - 상향식 (bottom-up)
  - 하향식 (top-down)
  - 반반 (half-half)

## **상향식 접근법 (bottom-up approach)**
- 가장 직관적인 경우가 많다.
- **이 접근법은 우선 간단한 경우들에 대한 풀이법을 발견하는 것으로부터 시작한다.**
- 리스트를 예로 들어보면,
  1. 처음에는 원소 하나를 갖는 리스트로부터 시작한다.
  2. 다음에는 원소를 두 개가 들어 있는 리스트에 대한 풀이법을 찾고,
  3. 그 다음에는 세 개 원소를 갖는 리스트에 대한 풀이법을 찾는다.
  4. 이런 식으로 계속해 나간다.
- 📌 **이 접근법의 핵심은 , 이전에 풀었던 사례를 확장하여 다음 풀이를 찾는다는 점이다.**

## **하향식 접근법 (top-down approach)**
- 해당 접근법은 덜 명확해서 복잡해 보일 수 있다.
- 이러한 문제들은 **어떻게 하면 `N`에 대한 문제를 부분 문제로 나눌 수 있을지 생각해 봐야 한다.**
- 나뉜 부분 문제의 경우가 서로 겹치지 않도록 주의한다.

## **반반 접근법 (half-and-half approach)**
- 위에 소개된 2개의 접근법 외에 데이터를 절반으로 나누는 방법도 종종 유용하다.
- **이진 탐색**은 **반반 접근법**을 이용한 탐색 방법이다.
- **병합 정렬** 또한 **반반 접근법**을 이용한 정렬 방법이다.
  - 배열 절반을 각각 정렬한 뒤 이들을 하나로 병합한다.

## **동적계획법 & 메모이제이션**
- **동적 프로그래밍은 거의 대부분 재귀적 알고리즘과 반복적으로 호출되는 부분문제를 찾아내는 것이 관건이다.**
- 이를 찾은 뒤에는 나중을 위해 현재 결과를 캐시에 저장해 놓으면 된다.

### Recursive Fibo

![](../../assets/images/books/codingInterview/Fibo.png)

```java
int fibo(int i){
    if (i == 0) return 0;
    if (i == 1) return 1;
    return fibo(i - 1) + fibo(i - 2);
}
```

- 트리의 말단 노드는 기본 경우인 `fibo(1)`아니면 `fibo(0)`인 것을 알 수 있다.
- **각 호출에 소요되는 시간이 `O(1)`이므로 트리의 전체 노드의 개수와 수행 시간은 같다.**
- **O(2<sup>n</sup>)** 개의 노드를 갖게 되며 총 호출 횟수가 수행 시간이 된다.

### 하향식 동적 프로그래밍 (메모이제이션)
- **`fibo(i)`를 계산할 때 마다 이 결과를 캐시에 저장하고 나중에는 저장된 값을 사용하는 것이 좋다.**

```java
public int fibo(int i){
    if (i == 0) return 0;
    else if (i == 1) return 1;
    else if (memo[i] != 0) return memo[i];
    return memo[i] = fibo(i - 1) + fibo(i - 2);
}
```

![](../../assets/images/books/codingInterview/memoFibo.png)

- **사각형 부분은 캐시값을 그대로 사용한 부분이며 , `O(N)` 수행 시간이 걸린다.**


### 상향식 동적 프로그래밍

```java
public int fibo(int n){
    if(n == 0) return 0;
    else if(n == 1) return 1;
    int[] memo = new int[n];
    memo[0] = 0;
    memo[1] = 1;
    for(int i = 2 ; i < n ; i++){
        memo[i] = memo[i - 1] + memo[i - 2];
    }
    return memo[n - 1] + memo[n - 2];
}
```

- `fibo(0)` 과 `fibo(1)`을 계산하고 , 이 둘을 이용해(이전의 결과를 이용해) 위로 점차 올라간다.
- `memo[i]`는 `memo[i + 1]` 과 `memo[i + 2]`를 계산할 때만 사용될 뿐 , 그 뒤에는 전혀 사용되지 않는다.
  - 따라서 `memo` 배열 말고 변수 몇 개를 사용해서 풀 수도 있다.


```java
public int fibo(int n){
    if(n == 0) return 0;
    int a = 0;
    int b = 1;
    for(int i = 2 ; i < n ; i++){
        int c = a + b;
        a = b;
        b = c;
    }
    return a + b;
}
```

- 피보나치 수열의 마지막 숫자 두 개를 `a`와 `b`변수에 저장하도록 바꾼 결과다.

***

# **다익스트라 알고리즘**
- 그래프의 간선에 가중치를 부여돼어있을 때 , `현재 위치에서 목표 위치까지 최단 경로`는 ? **다익스트라 알고리즘**
- 📌 **사이클이 있을수도 있는 가중 방향 그래프에서 두 지점간의 최단 경로를 찾는 방법이다.**
- **동작 원리**
  1. `s`에서 시작한다．
  2. `s`의 유출 간선의 개수만큼 우리 자신을 복제한 뒤 해당 간선을 걸어간다.`(s, x)`
  의 가중치가 `5`라면 `x`에 도달하는 데 실제로 **5분**이 걸린다는 뜻이다．
  3. **노드에 도착하면 이전에 누가 방문했었는지 확인한다. 만약 방문했었다면 거기
  서 멈춘다.** `s`에서 시작한 다른 누군가가 이미 우리보다 빨리 도착했기 때문에
  자동으로 현재 경로는 다른 경로보다 더 빠를 수 없게 된다. **아무도 도착한 적
  이 없다면 , 다시 우리 자신을 복제한 뒤 가능한 모든 경로로 나아간다.**
  4. 먼저 `t`에 도착하는사람이 이긴다.

## 예제

![](../../assets/images/books/codingInterview/dijkstra.png)

|    |**a**|**b**|**c**|**d**|**e**|**f**|**g**|**h**|**i**|
|----|---|---|---|---|---|---|---|---|---|
|**a**|0|5|3||2|||||
|**b**||0||2||||||
|**c**||1|0|1||||||
|**d**|1|||0|||2|1||
|**e**|1||||0|||4|7|
|**f**||3||||0|1|||
|**g**|||3||||0||2|
|**h**|||2||||2|0||
|**i**|||||||||0|


- `path_weight[node]` : 시작 지점에서 `node`로의 최단 경로의 길이가 적혀있다.
  - `path_weight[0]`만 **0**으로 초기화 되어 있고 , 나머지는 모두 무한대 값으로 초기화 된다.
- `previous[node]` : 현재까지의 최단 경로가 주어졌을 때 , 각 노드를 방문하기 이전 노드의 정보가 적혀있다.
- `remaining` : **모든 노드에 대한 우선순위 큐 이다.**
  - 각 노드의 우선순위는 `path_weight`에 의해 정의된다.
- **`remaining`이 빌 때까지 노드를 꺼내 와서 다음을 수행한다.**
    1. `remaining`에서 `path_weight`가 가장 작은 노드를 선택한다.
       - 이노드를 `n`이라 하자.
    2. 📌 **인접한 노드들에 대해서 `path_weight[x]`(현재까지의 `a`에서 `x`로의 최단 경로)와 `path_weight[n] + edge_weight[(n , x)]`를 비교한다.**
        - `a`에서 `x`로 가는 현재까지의 경로보다 더 짧은 경로가 존재한다면 , `path_weight`와 `previouse`를 갱신한다.
    3. `remaining`에서 `n`을 삭제한다.
    4. `remaining`이 비면 `path_weight`에는 `a`에서 각각의 노드로의 최단 경로의 거리가 들어있게 된다.
- **위의 `previous`를 쫓아가면서 최단 경로를 재구성할 수 있다.**
    1. `n`의 첫번째 값은 `a`가 된다. 인접한 노드 `(b , c , e)`를 보고 `path_weight (각각 5 , 3 , 2)` 와 `previous(a)`를 갱신하고 `remaining`에서 `a`를 삭제한다.
    2. 그 다음으로 작은 노드인 `e`를 선택한다. `path_weight[e]`를 2로 갱신했었다. `e`의 인접한 노드는 `h`,`i`이므로 `path_weight (각각 6 , 2)`와 `previous`를 갱신한다. 6은 `path_weight[e](2) + (e , h)(4)`의 결과이다.
    3. 그 다음으로 작은 노드는 3인 `c`이다. 인전합 노드는 `b`와 `d`이다. `path_weight[d]`는 무한대 값이므로 4로 갱신한다. `path_weight[c] + weight(c , d)`, `path_weight[b]`는 이전에 5였지만 , `path_weight[c] + weight(c , b) (3+1=4)`가 5보다 작으므로 `path_weight[b]`는 4로 갱신되고 `previous`는 `c`로 갱신된다.
       - `a`에서 `b`로 가는 경로가 `c`를 통해서 가는 경로로 개선되었다는 뜻이다.
- 아래의 다이어그램은 `path_weight`(왼쪽)와 `previous`(오른쪽)가 변하는 것을 단계별로 보여준다.


![](../../assets/images/books/codingInterview/dijkstraDiagram.png)
