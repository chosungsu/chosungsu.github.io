---
title: 'Linked List'
date: '2023-08-08'
tags: ['Data Structure', 'Algorithm']
---

### Preliminary

연결 리스트(Linked List)는 노드(Node)들의 집합으로, 각 노드는 데이터(data)와 다음 노드의 주소(pointer)를 포함합니다. 배열과 달리 메모리 상에서 연속적으로 배치되지 않으며, 동적 크기 조정이 가능하다는 점에서 유연성이 높습니다.

$$
\text{Node}_i = (data_i, next_i)
$$

연결 리스트의 핵심은 포인터 기반 탐색과 연결 구조의 유지입니다.

---

### 기본 구조

#### 1. 단일 연결 리스트 (Singly Linked List)

각 노드는 다음 노드의 포인터 하나를 가지며 마지막 노드는 `NULL` 포인터를 가리킵니다.

$$
[data_1|next] \rightarrow [data_2|next] \rightarrow [data_3|NULL]
$$

#### 2. 이중 연결 리스트 (Doubly Linked List)

각 노드는 이전(`prev`)과 다음(`next`) 포인터를 모두 가집니다.

$$
[NULL|data_1|next] \leftrightarrow [prev|data_2|next] \leftrightarrow [prev|data_3|NULL]
$$

#### 3. 원형 연결 리스트 (Circular Linked List)

마지막 노드의 `next`가 첫 번째 노드를 가리켜 순환 구조를 이룹니다.

$$
[data_1|next] \rightarrow [data_2|next] \rightarrow [data_3|next] \rightarrow (back\ to\ data_1)
$$

---

### 시간 복잡도

| 연산 | 평균 시간복잡도 | 설명 |
|------|------------------|------|
| 탐색 (Search) | $O(n)$ | 순차적으로 이동 필요 |
| 삽입 (Insertion) | $O(1)$ | 노드 포인터 조작만 필요 |
| 삭제 (Deletion) | $O(1)$ | 노드 포인터 변경만 수행 |

단, 삽입/삭제는 해당 노드의 포인터를 이미 알고 있는 경우에만 $O(1)$입니다. 임의 접근(Random Access)는 불가능합니다.

---

### 메모리 구조

연결 리스트는 비연속 메모리 블록으로 구성됩니다. 따라서 캐시 효율성은 낮지만, 동적 메모리 할당에 유리합니다.

$$
\text{Address}(Node_i) = \text{malloc}(sizeof(Node))
$$

이는 힙(Heap) 메모리 영역에 각 노드가 산재함을 의미합니다.

#### 장점

$\Rightarrow$ 삽입/삭제 시 데이터 이동이 불필요

$\Rightarrow$ 동적 크기 조절 가능

#### 단점

$\Rightarrow$ 인덱스 접근 불가

$\Rightarrow$ 추가 포인터 저장으로 인한 메모리 오버헤드 발생

---

### 수학적 모델링

연결 리스트는 유향 그래프(directed graph)로 모델링할 수 있습니다. 노드를 정점(Vertex), 포인터를 간선(Edge)으로 간주하면 다음과 같습니다.

$$
G = (V, E), \quad V = \{v_1, v_2, ..., v_n\}, \quad E = \{(v_i, v_{i+1})\}
$$

이 때, 단일 연결 리스트는 비순환 그래프(DAG), 원형 연결 리스트는 사이클 그래프(Cycle Graph)에 해당합니다.

---

### 고급 구조 및 변형

#### 1. Skip List

다단계 인덱스를 두어 탐색 복잡도를 $O(\text{log} n)$ 으로 줄인 구조입니다. 평균적 탐색 단계는 다음과 같습니다.

$$
E[h] = \text{log}_{1/p}n
$$

여기서 $p$는 각 레벨에서 노드가 선택될 확률입니다.

#### 2. XOR Linked List

prev 와 next 포인터를 XOR 연산으로 결합하여, 포인터 공간을 절반으로 줄이는 기법입니다.

$$
link=prev \oplus next
$$

복원 시,

$$
next=prev \oplus link
$$

이 방식은 메모리 절약 효과가 있으나, 디버깅과 GC(가비지 컬렉션)에 불리합니다.

---

### 동적 메모리 관리

연결 리스트는 삽입/삭제 시마다 동적 메모리 할당을 수행합니다. 이로 인해 실제 성능은 할당/해제 비용에 크게 의존합니다.

$$
T_{insert}=O(1)+T_{alloc}
$$	​

C/C++에서는 malloc/free, Python에서는 gc 기반 객체 관리가 수행됩니다.

---

### 한계와 개선 방향

$\Rightarrow$ 포인터 구조로 인한 메모리 파편화(Fragmentation)

$\Rightarrow$ 무작위 접근(Random Access) 불가능

$\Rightarrow$ 포인터 오류 및 dangling pointer 위험

이를 해결하기 위한 Hybrid Memory Models (e.g., Rope, Gap Buffer) 및 컨테이너 추상화(Vector + List 혼합 구조)가 연구되고 있습니다.

---

### 참고 자료

[원본 경로 #1](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/) 

[원본 경로 #2](https://web.stanford.edu/class/cs166/)  

[원본 경로 #3](https://www.cs.cmu.edu/~15122/)
