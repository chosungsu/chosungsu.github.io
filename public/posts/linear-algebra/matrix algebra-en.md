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

Given two matrices as above, their sum is

$$
A+B=\begin{bmatrix} a_{11}+b_{11} & a_{12}+b_{12} & \cdots & a_{1n}+b_{1n} \\
a_{21}+b_{21} & a_{22}+b_{22} & \cdots & a_{2n}+b_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1}+b_{m1} & a_{m2}+b_{m2} & \cdots & a_{mn}+b_{mn}
\end{bmatrix}
$$

For a scalar $\alpha$, the scalar multiple $\alpha A$ is defined as

$$
\alpha A=\begin{bmatrix} \alpha a_{11} & \alpha a_{12} & \cdots & \alpha a_{1n} \\
\alpha a_{21} & \alpha a_{22} & \cdots & \alpha a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
\alpha a_{m1} & \alpha a_{m2} & \cdots & \alpha a_{mn}
\end{bmatrix}
$$

---

### Matrix Multiplication

Given an $m\times n$ matrix $A$ and an $n\times p$ matrix $B$, the product is defined by
$AB=[Ab_1\; Ab_2\; \dots\; Ab_p]$, where $b_j$ is the $j$-th column of $B$. The matrix product $AB$ is defined only when the number of columns of $A$ equals the number of rows of $B$.

---

### Matrix Transpose

Given an $m\times n$ matrix $A$, the transpose $A^T$ is the matrix whose $i$-th row of $A$ becomes the $i$-th column of $A^T$ (equivalently, $(A^T)_{ij}=A_{ji}$).

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

It can be transformed as above.

The properties of the transpose are as follows:

1. $(A^T)^T=A$

2. $(A+B)^T=A^T+B^T$

3. $(\alpha A)^T=\alpha A^T$

4. $(AB)^T=B^T A^T$

---

### Inverse of a Matrix

The inverse of a square matrix $A \in \mathbb{R}^{n \times n}$ generalizes the concept of reciprocal of a nonzero real number $a \in \mathbb{R}$. Formally, the reciprocal of a nonzero real number $a \in \mathbb{R}$ is the unique real number $c \in \mathbb{R}$ that satisfies $ac=ca=1$. Usually denoted as $a^{-1} = \frac{1}{a}$, the reciprocal of a nonzero $a$ can be used to solve equations of the form $ax=b$.

This leads to definitions like $ax=b \rightarrow a^{-1}ax=a^{-1}b \rightarrow x=a^{-1}b$.

A matrix $A \in \mathbb{R}^{n \times n}$ is called invertible if there exists a matrix $C$ satisfying $AC=I_n$ and $CA=I_n$. An invertible matrix can have only one inverse. Also, $AA^{-1}=A^{-1}A=I_n$ holds.

If matrix $A$ is invertible, we calculate its inverse as follows:

If $A^{-1}=[c_1 c_2 \cdots c_n]$, then $AA^{-1}=[Ac_1 Ac_2 \cdots Ac_n]$ and with $I_n=[e_1 e_2 \cdots e_n]$, we can reduce to RREF: $[A e_1] \sim [I_n c_1]$.

For example, if $A=\begin{bmatrix} 1 & 3 \\ -1 & -2 \end{bmatrix}$, we start with the augmented matrix $[A I_2]=\begin{bmatrix} 1 & 3 & 1 & 0 \\ -1 & -2 & 0 & 1\end{bmatrix}$. First, performing $R_1+R_2$ gives $\begin{bmatrix} 1 & 3 & 1 & 0 \\ 0 & 1 & 1 & 1\end{bmatrix}$, then $-3R_2+R_1$ gives $\begin{bmatrix} 1 & 0 & -2 & -3 \\ 0 & 1 & 1 & 1\end{bmatrix}$. Since we have $I_n$ in the RREF, the remaining matrix automatically becomes the inverse. Therefore, the inverse is $\begin{bmatrix} -2 & -3 \\ 1 & 1\end{bmatrix}$.

---

### References

[Original Source #1](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)