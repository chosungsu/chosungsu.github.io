---
title: 'Vector'
date: '2023-03-03'
tags: ['Linear algebra', 'lecture']
---

### Warm up

<img src="https://velog.velcdn.com/images/devjo/post/6853698c-9d01-4930-9730-b186e84aebff/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

A vector represents both magnitude and direction simultaneously. For example, to distinguish between what can and cannot be a vector, the information "moving at 5 miles per hour" cannot be a vector. This is because we cannot know in which direction the object is moving. However, this information can be a scalar.

The way such information can become a vector is through positional information, that is, if there is information "moving east at 5 miles per hour," this can be a vector.

---

### N space

A vector with the same starting and ending points is called a zero vector, and since this vector has magnitude 0, its direction can be arbitrary.

Two real numbers $x_1, x_2$ are called the components of the vector, and the vector space can be represented as $x=\begin{bmatrix}x_1\\x_2 \end{bmatrix}$.

In the set of all real numbers $R$, when vectors $v_1, v_2, … ,v_n$ and coefficients $c_1, c_2, …, c_n$ are real numbers, the form $x=c_1x_1 + c_2x_2, …, c_nx_n$ is called a linear combination.

---

### Sum of vector

When $\vec{a}=\begin{bmatrix} 6 \\ -2 \end{bmatrix}$ and $\vec{b}=\begin{bmatrix} -4 \\ 4 \end{bmatrix}$, addition is possible as $\vec{a} + \vec{b} = \begin{bmatrix} 2 \\ 2 \end{bmatrix}$. In n-dimensional space, $\vec{a}$ and $\vec{b}$ can be drawn as vectors with the same magnitude but different starting and ending points. Ultimately, what matters is that magnitude and direction remain unchanged.

---

### Product of vector

When $\vec{a}=\begin{bmatrix} 2 \\ 1 \end{bmatrix}$ exists, multiplying $\vec{a}$ by 3 results in $3*\begin{bmatrix} 2 \\ 1 \end{bmatrix}=\begin{bmatrix} 6 \\ 3 \end{bmatrix}$. Through this process, the vector's direction does not change, but instead its scale changes. However, if multiplied by a negative number, the direction also changes.

---

### Unit vector

A unit vector can be represented as $i = \begin{bmatrix} 1 \\ 0 \end{bmatrix}$, which is the case when the vertical direction is not considered. Conversely, when the horizontal direction is not considered, it can be expressed as $j = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$.

Through this, we can see that for $\vec{v} = \begin{bmatrix} 2 \\ 3 \end{bmatrix}$, addition is possible as $2i+3j$.

---

### Dot product and Orthogonal

$\begin{vmatrix}x \end{vmatrix}$=$\sqrt{x_1^2+x_2^2,…,x_n^2}$ is called the norm of $x$. Through this definition, it means that $x$ is defined as the distance from the origin to point $P$.

The Cauchy-Schwarz inequality is the case where the following formula holds for arbitrary vectors x, y in the set of all real numbers: $\begin{Vmatrix} x*y \end{Vmatrix}\leq\begin{Vmatrix} x \end{Vmatrix} \begin{Vmatrix} y \end{Vmatrix}$. Note that equality holds only when one of $x, y$ is a real multiple of the other.

Also, when solving the angle formula mathematically, $x*y=\begin{Vmatrix} x \end{Vmatrix} \begin{Vmatrix} y \end{Vmatrix} cos\theta$.

Applying the norm formula mentioned above, a vector with norm 1, that is, when $\begin{Vmatrix} x \end{Vmatrix} = 1$, is called a unit vector. Additionally, when two vectors are perpendicular to each other, they are called orthogonal, and when they are both orthogonal to each other and each is a unit vector, they are called orthonormal.

When expressed as $u=\frac{1}{\begin{Vmatrix} x \end{Vmatrix}} * x$, this becomes a basic unit vector (standard unit vector) that is a unit vector with magnitude 1.

---

### Vector equation

When there is a direction vector (slope) and a point, the following equations hold for $v(a,b,c), P(x_0, y_0, z_0)$:

- Vector equation: $(x, y, z) = p_0+tv = (x_0, y_0, z_0) + t(a, b, c)$
- Parametric equation: $x=x_0 + ta, y=y_0 + tb, z=z_0 + tc$
- Symmetric equation: $\frac{x-x_0}{a}=\frac{y-y_0}{b}=\frac{z-z_0}{c}$ ($a,b,c\neq 0$)

When there is a normal vector and a point, the following equations hold for $n(a,b,c), P(x_0, y_0, z_0)$:

- $n * P_0P = (a, b, c) * (x - x_0, y - y_0, z - z_0) = 0$
- $ax+by+cz = d$

When the foot of the perpendicular from point $P$ to vector $x=OQ$ is $S$, $p=OS$ is called the projection of $y=OP$ onto $x$ and is denoted as $proj_xy$.

<img src="https://velog.velcdn.com/images/devjo/post/d2c68274-0834-4e19-bc80-add8f34a479e/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

As shown in the image above, since $p$ is parallel to $x$, we can say $p = tx$, and since $y-p$ is perpendicular to $x$, it can be expressed as $x * (y-p) = 0$. That is, it is proven that $t = \frac{y*x}{\begin{Vmatrix} x \end{Vmatrix}^2}$.

---

### References

[Original Source #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[Original Source #2](https://www.boostcourse.org/ai151/joinLectures/194162)

[Original Source #3](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)