---
title: 'Bayesian Statistics'
date: '2023-06-02'
tags: ['Mathematical statistics', 'lecture']
---

### Bayesian Procedures

#### Prior and Posterior Distributions

베이즈 추론의 핵심은 베이즈 정리를 사용하여 사전 지식을 데이터로 업데이트하는 것입니다.

$X$의 조건부 pdf 또는 pmf인 $X|\theta \sim f(x|\theta)$는 주어진 $\Theta = \theta$일 때 데이터 $\mathbf{X}$의 분포입니다. $\Theta$의 사전 pdf는 $\Theta \sim h(\theta)$와 같이 사전 믿음을 따릅니다.

$X = (X_1, \dots, X_n)$가 $f(x|\theta)$로부터 얻은 확률 표본일 때, $L(\mathbf{x}|\theta) = \prod_{i=1}^n f(x_i|\theta)$는 우도 함수(Likelihood function)입니다.

사후 pdf인 $k(\theta|x)$는 표본 $X=x$가 관측된 후 $\Theta$에 대한 조건부 분포이며, 베이즈 정리에 의해 다음과 같이 정의됩니다.

$$
k(\theta|x) = \frac{g(x, \theta)}{g_1(x)} = \frac{L(x|\theta)h(\theta)}{g_1(x)}
$$

여기서 $g_1(x)$는 $X$의 주변 pdf이며 $\theta$에 의존하지 않는 정규화 상수입니다. 따라서 사후 pdf는 우도와 사전 pdf의 곱에 비례합니다.

충분 통계량 $Y = u(X)$가 존재하는 경우, 사후 pdf는 충분 통계량 $y$의 pdf $g(y|\theta)$를 사용하여 다음과 같이 단순화될 수 있습니다.

$$
k(\theta|y) \propto g(y|\theta)h(\theta)
$$

#### Bayesian Point Estimation

$$
\delta(x) = \text{argmin} \int_{-\infty}^\infty L[\theta, \delta(x)]k(\theta|x) d\theta
$$

베이즈 관점에서 $\theta$의 점 추정은 손실 함수 $L[\theta, \delta(x)]$를 최소화하는 결정 함수 $\delta(x)$를 선택하는 것을 의미합니다.

귀무 가설에서 $\theta \in \omega_0$을 정의하고 대립 가설에서 $\theta \in \omega_1$을 정의한다면 베이즈 절차는 사후 분포 $k(\theta|x)$를 사용하여 각 가설의 조건부 확률을 계산합니다. 조건부 확률이 더 큰 가설을 채택합니다.

---

### More Bayesian Ideas

예측 분포 $g_1(x)$는 주변 pdf $g_1(x) = \int_{-\infty}^\infty L(x|\theta)h(\theta)d\theta$는 예측 분포(predictive distribution)의 pdf라고 불립니다.

#### 켤레 사전 분포, conjugate priors

특정 확률 분포족 $f(x|\theta)$에 대해, 사후 pdf가 사전 pdf와 동일한 분포족에 속하는 경우, 그 사전 pdf족을 켤레족(conjugate family)이라고 합니다.

#### 비고유 사전 분포, improper prior

때로는 사전 지식이 거의 없거나 모든 $\theta$ 값에 동일한 가중치를 부여하고자 할 때 특수한 사전 분포를 사용합니다.

사전 pdf $h(\theta) \ge 0$가 pdf가 아니지만, $L(\mathbf{x}|\theta)h(\theta)$에 비례하는 사후 함수 $k(\theta|\mathbf{x})$가 양의 값으로 적분되는 pdf로 만들어질 수 있을 때, 이 $h(\theta)$를 비고유 사전 분포(improper prior)라고 합니다.

#### 비정보 사전 분포, noninformative prior

연속형 비정보적 사전 분포는 종종 비고유입니다. 정규 분포 $N(\theta_1, \theta_2)$에서 평균 $\theta_1$에 대한 비정보적 사전 분포는 $h_1(\theta_1) = 1$입니다.

---

### Gibbs Sampler

#### Simple Monte Carlo 추정

베이즈 추정량 $\delta(y)$는 일반적으로 적분을 포함하며, 닫힌 형태(closed form)로 계산할 수 없는 경우가 많습니다.

예를 들어 정규 로지스틱 모형이 $Y|\theta \sim N(\theta, \sigma^2/n)$와 같이 존재할 때 사전 분포 $\Theta$는 로지스틱 분포입니다. 사후 분포의 평균 $\delta(y) = E(\Theta|y)$는 다음과 같은 두 적분의 비율입니다.

$$
\delta(y) = \frac{\int_{-\infty}^\infty \theta w(\theta) h(\theta) d\theta}{\int_{-\infty}^\infty w(\theta) h(\theta) d\theta} = \frac{E[\Theta w(\Theta)]}{E[w(\Theta)]}
$$

여기서 $w(\theta) = f(y|\theta)$는 우도 함수로 $\theta$의 함수로 간주되며, 기대값 $E[\cdot]$은 사전 분포 $h(\theta)$에 대해 취해집니다.

$$
T_m = \frac{m^{-1} \sum_{i=1}^m \Theta_i w(\Theta_i)}{m^{-1} \sum_{i=1}^m w(\Theta_i)}
$$

단순 몬테카를로 추정량인 $T_m$은 사전 분포로부터 $\Theta_1, \dots, \Theta_m$을 독립적으로 생성하여 $\delta(y)$를 추정합니다. 대수의 약한 법칙(Weak Law of Large Numbers)에 의해 $m \to \infty$일 때 $T_m \to \delta(y)$로 수렴합니다.

#### Gibbs Sampler 추정

깁스 샘플러는 조건부 분포만을 사용하여 복잡한 다변량 분포로부터 표본을 생성하는 마르코프 연쇄 몬테카를로(MCMC, Markov Chain Monte Carlo) 알고리즘입니다.

$Y_i|X_{i-1} \sim f(y|x)$로부터 $Y_i$를 생성합니다. 그리고 $X_i|Y_i \sim f(x|y)$로부터 $X_i$를 생성합니다. 이 과정은 현재 상태 $(X_{i-1}, Y_{i-1})$에만 의존하여 다음 상태를 생성하므로 마르코프 연쇄(Markov Chain)를 형성합니다.

충분히 큰 $i$에 대해, 생성된 $X_i$와 $Y_i$는 각각 $X$와 $Y$의 주변 분포(marginal distribution)로 수렴합니다.

---

### 참고 자료

[원본 경로 #1](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)


