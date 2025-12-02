---
title: 'Graph'
date: '2023-08-29'
tags: ['Data Structure', 'lecture']
---

### Preliminary

A graph is a data structure consisting of a set of nodes (or vertices) and a set of edges that connect these vertices. Graphs are used to model relationships between data elements.

---

### Basic Structure

#### Types of Graphs

Directed graphs have edges with a direction. An edge $(u, v)$ means that movement is only allowed from $u$ to $v$.

Undirected graphs have edges without direction. An edge $(u, v)$ allows movement both from $u$ to $v$ and from $v$ to $u$.

A weighted graph assigns a weight or cost to each edge.

A tree is a special type of undirected graph that is connected and acyclic.

#### Graph Representations

An adjacency matrix uses a 2D array $A$ of size $N \\times N$ when there are $N$ vertices. $A[i][j] = 1$ indicates that there is an edge between vertex $i$ and vertex $j$, while $A[i][j] = 0$ indicates no edge. This allows checking the existence of a specific edge in $O(1)$ time. However, for sparse graphs where the number of vertices is large and the number of edges is small, it wastes memory on the order of $O(V^2)$.

An adjacency list stores, for each vertex, a list (linked list or dynamic array) of adjacent vertices. The list for vertex $i$ contains all vertices $j$ directly connected to $i$. Checking whether a specific edge exists can take up to $O(V)$ time.

#### Key Algorithms

Dijkstra's algorithm finds the shortest paths from a single source vertex to all other vertices in a graph with non-negative edge weights. The Bellman–Ford algorithm finds shortest paths in graphs that may contain negative edge weights. The Floyd–Warshall algorithm computes shortest paths between all pairs of vertices.

For minimum spanning trees, Prim's algorithm finds a subgraph of a connected, weighted, undirected graph that connects all vertices with the minimum possible sum of edge weights, and Kruskal's algorithm also finds a spanning tree connecting all vertices with minimal total edge weight.

---

### References

[Original source #1](https://hongcoding.tistory.com/78) 
