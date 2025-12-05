---
title: 'Eligibility Traces'
date: '2025-03-21'
tags: ['reinforcement learning', 'lecture']
---

### $n$-Step TD Prediction

$n$-단계 TD 방법은 MC와 1단계 TD의 절충안으로 $n$개의 보상과 $n$단계 이후의 추정 가치를 기반으로 백업을 수행합니다.

$n$-단계 리턴에서 MC 백업은 에피소드 종료 시점까지의 전체 리턴 $G_t$를 타겟으로 사용하고, 1단계 TD 백업은 다음 단계의 보상 $R_{t+1}$과 다음 상태의 추정 가치 $\gamma V_t(S_{t+1})$를 타겟으로 사용합니다. $n$-단계 백업의 타겟은 $n$-단계 리턴이며 이는 $n$단계 이후에 절단(truncated)되고, 그 후의 누락된 보상은 $V_t(S_{t+n})$로 보정됩니다.

$$
G^h_t(c) = R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3} + \cdots + \gamma^{n-1} R_h + \gamma^n c
$$

여기서 $c$는 보정 항(correction term)입니다. TD 예측에서는 $c = V_t(S_{t+n})$를 사용합니다.

시간 $t$에 상태 $S_t$에 적용되는 $n$-단계 백업은 추정 가치 $V(S_t)$에 다음 증분을 생성합니다.

$$
\Delta_t(S_t) = \alpha \left[ G^{t+n}_t(V_t(S_{t+n})) - V_t(S_t) \right]
$$

오차 감소 속성에 따라서 $n$-단계 리턴을 사용하는 새로운 추정치의 최악 오차는 $\gamma^n$에 현재 추정치 $V$의 최악 오차를 곱한 것보다 작거나 같음이 보장됩니다.

---

### The Forward View of TD($\lambda$)

TD($\lambda$) 알고리즘은 모든 $n$-단계 백업을 가중 평균하는 한 가지 특정 방식으로 이해할 수 있습니다.

$\lambda$-리턴에서 TD($\lambda$)는 $\lambda \in [0, 1]$에 비례하여 가중치를 부여한 모든 $n$-단계 리턴의 합인 $\lambda$-리턴 $L_t$를 타겟으로 사용합니다.

$$
L_t = (1 - \lambda) \sum_{n=1}^\infty \lambda^{n-1} G^{t+n}_t(V_t(S_{t+n}))
$$

1단계 리턴에 가장 큰 가중치 $(1-\lambda)$가 부여되고, $n$이 증가함에 따라 $\lambda^{n-1}$에 비례하여 가중치가 감소합니다.

$\lambda = 0$인 경우 1단계 리턴 $G^{t+1}t(V_t(S{t+1}))$으로 축소되며 이는 TD(0)와 동일합니다. $\lambda = 1$인 경우 MC 알고리즘과 동일합니다.

$\lambda$-리턴 알고리즘은 $\lambda$-리턴을 타겟으로 하여 백업을 수행합니다. 각 단계 $t$에서 방문한 상태 $S_t$의 가치에 대한 증분은 다음과 같습니다.

$$
\Delta_t(S_t) = \alpha \left[ L_t - V_t(S_t) \right]
$$

---

### The Backward View of TD($\lambda$)

역방향 관점은 인과적이고 증분적인 메커니즘을 제공하여 순방향 관점을 근사합니다.

각 상태 $s$에는 적격성 추적(eligibility trace) $E_t(s) \in \mathbb{R}^+$라는 추가 메모리 변수가 연결됩니다. 적격성 추적은 상태가 얼마나 최근에 방문되었는지에 대한 기록을 $\gamma\lambda$의 항으로 유지합니다.

방문하지 않은 모든 상태의 추적은 $\gamma\lambda$에 의해 감쇠됩니다.

$$
E_t(s) = \gamma\lambda E_{t-1}(s)
$$

현재 방문된 상태 $S_t$의 추적은 감쇠된 후 1만큼 증가합니다.

$$
E_t(S_t) = \gamma\lambda E_{t-1}(S_t) + 1
$$

TD 오차 $\delta_t$는 학습의 강화 신호 역할을 합니다.

$$
\delta_t = R_{t+1} + \gamma V_t(S_{t+1}) - V_t(S_t)
$$

역방향 관점에서, 이 전역 TD 오차 신호는 추적이 0이 아닌 모든 상태의 가치에 비례적인 업데이트를 촉발합니다.

$$
\Delta V_t(s) = \alpha \delta_t E_t(s)
$$

---

### Equivalences of Forward and Backward Views

주요 등가성으로 $\lambda = 0$에서 1단계 방법과 모든 $\lambda$ 기반 방법은 등가입니다. 이 경우 백업 타겟이 모두 동일하기 때문입니다. 오프라인 $\text{TD}(\lambda)$와 $\text{constant-}\alpha \text{ MC}$ 방법은 $\lambda=1$일 때 등가입니다.

#### True Online TD($\lambda$)

온라인 방법의 경우 $\lambda$-리턴 알고리즘과 $\text{TD}(\lambda)$는 일반적으로 정확히 등가이지 않습니다. 복잡한 가치 함수 업데이트를 통해 정의됩니다.

$$
\begin{aligned}
&V_{t+1}(s) = V_t(s) + \alpha \left[ \delta_t + V_t(S_t) - V_{t-1}(S_t) \right] E_t(s) \\
&- \alpha I_{s S_t} \left[ V_t(S_t) - V_{t-1}(S_t) \right]
\end{aligned}
$$

True Online TD($\lambda$)는 다른 온라인 방법들과 비교했을 때 약간 더 나은 성능을 보이거나 적어도 네덜란드 추적을 사용하는 $\text{TD}(\lambda)$와 비슷한 성능을 보였습니다.

---

### Sarsa($\lambda$)

적격성 추적을 $\text{TD}(\lambda)$에서처럼 예측뿐만 아니라 제어에서는 상태 가치 $V_t(s)$ 대신 행동 가치 $Q_t(s, a)$를 학습하는 것입니다. Sarsa에 적격성 추적을 결합한 on-policy TD 제어 방법이 Sarsa($\lambda$)입니다.

추적은 누적, 대체, 또는 네덜란드 추적 중 하나일 수 있으며, 상태 $S_t$ 대신 상태-행동 쌍 $(S_t, A_t)$이 방문될 때 활성화된다는 점을 제외하고는 $\text{TD}(\lambda)$와 동일하게 업데이트됩니다. $V_t(s)$ 대신 $Q_t(s, a)$, $E_t(s)$ 대신 $E_t(s, a)$를 대입합니다.

$$
Q_{t+1}(s, a) = Q_t(s, a) + \alpha \delta_t E_t(s, a)
$$

---

### Watkins’s Q($\lambda$)

왓킨스의 $\mathbf{Q(\lambda)}$는 이 off-policy 특성 때문에 $\text{TD}(\lambda)$ 및 $\text{Sarsa}(\lambda)$와 다릅니다. 추적을 중단하고 다음 탐색적 (비탐욕적) 행동이 발생할 때까지만 경험을 사용합니다.

만약 $A_{t+n}$이 첫 번째 탐색적 (비탐욕적) 행동이라면, 가장 긴 백업은 $n$-단계 리턴에서 $\gamma^n Q(S_{t+n}, A_{t+n})$ 대신 $\gamma^n \max_a Q(S_{t+n}, a)$를 사용하여 보정됩니다.

$$
R_{t+1} + \gamma R_{t+2} + \cdots + \gamma^{n-1} R_{t+n} + \gamma^n \max_a Q_t(S_{t+n}, a)
$$

탐색적 행동이 발생할 때마다 적격성 추적을 0으로 설정하여 이를 구현합니다.

$$
E_t(s, a) = \begin{cases} \gamma\lambda E_{t-1}(s, a) + I_{s S_t} \cdot I_{a A_t} \\ I_{s S_t} \cdot I_{a A_t}\end{cases}
$$

---

### 참고 자료

[원본 경로 #1](https://web.stanford.edu/class/psych209/Readings/SuttonBartoIPRLBook2ndEd.pdf?utm_source=chatgpt.com)


