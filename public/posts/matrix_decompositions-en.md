---
title: 'matrix decompostions'
date: '2024-05-06'
tags: ['Probability&Statistics', 'math']
---

### spectral decomposition

When there is a symmetric matrix $A \in R^{n*n}$, if there exist a diagonal matrix $D$ and an orthogonal matrix $V$, it can be calculated as $A = VDV^T$.

In the diagonal matrix D = diag(d1, ..., d_n), d_i \in R is the eigenvalue of matrix A.

---

### singular value decomposition

When there are an $n*p$ matrix $A$, an $n*p$ matrix $U$, and $p*p$ matrices $D$ and $V$, it can be calculated as $A = UDV^T$.

At this time, $C(U) = C(A)$ and $C(V) = R(A)$ are satisfied. The set of d is the singular values of $A$. And it can also be proven using spectral decomposition as $A^TA = VD^2V^T$.

$rank_1$ svd is the process of minimizing $f(x,y,s) = |A-sxy^T|^2_F$. Here, $x \in R^m$, $y \in R^n$ satisfy $|x|_2 = |y|_2 = 1$, $s > 0$.

A bi-convex problem is structured like $min_{x,y} f(x,y)$ where variables are divided into two parts, and when one variable is fixed, it becomes convex with respect to the other. Since this is not convex overall, it generally cannot be solved.

Therefore, an approximate solution can be found using a method called alternate convex search (ACS). Fix $y^0$ and update as $x^t = \frac{Ay^{t-1}}{|Ay^{t-1}|_2}$, $y^t = \frac{Ax^{t}}{|Ax^{t}|_2}$, $s = |Ax^t|_2$. At this time, unless $y^0$ is orthogonal to the largest singular vector, ($x^t, y^t$) converges to the left and right singular vectors of matrix $A$. The left side is the eigenvectors of AA^T, and the right side is the eigenvectors of A^TA. The ACS algorithm is used to find the largest eigenvector as follows:

$$
y^{t+1} = \frac{A^TAy^T}{|A^TAy^T|_2} \And \\
x^{t+1} = \frac{AA^Tx^T}{|AA^Tx^T|_2}
$$

And generally, this algorithm does not guarantee convergence to the global minimum.

---

### pca

PCA is a method for finding the direction that maximizes variance.

Using $\alpha \in R^p$, it is calculated as $\widehat{Var}(X\alpha) = \frac{1}{n} \sum_{i=1}^{n} (x_i^T\alpha)^2$. Here, $x_i$ is the $i$-th row element of $X$.

---

### low rank approximation

When the singular value decomposition formula is expanded as follows:

$$
A = \begin{bmatrix} u_1 \cdots u_p \end{bmatrix}\begin{bmatrix} d_1 & &  \\ & \ddots & \\ & & d_p \end{bmatrix}\begin{bmatrix} v_1 \\ \vdots \\ v_p \end{bmatrix}
$$

Here, the set of $d$ is in descending order and is expressed as the sum of $rank_1$ matrices.

When performing low rank approximation with $rank_k$, since only the top $k$ terms are used instead of the full $rank_p$, it can be expressed as $A_k = d_1u_1v_1^T + ... + d_ku_kv_k^T$. At this time, the Frobenius norm, which measures matrix size, can be calculated as $|A-A_k|^2_F = tr((A-A_k)^T(A-A_k)) = d^2_{k+1} + ... + d_p^2$.

---

### References

[Original Path #1](https://www.dropbox.com/scl/fi/b81pds38d2tvah4y0up35/Chap2-matrixDecomposition.pdf?rlkey=skoitzkzn1lklb9gyfgj7m5fp&e=1&dl=0)

[Original Path #2](https://simplecode.kr/80)



