---
title: 'Sufficiency'
date: '2023-05-22'
tags: ['Mathematical statistics', 'lecture']
---

### Measures of Quality of Estimators

추정량은 일치성과 불편성 성질이 있습니다.

우선 추정량 $\mathbf{Y_n}$이 확률적으로 모수 $\mathbf{\theta}$에 수렴하는 경우 mle가 일치성을 보입니다. $\mathbf{E(Y_n) = \theta}$인 경우 $\text{mle}$는 불편 추정량이 아닐 수도 있지만, 일반적으로 점근적으로 불편합니다.

최소 분산 불편 추정량, MVUE는 두 추정량이 불편하다면 분산이 더 작은 쪽을 선택하도록 합니다.

#### Loss and Risk functions

결정 이론의 관점에서 결정함수 $\delta(y)$는 관측된 통계량 $\mathbf{Y}$의 값에 기반하여 $\mathbf{\theta}$의 점 추정치(결정)를 제공하는 함수이고 손실함수 $L(\theta, \delta(y))$는 참값 $\mathbf{\theta}$와 점 추정치 $\mathbf{\delta(y)}$ 사이의 차이가 얼마나 심각한지 나타내는 음이 아닌 숫자로 사용합니다.

손실함수의 기댓값은 

$$
\mathbf{R(\theta, \delta) = E\{L[\theta, \delta(Y)]\}}
$$

이와 같이 정의되며 모든 $\theta$ 값에 대해 위험 함수를 최소화하는 결정 함수 $\delta$를 선택하고자 합니다. 그러나 일반적으로 이는 불가능합니다. 미니맥스(minimax) 원칙에 의해 

$$
\mathbf{\max_{\theta} R[\theta, \delta_0(Y)] \le \max_{\theta} R[\theta, \delta(Y)]}
$$

$\mathbf{\delta_0}$는 최악의 $\theta$ 값에서 발생할 수 있는 최대 위험을 최소화합니다.

우도 원칙에서는 A와 B가 이항 또는 기하 분포를 통해 동일한 데이터를 관찰한 상황을 설정하고 A의 모형 (이항 $\mathbf{b(10, \theta)}$)에서는 $\mathbf{Y=1}$을 관측하게 되고 추정량 $\mathbf{Y/10}$은 불편합니다. B의 모형 (기하 $\mathbf{g(\theta)}$)에서는 $\mathbf{Z=10}$을 관측하며 추정량 $\mathbf{1/Z}$은 편의(biased)가 있습니다. 이 때 우도 함수는 상수배만큼 차이가 나고 mle는 $\mathbf{\hat{\theta} = 1/10}$으로 정확히 동일합니다.

---

### Sufficient Statistic for a parameter

통계량 $\mathbf{Y_1 = u_1(X_1, \dots, X_n)}$을 충분 통계량(Sufficient Statistic)이라고 부릅니다. 이 통계량은 표본 공간을 다음과 같이 분할합니다. $\mathbf{Y_1 = y_1}$의 값이 주어졌을 때, $\mathbf{X_1, X_2, \dots, X_n}$의 조건부 확률 분포가 모수 $\mathbf{\theta}$에 의존하지 않습니다.

$X_i \sim \text{Bernoulli}(\theta)$일 때, $\mathbf{Y_1 = \sum X_i}$ (성공 횟수)는 이항 분포를 따릅니다. 조건부 확률 $\mathbf{P(X_1=x_1, \dots, X_n=x_n | Y_1=y_1)}$을 계산하면

$$
\begin{aligned}
& P(\mathbf{X}=\mathbf{x} | Y_1=y_1) \\
&= \frac{\theta^{\sum x_i} (1-\theta)^{n-\sum x_i}}{\binom{n}{y_1} \theta^{y_1} (1-\theta)^{n-y_1}}
\end{aligned}
$$

$y_1 = \sum x_i$이므로, 이 값은 $\mathbf{1 / \binom{n}{y_1}}$이 되며, 즉 $\mathbf{\theta}$에 의존하지 않습니다. 따라서 $\mathbf{Y_1 = \sum X_i}$는 $\mathbf{\theta}$의 충분 통계량이라고 할 수 있습니다.

충분 통계량의 정의를 사용하여 $f_{Y_1}(y_1; \theta)$를 찾는 것은 복잡한 경우가 많습니다. 네이만 정리는 이러한 수고를 덜어줍니다. 통계량 $\mathbf{Y_1 = u_1(X_1, \dots, X_n)}$이 $\mathbf{\theta}$의 충분 통계량인 것은 우리가 두 개의 음이 아닌 함수 $\mathbf{k_1}$과 $\mathbf{k_2}$를 찾을 수 있을 때 뿐입니다.

$$
\begin{aligned}
& f(x_1; \theta) f(x_2; \theta) \cdots f(x_n; \theta) \\
&= k_1[u_1(x_1, x_2, \dots, x_n); \theta] k_2(x_1, x_2, \dots, x_n)
\end{aligned}
$$

---

### Properties of a Sufficient Statistic

#### 라오-블랙웰 정리, Rao-Blackwell

충분 통계량은 최소 분산 불편 추정량을 찾는데 중요한 역할을 합니다. 통계량의 변동 분석에 사용되는 일반적인 조건부 기대값의 속성($E[X_2] = E[E(X_2|X_1)]$ 및 $\text{Var}(X_2) \ge \text{Var}[E(X_2|X_1)]$)을 충분 통계량에 적용합니다.

$Y_1$이 모수 $\theta$에 대한 충분 통계량이라고 합시다. $Y_2$가 $\theta$의 불편 추정량이라고 할 때, $\mathbf{\phi(Y_1) = E(Y_2|Y_1)}$는 $Y_2$보다 분산이 작거나 같은 불편 추정량입니다. 따라서 MVUE를 찾을 때, 충분 통계량의 함수인 추정량으로 검색 범위를 좁힐 수 있습니다. 즉, 어떤 불편 추정량을 찾더라도, 그 추정량에 충분 통계량을 조건화하여 분산을 줄일 수 있습니다.

#### MLE

$\theta$에 대한 충분 통계량 $\mathbf{Y_1}$이 존재하고, $\theta$의 최대 우도 추정량 $\mathbf{\hat{\theta}}$가 유일하게 존재한다면, $\mathbf{\hat{\theta}}$는 $\mathbf{Y_1}$의 함수입니다.

$$
\mathbf{L(\theta; \mathbf{x}) = f_{Y_1}[u_1(\mathbf{x}); \theta] H(\mathbf{x})}
$$

네이만 분해 정리에 의해 위와 같이 우도 함수가 분해될 수 있고 $\mathbf{H(\mathbf{x})}$는 $\theta$에 의존하지 않으므로, $\mathbf{L}$을 최대화하는 $\theta$의 값은 $\mathbf{f_{Y_1}}$을 최대화하는 $\theta$의 값과 동시에 발생합니다.

---

### Completeness and Uniqueness

충분 통계량 $Y_1$의 함수인 두 불편 추정량 $\phi(Y_1)$과 $\psi(Y_1)$이 있다고 가정합니다.

$$
\mathbf{E[\phi(Y_1) - \psi(Y_1)] = 0}
$$

만약 $Y_1$의 pmf 또는 pdf의 족(family)이 완비하다면, 이 조건은 $\phi(Y_1)$과 $\psi(Y_1)$이 거의 확실하게 동일함을 의미합니다. 족 $\mathbf{{h(z; \theta) : \theta \in \Omega}}$의 한 원소라고 하면 조건 $\mathbf{E[u(Z)] = 0}$이 $\mathbf{u(z)}$가 각 $\mathbf{h(z; \theta)}$에 대해 확률이 0인 점들의 집합을 제외하고는 0이 되도록 요구될 때에, 이 족을 완비 족(complete family)이라고 합니다.

#### 레만 셰페 정리

완비성은 충분 통계량의 함수 중 불편 추정량이 유일함을 보장하며, 라오-블랙웰 정리와 결합하여 MVUE를 식별합니다.

$f(x; \theta)$에서 추출된 랜덤 표본이 있고 $Y_1$이 $\theta$에 대한 충분 통계량이며 $Y_1$의 pdf 또는 pmf의 족 $\mathbf{{f_{Y_1}(y_1; \theta) : \theta \in \Omega}}$이 완비하다고 합니다. 만약 $Y_1$의 함수 중 $\theta$의 불편 추정량 $\mathbf{\phi(Y_1)}$이 존재한다면, 이 $\mathbf{\phi(Y_1)}$은 $\theta$의 유일한 MVUE가 됩니다.

---

### The Exponential Class of Distributions

지수족은 확률 밀도 함수 또는 질량 함수 $f(x; \theta)$의 족 $\mathbf{{f(x; \theta) : \theta \in \Omega}}$이 다음 형태를 가질 때,

$$
\mathbf{f(x; \theta) = \exp[p(\theta)K(x) + H(x) + q(\theta)]}
$$

지지역(Support) $S$가 $\mathbf{\theta}$에 의존하지 않고 $\mathbf{p(\theta)}$가 $\mathbf{\theta \in \Omega}$에 대한 자명하지 않은 연속 함수이며 $X$가 연속 확률 변수일 때 $K'(x) \not\equiv 0$이고 $H(x)$는 $x \in S$에 대한 연속 함수이거나 $X$가 이산 확률 변수일 때 $K(x)$는 $x \in S$에 대한 자명하지 않은 함수여야 지수족에 속한다고 할 수 있습니다.

$\mathbf{X}$의 분포가 정규 지수족에 속할 때, $\mathbf{Y_1 = \sum_{i=1}^n K(X_i)}$는 $\mathbf{\theta}$에 대한 완비 충분 통계량(Complete Sufficient Statistic)입니다.

$$
\mathbf{\int_{S_{Y_1}} u(y_1) R(y_1) \exp\{p(\theta)y_1\} dy_1 = 0}
$$

$E[u(Y_1)] = 0$이라는 조건과 $Y_1$의 $\text{pdf}$ 형태를 사용하여 변환 결과가 0인 유일한 함수는 $\mathbf{u(y_1)R(y_1) \equiv 0}$뿐입니다. 즉 $Y_1$의 분포족은 완비합니다.

---

### Functions of a Parameter

$X_i \sim \text{Uniform}(0, \theta)$일 때, $\mathbf{Y_n = \max\{X_i\}}$는 $\theta$의 완비 충분 통계량입니다.
$\theta$의 미분 가능한 함수 $\mathbf{g(\theta)}$의 MVUE $\mathbf{u(Y_n)}$는 다음 방정식을 만족합니다.

$$
\mathbf{g(\theta) = E[u(Y_n)] = \int_0^{\theta} u(y) \frac{ny^{n-1}}{\theta^n} dy}
$$

이 방정식을 $\theta$에 대해 미분하여 $\mathbf{u(\theta)}$에 대해 풀면, $\mathbf{g(\theta)}$의 MVUE는 다음과 같습니다.

$$
\mathbf{u(Y_n) = g(Y_n) + \frac{Y_n}{n} g'(Y_n)}
$$

MVUE에 대한 점근적 분포 이론은 mle만큼 간단하지 않으므로 $\mathbf{\hat{\theta}}$의 표준 오차 $\mathbf{SE(\hat{\theta})}$를 얻기 위해 부트스트랩 기법을 사용할 수 있습니다.

$$
\mathbf{SE_B = \sqrt{\frac{1}{B-1} \sum_{i=1}^B (\hat{\theta}^*_i - \hat{\theta}^*)^2}}
$$

---

### The case of several parameters

분포의 pdf (pmf)가 하나가 아닌 여러 개의 모수($\mathbf{\theta} \in \Omega \subset \mathbf{R}^p$)에 의존하는 경우에 대한 충분 통계량 및 MVUE 이론의 확장입니다.

#### 결합 충분 통계량

모수 벡터 $\mathbf{\theta}$를 갖는 분포에서 추출된 랜덤 표본 $X_1, \dots, X_n$에 대해, $m$차원 통계량 벡터 $\mathbf{Y} = (Y_1, \dots, Y_m)^T$가 $\mathbf{\theta}$의 결합 충분 통계량(Jointly Sufficient Statistics)인 것은 다음 조건이 성립할 때입니다.

$$
\mathbf{\frac{\prod_{i=1}^n f(x_i; \theta)}{f_{\mathbf{Y}}(\mathbf{y}; \theta)} = H(x_1, x_2, \dots, x_n)}
$$

여기서 $\mathbf{H(x_1, x_2, \dots, x_n)}$는 $\mathbf{\theta}$에 의존하지 않는 함수입니다. 통계량 벡터 $\mathbf{Y}$는 다음 조건을 만족하는 두 개의 음이 아닌 함수 $\mathbf{k_1}$과 $\mathbf{k_2}$를 찾을 수 있을 때 충분 통계량이 되므로 

$$
\mathbf{\prod_{i=1}^n f(x_i; \theta) = k_1(\mathbf{y}; \theta) k_2(x_1, \dots, x_n)}
$$

$\mathbf{k_2}$는 $\mathbf{\theta}$에 의존하지 않습니다.

#### 지수족 분포

$X$의 pdf (pmf)가 다음 형태를 가질 때,

$$
\mathbf{f(x; \theta) = \exp \left\{ \sum_{j=1}^m p_j(\theta) K_j(x) + H(x) + q(\theta) \right\}}
$$

이 분포는 지수족에 속합니다. 이 분포가 정규 지수족인 것은 다음 조건들을 추가로 만족할 때입니다. 정규 지수족 분포에서 추출된 랜덤 표본 $X_1, \dots, X_n$에 대해, $m$개의 통계량 $\mathbf{Y_j = \sum_{i=1}^n K_j(X_i)}$는 모수 벡터 $\mathbf{\theta}$에 대한 결합 완비 충분 통계량입니다. $\mathbf{p = (p_1, \dots, p_{k-1})}$의 결합 완비 충분 통계량은 각 범주의 총 횟수 $\mathbf{Y_j = \sum_{i=1}^n X_{ij}}$ $(j=1, \dots, k-1)$입니다. $\mathbf{\hat{p}_j = n^{-1} Y_j}$로 $p_j$의 MVUE를 구할 수 있고 $\mathbf{E[n^{-2} Y_j Y_l] = \frac{n-1}{n} p_j p_l}$ 를 통해서 $\mathbf{\frac{1}{n(n-1)} Y_j Y_l}$이 $\mathbf{p_j p_l}$의 MVUE를 구할 수 있습니다.

---

### Minimal sufficiency and Ancillary Statistics

#### Minimal Sufficient Statistics

통계학의 목표는 표본의 모든 정보를 잃지 않으면서 데이터를 가능한 한 많이 축소하는 것입니다. 충분 통계량은 이 축소된 데이터가 전체 표본과 동일한 모수에 대한 정보를 가지고 있음을 보장합니다. 최소 충분 통계량은 모든 충분 통계량 집합의 함수이며, 더 이상 통계량의 수를 줄일 수 없는, 가장 간결한 충분 통계량 집합입니다.

균일 분포 $\mathbf{U(\theta-1, \theta+1)}$에서 모수 $\theta$는 하나이지만, 충분 통계량은 최소 순서 통계량 $\mathbf{Y_1 = \min(X_i)}$와 최대 순서 통계량 $\mathbf{Y_n = \max(X_i)}$ 두 개입니다. 이 두 통계량은 $\mathbf{\theta}$에 대한 최소 충분 통계량이며, 두 개 미만으로 줄이면 충분성이 손실됩니다.

mle $\mathbf{\hat{\theta}}$가 존재하고 충분 통계량이기도 하다면, $\mathbf{\hat{\theta}}$는 최소 충분 통계량이어야 합니다.

완비 충분 통계량은 최소 충분 통계량입니다. 하지만 그 역은 성립하지 않습니다.

#### Ancillary Statistics

충분 통계량이 모수에 대한 모든 정보를 담고 있는 반면, 부수 통계량은 그 분포가 모수와 무관하며 모수에 대한 정보를 포함하지 않는 것으로 보이는 통계량입니다.

$\mathbf{N(\theta, 1)}$ 분포의 표본 분산 $\mathbf{S^2}$는 $\mathbf{\theta}$에 의존하지 않는 분포를 가지므로 부수 통계량입니다.

$X_i = \theta + W_i$ 에서 $W_i$의 $\text{pdf}$는 $\theta$에 의존하지 않을 때, 어떤 실수 $d$에 대해서도 $\mathbf{u(x_1 + d, \dots, x_n + d) = u(x_1, \dots, x_n)}$를 만족하는 통계량 $\mathbf{Z = u(X_1, \dots, X_n)}$은 위치 불변 통계량입니다. $X_i = \theta W_i$에서 $W_i$의 $\text{pdf}$는 $\theta$에 의존하지 않을 때,
모든 $\mathbf{c > 0}$에 대해 $\mathbf{u(cx_1, \dots, cx_n) = u(x_1, \dots, x_n)}$를 만족하는 통계량 $\mathbf{Z}$는 척도 불변 통계량이며 $\mathbf{\theta}$와 무관한 부수 통계량입니다.

---

### Sufficiency, Completeness, and Independence

#### 충분성, 부수성, 독립성의 관계

충분성 $\Rightarrow$ 조건부 분포의 독립성: 모수 $\mathbf{\theta}$에 대한 충분 통계량 $\mathbf{Y_1}$이 있을 때, 다른 통계량 $\mathbf{Z}$의 $\mathbf{Y_1=y_1}$에 대한 조건부 pdf $\mathbf{h(z|y_1)}$는 $\mathbf{\theta}$에 의존하지 않습니다.

충분성 + 독립성 $\Rightarrow$ 부수성: 만약 $\mathbf{Y_1}$과 $\mathbf{Z}$가 독립이라면, $\mathbf{Z}$의 주변 pdf $\mathbf{g_2(z)}$는 $\mathbf{h(z|y_1)}$과 같아지므로 $\mathbf{\theta}$에 의존하지 않습니다. 즉, $\mathbf{Z}$는 부수 통계량(Ancillary Statistic)이 됩니다.

#### Basu's Theorem

위 성질의 역을 조사하려면 완비성이 필요합니다. 즉, 부수 통계량 $\mathbf{Z}$의 분포가 $\mathbf{\theta}$에 의존하지 않을 때, $\mathbf{Z}$와 충분 통계량 $\mathbf{Y_1}$이 독립인지 여부를 판단하기 위해서는 $\mathbf{Y_1}$의 분포족이 완비해야 합니다.

부수 통계량 $\mathbf{Z}$의 주변 pdf $\mathbf{g_2(z)}$가 $\mathbf{\theta}$에 의존하지 않는다고 가정하고, $\mathbf{Y_1}$과 $\mathbf{Z}$의 결합 pdf가 $\mathbf{g_1(y_1; \theta)h(z|y_1)}$일 때, $\mathbf{Z}$의 주변 pdf를 구하는 적분식은 다음과 같습니다.

$$
\mathbf{\int_{-\infty}^{\infty} [g_2(z) - h(z|y_1)]g_1(y_1; \theta) dy_1 = 0 \quad (\text{for all } \theta \in \Omega)}
$$

만약 $\mathbf{\{g_1(y_1; \theta) : \theta \in \Omega\}}$ 족이 완비(complete)하다면, 이 적분은 $\mathbf{g_2(z) - h(z|y_1) = 0}$ 또는 $\mathbf{g_2(z) = h(z|y_1)}$을 의미합니다. 따라서 $\mathbf{Y_1}$과 $\mathbf{Z}$의 joint pdf는 $\mathbf{g_1(y_1; \theta)g_2(z)}$가 되어 $\mathbf{Y_1}$과 $\mathbf{Z}$는 독립입니다.

완비 충분 통계량 $\mathbf{Y_1}$과 부수 통계량 $\mathbf{Z}$는 항상 독립입니다.

---

### 참고 자료

[원본 경로 #1](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)


