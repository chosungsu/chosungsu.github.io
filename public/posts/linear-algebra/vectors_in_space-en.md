---
title: 'Vectors in space'
date: '2023-03-03'
tags: ['Linear algebra', 'lecture']
---

### Warm up

An easy way to understand $n$-vectors with many components is to think of them as an ordered list of numbers.

$$
a = \begin{pmatrix} a^1 \\ \vdots \\ a^n\end{pmatrix}
$$

In the above vector, the superscripts are not exponent components but component numbers. And since order is important, each vector component cannot be the same if shuffled. The set of all vectors is denoted by $R^n$.

---

### Addition and Scalar Multiplication

An important property of $n$-vectors is that you can add two vectors and perform scalar multiplication.

$$
a = \begin{pmatrix} a^1 \\ \vdots \\ a^n\end{pmatrix}, 
b = \begin{pmatrix} b^1 \\ \vdots \\ b^n\end{pmatrix}
$$

If we have the above two vectors, the sum is calculated as follows.

$$
a+b = \begin{pmatrix} a^1 + b^1 \\ \vdots \\ a^n + b^n\end{pmatrix}
$$

And when multiplied by scalar $\lambda$, it becomes as follows.

$$
\lambda a = \begin{pmatrix} \lambda a^1 \\ \vdots \\ \lambda a^n\end{pmatrix}
$$

---

### Hyperplanes

It is impossible to visualize vectors of dimensions where $n$ is greater than 3. However, objects such as lines and planes have much meaning regardless of the size of $n$. Given two non-zero vectors $u, v$, they generally determine a plane unless they lie on the same line.

$$
\{P + su + tv | s, t \in R\}
$$

Now we generalize the plane with a recursive definition. In $n$-vectors, a set of $k+1$ vectors $P, v_1, \dots, v_k$ determines the following.

$$
\{P + \sum_{i=1}^k \lambda_i v_i | \lambda_i \in R\}
$$

---

### Directions and Magnitudes

The Euclidean length of an $n$-vector is as follows.

$$
|v| = \sqrt{(v^1)^2 + (v^2)^2 + \cdots + (v^n)^2}
$$

We can find the angle between two vectors using the law of cosines. Given two vectors $u,v$ forming a plane in $R^n$, when calculated as $|v-u|^2 = |u|^2 + |v|^2 - 2|u||v|cos \theta$, the part excluding $cos \theta$ is $|v-u|^2 - |u|^2 - |v|^2 = -2u^1v^1 - \cdots -2u^nv^n$, so it can be transformed to $|u||v|cos \theta = u^1v^1 + \cdots +u^nv^n$.

Since the dot product of each vector $u, v$ becomes $u \cdot v = u^1v^1 + \cdots + u^nv^n$, we can infer the definition through the above Euclidean length.

The dot product has important properties such as symmetry, distributivity, bilinearity, and positive definiteness. First, symmetry satisfies $u \cdot v = v \cdot u$, distributivity satisfies $u \cdot (v+w) = u \cdot v + u \cdot w$. And bilinearity satisfies $u \cdot (cv+dw) = c(u \cdot v) + d (u \cdot w) \leftrightarrow (cu+dw) \cdot v = c(u \cdot v) + d(w \cdot v)$, and with positive definiteness, the dot product value is always greater than or equal to 0.

The Cauchy-Schwarz inequality defines $\frac{|<u,v>|}{|u||v|} \le 1$ for non-zero vectors $u,v$, and there are two methods to prove it. The first is using the fact that the cosine angle is less than or equal to 1, and the second is using a quadratic polynomial.

The proof using a quadratic polynomial is as follows. Since the dot product of vectors is always greater than or equal to 0 for any real number $\alpha$,

$$
\begin{aligned}
& 0 \le <u+\alpha v, u+\alpha v> \\
&= <u,u> + 2\alpha<u,v> + \alpha^2<v,v>
\end{aligned}
$$

This expression is a quadratic in $\alpha$, and its discriminant must be less than or equal to 0. Setting the quadratic coefficients as $a=<v,v>$, $b=<u,v>$, $c=<u,u>$, from the discriminant $b^2-ac \le 0$

$$
<u,v>^2 \le <u,u><v,v>
$$

Therefore, $\frac{|<u,v>|^2}{|u|^2|v|^2} \le 1$ holds, and the Cauchy-Schwarz inequality is proven.

---

### References

[Original source #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)

[Original source #2](https://www.math.ucdavis.edu/~linear/linear-guest.pdf)