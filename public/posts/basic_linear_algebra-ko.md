---
title: 'Basic linear algebra'
date: '2024-05-03'
tags: ['Probability&Statistics', 'math']
---

### vector space

실수 해 벡터 공간은 scalar 곱과 vector 합으로 구성이 된 vector들의 set입니다. 정의 기호로는 $R^n$로 나타냅니다.

---

### linear function

두 벡터 공간 $V$, $W$가 있을 때 $f : V \rightarrow W$ 는 $\{\forall x, y \in V \And c \in R\}$의 조건 하에서 $f(cx+y) = cf(x) + f(y)$ 가 성립할 때 선형성을 갖는다고 할 수 있습니다.

모든 선형 함수는 다음과 같은 행렬곱으로 표현이 가능합니다.

$$
f(x) = Ax
$$

---

### matrix

$A = (a_{ij})$가 $n*p$ 크기의 행렬이라고 하면 $R^p$부터 $R^n$까지의 선형성을 보일 수 있습니다.

따라서 아래와 같이 정의할 수 있습니다.

$$
A \in R^{n*p} \\
A^T \in R^{p*n} \\
I_n : n*n
$$

---

### linear subspace

$$
x, y \in L \And c \in R \\
cx + y \in L
$$

위와 같을 경우 $L \subset R^n$은 $R^n$의 subspace라고 할 수 있습니다.

$$
L = \{c_1x_1 + ... + c_kx_k : c_j \in R\} \\ 
\overset{\underset{\mathrm{def}}{}}{=} \{x_1, ..., x_k\}
$$

위와 같을 경우 $L$은 $x$집합으로부터 생성된 집합이라고 할 수 있습니다.

---

### linear independence and basis

$c_1x_1 + ... + c_kx_k = 0$에서 $c_1 = ... = c_k = 0$ 조건이 만족된다면 $\{x_1, ..., x_k\}$가 선형 독립이라고 할 수 있습니다.

그리고 위의 집합이 $L$이라면 $L$의 기저라고 부를 수 있고 여기서 $k$는 $L$의 차원 즉, dim($L$)이라고 정의할 수 있습니다.

---

### inner product space and normed space

inner product space $V$에 대해서 $V*V \rightarrow R$ 와 같이 내적이 형성되었다면 $\forall x, y \in V$이면 <$x, y$> = <$y, x$>, <$cx + y , z$> = a<$x,z$> + <$y,z$>, <$x, x$> > 0을 만족하게 됩니다.

normed space $V$에 대해서 $V \rightarrow R$ 와 같이 형성된다면 $\{\forall x \in V\} \rightarrow |x| \ge 0$이고 $x = 0 \rightarrow |x| = 0$, $|cx| = |c||x|$, $\{\forall x, y \in V\} \rightarrow |x+y| \le |x| + |y|$ 를 만족합니다.

내적은 $|x| = \sqrt{<x, x>}$로 표현되고 $l^p$ norm에 관한 일반화 수식은 아래와 같습니다.

$$
|x| = |x|_{p} \overset{\underset{\mathrm{def}}{}}{=} (\sum_{i=1}^{n} x_i^{p})^{1/p}
$$

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FFIyhg%2FbtqCRyyEJ86%2FUbaS1cpDzIk0wvuc1DeeK1%2Fimg.png" style="display: block; margin: 0 auto; height:200;" />

일반화 수식과 이미지를 참고하면 $l^1$ norm은 절댓값의 합, $l^2$ norm은 제곱값의 합에 루트를 씌운 것임을 알 수 있습니다.

---

### cauchy-scwartz inequality

$V$가 내적 공간에 있을 때 $|<x, y>|^2  \le |x|^2|y|^2$가 성립합니다.

---

### orthonormal basis

$L$의 내적 공간의 기저집합은 orthogonal합니다. 예를 들면 $i \neq j$이면 $<x_i, x_j> = 0$이 됩니다. 이러한 orthogonal 기저집합은 $|x_i| = 1$이라면 orthonormal이라고 할 수 있습니다.

---

### column, row and null spaces

$A \in R^{n*p}$일 때 column space는 $C(A)$로 정의하며 $A$의 columns로 generated된 linear subspace를 의미합니다. row space는 $R(A)$로 정의하며 $A$의 row로 generated된 subspace를 의미합니다.

우선 이를 구하기 앞서 행렬 A를 가우스 소거법을 사용하여 upper triangular U를 구해야 합니다. 이 때 rank가 구해지면 이 열이 바로 column space의 basis가 됩니다. 반대로 해당 개수만큼의 행이 row space의 basis가 됩니다.

아래에는 예시입니다.

$$
A = \begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{bmatrix} \\

\rightarrow 

RREF(A) = \begin{bmatrix}
1 & 0 & -1 \\
0 & 1 & 2 \\
0 & 0 & 0
\end{bmatrix}
$$

이 행렬이 있을 때 rank가 2이므로 column space의 피벗 열은 1, 2열이므로 column space의 basis는 A행렬에서 구해야 해서 $C(A) = span\{\begin{bmatrix} 1 \\ 4 \\ 7 \end{bmatrix}, \begin{bmatrix} 2 \\ 5 \\ 8 \end{bmatrix}\}$ 이 되고 row space는 RREF(A)행렬에서 구해야 해서 $R(A) = span\{\begin{bmatrix} 1 & 0 & -1 \end{bmatrix}, \begin{bmatrix} 0 & 1 & 2 \end{bmatrix}\}$ 이 됩니다.

따라서 차원을 비교하면 dim($C(A)$) = dim($R(A)$) = rank($A$)입니다.

---

### eigenvalue and eigenvector

$A$ 행렬의 eigenvalue는 $\lambda$라고 하며 $Ax = \lambda x$로 계산할 수 있고 이 때 $x$는 eigenvector가 됩니다.

$\lambda$가 eigenvalue가 되기 위한 조건은 det($A-\lambda I_n$) = 0일 때입니다.

---

### 참고 자료

[원본 경로 #1](https://www.dropbox.com/scl/fi/v36rpgglbohl4v2mw55x5/Chap1-linearAlgebra.pdf?rlkey=4mgcyr1cc4xs8ik7gurh1q93y&e=1&dl=0)



