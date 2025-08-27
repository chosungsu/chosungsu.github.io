---
title: 'Change of basis'
date: '2023-03-13'
tags: ['Linear algebra', 'lecture']
---

### Change of Basis

We have seen that $\varepsilon P_B$ takes the $B$-coordinates $[x]_B$ of vector $x$ as input and returns the coordinates in the standard basis. Now we will consider the case where both bases $B$ and $C$ are different from the standard basis $E$.

Let $B = {v_1, v_2, \dots, v_n}$ and $C = {w_1, \dots, w_n}$ be two bases of $R^n$, and define $\varepsilon P_B=[v_1 v_2 \dots v_n]$ and $\varepsilon P_C=[w_1 w_2 \dots w_n]$. If $[x]_C$ is the coordinate vector of $x$ with respect to basis $C$, then $x=(\varepsilon P_C)[x]_C$ holds.

Combining the relations, we get $\varepsilon P_C[x]_C=\varepsilon P_B[x]_B$, and since $\varepsilon P_C$ is invertible, multiplying both sides by its inverse gives $[x]_C=(\varepsilon P_C)^{-1}*(\varepsilon P_B)[x]_B=[(\varepsilon P_C)^{-1}v_1 (\varepsilon P_C)^{-1}v_2 \dots (\varepsilon P_C)^{-1}v_n]=(\varepsilon P_C)^{-1}(\varepsilon P_B)$. Therefore, this result represents the process of transforming the $B$-coordinates of $x$ to $C$-coordinates. And the $i$-th column $(\varepsilon P_C)^{-1}v_i$ represents the coordinate vector with respect to basis $C$.

To calculate $(\varepsilon P_C)^{-1}(\varepsilon P_B)$, we combine $\varepsilon P_C$ and $\varepsilon P_B$ into an augmented matrix and obtain it by reducing to RREF through row elimination.

---

### Inner Product

The inner product in $R^n$ generalizes the inner product of $R^2$ and $R^3$ vectors.

When $u = (u_1, u_2, \dots, u_n)$ and $v = (v_1, v_2, \dots, v_n)$ are vectors in $R^n$, the inner product is $u \cdot v=u_1v_1+u_2v_2 + \cdots +u_nv_n=u^Tv=[u_1 u_2 \dots u_n]\begin{bmatrix} v_1 \\ v_2 \\ \vdots \\ v_n\end{bmatrix}$.

The inner product satisfies the commutative law, distributive law, and associative law for vectors $u,v,w \in R^n$ and scalar $\alpha$.

And defining the length or norm of a vector, we have $|u|=\sqrt{u \cdot u}=\sqrt{(u_1)^2+(u_2)^2+ \cdots +(u_n)^2}$, and a vector with norm 1 is called a unit vector.

---

### Orthogonality

Two vectors $u, v$ in $R^n$ are orthogonal if $u \cdot v =0$.

In two and three dimensions, orthogonality can be proven using the cosine law as $u \cdot v=|u||v|cos(\theta)$, and for example, when $\theta=\frac{\pi}{2}$, the inner product value becomes 0.

Also, from the Pythagorean theorem, $|u+v|^2=|u|^2+2(u \cdot v)+|v|^2$, and the necessary and sufficient condition for $|u+v|^2=|u|^2+|v|^2$ is when the inner product value is 0.

A set of vectors ${u_1, u_2, \dots, u_p}$ is called an orthogonal set if every pair of different vectors $u_i, u_j$ are orthogonal, that is, when $i \ne j$, $u_i \cdot u_j=0$ is satisfied. For example, let's check if the following set of vectors is an orthogonal set.

$$
u_1=\begin{bmatrix}
1 \\
-2 \\
1
\end{bmatrix},
u_2=\begin{bmatrix}
0 \\
1 \\
2
\end{bmatrix},
u_3=\begin{bmatrix}
-5 \\
-2 \\
1
\end{bmatrix}
$$

Since the inner product values $u_1 \cdot u_2=u_1 \cdot u_3 =u_2 \cdot u_3=0$, it is an orthogonal set and linearly independent.

---

### Coordinates in an Orthonormal Basis

When $x$ is an arbitrary vector and we want to find its coordinates $[x]_B=(c_1,c_2, \dots, c_n)$ with respect to basis $B$, it satisfies $x=c_1u_1+c_2u_2+\cdots+c_nv_n$. Taking the inner product of both sides with $u_1$ and using the orthogonality property, we get $u_1 \cdot x = c_1(u_1 \cdot u_1)=c_1$.

Therefore, the coordinate vector is organized as follows:

$$
[x]_B=\begin{bmatrix}
u_1 \cdot x \\
u_2 \cdot x \\
\vdots \\
u_n \cdot x
\end{bmatrix}
=\begin{bmatrix}
(u_1)^T x \\
(u_2)^T x \\
\vdots \\
(u_n)^T x
\end{bmatrix}
=U^Tx
$$

At this time, a matrix $U \in R^{n*n}$ that satisfies $U^TU=UU^T=I_n$ is called an orthogonal matrix. Therefore, if the set of basis vectors is orthonormal, then matrix $U$ becomes an orthogonal matrix.

---

### Characteristic Polynomial of a Matrix

If a number $\lambda$ is an eigenvalue of $A \in \mathbb{R}^{n \times n}$, then through the fact that there exists a non-zero vector $\mathbf{v}$ satisfying $A\mathbf{v} = \lambda\mathbf{v}$, we can say this is equivalent to $\mathbf{v} \in \text{Null}(A - \lambda I)$. In other words, only when $\lambda$ is an eigenvalue of $A$ does it contain vectors other than the zero vector.

We know that the necessary and sufficient condition for a matrix $M$ to have a non-trivial null space is that $M$ is non-invertible, which is equivalent to $det(M)=0$. Therefore, $\lambda$ is an eigenvalue only when $det(A-\lambda I)=0$ is satisfied.

For example, if we find the characteristic polynomial $p(\lambda)$ of $A = \begin{bmatrix} -2 & 4 \ -6 & 8 \end{bmatrix}$, we get $det(A-\lambda I)=(-2-\lambda)(8-\lambda)-(-24)=(\lambda-4)(\lambda-2)$, and its solutions are 4 and 2, which are the eigenvalues.

---

### Eigenvalues of Triangular Matrices

When matrix $A$ is triangular, its eigenvalues are the elements on the main diagonal. For example, let's find the characteristic polynomial and eigenvalues for a matrix like this:

$$
A=\begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
0 & a_{22} & a_{23} \\
0 & 0 & a_{33}
\end{bmatrix}
$$

Here, we can express $p(\lambda)=det(A-\lambda I)=(a_{11}-\lambda)(a_{22}-\lambda)(a_{33} - \lambda)$, and we can see that the solutions are ultimately the diagonal elements.

---

### Diagonalization

When there exists an invertible matrix $P$ satisfying $A = PBP^{-1}$ for two matrices $A$ and $B$, we can say they are similar, and therefore, saying that $A$ is diagonalizable means it is similar to a diagonal matrix $D$.

There exists an invertible matrix $P = \begin{bmatrix} \mathbf{v}_1 & \mathbf{v}_2 & \cdots & \mathbf{v}_n \end{bmatrix}$ and a diagonal matrix $D = \begin{bmatrix} \lambda_1 & 0 & \cdots & 0 \\ 0 & \lambda_2 & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & \lambda_n \end{bmatrix}$ such that $A = PDP^{-1}$ holds.

If we multiply both sides of this equation by matrix $P$, we get $AP=PD$, where $[Av_1 Av_2 \cdots Av_n]=[\lambda_1v_1 \lambda_2v_2 \cdots \lambda_nv_n]$, meaning the column vectors of $P$ are eigenvectors and since the matrix is invertible, they form a basis.

The conditions for diagonalizability are as follows:

1. It has $n$ distinct eigenvalues.

2. The algebraic and geometric multiplicities of the eigenvalues are equal.

---

### Symmetric Matrices

$$
A=\begin{bmatrix}
1 & -3 & 7 \\
-3 & 2 & 8 \\
7 & 8 & 4
\end{bmatrix}
$$

A square matrix $A$ is called symmetric when $A^T=A$. For example, for a function $f(x_1, x_2, \dots, x_n)$ with continuous second partial derivatives, Clairaut's Theorem in multivariable calculus states that $\frac{\partial^2 f}{\partial x_i \partial x_j} = \frac{\partial^2 f}{\partial x_j \partial x_i}$. Therefore, the Hessian matrix of $f$ becomes symmetric.

$$
Hess(f)=\begin{bmatrix}
\frac{\partial^2 f}{\partial x_1 \partial x_1} & \frac{\partial^2 f}{\partial x_1 \partial x_2} & \cdots & \frac{\partial^2 f}{\partial x_1 \partial x_n} \\
\frac{\partial^2 f}{\partial x_2 \partial x_1} & \frac{\partial^2 f}{\partial x_2 \partial x_2} & \cdots & \frac{\partial^2 f}{\partial x_2 \partial x_n} \\
\vdots & \vdots & \ddots & \vdots \\
\frac{\partial^2 f}{\partial x_n \partial x_1} & \frac{\partial^2 f}{\partial x_n \partial x_2} & \cdots & \frac{\partial^2 f}{\partial x_n \partial x_n}
\end{bmatrix}
$$

According to the second derivative test in multivariable calculus, if $P=(a_1, a_2, \dots, a_n)$ is a critical point of $f$, that is, when $\frac{\partial f}{\partial x_i}(P)=0$, then if all eigenvalues of $Hess(f)$ are positive, $P$ is a local minimum; if all are negative, $P$ is a local maximum; and if there are both positive and negative eigenvalues, $P$ is a saddle point.

When $A$ is a symmetric matrix, if $v_1, v_2$ are eigenvectors corresponding to different eigenvalues, they are orthogonal.

$$
A=\begin{bmatrix}
1& 0 & -1 \\
0 & 1 & 1 \\
-1 & 1 & 2
\end{bmatrix}
$$

There exists an orthonormal basis ${\mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_n}$ consisting of eigenvectors of $A$. We have $P^TP=I, A=PDP^T$. The characteristic polynomial of the above matrix $A$ is $p(\lambda)=det(A-\lambda I)=\lambda(\lambda-1)(\lambda-3)$, so the eigenvalues are $0, 1, 3$. The eigenvectors obtained from each eigenvalue are $u_1=\begin{bmatrix} 1 \\ -1 \\ 1\end{bmatrix}, u_2=\begin{bmatrix} 1 \\ 1 \\ 0\end{bmatrix}, u_3=\begin{bmatrix} -1 \\ 1 \\ 2\end{bmatrix}$. And these eigenvectors form an orthogonal set with $u_1^Tu_2=u_1^Tu_3=u_2^Tu_3=0$. Then, forming the orthonormal matrix, we get:

$$
P=[v_1 v_2 v_3]=\begin{bmatrix} \frac{1}{\sqrt{3}} & \frac{1}{\sqrt{2}} & -\frac{1}{\sqrt{6}}\\ -\frac{1}{\sqrt{3}} & \frac{1}{\sqrt{2}} & \frac{1}{\sqrt{6}} \\ \frac{1}{\sqrt{3}} & 0 & \frac{2}{\sqrt{6}}\end{bmatrix}
$$

And we can verify that $A=P\begin{bmatrix} 0 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 3\end{bmatrix}P^T$ holds.

---

### References

[Original Source #1](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)