---
title: 'Heap'
date: '2023-08-22'
tags: ['Data Structure', 'lecture']
---

### Preliminary

A heap can be viewed as a simple tree-based data structure, but in practice it usually follows one of two strategies.

A min-heap satisfies the property that each parent node's value is less than or equal to ($\le$) the values of its children. Therefore, the root node holds the smallest value in the entire tree.

A max-heap satisfies the property that each parent node's value is greater than or equal to ($\ge$) the values of its children. Therefore, the root node holds the largest value in the entire tree.

---

### Basic Structure

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrhJjBCRB95EcVLrwAa5JqPZPD4BboTANzKw&s" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Nodes are stored in an array by sequentially appending values from top to bottom and left to right.

Because an array is used, we need a way to compute the indices of a node's parent and children from a given index. For index $i$, the formulas are:

Parent index: $(i - 1) / 2$, left child: $2i + 1$, right child: $2i + 2$.

Heap insertion is simple, but we must ensure that the heap order is maintained after insertion. The actual insertion is $O(1)$, but restoring heap order costs $O(\log n)$.

Deleting an element must also preserve the heap order, with a time complexity of $O(\log n)$. The new value moved into the deleted position may be too large (in a min-heap) or too small (in a max-heap), so we restore heap order by moving it down the tree, swapping with the smaller (or larger) child as needed.

The simplest way to search in a heap is to linearly scan all entries in the heap array, which yields a time complexity of $O(n)$.

---

### References

[Original source #1](https://mta.ca/~rrosebru/oldcourse/263111/Dsa.pdf)
