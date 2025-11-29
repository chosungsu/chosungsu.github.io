---
title: 'Halfplane Intersection and Point-Line Duality'
date: '2023-07-03'
tags: ['Computational Geometry', 'lecture']
---

### 반평면 교차

평면상의 직선은 평면을 두 영역으로 나눕니다. 이 각 영역을 반평면이라고 합니다. (3차원에서는 반공간(halfspace)입니다.)

$n$개의 닫힌 반평면 집합 $H = {h_1, h_2, \dots, h_n}$이 주어졌을 때, 이들의 교집합을 계산하는 것입니다. 반평면은 볼록 집합(convex set)이므로, 그 교집합 또한 볼록 집합입니다.

---

### Divide-and-Conquer Algorithm

<img src="https://velog.velcdn.com/images/devjo/post/b55d13ea-0c36-43a7-bdd0-ea7b5ace63a8/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

$n$개의 반평면 $H$를 크기가 약 $n/2$인 두 부분 집합 $H_1$과 $H_2$로 나눕니다. $H_1$과 $H_2$의 교집합 $K_1$과 $K_2$를 재귀적으로 계산합니다. 볼록 다각형 $K_1$과 $K_2$의 교집합 $K$를 계산하여 반환합니다.

병합 시간은 $M(n)$으로 두 볼록 다각형의 교차는 $O(n)$ 시간이 걸립니다.

왼쪽에서 오른쪽으로 평면 스윕을 사용하여 교차를 계산합니다. 볼록성 덕분에 스윕 라인 상태는 항상 최대 4개의 모서리(각 다각형의 상부 및 하부 체인)만 포함하며, 이는 $O(1)$ 크기입니다. 모든 모서리를 따라 한 번씩 스윕하므로 총 $O(n)$ 시간이 걸립니다.

---

### Lower Envelopes and Duality

<img src="https://velog.velcdn.com/images/devjo/post/57868f8b-a6b3-4ef8-a787-924bbe8e7de5/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

$n$개의 직선 $L = {l_1, \dots, l_n}$이 주어졌을 때, 각 직선 아래쪽의 반평면 $y \le a_i x - b_i$들의 교집합의 경계를 하한 포락선(lower envelope)이라고 합니다.

#### Properties of Duality

프라이멀 평면에서 점 $p$가 직선 $l$의 위/위치/아래에 있는 것은 쌍대 평면에서 직선 $p^\star$가 점 $l^\star$의 아래/위치/위에 있는 것과 같습니다.

직선 $l_1$과 $l_2$가 점 $p$에서 교차하는 것은 쌍대 직선 $p^\star$가 쌍대 점 $l_1^\star$과 $l_2^\star$를 지나는 것과 같습니다.

#### 볼록 껍질과 포락선의 관계

평면상의 점 집합 $P$가 주어졌을 때, $P$의 상부 볼록 껍질(upper convex hull)을 반시계 방향으로 따라가는 정점들의 순서는 쌍대 집합 $P^\star$의 하한 포락선(lower envelope) 상의 직선들을 왼쪽에서 오른쪽으로 따라가는 순서와 같습니다.

---

### 참고 자료

[원본 경로 #1](https://www.cs.cmu.edu/afs/cs/academic/class/15456-s14/Handouts/cmsc754-lects.pdf)

