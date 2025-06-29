---
title: 'Offline RL'
date: '2025-03-21'
tags: ['cs234', 'lecture']
---

### counterfactual / batch RL

과거 데이터가 주어졌을 때 나의 입장에서 다른 행동을 했다면 결과는 어땠을지에 대한 질문에 답변을 하는 것이 중요합니다. 앞서 배웠던 $Q$ learning은 off policy 알고리즘으로 $(s, a)$ 쌍과 다른 데이터로 사용할 수 있지만 deadly triad 문제로 실패할 수 있습니다.

#### learn dynamics and reward models

reward 모델의 $\hat{r}(s,a)$와 dynamic 모델의 $\hat{p}(s'|s,a)$를 학습하여 $\pi_t(s_t) \rightarrow a_t$로 정책을 결정하게 되면 $a_t$를 행동할 수 있도록 에이전트에게 보냅니다. markov reward process의 벨만 방정식 $V=R+\gamma PV$의 해석적 해를 기반으로 하여 $V^{\pi} approx (1-\gamma \hat{P}^{\pi})^{-1} \hat{R}^{\pi}$로 데이터셋의 가치함수를 계산하고 $P^{\pi}(s'|s)=p(s'|s, \pi(s))$와 같이 정책에 의해 유도되는 상태 전이 확률을 계산합니다.

이와 같이 모델 기반 접근 방식은 데이터를 한 번 학습한 후 정책을 최적화하는 데 사용되므로 데이터 효율적일 수 있다는 장점으로 데이터 획득이 어렵거나 비용이 많이 드는 offline RL에 유용합니다.

---

### model free

offline batch policy는 주어진 고정 데이터셋으로부터 특정 정책의 성능을 추정하는 것을 목표로 합니다.

#### 1. fitted Q evaluation

환경의 dynamic model이나 reward model을 명시적으로 구축하지 않고 수집된 경험 $(s, a, r, s')$에서 직접 상태-행동 가치함수인 $Q$를 학습합니다.

$$
\widetilde{Q}^{\pi}(s_i, a_i)=r_i+\gamma V_{\theta}^{\pi}(s_{i+1}), \\
\underset{\theta}{\operatorname{argmin}} \sum_i (Q_{\theta}^{\pi}(s_i, a_i)-\widetilde{Q}^{\pi}(s_i, a_i))^2
$$

위 수식처럼 상태-행동 가치함수가 타깃값에 가까워지도록 최소화하는 업데이트를 합니다.

markov 가정에 의존하고 근사값이 실제 환경의 가치함수를 정확하게 반영하지 못할 경우 편향이 발생할 수 있습니다.

#### 2. importance sampling

다른 분포에서 추출한 샘플을 사용하여 기댓값을 추정하는 기법입니다. 특정 분포 $P(x)$에 대한 함수 $f(x)$의 기댓값 $E_{x \sim P}[f(x)]$을 샘플링 분포 $Q(x)$에서 추출한 샘플 $x$를 사용하여 $E_{x \sim Q}[\frac{P(x)}{Q(x)} f(x)]$로 계산합니다. 이 때 $\frac{P(x)}{Q(x)}$를 중요도 샘플링이라고 합니다. 이는 monte carlo와 유사하지만 분포 불일치를 보정합니다.

unbiased esimator가 되기 위해서는 샘플링 분포 $q$가 평가 대상인 분포 $p$가 모든 $x$에 대해 0보다 커야 합니다. 즉, $p(x) > 0$인 모든 $x$에 대해 $q(x) > 0$이어야 합니다. 이는 평가하려는 정책이 방문할 수 있는 모든 $(s,a)$ 쌍을, 데이터를 수집한 행동 정책이 방문할 수 있어야 한다는 의미입니다.

importance sampling은 dynamic model 없이도 사용이 가능하고 markov 가정에 의존하지 않습니다.

#### 3. reason for why batch RL is insufficient

많은 batch RL baseline은 평가하려는 정책($\pi$)과 데이터를 수집한 행동 정책($\pi_b$) 간의 분포 거리($\text{dist}(\pi(a|s), \pi_b(a|s))$)에 기반한 페널티 또는 제약에 초점을 맞춥니다. 이러한 접근 방식은 large action conditional probabilities의 연속이 드문 상태로 이어질 수 있는 문제가 발생할 수 있습니다. 모델이 충분한 데이터를 학습하지 못하였기 때문에 실제보다 좋은 보상을 예측하게 되어 실제 환경에서는 낮은 성능을 보일 위험이 있습니다.

---

### 참고 자료

[원본 경로 #1](https://youtu.be/F6APGIAm5fw?si=7HjhnByZLVsZveCl)


