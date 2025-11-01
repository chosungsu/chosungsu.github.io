---
title: 'Inferences about normal linear models'
date: '2023-05-26'
tags: ['Mathematical statistics', 'lecture']
---

### One-Way ANOVA

$b$개의 독립적인 확률 변수가 각각 알 수 없는 평균 $\mu_1, \mu_2, \dots, \mu_b$와 알 수 없지만 공통적인 분산 $\sigma^2$을 갖는 정규 분포를 따른다고 가정합니다. 각 $j = 1, 2, \dots, b$에 대해, $X_{1j}, X_{2j}, \dots, X_{n_j j}$는 평균 $\mu_j$ 및 분산 $\sigma^2$을 갖는 정규 분포에서 추출된 크기 $n_j$의 랜덤 표본입니다. 관측값에 대한 적절한 모형은 다음과 같습니다.

$$
\mathbf{X_{ij} = \mu_j + e_{ij}; \quad i = 1, \dots, n_j, \quad j = 1, \dots, b}
$$

여기서 $e_{ij}$는 i.i.d. $\mathbf{N(0, \sigma^2)}$를 따릅니다. 총 표본 크기는 $\mathbf{n = \sum_{j=1}^b n_j}$입니다. 우리가 검정하고자 하는 복합 가설은 다음과 같습니다.

$$
\begin{aligned}
& H_0 : \mu_1 = \mu_2 = \cdots = \mu_b \\
& H_1 : \mu_j \ne \mu_{j'} \text{인 } j \ne j' \text{가 존재}
\end{aligned}
$$

이러한 문제는 실제 상황에서 흔히 발생합니다. 예를 들어, 특정 질병에 대한 $b$가지 약물 치료 효과를 비교할 때, 요인은 '치료'이고 각 약물은 요인의 '수준'에 해당합니다. 우도비 검정은 분산 추정량의 비율로 표현될 수 있어 이를 분산 분석(ANOVA)의 한 예시인 일원 분산 분석(One-Way ANOVA) 문제라고 합니다.

#### 우도비 검정 통계량

전체 모형(Full Model) 모수 공간 $\mathbf{\Omega}$은 대립가설에서 $\Omega = \{(\mu_1, \dots, \mu_b, \sigma^2) : -\infty < \mu_j < \infty, 0 < \sigma^2 < \infty\}$를 만족하고 축소 모형(Reduced Model) 모수 공간 $\omega$는 귀무가설에서 $\omega = \{(\mu_1, \dots, \mu_b, \sigma^2) : -\infty < \mu_1 = \cdots = \mu_b = \mu < \infty, 0 < \sigma^2 < \infty\}$를 만족한다면 축소 모형이 단일 표본 모형 $\mathbf{N(\mu, \sigma^2)}$과 같습니다. 모수 $\mu$와 $\sigma^2$의 최대 우도 추정량 mle는 다음과 같습니다.

$$
\begin{aligned}
& \hat{\mu}_{\omega} = \frac{1}{n} \sum_{j=1}^b \sum_{i=1}^{n_j} x_{ij} = \bar{x}_{\cdot \cdot} \\
& \hat{\sigma}^2_{\omega} = \frac{1}{n} \sum_{j=1}^b \sum_{i=1}^{n_j} (x_{ij} - \bar{x}_{\cdot \cdot})^2
\end{aligned}
$$

mle에서 $L(\omega)$를 평가하면 $\mathbf{L(\hat{\omega}) = \left(\frac{1}{2\pi}\right)^{n/2} \left(\frac{1}{\hat{\sigma}^2_{\omega}}\right)^{n/2} e^{-n/2}}$와 같습니다.

전체 모형에서는 로그 우도 함수 $\mathbf{\log L(\Omega)}$를 각 $\mathbf{\mu_j}$에 대해 편미분하여 0으로 놓고 풀면, $\mathbf{\mu_j}$의 mle를 얻습니다.

$$
\begin{aligned}
& \hat{\mu}_j = \frac{1}{n_j} \sum_{i=1}^{n_j} x_{ij} = \bar{x}_{\cdot j} \\
& \hat{\sigma}^2_{\Omega} = \frac{1}{n} \sum_{j=1}^b \sum_{i=1}^{n_j} (x_{ij} - \bar{x}_{\cdot j})^2
\end{aligned}
$$

mle에서 $L(\Omega)$를 평가하면 $\mathbf{L(\hat{\Omega}) = \left(\frac{1}{2\pi}\right)^{n/2} \left(\frac{1}{\hat{\sigma}^2_{\Omega}}\right)^{n/2} e^{-n/2}}$입니다.

우도비 검정 통계량 $\mathbf{\Lambda = L(\hat{\omega})/L(\hat{\Omega})}$는 작은 값일 때 $H_0$를 기각합니다.

$$
\Lambda^{2/n} = \frac{\hat{\sigma}^2_{\Omega}}{\hat{\sigma}^2_{\omega}} = \frac{\sum_{j=1}^b \sum_{i=1}^{n_j} (x_{ij} - \bar{x}_{\cdot j})^2}{\sum_{j=1}^b \sum_{i=1}^{n_j} (x_{ij} - \bar{x}_{\cdot \cdot})^2} = \frac{Q_3}{Q}
$$

#### 제곱합 분해

총 제곱합 $\mathbf{Q}$를 두 개의 부분으로 분해하는 다음 항등식을 고려합니다.

$$
\begin{aligned}
& Q = \sum_{j=1}^b \sum_{i=1}^{n_j} (x_{ij} - \bar{x}_{\cdot \cdot})^2 \\
&= \underbrace{\sum_{j=1}^b \sum_{i=1}^{n_j} (x_{ij} - \bar{x}_{\cdot j})^2}_{\mathbf{Q_3: \text{오차 제곱합 (SSE)} \approx \text{within}} } + \underbrace{\sum_{j=1}^b n_j (\bar{x}_{\cdot j} - \bar{x}_{\cdot \cdot})^2}_{\mathbf{Q_4: \text{처리 제곱합 (SSTr)} \approx \text{between}}}
\end{aligned}
$$

이 항등식을 사용하면 우도비 통계량 $\mathbf{\Lambda^{-2/n}}$은 다음과 같이 됩니다.

$$
\mathbf{\Lambda^{-2/n} = \frac{Q_3 + Q_4}{Q_3} = 1 + \frac{Q_4}{Q_3}}
$$

$H_0$를 기각하는 것은 $\mathbf{Q_4/Q_3}$가 클 때이므로, 다음과 같이 정의된 F-통계량을 사용합니다.

$$
\mathbf{F = \frac{Q_4 / (b-1)}{Q_3 / (n-b)}}
$$

---

### Noncentral $\chi^2$ and F-Distributions

$X_1, X_2, \dots, X_n$이 각각 $\mathbf{N(\mu_i, \sigma^2)}$를 따르는 독립 확률 변수라고 합니다. $Y = \sum_{i=1}^n X_i^2 / \sigma^2$의 적률 생성 함수(mgf) $\mathbf{M(t)}$는 다음과 같이 주어집니다.

$$
\begin{aligned}
& M(t) = \frac{1}{(1 - 2t)^{n/2}} \exp \left\{ \frac{t \sum_{i=1}^n \mu_i^2}{\sigma^2 (1 - 2t)} \right\} \\
& \sim \frac{1}{(1 - 2t)^{r/2}} \exp \left\{ \frac{t\theta}{1 - 2t} \right\}
\end{aligned}
$$

확률 변수 $\mathbf{Y}$는 비중심 카이제곱 분포를 따른다고 하며, $\chi^2(r, \theta)$로 표기합니다. 여기에서 $r$는 자유도, $\theta$는 비중심 모수로 만약 $\theta=0$이면 일반적인 중심 카이제곱 $\chi^2(r)$ 분포를 따르게 됩니다.

$U \sim \chi^2(r_1, \theta)$이고 $V \sim \chi^2(r_2)$이며 $\mathbf{U}$와 $\mathbf{V}$가 독립일 때,

$$
W = \frac{r_2 U}{r_1 V}
$$

분포를 비중심 F-분포라고 하며, 자유도는 $r_1$과 $r_2$, 비중심 모수는 $\theta$입니다. 비중심 F-분포의 비중심 모수 $\theta$는 분자의 $\chi^2$ 변수 $U$의 비중심 모수와 같습니다.

$$
E(F) = \frac{r_2}{r_2 - 2} \left( \frac{r_1 + \theta}{r_1} \right)
$$

$r_2 > 2$에 대해서 위의 비중심 F-분포의 평균이 되고 $\theta > 0$이면, 비중심 F-분포의 평균은 대응하는 중심 F-분포의 평균보다 큽니다.

이러한 비모수 분포를 사용하여 One way anova에서 $Q_4/\sigma^2$의 비중심 모수 $\theta$는 $Q_4$에서 $X_{ij}$를 그 기댓값 $E(X_{ij}) = \mu_j$로 대체하여 계산합니다.

$$
\theta = \frac{1}{\sigma^2} \sum_{j=1}^b n_j (\mu_j - \mu)^2
$$

여기서 $\mu = E(\bar{X}_{\cdot \cdot}) = \sum_{j=1}^b (n_j/n) \mu_j$로 전체 평균의 기댓값입니다. 따라서 귀무가설은 모든 $\mu_j$가 같다는 조건 하에 $\mathbf{\theta = 0}$이며, 중심 F-분포를 따릅니다.

---

### Multiple Comparisons

일원 분산 분석(One-Way ANOVA)에서, 첫 번째 단계 분석(First Stage Analysis)인 평균 동일성 가설 $H_0: \mu_1 = \cdots = \mu_b$에 대한 F-검정을 수행한 후, 통계학자들은 종종 두 번째 단계 분석(Second Stage Analysis)으로 쌍별 비교 $\mu_j - \mu_{j'}$를 수행하고자 합니다.

추정량은 $\bar{X}{\cdot j} - \bar{X}{\cdot j'}$입니다. $\sigma^2$의 추정량은 $\hat{\sigma}^2_{\Omega}$이며, $(1-\alpha)100\%$ 신뢰 구간은 다음과 같습니다.

$$
\bar{X}_{\cdot j} - \bar{X}_{\cdot j'} \pm t_{\alpha/2, n-b} \hat{\sigma}_{\Omega} \sqrt{\frac{1}{n_j} + \frac{1}{n_{j'}}}
$$

여러 쌍별 비교를 동시에 수행할 때 모든 비교가 동시에 참일 전체 신뢰 수준(Overall Confidence)은 $\mathbf{(1-\alpha)}$보다 낮아지는(slippage) 문제가 발생합니다.

#### Bonferroni Multiple Comparison Procedure

본페로니 절차는 전체 신뢰 수준의 하한을 보장하면서 다중 비교 문제를 해결하는 일반적인 방법입니다.

$k$개의 모수 $\theta_i$에 대한 $k$개의 신뢰 구간 $I_i$가 있을 때, 모든 구간이 동시에 모수를 포함할 확률의 하한은 부울 부등식(Boole's inequality)에 의해 다음과 같습니다.

$$
\begin{aligned}
& P(\theta_1 \in I_1, \dots, \theta_k \in I_k) \\
& \ge 1 - \sum_{i=1}^k P(\theta_i \notin I_i) = 1 - k\alpha
\end{aligned}
$$

$k$개의 비교를 수행할 때, 각 개별 신뢰 구간의 유의 수준을 $\alpha/k$로 조정합니다. 그러면 전체 신뢰 수준은 최소 $1 - k(\alpha/k) = 1 - \alpha$가 됩니다.

#### Tukey's Multiple Comparison Procedure

튜키 절차는 학생화 범위 분포(Studentized range distribution)를 기반으로 하며, 일반적으로 본페로니보다 더 좁은 구간을 제공합니다.

$Y_1, \dots, Y_k \sim N(\mu, \sigma^2)$이고 $R = \max(Y_i) - \min(Y_i)$일 때, $mS^2/\sigma^2 \sim \chi^2(m)$와 독립인 통계량 $Q = R/S$는 모수 $k$와 $m$을 갖는 학생화 범위 분포(Studentized Range Distribution)를 따릅니다.

$n_j = a$로 모두 같을 때 균형 설계라고 하며 

$$
\bar{X}_{\cdot j} - \bar{X}_{\cdot j'} \pm q_{1-\alpha, b, n-b} \frac{\hat{\sigma}_{\Omega}}{\sqrt{a}}
$$

이와 같은 신뢰 구간을 갖게 됩니다. $q_{1-\alpha, b, n-b}$는 $b$와 $n-b$ 자유도를 갖는 학생화 범위 분포의 $(1-\alpha)$ 분위수입니다.

$n_j$가 다를 때 불균형 설계라고 하며 

$$
\bar{X}_{\cdot j} - \bar{X}_{\cdot j'} \pm \frac{q_{1-\alpha, b, n-b}}{\sqrt{2}} \hat{\sigma}_{\Omega} \sqrt{\frac{1}{n_j} + \frac{1}{n_{j'}}}
$$

각 표본 크기에 따라 오차 항을 조정하여 정확히 $(1-\alpha)$ 신뢰 수준을 갖지 않지만, 불균형이 심하지 않으면 근사적으로 잘 작동하는 것으로 알려져 있습니다.

---

### Two-Way ANOVA

$b$개 수준을 갖는 단일 요인에 대한 일원 분산 분석을 확장하여, 요인 $A$가 $a$개 수준을 갖고 요인 $B$가 $b$개 수준을 갖는 두 요인에 대한 상황을 다룹니다. 이를 이원 분산 분석(Two-Way ANOVA)이라고 합니다.

$X_{ij}$는 요인 $A$의 $i$번째 수준과 요인 $B$의 $j$번째 수준의 조합에 대한 반응값이며, 총 표본 크기는 $n = ab$입니다. $\sigma^2$의 공통 분산을 갖는 독립적인 정규 분포를 따른다고 가정하며, 평균을 $\mu_{ij}$라고 합니다.

#### Additive ANOVA Model

가법 모형에서는 $\mu_{ij}$가 요인 $A$와 $B$의 효과의 합으로만 구성됩니다.

$$
\mu_{ij} = \mu + (\mu_{i\cdot} - \mu) + (\mu_{\cdot j} - \mu)
$$

$\alpha_i = \mu_{i\cdot} - \mu$ (요인 A의 효과)와 $\beta_j = \mu_{\cdot j} - \mu$ (요인 B의 효과)를 사용하여 모형을 단순하게 나타낼 수 있습니다. 여기서 $\sum_{i=1}^a \alpha_i = 0$이고 $\sum_{j=1}^b \beta_j = 0$입니다.

최대 우도 추정량 mle는 다음과 같습니다.

$$
\begin{aligned}
& \hat{\mu} = \bar{X}_{\cdot \cdot}, \\
& \hat{\alpha}_i = \bar{X}_{i\cdot} - \bar{X}_{\cdot \cdot}, \\
& \hat{\beta}_j = \bar{X}_{\cdot j} - \bar{X}_{\cdot \cdot}
\end{aligned}
$$

$\sigma^2$의 mle는 다음과 같습니다.

$$
\begin{aligned}
& \hat{\sigma}^2_{\Omega} \\
&= \frac{\sum_{i=1}^a \sum_{j=1}^b [X_{ij} - \bar{X}_{i\cdot} - \bar{X}_{\cdot j} + \bar{X}_{\cdot \cdot}]^2}{ab} \\
&\equiv \frac{Q'_3}{ab}
\end{aligned}
$$

이 때 $Q'_3$는 오차 제곱합 (SSE)으로, $ab \hat{\sigma}^2_{\Omega}/\sigma^2$는 자유도 $(a-1)(b-1)$의 $\chi^2$ 분포를 따릅니다.

#### A, B 요인 주효과 검정

$H_{0B}$ 하에서 $(\beta_j = 0)$, $\sigma^2$의 축소 모형 mle는 분자 $Q'$를 갖습니다.

$$
Q' = a \sum_{j=1}^b [X_{\cdot j} - \bar{X}_{\cdot \cdot}]^2 + Q'_3
$$

우도비 검정 통계량은 큰 값의 $Q'_4/Q'_3$에 대해 $H_{0B}$를 기각합니다. 여기서 $Q'_4$는 다음과 같습니다.

$$
Q'4 = a \sum{j=1}^b [\bar{X}{\cdot j} - \bar{X}{\cdot \cdot}]^2
$$

여기서 $Q'_4$는 $B$ 요인에 의한 처리 제곱합 (SSTrB)입니다. 그리고 F-통계량은 아래와 같습니다.

$$
F_B = \frac{a \sum_{j=1}^b [\bar{X}_{\cdot j} - \bar{X}_{\cdot \cdot}]^2 / (b - 1)}{Q'_3 / [(a - 1)(b - 1)]}
$$

$H_{0A}$에 대한 검정 통계량 $F_A$도 유사하게 유도됩니다.

#### Two-Way Model with Interaction

각 셀 $(i, j)$에 대해 $c > 1$개의 독립적인 관측값 $X_{ijk}$이 있을 경우, 셀 평균 $\mu_{ij}$가 가법 효과 이상의 특이한 기여를 반영하도록 교호 작용 모수 $\mathbf{\gamma_{ij}}$를 포함할 수 있습니다.

$$
\mu_{ij} = \mu + \alpha_i + \beta_j + \gamma_{ij}
$$

여기서 $\sum_{i} \gamma_{ij} = 0, \sum_{j} \gamma_{ij} = 0$입니다. $\sigma^2$의 mle는 다음과 같습니다.

$$
\hat{\sigma}^2_{\Omega} = \frac{\sum_{i} \sum_{j} \sum_{k} [X_{ijk} - \bar{X}_{ij\cdot}]^2}{abc} \equiv \frac{Q''_3}{abc}
$$

$Q''_3$는 오차 제곱합 (SSE)으로 $Q''_3/\sigma^2$는 자유도 $ab(c-1)$의 $\chi^2$ 분포를 따릅니다.

---

### 참고 자료

[원본 경로 #1](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)


