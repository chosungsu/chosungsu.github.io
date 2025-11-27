---
title: 'Vector Spaces and Subspaces'
date: '2023-03-03'
tags: ['Linear algebra', 'lecture']
---

### Spaces of Vectors

공간 $\mathbf{R}^n$은 $n$개의 실수 성분을 가진 모든 열 벡터 $\mathbf{v}$로 구성됩니다. $\mathbf{R}$은 성분이 실수임을 의미합니다.

벡터 공간 $\mathbf{S}$는 다음 두 가지 조건을 만족해야 합니다.

$\Rightarrow$ $\mathbf{v}$와 $\mathbf{w}$가 $\mathbf{S}$에 있으면, 모든 선형 결합 $c\mathbf{v} + d\mathbf{w}$ 역시 $\mathbf{S}$에 있어야 합니다.

$\Rightarrow$ 이 연산들은 $\mathbf{R}^n$에서 만족하는 8가지 규칙(교환 법칙, 분배 법칙 등)을 따라야 합니다.

부분 공간(Subspace)은 호스트 벡터 공간 $\mathbf{V}$ 내부에 있는 또 다른 벡터 공간입니다.

$\Rightarrow$ $\mathbf{v}$와 $\mathbf{w}$가 부분 공간에 있으면, $\mathbf{v} + \mathbf{w}$도 부분 공간에 있습니다.

$\Rightarrow$ $\mathbf{v}$가 부분 공간에 있고 $c$가 스칼라이면, $c\mathbf{v}$도 부분 공간에 있습니다.

---

### The Nullspace of $\mathbf{A}$

영 공간(Nullspace) $\mathbf{N}(\mathbf{A})$는 $\mathbf{A}\mathbf{x} = \mathbf{0}$의 모든 해 $\mathbf{x}$로 구성된 집합입니다.

소거법을 통해 $\mathbf{A}$를 기약 행 사다리꼴(Reduced Row Echelon Form) $\mathbf{R}$로 변환해도 영 공간은 변하지 않습니다. 이 때 피벗이 없는 열을 free columns라고 하며 자유 변수 개수($n - r$)만큼의 특수 해를 구해서 특수 해마다 하나의 자유 변수는 1로 설정하고 나머지는 0으로 설정함으로써 피벗 변수를 찾습니다.

행렬 $\mathbf{A}$의 랭크 $r$는 피벗의 개수입니다.

---

### The Complete Solution to $\mathbf{A}\mathbf{x} = \mathbf{b}$

$\mathbf{A}\mathbf{x} = \mathbf{b}$의 완전 해(Complete Solution)는 다음과 같은 구조를 가집니다.

$$
\mathbf{x}_{\text{complete}} = \mathbf{x}_p + \mathbf{x}_n
$$

여기서 $\mathbf{x}_p$는 $\mathbf{A}\mathbf{x}_p = \mathbf{b}$를 만족하는 특정 해이고 $\mathbf{x}_n$는 영 공간 $\mathbf{N}(\mathbf{A})$에 있는 임의의 벡터입니다.

$\mathbf{A}\mathbf{x} = \mathbf{b}$를 풀기 위해, 행렬 $\mathbf{A}$와 $\mathbf{b}$를 합친 첨가 행렬(Augmented Matrix) $[\mathbf{A} \mid \mathbf{b}]$에 소거법을 적용합니다.

$$
[\mathbf{A} \mid \mathbf{b}] \quad \implies \quad [\mathbf{R} \mid \mathbf{d}]
$$

첨가 행렬 $[\mathbf{A} \mid \mathbf{b}]$에 소거법을 적용하여 $[\mathbf{R} \mid \mathbf{d}]$를 얻으면, $\mathbf{A}\mathbf{x} = \mathbf{b}$가 해를 가지기 위한 조건은 다음과 같습니다. $\mathbf{R}$의 모든 영 행(zero rows)에 해당하는 $\mathbf{d}$의 성분 또한 0이어야 합니다.

$$
\begin{aligned}
&[\mathbf{A} \mid \mathbf{b}] = \begin{bmatrix} 1 & 3 & 0 & 2 & b_1 \\ 0 & 0 & 1 & 4 & b_2 \\ 1 & 3 & 1 & 6 & b_3 \end{bmatrix} \\
&\Rightarrow [\mathbf{R} \mid \mathbf{d}] = \begin{bmatrix} 1 & 3 & 0 & 2 & b_1 \\ 0 & 0 & 1 & 4 & b_2 \\ 0 & 0 & 0 & 0 & b_3 - b_1 - b_2 \end{bmatrix}
\end{aligned}
$$

따라서 해가 존재하기 위한 조건은 $b_1 + b_2 = b_3$입니다. 특정 해 $\mathbf{x}_p$를 찾기 위한 가장 쉬운 방법은 모든 자유 변수(free variables)를 0으로 설정하는 것입니다.

정사각 가역 행렬에서는 유일한 해 $\mathbf{x}_p = \mathbf{A}^{-1}\mathbf{b}$입니다. 그리고 $\mathbf{N}(\mathbf{A})$는 오직 영 벡터 $\mathbf{0}$만 포함합니다.

최대 열 랭크($r = n \le m$)일 때 모든 열이 피벗을 가지므로 자유 변수나 특수 해가 없습니다.

최대 행 랭크($r = m \le n$)일 때 모든 행이 피벗을 가지므로, $\mathbf{R}$에는 영 행이 없습니다. $\mathbf{A}\mathbf{x} = \mathbf{b}$는 모든 $\mathbf{b}$에 대해 항상 해를 가집니다. $n - r = n - m$개의 자유 변수가 있습니다.

---

### Independence, Basis and Dimension

벡터의 순서 $\mathbf{v}_1, \dots, \mathbf{v}_n$이 선형 독립(linearly independent)이라는 것은, 영 벡터 $\mathbf{0}$을 만드는 유일한 선형 결합이 모든 계수 $x_1, \dots, x_n$이 0인 경우 뿐일 때입니다.

선형 종속은 하나의 벡터가 다른 벡터들의 선형 결합으로 표현될 수 있다는 것을 의미합니다.

벡터 공간 $\mathbf{S}$의 기저(Basis)는 다음 두 가지 속성을 가진 벡터들의 순서입니다. 선형 독립이어야 하며 공간 $\mathbf{S}$를 생성(span)해야 합니다. 이에 의하여 기저 벡터들의 선형 결합으로 공간의 모든 벡터를 유일하게 표현할 수 있습니다.

공간의 차원(Dimension)은 그 공간의 모든 기저에 포함된 벡터의 개수입니다. $\mathbf{C}(\mathbf{A})$의 차원은 $r$이고 $\mathbf{N}(\mathbf{A})$의 차원은 $\mathbf{n} - \mathbf{r}$이 됨을 알 수 있습니다.

---

### Dimensions of the Four Subspaces

$m \times n$ 행렬 $\mathbf{A}$의 랭크를 $r$이라고 할 때 행 공간 $\mathbf{C}(\mathbf{A}^{\text{T}})$과 열 공간 $\mathbf{C}(\mathbf{A})$의 차원은 둘 다 $r$입니다. 그리고 영 공간 $\mathbf{N}(\mathbf{A})$의 차원은 $n - r$이 됩니다.

---

### 참고 자료

[원본 경로 #1](https://renessans-edu.uz/files/books/2023-12-04-11-33-41_46e7ce28c81d5c62d59b34ccc1c6f465.pdf)

[원본 경로 #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)

[원본 경로 #3](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)