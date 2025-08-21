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

### Examples of r.v

예를 들어 $Y=X^2=g(x)$로 정의되고 이벤트는 $\{Y \le y\}$가 $\{X^2 \le y\}$일 때 발생합니다.

이 때 $F_Y(y)=\begin{cases} 0 & y < 0 \\ F_X(\sqrt{y})-F_X(-\sqrt{y}) & y > 0 \end{cases}$로 확률값이 구해지므로 미분을 하면 $f_Y(y)= \frac{f_X(\sqrt{y})}{2\sqrt{y}}-\frac{f_X(-\sqrt{y})}{-2\sqrt{y}}=\frac{f_X(\sqrt{y})}{2\sqrt{y}}+\frac{f_X(-\sqrt{y})}{2\sqrt{y}}$가 됩니다.

---

### Markov inequality

$$
P[X \ge a] \le \frac{E[X]}{a}
$$

위 수식은 $X$가 음수가 아닐 때에만 성립합니다.

$E[X]=\int_{0}^{a} xf_X(x)dx+\int_{a}^{\infty} xf_x(x)dx \ge \int_{a}^{\infty} xf_x(x)dx \ge a\int_{a}^{\infty} f_x(x)dx$ 가 성립하는데 $\int_{a}^{\infty} f_x(x)dx$는 곧 $P[X \ge a]$와 같은 의미이므로 위 수식의 증명이 가능합니다.

---

### Chebyshev inequality

$$
P[|X-E[X]| \ge a] \le \frac{Var[X]}{a^2}
$$

위 수식은 임의의 $X$에 대해서 모두 성립합니다.

$(X-E[X])^2 = D^2$로 정의하면 $P[D^2 \ge a^2] \le \frac{E[D^2]}{a^2}=\frac{Var[X]}{a^2}$를 구할 수 있으므로 위 수식의 증명이 가능합니다.

문제로 예를 들면 $P[|X-m| \ge k\sigma] \le \frac{1}{k^2}$가 있고 $\frac{1}{k^2}=\frac{\sigma^2}{(k\sigma)^2}$로 정상적인 약분에 해당하며 $k=2$이면 $0.25$가 성립합니다.

---

### pdf of Y

$$
X \rightarrow Y=g(X)
$$

위 수식에서 $g(X)=aX+b$라고 볼 때 $f_X(x)$에 대해서는 구할 수 있지만 $f_Y(y)$를 구하는 방법에 대해서 알아보겠습니다.

$F_Y(y)=P[Y \le y]=P[aX+b \le y]=\begin{cases} P[X \le \frac{y-b}{a}] & a > 0 \\ P[X \ge \frac{y-b}{a}] & a < 0 \end{cases}=\begin{cases} F_X(\frac{y-b}{a}) & a > 0 \\ 1 - F_X(\frac{y-b}{a}) & a < 0 \end{cases}$로 전개가 가능하므로 미분을 하면 $f_Y(y)=\begin{cases} \frac{1}{a}f_X(\frac{y-b}{a}) & a > 0 \\ -\frac{1}{a}f_X(\frac{y-b}{a}) & a < 0 \end{cases}=\frac{1}{|a|}f_X(\frac{y-b}{a})$라고 구해집니다.

예를 들어 정규분포$(X \sim N(0,1))$에서 $f_X(x)=\frac{1}{\sqrt{2\pi}}e^{-\frac{x^2}{2}}$에 위의 $Y$를 대입하면 다음과 같습니다. $f_Y(y)=\frac{1}{\sqrt{2\pi}|a|}e^{-\frac{(y-b)^2}{2a^2}}$에서 이제 정규분포는 $(X \sim N(b,a^2))$를 가진다고 표현할 수 있습니다.

---

### 참고 자료

[원본 경로 #1](https://www.youtube.com/watch?v=ZMSuPBOOT7Y&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=8)



