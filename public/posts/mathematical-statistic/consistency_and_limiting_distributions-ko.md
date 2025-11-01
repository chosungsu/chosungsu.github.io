---
title: 'Consistency and Limiting distributions'
date: '2023-05-15'
tags: ['Mathematical statistics', 'lecture']
---

### Convergence in Probability

확률 변수 시퀀스 ${X_n}$이 $n \to \infty$일 때 또 다른 확률 변수 $X$에 "가까워진다"는 것을 공식화합니다.

$$
\lim_{n\to\infty} P[|X_n - X| \ge \varepsilon] = 0
$$

Weak Law of Large Numbers 법칙을 통해서 $\mathbf{{X_n}}$이 공통 평균 $\mathbf{\mu}$와 분산 $\sigma^2 < \infty$를 갖는 iid 확률 변수 시퀀스이고, $\mathbf{\bar{X}n = n^{-1} \sum{i=1}^n X_i}$를 표본 평균이라고 할 때,

$$
\mathbf{\bar{X}_n \xrightarrow{P} \mu}
$$

위 $\bar{X}_n$의 평균은 $\mu$, 분산은 $\frac{\sigma^2}{n}$이고 체비쇼프 정리에 의해 

$$
\begin{aligned}
& P[|\bar{X}_n - \mu| \ge \varepsilon] \\
& \le \frac{\text{Var}(\bar{X}_n)}{\varepsilon^2} \\
&= \frac{\sigma^2}{n\varepsilon^2} \to 0
\end{aligned}
$$

이것을 만족합니다.

#### Sampling and Statistics

통계량(statistic) $T$는 미지의 모수 $\theta$의 점 추정량으로 사용됩니다. 추정량의 두 가지 속성은 다음과 같습니다.

$\rightarrow$ 추정량 $T$가 모수 $\theta$의 불편 추정량인 것은 $\mathbf{E(T) = \theta}$일 때입니다.

$\rightarrow$ 통계량 $T_n$이 모수 $\theta$의 일치 추정량(consistent estimator)인 것은$$\mathbf{T_n \xrightarrow{P} \theta}$$일 때입니다. 즉, 표본 크기 $n$이 증가함에 따라 추정량 $T_n$이 모수 $\theta$에 확률적으로 수렴하는 것을 의미합니다.

---

### Convergence in Distribution

확률 수렴을 통해 통계량이 모수에 수렴한다고 밝힐 수 있지만 추정량의 오차를 얼마나 정확하게 파악할 수 있는지는 알 수 없습니다. 확률 변수 시퀀스 ${X_n}$이 확률 변수 $X$로 분포 수렴한다는 것은, $X_n$의 $\text{cdf}$ $F_{X_n}$과 $X$의 $\text{cdf}$ $F_X$에 대해, $F_X$가 연속인 모든 점 $x \in C(F_X)$에서 다음이 성립할 때입니다.

불연속점에서 $X_n$이 $1/n$에 모든 질량을 갖고, $X$가 0에 모든 질량을 가질 때, $X_n \xrightarrow{D} X$입니다. $F_X$의 불연속점 $x=0$에서는 $\lim F_{X_n}(0) = 0 \ne F_X(0)=1$이지만, 정의에 따라 $F_X$의 연속점에서 극한이 일치하면 분포 수렴이 성립합니다.

아래에는 분포 수렴과 확률 수렴간의 관계를 대표적인 것에 대해 나열하였습니다.

$X_n$이 확률적으로 $X$에 수렴하면 $(X_n \xrightarrow{P} X)$, $X_n$은 분포적으로 $X$에 수렴합니다$(\mathbf{X_n \xrightarrow{D} X})$. (분포 수렴이 약한 수렴(weak convergence)이라고 불리는 이유입니다.)

$X_n \xrightarrow{D} X$이고 $g$가 $X$의 지지(support)에서 연속 함수이면, $\mathbf{g(X_n) \xrightarrow{D} g(X)}$입니다.

슬러츠키 정리에 따라서 $X_n \xrightarrow{D} X$, $A_n \xrightarrow{P} a$, $B_n \xrightarrow{P} b$이면, $\mathbf{A_n + B_n X_n \xrightarrow{D} a + b X}$입니다.

#### 확률적 유계, Bounded in Probability

확률 변수 시퀀스 ${X_n}$이 확률적으로 유계라는 것은, 임의의 $\varepsilon > 0$에 대해 $B_{\varepsilon} > 0$와 정수 $N_{\varepsilon}$가 존재하여 $n \ge N_{\varepsilon}$일 때 $P[|X_n| \le B_{\varepsilon}] \ge 1 - \varepsilon$가 성립하는 것입니다.

#### $\Delta$ Method

점근 이론에서 함수의 분포를 찾는 데 사용됩니다.

$\mathbf{Y_n = o_p(X_n)}$: $\mathbf{Y_n / X_n \xrightarrow{P} 0}$은 확률 수렴에서의 little-o

$\mathbf{Y_n = O_p(X_n)}$: $\mathbf{Y_n / X_n}$이 확률적으로 유계

$\mathbf{\sqrt{n}(X_n - \theta) \xrightarrow{D} N(0, \sigma^2)}$이고, 함수 $g(x)$가 $\theta$에서 미분 가능하며 $g'(\theta) \ne 0$이라고 가정합니다. 그러면,

$$
\mathbf{\sqrt{n}(g(X_n) - g(\theta)) \xrightarrow{D} N(0, \sigma^2(g'(\theta))^2)}
$$

이처럼 추정량 $X_n$이 정규 분포를 따른다면, 그 함수 $g(X_n)$ 또한 근사적으로 정규 분포를 따르며, 그 분산은 $\sigma^2$에 미분 $g'(\theta)$의 제곱을 곱한 값으로 근사됩니다.

---

### Central Limit Theorem

$X_1, \dots, X_n$이 정규 분포에서 추출된 표본일 때, 확률 변수 $Y_n = \frac{\sum_{i=1}^n X_i - n\mu}{\sigma \sqrt{n}} = \frac{\sqrt{n}(\bar{X}_n - \mu)}{\sigma}$가 모든 $n$에 대해 정확히 표준 정규 분포 $N(0, 1)$를 따른다는 것을 확인했습니다.

중심 극한 정리(CLT)는 이 사실을 일반적인 분포로 확장합니다. 이 정리는 $X_i$의 원래 분포가 무엇이든 관계없이, 표본 크기 $n$이 충분히 크면 이 표본 평균이 점근적으로 표준 정규 분포를 따른다는 것을 주장합니다.

mgf를 사용하면 $M_{Y_n}(t) = \left[m\left(\frac{t}{\sigma\sqrt{n}}\right)\right]^n$로 표준화된 합의 mgf를 계산하고 $m(t)$를 테일러 급수로 전개하면 

$$
m\left(\frac{t}{\sigma\sqrt{n}}\right) = 1 + \frac{t^2}{2n} + \frac{[m''(\xi) - \sigma^2]t^2}{2n\sigma^2}
$$

을 만족하고 $n \to \infty$일 때 $\xi \to 0$이므로 $\lim_{n\to\infty}[m''(\xi) - \sigma^2] = 0$입니다. $\lim_{n\to\infty} M_{Y_n}(t) = \mathbf{e^{t^2/2}}$ 극한을 적용하면 $Y_n$은 표준 정규 분포로 수렴할 수 있습니다.

---

### Multivariate distributions

$p$차원 확률 벡터 시퀀스 $X_n$이 $X$로 확률 수렴한다는 것은, 임의의 $\varepsilon > 0$에 대해 다음이 성립할 때입니다.

$$
\mathbf{\lim_{n\to\infty} P[|\mathbf{X}_n - \mathbf{X}| \ge \varepsilon] = 0}
$$

확률 벡터 시퀀스 $X_n$이 $X$로 확률 수렴하는 것은 모든 성분 $j=1, \dots, p$에 대해 $X_{nj} \xrightarrow{P} X_j$인 것과 동치입니다.

$X_n \xrightarrow{D} X$이고 $g(x)$가 $X$의 지지(support)에서 연속 함수이면, $g(X_n) \xrightarrow{D} g(X)$입니다. 분포 수렴은 주변 분포 수렴(marginal convergence)을 의미합니다.

다변량 중심 극한 정리인 MCLT에 의해 $X_n$이 공통 평균 벡터 $\mu$와 양의 정부호 분산-공분산 행렬 $\Sigma$를 갖는 iid 확률 벡터 시퀀스라고 가정할 때 

$$
\mathbf{Y}_n = \frac{1}{\sqrt{n}} \sum_{i=1}^n (\mathbf{X}_i - \mathbf{\mu}) = \sqrt{n}(\mathbf{\bar{X}} - \mathbf{\mu})
$$

$Y_n$은 평균 벡터 $\mathbf{0}$, 분산-공분산 행렬 $\mathbf{\Sigma}$인 다변량 정규 분포 $\mathbf{N_p(\mathbf{0}, \mathbf{\Sigma})}$로 분포 수렴합니다.

---

### 참고 자료

[원본 경로 #1](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)


