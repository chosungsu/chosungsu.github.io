---
title: 'Nonparametric and Robust Statistics'
date: '2023-05-29'
tags: ['Mathematical statistics', 'lecture']
---

### Location models

위치 문제에 대한 비모수적 절차(Nonparametric Procedures)를 제시합니다. 모수(parameter)를 주어진 확률 변수의 cdf 또는 pdf의 함수(function)로 생각할 때 범함수라고 합니다.

$T(F_X)$가 다음 두 조건을 모두 만족할 때 위치 범함수(Location Functional)라고 합니다.

$\rightarrow$ $Y = X + a$이면, $T(F_Y) = T(F_X) + a$

$\rightarrow$ $Y = aX$이면, $T(F_Y) = aT(F_X)$

$\theta_X = T(F_X)$를 위치 범함수라고 할 때, 관측값 $X_1, \dots, X_n$이 다음을 따를 때 위치 모형(Location Model)을 따른다고 합니다.

$$
X_i = \theta_X + \epsilon_i
$$

여기서 $\epsilon_1, \dots, \epsilon_n$는 $T(F_\epsilon) = 0$인 pdf $f(x)$를 갖는 $\text{i.i.d.}$ 확률 변수입니다.

분포가 대칭인 경우에는 모든 위치 범함수가 동일한 값을 가집니다. $X$의 분포가 $a$에 대해 대칭(Symmetric)이고 $T(F_X)$가 임의의 위치 범함수일 때,

$$
T(F_X) = a
$$

가 성립합니다.

---

### Sample Median and Sign Test

$X_1, X_2, \dots, X_n$이 위치 모형 $X_i = \theta + \epsilon_i$를 따르는 확률 표본이라고 가정합니다. 여기서 $\epsilon_i$는 중앙값이 0입니다. $\theta$는 $X_i$의 중앙값입니다.

#### Sign Test

단측 가설 $H_0: \theta = \theta_0$ 대 $H_1: \theta > \theta_0$를 검정하기 위해 다음 통계량을 고려합니다.

$$
S(\theta_0) = \#\{X_i > \theta_0\}
$$

이는 $X_i - \theta_0$의 차이가 양수인 개수를 세는 통계량입니다. 귀무가설에서 $I(X_i > \theta_0)$는 $b(1, 1/2)$ 베르누이 분포를 따릅니다. $E(S(\theta_0)) = n/2$, $\text{Var}(S(\theta_0)) = n/4$입니다. 이 때 부호 검정은 $X_i$의 분포 형태에 의존하지 않으므로 분포 무관 검정(Distribution Free Test)이라고 불립니다.

#### Power Function and Monotonicity

$S(\theta) = \#\{X_i > \theta\}$는 $\theta$에 대한 감소하는 계단 함수(decreasing step function)입니다. 단측 가설 $H_0: \theta \le \theta_0$ 대 $H_1: \theta > \theta_0$에 대한 부호 검정의 검정력 함수 $\gamma(\theta)$는 $\mathbf{\theta}$에 대한 비감소 함수(nondecreasing function)입니다.

대립 가설 $\theta = \theta_1$ 하에서 $S(\theta_0)$는 $p_1 = P_{\theta_1}(X > \theta_0)$인 $b(n, p_1)$ 분포를 따릅니다. 따라서 대립 가설 하에서는 분포 무관적이지 않습니다.

#### Asymptotic Relative Efficiency, ARE

지역 대립 가설(Local Alternatives)은 $H_{1n}: \theta_n = \delta/\sqrt{n}$ 하에서 검정의 성능을 비교하기 위해 점근 검정력 보조 정리(Asymptotic Power Lemma)가 사용됩니다. 이는 지역 가설 하에서 대규모 표본, 유의 수준 $\alpha$인 부호 검정의 검정력의 극한은 다음과 같습니다.

$$
\lim_{n\to\infty} \gamma(\theta_n) = 1 - \Phi(z_\alpha - \delta \tau_S^{-1})
$$

여기서 $\tau_S = 1/[2f(0)]$이고, $f(0)$는 오차 $\epsilon_i$의 pdf의 중앙값에서의 값입니다.

두 검정 $S$와 $t$의 ARE는 동일한 검정력 $\gamma^*$를 달성하는 데 필요한 표본 크기 비율로 정의됩니다.

#### Confidence Interval for the Median

부호 검정을 역전(Inverting)하여 중앙값 $\theta$에 대한 신뢰 구간을 얻을 수 있습니다. $S(\theta)$가 $b(n, 1/2)$ 분포를 따르는 사실을 이용하여, $P_\theta[c_1 < S(\theta) < n - c_1] = 1 - \alpha$인 $c_1$을 선택합니다.

$S(\theta)$의 단조성 때문에 이 부등식은 다음 순서 통계량(Order Statistics)에 대한 부등식과 동치입니다.

$$
\mathbf{Y_{c_1+1} \le \theta < Y_{n-c_1}}
$$

따라서, $Y_{c_1+1}, Y_{n-c_1}$는 $\theta$에 대한 $(1-\alpha)100\%$ 신뢰 구간이 됩니다.

---

### Signed-Rank Wilcoxon

이 검정은 $X_i$의 오차 $\epsilon_i$의 pdf $f(x)$가 0에 대해 대칭이라는 추가 가정을 합니다.

#### Wilcoxon Statistic

단측 가설 $H_0: \theta = 0$과 $H_1: \theta > 0$를 검정하기 위해 다음 통계량을 사용합니다.

$$
T = \sum_{i=1}^n \text{sgn}(X_i) R_{|X_i|}
$$

여기서 $R_{|X_i|}$는 $|X_1|, \dots, |X_n|$ 중에서 $|X_i|$의 순위를 의미하며, 순위는 낮은 값부터 높은 값으로 매겨집니다. 귀무가설에서는 $T$가 0 근처에 있을 것으로 예상하며 대립가설에서는 양수 $X_i$가 더 많고 더 높은 순위를 받을 가능성이 높으므로 $T$가 양의 큰 값을 가질 것으로 예상됩니다. $T \ge c$이면 $H_0$를 기각합니다.

윌콕슨 통계량의 분포는 아래의 성질을 가집니다.

$\rightarrow$ 분포 무관적이며 0에 대해 대칭적인 pmf를 가집니다.

$\rightarrow$ 평균은 $E_{H_0}[T] = 0$을 가지며 분산 $Var_{H_0}(T) = n(n+1)(2n+1)/6$을 가집니다.

$\rightarrow$ 점근적으로 $N(0,1)$을 따릅니다.

양수 $\mathbf{X_i}$의 순위 합 $\mathbf{T^+}$를 사용하여 

$$
T = 2T^+ - \frac{n(n+1)}{2}
$$

이와 같이 선형 변환할 수 있습니다. $E_{H_0}(T^+) = n(n+1)/4$, $Var_{H_0}(T^+) = n(n+1)(2n+1)/24$의 통계량을 가집니다.

#### 점근 상대 효율, ARE

윌콕슨 통계량 $T^+$의 효율성 $c_{T^+}$는 다음과 같습니다.

$$
c_{T^+} = \lim_{n\to\infty} \frac{\mu'_{T^+}(0)}{\sqrt{n}\sigma_{T^+}(0)} = \sqrt{12} \int_{-\infty}^\infty f^2(x) dx
$$

꼬리가 두꺼워질수록 ($\epsilon$이 증가할수록), 윌콕슨 검정의 $ARE(W, t)$는 $t$-검정보다 더 커집니다.

---

### Mann-Whitney-Wilcoxon Procedure

$X_1, \dots, X_{n_1}$는 cdf $F(x)$를 따르는 표본이고, $Y_1, \dots, Y_{n_2}$는 cdf $G(x)$를 따르는 표본으로 정의합니다. 귀무가설은 $F(x) = G(x)$로 두 표본의 분포가 동일하다고 가정합니다.

#### Location Shift model

$G(x) = F(x - \Delta)$입니다. $\Delta$는 분포 간의 이동(Shift)을 나타내며, $P(Y \le y) = F(y - \Delta)$를 만족합니다. 이 때 귀무가설은 $\Delta=0$으로 가정하고 $\Delta$는 어떤 위치 범함수 $T$를 선택하든 항상 $\Delta = T(F_Y) - T(F_X)$로 동일합니다. 즉, 위치 측정 방식에 관계없이 두 분포 간의 이동량은 일정합니다.

#### MWW Statistic

두 표본을 결합하여 전체 $n = n_1 + n_2$ 관측값에 대한 순위(Rank)를 매깁니다. $Y_j$의 순위 합 $W$를 MWW 통계량으로 정의합니다.

$$
W = \sum_{j=1}^{n_2} R(Y_j)
$$

귀무가설 하에서는 순위가 $X$와 $Y$ 사이에 고르게 분포될 것으로 예상되지만, 대립가설 하에서는 $Y_j$가 더 큰 값(순위)을 받을 것으로 예상하므로 $W \ge c$이면 $H_0$를 기각합니다.

통계량의 속성은 아래와 같습니다.

$\rightarrow$ 분포 무관적이며 0에 대해 대칭적인 pmf를 가집니다.

$\rightarrow$ 평균은 $E_{H_0}[W] = n_2(n+1)/2$, 분산 $Var_{H_0}(W) = n_1n_2(n+1)/12$를 가집니다.

$\rightarrow$ $U$통계량과 선형 관계에 있으며 이 통계량은 $Y_j$가 $X_i$보다 큰 쌍의 개수를 셉니다. $U = \#_{i,j} \{Y_j > X_i\}$.

MWW 절차는 두 표본의 위치 이동에 대한 비모수적 추론을 제공하며, 특히 분포가 정규 분포가 아니거나 꼬리가 두꺼울 때 $\mathbf{t}$-검정보다 더 강력하고 효율적입니다.

#### 점근 상대 효율, ARE

$n_1/n \to \lambda_1$, $n_2/n \to \lambda_2$ (표본 크기 비율이 일정하게 유지)인 대립 가설 $H_{1n}: \Delta_n = \delta/\sqrt{n}$ 하에서 MWW의 효율성 $c_U$를 계산합니다.

$$
c_U = \sqrt{12\lambda_1\lambda_2} \int_{-\infty}^\infty f^2(x) dx
$$

#### Hodges-Lehmann 추정

MWW 검정 통계량을 역전하여 얻는 $\Delta$의 추정량은 $U(\Delta) = n_1n_2/2$를 만족하는 값입니다. 이는 모든 $Y_j - X_i$ 차이들의 중앙값과 같습니다.

$$
\hat{\Delta}_U = \text{medi,j} \{Y_j - X_i\}
$$

신뢰 구간 $(D_{c+1}, D_{n_1n_2-c})$는 $\Delta$에 대한 $(1-\alpha)100\%$ 신뢰 구간이며, 여기서 $D_i$는 순서화된 차이 $Y_j - X_i$이고, $c$는 $P_\Delta[U(\Delta) \le c] = \alpha/2$를 만족하는 정수입니다.

---

### General Rank Scores

#### 순위 점수 통계량, $W_{\Phi}$

$(0, 1)$에서 정의된 비감소 함수 $\phi(u)$를 점수 함수(score function)라고 합니다.

$$
\int_0^1 \phi(u) du = 0, 
\int_0^1 \phi^2(u) du = 1
$$

$a_\phi(i) = \phi[i/(n+1)]$로 순위 점수를 정의합니다. 일반 순위 점수 통계량은 다음과 같습니다.

$$
W_\phi = \sum_{j=1}^{n_2} a_\phi(R(Y_j))
$$

여기서 $R(Y_j)$는 결합 표본에서의 $Y_j$의 순위입니다. 선형 점수 함수 $\phi(u) = \sqrt{12}(u - 1/2)$를 사용하면, $W_\phi$는 $W$ 통계량(Mann–Whitney–Wilcoxon)과 선형적으로 관련되어 MWW 검정 통계량이 됩니다.

통계량의 속성으로 평균은 $E_{H_0}(W_{\Phi}) = 0$, 분산 $Var_{H_0}(W_{\Phi}) = \frac{n_1n_2}{n(n-1)}S^2_a$을 가집니다. 여기서 $s_a^2 = \sum_{i=1}^n a_\phi^2(i)$입니다.

---

### Measures of Association

#### kendall's $\tau$

켄달의 $\tau$는 $X$와 $Y$ 사이의 단조성(monotonicity)을 측정하는 지표입니다.

두 독립적인 쌍의 관측치 $(X_1, Y_1)$과 $(X_2, Y_2)$에 대해, $\text{sgn}\{(X_1 - X_2)(Y_1 - Y_2)\} = 1$이면 순서가 같다는 의미로 일치성을 보인다고 할 수 있으며 $\text{sgn}\{(X_1 - X_2)(Y_1 - Y_2)\} = -1$이면 순서가 다르기 때문에 불일치한다고 볼 수 있습니다.

$$
\begin{aligned}
&\tau \\
&= P[\text{sgn} \{(X_1 - X_2)(Y_1 - Y_2)\} = 1] \\
&- P[\text{sgn} \{(X_1 - X_2)(Y_1 - Y_2)\} = -1]
\end{aligned}
$$

이와 같이 켄달의 $\tau$를 정의하는데 $-1 \le \tau \le 1$ 범위에서 $\tau > 0$은 증가 단조성, $\tau < 0$은 감소 단조성을 나타냅니다. $X$와 $Y$가 독립이면 $\tau = 0$입니다.

#### spearman's $\rho$

스피어만의 $\rho_S$는 순위(Rank)를 사용하여 계산되는 상관계수의 아날로그입니다. 이는 $X$와 $Y$의 순위 사이의 선형 연관성을 측정합니다.

$$
r_S = \frac{\sum_{i=1}^n (R(X_i) - \frac{n+1}{2})(R(Y_i) - \frac{n+1}{2})}{n(n^2 - 1)/12}
$$

위 식에서 엄격한 증가 단조 관계이면 $r_S = 1$, 엄격한 감소 단조 관계이면 $r_S = -1$입니다.

---

### 참고 자료

[원본 경로 #1](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)


