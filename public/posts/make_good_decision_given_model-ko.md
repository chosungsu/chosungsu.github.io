---
title: 'Making Sequences of Good decisions Given a Model of the world'
date: '2025-03-07'
tags: ['cs234', 'lecture']
---

### markov reward process calculation

마르코프 보상 과정(MRP)은 마르코프 연쇄에 보상이 추가된 형태입니다. MRP의 목표는 예상 미래 보상의 합계를 최대화하는 것입니다.

1.반환($Gt$): 시간 $t$부터 Horizon $H$까지의 할인된 보상의 합입니다. $Gt = rt + γrt+1 + γ^2rt+2 + ··· + γ^(H-1)rt+H-1$

2.상태 가치 함수($V(s)$): 상태 $s$에서 시작할 때 예상되는 반환의 기댓값입니다. $V(s) = E[Gt |st = s]$

3.벨만 방정식(Bellman Equation): MRP의 가치 함수는 다음 방정식을 만족합니다. $V(s) = R(s) + γ Σs'∈S P(s'|s)V(s')$

    - 행렬 형태: V = R + γPV.
    - 해석적 해: V = (I - γP)^-1 R. 이는 O(N^3)의 계산 복잡도를 가집니다.

4.반복 알고리즘 (동적 계획법): MRP의 가치 함수를 반복적으로 계산할 수 있습니다. $Vk(s) = R(s) + γ Σs'∈S P(s'|s)Vk-1(s')$

    - V0(s)는 모든 s에 대해 0으로 초기화됩니다.
    - 각 반복마다 O(|S|^2)의 계산 복잡도를 가집니다.

---

### markov decision processs

마르코프 결정 과정은 보상 과정($r$)에 행동($a$)이 추가된 것입니다. mdp는 튜플 $(S, A, P, R, \gamma)$ 로 정의되고 각각 상태 집합, 행동 집합, 행동에 대한 dynamic/transition 모델, 보상 함수, 할인율을 나타냅니다.

#### markov policy

markov reward process가 mdp+$\pi(a|s)$에 해당합니다. mrp에서 아래 두 공식으로 변환될 수 있습니다.

$$
R^{\pi}(s)=\sum_{a \in A} \pi(a|s) R(s,a), \\
P^{\pi}(s'|s)=\sum_{a \in A} \pi(a|s) R(s'|s,a)
$$

#### evaluation, iterative algorithm

주어진 정책 $\pi$를 따를 때 예상되는 보상을 추정하고 예측하는 과정입니다.

$$
V_k^{\pi}(s)=\sum_{a} \pi(a|s)[R(s,a) \\
+\gamma \sum_{s' \in S} p(s'|s, a) V_{k-1}^{\pi}(s')]
$$

이는 특정 정책에 대한 bellman backup이라고 합니다.

#### control

최적의 정책($\pi$)를 찾기 위한 최적화 과정입니다. $\pi^*(s)=argmax_{\pi}V^{\pi}(s)$ 와 같이 정의되며 mdp에는 유일한 최적가치 함수가 존재합니다. 결정론적 정책의 수는 $|A|^{|S|}$이므로 policy iteration이 열거하는 것보다 효율적입니다.

---

### policy iteration(pi)

$\pi_0(s)$를 무작위 값으로 초기화를 합니다.

$\pi$가 더 이상 변하지 않을 때까지 반복하여 현재 정책에 대한 가치함수인 $V^{\pi i}$를 상태-행동 가치함수$(Q^{\pi}(s,a))$를 통해 계산하고 이를 사용하여 새로운 정책 $\pi_{i+1}$을 계산합니다.

$$
Q^{\pi}(s,a)=R(s,a)+\gamma \sum_{s' \in S} P(s'|s, a)V^{\pi}(s'), \\
\pi_{i+1}(s)=argmax_aQ^{\pi_i}(s, a) \forall s \in S
$$

monotonic improvement는 두 정책($π_1$과 $π_2$)의 가치 함수를 비교하는데 특정 정책을 따를 때 상태 $s$에서 시작하여 얻을 수 있는 할인된 미래 보상의 예상값 합계를 말하는데 새로운 정책의 가치가 이전 정책의 가치보다 항상 크거나 같음을 보장합니다.

#### markov assumption

information state는 sufficient statistic of history입니다.

상태($s_t$)는 markov인 경우에만 $p(s_{t+1}|s_t, a_t)=p(s_{t+1}|h_t, a_t)$를 만족하는데 미래는 현재가 주어졌을 때 과거와 독립적이라는 의미를 갖습니다.

#### mdp model

에이전트가 취하는 행동마다 환경이 변하는 정도에 대한 표현입니다. transition/dynamics model에서는 아래와 같이 에이전트의 상태를 예측합니다.

$$
p(s_{t+1}=s'|s_t=s, a_t=a)
$$

reward model은 즉각적인 보상을 예측합니다.

$$
r(s_t=s, a_t=a)=E(r_t|s_t=s, a_t=a)
$$

#### policy, $\pi$

에이전트가 각 상태에서 행동을 선택하는 방법을 결정하는 것입니다.

deterministic policy에서는 $\pi(s)=a$와 같이 상태를 행동에 매핑합니다.

stochastic policy에서는 $\pi(a|s)=pr(a_t=a|s_t=s)$와 같이 상태가 주어졌을 때 행동 분포를 매핑합니다.

---

### value iteration(vi)

이는 또다른 최적 정책 계산 방법입니다. $k=1$, $V_0(s)=0$으로 설정하고 k 단계에 대한 최적 가치를 유지하면서 더 긴 에피소드를 고려하도록 반복합니다.

상태 $s$마다 $V_{k+1}(s)=max_a[R(s,a)+\gamma \sum_{s' \in S} P(s'|s, a) V_k(s')]$로 $|V_{k+1}-V_k|_{\infty} \le \epsilon$이 될 때까지 반복 계산합니다.

할인율 $\gamma < 1$이거나 터미널 상태에 도달할 확률이 1인 경우 vi가 수렴합니다. 이유는 $\gamma < 1$은 contraction operator이기 때문입니다.

contraction operator는 아래와 같이 정의됩니다.

$$
|OV-OV'| \le |V-V'|
$$

이를 만족하면 $O$는 contraction operator라고 합니다. 좌항에 있는 거리가 우항에 있는 거리보다 같거나 작아지는 것을 의미합니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/gHdsUUGcBC0?si=ZJYtVof8NhBtA_LN)



