---
title: 'Orthogonality'
date: '2023-03-03'
tags: ['Linear algebra', 'lecture']
---

### Orthogonality of the Four Subspaces

Two vectors $\mathbf{v}$ and $\mathbf{w}$ are orthogonal if their dot product (or matrix product) is zero:

$$
\mathbf{v} \cdot \mathbf{w} = \mathbf{v}^{\text{T}}\mathbf{w} = 0
$$

Two subspaces $\mathbf{V}$ and $\mathbf{W}$ are orthogonal if every vector $\mathbf{v}$ in $\mathbf{V}$ is perpendicular to every vector $\mathbf{w}$ in $\mathbf{W}$.

The only vector that belongs to both orthogonal subspaces is the zero vector.

The orthogonal complement $\mathbf{V}^{\perp}$ of a subspace $\mathbf{V}$ consists of all vectors that are orthogonal to $\mathbf{V}$.

---

### Projections

A projection finds the closest point $\mathbf{p}$ in a subspace $\mathbf{S}$ to a given vector $\mathbf{b}$.

For projection onto a line in the direction of $\mathbf{a}$, the projection $\mathbf{p}$ of $\mathbf{b}$ lies along $\mathbf{a}$:

$$
\begin{aligned}
&\mathbf{p} = \hat{x}\mathbf{a}, \\
&\hat{x} = \frac{\mathbf{a}^{\text{T}}\mathbf{b}}{\mathbf{a}^{\text{T}}\mathbf{a}}
\end{aligned}
$$

Here the projection matrix $\mathbf{P}$ is an $m \times m$ matrix of rank 1.

For projection onto a subspace, we project $\mathbf{b} \in \mathbf{R}^m$ onto an $n$-dimensional subspace $\mathbf{S} \subset \mathbf{R}^m$. The projection vector $\mathbf{p}$ is a linear combination of the columns of $\mathbf{A}$:

$$
\mathbf{p} = \mathbf{A}\hat{\mathbf{x}}
$$

---

### Least Squares Approximations

When the system $\mathbf{A}\mathbf{x} = \mathbf{b}$ has no exact solution, we seek the least squares solution $\mathbf{\hat{x}}$ that minimizes the length of the error vector $\mathbf{e} = \mathbf{b} - \mathbf{A}\mathbf{x}$, i.e., minimizes $\Vert \mathbf{e} \Vert$.

The vector $\mathbf{A}\mathbf{x}$ lies in the column space $\mathbf{C}(\mathbf{A})$, and the closest vector to $\mathbf{b}$ in $\mathbf{C}(\mathbf{A})$ is the projection $\mathbf{p}$ of $\mathbf{b}$.

The normal equation is $\mathbf{A}^{\text{T}}(\mathbf{b} - \mathbf{A}\mathbf{\hat{x}}) = \mathbf{0}$. Thus
$\mathbf{\hat{x}} = (\mathbf{A}^{\text{T}}\mathbf{A})^{-1}\mathbf{A}^{\text{T}}\mathbf{b}$, and the projection is

$$
\mathbf{p} = \mathbf{A}\mathbf{\hat{x}} = \mathbf{A}(\mathbf{A}^{\text{T}}\mathbf{A})^{-1}\mathbf{A}^{\text{T}}\mathbf{b}.
$$

---

### Orthonormal Bases and Gram-Schmidt

Vectors $\mathbf{q}_1, \dots, \mathbf{q}_n$ are orthonormal if they are mutually orthogonal and each has length 1 (unit vectors).

The Gram-Schmidt process is an algorithm that takes a set of linearly independent vectors $\mathbf{a}_1, \dots, \mathbf{a}_n$ and produces an orthonormal set $\mathbf{q}_1, \dots, \mathbf{q}_n$.

The first vector is obtained by normalizing $\mathbf{a}_1$: $\mathbf{q}_1 = \frac{\mathbf{a}_1}{\Vert \mathbf{a}_1 \Vert}$. For the second and subsequent vectors, we subtract their projections onto the previously computed directions, e.g., $\mathbf{A}_2 = \mathbf{a}_2 - (\mathbf{a}_2^{\text{T}}\mathbf{q}_1)\mathbf{q}_1$.

---

### 참고 자료

[원본 경로 #1](https://renessans-edu.uz/files/books/2023-12-04-11-33-41_46e7ce28c81d5c62d59b34ccc1c6f465.pdf)

[원본 경로 #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)

[원본 경로 #3](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)