---
title: 'Orthogonality'
date: '2023-03-03'
tags: ['Linear algebra', 'lecture']
---

### Orthogonality of the Four Subspaces

두 벡터 $\mathbf{v}$와 $\mathbf{w}$의 내적(dot product) 또는 행렬 곱이 0일 때 직교합니다.

$$
\mathbf{v} \cdot \mathbf{w} = \mathbf{v}^{\text{T}}\mathbf{w} = 0
$$

두 부분 공간 $\mathbf{V}$와 $\mathbf{W}$가 직교(orthogonal)한다는 것은, $\mathbf{V}$의 모든 벡터 $\mathbf{v}$가 $\mathbf{W}$의 모든 벡터 $\mathbf{w}$에 수직일 때입니다.

두 직교 부분 공간에 동시에 속하는 벡터는 영벡터 뿐입니다.

부분 공간 $\mathbf{V}$의 직교 여공간 $\mathbf{V}^{\perp}$은 $\mathbf{V}$에 수직인 모든 벡터를 포함하는 공간입니다.

---

### Projections

사영(Projection)은 벡터 $\mathbf{b}$를 부분 공간 $\mathbf{S}$에 있는 가장 가까운 점 $\mathbf{p}$로 찾는 과정입니다.

직선 위로의 사영에서 벡터 $\mathbf{b}$를 $\mathbf{a}$ 방향의 직선 위로 사영합니다. 사영 벡터 $\mathbf{p}$는 $\mathbf{a}$의 배수입니다.

$$
\begin{aligned}
&\mathbf{p} = \hat{x}\mathbf{a}, \\
&\hat{x} = \frac{\mathbf{a}^{\text{T}}\mathbf{b}}{\mathbf{a}^{\text{T}}\mathbf{a}}
\end{aligned}
$$

여기서 $\mathbf{P}$는 $m \times m$ 행렬이지만 랭크는 1입니다.

부분공간으로의 사영에서 $\mathbf{R}^m$의 벡터 $\mathbf{b}$를 $\mathbf{R}^m$의 $n$차원 부분 공간 $\mathbf{S}$ 위로 사영합니다. 이 때 사영 벡터 $\mathbf{p}$는 $\mathbf{A}$의 열들의 선형 결합입니다.

$$
\mathbf{p} = \mathbf{A}\hat{\mathbf{x}}
$$

---

### Least Squares Approximations

$\mathbf{A}\mathbf{x} = \mathbf{b}$ 시스템에 해가 없을 때 최소 제곱 해 $\mathbf{\hat{x}}$를 구합니다. 이 해는 오차 벡터 $\mathbf{e} = \mathbf{b} - \mathbf{A}\mathbf{x}$의 길이 $\Vert \mathbf{e} \Vert$를 최소화합니다.

$\mathbf{A}\mathbf{x}$는 행렬 $\mathbf{A}$의 열 공간 $\mathbf{C}(\mathbf{A})$에 있는 벡터이며, $\mathbf{b}$에 가장 가까운 $\mathbf{C}(\mathbf{A})$ 상의 벡터는 $\mathbf{b}$의 사영(projection) $\mathbf{p}$입니다.

정규 방정식은 $\mathbf{A}^{\text{T}}(\mathbf{b} - \mathbf{A}\mathbf{\hat{x}}) = \mathbf{0}$입니다. 따라서 $\mathbf{\hat{x}} = (\mathbf{A}^{\text{T}}\mathbf{A})^{-1}\mathbf{A}^{\text{T}}\mathbf{b}$이 성립하므로 사영은 $\mathbf{p} = \mathbf{A}\mathbf{\hat{x}} = \mathbf{A}(\mathbf{A}^{\text{T}}\mathbf{A})^{-1}\mathbf{A}^{\text{T}}\mathbf{b}$와 같습니다.

---

### Orthonormal Bases and Gram-Schmidt

벡터 $\mathbf{q}_1, \dots, \mathbf{q}_n$이 직교(orthogonal)하고 각각의 길이가 1일 때 (단위 벡터, normal) 정규 직교(orthonormal)라고 합니다.

그람-슈미트 과정은 주어진 선형 독립 벡터 $\mathbf{a}_1, \dots, \mathbf{a}_n$을 사용하여 정규 직교 벡터 $\mathbf{q}_1, \dots, \mathbf{q}_n$를 생성하는 알고리즘입니다.

첫번째 벡터 $q_1$을 $a_1$을 단위 벡터로 만들어 $\mathbf{q}_1 = \frac{\mathbf{a}_1}{\Vert \mathbf{a}_1 \Vert}$로 표현합니다. 두 번째 벡터부터는 이미 생성된 이전 방향의 성분(사영)을 소거하여 $\mathbf{A}_2 = \mathbf{a}_2 - (\mathbf{a}_2^{\text{T}}\mathbf{q}_1)\mathbf{q}_1$와 같이 표현합니다.

---

### 참고 자료

[원본 경로 #1](https://renessans-edu.uz/files/books/2023-12-04-11-33-41_46e7ce28c81d5c62d59b34ccc1c6f465.pdf)

[원본 경로 #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)

[원본 경로 #3](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)