---
title: 'Determinants'
date: '2023-03-06'
tags: ['Linear algebra', 'lecture']
---

### The Properties of Determinants

$\Rightarrow$ The determinant of the $n \times n$ identity matrix $\mathbf{I}$ is 1.

$\Rightarrow$ Swapping two rows of a matrix changes the sign of its determinant.

$\Rightarrow$ The determinant is linear in each row separately. Thus, multiplying a single row by a scalar $t$ multiplies the determinant by $t$. If a row is the sum of two vectors, the determinant splits into the sum of two determinants.

$\Rightarrow$ If two rows are equal, then $\det(\mathbf{A}) = 0$.

$\Rightarrow$ If one row is all zeros, then $\det(\mathbf{A}) = 0$.

---

### Permutations and Cofactors

#### The Pivot Formula

When elimination is performed (including row swaps), the determinant is given by $\det(\mathbf{A}) = \pm (d_1 d_2 \cdots d_n)$, where $d_1, \dots, d_n$ are the pivots of $\mathbf{A}$. The $k$-th pivot $d_k$ is related to the determinant of the top-left $k \times k$ submatrix $\mathbf{A}_k$:

$$
d_k = \frac{\det(\mathbf{A}_k)}{\det(\mathbf{A}_{k-1})}
$$

#### The Big Formula

$\det(\mathbf{A})$ is the sum of $n!$ terms, one for each permutation. Each term is a product of entries taken one from each row and one from each column:

$$
\det(\mathbf{A}) = \sum (\det P) a_{1\alpha} a_{2\beta} \cdots a_{n\omega}
$$

An $n \times n$ determinant is thus a sum of $n!$ terms, each with sign $\pm 1$. For $n = 2$, there are $2! = 2$ terms and
$$
\det \begin{vmatrix} a & b \\ c & d \end{vmatrix} = +a_{11}a_{22} - a_{12}a_{21} = ad - bc.
$$

#### The Cofactor Formula

A determinant can be expanded along any row or column. The cofactor $C_{ij}$ associated with entry $a_{ij}$ of $\mathbf{A}$ is defined as

$$
\mathbf{C}_{ij} = (-1)^{i+j} \det(\mathbf{M}_{ij}),
$$

where $\mathbf{M}_{ij}$ is the $(n-1) \times (n-1)$ minor obtained by deleting row $i$ and column $j$ from $\mathbf{A}$.

---

### Cramer's Rule, Inverses, and Volumes

#### Cramer's Rule

Cramer's rule uses determinants to compute each component $x_j$ of the solution $\mathbf{x}$ to the linear system $\mathbf{A}\mathbf{x} = \mathbf{b}$:

$$
x_j = \frac{\det(\mathbf{B}_j)}{\det(\mathbf{A})}
$$

where $\mathbf{B}_j$ is the matrix obtained from $\mathbf{A}$ by replacing its $j$-th column with vector $\mathbf{b}$.

#### The Formula for $\mathbf{A}^{-1}$

Applying Cramer's rule to $\mathbf{A}\mathbf{A}^{-1} = \mathbf{I}$ expresses each entry of $\mathbf{A}^{-1}$ in terms of cofactors of $\mathbf{A}$. The $(i, j)$ entry of $\mathbf{A}^{-1}$ is

$$
(\mathbf{A}^{-1})_{ij} = \frac{\mathbf{C}_{ji}}{\det(\mathbf{A})},
$$

where $\mathbf{C}_{ji}$ is the cofactor of entry $(j, i)$ of $\mathbf{A}$.

#### The Cross Product

The cross product $\mathbf{w} = \mathbf{u} \times \mathbf{v}$ is an operation defined only in 3D vector space, and its result is a vector:

$$
\begin{aligned}
&\mathbf{w} = \mathbf{u} \times \mathbf{v} \\\
&= \det \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \end{vmatrix} = (u_2v_3 - u_3v_2)\mathbf{i} - (u_1v_3 - u_3v_1)\mathbf{j} + (u_1v_2 - u_2v_1)\mathbf{k}
\end{aligned}
$$

The cross product vector $\mathbf{w} = \mathbf{u} \times \mathbf{v}$ is orthogonal to both $\mathbf{u}$ and $\mathbf{v}$. Moreover, $\mathbf{v} \times \mathbf{u} = -(\mathbf{u} \times \mathbf{v})$. The length of $\mathbf{u} \times \mathbf{v}$ equals the area of the parallelogram spanned by $\mathbf{u}$ and $\mathbf{v}$.

---

### 참고 자료

[원본 경로 #1](https://renessans-edu.uz/files/books/2023-12-04-11-33-41_46e7ce28c81d5c62d59b34ccc1c6f465.pdf)

[원본 경로 #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)

[원본 경로 #3](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)