---
title: 'Determinant'
date: '2023-03-13'
tags: ['Linear algebra', 'lecture']
---

### definition and theorem of determinant

A permutation of the natural number set $S$ is a one-to-one correspondence function, and the total number is $n!$.

An inversion in a permutation refers to the case where a larger natural number appears to the left of a smaller natural number.

If the total number of inversions in a permutation is even, it is called an even permutation, and if it is odd, it is called an odd permutation. At this time, mapping to $\{+1, -1\}$ according to even and odd is called a sign function.

The process of finding the determinant using the above principle is as follows.

$$
det(A)=\sum_{\sigma \in S_n}sgn(\sigma)\sigma_{1\sigma(1)}...\sigma_{n\sigma(n)}
$$

As in the above formula, the sign function is placed in front of the product of each element for calculation.

The determinant of a square matrix $A$ and the determinant of its transpose $A^T$ are equal. Also, when two rows or columns of $A$ are identical, or when all elements of one row are 0, the determinant is 0.

If $A$ is an $n$-th order triangular matrix, the determinant is equal to the product of the main diagonal elements. The determinant of the inverse matrix of an invertible matrix $A$ is the reciprocal of the determinant of matrix $A$.

---

### cofactor expansion

The submatrix created by removing the $i$-th row and $j$-th column of a square matrix $A=[a_{ij}]$ is called $A(i|j)$, and its determinant $M_{ij}=det(A(i|j))$ is called the minor. Also, $A_{ij}=(-1)^{i+j}M_{ij}$ is called the cofactor. The matrix composed of cofactors is expressed as adj.

The inverse matrix of an invertible matrix $A$ can be found as $\frac{1}{|A|}adjA$.

---

### cramer's formula

This formula applies to systems of linear equations where the number of unknowns equals the number of equations.

For example, if $x=\{x_1, x_2, …, x_n\}$ and $b=\{b_1, b_2, …, b_n\}$, then the system of equations can be expressed as $Ax=b$, and we have a unique solution as $x_1=\frac{|A_1|}{|A|}$, $x_2=\frac{|A_2|}{|A|}$, and so on. Here, the numerator uses matrix $A$ with the elements of the $j$-th column replaced by the $b$ values.

---

### eigenvalue and eigenvector

$$
Ax=\lambda x
$$

For an $n$-th order square matrix $A$, a non-zero scalar $\lambda$ is called an eigenvalue, and when $x$ becomes a vector corresponding to $\lambda$, it is called an eigenvector.

A general method to find this is to use a homogeneous system of equations, making it $(\lambda-A)x=0$ for calculation, and the equation multiplied by $x$ is called the characteristic equation.

The solution space of the homogeneous system of equations is called the eigenspace of $A$ corresponding to $\lambda$.

---

### References

[Original Source #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)