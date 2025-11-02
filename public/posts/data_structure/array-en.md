---
title: 'Array'
date: '2023-08-04'
tags: ['Data Structure', 'Algorithm']
---

### Preliminary

An array is a linear data structure that stores data of the same type in contiguous memory space. The key is index-based access, where the memory address of an element is calculated arithmetically, allowing $O(1)$ time access.

$$
\text{Address}(A[i]) = \text{Base}(A) + i \times \text{size\_of(element)}
$$

This formula means that arrays have an arithmetic memory layout, with all elements placed at equal intervals.

---

### Time Complexity Analysis

| Operation | Average Time Complexity | Description |
|----------|------------------------|-------------|
| Access | $O(1)$ | Direct access via index |
| Search | $O(n)$ | Sequential search required |
| Insertion | $O(n)$ | Requires shifting intermediate elements |
| Deletion | $O(n)$ | Shifting occurs |

Insertion/deletion at the end can be optimized to $O(1)$.

---

### Memory Structure and Cache Locality

Arrays maximize spatial locality. CPU caches fetch adjacent memory at once, making sequential access efficient.

$$
\text{Cache Miss Rate} \propto \frac{\text{stride}}{\text{cache line size}}
$$

As stride increases, the cache miss rate increases, so contiguous access is advantageous for performance. For example, column-major access in row-major storage is inefficient.

---

### Multi-dimensional Array

The address of element $A[i_1][i_2] \ldots [i_n]$ of an $n$-dimensional array is

$$
\begin{aligned}
& \text{Address}(A[i_1, i_2, \ldots, i_n]) \\
&= \text{Base}(A) + \sum_{k=1}^{n} i_k \times \prod_{l=k+1}^{n} N_l
\end{aligned}
$$

where $N_l$ is the size of each dimension. This is the same concept as tensor indexing. In practice, PyTorch and TensorFlow follow this principle when computing tensor memory layouts.

---

### Mathematical Correspondence between Arrays and Vectors

Arrays can be mathematically interpreted as

$$
A = [a_1, a_2, \ldots, a_n] \in \mathbb{R}^n.
$$

That is, an array is an element of a vector space, and linear algebra operations such as inner product, norm, and projection are applicable.

$$
\mathbf{a} \cdot \mathbf{b} = \sum_{i=1}^{n} a_i b_i
$$

This is implemented in practice as ```numpy.dot()``` or BLAS-level vector operations.

---

### Sparse Array

Arrays where most elements are zero are converted to sparse representation to improve space efficiency.

#### Representative formats

$\Rightarrow$ COO (Coordinate Format)

$$
\text{COO} = \{(i, j, A_{ij}) \mid A_{ij} \neq 0\}
$$

$\Rightarrow$ CSR (Compressed Sparse Row)

Separates into values, indices, and indptr arrays to store only non-zero elements.

The complexity of sparse matrix multiplication is $O(k n)$, which is advantageous when $k \ll n^2$ where $k$ is the number of non-zero elements.

---

### Optimization Principles of Array-Based Algorithms

The performance of array-based operations depends heavily on memory access patterns and the degree of vectorization.

#### 1. Loop Vectorization

Compilers can convert loops with stride=1 and no dependencies into SIMD instructions.

$$
\text{stride} = 1 \quad \text{and} \quad \text{no dependency between iterations}
$$

#### 2. Memory Alignment

Access efficiency increases when addresses are aligned to 8, 16, or 32-byte boundaries.

$$
\text{address}(A[i]) \bmod 16 = 0
$$

---

### Linear Algebraic Interpretation of Array Operations

Arrays are the basic unit of linear operations. For example, matrix multiplication is

$$
C_{ij} = \sum_{k=1}^{n} A_{ik} B_{kj}.
$$

Considering cache efficiency, it is desirable to access $A$ in row order and $B$ in column order. This approach is actually the core of BLAS Level-3 (GEMM) implementations.

---

### Generalization to Tensors

Arrays are generalized to tensors by extending dimensions.

$$
T \in \mathbb{R}^{N_1 \times N_2 \times \ldots \times N_n}
$$

Each element access is computed as

$$
T[i_1, i_2, \ldots, i_n] = \sum_{k=1}^{n} W_k \prod_{j=k+1}^{n} i_j.
$$

This is the fundamental structure of deep learning for modeling high-dimensional data (images, audio, time series, etc.).

---

### Application Examples

$\Rightarrow$ Sorting algorithm input

QuickSort, MergeSort, and HeapSort are all array-based, and index access efficiency is important.

$\Rightarrow$ Time series analysis

$$
X(k) = \sum_{n=0}^{N-1} x(n)e^{-j2\pi kn/N}
$$

FFT (Fast Fourier Transform) is performed on arrays.

---

### Limitations and Alternatives

$\Rightarrow$ Inefficient dynamic insertion/deletion due to fixed-size structure

$\Rightarrow$ Stride mismatch problem in multidimensional access

$\Rightarrow$ Memory overhead and alignment loss

From these constraints, Linked List, Dynamic Array (Vector), and Sparse Matrix have been developed.

---

### References

[Original source #1](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/)

[Original source #2](https://see.stanford.edu/Course/CS106B)

[Original source #3](https://numpy.org/devdocs/user/basics.memory.html)
