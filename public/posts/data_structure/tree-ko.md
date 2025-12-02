---
title: 'Tree'
date: '2023-08-25'
tags: ['Data Structure', 'lecture']
---

### Preliminary

트리는 그래프의 일종이며, 사이클이 없는 연결 그래프(Acyclic Connected Graph)로 정의됩니다.

이진 탐색 트리(BST)는 매우 이해하기 쉽습니다. 값 $x$를 가진 루트 노드(root node)에서 시작하며, $x$의 왼쪽 서브트리(left subtree)에는 $x$보다 작은 값을 가진 노드가 포함되고, 오른쪽 서브트리(right subtree)에는 $x$보다 크거나 같은 값을 가진 노드가 포함됩니다. 모든 노드는 자체의 왼쪽 및 오른쪽 서브트리에 대해 동일한 규칙을 따릅니다.

---

### 기본 구조

트리가 적당히 균형 잡혀 있다는 가정하에 삽입은 $O(\log n)$ 연산입니다.

삽입 알고리즘은 두 부분으로 나뉩니다. 첫 번째 비재귀 알고리즘은 트리가 비어 있는지 확인하는 핵심 기본 사례를 처리합니다. 트리가 비어 있으면 루트 노드를 생성하고 종료합니다. 다른 모든 경우에는 새 값이 들어갈 트리의 첫 번째 적절한 위치를 찾기 위해 재귀적으로 진행합니다.

새 값(value)이 현재 노드의 값(current.Value)보다 작은지 비교하여 작으면 왼쪽, 크거나 같다면 오른쪽 서브트리로 이동합니다.

BST 탐색은 삽입보다 간단합니다. 이진 분할(binary chop)을 수행하며 실행 시간은 $\mathbf{O(\log n)}$입니다.

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

---

### 참고 자료

[원본 경로 #1](https://mta.ca/~rrosebru/oldcourse/263111/Dsa.pdf)