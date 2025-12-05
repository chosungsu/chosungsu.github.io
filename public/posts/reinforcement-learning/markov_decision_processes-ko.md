---
title: 'Markov Decision Processes'
date: '2025-03-07'
tags: ['reinforcement learning', 'lecture']
---

### The Agent–Environment Interface

에이전트와 환경은 지속적으로 상호작용하며, 에이전트는 행동(actions)을 선택하고 환경은 그 행동에 반응하며 새로운 상황(situations)을 제시합니다. 환경은 또한 에이전트가 시간이 지남에 따라 최대화하려고 노력하는 특별한 수치 값인 보상(rewards)을 발생시킵니다.

실제 고정된 시간 간격일 필요는 없으며, 의사 결정 및 행동의 임의의 연속적인 단계일 수 있습니다.

---

### Goals and Rewards

보상 가설은 목표와 목적이라고 의미하는 모든 것은 누적된 스칼라 신호(보상)의 기대값 합계를 최대화하는 것으로 잘 생각될 수 있다. 보상 신호는 에이전트에게 우리가 원하는 것을 어떻게 달성할지에 대한 사전 지식을 전달하는 곳이 아닙니다.

예를 들면 체스 에이전트는 상대방의 말을 잡는 것과 같은 하위 목표가 아니라 실제로 승리하는 것에 대해서만 보상해야 합니다. 하위 목표에 보상하면, 에이전트는 실제 목표를 달성하지 않더라도 하위 목표만 달성하는 방법을 찾을 수 있습니다.

---

### Returns

에이전트의 목표를 공식적으로 정의하기 위해 기대 리턴(expected return)을 최대화하는 것을 목표로 합니다.

최종 시간 단계 $T$가 있는 과제(예: 게임, 미로 통과)에서는 리턴이 보상의 단순 합계입니다.

$$
G_t = R_{t+1} + R_{t+2} + R_{t+3} + \cdots + R_T
$$

각 에피소드는 종료 상태(terminal state)로 끝나고 재설정됩니다.

에이전트-환경 상호작용이 무한히 계속되는 과제(예: 지속적인 공정 제어)를 지속적 과제라고 합니다. 이 경우 $T = \infty$이므로 단순 합계 $G_t$가 무한대가 될 수 있습니다. 따라서 일반적으로 할인(discounting) 개념을 사용하여 기대 할인 리턴(expected discounted return)을 최대화합니다.

$$
G_t = R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3} + \cdots = \sum_{k=0}^{\infty} \gamma^k R_{t+k+1}
$$

---

### The Markov Property

상태 신호의 조건에는 즉각적인 감각뿐만 아니라 과거 감각의 기억이나 다른 복잡한 구조를 포함하여 많은 정보를 담을 수 있는 포괄성과 의사 결정에 유용할 모든 것을 알려줄 것으로 기대해서는 안 되는 불완전성 허용이 있습니다.

마르코프 속성을 가진 상태 신호는 과거의 모든 감각의 완전한 기록보다 많을 필요는 없지만 모든 관련 정보를 보유합니다. 즉 현재 상태와 행동만으로 모든 미래 상태와 기대 보상을 예측할 수 있습니다. 이를 경로의 독립성이라고 합니다.

$$
\Pr\{R_{t+1} = r, S_{t+1} = s' | S_0, A_0, R_1, \ldots, S_t, A_t\}
$$

환경의 동역학은 일반적으로 과거에 일어난 모든 것에 의존합니다. 그러나 마르코프 속성을 가지는 경우 환경의 $t+1$에서의 반응은 오직 현재 상태 $S_t$와 행동 $A_t$에만 의존합니다.

#### Markov Decision Processes

마르코프 속성을 만족하는 강화 학습 과제를 마르코프 결정 과정(Markov decision process, MDP)이라고 합니다. 상태 공간과 행동 공간이 유한하면 유한 마르코프 결정 과정(finite MDP)이라고 합니다.

주어진 상태 $s$와 행동 $a$에 대해, 다음 상태 $s'$와 보상 $r$의 가능한 각 쌍에 대한 확률 $p(s', r|s, a)$는 다음과 같습니다.

$$
p(s', r|s, a) = \Pr\{S_{t+1} = s', R_{t+1} = r \mid S_t = s, A_t = a\}
$$

예를 들면 재활용 로봇은 다음과 같은 MDP를 생각할 수 있습니다.

상태집합은 $\mathcal{S}$: $\{ \text{high, low} \}$로 배터리 양을 표현하고 행동집합은 $\mathcal{A}(\text{high}) = \{ \text{search, wait} \}$, $\mathcal{A}(\text{low}) = \{ \text{search, wait, recharge} \}$로 구분합니다. 보상은 탐색 중 예상되는 캔 수, 대기 중 예상되는 캔 수로 표현합니다.

#### Value Functions

가치 함수는 특정 정책 $\pi$에 따라 정의됩니다. $\pi(a|s)$는 상태 $s$에서 행동 $a$를 취할 확률입니다.

정책 $\pi$에 따른 상태 $s$의 가치 $v_\pi(s)$는 상태 $s$에서 시작하여 이후 정책 $\pi$를 따랐을 때의 기대 리턴입니다.

$$
\begin{aligned}
&v_\pi(s) = E_\pi[G_t \mid S_t = s] \\
&= E_\pi \left[ \sum_{k=0}^{\infty} \gamma^k R_{t+k+1} \mid S_t = s \right]
\end{aligned}
$$

정책 $\pi$에 따른 상태 $s$에서 행동 $a$를 취하는 가치 $q_\pi(s, a)$는 상태 $s$에서 시작하여 행동 $a$를 취한 후, 이후 정책 $\pi$를 따랐을 때의 기대 리턴입니다.

$$
\begin{aligned}
&q_\pi(s, a) = E_\pi[G_t \mid S_t = s, A_t = a] \\
&= E_\pi \left[ \sum_{k=0}^{\infty} \gamma^k R_{t+k+1} \mid S_t = s, A_t = a \right]
\end{aligned}
$$

가치 함수의 근본적인 속성은 재귀적 관계를 만족한다는 것입니다. 정책 $\pi$에 대한 $v_\pi$의 벨만 방정식(Bellman equation)은 다음과 같습니다.

$$
v_\pi(s) = \sum_{a} \pi(a|s) \sum_{s', r} p(s', r|s, a) \left[ r + \gamma v_\pi(s') \right]
$$

이는 현재 상태의 가치 $v_\pi(s)$가 가능한 다음 상태 $s'$의 가치($v_\pi(s')$에 의해 할인됨)에 더해진 기대 보상 $r$의 평균과 같아야 함을 나타냅니다.

#### Optimal Value Functions

최적 정책은 다른 모든 정책보다 크거나 같은 기대 리턴을 갖는 정책을 말합니다.

$$
\begin{aligned}
&v^*(s) = \max_{\pi} v_\pi(s) \\
&q^*(s, a) = \max_{\pi} q_\pi(s, a)
\end{aligned}
$$

유한 MDP의 경우, 벨만 최적 방정식은 고유한 해를 갖지만, 실제로 이 해를 직접 찾는 것은 $p(s', r|s, a)$를 정확히 알아야 하며 충분한 계산 자원이 필요하기 때문에 어렵습니다.

---

### 참고 자료

[원본 경로 #1](https://davidstarsilver.wordpress.com/wp-content/uploads/2025/04/lecture-2-mdp.pdf)



