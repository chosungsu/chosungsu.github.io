---
title: 'Line Segment Intersection'
date: '2023-07-03'
tags: ['Computational Geometry', 'lecture']
---

### Importance of Geometric Intersections

Complex shapes are often constructed by applying Boolean operations such as union, intersection, and difference to simple primitive shapes.

In robotics and motion planning, it is crucial to know whether objects intersect in order to detect and avoid collisions.

#### Line Segment Intersection Problem

Given a set $S$ of $n$ line segments in the plane, the goal is to output all intersection points between pairs of segments.

The $n$ segments can have anywhere from 0 up to $\binom{n}{2} = O(n^2)$ intersection points. To avoid algorithms that take $O(n^2)$ time in the worst case—and since intersections are often sparse in practice—it is natural to design an output-sensitive algorithm whose running time depends on both $n$ and the number of intersections.

---

### Plane Sweep Algorithm

<img src="https://velog.velcdn.com/images/devjo/post/176fdc97-0f9b-4ab9-b32a-b3797a0c5417/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

The plane sweep algorithm solves this 2D problem by simulating the motion of a one-dimensional line sweeping across the plane.

The algorithm maintains three main components: the partial solution already constructed to the left of the sweep line, the status of objects currently intersecting the sweep line, and a (partial) set of future events to be processed.

#### Sweep-line Status

The sweep-line status is the list of segments intersecting the vertical sweep line $l$, ordered from top to bottom.

Rather than continuously updating the $y$-coordinates of all intersection points as the sweep line moves—which would be inefficient—we store, for each segment $s_i$, the coefficients $(a_i, b_i)$ of the supporting line equation $y = a_i x + b_i$.

#### Events and Intersection Detection

We process events only when the status changes; the corresponding $x$-coordinates are called event points. Event types include left endpoints, right endpoints, and intersection points.

If two segments $s_i$ and $s_j$ intersect at a point $p$, then placing the sweep line just to the left of $p$ guarantees that $s_i$ and $s_j$ are adjacent in the sweep-line status. Hence, immediately after processing the rightmost event before $p$, the segments $s_i$ and $s_j$ become neighbors, ensuring that every intersection will be detected.

#### Computing Segment Intersections

Given two segments $\overline{ab}$ and $\overline{cd}$, we must compute the coordinates of their intersection point accurately.

Any point $p(s)$ on $\overline{ab}$ can be represented using a parameter $s \in [0, 1]$ as

$$
p(s) = (1 - s)a + sb
$$

Similarly, any point $q(t)$ on $\overline{cd}$ can be represented using a parameter $t \in [0, 1]$ as

$$
q(t) = (1 - t)c + td
$$

---

---

### Polygon Triangulation

Triangulation is a general problem of subdividing a region into simplices; in the plane, this means dividing it into triangles. The simplest form of this problem is splitting a simple polygon into triangles.

#### Monotone Polygons

Given a set $S$ of $n$ line segments in the plane, the goal is to output all intersection points between pairs of segments.

The $n$ segments can have from 0 up to $\binom{n}{2} = O(n^2)$ intersection points. To avoid algorithms that take $O(n^2)$ time in the worst case, and since intersections are often rare in practice, it is preferable to design an output-sensitive algorithm.

---

### References

[Original source #1](https://www.cs.cmu.edu/afs/cs/academic/class/15456-s14/Handouts/cmsc754-lects.pdf)

