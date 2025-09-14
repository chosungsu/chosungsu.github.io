---
title: 'Value Function Approximation'
date: '2025-03-21'
tags: ['reinforcement learning', 'lecture']
---

### Incremental Methods

#### Gradient Descent

$J(\mathbf{w})$가 매개변수 벡터 $\mathbf{w}$에 대한 미분 가능한 함수라고 할 때, $J(\mathbf{w})$의 기울기(gradient)를 다음과 같이 정의합니다.

$$
\nabla_w J(w)=\begin{pmatrix}
\frac{\partial J(w)}{\partial w_1} \\
\vdots \\
\frac{\partial J(w)}{\partial w_n}
\end{pmatrix}
$$

gradient의 국소 최솟값을 찾기 위해 음의 기울기 방향으로 $w$를 조정합니다.

#### Stochastic Gradient Descent

목표는 근사 가치 함수 $\hat{v}(S, \mathbf{w})$와 참 가치 함수인 $v_{\pi}(S)$ 사이의 평균 제곱 오차(MSE)를 최소화하는 매개변수 $w$를 찾는 것입니다.

$$
J(w)=E_{\pi}[(v_{\pi}(S)-\hat{v}(S, w))^2], \\
\Delta w = -\frac{1}{2}\alpha \nabla_w J(w) \\
= \alpha E_{\pi}[(v_{\pi}(S)-\hat{v}(S,w))\nabla_w \hat{v}(S,w)]
$$

확률적 경사 하강법은 기울기를 샘플링합니다.

#### Linear Value

가치 함수를 특징들의 선형 결합으로 표현합니다.

$$
\hat{v}(S, w)=X(S)^Tw=\sum_{j=1}^{n} x_j(S)w_j
$$

목표함수는 이차 함수이며 확률적 경사 하강법은 전역 최적점에 수렴합니다. $\nabla_w \hat{v}(S,w)=X(S), \Delta w=\alpha(v_{\pi}(S)-\hat{v}(S,w))X(S)$로 스텝 사이즈와 예측 오차, 특징 값의 곱으로 업데이트합니다.

#### Monte-Carlo with Value Function Approximation

리턴 $G_t$는 참 가치인 $v_\pi(S_t)$의 불편향된(unbiased), 노이즈가 있는 샘플입니다. 따라서 훈련 데이터 ${S_1, G_1}, {S_2, G_2}, \dots, {S_T, G_T}$에 지도 학습을 적용할 수 있습니다.

$$
\Delta w = \alpha(G_t-\hat{v}(S_t,w))\nabla_w \hat{v}(S_t,w)
$$

이와 같이 MC 평가는 국소 최적점으로 수렴합니다.

#### TD Learning with Value Function Approximation

TD 목표 $R_{t+1} + \gamma\hat{v}(S_{t+1}, \mathbf{w})$는 참 가치 $v_\pi(S_t)$의 편향된(biased) 샘플입니다.
그래도 훈련 데이터 ${S_1, R_2 + \gamma\hat{v}(S_2, \mathbf{w})}, \dots, {S_{T-1}, R_T}$에 지도 학습을 적용할 수 있습니다.

$$
\Delta w=\alpha(R+\gamma \hat{v}(S',w)-\hat{v}(S,w))*\\
\nabla_w \hat{v}(S,w) \\
=\alpha \delta X(S)
$$

이처럼 선형 TD(0)은 전역 최적점으로 수렴합니다.

---

### Batch Methods

경사 하강법은 간단하고 매력적이지만 sample에 효율적이지 않습니다. 배치 방법은 에이전트의 경험이 주어졌을 때 가장 적합한 가치 함수를 찾는 것을 목표로 합니다.

#### Least Squares Prediction

$$
\text{LS}(w)=\sum_{t=1}^T(v_t^{\pi} - \hat{v}(s_t,w))^2
$$

가치 함수 근사 $\hat{v}(s, \mathbf{w}) \approx v_\pi(s)$가 주어지고, 경험(experience) $D = { \langle s_1, v^\pi_1 \rangle, \langle s_2, v^\pi_2 \rangle, \dots, \langle s_T, v^\pi_T \rangle }$가 상태-가치 쌍으로 구성되어 있다고 하면 최소 제곱 알고리즘은 $\hat{v}(s_t, \mathbf{w})$와 목표 가치 $v_t^{\pi}$ 사이의 제곱 오차 합을 최소화하는 매개변수 $w$를 찾습니다.

#### Experience Replay in Deep Q-Networks (DQN)

DQN은 경험 재생과 고정된 Q-목표(fixed Q-targets)를 사용합니다. 탐욕적 정책에 따라 행동 $a_t$를 취하고 있고 전이 $(s_t, a_t, r_{t+1}, s_{t+1})$를 재생 메모리(replay memory)에 저장합니다. $D$에서 전이의 무작위 미니배치를 샘플링해서 고정된 매개변수 $\mathbf{w}^-$에 대한 $Q$ learning 목표를 계산합니다.

#### Least Squares Q-Learning

$$
\delta = R_{t+1} \\
+\gamma \hat{q} (S_{t+1}, \pi(S_{t+1}), w) \\
-\hat{q}(S_t, A_t, w), \\
\Delta w=\alpha \delta X(S_t,A_t)
$$

이처럼 선형 $Q$ learning 업데이트를 합니다.

---

### 참고 자료

[원본 경로 #1](https://davidstarsilver.wordpress.com/wp-content/uploads/2025/04/lecture-6-value-function-approximation-.pdf)


