---
title: 'Diagonalization of matrix'
date: '2023-03-24'
tags: ['Linear algebra', 'lecture']
---

### Matrix representation

Let $T : R^n \rightarrow R^m$ be a linear transformation defined by $y=T(x)$, and let $\alpha = \{x_1, …, x_n\}, \beta = \{y_1, …, y_m\}$ be ordered bases respectively. Then $[y]_{\beta} = A'[x]_{\alpha} = [T]_{\alpha}^{\beta}[x]_{\alpha}$, so the matrix $A'=[[T(x_1)]_{\beta}:[T(x_2)]_{\beta}…]$ is equal to this.

For example, let's define a linear transformation $T : R^3 \rightarrow R^2$ by $T\begin{bmatrix} x \\ y \\ z \end{bmatrix} = \begin{bmatrix} 2x-z \\ y-z \end{bmatrix}$, and let $\alpha = \begin{Bmatrix} x_1 = \begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix}, x_2 = \begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix}, x_3 = \begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix} \end{Bmatrix}$, $\beta = \begin{Bmatrix} y_1 = \begin{bmatrix} 1 \\ 1 \end{bmatrix}, y_2 = \begin{bmatrix} -1 \\ 1 \end{bmatrix} \end{Bmatrix}$ be ordered bases respectively. Then $A' = [T]_{\alpha}^{\beta} = [[T(x_1)]_{\beta} [T(x_2)]_{\beta} [T(x_3)_{\beta}]]_{2*3}$, so first we find T as follows: $T(x_1) = \begin{bmatrix} 1 \\ -1 \end{bmatrix}, T(x_2) = \begin{bmatrix} -1 \\ 0 \end{bmatrix}, T(x_3) = \begin{bmatrix} 2 \\ 1 \end{bmatrix}$. Now, to find the coordinate vectors of the vectors in basis $\alpha$ with respect to basis $\beta$, we have $T(x_1) = a_1y_1 + a_2y_2 = a_1\begin{bmatrix} 1 \\ 1 \end{bmatrix} + a_2\begin{bmatrix} -1 \\ 1 \end{bmatrix}$, $T(x_2) = b_1y_1+ b_2y_2 = b_1\begin{bmatrix} 1 \\ 1 \end{bmatrix} + b_2\begin{bmatrix} -1 \\ 1 \end{bmatrix}$, $T(x_3) = c_1y_1 + c_2y_2 = c_1\begin{bmatrix} 1 \\ 1 \end{bmatrix} + c_2\begin{bmatrix} -1 \\ 1 \end{bmatrix}$. Solving this system of equations, we get $(a_1, a_2) = (0, -1), (b_1, b_2) = (-0.5, 0.5), (c_1, c_2) = (1.5, -0.5)$, so $A' = \begin{bmatrix} 0 & -0.5 & 1.5 \\ -1 & 0.5 & -0.5 \end{bmatrix}$ becomes the coordinate vector.

As another example, let's define $T : R^2 \rightarrow R^3$ by $T\begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} 2x+y \\ x-y \\ x+4y \end{bmatrix}$, and let the ordered bases be $\alpha = \{e_2, e_1\}, \beta = \{e_3, e_2, e_1\}$ respectively. To find A', we have $T(e_2) = \begin{bmatrix} 1 \\ -1 \\ 4 \end{bmatrix}$, $T(e_1) = \begin{bmatrix} 2 \\ 1 \\ 1 \end{bmatrix}$, so $[T]_{\alpha}^{\beta} = \begin{bmatrix} 4 & 1 \\ -1 & 1 \\ 1 & 2 \end{bmatrix}$. And using $A'$ to find $[T\begin{bmatrix} -4 \\ 6 \end{bmatrix}]_{\beta}$, we get $A'\begin{bmatrix} 6 \\ -4 \end{bmatrix} = \begin{bmatrix} 20 \\ -10 \\ -2 \end{bmatrix}$, so $20e_3 + (-10)e_2 + (-2)e_1$ is the answer.

---

### Similarity and diagonalization of matrices

Let $T : R^n \rightarrow R^n$ be a linear transformation, and let $\alpha, \beta$ be two bases. If $A = [T]_{\alpha}, A' = [T]_{\beta}$, then for the transition matrix $P = [I]_{\beta}^{\alpha}$ from basis $\beta$ to basis $\alpha$, we have $A' = P^{-1}AP$.

For example, let's define $T : R^2 \rightarrow R^2$ by $T\begin{bmatrix} 2x-y \\ x+3y \end{bmatrix}$, and let basis $\beta = \{y_1 = \begin{bmatrix} 0 \\ 1 \end{bmatrix}, y_2 = \begin{bmatrix} -1 \\ 1 \end{bmatrix}\}$. To find A', we have $A = \begin{bmatrix} 2 & -1 \\ 1 & 3 \end{bmatrix}$ and $P = \begin{bmatrix} 0 & -1 \\ 1 & 1 \end{bmatrix}$, so we can find it by organizing these two.

For square matrices $A$, $B$, if there exists an invertible matrix $P$ satisfying $B = P^{-1}AP$, then $B$ is said to be similar to $A$. This is denoted by $B$ ~ $A$. If two matrices are similar, they have the same determinant value and sum of main diagonal elements. In this case, matrix A is called a diagonalizable matrix. A necessary and sufficient condition for an $n$-th order square matrix to be diagonalizable is that it has $n$ linearly independent eigenvectors.

Let $\lambda_1, \lambda_2, …, \lambda_k$ be the distinct eigenvalues of matrix $A$. Then the characteristic polynomial of $A$ can be expressed as $|\lambda I-A| = (\lambda - \lambda_1)^m(\lambda - \lambda_2)^m…(\lambda - \lambda_k)^m$. Here, the integer $m_i$ is called the algebraic multiplicity of $\lambda_i$, and the number of linearly independent eigenvectors corresponding to the eigenvalue is called the geometric multiplicity.

For an $n$-th order square matrix, the algebraic multiplicity is always greater than or equal to the geometric multiplicity. However, in the necessary and sufficient condition for diagonalizability, the algebraic multiplicity and geometric multiplicity of all eigenvalues of matrix $A$ must be equal.

---

### Orthogonal diagonalization

For a square matrix $A$, if $A^{-1} = A^T, A^TA = I$, then $A$ is called a real orthogonal matrix. If it's an orthogonal matrix, the row vectors and column vectors are perpendicular to each other and are normal vectors respectively. $A$ is an invertible matrix and satisfies the length preservation law.

If $A, C$ are square matrices of the same size and there exists an orthogonal matrix $P$ such that $C = P^TAP$, then $C$ is said to be orthogonally similar to $A$.

As an example of finding an orthogonal matrix $P$ that orthogonally diagonalizes, for $A = \begin{bmatrix} -1 & -1 & 1 \\ - 1 & 2 & 4 \\ 1 & 4 & 2 \end{bmatrix}$, the absolute value of the characteristic polynomial $det(A-\lambda I)$ is $\lambda (\lambda + 3) (\lambda - 6) = 0$, so the eigenvectors $x_1 = \begin{bmatrix} -1 \\ -1 \\ 1 \end{bmatrix}, x_2 = \begin{bmatrix} 2 \\ -1 \\ 1 \end{bmatrix}, x_3 = \begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix}$ are found. After normalization, we get $P = \begin{bmatrix} -\frac{1}{\sqrt(3)} & \frac{2}{\sqrt(6)} & 0 \\ -\frac{1}{\sqrt(3)} & -\frac{1}{\sqrt(6)} & \frac{1}{\sqrt(2)} \\ \frac{1}{\sqrt(3)} & \frac{1}{\sqrt(6)} & \frac{1}{\sqrt(2)} \end{bmatrix}$.

---

### Singular vector decomposition and inverse matrix

Let $A$ be a real matrix. If there exist orthogonal matrices $U, V$ and a diagonal matrix $\sum$ such that $U^TAV = \begin{bmatrix} \sum_1 & O \\ O & O \end{bmatrix}$, then it can be expressed in this form. Here, the diagonal elements are called singular values, the columns of $U$ are called the left singular vectors of $A$, and the columns of $V$ are called the right singular vectors of $A$. $V$ is the orthogonal matrix that orthogonally diagonalizes $A^TA$, and $U$ is the orthogonal matrix that orthogonally diagonalizes $AA^T$. We have $V^T(A^TA)V = diag_{n*n}, U^T(AA^T)U = diag_{m*m}$, so the matrix sizes of the two are different.

And the inverse matrix of $A$ can be expressed as $A^{-1} = V\sum^{-1}U^T$.

The pseudo-inverse of an $m*n$ matrix $A$ with full column rank where $rankA = n$ is $A^{\dagger} = (A^TA)^{-1}A^T$.

---

### Complex eigenvalues and eigenvectors

The Euclidean inner product can be expressed using two vectors $u, v$ as $u \cdot v = \bar{v_1}u_1 + \bar{v_2}u_2 + … + \bar{v_n}u_n = <u, v>$. If the inner product is 0, they are said to be orthogonal.

For example, when $u = (2i, 0, 1+3i), v = (2-i, 0, 1+3i)$, the Euclidean inner product value is $\bar{2-i}(2i) + 0 + \bar{1+3i}(1+3i) = (2+i)(2i) + (1-3i)(1+3i) = 8 + 4i$.

---

### Hermitian, unitary, and normal matrices

For a complex matrix $A$, $\bar{A}^T$ is called the conjugate transpose of A and is denoted by $A^*$. A square complex matrix $A$ is called a Hermitian matrix if $A = A^*$. If $A = -A^*$, it becomes a skew-Hermitian matrix. And if $U^*U = I$, then $U$ is a unitary matrix, and in this case $U^* = U^{-1}$ also holds.

A matrix $A \in M_n$ satisfying $AA^* = A^*A$ is called a normal matrix.

---

### References

[Original source #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)