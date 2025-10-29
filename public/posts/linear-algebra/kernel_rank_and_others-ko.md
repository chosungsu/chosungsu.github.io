---
title: 'Kernel, Rank, and Others'
date: '2023-03-13'
tags: ['Linear algebra', 'lecture']
---

### Inverse of Functions and Kernels

선형 변환 $L: V \to W$가 주어졌을 때, 종종 그것이 역변환 $M: W \to V$을 가지는지 알고 싶어 합니다. 이는 모든 $\mathbf{v} \in V$에 대해 $ML\mathbf{v} = \mathbf{v}$이고, 모든 $\mathbf{w} \in W$에 대해 $LM\mathbf{w} = \mathbf{w}$를 만족하는 변환이 존재하는지 여부입니다.

$f: S \to T$를 집합 $S$에서 집합 $T$로의 함수라고 할 때 $S$는 $f$의 정의역(domain), $T$는 $f$의 공역(codomain) 또는 타겟(target)으로 부릅니다.

#### 치역, Range

함수 $f: S \to T$의 치역(range)은 집합

$$
\text{ran}(f) := \{f(s) \mid s \in S\} \subset T
$$

입니다. 이는 정의역 $S$의 요소를 $f$를 통해 매핑하여 도달할 수 있는 공역 $T$의 부분 집합입니다. 치역은 행렬의 열 성분에 대한 $\text{span}$이고 

$$
ran \begin{pmatrix} 1 & 2 & 0 & 1 \\ 1 & 2 & 1 & 2 \\ 0 & 0 & 1 & 1\end{pmatrix}
$$

위 range에서 열 성분을 RREF(행 기약 사다리꼴)로 계산하면 

$$
ran \begin{pmatrix} 1 & 2 & 0 & 1 \\ 0 & 0 & 1 & 1 \\ 0 & 0 & 0 & 0\end{pmatrix}
$$

선행 변인이 1인 열(1, 3)만 $\text{span}$에 포함하여 다음을 얻습니다.

$$
\text{span} \left\{\begin{pmatrix} 1 \\ 1 \\ 0\end{pmatrix}, \begin{pmatrix} 0 \\ 1 \\ 1\end{pmatrix}\right\}
$$

#### 상, Image

함수 $f: S \to T$의 정의역 $S$의 모든 부분 집합 $U$에 대한 상(image)은 

$$
f(U) = \text{Im } U := \{f(x) \mid x \in U\}
$$

입니다. $f$의 치역은 정의역 전체 $S$의 상의 특별한 경우라서 $\text{ran } f = \text{Im } S$와 같이 치역을 때때로 $f$의 상이라고도 부릅니다. 행렬의 치역은 항상 벡터의 스팬이므로 벡터 공간입니다.

공역 $T$의 모든 부분 집합 $U \subset T$의 원상(pre-image)은

$$
f^{-1}(U) := \{s \in S \mid f(s) \in U\} \subset S
$$

입니다. 원상 $f^{-1}(U)$는 $U$로 매핑되는 $S$의 모든 요소의 집합입니다.

#### 일대일 함수와 전사 함수, Injective and Surjective

함수 $f$는 $x \neq y \in S$일 때 $f(x) \neq f(y)$이면 일대일(one-to-one, 1:1) 또는 단사 함수(injective)입니다. 단사성은 원상에 대한 조건입니다. 모든 $t \in T$에 대해 $f(s) = t$인 $s \in S$가 존재하면 전사(onto) 또는 전사 함수(surjective)입니다. 전사성은 치역에 대한 조건입니다. $f$가 단사이면서 전사이면 전단사(bijective) 또는 동형 사상(isomorphism)입니다.

#### 핵, Kernel

선형 함수 $L: V \to W$의 핵(kernel)은 다음 집합입니다.

$$
\text{ker } L = \{\mathbf{v} \in V \mid L\mathbf{v} = \mathbf{0}_W\} \subset V
$$

$L$이 행렬 $M$을 가진다면 핵을 찾는 것은 동차 시스템 $M\mathbf{x} = \mathbf{0}$을 푸는 것과 같습니다. $\text{ker } L$은 $V$의 부분 공간입니다.

선형 변환 $L$의 계수(rank)는 그 치역의 차원입니다. 

$$
\text{rank } L := \text{dim } L(V)
$$

선형 변환 $L$의 무효성(nullity)은 그 핵의 차원입니다. 

$$
\text{null } L := \text{dim ker } L
$$

---

### Least squares

많은 응용 분야에서는 시스템의 정확한 해가 필요하지 않으며, 대신 가능한 최고의 근사치만 필요할 수 있습니다. 벡터 공간 $W$에 벡터의 길이에 대한 개념이 있다면, 우리는 $|L(\mathbf{x}) - \mathbf{v}|, \mathbf{v} \in W$를 최소화하는 $\mathbf{x}$를 찾으려고 시도할 수 있습니다.

$W = L(U) \oplus L(U)^\perp$라고 쓸 수 있습니다. 그러면 $\mathbf{v}$를 $\mathbf{v} = \mathbf{v}_k + \mathbf{v}_\perp$로 유일하게 쓸 수 있으며, $\mathbf{v}_k \in L(U)$이고 $\mathbf{v}_\perp \in L(U)^\perp$입니다.
따라서 우리는 $L(\mathbf{u}) = \mathbf{v}_k$를 풀어야 합니다. 성분으로 나타내면, $\mathbf{v}_\perp$는 $V - MX$이고, 결국 우리가 최소화하고자 하는 부분입니다. $M$의 관점에서, $L(U)$는 $M$의 열들에 의해 스팬된다는 것을 기억하십시오. 그러면 $\mathbf{v}_\perp$는 $M$의 열들에 수직이어야 합니다.

---

### Projection Matrices

$M$의 공역이 $\text{codom } M = \text{ran } M \oplus \text{ker } M^T$의 직합이므로, $\mathbf{v}$를 $\mathbf{v} = \mathbf{v}_r + \mathbf{v}_k$로 쓸 수 있는 유일한 방법이 있다는 것입니다. 여기서 $\mathbf{v}_k \in \text{ker } M^T$이고 $\mathbf{v}_r \in \text{ran } M$이며, $M\mathbf{x} = V$는 $\mathbf{v} \in \text{ran } M \iff \mathbf{v}_k = \mathbf{0}$일 때만 해를 가진다는 것이 분명합니다.

$X$가 $M\mathbf{x} = \mathbf{v}_r$에 대한 해라고 가정하면

$$
M X = \mathbf{v}_r \implies M^T M X = M^T \mathbf{v}_r
$$

$M^T \mathbf{v}_k = \mathbf{0}$입니다. 따라서 $M^T \mathbf{v} = M^T (\mathbf{v}_r + \mathbf{v}_k) = M^T \mathbf{v}_r$입니다.

---

### 특이값 분해, Singular Value Decomposition

$L: V \rightarrow W$라고 가정하고 $\text{dim } V =: n = m := \text{dim } W$일 가능성은 현실에서 낮으므로, $V$와 $W$의 기저에서 $L$의 $m \times n$ 행렬 $M$은 정사각 행렬이 아닐 것입니다. 그러나 벡터 공간 $V$와 $W$ 모두 내적을 가진다면, 고유값 문제의 유사체가 존재하며, 바로 $L$의 특잇값(singular values)입니다.

$\text{ker } L = {\mathbf{0}}$이라는 가정 하에서 $L^* L$에 대한 고유 벡터로 구성된 $V$에 대한 정규 직교 기저 $(\mathbf{u}_1, \dots, \mathbf{u}_n)$를 찾는다면 양변에 $L$을 곱하여 

$$
\begin{aligned}
& L^* L \mathbf{u}_i = \lambda_i \mathbf{u}_i \\
& L L^* L \mathbf{u}_i = \lambda_i L \mathbf{u}_i
\end{aligned}
$$

이렇게 표현할 수 있습니다. 즉, $L \mathbf{u}_i$는 $L L^*$의 고유 벡터입니다. 또한 $\text{ker } L = {\mathbf{0}}$이므로 벡터 $(L \mathbf{u}_1, \dots, L \mathbf{u}_n)$은 선형 독립입니다.

이어서 이 벡터들 사이의 각도와 길이를 계산해보자면 

$$
\begin{aligned}
& (M U_i) \cdot (M U_j) \\
& = U_i^T M^T M U_j \\
& = \lambda_j U_i^T U_j \\
& = \lambda_j U_i \cdot U_j \\
& = \lambda_j \delta_{ij}
\end{aligned}
$$

벡터 $(L \mathbf{u}_1, \dots, L \mathbf{u}_n)$이 직교하지만 정규 직교는 아니라는 것을 알 수 있습니다. $L \mathbf{u}_i$의 길이는 $\sqrt{\lambda_i}$에 해당합니다. 일반적으로, $\text{ker } L = \{\mathbf{0}\}$, $\text{dim } L(V) = \text{dim } V$, 그리고 $\text{dim } V \le \text{dim } W$이므로 $n \le m$이므로, 이것은 $W$의 기저가 될 수 없습니다.

$V$에 대한 정규 직교 기저 $\mathcal{O} = (\mathbf{u}_1, \dots, \mathbf{u}_n)$와 $W$에 대한 정규 직교 기저 $\mathcal{O}' = (\mathbf{v}_1, \dots, \mathbf{v}_m)$에 대한 $L$의 행렬을 계산해 봅시다.

$$
\begin{aligned}
& L \mathcal{O} = (L \mathbf{u}_1, \dots, L \mathbf{u}_n) \\
& = (\sqrt{\lambda_1} \mathbf{v}_1, \dots, \sqrt{\lambda_n} \mathbf{v}_n) \\
& = (\mathbf{v}_1, \dots, \mathbf{v}_m) \begin{pmatrix} \sqrt{\lambda_1} & 0 & \cdots & 0 \\ 0 & \sqrt{\lambda_2} & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & \sqrt{\lambda_n} \\ 0 & 0 & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & 0 \end{pmatrix}
\end{aligned}
$$

결과는 대각화에 매우 가깝습니다. 주 대각선을 따른 숫자 $\sqrt{\lambda_i}$를 $L$의 특잇값이라고 합니다.

---

### 참고 자료

[원본 경로 #1](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)

[원본 경로 #2](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[원본 경로 #3](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)