---
title: 'Model free prediction'
date: '2025-03-14'
tags: ['reinforcement learning', 'lecture']
---

### Model free value function approximation

이전부터 사용된 policy iteration(pi)과 다르게 model free 환경에서는 정책($\pi$)가 결정론적일 경우 정책이 선택하지 않는 행동($a \ne \pi(s)$)에 대한 상태-행동 가치함수 $Q(s,a)$를 계산할 수 없다는 문제가 생깁니다.

$\epsilon$-greedy policy는 $|A|$가 행동의 개수일 때 $1-\epsilon+\frac{\epsilon}{|A|}$의 확률로 현재 상태-행동 가치함수에 대한 탐욕적 행동을 선택하고 비탐욕적 행동이 선택될 확률은 $\frac{\epsilon}{|A|}$의 확률로 임의의 행동을 균일하게 선택합니다.

---

### Monte-Carlo

몬테카를로(MC) 방법은 경험의 에피소드(episodes of experience)로부터 직접 학습합니다. MDP의 전이(transitions)나 보상에 대한 지식이 필요하지 않습니다. MC는 완전한 에피소드(complete episodes)로부터 학습하고 value=mean을 리턴합니다.

#### Policy Evaluation

$$
S_1, A_1, R_2, \dots, S_k \sim \pi
$$

이 방법의 목표는 정책 $\pi$ 하에서 경험 에피소드로부터 $v_{\pi}$를 학습하는 것입니다. 여기서 return은 할인된 총 보상을 $G_t=R_{t+1}+\gamma R_{t+2} + \dots + \gamma^{T-1} R_T$로 나타냅니다. 그리고 가치 함수는 $v_{\pi}(s)=E_{\pi}[G_t|S_t=s]$로 정의합니다. 다만 MC policy evaluation에서는 기대 리턴 대신 경험적 평균 리턴을 사용합니다.

#### First-Visit vs Every-Visit

$$
N(s) \leftarrow N(s) + 1, \\
S(s) \leftarrow S(s) + G_t, \\
v(s) = S(s)/N(s)
$$

상태 $s$를 평가하기 위해 한 에피소드에서 상태가 처음 방문되는 시간 $t$에 카운터와 총 리턴을 증가하는 것이 first-visit 평가이고 상태가 매번 방문되는 시기에 업데이트하는 것을 every-visit이라고 합니다.

#### Incremental Mean

$$
\mu_k=\frac{1}{k} \sum_{j=1}^k x_j \\
=\frac{1}{k}(x_k+\sum_{j=1}^k x_j) \\
=\frac{1}{k}(x_k+(k-1)\mu_{k-1}) \\
=\mu_{k-1}+\frac{1}{k}(x_k-\mu_{k-1})
$$

수열 $x_1, x_2, \dots$의 평균 $\mu_1, mu_2, \dots$는 위와 같이 점진적으로 계산할 수 있습니다. 그리고 점진적으로 $V(S_t) \leftarrow V(S_t) + \frac{1}{N(S(t))} (G_t-V(S_t))$로 MC의 가치 함수를 업데이트하면 이동 평균을 추적하는 것에 유용할 수 있습니다.

---

### Temporal Difference Learning

TD 방법은 경험의 에피소드로부터 직접 학습합니다. 역시 모델이 필요 없으며 전이나 보상에 대한 지식도 필요하지 않습니다. TD는 추측을 향한 추측(a guess towards a guess)로 업데이트합니다.

#### About TD

$$
V(S_t) \leftarrow V(S_t)+\alpha(R_{t+1}+\gamma V(S_{t+1})-V(S_t))
$$

추정된 리턴 $R_{t+1} + \gamma V(S_{t+1})$를 향해 가치 $V(S_t)$를 업데이트합니다. $R_{t+1} + \gamma V(S_{t+1})$는 TD 목표(TD target)라고 불립니다. 괄호 내부는 $\delta_t$로 TD error라고 불립니다.

#### Advantages and Disadvantages

TD는 최종 결과를 알기 전에 학습할 수 있고 매 단계마다 온라인으로 학습이 가능합니다. MC는 리턴을 알기 위해 에피소드가 끝날 때까지 기다려야 하지만 TD는 최종 결과 없이도 학습이 가능합니다. 그리고 종료되지 않는 환경에서도 작동합니다.

#### Bias/Variance Trade-Off

리턴값 $G_t=R_{t+1}+\gamma R_{t+2}+\dots+\gamma^{T-1}R_T$는 $v_\pi(S_t)$의 불편향(unbiased) 추정치입니다. 그리고 참된 TD 목표 $R_{t+1} + \gamma v_\pi(S_{t+1})$는 $v_\pi(S_t)$의 불편향 추정치입니다. TD 목표 $R_{t+1} + \gamma V(S_{t+1})$는 $v_\pi(S_t)$의 편향된(biased) 추정치입니다.

TD의 목표는 리턴보다 훨씬 낮은 분산(variance)을 가지는 것입니다. 원래 리턴은 많은 무작위 행동, 전이, 보상에 의존하지만 TD는 하나의 무작위 행동, 전이, 보상에 의존하는 것이 목표입니다.

#### Certainty Equivalence

$$
\sum_{k=1}^K \sum_{t=1}^{T_k} (G_t^k - V(s_t^k))^2, \\
\hat{P}_{s,s'}^a=\frac{1}{N(s,a)} \sum_{k=1}^K \sum_{t=1}^{T_k} 1(s_t^k, a_t^k, s_{t+1}^k), \\
\hat{R}_{s}^a=\frac{1}{N(s,a)} \sum_{k=1}^K \sum_{t=1}^{T_k} 1(s_t^k, a_t^k)r_t^k
$$

MC는 최소평균 제곱오차(MMSE)를 가진 해로 수렴하지만 TD(0)은 최대 우도(ML) 해로 수렴합니다.

---

### TD($\lambda$)

#### 1. n-Step return

$n=1,2,\infty$에 대한 $n$단계 리턴을 생각해보면 다음과 같습니다.

$$
n=1 \\
\rightarrow \\
G_t=R_{t+1}+\gamma V(S_{t+1}), \\
n=\infty \\
\rightarrow \\
G_t=R_{t+1}+\gamma R_{t+2} + \dots + \gamma^{T-1}R_T
$$

따라서 $G_t^{(n)}=R_{t+1}+\gamma R_{t+2} + \dots + \gamma^{n-1}R_{t+n}+\gamma^n V(S_{t+n})$으로 정의가 되고 시간차 학습은 $V(S_t) \leftarrow V(S_t)+\alpha(G_t^{(n)}-V(S_t))$입니다.

#### 2. $\lambda$ return

이는 모든 n-step return $G_t^{(n)}$을 결합합니다. 가중치 $(1-\lambda) \lambda^{(n-1)}을 사용하여 다음과 같이 정의합니다.

$$
G_t^{\lambda}=(1-\lambda)\sum_{n=1}^{\infty} \lambda^{n-1}G_t^{(n)}
$$

#### 3. Forward view vs Backward view

$$
V(S_t) \leftarrow V(S_t)+\alpha(G_t^{\lambda}-V(S_t))
$$

가치 함수를 forward view로 업데이트하면 가치 함수의 미래를 먼저 봅니다.

적격성 흔적(eligibility traces)에서는 $E_0(s)=0, E_t(s)=\gamma \lambda E_{t-1}(s)+1(S_t=s)$라는 두 발견법을 결합합니다. backward view에서는 모든 상태 $s$에 대해 적격성 흔적을 유지합니다. 이 업데이트는 TD error인 $\delta_t$와 적격성 흔적 $E_t(s)$에 비례합니다.

$$
\delta_t=R_{t+1}+\gamma V(S_{t+1})-V(S_t), \\
V(s) \leftarrow V(s) + \alpha \delta_t E_t(s)
$$

$\lambda=0$일 때 현재 상태만 업데이트되는데 $E_t(s)=1(S_t=s)$이므로 TD(0) 업데이트인 $V(s) \leftarrow V(s) + \alpha \delta_t$와 동일합니다. 오프라인 업데이트의 총합은 forward와 backward 모두 동일합니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/b_wvosA70f8?si=tJRhjOU2ZPA0cdyK)

[원본 경로 #2](https://davidstarsilver.wordpress.com/wp-content/uploads/2025/04/lecture-4-model-free-prediction-.pdf)


