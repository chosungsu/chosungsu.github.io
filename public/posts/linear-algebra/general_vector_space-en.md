---
title: 'General vector space'
date: '2023-03-27'
tags: ['Linear algebra', 'lecture']
---

### Dot product(vector)

The dot product can be represented as $\vec{a} \bullet \vec{b}$. For example, for $\begin{bmatrix} a_1 \\ a_2 \\ \vdots \\ a_n \end{bmatrix} \bullet \begin{bmatrix} b_1 \\ b_2 \\ \vdots \\ b_n \end{bmatrix}$, the dot product value equals the product of corresponding components, and therefore can be calculated as $a_1b_1 + a_2b_2 + \cdots + a_nb_n$.

As can be seen above, the dot product requires two vectors, but its value becomes a scalar.

---

### Length of vector

The length of a vector equals the square root of the sum of the squares of each component. $|\vec{a}|=\sqrt{a_1^2 + a_2^2 + \cdots + a_n^2}$, and the value inside the square root can be re-expressed as $\vec{a} \bullet \vec{a}=a_1^2 + a_2^2 + \cdots + a_n^2$. Therefore, generalizing, we get $|\vec{a}|^2 = \vec{a} \bullet \vec{a}$.

---

### Dot product(proof)

To prove the dot product, first we use the fact that the commutative law holds.

$$
\vec{v} \bullet \vec{w} = \vec{w} \bullet \vec{v}
$$

Expanding the left side of the above equation gives $v_1w_1 + v_2w_2 + \cdots + v_nw_n$, which is ultimately equal to the expanded right side value $w_1v_1 + w_2v_2 + \cdots + w_nv_n$. Therefore, in the dot product, the order of multiplication is not important.

Next, let's examine whether the distributive law holds.

$$
(\vec{v} + \vec{w}) \bullet \vec{x}=\vec{v} \bullet \vec{x} + \vec{w} \bullet \vec{x}
$$

Expanding the left side gives $(v_1+w_1)x_1 + (v_2+w_2)x_2 + \cdots + (v_n+w_n)x_n$, which is also identical to the expanded right side value.

---

### Cauchy-schwarz inequality

$$
|\vec{x} \bullet \vec{y}| \le |\vec{x}||\vec{y}|
$$

The above formula is the Cauchy-Schwarz inequality, and the moment when the left and right sides become equal is when one vector is a scalar multiple of the other vector.

---

### Triangle inequality

By applying the above Cauchy-Schwarz inequality, it can be implemented as $|\vec{x} + \vec{y}|^2=(\vec{x}+\vec{y}) \bullet (\vec{x}+\vec{y})$, and through the distributive law, it becomes $|\vec{x}|^2 + 2(\vec{x} \bullet \vec{y}) + |\vec{y}|^2$, and due to the Cauchy-Schwarz formula, it can be expanded to show that it is less than or equal to $|\vec{x}|^2 + 2|\vec{x}||\vec{y}| + |\vec{y}|^2 = (|\vec{x}|+|\vec{y}|)^2$.

$$
|\vec{x} + \vec{y}| \le |\vec{x}|+|\vec{y}|
$$

Therefore, the triangle inequality is now defined as above.

---

### Cross product

While the dot product holds as $\vec{a} \bullet \vec{b} \in R^n$ regardless of how large the n-dimensional value is, the cross product is only defined in 3-dimensional space. The vector resulting from the cross product is perpendicular to the vectors that are the subject of the cross product.

When $\vec{a} = \begin{bmatrix} a_1 \\ a_2 \\ a_3 \end{bmatrix}$ and $\vec{b} = \begin{bmatrix} b_1 \\ b_2 \\ b_3 \end{bmatrix}$ exist, $\vec{a} * \vec{b} = \begin{bmatrix} a_2b_3 - a_3b_2 \\ -(a_1b_3-a_3b_1) \\ a_1b_2-a_2b_1 \end{bmatrix}$ is obtained by crossing each vector value, excluding the row values. The middle row takes a negative sign.

When taking the dot product of this cross product with vector $a$, we get $a_1a_2b_3 - a_1a_3b_2 + a_2a_3b_1 - a_2a_1b_3 + a_3a_1b_2 - a_3a_2b_1=0$, and even when taking the dot product with vector $b$, it becomes 0, showing that the cross product value is exactly perpendicular to both vectors.

---

### Triple product

The triple product is expressed as $\vec{a}*(\vec{b}*\vec{c})$ and can be calculated as a vector where each component is multiplied by unit vectors and added, as $\vec{a} = a_xi+a_yj+a_zk$. Now the value inside the parentheses becomes $\begin{vmatrix} i & j & k \\ b_x & b_y & b_z \\ c_x & c_y & c_z \end{vmatrix} = i(b_yc_z - b_zc_y) - j(b_xc_z-b_zc_x) + k(b_xc_y-b_yc_x)$, so when taking the cross product with vector $a$, it simplifies to $\vec{b}(\vec{a} \bullet \vec{c}) - \vec{c}(\vec{a} \bullet \vec{b})$.

---

### References

[Original Source #1](https://www.boostcourse.org/ai151/joinLectures/194162)