---
title: 'Graph'
date: '2023-08-29'
tags: ['Data Structure', 'Algorithm']
---

### Preliminary

A graph is a nonlinear data structure consisting of a set of vertices and edges.

$$
G = (V, E)
$$

where

$\Rightarrow$ $V = \{v_1, v_2, \ldots, v_n\}$: Set of vertices

$\Rightarrow$ $E \subseteq V \times V$: Set of edges

$\Rightarrow$ $|V| = n, |E| = m$

Graphs with directionality are called directed graphs, while those without are called undirected graphs.

---

### Types of Graphs

| Type | Description |
|------|-------------|
| Undirected Graph | Edges have no direction |
| Directed Graph | Edges have direction |
| Weighted Graph | Each edge has a weight $w(u,v)$ |
| Complete Graph | All vertices are connected to each other |
| Connected Graph | A path exists between any two vertices |
| Tree | Connected graph with no cycles |
| DAG (Directed Acyclic Graph) | Graph with directionality and no cycles |
| Bipartite Graph | Vertices can be partitioned into two sets, and edges only connect vertices from different sets |

---

### Graph Representation Methods

#### 1. Adjacency Matrix

$$
A[i][j] = 
\begin{cases}
1, & (v_i, v_j) \in E \\
0, & \text{otherwise}
\end{cases}
$$

Space complexity: $O(n^2)$

Advantage: Edge existence check is $O(1)$

Disadvantage: Inefficient for sparse graphs

#### 2. Adjacency List

Adjacent vertices connected to each vertex are stored as a list.

Space complexity: $O(n + m)$

Efficient for sparse graphs, with fast search operations.

---

### Basic Graph Operations

| Operation | Description | Average Time Complexity |
|-----------|-------------|------------------------|
| Search | DFS, BFS | $O(V + E)$ |
| Add Edge | Insert edge between two vertices | $O(1)$ |
| Delete Edge | Remove edge | $O(E)$ |
| Adjacent Nodes Query | Search adjacency list of a specific vertex | $O(\deg(v))$ |

---

### Graph Traversal Algorithms

#### 1. Depth-First Search (DFS)

Starting from the root node, this method explores one path to the end, then backtracks. It uses a stack (or recursive calls).

From a mathematical perspective, DFS is a recursive graph traversal function with the following recurrence relation:

$$
DFS(v) =
\begin{cases}
\text{visit}(v), \\
\forall (v, u) \in E, \text{ if } u \text{ not visited, } DFS(u)
\end{cases}
$$

Time complexity: $O(V + E)$

#### 2. Breadth-First Search (BFS)

This method explores nodes closest to the root first, using a queue, and is used for shortest path finding.

$$
\text{BFS}(v) =
\text{enqueue}(v), \;
\text{while } Q \neq \emptyset :
\text{dequeue}(x), \;
\forall (x,u) \in E \text{ then enqueue}(u)
$$

Time complexity: $O(V + E)$

---

### Minimum Spanning Tree (MST)

The problem of finding a tree that connects all vertices in a weighted graph while minimizing the sum of edge weights.

#### 1. Kruskal's Algorithm

$\Rightarrow$ Sort edges in ascending order of weight

$\Rightarrow$ Add edges without creating cycles (using Union-Find)

Time complexity: $O(E \log E)$

#### 2. Prim's Algorithm

$\Rightarrow$ Start from one vertex

$\Rightarrow$ Repeatedly add the vertex closest to the current tree

Time complexity: $O(E \log V)$ (when using a heap)

---

### Shortest Path Algorithms

#### 1. Dijkstra's Algorithm

Finds the shortest path from one vertex in a graph without negative edge weights. Uses a priority queue.

$$
d[v] = \min(d[v], d[u] + w(u,v))
$$

Time complexity: $O((V + E)\log V)$

#### 2. Bellman-Ford Algorithm

Allows negative edge weights and can detect negative cycles.

$$
d[v] = \min(d[v], d[u] + w(u,v)), \; \forall (u,v) \in E
$$

Time complexity: $O(VE)$

#### 3. Floyd-Warshall Algorithm

A dynamic programming-based algorithm that finds the shortest path between all pairs of vertices.

$$
D^{(k)}[i][j] = \min(D^{(k-1)}[i][j], D^{(k-1)}[i][k] + D^{(k-1)}[k][j])
$$

Time complexity: $O(V^3)$

---

### Time and Space Complexity Summary

| Algorithm | Time Complexity | Space Complexity | Characteristics |
|-----------|----------------|-------------------|-----------------|
| DFS | $$O(V + E)$$ | $$O(V)$$ | Depth-first search |
| BFS | $$O(V + E)$$ | $$O(V)$$ | Shortest path search |
| Dijkstra | $$O((V + E)\log V)$$ | $$O(V)$$ | No negative weights |
| Bellman-Ford | $$O(VE)$$ | $$O(V)$$ | Allows negative weights |
| Floyd-Warshall | $$O(V^3)$$ | $$O(V^2)$$ | All pairs shortest path |
| Kruskal | $$O(E\log E)$$ | $$O(V)$$ | Minimum spanning tree |
| Prim | $$O(E\log V)$$ | $$O(V)$$ | MST, heap-based |

---

### References

[Original source #1](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/)

[Original source #2](https://web.stanford.edu/class/archive/cs/cs161/cs161.1232/)

[Original source #3](https://cs170.org/)
