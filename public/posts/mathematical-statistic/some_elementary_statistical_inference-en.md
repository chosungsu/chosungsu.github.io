---
title: 'Some elementary statistical inference'
date: '2023-05-12'
tags: ['Mathematical statistics', 'lecture']
---

### Sampling and Statistics

Information about an unknown distribution or parameter of $X$ is obtained from a sample of $X$. Sample observations $X_1, X_2, \dots, X_n$ have the same distribution as $X$, and $n$ denotes the sample size. Often we assume the sample observations $X_1, X_2, \dots, X_n$ are mutually independent; in this case the sample is called a random sample. If they are independent and identically distributed (i.i.d.), these random variables constitute a random sample of size $n$ drawn from a common distribution. A function of the sample used to summarize the information in the sample is called a statistic. A sample function $T = T(X_1, X_2, \dots, X_n)$ is a statistic, and $t$ is a realization of $T$, i.e., $t = T(x_1, x_2, \dots, x_n)$.

#### Point estimators

Let $X_1, X_2, \dots, X_n$ be a random sample from a random variable $X$ with density or mass function of the form $f(x; \theta)$ or $p(x; \theta)$. In this situation, it is natural to consider a statistic $T$ as an estimator of $\theta$. We call $T$ a point estimator of $\theta$, and $t$ an estimate of $\theta$.

Some properties of point estimators:

- If a statistic $T$ satisfies $\mathbf{E(T) = \theta}$, then $T$ is called an unbiased estimator of $\theta$.
- The information in the sample and the parameter $\theta$ are related through the joint distribution of the random sample, $\prod_{i=1}^n f(x_i; \theta)$. Viewed as a function of $\theta$, this is called the likelihood function:

$$
\mathbf{L(\theta) = L(\theta; x_1, x_2, \dots, x_n) = \prod_{i=1}^n f(x_i; \theta)}
$$

As an estimate of $\theta$, the value of $\theta$ that maximizes $L(\theta)$ is often used. If this value is unique, it is called the maximum likelihood estimator (MLE) and denoted by $\mathbf{\hat{\theta}}$. In practice, it is often easier to maximize the log-likelihood $\mathbf{l(\theta) = \log L(\theta)}$. Since $\log$ is strictly increasing, the maximizer of $L(\theta)$ also maximizes $l(\theta)$.

- If the MLE of parameter $\theta$ is $\hat{\theta}$, then for a specified function $g$, the MLE of $\eta = g(\theta)$ is $\mathbf{\hat{\eta} = g(\hat{\theta})}$.

---

### Confidence Intervals

Suppose the random variable $X$ of interest has pdf $f(x; \theta)$ with unknown $\theta \in \Omega$. When estimating $\theta$ by a statistic $\hat{\theta} = \hat{\theta}(X_1, \dots, X_n)$ from a sample, the probability that $\hat{\theta}$ equals the true value $\theta$ exactly is small. What we need is an estimate of the estimation error, i.e., how far $\hat{\theta}$ deviates from $\theta$.

For a specified $\mathbf{0 < \alpha < 1}$, let $L = L(X_1, \dots, X_n)$ and $U = U(X_1, \dots, X_n)$ be two statistics. If the following holds, the interval $\mathbf{(L, U)}$ is called a $(1 - \alpha)\times 100\%$ confidence interval for $\mathbf{\theta}$:

$$
\mathbf{1 - \alpha = P_{\theta}[\theta \in (L, U)]}
$$

The quantity $\mathbf{1 - \alpha}$ is called the confidence coefficient or confidence level. The expected length $E_{\theta}(U - L)$ is a measure of the efficiency of a confidence interval.

By the central limit theorem (CLT), for a random sample $X_1, \dots, X_n$ drawn from a distribution with mean $\mu$ and finite variance $\sigma^2$, the distribution function of $\mathbf{W_n = \frac{\bar{X} - \mu}{\sigma/\sqrt{n}}}$ converges to the standard normal distribution function $\Phi$ as $n \to \infty$. When $n$ is sufficiently large, replacing $\sigma$ by the sample standard deviation $S$, the statistic $\mathbf{Z_n = \frac{\bar{X} - \mu}{S/\sqrt{n}}}$ is approximately $\mathbf{N(0, 1)}$ as well.

#### Intervals for difference in Means

For two independent random samples $X_1, \dots, X_{n_1}$ (mean $\mu_1$) and $Y_1, \dots, Y_{n_2}$ (mean $\mu_2$), we seek a confidence interval for the difference $\mathbf{\Delta = \mu_1 - \mu_2}$. The estimator is $\mathbf{\hat{\Delta} = \bar{X} - \bar{Y}}$.

Using the CLT, an approximate $(1 - \alpha)\times 100\%$ confidence interval is

$$
\mathbf{(\bar{x} - \bar{y}) \pm z_{\alpha/2} \sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}}
$$

If $X \sim N(\mu_1, \sigma^2)$ and $Y \sim N(\mu_2, \sigma^2)$ (equal variances $\sigma^2$), we can also define the pivot

$$
\mathbf{T = \frac{(\bar{X} - \bar{Y}) - (\mu_1 - \mu_2)}{S_p \sqrt{\frac{1}{n_1} + \frac{1}{n_2}}}}
$$

where $S_p^2$ is the pooled variance estimator: $S_p^2 = \frac{(n_1 - 1)S_1^2 + (n_2 - 1)S_2^2}{n_1 + n_2 - 2}$. Then $\mathbf{T}$ follows a $\mathbf{t}$-distribution with degrees of freedom $\mathbf{n_1 + n_2 - 2}$.

#### Intervals for discrete distributions

Let $X_1, X_2, \dots, X_n$ be a random sample from a discrete random variable $X$ with pmf $p(x; \theta)$, $\theta \in \Omega$. Let $F_T(t; \theta)$ denote the cdf of an estimator $T = T(X_1, \dots, X_n)$ of $\theta$. Assume that for all $t$ in the support of $T$, $F_T(t; \theta)$ is nonincreasing in $\theta$ and continuous in $\theta$.

Given $0 < \alpha_1$ and $0 < \alpha_2$ with $\alpha = \alpha_1 + \alpha_2 < 0.5$, define $\underline{\theta}$ and $\overline{\theta}$ as the solutions to

$$
\begin{aligned}
& \mathbf{F_T(t^-; \underline{\theta}) = 1 - \alpha_2} \\
& \mathbf{F_T(t; \overline{\theta}) = \alpha_1}
\end{aligned}
$$

Here $\mathbf{T^-}$ denotes a statistic that takes values one step below those in the support of $T$ to handle discontinuities of the discrete cdf. Then the confidence coefficient satisfies

$$
\begin{aligned}
& P[\underline{\theta} < \theta < \overline{\theta}] \\
&= 1 - P[\{\underline{\theta} \ge \theta\} \cup \{\overline{\theta} \le \theta\}] \\
&= 1 - P[\underline{\theta} \ge \theta] - P[\overline{\theta} \le \theta] \\
&\ge 1 - P[F_T(T^-; \theta) \le 1 - \alpha_2] - P[F_T(T; \theta) \ge \alpha_1]
\end{aligned}
$$

Because the probability mass of $T$ is scattered depending on the true value of $\theta$, its cdf is a step function; exact probabilities $\alpha_1$ and $1-\alpha_2$ cannot generally be guaranteed. However, by continuity and monotonicity of $F_T(t; \theta)$ in $\theta$, we can ensure

$$
\mathbf{P[\underline{\theta} < \theta < \overline{\theta}] \ge 1 - \alpha_1 - \alpha_2}
$$

i.e., the confidence coefficient of the interval is at least $\mathbf{1 - \alpha}$.

---

### Order statistics

Let $X_1, X_2, \dots, X_n$ be a random sample from a continuous distribution. Arrange them in ascending order $Y_1 < Y_2 < \dots < Y_n$; $Y_i$ is called the $i$-th order statistic. The joint pdf of $Y$ is

$$
\begin{cases}
 g(y_1, y_2, \dots, y_n) = n! f(y_1) f(y_2) \cdots f(y_n), \\
 0, \text{ otherwise}
\end{cases}
$$

There are $n!$ possible permutations mapping the $X_i$ to the $Y_i$, and the absolute value of the Jacobian of each transformation is 1, yielding the factor $n!$.

#### Quantiles

For a random variable $X$ with a continuous cdf $F(x)$, define the $p$-th quantile by $\mathbf{\xi_p = F^{-1}(p)}$.

If we denote the cdf of $Y_k$ by $F(Y_k)$, then $E(F(Y_k)) = \frac{k}{n+1}$. Since $p \approx \frac{k}{n+1}$, $Y_k$ is called the $p$-th sample quantile, an estimator of the $p$-th population quantile $\xi_p$.

A q-q plot is obtained by plotting the sample order statistic $y_k$ against the theoretical quantile $\xi_{Z, p_k} = F^{-1}(p_k)$ derived from a theoretical cdf $F(z)$.

If we consider two order statistics $Y_i$ and $Y_j$ with $i < [(n+1)p] < j$, then the probability that $Y_i < \xi_p < Y_j$ equals the probability that, in $n$ independent trials, the number of successes $(p = P(X < \xi_p))$ lies between $i$ and $j-1$:

$$
\begin{aligned}
&P(Y_i < \xi_p < Y_j) \\
&= \sum_{w=i}^{j-1} \binom{n}{w} p^w (1 - p)^{n-w}
\end{aligned}
$$

---

### Hypothesis testing

Suppose the random variable $X$ of interest has density $f(x; \theta)$ with unknown parameter $\theta \in \Omega$. Based on theory or preliminary experimentation, we may wish to determine whether $\theta$ lies in $\omega_0$ or $\omega_1$. We set up the hypotheses

$$
\begin{aligned}
& H_0 : \theta \in \omega_0 \\
& H_1 : \theta \in \omega_1
\end{aligned}
$$

$\mathbf{H_0}$ is the null hypothesis, often representing no change or no difference relative to the past. $\mathbf{H_1}$ is the alternative hypothesis, representing change or difference, and is often the research worker's hypothesis.

<img src="https://media.geeksforgeeks.org/wp-content/uploads/20250527152427210496/Hypothesis-Testing.webp" alt="Example Image" style="display: block; margin: 0 auto; height:150;" />

Rejecting $\mathbf{H_0}$ when it is true is a Type I error; accepting it when $\mathbf{H_1}$ is true is a Type II error. Typically, Type I errors are considered more serious.

The significance level $\alpha$ is defined by

$$
\mathbf{\alpha = \max_{\theta \in \omega_0} P_{\theta}[(X_1, \dots, X_n) \in C]}
$$

A rejection region should be chosen to maximize power while controlling the significance level.

#### Two-sided tests

For a random variable $X$ with mean $\mu$ and finite variance $\sigma^2$, consider testing

$$
\begin{aligned}
& H_0 : \mu = \mu_0 \\
& H_1 : \mu \ne \mu_0
\end{aligned}
$$

If $\mu \ne \mu_0$, reject $H_0$ when $\bar{X}$ is too small or too large relative to $\mu_0$:

$$
\frac{|\bar{X} - \mu_0|}{S/\sqrt{n}} \ge z_{\alpha/2}
$$

This test has approximate level $\alpha$ by the CLT.

#### p-value

Given an observed value $x$ of a test statistic $X$, the p-value is the probability, assuming $H_0$ is true, of obtaining a value at least as extreme as the observed $x$:

$$
\mathbf{\text{p-value} = P_{H_0}(X \ge x)} \quad \text{(tail adapted to the test)}
$$

$\mathbf{H_0}$ is rejected at any significance level $\alpha$ greater than or equal to the p-value. For example, if $\text{p-value}=0.048$, the test rejects at $\alpha=0.05$ but not at $\alpha=0.01$.

---

### Chi-square tests

For independent random variables $X_1, \dots, X_n$ with $X_i \sim N(\mu_i, \sigma_i^2)$, the random variable $\sum_{i=1}^n \left(\frac{X_i - \mu_i}{\sigma_i}\right)^2$ follows a $\mathbf{\chi^2(n)}$ distribution.

If $X_1 \sim b(n, p_1)$, then $\mathbf{Q_1 = \frac{(X_1 - n p_1)^2}{n p_1} + \frac{(X_2 - n p_2)^2}{n p_2}}$, where $X_2 = n - X_1$ and $p_2 = 1 - p_1$, is approximately $\mathbf{\chi^2(1)}$ as $n \to \infty$. In general,

$$
Q_{k-1} = \sum_{i=1}^k \frac{(X_i - n p_i)^2}{n p_i}
$$

has approximately a $\chi^2(k-1)$ distribution. To use this approximation reliably, each expected count $\mathbf{n p_i}$ should be at least 5. For example, to test whether a fair die has $P(A_i) = p_{i0} = 1/6$, with $n=60$ and $k=6$, each expected count is $\mathbf{n p_{i0} = 10}$. With degrees of freedom $6-1=5$, if the observed $Q_5 = 15.6$ exceeds the critical value $11.0705$ at $\alpha=0.05$, then $H_0$ is rejected.

For a test of independence when classifying by two criteria $A$ with categories $(A_1, \dots, A_a)$ and $B$ with categories $(B_1, \dots, B_b)$, the null hypothesis of independence is $\mathbf{H_0 : p_{ij} = P(A_i \cap B_j) = P(A_i)P(B_j) = p_{i \cdot} p_{\cdot j}}$.

Estimate the parameters using row and column marginals:

$$
\begin{aligned}
& \hat{p}_{i \cdot} = X_{i \cdot} / n \\
& \hat{p}_{\cdot j} = X_{\cdot j} / n
\end{aligned}
$$

The number of estimated parameters is $\mathbf{(a-1) + (b-1) = a+b-2}$. With $k=ab$ total categories, the degrees of freedom are $\text{df} = ab - 1 - (a+b-2) = \mathbf{(a-1)(b-1)}$.

Thus, the test statistic is

$$
\mathbf{\sum_{j=1}^b \sum_{i=1}^a \frac{\left(X_{ij} - E_{ij}\right)^2}{E_{ij}}}
$$

---

### Method of Monte Carlo

This technique has long been used to simulate complex processes and to investigate the finite-sample properties of statistical methods. In the last three decades in particular, it has become central in areas such as bootstrap and modern Bayesian inference.

For the distribution function $F(x) = 1 - e^{-x/\beta}$, the inverse is $\mathbf{F^{-1}(u) = -\beta \log(1 - u)}$. Therefore, if $U \sim \text{Uniform}(0, 1)$ and we set $\mathbf{X = -\beta \log(1 - U)}$, we obtain random draws from the $\Gamma(1, \beta)$ distribution.

Monte Carlo methods can be used to estimate integrals $\int_a^b g(x) dx$:

$$
\mathbf{\int_a^b g(x) dx = (b - a) E[g(X)]}
$$

where $X \sim \text{Uniform}(a, b)$. Then $\mathbf{\bar{Y} = \frac{1}{n} \sum_{i=1}^n (b - a)g(X_i)}$ is an unbiased estimator of the integral.

Since the inverse cdf of the normal distribution does not have a closed form, transformations such as the Box–Muller method are used. For $Y_1, Y_2 \sim \text{Uniform}(0, 1)$,

$$
\begin{aligned}
& X_1 = (-2 \log Y_1)^{1/2} \cos(2\pi Y_2) \\
& X_2 = (-2 \log Y_1)^{1/2} \sin(2\pi Y_2)
\end{aligned}
$$

Then $X_1$ and $X_2$ are independent standard normal random variables $N(0, 1)$.

#### Accept–Reject Algorithm

- Generate $Y$ from a pdf $g(y)$.
- Generate $U \sim \text{Uniform}(0, 1)$.
- If $\mathbf{U \le \frac{f(Y)}{M g(Y)}}$, accept $X = Y$.

---

### References

[Original source #1](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)


