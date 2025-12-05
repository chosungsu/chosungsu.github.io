---
title: 'Monte Carlo Methods'
date: '2025-03-14'
tags: ['reinforcement learning', 'lecture']
---

### Monte Carlo Prediction

몬테카를로(Monte Carlo, MC) 방법은 경험(episode)을 통해 주어진 정책에 대한 상태 가치 함수 $v_\pi$를 학습하는 데 사용되는 알고리즘입니다.

상태의 가치는 그 상태에서 시작할 때 예상되는 기대 리턴(expected return)입니다. 따라서 경험을 통해 이를 추정하는 가장 확실한 방법은 단순히 그 상태를 방문한 후 관찰된 리턴들의 평균을 구하는 것입니다. 더 많은 리턴이 관찰될수록 평균은 기대값으로 수렴합니다.

#### First-Visit vs. Every-Visit MC

에피소드에서 상태 $s$가 발생하는 각 시점을 방문하고 first visit에서는 $v_\pi(s)$를 에피소드에서 $s$에 대한 첫 번째 방문 이후의 리턴들의 평균으로 추정합니다. every visit에서는 $v_\pi(s)$를 $s$에 대한 모든 방문 이후의 리턴들의 평균으로 추정합니다.

두 방법 모두 방문 횟수가 무한대로 증가함에 따라 $v_\pi(s)$로 수렴합니다. first visit MC는 각 리턴이 $v_\pi(s)$의 독립적이고 동일하게 분포된(i.i.d) 추정치이므로, 큰 수의 법칙에 의해 수렴이 보장됩니다.

---

### Monte Carlo Estimation of Action Values

모델을 사용할 수 없는 경우 상태 가치($v_\pi$)보다는 행동 가치($q_\pi$)를 추정하는 것이 특히 유용합니다. 모델이 없으면 $v_\pi$만으로는 정책을 결정하기에 불충분하며, 유용한 정책을 제안하기 위해 각 행동의 가치를 명시적으로 추정해야 합니다.

행동 가치 $q_\pi(s, a)$를 추정하는 MC 방법은 상태 가치와 기본적으로 동일하지만, 이제 상태-행동 쌍 $(s, a)$에 대한 방문을 다룹니다. 결정론적 정책을 따르면, 각 상태에서 하나의 행동에 대해서만 리턴을 관찰하게 됩니다. 리턴을 평균할 수 없으면 다른 행동들의 MC 추정치는 경험을 통해 개선되지 않습니다.

---

### Monte Carlo Control

MC 추정을 사용하여 최적 정책 $\pi^*$을 근사하는 방법을 고려합니다.

일반화된 정책 반복에서 근사 정책 $\pi$와 근사 가치 함수 $q$를 유지하며, 이 둘은 서로를 향해 반복적으로 업데이트됩니다.

$$
\pi \underset{\text{평가}}{\stackrel{q \to q_\pi}{\longrightarrow}} q \underset{\text{개선}}{\stackrel{\pi \to \text{greedy}(q)}{\longrightarrow}} \pi
$$

정책 개선 정리에 따라, 각 $\pi_{k+1}$은 $\pi_k$보다 균일하게 더 좋거나 같습니다.

#### Without Exploring Starts

비현실적인 탐색 시작 가정을 피하는 유일한 일반적인 방법은 에이전트가 모든 행동을 계속해서 선택하도록 보장하는 것입니다. 이를 보장하는 두 가지 접근 방식이 있으며 On-policy, Off-policy 방법이라고 합니다.

전자의 경우 의사 결정을 내리는 데 사용되는 정책 자체를 평가하거나 개선하려고 합니다. 후자는 데이터를 생성하는 데 사용된 정책과 다른 정책을 평가하거나 개선하려고 합니다.

On-Policy Control에서는 정책이 일반적으로 soft합니다. 즉, 모든 상태 $s$와 모든 행동 $a$에 대해 $\pi(a|s) > 0$이지만, 점차 결정론적 최적 정책에 가까워집니다. 정책을 $\epsilon$-탐욕 정책으로만 이동시킵니다. 임의의 $\epsilon$-소프트 정책 $\pi$에 대해, $q_\pi$에 대한 $\epsilon$-탐욕 정책 $\pi'$은 $\pi$보다 더 좋거나 같다는 것이 정책 개선 정리에 의해 보장됩니다.

$$
q_\pi(s, \pi'(s)) \ge v_\pi(s)
$$

Off-policy learning은 값을 추정하려는 정책($\pi$, 타겟 정책)과 경험을 생성하는 데 사용된 정책($\mu$, 행동 정책)이 다른 경우를 말합니다. $\mu$에서 얻은 에피소드를 사용하여 $\pi$에 대한 값을 추정하려면 $\pi$에 따라 수행되는 모든 행동이 $\mu$에 따라도 가끔 선택되어야 합니다. 이를 커버리지(coverage) 가정이라고 합니다.

Importance sampling은 한 분포에서 얻은 샘플을 사용하여 다른 분포에서의 기대값을 추정하는 일반적인 기술입니다. 타겟 정책과 행동 정책 하에서 궤적 발생 확률의 상대적 비율인 중요도 표집 비율 $\rho^T_t$로 리턴에 가중치를 부여합니다. 시작 상태 $S_t$가 주어졌을 때, 궤적 $A_t, S_{t+1}, \dots, S_T$에 대한 중요도 표집 비율은 다음과 같습니다.

$$
\rho^T_t = \frac{\prod_{k=t}^{T-1} \pi(A_k|S_k)p(S_{k+1}|S_k, A_k)}{\prod_{k=t}^{T-1} \mu(A_k|S_k)p(S_{k+1}|S_k, A_k)} = \prod_{k=t}^{T-1} \frac{\pi(A_k|S_k)}{\mu(A_k|S_k)}
$$

#### Incremental Implementation

에피소드별로 증분적으로 구현될 수 있습니다. MC 방법에서는 보상 대신 리턴을 평균합니다.

가중 중요도 표집을 사용하는 off-policy의 경우 가중 평균을 형성해야 하므로 약간 다른 증분 알고리즘이 필요합니다. $G_n$이 리턴이고 $W_n$이 해당 중요도 표집 비율($\rho$)일 때 새로운 추정치 $V_{n+1}$은 다음 업데이트 규칙을 사용하여 계산됩니다.

$$
V_{n+1} = V_n + \frac{W_n}{C_n} \left[ G_n - V_n \right]
$$

여기서 $C_n = \sum_{k=1}^{n} W_k$는 가중치의 누적 합입니다.

---

### Importance Sampling on Truncated Returns

할인율 $\gamma < 1$인 경우 중요도 표집 비율을 단일 덩어리로 간주하는 것보다 더 나은 방법이 있을 수 있습니다. 이 경우 리턴 $G_t$는 초기의 보상에 의해 주로 결정됩니다. 그리고 중요도 표집 비율 $\rho^T_t$은 전체 궤적에 대한 확률 비율의 곱이 되어, 나중 단계의 불필요한 항들이 분산을 크게 증가시킵니다.

#### Flat Partial Returns

할인을 부분적인 종료로 생각할 수 있습니다. 기존의 전체 리턴 $G_t$는 할인이 없는 부분 리턴(flat partial returns) $\bar{G}^h_t = R_{t+1} + \dots + R_h$의 합으로 볼 수 있습니다.

$$
G_t = \gamma^{T-t-1} \bar{G}^T_t + (1-\gamma) \sum_{h=t+1}^{T-1} \gamma^{h-t-1} \bar{G}^h_t
$$

#### Truncated Importance Sampling

부분 리턴 $\bar{G}^h_t$는 지평선(horizon) $h$까지만의 보상을 포함하므로 $h$까지만 잘린 중요도 표집 비율 $\rho^h_t$를 사용하여 스케일링합니다.

$$
V(s) = \frac{\sum_{t \in \mathcal{T}(s)} \left[ \gamma^{T(t)-t-1} \rho^{T(t)}_t \bar{G}^{T(t)}_t + (1 - \gamma) \sum_{h=t+1}^{T(t)-1} \gamma^{h-t-1} \rho^h_t \bar{G}^h_t \right]}{|\mathcal{T}(s)|}
$$

이는 일반 중요도 표집 추정치에 대응하는 잘린 추정치이고 가중 중요도는 아래와 같습니다.

$$
V(s) = \frac{\sum_{t \in \mathcal{T}(s)} \left[ \gamma^{T(t)-t-1} \rho^{T(t)}_t \bar{G}^{T(t)}_t + (1 - \gamma) \sum_{h=t+1}^{T(t)-1} \gamma^{h-t-1} \rho^h_t \bar{G}^h_t \right]}{\sum_{t \in \mathcal{T}(s)} \left[ \gamma^{T(t)-t-1} \rho^{T(t)}_t + (1 - \gamma) \sum_{h=t+1}^{T(t)-1} \gamma^{h-t-1} \rho^h_t \right]}
$$

이를 통해 나중 단계의 행동에 대한 중요도 표집 비율의 요소를 제거함으로써 분산을 크게 줄이는 데 도움이 될 수 있습니다.

---

### 참고 자료

[원본 경로 #1](https://web.stanford.edu/class/psych209/Readings/SuttonBartoIPRLBook2ndEd.pdf?utm_source=chatgpt.com)


