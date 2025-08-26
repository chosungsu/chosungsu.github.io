---
title: 'Coordinate systems'
date: '2023-03-13'
tags: ['Linear algebra', 'lecture']
---

### Coordinates

벡터 공간 $V$의 기저 $B = {v_1, v_2, \dots, v_n}$는 다음 두 조건을 만족하는 벡터 집합입니다.

1.집합 $B$가 $V$ 전체를 span합니다. 즉 $V = \text{span}(B)$입니다.

2.집합 $B$가 선형 독립입니다.

따라서 $V$의 각 벡터 $x^*$는 $B$의 선형 결합$(x^* = c_1v_1 + c_2v_2 + \dots + c_nv_n)$으로 표현될 수 있습니다. 또한, 선형 독립의 정의에 따르면, $\text{span}(B)$에 있는 모든 벡터 $x$는 선형 결합$(v_1, \cdots, v_n)$으로 유일하게 표현될 수 있습니다. 이는 즉 $x^* = t_1v_1 + t_2v_2 + \dots + t_nv_n$을 만족하는 다른 스칼라는 존재하지 않음을 의미합니다.

이를 확인하기 위해, $x^*$를 $B$를 사용하여 두 가지 다른 방식으로 표현할 수 있다고 가정해 봅시다.

$x^* = c_1v_1 + c_2v_2 + \dots + c_nv_n$
$x^* = t_1v_1 + t_2v_2 + \dots + t_nv_n$

이 두식을 빼면 $0=x^*-x^*=(c_1-t_1)v_1+\cdots+(c_n-t_n)v_n$이고 $B$가 선형 독립이므로 영벡터를 만드는 유일한 선형 결합은 자명해 뿐입니다. 따라서 $c_i-t_i=0$이거나 모든 $i$에 대해 $c_i=t_i$여야 합니다.

결과적으로, 기저 $B = {v_1, v_2, \dots, v_n}$에 대해, 스칼라 $c_1, c_2, \cdots, c_n$은 벡터 $x$를 유일하게 결정하며 그 반대도 성립합니다.

---

### Coordinate Vector

벡터 표기법으로 $x$의 $B$ 좌표는 다음과 같이 나타낼 수 있습니다.

$$
[x]_B=\begin{bmatrix}
c_1 \\
c_2 \\
\vdots \\
c_n
\end{bmatrix}
$$

이제 예를 들어 $B$를 $\{\begin{bmatrix} 1 & 0 \\ 0 & 0\end{bmatrix}, \begin{bmatrix} 0 & 1 \\ 0 & 0\end{bmatrix}, \begin{bmatrix} 0 & 0 \\ 1 & 0\end{bmatrix}, \begin{bmatrix} 0 & 0 \\ 0 & 1\end{bmatrix}\}$로 두었을 때 $M_{2 \times 2}$의 기저임을 보이기 위해서는 아래와 같이 계산합니다.

$M = \begin{bmatrix} m_{11} & m_{12} \\ m_{21} & m_{22} \end{bmatrix}=m_{11}\begin{bmatrix} 1 & 0 \\ 0 & 0\end{bmatrix}+m_{12}\begin{bmatrix} 0 & 1 \\ 0 & 0\end{bmatrix} + m_{21}\begin{bmatrix} 0 & 0 \\ 1 & 0\end{bmatrix} + m_{22}\begin{bmatrix} 0 & 0 \\ 0 & 1\end{bmatrix}=\begin{bmatrix} c_1 & c_2 \\ c_3 & c_4\end{bmatrix}=\begin{bmatrix} 0 & 0 \\ 0 & 0\end{bmatrix}$으로 즉 모든 스칼라가 0을 갖는 선형 독립으로 기저임을 알 수 있습니다.

---

### Coordinate Mappings

$B = {v_1, v_2, \dots, v_n}$가 $R^n$의 기저이고 $P = [v_1 \ v_2 \ \dots \ v_n] \in M_{n \times n}$라고 하면 $x=P[x]_B$가 성립합니다. 따라서 $P$를 좌표 변환 행렬이라고 부릅니다.

예를 들어 $P$를 아래와 같이 생각하겠습니다.

$$
P=\begin{bmatrix}
1 & 3 & 3 \\
-1 & -4 & -2 \\
0 & 0 & -1
\end{bmatrix}
$$

행렬 $P$는 $B=(1, 0, -1)$인 좌표를 3차원으로 변환하고 그 결과는 $x=P[x]_B=\begin{bmatrix}
1 & 3 & 3 \\
-1 & -4 & -2 \\
0 & 0 & -1
\end{bmatrix}\begin{bmatrix}
1 \\ 0 \\ -1
\end{bmatrix}=\begin{bmatrix}
-2 \\ 1 \\ 1
\end{bmatrix}$와 같습니다. 이 때 $P$의 역행렬을 구하면 $\begin{bmatrix}
4 & 3 & 6 \\
-1 & -1 & -1 \\
0 & 0 & -1
\end{bmatrix}
$이므로 $v$의 $B$좌표인 $[v]_B=P^{-1}v$로 구하면 됩니다.

---

### Matrix Representation of a Linear Map

$V, W$를 벡터 공간이라고 하고 $T:V \rightarrow W$를 선형 사상이라고 합니다. 이 정의에 따라서 모든 $v, u \in V$와 $\alpha \in \mathbb{R}$에 대해 $T(v+u) = T(v) + T(u)$와 $T(\alpha v) = \alpha T(v)$가 성립합니다. 그리고 선형성에 의해 $T(v)=T(c_1v_1+c_2v_2+\cdots+c_nv_n)=c_1T(v_1)+\cdots+c_nT(v_n)$과 같이 표현할 수 있습니다.

이제 각 벡터 $T(v_j)$는 $W$에 속하고 $\gamma$는 벡터 공간의 기저이므로 스칼라가 존재하면 $T(v_j)=a_{1,j}w_1+\cdots+a_{m,j}w_m$으로 표현하게 되고 즉 $T(v)=\sum_{i=1}^{m}\sum_{j=1}^{n}c_ja_{i,j}w_i$로 간략히 나타낼 수 있습니다. 이를 기저 $B$와 $\gamma$에 대한 선형 사상의 행렬 표현이라고 부릅니다.

---

### 참고 자료

[원본 경로 #1](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)