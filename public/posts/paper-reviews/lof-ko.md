---
title: 'Lof, identifying density based local outliers'
date: '2022-09-12'
tags: ['anomaly detection', 'paper review']
---

### Overview

KDD는 "knowledge discovery in database"의 약어로 데이터베이스 내에서 지식을 발견한다는 의미이고 1996년 Fayyad가 체계적으로 정리한 프로세스 중 하나입니다.

---

### Abstract

기존의 이상치 탐지 연구는 이상치를 binary property로 간주해왔고, 이 논문에서는 많은 상황에서 각 객체에 degree of being an outlier를 부여하는 것이 더 의미 있다고 주장합니다. 이를 객체의 지역 이상치 계수(LOF)라고 부릅니다. LOF는 객체가 주변 이웃과 얼마나 고립되어 있는지에 따라 달라지는 지역적 특성을 가진다고 소개되어 있습니다.

---

### Introduction

이 논문에서는 KDD 방법론에서부터 시작하여 다수의 비율의 패턴을 찾는 것이 아닌 소수의 패턴(outlier)을 찾는 사례에 LOF가 유용할 것이라고 말하고 있습니다.이상치 탐지 태스크에서는 군집화(Clustering) 연구를 언급하면서 이는 군집에 속하지 않는 객체를 노이즈(Noise)로 간주하고 전역적(Global)으로 이상치를 계산하는 관점이라고 차이를 말합니다.

---

### Problems of existing approaches

기존의 거리기반 접근법을 우선 소개하였습니다.

__정의 1: Hawkins__

"이상치는 다른 관측값들과 매우 다르게 나타나, 다른 메커니즘에 의해 생성되었다는 의심을 불러일으키는 관측값이다."
이 방법론은 $o$ $p$ $q$를 사용해서 객체 $p$, $q$ 간의 거리를 $d(p,q)$로 표시한 아래의 수식으로 정의가 된다고 합니다.

$$
d(p,c) = min{d(p,q)|q ∈ C}
$$

__정의 2: DB($pct$, $dmin$)__

데이터셋 D의 객체 p는 D에 있는 객체의 최소 백분율 $pct$가 p로부터의 거리 $dmin$보다 크면 DB($pct$, $dmin$)-이상치이다. 즉, 집합 {$q∈D|d(p, q)≤dmin$}의 크기가 D 크기의 (100 - $pct$)% 이하인 경우를 말한다.이 방법론은 특정 유형의 이상치만을 포착하게 되는데 데이터셋을 전역적으로 바라보는 특징으로 인하여 이들은 특히 주변 밀도와 관련하여 국지적 이웃에 비해 이상치인 객체들 즉, "국지적" 이상치를 잘 구분해내지 못한다고 합니다.

---

### Formal definition of Local Outlier

이 논문에서 기존 Binary property가 아닌 degree of being an outlier를 나타내기 위해 사용한 개념 중 일부를 아래에 정리하였습니다.

__정의 1: $k$-distance of an object $p$__

임의의 양의 정수 k에 대해, 객체 p의 $k$-거리($k$-distance(p))는 p와 객체 $o ∈ D$ 사이의 거리 $d(p,o)$로 정의되며, 다음 조건을 만족한다.
(i) 적어도 $k$개의 객체 $o'$에 대해 $d(p,o')$ ≤ $d(p,o)$가 성립하고,
(ii) 최대 $k-1$개의 객체 $o'$에 대해 $d(p,o')$ < $d(p,o)$가 성립합니다.

__정의 2: $k$-distance neighborhood of an object $p$__

$p$의 $k$-거리가 주어졌을 때, $p$의 $k$-거리 이웃은 $p$로부터의 거리가 $k$-거리보다 크지 않은 모든 객체를 포함합니다. 즉, { $q ∈ D{p}$ | $d(p, q)$ ≤ $k$-distance($p$) }를 만족하는 객체 $q$를 $p$의 $k$-최근접 이웃이라고 부르게 됩니다.

__사용 1: LOF에 대한 상한과 하한__

클러스터 외부에 있는 객체들에 대한 이상치 정도는 일반화가 가능합니다. 모든 객체 p에 대해 $directmin(p)$는 $p$와 $p$의 최근접 이웃 사이의 최소 도달 가능성 거리를 나타냅니다. 또한 $directmax(p)$는  최대값을 나타냅니다.

Local Reachability Density(이하 LRD) 지표는 기준 데이터 근방 k개의 데이터와의 밀집 정도를 나타내는데 사용합니다. 이 지표를 사용하면 아래와 같이 표현됩니다.

<img src="https://velog.velcdn.com/images/ski06043/post/b4cfa621-6a01-46bb-8ac3-09dc51195466/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

$$
lrd(p) = 1/directmax(p) \rightarrow directmax(p) \\
= max \{ reach-dist(p, q) | q \in NMinPts(p) \}
$$

$$
lrd(o) = 1/indirectmax(p) \rightarrow indirectmax(p) \\
= max \{ reach-dist(q, o) | q \in NMinPts(p) \& o \in NMinPts(q) \}
$$

---

### Minpts의 역할

#### Minpts에 따른 LOF 변화

결론적으로 LOF 값은 MinPts 값에 대해 단조 증가하거나 단조 감소하지 않는다고 합니다.

<img src="https://velog.velcdn.com/images/ski06043/post/6c69db18-59a0-4d22-b19c-4c9b3a3d655c/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

#### Minpts 범위 설정

LOF 값이 단조적이지 않기 때문에 휴리스틱으로, LOF를 계산할 것을 제안하였고, 이 논문에서는 MinPts 범위의 "하한(lower bound)"과 "상한(upper bound)"을 각각 MinPtsLB와 MinPtsUB로 정의합니다.
MinPtsLB는 특정 클러스터가 "지역적 이상치"와 구분되기 위해 필요한 최소 객체 수로 간주할 수 있습니다. 대부분의 데이터셋에서는 MinPtsLB를 10에서 20 사이로 설정하는 것이 일반적으로 적합합니다.
MinPtsUB는 특정 "가까운(closed by)" 객체 집합 $C$가 지역적 이상치가 될 수 있는 최대 크기를 나타냅니다. 이에 따라 당연하게도 MinPts 값이 MinPtsUB를 초과하면, $C$의 모든 객체의 LOF 값은 1에 가까워집니다.

---

### 참고 자료

[원본 경로 #1](https://dl.acm.org/doi/pdf/10.1145/335191.335388)



