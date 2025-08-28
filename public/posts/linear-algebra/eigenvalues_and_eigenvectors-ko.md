---
title: 'Eigenvalues and Eigenvectors'
date: '2023-03-15'
tags: ['Linear algebra', 'lecture']
---

### Eigenvalues and Eigenvectors

$n \times n$ 행렬 $A$는 임의의 새로운 출력 벡터 $A\mathbf{x}$는 입력 벡터 $\mathbf{x}$의 단순한 스칼라 배수가 됩니다. 즉, $A\mathbf{x} = \lambda\mathbf{x}$를 만족하는 스칼라 $\lambda$가 존재합니다. 이 때 $\mathbf{v}$를 $A$의 고유벡터라고 부르고 스칼라를 $\mathbf{v}$에 해당하는 고유값이라고 부릅니다.

따라서 고유벡터는 $A$를 곱해도 스칼라에 의해 크기만 변할 뿐 방향은 바뀌지 않습니다. 또한 고유벡터는 영벡터가 될 수는 없습니다.

$$
A=\begin{bmatrix}
4 & -1 & 6 \\
2 & 1 & 6 \\
2 & -1 & 8
\end{bmatrix}, \\
v=\begin{bmatrix}
-3 \\
0 \\
1
\end{bmatrix}, \\
u=\begin{bmatrix}
-1 \\
2 \\
1
\end{bmatrix}
$$

예를 들어 위와 같은 행렬과 벡터들로 고유벡터 및 고유값을 계산해보겠습니다. 우선 $Av=2*\begin{bmatrix}
-3 \\
0 \\
1
\end{bmatrix}=2v$가 되므로 이는 고유벡터가 성립하고 고유값 $\lambda=2$임을 알 수 있습니다. 하지만 $Au=\begin{bmatrix}
0 \\
6 \\
4
\end{bmatrix} \ne c*u$와 같이 $u$벡터는 스칼라곱으로 표현되지 않으므로 고유벡터가 성립할 수 없습니다.

만약 고유값이 0이라면 $A\mathbf{v} = 0 \cdot \mathbf{v} = \mathbf{0}$을 만족하는 영벡터가 아닌 벡터 $\mathbf{v}$가 존재합니다. 다시 말해, $\mathbf{v}$는 $A$의 null space에 속하고 역행렬을 가지지 않습니다.

---

### Characteristic Polynomial of a Matrix

숫자 $\lambda$는 $A \in \mathbb{R}^{n \times n}$의 고유값이라면, $A\mathbf{v} = \lambda\mathbf{v}$를 만족하는 영벡터가 아닌 벡터 $\mathbf{v}$가 존재한다는 것을 통해서 $\mathbf{v} \in \text{Null}(A - \lambda I)$와 동치라고 할 수 있습니다. 다시 말해 $\lambda$가 $A$의 고유값인 경우에만 영벡터 외의 벡터를 포함합니다.

우리는 어떤 행렬 $M$이 비자명한 영공간을 가질 필요충분조건은 $M$이 비가역이며 이는 $det(M)=0$과 동치인 것입니다. 따라서 $det(A-\lambda I)=0$을 만족하는 경우에만 고유값입니다.

예를 들어 $A = \begin{bmatrix} -2 & 4 \ -6 & 8 \end{bmatrix}$의 특성 다항식 $p(\lambda)$을 구해보면 $det(A-\lambda I)=(-2-\lambda)(8-\lambda)-(-24)=(\lambda-4)(\lambda-2)$를 갖게 되고 해가 4, 2이며 이는 고유값에 해당합니다.

---

### Eigenvalues of Triangular Matrices

행렬 $A$가 삼각행렬이면 고유값은 주대각선 성분입니다. 예를 들어 아래와 같은 행렬이 있을 때 특성 다항식과 고유값을 구해보겠습니다.

$$
A=\begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
0 & a_{22} & a_{23} \\
0 & 0 & a_{33}
\end{bmatrix}
$$

여기서 $p(\lambda)=det(A-\lambda I)=(a_{11}-\lambda)(a_{22}-\lambda)(a_{33} - \lambda)$와 같이 표현이 가능하고 해는 결국 주대각선 성분임을 알 수 있습니다.

---

### Diagonalization

두 행렬 $A, B$가 $A = PBP^{-1}$를 만족하는 가역 행렬 $P$가 존재할 때 similar 관계라고 할 수 있으며 따라서 $A$가 대각화 가능하다는 의미는 대각 행렬 $D$와 similar하다는 것입니다.

가역 행렬 $P = \begin{bmatrix} \mathbf{v}_1 & \mathbf{v}_2 & \cdots & \mathbf{v}_n \end{bmatrix}$과 대각 행렬 $D = \begin{bmatrix} \lambda_1 & 0 & \cdots & 0 \\ 0 & \lambda_2 & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & \lambda_n \end{bmatrix}$가 존재하여 $A = PDP^{-1}$가 성립합니다.

이 식의 양변에 행렬 $P$를 곱한다면 $AP=PD$를 얻을 수 있는데 $[Av_1 Av_2 \cdots Av_n]=[\lambda_1v_1 \lambda_2v_2 \cdots \lambda_nv_n]$에서 즉 $P$의 열 벡터가 고유벡터이며 행렬은 가역행렬이므로 기저에 해당합니다.

대각화 가능하다고 보는 조건은 다음과 같습니다.

1.$n$개의 서로 다른 고유값을 가집니다.

2.고유값의 대수적 중복도와 기하적 중복도가 같습니다.

---

### Symmetric Matrices

$$
A=\begin{bmatrix}
1 & -3 & 7 \\
-3 & 2 & 8 \\
7 & 8 & 4
\end{bmatrix}
$$

정사각 행렬 $A$가 $A^T=A$일 때 대칭(symmetric)이라고 합니다. 예를 들어 연속적인 2차 편미분을 가지는 함수 $f(x_1, x_2, \dots, x_n)$에 대해, 다변수 미적분학의 클레로 정리(Clairaut's Theorem)는 $\frac{\partial^2 f}{\partial x_i \partial x_j} = \frac{\partial^2 f}{\partial x_j \partial x_i}$라고 말합니다. 따라서 $f$의 해시안 행렬은 대칭이 됩니다.

$$
Hess(f)=\begin{bmatrix}
\frac{\partial^2 f}{\partial x_1 \partial x_1} & \cdots & \frac{\partial^2 f}{\partial x_1 \partial x_n} \\
\frac{\partial^2 f}{\partial x_2 \partial x_1} & \cdots & \frac{\partial^2 f}{\partial x_2 \partial x_n} \\
\vdots & \ddots & \vdots \\
\frac{\partial^2 f}{\partial x_n \partial x_1} & \cdots & \frac{\partial^2 f}{\partial x_n \partial x_n}
\end{bmatrix}
$$

다변수 미적분학에서 이계 도함수 판정법에 따르면 $P=(a_1, a_2, \dots, a_n)$이 $f$의 임계점이라면 즉, $\frac{\partial f}{\partial x_i}(P)=0$과 같은 경우 $Hess(f)$의 모든 고유값이 양수이면 $P$는 극소점, 음수이면 극대점, 음수와 양수를 모두 가지면 안장점(saddle point)라고 합니다.

$A$가 대칭 행렬일 때 $v_1, v_2$가 서로 다른 고유값에 해당하는 고유벡터라면 직교하는 대상이 됩니다.

$$
A=\begin{bmatrix}
1& 0 & -1 \\
0 & 1 & 1 \\
-1 & 1 & 2
\end{bmatrix}
$$

$A$의 고유벡터로 이루어진 정규직교 기저 ${\mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_n}$가 존재합니다. $P^TP=I, A=PDP^T$입니다. 위의 $A$ 행렬의 특성 다항식은 $p(\lambda)=det(A-\lambda I)=\lambda(\lambda-1)(\lambda-3)$이 되므로 고유값은 $0, 1, 3$입니다. 각 고유값으로 얻는 고유벡터는 $u_1=\begin{bmatrix} 1 \\ -1 \\ 1\end{bmatrix}, u_2=\begin{bmatrix} 1 \\ 1 \\ 0\end{bmatrix}, u_3=\begin{bmatrix} -1 \\ 1 \\ 2\end{bmatrix}$와 같습니다. 그리고 각 고유벡터는 직교집합 $u_1^Tu_2=u_1^Tu_3=u_2^Tu_3=0$을 형성합니다. 이어서 정규직교 행렬을 만들어 보면 아래와 같습니다.

$$
P=[v_1 v_2 v_3]=\begin{bmatrix} \frac{1}{\sqrt{3}} & \frac{1}{\sqrt{2}} & -\frac{1}{\sqrt{6}}\\ -\frac{1}{\sqrt{3}} & \frac{1}{\sqrt{2}} & \frac{1}{\sqrt{6}} \\ \frac{1}{\sqrt{3}} & 0 & \frac{2}{\sqrt{6}}\end{bmatrix}
$$

그리고 $A=P\begin{bmatrix} 0 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 3\end{bmatrix}P^T$가 성립함을 확인할 수 있습니다.

---

### 참고 자료

[원본 경로 #1](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)