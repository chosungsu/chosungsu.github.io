---
title: 'Paths and Graphs'
date: '2023-07-09'
tags: ['Computational Geometry', 'lecture']
---

### Shortest Path Problem

Given $n$ disjoint polygonal obstacles in the plane and two points $s$ and $t$ outside the obstacles, the problem is to find the shortest path from $s$ to $t$ while avoiding the interiors of the obstacles.

The shortest path between two points avoiding a set of obstacles is always a polygonal curve, and its vertices are $s$, $t$, or vertices of the obstacles.

#### Computing the Visibility Graph

<img src="https://velog.velcdn.com/images/devjo/post/2bf17d8e-2986-4c81-a1b0-8baf02931861/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

We introduce an $\mathbf{O(n^2)}$ time algorithm for constructing the visibility graph of a set of polygonal obstacles with $n$ vertices. This algorithm is based on the concept of performing an angular sweep around each vertex.

Imagine shooting bullet paths in all directions from each vertex $v$. The path until the bullet first hits an obstacle segment represents the closest obstacle in that direction from $v$.

A key event occurs when we reach the slope $\theta$ of the line connecting two vertices $v$ and $w$. In dual space, we create a dual line $v^*: y = v_a x - v_b$ for each of the $2n$ vertices. The event slope $\theta$ corresponds to the $x$-coordinate ($a$-coordinate) of the intersection of the two dual lines $v^*$ and $w^*$ in dual space.

---

### Motion Planning

Motion planning is the problem of planning the movement of one or more robots that potentially have many degrees of freedom in terms of motion and joints.

The workspace consists of the environment in which the robot operates, including a set of obstacles that the robot must not intersect. This space is assumed to be static with complete geometric information.

#### Motion Planning of a Point Robot

<img src="https://velog.velcdn.com/images/devjo/post/2c1983eb-d4bd-416b-9bb8-0255def4b1c9/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

After transforming a complex problem into the problem of a point robot moving in free space, we perform the following steps to check if a path exists:

Partition the obstacle boundaries into trapezoids. Remove trapezoid faces inside obstacles to divide free space into simple convex regions. Create a planar graph called a road map based on the trapezoidal map.

#### C-Obstacles and Minkowski Sums

Configuration obstacles ($C_P$) are the set of all configurations where robot $R$ intersects obstacle $P$.

The Minkowski sum is defined as the sum of pairwise points from each set:

$$
S_1 \oplus S_2 = \{\vec{p} + \vec{q} \mid \vec{p} \in S_1, \vec{q} \in S_2\}
$$

#### Computing Minkowski Sums of Convex Polygons

<img src="https://velog.velcdn.com/images/devjo/post/16e8bfdc-8439-4c69-9e8b-62b3fb96164f/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

When $R$ and $P$ are convex polygons, $C_P = P \oplus (-R)$ can be computed in $O(n+m)$ time (where $n$ and $m$ are the numbers of edges of $P$ and $R$, respectively).

When $R$ and $P$ are non-convex, the complexity of the Minkowski sum $P \oplus R$ can be as high as $O(n^2 m^2)$ in the worst case. For the convex case, when robot $R$ is an $m$-gon convex polygon and obstacle $P$ is an $n$-gon simple polygon, the total complexity of $P \oplus R$ is $O(nm)$.

---

### References

[Original source #1](https://www.cs.cmu.edu/afs/cs/academic/class/15456-s14/Handouts/cmsc754-lects.pdf)
