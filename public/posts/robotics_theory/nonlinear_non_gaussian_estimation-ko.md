---
title: 'Nonlinear Non Gaussian Estimation'
date: '2024-10-09'
tags: ['Robotics', 'lecture']
---

### Full Bayesian Estimation

간단한 1차원 문제로, 스테레오 카메라를 사용하여 랜드마크의 위치 $x$를 추정하는 상황을 고려합니다.

$$
y = \frac{fb}{x} + n
$$

여기서 $y$는 시차(disparity)이고, $n$은 가우시안 측정 잡음입니다.

#### Maximum a Posteriori Estimation

MAP 추정은 전체 사후 확률 밀도 함수(PDF)에서 가장 가능성이 높은 상태 값, 즉 최빈값(mode)을 찾는 접근 방식입니다. MAP 추정치 $\hat{x}_{\text{map}}$는 사후 확률 $p(x|y)$를 최대화하는 상태 $x$입니다.

$$
\begin{aligned}
&\hat{x}_{\text{map}} = \underset{x}{\text{arg max}} \, p(x|y) \\
&= \underset{x}{\text{arg min}} \, (-\ln(p(x|y)))
\end{aligned}
$$

이는 다음과 같이 음의 로그 우도를 최소화하는 것과 같습니다. 베이즈 정리와 로그를 적용하면 $\mathbf{x}$에 의존하지 않는 정규화 상수 $p(y)$를 무시하고 비용 함수 $J(x)$를 최소화하는 문제로 바뀝니다.

평균 오차 $e_{\text{mean}}(\hat{x})$는 추정치와 참값 $x_{\text{true}}$ 간의 평균 차이를 측정하며, 추정기가 편향되었는지 여부를 나타냅니다.

$$
e_{\text{mean}}(\hat{x}) = \text{E}_{XN} [\hat{x} - x_{\text{true}}] = \text{E}_{XN} [\hat{x}] - \check{x}
$$

비선형 측정 모델 $g(\cdot)$ 하에서는 MAP 추정 $\hat{x}_{\text{map}}$가 일반적으로 편향됩니다. 비선형 모델은 사후 확률 분포를 비가우시안으로 만들며, 이로 인해 분포의 최빈값(mode)(MAP)과 평균(mean)(Full Bayesian의 기댓값)이 일치하지 않기 때문입니다.

---

### Recursive Discrete-Time Estimation

비선형-비가우시안(NLNG) 시스템에 대한 상태 추정의 기반이 되는 재귀적 접근 방식, 즉 베이즈 필터를 도출하고, 이를 근사하여 가장 널리 사용되는 필터 중 하나인 확장 칼만 필터(EKF)를 유도하는 과정을 설명합니다.

우선 추정기의 기본이 되는 동역학 및 관측 모델이 필요합니다.

$$
\begin{aligned}
&\mathbf{x}_k = f(\mathbf{x}_{k-1}, \mathbf{v}_k, \mathbf{w}_k), \\
&\mathbf{y}_k = g(\mathbf{x}_k, \mathbf{n}_k)
\end{aligned}
$$

이 시스템의 중요한 특징은 마르코프 속성을 갖는다는 것입니다. 확률 과정이 마르코프 속성을 가질 때, 현재 상태가 주어진 경우 미래 상태의 조건부 확률 밀도 함수(PDF)는 현재 상태에만 의존하며 과거 상태와는 조건부 독립입니다.

#### Bayes Filter

베이즈 필터는 현재 시점까지의 측정값만을 사용하여 상태 $\mathbf{x}_k$의 전체 PDF(사후 신뢰), 즉 $p(\mathbf{x}k|\check{\mathbf{x}}0, \mathbf{v}{1:k}, \mathbf{y}{0:k})$를 계산하고자 합니다.

$$
\begin{aligned}
&\underbrace{p(\mathbf{x}_k|\check{\mathbf{x}}_0, \mathbf{v}_{1:k}, \mathbf{y}_{0:k})}_{\text{사후 신뢰}} \\
&= \eta \underbrace{p(\mathbf{y}_k|\mathbf{x}_k)}_{\text{관측 보정}} \\
&*\int \underbrace{p(\mathbf{x}_k|\mathbf{x}_{k-1}, \mathbf{v}_k)}_{\text{동역학 예측}} \\
&*\underbrace{p(\mathbf{x}_{k-1}|\check{\mathbf{x}}_0, \mathbf{v}_{1:k-1}, \mathbf{y}_{0:k-1})}_{\text{사전 신뢰}} \, d\mathbf{x}_{k-1}
\end{aligned}
$$

PDF는 무한 차원의 공간에 존재하므로, 신뢰 $p(\mathbf{x}_k|\ldots)$를 완전히 표현하려면 무한한 메모리가 필요합니다. 그리고 베이즈 필터의 적분은 정확히 계산하기에 너무 복잡하고 계산 비용이 많이 듭니다.

#### Extended Kalman Filter, EKF

EKF는 베이즈 필터에 두 가지 주요 근사를 적용하여 구현 가능하게 만든 필터입니다. EKF는 아폴로 프로그램의 우주선 궤적 추정을 위해 Stanley F. Schmidt에 의해 개발되었으며, 칼만 필터를 비선형 모델에 적용할 수 있도록 확장한 것입니다.

추정된 신뢰 함수 $p(\mathbf{x}_k|\ldots)$가 가우시안이라고 제한합니다.

$$
p(\mathbf{x}_k|\check{\mathbf{x}}_0, \mathbf{v}_{1:k}, \mathbf{y}_{0:k}) = \mathcal{N}(\hat{\mathbf{x}}_k, \hat{P}_k)
$$

잡음 변수 $\mathbf{w}_k$와 $\mathbf{n}_k$가 가우시안이라고 가정합니다.

$$
\mathbf{w}_k \sim \mathcal{N}(0, Q_k), \quad \mathbf{n}_k \sim \mathcal{N}(0, R_k)
$$

베이즈 필터의 적분을 수행하기 위해 비선형 모델 $f(\cdot)$와 $g(\cdot)$를 현재 상태 추정치의 평균($\hat{\mathbf{x}}_{k-1}$ 또는 $\check{\mathbf{x}}_k$) 주변에서 1차 테일러 급수로 선형화합니다.

#### Generalized Gaussian Filter

상태 $\mathbf{x}_k$와 최신 측정값 $\mathbf{y}_k$에 대한 결합 가우시안을 구성하는 것이 목표로 

$$
\mathbf{p}(\mathbf{x}_k, \mathbf{y}_k|\check{\mathbf{x}}_0, \mathbf{v}_{1:k}, \mathbf{y}_{0:k-1}) = \mathcal{N}\left( \begin{bmatrix} \boldsymbol{\mu}_{x,k} \\ \boldsymbol{\mu}_{y,k} \end{bmatrix}, \begin{bmatrix} \Sigma_{xx,k} & \Sigma_{xy,k} \\ \Sigma_{yx,k} & \Sigma_{yy,k} \end{bmatrix} \right)
$$

가우시안을 사용하여 $\mathbf{x}_k$에 대한 조건부 가우시안 밀도(사후 확률)를 직접 작성할 수 있습니다.

#### Iterated Extended Kalman Filter, IEKF

EKF와 IEKF의 주요 차이점은 선형화의 작동점(operating point)입니다. IEKF는 현재 추정치 주변에서 관측 모델을 선형화합니다.

$$
\mathbf{y}_k = g(\mathbf{x}_k, \mathbf{n}_k) \approx \mathbf{y}_{\text{op}, k} + G_k (\mathbf{x}_k - \mathbf{x}_{\text{op}, k}) + \mathbf{n}'_k
$$

여기서 $\mathbf{x}_{\text{op}, k}$가 선형화가 수행되는 임의의 점입니다. IEKF는 성능을 향상시키기 위해 보정 단계에서 반복적으로 선형화를 재수행합니다.

$$
\mathbf{x}_{\text{op}, k} \leftarrow \hat{\mathbf{x}}_k
$$

IEKF의 최종 추정치(가우시안의 평균)는 전체 사후 확률의 (국소) 최댓값, 즉 MAP 추정치와 일치합니다.

---

### 참고 자료

[원본 경로 #1](https://mingkangxiong.github.io/assets/books/State_Estimation_for_Robotic_2018.pdf?utm_source=chatgpt.com)



