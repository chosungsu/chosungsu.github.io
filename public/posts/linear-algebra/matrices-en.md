---
title: 'Matrices'
date: '2023-03-06'
tags: ['Linear algebra', 'lecture']
---

### Linear Transformations and Matrices

Linear operators can be represented as matrices through ordered, finite-dimensional bases for vector spaces.

#### Basis Notation

Using a basis, any vector can be represented as column vectors. Given the vector space $V = \{ \begin{pmatrix} a & b \\ c & d \end{pmatrix} | a, b, c, d \in R\}$ of $2 \times 2$ real matrices with component-wise addition and scalar multiplication defined, one choice of basis is an ordered set $B$ of matrices.

$$
B = (\begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}, \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix}, \begin{pmatrix} 0 & 0 \\ 1 & 0 \end{pmatrix}, \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix})
$$

Think of the elements in this set as $e^1_1, e^1_2, e^2_1, e^2_2$ and write them as sums of multiples of basis elements.

$$
\begin{aligned}
& v = \begin{pmatrix} a & b \\ c & d \end{pmatrix} \\
&= a \begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix} + b \begin{pmatrix} 0 & 1 \\ 0 & 0 \end{pmatrix} + c \begin{pmatrix} 0 & 0 \\ 1 & 0 \end{pmatrix} + d \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix} \\
&= ae^1_1 + be^1_2 + ce^2_1 + de^2_2 \\
&= \begin{pmatrix} a \\ b \\ c \\ d \end{pmatrix}_B
\end{aligned}
$$

In this way, the vector $v$ encodes information about what matrix it is as basis vectors and stores it as column vectors.

---

### From Linear operators to Matrices

When $L$ is a linear operator from $V$ to $W$, the matrix for $L$ with respect to an ordered basis $B = (b_1, b_2, \dots)$ for $V$ and an ordered basis $B' = (\beta_1, \beta_2, \dots)$ for $W$ is an array of numbers $m^j_i$ specified as follows.

$$
L(b_i) = m^1_i \beta_1 + \cdots + m^j_i \beta_j
$$

To compute such a linear transformation matrix, we must transform from the perspective of basis vectors.

$$
(\beta_1, \beta_2, \dots) \begin{pmatrix} m^1_1 & m^1_2 & \cdots & m^1_i \\ m^2_1 & m^2_2 & \cdots & m^2_i \\ \vdots & \vdots & \ddots & \vdots \\ m^j_1 & m^j_2 & \cdots & m^j_i\end{pmatrix}
$$

Therefore, we can see that linear operators become matrices when given ordered input and output bases.

---

### Properties of matrices

In the above matrix, $m^i_j$ are called entries, where the superscript and subscript represent rows and columns respectively.

An $r \times 1$ matrix is called a column vector and is written as follows.

$$
v = \begin{pmatrix} v^1 \\ v^2 \\ \vdots \\ v^r \end{pmatrix}
$$

And a $1 \times k$ matrix is called a row vector and is written as follows.

$$
v = \begin{pmatrix} v_1 & v_2 & \cdots & v_k\end{pmatrix}
$$

All $r \times k$ matrices form a vector space with addition and scalar product.

$$
M^r_k = \{(m^i_j)| m^i_j \in R\}, \\
M + N = (m^i_j) + (n^i_j), \\
rM = r(m^i_j)
$$

Now we can multiply an $r \times k$ and a $k \times 1$ to produce an $r \times 1$ vector. As can be seen in $(Mv)^i = \sum_{j=1}^{k} m^i_j v^j$, this results in placing $s$ column vectors of dimension $r \times 1$ side by side. Thus, linearity is maintained.

---

### Associativity and Non commutativity

Many properties of matrices stem from the same properties for real numbers.

$\rightarrow$ Associativity of matrix multiplication: In real numbers, with $x(yz) = (xy)z$, the order of multiplication is not important. The same property applies to matrices. Assuming matrices $M = (m^i_j), N = (n^j_k), R = (r^k_l)$ are of sizes $m \times n, n \times r, r \times t$ respectively, we can see that associativity holds the same: $(MN)R = (\sum_{k=1}^{r}[\sum_{j=1}^{n} m^i_j n^j_k] r^k_l) = (\sum_{k=1}^{r}m^i_j[\sum_{j=1}^{n} n^j_k r^k_l]) = M(NR)$.

$\rightarrow$ Commutativity of matrix multiplication: Unlike associativity, matrix multiplication is not commutative.

---

### The algebra of Square Matrices

Not all pairs of matrices can be multiplied. When multiplying two matrices, the number of rows of the left matrix must equal the number of columns of the right matrix. That is, for $r \times k, s \times l$, we need $k=s$. However, for square matrices of the same size, this is not a problem.

---

### Trace

Large matrices contain much information, and by choosing a good basis, we can make the linear transformation matrix very simple. For matrix size $n < \infty$, the trace of a square matrix $M = (m^i_j)$ refers to the sum of the diagonal elements.

$$
tr M = \sum_{i=1}^{n} m^i_i
$$

While matrix multiplication does not satisfy commutativity, the trace has the property of not depending on the order of multiplication.

---

### Inverse Matrix

$$
M^{-1}M = I = MM^{-1}
$$

A square matrix $M$ being invertible or non-singular means that the above matrix $(M^{-1})$ exists. If it does not have an inverse, the matrix is called singular or non-invertible.

To find the inverse of a $2 \times 2$ matrix

$$
M = \begin{pmatrix} a & b \\ c & d \end{pmatrix}, N =\] \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}
$$

The product of the above two matrices is $(ad-bc)I$. Therefore, if $(ad-bc) \ne 0$, the inverse matrix is $M^{-1} = \frac{1}{ad-bc} \begin{pmatrix} d & -b \\ -c & a\end{pmatrix}$.

Inverse matrices have the following properties: if $A$ is a square matrix and $B$ is the inverse of $A$, then $AB=I=BA$, so $A$ is also the inverse of $B$ (double inverse property); the property that the inverse of a product reverses the order, similar to transpose, as shown by $B^{-1}A^{-1}AB = B^{-1}IB = I$, $ABB^{-1}A^{-1} = AIA^{-1} = I$; and the property that transpose and inverse commute, $(A^{-1})^T = (A^T)^{-1}$, shown through $(AB)^T = B^TA^T, I^T=I$.

#### Linear systems and inverses

If $M^{-1}$ exists, we can solve the linear system associated with $M$.

$$
\begin{aligned}
& -x + 2y -3z = 1 \\
& 2x + y = 2 \\
& 4x - 2y + 5z = 0
\end{aligned}
$$

The above system of linear equations can be expressed as matrices. If $v = \begin{pmatrix}
1 \\ 2 \\ 0
\end{pmatrix}, Mx = v$, it can be found as follows.

$$
\begin{aligned}
& \begin{pmatrix}
x \\ y \\ z
\end{pmatrix} = 
\begin{pmatrix}
-1 & 2 & -3 \\
2 & 1 & 0 \\
4 & -2 & 5
\end{pmatrix}^{-1}
\begin{pmatrix}
1 \\ 2 \\ 0
\end{pmatrix} \\
&=\begin{pmatrix}
-1 & 2 & -3 & | & 1 & 0 & 0 \\
2 & 1 & 0 & | & 0 & 1 & 0 \\
4 & -2 & 5 & | & 0 & 0 & 1
\end{pmatrix} \\
&=\begin{pmatrix}
1 & 0 & 0 & | & -5 & 4 & -3 \\
0 & 1 & 0 & | & 10 & -7 & 6 \\
0 & 0 & 1 & | & 8 & -6 & 5
\end{pmatrix} 
\end{aligned}
$$

Therefore, it can be transformed to $x = M^{-1}v$, so the inverse matrix is $\begin{pmatrix}
-5 & 4 & -3 \\
10 & -7 & 6 \\
8 & -6 & 5
\end{pmatrix}$.

---

### Homogeneous systems

A square matrix $M$ is invertible only when the homogeneous system $Mx=0$ has a non-zero solution. First, assume that $M^{-1}$ exists. Then $M\mathbf{x} = \mathbf{0} \implies \mathbf{x} = M^{-1}\mathbf{0} = \mathbf{0}$. Therefore, if $M$ is invertible, $M\mathbf{x} = \mathbf{0}$ does not have a non-zero solution.

---

### References

[Original source #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[Original source #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)
