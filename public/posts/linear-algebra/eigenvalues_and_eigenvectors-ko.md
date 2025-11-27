---
title: 'Eigenvalues and Eigenvectors'
date: '2023-03-06'
tags: ['Linear algebra', 'lecture']
---

### Introduction to Eigenvalues and Eigenvectors

대부분의 벡터 $\mathbf{x}$는 행렬 $\mathbf{A}$를 곱할 때 방향이 바뀝니다. 그러나 특정 예외적인 벡터 $\mathbf{x}$는 $\mathbf{A}$를 곱해도 방향이 바뀌지 않고, 원래 방향과 같은 선(line)상에 놓이게 됩니다. 이 벡터를 고유 벡터($\mathbf{x}$)라고 합니다.

고유 벡터에 행렬 $\mathbf{A}$를 곱한 결과 $\mathbf{A}\mathbf{x}$는 원래 벡터 $\mathbf{x}$의 스칼라 배가 됩니다. 이 스칼라 $\lambda$를 고유값(Eigenvalue)이라고 합니다.

$$
\mathbf{A}\mathbf{x} = \lambda\mathbf{x}
$$

$\mathbf{A}\mathbf{x} = \lambda\mathbf{x}$ 방정식을 풀기 위해 $\lambda\mathbf{x}$를 좌변으로 옮깁니다.

$$
(\mathbf{A} - \lambda\mathbf{I})\mathbf{x} = \mathbf{0}
$$

이 방정식이 영벡터가 아닌($\mathbf{x} \ne \mathbf{0}$) 해를 가지려면, 행렬 $\mathbf{A} - \lambda\mathbf{I}$가 비가역(singular)이어야 합니다. 즉, 이 행렬의 행렬식은 0이어야 합니다.

$n$개의 고유값의 곱은 행렬 $\mathbf{A}$의 행렬식과 같습니다.

$$
\lambda_1 \lambda_2 \cdots \lambda_n = \det(\mathbf{A})
$$

$n$개의 고유값의 합은 주 대각선 성분들의 합인 트레이스와 같습니다.

$$
\lambda_1 + \lambda_2 + \cdots + \lambda_n = \text{trace}(\mathbf{A})
$$

$\mathbf{A}$의 고유 벡터 $\mathbf{x}$는 $\mathbf{A}^k$의 고유 벡터이기도 하며, 고유값은 $\lambda^k$이 됩니다.

#### Diagonalizing a Matrix

행렬 $\mathbf{A}$를 고유 벡터를 사용하여 대각 행렬 $\mathbf{\Lambda}$로 변환하는 과정을 대각화(Diagonalization)라고 합니다.

$n \times n$ 행렬 $\mathbf{A}$가 $n$개의 선형 독립인 고유 벡터 $\mathbf{x}_1, \dots, \mathbf{x}_n$을 가질 때, 이들을 행렬 $\mathbf{X}$의 열로 배치하고, 대응하는 고유값을 대각 행렬 $\mathbf{\Lambda}$의 대각 성분으로 배치합니다.

$$
\begin{aligned}
&\mathbf{X} = [\mathbf{x}_1 \mid \mathbf{x}_2 \mid \cdots \mid \mathbf{x}_n] \\
&\mathbf{\Lambda} = \begin{bmatrix} \lambda_1 & & \\ & \lambda_2 & \\ & & \ddots \end{bmatrix}
\end{aligned}
$$

행렬 $\mathbf{A}$의 대각화 공식이 다음과 같이 유도됩니다.

$$
\mathbf{\Lambda} = \mathbf{X}^{-1}\mathbf{A}\mathbf{X}
$$

행렬 $\mathbf{A}$가 대각화 가능하려면 $n$개의 선형 독립인 고유 벡터를 가져야 합니다. 즉, 고유 벡터 행렬 $\mathbf{X}$가 역행렬을 가져야 합니다. 만약 $\mathbf{A}$가 $n$개의 서로 다른 고유값을 가진다면, 고유 벡터는 자동적으로 선형 독립이 되므로 $\mathbf{A}$는 항상 대각화 가능합니다. 고유값 중복(반복)이 발생하면, $\mathbf{A}$는 대각화 가능할 수도 있고 아닐 수도 있습니다.

---

### Symmetric Matrices

대칭 행렬 $\mathbf{S}$가 $\mathbf{S}\mathbf{x} = \lambda\mathbf{x}$를 만족할 때, 고유값 $\lambda$와 고유 벡터 $\mathbf{x}$는 다음과 같은 특별한 성질을 가집니다.

대칭 행렬은 오직 실수 고유값만 가집니다. 대칭 행렬의 고유 벡터들은 정규 직교(orthonormal)하도록 선택될 수 있습니다.

고유 벡터를 정규 직교 벡터 $\mathbf{q}_1, \dots, \mathbf{q}_n$로 선택하여 행렬 $\mathbf{Q}$의 열로 삼으면, $\mathbf{Q}$는 직교 행렬이 됩니다.

$$
\mathbf{S} = \mathbf{Q}\mathbf{\Lambda}\mathbf{Q}^{-1} = \mathbf{Q}\mathbf{\Lambda}\mathbf{Q}^{\text{T}}
$$

이러한 분해를 스펙트럼 정리(Spectral Theorem)라고 합니다.

부호 일치 정리에 따라서 대칭 행렬 $\mathbf{S}$의 양수 고유값의 개수는 양수 피벗의 개수와 같습니다.

---

### Positive Definite Matrices

대칭 행렬 $\mathbf{S}$ 중에서 모든 고유값($\lambda$)이 양수인 행렬을 양의 정부호 행렬(Positive Definite Matrix, PD)이라고 합니다.

#### The Fundamental Definition

양의 정부호 행렬의 가장 기본적인 정의는 에너지 테스트입니다.

$$
\mathbf{x}^{\text{T}}\mathbf{S}\mathbf{x} > 0
$$

#### 주 대각 소행렬식 및 피벗 테스트

피벗 $d_i$는 $k \times k$ 주 대각 소행렬식 $\text{det}(\mathbf{S}_k)$의 비율로 나타낼 수 있습니다. 이 테스트는 고유값 계산보다 훨씬 빠릅니다.

$$
\begin{aligned}
&\mathbf{a} > 0, \\
&\mathbf{ac - b^2} > 0
\end{aligned}
$$

여기서 첫번째 주 대각 소행렬식은 $a$이고 두번째 주 대각 소행렬식은 $ac-b^2$이 된다고 합니다.

---

### 참고 자료

[원본 경로 #1](https://renessans-edu.uz/files/books/2023-12-04-11-33-41_46e7ce28c81d5c62d59b34ccc1c6f465.pdf)

[원본 경로 #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)

[원본 경로 #3](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)