---
title: 'Maximum Likelihood Methods'
date: '2023-05-19'
tags: ['Mathematical statistics', 'lecture']
---

### Maximum Likelihood Estimation

Assume the pdf of $X$, $f(x; \theta)$, depends on an unknown parameter $\theta \in \Omega$, and let $X_1, \dots, X_n$ be a random sample from $X$.

The likelihood function is

$$
\mathbf{L(\theta; \mathbf{x}) = \prod_{i=1}^n f(x_i; \theta)}
$$

Our point estimator $\hat{\theta} = \hat{\theta}(X_1, \dots, X_n)$ is the value that maximizes $L(\theta)$, called the maximum likelihood estimator (MLE). The MLE has three regularity conditions:

- The cdf is identifiable, i.e., $\theta \ne \theta' \Rightarrow F(x; \theta) \ne F(x; \theta')$.
- The pdf has common support for all $\theta$.
- The true value $\theta_0$ is an interior point of $\Omega$.

Under these, the likelihood concentrates at the truth:

$$
\mathbf{\lim_{n\to\infty} P_{\theta_0} [L(\theta_0, \mathbf{X}) > L(\theta, \mathbf{X})] = 1}, \quad \text{for all } \theta \ne \theta_0.
$$

As $n \to \infty$, the likelihood is asymptotically maximized at $\theta_0$. For the density $f(x; \theta) = \tfrac{1}{2} e^{-|x-\theta|}$, the log-likelihood is $l(\theta) = -\text{const} - \sum_{i=1}^n |x_i - \theta|$ with derivative $l'(\theta) = \sum_{i=1}^n \operatorname{sgn}(x_i - \theta)$. The solution is the sample median $\mathbf{\hat{\theta} = Q_2 = \operatorname{med}\{x_1, \dots, x_n\}}$.

If $\hat{\theta}$ is the MLE of $\theta$ and $\eta = g(\theta)$ is a parameter of interest, then $\mathbf{g(\hat{\theta})}$ is the MLE of $\mathbf{\eta}$ (invariance). For example, if the MLE of $p$ is $\bar{X}$, then the MLE of $p(1-p)$ is $\bar{X}(1-\bar{X})$.

By consistency of the MLE, the likelihood equation $\frac{\partial l(\theta)}{\partial \theta}=0$ has a solution $\mathbf{\hat{\theta}_n}$ with $\mathbf{\hat{\theta}_n \xrightarrow{P} \theta_0}$. The likelihood at $\theta_0$ exceeds that at values outside a narrow neighborhood $(\theta_0 - a, \theta_0 + a)$ with probability tending to 1, hence a maximizer $\hat{\theta}_n$ exists within this interval and $\mathbf{P(|\hat{\theta}_n - \theta_0| < a) \to 1}$.

---

### Rao–Cramer Lower Bound and Efficiency

We set the Rao–Cramer lower bound on the variance of all unbiased estimators and show that, under regularity, the variance of the MLE is asymptotically equal to this bound.

#### Fisher information, $I(\theta)$

In addition to the regularity above, assume

- $f(x; \theta)$ is twice differentiable in $\theta$;
- the integral $\int f(x; \theta) dx$ is twice differentiable in $\theta$ under the integral sign.

Under these, the score has mean zero

$$
\mathbf{E\!\left[\frac{\partial \log f(X; \theta)}{\partial \theta}\right] = 0}
$$

and the Fisher information, the information in a single observation $\mathbf{X}$, is

$$
\begin{aligned}
& I(\theta) \\
&= E\left[\left(\frac{\partial \log f(X; \theta)}{\partial \theta}\right)^2\right] \\
&= \operatorname{Var}\left(\frac{\partial \log f(X; \theta)}{\partial \theta}\right).
\end{aligned}
$$

For a random sample $\mathbf{X}_1, \dots, \mathbf{X}_n$, the information in the likelihood $\mathbf{L(\theta, \mathbf{X})}$ is $nI(\theta)$; i.e., information scales linearly with $n$.

#### Rao–Cramer Theorem

If a statistic $Y = u(\mathbf{X}_1, \dots, \mathbf{X}_n)$ has mean $\mathbf{E(Y) = k(\theta)}$, then

$$
\mathbf{\operatorname{Var}(Y) \ge \frac{[k'(\theta)]^2}{nI(\theta)}}.
$$

If $Y$ is an unbiased estimator of $\theta$ ($k(\theta)=\theta$), then $k'(\theta)=1$ and

$$
\mathbf{\operatorname{Var}(Y) \ge \frac{1}{nI(\theta)}},
$$

so $\mathbf{1/[nI(\theta)]}$ is the minimum variance attainable by any unbiased estimator of $\theta$.

---

### Maximum Likelihood Tests

Let $X_1, \dots, X_n$ be an iid random sample with pdf $f(x; \theta)$, with scalar parameter $\theta$.

$$
\begin{aligned}
H_0: \theta = \theta_0 \\
H_1: \theta \ne \theta_0
\end{aligned}
$$

Let $\mathbf{\hat{\theta}}$ be the MLE of $\theta$. Then $\mathbf{L(\theta_0)}$ is the maximized likelihood under the null, and $\mathbf{L(\hat{\theta})}$ is the maximized likelihood over the full parameter space $\mathbf{\Omega}$.

#### Likelihood Ratio test (LRT)

The likelihood ratio statistic is

$$
\mathbf{\Lambda = \frac{L(\theta_0)}{L(\hat{\theta})}}.
$$

We have $\mathbf{\Lambda \le 1}$. If $\mathbf{H_0}$ is true, $\Lambda$ should be close to 1; if $\mathbf{H_1}$ is true, it should be small.

#### Wald test

Based on the asymptotic normality $\mathbf{N(\theta_0, \tfrac{1}{nI(\theta_0)})}$,

$$
\mathbf{\chi_W^2 = \left[\sqrt{nI(\hat{\theta})}(\hat{\theta} - \theta_0)\right]^2}.
$$

The farther $\mathbf{\hat{\theta}}$ is from $\theta_0$, the larger $\chi_W^2$. Under $\mathbf{H_0}$, $\mathbf{\chi_W^2}$ is asymptotically $\mathbf{\chi^2(1)}$.

#### Score test (Rao test)

$$
\mathbf{\chi_R^2 = \frac{[l'(\theta_0)]^2}{nI(\theta_0)} = \frac{\left[\sum_{i=1}^n \frac{\partial \log f(X_i; \theta_0)}{\partial \theta}\right]^2}{nI(\theta_0)}},
$$

which evaluates the slope (score) of the likelihood under $\mathbf{H_0}$. If $\mathbf{H_0}$ is true, $\hat{\theta} \approx \theta_0$ and $\mathbf{l'(\theta_0)}$ should be close to 0.

#### Relation of three tests

Under $\mathbf{H_0}$, all three statistics are asymptotically $\mathbf{\chi^2(1)}$ and

$$
\begin{aligned}
& \chi_W^2 - \chi_L^2 \xrightarrow{P} 0 \\
& \chi_R^2 - \chi_W^2 \xrightarrow{P} 0,
\end{aligned}
$$

so asymptotically the three tests are equivalent.

---

### EM Algorithm

In practice, part of the data is often missing. For instance, when observing lifetimes of machine parts, some may still be operating at the time of analysis. Suppose among $n$ items, $n_1$ are observed $(X)$ and $n_2 = n - n_1$ are unobserved $(Z)$.

Let $\mathbf{L(\theta|\mathbf{x}) = g(\mathbf{x}|\theta)}$ be the observed likelihood and $\mathbf{L_c(\theta|\mathbf{x}, \mathbf{z}) = h(\mathbf{x}, \mathbf{z}|\theta)}$ the complete-data likelihood (the joint pdf of all data).

Our goal is to find $\theta$ maximizing $\mathbf{L(\theta|\mathbf{x})}$, but we proceed via the complete-data likelihood $\mathbf{L_c(\theta|\mathbf{x}, \mathbf{z})}$:

$$
\mathbf{\log L(\theta|\mathbf{x}) = Q(\theta|\theta_0, \mathbf{x}) - E_{\theta_0}[\log k(\mathbf{Z}|\theta, \mathbf{x})|\theta_0, \mathbf{x}]}
$$

where $\mathbf{k(\mathbf{z}|\theta, \mathbf{x})}$ is the conditional pdf of the missing data $\mathbf{Z}$ given the observed data $\mathbf{x}$. The expectation term is

$$
\mathbf{Q(\theta|\theta_0, \mathbf{x}) = E_{\theta_0}[\log L_c(\theta|\mathbf{x}, \mathbf{Z})|\theta_0, \mathbf{x}]},
$$

the conditional expectation of the complete log-likelihood given $\mathbf{x}$ under $\mathbf{\theta_0}$. Denote the estimate at step $m$ by $\mathbf{\hat{\theta}^{(m)}}$. Then the $(m+1)$-th update is:

- E-step: compute $\mathbf{Q(\theta|\hat{\theta}^{(m)}, \mathbf{x})}$ using the current estimate $\mathbf{\hat{\theta}^{(m)}}$;
- M-step: find $\mathbf{\hat{\theta}^{(m+1)}}$ maximizing $\mathbf{Q(\theta|\hat{\theta}^{(m)}, \mathbf{x})}$ with respect to $\theta$.

---

### References

[Original source #1](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)


