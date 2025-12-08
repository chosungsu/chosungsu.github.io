---
title: 'Entity Relationship and Schema Design'
date: '2022-04-22'
tags: ['Database', 'lecture']
---

### ER Model

Database design is a systematic process of analyzing requirements, converting them into a conceptual model, and then mapping them to a logical model (relational schema). The Entity-Relationship (ER) model is a powerful tool for designing the conceptual schema of a database, visually representing real-world data through three fundamental concepts: Entity, Attribute, and Relationship.

An entity is an independent object or concept that can be distinguished in the real world, such as a student or course name. A collection of entities of the same type is called an entity set, and a set that depends on the primary key of an identifying entity set to form its own primary key is called a weak entity set.

Attributes describe the characteristics or properties of an entity set. A simple attribute, such as ID, cannot be further decomposed, but a composite attribute, such as address, can be decomposed into multiple simple attributes like street and city. Most attributes have a single value, but a multivalued attribute can have multiple values for one entity.

Mapping cardinality defines the maximum participation number of entities participating in a relationship and has a critical impact on mapping to a relational schema.

---

### Schema Design

A conceptual ER model must be converted into a logical model, a relational schema (tables). The goal of this conversion is to minimize data redundancy and maintain integrity.

High redundancy causes information to be stored repeatedly in multiple tuples, wasting storage space and threatening consistency. When updating redundant data, errors can occur: only some data is updated, causing data inconsistency; unnecessary other information must be forcibly inserted to insert specific information; and when deleting necessary information, other important information is also deleted together.

Functional Dependency (FD) is the core foundation of normalization theory. In relation $R$, that attribute set $A$ functionally determines $B$ ($A \to B$) means that if any two tuples in $R$ have the same value for $A$, they must also have the same value for $B$.

---

### Normal Forms

Normalization is a systematic process of decomposing a schema into multiple smaller relations to minimize redundancy and eliminate anomalies.

First Normal Form (1NF) requires that all attribute values in a relation be atomic and that no repeating groups exist. A single cell must contain only a single value.

Second Normal Form (2NF) satisfies 1NF and requires that all non-key attributes be functionally dependent on the entire primary key. It removes non-key attributes that are dependent only on part of the primary key through partial functional dependency.

Third Normal Form (3NF) satisfies 2NF and requires that all non-key attributes not be transitively dependent on the primary key.

The goal of normalization is to eliminate anomalies and minimize data redundancy through lossless decomposition, and original information must not be lost when decomposed relations are rejoined. If normalization is carried out to too high a level, the number of relations increases, leading to more complex queries (joins) and potential performance degradation.

---

### References

[Original source #1](https://www2.seas.gwu.edu/~bhagiweb/cs2541/lectures/ER.pdf)

[Original source #2](https://www2.seas.gwu.edu/~bhagiweb/cs2541/lectures/schema-design.pdf)

[Original source #3](https://www2.seas.gwu.edu/~bhagiweb/cs2541/lectures/normal-forms.pdf)
