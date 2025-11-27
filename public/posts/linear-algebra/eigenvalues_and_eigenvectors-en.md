---
title: 'Eigenvalues and Eigenvectors'
date: '2023-03-06'
tags: ['Linear algebra', 'lecture']
---

### Introduction to Eigenvalues and Eigenvectors

Most vectors $\mathbf{x}$ change direction when multiplied by matrix $\mathbf{A}$. However, certain exceptional vectors $\mathbf{x}$ do not change direction when multiplied by $\mathbf{A}$ and remain on the same line as the original direction. These vectors are called eigenvectors ($\mathbf{x}$).

The result of multiplying an eigenvector by matrix $\mathbf{A}$, $\mathbf{A}\mathbf{x}$, becomes a scalar multiple of the original vector $\mathbf{x}$. This scalar $\lambda$ is called an eigenvalue.

$$
\mathbf{A}\mathbf{x} = \lambda\mathbf{x}
$$

To solve the equation $\mathbf{A}\mathbf{x} = \lambda\mathbf{x}$, we move $\lambda\mathbf{x}$ to the left side.

$$
(\mathbf{A} - \lambda\mathbf{I})\mathbf{x} = \mathbf{0}
$$

For this equation to have a nonzero solution ($\mathbf{x} \ne \mathbf{0}$), the matrix $\mathbf{A} - \lambda\mathbf{I}$ must be singular. That is, the determinant of this matrix must be zero.

The product of $n$ eigenvalues equals the determinant of matrix $\mathbf{A}$.

$$
\lambda_1 \lambda_2 \cdots \lambda_n = \det(\mathbf{A})
$$

The sum of $n$ eigenvalues equals the trace, which is the sum of the main diagonal elements.

$$
\lambda_1 + \lambda_2 + \cdots + \lambda_n = \text{trace}(\mathbf{A})
$$

An eigenvector $\mathbf{x}$ of $\mathbf{A}$ is also an eigenvector of $\mathbf{A}^k$, with eigenvalue $\lambda^k$.

#### Diagonalizing a Matrix

The process of transforming matrix $\mathbf{A}$ into a diagonal matrix $\mathbf{\Lambda}$ using eigenvectors is called diagonalization.

When an $n \times n$ matrix $\mathbf{A}$ has $n$ linearly independent eigenvectors $\mathbf{x}_1, \dots, \mathbf{x}_n$, we arrange them as columns of matrix $\mathbf{X}$ and place the corresponding eigenvalues as diagonal elements of diagonal matrix $\mathbf{\Lambda}$.

$$
\begin{aligned}
&\mathbf{X} = [\mathbf{x}_1 \mid \mathbf{x}_2 \mid \cdots \mid \mathbf{x}_n] \\
&\mathbf{\Lambda} = \begin{bmatrix} \lambda_1 & & \\ & \lambda_2 & \\ & & \ddots \end{bmatrix}
\end{aligned}
$$

The diagonalization formula for matrix $\mathbf{A}$ is derived as follows.

$$
\mathbf{\Lambda} = \mathbf{X}^{-1}\mathbf{A}\mathbf{X}
$$

For matrix $\mathbf{A}$ to be diagonalizable, it must have $n$ linearly independent eigenvectors. That is, the eigenvector matrix $\mathbf{X}$ must have an inverse. If $\mathbf{A}$ has $n$ distinct eigenvalues, the eigenvectors are automatically linearly independent, so $\mathbf{A}$ is always diagonalizable. When eigenvalue repetition occurs, $\mathbf{A}$ may or may not be diagonalizable.

---

### Symmetric Matrices

When a symmetric matrix $\mathbf{S}$ satisfies $\mathbf{S}\mathbf{x} = \lambda\mathbf{x}$, the eigenvalue $\lambda$ and eigenvector $\mathbf{x}$ have the following special properties.

Symmetric matrices have only real eigenvalues. The eigenvectors of a symmetric matrix can be chosen to be orthonormal.

If we choose eigenvectors as orthonormal vectors $\mathbf{q}_1, \dots, \mathbf{q}_n$ and use them as columns of matrix $\mathbf{Q}$, then $\mathbf{Q}$ becomes an orthogonal matrix.

$$
\mathbf{S} = \mathbf{Q}\mathbf{\Lambda}\mathbf{Q}^{-1} = \mathbf{Q}\mathbf{\Lambda}\mathbf{Q}^{\text{T}}
$$

This decomposition is called the Spectral Theorem.

According to the sign matching theorem, the number of positive eigenvalues of a symmetric matrix $\mathbf{S}$ equals the number of positive pivots.

---

### Positive Definite Matrices

Among symmetric matrices $\mathbf{S}$, those for which all eigenvalues ($\lambda$) are positive are called positive definite matrices (PD).

#### The Fundamental Definition

The most fundamental definition of a positive definite matrix is the energy test.

$$
\mathbf{x}^{\text{T}}\mathbf{S}\mathbf{x} > 0
$$

#### Principal Minor and Pivot Tests

Pivots $d_i$ can be expressed as ratios of $k \times k$ principal minors $\text{det}(\mathbf{S}_k)$. This test is much faster than computing eigenvalues.

$$
\begin{aligned}
&\mathbf{a} > 0, \\
&\mathbf{ac - b^2} > 0
\end{aligned}
$$

Here, the first principal minor is $a$ and the second principal minor is $ac-b^2$.

---

### References

[Original Source #1](https://renessans-edu.uz/files/books/2023-12-04-11-33-41_46e7ce28c81d5c62d59b34ccc1c6f465.pdf)

[Original Source #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)

[Original Source #3](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)
