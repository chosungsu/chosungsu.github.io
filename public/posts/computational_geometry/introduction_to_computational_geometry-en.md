---
title: 'Introduction to Computational Geometry'
date: '2023-07-01'
tags: ['Computational Geometry', 'lecture']
---

### What is Computational Geometry?

Computational geometry is a subfield of algorithms and theoretical computer science, best known for designing and analyzing efficient algorithms for problems involving geometric inputs and outputs.

The field developed rapidly from the late 1970s through the 1990s.

It grew out of generalizing research on sorting and searching algorithms in one dimension to problems involving multidimensional inputs. Typically, the dimension of the ambient space is assumed to be a small constant (usually $\\le 10$).

---

### Typical Problem

One of the canonical problems in computational geometry is the shortest path problem.

Given a collection of polygonal obstacles in the plane, the task is to find the shortest obstacle-avoiding path from a given start point $s$ to a target point $t$. This problem can be reduced to a shortest path problem on a visibility graph. After this reduction, non-geometric algorithms such as Dijkstra's algorithm can be applied.

This shortest path problem can be solved in $O(n^2 \\log n)$ time with relatively simple algorithms, and in $O(n \\log n)$ time with more sophisticated ones.

---

### Strengths

Before the development of computational geometry, many solutions to geometric computation problems were ad hoc, and some were inefficient or even incorrect. By emphasizing mathematical rigor, computational geometry has made substantial progress in establishing correct and provably efficient algorithmic solutions to many problems.

Because of the clash between the continuous nature of geometry and the discrete nature of computation, geometric software was prone to subtle bugs. Research in computational geometry has helped to place the robust and exact computation of geometric primitives on a solid mathematical foundation.

---

### Limitations

Computational geometry largely focuses on discrete aspects of geometry. Consequently, it may not fully address the needs of many application domains in which objects are inherently continuous, such as computational physics, computational fluid dynamics, and motion planning.

The field has traditionally concentrated on straight or flat objects.

Most of the work has focused on two-dimensional problems, with more limited coverage of three-dimensional problems, even though many important applications live in three or higher dimensions.

---

### References

[Original source #1](https://www.cs.cmu.edu/afs/cs/academic/class/15456-s14/Handouts/cmsc754-lects.pdf)

