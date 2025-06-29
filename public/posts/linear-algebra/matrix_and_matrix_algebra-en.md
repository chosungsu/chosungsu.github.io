---
title: 'Matrix and Matrix algebra'
date: '2023-03-10'
tags: ['Linear algebra', 'lecture']
---

### matrix operations

Two matrices are said to be identical if they satisfy $a_{ij}=b_{ij}$ for all $i$, $j$. For matrix multiplication to be valid, the number of columns in the leading matrix must equal the number of rows in the following matrix, and the resulting matrix's rows reflect the leading matrix's row values while its columns reflect the following matrix's column values, as shown below.

$$
A_{mp}*B_{pn}=C_{mn}
$$

In matrix operations, the commutative law and associative law of addition, and the associative law and distributive law of multiplication all hold, but $AB=BA$ does not hold.

An $n$-th order square matrix where all main diagonal elements are 1 and all other elements are 0 is called an identity matrix, denoted by $I_n$.

For matrix $A$, its transpose is denoted by $A^T$ and can be defined as $\begin{bmatrix}a_{ij}'\end{bmatrix}_{nm}=a_{ji}$. Through the properties of the transpose matrix, $(AB)^T=B^TA^T$ and $(kA)^T=kA^T$ hold.

The sum of the diagonal elements is denoted by $tr(A)$.

---

### inverse matrix

For an $n$-th order square matrix $A$, if there exists a matrix $B$ that satisfies $AB=I_n=BA$, then $A$ is said to be invertible. At this time, $B$ is called the inverse matrix, and $A$ without an inverse matrix is called non-invertible.

---

### elementary matrix

A matrix obtained by applying Elementary Row Operations (ERO) once to $I_n$ is called an elementary matrix. And a permutation matrix refers to a matrix obtained by exchanging rows of $I_n$.

The method to find the inverse matrix of an invertible matrix using elementary matrices is as follows:

-Given matrix $A$, create an n*2n matrix $[A : I_n]$ by adjoining the identity matrix $I_n$.

-Find the reduced row echelon form (RREF) of the matrix.

-When the RREF matrix equals $[C : D]$, if $C=I_n$ then $D=A^{-1}$, and if $C \ne I_n$ then $A$ is non-invertible and no inverse matrix exists.

---

### subspace and linearly independent

When a set $W$ is a subset of $R^n$, it can become a subspace if it satisfies the following two conditions:

-$x, y \in W \Rightarrow x+y \in W$ (closed under add)

-$x \in W, k \in R \Rightarrow kx \in W$ (closed under scalar)

For a subset $\{x_1, x_2, …, x_k\}$, when a vector $x$ can be expressed as a sum of products of constants belonging to $R$, it is called a linear combination.

When the column vectors of matrix $A$ are expressed as the span of $A^{(1)}, A^{(2)}, … , A^{(n)}$, this becomes a subspace of $R^n$, so it becomes the column space, and similarly, the span of row vectors becomes the row space.

In a linear combination structure, if the constants are 0, it is linearly independent, otherwise it is linearly dependent.

---

### matrix of systems of linear equation

When an $n$-th order square matrix $A$ is invertible and $b$ is a vector in $R^n$, the system of equations $Ax=b$ has a unique solution $x=A^{-1}b$. And $Ax=0$ is called the associated homogeneous system of linear equations.

---

### References

[Original Source #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)