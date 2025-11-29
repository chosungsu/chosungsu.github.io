---
title: 'Line Segment Intersection'
date: '2023-07-03'
tags: ['Computational Geometry', 'lecture']
---

### 기하학적 교차의 중요성

복잡한 모양은 합집합(union), 교집합(intersection), 차집합(difference)과 같은 부울 연산(boolean operations)을 단순한 기본 모양에 적용하여 구성됩니다.

로봇 공학 및 모션 계획에서는 충돌 감지 및 회피를 위해 객체 간의 교차 여부를 아는 것이 중요합니다.

#### 선분 교차 문제 정의

평면상에 $n$개의 선분 집합 $S$가 주어졌을 때, 쌍을 이루는 선분들이 교차하는 모든 점을 출력하는 것입니다.

$n$개의 선분은 최소 0개에서 최대 $\binom{n}{2} = O(n^2)$개의 교차점을 가질 수 있습니다. 최악의 경우에 $O(n^2)$ 시간이 걸리는 알고리즘을 피하고, 실제로는 교차가 드물게 발생하는 경우가 많으므로 출력 민감형 알고리즘(output sensitive algorithm)을 설계하는 것이 합리적입니다.

---

### Plane Sweep Algorithm

<img src="https://velog.velcdn.com/images/devjo/post/176fdc97-0f9b-4ab9-b32a-b3797a0c5417/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

1차원 직선을 평면상에서 휩쓸어(sweeping) 움직이는 것을 시뮬레이션하여 2차원 문제를 해결합니다.

알고리즘은 세 가지 기본 요소가 유지됩니다. 이미 스윕 라인의 왼쪽에 구성된 부분 해, 현재 스윕 라인과 교차하는 객체들의 상태, 처리될 미래 이벤트의 (부분) 집합이 해당합니다.

#### Sweep-line Status

왼쪽에서 오른쪽으로 휩쓰는 수직선 $l$과 교차하는 선분들을 위에서 아래로 정렬한 목록입니다.

스윕 라인이 이동할 때마다 모든 교차점의 $y$-좌표를 지속적으로 업데이트하는 것은 비효율이라서 각 선분 $s_i$에 대해 해당 직선의 방정식 $y = a_i x + b_i$의 계수 $(a_i, b_i)$를 저장합니다.

#### 이벤트 및 교차 감지

상태가 변경될 때만 이벤트를 처리하며, 이 $x$-좌표들을 이벤트 점(event points)이라고 합니다. 이벤트 유형에는 왼쪽 끝점, 오른쪽 끝점, 교차점이 해당합니다.

두 선분 $s_i, s_j$가 점 $p$에서 교차할 때, $p$ 바로 왼쪽에 스윕 라인을 놓으면 $s_i$와 $s_j$는 반드시 인접합니다. 따라서 $p$ 이전에 처리되는 가장 오른쪽 이벤트 직후에는 $s_i$와 $s_j$가 인접한 상태가 되므로, 모든 교차는 반드시 감지됩니다.

#### Computing Segment Intersections

두 선분 $\overline{ab}$와 $\overline{cd}$가 주어졌을 때, 교차점의 좌표를 정확하게 계산해야 합니다.

$\overline{ab}$ 위의 임의의 점 $p(s)$는 매개변수 $s \in [0, 1]$로 다음과 같이 표현됩니다.

$$
p(s) = (1 - s)a + sb
$$

마찬가지로 $\overline{cd}$ 위의 점 $q(t)$는 매개변수 $t \in [0, 1]$로 다음과 같이 표현됩니다.

$$
q(t) = (1 - t)c + td
$$

---

### 다각형 삼각 분할

삼각 분할(Triangulation)은 공간 영역을 단순체(simplices), 평면에서는 삼각형으로 세분화하는 일반적인 문제입니다. 가장 단순한 형태는 단순 다각형(simple polygon)을 삼각형으로 나누는 것입니다.

#### Monotone Polygons

<img src="https://velog.velcdn.com/images/devjo/post/4500f120-752e-43e6-aecb-901e4734c397/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Simple Polygon은 닫힌 단순 다각형 곡선으로 정의된 평면이고 Monotone Polygon은 다각형 $P$의 경계 $\partial P$가 주어진 직선 $l$에 대해 단조적인 두 개의 체인으로 분할될 수 있을 때, $P$는 $l$에 대해 단조적입니다. $x$축에 대해 단조성을 테스트할 때 좌우 끝점은 $O(n)$ 시간에 찾습니다. 그리고 이 두 정점은 경계를 상부 체인과 하부 체인으로 나누기 때문에 각 체인을 왼쪽에서 오른쪽으로 이동하면서 $x$-좌표가 비감소(nondecreasing)하는지 $O(n)$ 시간에 확인합니다.

삼각 분할을 greedy하게 접근하여 현재 정점의 왼쪽에 있는 영역을 최대한 삼각 분할하고, 삼각 분할된 영역은 추가 고려 대상에서 제외합니다. 알고리즘이 효율적인 이유는 현재 정점의 왼쪽에 있는 미분할 영역이 항상 매우 단순한 구조로 유지되기 때문입니다.

정점 $v_i$까지 처리했을 때, $v_i$의 왼쪽에 있는 미분할 영역은 두 개의 $x$-단조 체인으로 구성됩니다. 그리고 $v_i$에서 $u$까지의 체인이 두 개 이상의 모서리를 포함한다면, 이 모서리들은 반사 체인(reflex chain)을 형성합니다.

#### Monotone Subdivision

<img src="https://velog.velcdn.com/images/devjo/post/dd94ddcc-ed06-429b-9296-e8835c23f63d/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

임의의 단순 다각형 $P$를 단조 다각형으로 분할하기 위해 추가되는 비연속 대각선 집합을 결정해야 합니다. 이는 평면 스윕(plane sweep) 접근 방식으로 수행됩니다.

Scan Reflex Vertices에서 $x$-단조성이 깨지는 지점은 내부 각이 $180^\circ$보다 크고, 인접한 두 모서리가 모두 $v$의 왼쪽 또는 오른쪽으로 놓이는 정점입니다.

병합 정점은 두 모서리가 $v$의 왼쪽에 놓입니다. 분할 정점은 두 모서리가 $v$의 오른쪽에 놓입니다.

모서리 $e_a$의 헬퍼는 스윕 라인에서 $e_a$ 바로 아래에 있는 모서리 $e_b$ 사이의 다각형 체인에서 $e_a$ 아래에 수직으로 보이는 가장 오른쪽 정점입니다.

#### Event Processing

이벤트는 다각형의 $n$개 정점이며 다음과 같습니다.

Fix-up은 $\text{helper}(e)$가 병합 정점이라면, $v$에서 이 병합 정점으로 대각선을 추가합니다. 분할 정점은 $\text{helper}(e)$(바로 위 모서리)에 대각선을 연결하고, $v$를 새로운 두 모서리의 헬퍼로 설정합니다. 병합 정점은 두 인접 모서리를 삭제하고, 인접한 모서리들에 대해 Fix-up을 수행합니다.

시작 정점은 $v$에서 나가는 모서리를 삽입하고 끝 정점은 상부 모서리에 대해 Fix-up을 수행하고, 두 모서리를 삭제합니다.

실행 시간은 총 $n$개의 정점 이벤트에 대해 스윕 라인 상태는 균형 이진 트리에 저장되며, 삽입, 삭제, 검색 등 각 연산은 $O(\log n)$ 시간이 소요됩니다. 따라서 $O(n\log n)$이 소요됩니다.

---

### 참고 자료

[원본 경로 #1](https://www.cs.cmu.edu/afs/cs/academic/class/15456-s14/Handouts/cmsc754-lects.pdf)

