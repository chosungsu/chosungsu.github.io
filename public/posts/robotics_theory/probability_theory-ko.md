---
title: 'Primer on Probability Theory'
date: '2024-10-02'
tags: ['Robotics', 'lecture']
---

### Probability Density Functions

랜덤 변수 $x$가 특정 $\text{PDF}$에 따라 분포한다고 말합니다. $x$에 대한 $\text{PDF}$를 $p(x)$라고 하고, 구간 $[a, b]$에 걸쳐 있다고 가정합시다. $p(x)$는 다음을 만족하는 음이 아닌(non-negative) 함수입니다.

$$
\int_{a}^{b} p(x) dx = 1
$$

즉, 전체 확률의 공리(axiom of total probability)를 만족합니다. 이는 확률 밀도(probability density)이며, 확률(probability) 자체가 아님에 유의하여야 합니다. 확률은 밀도 함수 아래의 면적으로 주어집니다. 예를 들어, $x$가 $c$와 $d$ 사이에 있을 확률 $\text{Pr}(c \le x \le d)$는 다음과 같이 주어집니다.

$$
\text{Pr}(c \le x \le d) = \int_{c}^{d} p(x) dx
$$

$\text{PDF}$를 사용하여 데이터 형태의 어떤 증거(evidence)가 주어졌을 때, $x$가 구간 $[a, b]$ 내의 모든 가능한 상태에 있을 가능성(likelihood)을 나타냅니다. 또한 조건화 변수(conditioning variable)를 도입할 수 있습니다. $x \in [a, b]$가 $y \in [r, s]$에 조건화된 $\text{PDF}$를 $p(x|y)$라고 하면, 이는 다음을 만족합니다.

$$
(\forall y) \int_{a}^{b} p(x|y) dx = 1
$$

$N$차원 연속 변수에 대한 결합 확률 밀도(joint probability densities)를 $\mathbf{x} = (x_1, \dots, x_N)$와 $x_i \in [a_i, b_i]$에 대해 $p(\mathbf{x})$로 표기할 수 있습니다.

$$
p(x_1, x_2, \dots, x_N)
$$

$N$차원 사례에서, 전체 확률의 공리는 다음을 요구합니다.

$$
\begin{aligned}
&\int_{\mathbf{b}}^{\mathbf{a}} p(\mathbf{x}) d\mathbf{x} \\
&= \int_{a_N}^{b_N} \cdots \int_{a_1}^{b_1} p(x_1, x_2, \dots, x_N) dx_1 \cdots dx_N
\end{aligned}
$$

#### Bayes’ Rule and Inference

항상 결합 확률 밀도(joint probability density)를 조건부(conditional) 및 비조건부(non-conditional) 인수로 분해할 수 있습니다.

$$
p(x, y) = p(x|y)p(y) = p(y|x)p(x)
$$

베이즈 정리를 사용하면 상태에 대한 사전 $\text{PDF}$ $p(x)$와 센서 모델 $p(y|x)$가 있을 때, 측정값(measurements)이 주어졌을 때의 상태(state)의 사후 확률(posterior) 또는 가능도(likelihood) $p(x|y)$를 추론할 수 있습니다. 이를 위해 분모를 다음과 같이 확장합니다.

$$
p(x|y) = \frac{p(y|x)p(x)}{\int p(y|x)p(x) dx}
$$

분모 $p(y)$는 다음과 같이 주변화(marginalization)를 통해 계산합니다.

$$
\begin{aligned}
&p(y) = p(y) \underbrace{\int p(x|y) dx}_{1} = \int p(x|y)p(y) dx \\ 
&= \int p(x, y) dx = \int p(y|x)p(x) dx \end{aligned}
$$

이는 일반적인 비선형 사례에서는 계산 비용이 상당히 많이 들 수 있습니다.

#### 모멘트 (Moments)

동역학(dynamics)에서 질량 분포(mass distributions, 즉 밀도 함수)를 다룰 때 종종 몇 가지 속성만 추적하는데 이를 질량 모멘트(moments of mass)라고 합니다 (예: 질량, 질량 중심, 관성 행렬). $\text{PDF}$도 마찬가지입니다. 영차 확률 모멘트(zeroth probability moment)는 전체 확률의 공리(axiom of total probability)와 일치하므로 항상 1입니다. 일차 확률 모멘트(first probability moment)는 평균($\mu$)으로 알려져 있습니다.

$$
\mu = E[x] = \int x p(x) dx
$$

하지만 이것을 다음과 같이 해석해야 합니다.

$$
E[F(\mathbf{x})] = [E[f_{ij}(\mathbf{x})]] = \left[ \int f_{ij}(\mathbf{x}) p(\mathbf{x}) d\mathbf{x} \right]
$$

이차 확률 모멘트(second probability moment)는 공분산 행렬($\Sigma$)로 알려져 있습니다.

$$
\Sigma = E[(x - \mu)(x - \mu)^T]
$$

다음 두 모멘트는 왜도(skewness)와 첨도(kurtosis)라고 불리지만, 다변량(multivariate)의 경우 매우 복잡해지고 텐서 표현이 필요합니다.

#### 표본 평균 및 공분산 (Sample Mean and Covariance)

랜덤 변수 $x$와 관련 $\text{PDF}$ $p(x)$가 있다고 가정해 봅시다. 이 밀도로부터 샘플을 추출할 수 있으며 이를 다음과 같이 나타냅니다.

$$
x_{\text{meas}} \leftarrow p(x)
$$

$N$개의 그러한 샘플을 추출하고 랜덤 변수 $x$의 평균과 공분산을 추정하고 싶다면 표본 평균(sample mean)과 표본 공분산(sample covariance)을 사용하여 그렇게 할 수 있습니다.

$$
\begin{aligned}
&\mu_{\text{meas}} = \frac{1}{N} \sum_{i=1}^{N} x_{i, \text{meas}}, \\ 
&\Sigma_{\text{meas}} = \frac{1}{N - 1} \sum_{i=1}^{N} (x_{i, \text{meas}} - \mu_{\text{meas}}) (x_{i, \text{meas}} - \mu_{\text{meas}})^T
\end{aligned}
$$

표본 공분산의 정규화는 분모에 $N$ 대신 $\mathbf{N-1}$을 사용하는데, 이를 베셀 보정(Bessel’s correction)이라고 합니다. 직관적으로, 이것이 필요한 이유는 표본 공분산이 측정값과 표본 평균의 차이를 사용하며, 표본 평균 자체도 동일한 측정값에서 계산되어 약간의 상관 관계를 초래하기 때문입니다. 표본 공분산은 참 공분산의 비편향 추정량(unbiased estimate)으로 나타낼 수 있으며, 분모에 $N$이 사용될 때보다 더 큽니다. 또한 $N$이 커질수록 $N-1 \approx N$이 되므로, 표본 공분산이 보상하는 편향 효과는 덜 두드러진다는 점도 언급할 가치가 있습니다.

#### 통계적 독립, 무상관 (Statistically Independent, Uncorrelated)

두 랜덤 변수 $x$와 $y$가 있을 때, 그들의 결합 밀도(joint density)가 다음과 같이 분해되면 통계적으로 독립(statistically independent)이라고 말합니다.

$$
p(x, y) = p(x) p(y)
$$

그리고 변수들이 다음을 만족하면 무상관(uncorrelated)이라고 말합니다.

$$
E[xy^T] = E[x] E[y]^T
$$

변수들이 통계적으로 독립이면, 이는 또한 무상관임을 의미합니다. 그러나 그 역은 모든 유형의 밀도에 대해 일반적으로 참이 아닙니다.

#### 정규화된 곱 (Normalized Product)

때때로 유용한 연산은 동일한 변수에 대한 두 $\text{PDF}$의 정규화된 곱(normalized product)을 취하는 것입니다. $p_1(x)$와 $p_2(x)$가 $x$에 대한 두 $\text{PDF}$라면, 정규화된 곱 $p(x)$는 다음과 같이 형성됩니다.

$$
p(x) = \eta p_1(x) p_2(x)
$$

여기서

$$
\eta = \frac{1}{\int p_1(x) p_2(x) dx}
$$

는 $p(x)$가 전체 확률의 공리를 만족하도록 보장하는 정규화 상수(normalization constant)입니다. 베이즈 맥락에서, 정규화된 곱은 균일 사전 확률(uniform prior)을 가정하여 변수의 독립적인 추정치(PDF로 표현됨)를 융합(fuse)하는 데 사용될 수 있습니다.

$$
p(x|y_1, y_2) = \eta p(x|y_1) p(x|y_2)
$$

---

### Gaussian Probability Density Functions

1차원에서 가우시안 $\text{PDF}$는 다음과 같이 주어집니다.

$$
p(x|\mu, \sigma^2) = \frac{1}{\sqrt{2\pi\sigma^2}} \exp \left( - \frac{1}{2} \frac{(x - \mu)^2}{\sigma^2} \right)
$$

여기서 $\mu$는 평균이고 $\sigma^2$는 분산입니다.

랜덤 변수 $\mathbf{x} \in \mathbb{R}^N$에 대한 다변량 가우시안 $\text{PDF}$ $p(\mathbf{x}|\boldsymbol{\mu}, \Sigma)$는 다음과 같이 표현될 수 있습니다.

$$
p(\mathbf{x}|\boldsymbol{\mu}, \Sigma) = \frac{1}{\sqrt{(2\pi)^N \det \Sigma}} \exp \left( - \frac{1}{2} (\mathbf{x} - \boldsymbol{\mu})^T \Sigma^{-1} (\mathbf{x} - \boldsymbol{\mu}) \right)
$$

#### Isserlis’ Theorem

다변량 가우시안 $\text{PDF}$의 모멘트는 일반적인 평균과 공분산을 넘어 계산하기가 조금 복잡해지지만, 나중에 사용할 가치가 있는 몇 가지 특정 경우가 있습니다.

$$
E[x_1 x_2 x_3 \cdots x_{2M}] = \sum_{P} E[x_i x_j] \cdots E[x_k x_l]
$$

여기서 $P$는 $M$개의 쌍으로 분할하는 모든 고유한 방법에 대한 합을 의미합니다. 이는 합에 $\frac{(2M)!}{2^M M!}$개의 항이 있음을 의미합니다. 네 개의 변수가 있는 경우 다음과 같습니다.

$$
\begin{aligned}
&E[x_i x_j x_k x_l] \\
&= E[x_i x_j]E[x_k x_l] \\
&+ E[x_i x_k]E[x_j x_l] \\
&+ E[x_i x_l]E[x_j x_k]
\end{aligned}
$$

$E[\mathbf{x}(\mathbf{x}^T \mathbf{x})^p \mathbf{x}^T]$와 같은 표현식이 있을 때 $p=0$일 때 $E[\mathbf{x}\mathbf{x}^T] = \Sigma$를 가집니다. $p=1$일 때는 

$$
\begin{aligned} 
&E[\mathbf{x}\mathbf{x}^T \mathbf{x}\mathbf{x}^T] \\
&= E\left[ \left[ x_i x_j \sum_{k=1}^N x_k^2 \right]_{ij} \right] \\
&= \left[ \sum_{k=1}^N E[x_i x_j x_k^2] \right]_{ij} \\ 
&= \left[ \sum_{k=1}^N \left( E[x_i x_j]E[x_k^2] + 2E[x_i x_k]E[x_k x_j] \right) \right]_{ij} \\ 
&= [E[x_i x_j]]_{ij} \sum_{k=1}^N E[x_k^2] + 2 \left[ \sum_{k=1}^N E[x_i x_k]E[x_k x_j] \right]_{ij} \\ 
&= \Sigma \text{tr}(\Sigma) + 2\Sigma^2 \\ 
&= \Sigma (\text{tr}(\Sigma)\mathbf{1} + 2\Sigma)
\end{aligned}
$$

#### 결합 가우시안 $\text{PDF}$, 그 인수, 및 추론 (Joint Gaussian PDFs, Their Factors, and Inference)

변수 쌍 $(\mathbf{x}, \mathbf{y})$에 대한 결합 가우시안을 가질 수 있으며, 다음과 같이 씁니다.

$$
p(\mathbf{x}, \mathbf{y}) = \mathcal{N} \left( \begin{pmatrix} \boldsymbol{\mu}_x \\ \boldsymbol{\mu}_y \end{pmatrix}, \begin{pmatrix} \Sigma_{xx} & \Sigma_{xy} \\ \Sigma_{yx} & \Sigma_{yy} \end{pmatrix} \right)
$$

결합 밀도는 항상 두 인수의 곱 $p(\mathbf{x}, \mathbf{y}) = p(\mathbf{x}|\mathbf{y}) p(\mathbf{y})$으로 분해될 수 있으며, 슈어 여인수(Schur complement)를 사용하여 결합 가우시안 사례에 대한 세부 사항을 도출할 수 있습니다.

#### 셔먼-모리슨-우드버리 항등식

행렬을 하단-대각선-상단 ($\text{LDU}$) 또는 상단-대각선-하단 ($\text{UDL}$) 형태로 인수 분해할 수 있다는 점에 주목하는 것으로 시작합니다.

$$
\begin{aligned}
&\begin{bmatrix} A^{-1} & -B \\ C & D \end{bmatrix} \\
&= \begin{bmatrix} \mathbf{1} & \mathbf{0} \\ CA & \mathbf{1} \end{bmatrix} \begin{bmatrix} A^{-1} & \mathbf{0} \\ \mathbf{0} & D + CAB \end{bmatrix} \begin{bmatrix} \mathbf{1} & -AB \\ \mathbf{0} & \mathbf{1} 
\end{bmatrix} \\
&= \begin{bmatrix} \mathbf{1} & -BD^{-1} \\ \mathbf{0} & \mathbf{1} \end{bmatrix} \begin{bmatrix} A^{-1} + BD^{-1}C & \mathbf{0} \\ \mathbf{0} & D \end{bmatrix} \begin{bmatrix} \mathbf{1} & \mathbf{0} \\ D^{-1}C & \mathbf{1} \end{bmatrix}
\end{aligned}
$$

그런 다음 이 형태들의 각각을 역행렬로 만듭니다.

#### Shannon Information of a Gaussian

가우시안 $\text{PDF}$의 경우 섀넌 정보는 다음과 같이 

$$
\begin{aligned} 
&H(\mathbf{x})
&= - \int_{-\infty}^{\infty} p(\mathbf{x}) \left( - \frac{1}{2} (\mathbf{x} - \boldsymbol{\mu})^T \Sigma^{-1} (\mathbf{x} - \boldsymbol{\mu}) - \ln \sqrt{(2\pi)^N \det \Sigma} \right) d\mathbf{x} \\ &= \frac{1}{2} \ln \left( (2\pi)^N \det \Sigma \right) + \int_{-\infty}^{\infty} \frac{1}{2} (\mathbf{x} - \boldsymbol{\mu})^T \Sigma^{-1} (\mathbf{x} - \boldsymbol{\mu}) p(\mathbf{x}) d\mathbf{x} \\ &= \frac{1}{2} \ln \left( (2\pi)^N \det \Sigma \right) + \frac{1}{2} E[(\mathbf{x} - \boldsymbol{\mu})^T \Sigma^{-1} (\mathbf{x} - \boldsymbol{\mu})]
\end{aligned}
$$

두 번째 항을 기댓값(expectation)을 사용하여 작성하였고 이는 제곱 마할라노비스 거리(squared Mahalanobis distance)와 같고 역공분산 행렬에 의해 중앙에서 가중된 제곱 유클리드 거리와 같습니다.

기댓값 내부의 이 이차 함수는 트레이스 연산자로 

$$
(\mathbf{x} - \boldsymbol{\mu})^T \Sigma^{-1} (\mathbf{x} - \boldsymbol{\mu}) = \text{tr} \left( \Sigma^{-1} (\mathbf{x} - \boldsymbol{\mu})(\mathbf{x} - \boldsymbol{\mu})^T \right)
$$

다음과 같이 작성할 수 있습니다. 또한 순서가 교환된 경우 두 번째 항의 값은 

$$
\text{tr} \left( \Sigma^{-1} \underbrace{E[(\mathbf{x} - \boldsymbol{\mu})(\mathbf{x} - \boldsymbol{\mu})^T]}_{\Sigma} \right) = \text{tr} (\Sigma^{-1}\Sigma) = \text{tr} (\mathbf{1}) = N
$$

이렇게 재설정이 가능해져 

$$
\begin{aligned} 
H(\mathbf{x}) &= \frac{1}{2} \ln \left( (2\pi)^N \det \Sigma \right) + \frac{1}{2} E[(\mathbf{x} - \boldsymbol{\mu})^T \Sigma^{-1} (\mathbf{x} - \boldsymbol{\mu})] \\ &= \frac{1}{2} \ln \left( (2\pi)^N \det \Sigma \right) + \frac{1}{2} N \\ &= \frac{1}{2} \left( \ln \left( (2\pi)^N \det \Sigma \right) + N \ln e \right) \\ &= \frac{1}{2} \ln \left( (2\pi e)^N \det \Sigma \right)
\end{aligned}
$$

섀넌 정보에 대한 표현식에 다시 대입하면 다음과 같습니다.

---

### 참고 자료

[원본 경로 #1](https://mingkangxiong.github.io/assets/books/State_Estimation_for_Robotic_2018.pdf?utm_source=chatgpt.com)



