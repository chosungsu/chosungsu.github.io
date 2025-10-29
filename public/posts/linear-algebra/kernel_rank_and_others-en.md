---
title: 'Kernel, Rank, and Others'
date: '2023-03-13'
tags: ['Linear algebra', 'lecture']
---

### Inverse of Functions and Kernels

Given a linear transformation $L: V \to W$, we often want to know whether it has an inverse transformation $M: W \to V$. This is whether there exists a transformation such that $ML\mathbf{v} = \mathbf{v}$ for all $\mathbf{v} \in V$ and $LM\mathbf{w} = \mathbf{w}$ for all $\mathbf{w} \in W$.

When $f: S \to T$ is a function from set $S$ to set $T$, $S$ is called the domain of $f$, and $T$ is called the codomain or target of $f$.

#### Range

The range of a function $f: S \to T$ is the set

$$
\text{ran}(f) := \{f(s) \mid s \in S\} \subset T
$$

This is the subset of the codomain $T$ that can be reached by mapping elements of the domain $S$ through $f$. The range is the span of the column components of a matrix, and

$$
\text{ran} \begin{pmatrix} 1 & 2 & 0 & 1 \\ 1 & 2 & 1 & 2 \\ 0 & 0 & 1 & 1\end{pmatrix}
$$

Computing the column components of the above range in RREF (Reduced Row Echelon Form):

$$
\text{ran} \begin{pmatrix} 1 & 2 & 0 & 1 \\ 0 & 0 & 1 & 1 \\ 0 & 0 & 0 & 0\end{pmatrix}
$$

Only columns (1, 3) with leading variables equal to 1 are included in the span, giving:

$$
\text{span} \left\{\begin{pmatrix} 1 \\ 1 \\ 0\end{pmatrix}, \begin{pmatrix} 0 \\ 1 \\ 1\end{pmatrix}\right\}
$$

#### Image

The image of any subset $U$ of the domain $S$ of a function $f: S \to T$ is

$$
f(U) = \text{Im } U := \{f(x) \mid x \in U\}
$$

The range of $f$ is a special case of the image of the entire domain $S$, so the range is sometimes also called the image of $f$, as in $\text{ran } f = \text{Im } S$. The range of a matrix is always a span of vectors, so it is a vector space.

The pre-image of any subset $U \subset T$ of the codomain $T$ is

$$
f^{-1}(U) := \{s \in S \mid f(s) \in U\} \subset S
$$

The pre-image $f^{-1}(U)$ is the set of all elements of $S$ that map to $U$.

#### Injective and Surjective

A function $f$ is one-to-one (1:1) or injective if $f(x) \neq f(y)$ whenever $x \neq y \in S$. Injectivity is a condition on pre-images. A function is onto or surjective if for every $t \in T$, there exists $s \in S$ such that $f(s) = t$. Surjectivity is a condition on the range. If $f$ is both injective and surjective, it is bijective or an isomorphism.

#### Kernel

The kernel of a linear function $L: V \to W$ is the set

$$
\text{ker } L = \{\mathbf{v} \in V \mid L\mathbf{v} = \mathbf{0}_W\} \subset V
$$

If $L$ has matrix $M$, finding the kernel is equivalent to solving the homogeneous system $M\mathbf{x} = \mathbf{0}$. $\text{ker } L$ is a subspace of $V$.

The rank of a linear transformation $L$ is the dimension of its range:

$$
\text{rank } L := \text{dim } L(V)
$$

The nullity of a linear transformation $L$ is the dimension of its kernel:

$$
\text{null } L := \text{dim ker } L
$$

---

### Least squares

In many applications, an exact solution to a system is not needed, and instead only the best possible approximation may be required. If the vector space $W$ has a notion of vector length, we can attempt to find $\mathbf{x}$ that minimizes $|L(\mathbf{x}) - \mathbf{v}|$ for $\mathbf{v} \in W$.

We can write $W = L(U) \oplus L(U)^\perp$. Then $\mathbf{v}$ can be uniquely written as $\mathbf{v} = \mathbf{v}_k + \mathbf{v}_\perp$, where $\mathbf{v}_k \in L(U)$ and $\mathbf{v}_\perp \in L(U)^\perp$.

Therefore, we need to solve $L(\mathbf{u}) = \mathbf{v}_k$. In component form, $\mathbf{v}_\perp$ is $V - MX$, which is ultimately the part we want to minimize. From the perspective of $M$, remember that $L(U)$ is spanned by the columns of $M$. Then $\mathbf{v}_\perp$ must be perpendicular to the columns of $M$.

---

### Projection Matrices

Since the codomain of $M$ is the direct sum $\text{codom } M = \text{ran } M \oplus \text{ker } M^T$, there is a unique way to write $\mathbf{v}$ as $\mathbf{v} = \mathbf{v}_r + \mathbf{v}_k$, where $\mathbf{v}_k \in \text{ker } M^T$ and $\mathbf{v}_r \in \text{ran } M$. It is clear that $M\mathbf{x} = V$ has a solution only when $\mathbf{v} \in \text{ran } M \iff \mathbf{v}_k = \mathbf{0}$.

If $X$ is a solution to $M\mathbf{x} = \mathbf{v}_r$, then

$$
M X = \mathbf{v}_r \implies M^T M X = M^T \mathbf{v}_r
$$

We have $M^T \mathbf{v}_k = \mathbf{0}$. Therefore, $M^T \mathbf{v} = M^T (\mathbf{v}_r + \mathbf{v}_k) = M^T \mathbf{v}_r$.

---

### Singular Value Decomposition

Assuming $L: V \rightarrow W$, the possibility that $\text{dim } V =: n = m := \text{dim } W$ is low in reality, so the $m \times n$ matrix $M$ of $L$ in bases of $V$ and $W$ will not be square. However, if both vector spaces $V$ and $W$ have inner products, there exists an analogue of the eigenvalue problem, which is the singular values of $L$.

Under the assumption that $\text{ker } L = \{\mathbf{0}\}$, if we find an orthonormal basis $(\mathbf{u}_1, \dots, \mathbf{u}_n)$ of $V$ consisting of eigenvectors of $L^* L$, then multiplying both sides by $L$:

$$
\begin{aligned}
& L^* L \mathbf{u}_i = \lambda_i \mathbf{u}_i \\
& L L^* L \mathbf{u}_i = \lambda_i L \mathbf{u}_i
\end{aligned}
$$

This shows that $L \mathbf{u}_i$ is an eigenvector of $L L^*$. Also, since $\text{ker } L = \{\mathbf{0}\}$, the vectors $(L \mathbf{u}_1, \dots, L \mathbf{u}_n)$ are linearly independent.

Next, computing the angles and lengths between these vectors:

$$
\begin{aligned}
& (M U_i) \cdot (M U_j) \\
& = U_i^T M^T M U_j \\
& = \lambda_j U_i^T U_j \\
& = \lambda_j U_i \cdot U_j \\
& = \lambda_j \delta_{ij}
\end{aligned}
$$

We can see that the vectors $(L \mathbf{u}_1, \dots, L \mathbf{u}_n)$ are orthogonal but not orthonormal. The length of $L \mathbf{u}_i$ corresponds to $\sqrt{\lambda_i}$. In general, since $\text{ker } L = \{\mathbf{0}\}$, $\text{dim } L(V) = \text{dim } V$, and $\text{dim } V \le \text{dim } W$, so $n \le m$, this cannot be a basis of $W$.

Let's compute the matrix of $L$ with respect to an orthonormal basis $\mathcal{O} = (\mathbf{u}_1, \dots, \mathbf{u}_n)$ of $V$ and an orthonormal basis $\mathcal{O}' = (\mathbf{v}_1, \dots, \mathbf{v}_m)$ of $W$:

$$
\begin{aligned}
& L \mathcal{O} = (L \mathbf{u}_1, \dots, L \mathbf{u}_n) \\
& = (\sqrt{\lambda_1} \mathbf{v}_1, \dots, \sqrt{\lambda_n} \mathbf{v}_n) \\
& = (\mathbf{v}_1, \dots, \mathbf{v}_m) \begin{pmatrix} \sqrt{\lambda_1} & 0 & \cdots & 0 \\ 0 & \sqrt{\lambda_2} & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & \sqrt{\lambda_n} \\ 0 & 0 & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & 0 \end{pmatrix}
\end{aligned}
$$

The result is very close to diagonalization. The numbers $\sqrt{\lambda_i}$ along the main diagonal are called the singular values of $L$.

---

### References

[Original source #1](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)

[Original source #2](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[Original source #3](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)