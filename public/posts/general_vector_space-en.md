---
title: 'Diagonalization of matrix'
date: '2023-03-24'
tags: ['Linear algebra', 'lecture']
---

### axioms of vector space

When a non-zero arbitrary set $V$ has two operations (addition and scalar multiplication) defined, and for any $x, y, z \in V$ and $h, k \in R$, the two basic laws $x + y \in V, kx \in V$ and the following 8 operational laws hold, we say that it forms a vector space.

-$x + y = y + x$

-$(x + y) + x = x + (y + x)$

-For all $x \in V$, there exists exactly one element 0 (zero vector) in V that satisfies $x + 0 = x$.

-For each element x in V, there exists uniquely -x (negative vector) in V that satisfies $x + (-x) = 0$.

-$k(x + y) = kx + ky$

-$(h + k)x = hx + kx$

-$(hk)x = h(kx) = k(hx)$

-$1x = x$

When the set $V = \{0\}$ is defined with scalar $k \in R$ as $0 + 0 = 0, k0 = 0$, it is both a vector space and called a zero vector space.

If $f_1(x), f_2(x), …, f_n(x)$ are functions that are differentiable $n-1$ times on the interval $(-\infty, \infty)$ and there exists at least one $x_0 \in (-\infty, \infty)$ that makes the Wronskian $W(x_0)$ non-zero, then they become linearly independent functions (vectors).

For example, when $f_1(x) = 1, f_2(x) = e^x, f_3(x) = e^{2x}$, $W(x) = \begin{vmatrix} 1 & e^x & e^{2x} \\ 0 & e^x & 2e^{2x} \\ 0 & e^x & 4e^{2x} \end{vmatrix} = 2e^{3x} \ne 0$, making them linearly independent.

---

### fourier series

An inner product on a real vector space $V$ is a function that assigns a scalar $<u, v>$ to a pair of vectors $u, v$ on $V$. If it satisfies the following, it is called an inner product space.

-$<u, v> = <v, u>$

-$<u+v, w> = <u, w> + <v, w>$

-$<cu, v> = c<u, v>$

-$<u, u> ≥ 0$ where $<u, u> = 0$ implies $u = 0$

When an arbitrary inner product $<u, v>$ is given, the length (norm) of vector $u$ is defined as $|u| = \sqrt{<u, u>}$ and the angle is defined as $cos\theta = \frac{<u, v>}{|u||v|}$. In particular, if the inner product is greater than 0, they are said to be orthogonal.

For any vectors $u, v$ in a complex inner product space, the following holds:

-$|<u, v>| ≤ |u||v|$ (Cauchy-Schwarz inequality)

-$|u+v| ≤ |u| + |v|$ (Triangle inequality)

---

### homomorphism

If $T : V \rightarrow W$ is injective and surjective, it is called an isomorphism and is expressed as $V \cong W$.

---

### References

[Original source #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)