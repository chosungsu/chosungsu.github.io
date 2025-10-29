---
title: 'Determinants'
date: '2023-03-06'
tags: ['Linear algebra', 'lecture']
---

### Warm up

Determinants reduce a square matrix to a single number. This number determines whether the matrix is invertible or not. If $M$ is a $1 \times 1$ matrix, then $M = (m) \implies M^{-1} = (1/m)$. When $M$ is a $2 \times 2$ matrix, the inverse is $M^{-1} = \frac{1}{m^1_1m^2_2 - m^1_2m^2_1} \begin{pmatrix} m^2_2 & -m^1_2 \\ -m^2_1 & m^1_1\end{pmatrix}$, and thus it is only invertible when $m^1_1 m^2_2 - m^1_2 m^2_1 \ne 0$.

---

### Permutations

A permutation is a shuffling of objects labeled $1 \sim n$. It can be expressed as $\sigma = [\sigma(1) \sigma(2) \sigma(3) \sigma(4) \sigma(5)]$, and there are $n!$ possible arrangements of permutations. The number of exchanges in a permutation has the same parity, and if the number is even it is called an even permutation, and if odd it is called an odd permutation. In fact, for all $n \ge 2$, $n!$ is even, and exactly half of the permutations will be even and the remainder odd.

The sign function assigns permutations to either 1 (even) or -1 (odd). The determinant of a square matrix $M$ is expressed as follows.

$$
det M = \sum_{\sigma} sgn(\sigma) m^1_{\sigma(1)} m^2_{\sigma(2)} \cdots m^n_{\sigma(n)}
$$

The above formula is for all permutations of $n$ objects. Each term is a product of $n$ components of the matrix, and each factor comes from a different row. If $M$ is a diagonal matrix, then $M^i_j=0$ when $i \ne j$, so the determinant becomes $m^1_1 m^2_2 \cdots m^n_n$. And exchanging rows changes the sign of the determinant.

---

### Elementary Matrices and Determinants

For an arbitrary matrix $M$ and $M'$ after row operations, multiplying by an elementary matrix $E$ gives $M'=EM$.

#### Row swap

$$
M = \begin{pmatrix} \vdots \\ R_i \\ \vdots \\ R_j \\ \vdots\end{pmatrix}, 
M' = \begin{pmatrix} \vdots \\ R_j \\ \vdots \\ R_i \\ \vdots\end{pmatrix}
$$

If we have these two matrices, the elementary matrix is an identity matrix with rows $i$ and $j$ exchanged, like $\begin{pmatrix} 1 & \cdots & \cdots & \cdots & 0 \\ 0 & 0 & \cdots & 1 & 0 \\ 0 & 1 & \cdots & 0 & 0 \\ 0 & 0 & \cdots & 0 & 1\end{pmatrix}$. Since exchanging a pair of rows changes the sign of the determinant, we know that changes occur as $det E^i_j = -1, det M' = -det M$.

However, since $det E^i_j = -1, M' = E^i_j M$, we can distribute the product as $det E^i_jM = det E^i_j det M$.

#### Row Multiplication

If we multiply a row by a scalar, for $R^i(\lambda)$ assuming it is an identity matrix with the $i$-th diagonal element replaced by $\lambda$, we can express $M' = R^i(\lambda)M$.

Looking at the determinant, we can prove that $det M' = \lambda \sum_{\sigma} sgn(\sigma) m^1_{\sigma(1)} \cdots m^n_{\sigma(n)} = \lambda det M$.

#### Row Addition

Finally, row addition is adding $\mu R_j$ to $R_i$. This is defined as an elementary matrix $S^i_j(\mu) = \begin{pmatrix} 1 & \cdots & \cdots & \cdots & 0 \\ 0 & 1 & \cdots & \mu & 0 \\ 0 & 0 & \cdots & 1 & 0 \\ 0 & 0 & \cdots & 0 & 1\end{pmatrix}$, which is an identity matrix with an additional $\mu$ at position $i, j$. Multiplying matrix $M$ by this elementary matrix performs row addition, and that row changes to $R_i + \mu R_j$.

Now computing the determinant, we can split the sum: $det M' = \lambda \sum_{\sigma} sgn(\sigma) m^1_{\sigma(1)} \cdots (m^i_{\sigma(i)} + \mu m^j_{\sigma(i)}) \cdots m^n_{\sigma(n)} = det M + \mu det M''$. Since $M''$ has two identical rows $(i,j)$, its determinant is 0. Therefore, we get the result $det M' = det M$.

#### Determinant of Products

Elementary matrices $E^i_j, R^i(\lambda), S^i_j(\mu)$ are all invertible except $R^i(0)$. In fact, the inverse of an elementary matrix is another elementary matrix.

If $M$ and $N$ are both $n \times n$ square matrices and for elementary matrices $E_i, F_i$ the reduced row echelon form satisfies $M = E_1 E_2 \cdots E_k RREF(M), N = F_1 F_2 \cdots F_k RREF(N)$ and is an identity matrix, then it is calculated as $det(MN) = det(E_1) \cdots det(E_k)det(I)det(F_1) \cdots det(F_l)det RREF(N) = det(M)det(N)$.

Otherwise, $M$ is not invertible and $\text{det } M = 0 = \text{det } RREF(M)$. Then $RREF(M)$ has a row consisting entirely of zeros, so $R^n(\lambda) RREF(M) = RREF(M)$ for any $\lambda$.

---

### Properties of the Determinant

We now know that the determinant of a matrix is non-zero if and only if the matrix is invertible. We also know that the determinant is a multiplicative function in the sense that $\text{det}(MN) = \text{det } M \text{ det } N$. We will now devise several methods to compute the determinant.

The minor of a square matrix $M$ is the determinant of all square matrices obtained by removing one row and one column from $M$. In particular, any component $m^i_j$ is related to the minor obtained by removing the $i$-th row and $j$-th column from $M$.

$$
\begin{aligned}
& det M = m^1_1 \sum_{\sigma'_1} sgn(\sigma'_1) m^2_{\sigma'_1(2)} \cdots m^n_{\sigma'_1(n)} \\
&+ m^1_2 \sum_{\sigma'_2} sgn(\sigma'_2) m^2_{\sigma'_2(1)} \cdots m^n_{\sigma'_2(n)} \\ 
&+ \cdots
\end{aligned}
$$

Therefore, it is possible to express the determinant as minors as above. Here the symbol $\sigma'_k$ represents the permutation $\sigma$ with input $k$ removed. We still need to replace $\sum_{\sigma'_j}$ with the sum over permutations of the column numbers of the matrix components of this minor. This operation introduces a minus sign whenever $j-1$ is odd. That is, to perform expansion by minors, we select component $m^1_j$ from the first row, then add it multiplied by $(-1)^{j-1}$ times the determinant of the matrix with the $i$-th row and $j$-th column deleted.

For example:

$$
M = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9\end{pmatrix} \\
\downarrow \\ 
det M= 1 det M^1_1 -2 det M^1_2 + 3 det M^1_3 = 0
$$

The determinant of the inverse matrix: Since we define $M$ and $N$ as $n \times n$ matrices and know that $\text{det}(MN) = \text{det } M \text{ det } N$ and $\text{det } I = 1$, we have $1 = \text{det } I = \text{det}(MM^{-1}) = \text{det } M \text{ det } M^{-1}$. Therefore, the determinant is defined as $\text{det } M^{-1} = \frac{1}{\text{det } M}$.

---

### References

[Original source #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[Original source #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)
