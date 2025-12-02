---
title: 'Stack'
date: '2023-08-11'
tags: ['Data Structure', 'lecture']
---

### Preliminary

A stack is a simple data structure that can be accessed only through a single entry point. As a result, it strictly follows the Last In First Out (LIFO) rule: the most recently added item is the first one to be removed.

It supports three core operations:

push places an item on the top of the stack. pop retrieves and removes the item at the top of the stack. peek retrieves the item at the top of the stack without removing it.

---

### Basic Structure

A stack is typically implemented using either an array or a singly linked list.

#### Array-Based Implementation

We add an item at the next available index in the array and increment the upper index (Count). This runs in $O(1)$ time. If the array capacity is exceeded, a resizing algorithm must be invoked, which can cost $O(n)$. The pop operation retrieves the item at the current upper index of the array and decrements the index, also in $O(1)$ time.

#### Linked-List-Based Implementation

When implementing a stack with a singly linked list, we treat the head of the list as the top of the stack.

Regardless of the implementation, the core stack operations—push, pop, and peek—all have constant time complexity $O(1)$.

---

### References

[Original source #1](https://mojing.tistory.com/entry/Data-Structure-%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-%EC%8A%A4%ED%83%9DStack)