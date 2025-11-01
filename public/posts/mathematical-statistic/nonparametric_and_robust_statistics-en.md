---
title: 'Nonparametric and Robust Statistics'
date: '2023-05-29'
tags: ['Mathematical statistics', 'lecture']
---

### Location models

We present nonparametric procedures for location problems. When we think of a parameter as a function of the cdf or pdf of a given random variable, we call it a functional.

$T(F_X)$ is called a location functional when it satisfies both of the following conditions:

$\rightarrow$ If $Y = X + a$, then $T(F_Y) = T(F_X) + a$

$\rightarrow$ If $Y = aX$, then $T(F_Y) = aT(F_X)$

When we call $\theta_X = T(F_X)$ a location functional, observations $X_1, \dots, X_n$ are said to follow a location model when they follow

$$
X_i = \theta_X + \epsilon_i
$$

where $\epsilon_1, \dots, \epsilon_n$ are $\text{i.i.d.}$ random variables with pdf $f(x)$ such that $T(F_\epsilon) = 0$.

When a distribution is symmetric, all location functionals have the same value. When the distribution of $X$ is symmetric about $a$ and $T(F_X)$ is any location functional,

$$
T(F_X) = a
$$

holds.

---

### Sample Median and Sign Test

Assume $X_1, X_2, \dots, X_n$ is a random sample following the location model $X_i = \theta + \epsilon_i$, where the median of $\epsilon_i$ is 0. $\theta$ is the median of $X_i$.

#### Sign Test

To test the one-sided hypothesis $H_0: \theta = \theta_0$ against $H_1: \theta > \theta_0$, we consider the statistic

$$
S(\theta_0) = \#\{X_i > \theta_0\},
$$

which counts the number of cases where $X_i - \theta_0$ is positive. Under the null hypothesis, $I(X_i > \theta_0)$ follows a Bernoulli distribution $b(1, 1/2)$. $E(S(\theta_0)) = n/2$ and $\text{Var}(S(\theta_0)) = n/4$. The sign test is called distribution-free because it does not depend on the form of the distribution of $X_i$.

#### Power Function and Monotonicity

$S(\theta) = \#\{X_i > \theta\}$ is a decreasing step function of $\theta$. The power function $\gamma(\theta)$ of the sign test for the one-sided hypothesis $H_0: \theta \le \theta_0$ against $H_1: \theta > \theta_0$ is a nondecreasing function of $\mathbf{\theta}$.

Under the alternative hypothesis $\theta = \theta_1$, $S(\theta_0)$ follows a $b(n, p_1)$ distribution with $p_1 = P_{\theta_1}(X > \theta_0)$. Therefore, under the alternative hypothesis, it is not distribution-free.

#### Asymptotic Relative Efficiency, ARE

Local alternatives are used to compare test performance under $H_{1n}: \theta_n = \delta/\sqrt{n}$ using the asymptotic power lemma. Under local hypotheses, the limit of the power of the sign test with large samples and significance level $\alpha$ is

$$
\lim_{n\to\infty} \gamma(\theta_n) = 1 - \Phi(z_\alpha - \delta \tau_S^{-1}),
$$

where $\tau_S = 1/[2f(0)]$ and $f(0)$ is the value of the pdf of the error $\epsilon_i$ at the median.

The ARE of two tests $S$ and $t$ is defined as the ratio of sample sizes needed to achieve the same power $\gamma^*$.

#### Confidence Interval for the Median

By inverting the sign test, we can obtain a confidence interval for the median $\theta$. Using the fact that $S(\theta)$ follows a $b(n, 1/2)$ distribution, we choose $c_1$ such that $P_\theta[c_1 < S(\theta) < n - c_1] = 1 - \alpha$.

Due to the monotonicity of $S(\theta)$, this inequality is equivalent to the following inequality for order statistics:

$$
\mathbf{Y_{c_1+1} \le \theta < Y_{n-c_1}}.
$$

Therefore, $Y_{c_1+1}, Y_{n-c_1}$ is a $(1-\alpha)100\%$ confidence interval for $\theta$.

---

### Signed-Rank Wilcoxon

This test makes the additional assumption that the pdf $f(x)$ of the error $\epsilon_i$ of $X_i$ is symmetric about 0.

#### Wilcoxon Statistic

To test the one-sided hypothesis $H_0: \theta = 0$ against $H_1: \theta > 0$, we use the statistic

$$
T = \sum_{i=1}^n \text{sgn}(X_i) R_{|X_i|},
$$

where $R_{|X_i|}$ denotes the rank of $|X_i|$ among $|X_1|, \dots, |X_n|$, and ranks are assigned from low to high values. Under the null hypothesis, we expect $T$ to be near 0, while under the alternative hypothesis, we expect more positive $X_i$ values to receive higher ranks, so we expect $T$ to have a large positive value. We reject $H_0$ if $T \ge c$.

The distribution of the Wilcoxon statistic has the following properties:

$\rightarrow$ It is distribution-free and has a pmf symmetric about 0.

$\rightarrow$ It has mean $E_{H_0}[T] = 0$ and variance $\text{Var}_{H_0}(T) = n(n+1)(2n+1)/6$.

$\rightarrow$ It is asymptotically $N(0,1)$.

Using the sum of ranks of positive $\mathbf{X_i}$, $\mathbf{T^+}$, we can linearly transform as

$$
T = 2T^+ - \frac{n(n+1)}{2}.
$$

It has $E_{H_0}(T^+) = n(n+1)/4$ and $\text{Var}_{H_0}(T^+) = n(n+1)(2n+1)/24$.

#### Asymptotic Relative Efficiency, ARE

The efficiency $c_{T^+}$ of the Wilcoxon statistic $T^+$ is

$$
c_{T^+} = \lim_{n\to\infty} \frac{\mu'_{T^+}(0)}{\sqrt{n}\sigma_{T^+}(0)} = \sqrt{12} \int_{-\infty}^\infty f^2(x) dx.
$$

As tails become heavier (as $\epsilon$ increases), the $ARE(W, t)$ of the Wilcoxon test becomes larger than the $t$-test.

---

### Mann-Whitney-Wilcoxon Procedure

Let $X_1, \dots, X_{n_1}$ be a sample following cdf $F(x)$ and $Y_1, \dots, Y_{n_2}$ be a sample following cdf $G(x)$. The null hypothesis assumes that the two samples have the same distribution: $F(x) = G(x)$.

#### Location Shift model

$G(x) = F(x - \Delta)$. $\Delta$ represents the shift between distributions, and $P(Y \le y) = F(y - \Delta)$ holds. Here, the null hypothesis assumes $\Delta=0$, and $\Delta = T(F_Y) - T(F_X)$ for any choice of location functional $T$. That is, regardless of how location is measured, the shift between the two distributions is constant.

#### MWW Statistic

We combine the two samples and assign ranks to all $n = n_1 + n_2$ observations. We define the sum of ranks of $Y_j$, $W$, as the MWW statistic:

$$
W = \sum_{j=1}^{n_2} R(Y_j).
$$

Under the null hypothesis, ranks are expected to be evenly distributed between $X$ and $Y$, but under the alternative hypothesis, $Y_j$ is expected to receive larger values (ranks), so we reject $H_0$ if $W \ge c$.

The properties of the statistic are as follows:

$\rightarrow$ It is distribution-free and has a pmf symmetric about 0.

$\rightarrow$ It has mean $E_{H_0}[W] = n_2(n+1)/2$ and variance $\text{Var}_{H_0}(W) = n_1n_2(n+1)/12$.

$\rightarrow$ It has a linear relationship with the $U$-statistic, which counts the number of pairs where $Y_j > X_i$. $U = \#_{i,j} \{Y_j > X_i\}$.

The MWW procedure provides nonparametric inference about location shifts between two samples, and is more powerful and efficient than the $\mathbf{t}$-test, especially when distributions are not normal or have heavy tails.

#### Asymptotic Relative Efficiency, ARE

Under the alternative hypothesis $H_{1n}: \Delta_n = \delta/\sqrt{n}$ where $n_1/n \to \lambda_1$, $n_2/n \to \lambda_2$ (sample size ratios remain constant), the efficiency $c_U$ of MWW is computed:

$$
c_U = \sqrt{12\lambda_1\lambda_2} \int_{-\infty}^\infty f^2(x) dx.
$$

#### Hodges-Lehmann estimation

The estimator of $\Delta$ obtained by inverting the MWW test statistic is the value satisfying $U(\Delta) = n_1n_2/2$. This equals the median of all $Y_j - X_i$ differences:

$$
\hat{\Delta}_U = \text{med}_{i,j} \{Y_j - X_i\}.
$$

The confidence interval $(D_{c+1}, D_{n_1n_2-c})$ is a $(1-\alpha)100\%$ confidence interval for $\Delta$, where $D_i$ are the ordered differences $Y_j - X_i$, and $c$ is an integer satisfying $P_\Delta[U(\Delta) \le c] = \alpha/2$.

---

### General Rank Scores

#### Rank score statistic, $W_{\Phi}$

A nondecreasing function $\phi(u)$ defined on $(0, 1)$ is called a score function:

$$
\int_0^1 \phi(u) du = 0, \quad \int_0^1 \phi^2(u) du = 1.
$$

We define rank scores as $a_\phi(i) = \phi[i/(n+1)]$. The general rank score statistic is

$$
W_\phi = \sum_{j=1}^{n_2} a_\phi(R(Y_j)),
$$

where $R(Y_j)$ is the rank of $Y_j$ in the combined sample. Using the linear score function $\phi(u) = \sqrt{12}(u - 1/2)$, $W_\phi$ is linearly related to the $W$ statistic (Mann–Whitney–Wilcoxon) and becomes the MWW test statistic.

Properties of the statistic include mean $E_{H_0}(W_{\Phi}) = 0$ and variance $\text{Var}_{H_0}(W_{\Phi}) = \frac{n_1n_2}{n(n-1)}S^2_a$, where $s_a^2 = \sum_{i=1}^n a_\phi^2(i)$.

---

### Measures of Association

#### Kendall's $\tau$

Kendall's $\tau$ is a measure of monotonicity between $X$ and $Y$.

For two independent pairs of observations $(X_1, Y_1)$ and $(X_2, Y_2)$, if $\text{sgn}\{(X_1 - X_2)(Y_1 - Y_2)\} = 1$, this indicates consistency (same order), and if $\text{sgn}\{(X_1 - X_2)(Y_1 - Y_2)\} = -1$, this indicates inconsistency (opposite order):

$$
\begin{aligned}
&\tau \\
&= P[\text{sgn} \{(X_1 - X_2)(Y_1 - Y_2)\} = 1] \\
&- P[\text{sgn} \{(X_1 - X_2)(Y_1 - Y_2)\} = -1]
\end{aligned}
$$

Kendall's $\tau$ is defined in this way, and in the range $-1 \le \tau \le 1$, $\tau > 0$ indicates increasing monotonicity and $\tau < 0$ indicates decreasing monotonicity. If $X$ and $Y$ are independent, $\tau = 0$.

#### Spearman's $\rho$

Spearman's $\rho_S$ is an analog of the correlation coefficient computed using ranks. It measures linear association between the ranks of $X$ and $Y$:

$$
r_S = \frac{\sum_{i=1}^n (R(X_i) - \frac{n+1}{2})(R(Y_i) - \frac{n+1}{2})}{n(n^2 - 1)/12}.
$$

If there is a strictly increasing monotonic relationship, $r_S = 1$, and if there is a strictly decreasing monotonic relationship, $r_S = -1$.

---

### References

[Original source #1](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)
