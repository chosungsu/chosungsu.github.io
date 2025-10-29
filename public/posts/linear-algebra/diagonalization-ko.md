---
title: 'Diagonalization'
date: '2023-03-10'
tags: ['Linear algebra', 'lecture']
---

### Diagonalizability

$L : V \rightarrow V$이고 순서 기저 $\mathcal{B} = (\mathbf{v}_1, \dots, \mathbf{v}_n)$가 고유값 $\lambda_1, \dots, \lambda_n$을 가진 $L$의 고유 벡터 집합이라고 가정합니다.

$$
L(v_1) = \lambda_1v_1 \\
L(v_2) = \lambda_2v_2 \\
\vdots \\
L(v_n) = \lambda_nv_n
$$

결과적으로, 고유 벡터 기저 $\mathcal{B}$에서 $L$의 행렬은 대각 행렬입니다.

$$
L \begin{pmatrix} x^1 \\ x^2 \\ \vdots \\ x^n \end{pmatrix}_{\mathcal{B}} = \begin{pmatrix} \begin{pmatrix} \lambda_1 & & & \\ & \lambda_2 & & \\ & & \ddots & \\ & & & \lambda_n \end{pmatrix} \begin{pmatrix} x^1 \\ x^2 \\ \vdots \\ x^n \end{pmatrix} \end{pmatrix}_{\mathcal{B}}
$$

여기서 대각선이 아닌 모든 항목은 0입니다. $L: V \to V$ 선형 변환이 $L$에 대해 $n$개의 선형 독립인 고유 벡터 모음이 존재할 때 대각화 가능(diagonalizable)하다고 부릅니다. $n \times n$ 행렬이 대각 행렬이면 표준 기저 벡터 $\mathbf{e}_i$는 이미 $n$개의 선형 독립인 고유 벡터 집합이어야 합니다.

---

### Change of Basis

벡터 공간 $V$에 대한 두 개의 순서 기저 $\mathcal{S} = (\mathbf{v}_1, \dots, \mathbf{v}_n)$와 $\mathcal{S}' = (\mathbf{v}'_1, \dots, \mathbf{v}'_n)$가 있다고 가정합니다. 아래는 $\mathbf{v}'_k$를 $\mathbf{v}_i$의 선형 결합으로 나타낸 것입니다.

$$
\begin{aligned}
& \begin{pmatrix} \mathbf{v}'_1, \mathbf{v}'_2, \cdots, \mathbf{v}'_n \end{pmatrix} = \\ 
& \begin{pmatrix} \mathbf{v}_1, \mathbf{v}_2, \cdots, \mathbf{v}_n \end{pmatrix} \begin{pmatrix} p^1_1 & p^1_2 & \cdots & p^1_n \\ p^2_1 & p^2_2 & & \vdots \\ \vdots & & \ddots & \vdots \\ p^n_1 & \cdots & & p^n_n \end{pmatrix}
\end{aligned}
$$

여기서 $p^i_k$는 상수이며, 우리는 이를 정사각 행렬 $P = (p^i_k)$의 항목으로 간주할 수 있습니다. 행렬 $P$는 역행렬을 가져야 합니다. 왜냐하면 우리는 각 $\mathbf{v}_j$를 $\mathbf{v}'_k$의 선형 결합으로 유일하게 작성할 수도 있기 때문입니다.

$$
\mathbf{v}_j = \sum_k \mathbf{v}'_k q^k_j, \\
\mathbf{v}_j = \sum_k \sum_i \mathbf{v}_i p^i_k q^k_j
$$

결과적으로, 각 $\mathbf{v}_j$는 고유값 1을 가진 $P Q$의 고유 벡터이므로, $P Q$는 항등 행렬, 즉 $P Q = I$입니다. 그리고 행렬 $P$는 기저 변환 행렬(change of basis matrix)이라고 불립니다. 이 행렬은 첫번째 열이 $v_1, \dots, v_n$ 기저에서 벡터 $v'_1$의 성분일 뿐임을 말합니다. 기저 변환 행렬의 열은 이전 기저 벡터로 표현된 새 기저 벡터의 성분입니다.

예를 들어 $V$에 대한 순서 기저 $\mathcal{S}' = (\mathbf{v}'_1, \mathbf{v}'_2)$가 있고, $V$에 대한 다른 순서 기저 $\mathcal{S} = (\mathbf{v}_1, \mathbf{v}_2)$에 대해 

$$
v'_1 = \begin{pmatrix} \frac{1}{\sqrt{2}} \\ \frac{1}{\sqrt{2}} \end{pmatrix}_S, 
v'_2 = \begin{pmatrix} \frac{1}{\sqrt{3}} \\ -\frac{1}{\sqrt{3}} \end{pmatrix}_S
$$

위 기저들로부터 $v'_1 = \begin{pmatrix} v_1, v_2\end{pmatrix}\begin{pmatrix} \frac{1}{\sqrt{2}} \\ \frac{1}{\sqrt{2}} \end{pmatrix} = \frac{v_1+v_2}{\sqrt{2}}$, $v'_2 = \begin{pmatrix} v_1, v_2\end{pmatrix}\begin{pmatrix} \frac{1}{\sqrt{3}} \\ -\frac{1}{\sqrt{3}} \end{pmatrix} = \frac{v_1-v_2}{\sqrt{3}}$을 의미할 수 있습니다. 또한 행렬 $P$ 역시 $v'_1, v'_2$의 성분을 열로 가지게 됩니다. 기저를 변경하면 선형 변환의 행렬이 변경됩니다. 그러나 벡터 공간 사이의 사상(map)으로서 선형 변환은 우리가 어떤 기저를 사용하든 동일합니다.

아래는 기저 변환에 대한 예시입니다.

$$
L(1) = \begin{pmatrix} 1 \\ 2 \end{pmatrix}, L(t) = \begin{pmatrix} 2 \\ 1 \end{pmatrix}, L(t^2) = \begin{pmatrix} 3 \\ 3 \end{pmatrix}
$$

위 선형 변환에 의하여 기저 $\mathcal{S} = (1, t, t^2)$와 $\mathbb{R}^2$의 표준 기저 $(\mathbf{e}_1, \mathbf{e}_2)$에서 $L$의 행렬 $M$을 즉시 읽을 수 있습니다.

$$
\begin{aligned}
&\begin{pmatrix} L(1), L(t), L(t^2) \end{pmatrix} \\
&= (\mathbf{e}_1 + 2 \mathbf{e}_2, 2 \mathbf{e}_1 + \mathbf{e}_2, 3 \mathbf{e}_1 + 3 \mathbf{e}_2) \\
&= \begin{pmatrix} \mathbf{e}_1, \mathbf{e}_2 \end{pmatrix} \begin{pmatrix} 1 & 2 & 3 \\ 2 & 1 & 3 \end{pmatrix} \\
& \Rightarrow M = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 1 & 3 \end{pmatrix}
\end{aligned}
$$

이제 새로운 입력 기저 벡터에 $L$을 대입하겠습니다.

$$
\begin{aligned} 
& \left( L(1 + t), L(t + t^2), L(1 + t^2) \right) \\ &= \left( \begin{pmatrix} 1 \\ 2 \end{pmatrix} + \begin{pmatrix} 2 \\ 1 \end{pmatrix}, \begin{pmatrix} 2 \\ 1 \end{pmatrix} + \begin{pmatrix} 3 \\ 3 \end{pmatrix}, \begin{pmatrix} 1 \\ 2 \end{pmatrix} + \begin{pmatrix} 3 \\ 3 \end{pmatrix} \right) \\ &= \left( \begin{pmatrix} 3 \\ 3 \end{pmatrix}, \begin{pmatrix} 5 \\ 4 \end{pmatrix}, \begin{pmatrix} 4 \\ 5 \end{pmatrix} \right) 
\end{aligned}
$$

$\mathbf{w}'_1 = \begin{pmatrix} 1 \\ 2 \end{pmatrix}$, $\mathbf{w}'_2 = \begin{pmatrix} 2 \\ 1 \end{pmatrix}$이므로 $\mathbf{w}'_1 + \mathbf{w}'_2 = \mathbf{w}'_3 =  \begin{pmatrix} 3 \\ 3 \end{pmatrix}$, $\mathbf{w}'_1 + 2 \mathbf{w}'_2 = \begin{pmatrix} 5 \\ 4 \end{pmatrix}$, $2 \mathbf{w}'_1 + \mathbf{w}'_2 = \begin{pmatrix} 4 \\ 5 \end{pmatrix}$임을 관찰하면

$$
\begin{aligned} 
& \left( L(1 + t), L(t + t^2), L(1 + t^2) \right) \\ &= (\mathbf{w}'_1 + \mathbf{w}'_2, \mathbf{w}'_1 + 2 \mathbf{w}'_2, 2 \mathbf{w}'_1 + \mathbf{w}'_2) \\ &= \begin{pmatrix} \mathbf{w}'_1, \mathbf{w}'_2 \end{pmatrix} \begin{pmatrix} 1 & 1 & 2 \\ 1 & 2 & 1 \end{pmatrix} \\
& \Rightarrow M' = \begin{pmatrix} 1 & 1 & 2 \\ 1 & 2 & 1 \end{pmatrix} 
\end{aligned}
$$

이렇게 행렬 $M'$를 다른 기저에 대해 변환하여 표현할 수 있게 됩니다.

$$
\begin{aligned}
& \begin{pmatrix} 1 + t, t + t^2, 1 + t^2 \end{pmatrix} \\
&= \begin{pmatrix} 1, t, t^2 \end{pmatrix} \begin{pmatrix} 1 & 0 & 1 \\ 1 & 1 & 0 \\ 0 & 1 & 1 \end{pmatrix} \\
& \Rightarrow P = \begin{pmatrix} 1 & 0 & 1 \\ 1 & 1 & 0 \\ 0 & 1 & 1 \end{pmatrix}
\end{aligned}
$$

그리고

$$
\begin{aligned}
& \begin{pmatrix} \mathbf{w}'_1, \mathbf{w}'_2 \end{pmatrix} \\
&= (\mathbf{e}_1 + 2 \mathbf{e}_2, 2 \mathbf{e}_1 + \mathbf{e}_2) \\
&= \begin{pmatrix} \mathbf{e}_1, \mathbf{e}_2 \end{pmatrix} \begin{pmatrix} 1 & 2 \\ 2 & 1 \end{pmatrix} \\
& \Rightarrow Q = \begin{pmatrix} 1 & 2 \\ 2 & 1 \end{pmatrix}
\end{aligned}
$$

따라서

$$
\begin{aligned}
& M' = Q^{-1} M P \\
&= -\frac{1}{3} \begin{pmatrix} 1 & -2 \\ -2 & 1 \end{pmatrix} \begin{pmatrix} 1 & 2 & 3 \\ 2 & 1 & 3 \end{pmatrix} \begin{pmatrix} 1 & 0 & 1 \\ 1 & 1 & 0 \\ 0 & 1 & 1 \end{pmatrix} \\
&= \begin{pmatrix} 1 & 1 & 2 \\ 1 & 2 & 1 \end{pmatrix}
\end{aligned}
$$

이를 통해서도 구할 수 있습니다.

---

### Changing to a Basis of Eigenvectors

고유 벡터 기저로 변경하는 경우, 다양한 단순화가 있습니다.

$L : V \to V$이므로, 동일한 입력 기저와 출력 기저 $\mathcal{S} = (\mathbf{u}_1, \dots, \mathbf{u}_n)$를 사용하여 $L$의 행렬 $M$을 이미 알고 있을 가능성이 높습니다.

새로운 고유 벡터 기저 $\mathcal{S}' = (\mathbf{v}_1, \dots, \mathbf{v}_n)$에서 $L$의 행렬 $D$는 대각 행렬입니다. 왜냐하면 $L \mathbf{v}_i = \lambda_i \mathbf{v}_i$이므로

$$
\begin{aligned}
& \begin{pmatrix} L(\mathbf{v}_1), L(\mathbf{v}_2), \dots, L(\mathbf{v}_n) \end{pmatrix} = \\
& \begin{pmatrix} \mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_n \end{pmatrix} \begin{pmatrix} \lambda_1 & 0 & \cdots & 0 \\ 0 & \lambda_2 & & \vdots \\ \vdots & & \ddots & 0 \\ 0 & \cdots & 0 & \lambda_n \end{pmatrix}
\end{aligned}
$$

이기 때문입니다.

$P$가 $\mathcal{S}$에서 $\mathcal{S}'$로의 기저 변환 행렬이면, 고유값의 대각 행렬 $D$와 원래 행렬은 다음 관계를 가집니다.

$$
D = P^{-1} M P
$$

두 행렬 $N$과 $M$에 대해 $M = P^{-1} N P$를 만족하는 행렬 $P$가 존재하면, 우리는 $M$과 $N$이 유사하다(similar)고 말합니다.

예를 들어 행렬이 아래와 같이 존재한다면 

$$
M = \begin{pmatrix} -14 & -28 & -44 \\ -7 & -14 & -23 \\ 9 & 18 & 29 \end{pmatrix}
$$

대각화를 진행하기 위해 우선 행렬식을 구하면

$$
\begin{aligned}
& det(M-\lambda I) \\
&= (-14-\lambda)det\begin{pmatrix}​ -14-\lambda & -23 \\ 18 & 29-\lambda \end{pmatrix} \\
& -(-28)det\begin{pmatrix}​ -7 & -23 \\ 9 & 29-\lambda \end{pmatrix} \\
& +(-44)det\begin{pmatrix}​ -7 & -14-\lambda \\ 9 & 18 \end{pmatrix} \\
&= (-14-\lambda) (\lambda^2-15\lambda+8) \\
&+(28)(7\lambda+4) \\
&-44(9\lambda) \\
&=-\lambda^3+\lambda^2 +2\lambda = 0
\end{aligned}
$$

위와 같이 구해지며 $M$의 고유값은 $\{-1, 0, 2\}$와 같고 행렬 $M$이 대각화가 가능하려면 이 고유값을 통해 얻는 벡터 $v_1, v_2, v_3$이 선형 독립이어야 하며 행렬 $P$를 아래와 같이 열벡터를 합쳐 나타낸다면 

$$
\begin{aligned}
& P = \begin{pmatrix} \mathbf{v}_1 & \mathbf{v}_2 & \mathbf{v}_3 \end{pmatrix} \\
&= \begin{pmatrix} -8 & -2 & -1 \\ -1 & 1 & -1 \\ 3 & 0 & 1 \end{pmatrix}
\end{aligned}
$$

이 행렬의 행렬식이 $-1$로써 가역적임을 알 수 있습니다. 그리고 $MP$ 역시 대각화가 가능하며 $P$의 열은 고유 벡터의 성분이므로 아래와 같이 표현이 가능합니다.

$$
\begin{aligned}
& MP = \begin{pmatrix} Mv_1 & Mv_2 & Mv_3\end{pmatrix} \\ 
&=\begin{pmatrix} -v_1 & 0v_2 & 2v_3\end{pmatrix} \\
&=\begin{pmatrix} v_1 & v_2 & v_3\end{pmatrix} \begin{pmatrix} -1 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 2\end{pmatrix}
\end{aligned}
$$

이를 통해 알 수 있는 점은 고유 벡터 행렬 $P$가 $M$을 대각화하는 기저 변환 행렬이라는 것입니다.

---

### 참고 자료

[원본 경로 #1](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)

[원본 경로 #2](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[원본 경로 #3](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)