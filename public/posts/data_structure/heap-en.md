---
title: 'Heap'
date: '2023-08-22'
tags: ['Data Structure', 'Algorithm']
---

### Preliminary

A heap is a data structure in the form of a complete binary tree, where the parent node is always greater than or equal to its children (max heap) or always less than or equal to its children (min heap).

$$
\text{Max Heap: } A[\text{parent}(i)] \geq A[i]
$$

$$
\text{Min Heap: } A[\text{parent}(i)] \leq A[i]
$$

Due to this property, heaps are widely used for efficient implementation of priority queues. Additionally, heap sort guarantees stable performance ($O(n \log n)$) among sorting algorithms.

---

### Structural Properties of Heap

Heaps satisfy the following two properties:

$\Rightarrow$ Shape Property

The tree must maintain a complete binary tree structure. That is, all levels except the last are full, and the last level is filled from left to right.

$\Rightarrow$ Heap Property

The key value of each node must maintain order between the parent node and child nodes.

$$
\forall i,\  \text{key}(\text{parent}(i)) \ge \text{key}(i) \quad (\text{Max Heap})
$$

---

### Heap Index Structure

Although heaps are tree structures, they can be efficiently represented as arrays.

| Relation | Formula |
|----------|---------|
| Parent index | $$\text{parent}(i) = \lfloor i/2 \rfloor$$ |
| Left child | $$\text{left}(i) = 2i$$ |
| Right child | $$\text{right}(i) = 2i + 1$$ |

For example, the array

$$
A = [16, 14, 10, 8, 7, 9, 3, 2, 4, 1]
$$

represents the following heap:

$$
16 \rightarrow (14, 10) \rightarrow (8, 7, 9, 3) \rightarrow (2, 4, 1)
$$

---

### Heap Operations and Time Complexity

| Operation | Description | Time Complexity |
|-----------|-------------|-----------------|
| heapify | Convert subtree to heap | $O(\log n)$ |
| build-heap | Convert entire array to heap structure | $O(n)$ |
| insert | Insert new element and restore heap property | $O(\log n)$ |
| extract-max/min | Remove root element and restore | $O(\log n)$ |
| peek | Check root value | $O(1)$ |

---

### Build-Heap Algorithm

A process of converting a given array $A[1 \ldots n]$ into a heap. A bottom-up (Heapify Down) approach is more efficient than top-down insertion.

$\Rightarrow$ Start from non-leaf nodes

$\Rightarrow$ For each node, compare with children and swap to satisfy heap property

$\Rightarrow$ Repeat up to the root

$$
\text{for } i = \lfloor n/2 \rfloor \text{ downto } 1: \text{heapify}(A, i)
$$

---

### Mathematical Analysis of Fibonacci Heap

A Fibonacci heap is composed of an implicit set of trees, improving the average time complexity of insert, minimum extraction, and key decrease operations.

| Operation | Average Time | Worst Time |
|-----------|--------------|------------|
| insert | $$O(1)$$ | $$O(\log n)$$ |
| find-min | $$O(1)$$ | $$O(1)$$ |
| extract-min | $$O(\log n)$$ | $$O(\log n)$$ |
| decrease-key | $$O(1)$$ | $$O(\log n)$$ |

#### Relationship between Number of Nodes and Height

$$
n \ge F_{h+2} - 1
$$

where $$F_k$$ is the $k$th element of the Fibonacci sequence. From this equation, we can derive that the height of the heap is $$O(\log_\phi n)$$ (φ is the golden ratio).

---

### References

[Original source #1](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/)

[Original source #2](https://web.stanford.edu/class/archive/cs/cs161/cs161.1232/)

[Original source #3](https://sp21.datastructur.es/)
