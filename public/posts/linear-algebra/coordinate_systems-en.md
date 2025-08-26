---
title: 'Coordinate systems'
date: '2023-03-13'
tags: ['Linear algebra', 'lecture']
---

### Coordinates

A basis $B = \{v_1, v_2, \dots, v_n\}$ of a vector space $V$ is a set of vectors that satisfies the following two conditions:

1. The set $B$ spans all of $V$, i.e., $V = \text{span}(B)$.

2. The set $B$ is linearly independent.

Therefore, each vector $x^*$ in $V$ can be expressed as a linear combination of $B$: $(x^* = c_1v_1 + c_2v_2 + \dots + c_nv_n)$. Also, by the definition of linear independence, every vector $x$ in $\text{span}(B)$ can be uniquely expressed as a linear combination of $(v_1, \cdots, v_n)$. This means that there exist no other scalars satisfying $x^* = t_1v_1 + t_2v_2 + \dots + t_nv_n$.

To verify this, let's assume that $x^*$ can be expressed in two different ways using $B$:

$x^* = c_1v_1 + c_2v_2 + \dots + c_nv_n$
$x^* = t_1v_1 + t_2v_2 + \dots + t_nv_n$

Subtracting these two expressions gives $0=x^*-x^*=(c_1-t_1)v_1+\cdots+(c_n-t_n)v_n$, and since $B$ is linearly independent, the only linear combination that produces the zero vector is the trivial one. Therefore, $c_i-t_i=0$ or $c_i=t_i$ for all $i$.

As a result, for the basis $B = \{v_1, v_2, \dots, v_n\}$, the scalars $c_1, c_2, \cdots, c_n$ uniquely determine the vector $x$, and the converse also holds.

---

### Coordinate Vector

In vector notation, the $B$-coordinates of $x$ can be represented as follows:

$$
[x]_B=\begin{bmatrix}
c_1 \\
c_2 \\
\vdots \\
c_n
\end{bmatrix}
$$

Now, for example, when we set $B$ to $\{\begin{bmatrix} 1 & 0 \\ 0 & 0\end{bmatrix}, \begin{bmatrix} 0 & 1 \\ 0 & 0\end{bmatrix}, \begin{bmatrix} 0 & 0 \\ 1 & 0\end{bmatrix}, \begin{bmatrix} 0 & 0 \\ 0 & 1\end{bmatrix}\}$, to show that it is a basis for $M_{2 \times 2}$, we compute as follows:

$M = \begin{bmatrix} m_{11} & m_{12} \\ m_{21} & m_{22} \end{bmatrix}=m_{11}\begin{bmatrix} 1 & 0 \\ 0 & 0\end{bmatrix}+m_{12}\begin{bmatrix} 0 & 1 \\ 0 & 0\end{bmatrix} + m_{21}\begin{bmatrix} 0 & 0 \\ 1 & 0\end{bmatrix} + m_{22}\begin{bmatrix} 0 & 0 \\ 0 & 1\end{bmatrix}=\begin{bmatrix} c_1 & c_2 \\ c_3 & c_4\end{bmatrix}=\begin{bmatrix} 0 & 0 \\ 0 & 0\end{bmatrix}$, which shows that it is linearly independent with all scalars being 0, confirming it is a basis.

---

### Coordinate Mappings

If $B = \{v_1, v_2, \dots, v_n\}$ is a basis for $R^n$ and $P = [v_1 \ v_2 \ \dots \ v_n] \in M_{n \times n}$, then $x=P[x]_B$ holds. Therefore, $P$ is called the coordinate transformation matrix.

For example, let's consider $P$ as follows:

$$
P=\begin{bmatrix}
1 & 3 & 3 \\
-1 & -4 & -2 \\
0 & 0 & -1
\end{bmatrix}
$$

The matrix $P$ transforms coordinates $B=(1, 0, -1)$ to 3D, and the result is $x=P[x]_B=\begin{bmatrix}
1 & 3 & 3 \\
-1 & -4 & -2 \\
0 & 0 & -1
\end{bmatrix}\begin{bmatrix}
1 \\ 0 \\ -1
\end{bmatrix}=\begin{bmatrix}
-2 \\ 1 \\ 1
\end{bmatrix}$. At this time, since the inverse of $P$ is $\begin{bmatrix}
4 & 3 & 6 \\
-1 & -1 & -1 \\
0 & 0 & -1
\end{bmatrix}$, the $B$-coordinates of $v$ can be found as $[v]_B=P^{-1}v$.

---

### Matrix Representation of a Linear Map

Let $V, W$ be vector spaces and $T:V \rightarrow W$ be a linear map. By this definition, for all $v, u \in V$ and $\alpha \in \mathbb{R}$, $T(v+u) = T(v) + T(u)$ and $T(\alpha v) = \alpha T(v)$ hold. And by linearity, $T(v)=T(c_1v_1+c_2v_2+\cdots+c_nv_n)=c_1T(v_1)+\cdots+c_nT(v_n)$ can be expressed as follows.

Now each vector $T(v_j)$ belongs to $W$ and since $\gamma$ is a basis for the vector space, if scalars exist, $T(v_j)=a_{1,j}w_1+\cdots+a_{m,j}w_m$ is expressed, and thus $T(v)=\sum_{i=1}^{m}\sum_{j=1}^{n}c_ja_{i,j}w_i$ can be written briefly. This is called the matrix representation of the linear map with respect to bases $B$ and $\gamma$.

---

### References

[Original Source #1](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)