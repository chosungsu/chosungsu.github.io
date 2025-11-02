---
title: 'Tree'
date: '2023-08-25'
tags: ['Data Structure', 'Algorithm']
---

### Preliminary

A tree is a nonlinear data structure that expresses hierarchical relationships. It consists of nodes and edges, starting from a single root and can have multiple child nodes.

$$
T = (V, E)
$$

where

$\Rightarrow$ $V$: Set of nodes

$\Rightarrow$ $E$: Connection relationships between nodes, $E \subseteq V \times V$

$\Rightarrow$ The root node has no parent, and all other nodes have exactly one parent.

A tree is a type of graph, defined as an acyclic connected graph.

---

### Basic Tree Terminology

| Term | Definition |
|------|------------|
| root | Starting node of the tree |
| parent | Node that has child nodes |
| child | Node that has a parent node |
| sibling | Nodes that share the same parent |
| leaf | Node with no children |
| height | Distance from root to the deepest node |
| depth | Distance from root to a specific node |
| degree | Number of children a node has |

---

### Mathematical Properties of Trees

$\Rightarrow$ Number of edges

$$
E = V - 1
$$

$\Rightarrow$ Maximum number of nodes in a binary tree

$$
N_{\text{max}} = 2^{h+1} - 1
$$

$\Rightarrow$ Minimum height of a binary tree

$$
h_{\text{min}} = \lfloor \log_2 (n) \rfloor
$$

$\Rightarrow$ Average depth (under uniform distribution)

$$
E[\text{depth}] = O(\log n)
$$

---

### Types of Trees

| Type | Description |
|------|-------------|
| General Tree | Tree that can have an arbitrary number of children |
| Binary Tree | Each node has at most 2 children |
| Full Binary Tree | Binary tree where all levels are completely filled |
| Complete Binary Tree | Tree where only the last level is filled from left to right |
| Balanced Tree | Tree where the height difference between left and right children of all nodes is within a certain level |
| Search Tree | Tree with ordering property for keys (e.g., BST, AVL, Red-Black) |

---

### Tree Traversal

The process of visiting all nodes of a tree in a specific order. For binary trees, there are three basic traversal methods:

#### 1. Preorder

Root → Left → Right

$$
\text{Preorder}(T) = [\text{root}, \text{left subtree}, \text{right subtree}]
$$

#### 2. Inorder

Left → Root → Right

$$
\text{Inorder}(T) = [\text{left subtree}, \text{root}, \text{right subtree}]
$$

This method is used to obtain ascending sorted results in a binary search tree (BST).

#### 3. Postorder

Left → Right → Root

$$
\text{Postorder}(T) = [\text{left subtree}, \text{right subtree}, \text{root}]
$$

#### 4. Level Order

Visit each level from left to right, typically implemented using a queue.

---

### Binary Search Tree (BST)

In a binary search tree, each node's key satisfies the following condition:

$$
\forall x \in T, \quad \text{key}(L(x)) < \text{key}(x) < \text{key}(R(x))
$$

where

$\Rightarrow$ $L(x)$: Left subtree

$\Rightarrow$ $R(x)$: Right subtree

#### BST Search Process

$\Rightarrow$ Start from the root

$\Rightarrow$ If the target key is less than the current node, go left; if greater, go right

$\Rightarrow$ Repeat until the key is found or a leaf is reached

Average time complexity: $O(\log n)$

Worst case (sorted input): $O(n)$

---

### Balanced Binary Search Tree

The key is to maintain tree height at $O(\log n)$ to preserve efficiency of search, insertion, and deletion operations.

#### AVL Tree

Maintains the height difference between the left and right subtrees of each node to be at most 1.

$$
|\text{height}(L(x)) - \text{height}(R(x))| \le 1
$$

When balance is broken, it is restored through rotation operations.

| Rotation Type | Situation | Description |
|--------------|-----------|-------------|
| LL Rotation | Left child of left child is heavy | Right rotation |
| RR Rotation | Right child of right child is heavy | Left rotation |
| LR Rotation | Right child of left child is heavy | Left-right rotation |
| RL Rotation | Left child of right child is heavy | Right-left rotation |

Search: $O(\log n)$

Insertion/Deletion: $O(\log n)$

#### Red-Black Tree

A red-black tree is a type of binary search tree that maintains balance using node colors.

$\Rightarrow$ Each node is red or black.

$\Rightarrow$ The root is always black.

$\Rightarrow$ All leaves (NIL) are black.

$\Rightarrow$ Children of red nodes are all black.

$\Rightarrow$ All paths from root to leaves have the same number of black nodes.

#### Mathematical Properties

The maximum height of a red-black tree is slightly higher than that of an AVL tree but still logarithmic.

$$
h \le 2 \log_2 (n + 1)
$$

That is, all operations are performed in $$O(\log n)$$ time.

---

### Space and Time Complexity

| Operation | Average Time | Worst Time | Space Complexity |
|-----------|--------------|------------|------------------|
| Search | $$O(\log n)$$ | $$O(n)$$ | $$O(n)$$ |
| Insert | $$O(\log n)$$ | $$O(n)$$ | $$O(1)$$ |
| Delete | $$O(\log n)$$ | $$O(n)$$ | $$O(1)$$ |
| Traversal | $$O(n)$$ | $$O(n)$$ | $$O(n)$$ |

---

### References

[Original source #1](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/)

[Original source #2](https://web.stanford.edu/class/archive/cs/cs161/cs161.1232/)

[Original source #3](https://sp21.datastructur.es/)
