---
title: 'A review of multi-objective optimization: Methods and its applications'
date: '2024-04-15'
tags: ['optimization', 'paper review']
---

### Abstract

다목적 최적화(Multi-Objective Optimization, MOO)에는 복잡한 수학적 방정식을 필요로 하지 않아 문제를 단순화할 수 있는 두 가지 방법이 있습니다. 바로 Pareto 방법과 스칼라화(Scalarization) 방법입니다.

Pareto 방법에서는 dominated solution과 non-dominated solution이 존재하며, 이는 지속적으로 업데이트되는 알고리즘을 통해 도출됩니다. 반면, 스칼라화 방법은 다목적 함수를 가중치(weight)를 이용하여 하나의 목적 함수로 변환하여 단일 해(single solution)를 생성합니다.

스칼라화에는 세 가지 가중치 방식이 있으며, 이는 동일 가중치(equal weights), 순위 중심 가중치(rank order centroid weights), 그리고 순위 합 가중치(rank-sum weights)입니다.

또한, Pareto 방법을 통해 얻은 해는 MOO의 성능 지표 구성 요소로 작용하여 compromise solution을 도출하며, Pareto optimal front의 형태로 시각화할 수 있습니다. 반면, 스칼라화 방법의 해는 스칼라 함수 형태의 성능 지표 구성 요소로서 적합도 함수(fitness function)에 통합됩니다.

---

### Introduction

최적값은 optimization process을 통해 찾을 수 있습니다. 하나의 목적 함수 또는 다목적 함수(multi-objective)를 가질 수 있으며 이러한 유형의 문제는 수학, 공학, 사회과학, 경제학, 농업, 항공, 자동차 등 일상생활의 다양한 분야에서 나타납니다.

경제 분야에서의 MOO 응용(Mardle, Pascoe, & Tamiz, 1998) 예로는 수산물 생물경제 모델(fisheries bioeconomic model) 최적화가 있습니다. 이 모델은 자원 남획에 대한 최적 추정과 관리 계획의 효과성을 평가하는 도구로 활용될 수 있으며 저자가 연구한 사례는 북해(North Sea) 어업에 대한 모델로, 다음의 네 가지 목적을 고려합니다.

1.이익 최대화

2.국가 간 역사적 할당량 비율 유지

3.산업 내 고용 유지

4.자원 낭비 최소화

금융 분야에서는 (Horn, Nafpliotis, & Goldberg, 1994; Ruspini & Zwir, 1999; Tapia & Coello, 2007; Zwir & Ruspini, 1999) 금융 시계열에서 기술적 분석 패턴을 식별하기 위해 Niched-Pareto 유전자 알고리즘(NPGA)이 사용됩니다. 여기서는 두 가지 목적이 고려되는데, 하나는 패턴의 일치 품질, 다른 하나는 크기 및 시간 간격입니다. 이 알고리즘을 통해 상승, 하락, 헤드앤숄더 패턴 구간을 적절히 탐색할 수 있습니다.

이와 같이 MOO 문제는 다양한 해법이 존재하며 주요 해법은 아래와 같습니다.

__1.global criterion method__ : 여러 개의 기준점을 이상적인 해로 정의하고 이를 기준으로 목적지 공간과 거리를 최소화합니다. 복수의 목적 함수를 단일 최적화 문제로 전환합니다.

__2.weighted-sum method__ : 여러 목적 함수를 가중치 벡터로 조합하여 단일 문제로 만듭니다. 가중치를 보통 1로 정규화하며 구현이 간단하다는 장점이 있지만 서로 다른 크기를 갖는 문제에서는 적절한 가중치 선택이 어렵고 biased trade off가 발생할 수 있으며 non-convex의 경우에도 효과적이지 않다는 단점이 있습니다.

__3.multi-objective evolutionary method__ : 확률적 최적화 기법으로 pareto 해를 탐색하고 각 세대마다 후보 해의 목적 함수 값을 계산하고 지배 관계를 바탕으로 다음 세대를 생성하도록 합니다.

---

### Methods

MOO를 사용하는 동기는 복잡한 수식을 필요로 하지 않기 때문에 문제를 단순화할 수 있다는 점입니다. MOO에서 의사결정 문제는 상충되는 여러 요소들 간의 절충(trade-off)을 가능하게 해줍니다. MOO는 빌프레도 파레토(Vilfredo Pareto)에 의해 도입되었습니다.

MOO에서는 목적 함수(objective function)의 벡터가 존재합니다. 각 목적 함수 벡터는 해(solution) 벡터의 함수입니다. MOO에서는 모든 목적을 동시에 만족시키는 단일 최적해는 존재하지 않으며, 여러 개의 최적해가 존재하게 됩니다.

수학적으로, MOO 문제는 다음과 같이 표현될 수 있습니다.

$$
f_{1.opt} = min(f_1(x)) \\
f_{2.opt} = min(f_2(x)) \\
f_{3.opt} = min(f_3(x)) \\
f_{n.opt} = max(f_n(x))
$$

여기서 x는 해이고 n은 목적함수의 개수, $f_k(x)$는 k번째 목적 함수가 됩니다. MOO에서는 목적 함수 벡터의 다차원 공간과 해 벡터의 결정 변수 공간이 존재합니다. 결정 변수 공간에서의 각 해 x는 목적 함수 공간에서의 한 점과 대응됩니다. 이 해 벡터와 목적 함수 벡터 사이의 매핑은 아래 이미지로 설명됩니다.

<img src="https://velog.velcdn.com/images/ski06043/post/d155e8a6-35ac-462e-81c3-316e9b0dd1db/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

이러한 매핑을 통해 convexity임을 판단하기 위해 모든 목적 함수와 해 공간 역시 convex해야 합니다. $f(\theta x + (1-\theta)y) \le \theta f(x) + (1-\theta)f(y)$에서 x, y는 함수 f의 정의역에 속하며 $\theta$는 [0, 1] 범위의 값입니다.

MOO에서 지배 해와 최적 값은 일반적으로 한 목적 함수의 값을 더 개선할 수 없는 경우 달성하는데 이 조건을 pareto optimality라고 하며 한 목적 함수의 값을 개선해도 다른 목적 함수에 영향을 주지 않는 해는 non-dominated, 반대의 해는 dominated라고 합니다.

<img src="https://velog.velcdn.com/images/ski06043/post/f46f8ad3-5402-4cf8-9eb4-8069e2cd5401/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

두 목적 함수 $f_1(x)$, $f_2(x)$에 대해 서로 다른 목적을 갖는 경우 pareto optimal front는 세 조합으로 나타날 수 있습니다.

1.f_1(x) 는 최소화, f_2(x) 는 최대화를 원한다면 우측에서 하락하는 형태의 convex

2.f_1(x) 는 최대화, f_2(x) 는 최소화를 원한다면 좌측으로 하락하는 형태의 upper convex

3.f_1(x) 는 최대화, f_2(x) 는 최대화를 원한다면 우측으로 하락하는 형태의 upper convex

각 목적 함수의 최대 최소 값이 서로 교차하는 지점에서 얻어지는 이상의 점을 유토피아 포인트라고 할 때 이 포인트로부터 가장 가까운 최적값은 유클리디안 거리로 구할 수 있습니다. 단 목적 함수가 3개보다 크다면 pof 시각화는 어렵습니다.

#### Continuously Updated method

이 방법은 비지배 해를 탐색하기 위해 사용되고 그 집합을 지속적으로 갱신하면서 더 나은 해를 찾습니다.

초기 비지배 해 집합 P'=1, i=2, j=1로 설정합니다. i번째 해와 P'의 j번째 해를 비교할 때 i번째 해가 j번째 해를 지배하면 j를 집합에서 제거하고 j를 증가시켜 다시 비교합니다. 그 반대의 경우 i를 하나 증가시켜 다시 비교합니다. j가 더 이상 존재하지 않으면 i를 비지배 해 집합에 추가하도록 합니다.

이 때의 최적값은 아래의 수식을 통해 구할 수 있습니다.

$$
d_E = min\sqrt{(\frac{Q_1 - Q^*_1}{Q_1norm})^2+(\frac{Q_2 - Q^*_2}{Q_2norm})^2}
$$

여기서 $Q_1$, $Q_2$는 유토피아 포인트 좌표이고 norm은 정규화 계수로 각 좌표의 최소값을 기반으로 결정됩니다.

#### Scalarization method

스칼라화 기법은 다목적 함수를 하나의 단일 해로 변환하며 가중치를 최적화 과정 이전에 결정합니다. 아래의 스칼라 적합도 함수로 정의를 합니다.

$$
F(x) = w_1f_1(x) + ... + w_nf_n(x)
$$

각 목적함수에 가중치를 결정하는 방식은 다음과 같이 세 가지가 있습니다.

1.equal weights : $w_i = 1/n$

2.rank order centroid weights : $w_i = (1/n) * \sum_{k=i}^{n} (1/k)$

3.rank-sum weights : $w_i = \frac{2(n+1-i)}{n(n+1)}$

이 방법에서는 최소화하려는 목적 함수는 음수로 최대화하려는 목적 함수는 양수로 표시됩니다. 각 함수 간 공정성을 확보하기 위해서 root mean square로 정규화가 필요합니다.

$$
F(x) = -\frac{w_1f_1(x)}{\sqrt{E(f_1^2(x))}} \\
+ \frac{w_2f_2(x)}{\sqrt{E(f_2^2(x))}} \\
- \frac{w_3f_3(x)}{\sqrt{E(f_3^2(x))}}
$$

위 식에서 F(x)는 적합도 함수이고 f_k(x)는 목적함수이며 w_k는 가중치를 나타냅니다.

---

### Applications of method

#### 1. Pareto

adhoc network에서 릴레이 노드를 선택하는 최적화 사례에서 처리량, 부하의 균형, 전력 소비 등을 대상으로 pareto를 사용하였습니다.

건물 외부 환경에서는 자유 공간 전파(free space propagation)이 사용되며 일부 파라미터 조정과 shadowing을 반영하는데 이 환경에서의 노드 전력 소비는 아래와 같이 계산할 수 있습니다.

$$
P_t = kP_rd^{\alpha}10^{X_{\psi}/10}
$$

건물 내부 환경에서는 네트워크 노드들이 실내에 배치된 경우로 벽으로 분리되어 있기 때문에 벽의 투과 계수 및 벽의 수를 반영하여 아래와 같이 계산이 됩니다.

$$
P_t = kP_rd^{\alpha}10^{X_{\psi}/10}*\frac{1}{\Pi_{M}^{m-1} \psi^2(m)}
$$

릴레이 노드 선택에서 최적 해를 유클리디안 거리로 완전 탐색법을 통해 결정하면 외부 조건에서 전력 소비, 처리량, 부하 등 3차원 pof가 그려지며 내부 조건에서는 동일한 세 기준의 pof가 그려지게 됩니다. 이 때 61.1시간이 소요되었다고 합니다.

#### 2. Scalarization

cross layer optimization은 multi-hop wireless adhoc network 상에서 최적의 릴레이 선택을 위해 사용되는데 각각의 자원에 공정성을 부여하고 동일한 가중치를 부여합니다. 각 환경 모두 32개의 노드를 가지며 송신 노드는 노드 1, 수신 노드는 노드 32로 지정을 하며 나머지가 릴레이 역할을 한다고 가정하고 경로 쌍의 조합은 3hope과 3hope으로 이루어져 총 조합 수는 (N-2)(N-3)P_2^{(N-2)-2} 가지입니다.

스칼라화 기법은 유전 알고리즘(GA)로 최적 값을 결정하는데 500회 반복하는 탐색에서 13.96시간이 소요되었다고 합니다. 또한 각 함수에 가중치를 다르게 설정하면 최적 경로 쌍이 달라지게 되는데 전수조사 기준 3.72배 가량 빨라졌다고 합ㄴ디ㅏ.

---

### 참고 자료

[원본 경로 #1](https://www.tandfonline.com/doi/full/10.1080/23311916.2018.1502242)



