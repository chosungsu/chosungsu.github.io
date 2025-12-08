---
title: 'Imitation Learning'
date: '2024-12-18'
tags: ['Robotics', 'Manipulation', 'lecture']
---

### Problem Formulation

모방 학습 문제의 공식화는 RL 문제와 매우 유사하지만 명시적인 보상 함수 $r_t = R(\mathbf{x}_t, \mathbf{u}_t)$를 활용하는 대신 전문가로부터의 시연 세트가 제공된다고 가정하는 것이 주된 차이점입니다.

시스템은 상태 $\mathbf{x}$와 제어 입력 $\mathbf{u}$를 가지는 마르코프 결정 과정(MDP)이라고 가정합니다. 시스템 동역학은 확률적 전이 모델(probabilistic transition model)로 표현됩니다.

$$
p(\mathbf{x}_t | \mathbf{x}_{t-1}, \mathbf{u}_{t-1})
$$

폐루프 제어 법칙을 정의하는 정책 $\pi$를 찾는 것이 목표입니다.

$$
\mathbf{u}_t = \pi(\mathbf{x}_t)
$$

보상 함수에 접근할 수 없는 대신 전문가 정책에서 얻은 시연 세트에 접근할 수 있습니다. 각 시연 $\xi$는 상태-제어 쌍의 순서입니다.

$$
\xi = \{(\mathbf{x}_0, \mathbf{u}_0), (\mathbf{x}_1, \mathbf{u}_1), \ldots \}
$$

모방 학습에는 일반적으로 두 가지 접근 방식이 있습니다.

전문가의 정책을 직접 학습합니다. 이는 행동 복제(Behavior Cloning) 및 DAgger가 해당합니다. 그리고 전문가의 보상 함수를 먼저 학습한 다음 이를 사용하여 정책을 도출합니다.

---

### Behavior Cloning

행동 복제(Behavior cloning) 접근 방식은 전문가 시연 세트를 사용하여 전문가를 모방하는 정책 $\pi$를 결정합니다. 이것은 지도 학습(supervised learning) 기법을 통해 수행될 수 있으며 학습된 정책과 전문가 시연 간의 차이를 최소화하는 것이 목표입니다.

$$
\hat{\pi}^* = \arg \min_{\pi} \sum_{\xi \in \Xi} \sum_{\mathbf{x} \in \xi} L(\pi(\mathbf{x}), \pi^*(\mathbf{x}))
$$

행동 복제는 다음과 같은 주요 문제로 인해 성능이 좋지 않을 수 있습니다. 학습 과정은 전문가가 제공한 샘플 세트에만 기반하고 전체 상태 공간을 균일하게 샘플링하지 못하여 샘플링 편향적입니다. 그리고 훈련 데이터 세트의 상태 분포는 전문가 정책 $\pi^*$에 의해 정의되지만 추정된 정책 $\hat{\pi}^*$가 실제로 사용되면 이 정책은 자신만의 상태 분포를 생성하여 방문하게 됩니다. 이 때 전문가가 방문하지 않은 상태 근처에 도달하면 잘못된 행동을 할 가능성이 높은 분포의 불일치 문제가 있습니다.

---

### Dataset Aggregation

전문가 정책과 학습된 정책 하에서 관찰되는 상태의 분포 불일치(distributional mismatch) 문제를 해결하기 위한 간단한 아이디어는 필요할 때마다 새로운 전문가 데이터를 수집하는 것입니다. 즉, 학습된 정책 $\hat{\pi}^*$가 전문가 데이터셋에 없는 상태로 이어질 때 단순히 전문가에게 더 많은 정보를 요청하는 것입니다.

---

### Inverse Reinforcement Learning

행동 복제는 전문가 행동의 근본적인 이유를 이해할 방법이 없습니다. 그리고 전문가가 실제로 최적의 행동을 하지 않을 수도 있습니다.

역강화 학습은 행동 복제에 대한 대안적인 접근 방식으로 전문가가 행동을 생성하기 위해 사용한 근본적인 보상 함수 $R$의 표현을 추론하고 학습하려고 시도합니다. 전문가의 의도(intent)를 학습함으로써 에이전트는 잠재적으로 전문가보다 뛰어난 성능을 보이거나 능력 차이에 맞게 조정할 수 있습니다.

#### Reward Function Parameterization

IRL 접근 방식은 보상 함수의 특정 매개변수화(parameterization)를 가정합니다. 여기서는 보상을 (비선형) 특징들의 선형 결합으로 매개변수화하여 기본 개념을 제시합니다.

$$
R(\mathbf{x}, \mathbf{u}) = \mathbf{w}^T \boldsymbol{\phi}(\mathbf{x}, \mathbf{u})
$$

정책 $\pi$ 하의 총 (할인된) 보상($V^\pi_T(\mathbf{x})$)은 다음과 같이 정의됩니다.

$$
V^{\pi}_T(\mathbf{x}) = E \left[ \sum_{t=0}^{T-1} \gamma^t R(\mathbf{x}_t, \pi(\mathbf{x}_t)) \mid \mathbf{x}_0 = \mathbf{x} \right]
$$

선형 보상 함수 $R(\mathbf{x}, \mathbf{u})$를 사용하면 이 가치 함수는 다음과 같이 표현될 수 있습니다.

$$
V^{\pi}_T(\mathbf{x}) = \mathbf{w}^T \boldsymbol{\mu}(\pi, \mathbf{x})
$$

여기서 $\boldsymbol{\mu}(\pi, \mathbf{x})$는 특징 기대치(feature expectation)로 정의됩니다.

$$
\boldsymbol{\mu}(\pi, \mathbf{x}) = E_{\pi} \left[ \sum_{t=0}^{T-1} \gamma^t \boldsymbol{\varphi}(\mathbf{x}_t, \pi(\mathbf{x}_t)) \mid \mathbf{x}_0 = \mathbf{x} \right]
$$

IRL의 핵심 통찰은 정의상 최적 전문가 정책 $\pi^*$가 항상 다른 어떤 정책 $\pi$보다 더 큰 가치 함수를 생성한다는 것입니다.

---

### Apprenticeship Learning

역강화 학습(IRL)의 한 접근 방식입니다. 핵심 통찰은 다음과 같습니다.

정책 $\pi$의 특징 기대치 $\boldsymbol{\mu}(\pi)$가 전문가 정책 $\pi^*$의 특징 기대치 $\boldsymbol{\mu}(\pi^*)$와 충분히 가깝다면 $\mathbf{w}$ 벡터가 $\mathbf{w}^*$와 정확히 일치하지 않더라도 정책 $\pi$의 성능은 전문가만큼 좋을 것입니다.

실용적인 측면에서 초기 상태 $\mathbf{x}_0$가 분포 $\mathcal{D}$에서 추출된다고 가정하여 가치 함수를 기댓값으로 고려합니다.

$$
E_{\mathbf{x}_0 \sim \mathcal{D}} \left[ V^{\pi}_T(\mathbf{x}_0) \right] = \mathbf{w}^T \boldsymbol{\mu}(\pi)
$$

여기서 $\boldsymbol{\mu}(\pi)$는 초기 상태 분포 $\mathcal{D}$에 대한 정책 $\pi$의 특징 기대치입니다.

$$
\boldsymbol{\mu}(\pi) = E_{\pi} \left[ \sum_{t=0}^{T-1} \gamma^t \boldsymbol{\phi}(\mathbf{x}_t, \pi(\mathbf{x}_t)) \right]
$$

이 학습의 목표는 전문가 정책 $\pi^*$의 특징 기대치와 최대한 유사한 $\boldsymbol{\mu}(\hat{\pi}^)$를 갖는 정책 $\hat{\pi}^*$를 찾는 것입니다.

---

### Maximum Margin Planning, MMP

최대 마진 계획(MMP) 접근 방식은 보상 함수 가중치 $\mathbf{w}$를 계산하기 위해 최적화 기반 접근 방식을 사용하며 MMP 최적화는 다음과 같습니다.

$$
\begin{aligned} 
&\hat{\mathbf{w}}^* = \argmin_{\mathbf{w}} \Vert\mathbf{w}\Vert_2^2, \\ 
&\text{s.t.} \mathbf{w}^T \boldsymbol{\mu}(\pi^*) \ge \mathbf{w}^T \boldsymbol{\mu}(\pi) + 1
\end{aligned}
$$

이 문제는 전문가 정책이 기존 정책들을 가장 크게 능가하도록 하는 보상 함수 벡터 $\mathbf{w}$를 계산합니다. slack term을 추가하여 전문가의 잠재적 비최적성(suboptimality)을 설명하고 similarity function을 추가하여 전문가 정책과 다르지 않은 정책에 더 작은 마진을 제공합니다.

$$
\begin{aligned}
&\hat{\mathbf{w}}^* = \argmin_{\mathbf{w}, v} \Vert\mathbf{w}\Vert_2^2 + Cv, \\
&\text{s.t.} \mathbf{w}^T \boldsymbol{\mu}(\pi^*) \ge \mathbf{w}^T \boldsymbol{\mu}(\pi) + m(\pi^*, \pi) - v 
\end{aligned}
$$

여기서 $v$가 slack term으로 전문가의 비최적성을 설명합니다. 그리고 $m(\pi^*, \pi)$은 두 정책이 얼마나 다른지를 정량화하는 함수입니다.

#### Maximum Entropy Inverse Reinforcement Learning

Apprenticeship Learning은 특징 기대치(feature expectation)를 일치시키는 것이 전문가만큼의 성능을 보장하는 필요충분조건임을 보여주지만, 동일한 특징 기대치를 유도하는 다른 정책들이 존재할 수 있다는 모호성(ambiguity)을 가집니다.

최대 엔트로피 역강화 학습의 주요 아이디어는 특징 기대치를 일치시키는 것 외에도 궤적 분포 $p_{\pi}(\tau)$가 가장 광범위하게 비전념적(broadly uncommitted)이 되도록 하여 경로 분포의 모호성을 제거하는 것입니다. 즉, 특징 기대치 일치 외에 추가적인 경로 선호도를 갖지 않는 정책을 찾는 것입니다. 이를 최대 엔트로피 원리라고 합니다.

주어진 제약 조건 하에서 가장 정보력이 낮은(least informative) 분포로 생각할 수 있으며 의도하지 않은 사전 정보를 인코딩하는 것을 방지합니다.

$$
p^*(\tau) = \argmax_{p} \int -p(\tau) \log p(\tau) d\tau
$$

이 최적화 문제의 해는 다음과 같은 지수 형태(exponential form)를 가집니다.

$$
\begin{aligned}
&p^*(\tau, \boldsymbol{\lambda}) = \frac{1}{Z(\boldsymbol{\lambda})} e^{\boldsymbol{\lambda}^T \mathbf{f}(\tau)},\\
&Z(\boldsymbol{\lambda}) = \int e^{\boldsymbol{\lambda}^T \mathbf{f}(\tau)} d\tau
\end{aligned}
$$

여기서 $\mathbf{f}(\tau)$는 궤적의 누적 특징이고 $\boldsymbol{\lambda}$는 분포를 매개변수화하는 벡터입니다. $\mathbf{w}^*$(및 $p_{\pi^*}(\tau)$)는 알려져 있지 않으므로 샘플링된 전문가 시연을 기반으로 $\mathbf{w}^*$를 가장 잘 근사화하기 위해 최대 우도 추정(Maximum Likelihood Estimation, MLE) 접근 방식을 사용합니다.

$$
\begin{aligned}
\hat{\mathbf{w}}^* &= \arg \max_{\boldsymbol{\lambda}} \prod_{\xi_i \in \Xi} p^*(\xi_i, \boldsymbol{\lambda}) \\ &= \arg \max_{\boldsymbol{\lambda}} \sum_{\xi_i \in \Xi} \left( \boldsymbol{\lambda}^T \mathbf{f}(\xi_i) - \log Z(\boldsymbol{\lambda}) \right)
\end{aligned}
$$

이 문제는 경사 하강법(gradient descent)을 사용하여 해결될 수 있으며, 경사는 다음과 같이 계산됩니다.

$$
\nabla_{\boldsymbol{\lambda}} J(\boldsymbol{\lambda}) = \sum_{\xi_i \in \Xi} \mathbf{f}(\xi_i) - E_{\tau \sim p^*(\tau, \boldsymbol{\lambda})} \left[ \mathbf{f}(\tau) \right]
$$

첫 번재 항은 전문가 시연이 알려져 있으므로 쉽게 계산 가능합니다. 두 번째 항은 $p^*(\tau, \boldsymbol{\lambda})$ 분포로부터 궤적을 샘플링하는 몬테카를로(Monte Carlo) 샘플링을 통해 근사될 수 있습니다.

---

### Learning From Comparisons and Physical Feedback

행동 복제(Behavior Cloning)와 역강화 학습(IRL) 모두 전문가의 행동 시연에 의존하지만 실제 상황에서는 전문가가 완벽하거나 양질의 시연을 제공하기 어려울 수 있습니다.

#### Learning from Comparisons

쌍별 비교(pairwise comparisons)는 전문가에게 두 가지 다른 행동(궤적 $\tau_A$와 $\tau_B$)을 보여주고 어느 쪽이 더 나은지 순위를 매기도록 요청하는 대안적인 접근 방식입니다. 반복적인 질의를 통해 근본적인 보상 함수 $R$를 이해하는 데 수렴할 수 있습니다.

#### Learning from Physical Feedback

완전한 전문가 시연 대신 전문가가 로봇과 물리적으로 상호작용하여 바람직하지 않은 행동을 수정하도록 허용할 수도 있습니다. 이 접근 방식에서는 로봇이 전문가의 행동보다 낮은 보상을 초래하는 행동을 취할 때 물리적 상호작용이 발생한다고 가정합니다.

로봇의 보상 함수는 $R(\mathbf{x}, \mathbf{u}) = \mathbf{w}^T \boldsymbol{\varphi}(\mathbf{x}, \mathbf{u})$ 형태이며, 로봇은 추정된 가중치 $\hat{\mathbf{w}}^*$를 유지합니다. 전문가는 실제 최적 가중치 $\mathbf{w}^*$에 따라 행동한다고 가정합니다.

---

### Interaction-aware Control and Intent Inference

로봇 자율성에서 발생하는 또 다른 흥미로운 문제는 로봇과 인간이 공유 또는 개별 목표를 달성하기 위해 상호작용할 때 발생합니다.

#### Control with Known Human Model

인간과 로봇 간의 상호작용은 결합된 상태 $\mathbf{x}$를 갖는 동역학 시스템으로 모델링될 수 있습니다. 로봇의 제어는 $\mathbf{u}_R$, 인간의 결정/입력은 $\mathbf{u}_H$로 표시됩니다. 전이모델은 다음과 같습니다.

$$
\mathbf{p}(\mathbf{x}_t | \mathbf{x}_{t-1}, \mathbf{u}_{R,t-1}, \mathbf{u}_{H,t-1})
$$

로봇과 인간 모두 자신의 비용 함수에 대해 최적으로 행동한다고 가정하면 최적 행동은 다음과 같이 정의됩니다.

$$
\mathbf{u}^*_R(\mathbf{x}) = \arg \max_{\mathbf{u}_R} \mathbf{R}_R(\mathbf{x}, \mathbf{u}_R, \mathbf{u}^*_H(\mathbf{x})) \\
\mathbf{u}^*_H(\mathbf{x}) = \arg \max_{\mathbf{u}_H} \mathbf{R}_H(\mathbf{x}, \mathbf{u}^*_R(\mathbf{x}), \mathbf{u}_H)
$$

두 보상 함수 $\mathbf{R}_R$과 $\mathbf{R}_H$가 알려져 있다고 가정하더라도, 이 2인 게임 동역학은 $\mathbf{u}^*_R$을 계산하는 것을 매우 어렵게 만듭니다. 스태켈버그 게임(Stackelberg game)으로 모델링하여 선도자-추종자(leader-follower) 구조로 제한합니다.

#### Intent Inference

의도 추론(Intent Inference) 문제는 정확한 행동 모델로 이어질 수 있는 근본적인 행동 특성(예: 운전 스타일)을 식별하는 데 중점을 둡니다. 근본적인 행동 차이는 알 수 없는 매개변수 $\boldsymbol{\theta}$를 통해 모델링되며, 이는 인간의 행동을 관찰하여 추론되어야 합니다.

인간의 보상 함수는 $\mathbf{R}_H(\mathbf{x}, \mathbf{u}_R, \mathbf{u}_H, \boldsymbol{\theta})$와 같이 $\boldsymbol{\theta}$의 함수로 정의됩니다. 인간은 다음 확률에 따라 행동을 선택한다고 가정합니다.

$$
\mathbf{p}(\mathbf{u}_H | \mathbf{x}, \mathbf{u}_R, \boldsymbol{\theta}) \propto e^{\mathbf{R}_H(\mathbf{x},\mathbf{u}_R,\mathbf{u}_H,\boldsymbol{\theta})}
$$

이는 인간이 최적 행동을 지수적으로 높은 확률로 선택하지만 최적이지 않은 행동도 선택할 수 있음을 의미합니다.

---

### 참고 자료

[원본 경로 #1](https://web.stanford.edu/class/cs231a/course_notes/07-representation-learning.pdf)

