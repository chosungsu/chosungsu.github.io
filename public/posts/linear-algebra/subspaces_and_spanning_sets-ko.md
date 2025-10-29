---
title: 'Subspaces and Spanning Sets'
date: '2023-03-08'
tags: ['Linear algebra', 'lecture']
---

### Subspaces

벡터 공간 $V$의 부분집합 $U$가 subspace라고 하는 것은 $U$가 $V$에서 상속된 덧셈 및 스칼라 곱 연산 하에서 벡터 공간일 때입니다.

$\mathbb{R}^3$에서 원점을 통과하는 평면 $P$를 생각해 봅시다. $ax + by + cz = 0$ 방정식은 동차 시스템(homogeneous system)$\begin{pmatrix} a & b & c \end{pmatrix} \begin{pmatrix} x \\ y \\ z \end{pmatrix} = 0$ 또는 행렬 $M = \begin{pmatrix} a & b & c \end{pmatrix}$인 $MX = 0$으로 표현될 수 있습니다.

$X_1$과 $X_2$ 모두 $MX=0$의 해라면, 행렬 곱셈의 선형성(linearity)에 의해 $\mu X_1 + \nu X_2$ 또한 해가 됩니다.

$$
M(\mu X_1 + \nu X_2) \\ = \mu M X_1 + \nu M X_2 \\ = \mu 0 + \nu 0 = 0
$$

따라서 $P$는 덧셈과 스칼라 곱셈에 대해 닫혀 있습니다(closed under addition and scalar multiplication). 또한, $P$는 원점(origin)을 포함합니다.

---

### Build subspaces

집합 $U = \left\{ \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix} \right\} \subset \mathbb{R}^3$을 생각해 보면 $U$는 두 개의 벡터로만 구성되어 있으므로, 이 벡터들의 임의의 상수 곱도 $U$에 있어야 하는 조건이 충족되지 않아서 $U$가 벡터 공간이 아니라는 것을 알 수 있습니다. 예를 들어, 영벡터는 $U$에 없으며, $U$는 벡터 덧셈에 대해 닫혀 있지도 않습니다.

하지만 두 벡터가 평면을 정의한다는 것을 알고 있습니다.이 경우, $U$의 벡터들은 $\mathbb{R}^3$의 $xy$-평면을 정의합니다. $xy$-평면을 $U$의 두 벡터의 선형 결합(linear combination)으로 발생하는 모든 벡터의 집합으로 볼 수 있습니다. 모든 선형 결합의 이 집합을 $U$의 생성(span)이라고 부릅니다.

$$
\text{span}(U) = \left\{ x \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix} + y \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix} \mid x, y \in \mathbb{R} \right\}
$$

예를 들면 $V$를 벡터 공간이라고 하고 $S = \{s_1, s_2, \dots\} \subset V$를 $V$의 부분집합이라고 정의를 할 때 $S$의 생성(span of S), $\text{span}(S)$로 표기되는 집합은 다음과 같습니다.

$$
\text{span}(S) := \\
\{ r^1 s_1 + r^2 s_2 + \cdots + r^N s_N \mid r_i \in \mathbb{R}, N \in \mathbb{N} \}
$$

즉, $\text{span}(S)$는 $S$의 원소들의 모든 유한 선형 결합의 집합입니다. 그리고 임의의 부분집합 $S \subset V$에 대해, $\text{span}(S)$가 $V$의 부분 공간이 되는 이유는 $\text{span}(S)$가 선형 결합에 대해 닫혀 있음을 보이는 것으로 충분합니다.

$$
\begin{aligned}
& u = c_1 s_1 + c_2 s_2 + \cdots \\ 
& v = d_1 s_1 + d_2 s_2 + \cdots \\
& \lambda u + \mu v = (\lambda c_1 + \mu d_1)s_1 + (\lambda c_2 + \mu d_2)s_2 + \cdots
\end{aligned}
$$

$S$의 원소들의 선형 결합이므로, $\text{span}(S)$에 속합니다.
따라서 $\text{span}(S)$는 선형 결합에 대해 닫혀 있으며, 따라서 $V$의 부분 공간입니다.

닫힌 상태를 확인하는 예시를 아래와 같이 만들어보았습니다.

$$
\text{span} \left\{\begin{pmatrix} 1 \\ 0 \\ a\end{pmatrix}, \begin{pmatrix} 1 \\ 2 \\ -3\end{pmatrix}, \begin{pmatrix} a \\ 1 \\ 0\end{pmatrix}\right\} = R^3
$$

이 때 임의의 벡터 $r_1, r_2 ,r_3$이 있고 $r_1 \begin{pmatrix} 1 \\ 0 \\ a\end{pmatrix} + r_2 \begin{pmatrix} 1 \\ 2 \\ -3\end{pmatrix} + r_3 \begin{pmatrix} a \\ 1 \\ 0\end{pmatrix} = \begin{pmatrix} x \\ y \\ z\end{pmatrix}$로 선형 결합을 할 수 있을 것입니다. matrix 형식으로 나타내면 $\begin{pmatrix} 1 & 1 & a \\ 0 & 2 & 1 \\ a & -3 & 0\end{pmatrix}\begin{pmatrix} r_1 \\ r_2 \\ r_3\end{pmatrix} = \begin{pmatrix} x \\ y \\ z\end{pmatrix}$가 되고 만약 좌항의 matrix가 invertible이어서 역행렬이 존재한다면 $0 \ne \text{det} M = -(2a-3)(a+1)$로 행렬식 계산하여 $\text{span}$이 3차원이 되는 해는 $a \ne -1, \frac{3}{2}$일 때입니다.

---

### 참고 자료

[원본 경로 #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[원본 경로 #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)