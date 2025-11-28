---
title: 'The central limit theorem'
date: '2023-05-22'
tags: ['Probability', 'lecture']
---

### The central limit theorem

대수의 법칙(LLN)은 i.i.d. 확률 변수의 표본 평균 $\bar{S}_n$이 $n \to \infty$일 때 이론적 평균 $\bar{x}$로 수렴한다는 것을 주장합니다.

큰 편차 원리(LDP)는 이와 관련된 측도 집중 현상을 설명합니다. $\bar{S}_n$의 법칙이 디랙 델타 질량 $\delta_{\bar{x}}$에 지수적으로 빠르게 집중된다는 것입니다.

중심 극한 정리(CLT)는 LLN에 대한 수렴 속도를 정량화합니다. 대략적으로 말하면, 다음과 같은 행동을 설명합니다.

$$
\bar{S}_n - \bar{x} \approx \frac{1}{\sqrt{n}}\sigma Z
$$

여기서 $\sigma^2 = \text{Var}[X_1]$이고 $Z$는 표준 정규 분포를 따릅니다. 즉, i.i.d. 수열의 부분합의 평균 주변의 변동은 점근적으로 가우시안입니다.

---

### 린데베르크의 중심 극한 정리

고전적 CLT의 증명은 ${X_n}$이 i.i.d.라는 제한적인 가정을 사용했습니다. 린데베르크의 CLT는 이 조건을 완화하여 독립이지만 동일하게 분포되지 않은 (independent but not necessarily identically distributed) 수열로 확장합니다.

CLT가 성립하기 위해서는 "각각의 합산 요소 $X_m$이 $S_n$에 대해 균등하게 무시할 수 있어야 한다"는 종류의 조건이 필수적임을 시사합니다.

고전적 CLT는 질적(약한 수렴) 정보만 제공하지만, 린데베르크의 정리는 수렴 속도에 대한 정량적 추정치를 제공합니다.

$\mathbf{E}[X_n] = 0$인 독립 확률 변수 수열 ${X_n}$을 가정하고, 다음을 정의합니다.

$$
\begin{aligned}
&\sigma_n \triangleq \sqrt{\text{Var}[X_n]}, \\
&\Sigma_n \triangleq \sqrt{\text{Var}[S_n]} = \sqrt{\sum_{m=1}^n \sigma_m^2}, \\
&\hat{S}_n \triangleq \frac{S_n}{\Sigma_n}
\end{aligned}
$$

위의 설정 하에서, $f \in \mathcal{C}^3_b(\mathbb{R})$ (3차 도함수가 유계인 연속 미분 가능한 함수)라고 하자. 그러면 모든 $\varepsilon > 0$ 및 $n \ge 1$에 대해 다음이 성립합니다.

$$
\left|\mathbf{E}[f(\hat{S}_n)] - \mathbf{E}[f(Z)]\right| \le \left(\frac{\varepsilon}{6} + \frac{\gamma \cdot r_n}{6}\right) \|f'''\|_\infty + g_n(\varepsilon) \cdot \|f''\|_\infty
$$

여기에 추가로 린데베르크 조건 $\lim_{n\to\infty} g_n(\varepsilon) = 0$을 만족하면 $\hat{S}_n \to Z$로 약하게 수렴한다고 합니다.

---

### Stein's Method

CLT에 대한 더 깊은 이해를 얻기 위해서는 수렴 속도(오차율)를 정량적으로 분석하는 효과적인 방법이 필요합니다. 이러한 목적을 위한 강력한 현대적 기법이 스타인 방법(Stein's method)입니다.

수렴 속도를 이해하기 위해서는 두 분포(혹은 확률 측도 $\mu, \nu$) 사이의 "거리" 개념이 필요합니다. 확률 변수 $W$와 $Z$의 법칙 $\mu, \nu$ 사이의 거리는 일반적으로 적절한 시험 함수(test functions) $\mathcal{H}$의 클래스에 대해 다음과 같이 정의됩니다.

$$
d_{\mathcal{H}}(\mu, \nu) \triangleq \sup \left\{ \left|\int_{\mathbb{R}} \varphi d\mu - \int_{\mathbb{R}} \varphi d\nu\right| : \varphi \in \mathcal{H} \right\}
$$

$\mathcal{H} = \{1_{(-\infty, a]}(x) : a \in \mathbb{R}\}$ 일 때, $d_{\mathcal{H}}(\mu, \nu)$는 균등 거리(uniform distance) 또는 콜모고로프 거리(Kolmogorov distance) $\|F - G\|_\infty$를 복구합니다.

주어진 시험 함수 $\varphi$에 대해 다음 스타인 방정식(Stein's equation)을 설정합니다.

$$
f'(x) - xf(x) = \varphi(x) - c_\varphi
$$

스타인 방정식의 양변에 $\mathbf{E}[ \cdot ]$를 취하면 오차량을 얻습니다.

$$
\mathbf{E}[f'(\hat{S}_n)] - \mathbf{E}[\hat{S}_n f(\hat{S}_n)] = \mathbf{E}[\varphi(\hat{S}_n)] - \mathbf{E}[\varphi(Z)]
$$

---

### 참고 자료

[원본 경로 #1](https://researchers.ms.unimelb.edu.au/~xgge@unimelb/Files/Notes/Lecture%20Notes%20on%20Advanced%20Probability.pdf)

[원본 경로 #2](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)


