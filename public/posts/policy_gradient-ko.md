---
title: 'Policy gradient'
date: '2025-03-17'
tags: ['cs234', 'lecture']
---

### value-based vs policy-based

$Q$함수나 $V$함수처럼 가치함수들을 학습하는 value-based RL은 $\epsilon$-greedy와 같이 정책은 암묵적으로 이들로부터 파생되는 특징을 갖습니다.

policy-based RL은 정책$(\pi_{\theta}(s,a))$를 직접 매개변수화하여 학습하고 가장 높은 가치함수를 갖는 것을 목표로 정책을 찾는다는 특징을 갖습니다.

actor-critic은 이 둘을 모두 학습하고 유지하는 방법입니다.

#### policy-based optimization

최적화 방법은 gradient-free를 사용할 수 있다고 합니다. hill climbing, simplex 등 미분 불가능한 경우에도 적용 가능하고 병렬화가 쉬운 장점이 있지만 샘플 효율성이 낮고 시간적 구조를 무시하는 단점이 있습니다.

또는 gradient를 활용하면 더 효율성이 좋다고 합니다. gradient descent, conjugate gradient, quasi-newton 등이 해당합니다.

---

### policy gradient

정책 결사 알고리즘은 정책 $(\theta)$에 대한 가치함수 $V(s_0, \theta)$의 경사를 사용하여 local maximum을 찾습니다. 업데이트는 $\Delta\theta = \alpha \nabla_\theta V(s_0, \theta)$ 형태로 이루어집니다. 여기서 $\nabla_\theta V(s_0, \theta)$가 policy gradient에 해당합니다. 그리고 $\alpha$가 step size 파라미터에 해당합니다.

---

### score functions

score function은 $\nabla_{\theta} log \pi(s;\theta)$와 같이 계산이 되고 softmax policy에서는 특징 $\phi(s, a)$의 선형 조합을 사용하여 행동의 가중치를 부여하고 그 확률은 가중치의 지수함수에 비례합니다. 정책은 $\pi_\theta(s, a) = e^{\phi(s,a)^T \theta} / (\sum_{a'} e^{\phi(s,a')^T \theta})$와 같이 정의가 되며 score function은 매개변수에 대한 로그 확률의 미분이므로 $\nabla_\theta \log \pi_\theta(s, a) = \phi(s, a) - E_{\pi_\theta}[\phi(s, \cdot)]$ 으로 계산이 됩니다.

gaussian policy는 연속적인 행동 공간에서 사용이 되고 $\mu(s)$는 state feature인 $\phi(s)$의 선형 조합으로 $\mu(s) = \phi(s)^T \theta$와 같이 정의됩니다. 그리고 score function은 $\nabla_\theta \log \pi_\theta(s, a) = \frac{(a - \mu(s))\phi(s)}{\sigma^2}$ 으로 계산이 되는데 이는 샘플링된 행동($a$)이 평균에서 얼마나 벗어났는지 비례하여 경사를 업데이트합니다.

마지막으로 likelihood ratio는 $\theta$를 최적화하기 위해 가치함수 $V(\theta)$의 경사를 $\underset{\theta}{\operatorname{argmax}} V(\theta) = \underset{\theta}{\operatorname{argmax}} \sum_{\tau} P(\tau; \theta)R(\tau)$로 구합니다. 여기서 $\tau$는 상태-행동$(s_t, a_t, r_t,...)$를 표현하고 $\pi_{\theta}$를 따를 때 $\tau$가 발생할 확률을 표현합니다.

$$
\nabla_\theta V(\theta) \approx \hat{g} \\
= (1/m) \sum_{i=1}^m R(\tau^{(i)})\nabla_\theta \log P(\tau^{(i)}; \theta) \\
= (1/m) \sum_{i=1}^m R(\tau^{(i)}) \sum_{t=0}^{T-1} \nabla_\theta \log \pi_\theta(a_t^{(i)}|s_t^{(i)})
$$

이 공식은 $m$개의 샘플 $\tau$를 사용하여 경험적 근사치로 근사할 수 있습니다.

---

### policy gradient and reducing variance

#### 1. temporal structure

초기의 policy gradient는 $\tau^{i}$의 총 보상 $R(\tau^{i})$와 확률의 로그 미분의 기댓값을 사용합니다.

$$
\nabla_\theta E_\tau [R] = E_\tau \left[ \left( \sum_{t=0}^{T-1} r_t \right) \\
\left( \sum_{t=0}^{T-1} \nabla_\theta \log \pi_\theta(a_t|s_t) \right) \right]
$$

이 수식은 편향되지 않은 추정치이지만 매우 큰 분산을 가질 수 있습니다. 그 이유는 $\tau$의 모든 보상이 행동에 대한 로그 확률 미분과 곱해지기 때문입니다.

$$
V(\theta)=\nabla_\theta E[R] \\
= E \left[ \sum_{t=0}^{T-1} \nabla_\theta \log \pi_\theta(a_t, s_t) \sum_{t'=t}^{T-1} r_{t'} \right]
$$

위의 수식은 분산을 줄이기 위해 시간적 구조를 활용하여 재구성한 것입니다. 직전 수식과의 차이는 각 시간에서의 행동에 대한 로그 확률 미분이 해당 시점 이후에 얻는 총 보상 $G_t$가 곱해지도록 변경한 것입니다. 이렇게 재구성하면 과거의 행동은 보상에 영향은 주지만 현재 행동의 가치가 이후에 얻게 될 보상에만 의존한다는 temporal causality를 반영할 수 있습니다.

$$
\nabla_\theta E[R] \approx \\
(1/m) \sum_{i=1}^m \sum_{t=0}^{T-1} \nabla_\theta \log \pi_\theta(a_t^{(i)}, s_t^{(i)})G_t^{(i)}
$$

경험적 추정치로 근사화하면 이와 같습니다.

#### 2. baseline

분산을 줄이기 위해 baseline $b(s)$를 도입하는 것은 중요한 결정이었습니다. 이는 추정치에 편향을 도입하지 않으면서도 안정성을 크게 향상시킵니다.

$$
\nabla_\theta E_\tau [R] = E_\tau \left[ \sum_{t=0}^{T-1} \nabla_\theta \log \pi(a_t|s_t; \theta) \\
\left( \sum_{t'=t}^{T-1} r_{t'} - b(s_t) \right) \right]
$$

여기서 $G_t-b(s_t)$는 advantage estimate $\hat{A}_t$가 됩니다. 얻는 총 보상 $G_t$가 기대한 보상 $b(s_t)$보다 좋았다면 해당 행동의 확률을 높이고 반대인 경우는 확률을 낮추게 됩니다.

#### 3. actor-critic methods

이는 정책과 값 함수 모두 명시적으로 표현하고 동시에 업데이트하는 알고리즘으로 critic은 상태-액션 값 $Q$ 또는 상태 값 $V$에 대한 추정을 합니다. actor는 이 추정을 바탕으로 더 나은 정책 즉, 어떤 상태에서 어떤 행동을 취할지에 대한 규칙을 학습하고 업데이트합니다.

정책 파라미터인 $\theta$를 업데이트하여 성능을 나타내는 $V(\theta)$를 최대화하는 것이 목표로 critic을 temporal difference, monte carlo 사이 조합을 사용하여 구성할 수도 있습니다.

monte carlo return $\hat{R}_t^{\inf}$는 $r_t+\gamma r_{t+1}+ \gamma^2 r_{t+2} + ...$로 에피소드의 끝까지 총 할인된 보상을 나타냅니다. 편향은 없지만 분산은 매우 높은 추정치입니다. 이러한 return 추정치에 베이스라인 $V(s_t)$를 뺀 값으로 advantage 추정치를 얻을 수 있고 역시나 infinite 단계에서는 높은 분산을 갖고 낮은 편향을 가집니다.

---

### advanced policy gradients

#### 1. problems with policy gradient

확률적 경사 상승을 수행하여 $max_{\theta} J(\pi_{\theta})$를 최적화하는 문제를 해결하고자 할 때 정책에 따라 무한히 오랜 시간 얻을 할인된 보상의 기댓값으로 정의합니다.

이러한 경사 방법에는 poor sample efficiency 문제가 있어서 데이터 배치가 한 번의 경사 이후 즉시 버려질 수 있고 on policy의 기댓값이기 때문에 새로운 데이터로 학습하면 이전 데이터는 버려질 수 있습니다.

#### 2. policy performance bounds

파라미터 공간에서 적절한 step size를 설정하기 어려웠던 문제를 해결하기 위해 policy space 공간은 두 정책 $\pi$, $\pi'$ 사이의 성능 차이를 수학적으로 관계 짓는 것입니다.

$$
J(\pi')-J(\pi)=E_{\tau \sim \pi'} \left [\sum_{t=0}^{\infty} \gamma^t A^{\pi} (s_t, a_t) \right]
$$

위 수식은 새로운 정책 $\pi'$의 성능을 이전 정책의 adventage function으로 정의한다는 점에서 시사하는 바가 컸지만 여전히 그 정책으로 샘플링된 $\tau \sim \pi'$가 필요하다는 한계가 있습니다.

중요도 샘플링(importance sampling)을 사용한다면 다른 방식으로 재구성될 수 있습니다. 이는 샘플링 분포가 달라도 기댓값을 추정할 수 있는 방법입니다.

$$
J(\pi')-J(\pi) \\
=\frac{1}{1-\gamma} \mathbb{E}_{s \sim d^{\pi'}, a \sim \pi'} [A^{\pi}(s,a)]
$$

하지만 아직도 새로운 정책에 의존하고 추정치가 exploding 또는 vanishing 문제가 발생할 수 있어서 kl-divergence를 사용하는 방법이 제안되었습니다.

$$
J(\pi')-J(\pi)=\frac{1}{1-\gamma} \mathbb{E}_{s \sim d^{\pi}, a \sim \pi} \\
\left[\frac{\pi'(a|s)}{\pi(a|s)} A^{\pi}(s,a) \right]
$$

이 근사된 함수는 이전 정책으로부터 최적화할 수 있다는 장점을 갖고 새 정책과 가까울 때 꽤 좋다고 연구 결과에서 알려지기도 했습니다.

#### 3. proximal policy optimization(ppo)

ppo는 kl penalty를 근사적으로 적용하여 정책이 크게 변하는 것을 방지하여 안정성을 높였습니다.

$$
\theta_{k+1}=\underset{\theta}{\operatorname{argmax}} L_{\theta_k}(\theta)-\beta_k \bar{D_{kl}}(\theta|\theta_k)
$$

이 페널티로 비제약 최적화 문제를 해결하고 $\beta$를 조절하여 근사적으로 강요합니다.

clipped objective는 중요도 비율을 $[1-\epsilon, 1+\epsilon]$ 범위 내부로 clip하여 정책이 너무 멀리 벗어나려는 경향을 방지합니다.

---

### imitation learning

#### 1. behavioral cloning

전문가의 $(s, a)$ 쌍을 사용하여 지도학습 문제로 환원하여 정책을 직접 학습합니다. 데이터의 분포 불일치로 오류가 누적될 수 있는 문제가 있습니다.

#### 2. Dagger

행동 복제의 누적 오류를 완화하기 위해 제안되었고 학습된 정책이 특정 상태에 도달했을 때 전문가에게 해당 상태에서의 올바른 행동을 labeling하고 새로운 데이터를 데이터셋에 추가하여 재훈련합니다. 매 단계마다 피드백을 요구하는 것이 단점입니다.

#### 3. inverse RL

보상함수 $R$을 추론하는 것을 목표로 하고 선형함수인 $R(s)=w^Tx(s)$와 같은 형태라고 가정하면 정책은 $V^{\pi}(s_0)=E_{s \sim \pi} \left[\sum_{t=0}^{\infty} \gamma^t R(s_t)|s_0 \right]$으로 표현이 가능합니다.

전문가 정책의 할인된 누적 특징 기댓값 $\mu(\pi)(s)$와 일치하는 정책을 찾는 것이 목적이 되어야 하고 따라서 아래와 같이 $V^{\pi}(s_0)=w^T\mu(\pi)$로 $V^* \ge V^{\pi}$가 되는 순간의 보상함수를 추론해야 합니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/L6OVEmV3NcE?si=S7zhfOC4Kb181VrD)

[원본 경로 #2](https://youtu.be/8PwvNQ5WS-o?si=Tk3k2b3r3FBUpvqt)

[원본 경로 #3](https://youtu.be/4ngb0IZTg8I?si=M9NBRMaDEkTcsip4)



