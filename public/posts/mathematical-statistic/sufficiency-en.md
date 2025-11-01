---
title: 'Sufficiency'
date: '2023-05-22'
tags: ['Mathematical statistics', 'lecture']
---

### Measures of Quality of Estimators

Estimators have properties of consistency and unbiasedness.

An estimator $\mathbf{Y_n}$ is consistent if it converges in probability to the parameter $\mathbf{\theta}$; the MLE has this property. The MLE may not be unbiased, but it is generally asymptotically unbiased when $\mathbf{E(Y_n) = \theta}$.

The minimum variance unbiased estimator (MVUE) selects the estimator with smaller variance when both are unbiased.

#### Loss and Risk functions

From a decision-theoretic perspective, a decision function $\delta(y)$ provides a point estimate (decision) of $\mathbf{\theta}$ based on the observed value of a statistic $\mathbf{Y}$. A loss function $L(\theta, \delta(y))$ is a nonnegative number measuring how severe the discrepancy is between the true value $\mathbf{\theta}$ and the point estimate $\mathbf{\delta(y)}$.

The expected loss is the risk function,

$$
\mathbf{R(\theta, \delta) = E\{L[\theta, \delta(Y)]\}},
$$

and we seek a decision function $\delta$ that minimizes the risk for all $\theta$, though this is generally impossible. By the minimax principle,

$$
\mathbf{\max_{\theta} R[\theta, \delta_0(Y)] \le \max_{\theta} R[\theta, \delta(Y)]},
$$

where $\mathbf{\delta_0}$ minimizes the maximum risk over all possible $\theta$ values.

The likelihood principle: Suppose A and B observe the same data under binomial $\mathbf{b(10, \theta)}$ and geometric $\mathbf{g(\theta)}$ models. A observes $\mathbf{Y=1}$; the estimator $\mathbf{Y/10}$ is unbiased. B observes $\mathbf{Z=10}$; the estimator $\mathbf{1/Z}$ is biased. The likelihoods differ by a constant factor, and the MLEs are identical: $\mathbf{\hat{\theta} = 1/10}$.

---

### Sufficient Statistic for a parameter

A statistic $\mathbf{Y_1 = u_1(X_1, \dots, X_n)}$ is called a sufficient statistic if it partitions the sample space such that, given $\mathbf{Y_1 = y_1}$, the conditional probability distribution of $\mathbf{X_1, X_2, \dots, X_n}$ does not depend on the parameter $\mathbf{\theta}$.

If $X_i \sim \text{Bernoulli}(\theta)$, then $\mathbf{Y_1 = \sum X_i}$ (number of successes) follows a binomial distribution. Computing the conditional probability $\mathbf{P(X_1=x_1, \dots, X_n=x_n | Y_1=y_1)}$:

$$
\begin{aligned}
& P(\mathbf{X}=\mathbf{x} | Y_1=y_1) \\
&= \frac{\theta^{\sum x_i} (1-\theta)^{n-\sum x_i}}{\binom{n}{y_1} \theta^{y_1} (1-\theta)^{n-y_1}}
\end{aligned}
$$

Since $y_1 = \sum x_i$, this equals $\mathbf{1 / \binom{n}{y_1}}$, which is independent of $\mathbf{\theta}$. Therefore, $\mathbf{Y_1 = \sum X_i}$ is a sufficient statistic for $\mathbf{\theta}$.

Using the definition of sufficiency to find $f_{Y_1}(y_1; \theta)$ is often complex. Neyman's factorization theorem simplifies this: a statistic $\mathbf{Y_1 = u_1(X_1, \dots, X_n)}$ is sufficient for $\mathbf{\theta}$ if and only if we can find nonnegative functions $\mathbf{k_1}$ and $\mathbf{k_2}$ such that

$$
\begin{aligned}
& f(x_1; \theta) f(x_2; \theta) \cdots f(x_n; \theta) \\
&= k_1[u_1(x_1, x_2, \dots, x_n); \theta] k_2(x_1, x_2, \dots, x_n)
\end{aligned}
$$

---

### Properties of a Sufficient Statistic

#### Rao–Blackwell theorem

Sufficient statistics play an important role in finding minimum variance unbiased estimators. We apply the general conditional expectation properties used in variance analysis ($E[X_2] = E[E(X_2|X_1)]$ and $\operatorname{Var}(X_2) \ge \operatorname{Var}[E(X_2|X_1)]$) to sufficient statistics.

Let $Y_1$ be a sufficient statistic for parameter $\theta$. If $Y_2$ is an unbiased estimator of $\theta$, then $\mathbf{\phi(Y_1) = E(Y_2|Y_1)}$ is an unbiased estimator with variance less than or equal to that of $Y_2$. Therefore, when searching for the MVUE, we can restrict our search to estimators that are functions of sufficient statistics. That is, given any unbiased estimator, conditioning on a sufficient statistic reduces its variance.

#### MLE

If a sufficient statistic $\mathbf{Y_1}$ exists for $\theta$ and the MLE $\mathbf{\hat{\theta}}$ of $\theta$ is unique, then $\mathbf{\hat{\theta}}$ is a function of $\mathbf{Y_1}$.

$$
\mathbf{L(\theta; \mathbf{x}) = f_{Y_1}[u_1(\mathbf{x}); \theta] H(\mathbf{x})}
$$

By Neyman's factorization theorem, the likelihood function can be factored as above, and since $\mathbf{H(\mathbf{x})}$ does not depend on $\theta$, the value of $\theta$ that maximizes $\mathbf{L}$ is the same as that maximizing $\mathbf{f_{Y_1}}$.

---

### Completeness and Uniqueness

Suppose we have two unbiased estimators $\phi(Y_1)$ and $\psi(Y_1)$ that are functions of a sufficient statistic $Y_1$:

$$
\mathbf{E[\phi(Y_1) - \psi(Y_1)] = 0}.
$$

If the family of pmfs or pdfs of $Y_1$ is complete, this condition implies that $\phi(Y_1)$ and $\psi(Y_1)$ are almost surely equal. A family $\mathbf{\{h(z; \theta) : \theta \in \Omega\}}$ is called a complete family if the condition $\mathbf{E[u(Z)] = 0}$ for all $\theta \in \Omega$ requires that $\mathbf{u(z) = 0}$ almost everywhere (except on sets of probability zero for each $\mathbf{h(z; \theta)}$).

#### Lehmann–Scheffé theorem

Completeness ensures uniqueness of unbiased estimators among functions of sufficient statistics. Combined with the Rao–Blackwell theorem, it identifies the MVUE.

Let there be a random sample from $f(x; \theta)$, let $Y_1$ be a sufficient statistic for $\theta$, and let the family $\mathbf{\{f_{Y_1}(y_1; \theta) : \theta \in \Omega\}}$ of pdfs or pmfs of $Y_1$ be complete. If there exists an unbiased estimator $\mathbf{\phi(Y_1)}$ of $\theta$ that is a function of $Y_1$, then $\mathbf{\phi(Y_1)}$ is the unique MVUE of $\theta$.

---

### The Exponential Class of Distributions

An exponential family is a family $\mathbf{\{f(x; \theta) : \theta \in \Omega\}}$ of pdfs or pmfs of the form

$$
\mathbf{f(x; \theta) = \exp[p(\theta)K(x) + H(x) + q(\theta)]}.
$$

The family is regular if the support $S$ does not depend on $\mathbf{\theta}$, $\mathbf{p(\theta)}$ is a nontrivial continuous function of $\mathbf{\theta \in \Omega}$, and either (for continuous $X$) $K'(x) \not\equiv 0$ and $H(x)$ is continuous on $S$, or (for discrete $X$) $K(x)$ is a nontrivial function on $S$.

When the distribution of $\mathbf{X}$ belongs to a regular exponential family, $\mathbf{Y_1 = \sum_{i=1}^n K(X_i)}$ is a complete sufficient statistic for $\mathbf{\theta}$.

Using the condition $E[u(Y_1)] = 0$ and the form of the pdf of $Y_1$,

$$
\mathbf{\int_{S_{Y_1}} u(y_1) R(y_1) \exp\{p(\theta)y_1\} dy_1 = 0},
$$

the only function yielding zero is $\mathbf{u(y_1)R(y_1) \equiv 0}$, so the family of distributions of $Y_1$ is complete.

---

### Functions of a Parameter

If $X_i \sim \text{Uniform}(0, \theta)$, then $\mathbf{Y_n = \max\{X_i\}}$ is a complete sufficient statistic for $\theta$. For a differentiable function $\mathbf{g(\theta)}$ of $\theta$, the MVUE $\mathbf{u(Y_n)}$ satisfies

$$
\mathbf{g(\theta) = E[u(Y_n)] = \int_0^{\theta} u(y) \frac{ny^{n-1}}{\theta^n} dy}.
$$

Differentiating this equation with respect to $\theta$ and solving for $\mathbf{u(\theta)}$, the MVUE of $\mathbf{g(\theta)}$ is

$$
\mathbf{u(Y_n) = g(Y_n) + \frac{Y_n}{n} g'(Y_n)}.
$$

Asymptotic distribution theory for MVUEs is not as simple as for MLEs, so bootstrap methods can be used to obtain the standard error $\mathbf{SE(\hat{\theta})}$:

$$
\mathbf{SE_B = \sqrt{\frac{1}{B-1} \sum_{i=1}^B (\hat{\theta}^*_i - \hat{\theta}^*)^2}}.
$$

---

### The case of several parameters

An extension of sufficient statistics and MVUE theory to cases where the pdf (pmf) of a distribution depends on multiple parameters $\mathbf{\theta} \in \Omega \subset \mathbf{R}^p$.

#### Jointly sufficient statistics

For a random sample $X_1, \dots, X_n$ from a distribution with parameter vector $\mathbf{\theta}$, an $m$-dimensional statistic vector $\mathbf{Y} = (Y_1, \dots, Y_m)^T$ is jointly sufficient for $\mathbf{\theta}$ when

$$
\mathbf{\frac{\prod_{i=1}^n f(x_i; \theta)}{f_{\mathbf{Y}}(\mathbf{y}; \theta)} = H(x_1, x_2, \dots, x_n)},
$$

where $\mathbf{H(x_1, x_2, \dots, x_n)}$ does not depend on $\mathbf{\theta}$. The statistic vector $\mathbf{Y}$ is sufficient when we can find nonnegative functions $\mathbf{k_1}$ and $\mathbf{k_2}$ such that

$$
\mathbf{\prod_{i=1}^n f(x_i; \theta) = k_1(\mathbf{y}; \theta) k_2(x_1, \dots, x_n)},
$$

where $\mathbf{k_2}$ does not depend on $\mathbf{\theta}$.

#### Exponential family distributions

When the pdf (pmf) of $X$ has the form

$$
\mathbf{f(x; \theta) = \exp \left\{ \sum_{j=1}^m p_j(\theta) K_j(x) + H(x) + q(\theta) \right\}},
$$

the distribution belongs to an exponential family. It is a regular exponential family if additional conditions are met. For a random sample $X_1, \dots, X_n$ from a regular exponential family distribution, the $m$ statistics $\mathbf{Y_j = \sum_{i=1}^n K_j(X_i)}$ are jointly complete sufficient statistics for the parameter vector $\mathbf{\theta}$. For $\mathbf{p = (p_1, \dots, p_{k-1})}$, the jointly complete sufficient statistics are the total counts for each category $\mathbf{Y_j = \sum_{i=1}^n X_{ij}}$ $(j=1, \dots, k-1)$. The MVUE of $p_j$ is $\mathbf{\hat{p}_j = n^{-1} Y_j}$, and using $\mathbf{E[n^{-2} Y_j Y_l] = \frac{n-1}{n} p_j p_l}$, the MVUE of $\mathbf{p_j p_l}$ is $\mathbf{\frac{1}{n(n-1)} Y_j Y_l}$.

---

### Minimal sufficiency and Ancillary Statistics

#### Minimal Sufficient Statistics

A goal in statistics is to reduce the data as much as possible without losing information about the parameter. Sufficient statistics ensure that the reduced data contains the same information about the parameter as the full sample. A minimal sufficient statistic is a function of all sufficient statistics; it is the most concise set of sufficient statistics that cannot be further reduced.

For the uniform distribution $\mathbf{U(\theta-1, \theta+1)}$, although there is a single parameter $\theta$, there are two sufficient statistics: the minimum order statistic $\mathbf{Y_1 = \min(X_i)}$ and the maximum order statistic $\mathbf{Y_n = \max(X_i)}$. These two statistics are minimal sufficient for $\mathbf{\theta}$; reducing below two loses sufficiency.

If an MLE $\mathbf{\hat{\theta}}$ exists and is also a sufficient statistic, then $\mathbf{\hat{\theta}}$ must be a minimal sufficient statistic.

A complete sufficient statistic is minimal sufficient, but the converse does not hold.

#### Ancillary Statistics

While sufficient statistics contain all information about the parameter, an ancillary statistic is one whose distribution does not depend on the parameter and appears to contain no information about the parameter.

The sample variance $\mathbf{S^2}$ from a $\mathbf{N(\theta, 1)}$ distribution has a distribution that does not depend on $\mathbf{\theta}$, so it is ancillary.

When $X_i = \theta + W_i$ and the pdf of $W_i$ does not depend on $\theta$, a statistic $\mathbf{Z = u(X_1, \dots, X_n)}$ satisfying $\mathbf{u(x_1 + d, \dots, x_n + d) = u(x_1, \dots, x_n)}$ for any real $d$ is a location-invariant statistic. When $X_i = \theta W_i$ and the pdf of $W_i$ does not depend on $\theta$, a statistic $\mathbf{Z}$ satisfying $\mathbf{u(cx_1, \dots, cx_n) = u(x_1, \dots, x_n)}$ for all $\mathbf{c > 0}$ is a scale-invariant statistic and is ancillary (its distribution does not depend on $\mathbf{\theta}$).

---

### Sufficiency, Completeness, and Independence

#### Relations among sufficiency, ancillarity, and independence

Sufficiency $\Rightarrow$ independence of conditional distributions: When there is a sufficient statistic $\mathbf{Y_1}$ for parameter $\mathbf{\theta}$, the conditional pdf $\mathbf{h(z|y_1)}$ of another statistic $\mathbf{Z}$ given $\mathbf{Y_1=y_1}$ does not depend on $\mathbf{\theta}$.

Sufficiency + Independence $\Rightarrow$ Ancillarity: If $\mathbf{Y_1}$ and $\mathbf{Z}$ are independent, then the marginal pdf $\mathbf{g_2(z)}$ of $\mathbf{Z}$ equals $\mathbf{h(z|y_1)}$, so it does not depend on $\mathbf{\theta}$. That is, $\mathbf{Z}$ is an ancillary statistic.

#### Basu's Theorem

To investigate the converse of the above, completeness is needed. That is, when the distribution of an ancillary statistic $\mathbf{Z}$ does not depend on $\mathbf{\theta}$, to determine whether $\mathbf{Z}$ and a sufficient statistic $\mathbf{Y_1}$ are independent, the family of distributions of $\mathbf{Y_1}$ must be complete.

Assume the marginal pdf $\mathbf{g_2(z)}$ of an ancillary statistic $\mathbf{Z}$ does not depend on $\mathbf{\theta}$, and the joint pdf of $\mathbf{Y_1}$ and $\mathbf{Z}$ is $\mathbf{g_1(y_1; \theta)h(z|y_1)}$. The integral equation for the marginal pdf of $\mathbf{Z}$ is

$$
\mathbf{\int_{-\infty}^{\infty} [g_2(z) - h(z|y_1)]g_1(y_1; \theta) dy_1 = 0 \quad (\text{for all } \theta \in \Omega)}.
$$

If the family $\mathbf{\{g_1(y_1; \theta) : \theta \in \Omega\}}$ is complete, then this implies $\mathbf{g_2(z) - h(z|y_1) = 0}$ or $\mathbf{g_2(z) = h(z|y_1)}$. Therefore, the joint pdf of $\mathbf{Y_1}$ and $\mathbf{Z}$ becomes $\mathbf{g_1(y_1; \theta)g_2(z)}$, so $\mathbf{Y_1}$ and $\mathbf{Z}$ are independent.

A complete sufficient statistic $\mathbf{Y_1}$ and an ancillary statistic $\mathbf{Z}$ are always independent.

---

### References

[Original source #1](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)
