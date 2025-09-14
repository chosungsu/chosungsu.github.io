---
title: 'Introduce Linear Equations'
date: '2023-03-01'
tags: ['Linear algebra', 'lecture']
---

### Warm up

We introduce systems of linear equations and row reduction as a method to solve them. We also introduce matrices as a structure to conveniently represent and solve linear systems. Finally, we discuss geometric interpretations of the solution set in 2D and 3D.

---

### Linear equations

$$
a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n = b_1 \\
a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n = b_2 \\
\vdots \\
a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n = b_m
$$

In a linear system, we call $a_{ij}$ the coefficients. There are $m$ equations and $n$ unknowns, so there are a total of $m\times n$ coefficients. We seek a solution such that when we substitute a list of numbers $(s_1, s_2, \dots, s_n)$ for the unknowns $(x_1, x_2, \dots, x_n)$, the left-hand side of each $i$-th equation equals $b_i$.

Therefore, the set of all solutions of a linear system is called the solution set.

$$
2x_1+2x_2+x_3=2 \\
x_1+3x_2-x_3=11
$$

For example, to check whether $(1, 2, -4)$ is a solution of the system above, substitute each value for $x_i$ and verify that the equations are satisfied. A system with at least one solution is called consistent.

---

### Matrices

We use matrices to solve linear systems efficiently.

$$
A=\begin{bmatrix} 1 & -2 & 1 & 0 \\
0 & 2 & -8 & 8 \\
-4 & 7 & 11 & -5 
\end{bmatrix}
$$

The matrix above has 3 rows and 4 columns, and we denote the entry in row $i$, column $j$ by $a_{ij}$.

A row vector is a matrix with a single row, and a column vector is a matrix with a single column. Using matrices, we can form the augmented matrix.

$$
5x_1-3x_2+8x_3=-1 \\
x_1+4x_2-6x_3=0 \\
2x_2+4x_3=3
$$

The augmented matrix of the linear system above is as follows.

$$
[A|b]=\begin{bmatrix} 5 & -3 & 8 & | -1 \\
1 & 4 & -6 & | 0 \\
0 & 2 & 4 & | 3 
\end{bmatrix}
$$

---

### Solving linear system

There are three operations called elementary operations.

1. Swap two equations.

2. Multiply an equation by a nonzero constant.

3. Add a multiple of one equation to another.

The process of simplifying using these operations is called row reduction. The goal of row reduction is to transform the original linear system into a triangular structure and then perform back substitution to obtain the solution.

$$
[A|b]=\begin{bmatrix} 1 & 0 & -2 & | -4 \\
0 & 1 & -1 & | 0 \\
0 & 0 & 1 & | 1 
\end{bmatrix}
$$

The augmented matrix above has a triangular structure. From the third row, we get $x_3=1$; from the second row, $x_2-x_3=0 \Rightarrow x_2=x_3=1$; and from the first row, $x_1-2x_3=-4 \Rightarrow x_1=-2$.

---

### References

[Original Source #1](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)