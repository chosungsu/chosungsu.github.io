---
title: 'Solving Linear Equations'
date: '2023-03-01'
tags: ['Linear algebra', 'lecture']
---

### Vectors and Linear Equations

선형대수학의 중심 문제는 선형 방정식 시스템을 푸는 것입니다. 선형 방정식은 미지수들이 숫자와만 곱해지는 것을 의미합니다.

$$
\begin{cases} x - 2y = 1 \\ 3x + 2y = 11 \end{cases}
$$

#### The Matrix Equation

계수 행렬 $\mathbf{A}$를 사용하여 방정식을 행렬 형식으로 결합합니다.

$$
\mathbf{A} = \begin{bmatrix} 1 & -2 \\ 3 & 2 \end{bmatrix}
$$

선형 시스템은 행렬 방정식으로 $\mathbf{A}\mathbf{x} = \mathbf{b}$로 표현됩니다.

$$
\begin{aligned}
&\mathbf{A}\mathbf{x} = \mathbf{b} \\
&\begin{bmatrix} 1 & -2 \\ 3 & 2 \end{bmatrix} \begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} 1 \\ 11 \end{bmatrix}
\end{aligned}
$$

이 때 행단위에서는 좌행렬의 각 행과 $x$의 내적을 취하게 되고 열 단위는 좌행렬의 열들의 선형 결합입니다.

---

### The Idea of Elimination

소거법(Elimination)은 선형 방정식 시스템을 체계적으로 푸는 방법입니다. 목표는 시스템을 풀기 쉬운 상삼각 시스템(Upper Triangular System)으로 변환하는 것입니다.

$$
\begin{cases} x - 2y = 1 \\ 3x + 2y = 11 \end{cases} \xrightarrow{\text{소거}} \begin{cases} x - 2y = 1 \\ 8y = 8 \end{cases}
$$

소거 후에도 해 $(3, 1)$은 변하지 않습니다. 소거법은 피벗(Pivot)으로 나누어야 하므로, 피벗 위치에 0이 나타나면 실패할 수 있습니다.

피벗의 개수가 $n$개 미만일 때 해가 없거나 무한해로 특이 행렬(singular matrix)가 됩니다. 피벗의 개수가 $n$개일 때 유일해로 비특이 행렬이 됩니다.

---

### Elimination Using Matrices

각 소거 단계를 행렬 곱셈으로 표현합니다. $\mathbf{E}$ 행렬이 벡터 $\mathbf{b}$나 행렬 $\mathbf{A}$에 작용하여 $\mathbf{E}\mathbf{b}$나 $\mathbf{E}\mathbf{A}$를 만듭니다.

소거 행렬 $\mathbf{E}{ij}$는 $j$번째 방정식을 승수 $\mathcal{l}_{ij}$만큼 곱하여 $i$번째 방정식에서 빼는 소거 단계를 수행하는 행렬입니다.

항등 행렬 $\mathbf{I}$는 주 대각선에 1이 있고 나머지는 0인 행렬입니다. 행렬 $\mathbf{I}$를 어떤 벡터 $\mathbf{x}$에 곱해도 $\mathbf{x}$는 변하지 않습니다.

---

### Rules for Matrix Operations

$\mathbf{A} + \mathbf{B} = \mathbf{B} + \mathbf{A}$와 같이 교환볍칙과 $\mathbf{A}(\mathbf{B}\mathbf{C}) = (\mathbf{A}\mathbf{B})\mathbf{C}$와 같이 연관법칙은 성립하고 $\mathbf{A}\mathbf{B} \ne \mathbf{B}\mathbf{A}$로 교환법칙은 성립하지 않습니다.

두 행렬 $\mathbf{A}$($m \times n$)와 $\mathbf{B}$($n \times p$)를 곱할 때, $\mathbf{A}$의 열의 수$(n)$는 $\mathbf{B}$의 행의 수($n$)와 같아야 합니다. 곱 $\mathbf{A}\mathbf{B}$는 $m \times p$ 행렬이 됩니다.

$\mathbf{A}\mathbf{B}$의 $(i, j)$ 항목은 $\mathbf{A}$의 $i$번째 행과 $\mathbf{B}$의 $j$번째 열의 내적(Dot Product)입니다.

#### Inverse Matrices

정방 행렬 $\mathbf{A}$의 역행렬(Inverse Matrix)은 $\mathbf{A}^{-1}$로 표기되며, 다음을 만족합니다.

$$
\mathbf{A}\mathbf{A}^{-1} = \mathbf{I}
$$

정방 행렬 $\mathbf{A}$가 역행렬을 갖기 위한 핵심 조건은 다음과 같습니다.

$\Rightarrow$ $\mathbf{A}$가 $n$개의 피벗을 가져야 합니다.

$\Rightarrow$ $\det(\mathbf{A}) \ne 0$이어야 합니다.

$\Rightarrow$ $\mathbf{A}\mathbf{x} = \mathbf{0}$이 $\mathbf{x} = \mathbf{0}$만을 유일한 해로 가져야 합니다.

$2 \times 2$ 행렬 $\mathbf{A} = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$의 역행렬은 $\mathbf{a}\mathbf{d} - \mathbf{b}\mathbf{c} \ne 0$일 때 다음과 같습니다.

$$
\mathbf{A}^{-1} = \frac{1}{ad - bc} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix}
$$

$ad - bc$는 $\mathbf{A}$의 행렬식입니다.

---

### 소거 인수분해

#### 1. $A=LU$

소거법의 결과로 얻어지는 상삼각 행렬(U)는 주 대각선에 피벗(Pivots)을 가집니다. 소거 단계를 역으로 되돌리는 행렬은 하삼각 행렬(L)입니다.

#### 2. $A=LDU$

$\mathbf{A} = \mathbf{L}\mathbf{U}$는 비대칭적입니다. $\mathbf{U}$는 대각선에 피벗을 가지지만, $\mathbf{L}$은 대각선에 1을 가집니다.

이를 대칭적으로 만들기 위해, $\mathbf{U}$를 대각 행렬 $\mathbf{D}$와 대각선에 1을 가진 새로운 상삼각 행렬 $\mathbf{U}_{\text{new}}$로 분리할 수 있습니다. $\mathbf{D}$는 피벗을 포함합니다.

$$
\mathbf{A} = \mathbf{L}\mathbf{D}\mathbf{U}_{\text{new}}
$$

여기서 $\mathbf{L}$과 $\mathbf{U}_{\text{new}}$는 모두 대각선에 1을 가집니다.

---

### 참고 자료

[원본 경로 #1](https://renessans-edu.uz/files/books/2023-12-04-11-33-41_46e7ce28c81d5c62d59b34ccc1c6f465.pdf)

[원본 경로 #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)

[원본 경로 #3](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)