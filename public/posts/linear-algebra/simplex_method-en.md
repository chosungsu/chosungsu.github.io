---
title: 'Simplex method'
date: '2023-03-01'
tags: ['Linear algebra', 'lecture']
---

### Warm up

For example, let's say we have established meal rules for children to eat at least 7 oranges and 5 apples per week. We also require children to eat at least 15 fruits per week and limit them not to exceed 25 fruits. At this time, since oranges have twice as much sugar as apples and apples correspond to 5 grams, the linear programming problem to find how many oranges and apples children will eat will be composed of inequalities.

Let's write the mathematical expressions for the above problem.

$$
\begin{aligned}
& x \ge 5, \\
& y \ge 7, \\
& x + y \ge 15, \\
& x + y \le 25, \\
& s = 5x + 10y
\end{aligned}
$$

---

### Graphical solutions

Among the presented mathematical expressions, the above 4 are called constraints, and the variable values that satisfy these conditions constitute a feasible region.

<img src="https://velog.velcdn.com/images/devjo/post/5ca6b525-c568-4396-9c6b-aa8208a60e24/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

When drawn on a plane as a graph, it looks like this. Since the sugar in oranges $(y)$ should be minimized, $y=7$ should be satisfied, and for the minimum amount of fruit, the solution should be on the line $x+y=15$, so we can see that it is $(8,7)$. Like this, the optimal answer is almost always at a vertex.

---

### Dantzig's Algorithm (Simplex Method)

Simple constraints can be visualized with graphs, but most cases will have millions of variables and constraints, so they must be expressed using the simplex method.

For example, when the objective function we want to find is $f = 3x-3y-z+4w$ and the constraints are $c_1 : x+y+z+w=5, c_2 : x+2y+z+2w=6, \{x, y, z, w\} \ge 0$, we transform the objective function into an equation that makes the right-hand side 0 and arrange it as an augmented matrix.

$$
\begin{pmatrix}
1 & 1 & 1 & 1 & 0 & 5 \\
1 & 2 & 3 & 2 & 0 & 6 \\
-3 & 3 & 1 & -4 & 1 & 0
\end{pmatrix}
$$

We use pivot operations, finding the largest negative number in the last row and considering it as the pivot variable to eliminate. And the other row values in the pivot column must be made 0.

$$
\begin{pmatrix}
1 & 1 & 1 & 1 & 0 & 5 \\
1 & 2 & 3 & 2 & 0 & 6 \\
-1 & 7 & 7 & 0 & 1 & 12
\end{pmatrix} \\
\downarrow \\
\begin{pmatrix}
1/2 & 0 & -1/2 & 0 & 0 & 2 \\
1 & 2 & 3 & 2 & 0 & 6 \\
-1 & 7 & 7 & 0 & 1 & 12
\end{pmatrix}
$$

Next, we consider the first column of the last row as the pivot variable and eliminate.

$$
\begin{pmatrix}
1/2 & 0 & -1/2 & 0 & 0 & 2 \\
1 & 2 & 3 & 2 & 0 & 6 \\
0 & 7 & 6 & 0 & 1 & 16
\end{pmatrix}
$$

In this way, the Dantzig algorithm terminates when the objective function becomes positive. Now the objective function has been transformed to $f=16-7y-6z$, and it has a maximum value of 16 when $y=z=0$. At this time, we can see that $x=4$ from the first row and $w=1$ from the second row. Therefore, the optimal solution is $(x,y,z,w)=(4,0,0,1)$.

---

### References

[Original source #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[Original source #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)