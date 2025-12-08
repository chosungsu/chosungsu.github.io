---
title: 'Relational Model'
date: '2022-04-08'
tags: ['Database', 'lecture']
---

### Introduction

The history of Database Management Systems (DBMS) began with a paper published in the early 1970s by Dr. Edgar F. Codd of IBM. Dr. Codd proposed a new model based on mathematical theory to solve the problems of data redundancy and low data independence that existed in the existing Hierarchical model (IMS) and Network model (Codasyl), and this was the Relational Model.

The core goal of this model was to maximize data independence so that users could focus solely on logical data structures and desired results without worrying about the physical storage method or access paths of data.

---

### Relational Model Definitions

The relational model represents data in the form of two-dimensional tables, which is based on the mathematical concept of a Relation.

A relation refers to a single table in a database, and a schema is the set of a specific relation's name and the attributes that the relation contains, which is the table header. Columns of a relation are attributes, and rows are tuples.

Relational relations have the following important mathematical properties.

Tuples within a relation are unordered. The physical storage order of tuples does not affect their logical meaning. Attributes within a relation are also unordered. This is because they are identified by attribute names. The value of each attribute must be atomic. That is, a single cell must contain only a single value that cannot be further decomposed. This is the basic premise of First Normal Form (1NF).

---

### Integrity Constraints

Integrity Constraints (IC) are rules that the DBMS automatically enforces to maintain the accuracy and consistency of data stored in the database.

A key is a set of one or more attributes used to uniquely identify tuples in a relation. A candidate key is a minimal set of attributes that can uniquely identify all tuples in a relation. A primary key is a candidate key chosen by the designer as the main identifier among multiple candidate keys. When a primary key exists, attribute values that constitute the primary key cannot be NULL. If NULL values are allowed, tuples cannot be uniquely identified, breaking integrity.

A foreign key is a set of attributes that references the primary key of another relation. It can establish logical connections between relations, and to satisfy the referential integrity constraint, it must match a primary key value that actually exists in the referenced relation, or all foreign key attributes must be NULL.

If referential integrity is violated, one of CASCADE (delete/update together), SET NULL, SET DEFAULT, or RESTRICT must be chosen.

---

### Data Independence

The greatest advantage of the relational model is that it provides data independence, simplifying application development and reducing maintenance costs.

With physical data independence, even if the physical storage structure or access methods of the database change, the logical schema (table structure) and application programs are not affected. And with logical data independence, even if the logical schema of the database changes (e.g., adding a new column to a table or splitting an existing table), existing application programs can be protected from being affected through user views. A view is defined as the result of a SELECT query on base tables.

---

### References

[Original source #1](https://www2.seas.gwu.edu/~bhagiweb/cs2541/lectures/rel-intro.pdf)
