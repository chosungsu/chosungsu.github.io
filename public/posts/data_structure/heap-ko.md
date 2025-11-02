---
title: 'Heap'
date: '2023-08-22'
tags: ['Data Structure', 'Algorithm']
---

### Preliminary

힙(Heap)은 완전 이진 트리(Complete Binary Tree) 형태의 자료구조로, 부모 노드가 자식 노드보다 항상 크거나(최대 힙, Max Heap), 항상 작도록(최소 힙, Min Heap) 정렬되어 있는 특성을 가집니다.

$$
\text{Max Heap: } A[\text{parent}(i)] \geq A[i]
$$

$$
\text{Min Heap: } A[\text{parent}(i)] \leq A[i]
$$

이러한 성질 덕분에 힙은 우선순위 큐(Priority Queue)의 효율적 구현에 널리 사용됩니다. 또한 힙 정렬(Heap Sort)은 정렬 알고리즘 중 안정적 성능($O(n \log n)$)을 보장합니다.

---

### 힙의 구조적 특성

힙은 다음 두 가지 속성을 만족합니다.

$\Rightarrow$ 형태 속성 (Shape Property)

트리는 완전 이진 트리 형태를 유지해야 합니다. 즉, 마지막 레벨을 제외한 모든 레벨이 꽉 차 있으며, 마지막 레벨은 왼쪽부터 채워집니다.

$\Rightarrow$ 힙 속성 (Heap Property)  

각 노드의 키 값이 부모 노드와 자식 노드 사이에서 순서를 유지해야 합니다.

$$
\forall i,\  \text{key}(\text{parent}(i)) \ge \text{key}(i) \quad (\text{Max Heap})
$$

---

### 힙의 인덱스 구조

힙은 트리 형태지만 배열(Array)로 효율적으로 표현할 수 있습니다.

| 관계 | 수식 |
|------|------|
| 부모 인덱스 | $$\text{parent}(i) = \lfloor i/2 \rfloor$$ |
| 왼쪽 자식 | $$\text{left}(i) = 2i$$ |
| 오른쪽 자식 | $$\text{right}(i) = 2i + 1$$ |

예를 들어, 배열 

$$
A = [16, 14, 10, 8, 7, 9, 3, 2, 4, 1]
$$ 

은 다음과 같은 힙을 나타냅니다.  

$$
16 \rightarrow (14, 10) \rightarrow (8, 7, 9, 3) \rightarrow (2, 4, 1)
$$

---

### 힙의 연산 및 시간 복잡도

| 연산 | 설명 | 시간 복잡도 |
|------|------|--------------|
| heapify | 트리의 부분 구조를 힙으로 변환 | $O(\log n)$ |
| build-heap | 배열 전체를 힙 구조로 변환 | $O(n)$ |
| insert | 새 원소 삽입 후 힙 속성 복구 | $O(\log n)$ |
| extract-max/min | 루트 원소 제거 후 복구 | $O(\log n)$ |
| peek | 루트 값 확인 | $O(1)$ |

---

### 힙 구성 알고리즘 (Build-Heap)

주어진 배열 $A[1 \ldots n]$을 힙으로 변환하는 과정입니다. 하향식 삽입보다 상향식(Heapify Down)접근이 효율적입니다.

$\Rightarrow$ 비리프(Non-leaf) 노드부터 시작  

$\Rightarrow$ 각 노드에 대해 자식과 비교하여 힙 속성을 만족하도록 교환  

$\Rightarrow$ 루트까지 반복

$$
\text{for } i = \lfloor n/2 \rfloor \text{ downto } 1: \text{heapify}(A, i)
$$

---

### 피보나치 힙의 수학적 분석

피보나치 힙(Fibonacci Heap)은 암묵적 트리 집합으로 구성되어 삽입, 최소 추출, 키 감소 연산의 평균 시간복잡도를 개선합니다.

| 연산 | 평균 시간 | 최악 시간 |
|------|-------------|------------|
| insert | $$O(1)$$ | $$O(\log n)$$ |
| find-min | $$O(1)$$ | $$O(1)$$ |
| extract-min | $$O(\log n)$$ | $$O(\log n)$$ |
| decrease-key | $$O(1)$$ | $$O(\log n)$$ |

#### 노드 개수와 높이의 관계

$$
n \ge F_{h+2} - 1
$$

여기서 $$F_k$$ 는 k번째 피보나치 수열 원소입니다. 이 식을 통해 힙의 높이가 $$O(\log_\phi n)$$ (φ는 황금비)임을 유도할 수 있습니다.

---

### 참고 자료

[원본 경로 #1](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/) 

[원본 경로 #2](https://web.stanford.edu/class/archive/cs/cs161/cs161.1232/)  

[원본 경로 #3](https://sp21.datastructur.es/)
