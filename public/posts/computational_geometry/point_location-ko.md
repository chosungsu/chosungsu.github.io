---
title: 'Point Location'
date: '2023-07-07'
tags: ['Computational Geometry', 'lecture']
---

### Point Location Problem

점 위치 결정 문제는 평면을 분할하는 다각형 세분화(Polygonal Subdivision of the Plane, PSLG)가 주어졌을 때, 쿼리 점 $q$를 포함하는 세분화의 면(face)을 효율적으로 찾는 문제입니다.

---

### Kirkpatrick's Algorithm

<img src="https://velog.velcdn.com/images/devjo/post/c09acf4a-774e-45d8-bda3-a95fc92b0fc4/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

먼저, 주어진 평면 세분화가 삼각 분할(triangulation)이라고 가정합니다. 세분화의 모든 면을 삼각 분할합니다. 그리고 세분화의 볼록 껍질(convex hull)을 계산하고, 외부 면을 포함하도록 큰 외부 삼각형(꼭짓점 $a, b, c$)으로 전체를 둘러쌉니다. 이 과정을 통해 새로운 에지와 면이 추가되지만, 평면 그래프의 특성상 전체 크기 $n$은 상수 계수만큼만 증가합니다.

커크패트릭의 방법은 다음과 같은 속성을 갖는 일련의 삼각 분할 $\mathbf\{T_0, T_1, T_2, \dots, T_k\}$를 생성합니다. $k = O(\log n)$입니다. $T_k$는 단일 삼각형(가장 바깥쪽 외부 면)으로 구성됩니다.

$T_i$에서 $T_{i+1}$을 생성하기 위해, 다음 두 가지 조건을 만족하는 정점 집합을 신중하게 선택하여 제거합니다. 제거할 각 정점의 차수(degree)는 상수로 제한됩니다. 차수가 $d$ 이하인 정점을 제거하면 발생하는 구멍(hole)은 최대 $d$개의 이전 삼각형과 겹치는 새로운 삼각형들로 쉽게 재삼각 분할됩니다. 그리고 제거할 정점들은 서로 인접하지 않은 독립 집합(independent set)을 형성해야 합니다. 이는 정점을 제거했을 때 생기는 구멍들을 서로 독립적으로 재삼각 분할할 수 있게 해줍니다.

---

### Planar Voronoi Diagrams

$n$개의 점 집합 $P = \{p_1, p_2, \dots, p_n\}$이 주어졌을 때, 점 $p_i$의 보로노이 다각형(Voronoi Polygon) $V(p_i)$는 평면 상에서 $p_i$가 $P$의 다른 모든 점보다 가장 가까운 점들의 집합입니다.

$$
V(p_i) = \{q : |p_i - q| \le |p_j - q|, \forall j \neq i\}
$$

보로노이 다각형들의 경계선을 모두 합친 것을 보로노이 다이어그램(Voronoi Diagram, $\text{VD}(P)$)이라고 합니다.

#### Divide-and-Conquer Algorithm

$l_0 \in L$의 $\text{V}(l_0)$와 $r_0 \in R$의 $\text{V}(r_0)$가 겹칠 경우, $l_0$와 $r_0$ 사이의 수직 이등분선(bisector)을 삽입하여, 이등분선의 "잘못된" 쪽에 있는 다각형 부분을 제거합니다. 이러한 수직 이등분선들의 합집합, 즉 $\text{VD}(L)$과 $\text{VD}(R)$을 분리하는 경계를 윤곽선(Contour)이라고 합니다. 윤곽선 상의 점은 $L$의 한 점과 $R$의 한 점에서 등거리(equidistant)에 있습니다.

$$
T(n)=2T(n/2) + n
$$

단순하게 $\text{V}(l_0)$의 경계를 반복적으로 재검색하면, $\text{V}(r_0)$의 경계가 먼저 닿는 상황이 반복될 경우, $O(n)$ 시간에 $\text{V}(l_0)$ 경계를 $O(n)$번 재스캔하여 총 $\mathbf{O(n^2)}$ 시간이 걸릴 수 있습니다.

이를 해결하기 위해 보로노이 다각형은 볼록(convex)합니다. 윤곽선을 따라 걸을 때, 새로 생성되는 $\text{V}(l_i)$의 에지들은 일관된 방향(왼쪽의 경우 시계 방향)으로 회전합니다. $\text{V}(L)$의 다각형 경계를 시계 방향으로, $\text{V}(R)$의 다각형 경계를 반시계 방향으로 추적합니다. 이 방법을 사용하면 각 보로노이 다각형의 에지를 최대 한 번만 스캔하게 되므로, 전체적으로 윤곽선을 $\mathbf{O(n)}$ 시간에 추적할 수 있으며, 이로써 총 $O(n \log n)$의 시간 복잡도를 달성합니다.

---

### Delaunay Triangulations and Convex Hulls

<img src="https://velog.velcdn.com/images/devjo/post/bb9557ab-d7c5-4842-8eb7-3e8b88739995/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

언뜻 보기에 딜로네 삼각 분할(Delaunay Triangulation, DT)은 거리(metric properties)에 기반하고, 볼록 껍질(Convex Hull, CH)은 공선성(collinearity)이나 공면성(coplanarity) 같은 아핀 속성(affine properties)에 기반하여 전혀 달라 보입니다. 하지만 놀랍게도, $d$차원의 딜로네 삼각 분할 문제를 $d+1$차원의 볼록 껍질 문제로 변환할 수 있습니다.

포물면으로의 투영에서 평면 상의 각 점 $p=(x, y)$를 3차원 포물면 상의 점 $p' = (x, y, x^2 + y^2)$로 수직 투영(vertical projection)합니다. 평면의 점 집합 $S$를 3차원의 투영된 점 집합 $S'$로 변환합니다.

#### Voronoi Diagrams and Upper Envelopes

<img src="https://velog.velcdn.com/images/devjo/post/1123472b-ff61-4252-86f3-f96b8457aacf/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

딜로네 삼각 분할과 볼록 껍질이 쌍대 관계인 것처럼, 보로노이 다이어그램(VD)은 상부 외피(Upper Envelope)와 쌍대 관계에 있습니다.

각 점 $p=(a, b)$에 대해, 포물면에 접하는 평면 방정식을 이용하여 상부 반공간(upper halfspace) $H^+(p)$를 정의합니다.

$$
z \ge 2ax + 2by - (a^2 + b^2)
$$

상부 반공간 $H^+(p_i)$의 교집합을 계산합니다. 이 교집합은 unbounded 볼록 다면체이며, 이 다면체의 1-스켈레톤(1-skeleton, 에지)을 $(x, y)$-평면에 투영하면 보로노이 다이어그램을 얻습니다.

---

### Topological Plane Sweep

위상 평면 스위프는 직선 배열(arrangement of lines)을 효율적으로 스위프하는 알고리즘입니다. 일반적인 평면 스위프는 $O(n^2)$ 크기의 배열과 $O(n^2)$개의 교차점을 처리하므로 보통 $O(n^2 \log n)$ 시간이 걸립니다.

컷(Cut)은 배열의 각 직선에서 하나씩 가져온 $n$개의 에지 $c_1, c_2, \dots, c_n$의 시퀀스입니다. $c_i$와 $c_{i+1}$은 배열의 동일한 면에 인접해야 합니다. $c_i$는 해당 면의 위쪽(above)에 있고, $c_{i+1}$은 해당 면의 아래쪽(below)에 있어야 합니다.

#### Upper and Lower Horizon Trees, UHT/LHT

<img src="https://velog.velcdn.com/images/devjo/post/31425409-20fe-4fbf-8099-17027935662e/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

기본 단계를 $O(1)$ 시간에 수행하기 위해, 우리는 컷의 오른쪽 끝점을 효율적으로 찾아야 합니다. 이를 위해 두 개의 자료구조를 사용합니다.

상부 수평선 트리 (UHT)는 컷의 각 에지를 오른쪽으로 추적합니다. 두 에지가 만날 때 더 가파른 기울기(higher slope)를 가진 에지만 계속 추적하여 나무(forest)를 구성합니다.

하부 수평선 트리 (LHT)는 두 에지가 만날 때 더 완만한 기울기(smaller slope)를 가진 에지만 계속 추적하여 나무를 구성합니다.

UHT와 LHT의 교차점을 알면, 컷의 각 에지의 오른쪽 끝점을 알 수 있습니다. 스택(Stack $S$)에 저장하고, 스택에서 $O(1)$ 시간에 꺼내 처리합니다.

---

### Ham-Sandwich Cuts

햄 샌드위치 문제는 평면에 주어진 두 유한 점 집합, $n$개의 빨간 점 $A$와 $m$개의 파란 점 $B$에 대해, 두 집합을 동시에 이등분하는 단일 직선을 찾는 문제입니다.

두 집합 $A$와 $B$는 $y$축에 의해 분리됩니다. $A$ (빨간 점)는 $x$ 좌표가 양수입니다. 이들의 쌍대 직선은 양의 기울기를 가집니다. $B$ (파란 점)는 $x$ 좌표가 음수입니다. 이들의 쌍대 직선은 음의 기울기를 가집니다.

#### Dual Formulation

중위 직선(Median Line)은 한 점 집합($A$라고 가정)에 대해, 임의의 기울기에 대해 집합을 이등분하는 유일한 직선이 존재하고 이등분선은 정확히 $(n-1)/2$개의 점을 위에, $(n-1)/2$개의 점을 아래에 두고, 한 점을 통과하는 기울기를 말합니다.

중위 준위(Median Level)은 표준 쌍대 변환 $D(a, b): y = ax - b$를 사용하여 $A$의 모든 점을 쌍대 직선으로 변환합니다. 배열에서 $k$-준위는 위쪽에 $k-1$개 이하의 직선이 있고, 아래쪽에 $n-k$개 이하의 직선이 있는 점들의 집합입니다.

---

### 참고 자료

[원본 경로 #1](https://www.cs.cmu.edu/afs/cs/academic/class/15456-s14/Handouts/cmsc754-lects.pdf)

