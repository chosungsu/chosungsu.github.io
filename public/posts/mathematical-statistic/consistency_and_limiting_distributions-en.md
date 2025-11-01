---
title: 'Consistency and Limiting distributions'
date: '2023-05-15'
tags: ['Mathematical statistics', 'lecture']
---

### Convergence in Probability

We formalize that a sequence of random variables $\{X_n\}$ "gets close" to another random variable $X$ as $n \to \infty$ by

$$
\lim_{n\to\infty} P[|X_n - X| \ge \varepsilon] = 0.
$$

By the Weak Law of Large Numbers, if $\{X_n\}$ is an i.i.d. sequence with common mean $\mu$ and variance $\sigma^2 < \infty$, and if the sample mean is $\mathbf{\bar{X}_n = n^{-1} \sum_{i=1}^n X_i}$, then

$$
\mathbf{\bar{X}_n \xrightarrow{P} \mu}.
$$

Indeed, $E(\bar{X}_n)=\mu$ and $\operatorname{Var}(\bar{X}_n)=\sigma^2/n$, and by Chebyshev’s inequality

$$
\begin{aligned}
& P(|\bar{X}_n - \mu| \ge \varepsilon) \\
& \le \frac{\operatorname{Var}(\bar{X}_n)}{\varepsilon^2} \\
&= \frac{\sigma^2}{n\varepsilon^2} \to 0.
\end{aligned}
$$

#### Sampling and Statistics

A statistic $T$ is used as a point estimator of an unknown parameter $\theta$. Two properties:

- $T$ is an unbiased estimator of $\theta$ if $\mathbf{E(T) = \theta}$.
- $\{T_n\}$ is a consistent estimator of $\theta$ if $\mathbf{T_n \xrightarrow{P} \theta}$; i.e., as $n$ increases, $T_n$ converges in probability to $\theta$.

---

### Convergence in Distribution

Convergence in probability shows that a statistic converges to the parameter, but not how precisely we can assess its error. A sequence $\{X_n\}$ converges in distribution to a random variable $X$ if, for the cdfs $F_{X_n}$ of $X_n$ and $F_X$ of $X$, we have for every continuity point $x \in C(F_X)$,

$$
\lim_{n\to\infty} F_{X_n}(x) = F_X(x).
$$

Example: If $X_n$ puts all mass at $1/n$ and $X$ puts all mass at 0, then $X_n \xrightarrow{D} X$. At the discontinuity $x=0$, $\lim F_{X_n}(0) = 0 \ne F_X(0)=1$, but by definition we only require agreement at continuity points of $F_X$.

Some relations between convergence in distribution and in probability:

- If $X_n \xrightarrow{P} X$ then $\mathbf{X_n \xrightarrow{D} X}$ (hence the term weak convergence).
- If $X_n \xrightarrow{D} X$ and $g$ is continuous on the support of $X$, then $\mathbf{g(X_n) \xrightarrow{D} g(X)}$.
- By Slutsky’s theorem, if $X_n \xrightarrow{D} X$, $A_n \xrightarrow{P} a$, and $B_n \xrightarrow{P} b$, then $\mathbf{A_n + B_n X_n \xrightarrow{D} a + bX}$.

#### Bounded in Probability

A sequence $\{X_n\}$ is bounded in probability if for every $\varepsilon > 0$ there exist $B_{\varepsilon} > 0$ and an integer $N_{\varepsilon}$ such that for all $n \ge N_{\varepsilon}$, $P(|X_n| \le B_{\varepsilon}) \ge 1 - \varepsilon$.

#### $\Delta$ Method

Used in asymptotic theory to obtain the distribution of functions of estimators.

- $\mathbf{Y_n = o_p(X_n)}$: $\mathbf{Y_n / X_n \xrightarrow{P} 0}$ (little-o in probability).
- $\mathbf{Y_n = O_p(X_n)}$: $\mathbf{Y_n / X_n}$ is bounded in probability.
- If $\mathbf{\sqrt{n}(X_n - \theta) \xrightarrow{D} N(0, \sigma^2)}$ and $g(x)$ is differentiable at $\theta$ with $g'(\theta) \ne 0$, then

$$
\mathbf{\sqrt{n}(g(X_n) - g(\theta)) \xrightarrow{D} N(0, \sigma^2 (g'(\theta))^2)}.
$$

Thus, if $X_n$ is asymptotically normal, then so is $g(X_n)$ with variance scaled by $(g'(\theta))^2$.

---

### Central Limit Theorem

If $X_1, \dots, X_n$ are drawn from a normal distribution, the standardized sum

$$
Y_n = \frac{\sum_{i=1}^n X_i - n\mu}{\sigma \sqrt{n}} = \frac{\sqrt{n}(\bar{X}_n - \mu)}{\sigma}
$$

is exactly standard normal $N(0,1)$ for every $n$.

The Central Limit Theorem (CLT) extends this to general distributions: regardless of the original distribution of the $X_i$, for sufficiently large $n$ the sample mean is asymptotically standard normal.

Using mgfs, $M_{Y_n}(t) = \left[m\!\left(\tfrac{t}{\sigma\sqrt{n}}\right)\right]^n$. Expanding $m(t)$ in a Taylor series,

$$
m\!\left(\frac{t}{\sigma\sqrt{n}}\right) = 1 + \frac{t^2}{2n} + \frac{[m''(\xi) - \sigma^2]t^2}{2n\sigma^2},
$$

and as $n \to \infty$, $\xi \to 0$ so $\lim_{n\to\infty}[m''(\xi) - \sigma^2] = 0$. Hence $\lim_{n\to\infty} M_{Y_n}(t) = \mathbf{e^{t^2/2}}$, the mgf of $N(0,1)$, yielding $Y_n \xrightarrow{D} N(0,1)$.

---

### Multivariate distributions

For a $p$-dimensional random vector sequence $X_n$ to converge in probability to $X$, it must be that, for every $\varepsilon > 0$,

$$
\mathbf{\lim_{n\to\infty} P(|\mathbf{X}_n - \mathbf{X}| \ge \varepsilon) = 0}.
$$

This is equivalent to componentwise convergence: $X_n \xrightarrow{P} X$ iff $X_{nj} \xrightarrow{P} X_j$ for all $j=1,\dots,p$.

If $X_n \xrightarrow{D} X$ and $g(x)$ is continuous on the support of $X$, then $g(X_n) \xrightarrow{D} g(X)$. Convergence in distribution implies marginal convergence.

By the multivariate CLT (MCLT), if $\{\mathbf{X}_i\}$ is an i.i.d. sequence with common mean vector $\mu$ and positive-definite covariance matrix $\Sigma$, then

$$
\mathbf{Y}_n = \frac{1}{\sqrt{n}} \sum_{i=1}^n (\mathbf{X}_i - \mathbf{\mu}) = \sqrt{n}(\mathbf{\bar{X}} - \mathbf{\mu})
$$

converges in distribution to the multivariate normal $\mathbf{N_p(\mathbf{0}, \mathbf{\Sigma})}$ with mean vector $\mathbf{0}$ and covariance matrix $\mathbf{\Sigma}$.

---

### References

[Original source #1](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)


