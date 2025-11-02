---
title: 'Queue'
date: '2023-08-15'
tags: ['Data Structure', 'Algorithm']
---

### Preliminary

A queue is a linear data structure that follows the FIFO (First-In, First-Out) principle. It is a structure where data that enters first is processed first, similar to a waiting line in reality.

$$
\begin{aligned}
&Q = [x_1, x_2, \dots, x_n],\\
&enqueue(x_{n+1}) \Rightarrow [x_1, x_2, \dots, x_{n+1}], \\
&dequeue(Q) \Rightarrow [x_1, \dots, x_n]
\end{aligned}
$$

---

### Main Operations and Time Complexity

| Operation | Description | Time Complexity |
|-----------|-------------|-----------------|
| enqueue | Insert data at rear of queue | $O(1)$ |
| dequeue | Delete data from front of queue | $O(1)$ |
| peek | View element at front | $O(1)$ |
| isEmpty | Check if queue is empty | $O(1)$ |

Since all queue operations are performed only at both ends, index-based random access is not possible.

---

### Queue Implementation Methods

#### 1. Array-based Queue

A queue is constructed using a fixed-size array. Insertion and deletion are performed by moving front and rear pointers.

$$
Q = [\_, 10, 20, 30, \_, \_] \Rightarrow front=1, rear=3
$$

However, the array size is limited, and even if space at the front becomes empty after deletion, it is difficult to reuse.

#### 2. Circular Queue

The end and beginning of the array are connected to prevent space waste.

$$
rear = (rear + 1) \bmod N, \quad front = (front + 1) \bmod N
$$

$\Rightarrow$ Overflow when space is full

$\Rightarrow$ Underflow when front and rear are equal

Circular queues are commonly used to improve memory utilization efficiency in fixed array structures.

#### 3. Linked List-based Queue

A queue is constructed by dynamically allocating nodes. Insertion uses the rear pointer, and deletion uses the front pointer.

$$
[front] \rightarrow [10|next] \rightarrow [20|next] \rightarrow [30|NULL] \Leftarrow [rear]
$$

Memory can be reused, and there is no fixed-size constraint.

---

### Priority Queue

Each element of the queue has a priority, and elements with higher priority are processed first instead of following the usual FIFO.

$$
Q = [(A,3), (B,1), (C,2)] \Rightarrow \text{dequeue}() \Rightarrow (A,3)
$$

This structure is implemented using a heap.

$\Rightarrow$ Insertion: $O(\log n)$

$\Rightarrow$ Deletion (max/min extraction): $O(\log n)$

$\Rightarrow$ Access: $O(1)$

#### Mathematical Definition

$$
\text{PriorityQueue} = \{ (x_i, p_i) \mid p_i \in \mathbb{R},\ \text{ordered by } p_i \}
$$

$$
\text{dequeue}() = \arg\max_{x_i}(p_i)
$$

---

### Queueing Theory

Beyond a simple programming concept, queues form the core mathematical model of stochastic service systems.

$$
\text{M/M/1 Queue}
$$

$$
\lambda = \text{average arrival rate}, \quad \mu = \text{average service rate}
$$

#### Average Waiting Time (Little's Law)

$$
L = \lambda W
$$

$\Rightarrow$ $L$: Average number of customers in the system

$\Rightarrow$ $W$: Average customer sojourn time

#### Average Queue Length

$$
L_q = \frac{\rho^2}{1 - \rho}, \quad \rho = \frac{\lambda}{\mu}
$$

Such probabilistic models are applied to server load prediction, OS scheduler design, network traffic analysis, etc.

---

### Queue Limitations and Optimization

$\Rightarrow$ Overflow/Underflow occurs in fixed-size queues

$\Rightarrow$ Lock contention occurs in multithreaded environments with high insertion frequency

---

### References

[Original source #1](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-046j-design-and-analysis-of-algorithms-spring-2015/)

[Original source #2](https://cs144.github.io/)

[Original source #3](https://cs162.org/)
