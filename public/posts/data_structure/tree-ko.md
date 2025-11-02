---
title: 'Tree'
date: '2023-08-25'
tags: ['Data Structure', 'Algorithm']
---

### Preliminary

트리(Tree)는 계층적(hierarchical) 관계를 표현하는 비선형 자료구조입니다. 노드(Node)와 간선(Edge)으로 구성되며, 하나의 루트(Root)에서 시작하여 여러 자식(Child) 노드를 가질 수 있습니다.

$$
T = (V, E)
$$

여기서  
$\Rightarrow$ $V$: 노드의 집합  

$\Rightarrow$ $E$: 노드 간의 연결 관계, $E \subseteq V \times V$  

$\Rightarrow$ 루트 노드는 부모가 없으며, 나머지 모든 노드는 정확히 하나의 부모를 가집니다.

트리는 그래프의 일종이며, 사이클이 없는 연결 그래프(Acyclic Connected Graph)로 정의됩니다.

---

### 트리의 기본 용어

| 용어 | 정의 |
|------|------|
| 루트(root) | 트리의 시작 노드 |
| 부모(parent) | 하위 노드를 가진 노드 |
| 자식(child) | 상위 노드를 가진 노드 |
| 형제(sibling) | 동일 부모를 공유하는 노드 |
| 리프(leaf) | 자식이 없는 노드 |
| 높이(height) | 루트에서 가장 깊은 노드까지의 거리 |
| 깊이(depth) | 루트로부터 특정 노드까지의 거리 |
| 차수(degree) | 노드가 가진 자식의 개수 |

---

### 트리의 수학적 성질

$\Rightarrow$ 간선의 개수

$$
E = V - 1
$$

$\Rightarrow$ 이진 트리의 최대 노드 수

$$
N_{\text{max}} = 2^{h+1} - 1
$$

$\Rightarrow$ 이진 트리의 최소 높이

$$
h_{\text{min}} = \lfloor \log_2 (n) \rfloor
$$

$\Rightarrow$ 평균 깊이(균등 분포에서)

$$
E[\text{depth}] = O(\log n)
$$

---

### 트리의 종류

| 종류 | 설명 |
|------|------|
| 일반 트리 (General Tree) | 임의의 수의 자식을 가질 수 있는 트리 |
| 이진 트리 (Binary Tree) | 각 노드가 최대 2개의 자식을 가짐 |
| 포화 이진 트리 (Full Binary Tree) | 모든 레벨이 꽉 찬 이진 트리 |
| 완전 이진 트리 (Complete Binary Tree) | 마지막 레벨만 왼쪽부터 채워진 트리 |
| 균형 이진 트리 (Balanced Tree) | 모든 노드의 왼·오 자식 높이 차이가 일정 수준 이하 |
| 탐색 트리 (Search Tree) | 키의 정렬 속성을 가진 트리 (예: BST, AVL, Red-Black) |

---

### 트리 순회 (Tree Traversal)

트리의 모든 노드를 특정 순서로 방문하는 과정을 말합니다. 이진 트리에서는 다음 세 가지 기본 순회 방식이 있습니다.

#### 1. 전위 순회 (Preorder)

루트 → 왼쪽 → 오른쪽  

$$
\text{Preorder}(T) = [\text{root}, \text{left subtree}, \text{right subtree}]
$$

#### 2. 중위 순회 (Inorder)

왼쪽 → 루트 → 오른쪽  

$$
\text{Inorder}(T) = [\text{left subtree}, \text{root}, \text{right subtree}]
$$  

이 방식은 이진 탐색 트리(BST)에서 오름차순 정렬 결과를 얻는 데 사용됩니다.

#### 3. 후위 순회 (Postorder)

왼쪽 → 오른쪽 → 루트  

$$
\text{Postorder}(T) = [\text{left subtree}, \text{right subtree}, \text{root}]
$$

#### 4. 레벨 순회 (Level Order)

각 레벨별로 왼쪽에서 오른쪽으로 방문하며, 일반적으로 큐를 이용해 구현합니다.

---

### 이진 탐색 트리 (Binary Search Tree, BST)

이진 탐색 트리는 각 노드의 키가 다음 조건을 만족합니다.

$$
\forall x \in T, \quad \text{key}(L(x)) < \text{key}(x) < \text{key}(R(x))
$$

여기서  
$\Rightarrow$ $L(x)$: 왼쪽 서브트리  

$\Rightarrow$ $R(x)$: 오른쪽 서브트리  

#### BST의 탐색 과정

$\Rightarrow$ 루트에서 시작  

$\Rightarrow$ 찾는 키가 현재 노드보다 작으면 왼쪽, 크면 오른쪽으로 이동  

$\Rightarrow$ 키를 찾거나 리프에 도달할 때까지 반복  

평균 시간복잡도: $O(\log n)$  
최악의 경우(정렬된 입력): $O(n)$

---

### 균형 이진 탐색 트리 (Balanced BST)

탐색, 삽입, 삭제의 효율성을 유지하기 위해 트리의 높이를 $O(\log n)$ 으로 유지하는 것이 핵심입니다.

#### AVL 트리

각 노드의 왼쪽과 오른쪽 서브트리의 높이 차이를 1 이하로 유지합니다.

$$
|\text{height}(L(x)) - \text{height}(R(x))| \le 1
$$

균형이 깨질 경우 회전(Rotation) 연산으로 복구합니다.

| 회전 종류 | 상황 | 설명 |
|------------|------|------|
| LL 회전 | 왼쪽 자식의 왼쪽이 무거움 | 우회전 |
| RR 회전 | 오른쪽 자식의 오른쪽이 무거움 | 좌회전 |
| LR 회전 | 왼쪽 자식의 오른쪽이 무거움 | 좌-우 회전 |
| RL 회전 | 오른쪽 자식의 왼쪽이 무거움 | 우-좌 회전 |

탐색: $O(\log n)$

삽입/삭제: $O(\log n)$

#### Red-Black 트리

레드블랙 트리는 이진 탐색 트리의 일종으로, 노드의 색상(Color)을 이용해 균형을 유지합니다.

$\Rightarrow$ 각 노드는 빨강 또는 검정.  

$\Rightarrow$ 루트는 항상 검정.  

$\Rightarrow$ 모든 리프(NIL)는 검정.  

$\Rightarrow$ 빨강 노드의 자식은 모두 검정.  

$\Rightarrow$ 루트에서 리프까지의 모든 경로는 같은 개수의 검정 노드를 가짐.

#### 수학적 성질

레드블랙 트리의 최대 높이는 AVL 트리보다 약간 높지만 여전히 로그 수준입니다.

$$
h \le 2 \log_2 (n + 1)
$$

즉, 모든 연산은 $$O(\log n)$$ 시간에 수행됩니다.

---

### 공간 및 시간 복잡도

| 연산 | 평균 시간 | 최악 시간 | 공간 복잡도 |
|------|-------------|------------|--------------|
| 탐색(Search) | $$O(\log n)$$ | $$O(n)$$ | $$O(n)$$ |
| 삽입(Insert) | $$O(\log n)$$ | $$O(n)$$ | $$O(1)$$ |
| 삭제(Delete) | $$O(\log n)$$ | $$O(n)$$ | $$O(1)$$ |
| 순회(Traversal) | $$O(n)$$ | $$O(n)$$ | $$O(n)$$ |

---

### 참고 자료

[원본 경로 #1](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/) 

[원본 경로 #2](https://web.stanford.edu/class/archive/cs/cs161/cs161.1232/)  

[원본 경로 #3](https://sp21.datastructur.es/)
