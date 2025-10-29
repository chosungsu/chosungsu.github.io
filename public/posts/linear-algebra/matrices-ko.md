---
title: 'Matrices'
date: '2023-03-06'
tags: ['Linear algebra', 'lecture']
---

### Linear Transformations and Matrices

벡터 공간에 대한 순서가 지정된 유한 차원 기저(ordered, finite-dimensional bases)를 통해 선형 연산자(linear operators)를 행렬로 표현할 수 있습니다.

#### Basis Notation

기저를 사용하면 임의의 벡터를 열벡터(column vectors)로 나타낼 수 있습니다. $V = \{ \begin{pmatrix} a & b \\ c & d \end{pmatrix} | a, b, c, d \in R\}$를 성분별로 덧셈과 스칼라 곱셈이 정의된 $2 \times 2$ 실수 행렬의 벡터 공간이 있으면 기저 하나의 선택은 행렬의 순서가 지정된 집합 $B$가 있습니다.

$$
B = (\begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}, \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}, \begin{pmatrix} 0 & 0 \\ 1 & 0 \end{pmatrix}, \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix})
$$

이 집합 내의 요소들을 $e^1_1, e^1_2, e^2_1, e^2_2$로 생각하고 기저 요소의 배수 합으로 작성되도록 해야 합니다.

$$
\begin{aligned}
& v = \begin{pmatrix} a & b \\ c & d \end{pmatrix} \\
&= a \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix} + b \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix} + c \begin{pmatrix} 0 & 0 \\ 1 & 0 \end{pmatrix} + d \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix} \\
&= ae^1_1 + be^1_2 + ce^2_1 + de^2_2 \\
&= \begin{pmatrix} a \\ b \\ c \\ d \end{pmatrix}_B
\end{aligned}
$$

이처럼 벡터 $v$가 어떤 행렬인지 기저 벡터로서 정보를 인코딩하고 열 벡터로 저장합니다.

---

### From Linear operators to Matrices

$L$이 $V$에서 $W$로 가는 선형 연산자일 때, $V$에 대한 순서가 지정된 기저 $B = (b_1, b_2, \dots)$와 $W$에 대한 순서가 지정된 기저 $B' = (\beta_1, \beta_2, \dots)$에서 $L$에 대한 행렬은 다음과 같이 지정된 숫자 $m^j_i$의 배열입니다.

$$
L(b_i) = m^1_i \beta_1 + \cdots + m^j_i \beta_j
$$

이러한 선형 변환 행렬을 계산하려면 기저 벡터 관점에서 변형해야 합니다.

$$
(\beta_1, \beta_2, \dots) \begin{pmatrix} m^1_1 & m^1_2 & \cdots & m^1_i \\ m^2_1 & m^2_2 & \cdots & m^2_i \\ \vdots & \vdots & \ddots & \vdots \\ m^j_1 & m^j_2 & \cdots & m^j_i\end{pmatrix}
$$

따라서 선형 연산자는 순서가 지정된 입력 및 출력 기저가 주어지면 행렬이 됨을 알 수 있습니다.

---

### Properties of matrices

위의 행렬에서 $m^i_j$를 성분(entries)라고 부르는데 위 첨자, 아래 첨자는 각각 행과 열을 나타냅니다.

$r \times 1$ 행렬은 열 벡터(column vector)라고 불리며 아래와 같이 작성됩니다.

$$
v = \begin{pmatrix} v^1 \\ v^2 \\ \vdots \\ v^T \end{pmatrix}
$$

그리고 $1 \times k$ 행렬은 행 벡터(row vector)라고 불리며 아래와 같이 작성됩니다.

$$
v = \begin{pmatrix} v_1 & v_2 & \cdots & v_k\end{pmatrix}
$$

모든 $r \times k$행렬은 덧셈과 스칼라 곱을 가진 벡터 공간입니다.

$$
M^r_k = \{(m^i_j)| m^i_j \in R\}, \\
M + N = (m^i_j) + (n^i_j), \\
rM = r(m^i_j)
$$

이제 $r \times k$와 $k \times 1$를 곱하여 $r \times 1$ 벡터를 생성할 수 있는데 $(Mv)^i = \sum_{j=1}^{k} m^i_j v^j$에서 볼 수 있듯이 각 차원 $r \times 1$인 $s$개의 열벡터를 나란히 배치하는 결과가 됩니다. 따라서 선형성을 유지합니다.

---

### Associativity and Non commutativity

행렬의 많은 속성은 실수에 대한 동일한 속성에서 비롯됩니다.

$\rightarrow$ 행렬 곱셈의 결합 법칙 : $x(yz) = (xy)z$로 실수에서는 곱셈의 순서가 중요하지 않습니다. 동일한 속성이 행렬에도 적용되며 $M = (m^i_j), N = (n^j_k), R = (r^k_l)$이 행렬들이 각각 $m \times n, n \times r, r \times t$임을 가정하면 $(MN)R = (\sum_{k=1}^{r}[\sum_{j=1}^{n} m^i_j n^j_k] r^k_l) = (\sum_{k=1}^{r}m^i_j[\sum_{j=1}^{n} n^j_k r^k_l]) = M(NR)$ 와 같이 결합 법칙이 동일함을 알 수 있습니다.

$\rightarrow$ 행렬 곱셈의 교환 법칙 : 결합 법칙과 다르게 행렬 곱셈은 교환되지 않습니다.

---

### The algebra of Square Matrices

모든 쌍의 행렬이 곱해질 수 있는 것은 아닙니다. 두 행렬을 곱할 때 왼쪽 행렬의 행 수는 오른쪽 행렬의 열 수와 같아야 합니다. 즉 $r \times k, s \times l$에서 $k=s$여야 합니다. 다만 같은 크기의 정사각 행렬이라면 문제가 되지 않습니다.

---

### Trace

큰 행렬은 많은 정보가 있으며 기저를 잘 선택하면 선형 변환 행렬을 매우 간단하게 만들 수도 있습니다. 행렬 크기 $n < \infty$에서 정사각 행렬 $M = (m^i_j)$의 trace는 대각 성분의 합을 말합니다.

$$
tr M = \sum_{i=1}^{n} m^i_i
$$

행렬 곱셈은 교환 법칙이 성립하지 않지만 대각합은 곱셈의 순서에 의존하지 않는 특성이 있습니다.

---

### Inverse Matrix

$$
M^{-1}M = I = MM^{-1}
$$

정사각 행렬 $M$이 가역적(invertible)이거나 비특이적(non-singular)이면 위의 행렬$(M^{-1})$이 존재함을 의미합니다. 만약 역행렬을 갖지 않으면 행렬을 특이(singular) 또는 비가역적(non-invertible)이라고 합니다.

$2 \times 2$ 행렬의 역행렬을 구한다면

$$
M = \begin{pmatrix} a & b \\ c & d \end{pmatrix}, N = \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}
$$

위 두 행렬의 곱은 $(ad-bc)I$가 됩니다. 따라서 $(ad-bc) \ne 0$이라면 역행렬은 $M^{-1} = \frac{1}{ad-bc} \begin{pmatrix} d & -b \\ -c & a\end{pmatrix}$과 같습니다.

역행렬에는 $A$가 정사각 행렬이고 $B$가 $A$의 역행렬이면 $AB=I=BA$로 $A$ 역시 $B$의 역행렬이 된다는 이중 역행렬 성질과, $B^{-1}A^{-1}AB = B^{-1}IB = I$, $ABB^{-1}A^{-1} = AIA^{-1} = I$를 통해 transpose와 유사하게 곱의 역행렬을 취할 때 곱의 순서가 바뀌는 곱의 역행렬 성질이 있으며 $(AB)^T = B^TA^T, I^T=I$를 통해서 $(A^{-1})^T = (A^T)^{-1}$로 전치와 역행렬의 교환 성질을 갖고 있습니다.

#### Linear systems and inverses

$M^{-1}$이 존재하면 $M$과 관련된 선형 시스템을 풀이할 수 있습니다.

$$
\begin{aligned}
& -x + 2y -3z = 1 \\
& 2x + y = 2 \\
& 4x - 2y + 5z = 0
\end{aligned}
$$

위의 연립 선형 방정식은 행렬로 표현이 가능하고 $v = \begin{pmatrix}
1 \\ 2 \\ 0
\end{pmatrix}, Mx = v$를 만족한다면 아래와 같이 구할 수 있습니다.

$$
\begin{aligned}
& \begin{pmatrix}
x \\ y \\ z
\end{pmatrix} = 
\begin{pmatrix}
-1 & 2 & -3 \\
2 & 1 & 0 \\
4 & -2 & 5
\end{pmatrix}^{-1}
\begin{pmatrix}
1 \\ 2 \\ 0
\end{pmatrix} \\
&=\begin{pmatrix}
-1 & 2 & -3 & | & 1 & 0 & 0 \\
2 & 1 & 0 & | & 0 & 1 & 0 \\
4 & -2 & 5 & | & 0 & 0 & 1
\end{pmatrix} \\
&=\begin{pmatrix}
1 & 0 & 0 & | & -5 & 4 & -3 \\
0 & 1 & 0 & | & 10 & -7 & 6 \\
0 & 0 & 1 & | & 8 & -6 & 5
\end{pmatrix} 
\end{aligned}
$$

따라서 $x = M^{-1}v$로 변환할 수 있어 역행렬은 $\begin{pmatrix}
-5 & 4 & -3 \\
10 & -7 & 6 \\
8 & -6 & 5
\end{pmatrix}$가 됩니다.

---

### Homogeneous systems

정사각 행렬 $M$은 동차 시스템 $Mx=0$이 0이 아닌 해를 가질 때에만 가역적이 됩니다. 먼저, $M^{-1}$가 존재한다고 가정합시다. 그러면 $M\mathbf{x} = \mathbf{0} \implies \mathbf{x} = M^{-1}\mathbf{0} = \mathbf{0}$입니다. 따라서 $M$이 가역적이면, $M\mathbf{x} = \mathbf{0}$은 비영 해를 갖지 않습니다.

---

### 참고 자료

[원본 경로 #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[원본 경로 #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)