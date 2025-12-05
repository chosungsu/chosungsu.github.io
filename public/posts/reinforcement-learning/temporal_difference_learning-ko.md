---
title: 'Temporal Difference Learning'
date: '2025-03-17'
tags: ['reinforcement learning', 'lecture']
---

### TD Prediction

시간차 방법과 몬테카를로 방법은 모두 경험을 사용하여 예측 문제를 해결합니다. 즉, 주어진 정책 $\pi$를 따르는 경험을 바탕으로 비종료 상태 $S_t$에 대한 $v_\pi$의 추정치 $V$를 업데이트합니다.

몬테카를로는 에피소드가 끝난 후 업데이트되고 실제 리턴인 $G_t$이 타깃입니다. 이에 반해 시간차 학습은 다음 시간 단계에서 업데이트되고 추정된 리턴인 $R_{t+1} + \gamma V(S_{t+1})$을 타깃으로 합니다.

#### Advantages

TD 방법은 다른 추정치를 기반으로 추정치를 학습합니다. 그리고 TD는 DP와 달리 환경의 보상 및 다음 상태 확률 분포에 대한 모델을 필요로 하지 않습니다. 에피소드가 매우 길거나 에피소드가 없는 지속적인 작업에 특히 중요합니다.

---

### Optimality of TD(0)

유한한 양의 경험만 사용할 수 있을 때, 흔히 배치 업데이트(batch updating) 방식을 사용합니다. 이는 전체 경험 배치를 반복적으로 제시하여 알고리즘이 해답으로 수렴할 때까지 업데이트를 수행하는 것입니다.

배치 MC는 훈련 세트의 실제 리턴에 대한 평균 제곱 오차를 최소화하는 값 $V(s)$로 수렴합니다. 이는 관찰된 리턴의 표본 평균(sample average)입니다.

배치 TD(0)은 마르코프 프로세스의 최우 추정 모델(maximum-likelihood model)에 대해 정확하게 올바른 값으로 수렴합니다. 이를 확실성 등가 추정치(certainty-equivalence estimate)라고 합니다.

---

### Sarsa: On-Policy TD Control

Off-policy 학습은 행동 정책 $\mu(a|s)$를 따르면서 목표 정책 $\pi(a|s)$를 평가하여 $v_{\pi}(s)$ 또는 $q_{\pi}(s,a)$를 계산하는 방법입니다.

#### Q Learning

상태 가치 함수 $v_\pi$ 대신 행동 가치 함수 $q_\pi(s, a)$를 학습하는 것입니다. on-policy 방법의 경우, 현재 행동 정책 $\pi$에 대한 $q_\pi(s, a)$를 추정해야 합니다. TD 제어는 상태-행동 쌍에서 다음 상태-행동 쌍으로의 전이를 고려하여 행동 가치를 학습합니다. 다음 상태 $S_{t+1}$에서 정책 $\pi$에 따라 실제로 선택된 행동 $A_{t+1}$의 $Q$ 값을 사용하여 $Q(S_t, A_t)$를 업데이트합니다.

$$
Q(S_t, A_t) \leftarrow Q(S_t, A_t) + \alpha \left[ R_{t+1} + \gamma Q(S_{t+1}, A_{t+1}) - Q(S_t, A_t) \right]
$$

이 업데이트는 $S_t, A_t, R_{t+1}, S_{t+1}, A_{t+1}$의 다섯 가지 요소를 모두 사용하므로 SARSA라고 부릅니다.

---

### 참고 자료

[원본 경로 #1](https://web.stanford.edu/class/psych209/Readings/SuttonBartoIPRLBook2ndEd.pdf?utm_source=chatgpt.com)



