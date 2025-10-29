---
title: 'Orthonormal Bases and Complements'
date: '2023-03-13'
tags: ['Linear algebra', 'lecture']
---

### Standard basis

With a general inner product at our disposal, we can measure the length of vectors and the angles between vectors.

The standard notion of length for a vector $\mathbf{x} = (x_1, x_2, \dots, x_n) \in \mathbb{R}^n$ is

$$
\begin{aligned}
& \Vert \mathbf{x} \Vert = \sqrt{\mathbf{x} \cdot \mathbf{x}} \\
&= \sqrt{(x_1)^2 + (x_2)^2 + \cdots + (x_n)^2}
\end{aligned}
$$

The standard basis $\mathbf{e}_1, \mathbf{e}_2, \dots, \mathbf{e}_n$ of $\mathbb{R}^n$ has many useful properties with respect to the inner product and length. First, each standard basis vector has unit length and is orthogonal to all others.

This is summarized as

$$
\mathbf{e}_i^T \mathbf{e}_j = \delta_{ij} = \begin{cases} 1 & i = j \\ 0 & i \neq j \end{cases}
$$

where $\delta_{ij}$ is the Kronecker delta. The Kronecker delta gives the entries of the identity matrix. Given column vectors $\mathbf{v}$ and $\mathbf{w}$, showing that $\mathbf{v} \cdot \mathbf{w}$ equals the matrix multiplication $\mathbf{v}^T \mathbf{w}$ is the essence of the inner product.

We can also form the outer product $\mathbf{v}\mathbf{w}^T$, which gives a square matrix:

$$
\begin{aligned}
& \Pi_1 = \mathbf{e}_1 \mathbf{e}_1^T \\
& = \begin{pmatrix} 1 \\ 0 \\ \vdots \\ 0 \end{pmatrix} \begin{pmatrix} 1 & 0 & \cdots & 0 \end{pmatrix} \\
&= \begin{pmatrix} 1 & 0 & \cdots & 0 \\ 0 & 0 & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & 0 \end{pmatrix}
\end{aligned}
$$

Thus $\Pi_i$ is a diagonal square matrix with 1 in the $i$-th diagonal position and 0 everywhere else. Moreover, $\Pi_i \Pi_j = \mathbf{e}_i \mathbf{e}_i^T \mathbf{e}_j \mathbf{e}_j^T = \mathbf{e}_i \delta_{ij} \mathbf{e}_j^T$:

$$
\Pi_i \Pi_j = \begin{cases} \Pi_i & i = j \\ 0 & i \neq j \end{cases}
$$

For a diagonal matrix $D$ with diagonal entries $\lambda_1, \dots, \lambda_n$, we can write

$$
D = \lambda_1 \Pi_1 + \cdots + \lambda_n \Pi_n
$$

---

### Orthogonal and Orthonormal Bases

An orthogonal basis $\{v_1, \dots, v_n\}$ shows that all vectors are perpendicular when $v_i \cdot v_j = 0$, and an orthonormal basis $\{u_1, \dots u_n\}$ is a basis that is both orthogonal and has unit length when $u_i \cdot u_j = \delta_{ij}$.

Let $\mathcal{T} = \{\mathbf{u}_1, \dots, \mathbf{u}_n\}$ be an orthonormal basis of $\mathbb{R}^n$. Since $\mathcal{T}$ is a basis, any vector $\mathbf{v}$ can be uniquely written as a linear combination of vectors in $\mathcal{T}$:

$$
\mathbf{v} = c^1 \mathbf{u}_1 + \cdots + c^n \mathbf{u}_n
$$

Taking the inner product of $\mathbf{v}$ with any vector $\mathbf{u}_i$ in $\mathcal{T}$ gives

$$
\begin{aligned}
& \mathbf{v} \cdot \mathbf{u}_i = c^1 (\mathbf{u}_1 \cdot \mathbf{u}_i) + \cdots + c^i (\mathbf{u}_i \cdot \mathbf{u}_i) + \cdots + c^n (\mathbf{u}_n \cdot \mathbf{u}_i) \\
&= c^1 \cdot 0 + \cdots + c^i \cdot 1 + \cdots + c^n \cdot 0 = c^i \\
& \Rightarrow c^i = \mathbf{v} \cdot \mathbf{u}_i \\
& \Rightarrow \mathbf{v} = (\mathbf{v} \cdot \mathbf{u}_1) \mathbf{u}_1 + \cdots + (\mathbf{v} \cdot \mathbf{u}_n) \mathbf{u}_n \\
&= \sum_i (\mathbf{v} \cdot \mathbf{u}_i) \mathbf{u}_i
\end{aligned}
$$

---

### Relating Orthonormal Bases

Let $\mathcal{T} = \{\mathbf{u}_1, \dots, \mathbf{u}_n\}$ and $\mathcal{R} = \{\mathbf{w}_1, \dots, \mathbf{w}_n\}$ be two orthonormal bases of $\mathbb{R}^n$. Then we can take inner products as follows:

$$
\begin{aligned}
& \mathbf{w}_1 = (\mathbf{w}_1 \cdot \mathbf{u}_1) \mathbf{u}_1 + \cdots + (\mathbf{w}_1 \cdot \mathbf{u}_n) \mathbf{u}_n \\
& \Rightarrow \mathbf{w}_i = \sum_j (\mathbf{u}_j \cdot \mathbf{w}_i) \mathbf{u}_j
\end{aligned}
$$

Therefore, the change-of-basis matrix $P$ can be given as $P = (p^j_i) = (\mathbf{u}_j \cdot \mathbf{w}_i)$, and computing $PP^T$ gives the inner product $(u \cdot v)(w \cdot z) = (u^Tv)(w^Tz) = u^T(vw^T)z$. Here, the object $\mathbf{v} \mathbf{w}^T$ is a square matrix formed by the outer product of $\mathbf{v}$ and $\mathbf{w}$. Expanding this expression:

$$
\begin{aligned}
& \sum_i (u_j \cdot w_i)(w_i \cdot u_k) \\
&= u^T_j [\sum_i (w_iw^T_i)]u_k \\
&= u^T_jI_nu_k = \delta_{jk}
\end{aligned}
$$

This confirms that $\mathbf{P}^T = \mathbf{P}^{-1}$, so it is an orthogonal matrix. The reason the expression inside the brackets becomes the identity matrix is as follows. Using the inner product $w^T_iw_j = \delta_{ij}$:

$$
\begin{aligned}
& (\sum_i w_iw^T_i)v \\
&=(\sum_i w_iw^T_i)(\sum_j c_jw_j) \\
&=\sum_j c_j \sum_i w_i(w^T_iw_j) \\
&=\sum_j c_j \sum_i w_i(w^T_iw_j) \\
&=\sum_j c_j \sum_i w_i \begin{cases} 1 & \text{if } i=j \\ 0 & \text{if } i \ne j \end{cases} \\
&=\sum_j c_j w_j \cdot 1 + \sum_j c_j \sum_{i \ne j} w_i \cdot 0 \\
&=\sum_j c_jw_j = v
\end{aligned}
$$

---

### Gram-Schmidt and Complements

Given a vector $\mathbf{v}$ and another vector $\mathbf{u}$ not in $\text{span}\{\mathbf{v}\}$, we can construct the following new vector:

$$
\mathbf{v}^\perp := \mathbf{v} - \frac{\mathbf{u} \cdot \mathbf{v}}{\mathbf{u} \cdot \mathbf{u}} \mathbf{u}
$$

Here, $\mathbf{v}^\perp$ is orthogonal to $\mathbf{u}$ because taking the inner product of both sides with $\mathbf{u}$ gives $\mathbf{u} \cdot \mathbf{v}^\perp = \mathbf{u} \cdot \mathbf{v} - \frac{\mathbf{u} \cdot \mathbf{v}}{\mathbf{u} \cdot \mathbf{u}} (\mathbf{u} \cdot \mathbf{u}) = 0$.

Sometimes this is expressed as $\mathbf{v} = \mathbf{v}^\perp + \mathbf{v}^{\parallel}$, where $\mathbf{v}^{\parallel} = \frac{\mathbf{u} \cdot \mathbf{v}}{\mathbf{u} \cdot \mathbf{u}} \mathbf{u}$, creating an orthogonal decomposition. If $\mathbf{u}, \mathbf{v}$ are linearly independent vectors in $\mathbb{R}^3$, then the set $\{\mathbf{u}, \mathbf{v}^\perp, \mathbf{u} \times \mathbf{v}^\perp\}$ will be an orthogonal basis of $\mathbb{R}^3$. We can then divide each vector by its length to obtain an orthonormal basis.

Based on this process, given an ordered set of linearly independent vectors $(\mathbf{v}_1, \mathbf{v}_2, \dots)$, we can define an orthogonal basis of $\text{span}\{\mathbf{v}_1, \mathbf{v}_2, \dots\}$ consisting of the following vectors:

$$
\begin{aligned}
& \mathbf{v}^\perp_1 := v_1 \\
& \mathbf{v}^\perp_2 := v_2-\frac{\mathbf{v}^\perp_1 \cdot \mathbf{v}_2}{\mathbf{v}^\perp_1 \cdot \mathbf{v}^\perp_1} \mathbf{v}^\perp_1 \\
& \mathbf{v}^\perp_i := \mathbf{v}_i - \cdots - \frac{\mathbf{v}^\perp_{i-1} \cdot \mathbf{v}_i}{\mathbf{v}^\perp_{i-1} \cdot \mathbf{v}^\perp_{i-1}} \mathbf{v}^\perp_{i-1}
\end{aligned}
$$

Here, each $\mathbf{v}^\perp_i$ depends on $\mathbf{v}^\perp_j$ for all $j$ less than $i$. This process is called the Gram-Schmidt orthogonalization process.

---

### QR Decomposition

The Gram-Schmidt process suggests another matrix decomposition $\mathbf{M} = \mathbf{Q} \mathbf{R}$, where $\mathbf{Q}$ is an orthogonal matrix and $\mathbf{R}$ is an upper triangular matrix. The so-called QR decomposition is useful for solving linear systems, eigenvalue problems, and least squares approximations.

As an example, define the following matrix $M$:

$$
\mathbf{M} = \begin{pmatrix} 2 & -7/5 & 1 \\ 1 & 14/5 & -2 \\ 0 & 1 & -2 \end{pmatrix} \begin{pmatrix} 1 & 1/5 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix}
$$

Taking the inner product of columns 1 and 2 of this matrix: $\mathbf{a}_1^T\mathbf{a}_2=2 \cdot (-\frac{7}{5}) + 1 \cdot (\frac{14}{5}) + 0 \cdot 1 = 0$, so they are orthogonal. Taking the inner product of columns 1 and 3: $\mathbf{a}_1^T\mathbf{a}_3 = 0$, so they are also orthogonal.

Now applying the Gram-Schmidt process: $\mathbf{u}_1 = \mathbf{a}_1$, $\mathbf{u}_2=\mathbf{a}_2-proj_{\mathbf{u}_1}\mathbf{a}_2$, $\mathbf{u}_3=\mathbf{a}_3-proj_{\mathbf{u}_1}\mathbf{a}_3-proj_{\mathbf{u}_2}\mathbf{a}_3$, where $proj_{\mathbf{u}}v = \frac{\mathbf{u}^T\mathbf{v}}{\mathbf{u}^T\mathbf{u}}u$. Since the inner product values are 0, we have $\mathbf{u}_2=\mathbf{a}_2$, $\mathbf{a}_2^T\mathbf{a}_3 = -9$, $\mathbf{a}_2^T\mathbf{a}_2 = \frac{54}{5}$, $proj_{\mathbf{a}_2} \mathbf{a}_3 = -\frac{5}{6}\mathbf{a}_2$, $\mathbf{u}_3 = \mathbf{a}_3 + \frac{5}{6} \mathbf{a}_2 = \begin{pmatrix} -1/6 \\ 1/3 \\ -7/6 \end{pmatrix}$.

Therefore, the normalized $Q$ matrix is:

$$
Q = \begin{pmatrix} \frac{2}{\sqrt{5}} & \frac{-7}{\sqrt{54}} & \frac{-1}{3\sqrt{6}} \\\frac{1}{\sqrt{5}} & \frac{14}{\sqrt{54}} & \frac{2}{3\sqrt{6}} \\ 0 & \frac{5}{\sqrt{54}} & \frac{-7}{3\sqrt{6}}\end{pmatrix}
$$

And computing the upper triangular matrix $R_{ij} = q^T_ia_j$:

$$
\begin{aligned}
& R_{11} = \Vert \mathbf{a}_1 \Vert = \sqrt{5}, \\
& R_{12} = q^T_1\mathbf{a}_2 = 0, \\
& R_{22} = \Vert \mathbf{a}_2 \Vert = \frac{54}{5}, \\
& R_{23} = q^T_2 \mathbf{a}_3 = -\frac{9}{\sqrt{54}/\sqrt{5}}, \\
& R_{33} = \Vert \mathbf{u}_3 \Vert = \frac{\sqrt{6}}{2} \\
& \Rightarrow R = \begin{pmatrix} \sqrt{5} & 0 & 0 \\ 0 & \frac{54}{5} & -\frac{9}{\sqrt{54}/\sqrt{5}} \\ 0 & 0 & \frac{\sqrt{6}}{2}\end{pmatrix}
\end{aligned}
$$

---

### References

[Original source #1](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)

[Original source #2](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[Original source #3](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)