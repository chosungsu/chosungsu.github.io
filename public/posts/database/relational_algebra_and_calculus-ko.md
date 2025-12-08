---
title: 'Relational Algebra and Calculus'
date: '2022-04-15'
tags: ['Database', 'lecture']
---

### Relational Algebra

관계 대수는 원하는 결과를 얻기 위해 수행해야 할 연산들의 순서를 명시하는 절차적(Procedural) 질의 언어입니다. 관계 대수의 연산자들은 하나 또는 두 개의 릴레이션을 입력으로 받아, 새로운 릴레이션(집합)을 출력합니다.

이 연산들을 사용하려면 두 릴레이션 $R$과 $S$가 반드시 합병 가능(Union Compatible)해야 합니다. 즉, 두 릴레이션이 동일한 수의 애트리뷰트를 가지며 대응하는 애트리뷰트들의 도메인이 같아야 합니다.

합집합(Union), 교집합(Intersection), 차집합(Set Difference), 카티션 곱(Cartesian Product)은 기본 집합 연산입니다.

순수 관계 연산은 SQL의 핵심 기능과 직접적으로 연결됩니다. Selection은 릴레이션 $R$에서 주어진 조건 $p$를 만족하는 튜플들을 추출합니다. Projection은 릴레이션 $R$에서 원하는 애트리뷰트들의 집합 $A$만 추출합니다. Join은 카티션 곱($\times$)과 선택($\sigma$) 연산을 결합하여 두 릴레이션 $R$과 $S$를 특정 조건 $p$에 따라 연결합니다.

---

### Relational Calculus

원하는 데이터에 대한 조건을 명시하는 선언적(Declarative) 질의 언어입니다. "무엇을" 원하는지에 초점을 맞추며, 데이터를 찾는 "방법(절차)"에 대해서는 신경 쓰지 않습니다.

#### Tuple Relational Calculus, TRC

$\{t \mid p(t)\}$와 같이 결과 릴레이션에 포함되어야 할 튜플 변수가 만족해야 하는 조건을 서술합니다.

#### Domain Relational Calculus, DRC

$\{<x_1, x_2, \ldots, x_n> \mid p(x_1, x_2, \ldots, x_n)\}$와 같이 결과 릴레이션을 구성하는 도메인 변수들이 만족해야 하는 조건을 서술합니다. 여기서 $x_1, x_2, \ldots, x_n$는 결과 릴레이션에 나타날 도메인 변수입니다.

---

### 참고 자료

[원본 경로 #1](https://www2.seas.gwu.edu/~bhagiweb/cs2541/lectures/algebra.pdf)

