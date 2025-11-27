---
title: 'Solving Linear Equations'
date: '2023-03-01'
tags: ['Linear algebra', 'lecture']
---

### Vectors and Linear Equations

The central problem of linear algebra is solving systems of linear equations—equations in which the unknowns are multiplied only by numbers:

$$
\begin{cases} x - 2y = 1 \\ 3x + 2y = 11 \end{cases}
$$

#### The Matrix Equation

Combine the equations using the coefficient matrix $\mathbf{A}$:

$$
\mathbf{A} = \begin{bmatrix} 1 & -2 \\ 3 & 2 \end{bmatrix}
$$

The linear system is represented in matrix form as $\mathbf{A}\mathbf{x} = \mathbf{b}$:

$$
\begin{aligned}
&\mathbf{A}\mathbf{x} = \mathbf{b} \\
&\begin{bmatrix} 1 & -2 \\ 3 & 2 \end{bmatrix} \begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} 1 \\ 11 \end{bmatrix}
\end{aligned}
$$

By rows, this multiplies each row of $\mathbf{A}$ with the vector $x$ (dot products); by columns, it forms a linear combination of the columns of $\mathbf{A}$.

---

### The Idea of Elimination

Elimination systematically solves a linear system by converting it into an upper-triangular system:

$$
\begin{cases} x - 2y = 1 \\ 3x + 2y = 11 \end{cases} \xrightarrow{\text{eliminate}} \begin{cases} x - 2y = 1 \\ 8y = 8 \end{cases}
$$

The solution $(3, 1)$ remains unchanged. Elimination divides by pivots, so it can fail if a pivot position becomes zero.

If the number of pivots is less than $n$, the matrix is singular and the system has either no solution or infinitely many. With $n$ pivots, the matrix is nonsingular and the solution is unique.

---

### Elimination Using Matrices

Each elimination step can be expressed as matrix multiplication. An elimination matrix $\mathbf{E}$ acts on $\mathbf{A}$ or $\mathbf{b}$ to produce $\mathbf{E}\mathbf{A}$ or $\mathbf{E}\mathbf{b}$.

$\mathbf{E}_{ij}$ multiplies equation $j$ by a multiplier $\ell_{ij}$ and subtracts it from equation $i$. The identity matrix $\mathbf{I}$ has ones on the diagonal and zeros elsewhere; multiplying $\mathbf{I}$ by any vector $\mathbf{x}$ leaves $\mathbf{x}$ unchanged.

---

### Rules for Matrix Operations

Addition is commutative ($\mathbf{A} + \mathbf{B} = \mathbf{B} + \mathbf{A}$) and associative ($\mathbf{A}(\mathbf{B}\mathbf{C}) = (\mathbf{A}\mathbf{B})\mathbf{C}$), but multiplication is not commutative ($\mathbf{A}\mathbf{B} \ne \mathbf{B}\mathbf{A}$).

To multiply $\mathbf{A}$ ($m \times n$) and $\mathbf{B}$ ($n \times p$), the number of columns of $\mathbf{A}$ must equal the number of rows of $\mathbf{B}$. The product $\mathbf{A}\mathbf{B}$ is an $m \times p$ matrix whose $(i, j)$ entry is the dot product of row $i$ of $\mathbf{A}$ and column $j$ of $\mathbf{B}$.

#### Inverse Matrices

A square matrix $\mathbf{A}$ has an inverse $\mathbf{A}^{-1}$ satisfying

$$
\mathbf{A}\mathbf{A}^{-1} = \mathbf{I}.
$$

Key conditions for $\mathbf{A}$ to be invertible:

$\Rightarrow$ $\mathbf{A}$ must have $n$ pivots.\n$\Rightarrow$ $\det(\mathbf{A}) \ne 0$.\n$\Rightarrow$ $\mathbf{A}\mathbf{x} = \mathbf{0}$ has only the trivial solution $\mathbf{x} = \mathbf{0}$.

For a $2 \times 2$ matrix $\mathbf{A} = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$ with $ad - bc \ne 0$,

$$
\mathbf{A}^{-1} = \frac{1}{ad - bc} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix},
$$

where $ad - bc$ is the determinant of $\mathbf{A}$.

---

### Elimination Factorizations

#### 1. $A=LU$

The upper-triangular matrix $U$ produced by elimination has pivots on its diagonal. The matrix that reverses the elimination steps is lower triangular $L$.

#### 2. $A=LDU$

$\mathbf{A} = \mathbf{L}\mathbf{U}$ is asymmetric: $\mathbf{U}$ has pivots on the diagonal, while $\mathbf{L}$ has ones. To symmetrize it, split $\mathbf{U}$ into a diagonal matrix $\mathbf{D}$ (containing the pivots) and a new upper-triangular matrix $\mathbf{U}_{\text{new}}$ with ones on the diagonal:

$$
\mathbf{A} = \mathbf{L}\mathbf{D}\mathbf{U}_{\text{new}},
$$

where both $\mathbf{L}$ and $\mathbf{U}_{\text{new}}$ have ones on their diagonals.

---

### 참고 자료

[원본 경로 #1](https://renessans-edu.uz/files/books/2023-12-04-11-33-41_46e7ce28c81d5c62d59b34ccc1c6f465.pdf)

[원본 경로 #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)

[원본 경로 #3](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)