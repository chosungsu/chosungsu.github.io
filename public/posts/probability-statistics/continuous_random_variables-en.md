---
title: 'Continuous Random variable'
date: '2024-05-10'
tags: ['Probability&Statistics', 'lecture']
---

### Indicator function

When $Y=g(X)$ exists, we can calculate $E[Y]=\int_{-\infty}^{\infty} yf_Y(y)dy=\int_{-\infty}^{\infty}$.

If $g(X)=I_C(x)=\begin{cases} 0 & X \notin C \\ 1 & X \in C \end{cases}$, then we calculate $E[Y]=\int_{-\infty}^{\infty} g(x)f_X(x)dx=\int_C f_X(x)dx=P[X \in C]$.

As an example problem, if $Y=a\cdot\cos(wt+\theta)$ is a random variable satisfying $\theta \in [0,2\pi]$, then the expected values of $Y$ and $Y^2$ can be calculated as follows:

$$
E[Y]=E[a\cdot\cos(wt+\theta)] \\
= \int_{0}^{2\pi} a\cdot\cos(wt+\theta) \frac{d\theta}{2\pi} \\
= [-a\cdot\sin(wt+\theta)]_{0}^{2\pi} \\
= -a\cdot\sin(wt+2\pi)+a\cdot\sin(wt)=0, \\
E[Y^2]=E[a^2\cdot\cos^2(wt+\theta)] \\
= E[\frac{a^2}{2}+\frac{a^2}{2}\cdot\cos(2wt+2\theta)] \\
= \frac{a^2}{2}+\frac{a^2}{2}\cdot\int_{0}^{2\pi} \cos(2wt+2\theta) \frac{d\theta}{2\pi} = \frac{a^2}{2}
$$

The variance is calculated as $Var(X) \triangleq E[(X-m_x)^2]=E[X^2]-(m_x)^2$, and the conditional cdf is calculated as $F_X[x|A] \triangleq P[X \le x | A]=\frac{P[(X \le x) \cap A]}{P[A]}$.

---

### Continuous random variables

#### 1. Uniform r.v

If $S_X = [a, b]$, then the pdf is $\frac{1}{b-a}$, and the expected value and variance are $E[X]=\frac{a+b}{2}, Var[X]=\frac{(b-a)^2}{12}$.

#### 2. Exponential r.v

If $S_X = \left[0, \infty \right)$, then the pdf is $\lambda e^{-\lambda x}$, and the expected value and variance are $E[X]=\frac{1}{\lambda}, Var[X]=\frac{1}{\lambda^2}$.

#### 3. Gaussian r.v

The pdf is $\frac{1}{\sqrt{2\pi \sigma^2}} e^{-\frac{(x-m)^2}{2\sigma^2}}$, and the expected value and variance are $E[X]=m, Var[X]=\sigma^2$.

---

### Examples of r.v

For example, let $Y=X^2=g(x)$ be defined, and the event occurs when $\{Y \le y\}$ is $\{X^2 \le y\}$.

In this case, the probability value is given by $F_Y(y)=\begin{cases} 0 & y < 0 \\ F_X(\sqrt{y})-F_X(-\sqrt{y}) & y > 0 \end{cases}$, so differentiating gives $f_Y(y)= \frac{f_X(\sqrt{y})}{2\sqrt{y}}-\frac{f_X(-\sqrt{y})}{-2\sqrt{y}}=\frac{f_X(\sqrt{y})}{2\sqrt{y}}+\frac{f_X(-\sqrt{y})}{2\sqrt{y}}$.

---

### Markov inequality

$$
P[X \ge a] \le \frac{E[X]}{a}
$$

This formula holds only when $X$ is non-negative.

Since $E[X]=\int_{0}^{a} xf_X(x)dx+\int_{a}^{\infty} xf_x(x)dx \ge \int_{a}^{\infty} xf_x(x)dx \ge a\int_{a}^{\infty} f_x(x)dx$ holds, and $\int_{a}^{\infty} f_x(x)dx$ is equivalent to $P[X \ge a]$, the above formula can be proven.

---

### Chebyshev inequality

$$
P[|X-E[X]| \ge a] \le \frac{Var[X]}{a^2}
$$

This formula holds for any arbitrary $X$.

If we define $(X-E[X])^2 = D^2$, then we can obtain $P[D^2 \ge a^2] \le \frac{E[D^2]}{a^2}=\frac{Var[X]}{a^2}$, which proves the above formula.

As an example problem, we have $P[|X-m| \ge k\sigma] \le \frac{1}{k^2}$, and $\frac{1}{k^2}=\frac{\sigma^2}{(k\sigma)^2}$ is a proper reduction, and when $k=2$, it equals $0.25$.

---

### pdf of Y

$$
X \rightarrow Y=g(X)
$$

In the above equation, when $g(X)=aX+b$, while we can find $f_X(x)$, let's look at how to find $f_Y(y)$.

$F_Y(y)=P[Y \le y]=P[aX+b \le y]=\begin{cases} P[X \le \frac{y-b}{a}] & a > 0 \\ P[X \ge \frac{y-b}{a}] & a < 0 \end{cases}=\begin{cases} F_X(\frac{y-b}{a}) & a > 0 \\ 1 - F_X(\frac{y-b}{a}) & a < 0 \end{cases}$ can be expanded, so differentiating gives $f_Y(y)=\begin{cases} \frac{1}{a}f_X(\frac{y-b}{a}) & a > 0 \\ -\frac{1}{a}f_X(\frac{y-b}{a}) & a < 0 \end{cases}=\frac{1}{|a|}f_X(\frac{y-b}{a})$.

For example, in a normal distribution $(X \sim N(0,1))$ where $f_X(x)=\frac{1}{\sqrt{2\pi}}e^{-\frac{x^2}{2}}$, substituting the above $Y$ gives: $f_Y(y)=\frac{1}{\sqrt{2\pi}|a|}e^{-\frac{(y-b)^2}{2a^2}}$, and now we can express that the normal distribution has $(X \sim N(b,a^2))$.

---

### References

[Original Source #1](https://www.youtube.com/watch?v=ZMSuPBOOT7Y&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=8)

[Original Source #2](https://www.youtube.com/watch?v=UI1RMiAJ-yA&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=10)

[Original Source #3](https://www.youtube.com/watch?v=FeYEITE6JJk&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=11)
