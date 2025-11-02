---
title: 'Queue'
date: '2023-08-15'
tags: ['Data Structure', 'Algorithm']
---

### Preliminary

큐(Queue)는 FIFO (First-In, First-Out) 원리를 따르는 선형 자료구조입니다. 먼저 들어온 데이터가 먼저 처리되는 구조로, 현실의 줄서기(waiting line)와 같은 방식입니다.

$$
\begin{aligned}
&Q = [x_1, x_2, \dots, x_n],\\
&enqueue(x_{n+1}) \Rightarrow [x_1, x_2, \dots, x_{n+1}], \\
&dequeue(Q) \Rightarrow [x_1, \dots, x_n]
\end{aligned}
$$

---

### 주요 연산 및 시간 복잡도

| 연산 | 설명 | 시간복잡도 |
|------|------|-------------|
| enqueue | 큐의 뒤(rear)에 데이터 삽입 | $O(1)$ |
| dequeue | 큐의 앞(front)에서 데이터 삭제 | $O(1)$ |
| peek | front의 원소 조회 | $O(1)$ |
| isEmpty | 큐가 비었는지 확인 | $O(1)$ |

큐의 모든 연산은 양 끝에서만 수행되므로 인덱스 기반 임의 접근은 불가능합니다.

---

### 큐의 구현 방식

#### 1. 배열 기반 큐 (Array Queue)

고정 크기의 배열을 이용해 큐를 구성합니다. front와 rear 포인터를 이동시키며 삽입과 삭제를 수행합니다.

$$
Q = [\_, 10, 20, 30, \_, \_] \Rightarrow front=1, rear=3
$$

단, 배열의 크기가 제한되어 있으며, 삭제 시 앞의 공간이 비더라도 재사용이 어렵습니다.

#### 2. 원형 큐 (Circular Queue)

배열의 끝과 처음을 연결하여, 공간 낭비를 방지합니다.

$$
rear = (rear + 1) \bmod N, \quad front = (front + 1) \bmod N
$$

$\Rightarrow$ 공간이 가득 차면 Overflow  

$\Rightarrow$ front와 rear가 같으면 Underflow

원형 큐는 고정된 배열 구조에서 메모리 활용 효율을 높이는 방법으로 자주 사용됩니다.

#### 3. 연결 리스트 기반 큐 (Linked Queue)

노드를 동적으로 할당하여 큐를 구성합니다. 삽입은 rear 포인터, 삭제는 front 포인터를 사용합니다.

$$
[front] \rightarrow [10|next] \rightarrow [20|next] \rightarrow [30|NULL] \Leftarrow [rear]
$$

메모리 재활용이 가능하며, 고정 크기 제약이 없습니다.

---

### 우선순위 큐 (Priority Queue)

큐의 각 원소가 우선순위(priority)를 가지고 있으며, 일반적인 FIFO 대신 우선순위가 높은 원소가 먼저 처리됩니다.

$$
Q = [(A,3), (B,1), (C,2)] \Rightarrow \text{dequeue}() \Rightarrow (A,3)
$$

이 구조는 힙(Heap)으로 구현됩니다.

$\Rightarrow$ 삽입: $O(\log n)$  

$\Rightarrow$ 삭제(최대/최소 추출): $O(\log n)$  

$\Rightarrow$ 접근: $O(1)$

#### 수학적 정의

$$
\text{PriorityQueue} = \{ (x_i, p_i) \mid p_i \in \mathbb{R},\ \text{정렬 기준 } p_i \}
$$

$$
\text{dequeue}() = \arg\max_{x_i}(p_i)
$$

---

### 대기행렬 이론 (Queueing Theory)

큐는 단순한 프로그래밍 개념을 넘어, 확률적 대기 시스템(Stochastic Service System)의 핵심 수학적 모델이 됩니다.

$$
\text{M/M/1 Queue}
$$

$$
\lambda = \text{평균 도착률 (arrival rate)}, \quad \mu = \text{평균 서비스율 (service rate)}
$$

#### 평균 대기시간 (Little’s Law)

$$
L = \lambda W
$$

$\Rightarrow$ $L$ : 시스템 내 평균 고객 수  

$\Rightarrow$ $W$ : 고객의 평균 체류 시간  

#### 평균 큐 길이

$$
L_q = \frac{\rho^2}{1 - \rho}, \quad \rho = \frac{\lambda}{\mu}
$$

이와 같은 확률적 모델은 서버 부하 예측, OS 스케줄러 설계, 네트워크 트래픽 분석 등에 응용됩니다.

---

### 큐의 한계와 최적화

$\Rightarrow$ 고정 크기 큐에서는 Overflow/Underflow 발생  

$\Rightarrow$ 높은 삽입 빈도 시 Lock Contention(멀티스레드 환경) 발생  

---

### 참고 자료

[원본 경로 #1](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-046j-design-and-analysis-of-algorithms-spring-2015/) 

[원본 경로 #2](https://cs144.github.io/)  

[원본 경로 #3](https://cs162.org/)
