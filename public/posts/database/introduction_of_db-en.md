---
title: 'Introduction of DB'
date: '2022-04-01'
tags: ['Database', 'lecture']
---

### Introduction

A database is a collection of structured data. It generally consists of 'records' (traditionally large amounts of data stored on disk) and relationships between records. A DBMS is a system for creating, manipulating, and accessing databases. It sits in front of data collections and mediates application access to data. The goal of a DBMS is to simplify data storage and access.

---

### Mafia Example

#### Problems with File System Usage

When using simple text files, it is difficult to represent entities and relationships, and it is difficult to control access privileges with low granularity rather than at the file level. To find desired information, separate procedural programs must be written and entire files must be scanned, making it difficult to guarantee real-time performance.

Atomicity must be guaranteed so that everything executes or nothing executes, consistency must be guaranteed so that data is always in a valid state, isolation must be guaranteed to protect against overwriting each other's work when writing to files simultaneously, and durability must be guaranteed so that data is not lost or corrupted even in the event of computer crashes.

---

### Fundamental Concepts

A DBMS integrates core concepts from various fields of computer science (languages, theory, OS, concurrency, optimization, etc.) to solve the problems above.

#### Representing Data

A data model provides a consistent way to structure data, enabling consistency, sharing, and efficient access.

A data model is a set of components that describe data organization, such as tables, graphs, etc. A conceptual/logical schema describes a specific data collection using a given data model. The physical organization of data on disk, including data and files, is called a physical schema.

#### Transactions

A transaction is a way to group actions that must occur atomically. It provides data guarantees to applications even in the presence of concurrency and failures.

---

### References

[Original source #1](https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/resources/mit6_830f10_lec01/)
