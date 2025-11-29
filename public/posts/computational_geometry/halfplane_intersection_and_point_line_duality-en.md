---
title: 'Halfplane Intersection and Point-Line Duality'
date: '2023-07-03'
tags: ['Computational Geometry', 'lecture']
---

### Halfplane Intersection

A line in the plane divides the plane into two regions. Each of these regions is called a halfplane. (In 3D, these are halfspaces.)

Given a set $H = \{h_1, h_2, \dots, h_n\}$ of $n$ closed halfplanes, the goal is to compute their intersection. Since each halfplane is a convex set, their intersection is also convex.

---

### Divide-and-Conquer Algorithm

<img src="https://velog.velcdn.com/images/devjo/post/b55d13ea-0c36-43a7-bdd0-ea7b5ace63a8/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Divide the $n$ halfplanes $H$ into two subsets $H_1$ and $H_2$ of size approximately $n/2$. Recursively compute the intersections $K_1$ and $K_2$ of $H_1$ and $H_2$. Compute and return the intersection $K$ of the convex polygons $K_1$ and $K_2$.

The merge time is $M(n)$, and the intersection of two convex polygons takes $O(n)$ time.

We compute the intersection using a plane sweep from left to right. Due to convexity, the sweep line status always contains at most 4 edges (the upper and lower chains of each polygon), which is of $O(1)$ size. We sweep once along all edges, so the total time is $O(n)$.

---

### Lower Envelopes and Duality

<img src="https://velog.velcdn.com/images/devjo/post/57868f8b-a6b3-4ef8-a787-924bbe8e7de5/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Given $n$ lines $L = {l_1, \dots, l_n}$, the boundary of the intersection of the halfplanes $y \le a_i x - b_i$ below each line is called the lower envelope.

#### Properties of Duality

In the primal plane, a point $p$ being above/on/below a line $l$ corresponds to the dual line $p^\star$ being below/on/above the dual point $l^\star$ in the dual plane.

Two lines $l_1$ and $l_2$ intersecting at a point $p$ corresponds to the dual line $p^\star$ passing through the dual points $l_1^\star$ and $l_2^\star$.

#### Relationship between Convex Hulls and Envelopes

Given a set of points $P$ in the plane, the order of vertices following the upper convex hull of $P$ in counterclockwise order is the same as the order of lines on the lower envelope of the dual set $P^\star$ from left to right.

---

### References

[Original source #1](https://www.cs.cmu.edu/afs/cs/academic/class/15456-s14/Handouts/cmsc754-lects.pdf)
