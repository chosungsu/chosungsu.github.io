---
title: 'Linked List'
date: '2023-08-08'
tags: ['Data Structure', 'lecture']
---

### Preliminary

A linked list can be thought of as a sequence of nodes from a high-level perspective. Each node has at least one pointer to the next node, and the last node indicates the end of the list through a null pointer.

Linked lists always maintain head and tail pointers so that insertion at the front or back of the list becomes a constant time ($O(1)$) operation. Random insertion does not fall into this category and is a linear time ($O(n)$) operation.

---

### Basic Structure

Insertion is one of the biggest advantages of linked lists. By maintaining pointers (or references) to the head and tail nodes, adding a node to the front or back of the list becomes an $O(1)$ operation.

However, an exception occurs when performing insertion before a node that is neither the head nor the tail in a singly linked list. In this case, we must traverse the list to find the predecessor of the specified node where insertion is to occur. This traversal results in $O(n)$ execution time.

A major advantage of linked lists is that the list size adjusts dynamically, providing dynamic resizing without the copy penalty that arrays or vectors eventually incur.

#### 1. Singly Linked List

<img src="https://velog.velcdn.com/images/devjo/post/1f21231d-8d8c-480f-8ab7-e3e7aaa2b3ed/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:50;" />

Each node consists of a value and a reference to the next node in the list. Typically, insertion into a linked list means adding a node to the tail of the list.

Searching a linked list involves traversing the list and comparing the desired value with each node's value, with an execution time of $O(n)$.

Deleting a node is not complicated but involves many cases: empty list, single node, head node, tail node, middle node, and non-existent item. Generally, deletion is an $O(n)$ operation, and becomes an $O(1)$ operation only when deletion occurs at the front of the list.

Singly linked lists can only move forward, so reverse traversal is very inefficient. We must traverse the list from the beginning each time to find the predecessor of each node. Since $O(n)$ is required for each node, the entire reverse traversal incurs $O(n^2)$ cost.

#### 2. Doubly Linked List

<img src="https://velog.velcdn.com/images/devjo/post/337023cb-91b4-4a83-a6be-bd861a55461f/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:50;" />

A doubly linked list is very similar to a singly linked list, but each node has references to both the next node and the previous (Prev) node.

Unlike a singly linked list, when inserting a new node, the previous pointer ($n.Prev$) must also be bound to the correct value. The execution time is $O(1)$.

Deletion in a doubly linked list uses the same cases as a singly linked list, but additionally requires binding the previous (Prev) reference. The execution time is $O(n)$. When deleting node $n$, we update both $n.Prev.Next$ and $n.Next.Prev$ to skip over $n$.

Doubly linked lists make reverse traversal very simple and efficient because each node knows its previous node. Unlike the $O(n^2)$ of singly linked lists, it is performed in $O(n)$ time.

---

### References

[Original source #1](https://mta.ca/~rrosebru/oldcourse/263111/Dsa.pdf)
