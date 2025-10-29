---
title: 'Basis and Dimension'
date: '2023-03-10'
tags: ['Linear algebra', 'lecture']
---

### Warm up

In a vector space, any vector set can be reduced to a minimal collection of linearly independent vectors, which is called a basis.

If $S$ is a basis for $V$ and $S$ has only finitely many elements, then we say that $V$ is finite-dimensional. The number of vectors in $S$ is the dimension of $V$. Suppose $V$ is a finite-dimensional vector space and $S$ and $T$ are two different bases for $V$. We might worry that $S$ and $T$ could have different numbers of vectors. Fortunately, this does not happen.

$P_n(t)$ (polynomials of degree $n$ or less in $t$) has $\{1, t, \dots, t^n\}$ as a basis. This is because every vector in this space is a sum

$$
a_0 1 + a_1 t + \cdots + a_n t^n, \ a_i \in \mathbb{R}
$$

so $P_n(t) = \text{span}\{1, t, \dots, t^n\}$. This vector set is linearly independent. If the polynomial $p(t) = c_0 1 + c_1 t + \cdots + c_n t^n = 0$, then $c_0 = c_1 = \cdots = c_n = 0$, so $p(t)$ is the zero polynomial. Therefore, $P_n(t)$ is finite-dimensional, and $\text{dim } P_n(t) = n+1$.

If $S = \{v_1, \dots, v_n\}$ is a basis for vector space $V$, then every vector $w \in V$ in $V$ can be written as a linear combination $w=c_1v_1 + \cdots + c_nv_n$. Since $S$ is a basis for $V$, there exist constants $c_i$ satisfying the linear combination. And if we assume there exists a second set of constants $d_i$ satisfying $w= d_1v_1 + \cdots+d_nv_n$, then $0v = w -w$, $c_1v_1 + \cdots + c_nv_n - d_1v_1 - \cdots - d_nv_n = (c_1-d_1)v_1 + \cdots + (c_n-d_n)v_n$. If the case where $c_i \ne d_i$ occurs once, the equation reduces to $0=(c_i-d_i)v_i$, and since we assumed the vector $v_i$ is non-zero, this is a contradiction. Also, if the case where $c_i \ne d_i$ occurs more than once, it becomes possible to write as a linear combination, contradicting linear independence $(c_i = d_i)$.

---

### Bases in $R^n$

We have verified that $\mathbb{R}^n$ is the span of the following vectors.

$$
\mathbb{R}^n = \text{span} \left\{ \begin{pmatrix} 1 \\ 0 \\ \vdots \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \\ \vdots \\ 0 \end{pmatrix}, \dots, \begin{pmatrix} 0 \\ 0 \\ \vdots \\ 1 \end{pmatrix} \right\}
$$

And we have verified that this vector set is linearly independent. Therefore, this vector set is a basis for $\mathbb{R}^n$, and $\text{dim } \mathbb{R}^n = n$. This basis is often called the standard or canonical basis of $\mathbb{R}^n$. The vector with 1 in the $i$-th position and 0 everywhere else is written as $\mathbf{e}_i$. It points in the direction of the $i$-th coordinate axis and has unit length. In multivariable calculus classes, this basis for $\mathbb{R}^3$ is often written as $\{\mathbf{\hat{i}}, \mathbf{\hat{j}}, \mathbf{\hat{k}}\}$.

An additional point to know is that bases are not unique. While there exists a unique way to express a vector in terms of a specific basis, the basis itself is not unique. For example, both sets $$\left\{ \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \begin{pmatrix} 0 \\ 1 \end{pmatrix} \right\} \text{ and } \left\{ \begin{pmatrix} 1 \\ 1 \end{pmatrix}, \begin{pmatrix} 1 \\ -1 \end{pmatrix} \right\}$$ are bases for $\mathbb{R}^2$. Simply scaling the vectors of one of these sets is sufficient to show that $\mathbb{R}^2$ has infinitely many bases.

---

### Matrix of a Linear Transformation

Bases not only allow us to describe any vector as a column vector, but also allow us to express linear transformations as matrices. Suppose $L: V \to W$ is a linear transformation, and we have ordered input and output bases for $V$ and $W$ respectively as $\mathcal{E} = (\mathbf{e}_1, \dots, \mathbf{e}_n)$ and $\mathcal{F} = (\mathbf{f}_1, \dots, \mathbf{f}_m)$.

$$
\begin{aligned}
& L(\mathbf{e}_j) = f_1 m^1_j + \cdots + f_m m^m_j \\
&= (\mathbf{f}_1, \dots, \mathbf{f}_m) \begin{pmatrix} m^1_j \\ \vdots \\ m^m_j \end{pmatrix}
\end{aligned}
$$

The number $m^i_j$ is the $i$-th component of $L(\mathbf{e}_j)$ in the basis $\mathcal{F}$, and $\mathbf{f}_i$ is a vector. The numbers $m^i_j$ naturally form a matrix whose $j$-th column is the column vector shown above. Indeed, if $\mathbf{v} = e_1 v^1 + \cdots + e_n v^n$, then

$$
\begin{aligned}
& L(\mathbf{v}) = L(v^1 \mathbf{e}_1 + v^2 \mathbf{e}_2 + \cdots + v^n \mathbf{e}_n) \\
&= v^1 L(\mathbf{e}_1) + v^2 L(\mathbf{e}_2) + \cdots + v^n L(\mathbf{e}_n) \\
&= \sum_{j=1}^n L(\mathbf{e}_j) v^j \\
&= \begin{pmatrix} \mathbf{f}_1 & \mathbf{f}_2 & \cdots & \mathbf{f}_m \end{pmatrix} \begin{pmatrix} m^1_1 & m^1_2 & \cdots & m^1_n \\ m^2_1 & m^2_2 & & \vdots \\ \vdots & & \ddots & \vdots \\ m^m_1 & \cdots & & m^m_n \end{pmatrix} \begin{pmatrix} v^1 \\ v^2 \\ \vdots \\ v^n \end{pmatrix}
\end{aligned}
$$

The array of numbers $M = (m^i_j)$ is called the matrix of $L$ in the input and output bases $\mathcal{E}$ and $\mathcal{F}$ for $V$ and $W$. This matrix will change if we change any of the bases.

For example, if

$$
L \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix} = \begin{pmatrix} 1 \\ 4 \\ 7 \end{pmatrix} \\ 
L \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 2 \\ 5 \\ 8 \end{pmatrix} \\ 
L \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix} = \begin{pmatrix} 3 \\ 6 \\ 9 \end{pmatrix}
$$

then the matrix of $L$ in the standard basis is simply

$$
\begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{pmatrix}
$$

but it can be rewritten as follows.

$$
\begin{aligned}
& L \begin{pmatrix} x \\ y \\ z \end{pmatrix} = L \left[ x \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix} + y \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix} + z \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix} \right] \\
&= x L \begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix} + y L \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix} + z L \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix} \\
&= x \begin{pmatrix} 1 \\ 4 \\ 7 \end{pmatrix} + y \begin{pmatrix} 2 \\ 5 \\ 8 \end{pmatrix} + z \begin{pmatrix} 3 \\ 6 \\ 9 \end{pmatrix} \\
&= \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{pmatrix} \begin{pmatrix} x \\ y \\ z \end{pmatrix}
\end{aligned}
$$

---

### References

[Original source #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[Original source #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)