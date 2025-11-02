---
title: 'Stack'
date: '2023-08-11'
tags: ['Data Structure', 'Algorithm']
---

### Preliminary

스택(Stack)은 LIFO (Last-In, First-Out) 구조를 가지는 선형 자료구조입니다. 가장 마지막에 삽입된 원소가 가장 먼저 삭제됩니다.

$$
\begin{aligned}
&S = [x_1, x_2, \ldots, x_n], \\
&\text{push}(S, x_{n+1}) \Rightarrow [x_1, ..., x_n, x_{n+1}] \\
&\text{pop}(S) \Rightarrow [x_1, ..., x_{n-1}]
\end{aligned}
$$

스택은 순환되지 않는 단방향 구조이며, 한쪽(top) 끝에서만 삽입(push)과 삭제(pop)이 이루어집니다.

---

### 주요 연산 및 시간 복잡도

| 연산 | 설명 | 시간복잡도 |
|------|------|-------------|
| push | 요소를 top에 삽입 | $O(1)$ |
| pop | top에서 요소 제거 | $O(1)$ |
| peek(top) | top의 요소를 반환 | $O(1)$ |
| isEmpty | 스택이 비었는지 확인 | $O(1)$ |

스택은 배열(Array) 또는 연결 리스트(Linked List)로 구현될 수 있습니다.

$\Rightarrow$ 배열 기반 스택: 인덱스 연산을 통해 빠른 접근 가능하지만, 크기 고정  

$\Rightarrow$ 연결 리스트 기반 스택: 크기 가변적이며 overflow가 없음

---

### 메모리 구조와 동작 원리

스택은 프로그램 실행 중 호출 스택(Call Stack) 형태로 실제 메모리에서 동작합니다.

$\Rightarrow$ 각 함수 호출 시, 스택 프레임(Stack Frame)이 생성됩니다.

$\Rightarrow$ 프레임에는 지역 변수, 매개변수, 반환 주소 등이 저장됩니다.

$\Rightarrow$ 함수가 종료되면 해당 프레임이 pop됩니다.

$$
\text{Stack Frame} = (\text{Local Variables}, \text{Return Address}, \text{Saved Registers})
$$

이러한 구조는 재귀(recursion)와 컨텍스트 관리(context switching)의 기반이 됩니다.

---

### 메모리 및 오버플로우 분석

스택은 정적 크기를 가지므로, 초과된 재귀 호출 또는 무한 루프는 Stack Overflow를 발생시킵니다.

$$
T_{max depth} = \frac{M_{stack}}{S_{frame}}
$$	​

$M_{stack}$ : 총 스택 메모리 크기

$S_{frame}$ : 각 스택 프레임 크기

따라서 깊은 재귀는 Tail Recursion Optimization (TCO) 또는 명시적 스택으로 변환하여 해결할 수 있습니다.

---

### 실제 응용

#### 1. 함수 호출 및 재귀 (Call Stack)

모든 함수 호출은 스택 기반으로 수행됩니다.

#### 2. DFS (깊이 우선 탐색)

그래프 탐색에서 재귀 대신 스택을 사용하여 탐색 상태를 저장합니다.

#### 3. Undo/Redo 시스템

텍스트 편집기, 브라우저 등에서 작업 이력을 스택 형태로 관리합니다.

#### 4. 괄호 유효성 검사

열림 괄호 push, 닫힘 괄호 pop 방식으로 유효성 검증 가능합니다.

#### 5. Backtracking

미로 탐색, 순열 생성 등에서 되돌아가기 경로를 스택에 저장합니다.

---

### 참고 자료

[원본 경로 #1](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-046j-design-and-analysis-of-algorithms-spring-2015/) 

[원본 경로 #2](https://web.stanford.edu/class/archive/cs/cs103/cs103.1206/)  

[원본 경로 #3](https://inst.eecs.berkeley.edu/~cs61c/)
