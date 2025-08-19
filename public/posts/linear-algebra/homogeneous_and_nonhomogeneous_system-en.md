---
title: 'Homogeneous and Nonhomogeneous system'
date: '2023-03-06'
tags: ['Linear algebra', 'lecture']
---

### Warm up

The homogeneous system $Ax=0$ always has at least one solution, namely the zero solution $x=0$. This is because $A\cdot 0=0$. Therefore, homogeneous systems are always consistent. The zero solution $x=0$ is called the trivial solution, and any nonzero solution is called a nontrivial solution.

A consistent linear system has either exactly one solution or infinitely many solutions. Therefore, a homogeneous linear system has nontrivial solutions only when its solution set has at least one parameter.

The number of parameters in the solution set is given by $d=n-r$, where $r$ is the rank of the coefficient matrix $A$ and $n$ is the number of unknowns.

---

### Nonhomogeneous system

The homogeneous system $Ax=0$ is always consistent. However, when $b\neq 0$, the nonhomogeneous linear system $Ax=b$ may or may not have solutions.

Suppose that a particular solution $p$ satisfies the nonhomogeneous system $Ax=b$, that is, $Ap=b$. And suppose that $v$ satisfies the homogeneous system $Ax=0$, that is, $Av=0$. Now let $q=p+v$.

$$
Aq=A(p+v)=Ap+Av=b+0=b
$$

In other words, $q$ is also a solution of the nonhomogeneous linear system. Similarly, $q=p-v$ is also a solution.

$$
\begin{bmatrix}
3 & -3 & 6 & | 3 \\
-1 & 1 & -2 & | -1 \\
2 & -2 & 4 & | 2
\end{bmatrix}
\rightarrow
\begin{bmatrix}
1 & -1 & 2 & | 1 \\
0 & 0 & 0 & | 0 \\
0 & 0 & 0 & | 0
\end{bmatrix}
$$

For example, given the augmented matrix above, if we find the RREF we get $n=3, r=1, d=2$. Setting $x_2=t_1$ and $x_3=t_2$ gives $x_1=1+t_2-2t_1$, and the general solution in parametric form is as follows:

$$
x=\begin{bmatrix} 1 \\ 0 \\ 0\end{bmatrix} + t_1*\begin{bmatrix} -2 \\ 0 \\ 1\end{bmatrix} + t_2*\begin{bmatrix} 1 \\ 1 \\ 0\end{bmatrix}
$$

---

### Solving linear system

$$
3x_1+x_2-9x_3=0 \\
x_1+x_2-5x_3=0 \\
2x_1+x_2-7x_3=0
$$

To determine whether the homogeneous linear system above has nontrivial solutions, we check if there is at least one free parameter. First, we convert it to an augmented matrix as follows:

$$
\begin{bmatrix}
3 & 1 & -9 & | 0 \\
1 & 1 & -5 & | 0 \\
2 & 1 & -7 & | 0
\end{bmatrix}
$$

Then, to convert this to REF or RREF, we perform row reduction: $-2R_2+R_3$, $-3R_2+R_1$, $-R_3+R_1$ to obtain the following result:

$$
\begin{bmatrix}
3 & 1 & -9 & | 0 \\
1 & 1 & -5 & | 0 \\
2 & 1 & -7 & | 0
\end{bmatrix}
\rightarrow
\begin{bmatrix}
1 & 1 & -5 & | 0 \\
0 & -1 & 3 & | 0 \\
0 & 0 & 0 & | 0
\end{bmatrix}
$$

Therefore, this system is consistent and the rank of the coefficient matrix is $r=2$, so the solution set has $d=3-2=1$ free parameter. Substituting the parameter gives $x_3=t$, $x_2=3x_3=3t$, and $x_1=2t$, which in vector notation is expressed as $x=\begin{bmatrix} 2 \\ 3 \\ 1 \end{bmatrix}t$. Also, the solution set can be viewed as the span of the vector $v$.

---

### References

[Original Source #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[Original Source #2](https://www.boostcourse.org/ai151/joinLectures/194162)

[Original Source #3](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)