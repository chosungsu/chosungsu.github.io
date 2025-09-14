---
title: 'The matrix equation'
date: '2023-03-03'
tags: ['Linear algebra', 'lecture']
---

### Warm up

We introduce matrix–vector multiplication and explain how it relates to the problem of linear combinations.

---

### Matrix-vector multiplication

$$
Ax=\begin{bmatrix}
a_{11}x_1+a_{12}x_2+ \cdots + a_{1n}x_n \\
a_{21}x_1+a_{22}x_2+ \cdots + a_{2n}x_n \\
\vdots \\
a_{m1}x_1+a_{m2}x_2+ \cdots + a_{mn}x_n
\end{bmatrix}
$$


For the product $Ax$ to be defined, the number of columns of the matrix $A$ (which is $n$) must equal the number of components of the vector $x$. That is, $(m\times n)\cdot(n\times 1)=(m\times 1)$.

For any vectors $u,v\in \mathbb{R}^n$, we have $A(u+v)=Au+Av$, and for any vector $u$ and scalar $c$, we have $A(cu)=c(Au)$.

---

### Solving linear system

If we decompose a matrix–vector product as a linear combination, $x_1v_1+x_2v_2+ \cdots +x_nv_n$ can be written as

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

Thus it decomposes as above. Therefore, when $A = \begin{bmatrix} v_1 & v_2 & \dots & v_n \end{bmatrix}$ and $x = (x_1, x_2, \dots, x_n)$, the following relation holds:

$$
Ax = x_1 v_1 + x_2 v_2 + \cdots + x_n v_n.
$$

---

### References

[Original Source #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)