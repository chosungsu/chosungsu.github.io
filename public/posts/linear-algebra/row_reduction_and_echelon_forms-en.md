---
title: 'Row reduction and Echelon forms'
date: '2023-03-01'
tags: ['Linear algebra', 'lecture']
---

### Warm up

In this lecture, we will practice row reduction further and, along the way, introduce two important matrix forms. We will also discuss whether a linear system has a unique solution, infinitely many solutions, or no solution at all. Finally, we will introduce a useful parameter of a matrix called its rank.

---

### Row echelon form (REF)

$$
x_1+5x_2-2x_4-x_5+7x_6=-4 \\
2x_2-2x_3+3x_6=0 \\
-9x_4-x_5+x_6=-1 \\
5x_5+x_6=5 \\
0=0
$$

We can rewrite the linear system above as the following augmented matrix:

$$
[A|b]=\begin{bmatrix} 1 & 5 & 0 & -2 & -1 & 7 & | -4 \\
0 & 2 & -2 & 0 & 0 & 3 & | 0 \\
0 & 0 & 0 & -9 & -1 & 1 & | -1 \\
0 & 0 & 0 & 0 & 5 & 1 & | 5 \\
0 & 0 & 0 & 0 & 0 & 0 & | 0
\end{bmatrix}
$$

The augmented matrix above has the following two properties:

1. All zero rows are below the nonzero rows.

2. In each row, the leftmost nonzero entry lies to the right of the leftmost nonzero entry of the row above it.

These properties define row echelon form (REF). The leftmost nonzero entry of a row is called the leading entry.

---

### Reduced row echelon form (RREF)

$$
[A|b]=\begin{bmatrix} 1 & 6 & 0 & 3 & 0 & | 0 \\
0 & 0 & 1 & -4 & 0 & | 5 \\
0 & 0 & 0 & 0 & 1 & | 7
\end{bmatrix}
$$

For a matrix to be in reduced row echelon form, in addition to satisfying the REF properties it must also satisfy:

1. The leading entry in every nonzero row is 1.

2. Each column containing a leading 1 has zeros in every other position (both above and below that 1).

---

### Rank

In general, if a linear system has $n$ unknowns and the row-reduced augmented matrix has $r$ leading entries, then the solution has $d=n-r$ free parameters. Because $r$ plays a central role in determining the number of free parameters, we call it the rank and write $\operatorname{rank}(A)$.

---

### Solving linear system

$$
2x_1+4x_2+6x_3=8 \\
x_1+2x_2+4x_3=8 \\
3x_1+6x_2+9x_3=12
$$

For this linear system, the augmented matrix is as follows:

$$
[A|b]=\begin{bmatrix} 2 & 4 & 6 & | 8 \\
1 & 2 & 4 & | 8 \\
3 & 6 & 9 & | 12
\end{bmatrix}
$$

Beginning row reduction, first apply $\tfrac{1}{2}R_1$, then perform $-R_1+R_2$ and $-3R_1+R_3$ to obtain:

$$
[A|b]=\begin{bmatrix} 1 & 2 & 3 & | 4 \\
0 & 0 & 1 & | 4 \\
0 & 0 & 0 & | 0
\end{bmatrix}
$$

This linear system is consistent because it has at least one solution. There are two nonzero rows and three variables, so the solution set has $3-2=1$ free parameter. From the reduced matrix we get $x_3=4$ and $x_1+2x_2=-8$. Choose one of $x_1$ or $x_2$ as a parameter $t$; fixing $x_2=t$ yields $x_1=-8-2t$.

---

### References

[Original Source #1](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)