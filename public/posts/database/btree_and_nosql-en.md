---
title: 'BTree and Nosql'
date: '2022-04-22'
tags: ['Database', 'lecture']
---

### B-Tree

This is a balanced tree structure introduced in 1972, a data structure optimized for disk-based systems that read and write data in block (page) units.

Each node of the tree is designed to match the size of a single block (page) on disk. This allows an entire node to be loaded into memory with a single disk I/O. The path from the root node to any leaf node always has the same length. Thanks to this characteristic, search time remains constant even in the worst case. Each node can contain pointers to many child nodes and key values. The larger the node size, the higher the branching factor, keeping the tree height low.

The degree ($M$) of a B-Tree defines the maximum number of child nodes a node can have. Internal nodes consist of an array of $(K, P)$ pairs. If a node has $m$ children, it stores $m-1$ keys. Tuples less than or equal to a specific key value are searched via the left pointer, and larger tuples via the right pointer.

B-Trees perform complex operations to maintain tree balance even during data insertion and deletion. When a node to insert a key is full, a splitting operation is performed that divides the node into two nodes and moves the middle key to the parent node. After deleting a key, if the number of keys in a node falls below the minimum threshold, keys are redistributed from sibling nodes or nodes are merged to maintain tree height and minimum capacity.

---

### B⁺-Tree

Most modern DBMS indexes use $\text{B}^{+}$-Tree. $\text{B}^{+}$-Tree is a variant of $\text{B}$-Tree, a structure more specialized for disk I/O optimization.

$\text{B}^{+}$-Tree clearly separates data storage locations into internal nodes and leaf nodes. Internal nodes store only search keys and child node pointers. Since they do not store actual data pointers, more keys can be stored to maximize the branching factor. Leaf nodes store search keys and pointers (Data Pointer) to actual data records. All data pointers exist only in leaf nodes. All leaf nodes are connected as a Linked List.

Thanks to the Linked List, $\text{B}^{+}$-Tree can quickly search sequentially along connected leaf nodes without traversing internal nodes again after finding only the starting point ($K_1$) from the root when searching for data in a specific range (between $K_1$ and $K_2$). Since all search paths always end at leaf nodes, search time is predictable and stable. Since internal nodes do not store data pointers, efficiency is improved with fewer disk I/Os.

---

### Clustered Index & Non-Clustered Index

A clustered index contains the actual data records themselves in the index's leaf nodes. Only one can be created per table, and data records are physically sorted according to the index key order. Search speed is fastest, but physical reordering may occur during data insertion/updates.

A non-clustered index stores only pointers to the physical location (address or primary key) of data records instead of actual data records in the index's leaf nodes. Multiple can be created per table, and after finding data through the index, the data file must be accessed once more using that pointer.

---

### NoSQL

Big data is primarily characterized by three $\text{V}$s. These three $\text{V}$s are fundamental causes that hinder horizontal scaling and flexibility of RDBMS.

In terms of Volume, as data amounts increase beyond gigabytes (GB) to terabytes (TB) and petabytes (PB) levels, the vertical scaling (Scale-up) approach of storing and processing data on a single server has reached limits in terms of cost efficiency and performance.

In terms of Velocity, the need to process large amounts of read/write requests in real-time, such as data generated from social media or $\text{IoT}$ devices, has grown.

In terms of Variety, the proportion of unstructured/semi-structured data such as logs, documents, graphs, and sensor data has increased, in addition to existing structured data.

#### CAP and Base

Distributed systems have a theoretical limit that they can satisfy at most two of the following three properties simultaneously. Consistency ensures that all clients can see the same data at the same point in time. Availability ensures that responses can always be received for all client requests. Finally, Partition Tolerance requires that the system continue to operate even when the system is separated due to network problems.

NoSQL systems generally relax consistency (C) and choose availability (A) (AP systems) because partition tolerance (P) cannot be abandoned in network environments.

Instead of ACID's strong guarantees, they follow the BASE principle. According to Base Available, the system maintains operational status as much as possible and responds to requests even when failures occur. According to Soft state, the state of data can change over time and does not guarantee immediate consistency. According to Eventually Consistent, after a certain time, data in all replicas will match.

#### Model Structure

Key-Value Store is a simple model, with Redis and Memcached as examples, storing data as pairs of unique keys (Key) and values (Value) associated with those keys. Values can be various forms such as strings, objects, lists, etc. Search, insertion, and deletion using keys are very fast, approaching $\text{O}(1)$ time complexity.

Document Database, with MongoDB and Couchbase as examples, stores data in document form with a hierarchical structure. One document corresponds to one record, and related data can be stored nested within a single document. Since there is no need to predefine table structures, adding new fields and changing data structures is very flexible.

Column-Family Store, with Cassandra and HBase as examples, stores and manages data in column family units, which are sets of columns rather than row units. Each row has a key (Row Key), and columns are grouped by column family and stored physically. It is optimized for sequential read and write performance rather than random data access.

Graph Database, with Neo4j as an example, stores data using nodes, edges, and properties, and stores and optimizes relationships between objects themselves. It is much faster and more efficient than Join operations in queries that explore complex many-to-many (M:N) relationships and deep connection paths (e.g., social network analysis).

---

### References

[Original source #1](https://courses.cs.washington.edu/courses/cse373/15wi/lectures/lecture15.pdf)

[Original source #2](https://www.cs.umd.edu/class/fall2019/cmsc420-0201/Lects/lect09-btree.pdf)

[Original source #3](https://tropars.github.io/downloads/lectures/LSDM/LSDM-5.1-nosql-fundamentals.pdf)
