---
title: 'Model free control'
date: '2025-03-17'
tags: ['reinforcement learning', 'lecture']
---

### On-policy MC

행동-가치 함수에서 정책을 평가하고 개선하는 것이 다음과 같이 진행됩니다.

#### Policy evaluation

반복적 정책 평가를 통해 목표인 $v_{\pi}$를 추정하는 것입니다.

#### Policy improvement

탐욕적 정책 개선을 통해 목표인 $\pi' \ge \pi$를 생성하는 것입니다.

#### $\epsilon$ greedy exploration

지속적 탐색을 보장하는 아이디어로 모든 $m$개 행동은 0이 아닌 확률로 시도됩니다. 그리고 $1-\epsilon$의 확률로 탐욕적 행동을 선택합니다. $\epsilon$의 확률로 아래와 같이 무작위 행동을 선택합니다.

$$
\pi(a|s)=\begin{cases}
\epsilon/m +(1-\epsilon) \\
\epsilon/m
\end{cases}
$$

#### $\epsilon$ greedy policy improvement

어떤 탐욕적 정책 $\pi$에 대해 $q_{\pi}$에 대한 탐욕적 정책 $\pi'$는 개선과정이며 $v_{\pi'}(s) \ge v_\pi(s)$를 만족합니다.

$$
q_{\pi}(s,\pi'(s)) \\
=\sum_{a \in A} \pi'(a|s)q_{\pi}(s,a) \\
=\frac{\epsilon}{m} \sum_{a \in A} q_{\pi}(s,a) \\
+ (1-\epsilon) max_{a \in A} q_{\pi}(s,a) \\
=\frac{\epsilon}{m} \sum_{a \in A} q_{\pi}(s,a) \\
+ (1-\epsilon) \frac{\sum_{a \in A} \pi(a|s) -\epsilon/m}{1-\epsilon}q_{\pi}(s,a) \\
=\sum_{a \in A} \pi(a|s) q_{\pi}(s,a) \\
=v_{\pi}(s)
$$

무한 탐색을 통한 극한에서의 탐욕(GLIE)는 모든 상태-행동 쌍을 무한히 탐색하고 정책은 탐욕적 정책으로 수렴하도록 합니다. 예를 들어 $\epsilon=1/k$로 $\epsilon$이 0으로 감소하면 이를 GLIE라고 부릅니다.

---

### On-policy TD

#### Sarsa

$Q(S,A) \leftarrow Q(S,A) + \alpha[R+\gamma Q(S',A')-Q(S,A)]$와 같이 행동-가치 함수를 업데이트합니다. Sarsa는 GLIE 정책 시퀀스인 $\pi_t(a|s)$와 로빈스-몬로 스텝과 시이즈 시퀀스인 $\alpha_t$에 대해서 최적 행동-가치 함수 $Q(s, a) \to q_*(s, a)$로 수렴합니다.

#### $n$ step Sarsa

$$
n = 1 \\
\rightarrow \text{Sarsa} : q_t^{(1)}=R_{t+1}+\gamma Q(S_{t+1}, A_{t+1})
$$

$n$단계 $Q$ 리턴을 정의하면 아래와 같습니다.

$$
q_t^{(n)}=R_{t+1} \\
+ \cdots \\
+ \gamma^{n-1}R_{t+n} \\
+ \gamma^n Q(S_{t+n}, A_{t+n})
$$

그리고 $n$단계 Sarsa는 $Q(S_t, A_t) \leftarrow Q(S_t, A_t) + \alpha(q_t^{n} - Q(S_t, A_t))$로 업데이트합니다.

#### Forward view

$q^{\lambda}$리턴은 모든 $n$ 단계 $Q$ 리턴인 $q_t^{(n)}$을 결합합니다. 가중치 $(1-\lambda)\lambda^{n-1}$을 사용하여, $q_t^{\lambda}=(1-\lambda) \sum_{n=1}^{\infty} \lambda^{n-1} q_t^{(n)}$으로 정의합니다.

#### Backward view

TD$(\lambda)$와 마찬가지로 적격성 흔적을 사용합니다. 하지만 Sarsa에서는 각 상태-행동 쌍에 대한 하나의 흔적을 가집니다.

$$
E_0(s,a) = 0, \\
E_t(s,a) = \gamma \lambda E_{t-1}(s,a) + 1
$$

업데이트 시에는 TD error $\delta_t=R_{t+1}+\gamma Q(S_{t+1}, A_{t+1})-Q(S_t,A_t)$와 적격성 흔적 $E_t(s,a)$에 비례하여 $Q(s,a) \leftarrow Q(s,a)+\alpha \delta_t E_t(s,a)$로 진행됩니다.

---

### Off-policy

Off-policy 학습은 행동 정책 $\mu(a|s)$를 따르면서 목표 정책 $\pi(a|s)$를 평가하여 $v_{\pi}(s)$ 또는 $q_{\pi}(s,a)$를 계산하는 방법입니다.

#### Importance Sampling

중요도 샘플링은 다른 분포에서 추출한 샘플을 사용하여 어떤 분포의 기댓값을 추정하는 기법으로 $E_{X \sim P}[f(X)]=\sum P(X)f(X)=\sum \frac{Q(X)P(X)}{P(X)Q(X)}f(X)=E_{X \sim Q} [\frac{P(X)}{Q(X)}f(X)]$와 같이 계산합니다.

MC에서는 $\mu$에서 생성된 return을 사용하여 정책을 평가하고 정책 간의 유사성에 따라 return $G_t$에 가중치를 부여합니다. 분산을 극적으로 증가시킬 수 있습니다. 그리고 TD에서는 생성된 TD 목표를 사용하여 정책을 평가하고 TD 목표인 $R + \gamma V(S')$에 중요도 샘플링 보정 항을 가중치로 곱합니다.

#### Q learning

행동-가치(action-value) $Q(s, a)$의 오프-정책 학습을 고려합니다. 중요도 샘플링이 필요하지 않고 다음 행동은 행동 정책 $\mu$에 따라서 $A_{t+1} \sim \mu(\cdot|S_t)$으로 선택됩니다. 그리고 $Q(S_t, A_t)$는 대안적 행동의 가치를 향해 $Q(S_t, A_t) \leftarrow Q(S_t, A_t) + \alpha(R_{t+1}+\gamma Q(S_{t+1}, A')-Q(S_t,A_t))$로 업데이트됩니다.

---

### 참고 자료

[원본 경로 #1](https://davidstarsilver.wordpress.com/wp-content/uploads/2025/04/lecture-5-model-free-control-.pdf)



