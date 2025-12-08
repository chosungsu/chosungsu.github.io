---
title: 'SQL Design'
date: '2022-04-15'
tags: ['Database', 'lecture']
---

### SQL (Structured Query Language)

SQL is a standard language used to define, manipulate, and control data in Relational Database Management Systems (RDBMS). Users specify only 'what' they want, and the DBMS determines 'how' to retrieve the data. SQL is broadly divided into three categories by function.

DDL (Data Definition Language) defines the database schema (structure), DML (Data Manipulation Language) retrieves and modifies data, and DCL (Data Control Language) controls access privileges.

---

### DDL

CREATE TABLE defines the name, attribute names, data types, and all integrity constraints of a new relation (table).

```sql
CREATE TABLE Student (
    StudentID CHAR(5) NOT NULL,
    Name VARCHAR(100) NOT NULL,
    Major CHAR(4) NULL,
    GPA DECIMAL(3, 2),
    PRIMARY KEY (StudentID),
    CONSTRAINT CHK_GPA CHECK (GPA >= 0.0 AND GPA <= 4.0)
);
```

It supports various data types, which determine the set of values (domain) that attributes can have. And a primary key uniquely identifies tuples and implies NOT NULL. Only one can be specified per table. UNIQUE requires that the attribute value be unique across all tuples, but NULL may be allowed.

ALTER TABLE modifies the schema of an existing table. DROP TABLE permanently removes a table and all data stored in it.

---

### DML

INSERT adds a new tuple to a relation.

```sql
INSERT INTO Course (CourseID, Title, DeptName, Credits)
VALUES ('CS101', 'Intro to CS', 'Comp. Sci.', 4);
```

DELETE removes tuples from a relation that satisfy the condition in the WHERE clause. If there is no WHERE clause, all tuples in the table are deleted.

```sql
DELETE FROM Instructor
WHERE Salary < 50000;
```

UPDATE changes the attribute values of tuples that satisfy the condition in the WHERE clause.

```sql
UPDATE Department
SET Budget = Budget * 1.10
WHERE DeptName = 'Comp. Sci.';
```

---

### Aggregation and Grouping

Aggregate functions compute a single scalar value over a set of tuples. These include AVG, MIN, MAX, SUM, COUNT, etc. COUNT $(*)$ returns the total number of tuples, and COUNT (DISTINCT $A$) returns the number of unique values of attribute $A$.

GROUP BY groups tuples based on one or more attribute values. Aggregate functions are applied independently to each group.

```sql
SELECT DeptName, AVG(Salary)
FROM Instructor
GROUP BY DeptName;
```

HAVING filters conditions on groups created by GROUP BY. While the WHERE clause filters tuples, HAVING filters groups.

```sql
HAVING COUNT(ID) > 5;
```

ORDER BY specifies the order of the final result tuples. This is executed last in the SELECT statement.

---

### Nested Subqueries

This is a form where another SELECT statement (subquery) is included within one SELECT statement. Subqueries can be used within the FROM, WHERE, and HAVING clauses of an outer query. They return tuples or relations and are used with operators such as IN and EXISTS.

The IN operator checks whether a tuple value from the outer query belongs to the subquery result set. And the EXISTS operator checks whether the subquery result contains one or more tuples.

Set operators from relational algebra are also used in SQL. UNION returns the union of two query results, and duplicate tuples are automatically removed. UNION ALL returns the union without removing duplicate tuples. INTERSECT returns the intersection of two query results.

---

### Views, DCL

A view is a virtual table defined from one or more base tables. It is not actually stored in the database, and each time a view is accessed, the defined query is executed and returns results. Views are defined with CREATE VIEW. This mitigates the impact on applications when base tables change. It is also used to restrict users to see only specific columns or rows rather than the entire table.

DCL manages access privileges on database objects. GRANT grants SELECT, INSERT, DELETE, UPDATE privileges to specific users or roles. Privileges can be revoked with REVOKE.

---

### References

[Original source #1](https://www2.seas.gwu.edu/%7Ebhagiweb/cs2541/lectures/SQL-DDL.pdf)

[Original source #2](https://www2.seas.gwu.edu/~bhagiweb/cs2541/lectures/SQL.pdf)
