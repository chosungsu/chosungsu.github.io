---
title: 'Determinant'
date: '2023-03-10'
tags: ['Linear algebra', 'lecture']
---

### Definition of determinant

A permutation of the set of natural numbers $S$ is a one-to-one correspondence function, and the total number is $n!$.

An inversion in a permutation occurs when a larger natural number appears to the left of a smaller natural number.

If the total number of inversions in a permutation is even, it is called an even permutation; if odd, it is called an odd permutation. The sign function maps even and odd permutations to $\{+1, -1\}$ respectively.

Using the above principle, the process of calculating the determinant is as follows:

$$
\det(A)=\sum_{\sigma \in S_n}\operatorname{sgn}(\sigma)a_{1\sigma(1)}\cdots a_{n\sigma(n)}
$$

As shown in the formula above, the sign function is placed before the product of each element for calculation.

The determinant of a square matrix $A$ equals the determinant of its transpose $A^T$. Also, the determinant is zero when two rows or columns of $A$ are identical, or when all elements of one row are zero.

If $A$ is an $n$-th order triangular matrix, its determinant equals the product of the main diagonal elements. The determinant of the inverse of an invertible matrix $A$ is the reciprocal of the determinant of matrix $A$.

---

### Determinants of matrices

$$
a_{11}x_1+a_{12}x_2=b_1 \\
a_{21}x_1+a_{22}x_2=b_2
$$

For a general $2 \times 2$ linear system, after completing elementary row operations, the solution can be shown as follows:

$$
x_1=\frac{b_1a_{22}-b_2a_{12}}{a_{11}a_{22}-a_{12}a_{21}}, \\
x_2=\frac{b_2a_{11}-b_1a_{21}}{a_{11}a_{22}-a_{12}a_{21}}
$$

Through this formula, we can see that $a_{11}a_{22}-a_{12}a_{21}$ plays a very important role and can be expressed as a matrix, so for $A=\begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{bmatrix}$, the determinant value is $a_{11}a_{22}-a_{12}a_{21}$.

For example, $\det(A)=\begin{vmatrix} 3 & -1 \\ 8 & 2 \end{vmatrix}=(3)\cdot(2)-(8)\cdot(-1)=14$ is calculated as shown.

Now, for a $3 \times 3$ linear system, the solution can be shown as follows:

$$
x_1=\frac{\text{Numerator1}}{D}, \\
x_2=\frac{\text{Numerator2}}{D}, \\
x_3=\frac{\text{Numerator3}}{D}
$$

$D=a_{11}(a_{22}a_{33} - a_{23}a_{32}) - a_{12}(a_{21}a_{33}-a_{23}a_{31})+a_{13}(a_{21}a_{32}-a_{22}a_{31})$, and we can see that the expressions in parentheses are $2 \times 2$ determinants. Therefore, defining the cofactor as $C_{jk}=(-1)^{j+k} \det(A_{jk})$, the determinant can be defined as follows: $\det(A)=a_{11}C_{11}+a_{12}C_{12}+a_{13}C_{13}$.

---

### $n \times n$ matrices

If matrix $A$ is an $n \times n$ matrix, then $A_{jk}$ is the $(n-1) \times (n-1)$ matrix obtained by deleting the $j$-th row and $k$-th column. Therefore, we confirmed above that the determinant is defined as $\det(A)=a_{11}C_{11}+a_{12}C_{12}+a_{13}C_{13}$. Also, if a row or column with all elements zero is included, the determinant value is zero. It's important to note that expanding along a row with some zeros is the simplest way to expand.

$$
A=\begin{bmatrix}
1 & 3 & 0 & -2 \\
1 & 2 & -2 & -1 \\
0 & 0 & 2 & 1 \\
-1 & -3 & 1 & 0
\end{bmatrix}
$$

For the above determinant, expanding along the third row gives $\det(A)=0\cdot\det(A_{31})-0\cdot\det(A_{32})+2\cdot\det(A_{33})-1\cdot\det(A_{34})=2\cdot(1\cdot\begin{vmatrix}
2 & -1 \\
-3 & 0
\end{vmatrix}-3\cdot\begin{vmatrix}
1 & -1 \\
-1 & 0
\end{vmatrix}-2\cdot\begin{vmatrix}
1 & 2 \\
-1 & -3
\end{vmatrix}) - (
1\cdot\begin{vmatrix}
2 & -2 \\
-3 & 1
\end{vmatrix}-3\cdot\begin{vmatrix}
1 & -2 \\
-1 & 1
\end{vmatrix}-0\cdot\begin{vmatrix}
1 & 2 \\
-1 & -3
\end{vmatrix}
)=5$.

---

### Triangular matrices

In a square matrix $A \in \mathbb{R}^{n \times n}$, if $a_{jk}=0$ when $j > k$, then this matrix is called an upper triangular matrix. In the opposite case, it is a lower triangular matrix.

$$
A=\begin{bmatrix}
a_{11} & a_{12} & a_{13} & a_{14} \\
0 & a_{22} & a_{23} & a_{24} \\
0 & 0 & a_{33} & a_{34} \\
0 & 0 & 0 & a_{44}
\end{bmatrix}
$$

For example, for a $4 \times 4$ upper triangular matrix of the form above, the determinant value is $a_{11}\cdot\begin{vmatrix}
a_{22} & a_{23} & a_{24} \\
0 & a_{33} & a_{34} \\
0 & 0 & a_{44}
\end{vmatrix}=a_{11}\cdot(a_{22}\cdot(a_{33}a_{44}-0))$.

---

### Cramer's formula

This formula applies to linear systems where the number of unknowns equals the number of equations.

For example, if $x=\{x_1, x_2, \ldots, x_n\}$ and $b=\{b_1, b_2, \ldots, b_n\}$, then the system of equations can be represented as $Ax=b$, and we have unique solutions $x_1=\frac{|A_1|}{|A|}$, $x_2=\frac{|A_2|}{|A|}$, etc. Here, the numerator uses matrix $A$ with the elements of the $j$-th column replaced by the $b$ values.

---

### Eigenvalue and eigenvector

$$
Ax=\lambda x
$$

For an $n$-th order square matrix $A$, a nonzero scalar $\lambda$ is called an eigenvalue, and when $x$ is the corresponding vector for $\lambda$, it is called an eigenvector.

A general method to find these is to use the homogeneous system of equations, making it $(\lambda I-A)x=0$ and calculating. The equation obtained by multiplying with $x$ is called the characteristic equation.

The solution space of the homogeneous system of equations is called the eigenspace of $A$ corresponding to $\lambda$.

---

### References

[Original Source #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[Original Source #2](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)