---
title: 'Linear Transformations'
date: '2023-03-08'
tags: ['Linear algebra', 'lecture']
---

### The Idea of a Linear Transformation

A linear transformation $\mathbf{T}$ is a function $\mathbf{T}(\mathbf{v})$ that maps vectors to other vectors and must satisfy the following linearity condition:

$$
\mathbf{T}(c\mathbf{v} + d\mathbf{w}) = c\mathbf{T}(\mathbf{v}) + d\mathbf{T}(\mathbf{w})
$$

This condition preserves both addition and scalar multiplication.

#### Examples of Linear Transformations and Nonlinear Transformations

The most common linear transformation is multiplication by a matrix $\mathbf{A}$.

$$
\mathbf{T}(\mathbf{x}) = \mathbf{A}\mathbf{x}
$$

When $\mathbf{A}$ is an $m \times n$ matrix, this transformation is a linear transformation from input space $\mathbf{R}^n$ to output space $\mathbf{R}^m$.

For example, if we shift a linear transformation like $\mathbf{T}(\mathbf{v}) = \mathbf{v} + \mathbf{u}_0$, then $\mathbf{T}(\mathbf{v} + \mathbf{w}) = \mathbf{v} + \mathbf{w} + \mathbf{u}_0 \ne (\mathbf{v} + \mathbf{u}_0) + (\mathbf{w} + \mathbf{u}_0) = \mathbf{v} + \mathbf{w} + 2\mathbf{u}_0$, so the results differ and it is not linear.

#### Geometric Properties of Linear Transformations

$\Rightarrow$ Any line (or line segment) in the input space is transformed into a line (or line segment) in the output space.

$\Rightarrow$ Points evenly spaced on a line maintain even spacing after transformation.

$\Rightarrow$ It satisfies $\mathbf{T}(\mathbf{0}) = \mathbf{0}$.

$\Rightarrow$ All points inside an input triangle are transformed into points inside the output triangle.

#### Relationship Between Linear Transformations and Matrix $\mathbf{A}$

All linear transformations can be expressed as matrix multiplication, and a linear transformation $\mathbf{T}$ from $\mathbf{R}^n$ to $\mathbf{R}^m$ can always be represented by an $m \times n$ matrix $\mathbf{A}$ by choosing appropriate bases.

For example, consider a transformation from quadratic ($a+bx+cx^2$) to linear ($b+2cx$). If we express the input basis as $v_1=1, v_2=x, v_3=x^2$ and the output basis as $w_1=1, w_2=x$, the transformation results are $T(v_1)=0, T(v_2)=1=1w_1, T(v_3)=2x=2w_2$, so matrix $A$ is as follows:

$$
\mathbf{A} = \begin{bmatrix} 0 & 1 & 0 \\ 0 & 0 & 2 \end{bmatrix}
$$

---

### The Matrix of a Linear Transformation

#### Change of Basis

Even when the input space $\mathbf{V}$ and output space $\mathbf{W}$ are the same and $\mathbf{T}$ is the identity transformation ($\mathbf{T}(\mathbf{v})=\mathbf{v}$), if the input basis $\mathbf{v}$ and output basis $\mathbf{w}$ differ, the matrix is not $\mathbf{I}$.

When an input vector $\mathbf{v}$ has coordinates $\mathbf{c}$ with respect to basis $\mathbf{v}$, the output vector $\mathbf{v}$ has coordinates $\mathbf{d}$ with respect to basis $\mathbf{w}$. In $\mathbf{d} = \mathbf{B}\mathbf{c}$, $\mathbf{B}$ is the matrix that transforms $\mathbf{c}$ to $\mathbf{d}$.

If we express the input basis as columns of $\mathbf{V}$ and the output basis as columns of $\mathbf{W}$, then $\mathbf{V}\mathbf{c} = \mathbf{W}\mathbf{d} \implies \mathbf{d} = \mathbf{W}^{-1}\mathbf{V}\mathbf{c}$.

#### Optimal Basis Selection

For $\mathbf{T}: \mathbf{R}^n \to \mathbf{R}^n$ (square matrix $\mathbf{A}$), we choose $n$ independent eigenvectors $\mathbf{v}_1, \dots, \mathbf{v}_n$ as input and output bases. In this basis, the matrix of $\mathbf{T}$ becomes a diagonal matrix $\mathbf{\Lambda}$.

$$
\begin{aligned}
&\mathbf{T}(\mathbf{v}_j) = \lambda_j \mathbf{v}_j \\
&\mathbf{\Lambda} = \begin{bmatrix} \lambda_1 & & \\ & \ddots & \\ & & \lambda_n \end{bmatrix}
\end{aligned}
$$

The matrix $\mathbf{\Lambda}$ with respect to the new basis is similar to the matrix $\mathbf{A}$ with respect to the original standard basis.

---

### The Search for a Good Basis

#### Jordan Form

To handle matrices $\mathbf{A}$ with insufficient eigenvectors, Jordan created the Jordan form $\mathbf{J}$, which is similar to $\mathbf{A}$, using generalized eigenvectors. $\mathbf{J}$ is as close to a diagonal matrix as possible.

In $\mathbf{J} = \text{diag}(\mathbf{J}_1, \dots, \mathbf{J}_s)$, $s$ equals the number of independent eigenvectors of $\mathbf{A}$. Each Jordan block $\mathbf{J}_i$ has one eigenvalue $\lambda_i$ on the diagonal and 1's just above the diagonal. This block corresponds to one eigenvector.

The Jordan form preserves the essential properties of matrix $\mathbf{A}$ and is important for finding solutions to differential equations $\frac{d\mathbf{u}}{dt} = \mathbf{A}\mathbf{u}$.

#### Fourier Basis

Fourier basis vectors are an excellent basis chosen in advance without knowing what matrix $\mathbf{A}$ is. Surprisingly, this basis diagonalizes circulant matrices.

A circulant matrix $\mathbf{C}$ is a matrix where each row is a cyclic permutation of the row immediately above it, shifted one position to the right.

$$
\mathbf{C} = \mathbf{F} \mathbf{\Lambda} \mathbf{F}^{-1}
$$

Matrix $C$ is diagonalized by the Fourier matrix $F$, and the columns of matrix $F$ are eigenvectors of the circulant matrix $\mathbf{C}$, constructed using complex eigenvalues $\lambda$ ($n$-th complex roots satisfying $\lambda^n=1$).

$$
\mathbf{F} = \begin{bmatrix} 1 & 1 & 1 & 1 \\ 1 & i & i^2 & i^3 \\ 1 & -1 & 1 & -1 \\ 1 & -i & (-i)^2 & (-i)^3 \end{bmatrix}
$$

Diagonalizing circulant matrices means it is perfect for solving linear differential equations with constant coefficients.

---

### References

[Original Source #1](https://renessans-edu.uz/files/books/2023-12-04-11-33-41_46e7ce28c81d5c62d59b34ccc1c6f465.pdf)

[Original Source #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)

[Original Source #3](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)
