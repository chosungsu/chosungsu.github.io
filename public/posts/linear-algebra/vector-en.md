---
title: 'Vector'
date: '2023-03-03'
tags: ['Linear algebra', 'lecture']
---

### n space

Among the physical quantities we use in everyday life, there are scalars that can be expressed by knowing only their magnitude, and vectors that cannot be expressed without knowing their direction. Among these, vectors must have both magnitude and direction specified, so they can be represented as directed line segments through arrows.

A vector with the same starting and ending points is called a zero vector, and since this vector has magnitude 0, its direction can be arbitrary.

Two real numbers $x_1, x_2$ are called the components of the vector, and the vector space can be represented as $x=\begin{bmatrix}x_1\\x_2 \end{bmatrix}$.

When $v_1, v_2, … ,v_n$ are vectors in the set of all real numbers $R$ and $c_1, c_2, …, c_n$ are real coefficients, the form $x=c_1x_1 + c_2x_2, …, c_nx_n$ is called a linear combination.

---

### dot product and orthogonal

$\begin{vmatrix}x \end{vmatrix}$=$\sqrt{x_1^2+x_2^2,…,x_n^2}$ is called the norm of $x$. Through this definition, $x$ means the distance from the origin to point $P$.

The Cauchy-Schwarz inequality is the case where the following formula holds for arbitrary vectors x, y in the set of all real numbers: $\begin{Vmatrix} x*y \end{Vmatrix}\leq\begin{Vmatrix} x \end{Vmatrix} \begin{Vmatrix} y \end{Vmatrix}$. Note that equality is possible only when one of $x, y$ is a real multiple of the other.

Also, solving the angle formula mathematically gives $x*y=\begin{Vmatrix} x \end{Vmatrix} \begin{Vmatrix} y \end{Vmatrix} cos\theta$.

Applying the norm formula mentioned above, a vector with norm 1, i.e., when $\begin{Vmatrix} x \end{Vmatrix} = 1$, is called a unit vector. Also, when two vectors are perpendicular to each other, they are said to be orthogonal, and when they are both orthogonal and each is a unit vector, they are called orthonormal.

When expressed as $u=\frac{1}{\begin{Vmatrix} x \end{Vmatrix}} * x$, this becomes a unit vector with magnitude 1, called a standard unit vector.

---

### vector equation

When there is a direction vector (slope) and a point, for $v(a,b,c), P(x_0, y_0, z_0)$, the following equations hold:

- Vector equation: $(x, y, z) = p_0+tv = (x_0, y_0, z_0) + t(a, b, c)$
- Parametric equation: $x=x_0 + ta, y=y_0 + tb, z=z_0 + tc$
- Symmetric equation: $\frac{x-x_0}{a}=\frac{y-y_0}{b}=\frac{z-z_0}{c}$ ($a,b,c\neq 0$)

When there is a normal vector and a point, for $n(a,b,c), P(x_0, y_0, z_0)$, the following equation holds:

- $n * P_0P = (a, b, c) * (x - x_0, y - y_0, z - z_0) = 0$
- $ax+by+cz = d$

When the foot of the perpendicular from point $P$ to vector $x=OQ$ is $S$, $p=OS$ is called the projection of $y=OP$ onto $x$ and is denoted by $proj_xy$.

<img src="https://velog.velcdn.com/images/devjo/post/d2c68274-0834-4e19-bc80-add8f34a479e/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

As shown in the image above, since p is parallel to x, we can write $p = tx$, and since $y-p$ is orthogonal to x, it can be expressed as $x * (y-p) = 0$. That is, it is proven that $t = \frac{y*x}{\begin{Vmatrix} x \end{Vmatrix}^2}$.

---

### References

[Original source #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)