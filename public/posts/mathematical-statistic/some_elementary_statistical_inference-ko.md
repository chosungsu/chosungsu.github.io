---
title: 'Some elementary statistical inference'
date: '2023-05-12'
tags: ['Mathematical statistics', 'lecture']
---

### Sampling and Statistics

미지의 분포 또는 모수에 대한 정보는 $X$에 대한 표본(sample)에서 얻습니다. 표본 관측값 $X_1, X_2, \dots, X_n$은 $X$와 동일한 분포를 가지며, $n$은 표본 크기를 나타냅니다. 종종 표본 관측값 $X_1, X_2, \dots, X_n$이 상호 독립이라고 가정하며, 이 경우 이를 무작위 표본(random sample)이라고 부릅니다. 독립이며 동일하게 분포된(independent and identically distributed, i.i.d.) 경우, 이 확률 변수들은 공통 분포에서 추출된 크기 $n$의 무작위 표본을 구성합니다. 표본의 정보를 요약하는 데 사용되는 표본의 함수를 통계량(statistics)이라고 정의합니다. 표본의 함수 $T = T(X_1, X_2, \dots, X_n)$를 통계량이라고 부르며 $t$는 $T$의 실현값(realization)이며, $t = T(x_1, x_2, \dots, x_n)$입니다.

#### 점 추정량, point estimators

$f(x; \theta)$ 또는 $p(x; \theta)$ 형태의 밀도 또는 질량 함수를 갖는 확률 변수 $X$에 대한 무작위 표본이 $X_1, X_2, \dots, X_n$이라고 합시다. 이 상황에서 $\theta$의 추정량(estimator)인 통계량 $T$를 고려하는 것이 합리적이며, $T$를 $\theta$의 점 추정량(point estimator), $t$는 $\theta$의 추정치(estimate)라고 부릅니다. 

점 추정량의 여러 성질은 아래와 같습니다.

$\rightarrow$ 통계량 $T$가 $\mathbf{E(T) = \theta}$를 만족할 때, $T$는 $\theta$의 불편 추정량(unbiased estimator)이라고 말합니다.

$\rightarrow$ 표본의 정보와 모수 $\theta$는 무작위 표본의 결합 분포에 관련되어 있습니다. $\prod_{i=1}^n f(x_i; \theta)$. 이것을 $\theta$의 함수로 볼 때, 이를 우도 함수(likelihood function)라고 부릅니다.

$$
\mathbf{L(\theta) = L(\theta; x_1, x_2, \dots, x_n) = \prod_{i=1}^n f(x_i; \theta)}
$$

$\theta$의 추정치로, $L(\theta)$를 최대로 만드는 $\theta$ 값이 자주 사용됩니다. 이 값이 유일할 경우, 이를 최대 우도 추정량(MLE)이라고 하며, $\mathbf{\hat{\theta}}$로 표기합니다. 실제로는 우도 함수의 로그 $\mathbf{l(\theta) = \log L(\theta)}$를 사용하는 것이 더 쉽습니다. $\log$ 함수는 단조 증가 함수이므로, $L(\theta)$를 최대화하는 $\theta$ 값은 $l(\theta)$를 최대화하는 값과 동일합니다.

$\rightarrow$ 모수 $\theta$의 MLE가 $\hat{\theta}$일 때, 지정된 함수 $g$에 대한 $\eta = g(\theta)$의 MLE는 $\mathbf{\hat{\eta} = g(\hat{\theta})}$입니다.

---

### Confidence Intervals

관심 있는 확률 변수 $X$는 $\text{pdf}$ $f(x; \theta)$, $\theta \in \Omega$를 가지며 $\theta$는 미지수입니다. $\theta$를 통계량 $\hat{\theta} = \hat{\theta}(X_1, \dots, X_n)$로 추정하는 방법에서 표본이 추출될 때, $\hat{\theta}$의 값이 모수의 참값 $\theta$와 정확히 같을 가능성은 낮음을 확인했습니다. 필요한 것은 추정 오차(estimation error), 즉 $\hat{\theta}$가 $\theta$를 얼마나 벗어났는지에 대한 추정치입니다.

$\mathbf{0 < \alpha < 1}$가 신뢰구간 모수로 지정된다면 두 통계량 $L = L(X_1, \dots, X_n)$과 $U = U(X_1, \dots, X_n)$에 대해, 다음을 만족하면 구간 $\mathbf{(L, U)}$를 $\mathbf{\theta}$에 대한 $(1 - \alpha)*100$% 신뢰 구간이라고 말합니다.

$$
\mathbf{1 - \alpha = P_{\theta}[\theta \in (L, U)]}
$$

$\mathbf{1 - \alpha}$는 신뢰 계수 또는 신뢰 수준(confidence level)이라고 불립니다.신뢰 구간의 기대 길이 $E_{\theta}(U - L)$는 신뢰 구간의 효율성(efficiency)을 측정하는 척도입니다.

중심 극한 정리(CLT)에서 평균 $\mu$와 유한 분산 $\sigma^2$을 갖는 분포에서 추출된 무작위 표본 $X_1, \dots, X_n$에 대해, $\mathbf{W_n = \frac{\bar{X} - \mu}{\sigma/\sqrt{n}}}$의 분포 함수는 $n \to \infty$일 때 $N(0, 1)$ 분포의 분포 함수 $\Phi$로 수렴합니다. 그리고 $n$이 충분히 클 때, $\sigma$를 표본 표준 편차 $S$로 대체한 $\mathbf{Z_n = \frac{\bar{X} - \mu}{S/\sqrt{n}}}$의 분포 역시 근사적으로 $\mathbf{N(0, 1)}$을 따릅니다.

#### Intervals for difference in Means

두 독립적인 무작위 표본 $X_1, \dots, X_{n_1}$ (평균 $\mu_1$)과 $Y_1, \dots, Y_{n_2}$ (평균 $\mu_2$)에 대해, 차이 $\mathbf{\Delta = \mu_1 - \mu_2}$에 대한 신뢰 구간을 구합니다. 추정량은 $\mathbf{\hat{\Delta} = \bar{X} - \bar{Y}}$입니다.

CLT를 사용하여 근사적인 $(1 - \alpha)*100$% 신뢰구간을 다음과 같이 얻습니다.

$$
\mathbf{(\bar{x} - \bar{y}) \pm z_{\alpha/2} \sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}}
$$

$X \sim N(\mu_1, \sigma^2)$이고 $Y \sim N(\mu_2, \sigma^2)$ (분산 $\sigma^2$이 같음)이라고 가정하면, 다음과 같은 피벗 변수 $T$도 정의할 수 있습니다.

$$
\mathbf{T = \frac{(\bar{X} - \bar{Y}) - (\mu_1 - \mu_2)}{S_p \sqrt{\frac{1}{n_1} + \frac{1}{n_2}}}}
$$

여기서 $S_p^2$는 합동 분산 추정량(pooled estimator)입니다. $S_p^2 = \frac{(n_1 - 1)S_1^2 + (n_2 - 1)S_2^2}{n_1 + n_2 - 2}$. 그리고 이 $\mathbf{T}$는 자유도 $\mathbf{n_1 + n_2 - 2}$인 $\mathbf{t}$-분포를 따릅니다.

#### Intervals for discrete distributions

$X_1, X_2, \dots, X_n$을 pmf $p(x; \theta)$, $\theta \in \Omega$를 갖는 이산 확률 변수 $X$에 대한 무작위 표본이라고 합니다. $\theta$의 추정량 $T = T(X_1, \dots, X_n)$의 cdf를 $F_T(t; \theta)$라고 합니다. $F_T(t; \theta)$는 $T$의 지지 집합(support)에 있는 모든 $t$에 대해 $\theta$의 감소 함수(nonincreasing function)이며 연속 함수(continuous function)라고 가정합니다.

$0 < \alpha_1$ 및 $0 < \alpha_2$가 주어지고 $\alpha = \alpha_1 + \alpha_2 < 0.5$을 만족한다고 하면 $\theta$와 $\overline{\theta}$를 아래의 방정식 해로 구하게 됩니다.

$$
\begin{aligned}
& \mathbf{F_T(t^-; \underline{\theta}) = 1 - \alpha_2} \\
& \mathbf{F_T(t; \overline{\theta}) = \alpha_1}
\end{aligned}
$$

여기서 $\mathbf{T^-}$는 $T$의 지지 집합 값보다 하나 작은 값으로 이루어진 통계량입니다. 이는 이산 cdf의 불연속점을 다루기 위해 설정하였습니다. 따라서 신뢰 계수는 다음과 같이 계산됩니다.

$$
\begin{aligned}
& P[\underline{\theta} < \theta < \overline{\theta}] \\
&= 1 - P[\{\underline{\theta} \ge \theta\} \cup \{\overline{\theta} \le \theta\}] \\
&= 1 - P[\underline{\theta} \ge \theta] - P[\overline{\theta} \le \theta] \\
&\ge 1 - P[F_T(T^-; \theta) \le 1 - \alpha_2] - P[F_T(T; \theta) \ge \alpha_1]
\end{aligned}
$$

$\theta$의 실제 값에 따라 $T$의 확률 질량이 흩어지므로 $\text{cdf}$가 계단 함수가 됩니다. 확률이 정확히 $\alpha_1$이나 $1-\alpha_2$가 되는 것을 보장하지 못합니다. 그러나 $\theta$의 $\text{cdf}$ $F_T(t; \theta)$의 연속성과 단조성을 사용하여 다음을 보장할 수 있습니다.

$$
\mathbf{P[\underline{\theta} < \theta < \overline{\theta}] \ge 1 - \alpha_1 - \alpha_2}
$$

즉 신뢰 구간의 신뢰 계수는 최소 $\mathbf{1 - \alpha}$입니다.

---

### Order statistics

$X_1, X_2, \dots, X_n$을 연속형 분포에서 추출된 무작위 표본이라고 합니다. 이 때 $Y_1 < Y_2 < \dots < Y_n$은 $X_1, X_2, \dots, X_n$을 오름차순으로 배열한 것으로 $Y_i$를 무작위 표본의 $i$번째 순서 통계량(i-th order statistic)이라고 부릅니다. $Y$에 대한 joint pdf는 다음과 같습니다.

$$
g(y_1, y_2, \dots, y_n) = \begin{cases} n! f(y_1) f(y_2) \cdots f(y_n) \\ 0 \end{cases}
$$

$n$개의 $X_i$를 $Y_i$로 변환하는 $n!$개의 가능한 순열이 있으며, 이 모든 변환의 야코비안(Jacobian)의 절댓값은 1이므로, $n!$을 곱하게 됩니다.

#### 분위수, Quantiles

연속 cdf $F(x)$를 갖는 확률 변수 $X$에 대해, $\mathbf{\xi_p = F^{-1}(p)}$를 $p$분위수(p-th quantile)라고 정의합니다.

$Y_k$의 $\text{cdf}$를 $F(Y_k)$라고 할 때, $E(F(Y_k)) = \frac{k}{n+1}$입니다.
$p \approx \frac{k}{n+1}$이므로, $Y_k$를 $p$분위수 $\xi_p$의 추정량인 $\mathbf{p}$번째 표본 분위수(p-th sample quantile)라고 부릅니다.

표본 순서 통계량 $y_k$를 이론적 cdf $F(z)$에서 얻은 분위수 $\xi_{Z, p_k} = F^{-1}(p_k)$에 대해 도표화한 것을 $q-q$ 플롯이라고 합니다.

$i < [(n+1)p] < j$인 두 순서 통계량 $Y_i$와 $Y_j$를 고려하는 경우 $Y_i < \xi_p < Y_j$일 확률은 $n$번의 독립 시행에서 성공 $(p = P(X < \xi_p))$ 횟수가 $i$와 $j-1$ 사이에 있을 확률과 같습니다.

$$
\begin{aligned}
&P(Y_i < \xi_p < Y_j) \\
&= \sum_{w=i}^{j-1} \binom{n}{w} p^w (1 - p)^{n-w}
\end{aligned}
$$

---

### Hypothesis testing

관심 있는 확률 변수 $X$가 밀도 함수 $f(x; \theta)$를 가지고, 미지의 모수 $\theta \in \Omega$가 있다고 가정합니다. 이론이나 예비 실험을 통해 $\theta$가 $\omega_0$에 속하는지 $\omega_1$에 속하는지 알고 싶을 때, 이 가설들을 다음과 같이 설정합니다.

$$
\begin{aligned}
& H_0 : \theta \in \omega_0 \\
& H_1 : \theta \in \omega_1
\end{aligned}
$$

$\mathbf{H_0}$는 귀무 가설(null hypothesis)이라고 하며, 종종 과거와의 변화 없음이나 차이 없음을 나타냅니다.

$\mathbf{H_1}$는 대립 가설(alternative hypothesis)이라고 하며, 변화나 차이를 나타내며 종종 연구자의 가설(research worker's hypothesis)이라고 불립니다.

<img src="https://media.geeksforgeeks.org/wp-content/uploads/20250527152427210496/Hypothesis-Testing.webp" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

$\mathbf{H_0}$가 참일 때 기각을 한다면 1종 오류, $\mathbf{H_1}$이 참일 때 채택한다면 2종 오류를 범하게 됩니다. 일반적으로 1종 오류를 더 심각하게 받아들입니다.

유의 수준 $\alpha$는 

$$
\mathbf{\alpha = \max_{\theta \in \omega_0} P_{\theta}[(X_1, \dots, X_n) \in C]}
$$

와 같이 정의되며 유의 수준을 제한하면서 검정력을 최대화하는 기각역이 선택되도록 해야 합니다.

#### Two Sided tests

평균 $\mu$와 유한 분산 $\sigma^2$을 갖는 확률 변수 $X$에 대해 다음 가설을 검정하려고 합니다.

$$
\begin{aligned}
& H_0 : \mu = \mu_0 \\
& H_1 : \mu \ne \mu_0
\end{aligned}
$$

$\mu \ne \mu_0$인 경우, $\bar{X}$가 $\mu_0$보다 너무 작거나(too small) 너무 클 때(too large) $H_0$를 기각합니다.

$$
\frac{|\bar{X} - \mu_0|}{S/\sqrt{n}} \ge z_{\alpha/2}
$$

이 검정은 CLT를 사용하여 근사적 수준 $\alpha$를 가집니다.

#### 유의 수준 p-value

검정 통계량 $X$의 실현값 $x$가 관찰되었을 때, $H_0$가 참이라고 가정할 때 관찰된 값 $x$보다 더 극단적인(extreme) 값을 얻을 확률입니다.

$$
\mathbf{\text{p-value} = P_{H_0}(X \ge x)}
$$

$\mathbf{H_0}$는 p-값보다 크거나 같은 모든 유의 수준 $\alpha$에서 기각됩니다. 예를 들어 $\text{p-value}=0.048$이면 $\alpha=0.05$에서는 기각되지만, $\alpha=0.01$에서는 기각되지 않습니다.

---

### Chi-square tests

서로 독립인 $N(\mu_i, \sigma_i^2)$를 따르는 확률 변수 $X_1, \dots, X_n$에 대해, 무작위 변수 $\sum_{i=1}^n \left(\frac{X_i - \mu_i}{\sigma_i}\right)^2$는 **$\mathbf{\chi^2(n)}$ 분포**를 따릅니다.

$X_1 \sim b(n, p_1)$일 때, $\mathbf{Q_1 = \frac{(X_1 - n p_1)^2}{n p_1} + \frac{(X_2 - n p_2)^2}{n p_2}}$ 여기서 $X_2 = n - X_1, p_2 = 1 - p_1$는 $n \to \infty$일 때 근사적으로 $\mathbf{\chi^2(1)}$ 분포를 따릅니다. 일반화하면 

$$
Q_{k-1} = \sum_{i=1}^k \frac{(X_i - n p_i)^2}{n p_i}
$$

이 분포를 따릅니다. 이 근사를 사용하려면 각 기대 도수 $\mathbf{n p_i}$가 최소한 5 이상이어야 합니다. 예를 들어 주사위 눈 $i$가 나올 확률 $P(A_i) = p_{i0} = 1/6$인지를 검정한다면 $n=60, k=6$이므로 $\mathbf{n p_{i0} = 10}$입니다. 자유도는 $6-1=5$이고 관찰된 $Q_5 = 15.6$이 $\alpha=0.05$ 임계값인 $11.0705$보다 크므로, $H_0$는 기각됩니다.

독립성 검정에서는 $A$ 속성($A_1, \dots, A_a$)과 $B$ 속성($B_1, \dots, B_b$)의 두 가지 기준으로 분류할 때 $\mathbf{H_0 : p_{ij} = P(A_i \cap B_j) = P(A_i)P(B_j) = p_{i \cdot} p_{\cdot j}}$와 같이 독립성 성질에 따라 곱으로 표현한 귀무가설이 있을 것입니다.

모수는 

$$
\begin{aligned}
& \hat{p}_{i \cdot} = X_{i \cdot} / n \\
& \hat{p}_{\cdot j} = X_{\cdot j} / n
\end{aligned}
$$

와 같이 행 및 열의 주변 도수를 사용하여 추정하며 추정된 모수의 수는 $\mathbf{(a-1) + (b-1) = a+b-2}$개입니다. 자유도는 총 범주 수 $k=ab$이므로, $\text{df} = ab - 1 - (a+b-2) = \mathbf{(a-1)(b-1)}$입니다.

따라서 검정 통계량은 

$$
\mathbf{\sum_{j=1}^b \sum_{i=1}^a \frac{\left(X_{ij} - E_{ij}\right)^2}{E_{ij}}}
$$

이를 만족합니다.

---

### Method of monte carlo

이 기법은 복잡한 프로세스를 시뮬레이션하고 통계 방법론의 유한 표본 속성을 조사하는 데 오랫동안 사용되어 왔습니다. 특히 지난 30년 동안 부트스트랩(bootstrap)이나 현대 베이즈 방법에 기반한 추론 영역에서 매우 중요한 개념이 되었습니다.

분포 함수 $F(x) = 1 - e^{-x/\beta}$의 역함수는 $\mathbf{F^{-1}(u) = -\beta \log(1 - u)}$입니다. 따라서 $U \sim \text{Uniform}(0, 1)$로부터 $\mathbf{X = -\beta \log(1 - U)}$를 계산하면 $\Gamma(1, \beta)$ 분포를 따르는 난수를 얻을 수 있습니다.

몬테카를로 방법을 사용하여 적분 $\int_a^b g(x) dx$을 추정할 수 있습니다.

$$
\mathbf{\int_a^b g(x) dx = (b - a) E[g(X)]}
$$

여기서 $X$는 $\text{Uniform}(a, b)$ 분포를 따릅니다. $\mathbf{\bar{Y} = \frac{1}{n} \sum_{i=1}^n (b - a)g(X_i)}$는 적분의 불편 추정량이 됩니다.

정규 분포는 역 $\text{cdf}$가 닫힌 형태(closed form)로 존재하지 않으므로, Box-Muller 변환과 같은 기법을 사용합니다. $Y_1, Y_2 \sim \text{Uniform}(0, 1)$일 때,

$$
\begin{aligned}
& X_1 = (-2 \log Y_1)^{1/2} \cos(2\pi Y_2) \\
& X_2 = (-2 \log Y_1)^{1/2} \sin(2\pi Y_2)
\end{aligned}
$$

$X_1$과 $X_2$는 서로 독립인 표준 정규 확률 변수 $N(0, 1)$입니다.

#### Accept-Reject Algorithm

$\rightarrow$ $\text{pdf}$ $g(y)$로부터 $Y$를 생성합니다.

$\rightarrow$ $\text{Uniform}(0, 1)$로부터 $U$를 생성합니다.

$\rightarrow$ 만약 $\mathbf{U \le \frac{f(Y)}{Mg(Y)}}$ 이면, $X = Y$를 채택(Accept)합니다.

---

### 참고 자료

[원본 경로 #1](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)


