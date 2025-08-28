---
title: 'Planning by dynamic programming'
date: '2025-03-10'
tags: ['reinforcement learning', 'lecture']
---

### Policy evaluation

주어진 정책 $\pi$를 평가하는 문제는 벨만 기대 백업을 반복적으로 적용하여 해결합니다.

동기식 백업(synchronous backups)에서 각 반복과 모든 상태에서 다음 상태$(s')$의 가치함수 $v_k(s')$를 이용해 다음 반복의 가치함수를 갱신합니다.

$$
v_{k+1}(s)=\sum_{a \in A} \pi(a|s)(R_s^a+\gamma \sum_{s' \in S} P_{ss'}^a v_k(s')) \\
\Rightarrow v^{k+1} \sim R^{\pi}+\gamma P^{\pi}v^k
$$

---

### Policy iteration

<img src="https://velog.velcdn.com/images/devjo/post/7ec398e5-088e-4282-8758-068e07306d76/image.png" alt="Example Image" style="display: block; margin: 0 auto; height:200;" />

정책 이터레이션은 주어진 정책 $\pi$를 반복적으로 평가하고 개선하여 최적 정책 $\pi$를 찾는 것입니다. 다음의 두 단계로 구성됩니다.

#### 1. Policy Evaluation

$$
v_{\pi}(s)=E[R_{t+1}+\gamma R_{t+2}+ \dots |S_t=s]
$$

이는 벨만 기대 백업을 반복적으로 적용하여 수행할 수 있습니다. 현재 정책에 대한 가치함수를 추정하는 과정입니다.

#### 2. Policy Improvement

평가된 가치 함수에 대해 탐욕적으로 행동하여 새로운 정책을 생성하는 과정입니다.

$$
\pi'(s)=\text{argmax}_{a \in A} q_{\pi}(s,a)
$$

이 과정은 모든 상태 $s$에 대해 가치를 한 단계 개선합니다. 결과적으로 새로운 정책의 가치 함수는 이전 정책의 가치 함수보다 항상 같거나 큽니다.

만약 정책 개선 과정에서 더 이상 가치가 개선되지 않는다면 즉 $v_{\pi'}(s) = v_\pi(s)$인 경우 벨만 최적 방정식(bellman optimality equation)이 만족됩니다.

$$
q_{\pi}(s,\pi'(s))=\text{max}_{a \in A} q_{\pi}(s,a) \\
=q_{\pi}(s,\pi(s))=v_{\pi}(s)
$$

이 때 $v_\pi(s) = \max_{a \in A} q_\pi(s, a)$가 성립하므로, $v_\pi(s) = v_*(s)$가 되어 현재 정책이 최적임을 의미합니다.

---

### Value iteration

최적 정책(optimal policy)는 두 가지 요소로 나눌 수 있습니다.

$\rightarrow$ 최적의 첫 번째 행동 $A^*$

$\rightarrow$ 그 다음 상태 $S'$에서 이어지는 최적 정책

#### 최적성의 원리

정책 $\pi(a|s)$가 상태 $s$에서 최적의 가치 $v_{\pi}(s) = v_*(s)$를 달성하는 필요충분 조건은 다음과 같습니다. 상태 $s$로부터 도달 가능한 어떤 상태 $s'$에 대해서도 $\pi$가 상태 $s'$에서 최적 가치를 달성해야만 합니다. 만약 하위 문제$(s')$에서의 최적 가치인 $v_{s'}$의 해답을 알고 있다면 $v_{s}$의 해답은 one-step lookahead로 찾도록 합니다.

$$
v_*(s) \leftarrow max_{a \in A} (R_s^a + \gamma \sum_{s' \in S} P_{ss'}^a v_*(s'))
$$

가치 반복의 아이디어는 이 업데이트를 반복적으로 적용하는 것입니다. 더 쉽게는 최종 보상에서 시작하여 역행으로 되짚어가는 방식이라고 생각할 수 있습니다.

---

### Extensions to dynamic programming

여기서는 동기식 동적 프로그래밍의 한계를 극복하기 위한 비동기식 동적 프로그래밍과 그 안의 세 가지 방법에 대해 알아보겠습니다.

#### 1. Asynchronous dynamic programming

비동기식 dp는 개별 상태를 어떤 순서로든 백업합니다. 선택된 각 상태에 대해 적절한 백업을 적용하며 이를 통해 계산량을 크게 줄일 수 있습니다.

#### 2. In-place dynamic programming

동기식 가치 반복은 가치 함수를 두개 저장합니다. 예를 들어 모든 $s \in S$에 대해 $v_{new}(s) \leftarrow max_{a \in A} (R_s^a + \gamma \sum_{s' \in S} P_{ss'}^a v_{old}(s'))$와 $v_{old} \leftarrow v_{new}$로 저장하며 in-place dp는 $v(s) \leftarrow max_{a \in A} (R_s^a + \gamma \sum_{s' \in S} P_{ss'}^a v(s'))$ 한개만 저장합니다.

#### 3. Prioritised sweeping

벨만 오차의 크기를 사용하여 상태 선택을 유도하는 과정입니다. 예를 들어 다음과 같이 정의합니다.

$$
|\text{max}_{a \in A} (R_s^a + \gamma \sum_{s' \in S} P_{ss'}^a v(s'))-v(s)|
$$

이 때 가장 큰 오차가 남아있는 상태를 백업합니다. 우선순위 큐를 유지함으로써 효율적인 구현이 가능합니다.

#### 4. Full width backups

DP는 full width 백업을 사용합니다. 각 백업마다 후속 상태와 행동이 고려되며 이는 transition 지식을 사용하여 진행됩니다. 하지만 큰 차원에서는 차원의 저주에 빠지게 됩니다.

---

### Contraction Mapping Theorem

가치함수들의 벡터 공간 $V$는 $|S|$차원으로 공간의 각 점은 가치 함수 $v(s)$를 완벽하게 나타냅니다.

$$
|u-v|_{\infty}=\text{max}_{s \in S} |u(s)-v(s)|
$$

두 상태-가치 함수 $u,v$ 사이의 거리는 무한 노름으로 측정하고 이는 즉 상태-가치 간의 가장 큰 차이를 측정하는 것입니다.

$$
T_{\pi}(v)=R^{\pi}+\gamma P^{\pi}v
$$

벨만 기대 백업 연산자인 $T_{\pi}$는 위와 같이 정의되며 이는 $\gamma$축소 사상이므로 가치 함수를 적어도 $\gamma$만큼 더 가깝게 만드는 역할을 합니다.

위 정리들을 활용하여 축소 사상 정리는 연산자 $T_{\pi}$에 대해 complete인 거리공간 $V$에서 축소 사상일 경우 유일한 고정점으로 수렴하고 수렴 속도는 $\gamma$의 선형 속도에 따른다고 할 수 있습니다.

---

### 참고 자료

[원본 경로 #1](https://davidstarsilver.wordpress.com/wp-content/uploads/2025/04/lecture-3-planning-by-dynamic-programming-.pdf)



