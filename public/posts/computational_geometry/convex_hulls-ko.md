---
title: 'Convex Hulls'
date: '2023-07-01'
tags: ['Computational Geometry', 'lecture']
---

### Convexity

평면상의 점 집합 $P$가 주어졌을 때, $P$의 볼록 껍질 $\text{conv}(P)$는 직관적으로 점들을 고무줄로 감싼 후 고무줄이 점들 주위로 팽팽하게 '찰싹 달라붙게' 했을 때 만들어지는 모양으로 정의할 수 있습니다.

#### 형식적 정의

집합 $K$가 볼록이라는 것은 $K$ 내의 임의의 두 점 $p, q \in K$에 대해, 두 점을 잇는 선분 $\overline{pq}$ 전체가 $K$ 안에 포함된다는 의미입니다.

볼록체는 유한한 반지름의 구 안에 갇힐 수 있는 경계를 가질 수도 있고, 무한히 뻗어나가는 직선, 반직선, 반평면과 같은 비경계를 가질 수도 있습니다.

임의의 집합 $P$의 Convex Hull $\text{conv}(P)$는 $P$를 포함하는 모든 볼록 집합들의 교집합이며, 가장 직관적으로는 $P$를 포함하는 가장 작은 볼록 집합입니다.

#### Convex Hull Problem

<img src="https://velog.velcdn.com/images/devjo/post/fb99324d-f386-449b-8b02-a6005ac1d62f/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

평면상에 $n$개의 점 집합 $P$가 주어졌을 때, $P$의 Convex Hull을 표현하는 출력을 생성하는 문제입니다.

Convex Hull은 닫힌 볼록 다각형이므로, 가장 간단한 표현은 Convex Hull 정점들을 반시계 방향(counterclockwise)으로 나열하는 것입니다.

---

### Graham's Scan

$O(n \log n)$ 시간에 볼록 껍질을 계산하는 알고리즘으로, 증분 구성(incremental construction)이라는 일반적인 접근 방식에 기반을 둡니다.

점들을 $x$-좌표의 오름차순으로 정렬하고 위쪽 껍질(upper hull)과 아래쪽 껍질(lower hull)의 두 체인으로 나누어 계산을 단순화합니다.

가장 작은 $x$-좌표를 가진 점과 가장 큰 $x$-좌표를 가진 점이 두 껍질의 공통 끝점이 됩니다. 점들을 정렬된 순서대로 왼쪽에서 오른쪽으로 하나씩 추가합니다. 현재의 위쪽 껍질 정점들을 스택 $H$에 저장합니다.

새로운 점 $p_i$를 추가할 때, 스택의 맨 위 두 점 $H[\text{top}]$과 $H[\text{top}-1]$을 포함한 세 점의 순서 $\langle p_i, H[\text{top}], H[\text{top}-1] \rangle$가 엄격한 좌회전을 형성하는지 확인합니다. 좌회전이 아니거나 세 점이 한 직선 위에 놓이면 가운데 점 $H[\text{top}]$은 더 이상 위쪽 껍질에 속할 수 없으므로 스택에서 삭제(pop)합니다.

---

### Divide-and-Conquer

병합 정렬(MergeSort)을 일반화한 분할 정복(Divide-and-Conquer) 기반의 또 다른 $O(n \log n)$ 알고리즘입니다.

$|P| \le 3$이면 무차별 대입(brute force)으로 볼록 껍질을 계산하고 반환합니다. $P$를 $x$-좌표가 낮은 절반 $A$와 $x$-좌표가 높은 절반 $B$로 나눕니다. $H_A = \text{conv}(A)$와 $H_B = \text{conv}(B)$를 재귀적으로 계산합니다. $H_A$와 $H_B$를 병합하여 공통 볼록 껍질 $H$를 만듭니다. 이는 두 껍질에 대한 위쪽 및 아래쪽 접선(upper and lower tangents)을 계산하고 이 두 접선 사이에 놓이는 점들을 제거함으로써 수행됩니다.

---

### More on Convex Hulls

#### Output Sensitive Algorithms

전통적인 알고리즘 분석은 입력 크기($n$)에만 의존합니다. 그러나 많은 기하학적 문제는 출력 크기($h$)가 크게 달라지므로, 실행 시간을 입력($n$)과 출력($h$) 모두의 함수로 표현하는 것이 일반적입니다.

#### Chan's Algorithm

챈의 알고리즘은 그레이엄 스캔과 자비스 행진이라는 두 가지 알고리즘을 결합하여 $O(n \log h)$의 실행 시간을 달성하는 알고리즘입니다.

그레이엄 스캔은 모든 점을 정렬해야 하므로 $O(n \log n)$을 피할 수 없고, 자비스 행진은 $h$가 클 때 너무 느립니다. 해결책은 작은 부분 집합에 대해서만 그레이엄 스캔을 실행하는 것입니다.

만약 우리가 $h$의 값을 미리 알고 있다고 가정하고, 전체 점 집합 $P$를 각각 $m$개의 크기를 갖는 $r \approx n/h$개의 부분 집합 $P_i$로 나눕니다. 총 시간은 $r \times O(m \log m) = (n/h) \times O(h \log h) = \mathbf{O(n \log h)}$이 됩니다.

---

### 참고 자료

[원본 경로 #1](https://www.cs.cmu.edu/afs/cs/academic/class/15456-s14/Handouts/cmsc754-lects.pdf)

