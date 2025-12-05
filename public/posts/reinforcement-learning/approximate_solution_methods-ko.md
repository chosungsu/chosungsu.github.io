---
title: 'Approximate solution methods'
date: '2025-03-28'
tags: ['reinforcement learning', 'lecture']
---

### Value Prediction with Function Approximation

함수 근사(Function Approximation)를 사용할 때, 근사 가치 함수 $\hat{v}(s, \mathbf{w}) \approx v_{\pi}(s)$는 테이블이 아닌 매개변수 벡터 $\mathbf{w} \in \mathbb{R}^n$로 표현되는 함수 형태입니다.

강화 학습에서 함수 근사를 사용할 때 요구되는 특성으로 환경과의 상호작용 또는 모델과의 상호작용 중에 증분적으로(incrementally) 습득된 데이터로부터 효율적으로 온라인 학습을 할 수 있어야 하고 타겟 함수(target function)가 시간이 지남에 따라 변하는 비정상성(nonstationarity)을 처리할 수 있어야 합니다.

---

### Gradient-Descent Methods

경사 하강법은 매개변수 벡터 $\mathbf{w}$가 고정된 개수의 실수 성분을 가진 열 벡터 $\mathbf{w} = (w_1, w_2, \ldots, w_n)^T$이고, 근사 가치 함수 $\hat{v}(s, \mathbf{w})$가 $\mathbf{w}$에 대해 부드러운 미분 가능한 함수인 경우에 사용됩니다.

각 훈련 예제 $S_t \mapsto v_{\pi}(S_t)$가 관찰된 후, 그 예제에 대한 제곱 오차를 가장 많이 줄이는 방향으로 $\mathbf{w}$를 조정합니다.

$$
\mathbf{w}_{t+1} = \mathbf{w}_t + \alpha \left[ v_{\pi}(S_t) - \hat{v}(S_t, \mathbf{w}_t) \right] \nabla \hat{v}(S_t, \mathbf{w}_t)
$$

타겟 출력 $V_t$가 참 값 $v_{\pi}(S_t)$의 근사치일 때 $v_{\pi}(S_t)$ 대신 $V_t$를 대입하여 일반 경사 하강법을 사용합니다.

$$
\mathbf{w}_{t+1} = \mathbf{w}_t + \alpha \left[ V_t - \hat{v}(S_t, \mathbf{w}_t) \right] \nabla \hat{v}(S_t, \mathbf{w}_t)
$$

경사 하강법 TD($\lambda$)에서는 $\lambda$-리턴 $V_t = G_t^\lambda$를 사용합니다. $\lambda < 1$일 때 $G_t^\lambda$는 불편 추정치가 아니므로 수렴이 보장되지는 않지만, 효과적입니다.

---

### Linear Methods

선형 방법은 근사 함수 $\hat{v}$가 매개변수 벡터 $\mathbf{w}$의 선형 함수인 중요한 특수 사례입니다. 모든 상태 $s$에 대해, $\mathbf{w}$와 같은 수의 성분을 가진 특징 벡터 $\mathbf{x}(s) = (x_1(s), x_2(s), \ldots, x_n(s))^T$가 있습니다.

$$
\hat{v}(s, \mathbf{w}) = \mathbf{w}^T \mathbf{x}(s) = \sum_{i=1}^n w_i x_i(s)
$$

선형의 경우, $\hat{v}(s, \mathbf{w})$의 기울기는 매우 간단합니다.

$$
\nabla \hat{v}(s, \mathbf{w}) = \mathbf{x}(s)
$$

선형 방법은 선형의 경우 지역 최적점은 곧 전역 최적점이 되므로, 수렴이 보장되면 최적해에 도달합니다. 선형 경사 하강 $\text{TD}(\lambda)$ 알고리즘은 $\alpha$가 적절히 감소할 때 수렴하는 것이 증명되었습니다.

---

### Control with Function Approximation

상태-가치 예측을 행동-가치 예측으로 확장하는 것은 간단합니다. 근사 행동-가치 함수 $\hat{q} \approx q_{\pi}$가 매개변수 벡터 $\mathbf{w}$로 표현됩니다.

$S_t, A_t \mapsto Q_t$ 형태의 예제에 대해서 $q_{\pi}(S_t, A_t)$의 모든 근사치 $R_{t+1} + \gamma \hat{q}(S_{t+1}, A_{t+1}, \mathbf{w}_t)$가 될 수 있습니다.

#### Bootstrap

함수 근사를 사용할 때 비-부트스트래핑 방법($\lambda=1$)은 부트스트래핑 방법($\lambda<1$)보다 더 광범위한 조건에서 더 안정적이고 더 낮은 점근적(asymptotic) 오차를 달성합니다. 그럼에도 불구하고 경험적 비교에서는 부트스트래핑 방법은 비-부트스트래핑 방법보다 훨씬 더 나은 성능을 보이는 것이 관찰되고 있습니다.

---

### Actor-Critic Methods

액터-비평가(Actor–Critic, AC) 방법은 정책을 명시적으로 표현하는 Actor가 행동을 선택하는 데 사용되고 추정된 가치 함수인 Critic으로 액터가 수행한 행동을 비평하는 데 사용됩니다.

AC 방법은 항상 온-정책(on-policy) 학습을 수행합니다. 비평가는 액터가 현재 따르는 정책에 대해 학습하고 비평해야 합니다. 비평은 TD 오차 $\delta_t$ 형태로 나타납니다.

$$
\delta_t = R_{t+1} + \gamma V(S_{t+1}) - V(S_t)
$$

AC 방법은 Q-학습이나 Sarsa와 같이 행동-가치 함수에서 정책을 유추하는 방법과 비교하여 두 가지 주요 장점을 가집니다. 연속적 행동 공간과 같이 가능한 행동의 수가 무한한 경우에도, 정책이 명시적으로 저장되어 있다면, 매번 행동을 선택하기 위해 광범위한 계산이 필요하지 않을 수 있습니다. 다양한 행동을 선택할 최적 확률을 명시적으로 학습할 수 있습니다. 이는 경쟁적인 상황이나 비-마르코프적인 상황에서 유용합니다.

#### Eligibility Traces

정책 $\pi$에 대한 온-정책 학습이므로, $\text{TD}(\lambda)$ 알고리즘을 사용할 수 있으며, 각 상태에 대해 하나의 추적이 필요합니다. 그리고 각 상태-행동 쌍에 대해 하나의 추적이 필요합니다. 따라서 $\text{AC}$ 방법은 두 세트의 추적이 필요합니다.

AC 방법의 액터는 

$$
H_{t+1}(s, a) = H_t(s, a) + \alpha \delta_t E_t(s, a)
$$

이와 같이 업데이트되고 $E_t(s, a)$는 상태-행동 쌍 $s, a$에 대한 추적입니다.

#### R-Learning and the Average-Reward Setting

함수 근사를 사용하거나, 에피소드로 나눌 수 없는 연속적인 과제에서는 일반적으로 할인된 보상(discounted-reward) 설정을 포기하고 평균 보상 설정(average-reward setting)으로 대체합니다. 이 설정에서 목표는 시간 단계당 평균 보상 $\bar{r}(\pi)$을 최대화하는 것입니다.

$$
\bar{r}(\pi) = \lim_{n \to \infty} \frac{1}{n} \sum_{t=1}^n \mathbb{E}_{\pi}[R_t]
$$

상태의 가치는 이 평균 보상 $\bar{r}(\pi)$를 기준으로 정의되며, 과도기적(transient) 보상 차이를 나타냅니다.

$$
v_{\pi}(s) = \sum_{k=1}^\infty \mathbb{E}_{\pi}[R_{t+k} - \bar{r}(\pi) | S_t =s]
$$

R-학습은 평균 보상 설정을 위한 오프-정책 제어 방법으로, Q-학습과 유사한 표준 TD 제어 방법입니다. 행동 정책과 추정 정책, 행동-가치 함수, 추정 평균 보상을 유지하고 보상 $R_{t+1}$이 아닌 $R_{t+1} - \bar{R}$에 대해 학습하고, $\bar{R}$도 업데이트합니다.

---

### 참고 자료

[원본 경로 #1](https://web.stanford.edu/class/psych209/Readings/SuttonBartoIPRLBook2ndEd.pdf?utm_source=chatgpt.com)


