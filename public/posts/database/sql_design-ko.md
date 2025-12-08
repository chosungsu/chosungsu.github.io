---
title: 'SQL Design'
date: '2022-04-15'
tags: ['Database', 'lecture']
---

### SQL (Structured Query Language)

SQL은 관계형 데이터베이스 관리 시스템(RDBMS)에서 데이터를 정의, 조작 및 제어하는 데 사용되는 표준 언어입니다. 사용자는 '무엇을' 원하는지만 명시하고 '어떻게' 데이터를 가져올지는 DBMS가 결정하도록 합니다. SQL은 기능에 따라 크게 세 가지 범주로 나뉩니다.

DDL(Data Definition Language)은 데이터베이스 스키마(구조)를 정의하고 DML(Data Manipulation Language)은 데이터 검색 및 변경을 하고 DCL(Data Control Language)은 접근 권한을 제어합니다.

---

### DDL

CREATE TABLE은 새로운 릴레이션(테이블)의 이름, 애트리뷰트 이름, 데이터 타입 및 모든 무결성 제약 조건을 정의합니다.

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

다양한 데이터 타입을 지원하며, 이는 애트리뷰트가 가질 수 있는 값의 집합(도메인)을 결정합니다. 그리고 기본 키는 튜플을 고유하게 식별하며 NOT NULL을 내포합니다. 테이블당 하나만 지정 가능합니다. UNIQUE는 해당 애트리뷰트 값이 튜플 전체에서 고유해야 하지만 NULL은 허용될 수 있습니다.

ALTER TABLE은 기존 테이블의 스키마를 수정합니다. DROP TABLE은 테이블과 그에 저장된 모든 데이터를 영구적으로 제거합니다.

---

### DML

INSERT는 새로운 튜플을 릴레이션에 추가합니다.

```sql
INSERT INTO Course (CourseID, Title, DeptName, Credits)
VALUES ('CS101', 'Intro to CS', 'Comp. Sci.', 4);
```

DELETE는 WHERE 절의 조건을 만족하는 튜플을 릴레이션에서 제거합니다. WHERE 절이 없으면 테이블의 모든 튜플이 삭제됩니다.

```sql
DELETE FROM Instructor
WHERE Salary < 50000;
```

UPDATE는 WHERE 절의 조건을 만족하는 튜플의 애트리뷰트 값을 변경합니다.

```sql
UPDATE Department
SET Budget = Budget * 1.10
WHERE DeptName = 'Comp. Sci.';
```

---

### Aggregation and Grouping

집계 함수는 튜플들의 집합에 대해 단일 스칼라 값을 계산합니다. AVG, MIN, MAX, SUM, COUNT 등이 해당합니다. COUNT $(*)$는 튜플의 총 개수를 반환하며, COUNT (DISTINCT $A$)는 애트리뷰트 $A$의 고유한 값의 개수를 반환합니다.

GROUP BY는 튜플들을 하나 이상의 애트리뷰트 값을 기준으로 그룹화합니다. 집계 함수는 각 그룹별로 독립적으로 적용됩니다.

```sql
SELECT DeptName, AVG(Salary)
FROM Instructor
GROUP BY DeptName;
```

HAVING은 GROUP BY에 의해 생성된 그룹들에 대한 조건을 필터링합니다. WHERE 절이 튜플을 필터링한다면 HAVING은 그룹을 필터링합니다.

```sql
HAVING COUNT(ID) > 5;
```

ORDER BY는 최종 결과 튜플의 순서를 지정합니다. 이는 SELECT 문의 가장 마지막에 실행됩니다.

---

### Nested Subqueries

하나의 SELECT 문 내에 다른 SELECT 문(서브쿼리)가 포함되는 형태입니다. 서브쿼리는 외부 질의의 FROM, WHERE, HAVING 절 내에 사용될 수 있습니다. 튜플 또는 릴레이션을 반환하며 IN, EXISTS와 같은 연산자와 함께 사용됩니다.

IN연산자는 외부 질의의 튜플 값이 서브쿼리 결과 집합에 속하는지 확인합니다. 그리고 EXISTS연산자는 서브쿼리 결과가 하나 이상의 튜플을 포함하는지 확인합니다.

관계 대수의 집합 연산자들은 SQL에서도 사용됩니다. UNION은 두 질의 결과의 합집합을 반환하며, 중복된 튜플은 자동으로 제거됩니다. UNION ALL은 중복된 튜플을 제거하지 않고 합집합을 반환합니다. INTERSECT는 두 질의 결과의 교집합을 반환합니다.

---

### Views, DCL

뷰는 하나 이상의 기본 테이블로부터 정의된 가상 테이블입니다. 데이터베이스에 실제로 저장되지 않고, 뷰에 접근할 때마다 정의된 질의가 실행되어 결과를 반환합니다. CREATE VIEW로 뷰를 정의합니다. 이를 통해 기본 테이블 변경 시 애플리케이션에 미치는 영향을 완화합니다. 또한 사용자에게 전체 테이블이 아닌 특정 열이나 행만 보이도록 제한하는 데 사용됩니다.

DCL은 데이터베이스 객체에 대한 접근 권한을 관리합니다. GRANT를 통해 특정 사용자 또는 역할에 대해 SELECT, INSERT, DELETE, UPDATE 권한을 부여합니다. REVOKE로 권한을 회수할 수 있습니다.

---

### 참고 자료

[원본 경로 #1](https://www2.seas.gwu.edu/%7Ebhagiweb/cs2541/lectures/SQL-DDL.pdf)

[원본 경로 #2](https://www2.seas.gwu.edu/~bhagiweb/cs2541/lectures/SQL.pdf)