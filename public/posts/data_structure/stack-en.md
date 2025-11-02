---
title: 'Stack'
date: '2023-08-11'
tags: ['Data Structure', 'Algorithm']
---

### Preliminary

A stack is a linear data structure with LIFO (Last-In, First-Out) structure. The element inserted last is deleted first.

$$
\begin{aligned}
&S = [x_1, x_2, \ldots, x_n], \\
&\text{push}(S, x_{n+1}) \Rightarrow [x_1, ..., x_n, x_{n+1}] \\
&\text{pop}(S) \Rightarrow [x_1, ..., x_{n-1}]
\end{aligned}
$$

A stack is a non-circular, unidirectional structure where insertion (push) and deletion (pop) occur only at one end (top).

---

### Main Operations and Time Complexity

| Operation | Description | Time Complexity |
|-----------|-------------|-----------------|
| push | Insert element at top | $O(1)$ |
| pop | Remove element from top | $O(1)$ |
| peek(top) | Return top element | $O(1)$ |
| isEmpty | Check if stack is empty | $O(1)$ |

Stacks can be implemented using arrays or linked lists.

$\Rightarrow$ Array-based stack: Fast access through index operations, but fixed size

$\Rightarrow$ Linked list-based stack: Variable size and no overflow

---

### Memory Structure and Operation Principle

Stacks operate in actual memory as a call stack during program execution.

$\Rightarrow$ Each function call creates a stack frame.

$\Rightarrow$ Frames store local variables, parameters, return addresses, etc.

$\Rightarrow$ When a function terminates, its frame is popped.

$$
\text{Stack Frame} = (\text{Local Variables}, \text{Return Address}, \text{Saved Registers})
$$

This structure is the foundation of recursion and context switching.

---

### Memory and Overflow Analysis

Since stacks have fixed size, excessive recursive calls or infinite loops cause stack overflow.

$$
T_{max depth} = \frac{M_{stack}}{S_{frame}}
$$

$M_{stack}$: Total stack memory size

$S_{frame}$: Size of each stack frame

Therefore, deep recursion can be solved by converting to Tail Recursion Optimization (TCO) or an explicit stack.

---

### Practical Applications

#### 1. Function Calls and Recursion (Call Stack)

All function calls are performed based on a stack.

#### 2. DFS (Depth-First Search)

In graph traversal, a stack is used instead of recursion to store the traversal state.

#### 3. Undo/Redo System

Text editors, browsers, etc., manage operation history as a stack.

#### 4. Parentheses Validation

Validation is possible by pushing open parentheses and popping closing parentheses.

#### 5. Backtracking

In maze traversal, permutation generation, etc., the backtracking path is stored in a stack.

---

### References

[Original source #1](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-046j-design-and-analysis-of-algorithms-spring-2015/)

[Original source #2](https://web.stanford.edu/class/archive/cs/cs103/cs103.1206/)

[Original source #3](https://inst.eecs.berkeley.edu/~cs61c/)
