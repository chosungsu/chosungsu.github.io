---
title: 'Paths and Graphs'
date: '2023-07-09'
tags: ['Computational Geometry', 'lecture']
---

### Shortest Path Problem

평면에 $n$개의 서로소인 다각형 장애물(polygonal obstacles)이 주어지고, 장애물 외부에 두 점 $s$와 $t$가 주어졌을 때, 장애물의 내부(interiors)를 피하면서 $s$에서 $t$로 가는 최단 경로를 찾는 문제입니다.

장애물 집합을 피하는 두 점 사이의 최단 경로는 항상 다각형 곡선(polygonal curve)이며, 그 꼭짓점은 $s, t$ 또는 장애물의 꼭짓점입니다.

#### Computing the Visibility Graph

<img src="https://velog.velcdn.com/images/devjo/post/2bf17d8e-2986-4c81-a1b0-8baf02931861/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

$n$개의 꼭짓점을 가진 다각형 장애물 집합의 가시성 그래프를 구성하는 $\mathbf{O(n^2)}$ 시간 알고리즘을 소개합니다. 이 알고리즘은 각 꼭짓점 주위에서 각도 스위프(angular sweep)를 수행하는 개념에 기반합니다.

각 꼭짓점 $v$에서 모든 방향으로 총알 경로(bullet path)를 발사한다고 상상합니다. 이 총알이 처음으로 장애물 세그먼트에 닿는 지점까지의 경로는 $v$에서 그 방향으로 가장 가까운 장애물을 나타냅니다.

두 꼭짓점 $v$와 $w$를 잇는 직선의 기울기 $\theta$에 도달할 때 주요 이벤트가 발생합니다. 쌍대 공간에서 $2n$개의 꼭짓점 각각에 대해 쌍대 직선 $v^*: y = v_a x - v_b$를 만듭니다. 이벤트 기울기 $\theta$는 쌍대 공간에서 두 쌍대 직선 $v^*$와 $w^*$의 교차점의 $x$ 좌표($a$-좌표)에 해당합니다.

---

### Motion Planning

모션 플래닝(Motion Planning)은 하나 이상의 로봇이 움직임과 관절 측면에서 잠재적으로 많은 자유도를 가질 때, 그 움직임을 계획하는 문제입니다.

작업 공간에는 로봇이 작동하는 환경으로, 로봇이 교차해서는 안 되는 장애물(obstacles) 집합으로 구성됩니다. 이 공간은 정적(static)이며, 완전한 기하학적 정보가 있다고 가정합니다.

#### Motion Planning of a Point Robot

<img src="https://velog.velcdn.com/images/devjo/post/2c1983eb-d4bd-416b-9bb8-0255def4b1c9/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

복잡한 문제를 자유 공간 내에서 움직이는 점 로봇의 문제로 변환한 후, 경로가 존재하는지 확인하기 위해 다음 단계를 수행합니다.

장애물 경계를 사다리꼴로 분할합니다. 장애물 내부에 있는 사다리꼴 면을 제거하여 자유 공간을 단순한 볼록 영역으로 나눕니다. 사다리꼴 지도에 기반하여 로드맵(Road Map)이라는 평면 그래프를 만듭니다.

#### C-Obstacles and Minkowski Sums

환경 설정 장애물 (Configuration Obstacles, $C_P$)은 로봇 $R$이 장애물 $P$와 교차하는 모든 환경 설정들의 집합입니다.

민코프스키 합은 각 집합에서 쌍별 점들의 합으로 정의됩니다.

$$
S_1 \oplus S_2 = \{\vec{p} + \vec{q} \mid \vec{p} \in S_1, \vec{q} \in S_2\}
$$

#### 볼록 다각형의 민코프스키 합 계산

<img src="https://velog.velcdn.com/images/devjo/post/16e8bfdc-8439-4c69-9e8b-62b3fb96164f/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

$R$과 $P$가 볼록 다각형일 때, $C_P = P \oplus (-R)$는 $O(n+m)$ 시간에 계산할 수 있습니다. (여기서 $n$과 $m$은 각각 $P$와 $R$의 변의 수입니다.)

$R$과 $P$가 비볼록일 때, 민코프스키 합 $P \oplus R$의 복잡도는 최악의 경우 $O(n^2 m^2)$까지 될 수 있습니다. 볼록인 경우에는 로봇 $R$이 $m$-각형 볼록이고, 장애물 $P$가 $n$-각형 단순 다각형일 때, $P \oplus R$의 총 복잡도는 $O(nm)$입니다.

---

### 참고 자료

[원본 경로 #1](https://www.cs.cmu.edu/afs/cs/academic/class/15456-s14/Handouts/cmsc754-lects.pdf)

