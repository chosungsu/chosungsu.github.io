---
title: 'Linear transformation'
date: '2023-03-17'
tags: ['Linear algebra', 'lecture']
---

### matrix as a function

A transformation refers to a function where both input and output are vectors, and in the transformation $T : R^n \rightarrow R^m$, $w=T(x)$ is called the image of vector $x$ under $T$, and $x$ is called the pre-image of vector $w$. A transformation of the form $T(x) = Ax$ is called a matrix transformation. A transformation is called a linear transformation if it satisfies the following conditions for any vectors $u, v \in R^n$ and any scalar k during the transformation process.

-$T(u+v) = T(u) + T(v)$

-$T(ku) = kT(u)$

For any $v \in R^n$, if $T:R^n \rightarrow R^m$ is defined as $T(v) = 0$, then $T$ is called the zero transformation, and if it is defined as $T(v) = v$, it becomes the identity transformation.

---

### geometry meanings

A linear transformation $T : R^n \rightarrow R^n$ that preserves length, i.e., $|T(x)| = |x|$, is called a euclidean isometry. It can also preserve inner products as in $T(x) \cdot T(y) = x \cdot y, x, y \in R^n$.

A square matrix $A$ is called an orthogonal matrix if $A^{-1} = A^T$.

For an $n$-th order square matrix $A$, all of the following conditions hold:

-The transpose, inverse, and product of orthogonal matrices are orthogonal matrices.

-det$A$=1 or -1.

-Column and row vectors are orthonormal.

---

### kernel and range

When $T : R^n \rightarrow R^m$ is a linear transformation, the complete set of vectors in $R^n$ whose image under $T$ becomes 0 is called the kernel and is denoted by $kerT$. That is, it satisfies $kerT = \{v \in R^n | T(v) = 0\}$. $kerT$ is a subspace of $R^n$ and is called the kernel space.

If $T : R^n \rightarrow R^m$ satisfies $T(u) = T(v)$ while $u = v$, it is called one-to-one (injection), and if there exists a $v$ such that $T(v) = w$ for any $w \in R^m$, it is called onto (surjective).

The complete set of images $T$ of any $v \in R^n$ is called the range and is denoted by $lmT$. In particular, if the range is $R^m$, it is called onto, and if $T$ is both one-to-one and onto, then $n=m$, which is called an isomorphism.

If $T$ is one-to-one, then the column vectors of matrix $A$ are linearly independent, and if it is onto, then the row vectors are linearly independent.

---

### composition and reversibility

If $T : R^n \rightarrow R^m$ and $S : R^k \rightarrow R^m$ are both linear transformations, then the composite function $S \circ T$ is also a linear transformation. A necessary and sufficient condition for a function $f : X \rightarrow Y$ to be invertible is that $f$ is both onto and one-to-one. If $T : R^n \rightarrow R^n$ is invertible, then $T^{-1}$ is also a linear transformation.

---

### References

[Original source #1](http://matrix.skku.ac.kr/2015-Album/BigBook-LinearAlgebra-2015.pdf)