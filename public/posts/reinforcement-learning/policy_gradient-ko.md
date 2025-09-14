---
title: 'Policy gradient'
date: '2025-03-24'
tags: ['reinforcement learning', 'lecture']
---

### Computing Gradients By Finite Differences

정책 $\pi_\theta(s, a)$의 정책 경사를 평가하기 위해 각 차원 $k \in [1, n]$의 $\theta$에 대한 목적 함수 $J(\theta)$의 $k$번째 편미분을 추정합니다. 이를 위해 $k$번째 차원에서 $\theta$를 작은 값 $\epsilon$만큼 교란시킵니다.

$$
\frac{\partial J(\theta)}{\partial \theta_k} \sim \frac{J(\theta + \epsilon u_k)-J(\theta)}{\epsilon}
$$

여기서 $u_k$는 $k$번째 성분만 1이고 나머지는 0인 단위 벡터입니다.

---

### Score Function

정책 $\pi_{\theta}$가 0이 아닌 곳에서는 미분 가능하고 경사 $\nabla_\theta\pi_\theta(s, a)$를 안다고 가정합니다. likelihood ratios는 다음 항등식을 활용합니다.

$$
\nabla_{\theta} \pi_{\theta}(s,a) \\
=\pi_{\theta}(s,a)\frac{\nabla_{\theta}\pi_{\theta}(s,a)}{\pi_{\theta}(s,a)} \\
=\pi_{\theta}(s,a)\text{log}\pi_{\theta}(s,a)
$$

이 때 score function은 $\nabla_\theta\log\pi_\theta(s, a)$입니다.

---

### Policy

#### 1. Softmax Policy

특징의 선형 결합 $\Phi(s,a)^T$를 사용하여 행동에 가중치를 부여합니다. 행동의 확률은 지수 가중치에 비례합니다.

$$
\pi_{\theta}(s,a) \propto e^{\Phi(s,a)^T \theta}
$$

스코어 함수는 다음과 같습니다.

$$
\nabla_{\theta} \text{log}_{\theta}(s,a)=\Phi(s,a)-E_{\pi_{\theta}}[\Phi(s,\cdot)]
$$

#### 2. Gaussian Policy

$$
\mu(s)=\Phi(s)^{T}\theta
$$

연속적인 행동 공간에서는 가우시안 정책이 자연스러우며 평균은 상태 특징의 선형 결합입니다. 분산은 고정될 수도 있고 매개변수화될 수도 있습니다.

---

### One-Step MDPs

$$
J(\theta)=E_{\pi_{\theta}[r]} \\
= \sum_{s \in S} d(s) \sum_{a \in A} \pi_{\theta}(s,a)R_{s,a} \\
\Rightarrow
\nabla_{\theta} J(\theta)=E_{\pi_{\theta}}[\nabla_{\theta}log_{\pi_{\theta}}(s,a)r]
$$

one step MDP를 고려해보면 상태가 $s \sim d(s)$에서 시작하고 한 단계 후 보상 $r = R_{s,a}$와 함께 에피소드가 종료됩니다. likelihood를 사용하여 경사를 계산합니다.

---

### Policy Gradient Theorem

정책 경사 정리는 우도비 접근법을 다단계 MDPs로 일반화합니다. 이 정리는 즉각적인 보상 $r$를 장기적인 가치인 행동-가치 함수(action-value function) $Q^{\pi_\theta}(s, a)$로 대체합니다.

$$
\nabla_{\theta} J(\theta)=E_{\pi_{\theta}}[\nabla_{\theta} log \pi_{\theta}(s,a) Q^{\pi_{\theta}}(s,a)]
$$

임의의 미분 가능한 정책 $\pi_\theta(s, a)$에 대해, 정책 목표 함수 $J$가 위와 같이 정의됩니다.

---

### Reducing Variance Using a Critic

MC의 정책 경사 방법은 여전히 분산이 높습니다. 이 때 비평가를 사용하여 행동-가치 함수를 다음과 같이 추정합니다.

$$
Q_{w}(s,a) \sim Q^{\pi_{\theta}}(s,a)
$$

actor-critic 알고리즘은 행동-가치 함수인 매개변수 $w$를 업데이트하며 비평가가 제안하는 방향으로 $\theta$를 업데이트합니다.

---

### Estimating the Advantage Function

어드밴티지 함수는 정책 경사의 분산을 현저히 줄일 수 있고 비평가는 실제 함수를 추정해야 합니다. 예를 들면 아래와 같습니다.

$$
V_v(s) \sim V^{\pi_{\theta}}(s), \\
Q_w(s,a) \sim Q^{\pi_{\theta}}(s,a)
$$

여기서 $A(s,a)=Q_w(s,a)-V_v(s)$로 업데이트합니다.

참 가치 함수인 $V^{\pi_\theta}(s)$에 대한 TD 오차(TD error) $\delta^{\pi_\theta} = r + \gamma V^{\pi_\theta}(s') - V^{\pi_\theta}(s)$는 어드밴티지 함수의 불편향 추정치입니다. $\nabla_{\theta} J(\theta)=E_{\pi_{\theta}}[\nabla_{\theta} log \pi_{\theta}(s,a) \delta^{\pi_{\theta}}]$를 통해 정책 경사를 계산할 수 있습니다.

---

### Critics at Different Time-Scales

비평가는 다양한 시간 스케일의 목표로부터 가치 함수 $V_\theta(s)$를 추정할 수 있습니다.

$\rightarrow$ MC의 경우 목표는 return $v_t$로 $\Delta \theta = \alpha (v_t-V_{\theta}(s)) \phi(s)$를 계산합니다.

$\rightarrow$ TD(0)은 목표가 $r + \gamma V(s')$로 $\Delta \theta = \alpha (r + \gamma V(s')-V_{\theta}(s))\phi(s)$를 계산합니다.

$\rightarrow$ 전방향 TD$(\lambda)$는 목표가 $\lambda$ return인 $v_t^{\lambda}$입니다. 따라서 $\Delta \theta = \alpha(v_t^{\lambda}-V_{\theta}(s))\phi(s)$를 계산합니다.

$\rightarrow$ 후방향 TD$(\lambda)$는 적격성 흔적을 사용합니다. 따라서 $\Delta \theta=\alpha \delta_t e_t$를 계산합니다.

MC 정책경사는 완전한 return $v_t$로부터 오차를 사용하고 Actor-Critic 정책 경사는 1단계 TD 오차$r + \gamma V_v(s_{t+1})$를 사용하여 추정합니다.

---

### 참고 자료

[원본 경로 #1](https://davidstarsilver.wordpress.com/wp-content/uploads/2025/04/lecture-7-policy-gradient-methods.pdf)


