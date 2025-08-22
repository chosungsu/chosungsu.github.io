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

### ERO and Determinants

For a matrix $A \in \mathbb{R}^{n \times n}$, we defined the determinant $det A$ as follows:

$$
det A=a_{j1}C_{j1}+a_{j2}C_{j2}+ \cdots + a_{jn}C_{jn}
$$

-This can also be expressed as an inner product, so $det A=a_j*c_j^T$.

-And if matrix $B$ is obtained by exchanging two rows of $A$, then $det B=-det A$ holds.

For example, if $A = \begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{bmatrix}$ and $B = \begin{bmatrix} a_{21} & a_{22} \\ a_{11} & a_{12} \end{bmatrix}$ is obtained by exchanging two rows, then $det B=a_{21}a_{12}-a_{22}a_{11}=-(a_{11}a_{22}-a_{12}a_{21}) =-det A$, which easily proves the case for $2 \times 2$ matrices.

-If matrix $B$ is obtained by multiplying a row of $A$ by a scalar $\beta$, then $det B=\beta*det A$ holds.

For example, if $B$ is obtained by multiplying the $j$th row of $A$ by $\beta$, since all other rows remain the same except the $j$th row, we can prove that $det B=(\beta*a_j)*c_j^T=\beta*det A$.

-If matrix $B$ is obtained by adding $\beta$ times the $k$th row to the $j$th row of $A$, then $detB=detA$ holds.

For example, for any row vector $r = \begin{bmatrix} r_1 & r_2 & \dots & r_n \end{bmatrix}$ and matrix $A$, the expression $r \cdot c_j^T = r_1C_{j1} + r_2C_{j2} + \dots + r_nC_{jn}$ equals the determinant of the matrix obtained by replacing the $j$th row of $A$ with $r$. Therefore, if $k \ne j$, then $a_k*c_j^T=0$ because replacing two rows creates two identical rows. The $j$th row of $B$ becomes $b_j=a_j+\beta*a_k$, and expanding gives $det B=(a_j+\beta*a_k)*c_j^T=(a_j*c_j^T)+\beta*(a_k*c_j^T)=det A+\beta(0)=det A$.

---

### Properties of the Determinant

A square matrix $A$ is invertible if and only if $det A \ne 0$. If $A_p$ is a triangular matrix, its determinant is the product of its diagonal elements, and if none of these elements are zero, then $det A = det A_p \ne 0$, and in this case $A_p$ has $n$ leading elements, making it invertible. If one of the elements is zero, there are $r<n$ leading elements, making it non-invertible.

For $A \in \mathbb{R}^{n \times n}$ and $B=\beta*A$, $det B = \beta^n * det A$ holds. For example, in a $2 \times 2$ matrix, $det (\beta*A)=(\beta*a_{11})(\beta*a_{22})-(\beta*a_{12})(\beta*a_{21})=\beta^2*detA$ proves this.

---

### Cofactor method

For a matrix $A \in \mathbb{R}^{n \times n}$, we have defined cofactors several times as follows. $C_{jk} = (-1)^{j+k} \det A_{jk}$ is the cofactor for the $j$th row and $k$th column of matrix $A$, and the cofactor matrix is constructed as:

$$
\text{Cof(A)}= \begin{bmatrix}
C_{11} & C_{12} & \cdots & C_{1n} \\
C_{21} & C_{22} & \cdots & C_{2n} \\ 
\vdots & \vdots & \ddots & \vdots \\
C_{n1} & C_{n2} & \cdots & C_{nn}
\end{bmatrix}
$$

The matrix product can be simplified as $A(Cof(A))^T=detA*I_n$. If $det A \ne 0$, division is possible, so $A^{-1}=\frac{1}{det A}*(Cof(A))^T$. For example, $A^{-1}=\frac{1}{ad-bc}*\begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$.

---

### Cramer's formula

This formula is an explicit formula for finding solutions to linear systems with invertible coefficient matrices. That is, if matrix $A$ is invertible, we use $x=A^{-1}b$.

According to the cofactor formula above, $A^{-1}=\frac{1}{det A}*(Cof(A))^T$, so we can write $x=\frac{1}{det A}*\begin{bmatrix}
C_{11} & C_{12} & \cdots & C_{1n} \\
C_{21} & C_{22} & \cdots & C_{2n} \\ 
\vdots & \vdots & \ddots & \vdots \\
C_{n1} & C_{n2} & \cdots & C_{nn}
\end{bmatrix} * \begin{bmatrix} b_1 \\b_2 \\ \vdots \\ b_n \end{bmatrix}$.

Expanding the first component of the solution gives $x_1=\frac{1}{det A}*(b_1C_{11} + b_2C_{21} + \cdots + b_nC_{n1})$, where the value in parentheses equals the determinant of the matrix obtained by replacing the first column of $A$ with $b$. Therefore, this is summarized in Cramer's formula:

$$
x=\frac{1}{det A}*\begin{bmatrix}
det A_1 \\
det A_2 \\
\vdots \\
det A_n
\end{bmatrix}
$$

---

### References

[Original Source #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[Original Source #2](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)