---
title: 'Inferences about normal linear models'
date: '2023-05-26'
tags: ['Mathematical statistics', 'lecture']
---

### One-Way ANOVA

Suppose $b$ independent random variables each follow a normal distribution with unknown means $\mu_1, \mu_2, \dots, \mu_b$ and unknown but common variance $\sigma^2$. For each $j = 1, 2, \dots, b$, $X_{1j}, X_{2j}, \dots, X_{n_j j}$ is a random sample of size $n_j$ from a normal distribution with mean $\mu_j$ and variance $\sigma^2$. An appropriate model for the observations is

$$
\mathbf{X_{ij} = \mu_j + e_{ij}; \quad i = 1, \dots, n_j, \quad j = 1, \dots, b},
$$

where $e_{ij}$ are i.i.d. $\mathbf{N(0, \sigma^2)}$. The total sample size is $\mathbf{n = \sum_{j=1}^b n_j}$. The composite hypothesis we wish to test is

$$
\begin{aligned}
& H_0 : \mu_1 = \mu_2 = \cdots = \mu_b \\
& H_1 : \text{there exist } j \ne j' \text{ such that } \mu_j \ne \mu_{j'}
\end{aligned}
$$

Such problems commonly arise in practice. For example, when comparing $b$ drug treatments for a specific disease, the factor is 'treatment' and each drug corresponds to a 'level' of the factor. Since the likelihood ratio test can be expressed as a ratio of variance estimators, this is called a one-way analysis of variance (One-Way ANOVA) problem, an example of ANOVA.

#### Likelihood ratio test statistic

The full model parameter space $\mathbf{\Omega}$ under the alternative hypothesis is $\Omega = \{(\mu_1, \dots, \mu_b, \sigma^2) : -\infty < \mu_j < \infty, 0 < \sigma^2 < \infty\}$, and the reduced model parameter space $\omega$ under the null hypothesis is $\omega = \{(\mu_1, \dots, \mu_b, \sigma^2) : -\infty < \mu_1 = \cdots = \mu_b = \mu < \infty, 0 < \sigma^2 < \infty\}$, so the reduced model is equivalent to a single-sample model $\mathbf{N(\mu, \sigma^2)}$. The maximum likelihood estimators (MLEs) for parameters $\mu$ and $\sigma^2$ are

$$
\begin{aligned}
& \hat{\mu}_{\omega} = \frac{1}{n} \sum_{j=1}^b \sum_{i=1}^{n_j} x_{ij} = \bar{x}_{\cdot \cdot} \\
& \hat{\sigma}^2_{\omega} = \frac{1}{n} \sum_{j=1}^b \sum_{i=1}^{n_j} (x_{ij} - \bar{x}_{\cdot \cdot})^2
\end{aligned}
$$

Evaluating $L(\omega)$ at the MLEs gives $\mathbf{L(\hat{\omega}) = \left(\frac{1}{2\pi}\right)^{n/2} \left(\frac{1}{\hat{\sigma}^2_{\omega}}\right)^{n/2} e^{-n/2}}$.

For the full model, taking partial derivatives of the log-likelihood function $\mathbf{\log L(\Omega)}$ with respect to each $\mathbf{\mu_j}$ and setting them to zero, we obtain the MLE of $\mathbf{\mu_j}$:

$$
\begin{aligned}
& \hat{\mu}_j = \frac{1}{n_j} \sum_{i=1}^{n_j} x_{ij} = \bar{x}_{\cdot j} \\
& \hat{\sigma}^2_{\Omega} = \frac{1}{n} \sum_{j=1}^b \sum_{i=1}^{n_j} (x_{ij} - \bar{x}_{\cdot j})^2
\end{aligned}
$$

Evaluating $L(\Omega)$ at the MLEs gives $\mathbf{L(\hat{\Omega}) = \left(\frac{1}{2\pi}\right)^{n/2} \left(\frac{1}{\hat{\sigma}^2_{\Omega}}\right)^{n/2} e^{-n/2}}$.

The likelihood ratio test statistic $\mathbf{\Lambda = L(\hat{\omega})/L(\hat{\Omega})}$ rejects $H_0$ when small:

$$
\Lambda^{2/n} = \frac{\hat{\sigma}^2_{\Omega}}{\hat{\sigma}^2_{\omega}} = \frac{\sum_{j=1}^b \sum_{i=1}^{n_j} (x_{ij} - \bar{x}_{\cdot j})^2}{\sum_{j=1}^b \sum_{i=1}^{n_j} (x_{ij} - \bar{x}_{\cdot \cdot})^2} = \frac{Q_3}{Q}
$$

#### Sum of squares decomposition

Consider the following identity that decomposes the total sum of squares $\mathbf{Q}$ into two parts:

$$
\begin{aligned}
& Q = \sum_{j=1}^b \sum_{i=1}^{n_j} (x_{ij} - \bar{x}_{\cdot \cdot})^2 \\
&= \underbrace{\sum_{j=1}^b \sum_{i=1}^{n_j} (x_{ij} - \bar{x}_{\cdot j})^2}_{\mathbf{Q_3: \text{Error Sum of Squares (SSE)} \approx \text{within}} } + \underbrace{\sum_{j=1}^b n_j (\bar{x}_{\cdot j} - \bar{x}_{\cdot \cdot})^2}_{\mathbf{Q_4: \text{Treatment Sum of Squares (SSTr)} \approx \text{between}}}
\end{aligned}
$$

Using this identity, the likelihood ratio statistic $\mathbf{\Lambda^{-2/n}}$ becomes

$$
\mathbf{\Lambda^{-2/n} = \frac{Q_3 + Q_4}{Q_3} = 1 + \frac{Q_4}{Q_3}}.
$$

Since we reject $H_0$ when $\mathbf{Q_4/Q_3}$ is large, we use the F-statistic defined as

$$
\mathbf{F = \frac{Q_4 / (b-1)}{Q_3 / (n-b)}}.
$$

---

### Noncentral $\chi^2$ and F-Distributions

Let $X_1, X_2, \dots, X_n$ be independent random variables, each following $\mathbf{N(\mu_i, \sigma^2)}$. The moment generating function (mgf) $\mathbf{M(t)}$ of $Y = \sum_{i=1}^n X_i^2 / \sigma^2$ is given by

$$
\begin{aligned}
& M(t) = \frac{1}{(1 - 2t)^{n/2}} \exp \left\{ \frac{t \sum_{i=1}^n \mu_i^2}{\sigma^2 (1 - 2t)} \right\} \\
& \sim \frac{1}{(1 - 2t)^{r/2}} \exp \left\{ \frac{t\theta}{1 - 2t} \right\}
\end{aligned}
$$

The random variable $\mathbf{Y}$ is said to follow a noncentral chi-squared distribution, denoted $\chi^2(r, \theta)$, where $r$ is the degrees of freedom and $\theta$ is the noncentrality parameter. If $\theta=0$, it follows the usual central chi-squared distribution $\chi^2(r)$.

When $U \sim \chi^2(r_1, \theta)$ and $V \sim \chi^2(r_2)$, and $\mathbf{U}$ and $\mathbf{V}$ are independent,

$$
W = \frac{r_2 U}{r_1 V}
$$

is said to follow a noncentral F-distribution with degrees of freedom $r_1$ and $r_2$ and noncentrality parameter $\theta$. The noncentrality parameter $\theta$ of the noncentral F-distribution equals the noncentrality parameter of the chi-squared variable $U$ in the numerator.

$$
E(F) = \frac{r_2}{r_2 - 2} \left( \frac{r_1 + \theta}{r_1} \right)
$$

This is the mean of the noncentral F-distribution for $r_2 > 2$, and if $\theta > 0$, the mean of the noncentral F-distribution is greater than that of the corresponding central F-distribution.

Using these noncentral distributions, in one-way ANOVA the noncentrality parameter $\theta$ of $Q_4/\sigma^2$ is calculated by replacing $X_{ij}$ in $Q_4$ with its expected value $E(X_{ij}) = \mu_j$:

$$
\theta = \frac{1}{\sigma^2} \sum_{j=1}^b n_j (\mu_j - \mu)^2,
$$

where $\mu = E(\bar{X}_{\cdot \cdot}) = \sum_{j=1}^b (n_j/n) \mu_j$ is the expected value of the overall mean. Thus, under the null hypothesis that all $\mu_j$ are equal, $\mathbf{\theta = 0}$, and it follows a central F-distribution.

---

### Multiple Comparisons

In one-way ANOVA, after performing the F-test for the first-stage analysis of the hypothesis $H_0: \mu_1 = \cdots = \mu_b$ on equality of means, statisticians often wish to perform pairwise comparisons $\mu_j - \mu_{j'}$ as a second-stage analysis.

The estimator is $\bar{X}_{\cdot j} - \bar{X}_{\cdot j'}$. The estimator of $\sigma^2$ is $\hat{\sigma}^2_{\Omega}$, and the $(1-\alpha)100\%$ confidence interval is

$$
\bar{X}_{\cdot j} - \bar{X}_{\cdot j'} \pm t_{\alpha/2, n-b} \hat{\sigma}_{\Omega} \sqrt{\frac{1}{n_j} + \frac{1}{n_{j'}}}.
$$

When performing multiple pairwise comparisons simultaneously, the overall confidence level that all comparisons are simultaneously true falls below $\mathbf{(1-\alpha)}$ (slippage problem).

#### Bonferroni Multiple Comparison Procedure

The Bonferroni procedure is a common method for addressing multiple comparison problems while ensuring a lower bound on the overall confidence level.

When there are $k$ confidence intervals $I_i$ for $k$ parameters $\theta_i$, the lower bound on the probability that all intervals simultaneously contain the parameters is, by Boole's inequality:

$$
\begin{aligned}
& P(\theta_1 \in I_1, \dots, \theta_k \in I_k) \\
& \ge 1 - \sum_{i=1}^k P(\theta_i \notin I_i) = 1 - k\alpha
\end{aligned}
$$

When performing $k$ comparisons, we adjust the significance level of each individual confidence interval to $\alpha/k$. Then the overall confidence level is at least $1 - k(\alpha/k) = 1 - \alpha$.

#### Tukey's Multiple Comparison Procedure

Tukey's procedure is based on the studentized range distribution and generally provides narrower intervals than Bonferroni.

When $Y_1, \dots, Y_k \sim N(\mu, \sigma^2)$ and $R = \max(Y_i) - \min(Y_i)$, the statistic $Q = R/S$ is independent of $mS^2/\sigma^2 \sim \chi^2(m)$ and follows a studentized range distribution with parameters $k$ and $m$.

When all $n_j = a$ are equal, this is called a balanced design, and we have the confidence interval

$$
\bar{X}_{\cdot j} - \bar{X}_{\cdot j'} \pm q_{1-\alpha, b, n-b} \frac{\hat{\sigma}_{\Omega}}{\sqrt{a}},
$$

where $q_{1-\alpha, b, n-b}$ is the $(1-\alpha)$ quantile of the studentized range distribution with $b$ and $n-b$ degrees of freedom.

When $n_j$ differ, this is called an unbalanced design, and we use

$$
\bar{X}_{\cdot j} - \bar{X}_{\cdot j'} \pm \frac{q_{1-\alpha, b, n-b}}{\sqrt{2}} \hat{\sigma}_{\Omega} \sqrt{\frac{1}{n_j} + \frac{1}{n_{j'}}},
$$

which adjusts the error term according to each sample size. This does not have exactly $(1-\alpha)$ confidence level, but it is known to work well approximately when the imbalance is not severe.

---

### Two-Way ANOVA

Extending one-way ANOVA for a single factor with $b$ levels, we consider a situation with two factors: factor $A$ has $a$ levels and factor $B$ has $b$ levels. This is called two-way analysis of variance (Two-Way ANOVA).

$X_{ij}$ is the response for the combination of the $i$th level of factor $A$ and the $j$th level of factor $B$, and the total sample size is $n = ab$. We assume independent normal distributions with common variance $\sigma^2$, and denote the mean by $\mu_{ij}$.

#### Additive ANOVA Model

In the additive model, $\mu_{ij}$ consists only of the sum of the effects of factors $A$ and $B$:

$$
\mu_{ij} = \mu + (\mu_{i\cdot} - \mu) + (\mu_{\cdot j} - \mu).
$$

Using $\alpha_i = \mu_{i\cdot} - \mu$ (effect of factor A) and $\beta_j = \mu_{\cdot j} - \mu$ (effect of factor B), the model can be written simply as

$$
\mu_{ij} = \mu + \alpha_i + \beta_j,
$$

where $\sum_{i=1}^a \alpha_i = 0$ and $\sum_{j=1}^b \beta_j = 0$.

The maximum likelihood estimators (MLEs) are

$$
\begin{aligned}
& \hat{\mu} = \bar{X}_{\cdot \cdot}, \\
& \hat{\alpha}_i = \bar{X}_{i\cdot} - \bar{X}_{\cdot \cdot}, \\
& \hat{\beta}_j = \bar{X}_{\cdot j} - \bar{X}_{\cdot \cdot}
\end{aligned}
$$

The MLE of $\sigma^2$ is

$$
\begin{aligned}
& \hat{\sigma}^2_{\Omega} \\
&= \frac{\sum_{i=1}^a \sum_{j=1}^b [X_{ij} - \bar{X}_{i\cdot} - \bar{X}_{\cdot j} + \bar{X}_{\cdot \cdot}]^2}{ab} \\
&\equiv \frac{Q'_3}{ab}
\end{aligned}
$$

Here $Q'_3$ is the error sum of squares (SSE), and $ab \hat{\sigma}^2_{\Omega}/\sigma^2$ follows a $\chi^2$ distribution with degrees of freedom $(a-1)(b-1)$.

#### Testing main effects of factors A and B

Under $H_{0B}$ ($\beta_j = 0$), the reduced model MLE of $\sigma^2$ has numerator $Q'$:

$$
Q' = a \sum_{j=1}^b [\bar{X}_{\cdot j} - \bar{X}_{\cdot \cdot}]^2 + Q'_3.
$$

The likelihood ratio test statistic rejects $H_{0B}$ for large values of $Q'_4/Q'_3$, where $Q'_4$ is

$$
Q'_4 = a \sum_{j=1}^b [\bar{X}_{\cdot j} - \bar{X}_{\cdot \cdot}]^2.
$$

Here $Q'_4$ is the treatment sum of squares for factor $B$ (SSTrB). The F-statistic is

$$
F_B = \frac{a \sum_{j=1}^b [\bar{X}_{\cdot j} - \bar{X}_{\cdot \cdot}]^2 / (b - 1)}{Q'_3 / [(a - 1)(b - 1)]}.
$$

The test statistic $F_A$ for $H_{0A}$ is derived similarly.

#### Two-Way Model with Interaction

When there are $c > 1$ independent observations $X_{ijk}$ for each cell $(i, j)$, we can include interaction parameters $\mathbf{\gamma_{ij}}$ so that the cell mean $\mu_{ij}$ reflects specific contributions beyond the additive effects:

$$
\mu_{ij} = \mu + \alpha_i + \beta_j + \gamma_{ij},
$$

where $\sum_{i} \gamma_{ij} = 0, \sum_{j} \gamma_{ij} = 0$. The MLE of $\sigma^2$ is

$$
\hat{\sigma}^2_{\Omega} = \frac{\sum_{i} \sum_{j} \sum_{k} [X_{ijk} - \bar{X}_{ij\cdot}]^2}{abc} \equiv \frac{Q''_3}{abc}.
$$

$Q''_3$ is the error sum of squares (SSE), and $Q''_3/\sigma^2$ follows a $\chi^2$ distribution with degrees of freedom $ab(c-1)$.

---

### References

[Original source #1](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)
