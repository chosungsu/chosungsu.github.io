---
title: 'Basic probability and statics'
date: '2024-05-13'
tags: ['Probability&Statistics', 'lecture']
---

### definition of probability

$P : F \rightarrow [0, 1]$ performs probabilistic measurement as follows:

1.$P(\Omega)=1$

2.$0 \le P(E) \le 1, \forall E \in F$

---

### continuity of probability

In a probability space, the following inequality holds for events $A_n$:

$$
P(lim inf_{n \rightarrow \infty} A_n) \le \\
lim inf_{n \rightarrow \infty} P(A_n) \le \\
lim sup_{n \rightarrow \infty} P(A_n) \le \\
P(lim sup_{n \rightarrow \infty} A_n)
$$

Here, the limit inferior event occurs almost always but is a finite event, and the limit superior event refers to an infinite event.

---

### expectation

For random variable $X$ and $f : X \rightarrow R$, it can be expressed as $E(f(x)) = \int f(x)dP(x)$, and when continuous, it is $\int f(x)p(x)dx$, and when discrete, it is $\sum_x f(x)p(x)$.

---

### moment generating function

The moment generating function is defined as $m_X(t) = e^{tX}$ for random variable $X$.

If the condition $m_X(t) < \infty$ is satisfied using finite $t$ in the interval $|t| < \epsilon$, it is calculated as follows:

$$
EX^k = \frac{\partial^k}{\partial^k} m_X(t) |_{t=0}
$$

The above equation calculates moments through differentiation. By differentiating $m_X(t)$ $k$ times with respect to $t$ and substituting $t=0$, the $k$-th moment value can be obtained.

Finding the moment generating function through Maclaurin series can be expressed as follows:

$$
m_X(t) = \sum_{k=0}^{\infty} \frac{EX^k}{k!} t^k
$$

One of the important properties of the moment generating function is that if two random variables have the same mgf, they must have the same probability distribution.

---

### some inequality

For random variable $X$, if the condition $E|X|^t < \infty$ is satisfied using $t$ in the interval where $t > 0$, $\epsilon > 0$, then Markov's inequality is calculated as follows:

$$
P(|X| > \epsilon) \le \frac{E|X|^t}{\epsilon^t}
$$

The great advantage of this inequality is that even without knowing the specific shape of the probability distribution, the upper bound of the tail probability can be calculated using only the expected value.

When $t=2$, this becomes Chebyshev's inequality.

In Markov's inequality, instead of $X$, a new variable $Y = X-\mu$ is created and applied as $P(|X-\mu| > \epsilon) \le \frac{E|X-\mu|^2}{\epsilon^2}$. That is, since the numerator is equal to the variance, it shows that the probability of deviating more than $\epsilon$ from one's own mean $\mu$ is lower when the variance is smaller.

Jensen's inequality states that when random variable $X$ satisfies a convex function $f : R \rightarrow R$, $f(EX) \le E(f(X))$ holds.

---

### multivariate normal distribution

When there are $\mu \in R^p$, a $p*p$ symmetric positive definite (SPD) matrix $\sum$, and a $p$-dimensional random vector $X$, the multivariate normal distribution is expressed as $X=\mu + \sum^{1/2} Z$. It consists of the square root of the variance-covariance matrix and a vector following the standard normal distribution.

The characteristic of the z vector is that $Z = (z_1, ..., z_p)^T$ satisfies iid (independent and identically distributed) with $z \sim N(0,1)$, being mutually independent and all following the standard normal distribution.

When $\sum$ is a positive definite matrix, the density function is defined as $p(x)=\frac{1}{\sqrt{2\pi\sum}}exp[-\frac{(x-\mu)^T\sum^{-1}(x-\mu)}{2}]$. The total integral is adjusted to be 1 through the normalization constant.

When $X$ is separated as $\begin{bmatrix} X_1 \\ X_2 \end{bmatrix}$, $\mu$ as $\begin{bmatrix} \mu_1 \\ \mu_2 \end{bmatrix}$, and $\sum$ as $\begin{bmatrix} \sum_{11} & \sum_{12} \\ \sum_{21} & \sum_{22} \end{bmatrix}$, then finding the marginal distribution gives $X_1 \sim N(\mu_1, \sum_{11})$. And finding the conditional distribution gives $X_1|X_2 = x_2 \sim N_q(\bar{\mu}, \bar{\sum})$. Here, the conditional mean $\bar{\mu} = \mu_1 + \sum_{12}\sum_{22}^{-1}(x_2 - \mu_2)$ consists of the unconditional mean of $x_1$ and the regression coefficient and deviation part related to the influence of $x_2$ on $x_1$. The conditional variance $\bar{\sum} = \sum_{11} - \sum_{12}\sum_{22}^{-1}\sum_{21}$ consists of the unconditional variance of $x_1$ and the variance reduction part.

$$
(X-\mu)^T\sum^{-1}(X-\mu) \sim \chi_p^2 \\
Z^THZ \sim \chi_\gamma^2, (\gamma = tr(H))
$$

As in the above equation, in multivariate normal distribution, the squared Mahalanobis distance and symmetric idempotent matrix quadratic form follow a chi-square distribution with degrees of freedom $p$.

According to the Wishart distribution, $W \sim W_m(\sum) = \sum_{j=1}^{m} Z_jZ_j^T$ is defined, meaning the distribution of the outer product sum of $m$ independent multivariate normal distribution vectors. Here, $\bar{X_n} \sim N(\mu, \sum/n)$ means the sample mean follows a normal distribution with mean equal to the population mean $\mu$ and variance equal to the population variance divided by the sample size. The sample mean and sample variance-covariance matrix are independent of each other.

---

### log-normal distribution

The probability density function (pdf) of the log-normal distribution is defined as follows:

$$
p(x) = \frac{1}{x\sqrt{2π}σ²} * exp[-\frac{(log x - μ)^2}{2σ^2}]
$$

It follows a normal distribution as $log X \sim N(\mu, \sigma^2)$ and is a distribution with only positive values and a long tail to the right.

---

### References

[Original Path #1](https://www.dropbox.com/scl/fi/buhj2z45ghs4wzclvagom/Chap4-probStat.pdf?rlkey=7lxxfr6m7sgwsc62k870oinkd&e=1&dl=0)



