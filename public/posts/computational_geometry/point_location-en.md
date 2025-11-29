---
title: 'Point Location'
date: '2023-07-07'
tags: ['Computational Geometry', 'lecture']
---

### Point Location Problem

The point location problem is: given a polygonal subdivision of the plane (PSLG) and a query point $q$, efficiently find the face of the subdivision that contains $q$.

---

### Kirkpatrick's Algorithm

<img src="https://velog.velcdn.com/images/devjo/post/c09acf4a-774e-45d8-bda3-a95fc92b0fc4/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

First, assume the given planar subdivision is a triangulation. Triangulate all faces of the subdivision. Then compute the convex hull of the subdivision and enclose everything in a large outer triangle (with vertices $a, b, c$) to include the outer face. This process adds new edges and faces, but due to the properties of planar graphs, the total size $n$ increases only by a constant factor.

Kirkpatrick's method creates a sequence of triangulations $\mathbf\{T_0, T_1, T_2, \dots, T_k\}$ with the following properties. $k = O(\log n)$. $T_k$ consists of a single triangle (the outermost outer face).

To generate $T_{i+1}$ from $T_i$, we carefully select and remove a set of vertices satisfying two conditions. The degree of each vertex to be removed is bounded by a constant. When removing a vertex of degree at most $d$, the resulting hole can be easily retriangulated with new triangles that overlap at most $d$ previous triangles. And the vertices to be removed must form an independent set (no two are adjacent). This allows the holes created by vertex removal to be retriangulated independently.

---

### Planar Voronoi Diagrams

Given a set of $n$ points $P = \{p_1, p_2, \dots, p_n\}$, the Voronoi polygon $V(p_i)$ for point $p_i$ is the set of all points in the plane for which $p_i$ is closer than any other point in $P$.

$$
V(p_i) = \{q : |p_i - q| \le |p_j - q|, \forall j \neq i\}
$$

The Voronoi diagram $\text{VD}(P)$ is the union of all boundaries of the Voronoi polygons.

#### Divide-and-Conquer Algorithm

When $\text{V}(l_0)$ for $l_0 \in L$ and $\text{V}(r_0)$ for $r_0 \in R$ overlap, we insert the perpendicular bisector between $l_0$ and $r_0$, removing the "wrong" side of the bisector from the polygons. The union of these perpendicular bisectors, i.e., the boundary separating $\text{VD}(L)$ and $\text{VD}(R)$, is called the contour. Points on the contour are equidistant from one point in $L$ and one point in $R$.

$$
T(n)=2T(n/2) + n
$$

If we naively repeatedly rescan the boundary of $\text{V}(l_0)$, when the boundary of $\text{V}(r_0)$ touches first repeatedly, we may rescan the boundary of $\text{V}(l_0)$ $O(n)$ times in $O(n)$ time each, taking a total of $\mathbf{O(n^2)}$ time.

To solve this, note that Voronoi polygons are convex. When walking along the contour, the newly created edges of $\text{V}(l_i)$ rotate in a consistent direction (clockwise for the left side). We trace the polygon boundaries of $\text{V}(L)$ clockwise and those of $\text{V}(R)$ counterclockwise. Using this method, each edge of a Voronoi polygon is scanned at most once, so we can trace the entire contour in $\mathbf{O(n)}$ time, achieving an overall time complexity of $O(n \log n)$.

---

### Delaunay Triangulations and Convex Hulls

<img src="https://velog.velcdn.com/images/devjo/post/bb9557ab-d7c5-4842-8eb7-3e8b88739995/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

At first glance, Delaunay triangulation (DT) seems completely different from convex hull (CH), as DT is based on metric properties (distance) while CH is based on affine properties (collinearity or coplanarity). Surprisingly, however, the $d$-dimensional Delaunay triangulation problem can be transformed into a $(d+1)$-dimensional convex hull problem.

In the projection onto a paraboloid, we vertically project each point $p=(x, y)$ in the plane to a point $p' = (x, y, x^2 + y^2)$ on a 3D paraboloid. We transform the point set $S$ in the plane to the projected point set $S'$ in 3D.

#### Voronoi Diagrams and Upper Envelopes

<img src="https://velog.velcdn.com/images/devjo/post/1123472b-ff61-4252-86f3-f96b8457aacf/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

Just as Delaunay triangulation and convex hull are dual, the Voronoi diagram (VD) is dual to the upper envelope.

For each point $p=(a, b)$, we define an upper halfspace $H^+(p)$ using the plane equation tangent to the paraboloid:

$$
z \ge 2ax + 2by - (a^2 + b^2)
$$

We compute the intersection of the upper halfspaces $H^+(p_i)$. This intersection is an unbounded convex polyhedron, and projecting the 1-skeleton (edges) of this polyhedron onto the $(x, y)$-plane yields the Voronoi diagram.

---

### Topological Plane Sweep

Topological plane sweep is an algorithm for efficiently sweeping an arrangement of lines. A typical plane sweep processes an arrangement of size $O(n^2)$ with $O(n^2)$ intersections, usually taking $O(n^2 \log n)$ time.

A cut is a sequence of $n$ edges $c_1, c_2, \dots, c_n$, one from each line of the arrangement. $c_i$ and $c_{i+1}$ must be adjacent in the same face of the arrangement. $c_i$ must be above the face, and $c_{i+1}$ must be below the face.

#### Upper and Lower Horizon Trees, UHT/LHT

<img src="https://velog.velcdn.com/images/devjo/post/31425409-20fe-4fbf-8099-17027935662e/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

To perform the basic step in $O(1)$ time, we need to efficiently find the right endpoint of the cut. For this, we use two data structures.

The upper horizon tree (UHT) traces each edge of the cut to the right. When two edges meet, only the edge with the higher slope continues to be traced, forming a forest.

The lower horizon tree (LHT) traces edges to the right, and when two edges meet, only the edge with the smaller slope continues to be traced, forming a forest.

Knowing the intersections of UHT and LHT, we can determine the right endpoint of each edge of the cut. We store them in a stack $S$ and process them in $O(1)$ time by popping from the stack.

---

### Ham-Sandwich Cuts

The ham-sandwich problem is: given two finite point sets in the plane, $n$ red points $A$ and $m$ blue points $B$, find a single line that simultaneously bisects both sets.

The two sets $A$ and $B$ are separated by the $y$-axis. $A$ (red points) have positive $x$-coordinates. Their dual lines have positive slopes. $B$ (blue points) have negative $x$-coordinates. Their dual lines have negative slopes.

#### Dual Formulation

A median line for a point set (say $A$) is a line that, for any slope, uniquely bisects the set, placing exactly $(n-1)/2$ points above and $(n-1)/2$ points below, passing through one point.

The median level uses the standard dual transformation $D(a, b): y = ax - b$ to convert all points of $A$ into dual lines. In an arrangement, the $k$-level is the set of points that have at most $k-1$ lines above and at most $n-k$ lines below.

---

### References

[Original source #1](https://www.cs.cmu.edu/afs/cs/academic/class/15456-s14/Handouts/cmsc754-lects.pdf)
