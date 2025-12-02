---
title: 'Queue'
date: '2023-08-15'
tags: ['Data Structure', 'lecture']
---

### Preliminary

A queue is a linear data structure that follows the FIFO (First-In, First-Out) principle. That is, the item that enters the queue first is processed first, the second item is processed second, and so on.

It supports three core operations:

Enqueue places an item at the back of the queue. Dequeue retrieves and removes the item at the front of the queue. Peek retrieves the item at the front of the queue without removing it.

---

### Basic Structure

#### A Standard Queue

It can be implemented efficiently using a singly linked list.

Insertion at the tail of a singly linked list runs in $O(1)$ time. Since a queue always removes items only from the head, removing the head element of a singly linked list also runs in $O(1)$ time.

#### Priority Queue

Uses a custom comparer to order items according to their priority. Like a regular queue, only the item at the front is accessible.

#### Double Ended Queue, Deque

Allows insertion and removal of items at both the front and the back of the queue.

---

### References

[Original source #1](https://mta.ca/~rrosebru/oldcourse/263111/Dsa.pdf)

