---
title: 'Hash'
date: '2023-08-18'
tags: ['Data Structure', 'Algorithm']
---

### Preliminary

A hash table is a data structure that maps keys to values, enabling data access in constant time ($O(1)$) on average.

A hash function maps keys to specific buckets or slots.

$$
h: K \rightarrow \{0, 1, \ldots, m-1\}
$$

where

$\Rightarrow$ $K$: Set of keys

$\Rightarrow$ $m$: Table size (number of buckets)

$\Rightarrow$ $h(k)$: Index to which key $k$ is mapped

---

### Basic Principles

$\Rightarrow$ When inserting data, pass the key through the hash function to calculate an index.

$\Rightarrow$ Store the value in the bucket corresponding to the calculated index.

$\Rightarrow$ When searching for data, use the same hash function to find the corresponding bucket.

$$
\text{index} = h(\text{key}) \bmod m
$$

Theoretically, $O(1)$ access is possible, but search time can increase to $O(n)$ when collisions occur.

---

### Hash Function Design

#### 1. Division Method

$$
h(k) = k \bmod m
$$

$\Rightarrow$ Simple and fast, but $m$ should be chosen as a prime to reduce collisions.

$\Rightarrow$ If $m$ is a power of 2, lower bit patterns repeat, degrading performance.

#### 2. Multiplication Method

$$
h(k) = \lfloor m (kA \bmod 1) \rfloor, \quad 0 < A < 1
$$

$\Rightarrow$ Multiply by real number $A$, then extract only the fractional part to compute the index.

$\Rightarrow$ $A = (\sqrt{5} - 1)/2$ empirically yields good results.

#### 3. Mid-Square Method

$$
h(k) = k^2
$$

Obtains uniform distribution when there is bias in upper/lower bits of data.

#### 4. Universal Hashing

A method that randomly selects one hash function from a set of multiple hash functions.

$$
h_{a,b}(k) = ((a k + b) \bmod p) \bmod m
$$

where

$\Rightarrow$ $p$: Sufficiently large prime

$\Rightarrow$ $a, b$: Random integers, $0 < a < p, 0 \le b < p$

This guarantees average performance against adversarial input.

---

### Collision Resolution Techniques

#### 1. Chaining

Each bucket has a linked list to store multiple items at the same index when collisions occur.

$\Rightarrow$ Insertion: $O(1)$

$\Rightarrow$ Search: Average $O(1)$, Worst $O(n)$

Average search time is proportional to the load factor.

$$
\alpha = \frac{n}{m}
$$

where

$\Rightarrow$ $n$: Number of stored elements

$\Rightarrow$ $m$: Number of buckets

Average search time:

$$
T_{\text{avg}} = O(1 + \alpha)
$$

#### 2. Open Addressing

All elements are stored in the table itself, and when a collision occurs, another bucket is probed.

$\Rightarrow$ Linear Probing

$$
h_i(k) = (h(k) + i) \bmod m
$$

Simple but clustering occurs, degrading performance. Average search time is around $O(\frac{1}{1 - \alpha})$.

$\Rightarrow$ Quadratic Probing

$$
h_i(k) = (h(k) + c_1 i + c_2 i^2) \bmod m
$$

Primary clustering is mitigated, but collisions are still possible in some patterns.

$\Rightarrow$ Double Hashing

$$
h_i(k) = (h_1(k) + i \cdot h_2(k)) \bmod m
$$

Uses two different hash functions and effectively prevents clustering. $h_2(k)$ must not be 0.

---

### Dynamic Hashing

#### Extendible Hashing

Bucket pointers are managed as a tree (directory) to split buckets when needed.

$\Rightarrow$ Split bucket when collision occurs

$\Rightarrow$ Search is $O(1)$, directory access is logarithmic

#### Linear Hashing

Buckets are expanded sequentially, distributing rehash costs.

$\Rightarrow$ Probabilistically splits only 1 bucket per insertion

$\Rightarrow$ Average restructuring cost: $O(1)$

---

### Hash Table Limitations and Optimization

$\Rightarrow$ Overflow/Underflow can occur in fixed-size hash tables

$\Rightarrow$ Lock contention occurs in multithreaded environments with high insertion frequency

---

### References

[Original source #1](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/)

[Original source #2](https://web.stanford.edu/class/archive/cs/cs161/cs161.1232/)

[Original source #3](https://sp21.datastructur.es/)
