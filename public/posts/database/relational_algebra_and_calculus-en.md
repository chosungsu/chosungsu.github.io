---
title: 'Relational Algebra and Calculus'
date: '2022-04-15'
tags: ['Database', 'lecture']
---

### Relational Algebra

Relational algebra is a procedural query language that specifies the sequence of operations to perform in order to obtain the desired result. Operators in relational algebra take one or two relations as input and output a new relation (set).

To use these operations, two relations $R$ and $S$ must be union compatible—that is, they must have the same number of attributes, and the domains of corresponding attributes must match.

Union, intersection, set difference, and Cartesian product are the basic set operations.

The pure relational operations map directly to core SQL functionality. Selection extracts tuples from a relation $R$ that satisfy a given predicate $p$. Projection extracts only the desired set of attributes $A$ from a relation $R$. Join combines the Cartesian product ($\times$) and selection ($\sigma$) operations to link two relations $R$ and $S$ according to a specific predicate $p$.

---

### Relational Calculus

Relational calculus is a declarative query language that specifies conditions for the desired data. It focuses on “what” is wanted and does not concern itself with “how” (the procedure) to find the data.

#### Tuple Relational Calculus, TRC

It describes conditions that a tuple variable must satisfy to be included in the result relation, e.g., $\{t \mid p(t)\}$.

#### Domain Relational Calculus, DRC

It describes conditions that domain variables constituting the result relation must satisfy, e.g., $\{\langle x_1, x_2, \ldots, x_n\rangle \mid p(x_1, x_2, \ldots, x_n)\}$. Here, $x_1, x_2, \ldots, x_n$ are the domain variables that will appear in the result relation.

---

### 참고 자료

[원본 경로 #1](https://www2.seas.gwu.edu/~bhagiweb/cs2541/lectures/algebra.pdf)

