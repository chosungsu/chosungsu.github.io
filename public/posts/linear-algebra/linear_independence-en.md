---
title: 'Linear independence'
date: '2023-03-06'
tags: ['Linear algebra', 'lecture']
---

### Warm up

We defined the span of a set of vectors ${v_1, v_2, \dots, v_n}$ as the collection of all possible linear combinations.

$$
t_1v_1+t_2v_2+ \cdots + t_nv_n
$$

We denote this set by $\text{span}\{v_1, v_2, \dots, v_n\}$. The question is whether there are multiple ways to express $x$ as a linear combination of the vectors.

For example, when $v_1 = (1,2), v_2=(0,1), v_3=(-1,-1), x=(3,-1)$, if $x \in \text{span}\{v_1, v_2, v_3\}$, then $x$ can be expressed in multiple ways such as $x=3v_1-7v_2+0v_3$ and $x=-4v_1+0v_2-7v_3$. This fact suggests that the set ${v_1, v_2, v_3}$ may have redundancy.

That is, when some vector can be expressed as a linear combination of other vectors, the set is linearly dependent; otherwise, it is linearly independent.

---

### Linear independence

$$
t_1v_1+t_2v_2+ \cdots + t_nv_n=0
$$

A set of vectors ${v_1, v_2, \dots, v_n}$ is linearly independent if and only if the zero vector (0) can be expressed as a linear combination of ${v_1, v_2, \dots, v_n}$ in exactly one way. In this case, all coefficients must be zero. Also, the trivial solution is the only solution: $x_1=x_2= \cdots =x_n=0$.

Conversely, if ${v_1, v_2, \dots, v_n}$ is linearly dependent, then there exist scalars $x_1, x_2, \cdots, x_n$ not all zero, such that if we assume $x_n \ne 0$, then $v_n$ can be expressed in terms of the vectors $v_1, \dots, v_{n-1}$ as follows:

$$
v_n=-\frac{x_1}{x_n}v_1-\frac{x_2}{x_n}v_2 - \cdots -\frac{x_{n-1}}{x_n}v_{n-1}
$$

The homogeneous system $Ax=0$ has only the trivial solution when there are no free parameters, and it is linearly independent when there is only the trivial solution.

---

### Maximum size of linearly independent set

For a set of vectors ${v_1, v_2, \dots, v_p}$ in $\mathbb{R}^n$, if $p > n$, then these vectors are linearly dependent. If $A = \begin{bmatrix} v_1 & v_2 & \dots & v_p \end{bmatrix}$, then it is an $n \times p$ matrix with rank $n$. The number of free parameters $d=p-r$ is always positive. This means the homogeneous system has nontrivial solutions.

This is related to the concept of dimension: sets of vectors with size larger than the dimension $n$ are automatically linearly dependent.

$$
v_1=\begin{bmatrix}
8 // 3 // 0 // -2
\end{bmatrix}, \\
v_2=\begin{bmatrix}
4 // 11 // -4 //6
\end{bmatrix}, \\
v_3=\begin{bmatrix}
2 // 0 // 1 // 1
\end{bmatrix}, \\
v_4=\begin{bmatrix}
3 // -9 // -5 // 3
\end{bmatrix}, \\
v_5=\begin{bmatrix}
0 // -2 // -7 // 7
\end{bmatrix}
$$

Therefore, for example, in $\mathbb{R}^4$ dimension, we can immediately say that the set of vectors ${v_1, \dots, v_5}$ is linearly dependent without calculation.

---

### Solving linear system

A set of vectors ${v_1, v_2, \dots, v_n}$ is linearly independent if and only if the rank $r$ of matrix $A$ equals $n$. That is, when converted to REF or RREF, the number of leading entries is exactly $n$.

$$
v_1=\begin{bmatrix}
0 \\ 1 \\ 5
\end{bmatrix}
, v_2=\begin{bmatrix}
1 \\ 2 \\ 8
\end{bmatrix}
, v_3=\begin{bmatrix}
4 \\ -1 \\ 0
\end{bmatrix}
$$

For example, given the vectors above, performing elementary row operations yields:

$$
A=\begin{bmatrix}
1 & 2 & -1 \\
0 & 1 & 4 \\
0 & 0 & 13
\end{bmatrix}
$$

The rank of matrix $A$ is $r=3$, which equals the number of vectors $n=3$. Therefore, the set is linearly independent.

---

### References

[Original Source #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[Original Source #2](https://www.boostcourse.org/ai151/joinLectures/194162)

[Original Source #3](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)