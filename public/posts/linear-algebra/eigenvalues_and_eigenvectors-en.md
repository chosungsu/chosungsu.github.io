---
title: 'Eigenvalues and Eigenvectors'
date: '2023-03-15'
tags: ['Linear algebra', 'lecture']
---

### Eigenvalues and Eigenvectors

An $n \times n$ matrix $A$ may have nonzero vectors $\mathbf{v}$ such that the output $A\mathbf{v}$ is a simple scalar multiple of the input $\mathbf{v}$. That is, there exists a scalar $\lambda$ satisfying $A\mathbf{v} = \lambda\mathbf{v}$. In this case, $\mathbf{v}$ is called an eigenvector of $A$ and $\lambda$ is the eigenvalue corresponding to $\mathbf{v}$.

Thus, multiplying by $A$ scales an eigenvector but does not change its direction. Note that an eigenvector cannot be the zero vector.

$$
A=\begin{bmatrix}
4 & -1 & 6 \\
2 & 1 & 6 \\
2 & -1 & 8
\end{bmatrix}, \\
v=\begin{bmatrix}
-3 \\
0 \\
1
\end{bmatrix}, \\
u=\begin{bmatrix}
-1 \\
2 \\
1
\end{bmatrix}
$$

For example, with the matrix and vectors above, compute eigenvectors and eigenvalues. First,
$Av=2\*\begin{bmatrix}-3 \\ 0 \\ 1\end{bmatrix}=2v$, so $v$ is an eigenvector with eigenvalue $\lambda=2$. However,
$Au=\begin{bmatrix}0 \\ 6 \\ 4\end{bmatrix} \ne c\*u$, so $u$ is not an eigenvector.

If an eigenvalue is 0, then there exists a nonzero vector $\mathbf{v}$ such that $A\mathbf{v} = 0 \cdot \mathbf{v} = \mathbf{0}$. In other words, $\mathbf{v}$ lies in the null space of $A$, and $A$ is not invertible.

---

### Characteristic Polynomial of a Matrix

If a number $\lambda$ is an eigenvalue of $A \in \mathbb{R}^{n \times n}$, then there exists a nonzero vector $\mathbf{v}$ satisfying $A\mathbf{v} = \lambda\mathbf{v}$, which is equivalent to $\mathbf{v} \in \operatorname{Null}(A - \lambda I)$. That is, only when $\lambda$ is an eigenvalue does $A-\lambda I$ have nontrivial null space.

A matrix $M$ has a nontrivial null space if and only if it is singular, i.e., $\det(M)=0$. Therefore, eigenvalues are precisely the roots of $\det(A-\lambda I)=0$.

For example, for $A = \begin{bmatrix} -2 & 4 \\ -6 & 8 \end{bmatrix}$, the characteristic polynomial is
$p(\lambda)=\det(A-\lambda I)=(-2-\lambda)(8-\lambda)-(-24)=(\lambda-4)(\lambda-2)$, whose roots $4,2$ are the eigenvalues.

---

### Eigenvalues of Triangular Matrices

If $A$ is triangular, then the eigenvalues are its main diagonal entries. For instance, for
$$
A=\begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
0 & a_{22} & a_{23} \\
0 & 0 & a_{33}
\end{bmatrix}
$$
we have $p(\lambda)=\det(A-\lambda I)=(a_{11}-\lambda)(a_{22}-\lambda)(a_{33} - \lambda)$, so the roots are exactly the diagonal entries.

---

### Diagonalization

Two matrices $A, B$ are similar if there exists an invertible matrix $P$ such that $A = PBP^{-1}$. Thus, $A$ is diagonalizable if it is similar to a diagonal matrix $D$.

If there exist an invertible matrix $P = \begin{bmatrix} \mathbf{v}_1 & \mathbf{v}_2 & \cdots & \mathbf{v}_n \end{bmatrix}$ and a diagonal matrix $D = \begin{bmatrix} \lambda_1 & 0 & \cdots & 0 \\ 0 & \lambda_2 & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & \lambda_n \end{bmatrix}$ such that $A = PDP^{-1}$, then multiplying both sides on the right by $P$ yields $AP=PD$. This implies $[Av_1 \ Av_2 \ \cdots \ Av_n]=[\lambda_1v_1 \ \lambda_2v_2 \ \cdots \ \lambda_nv_n]$, i.e., the columns of $P$ are eigenvectors and, since $P$ is invertible, they form a basis.

Conditions for diagonalizability include:

1. $n$ distinct eigenvalues.
2. For each eigenvalue, the algebraic multiplicity equals the geometric multiplicity.

---

### Symmetric Matrices

$$
A=\begin{bmatrix}
1 & -3 & 7 \\
-3 & 2 & 8 \\
7 & 8 & 4
\end{bmatrix}
$$

A square matrix $A$ is symmetric if $A^T=A$. For example, for a function $f(x_1, x_2, \dots, x_n)$ with continuous second partial derivatives, Clairaut's theorem from multivariable calculus states $\frac{\partial^2 f}{\partial x_i \partial x_j} = \frac{\partial^2 f}{\partial x_j \partial x_i}$. Hence the Hessian matrix of $f$ is symmetric:

$$
\operatorname{Hess}(f)=\begin{bmatrix}
\frac{\partial^2 f}{\partial x_1 \partial x_1} & \cdots & \frac{\partial^2 f}{\partial x_1 \partial x_n} \\
\frac{\partial^2 f}{\partial x_2 \partial x_1} & \cdots & \frac{\partial^2 f}{\partial x_2 \partial x_n} \\
\vdots & \ddots & \vdots \\
\frac{\partial^2 f}{\partial x_n \partial x_1} & \cdots & \frac{\partial^2 f}{\partial x_n \partial x_n}
\end{bmatrix}
$$

By the second derivative test in multivariable calculus, if $P=(a_1, a_2, \dots, a_n)$ is a critical point of $f$ (i.e., $\frac{\partial f}{\partial x_i}(P)=0$), then if all eigenvalues of $\operatorname{Hess}(f)$ are positive, $P$ is a local minimum; if all are negative, a local maximum; and if both signs appear, a saddle point.

If $A$ is symmetric and $v_1, v_2$ are eigenvectors associated with distinct eigenvalues, then they are orthogonal.

$$
A=\begin{bmatrix}
1& 0 & -1 \\
0 & 1 & 1 \\
-1 & 1 & 2
\end{bmatrix}
$$

There exists an orthonormal basis of eigenvectors $\{\mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_n\}$. With $P^TP=I$, we have $A=PDP^T$. For the matrix $A$ above, the characteristic polynomial is $p(\lambda)=\det(A-\lambda I)=\lambda(\lambda-1)(\lambda-3)$, so the eigenvalues are $0, 1, 3$. Eigenvectors corresponding to each eigenvalue can be taken as $u_1=\begin{bmatrix} 1 \\ -1 \\ 1\end{bmatrix}, u_2=\begin{bmatrix} 1 \\ 1 \\ 0\end{bmatrix}, u_3=\begin{bmatrix} -1 \\ 1 \\ 2\end{bmatrix}$, and they form an orthogonal set since $u_1^Tu_2=u_1^Tu_3=u_2^Tu_3=0$. An orthonormal matrix $P$ can then be formed as

$$
P=[v_1 \ v_2 \ v_3]=\begin{bmatrix} \tfrac{1}{\sqrt{3}} & \tfrac{1}{\sqrt{2}} & -\tfrac{1}{\sqrt{6}}\\ -\tfrac{1}{\sqrt{3}} & \tfrac{1}{\sqrt{2}} & \tfrac{1}{\sqrt{6}} \\ \tfrac{1}{\sqrt{3}} & 0 & \tfrac{2}{\sqrt{6}}\end{bmatrix}
$$

and indeed $A=P\begin{bmatrix} 0 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 3\end{bmatrix}P^T$ holds.

---

### References

[Original Source #1](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)