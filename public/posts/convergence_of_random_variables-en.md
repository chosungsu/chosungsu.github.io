---
title: 'Convergence_of_random_variables'
date: '2024-05-17'
tags: ['Probability&Statistics', 'lecture']
---

### convergence in probability

$X_n$ is called convergence in probability to $X$ and is defined as $X_n \xrightarrow {P} X$. And $P(d(X_n, X) > \epsilon) \rightarrow 0$ holds as $n \rightarrow \infty$.

---

### almost sure convergence

$X_n$ is called almost sure convergence to $X$ and is defined as $X_n \xrightarrow {a.s} X$. And $P(lim_{n \rightarrow \infty} X_n = X) \rightarrow 1$ holds. It can explain convergence in probability, but the converse does not hold.

---

### weak convergence

$P_n$ is called weak convergence to $P$ and is defined as $P_n \xrightarrow {L} P$. Theoretically, convergence in probability $X_n \xrightarrow {P} X$ implies convergence in distribution $X_n \xrightarrow {L} X$. The converse also holds for a constant $c$ where $P(X=c) = 1$.

---

### slutsky's theorem

When distributions converge as $X_n \xrightarrow {L} X$ and $Y_n \xrightarrow {L} c$, by the continuous mapping theorem, it can be seen that distributions for addition and multiplication also converge.

$$
X_n + Y_n \xrightarrow {L} X + c, \\
X_nY_n \xrightarrow {L} cX
$$

---

### law of large numbers

#### weak law of large numbers, WLLN

In a space satisfying independent and identically distributed (iid) with values $X_1, X_2, ...X_d$, under the condition $E|X_i| < \infty$, with mean $\mu = EX_i$ and sample mean $\bar{X_n} = \frac{1}{n} \sum_{i=1}^{n} X_i$, the convergence relationship can be defined as $\bar{X_n} \xrightarrow {P} \mu$. This means that the sample mean converges in probability to the population mean.

#### strong law of large numbers, SLLN

Under the same conditions as WLLN, it can be defined as $\bar{X_n} \xrightarrow {a.s} \mu$, which has the meaning of strong convergence that the sample mean converges almost surely to the population mean.

---

### central limit theorem

In a space satisfying independent and identically distributed (iid) with values $X_1, X_2, ...X_d$, if $\sum = Var(X_i)$, the convergence relationship is defined as $\sqrt(n)(\bar{X_n} - \mu) \xrightarrow {L} N(0, \sum)$. This means that the standardized sample mean converges to a multivariate normal distribution.

---

### big O and little O

In little o notation, for real sequences, $x_n = o(a_n) \Leftrightarrow x_n/a_n \rightarrow 0$ means that $x_n$ is much smaller than $a_n$, and for random variables, $X_n = o_p(a_n) \Leftrightarrow X_n/a_n \xrightarrow {P} 0$ means that $X_n$ is probabilistically much smaller than $a_n$.

In big O notation, for real sequences, $x_n = O(a_n) \Leftrightarrow sup_n|x_n/a_n| < \infty$ means that $x_n$ is of the same order as $a_n$, and for random variables, $X_n=O_p(a_n) \Leftrightarrow X_n/a_n$ means that $X_n$ is probabilistically of the same order as $a_n$.

The algebraic properties are listed below:

1.$O_p(1) + O_p(1) = O_p(1)$

2.$O_p(1)*O_p(1) = O_p(1)$

3.$O_p(1) + o_p(1) = O_p(1)$

4.$O_p(1)*o_p(1) = o_p(1)$

5.$o_p(1) + o_p(1) = o_p(1)$

6.$o_p(1)*o_p(1) = o_p(1)$

---

### metrics for probability measures

#### 1.KL divergence

For two measures $P$ and $Q$ on $X$, the Kullback-Leibler divergence is defined as follows:

$$
K(P, Q) = \int log \frac{dP}{dQ}dP = \int log \frac{p(x)}{q(x)} dP(x)
$$

Here, $p$ and $q$ are used as density functions of $P$ and $Q$. KL divergence is always non-negative, and it is 0 when the distributions of $P$ and $Q$ are completely identical. And when $K(tP_1 + (1-t)P_2, tQ_1 + (1-t)Q_2) \le tK(P_1, Q_1) + (1-t)K(P_2, Q_2)$ is satisfied, both distributions are convex. This means that the linear combination is less than or equal to the weighted average of individual KL divergences. Finally, in multivariate normal distribution, KL divergence is composed of the trace of the matrix measuring the relationship of covariance matrices, normalization coefficient according to dimension, volume difference of two distributions, squared Mahalanobis distance between mean vectors, etc., as $K(P,Q) = \frac{1}{2} * [tr(\sum_2^{-1}\sum_1) - d + log(\frac{det(\sum_2)}{det(\sum_1)}) + (\mu_2 - \mu_1)^T\sum_2^{-1}(\mu_2 - \mu_1)]$.

#### 2.Maximum likelihood estimator

$p_0$ is a density function parameterized by $\theta \in \ominus$. And when $x_1, ..., x_n$ are random samples drawn independently and identically distributed (iid), the maximum likelihood estimator is calculated as $\hat{\theta} = argmax_{\theta \in \ominus} \sum_{i=1}^{n} log p_{\theta}(X_i)$. Decomposing this using KL divergence as $\theta_* = argmin_{\theta \in \ominus} K(p_0, p_{\theta}) = argmin (\int log \frac{p_0}{p_{\theta}} dP_0) = argmin (\int log p_0dP_0 - \int log p_{\theta} dP_0)$, that is, minimization of divergence means maximization of $\int log p_{\theta} dP_0$.

#### 3.Variational Bayes

$p(\theta|X)$ is the posterior distribution for the parameter of interest, and $q(\theta|\gamma)$ is a distribution parameterized by parameter $\gamma$. The calculation formula for approximating the complex posterior distribution through the variational family $q$ is as follows:

$$
L(q) = \int [log \frac{p(\theta, X)}{q(\theta)}] q(\theta) d\theta
$$

This is the evidence lower bound, and in variational Bayes, we want to maximize this lower bound. If we decompose the evidence as $log p(X) = K(q, p) + L(q)$, we can find that the KL divergence is positive and minimized, so the evidence lower bound is maximized, and accordingly, we can think of it as $\hat{\gamma} = argmin K(q, p)$.

#### 4.Total variation

Total variation means the maximum difference between two probability measures and uses all Borel subsets A as $d_{TV}(P, Q) = sup_A|P(A) - Q(A)|$. This difference is normalized to appear between 0 and 1. Also, the above equation is said to be equivalent to half of the absolute value integral of the difference of density functions as $d_{TV}(P, Q) = \frac{1}{2}|p-q|_1$.

#### 5.Coupling inequality

The coupling inequality consists of probability distributions ($X$, $Y$) with joint distribution and their marginal distributions $P$, $Q$ as $d_{TV}(P, Q) \le Pr(X \ne Y)$, expressing that the total variation obtained above has an upper bound on the probability of $X \ne Y$ in the joint distribution.

#### 6.Hellinger metric

When finding the Hellinger metric through density functions, $d_H(p,q) = \sqrt{\int (\sqrt(p) - \sqrt(q))^2 d\mu}$ is independent of the dominating measure $\mu$, and in multivariate normal distribution, it is composed of the geometric mean of covariance matrices and weighted distance between mean vectors as follows:

$$
1-d^2_h(p, q) = \frac{|\sum_1|^{1/4}|\sum_2|^{1/4}}{|(\sum_1+\sum_2)/2|^{1/2}}* \\
exp(-\frac{1}{8}(\mu_1-\mu_2)^T(\frac{\sum_1+\sum_2}{2})^{-1}(\mu_1-\mu_2))
$$

The relationships of this metric are listed below:

1.$d^2_H(p,q) \le |p-q|_1 \le 2d_H(p,q)$: The square of the Hellinger metric distance is an upper bound of L1 distance, and twice the Hellinger metric distance is an upper bound of L1 distance.

2.$|p-q|_1^2 \le 2K(p,q)$: Twice the KL divergence is an upper bound of the square of L1 distance.

3.$d^2_H(p,q) \le K(p,q)$: Through 1 and 2, KL divergence is an upper bound of the square of Hellinger metric distance.

#### 7.Wasserstein metrics

The $p$-th Wasserstein metric is defined as $W_p(P, Q) = inf (\int_{\chi^2} d(x,y)^p d\pi(x,y))^{1/p}$ and is used to find the optimal transport cost between two distributions.

For this reason, it is used in Wasserstein GAN (WGAN). When given random samples $x_1, ..., x_n$ drawn independently and identically distributed from $p_0$, unknown distribution $P_0 \in R^D$, and known distribution $p_z \in R^d$, $g_\# p_z$ is defined as the measure that pushforwards the known distribution through g.

$$
minimize_{g \in G} W_1(g_\# p_z, p_n)
$$

This solves the objective function of minimizing the first-order distance between the generated distribution and the empirical distribution. By the Kantorovich-Rubinstein duality theory,

$$
minimize_{g \in G} sup_{f \in F} |\int f(g(z))dp_z(z) - \frac{1}{n} \sum_{i=1}^{n} f(x_i)|
$$

The first term puts the expected value of the generated distribution, and the second term puts the average of the actual data, transforming it into a minimax problem.

---

### References

[Original Path #1](https://www.dropbox.com/scl/fi/arxhpvx7h88n1no73ksmn/Chap5-convergence.pdf?rlkey=9s4b2w1x3lry1hethqmrpgoge&e=2&dl=0)



