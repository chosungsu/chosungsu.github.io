---
title: 'The matrix equation'
date: '2023-03-03'
tags: ['Linear algebra', 'lecture']
---

### Warm up

행렬-벡터 곱(matrix-vector multiplication) 연산을 소개하고, 이것이 선형 결합(linear combination) 문제와 어떻게 관련되는지 알아보겠습니다.

---

### Matrix-vector multiplication

$$
Ax=\begin{bmatrix}
a_{11}x_{11}+a_{12}x_{12}+ \cdots + a_{1n}x_n \\
a_{21}x_{21}+a_{22}x_{22}+ \cdots + a_{2n}x_n \\
\vdots \\
a_{m1}x_{m1}+a_{m2}x_{m2}+ \cdots + a_{mn}x_n
\end{bmatrix}
$$

$Ax$ 곱셈이 정의되기 위해서는 행렬 $A$의 열 개수$(n)$와 벡터 $x$의 성분 개수가 같아야 합니다. 즉, $(m * n)*(n * 1) = (m * 1)$여야 합니다.

$R^n$에 속하는 임의의 벡터 $u,v$에 대해 $A(u+v)=Au+Av$가 만족되고 임의의 벡터 $u$와 스칼라 $c$에 대해 $A(cu)=c(Au)$가 만족됩니다.

---

### Solving linear system

행렬 벡터 곱을 선형결합으로 분해하면 $x_1v_1+x_2v_2+ \cdots +x_nv_n$을 

$$
\begin{bmatrix}
x_1a_{11} \\
x_1a_{21} \\
\vdots \\
x_1a_{m1}
\end{bmatrix}
+
\begin{bmatrix}
x_2a_{12} \\
x_2a_{22} \\
\vdots \\
x_2a_{m2}
\end{bmatrix}
+
\cdots
+
\begin{bmatrix}
x_na_{1n} \\
x_na_{2n} \\
\vdots \\
x_na_{mn}
\end{bmatrix}
$$

와 같이 분해가 됩니다. 따라서 $A = \begin{bmatrix} v_1 & v_2 & \dots & v_n \end{bmatrix}$이고 $x = (x_1, x_2, \dots, x_n)$일 때, 다음 관계가 성립합니다.

---

### 참고 자료

[원본 경로 #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)