---
title: 'Graph'
date: '2023-08-29'
tags: ['Data Structure', 'Algorithm']
---

### Preliminary

그래프(Graph)는 정점(Vertex)과 간선(Edge)의 집합으로 이루어진 비선형 자료구조입니다.

$$
G = (V, E)
$$

여기서  
$\Rightarrow$ $V = \{v_1, v_2, \ldots, v_n\}$ : 정점 집합  

$\Rightarrow$ $E \subseteq V \times V$ : 간선 집합  

$\Rightarrow$ $|V| = n, |E| = m$

방향성이 있는 그래프를 유향 그래프(Directed Graph), 없는 경우 무향 그래프(Undirected Graph)라 한다.

---

### 그래프의 종류

| 종류 | 설명 |
|------|------|
| 무향 그래프 (Undirected Graph) | 간선에 방향이 없음 |
| 유향 그래프 (Directed Graph) | 간선에 방향이 존재 |
| 가중 그래프 (Weighted Graph) | 각 간선에 가중치 $w(u,v)$ 가 부여됨 |
| 완전 그래프 (Complete Graph) | 모든 정점이 서로 연결됨 |
| 연결 그래프 (Connected Graph) | 임의의 두 정점 사이에 경로가 존재함 |
| 트리(Tree) | 사이클이 없는 연결 그래프 |
| DAG (Directed Acyclic Graph) | 방향성이 있으며 사이클이 없는 그래프 |
| 이분 그래프 (Bipartite Graph) | 정점을 두 집합으로 분할할 수 있고, 간선은 다른 집합의 정점끼리만 연결됨 |

---

### 그래프의 표현 방식

#### 1. 인접 행렬 (Adjacency Matrix)

$$
A[i][j] = 
\begin{cases}
1, & (v_i, v_j) \in E \\
0, & \text{otherwise}
\end{cases}
$$

공간 복잡도: $O(n^2)$

장점: 간선 유무 확인이 $O(1)$

단점: 희소 그래프(Sparse Graph)에 비효율적

#### 2. 인접 리스트 (Adjacency List)

각 정점에 연결된 인접 정점들을 리스트 형태로 저장합니다.  

공간 복잡도: $O(n + m)$  

희소 그래프에 효율적이며, 탐색 연산이 빠릅니다.

---

### 그래프의 기본 연산

| 연산 | 설명 | 평균 시간 복잡도 |
|------|------|------------------|
| 탐색 (Search) | DFS, BFS | $O(V + E)$ |
| 간선 추가 | 두 정점 사이 간선 삽입 | $O(1)$ |
| 간선 삭제 | 간선 제거 | $O(E)$ |
| 인접 노드 조회 | 특정 정점의 인접 리스트 탐색 | $O(\deg(v))$ |

---

### 그래프 탐색 알고리즘

#### 1. 깊이 우선 탐색 (Depth-First Search, DFS)

루트 노드에서 시작해 한 경로를 끝까지 탐색 후, 백트래킹하는 방식입니다. 스택(또는 재귀 호출)을 이용합니다.

수학적 관점에서 DFS는 재귀적 그래프 순회 함수이며, 재귀식은 다음과 같습니다.

$$
DFS(v) =
\begin{cases}
\text{visit}(v), \\
\forall (v, u) \in E, \text{ if } u \text{ not visited, } DFS(u)
\end{cases}
$$

시간복잡도: $O(V + E)$

#### 2. 너비 우선 탐색 (Breadth-First Search, BFS)

루트에서 가까운 노드부터 차례로 탐색하는 방식으로 큐(Queue)를 이용하며, 최단 경로 탐색에 활용됩니다.

$$
\text{BFS}(v) =
\text{enqueue}(v), \;
\text{while } Q \neq \emptyset :
\text{dequeue}(x), \;
\forall (x,u) \in E \text{ then enqueue}(u)
$$

시간복잡도: $O(V + E)$

---

### 최소 신장 트리 (Minimum Spanning Tree, MST)

가중치 그래프에서 모든 정점을 연결하되, 전체 간선의 가중치 합이 최소가 되는 트리를 찾는 문제입니다.

#### 1. Kruskal 알고리즘

$\Rightarrow$ 간선을 가중치 오름차순으로 정렬  

$\Rightarrow$ 사이클이 생기지 않게 간선을 추가 (Union-Find 사용)  

시간복잡도: $O(E \log E)$

#### 2. Prim 알고리즘

$\Rightarrow$ 하나의 정점에서 시작  

$\Rightarrow$ 현재 트리에서 가장 가까운 정점을 반복적으로 추가  

시간복잡도: $O(E \log V)$ (힙 사용 시)

---

### 최단 경로 알고리즘 (Shortest Path)

#### 1. Dijkstra 알고리즘

음수 가중치가 없는 그래프에서 한 정점으로부터의 최단 경로를 찾습니다. 우선순위 큐를 이용합니다.

$$
d[v] = \min(d[v], d[u] + w(u,v))
$$

시간복잡도: $O((V + E)\log V)$

#### 2. Bellman-Ford 알고리즘

음수 가중치 허용, 음수 사이클 검출 가능합니다.

$$
d[v] = \min(d[v], d[u] + w(u,v)), \; \forall (u,v) \in E
$$

시간복잡도: $O(VE)$

#### 3. Floyd-Warshall 알고리즘

모든 정점 쌍 간 최단 경로를 구하는 동적 계획법 기반 알고리즘입니다.

$$
D^{(k)}[i][j] = \min(D^{(k-1)}[i][j], D^{(k-1)}[i][k] + D^{(k-1)}[k][j])
$$

시간복잡도: $O(V^3)$

---

### 시간 및 공간 복잡도 요약

| 알고리즘 | 시간 복잡도 | 공간 복잡도 | 특징 |
|-----------|---------------|--------------|------|
| DFS | $$O(V + E)$$ | $$O(V)$$ | 깊이 우선 탐색 |
| BFS | $$O(V + E)$$ | $$O(V)$$ | 최단 경로 탐색 |
| Dijkstra | $$O((V + E)\log V)$$ | $$O(V)$$ | 음수 가중치 불가 |
| Bellman-Ford | $$O(VE)$$ | $$O(V)$$ | 음수 가중치 허용 |
| Floyd-Warshall | $$O(V^3)$$ | $$O(V^2)$$ | 모든 쌍 최단 경로 |
| Kruskal | $$O(E\log E)$$ | $$O(V)$$ | 최소 신장 트리 |
| Prim | $$O(E\log V)$$ | $$O(V)$$ | MST, 힙 기반 |

---

### 참고 자료

[원본 경로 #1](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/) 

[원본 경로 #2](https://web.stanford.edu/class/archive/cs/cs161/cs161.1232/)  

[원본 경로 #3](https://cs170.org/)
