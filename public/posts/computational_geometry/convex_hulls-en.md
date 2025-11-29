---
title: 'Convex Hulls'
date: '2023-07-01'
tags: ['Computational Geometry', 'lecture']
---

### Convexity

Given a set of points $P$ in the plane, the convex hull $\text{conv}(P)$ of $P$ can be intuitively defined as the shape formed when you wrap a rubber band around the points and let it snap tightly around them.

#### Formal Definition

A set $K$ is convex if for any two points $p, q \in K$, the entire line segment $\overline{pq}$ connecting the two points is contained in $K$.

A convex set may have a boundary that can be enclosed in a ball of finite radius, or it may have an unbounded boundary such as lines, rays, or half-planes that extend infinitely.

The convex hull $\text{conv}(P)$ of an arbitrary set $P$ is the intersection of all convex sets containing $P$, or most intuitively, the smallest convex set containing $P$.

#### Convex Hull Problem

<img src="https://velog.velcdn.com/images/devjo/post/fb99324d-f386-449b-8b02-a6005ac1d62f/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Given a set $P$ of $n$ points in the plane, the problem is to produce output representing the convex hull of $P$.

Since the convex hull is a closed convex polygon, the simplest representation is to list the vertices of the convex hull in counterclockwise order.

---

### Graham's Scan

An algorithm that computes the convex hull in $O(n \log n)$ time, based on a general approach called incremental construction.

To simplify computation, points are sorted in ascending order of $x$-coordinates and divided into two chains: the upper hull and the lower hull.

The point with the smallest $x$-coordinate and the point with the largest $x$-coordinate become the common endpoints of the two hulls. Points are added one by one from left to right in sorted order. The current upper hull vertices are stored in a stack $H$.

When adding a new point $p_i$, we check whether the three points in order $\langle p_i, H[\text{top}], H[\text{top}-1] \rangle$ form a strict left turn. If it is not a left turn or the three points are collinear, the middle point $H[\text{top}]$ can no longer belong to the upper hull, so it is popped from the stack.

---

### Divide-and-Conquer

Another $O(n \log n)$ algorithm based on divide-and-conquer, which generalizes merge sort.

If $|P| \le 3$, compute and return the convex hull by brute force. Divide $P$ into the lower half $A$ and the upper half $B$ by $x$-coordinates. Recursively compute $H_A = \text{conv}(A)$ and $H_B = \text{conv}(B)$. Merge $H_A$ and $H_B$ to form the combined convex hull $H$. This is done by computing upper and lower tangents to the two hulls and removing points that lie between these two tangents.

---

### More on Convex Hulls

#### Output Sensitive Algorithms

Traditional algorithm analysis depends only on input size ($n$). However, many geometric problems have output size ($h$) that varies greatly, so it is common to express running time as a function of both input ($n$) and output ($h$).

#### Chan's Algorithm

Chan's algorithm combines two algorithms, Graham's scan and Jarvis march, to achieve a running time of $O(n \log h)$.

Graham's scan cannot avoid $O(n \log n)$ because it must sort all points, and Jarvis march is too slow when $h$ is large. The solution is to run Graham's scan only on small subsets.

Assuming we know the value of $h$ in advance, we divide the entire point set $P$ into $r \approx n/h$ subsets $P_i$, each of size $m$. The total time is $r \times O(m \log m) = (n/h) \times O(h \log h) = \mathbf{O(n \log h)}$.

---

### References

[Original source #1](https://www.cs.cmu.edu/afs/cs/academic/class/15456-s14/Handouts/cmsc754-lects.pdf)
