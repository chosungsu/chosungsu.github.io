---
title: 'Linear Independence'
date: '2023-03-08'
tags: ['Linear algebra', 'lecture']
---

### Warm up

When we have a plane $P$ containing the origin in $R^3$ and non-zero vectors $\{u,v,w\} \in P$, if no two of these vectors are parallel, then $P = \text{span}\{u,v,w\}$.

However, since any two vectors determine a plane, if we use $u, v$, there will be constants satisfying $w=d_1u+d_2v$. Then we say that $w$ is not independent. In other words, linear dependence occurs when all constants multiplied are non-zero.

---

### Linear dependence

Three vectors exist as follows.

$$
v_1 = \begin{pmatrix} 0 \\ 0 \\ 1\end{pmatrix}, v_2 = \begin{pmatrix} 1 \\ 2 \\ 1\end{pmatrix}, v_3 = \begin{pmatrix} 1 \\ 2 \\ 3\end{pmatrix}
$$

To check if these are linearly independent, we can form a homogeneous system with $c_1, c_2, c_3$.

$$
\begin{pmatrix} v_1 & v_2 & v_3\end{pmatrix} \begin{pmatrix} c_1 \\ c_2 \\ c_3\end{pmatrix} = 0
$$

The above system has solutions only when the matrix $M = \begin{pmatrix} v_1 & v_2 & v_3 \end{pmatrix}$ is singular. The determinant is $\det M = det \begin{pmatrix} 0 & 1 & 1 \\ 0 & 2 & 2 \\ 1 & 1 & 3\end{pmatrix} = 0$, showing that there exist non-trivial solutions, indicating linear dependence.

Another way to find coefficients proving linear dependence is to solve a system of linear equations as follows.

$$
\begin{aligned}
\begin{pmatrix} 0 & 1 & 1 & | & 0 \\ 0 & 2 & 2 & | & 0 \\ 1 & 1 & 3 & | & 0\end{pmatrix} \\
\sim \begin{pmatrix} 1 & 1 & 3 & | & 0 \\ 0 & 1 & 1 & | & 0 \\ 0 & 0 & 0 & | & 0\end{pmatrix} \\
\sim \begin{pmatrix} 1 & 0 & 2 & | & 0 \\ 0 & 1 & 1 & | & 0 \\ 0 & 0 & 0 & | & 0\end{pmatrix}
\end{aligned}
$$

Through the solution set $\{-2, -1, 1\}$, we can express the linear combination as $c_1v_1 + c_2v_2 + c_3v_3 = 0 \rightarrow -2v_1 -v_2 +v_3 = 0$. That is, if one vector can be expressed as a linear combination of the other vectors, then it is linearly dependent.

---

### Linear Independence

To show that a vector set is linearly dependent, we find a linear combination of vectors equal to 0 or show that one vector can be expressed as a linear combination of the others. On the other hand, to confirm that a vector set is linearly independent, we must verify that all linear combinations of vectors with non-zero coefficients produce something other than the zero vector.

I will list three vectors below.

$$
v_1 = \begin{pmatrix} 0 \\ 0 \\ 2\end{pmatrix}, v_2 = \begin{pmatrix} 2 \\ 2 \\ 1\end{pmatrix}, v_3 = \begin{pmatrix} 1 \\ 4 \\ 3\end{pmatrix}
$$

To check if these vectors are linearly independent, we write whether $c_1v_1 + c_2v_2 + c_3v_3 = 0$ has a solution as a homogeneous system. Since the matrix $M = \begin{pmatrix} v_1 & v_2 & v_3 \end{pmatrix}$ has solutions only when it is singular, the determinant $det M = 12 \ne 0$, the result of a non-zero determinant must be fixed as $c_1 = c_2 = c_3 = 0$. Therefore, we can say they are linearly independent.

---

### From Dependent to Independent

Now suppose the vectors $v_1, \dots, v_n$ are linearly dependent and the coefficient $c_1$ is non-zero. Then $\text{span} \{v_1, \dots, v_n\} = \text{span}\{v_2, \dots, v_n\}$, and from $\mathbf{x} \in \text{span}\{v_1, \dots, v_n\}$, we have $v_1 = -\frac{c_2}{c_1}v_2 -\cdots -\frac{c_n}{c_1}v_n$. Substituting this, we can organize it as $\mathbf{x} = a_1 (-\frac{c_2}{c_1}v_2 -\cdots -\frac{c_n}{c_1}v_n) + a_2v_2 + \cdots + a_nv_n = (a_2 - a_1 \frac{c_2}{c_1})v_2 + \cdots + (a_n - a_1 \frac{c_n}{c_1})v_n$.

When writing a vector space as a $\text{span}$, we want the list to be as short as possible. For example, if there exists a vector in a $\text{span}$ such as $S = \text{span}\{1 + t, 1 + t^2, t + t^2, 2 + t + t^2, 1 + t + t^2\}$ that can be expressed as $v_4=v_1+v_2$ through summation, it can be removed. Therefore, the reduced set $S = \text{span}\{1 + t, 1 + t^2, t + t^2\}$ is called a minimal spanning set. And such a set is called a basis for $S$.

---

### References

[Original source #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[Original source #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)
