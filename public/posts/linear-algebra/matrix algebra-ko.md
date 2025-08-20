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

### 참고 자료

[원본 경로 #1](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)