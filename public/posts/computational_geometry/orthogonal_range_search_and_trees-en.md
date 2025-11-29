---
title: 'Trees'
date: '2023-07-07'
tags: ['Computational Geometry', 'lecture']
---

### $kd$-Trees

<img src="https://velog.velcdn.com/images/devjo/post/11e25260-2446-4086-bda3-4b7f2292ec44/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

$kd$-trees are an example of partition trees that extend the concept of 1D range search to higher dimensions. They are easy to implement and practical, but not asymptotically the most efficient solution for orthogonal range search.

Each internal node partitions points along a cutting line parallel to an axis, alternating between axes. To guarantee $O(\log n)$ tree height, we choose the median of points along the splitting dimension as the splitting value.

In a balanced $kd$-tree using alternating splitting rules, any vertical or horizontal line intersects only $O(\sqrt{n})$ cells. When a vertical line $x=x_0$ intersects a node split by the $x$-axis, $x_0$ can only intersect cells of one child. When intersecting a node split by the $y$-axis, it intersects cells of both children. Since the splitting dimension alternates, going down 2 levels of the tree doubles the number of intersected nodes at most, but the number of points is reduced by a factor of 1/4.

---

### Orthogonal Range Trees

<img src="https://velog.velcdn.com/images/devjo/post/652d486c-e89f-4857-a02a-7a298d05128f/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

In the multi-level search tree process, we express the query range $Q$ as the intersection of simpler ranges $Q_1, Q_2$, such as $Q = Q_1 \cap Q_2$. First, we build an appropriate search structure (e.g., a partition tree) $T$ for the point set $P$ with respect to the first range subspace (e.g., $x$-coordinates). Each node $u$ of $T$ represents a canonical subset $P_u$, and for each $P_u$, we build an auxiliary search tree $T_u$ with respect to the second range subspace (e.g., $y$-coordinates).

#### 2D Orthogonal Range Tree

We apply a multi-level search tree to a 2D orthogonal range query $Q = [x_{lo}, x_{hi}] \times [y_{lo}, y_{hi}]$.

Search the main tree $T$ for the $x$ range $[x_{lo}, x_{hi}]$ to find $O(\log n)$ canonical subsets $U(Q_1)$. For each $u \in U(Q_1)$, search the $y$ range $[y_{lo}, y_{hi}]$ in the auxiliary tree $T_u$. This search takes $O(\log |P_u|) \le O(\log n)$ time.

The total search time is

$$
\begin{aligned}
&O(\log n) + \\
&\sum_{u \in U(Q_1)} O(\log |P_u|) \le O(\log n) + O(\log n) \cdot O(\log n) \\
&= \mathbf{O(\log^2 n)}
\end{aligned}
$$

The main tree $T$ uses $O(n)$ space. The total size of auxiliary trees $T_u$ is $\sum_{u \in T} |P_u|$. Since $T$ is a balanced tree with depth $O(\log n)$, each point of $P$ is contained in $O(\log n)$ canonical subsets along paths in $T$. Therefore, the total space is $O(n) + \sum_{u \in T} |P_u| = O(n) + O(n \log n) = \mathbf{O(n \log n)}$.

#### Improved Query Times via Fractional Cascading

<img src="https://velog.velcdn.com/images/devjo/post/f9c83d4a-725b-4108-966c-5d37919da39b/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

A method to reduce query time from $O(\log^2 n)$ to $\mathbf{O(\log n)}$. To do this, we must eliminate the inefficiency of repeatedly searching multiple lists with the same keys ($y_{lo}, y_{hi}$).

For an internal node $v$ of the main tree $T$ and its children $v', v''$, we link the auxiliary lists (or arrays) $A, A', A''$ sorted by $y$-coordinates. For each element in $A$, we store pointers to the first items in $A'$ and $A''$ that are greater than or equal to this element.

Performing binary search on the entire $P$ at the root of the main tree $T$ to find the positions of $y_{lo}, y_{hi}$ takes $O(\log n)$ time. Once we know the positions of $y_{lo}, y_{hi}$ at the root, we can determine the corresponding positions in the auxiliary lists $A', A''$ of child nodes $v', v''$ in $O(1)$ time by following pointers. Therefore, the total time is

$$
O(\log n) + O(\log n) \cdot O(1) = \mathbf{O(\log n)}
$$

---

### Geometric Approximation

#### N-Body Problem

In physical simulation, we consider the $n$-body problem where $n$ celestial bodies move under mutual gravitational forces. To compute the motion of each body, we need to compute the sum of gravitational forces from the other $n-1$ bodies, requiring a total of $\mathbf{\Omega(n^2)}$ computations.

#### Well Separated Pairs

<img src="https://velog.velcdn.com/images/devjo/post/fc7eeefa-5348-43fc-80d7-04948751f6b7/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

Given a point set $P \subset \mathbb{R}^d$ and a separation factor $s > 0$, two disjoint sets $A$ and $B$ are said to be $s$-well separated if $A$ and $B$ can each be enclosed in Euclidean balls of radius $r$, and the closest distance between these two balls is at least $sr$.

---

### Coresets for Directional Width

Instead of working with a large set $P$, we extract a relatively small subset $Q \subseteq P$, solve the optimization problem exactly on this small set, and use the result as a good approximation for $P$.

#### $\varepsilon$-Coreset Definition

For a point set $P$, let $f^*(P)$ denote the value of the optimal solution. For $0 < \varepsilon$, a subset $Q \subseteq P$ is an $\varepsilon$-coreset if the relative error incurred by solving the problem on $Q$ is at most $\varepsilon$:

$$
1 - \varepsilon \le \frac{f^*(Q)}{f^*(P)} \le 1 + \varepsilon
$$

The goal is to achieve a small coreset size that depends only on $\varepsilon$, not on $n$.

#### $\alpha$-Fatness

A convex body $K$ is $\alpha$-fat if $K$ is contained in a ball of radius $\lambda_2$ and contains a ball of radius $\lambda_1$, where $\lambda_1 / \lambda_2 = \alpha$.

#### Sphere-Based Sampling

Assume $P$ is contained in a unit ball $B$ and is $\alpha$-fat. Set up a sphere $S$ of radius 2 concentric with $B$. Construct a $\delta$-dense point set $Q$ on $S$ with density $\delta = 9\varepsilon\alpha/4$. For each point $q'$ in $Q$, compute the nearest neighbor $p'$ in $P$, and use the set $C = \{p'\}$ of these points as the coreset.

---

### References

[Original source #1](https://www.cs.cmu.edu/afs/cs/academic/class/15456-s14/Handouts/cmsc754-lects.pdf)
