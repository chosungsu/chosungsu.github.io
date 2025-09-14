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

### References

[Original Source #1](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)