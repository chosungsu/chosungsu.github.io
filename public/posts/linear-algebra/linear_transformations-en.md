---
title: 'Linear Transformations'
date: '2023-03-03'
tags: ['Linear algebra', 'lecture']
---

### Warm up

When $V,W$ are vector spaces, a function satisfying $L(ru+sv) = rL(u) + sL(v)$ is called linear.

---

### The consequence of linearity

If the function $L$ is linear and $L \begin{pmatrix} 1 \\ 0\end{pmatrix} = \begin{pmatrix} 5 \\ 3\end{pmatrix}$, then information about $L \begin{pmatrix} 2 \\ 0\end{pmatrix} L \begin{pmatrix} 3 \\ 0\end{pmatrix} \dots$ is not needed. This is because, by homogeneity, $L \begin{pmatrix} 5 \\ 0\end{pmatrix} = L (5\begin{pmatrix} 1 \\ 0\end{pmatrix}) = 5 \begin{pmatrix} 5 \\ 3\end{pmatrix}$ can be calculated.

Also, once the outputs of all $n$-vectors are specified in $R^n$ dimensions, no further information is needed.

---

### Linear functions on Hyperplanes

It is not easy to write linear operators as matrices, and expressing a linear function whose domain is a hyperplane is possible as follows.

$$
V = \{c_1 \begin{pmatrix} 1 \\ 1 \\ 0\end{pmatrix} + c_2 \begin{pmatrix} 0 \\ 1 \\ 1\end{pmatrix} \}
$$

If there is a linear function following $L : V \rightarrow R^3$

$$
L \begin{pmatrix} 1 \\ 1 \\ 0\end{pmatrix} = \begin{pmatrix} 0 \\ 1 \\ 0\end{pmatrix}, \\
L \begin{pmatrix} 0 \\ 1 \\ 1\end{pmatrix} = \begin{pmatrix} 0 \\ 1 \\ 0\end{pmatrix}, \\
L [c_1\begin{pmatrix} 1 \\ 1 \\ 0\end{pmatrix} + c_2 \begin{pmatrix} 0 \\ 1 \\ 1\end{pmatrix}] = (c_1 + c_2)\begin{pmatrix} 0 \\ 1 \\ 0\end{pmatrix}
$$

In this way, specification becomes possible, and the domain of $L$ is a plane while its range is a line passing through the origin in the $x_2$ direction.

---

### Linear differential operators

For example, defining the quadratic polynomial space with standard addition and scalar multiplication as follows

$$
V = \{a_0 \cdot 1 + a_1x + a_2x^2\}
$$

Let $\frac{d}{dx} : V \to V$ be called a differential operator. Then the following three equations show that differentiation is possible along with the linearity of the differential operator.

$$
\frac{d}{dx} 1 = 0, \frac{d}{dx} x = 1, \frac{d}{dx}x^2 = 2x \\
\Rightarrow \frac{d}{dx}(a_0 \cdot 1 + a_1 x + a_2 x^2) = 0 + a_1 + 2a_2x
$$

---

### Bases

There is much freedom in exploiting the hidden simplicity in linear algebra. For example, the linear operator $L$ below can be completely specified in $R^2$ dimensions by two equations.

$$
L\begin{pmatrix} 1 \\ 1\end{pmatrix} = \begin{pmatrix} 2 \\ 4\end{pmatrix}, L\begin{pmatrix} 1 \\ -1\end{pmatrix} = \begin{pmatrix} 6 \\ 8\end{pmatrix}
$$

This is because any vector $\begin{pmatrix} x \\ y \end{pmatrix}$ can be expressed as a sum of multiples of $\begin{pmatrix} 1 \\ 1 \end{pmatrix}$ and $\begin{pmatrix} 1 \\ -1 \end{pmatrix}$, which can be calculated as a system of linear equations as follows.

$$
\begin{pmatrix} x \\ y \end{pmatrix} = a \begin{pmatrix} 1 \\ 1 \end{pmatrix} + b \begin{pmatrix} 1 \\ -1 \end{pmatrix} \\
\Rightarrow \begin{pmatrix} 1 & 1 & x \\ 1 & -1 & y \end{pmatrix} \\
\sim \begin{pmatrix} 1 & 0 & \frac{x+y}{2} \\ 0 & 1 & \frac{x-y}{2} \end{pmatrix}
$$

Therefore, by applying linearity, we can calculate for any vector. $L\begin{pmatrix} x \\ y\end{pmatrix} = \begin{pmatrix} x+y \\ 2(x+y)\end{pmatrix} + \begin{pmatrix} 3(x-y) \\ 4(x-y)\end{pmatrix} = \begin{pmatrix} 4x-2y \\ 6x-2y\end{pmatrix}$ shows that specification is possible with just two inputs.

Dimension refers to the number of independent directions available. If there is a vector not lying in a plane determined by two directions, we select one of them as the next direction. The minimal set of such independent vectors is called a basis, and the number of vectors in the basis is the dimension of the vector space. While every vector space has many bases, all bases have the same number of vectors.

---

### References

[Original source #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[Original source #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)