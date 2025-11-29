---
title: 'Trees'
date: '2023-07-07'
tags: ['Computational Geometry', 'lecture']
---

### $kd$-트리

<img src="https://velog.velcdn.com/images/devjo/post/11e25260-2446-4086-bda3-4b7f2292ec44/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

$kd$-트리는 1차원 범위 탐색 개념을 고차원으로 확장한 분할 트리의 예입니다. 구현이 쉽고 실용적이지만, 직교 범위 탐색에 대한 점근적으로 가장 효율적인 솔루션은 아닙니다.

각 내부 노드는 점들을 교대로 축에 평행한 선(cutting line)을 따라 분할합니다. 트리의 높이를 $O(\log n)$으로 보장하기 위해, 분할 차원을 따라 점들의 중앙값(median)을 분할 값으로 선택합니다.

교대 분할 규칙을 사용하는 균형 $kd$-트리에서, 임의의 수직선 또는 수평선은 $O(\sqrt{n})$개의 셀만 관통합니다. $x$축으로 분할된 노드를 수직선 $x=x_0$가 관통할 때, $x_0$는 한 쪽 자식의 셀만 관통할 수 있습니다. $y$축으로 분할된 노드를 관통할 때는 양쪽 자식의 셀을 모두 관통합니다. 분할 차원이 교대되므로, 트리를 2레벨 깊이 내려갈 때마다 관통하는 노드 수가 최대 2배가 되지만, 점의 수는 1/4로 줄어듭니다.

---

### Orthogonal Range Trees

<img src="https://velog.velcdn.com/images/devjo/post/652d486c-e89f-4857-a02a-7a298d05128f/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

다단계 탐색 트리 과정에서 질의 범위 $Q$를 $Q = Q_1 \cap Q_2$와 같이 더 단순한 범위 $Q_1, Q_2$의 교집합으로 표현합니다. 먼저 점 집합 $P$에 대해 첫 번째 범위 부분 공간(예: $x$ 좌표)에 대한 적절한 탐색 구조(예: 분할 트리) $T$를 구축합니다. $T$의 각 노드 $u$는 정규 부분 집합 $P_u$를 나타내며, 이 $P_u$에 대해 두 번째 범위 부분 공간(예: $y$ 좌표)에 대한 보조 탐색 트리 $T_u$를 구축합니다.

#### 2D Orthogonal Range Tree

2차원 직교 범위 질의 $Q = [x_{lo}, x_{hi}] \times [y_{lo}, y_{hi}]$에 다단계 탐색 트리를 적용합니다.

$x$ 범위 $[x_{lo}, x_{hi}]$에 대해 주 트리 $T$를 검색하여 $O(\log n)$개의 정규 부분 집합 $U(Q_1)$을 찾습니다. 각 $u \in U(Q_1)$에 대해, 보조 트리 $T_u$에서 $y$ 범위 $[y_{lo}, y_{hi}]$를 검색합니다. 이 검색은 $O(\log |P_u|) \le O(\log n)$ 시간이 걸립니다.

총 검색 시간은 

$$
\begin{aligned}
&O(\log n) + \\
&\sum_{u \in U(Q_1)} O(\log |P_u|) \le O(\log n) + O(\log n) \cdot O(\log n) \\
&= \mathbf{O(\log^2 n)}
\end{aligned}
$$

이와 같습니다.

주 트리 $T$는 $O(n)$ 공간을 사용합니다. 보조 트리 $T_u$의 총 크기는 $\sum_{u \in T} |P_u|$입니다. $T$가 균형 트리이고 깊이가 $O(\log n)$이므로, $P$의 각 점은 $T$의 경로를 따라 $O(\log n)$개의 정규 부분 집합에 포함됩니다. 따라서 총 공간은 $O(n) + \sum_{u \in T} |P_u| = O(n) + O(n \log n) = \mathbf{O(n \log n)}$입니다.

#### Improved Query Times via Fractional Cascading

<img src="https://velog.velcdn.com/images/devjo/post/f9c83d4a-725b-4108-966c-5d37919da39b/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

$O(\log^2 n)$ 질의 시간을 $\mathbf{O(\log n)}$으로 줄이는 방법입니다. 이를 위해서는 동일한 키($y_{lo}, y_{hi}$)로 여러 목록을 반복해서 검색하는 비효율성을 제거해야 합니다.

주 트리 $T$의 내부 노드 $v$와 그 자식 $v', v''$에 대해, $y$ 좌표로 정렬된 보조 목록(또는 배열) $A, A', A''$를 연결합니다. $A$의 각 요소에 대해, $A'$와 $A''$에서 이 요소보다 크거나 같은 첫 번째 항목을 가리키는 포인터를 저장합니다.

주 트리 $T$의 루트에서 전체 $P$를 대상으로 이진 탐색을 수행하여 $y_{lo}, y_{hi}$의 위치를 찾는 데 $O(\log n)$ 시간이 걸립니다. 그리고 루트에서 $y_{lo}, y_{hi}$의 위치를 알게 되면, 포인터를 따라 $O(1)$ 시간 내에 자식 노드 $v', v''$의 보조 목록 $A', A''$에서 해당 위치를 파악할 수 있습니다. 따라서 총 시간은 

$$
O(\log n) + O(\log n) \cdot O(1) = \mathbf{O(\log n)}
$$

이와 같습니다.

---

### Geometric Approximation

#### N-Body Problem

물리 시뮬레이션에서 $n$개의 천체가 상호 중력에 의해 움직이는 $n$-체 문제를 고려합니다. 각 천체의 움직임을 계산하려면 다른 $n-1$개의 천체로부터의 중력 합을 계산해야 하므로 총 $\mathbf{\Omega(n^2)}$ 계산이 필요합니다.

#### Well Separated Pairs

<img src="https://velog.velcdn.com/images/devjo/post/fc7eeefa-5348-43fc-80d7-04948751f6b7/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:100;" />

점 집합 $P \subset \mathbb{R}^d$와 분리 계수(separation factor) $s > 0$가 주어졌을 때, 서로소인 두 집합 $A$와 $B$가 $s$-잘 분리(s-well separated)되었다는 것은, $A$와 $B$를 각각 반지름 $r$인 두 개의 유클리드 공(balls)으로 둘러쌀 수 있고, 이 두 공 사이의 가장 가까운 거리가 적어도 $sr$인 경우를 말합니다.

---

### Coresets for Directional Width

큰 집합 $P$ 대신, 상대적으로 작은 부분 집합 $Q \subseteq P$를 추출하여 이 작은 집합에서 최적화 문제를 정확하게 해결하고, 그 결과를 $P$에 대한 좋은 근사치로 사용합니다.

#### $\varepsilon$-Coreset 정의

점 집합 $P$에 대한 최적 해의 값을 $f^*(P)$라고 할 때, $0 < \varepsilon$에 대해 부분 집합 $Q \subseteq P$가 $\varepsilon$-coreset이라는 것은, $Q$에서 문제를 해결함으로써 발생하는 상대 오차(relative error)가 $\varepsilon$ 이하임을 의미합니다.

$$
1 - \varepsilon \le \frac{f^*(Q)}{f^*(P)} \le 1 + \varepsilon
$$

$n$에 의존하지 않고 $\varepsilon$에만 의존하는 작은 Coreset 크기를 달성하는 것입니다.

#### $\alpha$-Fatness

볼록체 $K$가 $\alpha$-두꺼운($\alpha$-fat) 것은, $K$가 반지름 $\lambda_2$인 공에 포함되고 반지름 $\lambda_1$인 공을 포함하며, $\lambda_1 / \lambda_2 = \alpha$인 경우입니다.

#### 구형 샘플링 기반

$P$가 단위 공 $B$에 포함되어 있고 $\alpha$-두껍다고 가정합니다. $B$와 동심인 반지름 2의 구(Sphere) $S$를 설정합니다. $S$ 위에 $\delta = 9\varepsilon\alpha/4$를 밀도(density)로 하는 $\delta$-조밀한(dense) 점 집합 $Q$를 구성합니다. $Q$의 각 점 $q'$에 대해, $P$에서 가장 가까운 이웃 $p'$를 계산하고, 이 점들의 집합 $C = {p'}$를 Coreset으로 합니다.

---

### 참고 자료

[원본 경로 #1](https://www.cs.cmu.edu/afs/cs/academic/class/15456-s14/Handouts/cmsc754-lects.pdf)

