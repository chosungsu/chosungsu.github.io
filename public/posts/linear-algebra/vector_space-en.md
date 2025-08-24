---
title: 'Vector space'
date: '2023-03-10'
tags: ['Linear algebra', 'lecture']
---

### Vector Spaces

From the word vector, one can immediately think of an arrow connecting two points in $\mathbb{R}^2$, but mathematically speaking, a vector is simply an element of a vector space. Here, a vector space is a set of objects that can be added and multiplied by scalars.

A vector space satisfies the following properties when vector set $V$ contains $u,v,w$ and $\alpha, \beta \in \mathbb{R}$:

1. $u+v \in V$ is the closure under addition property.

2. $u+v=v+u$ is the commutative property of addition.

3. $(u+v)+w=u+(v+w)$ is the associative property of addition.

4. If $v \in \mathbb{R}$, then $\alpha \cdot v \in \mathbb{R}$ is closure under scalar multiplication.

For example, $V=\{(x,y) \in \mathbb{R}^2 | x^2+y^2 \le 1\}$ cannot be called a vector space because it is not closed under scalar multiplication, as $2u=(0,2)$ obtained by multiplying a point $u=(0,1)$ by a scalar does not satisfy the inequality.

---

### Subspaces of Vector Spaces

We often see a subset space $W$ of a larger vector space, which is called a subspace and satisfies the following:

1. The zero vector of $V$ belongs to $W$.

2. $W$ is closed under addition, so if $u,v \in W$, then $u+v \in W$.

3. $W$ is closed under scalar multiplication, so if $u \in W$, then $\alpha u \in W$.

For example, if $W$ is the graph of $f(x)=2x$, the zero vector $(0,0)$ exists, and for a point $u=(a,2a) \in W$ and $v=(b, 2b) \in W$, their sum $u+v=(a+b, 2a+2b) \in W$ is closed under addition, and the scalar multiple $\alpha u=(\alpha a, \alpha 2a) \in W$ is also closed under scalar multiplication, so it can be a subspace.

---

### Linear Maps

A mapping $T:V \rightarrow U$ between vector spaces is called a linear mapping if it satisfies the following conditions:

1. For any vectors $u,v$ in $V$, $T(u+v)=T(u)+T(v)$ holds.

2. For $\alpha$ and $v$ in $V$, $T(\alpha v) = \alpha T(v)$ holds.

For example, if $V = M_{n \times n}$ is the vector space of $n \times n$ matrices and $T: V \to \mathbb{R}$ is a mapping defined by $T(A) = \det(A)$, then $T(A+B) = \det(A+B) = \det(A) + \det(B)$ and $T(\alpha A) = \alpha T(A)$ must hold for all scalars. However, according to the properties of determinants, $\det(\alpha A) = \alpha^n \det(A)$, so $T(\alpha A) = \alpha T(A)$ does not hold unless the scalar is 1. Therefore, it is not a linear mapping.

When a linear mapping is given, the kernel of $T$ is the set of vectors in the domain $V$ that are mapped to the zero vector. That is, the set of vectors where $T(v)=0$. It is expressed as $\text{ker}(T)=\{v \in V | T(v)=0\}$. And the range is the set of vectors in the codomain $U$ for which there exists at least one vector $v$ such that $T(v)=b$. Therefore, it is expressed as $\text{range}(T)=\{b \in U|T(v)=b\}$.

The null space of an $m \times n$ matrix consists of the subset of vectors $v$ that satisfy $Av=0$. It is expressed as $\text{null}(A)=\{v \in \mathbb{R}^n | Av=0\}$. Therefore, the null space is identical to the kernel. The column space can be expressed as $\text{col}(A)=\text{span} \{v_1, v_2, \cdots, v_n\}$ and is identical to the range.

---

### Linear independence

For example, linear independence is related to span sets for subspaces, and just as the set $\{\text{North}, \text{East}, \text{North-East}\}$ is a redundant set, for a set of vectors in vector space $V$, if the only scalars satisfying $c_1v_1+c_2v_2+ \cdots + c_pv_p=0$ are $(c_1=c_2=\cdots=c_p=0)$, then it is linearly independent; otherwise, it is linearly dependent.

$$
A_1=\begin{bmatrix}
1 & 2 \\
0 & -1
\end{bmatrix},
A_2=\begin{bmatrix}
-1 & 3 \\
1 & 0
\end{bmatrix},
A_3=\begin{bmatrix}
5 & 0 \\
-2 & -3
\end{bmatrix}
$$

For example, to see if the above set is linearly dependent, we check if it can be expressed as scalar multiples. $A_1, A_2, A_3$ are not simple scalar multiple matrices of each other. However, $A_3$ can be expressed in terms of $A_1, A_2$ as $-2A_2+3A_1=A_3$, so we show a non-zero scalar set, determining it as linearly dependent.

---

### Bases

Given a set of vectors $\{v_1, \dots, v_{p-1}, v_p\}$, we define $W = \text{span}\{v_1, v_2, \dots, v_p\}$ as a subspace. If $v_p$ is linearly dependent on $v_1, v_2, \cdots, v_{p-1}$, then even if we remove $v_p$, the remaining set still generates all of $W$. Intuitively, this means that the vector does not provide an independent direction for generating the subspace.

Therefore, a set of vectors $B=\{v_1, \dots, v_k\}$ in subspace $W$ is called a basis if it satisfies the following conditions:

1. $B$ generates all of $W$.

2. $B$ is linearly independent.

In practice, if $B = \{v_1, \dots, v_p\}$ is a basis and we remove $v_p$, the remaining set cannot be a basis because it is linearly independent and the removed vector cannot be expressed as a linear combination of other vectors, making it a minimal generating set concept.

---

### Dimension of a Vector Space

In $V=\mathbb{R}^n$ dimensions, we know that if there is a set of non-zero vectors and the dimension $p$ of this set is greater than $n$, it automatically becomes linearly dependent. The reason is that the leading elements in RREF will be at most $r=n$, and $d=p-n>0$ includes non-trivial solutions. Conversely, in the case of $p < n$, since the number of columns in matrix $A$ is $p$, the possible $r=p$ is less than $n$. Therefore, it cannot be a basis.

$$
A=\begin{bmatrix}
2 & 3 & 3 & -2 \\
4 & 7 & 8 & -6 \\
0 & 0 & 1 & 0 \\
-4 & -6 & -6 & 3
\end{bmatrix}
$$

For example, when matrix $A$ is as above, $n=4$ and $\det A=-2 \ne 0$, so we can see that basis formation is possible because it is linearly independent.

---

### Rank

Rank is the dimension of the column space of a matrix. Since $\text{Col}(A) = \text{Range}(T_A)$, the rank of matrix $A$ equals the dimension of the range of the linear mapping.

In the Rank Theorem, when a matrix is $m \times n$ dimensional, the number of leading elements in RREF equals the rank, and $n=\text{rank}(A)+\text{null}(A)$ holds.

$$
A=\begin{bmatrix}
1 & -2 & 2 & 3 & -6 \\
0 & -1 & -3 & 1 & 1 \\
-2 & 4 & -3 & -6 & 11
\end{bmatrix}
$$

For example, if we have a matrix like above, we perform row reduction with $2R_1+R_3, (-1) \cdot R_2$ to transform it as follows:

$$
A=\begin{bmatrix}
1 & -2 & 2 & 3 & -6 \\
0 & 1 & 3 & -1 & -1 \\
0 & 0 & 1 & 0 & -1
\end{bmatrix}
$$

Here, the number of leading elements $r=3$, so $\text{rank} A=3$ holds. Therefore, the nullity is $d=n-r=5-3=2$.

---

### References

[Original Source #1](https://www.geneseo.edu/~aguilar/public/assets/courses/233/main_notes.pdf)