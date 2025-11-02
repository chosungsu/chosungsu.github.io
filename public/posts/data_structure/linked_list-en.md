---
title: 'Linked List'
date: '2023-08-08'
tags: ['Data Structure', 'Algorithm']
---

### Preliminary

A linked list is a collection of nodes, where each node contains data and the address (pointer) of the next node. Unlike arrays, linked lists are not stored contiguously in memory, and offer high flexibility in that they allow dynamic size adjustment.

$$
\text{Node}_i = (data_i, next_i)
$$

The core of linked lists is pointer-based traversal and maintaining the link structure.

---

### Basic Structure

#### 1. Singly Linked List

Each node has one pointer to the next node, and the last node points to a `NULL` pointer.

$$
[data_1|next] \rightarrow [data_2|next] \rightarrow [data_3|NULL]
$$

#### 2. Doubly Linked List

Each node has both a previous (`prev`) and a next (`next`) pointer.

$$
[NULL|data_1|next] \leftrightarrow [prev|data_2|next] \leftrightarrow [prev|data_3|NULL]
$$

#### 3. Circular Linked List

The `next` of the last node points to the first node, forming a circular structure.

$$
[data_1|next] \rightarrow [data_2|next] \rightarrow [data_3|next] \rightarrow (back\ to\ data_1)
$$

---

### Time Complexity

| Operation | Average Time Complexity | Description |
|----------|------------------------|-------------|
| Search | $O(n)$ | Sequential traversal required |
| Insertion | $O(1)$ | Only node pointer manipulation needed |
| Deletion | $O(1)$ | Only node pointer changes performed |

However, insertion/deletion is $O(1)$ only when the pointer to the node is already known. Random access is not possible.

---

### Memory Structure

Linked lists consist of non-contiguous memory blocks. Therefore, cache efficiency is low, but they are advantageous for dynamic memory allocation.

$$
\text{Address}(Node_i) = \text{malloc}(sizeof(Node))
$$

This means that each node is scattered across the heap memory area.

#### Advantages

$\Rightarrow$ No data movement needed during insertion/deletion

$\Rightarrow$ Dynamic size adjustment possible

#### Disadvantages

$\Rightarrow$ Index access not possible

$\Rightarrow$ Memory overhead due to additional pointer storage

---

### Mathematical Modeling

Linked lists can be modeled as directed graphs. Considering nodes as vertices and pointers as edges:

$$
G = (V, E), \quad V = \{v_1, v_2, ..., v_n\}, \quad E = \{(v_i, v_{i+1})\}
$$

In this case, singly linked lists correspond to directed acyclic graphs (DAGs), and circular linked lists correspond to cycle graphs.

---

### Advanced Structures and Variations

#### 1. Skip List

A structure that reduces search complexity to $O(\text{log} n)$ by having multi-level indices. The average number of search steps is

$$
E[h] = \text{log}_{1/p}n,
$$

where $p$ is the probability that a node is selected at each level.

#### 2. XOR Linked List

A technique that reduces pointer space by half by combining prev and next pointers using XOR operation.

$$
link=prev \oplus next
$$

When restoring:

$$
next=prev \oplus link
$$

This approach saves memory but is disadvantageous for debugging and garbage collection (GC).

---

### Dynamic Memory Management

Linked lists perform dynamic memory allocation on each insertion/deletion. As a result, actual performance depends heavily on allocation/deallocation costs.

$$
T_{insert}=O(1)+T_{alloc}
$$

In C/C++, malloc/free is used, and in Python, gc-based object management is performed.

---

### Limitations and Improvements

$\Rightarrow$ Memory fragmentation due to pointer structure

$\Rightarrow$ Random access not possible

$\Rightarrow$ Pointer errors and dangling pointer risks

Hybrid Memory Models (e.g., Rope, Gap Buffer) and container abstraction (Vector + List hybrid structure) are being researched to address these issues.

---

### References

[Original source #1](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/)

[Original source #2](https://web.stanford.edu/class/cs166/)

[Original source #3](https://www.cs.cmu.edu/~15122/)
