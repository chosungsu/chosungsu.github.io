---
title: 'Linear Transformations'
date: '2023-03-08'
tags: ['Linear algebra', 'lecture']
---

### The Idea of a Linear Transformation

선형 변환 $\mathbf{T}$는 벡터를 다른 벡터로 매핑하는 함수 $\mathbf{T}(\mathbf{v})$이며, 다음 선형성 조건을 만족해야 합니다.

$$
\mathbf{T}(c\mathbf{v} + d\mathbf{w}) = c\mathbf{T}(\mathbf{v}) + d\mathbf{T}(\mathbf{w})
$$

이 조건은 덧셈과 스칼라 곱셈을 모두 보존하는 규칙이 있습니다.

#### 선형 변환의 예시와 비선형 변환

가장 일반적인 선형 변환은 행렬 $\mathbf{A}$에 의한 곱셈입니다.

$$
\mathbf{T}(\mathbf{x}) = \mathbf{A}\mathbf{x}
$$

$\mathbf{A}$가 $m \times n$ 행렬일 때, 이 변환은 입력 공간 $\mathbf{R}^n$에서 출력 공간 $\mathbf{R}^m$으로의 선형 변환입니다.

예를 들어 $\mathbf{T}(\mathbf{v}) = \mathbf{v} + \mathbf{u}_0$와 같은 선형 변환을 이동(shift)하면 $\mathbf{T}(\mathbf{v} + \mathbf{w}) = \mathbf{v} + \mathbf{w} + \mathbf{u}_0 \ne (\mathbf{v} + \mathbf{u}_0) + (\mathbf{w} + \mathbf{u}_0) = \mathbf{v} + \mathbf{w} + 2\mathbf{u}_0$와 같이 결과가 다르므로 선형이 아니게 됩니다.

#### 선형 변환의 기하학적 특징

$\Rightarrow$ 입력 공간의 임의의 직선(또는 선분)은 출력 공간에서 직선(또는 선분)으로 변환됩니다.

$\Rightarrow$ 직선 상의 균등하게 배열된 점들은 변환 후에도 균등한 간격을 유지합니다.

$\Rightarrow$ $\mathbf{T}(\mathbf{0}) = \mathbf{0}$을 만족합니다.

$\Rightarrow$ 입력 삼각형 내부의 모든 점은 출력 삼각형 내부의 점으로 변환됩니다.

#### 선형 변환과 행렬 $\mathbf{A}$의 관계

모든 선형 변환은 행렬 곱셈으로 표현될 수 있고 $\mathbf{R}^n$에서 $\mathbf{R}^m$으로 가는 선형 변환 $\mathbf{T}$는 항상 적절한 기저를 선택하면 $m \times n$ 행렬 $\mathbf{A}$로 표현될 수 있습니다.

예를 들어 2차($a+bx+cx^2$)에서 1차($b+2cx$)로의 변환을 생각해보면 입력 기저를 $v_1=1, v_2=x, v_3=x^2$, 출력 기저를 $w_1=1, w_2=x$로 표현할 수 있어 변환 결과는 $T(v_1)=0, T(v_2)=1=1w_1, T(v_3)=2x=2w_2$로 계산이 되므로 행렬 $A$는 다음과 같습니다.

$$
\mathbf{A} = \begin{bmatrix} 0 & 1 & 0 \\ 0 & 0 & 2 \end{bmatrix}
$$

---

### The Matrix of a Linear Transformation

#### Change of Basis

입력 공간 $\mathbf{V}$와 출력 공간 $\mathbf{W}$가 같고, $\mathbf{T}$가 항등 변환($\mathbf{T}(\mathbf{v})=\mathbf{v}$)이더라도, 입력 기저 $\mathbf{v}$와 출력 기저 $\mathbf{w}$가 다르면 행렬은 $\mathbf{I}$가 아닙니다.

입력 벡터 $\mathbf{v}$가 $\mathbf{v}$ 기저에 대한 좌표 $\mathbf{c}$를 가질 때, 출력 벡터 $\mathbf{v}$는 $\mathbf{w}$ 기저에 대한 좌표 $\mathbf{d}$를 갖습니다. $\mathbf{d} = \mathbf{B}\mathbf{c}$에서 $\mathbf{B}$는 $\mathbf{c}$를 $\mathbf{d}$로 변환하는 행렬입니다.

입력 기저를 $\mathbf{V}$의 열, 출력 기저를 $\mathbf{W}$의 열로 갖는 행렬로 표현하면 $\mathbf{V}\mathbf{c} = \mathbf{W}\mathbf{d} \implies \mathbf{d} = \mathbf{W}^{-1}\mathbf{V}\mathbf{c}$로 표현됩니다.

#### 최적의 기저 선택

$\mathbf{T}: \mathbf{R}^n \to \mathbf{R}^n$ (정방 행렬 $\mathbf{A}$)의 경우, $n$개의 독립적인 고유 벡터 $\mathbf{v}_1, \dots, \mathbf{v}_n$을 입력 및 출력 기저로 선택합니다. 이 기저에서 $\mathbf{T}$의 행렬은 대각 행렬 $\mathbf{\Lambda}$가 됩니다.

$$
\begin{aligned}
&\mathbf{T}(\mathbf{v}_j) = \lambda_j \mathbf{v}_j \\
&\mathbf{\Lambda} = \begin{bmatrix} \lambda_1 & & \\ & \ddots & \\ & & \lambda_n \end{bmatrix}
\end{aligned}
$$

새 기저에 대한 행렬 $\mathbf{\Lambda}$는 원래 표준 기저에 대한 행렬 $\mathbf{A}$와 닮음(similar) 관계입니다.

---

### The Search for a Good Basis

#### Jordan Form

고유 벡터가 부족한 행렬 $\mathbf{A}$를 다루기 위해 조르당(Jordan)은 일반화된 고유 벡터를 사용하여 $\mathbf{A}$와 닮음인 조르당 형식 $\mathbf{J}$를 만들었습니다. $\mathbf{J}$는 가능한 한 대각 행렬에 가깝습니다.

$\mathbf{J} = \text{diag}(\mathbf{J}_1, \dots, \mathbf{J}_s)$에서 $s$는 $\mathbf{A}$의 독립적인 고유 벡터의 수와 같습니다. 각 조르당 블록 $\mathbf{J}_i$는 대각선에 하나의 고유값 $\lambda_i$를 가지고, 대각선 바로 위에는 1이 있습니다. 이 블록은 하나의 고유 벡터에 해당합니다.

조르당 형식은 행렬 $\mathbf{A}$의 본질적인 특성을 보존하며, 미분 방정식 $\frac{d\mathbf{u}}{dt} = \mathbf{A}\mathbf{u}$의 해를 찾는 데 중요합니다.

#### Fourier Basis

푸리에 기저 벡터는 행렬 $\mathbf{A}$가 무엇인지 모르는 상태에서 미리 선택되는 훌륭한 기저입니다. 놀랍게도 이 기저는 순환 행렬(Circulant Matrices)을 대각화합니다.

순환 행렬 $\mathbf{C}$는 각 행이 바로 위 행을 오른쪽으로 한 칸 순환 이동(cyclic permutation)시킨 형태의 행렬입니다.

$$
\mathbf{C} = \mathbf{F} \mathbf{\Lambda} \mathbf{F}^{-1}
$$

행렬 $C$는 푸리에 행렬 $F$에 의해 대각화되고 행렬 $F$의 열들은 순환 행렬 $\mathbf{C}$의 고유 벡터이며, 이들은 복소수 고유값 $\lambda$($\lambda^n=1$을 만족하는 $n$차 복소수 근)를 사용하여 구성됩니다.

$$
\mathbf{F} = \begin{bmatrix} 1 & 1 & 1 & 1 \\ 1 & i & i^2 & i^3 \\ 1 & -1 & 1 & -1 \\ 1 & -i & (-i)^2 & (-i)^3 \end{bmatrix}
$$

순환 행렬을 대각화한다는 것은 상수 계수를 가진 선형 미분 방정식을 푸는 데 완벽하다는 것을 의미합니다.

---

### 참고 자료

[원본 경로 #1](https://renessans-edu.uz/files/books/2023-12-04-11-33-41_46e7ce28c81d5c62d59b34ccc1c6f465.pdf)

[원본 경로 #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)

[원본 경로 #3](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)