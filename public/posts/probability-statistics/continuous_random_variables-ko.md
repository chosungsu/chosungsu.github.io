---
title: 'Continuous Random variable'
date: '2024-05-10'
tags: ['Probability&Statistics', 'lecture']
---

### Indicator function

$Y=g(X)$가 있을 때 $E[Y]=\int_{-\infty}^{\infty} yf_Y(y)dy=\int_{-\infty}^{\infty}$를 사용하여 계산이 가능합니다.

$g(X)=I_C(x)=\begin{cases} 0 & X \notin C \\ 1 & X \in C \end{cases}$이고 $E[Y]=\int_{-\infty}^{\infty} g(x)f_X(x)dx=\int_C f_X(x)dx=P[X \in C]$와 같이 계산합니다.

문제를 예로 들면 $Y=a*cos(wt+\theta)$가 있고 $\theta \in [0,2\pi]$를 만족하는 랜덤 변수이면 $Y, Y^2$에 대한 기댓값은 다음과 같이 구할 수 있습니다.

$$
E[Y]=E[a*cos(wt+\theta)] \\
= \int_{0}^{2\pi} a*cos(wt+\theta) \frac{d\theta}{2\pi} \\
= [-a*sin(wt+\theta)]_{0}^{2\pi} \\
= -a*sin(wt+2\pi)+a*sin(wt)=0, \\
E[Y^2]=E[a^2*cos^2(wt+\theta)] \\
= E[\frac{a^2}{2}+\frac{a^2}{2}*cos(2wt+w\theta)] \\
= \frac{a^2}{2}+\frac{a^2}{2}*\int_{0}^{2\pi} cos(2wt+\theta) \frac{d\theta}{2\pi} = \frac{a^2}{2}
$$

그리고 분산은 $Var(X) \triangleq E[(X-mx)^2]=E[X^2]-(mx)^2$로 계산하고 cdf는 $F_X[x|A] \triangleq P[X \le x | A]=\frac{P[(X \le x) \cap A]}{P[A]}$로 계산합니다.

---

### Continuous random variables

#### 1. Uniform r.v

$S_X = [a, b]$이면 pdf가 $\frac{1}{b-a}$, 기댓값 및 분산은 $E[X]=\frac{a+b}{2}, Var[X]=\frac{(b-a)^2}{12}$입니다.

#### 2. Exponential r.v

$S_X = \left[0, \infty \right)$이면 pdf가 $\lambda e^{-\lambda*x}$, 기댓값 및 분산은 $E[X]=\frac{1}{\lambda}, Var[X]=\frac{1}{\lambda^2}$입니다.

#### 3. Gaussian r.v

pdf가 $\frac{1}{\sqrt{2\pi \sigma^2}} e^{-\frac{(x-m)^2}{2\sigma^2}}$이고 기댓값 및 분산은 $E[X]=m, Var[X]=\sigma^2$을 갖습니다.

---

### 참고 자료

[원본 경로 #1](https://www.youtube.com/watch?v=ZMSuPBOOT7Y&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=8)



