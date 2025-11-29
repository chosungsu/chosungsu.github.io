---
title: 'Trapezoidal Maps'
date: '2023-07-05'
tags: ['Computational Geometry', 'lecture']
---

### Trapezoidal Maps

Given a set $S = \{s_1, \dots, s_n\}$ of non-intersecting line segments in the plane, assume there are no vertical segments. Enclose all segments within a large bounding rectangle. Draw vertical lines upward and downward from each endpoint of the segments, which are called vertical bullet paths.

---

### Randomized Incremental Construction

<img src="https://velog.velcdn.com/images/devjo/post/7cc417fd-25d2-4356-9105-eb5d0122dea4/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

We construct the trapezoidal map using a randomized incremental algorithm instead of plane sweep, updating it by adding the segments of the set $S$ one by one in random order, starting from an initial bounding rectangle.

The goal is to prove using backwards analysis that $E[k_i]$, the expected number of new trapezoids created when inserting the $i$-th segment, is constant.

---

### Planar Point Location

<img src="https://velog.velcdn.com/images/devjo/post/587d1fb4-1d46-45a4-ae6c-df8f33d15cbf/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:50;" />

The point location data structure is based on a rooted directed acyclic graph (DAG). Each node has 0 or 2 outgoing edges.

Internal nodes include $x$-nodes that contain an endpoint $p$ of a segment and branch to one of two children depending on whether a query point is to the left or right of the vertical line through $p$. And $y$-nodes point to a segment $s$ and branch to one of two children depending on whether a query point $q$ is above or below the line containing $s$.

#### Incremental Construction

<img src="https://velog.velcdn.com/images/devjo/post/94a44bdc-73e8-486e-a17e-4d56bc86afa0/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

When a segment $s$ is inserted into an existing trapezoid $A$, three cases occur depending on how many endpoints of $s$ lie on the boundary of $A$.

$\Rightarrow$ If one endpoint lies on the left or right boundary, $A$ is replaced by three trapezoids $\mathbf{X, Y, Z}$. An $x$-node for endpoint $p$ and a $y$-node for segment $s$ are added.

$\Rightarrow$ When the segment lies completely inside $A$, $A$ is replaced by four trapezoids $\mathbf{U, X, Y, Z}$. Two $x$-nodes for endpoints $p, q$ and one $y$-node for segment $s$ are added.

$\Rightarrow$ When the segment completely crosses $A$, $A$ is replaced by two trapezoids $\mathbf{Y, Z}$. The leaf node of $A$ is replaced by a $y$-node for segment $s$.

---

### Voronoi Diagrams and Fortune's Algorithm

#### Voronoi Diagrams

Given a set of points $P = \{p_1, p_2, \dots, p_n\}$, the Voronoi cell $V(p_i)$ for site $p_i$ is the set of all points $q$ in the plane for which $p_i$ is closer than any other site.

$$
V(p_i) = \{q \mid \|p_i q\| < \|p_j q\|, \forall j \ne i\}
$$

Considering the halfplane $h(p_i, p_j)$ bounded by the perpendicular bisector between two sites $p_i$ and $p_j$, $h(p_i, p_j)$ is the set of points strictly closer to $p_i$ than to $p_j$. Therefore, the Voronoi cell is the intersection of such halfplanes:

$$
V(p_i) = \bigcap_{j \ne i} h(p_i, p_j)
$$

Each point on a Voronoi edge is equidistant from its two nearest neighbor sites. Under the general position assumption that no four sites lie on a circle, all Voronoi vertices have degree 3.

#### Fortune's Algorithm

<img src="https://velog.velcdn.com/images/devjo/post/be3b7dcd-69b2-4959-83e4-ab2293d6d3c9/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Fortune's algorithm is an efficient plane sweep algorithm that computes the Voronoi diagram in $\mathbf{O(n \log n)}$ time. Unlike typical plane sweeps, the Voronoi diagram can generate vertices behind the sweep line that are determined by sites still below the sweep line.

Fortune's algorithm solves this problem by maintaining an $x$-monotone curve called the beach line. The beach line is the boundary between points closer to a site $p$ above the sweep line $l$ and points closer to the sweep line $l$ itself. The set of points equidistant from a point (site) and a line (sweep line) is a parabola. The beach line consists of the lower envelope of these parabolas (one per site).

#### Voronoi Vertex Events

These occur when an arc corresponding to three consecutive sites $p_i, p_j, p_k$ disappears from the beach line.

---

### References

[Original source #1](https://www.cs.cmu.edu/afs/cs/academic/class/15456-s14/Handouts/cmsc754-lects.pdf)
