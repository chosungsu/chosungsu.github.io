---
title: 'Array'
date: '2023-08-04'
tags: ['Data Structure', 'Algorithm']
---

### Preliminary

배열(Array)은 동일한 자료형의 데이터를 연속된 메모리 공간에 저장하는 선형 자료구조입니다. 핵심은 인덱스 기반 접근으로, 원소의 메모리 주소를 산술적으로 계산하여 $O(1)$ 시간에 접근 가능합니다.

$$
\text{Address}(A[i]) = \text{Base}(A) + i \times \text{size\_of(element)}
$$

이 수식은 배열이 등차수열적 메모리 배치를 가진다는 사실을 의미하며, 모든 원소가 동일 간격으로 배치됩니다.

---

### 시간 복잡도 분석

| 연산 | 평균 시간복잡도 | 설명 |
|------|------------------|------|
| 접근 (Access) | $O(1)$ | 인덱스로 직접 접근 가능 |
| 탐색 (Search) | $O(n)$ | 순차 검색 필요 |
| 삽입 (Insertion) | $O(n)$ | 중간 요소 이동 필요 |
| 삭제 (Deletion) | $O(n)$ | 이동 발생 |

끝에서 삽입/삭제 시에는 $O(1)$로 최적화 가능합니다.

---

### 메모리 구조와 캐시 지역성(Locality)

배열은 공간 지역성(Spatial Locality)을 극대화합니다. CPU 캐시는 인접 메모리를 한 번에 가져오기 때문에 순차 접근이 효율적입니다.

$$
\text{Cache Miss Rate} \propto \frac{\text{stride}}{\text{cache line size}}
$$

stride가 커질수록 캐시 미스율이 증가하므로, 연속 접근이 성능에 유리합니다. 예컨대 행 우선(row-major) 저장에서 열 단위 접근(column-major)은 비효율적입니다.

---

### 다차원 배열 (Multi-dimensional Array)

$n$차원 배열의 원소 $A[i_1][i_2] \ldots [i_n]$의 주소는 다음과 같습니다.

$$
\begin{aligned}
& \text{Address}(A[i_1, i_2, \ldots, i_n]) \\
&= \text{Base}(A) + \sum_{k=1}^{n} i_k \times \prod_{l=k+1}^{n} N_l
\end{aligned}
$$

여기서 $N_l$은 각 차원의 크기이며, 이는 텐서 인덱싱(Tensor Indexing)과 동일한 개념입니다. 실제로 PyTorch나 TensorFlow에서 텐서의 메모리 레이아웃 계산 시 이 원리를 따릅니다.

---

### 배열과 벡터의 수학적 대응 관계

배열은 수학적으로 다음과 같이 해석할 수 있습니다.

$$
A = [a_1, a_2, \ldots, a_n] \in \mathbb{R}^n
$$

즉, 배열은 벡터 공간의 한 원소이며, 선형대수학의 내적·노름·투영 연산이 적용됩니다.

$$
\mathbf{a} \cdot \mathbf{b} = \sum_{i=1}^{n} a_i b_i
$$

이는 실제로 ```numpy.dot()``` 또는 BLAS 수준의 벡터 연산으로 구현됩니다.

---

### 희소 배열 (Sparse Array)

대부분의 원소가 0인 배열은 희소 표현(Sparse Representation)으로 전환하여 공간 효율을 높입니다.

#### 대표 형식
$\Rightarrow$ $COO (Coordinate Format)  

$$
\text{COO} = \{(i, j, A_{ij}) \mid A_{ij} \neq 0\}
$$

$\Rightarrow$ CSR (Compressed Sparse Row)

values, indices, indptr 배열로 분리하여 비제로 원소만 저장합니다.

희소 행렬 곱셈의 복잡도는 $O(k n)$이며, 이는 $k$가 비제로 원소 수일 때 $k \ll n^2$인 경우에 유리합니다.

---

### 배열 기반 알고리즘의 최적화 원리

배열 기반 연산의 성능은 메모리 접근 패턴과 벡터화(Vectorization) 정도에 크게 의존합니다.

#### 1. 루프 벡터화 (Loop Vectorization)

컴파일러는 stride=1이며 의존성이 없는 루프를 SIMD 명령어로 변환할 수 있습니다.

$$
\text{stride} = 1 \quad \text{and} \quad \text{no dependency between iterations}
$$

#### 2. 메모리 정렬 (Memory Alignment)

주소가 8, 16, 32바이트 경계로 정렬되면 접근 효율이 높아집니다.

$$
\text{address}(A[i]) \bmod 16 = 0
$$

---

### 배열 연산의 선형대수적 해석

배열은 선형연산의 기본 단위입니다. 예를 들어 행렬 곱셈은 다음과 같습니다.

$$
C_{ij} = \sum_{k=1}^{n} A_{ik} B_{kj}
$$

캐시 효율을 고려하면 $A$는 행 순서, $B$는 열 순서로 접근하는 것이 바람직합니다. 이 접근 방식은 실제로 BLAS Level-3 (GEMM) 구현의 핵심입니다.

---

### 텐서로의 일반화

배열은 차원을 확장하여 텐서(Tensor)로 일반화됩니다.

$$
T \in \mathbb{R}^{N_1 \times N_2 \times \ldots \times N_n}
$$

각 원소 접근은 다음과 같이 계산됩니다.

$$
T[i_1, i_2, \ldots, i_n] = \sum_{k=1}^{n} W_k \prod_{j=k+1}^{n} i_j
$$

이는 고차원 데이터(영상, 음성, 시계열 등)를 모델링하는 딥러닝의 기본 구조입니다.

---

### 응용 예시

$\Rightarrow$ 정렬 알고리즘 입력

QuickSort, MergeSort, HeapSort는 모두 배열 기반이며 인덱스 접근 효율성이 중요합니다.

$\Rightarrow$ 시계열 분석

$$
X(k) = \sum_{n=0}^{N-1} x(n)e^{-j2\pi kn/N}
$$

배열 기반으로 FFT(고속 푸리에 변환)를 수행합니다.

---

### 한계와 대안

$\Rightarrow$ 고정 크기 구조로 동적 삽입/삭제 비효율

$\Rightarrow$ 다차원 접근 시 stride 불일치 문제

$\Rightarrow$ 메모리 오버헤드 및 alignment 손실

이러한 제약으로부터 Linked List, Dynamic Array(Vector), Sparse Matrix 등이 발전하였습니다.

---

### 참고 자료

[원본 경로 #1](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/) 

[원본 경로 #2](https://see.stanford.edu/Course/CS106B)  

[원본 경로 #3](https://numpy.org/devdocs/user/basics.memory.html)
