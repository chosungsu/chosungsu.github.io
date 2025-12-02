---
title: 'Tree'
date: '2023-08-25'
tags: ['Data Structure', 'lecture']
---

### Preliminary

A tree is a type of graph, defined as an acyclic connected graph.

A binary search tree (BST) is very easy to understand. It starts with a root node with value $x$, where the left subtree of $x$ contains nodes with values less than $x$, and the right subtree of $x$ contains nodes with values greater than or equal to $x$. Every node follows the same rule for its own left and right subtrees.

---

### Basic Structure

Assuming the tree is reasonably balanced, insertion is an $O(\log n)$ operation.

The insertion algorithm is divided into two parts. The first non-recursive algorithm handles the critical base case of checking if the tree is empty. If the tree is empty, it creates a root node and terminates. In all other cases, it proceeds recursively to find the first appropriate position in the tree where the new value should go.

We compare whether the new value is less than the current node's value (current.Value), moving to the left subtree if smaller, or to the right subtree if greater than or equal.

BST search is simpler than insertion. It performs a binary chop, with an execution time of $\mathbf{O(\log n)}$.

---

### Tree Traversal

Tree traversal is the process of visiting all nodes of a tree in a specific order. For binary trees, there are three basic traversal methods:

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

This method is used to obtain sorted results in ascending order in a binary search tree (BST).

#### 3. Postorder

Left → Right → Root

$$
\text{Postorder}(T) = [\text{left subtree}, \text{right subtree}, \text{root}]
$$

---

### References

[Original source #1](https://mta.ca/~rrosebru/oldcourse/263111/Dsa.pdf)
