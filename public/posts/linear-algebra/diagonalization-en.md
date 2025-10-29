---
title: 'Diagonalization'
date: '2023-03-10'
tags: ['Linear algebra', 'lecture']
---

### Diagonalizability

Let $L : V \to V$ and suppose the ordered basis $\mathcal{B} = (\mathbf{v}_1, \dots, \mathbf{v}_n)$ is a set of eigenvectors of $L$ with eigenvalues $\lambda_1, \dots, \lambda_n$:

$$
L(v_1) = \lambda_1 v_1 \\
L(v_2) = \lambda_2 v_2 \\
\vdots \\
L(v_n) = \lambda_n v_n.
$$

Consequently, the matrix of $L$ in the eigenvector basis $\mathcal{B}$ is diagonal:

$$
L \begin{pmatrix} x^1 \\ x^2 \\ \vdots \\ x^n \end{pmatrix}_{\mathcal{B}}
=
\begin{pmatrix}
\begin{pmatrix}
\lambda_1 & & & \\
& \lambda_2 & & \\
& & \ddots & \\
& & & \lambda_n
\end{pmatrix}
\begin{pmatrix} x^1 \\ x^2 \\ \vdots \\ x^n \end{pmatrix}
\end{pmatrix}_{\mathcal{B}}.
$$

All off-diagonal entries are zero. A linear transformation $L: V \to V$ is called diagonalizable if there exists a collection of $n$ linearly independent eigenvectors of $L$. If an $n\times n$ matrix is already diagonal, then the standard basis vectors $\mathbf{e}_i$ are themselves a set of $n$ linearly independent eigenvectors.

---

### Change of Basis

Let $\mathcal{S} = (\mathbf{v}_1, \dots, \mathbf{v}_n)$ and $\mathcal{S}' = (\mathbf{v}'_1, \dots, \mathbf{v}'_n)$ be two ordered bases of a vector space $V$. Express $\mathbf{v}'_k$ as a linear combination of the $\mathbf{v}_i$:

$$
\begin{aligned}
& \begin{pmatrix} \mathbf{v}'_1, \mathbf{v}'_2, \cdots, \mathbf{v}'_n \end{pmatrix}
=
\begin{pmatrix} \mathbf{v}_1, \mathbf{v}_2, \cdots, \mathbf{v}_n \end{pmatrix}
\begin{pmatrix}
 p^1_1 & p^1_2 & \cdots & p^1_n \\
 p^2_1 & p^2_2 & & \vdots \\
 \vdots & & \ddots & \vdots \\
 p^n_1 & \cdots & & p^n_n
\end{pmatrix}.
\end{aligned}
$$

Here the $p^i_k$ are scalars, which we regard as entries of the square matrix $P = (p^i_k)$. The matrix $P$ must be invertible, because each $\mathbf{v}_j$ can also be uniquely written as a linear combination of the $\mathbf{v}'_k$:

$$
\mathbf{v}_j = \sum_k \mathbf{v}'_k \, q^k_j, \quad
\mathbf{v}_j = \sum_k \sum_i \mathbf{v}_i \, p^i_k \, q^k_j.
$$

Consequently, each $\mathbf{v}_j$ is an eigenvector of $PQ$ with eigenvalue 1, hence $PQ$ is the identity matrix; i.e., $PQ=I$. The matrix $P$ is called the change-of-basis matrix. Its first column is precisely the coordinate vector of $v'_1$ in the basis $v_1,\dots,v_n$. In general, the columns of the change-of-basis matrix are the coordinates of the new basis vectors expressed in the old basis.

For example, let $\mathcal{S}' = (\mathbf{v}'_1, \mathbf{v}'_2)$ be an ordered basis of $V$, and $\mathcal{S} = (\mathbf{v}_1, \mathbf{v}_2)$ another ordered basis. Suppose

$$
v'_1 = \begin{pmatrix} \frac{1}{\sqrt{2}} \\ \frac{1}{\sqrt{2}} \end{pmatrix}_{\!S}, \quad
v'_2 = \begin{pmatrix} \frac{1}{\sqrt{3}} \\ -\frac{1}{\sqrt{3}} \end{pmatrix}_{\!S}.
$$

Then

$$
\begin{aligned}
& v'_1 = \begin{pmatrix} v_1, v_2 \end{pmatrix}
\begin{pmatrix} \tfrac{1}{\sqrt{2}} \\ \tfrac{1}{\sqrt{2}} \end{pmatrix}
= \tfrac{v_1 + v_2}{\sqrt{2}}, \\
& v'_2 = \begin{pmatrix} v_1, v_2 \end{pmatrix}
\begin{pmatrix} \tfrac{1}{\sqrt{3}} \\ -\tfrac{1}{\sqrt{3}} \end{pmatrix}
= \tfrac{v_1 - v_2}{\sqrt{3}}.
\end{aligned}
$$

The matrix $P$ has as its columns the coordinates of $v'_1, v'_2$. Changing the basis changes the matrix representation of a linear map, but the linear transformation as a map between vector spaces is independent of the chosen bases.

Consider the following example of a basis change:

$$
L(1) = \begin{pmatrix} 1 \\ 2 \end{pmatrix},\quad
L(t) = \begin{pmatrix} 2 \\ 1 \end{pmatrix},\quad
L(t^2) = \begin{pmatrix} 3 \\ 3 \end{pmatrix}.
$$

From this, using the basis $\mathcal{S} = (1, t, t^2)$ for the domain and the standard basis $(\mathbf{e}_1, \mathbf{e}_2)$ for $\mathbb{R}^2$ as codomain, we can immediately read off the matrix $M$ of $L$:

$$
\begin{aligned}
& \begin{pmatrix} L(1), L(t), L(t^2) \end{pmatrix}
= (\mathbf{e}_1 + 2\mathbf{e}_2,\, 2\mathbf{e}_1 + \mathbf{e}_2,\, 3\mathbf{e}_1 + 3\mathbf{e}_2) \\
&= \begin{pmatrix} \mathbf{e}_1, \mathbf{e}_2 \end{pmatrix}
\begin{pmatrix} 1 & 2 & 3 \\ 2 & 1 & 3 \end{pmatrix}
\ \Rightarrow\ M = \begin{pmatrix} 1 & 2 & 3 \\ 2 & 1 & 3 \end{pmatrix}.
\end{aligned}
$$

Now evaluate $L$ at the new input basis vectors:

$$
\begin{aligned}
& (L(1+t),\, L(t+t^2),\, L(1+t^2)) \\
&= \left( \begin{pmatrix} 1 \\ 2 \end{pmatrix} + \begin{pmatrix} 2 \\ 1 \end{pmatrix},\
\begin{pmatrix} 2 \\ 1 \end{pmatrix} + \begin{pmatrix} 3 \\ 3 \end{pmatrix},\
\begin{pmatrix} 1 \\ 2 \end{pmatrix} + \begin{pmatrix} 3 \\ 3 \end{pmatrix} \right) \\
&= \left( \begin{pmatrix} 3 \\ 3 \end{pmatrix},\ \begin{pmatrix} 5 \\ 4 \end{pmatrix},\ \begin{pmatrix} 4 \\ 5 \end{pmatrix} \right).
\end{aligned}
$$

Let $\mathbf{w}'_1 = \begin{pmatrix} 1 \\ 2 \end{pmatrix}$ and $\mathbf{w}'_2 = \begin{pmatrix} 2 \\ 1 \end{pmatrix}$. Then $\mathbf{w}'_1 + \mathbf{w}'_2 = \mathbf{w}'_3 = \begin{pmatrix} 3 \\ 3 \end{pmatrix}$, $\mathbf{w}'_1 + 2\mathbf{w}'_2 = \begin{pmatrix} 5 \\ 4 \end{pmatrix}$, and $2\mathbf{w}'_1 + \mathbf{w}'_2 = \begin{pmatrix} 4 \\ 5 \end{pmatrix}$. Hence

$$
\begin{aligned}
& (L(1+t),\, L(t+t^2),\, L(1+t^2)) \\
&= (\mathbf{w}'_1 + \mathbf{w}'_2,\, \mathbf{w}'_1 + 2\mathbf{w}'_2,\, 2\mathbf{w}'_1 + \mathbf{w}'_2) \\
&= \begin{pmatrix} \mathbf{w}'_1, \mathbf{w}'_2 \end{pmatrix}
\begin{pmatrix} 1 & 1 & 2 \\ 1 & 2 & 1 \end{pmatrix}
\ \Rightarrow\ M' = \begin{pmatrix} 1 & 1 & 2 \\ 1 & 2 & 1 \end{pmatrix}.
\end{aligned}
$$

Thus we can express the transformed matrix $M'$ with respect to a different input basis. Indeed,

$$
\begin{aligned}
& \begin{pmatrix} 1 + t,\ t + t^2,\ 1 + t^2 \end{pmatrix}
= \begin{pmatrix} 1, t, t^2 \end{pmatrix}
\begin{pmatrix} 1 & 0 & 1 \\ 1 & 1 & 0 \\ 0 & 1 & 1 \end{pmatrix}
\ \Rightarrow\ P = \begin{pmatrix} 1 & 0 & 1 \\ 1 & 1 & 0 \\ 0 & 1 & 1 \end{pmatrix},
\end{aligned}
$$

and

$$
\begin{aligned}
& \begin{pmatrix} \mathbf{w}'_1, \mathbf{w}'_2 \end{pmatrix}
= (\mathbf{e}_1 + 2\mathbf{e}_2,\ 2\mathbf{e}_1 + \mathbf{e}_2)
= \begin{pmatrix} \mathbf{e}_1, \mathbf{e}_2 \end{pmatrix}
\begin{pmatrix} 1 & 2 \\ 2 & 1 \end{pmatrix}
\ \Rightarrow\ Q = \begin{pmatrix} 1 & 2 \\ 2 & 1 \end{pmatrix}.
\end{aligned}
$$

Therefore,

$$
\begin{aligned}
& M' = Q^{-1} M P \\
&= -\frac{1}{3}
\begin{pmatrix} 1 & -2 \\ -2 & 1 \end{pmatrix}
\begin{pmatrix} 1 & 2 & 3 \\ 2 & 1 & 3 \end{pmatrix}
\begin{pmatrix} 1 & 0 & 1 \\ 1 & 1 & 0 \\ 0 & 1 & 1 \end{pmatrix} \\
&= \begin{pmatrix} 1 & 1 & 2 \\ 1 & 2 & 1 \end{pmatrix}.
\end{aligned}
$$

---

### Changing to a Basis of Eigenvectors

Switching to a basis of eigenvectors yields significant simplifications. Since $L : V \to V$, we often already know the matrix $M$ of $L$ with respect to the same input and output basis $\mathcal{S} = (\mathbf{u}_1, \dots, \mathbf{u}_n)$.

In a new eigenvector basis $\mathcal{S}' = (\mathbf{v}_1, \dots, \mathbf{v}_n)$, the matrix $D$ of $L$ is diagonal because $L\mathbf{v}_i = \lambda_i \mathbf{v}_i$:

$$
\begin{aligned}
& \begin{pmatrix} L(\mathbf{v}_1), L(\mathbf{v}_2), \dots, L(\mathbf{v}_n) \end{pmatrix}
= \begin{pmatrix} \mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_n \end{pmatrix}
\begin{pmatrix} \lambda_1 & 0 & \cdots & 0 \\
0 & \lambda_2 & & \vdots \\
\vdots & & \ddots & 0 \\
0 & \cdots & 0 & \lambda_n \end{pmatrix}.
\end{aligned}
$$

If $P$ is the change-of-basis matrix from $\mathcal{S}$ to $\mathcal{S}'$, then the diagonal matrix of eigenvalues $D$ and the original matrix $M$ satisfy

$$
D = P^{-1} M P.
$$

If there exists a matrix $P$ such that $M = P^{-1} N P$, we say that $M$ and $N$ are similar.

As an example, consider

$$
M = \begin{pmatrix} -14 & -28 & -44 \\ -7 & -14 & -23 \\ 9 & 18 & 29 \end{pmatrix}.
$$

To diagonalize, first compute the characteristic polynomial:

$$
\begin{aligned}
& \det(M - \lambda I) \\
&= (-14-\lambda)\det\begin{pmatrix} -14-\lambda & -23 \\ 18 & 29-\lambda \end{pmatrix}
- (-28)\det\begin{pmatrix} -7 & -23 \\ 9 & 29-\lambda \end{pmatrix}
+ (-44)\det\begin{pmatrix} -7 & -14-\lambda \\ 9 & 18 \end{pmatrix} \\
&= (-14-\lambda)(\lambda^2 - 15\lambda + 8) + 28(7\lambda + 4) - 44(9\lambda) \\
&= -\lambda^3 + \lambda^2 + 2\lambda = 0.
\end{aligned}
$$

Thus the eigenvalues of $M$ are $\{-1, 0, 2\}$. For $M$ to be diagonalizable, the eigenvectors $v_1, v_2, v_3$ corresponding to these eigenvalues must be linearly independent. Suppose we form

$$
\begin{aligned}
P = \begin{pmatrix} \mathbf{v}_1 & \mathbf{v}_2 & \mathbf{v}_3 \end{pmatrix}
= \begin{pmatrix} -8 & -2 & -1 \\ -1 & 1 & -1 \\ 3 & 0 & 1 \end{pmatrix}.
\end{aligned}
$$

The determinant of this matrix is $-1$, so $P$ is invertible. Moreover, since the columns of $P$ are eigenvectors, we have

$$
\begin{aligned}
MP = \begin{pmatrix} Mv_1 & Mv_2 & Mv_3 \end{pmatrix}
= \begin{pmatrix} -v_1 & 0\,v_2 & 2v_3 \end{pmatrix}
= \begin{pmatrix} v_1 & v_2 & v_3 \end{pmatrix}
\begin{pmatrix} -1 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 2 \end{pmatrix}.
\end{aligned}
$$

Hence the eigenvector matrix $P$ is precisely the change-of-basis matrix that diagonalizes $M$.

---

### References

[Original source #1](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)

[Original source #2](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[Original source #3](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)