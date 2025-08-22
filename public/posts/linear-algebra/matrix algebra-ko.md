---
title: 'Matrix algebra'
date: '2023-03-08'
tags: ['Linear algebra', 'lecture']
---

### Sums of Matrices

$$
A=\begin{bmatrix} a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{bmatrix} ,
B=\begin{bmatrix} b_{11} & b_{12} & \cdots & b_{1n} \\
b_{21} & b_{22} & \cdots & b_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
b_{m1} & b_{m2} & \cdots & b_{mn}
\end{bmatrix}
$$

위와 같은 두 행렬이 있을 때 행렬합은 다음과 같습니다.

$$
A+B=\begin{bmatrix} a_{11}+b_{11} & a_{12}+b_{12} & \cdots & a_{1n}+b_{1n} \\
a_{21}+b_{21} & a_{22}+b_{22} & \cdots & a_{2n}+b_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1}+b_{m1} & a_{m2}+b_{m2} & \cdots & a_{mn}+b_{mn}
\end{bmatrix}
$$

스칼라 $\alpha$에 대해 $\alpha*A$는 아래와 같이 정의됩니다.

$$
\alpha*A=\begin{bmatrix} \alpha*a_{11} & \alpha*a_{12} & \cdots & \alpha*a_{1n} \\
\alpha*a_{21} & \alpha*a_{22} & \cdots & \alpha*a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
\alpha*a_{m1} & \alpha*a_{m2} & \cdots & \alpha*a_{mn}
\end{bmatrix}
$$

---

### Matrix Multiplication

$m*n$ 행렬 $A$와 $n*p$ 행렬 $B$가 주어졌을 때 $AB=[Ab_1 Ab_2 \dots Ab_p]$로 정의됩니다. 행렬 $AB$는 $A$의 열의 개수와 $B$의 행의 개수가 같을 때에만 정의됩니다.

---

### Matrix Transpose

$m*n$ 행렬 $A$가 주어졌을 때 전치행렬 $A^T$는 $A$의 $i$번째 행이 전치행렬의 $i$번째 열이 되는 행렬이 전치행렬 정의입니다.

$$
A=\begin{bmatrix} 0 & -1 & 8 & -7 & -4 \\
-4 & 6 & -10 & -9 & 6 \\
9 & 5 & -2 & -3 & 5 \\
-8 & 8 & 4 & 7 & 7
\end{bmatrix}
\rightarrow
A^T=\begin{bmatrix} 0 & -4 & 9 & -8 \\
-1 & 6 & 5 & 8 \\
8 & -10 & -2 & 4 \\
-7 & -9 & -3 & 7 \\
-4 & 6 & 5 & 7
\end{bmatrix}
$$

위와 같이 바꿀 수 있습니다.

전치행렬의 성질은 다음과 같습니다.

1.$(A^T)^T=A$

2.$(A+B)^T=A^T+B^T$

3.$(\alpha*A)^T=\alpha*A^T$

4.$(AB)^T=B^TA^T$

---

### Inverse of a Matrix

정방행렬 $A \in \mathbb{R}^{n \times n}$의 역행렬은 0이 아닌 실수 $a \in \mathbb{R}$의 역수 개념을 일반화한 것입니다. 형식적으로, 0이 아닌 실수 $a \in \mathbb{R}$의 역수는 $ac=ca=1$을 만족하는 유일한 실수 $c \in \mathbb{R}$입니다. 보통 $a^{-1} = \frac{1}{a}$로 표기되는 0이 아닌 a의 역수는 방정식 $ax=b$를 푸는 데 사용될 수 있습니다.

따라서 $ax=b \rightarrow a^{-1}ax=a^{-1}b \rightarrow x=a^{-1}b$ 와 같은 정의를 이끌어냅니다.

그리고 행렬 $A \in \mathbb{R}^{n \times n}$이 $AC=I_n$이고 $CA=I_n$을 만족하는 행렬 $C$가 존재한다면 $A$는 가역행렬이라고 합니다. 가역행렬에는 단 하나의 역행렬만 가질 수 있습니다. 또한 $AA^{-1}=A^{-1}A=I_n$이 성립합니다.

만약 행렬 $A$가 가역행렬이라면 역행렬 계산은 아래와 같이 진행합니다.

$A^{-1}=[c_1 c_2 \cdots c_n]$이라면 $AA^{-1}=[Ac_1 Ac_2 \cdots Ac_n]$이고 $I_n=[e_1 e_2 \cdots e_n]$과 같다는 전제가 성립하고 RREF를 간단히 하면 $[A e_1] \sim [I_n c_1]$이 됩니다.

예를 들어 $A=\begin{bmatrix} 1 & 3 \\ -1 & -2 \end{bmatrix}$이면 $[A I_2]=\begin{bmatrix} 1 & 3 & 1 & 0 \\ -1 & -2 & 0 & 1\end{bmatrix}$ 행렬에서부터 행감소를 진행합니다. 우선 $R_1+R_2$를 진행하면 $\begin{bmatrix} 1 & 3 & 1 & 0 \\ 0 & 1 & 1 & 1\end{bmatrix}$이 되고 $-3R_2+R_1$을 진행하면 $\begin{bmatrix} 1 & 0 & -2 & -3 \\ 0 & 1 & 1 & 1\end{bmatrix}$이 되고 RREF값에 $I_n$이 존재하므로 나머지 행렬값이 자동으로 역행렬이 되게 됩니다. 따라서 역행렬은 $\begin{bmatrix} -2 & -3 \\ 1 & 1\end{bmatrix}$입니다.

---

### 참고 자료

[원본 경로 #1](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)