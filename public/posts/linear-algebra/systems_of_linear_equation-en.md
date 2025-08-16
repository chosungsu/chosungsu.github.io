---
title: 'Systems of linear equation'
date: '2023-03-06'
tags: ['Linear algebra', 'lecture']
---

### Linear combination

When $v_1, v_2, \cdots, v_n \in R$, multiplying each vector by a set of constants $\{C_k\}$ is called a linear combination. The zero vector is also a linear combination.

We can express this using span notation, such as span($\vec{a}, \vec{b}$)=$R^2$.

As an example of solving a linear combination, let's say we have $\vec{a} = \begin{bmatrix} 1 \\ 2 \end{bmatrix}$, $\vec{b} = \begin{bmatrix} 0 \\ 3 \end{bmatrix}$ and $\vec{x} = \begin{bmatrix} x_1 \\ x_2 \end{bmatrix}$. There will be a set of constants that satisfies this, which can be written as a system of equations: $1c_1+0c_2=x_1$, $2c_1+3c_2=x_2$. From this, we can find that $c_1=x_1$ and $c_2=\frac{1}{3}(x_2-2x_1)$.

---

### Linear independence

For example, when we have $\{\begin{bmatrix} 2 \\ 3 \end{bmatrix}, \begin{bmatrix} 4 \\ 6 \end{bmatrix}\}$, we can multiply by constants and simplify through substitution as $c_1\begin{bmatrix} 2 \\ 3 \end{bmatrix} + c_2\begin{bmatrix} 4 \\ 6 \end{bmatrix}=(c_1+2c_2)\begin{bmatrix} 2 \\ 3 \end{bmatrix}=c_3\begin{bmatrix} 2 \\ 3 \end{bmatrix}$. When a linear combination can be reduced to a single vector like this, we call it linearly dependent.

Another example of linear dependence is $\{\begin{bmatrix} 2 \\ 3 \end{bmatrix}, \begin{bmatrix} 7 \\ 2 \end{bmatrix}, \begin{bmatrix} 9 \\ 5 \end{bmatrix}\}$, where the sum of two vectors equals another vector.

Therefore, vectors that exist in the same plane are linearly dependent, while those that don't are linearly independent.

---

### Systems of Linear Equations

A linear equation is an equation consisting of first-degree expressions formed by coefficients multiplied by unknowns $x_1, x_2, …, x_n$ and constant terms. If all constant terms in a system of equations are zero, it is called a homogeneous system of linear equations.

A matrix is an arrangement of real or complex numbers in a rectangular shape with rows and columns.

$$
\begin{bmatrix}
a_{11} &\cdots & a_{1n}\\\vdots &\ddots &\vdots\\
a_{m1} &\cdots & a_{mn}
\end{bmatrix}
$$

The element $a_{ij}$ in the i-th row and j-th column of matrix A is called the $(i, j)$ element of A, and elements like $a_{11}, a_{22}$ are called the main diagonal elements. A system of m linear equations with n unknowns can be written simply as $Ax=b$, where matrix A is called the coefficient matrix, and the matrix formed by appending b to A is called the augmented matrix.

---

### Gauss Elimination and Gauss-Jordan Elimination

The operations of elimination method are as follows:

1.Exchange two equations.

2.Multiply one equation by a non-zero real number.

3.Add a non-zero real multiple of one equation to another equation.

These operations are called Elementary Row Operations (ERO).

If matrix $B$ is obtained by performing elementary row operations on matrix $A$, then $A$ and $B$ are said to be row equivalent.

An $m*n$ matrix $E$ is said to be in row echelon form (REF) when it satisfies the following three properties:

1.If there are rows where all elements are zero, those rows are located at the bottom of the matrix.

2.The first non-zero element in each row is 1. This 1 is called the leading element of that row.

3.If both the i-th row and (i+1)-th row have leading elements, the leading element of the (i+1)-th row is located to the right of the leading element of the i-th row.

And if matrix $E$ also satisfies the following fourth property, it is called reduced row echelon form (RREF):

1.All elements in columns containing leading elements, except the leading elements themselves, are zero.

<img src="https://velog.velcdn.com/images/devjo/post/ebf9bab2-8e54-4f5c-a1d5-ee1f31192bc7/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

Free variables are variables corresponding to columns in the RREF of the augmented matrix that do not contain leading elements 1, and leading variables are variables corresponding to columns that contain leading elements 1.

A homogeneous system of equations has $x=0$ as a trivial solution. Therefore, this equation only has two cases: having only the trivial solution or having infinitely many solutions.

---

### References

[Original Source #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[Original Source #2](https://www.boostcourse.org/ai151/joinLectures/194162)