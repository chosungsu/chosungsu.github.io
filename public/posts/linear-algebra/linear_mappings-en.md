---
title: 'Linear mappings'
date: '2023-03-08'
tags: ['Linear algebra', 'lecture']
---

### Warm up

A vector mapping simply means a function $T:\mathbb{R}^n \rightarrow \mathbb{R}^m$. The domain is $\mathbb{R}^n$ and the codomain is $\mathbb{R}^m$. Of course, cases with $n=m$ are also possible. Saying that a vector $b \in \mathbb{R}^m$ lies in the range (image) of $T$ means there exists $x \in \mathbb{R}^n$ such that $T(x)=b$. Note that the range of $T$ is not always equal to its codomain.

---

### Linear mappings

A mapping is called linear if the following two conditions hold:

1. For any $u,v \in \mathbb{R}^n$, $T(u+v) = T(u) + T(v)$.

2. For any $u \in \mathbb{R}^n$ and any scalar $c$, $T(cu) = c\,T(u)$.

If these are not satisfied, the mapping is nonlinear. Consider the following mapping as an example:

$$
T(x)= \begin{bmatrix} x_1^2 \\ \sin(x_2)-\cos(x_1^2-1) \\ x_1^1+x_2^2+1 \end{bmatrix}
$$

Here, $T\begin{bmatrix} 1 \\ 0 \end{bmatrix}=\begin{bmatrix} -1 \\ 2 \end{bmatrix}$. By the linearity property, it should follow that
$T\begin{bmatrix} 3 \\ 0 \end{bmatrix}=3\,T\begin{bmatrix} 1 \\ 0 \end{bmatrix}=3\,\begin{bmatrix} -1 \\ 2 \end{bmatrix}=\begin{bmatrix} -3 \\ 6 \end{bmatrix}$,
but in fact $T\begin{bmatrix} 3 \\ 0 \end{bmatrix}=\begin{bmatrix} -\cos(8) \\ 10 \end{bmatrix}$, which is different. Hence this mapping is not linear.

---

### Matrix mappings

Given an $m\times n$ matrix $A$ and an $n$-dimensional vector $x$, the output vector $Ax$ can be interpreted as a mapping. The conditions for this mapping are the same as those for linear mappings.

$$
T\begin{pmatrix} x_1 \\ x_2 \end{pmatrix}=\begin{bmatrix} 2x_1-x_2 \\ x_1+x_2 \\ -x_1-3x_2 \end{bmatrix}
$$

For the mapping above, since $T\begin{bmatrix} 1 \\ 0 \end{bmatrix}=\begin{bmatrix} 2 \\ 1 \\ -1 \end{bmatrix}$, we should have
$T\begin{bmatrix} 3 \\ 0 \end{bmatrix}=3\,T\begin{bmatrix} 1 \\ 0 \end{bmatrix}=3\,\begin{bmatrix} 2 \\ 1 \\ -1 \end{bmatrix}=\begin{bmatrix} 6 \\ 3 \\ -3 \end{bmatrix}$,
which indeed holds, so this mapping satisfies linearity.

We can also rewrite this mapping as a matrix mapping as follows:

$$
\begin{bmatrix} 2 & -1 \\ 1 & 1 \\ -1 & -3 \end{bmatrix} \begin{pmatrix} x_1 \\ x_2 \end{pmatrix}
$$

For a matrix mapping $T_A : \mathbb{R}^n \rightarrow \mathbb{R}^m$, the output vector $Ax$ is a linear combination of the columns of $A$ with coefficients given by $x$. Therefore, the range of a matrix mapping is $\operatorname{span}\{v_1, v_2, \cdots, v_n\}$, where $v_i$ are the columns of $A$.

---

### References

[Original Source #1](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)