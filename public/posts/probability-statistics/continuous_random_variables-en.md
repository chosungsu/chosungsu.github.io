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

### References

[Original Source #1](https://www.youtube.com/watch?v=ZMSuPBOOT7Y&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=8)



