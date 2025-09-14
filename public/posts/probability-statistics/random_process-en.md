---
title: 'Sums of random variables and long-term averages'
date: '2024-05-17'
tags: ['Probability&Statistics', 'lecture']
---

### Warm up

In $S_n \triangleq X_1 + X_2 + \cdots + X_n$, each $X_i$ is said to have i.i.d (independent & identically distributed) properties.

Now, if we're curious about $E[X_i]$, we can guess that it's related to $\frac{X_1+X_2+ \cdots+X_n}{n}$. Also, in the world of probability, when some event $A$ occurs, for example, if we succeed on the 30th trial out of 100 trials, we can guess that $\frac{I_{A_1}+ I_{A_2}+ \cdots + I_{A_n}}{n}$ is $P[A]$, which will eventually converge to $E[A]$.

This proof is called the Law of Large Numbers.

---

### Solution

In the above proof, when sampling $X \leftarrow N(0,1)$, $M_n$ can be said to be the mean of the sampling. Therefore, if we say $E[X_i]=\mu, Var(X_i)=\sigma^2$, then we can see that $E[S_n]=n \cdot \mu, Var(S_n)=n \cdot \sigma^2$.

The weak law of large numbers sets epsilon as a positive number and satisfies $lim_{n \rightarrow \infty} P[|M_n - \mu| < \epsilon]=1$. And the strong law of large numbers means $P[lim_{n \rightarrow \infty} M_n = \mu]=1$ when there is finite mean and variance.

---

### Examples of $M_n$

$M_n=\frac{\sum_{i=1}^{n}X_i}{n}$ obviously converges when $n \rightarrow \infty$.

First, in sure convergence, $X_n(\zeta) \rightarrow X(\zeta)$ means it converges when $n \rightarrow \infty$.

Next, in almost sure convergence, we say that $P[X_n \rightarrow X]=1$ is satisfied at $n \rightarrow \infty$. While the above sure convergence means it converges for all $n$, in almost sure convergence, there may be cases where some don't converge, but ultimately the sum of those probabilities is 1 according to Bernoulli's theorem.

And in Mean square convergence, $E[(X_n-X)^2]=0$ holds, which is a naturally established problem since we said above that it eventually converges in the case of $n \rightarrow \infty$.

---

### Central limit theorem(CLT)

When $X_i$ are i.i.d and satisfy $E[X_i]=\mu, Var(X_i)=\sigma^2$, $S_n=X_1+\cdots+X_n$, CLT says that $S_n \rightarrow \text{(gaussian r.v)} N(n\mu, n\sigma^2)$, meaning it eventually follows a Gaussian distribution when $n \rightarrow \infty$.

To prove this, we need to show that $z_n \triangleq \frac{S_n-n\mu}{\sqrt{n} \cdot \sigma} \rightarrow N(0,1)$, and we substitute the characteristic value of $z_n$ for $E[e^{jwz_n}]$ as follows:

$$
E[e^{jw\frac{\sum_{i=1}^{n}(X_i-\mu)}{\sqrt{n} \cdot \sigma}}] \\
=E[\prod_{i=1}^{n} e^{jw\frac{(X_i-\mu)}{\sqrt{n} \cdot \sigma}}] \\
=\prod_{i=1}^{n} E[e^{jw\frac{(X_i-\mu)}{\sqrt{n} \cdot \sigma}}] \\
=\prod_{i=1}^{n} E[1+\frac{jw}{\sigma \cdot \sqrt{n}}(x_i-\mu)+\cdots +R(u)] \\
=\prod_{i=1}^{n} (1-\frac{w^2}{2n}) \\
=(1-\frac{w^2}{2n})^n \\
=e^{-\frac{w^2}{2n}}
$$

As such, the sum inside the exponential can be changed to a product and can be expanded.

---

### Random process

$X(t, \zeta) \in R$ means that the random variable changes according to the time parameter $t$. For example, when $\zeta \in [0, 1]$ and $\zeta=0.347802...$, the time parameter $t$ of $X(t,\zeta)$ is discrete and represents decimal places.

At this time, we can see that it has values like $X(1,\zeta)=3, X(2, \zeta)=4$, etc. This will be the same even if $\zeta$ changes. We define it as $X_n(\zeta)$ when discrete and $X(t,\zeta)$ when continuous.

#### Important r.p

For an i.i.d random process, it's possible to multiply each $F_{x_1, \dots, x_k}(x_1, \cdots, x_k)$ separately. This means that the mean is $m_x(n)=m$ and the covariance can be expressed as $C_x(n_1, n2)=\begin{cases} 0 & n_1 \ne n_2\\ \sigma^2 & n_1 = n_2 \end{cases}$.

Next, for the sum process $S_n = \sum_{i=1}^{n} X_i$, we have $m_s(n)=E[S_n]=n*m$. The variance is $Var(S_n)=n*\sigma^2_x$.

#### Independent Increment

The definition states that if $X(t)$ is incrementally independent and for all $k$ where $t_1 \le t_2 \le \cdots \le t_k$, then $X(t_1), X(t_2)-X(t_1), \dots, X(t_k)-X(t_{k-1})$ are all independent.

#### Stationary Increment

The definition states that if $X(t)$ has equal probabilities $P[X(t_2)-X(t_1)=c]=P[X(t_2+\tau)-X(t_1+\tau)=c]$, then we consider that it has the same probability of having some constant term for the time difference.

#### Poisson

When $N(t)$ represents the number of events, it can be defined as $M_N(t)=E[N(t)]=\lambda*t$, $Var(N(t))=\lambda*t$, $C_N(t_1, t_2)=E[(N(t_1)-\lambda*t_1)(N(t_2)-\lambda*t_2)]=m^2(t_1, t_2)*\lambda$.

#### Wiener r.p

When $D_i=\begin{cases} 1 \\ -1 \end{cases}$ is determined with equal probability of one-half, a step-like graph is generated because $S_n=\sum_{i=1}^n D_i$. If we denote time as $\delta$ and height as $h$, then $h$ converges to $\sqrt{\alpha \delta}$.

And the mean satisfies $E[S_n]=n*E[D_i]=0$ while the variance satisfies $Var(S_n)=n*Var(D_i)=n$.

---

### References

[Original Source #1](https://www.youtube.com/watch?v=Kjhvx1z3TjM&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=17)

[Original Source #2](https://www.youtube.com/watch?v=tPoZcVAVJF8&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=18)

[Original Source #3](https://www.youtube.com/watch?v=vK7RjVR_Pl0&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=19)

[Original Source #4](https://www.youtube.com/watch?v=PXxzc92MMaw&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=20)

[Original Source #5](https://www.youtube.com/watch?v=nPApzzftm5I&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=21)


