---
title: 'Delaunay Triangulations'
date: '2023-07-05'
tags: ['Computational Geometry', 'lecture']
---

### Delaunay Triangulations

평면상에 교차하지 않는 선분들의 집합 $S = \{s_1, \dots, s_n\}$ 중에 수직 선분은 없다고 가정합니다. 모든 선분을 감싸는 큰 경계 직사각형(bounding rectangle) 안에 가둡니다. 각 선분의 끝점에서 수직으로 위아래로 선을 그려 이를 vertical bullet paths라고 합니다.

---

### Randomized Incremental Construction

<img src="https://velog.velcdn.com/images/devjo/post/7cc417fd-25d2-4356-9105-eb5d0122dea4/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

사다리꼴 지도를 평면 스윕 대신 무작위 점진적 알고리즘을 사용하여 구축하고 초기 경계 직사각형에서 선분 집합 $S$의 선분들을 무작위 순서로 하나씩 추가하면서 업데이트합니다.

역방향 분석(backwards analysis)을 사용하여 $E[k_i]$, 즉 $i$번째 선분을 삽입할 때 새로 생성되는 사다리꼴의 기대 수가 상수임을 증명하는 것이 목표입니다.

---

### Planar Point Location

<img src="https://velog.velcdn.com/images/devjo/post/587d1fb4-1d46-45a4-ae6c-df8f33d15cbf/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:50;" />

점 위치 찾기 자료구조는 루트가 있는 방향 비순환 그래프 (Directed Acyclic Graph, DAG)를 기반으로 합니다. 각 노드는 0개 또는 2개의 나가는 모서리를 가집니다.

내부 노드에는 $x$-노드가 선분의 끝점 $p$를 포함하며 수직선 왼쪽/오른쪽에 있는지에 따라 두 자식 중 하나로 이동합니다. 그리고 $y$-노드는 선분 $s$를 가리키며 $q$가 $s$를 포함하는 직선의 위/아래에 있는지에 따라 두 자식 중 하나로 이동합니다.

#### Incremental Construction

<img src="https://velog.velcdn.com/images/devjo/post/94a44bdc-73e8-486e-a17e-4d56bc86afa0/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

선분 $s$가 기존 사다리꼴 $A$에 삽입될 때, $s$의 끝점 수에 따라 세 가지 경우가 발생합니다.

$\Rightarrow$ 왼쪽 또는 오른쪽으로 $A$가 세 개의 사다리꼴 $\mathbf{X, Y, Z}$로 대체됩니다. 끝점 $p$에 대한 x-노드와 선분 $s$에 대한 y-노드가 추가됩니다.

$\Rightarrow$ 선분이 $A$ 내부에 완전히 놓일 때 $A$가 네 개의 사다리꼴 $\mathbf{U, X, Y, Z}$로 대체됩니다. 두 끝점 $p, q$에 대한 x-노드 두 개와 선분 $s$에 대한 y-노드 하나가 추가됩니다.

$\Rightarrow$ 선분이 $A$를 완전히 가로지를 때 $A$가 두 개의 사다리꼴 $\mathbf{Y, Z}$로 대체됩니다. $A$의 리프 노드가 선분 $s$에 대한 y-노드로 대체됩니다.

---

### Voronoi Diagrams and Fortune’s Algorithm

#### Voronoi Diagrams

점들의 집합 $P = \{p_1, p_2, \dots, p_n\}$이 주어졌을 때, 사이트 $p_i$에 대한 보로노이 셀(Voronoi cell) $V(p_i)$은 평면상의 모든 점 $q$ 중에서 $p_i$가 다른 어떤 사이트보다도 더 가까운 점들의 집합입니다.

$$
V(p_i) = \{q \mid \|p_i q\| < \|p_j q\|, \forall j \ne i\}
$$

두 사이트 $p_i$와 $p_j$ 사이의 수직 이등분선(perpendicular bisector)을 경계로 하는 반평면 $h(p_i, p_j)$를 생각하면, $h(p_i, p_j)$는 $p_i$에 $p_j$보다 엄격하게 더 가까운 점들의 집합입니다. 따라서 보로노이 셀은 다음과 같은 반평면들의 교집합입니다.

$$
V(p_i) = \bigcap_{j \ne i} h(p_i, p_j)
$$

각 보로노이 모서리(edge) 위의 점은 그것의 두 개의 가장 가까운 이웃 사이트에서 등거리입니다. 네 사이트가 한 원 위에 있지 않다는 일반적인 위치 가정을 하면, 보로노이 정점은 모두 차수가 3입니다.

#### Fortune’s Algorithm

<img src="https://velog.velcdn.com/images/devjo/post/be3b7dcd-69b2-4959-83e4-ab2293d6d3c9/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

포춘 알고리즘은 보로노이 다이어그램을 $\mathbf{O(n \log n)}$ 시간에 계산하는 효율적인 평면 스윕(plane sweep) 알고리즘입니다. 일반적인 평면 스윕과 달리, 보로노이 다이어그램은 아직 스윕 라인 아래에 있는 사이트에 의해 결정되는 정점을 스윕 라인 뒤쪽에 생성할 수 있습니다.

포춘 알고리즘은 이 문제를 해결하기 위해 해변 선(beach line)이라는 $\mathbf{x}$-단조 곡선을 유지합니다. 해변 선은 스윕 라인 $l$ 위의 사이트 $p$에 더 가까운 점들과 스윕 라인 $l$ 자체에 더 가까운 점들의 경계입니다. 따라서 한 점(사이트)과 한 직선(스윕 라인)으로부터 등거리인 점들의 집합은 포물선(parabola)입니다. 해변 선은 이러한 포물선들(사이트당 하나)의 하한 포락선(lower envelope)으로 구성됩니다.

#### Voronoi Vertex Events

해변 선에서 연속된 세 사이트 $p_i, p_j, p_k$에 해당하는 아크가 사라질 때 발생합니다.

---

### 참고 자료

[원본 경로 #1](https://www.cs.cmu.edu/afs/cs/academic/class/15456-s14/Handouts/cmsc754-lects.pdf)

