---
title: 'Vector Spaces and Subspaces'
date: '2023-03-03'
tags: ['Linear algebra', 'lecture']
---

### Spaces of Vectors

The space $\mathbf{R}^n$ consists of all column vectors $\mathbf{v}$ with $n$ real components. The symbol $\mathbf{R}$ indicates that components are real numbers.

A vector space $\mathbf{S}$ must satisfy:

$\Rightarrow$ If $\mathbf{v}$ and $\mathbf{w}$ are in $\mathbf{S}$, then every linear combination $c\mathbf{v} + d\mathbf{w}$ is also in $\mathbf{S}$.

$\Rightarrow$ These operations must obey the usual eight rules in $\mathbf{R}^n$ (commutativity, distributivity, etc.).

A subspace is another vector space contained inside a host vector space $\mathbf{V}$.

$\Rightarrow$ If $\mathbf{v}$ and $\mathbf{w}$ are in a subspace, then $\mathbf{v} + \mathbf{w}$ is in the subspace.

$\Rightarrow$ If $\mathbf{v}$ is in the subspace and $c$ is a scalar, then $c\mathbf{v}$ is also in the subspace.

---

### The Nullspace of $\mathbf{A}$

The nullspace $\mathbf{N}(\mathbf{A})$ is the set of all solutions $\mathbf{x}$ to $\mathbf{A}\mathbf{x} = \mathbf{0}$.

Row operations transform $\mathbf{A}$ to its reduced row echelon form (RREF) $\mathbf{R}$ without changing the nullspace. Columns without pivots are free columns. With $n - r$ free variables, we find $n - r$ special solutions by setting one free variable to 1 and the others to 0, then solving for the pivot variables.

The rank $r$ of $\mathbf{A}$ is the number of pivots.

---

### The Complete Solution to $\mathbf{A}\mathbf{x} = \mathbf{b}$

The complete solution to $\mathbf{A}\mathbf{x} = \mathbf{b}$ has the form

$$
\mathbf{x}_{\text{complete}} = \mathbf{x}_p + \mathbf{x}_n
$$

where $\mathbf{x}_p$ is a particular solution satisfying $\mathbf{A}\mathbf{x}_p = \mathbf{b}$, and $\mathbf{x}_n$ is any vector in the nullspace $\mathbf{N}(\mathbf{A})$.

To solve $\mathbf{A}\mathbf{x} = \mathbf{b}$, apply elimination to the augmented matrix $[\mathbf{A} \mid \mathbf{b}]$:

$$
[\mathbf{A} \mid \mathbf{b}] \quad \implies \quad [\mathbf{R} \mid \mathbf{d}]
$$

The system has a solution if and only if every entry of $\mathbf{d}$ corresponding to a zero row of $\mathbf{R}$ is also zero.

$$
\begin{aligned}
&[\mathbf{A} \mid \mathbf{b}] = \begin{bmatrix} 1 & 3 & 0 & 2 & b_1 \\ 0 & 0 & 1 & 4 & b_2 \\ 1 & 3 & 1 & 6 & b_3 \end{bmatrix} \\
&\Rightarrow [\mathbf{R} \mid \mathbf{d}] = \begin{bmatrix} 1 & 3 & 0 & 2 & b_1 \\ 0 & 0 & 1 & 4 & b_2 \\ 0 & 0 & 0 & 0 & b_3 - b_1 - b_2 \end{bmatrix}
\end{aligned}
$$

Thus the condition for solvability is $b_1 + b_2 = b_3$. The simplest way to find a particular solution $\mathbf{x}_p$ is to set all free variables to zero.

For a square invertible matrix, the unique solution is $\mathbf{x}_p = \mathbf{A}^{-1}\mathbf{b}$, and $\mathbf{N}(\mathbf{A})$ contains only the zero vector.

If the matrix has full column rank ($r = n \le m$), every column is a pivot column, so there are no free variables and no special solutions.

If the matrix has full row rank ($r = m \le n$), every row has a pivot, so $\mathbf{R}$ has no zero rows and $\mathbf{A}\mathbf{x} = \mathbf{b}$ has a solution for every $\mathbf{b}$. There are $n - r = n - m$ free variables.

---

### Independence, Basis and Dimension

An ordered set of vectors $\mathbf{v}_1, \dots, \mathbf{v}_n$ is linearly independent if the only linear combination that gives the zero vector $\mathbf{0}$ is when all coefficients $x_1, \dots, x_n$ are zero.

Linear dependence means that one of the vectors can be expressed as a linear combination of the others.

A basis of a vector space $\mathbf{S}$ is an ordered set of vectors that (1) is linearly independent and (2) spans $\mathbf{S}$. This guarantees that every vector in $\mathbf{S}$ can be written uniquely as a linear combination of the basis vectors.

The dimension of a space is the number of vectors in any of its bases. The dimension of the column space $\mathbf{C}(\mathbf{A})$ is $r$, and the dimension of the nullspace $\mathbf{N}(\mathbf{A})$ is $n - r$.

---

### Dimensions of the Four Subspaces

For an $m \times n$ matrix $\mathbf{A}$ with rank $r$, both the row space $\mathbf{C}(\mathbf{A}^{\text{T}})$ and the column space $\mathbf{C}(\mathbf{A})$ have dimension $r$. The nullspace $\mathbf{N}(\mathbf{A})$ has dimension $n - r$.

---

### 참고 자료

[원본 경로 #1](https://renessans-edu.uz/files/books/2023-12-04-11-33-41_46e7ce28c81d5c62d59b34ccc1c6f465.pdf)

[원본 경로 #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)

[원본 경로 #3](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)