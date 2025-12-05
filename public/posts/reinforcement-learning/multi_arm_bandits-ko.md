---
title: 'Multi arm Bandits'
date: '2025-03-05'
tags: ['reinforcement learning', 'lecture']
---

### n-Armed Bandit Problem

이 학습은 $\mathbf{n}$개의 다른 옵션(행동) 중에서 반복적으로 선택해야 합니다. 각 선택 후에는 선택한 행동에 따라 달라지는 정상 확률 분포(stationary probability distribution)에서 추출된 수치적 보상을 받습니다.

목표는 특정 기간 동안 예상 총 보상(expected total reward)을 최대화하는 것입니다.

각 행동 $a$에는 해당 행동이 선택될 때의 기대 또는 평균 보상이 있습니다. 이를 행동의 가치라고 하고 행동 $a$의 진정한 가치는 $q(a)$입니다.

---

### Action-Value Methods

행동 가치 방법은 행동의 가치를 추정하고, 그 추정치를 사용하여 행동 선택을 결정하는 단순한 방법입니다.

#### Estimating Action Values

행동 $a$의 진정한 가치 $q(a)$와 $t$번째 시간 단계에서의 추정 가치 $Q_t(a)$를 구분합니다. 행동 $a$가 시간 $t$ 이전에 $N_t(a)$번 선택되었고, 그때 받은 보상이 $R_1, R_2, \dots, R_{N_t(a)}$일 경우, 추정 가치는 실제로 받은 보상의 평균입니다.

$$
Q_t(a) = \frac{R_1 + R_2 + \cdots + R_{N_t(a)}}{N_t(a)}
$$

$N_t(a) \to \infty$일 때, 대수의 법칙(law of large numbers)에 의해 $Q_t(a)$는 $q(a)$로 수렴합니다.

#### Action Selection Rules

탐욕적 행동 선택은 항상 추정 가치가 가장 높은 행동을 선택하는 것으로 

$$
A_t = \underset{a}{\operatorname{argmax}} Q_t(a)
$$

이 방법은 현재의 지식을 활용하여 즉각적인 보상을 최대화하지만, 탐험은 전혀 하지 않습니다.

$\epsilon$-Greedy Methods는 대부분의 시간 동안 탐욕적으로 행동하지만, 작은 확률 $\epsilon$로 모든 행동 중 하나를 무작위로 선택합니다. 시간이 지남에 따라 모든 행동이 무한히 샘플링되도록 보장하여, 모든 $Q_t(a)$가 $q(a)$로 수렴합니다. 이로 인해 최적 행동을 선택할 확률이 $1 - \epsilon$보다 크게 수렴합니다.

---

### Incremental Implementation

위에서 보상의 표본 평균을 구하기 위해서는 시간 경과에 따라 기억 공간과 계산 요구 사항이 무한히 증가합니다. 이러한 비효율성은 점진적 업데이트 공식을 사용하여 해결할 수 있습니다.

어떤 행동에 대한 $k$번째 보상을 $R_k$라고 하고, $k-1$번째 보상까지의 평균 추정치를 $Q_k$라고 할 때, $k$번째 보상까지의 새로운 평균 $Q_{k+1}$는 다음과 같이 계산됩니다.

$$
Q_{k+1} = Q_k + \frac{1}{k} \left[ R_k - Q_k \right]
$$

---

### Tracking a Nonstationary Problem

표본 평균 방법은 정상적인 환경(stationary environment) 즉 행동 가치가 시간이 지나도 변하지 않는 환경에 적합합니다. 그러나 행동 가치가 변하는 비정상적 환경(nonstationary environment)에서는 적절하지 않습니다.

#### Constant Step-Size

가장 일반적인 방법은 상수 스텝 크기 매개변수 $\alpha \in (0, 1]$를 사용하는 것입니다.

$$
Q_{k+1} = Q_k + \alpha \left[ R_k - Q_k \right]
$$

이 공식은 $Q_{k+1}$가 과거 보상과 초기 추정치 $Q_1$의 가중 평균이 되도록 합니다.

$$
Q_{k+1} = \sum_{i=1}^{k} \alpha(1 - \alpha)^{k-i} R_i + (1 - \alpha)^{k} Q_1
$$

$(1 - \alpha) < 1$이므로, 과거 보상에 대한 가중치는 지수적(exponentially)으로 감소합니다.

#### Convergence Conditions

스텝 크기 매개변수 $\alpha_k(a)$를 매 단계마다 다르게 할 수도 있습니다. $\alpha_k(a) = \frac{1}{k}$를 선택하면 표본 평균법이 되며, 이는 대수의 법칙에 의해 참된 행동 가치로 수렴함이 보장됩니다. 일반적인 확률적 근사 이론(stochastic approximation theory)에 따르면, 수렴을 보장하기 위해 $\alpha_k(a)$는 다음 두 조건을 만족해야 합니다.

$$
\begin{aligned}
&\sum_{k=1}^{\infty} \alpha_k(a) = \infty, \\
&\sum_{k=1}^{\infty} \alpha^2_k(a) < \infty
\end{aligned}
$$

첫 번째 조건은 초기 조건이나 무작위 변동을 극복할 만큼 충분히 큰 스텝이 필요함을 의미하고 두 번째 조건은 수렴을 보장하기 위해 결국 스텝이 충분히 작아져야 함을 의미합니다.

---

### Upper-Confidence-Bound Action Selection, UCB

탐험은 행동 가치 추정의 불확실성 때문에 필요합니다. $\epsilon$-탐욕적 행동 선택은 비탐욕적 행동을 무차별적으로 시도하는 반면, UCB 방법은 실제로 최적일 가능성을 고려하여 비탐욕적 행동을 선택하는 더 나은 방법입니다.

$$
A_t = \underset{a}{\operatorname{argmax}} \left[ Q_t(a) + c \sqrt{\frac{\ln t}{N_t(a)}} \right]
$$

UCB 행동 선택의 핵심 아이디어는 다음과 같습니다.

최대화되는 양 $\left[ Q_t(a) + c \sqrt{\frac{\ln t}{N_t(a)}} \right]$은 행동 $a$의 가능한 참 가치에 대한 상한(upper bound)입니다. $Q_t(a)$가 높을수록 선택될 가능성이 높아집니다. 제곱근 항은 불확실성을 나타내고 $N_t(a)$가 작을수록(덜 선택된 행동일수록) 분모가 작아져 불확실성 항이 커집니다.

#### Gradient Bandits

각 행동 $a$에 대한 수치적 선호도 $H_t(a)$를 학습하는 방법을 고려합니다. 선호도 자체는 보상으로 해석되지 않으며, 상대적 선호도만이 중요합니다. 행동 선택의 확률은 소프트맥스 분포(soft-max distribution)에 따라 결정됩니다.

$$
\Pr\{A_t = a\} = \frac{e^{H_t(a)}}{\sum_{b=1}^{n} e^{H_t(b)}} = \pi_t(a)
$$

보상이 기준선보다 높으면 $A_t$를 선택할 확률이 증가합니다. 모든 보상이 양수일 경우 모든 행동의 확률이 증가하여 성능이 크게 저하될 수 있습니다.

#### Contextual Bandits

밴딧 과제가 선택될 때마다 과제의 정체성에 대한 뚜렷한 단서가 주어진다면 해당 상황에서 취해야 할 최적 행동과 연관시키는 정책을 학습할 수 있습니다.

---

### 참고 자료

[원본 경로 #1](https://web.stanford.edu/class/psych209/Readings/SuttonBartoIPRLBook2ndEd.pdf?utm_source=chatgpt.com)

