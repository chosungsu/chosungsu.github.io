---
title: 'Introduce Linear Equations'
date: '2023-03-01'
tags: ['Linear algebra', 'lecture']
---

### Warm up

Systems of linear equations can be written as matrix equations. We focus on Gaussian elimination, an efficient algorithm that maximally simplifies systems of linear equations (or matrix equations).

#### Augmented Matrix

For efficiency, a new notation called augmented matrix is needed and is written as follows.

$$
\begin{cases} x+y=27 \\ 2x-y=0 \end{cases} \\
\downarrow \\
\begin{pmatrix} 1 & 1 & 27 \\ 2 & -1 & 0\end{pmatrix}
$$

This notation is simpler than matrix notation but represents the same thing, and can be written in linear combination notation as follows.

$$
x \begin{pmatrix} 1 \\ 2\end{pmatrix} + y \begin{pmatrix} 1 \\ -1\end{pmatrix} = \begin{pmatrix} 27 \\ 0\end{pmatrix}
$$

The method of replacing systems of equations with rows and solving using arithmetic operations on augmented matrices is called Gaussian elimination.

#### Equivalence

Equivalence means that augmented matrices change through row operations but all have the same solution.

#### RREF, Reduced Row Echelon Form

In a linear system consisting of two linear equations, the goal of Gaussian elimination is to transform the left part of the augmented matrix's dividing line into an identity matrix $(I)$.

$$
I=\begin{pmatrix} 1 & 0 \\ 0 & 1\end{pmatrix}
$$

This helps to simply represent the solution, where the diagonal should be 1 and all off-diagonal entries should be 0. The elimination method that makes this possible is as follows.

$\rightarrow$ Make the leftmost non-zero entry in the first row equal to 1.

$\rightarrow$ Use that entry as a pivot to eliminate everything below it to 0.

$\rightarrow$ Move to the next row and repeat the above method.

$$
\begin{pmatrix}
1 & 0 & 0 & \cdots & b^1 \\
0 & 0 & 1 & \cdots & b^2 \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
0 & 0 & 0 & 0 & b^T
\end{pmatrix}
$$

---

### ERO, Elementary Row Operations

Elementary row operations are systems of linear equations that connect previous rows and new rows in Gaussian elimination.

For example, as follows.

$$
\begin{pmatrix}
0 & 1 & 1 & 7 \\
2 & 0 & 0 & 4 \\
0 & 0 & 1 & 4
\end{pmatrix}
\tilde{ERO}
\begin{pmatrix}
2 & 0 & 0 & 4 \\
0 & 1 & 1 & 7 \\
0 & 0 & 1 & 4
\end{pmatrix}
$$

This is the result of performing elementary row operations with $R_1' = 0R_1 + R_2 + 0R_3$, $R_2' = R_1 + 0R_2 + 0R_3$, $R_3' = 0R_1 + 0R_2 + R_3$.

There are largely three types of matrix transformations in ERO that create identity matrices: row swap where two rows are exchanged, scalar multiplication, and row sum.

---

### Matrices

We utilize matrices to effectively solve linear systems.

$$
A=\begin{bmatrix} 1 & -2 & 1 & 0 \\
0 & 2 & -8 & 8 \\
-4 & 7 & 11 & -5 
\end{bmatrix}
$$

The above matrix is 3 rows by 4 columns, and the element in the $i$-th row and $j$-th column is denoted as $a_{ij}$.

A row vector is a matrix consisting of only one row, and a column vector is a matrix consisting of only one column. Matrices can be used to create augmented matrices.

$$
5x_1-3x_2+8x_3=-1 \\
x_1+4x_2-6x_3=0 \\
2x_2+4x_3=3
$$

The augmented matrix of the above system of linear equations is as follows.

$$
[A|b]=\begin{bmatrix} 5 & -3 & 8 & | -1 \\
1 & 4 & -6 & | 0 \\
0 & 2 & 4 & | 3 
\end{bmatrix}
$$

---

### LU, LDU factorizations

In the elimination process, the first half eliminates entries below the diagonal, leaving upper triangular and lower triangular matrices, and combining them yields LU decomposition.

For example, there is a matrix $M$ as follows

$$
M = \begin{pmatrix} 2 & 0 & -3 & 1 \\ 0 & 1 & 2 & 2 \\ -4 & 0 & 9 & 2 \\ 0 & -1 & 1 & -1\end{pmatrix}
$$

To decompose $M$ into LU, first multiply the upper triangular matrix with each ERO inverse function and express it as follows.

$$
E^{-1}_1 = \begin{pmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ -2 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1\end{pmatrix}, \\
E^{-1}_2 = \begin{pmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & -1 & 0 & 1\end{pmatrix}, \\
E^{-1}_3 = \begin{pmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 1 & 1\end{pmatrix}
$$

Therefore, $M = E^{-1}_1 E^{-1}_2 E^{-1}_3 U$ is calculated as follows.

$$
\begin{aligned}
M &= E^{-1}_1 E^{-1}_2 E^{-1}_3 \begin{pmatrix} 2 & 0 & -3 & 1 \\ 0 & 1 & 2 & 2 \\ 0 & 0 & 3 & 4 \\ 0 & 0 & 0 & -3\end{pmatrix} \\
&= E^{-1}_1 \begin{pmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & -1 & 1 & 1\end{pmatrix} \begin{pmatrix} 2 & 0 & -3 & 1 \\ 0 & 1 & 2 & 2 \\ 0 & 0 & 3 & 4 \\ 0 & 0 & 0 & -3\end{pmatrix} \\
&= \begin{pmatrix} 
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
-2 & 0 & 1 & 0 \\
0 & -1 & 0 & 1
\end{pmatrix}
\begin{pmatrix}
2 & 0 & -3 & 1 \\
0 & 1 & 2 & 2 \\
0 & 0 & 3 & 4 \\
0 & 0 & 0 & -3
\end{pmatrix} \\
&= LU
\end{aligned}
$$

Next, to calculate LDU, post-processing is added to make the diagonal components of U equal to 1 from the LU obtained above, as follows.

$$
\begin{pmatrix}
2 & 0 & -3 & 1 \\
0 & 1 & 2 & 2 \\
0 & 0 & 3 & 4 \\
0 & 0 & 0 & -3
\end{pmatrix} \\
\downarrow \\
\begin{pmatrix}
1 & 0 & -3/2 & 1/2 \\
0 & 1 & 2 & 2 \\
0 & 0 & 1 & 4/3 \\
0 & 0 & 0 & 1
\end{pmatrix}
$$

Therefore, since the inverse functions of each ERO are fractions, expressing them by swapping numerator and denominator positions is as follows.

$$
E^{-1}_4 = \begin{pmatrix} 2 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1\end{pmatrix}, \\
E^{-1}_5 = \begin{pmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 3 & 0 \\ 0 & 0 & 0 & 1\end{pmatrix}, \\
E^{-1}_6 = \begin{pmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & -3\end{pmatrix}
$$

Now LDU decomposition expresses $M$ as $M = (E^{-1}_1 E^{-1}_2 E^{-1}_3)(E^{-1}_4 E^{-1}_5 E^{-1}_6)U$ by calculating the contents inside the parentheses.

---

### Systems of Linear equations

In reduced row echelon form, variables corresponding to columns that do not contain pivots are free variables. Therefore, the number of these determines the geometric form of the solution set (point, line, plane).

For example, when $\begin{pmatrix} 1 & 0 & 1 & -1 \\ 0 & 1 & -1 & 1 \\ 0 & 0 & 0 & 0\end{pmatrix} \begin{pmatrix} x_1 \\ x_2 \\ x_3 \\ x_4\end{pmatrix} = \begin{pmatrix} 1 \\ 1 \\ 0\end{pmatrix}$ exists, the pivot variables are $x_1, x_2$, so non-pivot variables are added with empty equations as follows.

$$
\begin{pmatrix} x_1 \\ x_2 \\ x_3 \\ x_4 \end{pmatrix} = \begin{pmatrix} 1 \\ 1 \\ 0 \\ 0 \end{pmatrix} + x_3 \begin{pmatrix} -1 \\ 1 \\ 1 \\ 0 \end{pmatrix} + x_4 \begin{pmatrix} 1 \\ -1 \\ 0 \\ 1 \end{pmatrix}
$$

Here, the first term is an example of a particular solution, and the coefficients of the second and third terms are called homogeneous solutions. Therefore, the solution set becomes a 2-dimensional plane.

---

### References

[Original source #1](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)

[Original source #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)