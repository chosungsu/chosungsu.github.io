---
title: 'Diagonalization of matrix'
date: '2023-03-24'
tags: ['Linear algebra', 'lecture']
---

### matrix representation

$T : R^n \rightarrow R^m$을 $y=T(x)$ 로 정의된 선형변환이라고 하고 $\alpha = \{x_1, …, x_n\}, \beta = \{y_1, …, y_m\}$을 각각 순서기저라고 하면 $[y]_{\beta} = A’[x]_{\alpha} = [T]_{\alpha}^{\beta}[x]_{\alpha}$이므로 행렬 $A’=[[T(x_1)]_{\beta}:[T(x_2)]_{\beta}…]$와 같습니다.

예를 들어 선형변환 $T : R^3 \rightarrow R^2$ 를 $T\begin{bmatrix} x \\ y \\ z \end{bmatrix} = \begin{bmatrix} 2x-z \\ y-z \end{bmatrix}$이라 정의하고 $\alpha = \begin{Bmatrix} x_1 = \begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix}, x_2 = \begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix}, x_3 = \begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix} \end{Bmatrix}$, $\beta = \begin{Bmatrix} y_1 = \begin{bmatrix} 1 \\ 1 \end{bmatrix}, y_2 = \begin{bmatrix} -1 \\ 1 \end{bmatrix} \end{Bmatrix}$를 각각 순서기저라고 하면 $A’ = [T]_{\alpha}^{\beta} = [[T(x_1)]_{\beta} [T(x_2)]_{\beta} [T(x_3)_{\beta}]]_{2*3}$이므로 먼저 T를 구하면 다음과 같습니다. $T(x_1) = \begin{bmatrix} 1 \\ -1 \end{bmatrix}, T(x_2) = \begin{bmatrix} -1 \\ 0 \end{bmatrix}, T(x_3) = \begin{bmatrix} 2 \\ 1 \end{bmatrix}$입니다. 이제 기저 $\alpha$에 속한 벡터들의 기저 $\beta$에 대한 좌표벡터를 구하면 $T(x_1) = a_1y_1 + a_2y_2 = a_1\begin{bmatrix} 1 \\ 1 \end{bmatrix} + a_2\begin{bmatrix} -1 \\ 1 \end{bmatrix}$, $T(x_2) = b_1y_1+ b_2y_2 = b_1\begin{bmatrix} 1 \\ 1 \end{bmatrix} + b_2\begin{bmatrix} -1 \\ 1 \end{bmatrix}$, $T(x_3) = c_1y_1 + c_2y_2 = c_1\begin{bmatrix} 1 \\ 1 \end{bmatrix} + c_2\begin{bmatrix} -1 \\ 1 \end{bmatrix}$가 되므로 연립방정식으로 풀이하면 됩니다. $(a_1, a_2) = (0, -1), (b_1, b_2) = (-0.5, 0.5), (c_1, c_2) = (1.5, -0.5)$가 되어 $A’ = \begin{bmatrix} 0 & -0.5 & 1.5 \\ -1 & 0.5 & -0.5 \end{bmatrix}$가 좌표벡터가 됩니다.

다음 예로는 $T : R^2 \rightarrow R^3$을 $T\begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} 2x+y \\ x-y \\ x+4y \end{bmatrix}$ 라 정의하고 순서기저를 각각 $\alpha = \{e_2, e_1\}, \beta = \{e_3, e_2, e_1\}$이라 할 때 A’을 구하면 $T(e_2) = \begin{bmatrix} 1 \\ -1 \\ 4 \end{bmatrix}$, $T(e_1) = \begin{bmatrix} 2 \\ 1 \\ 1 \end{bmatrix}$ 이므로 $[T]_{\alpha}^{\beta} = \begin{bmatrix} 4 & 1 \\ -1 & 1 \\ 1 & 2 \end{bmatrix}$가 됩니다. 그리고 $[T\begin{bmatrix} -4 \\ 6 \end{bmatrix}]_{\beta}$를 $A’$를 이용해서 구해보면 $A’\begin{bmatrix} 6 \\ -4 \end{bmatrix} = \begin{bmatrix} 20 \\ -10 \\ -2 \end{bmatrix}$가 되어 $20e_3 + (-10)e_2 + (-2)e_1$이 답이 됩니다.

---

### similarity and diagonalization of matrices

$T : R^n \rightarrow R^n$이 선형변환이고 $\alpha, \beta$가 두 기저일 때 $A = [T]_{\alpha}, A’ = [T]_{\beta}$라고 하면 기저 $\beta$에서 기저 $\alpha$로의 전이행렬 $P = [I]_{\beta}^{\alpha}$에 대해서 $A’ = P^{-1}AP$가 성립합니다.

예를 들어 $T : R^2 \rightarrow R^2를 T\begin{bmatrix} 2x-y \\ x+3y \end{bmatrix}$로 정의하고 기저 $\beta = \{y_1 = \begin{bmatrix} 0 \\ 1 \end{bmatrix}, y_2 = \begin{bmatrix} -1 \\ 1 \end{bmatrix}\}$일 때 A’를 구하면 $A = \begin{bmatrix} 2 & -1 \\ 1 & 3 \end{bmatrix}$이고 $P = \begin{bmatrix} 0 & -1 \\ 1 & 1 \end{bmatrix}$이므로 이 둘을 정리하여 구할 수 있게 됩니다.

정사각행렬 $A$, $B$에 대해서 $B = P^{-1}AP$를 만족하는 가역행렬 $P$가 있다면 $B$는 $A$와 닮은 행렬이라고 합니다. 기호로는 $B$ ~ $A$라 표현합니다. 두 행렬이 닮음이면 행렬식 값과 주대각선성분 합도 동일하다는 성질이 있습니다. 이 때 A행렬은 대각화가능(diagonalizable)한 행렬로 불립니다. $n$차의 정사각행렬이 대각화가능할 필요충분조건은 $n$개의 일차독립인 고유벡터를 갖는 것입니다.

$\lambda_1, \lambda_2, …, \lambda_k$를 행렬 $A$의 서로 다른 고윳값이라고 하면 $A$의 특성다항식은 $|\lambda I-A| = (\lambda - \lambda_1)^m(\lambda - \lambda_2)^m…(\lambda - \lambda_k)^m$와 같이 나타낼 수 있습니다. 이 때 정수 $m_i$를 $\lambda_i$의 대수적 중복도(algebraic multiplicity)라고 하고 고윳값에 대응하는 일차독립인 고유벡터의 수를 기하적 중복도(geometric multiplicity)라고 합니다.

$n$차 정사각행렬의 대수적 중복도는 항상 기하적 중복도보다 크거나 같습니다. 다만 대각화가능할 필요충분조건에서 행렬 $A$의 모든 고윳값의 대수적 중복도와 기하적 중복도가 같아야 합니다.

---

### orthogonal diagonalization

정사각행렬 $A$에 대해서 $A^{-1} = A^T, A^TA = I$이면 $A$를 직교행렬(real orthogonal matrix)라고 합니다. 직교행렬이면 행벡터, 열벡터들은 각각 서로 수직이며 정규벡터입니다. $A$는 가역행렬이며 길이보존법칙을 만족합니다.

만약 $A, C$가 같은 크기의 정사각행렬이면서 $C = P^TAP$인 직교행렬 $P$가 존재하면 $C$는 $A$에 직교닮음(orthogonally similar)이라고 합니다.

직교대각화하는 직교행렬 $P$를 구하는 예를 들면 $A = \begin{bmatrix} -1 & -1 & 1 \\ - 1 & 2 & 4 \\ 1 & 4 & 2 \end{bmatrix}$의 특성다항식 절대값$det(A-\lambda I)$은 $\lambda (\lambda + 3) (\lambda - 6) = 0$이므로 고유벡터 $x_1 = \begin{bmatrix} -1 \\ -1 \\ 1 \end{bmatrix}, x_2 = \begin{bmatrix} 2 \\ -1 \\ 1 \end{bmatrix}, x_3 = \begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix}$가 구해지고 정규화하면 $P = \begin{bmatrix} -\frac{1}{\sqrt(3)} & \frac{2}{\sqrt(6)} & 0 \\ -\frac{1}{\sqrt(3)} & -\frac{1}{\sqrt(6)} & \frac{1}{\sqrt(2)} \\ \frac{1}{\sqrt(3)} & \frac{1}{\sqrt(6)} & \frac{1}{\sqrt(2)} \end{bmatrix}$가 됩니다.

---

### singular vector decomposition and inverse matrix

$A$를 실수행렬이라고 하고 직교행렬인 $U, V$와 대각선행렬 $\sum$이 존재한다면 $U^TAV = \begin{bmatrix} \sum_1 & O \\ O & O \end{bmatrix}$와 같이 표현이 가능합니다. 이 때 대각선성분들을 특이값(singular value)라고 하고 $U$의 열들을 $A$의 left singular vector, $V$의 열들을 $A$의 right singular vector라고 합니다. $V$는 $A^TA$를, $U$는 $AA^T$를 직교대각화하는 직교행렬입니다. $V^T(A^TA)V = diag_{n*n}, U^T(AA^T)U = diag_{m*m}$으로 둘의 행렬 크기는 다릅니다.

그리고 $A$의 역행렬은 $A^{-1} = V\sum^{-1}U^T$로 표현이 가능합니다.

$rankA = n$인 full column rank를 갖는 $m*n$ 행렬 $A$의 pseudo-inverse는 $A^{\dagger} = (A^TA)^{-1}A^T$입니다.

---

### complex of eigenvalue and eigenvector

유클리드 내적은 두 벡터 $u, v$를 이용하여 $u \cdot v = \bar{v_1}u_1 + \bar{v_2}u_2 + … + \bar{v_n}u_n = <u, v>$로 나타낼 수 있습니다. 내적이 0이면 직교한다고 합니다.

예를 들어 $u = (2i, 0, 1+3i), v = (2-i, 0, 1+3i)$일 때 유클리드 내적값은 $\bar{2-i}(2i) + 0 + \bar{1+3i}(1+3i) = (2+i)(2i) + (1-3i)(1+3i) = 8 + 4i$가 됩니다.

---

### hermitian, unitary, regular matrix

복소행렬 $A$에 대해서 $\bar{A}^T$는 A의 켤레전치행렬(conjugate transpose)라고 하고 $A^*$로 나타냅니다. 정사각 복소행렬 $A$가 $A = A^*$이면 $A$는 Hermitian행렬이라고 합니다. 만약 $A = -A^*$이면 반-Hermitian(skew-Hermitian)행렬이 됩니다. 그리고 $U^*U = I$이면 $U$는 unitary 행렬이고 이 때  $U^* = U^{-1}$도 성립합니다.

행렬 $A \in M_n$이 $AA^* = A^*A$ 를 만족하면 이는 정규행렬(normal matrix)라고 합니다.

---

### 참고 자료

[원본 경로 #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)