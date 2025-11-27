---
title: 'Introduce to Vectors'
date: '2023-03-01'
tags: ['Linear algebra', 'lecture']
---

### Warm up

The heart of linear algebra is two operations on vectors:

$\Rightarrow$ Vector addition: $\mathbf{v} + \mathbf{w}$

$\Rightarrow$ Scalar multiplication: $c\mathbf{v}$ and $d\mathbf{w}$

Combining these gives a linear combination $c\mathbf{v} + d\mathbf{w}$.

---

#### Vectors and Linear Combinations

A typical linear combination of $\mathbf{v}$ and $\mathbf{w}$ is $c\mathbf{v} + d\mathbf{w}$.

For $\mathbf{v} = \begin{bmatrix} 4 \\ 2 \end{bmatrix}$ and $\mathbf{w} = \begin{bmatrix} -1 \\ 2 \end{bmatrix}$,
$3\mathbf{v} + 5\mathbf{w} = 3 \begin{bmatrix} 4 \\ 2 \end{bmatrix} + 5 \begin{bmatrix} -1 \\ 2 \end{bmatrix} = \begin{bmatrix} 12 - 5 \\ 6 + 10 \end{bmatrix} = \begin{bmatrix} 7 \\ 16 \end{bmatrix}$.

Vectors are written as column vectors.

#### Linear Combination

Combining vector addition and scalar multiplication gives the linear combination $c\mathbf{v} + d\mathbf{w}$. Vectors are visualized as arrows. $\mathbf{v}$ is an arrow starting at $(0, 0)$ and ending at $(v_1, v_2)$.

#### 3D Vectors

In 3D $xyz$-space a vector has three components. $\mathbf{v} = \begin{bmatrix} v_1 \\ v_2 \\ v_3 \end{bmatrix}$ represents an arrow from $(0, 0, 0)$ to $(v_1, v_2, v_3)$. Even when written in parentheses it still denotes a column vector.

---

### Lengths and Dot Products

The dot product multiplies corresponding components of two vectors and adds the results to produce a scalar.

For $\mathbf{v} = (v_1, v_2)$ and $\mathbf{w} = (w_1, w_2)$, the dot product is $\mathbf{v} \cdot \mathbf{w} = v_1 w_1 + v_2 w_2$.

If $\mathbf{v} \cdot \mathbf{w} = 0$, the vectors are orthogonal.

The length (norm) of $\mathbf{v}$ is the square root of its dot product with itself:

$$
|v| = \sqrt{v \cdot v} = \sqrt{v_1^2 + \cdots + v_n^2}
$$

A unit vector has length 1.

---

### Matrices

The product $\mathbf{A}\mathbf{x}$ of an $m \times n$ matrix $\mathbf{A}$ and a vector $\mathbf{x}$ with $n$ entries is defined as the linear combination of the columns of $\mathbf{A}$.

$$
Ax = \begin{bmatrix} u & v & w\end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \\ x_3\end{bmatrix} = x_1u+x_2v+x_3w=b
$$

The inverse problem of a linear system is: given an output vector $\mathbf{b}$, find $\mathbf{x}$ such that $\mathbf{A}\mathbf{x} = \mathbf{b}$.

Linear independence means that if $\mathbf{A}\mathbf{x} = \mathbf{0}$ has only the trivial solution $\mathbf{x} = \mathbf{0}$, then no linear combination of the columns of $\mathbf{A}$ other than the zero combination gives the zero vector. In this case the columns span the entire space and $\mathbf{A}$ is invertible.

---

### 참고 자료

[원본 경로 #1](https://renessans-edu.uz/files/books/2023-12-04-11-33-41_46e7ce28c81d5c62d59b34ccc1c6f465.pdf)

[원본 경로 #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)

[원본 경로 #3](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)