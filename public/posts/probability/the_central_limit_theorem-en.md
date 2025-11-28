---
title: 'The central limit theorem'
date: '2023-05-22'
tags: ['Probability', 'lecture']
---

### The central limit theorem

The law of large numbers (LLN) asserts that the sample mean $\bar{S}_n$ of i.i.d. random variables converges to the theoretical mean $\bar{x}$ as $n \to \infty$.

The large deviation principle (LDP) describes the related phenomenon of measure concentration. The law of $\bar{S}_n$ concentrates exponentially fast to the Dirac delta mass $\delta_{\bar{x}}$.

The central limit theorem (CLT) quantifies the rate of convergence for the LLN. Roughly speaking, it describes the following behavior:

$$
\bar{S}_n - \bar{x} \approx \frac{1}{\sqrt{n}}\sigma Z
$$

where $\sigma^2 = \text{Var}[X_1]$ and $Z$ follows a standard normal distribution. That is, the fluctuations around the mean of partial sums of an i.i.d. sequence are asymptotically Gaussian.

---

### Lindeberg's Central Limit Theorem

The proof of the classical CLT used the restrictive assumption that ${X_n}$ is i.i.d. Lindeberg's CLT relaxes this condition and extends to sequences that are independent but not necessarily identically distributed.

For the CLT to hold, a condition of the type "each contributing term $X_m$ must be uniformly negligible with respect to $S_n$" is essential.

While the classical CLT only provides qualitative (weak convergence) information, Lindeberg's theorem provides quantitative estimates on the rate of convergence.

Assume a sequence of independent random variables ${X_n}$ with $\mathbf{E}[X_n] = 0$, and define:

$$
\begin{aligned}
&\sigma_n \triangleq \sqrt{\text{Var}[X_n]}, \\
&\Sigma_n \triangleq \sqrt{\text{Var}[S_n]} = \sqrt{\sum_{m=1}^n \sigma_m^2}, \\
&\hat{S}_n \triangleq \frac{S_n}{\Sigma_n}
\end{aligned}
$$

Under the above setup, let $f \in \mathcal{C}^3_b(\mathbb{R})$ (a continuously differentiable function with bounded third derivative). Then for all $\varepsilon > 0$ and $n \ge 1$, we have:

$$
\left|\mathbf{E}[f(\hat{S}_n)] - \mathbf{E}[f(Z)]\right| \le \left(\frac{\varepsilon}{6} + \frac{\gamma \cdot r_n}{6}\right) \|f'''\|_\infty + g_n(\varepsilon) \cdot \|f''\|_\infty
$$

If, in addition, the Lindeberg condition $\lim_{n\to\infty} g_n(\varepsilon) = 0$ is satisfied, then $\hat{S}_n \to Z$ converges weakly.

---

### Stein's Method

To gain a deeper understanding of the CLT, an effective method for quantitatively analyzing the rate of convergence (error rate) is needed. Stein's method is a powerful modern technique for this purpose.

To understand the rate of convergence, a concept of "distance" between two distributions (or probability measures $\mu, \nu$) is needed. The distance between the laws $\mu, \nu$ of random variables $W$ and $Z$ is generally defined for an appropriate class of test functions $\mathcal{H}$ as:

$$
d_{\mathcal{H}}(\mu, \nu) \triangleq \sup \left\{ \left|\int_{\mathbb{R}} \varphi d\mu - \int_{\mathbb{R}} \varphi d\nu\right| : \varphi \in \mathcal{H} \right\}
$$

When $\mathcal{H} = \{1_{(-\infty, a]}(x) : a \in \mathbb{R}\}$, $d_{\mathcal{H}}(\mu, \nu)$ recovers the uniform distance or Kolmogorov distance $\|F - G\|_\infty$.

For a given test function $\varphi$, we set up the following Stein's equation:

$$
f'(x) - xf(x) = \varphi(x) - c_\varphi
$$

Taking $\mathbf{E}[ \cdot ]$ on both sides of Stein's equation yields the error term:

$$
\mathbf{E}[f'(\hat{S}_n)] - \mathbf{E}[\hat{S}_n f(\hat{S}_n)] = \mathbf{E}[\varphi(\hat{S}_n)] - \mathbf{E}[\varphi(Z)]
$$

---

### References

[Original source #1](https://researchers.ms.unimelb.edu.au/~xgge@unimelb/Files/Notes/Lecture%20Notes%20on%20Advanced%20Probability.pdf)

[Original source #2](https://minerva.it.manchester.ac.uk/~saralees/statbook2.pdf)
