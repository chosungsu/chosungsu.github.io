---
title: 'Model based RL'
date: '2025-03-28'
tags: ['reinforcement learning', 'lecture']
---

### Advantages and Disadventages of Model based RL

$\rightarrow$ 장점 : 

효율적인 모델 학습이 가능하고 불확실성에 대해 추론할 수 있습니다.

$\rightarrow$ 단점 :

먼저 모델을 학습하고 그 후에 가치 함수를 구성해야 하므로 두 가지 근사 오차가 발생합니다.

#### What is model

모델 $M$은 매개변수 $\eta$로 표현되는 MDP $<S, A, P, R>$의 표현입니다. 상태 공간과 행동 공간은 알려져 있다고 가정하면 모델 $M=<P_{\eta}, R_{\eta}>$는 상태 전이 $P_{\eta} \sim P$과 보상 $R_{\eta} \sim R$을 나타냅니다.

$$
S_{t+1} \sim P_{\eta}(S_{t+1}|S_t, A_t), \\
R_{t+1} = R_{\eta}(R_{t+1}|S_t, A_t)
$$

그리고 일반적으로 상태 전이와 보상 간의 조건부 독립성을 가정합니다.

$$
P[S_{t+1}, R_{t+1}|S_t, A_t] \\
=P[S_{t+1}|S_t, A_t]P[R_{t+1}|S_t, A_t]
$$

경험 ${S_1, A_1, R_2, \dots, S_T}$로부터 모델 $M_{\eta}$를 추정합니다. $(s,a) \rightarrow r$을 학습하는 것은 회귀 문제이고 $(s, a) \to s'$를 학습하는 것은 밀도 추정(density estimation) 문제입니다.

---

### Simulation based search

전방 탐색(forward search)는 현재 상태 $s_t$를 root로 하는 탐색 트리를 구성하고 MDP 모델을 사용하여 앞으로 나아갑니다. 시뮬레이션 기반 탐색은 모델을 사용하여 현재 상태부터 에피소드를 시뮬레이션합니다. $K$개의 에피소드 $\{s_t^k, A_t^k, R_{t+1}^k, \dots, S_T^k\}_{k=1}^K$를 시뮬레이션하고 model free RL인 MC, TD로 탐색합니다.

#### MC Tree search

모델 $M_v$가 주어졌을 때, 현재 시뮬레이션 정책 $\pi$를 사용하여 현재 상태 $s_t$에서 $K$개의 에피소드를 시뮬레이션합니다. 방문한 상태와 행동을 포함하는탐색 트리를 구성하여 $Q(s,a)$를 다음과 같이 평가합니다.

$$
Q(s,a)=\frac{1}{N(s,a)} \sum_{k=1}^{K} \sum_{v=t}^{T} 1G_u^k \\
\rightarrow q^{\pi}(s,a)
$$

가장 높은 가치를 가진 현재 행동을 선택합니다.

MC tree의 장점으로는 최적 우선 탐색이고 상태를 동적으로 평가합니다. 샘플링을 사용하여 차원의 저주를 극복하고 병렬화가 가능합니다.

---

### Exploration vs Exploitation dilemma

온라인 의사 결정에는 현재 정보를 바탕으로 최선ㅇ늬 결정을 내리는 exploitation과 더 많은 정보를 수집하는 exploration을 진행합니다.

---

### Multi armed bandit

멀티 암드 밴딧은 $<A, R>$ 튜플로 구성됩니다. 여기서 $A$는 알려진 $m$개의 행동 집합이고 $R^a(r) = P[r|a]$는 보상에 대한 알려지지 않은 확률 분포입니다. 각 시간 단계 $t$에서 에이전트는 행동을 선택하며 환경은 보상 $r_t \sim R^{a_t}$를 생성합니다. 목표는 누적 보상 $\sum_{\tau=1}^t r_{\tau}$를 최대화하는 것입니다.

#### Regret

행동 가치는 행동 $a$에 대한 평균 보상으로 $Q(a)=E[r|a]$로 표기합니다. 최적 가치 $V^*$는 $V^* = Q(a^*) = \max_{a \in A} Q(a)$입니다. 후회는 한 단계에서의 기회 손실로 $l_t = E[V^* - Q(a_t)]$로 표기합니다. 누적 보상을 최대화하면 총 후회는 최소화됩니다.

#### Lower bound

최적의 arm과 다른 arm 사이의 유사성에 의해 결정됩니다. 이는 간격(gap) $\Delta_a$와 분포의 유사성 $\text{KL}(R_a||R_{a^*})$에 의해 공식적으로 설명됩니다.

점근적 총 후회(asymptotic total regret)은 최소한 단계수 $(t)$에 대한 로그 함수입니다.

#### Upper confidence bounds

$$
a_t=\text{argmax}_{a \in A} \hat{Q}_t(a)+\hat{U}_t(a)
$$

각 행동 가치에 대한 상한 신뢰 구간 $\hat{U}_t(a)$를 추정합니다. 높은 확률로 $Q(a) \le \hat{Q}_t(a) + \hat{U}_t(a)$가 성립합니다. $N_t(a)$가 작을수록 추정된 가치가 불확실하기 때문에 $\hat{U}_t(a)$는 커집니다.

#### Hoeffding's Inequality

$X_1, \dots, X_t$가 $[0,1]$ 범위의 i.i.d 확률변수라고 할 때 표본 평균이 $\bar{X}_t=\frac{1}{\tau} \sum_{\tau=1}^{t} X_{\tau}$라고 하면 확률은 $P(E[X] > \bar{X}_t + u) \le e^{-2tu^2}$이 성립합니다. 이 부등식을 행동 $a$를 선택했을 때의 보상에 다음과 같이 적용합니다.

$$
P(Q(a) > \hat{Q}_t(a) + U_t(a)) \\
\le e^{-2N_t(a)U_t(a)^2}
$$

#### Calculate UCB

UCB를 초과할 확률 $p$는 위에서 e^{-2N_t(a)U_t(a)^2}가 되므로 $U_t(a)=\sqrt{\frac{-log(p)}{2N_t(a)}}$가 됩니다. 보상을 많이 관찰할수록 $p$는 줄어들고 시점 $t$에 대하여 $U_t(a)=\sqrt{\frac{2log(t)}{N_t(a)}}$로 사용합니다.

#### Probability Matching

$$
\pi(a|h_t)=P(Q(a) > Q(a'))
$$

확률 매칭은 행동 $a$가 최적의 행동일 확률에 따라 선택하는 전략으로 불확실한 행동은 최댓값이 될 확률이 더 높고 사후 확률로부터 분석적인 계산이 어려울 수 있는 불확실성에 낙관적인 경향을 보입니다.

#### Thompson Sampling

확률 매칭을 구현하는 톰슨 샘플링은 베이즈 법칙을 사용하여 사후 분포 $p[R|h_t]$를 계산하고 이로부터 보상 분포 $R$을 샘플링합니다. 행동-가치 함수 $Q(a)=E[R^a]$를 계산하며 샘플에서 가치를 최대화하는 행동을 선택합니다.

#### Value of Information

탐색은 정보를 얻기 유용하고 정량화 가능합니다. 불확실한 상황에서 정보 이득이 높으므로 이 상황을 탐색하는 것이 바람직합니다.

---

### Contextual Bandits

컨텍스트 밴딧은 $<A, S, R>$ 튜플로 정의됩니다.

#### Linear Regression

행동-가치 함수는 상태 $s$와 행동 $a$에 대한 예상 보상으로 $Q(s,a)=E[r|s,a]$로 표기합니다. 선형 함수 근사로 $Q_{\theta}(s,a)= \phi(s,a)^T \theta \sim Q(s,a)$와 같이 추정합니다.

LUCB에서 최소 제곱 회귀는 평균 행동-가치 함수 $Q_{\theta}(s,a)$를 추정하는데 이는 분산인 $\sigma^2_{\theta}(s,a)$와 불확실성을 추정할 수 있습니다. 공분산은 $A^{-1}$이며 행동-가치는 선형이므로 분산은 2차 즉, $\sigmq^2_{\theta}=\phi(s,a)^T A^{-1} \phi(s,a)$ 형식입니다.

$$
Q_{\theta}(s,a)+c\sqrt{\phi(s,a)^T A^{-1} \phi(s,a)}
$$

따라서 상한 구간은 위와 같습니다. 상한 신뢰 구간을 최대화하는 행동을 선택하도록 합니다.

---

### 참고 자료

[원본 경로 #1](https://davidstarsilver.wordpress.com/wp-content/uploads/2025/04/lecture-9-exploration-and-exploitation.pdf)


