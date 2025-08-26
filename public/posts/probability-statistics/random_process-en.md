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

### References

[Original Source #1](https://www.youtube.com/watch?v=Kjhvx1z3TjM&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=17)

[Original Source #2](https://www.youtube.com/watch?v=tPoZcVAVJF8&list=PL48-12jNeoLp-yn6k8bRTVdyYyJkALSvu&index=18)



